import { Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { ColorGeneratorComponent } from './components/color-generator/color-generator.component';
import { MangeColorsComponent } from './components/manage-colors/manage-colors.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "about", component: AboutComponent },
    { path: "color-generator", component: ColorGeneratorComponent},
    { path: "manage-colors", component: MangeColorsComponent}
];
