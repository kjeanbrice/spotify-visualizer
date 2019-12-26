import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlaylistsRouterModule} from './playlists-router.module';
import {PlaylistsComponent} from './playlistscomponent/playlists.component';
import {MenuModule} from '../menu/menu.module';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        PlaylistsRouterModule,
        MenuModule,
        RouterModule
    ],
    declarations: [
        PlaylistsComponent
    ],
    providers: [],
    exports: [PlaylistsComponent]

})
export class PlaylistsModule { }
