import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ArtistRoutingModule} from './artist-routing.module';
import {ArtistComponent} from './artistcomponent/artist.component';
import {MenuModule} from '../menu/menu.module';

@NgModule({
    imports: [
        CommonModule,
        ArtistRoutingModule,
        RouterModule,
        MenuModule
    ],
    declarations: [ArtistComponent],
    providers: [],
    exports: [ArtistComponent]
})
export class ArtistModule {
}
