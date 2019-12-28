import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ArtistComponent} from './artistcomponent/artist.component';
import {AuthGuard} from '../core/guards/auth.guard';

const routes: Routes = [
    {path: 'artist', component: ArtistComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArtistRoutingModule { }
