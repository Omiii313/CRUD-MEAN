// Extrenal imports
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
// Internal imports
import { Post } from './post';
import { environment } from '../../environments/environment';
import { APINAME } from './post.constants';

@Injectable()
export class PostService {
  // http client used to send api req to server using http protocol.
  constructor(private httpClient: HttpClient) { }
  /**
   * @author om kanada
   * @description This function is used to get all post.
   */
  public getAll(): Observable<any> {
    return this.httpClient.get<Post>(environment.API_URL + APINAME.GET)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  /**
   * @author om kanada
   * @description This function is used to create new post.
   */
  public create(post: Post): Observable<any> {
    return this.httpClient.post<Post>(environment.API_URL + APINAME.CREATE, JSON.stringify(post))
      .pipe(
        catchError(this.errorHandler)
      )
  }
  /**
   * @author om kanada
   * @description This function is used to find particular post.
   */
  public find(id: number): Observable<any> {
    return this.httpClient.get<Post>(environment.API_URL + APINAME.GET + '/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  /**
   * @author om kanada
   * @description This function is used to update post.
   */
  public update(post: Post): Observable<any> {
    return this.httpClient.put<Post>(environment.API_URL + APINAME.UPDATE, JSON.stringify(post))
      .pipe(
        catchError(this.errorHandler)
      )
  }
  /**
   * @author om kanada
   * @description This function is used to delete post.
   */
  public delete(id: String) {
    return this.httpClient.delete<Post>(environment.API_URL + APINAME.REMOVE + '/' + id)
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
