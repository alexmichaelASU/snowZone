import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-snowboarding',
  standalone: true,
  imports: [MatSlideToggleModule,
    MatTabsModule,
    MatButtonModule,
    MatCardModule,],
  templateUrl: './snowboarding.component.html',
  styleUrl: './snowboarding.component.css'
})
export class SnowboardingComponent {

}
