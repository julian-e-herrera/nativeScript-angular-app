import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, of, switchMap, take, tap, Subscription } from 'rxjs';
import { Challenge } from './challenge.model';
import { DayStatus, Day } from './day.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';



@Injectable({providedIn:'root'})
export class ChallengeService implements OnDestroy {
  private _currentChallenge = new BehaviorSubject<Challenge>(null);
  private userSub: Subscription;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.userSub = this.authService.user.subscribe(user => {
      if (!user) {
        this._currentChallenge.next(null)
      }
    });
  }

  get currentChallenge() {
    return this._currentChallenge.asObservable();
}

  fetchCurrentChallenge() {
    return this.authService.user.pipe(take(1),switchMap(currentUser => {
      if (!currentUser && !currentUser.isAuth) {
        return of(null);
      }
      return this.http.get<{
      title: string,
      description: string,
      year: number,
      month: number,
      _days: Day[]
    }>(`https://nativescript-angular-6b9db-default-rtdb.firebaseio.com/challenge/${currentUser.id}.json?auth=${currentUser.token}`)
    }))
    .pipe(tap(resData => {
      if(resData){
        const loadedChallenge = new Challenge(
          resData.title, resData.description,
          resData.year,
          resData.month,
          resData._days);
        this._currentChallenge.next(loadedChallenge);
      };

    }));
  }

  createNewChallenge(title: string, description: string) {
    const newChallenge = new Challenge(
      title,
      description,
      new Date().getFullYear(),
      new Date().getMonth()
    );


    ///
    this.saveToServer(newChallenge);

    this._currentChallenge.next(newChallenge);
  }


  updateChallenge(title: string, description: string) {
    this._currentChallenge.pipe(take(1)).subscribe(challenge => {
      const updatedChallenge = new Challenge(
        title,
        description,
        challenge.year,
        challenge.month,
        challenge.days
      );
      this.saveToServer(updatedChallenge);
      this._currentChallenge.next(updatedChallenge);
    })
}


  updateDayStatus(dayInMonth:number,status:DayStatus) {
    this._currentChallenge.pipe(take(1)).subscribe(challenge => {
      if (!challenge || challenge.days.length < dayInMonth) {
        return;
      }
      const dayIndex = challenge.days.findIndex(d => d.dayInMonth === dayInMonth);
      challenge.days[dayIndex].status = status;
      this._currentChallenge.next(challenge);

      this.saveToServer(challenge);
    })

  }


  private saveToServer(challenge: Challenge) {
    this.authService.user.pipe(take(1),switchMap(currentUser => {
      if (!currentUser && !currentUser.isAuth) {
        return of(null);
      }
        return this.http.put(`https://nativescript-angular-6b9db-default-rtdb.firebaseio.com/challenge/${currentUser.id}.json?auth=${currentUser.token}`, challenge)
      })
    ).subscribe(res => {
        console.log(res)
      });
  }


ngOnDestroy(){
  this.userSub.unsubscribe();
}

  cleanUp() {
    this._currentChallenge.next(null)
  }

}
