import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import CONSTANTS from '../constants';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private apiUrl = `${CONSTANTS.API_URL}/api/files`; 

  constructor(private http: HttpClient) {}

  getFiles(page: number = 1, perPage: number = 20, ): Observable<any> {  
    return this.http.get(`${this.apiUrl}?page=${page}&perPage=${perPage}`);    
  }
}
