import { Component, Input, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { isAndroid } from '@nativescript/core/platform';
import {  Page } from '@nativescript/core/ui/page';
import { UIService } from '../../ui.service';


declare var android: any;
@Component({
  selector: 'ns-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css'],
  moduleId: module.id,
})
export class ActionBarCustomComponent implements OnInit{

  @Input() title: string;
  @Input() showBackButton =true;
  @Input() hasMenu =true;
  constructor(private page: Page, private router: RouterExtensions,private uiService:UIService) {
  }

 ngOnInit(){}

  get canGoBack() {
    return this.router.canGoBack() || this.showBackButton;
  }
  get android() {
  return isAndroid
}
  onGoBack() {
    this.router.backToPreviousPage();
  }


  onToggleMenu() {
    this.uiService.toggleDrawer()
  }

  onLoadedActionBar() {
    if (isAndroid) {
      const androidToolBar = this.page.actionBar.nativeView;
      const backButton = androidToolBar.getNavigationIcon();
      if (backButton) {
        backButton.setColorFilter(android.graphics.Color.parseColor('#171717'),(<any>android.graphics).PorterDuff.Mode.SRC_ATOP)
      }
    }
  }
}
