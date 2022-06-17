import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

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
  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBbplZ7-CzgRAxbah8O0tApMI7VbsioxNI',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(error => {
        let errorMessage = 'An error occured!'
        if (!error.error || !error.error.error) {
          return throwError(errorMessage);
        }

        switch (error.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'This email has already been taken'
            break;
          case 'OPERATION_NOT_ALLOWED':
            errorMessage = 'Password sign-in is disabled for this project'
            break;
          case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            errorMessage = 'Too many attempts. Try later'
            break;
        }
        return throwError(errorMessage);
      }))
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBbplZ7-CzgRAxbah8O0tApMI7VbsioxNI',
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
  }
}
