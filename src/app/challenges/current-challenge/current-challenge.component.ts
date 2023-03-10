import { Component, ViewContainerRef } from '@angular/core';
import { ModalDialogService } from '@nativescript/angular';
import { DayModalComponent } from '../day-modal/day-modal.component';
import { UIService } from '../../shared/ui.service';




@Component({
  selector: 'ns-current-challenge',
  templateUrl: './current-challenge.component.html',
  styleUrls: ['./current-challenge.component.css'],
  moduleId: module.id
})
export class CurrentChallengeComponent {

  constructor(private modalDialog: ModalDialogService,private vcRef:ViewContainerRef,private uiService:UIService) { }


onChangeStatus() {
  this.modalDialog.showModal(DayModalComponent, {
    fullscreen: true,
    viewContainerRef: this.uiService.getRootVCRef() ?
      this.uiService.getRootVCRef() : this.vcRef,
    context:{date: new Date()}
  })
  }



}
