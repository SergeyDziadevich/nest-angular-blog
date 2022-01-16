import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-login-form-ui',
  templateUrl: './admin-login-form-ui.component.html',
  styleUrls: ['./admin-login-form-ui.component.scss'],
})
export class AdminLoginFormUiComponent implements OnInit {
  formGroup: FormGroup;

  @Input() formError = '';
  @Output() login = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onFormChange(): void {
    this.formError = '';
  }

  onSubmit(): void {
    console.log('submit form: ', this.formGroup.value);
    this.login.emit(this.formGroup.value);
  }
}
