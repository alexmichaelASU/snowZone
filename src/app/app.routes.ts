import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SelectedComponent } from './selected/selected.component';

export const routes: Routes = [
    { path: 'main', component: MainComponent},
    { path: 'selected', component: SelectedComponent}, //may have id in path
];
