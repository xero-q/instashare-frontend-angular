import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { FilesService } from '../../core/services/files.service';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { TagModule } from 'primeng/tag';
import { ReadableFileSizeDirective } from '../../shared/directives/readable-file-size.directive';
import { NgStyle, NgIf } from '@angular/common';
import { UploadedFile } from '../../data/models/file';
import { FileUploadComponent } from "../file-upload/file-upload.component";
import { ButtonModule } from 'primeng/button';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';


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
  isLoading: boolean = false;

  constructor (private filesService: FilesService,private toastr: ToastrService){    
  }

  ngOnInit(){
    this.loadFiles();
  }

  public loadFiles(){
    this.filesList = [];
    this.isLoading = true;
    this.filesService
    .getFiles(this.page, this.perPage)
    .subscribe({
      next:(response: any)=>{
        this.isLoading = false;
        this.total = response.count;
        this.filesList = [...response.results as UploadedFile[]];
      },
      error:(err: any)=>{
        this.isLoading = false;  
        this.toastr.error('Error while fetching the files','Error');
      }
    })       
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
    return `${environment.API_URL}/api/download/${file.id}`
  }  

  onUploadComplete() {
    this.loadFiles();
  }

  onEditComplete(event: any) {
    const {id, name} = event.data;

    this.filesService.updateFile(id, name).subscribe({
      next:(response: any)=>{
        this.loadFiles();
      },
      error:(err: any)=>{
        const {detail} = err.error;
        this.toastr.error(detail,'Error');
    }})    
  }

  doNothing(event: any){
    event.stopPropagation(); 
    return; 
  }
}
