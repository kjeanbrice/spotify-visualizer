import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PlaylistsComponent} from './playlistscomponent/playlists.component';
const routes: Routes = [
    {path: 'playlists', component: PlaylistsComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlaylistsRouterModule { }
