import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import ROUTES from '../../shared/routes';


describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let routerSpy = { navigateByUrl: jasmine.createSpy('navigateByUrl') };

  beforeEach(() => {   
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[
        AuthService,
        { provide: Router, useValue: routerSpy }
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    localStorage.clear();
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and save tokens to localStorage', () => {
    const mockResponse = {
      access: 'mockAccessToken',
      refresh: 'mockRefreshToken'
    };
    const username = 'testuser';
    const password = 'testpass';

    service.login(username, password).subscribe(response => {
      expect(response).toEqual(mockResponse);

      const storedUser = JSON.parse(localStorage.getItem('loggedUser')!);
      expect(storedUser.username).toBe(username);
      expect(storedUser.token).toBe(mockResponse.access);
      expect(storedUser.refresh_token).toBe(mockResponse.refresh);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should signup and send correct data', () => {
    const mockResponse = { success: true };
    const username = 'newuser';
    const password = 'newpass';
    const email = 'test@test.com';

    service.signup(username, password, email).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/auth/signup`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username, password, email });
    req.flush(mockResponse);
  });

  it('should logout and clear localStorage', () => {
    localStorage.setItem('loggedUser', JSON.stringify({ token: 'dummyToken' }));
    service.logout();

    expect(localStorage.getItem('loggedUser')).toBeNull();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(ROUTES.LOGIN);
  });

  it('should return true if logged in', () => {
    localStorage.setItem('loggedUser', JSON.stringify({ token: 'dummyToken' }));
    expect(service.isLoggedIn).toBeTrue();
  });

  it('should return false if not logged in', () => {
    expect(service.isLoggedIn).toBeFalse();
  });

  it('should return the access token', () => {
    localStorage.setItem('loggedUser', JSON.stringify({ token: 'dummyToken' }));
    expect(service.getAccessToken()).toBe('dummyToken');
  });

  it('should return an empty string if no access token is found', () => {
    expect(service.getAccessToken()).toBe('');
  });

  it('should refresh tokens and update localStorage', () => {
    const mockResponse = {
      access: 'newAccessToken',
      refresh: 'newRefreshToken'
    };

    localStorage.setItem('loggedUser', JSON.stringify({ token: 'newAccessToken', refresh_token: 'newRefreshToken' }));

    service.refreshToken().subscribe(response => {
      expect(response).toEqual(mockResponse);

      const storedUser = JSON.parse(localStorage.getItem('loggedUser')!);
      expect(storedUser.token).toBe(mockResponse.access);
      expect(storedUser.refresh_token).toBe(mockResponse.refresh);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/auth/refresh-token`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});
