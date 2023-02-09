import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private keycloak: KeycloakService) {}

  async logout(): Promise<void> {
    await this.keycloak.logout();
  }
}
