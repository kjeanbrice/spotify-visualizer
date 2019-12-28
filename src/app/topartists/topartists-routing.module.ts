import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TopArtistsComponent} from './topartistscomponent/topartists.component';
import {AuthGuard} from '../core/guards/auth.guard';

const routes: Routes = [
    {path: 'topartists', component: TopArtistsComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TopArtistsRoutingModule { }
