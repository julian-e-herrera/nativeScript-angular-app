import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { RouterExtensions } from '@nativescript/angular';
import { TextField } from '@nativescript/core';

@Component({
  selector: 'ns-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  moduleId: module.id,
})
export class AuthComponent implements OnInit {


  form: FormGroup;
  emailControlIsValid = true;
  passwordControlIsValid = true;
  isLoging = true;
  @ViewChild('passwordEl') passwordEl: ElementRef<TextField>
  @ViewChild('emailEl') emailEl: ElementRef<TextField>




  constructor(private router:RouterExtensions) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null,
        {
          updateOn: 'blur', validators: [Validators.required, Validators.email]
        }),
      password: new FormControl(null,
        {
          updateOn: 'blur', validators: [Validators.required, Validators.minLength(6)]
        }),
    });
    this.form.get('email').statusChanges.subscribe((status) =>
    { this.emailControlIsValid = status === 'VALID'; });
    this.form.get('password').statusChanges.subscribe((status) =>
    { this.passwordControlIsValid = status === 'VALID'; });
  }

  onSignin() {
    this.router.navigate(['/today'],{clearHistory:true})
  }
  onDone() {
    this.emailEl.nativeElement.focus();
    this.passwordEl.nativeElement.focus();
    this.passwordEl.nativeElement.dismissSoftInput();
  }
  onSwitch() {
    this.isLoging=!this.isLoging
  }

  onSubmit() {
    this.emailEl.nativeElement.focus();
    this.passwordEl.nativeElement.focus();
    this.passwordEl.nativeElement.dismissSoftInput();


    if (!this.form.valid) { return; }

    const email = this.form.get('email').value;
    const password = this.form.get('password').value;
    this.form.reset();
    if (this.isLoging) { console.log('Logging...' )}

  }

}
