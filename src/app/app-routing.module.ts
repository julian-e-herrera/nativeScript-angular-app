import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes } from '@angular/router';

import { NativeScriptRouterModule } from '@nativescript/angular';


import { AuthComponent } from './auth/auth.component';



const routes: Routes = [
    { path: '', component: AuthComponent },
    { path: 'challenges',  loadChildren: () => import('./challenges/challenges.module')
    .then(m => m.ChallengesModule)//'~/app/challenges/challenges.module#ChallengesModule'
  },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppRoutingModule {}
