import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TopTracksComponent} from './toptrackscomponent/toptracks.component';
import {AuthGuard} from '../core/guards/auth.guard';

const routes: Routes = [
    {path: 'toptracks', component: TopTracksComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TopTracksRoutingModule { }
