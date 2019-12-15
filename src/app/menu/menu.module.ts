import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuComponent} from './menucomponent/menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [MenuComponent],
    imports: [
        CommonModule,
        RouterModule
    ],
    providers: [],
    exports: [MenuComponent]
})
export class MenuModule {
}
