import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecentSongsRoutingModule} from './recentsongs-routing.module';
import {RecentSongsComponent} from './recentsongscomponent/recentsongs.component';
import {MenuModule} from '../menu/menu.module';

@NgModule({
    imports: [CommonModule, RecentSongsRoutingModule, MenuModule],
    declarations: [RecentSongsComponent],
    providers: [],
    exports: [RecentSongsComponent]
})
export class RecentSongsModule {

}
