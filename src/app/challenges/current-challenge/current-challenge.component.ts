import { Component, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { ModalDialogService } from '@nativescript/angular';
import { DayModalComponent } from '../day-modal/day-modal.component';
import { UIService } from '../../shared/ui.service';
import { ChallengeService } from '../challenges.service';
import { Challenge } from '../challenge.model';
import { Subscription } from 'rxjs';
import { Day, DayStatus } from '../day.model';




@Component({
  selector: 'ns-current-challenge',
  templateUrl: './current-challenge.component.html',
  styleUrls: ['./current-challenge.component.scss'],
  moduleId: module.id
})
export class CurrentChallengeComponent implements OnInit,OnDestroy{
  weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  currentChallenge: Challenge;
  // days: { dayInMonth: number, dayInWeek: number }[]=[];

  private curChallengeSub: Subscription;

  constructor(
    private modalDialog: ModalDialogService,
    private vcRef: ViewContainerRef,
    private uiService: UIService,
    private challengeService: ChallengeService,
  ) { }


  ngOnInit(): void {
      this.curChallengeSub = this.challengeService.currentChallenge.subscribe(challenge => {
      this.currentChallenge =challenge
    });
  }


  getRow(index: number, day: { dayInMonth: number, dayInWeek: number }) {
    const startRow = 1;
    const weekrow = Math.floor(index / 7);
    const firstWeekDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay();
    const irregRow = day.dayInWeek < firstWeekDay ? 1 : 0;

    return startRow + weekrow + irregRow;
}

  onChangeStatus(day: Day) {
    if (!this.getIsSettable(day.dayInMonth)) {return;}
  this.modalDialog.showModal(DayModalComponent, {
    fullscreen: true,
    viewContainerRef: this.uiService.getRootVCRef() ?
      this.uiService.getRootVCRef() : this.vcRef,
    context:{date: day.date,satus:day.status}
  }).then((status: DayStatus) => {
    if (status === DayStatus.Open) {
      return;
    }
    this.challengeService.updateDayStatus(day.dayInMonth,status)
  })
  }

ngOnDestroy(): void {
  if (this.curChallengeSub) {
    this.curChallengeSub.unsubscribe()
  }
}
  getIsSettable(dayInMonth:number) {
    return dayInMonth <= new Date().getDate();
  }

}
