import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProfileComponent} from './profilecomponent/profile.component';
import {AuthGuard} from '../core/guards/auth.guard';

const profileRoutes: Routes = [
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(profileRoutes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule {}
