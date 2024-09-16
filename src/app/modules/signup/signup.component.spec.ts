import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Route, Router, RouterModule, RouterStateSnapshot } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { SignupComponent } from './signup.component';
import { AuthService } from '../../core/services/auth.service';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { routes } from '../../app.routes';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authService: AuthService;
  let router: Router;
  let toastrService: ToastrService;
  let httpTestingController: HttpTestingController;
  let authServiceMock: any;

  beforeEach(waitForAsync(() => {
    const mockAuthService = jasmine.createSpyObj('AuthService', ['signup']);
    const mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const mockToastrService = jasmine.createSpyObj('ToastrService', ['success']);

    authServiceMock = {
      login: () => of({}),
      signup:() => of({}),
      isLoggedIn: false,
      loginRedirectUrl: ''
    };

    const authGuardMock = {
      canActivate: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => true,  
      canActivateChild: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => true, 
      canLoad: (route: Route) => true,  
      checkLogin: (url: string) => true  
    };

    TestBed.configureTestingModule({
      imports: [
        SignupComponent,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterModule.forRoot(
          routes
        )    
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: ToastrService, useValue: mockToastrService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    toastrService = TestBed.inject(ToastrService);
    httpTestingController = TestBed.inject(HttpTestingController);
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the signup form with empty fields', () => {
    component.ngOnInit();
    expect(component.signupForm).toBeTruthy();
    expect(component.signupForm.controls['username'].value).toBe('');
    expect(component.signupForm.controls['password'].value).toBe('');
    expect(component.signupForm.controls['email'].value).toBe('');
  });

  it('should display error if passwords do not match', () => {
    component.ngOnInit();
    component.signupForm.controls['password'].setValue('password1');
    component.signupForm.controls['passwordConfirm'].setValue('password2');

    const passwordMismatchError = component.signupForm.errors?.['passwordMismatch'];
    expect(passwordMismatchError).toBeTrue();
  });

 it('should set error message on signup failure', () => {
    component.ngOnInit();
    component.signupForm.controls['username'].setValue('validUser');
    component.signupForm.controls['password'].setValue('password1');
    component.signupForm.controls['passwordConfirm'].setValue('password1');
    component.signupForm.controls['email'].setValue('user@example.com');

    const mockError = { error: { email: ['This email is already taken.'] } };

    spyOn(authServiceMock, 'signup').and.returnValue(throwError(mockError));
    
    component.onSubmit();
    
    expect(component.errorMessage).toBe('Error: This email is already taken.');
  });

  it('should not submit form if invalid', () => {
    component.ngOnInit();
    component.signupForm.controls['username'].setValue(''); // Invalid username

    spyOn(authServiceMock, 'signup').and.returnValue(of({}));

    component.onSubmit();
    
    expect(authService.signup).not.toHaveBeenCalled();
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
