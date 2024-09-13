import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthGuard } from './core/guards/auth-guard.service';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(), AuthGuard,

    provideAnimations(), 
    provideToastr({
      timeOut: 3000, // Duration of toast visibility
      positionClass: 'toast-top-right', // Toast position
      preventDuplicates: true, // Prevent duplicate toasts
    }),
    provideHttpClient(withInterceptorsFromDi()),  
        {
            provide:HTTP_INTERCEPTORS,
            useClass:TokenInterceptor,
            multi:true
        }
  ],
};
