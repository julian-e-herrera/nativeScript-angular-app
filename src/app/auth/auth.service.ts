import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, of, tap, throwError } from 'rxjs';
import { alert } from '@nativescript/core';
import { User } from './user.model';
import { RouterExtensions } from '@nativescript/angular';
import { setString,getString,hasKey,remove } from '@nativescript/core/application-settings';

const FIREBASE_API_KEY = 'AIzaSyDFx1BWHeoca5TiHktvp2aaFix1VPmgJK4'
interface AuthResponseData {
  king: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expireIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: "root" })

export class AuthService{

  private _user = new BehaviorSubject<User>(null)
  private tokenExpirationTimer: number;


  constructor(private http: HttpClient,private router :RouterExtensions) {

  }

  get user() {
    return this._user.asObservable();
  }

  signUp(email: string, password: string) {
   return  this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`,
     { email: email, password: password, returnSecureToken: true })
     .pipe(catchError(errorRes => {
       this.handleError(errorRes.error.error.message);
       return throwError(()=> new Error(errorRes));
      }),
      tap(resData => {
        if (resData && resData.idToken) {
          this.handleLogin(
            email,
            resData.idToken,
            resData.localId,
            parseInt(resData.expireIn)
          );
        }
      }))
  }

  login(email: string, password: string) {
   return  this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
     { email: email, password: password, returnSecureToken: true }).
     pipe(catchError(errorRes => {
      this.handleError(errorRes.error.error.message);
      return throwError(()=> new Error(errorRes));
     }),
     tap(resData => {
       if (resData && resData.idToken) {
         this.handleLogin(
           email,
           resData.idToken,
           resData.localId,
           parseInt(resData.expireIn));
       }
     }))
  }



  logout() {
    this._user.next(null);
    remove('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.router.navigate(['/auth'], { clearHistory: true });
  }



  autoLogin() {
    if (!hasKey('userData')) {
      return of(false);
    }
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(getString('userData'));

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if (loadedUser.isAuth) {
      this._user.next(loadedUser);
      this.autoLogout(loadedUser.timeToExpiry);

      return of(true);
    }
    return of(false);
  }




  autoLogout(expiryDuration:number) {
   this.tokenExpirationTimer =Number(setTimeout(()=>{this.logout()}, expiryDuration)) ;//weird trans
  }
  private handleLogin(email: string, token: string,userId:string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      email,
      userId,
      token,
      expirationDate
      );

    setString('userData', JSON.stringify(user));
    this.autoLogout(user.timeToExpiry);
    this._user.next(user);

}

  private handleError(errorMessage:string) {
    switch (errorMessage) {
      case 'EMAIL_EXISTS':
        alert('This email address exist already.');
        break;
      case 'INVALID_PASSWORD':
        alert('Your password is invalid.');
        break;
      default:
        alert('Authentication failed, check your credentials.');
        break;
    }
  }
}
