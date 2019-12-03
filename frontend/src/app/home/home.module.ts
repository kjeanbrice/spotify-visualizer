import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './homecomponent/home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        HomeRoutingModule
    ],
    exports: [HomeComponent],
    providers: []
})
export class HomeModule {}
