import { provideAnimations } from '@angular/platform-browser/animations';
import { TuiRootModule } from '@taiga-ui/core';
import { ApplicationConfig, ErrorHandler, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor, GlobalErrorHandler } from '@bookngo/base';

export const appConfig: ApplicationConfig = {
  providers: [
      provideAnimations(),
      provideClientHydration(),
      provideRouter(appRoutes),
      importProvidersFrom(TuiRootModule),
      provideHttpClient(withInterceptors([authInterceptor])),
      {
          provide: ErrorHandler,
          useClass: GlobalErrorHandler
      }
  ]
};
