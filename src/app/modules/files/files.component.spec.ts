import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FilesComponent } from './files.component';
import { provideToastr } from 'ngx-toastr';

describe('FilesComponent', () => {
  let component: FilesComponent;
  let fixture: ComponentFixture<FilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilesComponent,HttpClientTestingModule],
      providers:[ provideToastr()]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have number of page', () => {
    expect(component.page).toBeTruthy();
  });

  it('should have number of items per page', () => {
    expect(component.perPage).toBeTruthy();
  }); 

  it('should contain fieUpload component when setting uploadFileVisible to true', ()=>{
    component.uploadFileVisible = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-file-upload')).toBeTruthy();
  })

});
