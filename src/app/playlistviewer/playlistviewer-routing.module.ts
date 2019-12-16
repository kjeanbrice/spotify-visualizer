import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PlaylistViewerComponent} from './playlistviewercomponent/playlistviewer.component';

const routes: Routes = [
    {path: 'playlist', component: PlaylistViewerComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlaylistViewerRoutingModule {}
