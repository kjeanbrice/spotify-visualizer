import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecentSongsRoutingModule} from './recentsongs-routing.module';
import {RecentSongsComponent} from './recentsongscomponent/recentsongs.component';
import {MenuModule} from '../menu/menu.module';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [CommonModule, RecentSongsRoutingModule, MenuModule, RouterModule],
    declarations: [RecentSongsComponent],
    providers: [],
    exports: [RecentSongsComponent]
})
export class RecentSongsModule {

}
