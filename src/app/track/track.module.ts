import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrackRoutingModule} from './track-routing.module';
import {TrackComponent} from './trackcomponent/track.component';
import {MenuModule} from '../menu/menu.module';


@NgModule({
    imports: [
        CommonModule,
        MenuModule,
        TrackRoutingModule
    ],
    declarations: [TrackComponent],
    providers: [],
    exports: [TrackComponent]
})
export class TrackModule {}
