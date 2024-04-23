import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SnowboardingComponent } from './snowboarding/snowboarding.component';
import { ListingComponent } from './listing/listing.component';

export const routes: Routes = [
    { path: 'main', component: MainComponent},
    { path: 'snowboards', component: SnowboardingComponent},
    { path: 'listing', component: ListingComponent},
];
