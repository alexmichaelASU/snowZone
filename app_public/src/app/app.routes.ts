import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { SnowboardingComponent } from './pages/snowboarding/snowboarding.component';
import { ListingComponent } from './pages/listing/listing.component';
import { SingleListingComponent } from './pages/single-listing/single-listing.component';
import { SkiingComponent } from './pages/skiing/skiing.component';
import { ClothingComponent } from './pages/clothing/clothing.component';
import { UserComponent } from './pages/user/user.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';

export const routes: Routes = [
    { path: 'main', component: MainComponent},
    { path: 'snowboards', component: SnowboardingComponent},
    { path: 'listing', component: ListingComponent},
    { path: 'single/:id', component: SingleListingComponent},
    { path: 'skii', component: SkiingComponent}, 
    { path: 'clothing', component: ClothingComponent},
    { path: 'user', component: UserComponent},
    { path: 'signin', component: SigninComponent},
    { path: 'signup', component: SignupComponent}

];
