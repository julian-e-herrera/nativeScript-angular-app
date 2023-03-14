import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { ModalDialogService } from '@nativescript/angular';
import { DayModalComponent } from '../day-modal/day-modal.component';
import { UIService } from '../../shared/ui.service';




@Component({
  selector: 'ns-current-challenge',
  templateUrl: './current-challenge.component.html',
  styleUrls: ['./current-challenge.component.scss'],
  moduleId: module.id
})
export class CurrentChallengeComponent implements OnInit{
  weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  days: { dayInMonth: number, dayInWeek: number }[]=[];
  private currentYear: number;
  private currentMonth: number;

  constructor(private modalDialog: ModalDialogService, private vcRef: ViewContainerRef, private uiService: UIService) { }


  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
   this.currentMonth = new Date().getMonth();
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    for (let index = 1; index < daysInMonth + 1; index++) {
      const date = new Date(this.currentYear, this.currentMonth, index);
      const dayInWeek = date.getDay();
      this.days.push({ dayInMonth: index, dayInWeek: dayInWeek });
    }
  }


  getRow(index: number, day: { dayInMonth: number, dayInWeek: number }) {
    const startRow = 1;
    const weekrow = Math.floor(index / 7);
    const firstWeekDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const irregRow = day.dayInWeek < firstWeekDay ? 1 : 0;

    return startRow + weekrow + irregRow;
}

onChangeStatus() {
  this.modalDialog.showModal(DayModalComponent, {
    fullscreen: true,
    viewContainerRef: this.uiService.getRootVCRef() ?
      this.uiService.getRootVCRef() : this.vcRef,
    context:{date: new Date()}
  }).then((action :string)=> {
    console.log(action)
  })
  }



}
