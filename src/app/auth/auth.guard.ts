import { Injectable } from '@angular/core';
import {CanMatch, Route, UrlSegment, UrlTree} from '@angular/router'
import { RouterExtensions } from '@nativescript/angular';
import { Observable, take, switchMap ,of, tap} from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanMatch {
  constructor(private authService: AuthService,private router :RouterExtensions) { }

  canMatch(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
    return this.authService.user.pipe(take(1), switchMap(currentUser => {
      if (!currentUser || !currentUser.token) {
        return this.authService.autoLogin()
      }
      return of(true);
    }),
      tap(isAuth => {
        if (!isAuth) {
          this.router.navigate(['/auth'])
        }
      }));
  }
}
