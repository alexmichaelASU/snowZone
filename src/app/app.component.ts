import { Component} from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SelectedComponent } from './selected/selected.component';
import { FooterComponent } from './footer/footer.component';
import { SecondHeaderComponent } from './second-header/second-header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, RouterLink, RouterLinkActive, 
    MainComponent, SelectedComponent, FooterComponent, SecondHeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'snowZone';
}
