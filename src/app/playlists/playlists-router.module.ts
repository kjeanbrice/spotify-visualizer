import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PlaylistsComponent} from './playlistscomponent/playlists.component';
import {AuthGuard} from '../core/guards/auth.guard';

const routes: Routes = [
    {path: 'playlists', component: PlaylistsComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlaylistsRouterModule { }
