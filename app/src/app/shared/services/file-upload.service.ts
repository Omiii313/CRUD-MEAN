import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { APINAME } from '../shared.constants';

@Injectable({
    providedIn: 'root'
})
export class FileUploadService {

    constructor(private http: HttpClient) { }

    // Returns an observable
    public upload(file): Observable<any> {

        // Create form data
        const formData = new FormData();

        // Store form name as "file" with file data
        formData.append("data", file, file.name);

        // Make http post request over api
        // with formData as req
        return this.http.post(environment.API_URL + APINAME.IMAGE_UPLOAD, formData, { reportProgress: true, observe: 'events' });
    }
}
