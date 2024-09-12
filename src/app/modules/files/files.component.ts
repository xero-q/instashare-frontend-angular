import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { FilesService } from '../../core/services/files.service';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-files',
  standalone: true,
  schemas:[NO_ERRORS_SCHEMA],
  imports: [TableModule, PaginatorModule, TagModule],
  templateUrl: './files.component.html',
  styleUrl: './files.component.scss'
})
export class FilesComponent {
  filesList: File[]=[];
  page:number = 1;
  perPage:number = 20;
  total:number = 0;
  
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
      for (const f of response.results as File[]) {
        this.filesList.push(f);
      }
      console.log(this.filesList);
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

  pageChange(event: any){
    this.page = event.page + 1;
    this.loadFiles();
  }
}
