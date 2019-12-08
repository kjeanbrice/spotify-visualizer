import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuComponent} from './menucomponent/menu.component';

@NgModule({
    declarations: [MenuComponent],
    imports: [CommonModule],
    providers: [],
    exports: [MenuComponent]
})
export class MenuModule {
}
