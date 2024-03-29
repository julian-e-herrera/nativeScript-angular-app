import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptHttpClientModule, NativeScriptModule } from '@nativescript/angular';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';


// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

import { DayModalComponent } from './challenges/day-modal/day-modal.component';
import { ChallengesRoutingModule } from './challenges/challenges-routing.module';
import { ChallengesModule } from './challenges/challenges.module';
import { ChallengeActionsModule } from './challenges/challenge-actions/challenge-actions.module';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,

    NativeScriptHttpClientModule,
    AppRoutingModule,
    NativeScriptUISideDrawerModule,
    ChallengesRoutingModule,
    ChallengesModule,

    ChallengeActionsModule,

  ],
  declarations: [
    AppComponent,
    DayModalComponent
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
  entryComponents:[DayModalComponent]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {}
