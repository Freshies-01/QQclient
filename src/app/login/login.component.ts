import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthServerProvider } from 'app/core';
import { LoginService } from 'app/shared/login.service';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {
  constructor(
    private httpClient: HttpClient,
    private authServerProvider: AuthServerProvider,
    private loginService: LoginService
  ) {}

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    rememberMe: new FormControl(false)
  });

  OnSubmitLoginForm() {
    const data = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value,
      rememberMe: this.loginForm.get('rememberMe').value
    };

    this.authServerProvider.login(data).subscribe();

    // this.httpClient
    //   .post(SERVER_API_URL + '/api/authenticate', data, {
    //     observe: 'response'
    //   })
    //   .subscribe(res => {});
  }

  NavigateToDashBoard() {
    console.log('TODO: navigated to dashboard');
  }
}
