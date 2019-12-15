import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TopTracksRoutingModule} from './toptracks-routing.module';
import {TopTracksComponent} from './toptrackscomponent/toptracks.component';
import {MenuModule} from '../menu/menu.module';


@NgModule({
    imports: [
        CommonModule,
        TopTracksRoutingModule,
        MenuModule
    ],
    declarations: [
        TopTracksComponent
    ],
    exports: [TopTracksComponent]

})
export class TopTracksModule {}


