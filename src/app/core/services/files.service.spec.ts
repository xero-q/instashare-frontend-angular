import { TestBed } from '@angular/core/testing';
import { FilesService } from './files.service';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

describe('FilesService', () => {
  let service: FilesService;
  let httpTestingController:HttpTestingController;

  beforeEach(() => {    
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [FilesService]
    });    
    service = TestBed.inject(FilesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch files with pagination', () => {
    const mockResponse = {
      results: [
        { id: 1, name: 'File 1' },
        { id: 2, name: 'File 2' }
      ],
      count: 2
    };

    service.getFiles(1, 20).subscribe(files => {
      expect(files.results.length).toBe(2);
      expect(files.count).toBe(2);
      expect(files.results[0].name).toBe('File 1');
    });

    const req = httpTestingController.expectOne(`${environment.API_URL}/api/files?page=1&perPage=20`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should update a file name', () => {
    const mockResponse = { success: true };

    const updatedFileName = 'Updated File';
    const fileId = 1;
    
    service.updateFile(fileId, updatedFileName).subscribe(response => {
      expect(response.success).toBe(true);
    });

    const req = httpTestingController.expectOne(`${environment.API_URL}/api/update/${fileId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ name: updatedFileName });   
    req.flush(mockResponse);
  });
});
