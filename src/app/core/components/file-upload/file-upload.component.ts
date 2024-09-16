import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { FileUploadModule } from 'primeng/fileupload';
import { environment } from '../../../../environments/environment';

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

  fileUploadUrl = `${environment.API_URL}/api/upload`;
     
  onFileUpload(event: any){    
    this.message = 'Upload complete';  
    this.uploadComplete.emit();    
  }

}
