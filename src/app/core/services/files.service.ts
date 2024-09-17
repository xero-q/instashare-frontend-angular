import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private filesUrl = `${environment.API_URL}/api/files`; 
  private uploadUrl = `${environment.API_URL}/api/update`

  constructor(private http: HttpClient) {}

  getFiles(page: number = 1, perPage: number = 20, ): Observable<any> {  
    return this.http.get(`${this.filesUrl}?page=${page}&perPage=${perPage}`);    
  }

  updateFile(id: number, name: string): Observable<any>{
    const body = {name};
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put(`${this.uploadUrl}/${id}`, body, {headers});   
  }
}
