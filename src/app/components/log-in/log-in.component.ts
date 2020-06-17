import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  loginform: FormGroup;
  requiredError = 'The field is required';
  constructor(public fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginform = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  get name() {
    return this.loginform.get('name') as FormControl;
  }

  loginSubmit() {
    console.log(this.loginform.value);
  }
}
