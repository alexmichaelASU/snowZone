import { Component } from '@angular/core';
import { WebRequestService } from '../../services/web-request.service';
import { Router } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    RouterOutlet, RouterLink, RouterLinkActive
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  constructor(private webReq: WebRequestService, private router: Router) {}

  onLogoutClick(): void {
    // Call the logout method in WebRequestService
    this.webReq.logout();
    // Navigate the user to a login or home page
    this.router.navigate(['/login']); // Adjust the route as needed
  }
}
