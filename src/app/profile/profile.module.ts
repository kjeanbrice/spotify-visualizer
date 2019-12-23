import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profilecomponent/profile.component';
import {ProfileRoutingModule} from './profile-routing.module';
import {MenuModule} from '../menu/menu.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        ProfileComponent,
    ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        MenuModule,
        RouterModule
    ],
    providers: [
    ],
    exports: [
        ProfileComponent
    ]
})
export class ProfileModule {}
