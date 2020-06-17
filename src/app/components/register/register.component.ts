import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  myForm: FormGroup;
  titleAlert: string = 'This field is required';
  Roles: any = ['Admin', 'Author', 'Reader'];

  constructor(public fb: FormBuilder) {}

  ngOnInit(): void {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      email: [
        null,
        [Validators.required, Validators.pattern(emailregex)],
        this.checkInUseEmail,
      ],
      password: [null, [Validators.required, this.checkPassword]],
      role: [null, [Validators.required]],
      gender: [null, [Validators.required]]
    });
  }

  get name() {
    return this.myForm.get('name') as FormControl;
  }

  getErrorEmail() {
    return this.myForm.get('email').hasError('required')
      ? 'Field is required'
      : this.myForm.get('email').hasError('pattern')
      ? 'Not a valid emailaddress'
      : this.myForm.get('email').hasError('alreadyInUse')
      ? 'This emailaddress is already in use'
      : '';
  }

  checkInUseEmail(control) {
    // mimic http database access
    let db = ['tony@gmail.com'];
    return new Observable((observer) => {
      setTimeout(() => {
        let result =
          db.indexOf(control.value) !== -1 ? { alreadyInUse: true } : null;
        observer.next(result);
        observer.complete();
      }, 4000);
    });
  }

  getErrorPassword() {
    return this.myForm.get('password').hasError('required')
      ? 'Field is required (at least eight characters, one uppercase letter and one number)'
      : this.myForm.get('password').hasError('requirements')
      ? 'Password needs to be at least eight characters, one uppercase letter and one number'
      : '';
  }
  checkPassword(control) {
    let enteredPassword = control.value;
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return !passwordCheck.test(enteredPassword) && enteredPassword
      ? { requirements: true }
      : null;
  }

  submitForm() {
    console.log(this.myForm.value);
  }
}
