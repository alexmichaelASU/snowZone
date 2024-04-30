import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { FooterComponent } from './pages/footer/footer.component';
import { SecondHeaderComponent } from './pages/second-header/second-header.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { WebRequestService } from './services/web-request.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MainComponent,
    FooterComponent,
    SecondHeaderComponent,
    MatSlideToggleModule,
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    
    
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'snowZone';
  constructor(private webReq: WebRequestService) {}

  ngOnInit() {
    this.webReq.autoLogIn();
}
}