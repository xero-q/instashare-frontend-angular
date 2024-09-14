import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';
import { UploadedFile } from '../../data/models/file';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private filesUrl = `${environment.API_URL}/api/files`; 
  private uploadUrl = `${environment.API_URL}/api/upload`

  constructor(private http: HttpClient) {}

  getFiles(page: number = 1, perPage: number = 20, ): Observable<any> {  
    return this.http.get(`${this.filesUrl}?page=${page}&perPage=${perPage}`);    
  }

  updateFile(id: number, newName: string): Observable<any>{
    const body = {new_name:newName};
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put(`${this.uploadUrl}/${id}`, body, {headers});   
  }
}
