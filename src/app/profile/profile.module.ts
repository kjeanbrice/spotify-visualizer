import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profilecomponent/profile.component';
import {ProfileRoutingModule} from './profile-routing.module';
import {MenuModule} from '../menu/menu.module';

@NgModule({
    declarations: [
        ProfileComponent,
    ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        MenuModule
    ],
    providers: [
    ],
    exports: [
        ProfileComponent
    ]
})
export class ProfileModule {}
