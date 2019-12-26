import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {TopArtistsRoutingModule} from './topartists-routing.module';
import {TopArtistsComponent} from './topartistscomponent/topartists.component';
import {MenuModule} from '../menu/menu.module';

@NgModule({
    imports: [
        CommonModule,
        TopArtistsRoutingModule,
        RouterModule,
        MenuModule
    ],
    declarations: [TopArtistsComponent],
    providers: [],
    exports: [TopArtistsComponent]
})
export class TopArtistsModule {
}
