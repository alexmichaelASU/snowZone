import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SelectedComponent } from './selected/selected.component';
import { FooterComponent } from './footer/footer.component';
import { SecondHeaderComponent } from './second-header/second-header.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MainComponent,
    SelectedComponent,
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
}