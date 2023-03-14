import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageRoute } from '@nativescript/angular';

@Component({
  selector: 'ns-challenge-edit',
  templateUrl: './challenge-edit.component.html',
  styleUrls: ['./challenge-edit.component.scss','./challenge-edit.component.css'],
  moduleId: module.id
})
export class ChallengeEditComponent implements OnInit{
isCreating =true
  constructor(private activedRoutes: ActivatedRoute,private pageRoute:PageRoute) {

  }


  ngOnInit(): void {
    // this.activedRoutes.paramMap.subscribe(paramMap => {
    //   console.log(paramMap.get('mode'))
    // })

    this.pageRoute.activatedRoute.subscribe(activatedRoute => {
      activatedRoute.paramMap.subscribe(paramMap => {
        if (!paramMap.has('mode')) {
          this.isCreating=true
        } else {
          this.isCreating=paramMap.get('mode')!=='edit'
        }

        })
    })
  }
}
