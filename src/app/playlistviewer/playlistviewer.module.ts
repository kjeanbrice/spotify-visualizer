import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlaylistViewerRoutingModule} from './playlistviewer-routing.module';
import {PlaylistViewerComponent} from './playlistviewercomponent/playlistviewer.component';
import {MenuModule} from '../menu/menu.module';

@NgModule({
    imports: [
        CommonModule,
        MenuModule,
        PlaylistViewerRoutingModule
    ],
    declarations: [PlaylistViewerComponent],
    providers: [],
    exports: [PlaylistViewerComponent]
})
export class PlaylistViewerModule {}
