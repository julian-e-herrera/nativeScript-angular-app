import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { ActionBarCustomComponent } from './ui/action-bar/action-bar.component';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';


@NgModule({
  imports:[NativeScriptCommonModule,NativeScriptRouterModule],
  declarations: [ActionBarCustomComponent],
  exports: [ActionBarCustomComponent],
  schemas: [NO_ERRORS_SCHEMA],
})

export class SharedModule{

}
