import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageRoute, RouterExtensions } from '@nativescript/angular';
import { take } from 'rxjs';
import { ChallengeService } from '../challenges.service';

@Component({
  selector: 'ns-challenge-edit',
  templateUrl: './challenge-edit.component.html',
  styleUrls: ['./challenge-edit.component.scss','./challenge-edit.component.css'],
  moduleId: module.id
})
export class ChallengeEditComponent implements OnInit{
  isCreating = true;
  title = '';
  description= '';
  constructor
    (private activedRoutes: ActivatedRoute,
    private pageRoute: PageRoute,
    private router: RouterExtensions,
    private challengeService: ChallengeService

  ) {

  }


  ngOnInit(): void {
    // this.activedRoutes.paramMap.subscribe(paramMap => {
    //   console.log(paramMap.get('mode'))
    // })

    this.pageRoute.activatedRoute.subscribe(activatedRoute => {
      activatedRoute.paramMap.subscribe(paramMap => {
        if (!paramMap.has('mode')) {
          this.isCreating = true;
        } else {
          this.isCreating = paramMap.get('mode') !== 'edit';
        }
        if (!this.isCreating) {
          this.challengeService.currentChallenge.pipe(take(1)).subscribe(challenge => {
            this.title = challenge.title;
            this.description = challenge.description;


          })
        }
      })
    })
  }

  onSubmit(title: string, description: string) {
    // console.log(title, description)
    if (this.isCreating) {

      this.challengeService.createNewChallenge(title, description);
    } else {
      this.challengeService.updateChallenge(title, description);
    }
    this.router.backToPreviousPage()
  }
}
