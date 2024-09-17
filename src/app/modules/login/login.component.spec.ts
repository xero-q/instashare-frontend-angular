import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of} from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { LoginComponent } from './login.component';
import { routes } from '../../app.routes';
import { AuthGuard } from '../../core/guards/auth-guard.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: any;

  beforeEach(async () => {
    authServiceMock = {
      login: () => of({}),
      isLoggedIn: false,
      loginRedirectUrl: ''
    };

    const authGuardMock = {
      canActivate: () => true,  
      canActivateChild: () => true, 
      canLoad: () => true,  
      checkLogin: () => true  
    };
    
    
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ReactiveFormsModule,
        RouterModule.forRoot(
          routes
        )       
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: AuthGuard, useValue: authGuardMock }       
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.controls['username']).toBeDefined();
    expect(component.loginForm.controls['password']).toBeDefined();
  });

  it('should be invalid when form is empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should be valid when form is filled', () => {
    component.loginForm.controls['username'].setValue('testuser');
    component.loginForm.controls['password'].setValue('password');
    expect(component.loginForm.valid).toBeTruthy();
  });  

  it('should redirect to loginRedirectUrl if present after login', fakeAsync(() => {
    component.loginForm.controls['username'].setValue('testuser');
    component.loginForm.controls['password'].setValue('password');
  
    authServiceMock.loginRedirectUrl = '/some-redirect';
    spyOn(authServiceMock, 'login').and.returnValue(of({}));
  
    // Properly create the spy on router.navigateByUrl
    const router = TestBed.inject(Router); // Inject router from TestBed
    const routerSpy = spyOn(router, 'navigateByUrl'); // Spy on navigateByUrl
  
    component.onSubmit(); // Call the onSubmit method
    tick(); // Simulate the passage of time
  
    expect(routerSpy).toHaveBeenCalledWith('/some-redirect'); // Assert it was called
  }));
  
});
