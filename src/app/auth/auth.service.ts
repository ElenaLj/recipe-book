import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, tap, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "./user.model";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          )
        })
      );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          )
        }));
  }

  autoLogin() {
    const userData: {
      email: string,
      userId: string,
      _token: string,
      _tokenExpirationDate: number
    } = JSON.parse(localStorage.getItem('userData'));
    // check if there is a stored session
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.email, userData.userId, userData._token, userData._tokenExpirationDate)
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    )
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));

  }


  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An error occured!'
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => errorMessage);
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email has already been taken'
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled for this project'
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'Too many attempts. Try later'
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'No user with this email. Please sign up or try a different email'
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Ops try again. The password you inserted is wrong!'
        break;
    }
    return throwError(() => errorMessage);
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
  }
}
