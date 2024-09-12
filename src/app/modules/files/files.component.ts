import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { FilesService } from '../../core/services/files.service';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { TagModule } from 'primeng/tag';
import { ReadableFileSizeDirective } from '../../shared/directives/readable-file-size.directive';
import { NgStyle, NgIf } from '@angular/common';
import CONSTANTS from '../../core/constants';
import { UploadedFile } from '../../data/models/file';
import { FileUploadComponent } from "../file-upload/file-upload.component";
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-files',
  standalone: true,
  schemas:[NO_ERRORS_SCHEMA],
  imports: [TableModule, PaginatorModule, TagModule,ButtonModule, ReadableFileSizeDirective, NgStyle, NgIf, FileUploadComponent],
  templateUrl: './files.component.html',
  styleUrl: './files.component.scss'
})
export class FilesComponent {
  filesList: UploadedFile[]=[];
  page:number = 1;
  perPage:number = 10;
  total:number = 0; 
  uploadFileVisible:boolean = false;

  constructor (private filesService: FilesService){    
  }

  ngOnInit(){
    this.loadFiles();
  }

  private loadFiles(){
    this.filesList = [];
    this.filesService
    .getFiles(this.page, this.perPage)
    .subscribe((response: any) => {
      this.total = response.count;
      this.filesList = [...response.results as UploadedFile[]];
    });
  }

  getSeverity(status: string): 'warning' | 'success' | 'info' {
    switch (status){
      case 'uploaded':return 'warning';
      case 'comprossed': return 'success';
      default:
        return 'info'
    }
  }

  onPageChange(event: any){
    this.page = event.page + 1;
    this.loadFiles();
  }

  getDownloadLink(file: UploadedFile): string {
    return `${CONSTANTS.API_URL}/api/download/${file.id}`
  }  

  onUploadComplete() {
    this.loadFiles();
  }
}
