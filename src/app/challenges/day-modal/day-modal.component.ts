import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from '@nativescript/angular';
import { DayStatus } from '../day.model';

@Component({
  selector: 'ns-day-modal',
  templateUrl: './day-modal.component.html',
  styleUrls: ['./day-modal.component.css'],
  moduleId: module.id,
})
export class DayModalComponent implements OnInit {
  loadedDate: Date;
  loadedStatus: 'complete'|'fail'= null;
  constructor(private modalParams:ModalDialogParams) { }

  ngOnInit() {
    const parseParams = this.modalParams.context as { date: Date, status: DayStatus }
    this.loadedDate = parseParams.date
    if (parseParams.status === DayStatus.Completed) {
      this.loadedStatus = 'complete';
    } else if (parseParams.status === DayStatus.Failed) {
      this.loadedStatus = 'fail'
    } else {
      this.loadedStatus = null
    }

  }

  onHandlerInput(action:DayStatus) {
   this.modalParams.closeCallback(action)
 }
}
