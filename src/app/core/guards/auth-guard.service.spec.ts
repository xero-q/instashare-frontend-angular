import { TestBed } from '@angular/core/testing';
import { Route, Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import ROUTES from '../../shared/routes';
import { AuthGuard } from './auth-guard.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { routes } from '../../app.routes';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  const mockRouterStateSnapshot: RouterStateSnapshot = {
    url: '/some-url',
  } as RouterStateSnapshot;

  const mockActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot(routes), HttpClientTestingModule],
      providers: [AuthGuard, AuthService],
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);

    spyOn(router, 'navigateByUrl').and.stub();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    it('should return true if the user is logged in', () => {
      spyOnProperty(authService, 'isLoggedIn', 'get').and.returnValue(true);

      expect(guard.canActivate(mockActivatedRouteSnapshot, mockRouterStateSnapshot)).toBe(true);
    });

    it('should navigate to login and return false if the user is not logged in', () => {
      spyOnProperty(authService, 'isLoggedIn', 'get').and.returnValue(false);

      const result = guard.canActivate(mockActivatedRouteSnapshot, mockRouterStateSnapshot);

      expect(result).toBe(false);
      expect(authService.loginRedirectUrl).toBe('/some-url');
      expect(router.navigateByUrl).toHaveBeenCalledWith(ROUTES.LOGIN);
    });
  });

  describe('canActivateChild', () => {
    it('should call canActivate and return its result', () => {
      spyOn(guard, 'canActivate').and.returnValue(true);

      const result = guard.canActivateChild(mockActivatedRouteSnapshot, mockRouterStateSnapshot);

      expect(result).toBe(true);
      expect(guard.canActivate).toHaveBeenCalledWith(mockActivatedRouteSnapshot, mockRouterStateSnapshot);
    });
  });

  describe('canLoad', () => {
    it('should return true if the user is logged in', () => {
      spyOnProperty(authService, 'isLoggedIn', 'get').and.returnValue(true);

      expect(guard.canLoad({ path: 'dashboard' } as Route)).toBe(true);
    });

    it('should navigate to login and return false if the user is not logged in', () => {
      spyOnProperty(authService, 'isLoggedIn', 'get').and.returnValue(false);

      const result = guard.canLoad({ path: 'dashboard' } as Route);

      expect(result).toBe(false);
      expect(authService.loginRedirectUrl).toBe('/dashboard');
      expect(router.navigateByUrl).toHaveBeenCalledWith(ROUTES.LOGIN);
    });
  });
});
