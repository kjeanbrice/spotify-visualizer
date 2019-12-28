import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PlaylistViewerComponent} from './playlistviewercomponent/playlistviewer.component';
import {AuthGuard} from '../core/guards/auth.guard';

const routes: Routes = [
    {path: 'playlist', component: PlaylistViewerComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlaylistViewerRoutingModule {}
