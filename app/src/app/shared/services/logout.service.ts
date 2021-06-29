import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { APINAME } from '../shared.constants';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  constructor(private httpClient: HttpClient) { }

  /**
 * @author om kanada
 * @description This function is used to get all post.
 */
  public logout(userName: string): Observable<any> {
    return this.httpClient.post<any>(environment.API_URL + APINAME.LOGOUT, { userName })
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
