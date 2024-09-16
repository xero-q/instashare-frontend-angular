import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { FilesComponent } from './files.component';
import { FilesService } from '../../core/services/files.service';
import { ToastrService } from 'ngx-toastr';
import { UploadedFile } from '../../data/models/uploaded-file';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

describe('FilesComponent', () => {
  let component: FilesComponent;
  let fixture: ComponentFixture<FilesComponent>;
  let filesServiceSpy: jasmine.SpyObj<FilesService>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;

  const mockFiles: Partial<UploadedFile>[] = [
    { id: 1, name: 'file1.zip', status: 'uploaded'},
    { id: 2, name: 'file2.zip', status: 'compressed' }
  ];

  beforeEach(async () => {
    const filesServiceMock = jasmine.createSpyObj('FilesService', ['getFiles', 'updateFile']);
    const toastrMock = jasmine.createSpyObj('ToastrService', ['error']);

    filesServiceMock.getFiles.and.returnValue(of({ count: 0, results: [] }));  // Returning an empty files list as default

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FilesComponent],

      providers: [
        { provide: FilesService, useValue: filesServiceMock },
        { provide: ToastrService, useValue: toastrMock }
      ]
    }).compileComponents();

    filesServiceSpy = TestBed.inject(FilesService) as jasmine.SpyObj<FilesService>;
    toastrSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;

    fixture = TestBed.createComponent(FilesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load files on init', () => {
    filesServiceSpy.getFiles.and.returnValue(of({ count: 2, results: mockFiles }));

    component.ngOnInit();

    expect(component.isLoading).toBeFalse();
    expect(component.filesList.length).toBe(2);
    expect(component.total).toBe(2);
    expect(filesServiceSpy.getFiles).toHaveBeenCalledWith(component.page, component.perPage);
  });

  it('should display an error message if load files fails', () => {
    filesServiceSpy.getFiles.and.returnValue(throwError({ error: { detail: 'Error message' } }));

    component.loadFiles();

    expect(component.isLoading).toBeFalse();
    expect(toastrSpy.error).toHaveBeenCalledWith('Error while fetching the files', 'Error');
  });

  it('should change the page and reload files on page change', () => {
    filesServiceSpy.getFiles.and.returnValue(of({ count: 2, results: mockFiles }));

    component.onPageChange({ page: 1 });

    expect(component.page).toBe(2); // page + 1
    expect(filesServiceSpy.getFiles).toHaveBeenCalledWith(2, component.perPage);
  });

  it('should update a file name on edit complete and reload files', () => {
    const event = { data: { id: 1, name: 'updatedFileName.zip' } };
    filesServiceSpy.updateFile.and.returnValue(of({}));

    component.onEditComplete(event);

    expect(filesServiceSpy.updateFile).toHaveBeenCalledWith(1, 'updatedFileName.zip');
    expect(filesServiceSpy.getFiles).toHaveBeenCalled();
  });

  it('should show an error if file update fails', () => {
    const event = { data: { id: 1, name: 'updatedFileName.zip' } };
    filesServiceSpy.updateFile.and.returnValue(throwError({ error: { detail: 'Update failed' } }));

    component.onEditComplete(event);

    expect(toastrSpy.error).toHaveBeenCalledWith('Update failed', 'Error');
  });

  it('should return the correct download link for a file', () => {
    const file = { id: 1, name: 'file1.zip', status: 'uploaded' } as UploadedFile;
    const link = component.getDownloadLink(file);
    expect(link).toBe(`${environment.API_URL}/api/download/1`);
  });

  it('should refresh the file list after upload completes', () => {
    spyOn(component, 'loadFiles');

    component.onUploadComplete();

    expect(component.loadFiles).toHaveBeenCalled();
  });

  it('should return correct severity based on file status', () => {
    expect(component.getSeverity('uploaded')).toBe('warning');
    expect(component.getSeverity('comprossed')).toBe('success');
    expect(component.getSeverity('other')).toBe('info');
  });
});
