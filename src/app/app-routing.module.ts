import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes } from '@angular/router';

import { NativeScriptRouterModule } from '@nativescript/angular';
import { AuthGuard } from './auth/auth.guard';





const routes: Routes = [
    { path: 'auth', loadChildren:() => import('./auth/auth.module')
    .then(m => m.AuthModule)},
    { path: 'challenges',  loadChildren: () => import('./challenges/challenges.module')
      .then(m => m.ChallengesModule)//'~/app/challenges/challenges.module#ChallengesModule'
      ,canMatch:[AuthGuard]
  },
  //{ path: '', redirectTo:'/challeges/tab',pathMatch:'full'},
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
  schemas: [NO_ERRORS_SCHEMA],
  providers:[AuthGuard]
})
export class AppRoutingModule {}
