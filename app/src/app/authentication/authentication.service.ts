import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Iuser } from './authentication';
import { APINAME } from './authentication.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // http client used to send api req to server using http protocol.
  constructor(private httpClient: HttpClient) { }
  /**
   * @author om kanada
   * @description This function is used to get all post.
   */
  public register(data: Iuser): Observable<any> {
    return this.httpClient.post<any>(environment.API_URL + APINAME.REGISTER, data)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  /**
 * @author om kanada
 * @description This function is used to get all post.
 */
  public login(data: Iuser): Observable<any> {
    return this.httpClient.post<any>(environment.API_URL + APINAME.LOGIN, data)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  /**
* @author om kanada
* @description This function is used to get all post.
*/
  public socialLogin(socialUSer): Observable<any> {
    return this.httpClient.post<any>(environment.API_URL + APINAME.SOCIAL_LOGIN, socialUSer)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  /**
   * @author om kanada
   * @description This function is used to handle error.
   */
  private errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
