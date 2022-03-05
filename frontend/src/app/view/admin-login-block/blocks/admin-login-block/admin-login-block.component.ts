import { Component, OnInit } from '@angular/core';
import {select, Store } from '@ngrx/store';
import {Observable} from 'rxjs';
import {getLoaded, getLoading, getServerError} from '../../../../store/admin-auth-store/store/admin-auth-selectors';
import {login} from '../../../../store/admin-auth-store/store/admin-auth.actions';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-admin-login-block',
  templateUrl: './admin-login-block.component.html',
  styleUrls: ['./admin-login-block.component.scss']
})
export class AdminLoginBlockComponent implements OnInit {
  loading$: Observable<boolean> = this.store$.pipe(select(getLoading));
  loaded$: Observable<boolean> = this.store$.pipe(select(getLoaded));
  serverError$: Observable<string> = this.store$.pipe(select(getServerError));

  serverError = '';

  constructor(private store$: Store, private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  onLogin(loginPayload: {login: string, password: string}): void {
    this.store$.dispatch(login(loginPayload));
  }

  testProfile(): any {
    this.httpClient.get('http://localhost:3000/auth/profile').subscribe(console.log);
  }
}
