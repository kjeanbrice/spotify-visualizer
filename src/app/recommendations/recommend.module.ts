import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {RecommendRoutingModule} from './recommend-routing.module';
import {RecommendComponent} from './recommendcomponent/recommend.component';
import {MenuModule} from '../menu/menu.module';

@NgModule({
    imports: [
        CommonModule,
        RecommendRoutingModule,
        RouterModule,
        MenuModule
    ],
    declarations: [RecommendComponent],
    providers: [],
    exports: [RecommendComponent]
})
export class RecommendModule {
}
