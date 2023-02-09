import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { AppComponent } from './app.component';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'master',
        clientId: 'angular',
      },
      initOptions: {
        onLoad: 'login-required',
        // onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
        checkLoginIframe: false,
      },
      // shouldAddToken: (request) => {
      //   const { method, url } = request;

      //   const isGetRequest = 'GET' === method.toUpperCase();
      //   const acceptablePaths = ['/assets', '/clients/public'];
      //   const isAcceptablePathMatch = urls.some((path) => url.includes(path));

      //   return !(isGetRequest && isAcceptablePathMatch);
      // }
    });
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, KeycloakAngularModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
