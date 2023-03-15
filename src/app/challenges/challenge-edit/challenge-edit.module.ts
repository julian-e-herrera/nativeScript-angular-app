import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule, NativeScriptFormsModule } from '@nativescript/angular';
import { ChallengeEditComponent } from './challenge-edit.component';
import { SharedModule } from '../../shared/shared.module';





@NgModule({
  declarations: [
    ChallengeEditComponent,
  ],
  imports: [
    NativeScriptCommonModule,NativeScriptRouterModule,NativeScriptFormsModule,
    SharedModule,NativeScriptRouterModule.forChild([{path:'',component:ChallengeEditComponent}])
  ],
  schemas: [NO_ERRORS_SCHEMA],
})


export class ChallengeEditModule{}
