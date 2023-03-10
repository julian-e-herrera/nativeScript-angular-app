import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from '@nativescript/angular';
import { NativeScriptFormsModule } from '@nativescript/angular';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';

import { AppComponent } from './app.component';
import { CurrentChallengeComponent } from './challenges/current-challenge/current-challenge.component';
import { ChallengeEditComponent } from './challenges/challenge-edit/challenge-edit.component';
import { AuthComponent } from './auth/auth.component';
import { TodayComponent } from './challenges/today/today.component';
import { AppRoutingModule } from './app-routing.module';
import {ActionBarCustomComponent} from './shared/ui/action-bar/action-bar.component'

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { ChallengeTabsComponent } from './challenges/challenge-tabs/challenge-tabs.component';
import { DayModalComponent } from './challenges/day-modal/day-modal.component';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    AppRoutingModule,
    NativeScriptUISideDrawerModule
  ],
  declarations: [
    AppComponent,
    CurrentChallengeComponent,
    ChallengeEditComponent,
    AuthComponent,
    TodayComponent,
    ActionBarCustomComponent,
    ChallengeTabsComponent,
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
