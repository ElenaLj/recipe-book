import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})

export class AuthComponent {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    let authObservable: Observable<AuthResponseData>
    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      // login logic
      authObservable = this.authService.login(email, password);
    } else {
      //signup logic
      authObservable = this.authService.signUp(email, password)
    }

    authObservable.subscribe(response => {
      console.log(response);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, errorMessage => {
      console.log(errorMessage);
      this.error = errorMessage
      this.isLoading = false;
    });

    form.reset();
  }
}
