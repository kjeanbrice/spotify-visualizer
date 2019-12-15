import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlaylistsRouterModule} from './playlists-router.module';
import {PlaylistsComponent} from './playlistscomponent/playlists.component';
import {MenuModule} from '../menu/menu.module';

@NgModule({
    imports: [
        CommonModule,
        PlaylistsRouterModule,
        MenuModule
    ],
    declarations: [
        PlaylistsComponent
    ],
    providers: [],
    exports: [PlaylistsComponent]

})
export class PlaylistsModule { }
