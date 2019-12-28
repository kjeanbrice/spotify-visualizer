import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TrackComponent} from './trackcomponent/track.component';
import {AuthGuard} from '../core/guards/auth.guard';

const routes: Routes = [
    {path: 'track', component: TrackComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TrackRoutingModule {}
