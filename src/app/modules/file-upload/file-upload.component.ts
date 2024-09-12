import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { HttpHeaders } from '@angular/common/http';
import CONSTANTS from '../../core/constants';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [FileUploadModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  @Output() uploadComplete = new EventEmitter<void>();
  message: string = '';

  fileUploadUrl = `${CONSTANTS.API_URL}/api/upload`;
  authHeaders: HttpHeaders;

  constructor (private authService: AuthService){
    const token = this.authService.loggedUser().token;
    this.authHeaders =  new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }
 
  onFileUpload(event: any){    
    this.message = 'Upload complete';  
    this.uploadComplete.emit();    
  }

}
