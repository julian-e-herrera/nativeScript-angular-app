import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { UIService } from './shared/ui.service';
import { Subscription } from 'rxjs';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

@Component({
  selector: 'ns-app',
  moduleId: module.id,
  templateUrl: './app.component.html',
  styleUrls:['../../_app.common']
})
export class AppComponent implements OnInit,AfterViewInit, OnDestroy{
  @ViewChild(RadSideDrawerComponent) drawerComponent:RadSideDrawerComponent
  activeChallenge = '';
  private drawerSub:Subscription
  private drawer: RadSideDrawer

  constructor(private uiService: UIService,private chageDetectionRef:ChangeDetectorRef,  private vcRef: ViewContainerRef) { }



  ngOnInit(): void {
    this.drawerSub = this.uiService.drawerState.subscribe(() => {
      if (this.drawer) {
        this.drawer.toggleDrawerState()
      }
    })
    this.uiService.setRootVCRef(this.vcRef)
  }


  ngAfterViewInit(): void {
    this.drawer=this.drawerComponent.sideDrawer
    this.chageDetectionRef.detectChanges()
  }

  onChallengeInput(challengeDescription: string) {
    this.activeChallenge = challengeDescription;

  }


  onLogout() {
   this.uiService.toggleDrawer()
}

  ngOnDestroy(): void {
    if (this.drawerSub) {
      this.drawerSub.unsubscribe()
    }
  }
}
