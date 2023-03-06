import { Component, Input } from '@angular/core';
import { ItemEventData } from '@nativescript/core/ui/list-view';


@Component({
  selector: 'ns-current-challenge',
  templateUrl: './current-challenge.component.html',
  styleUrls: ['./current-challenge.component.css'],
  moduleId: module.id
})
export class CurrentChallengeComponent {
  @Input() challengeTitle :string = '';
  // @Input() challenges :string[] = [];


  onItemTap(args: ItemEventData) {
console.log(args) }
}
