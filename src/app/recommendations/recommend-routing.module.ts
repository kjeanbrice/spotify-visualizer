import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RecommendComponent} from './recommendcomponent/recommend.component';
const routes: Routes = [
    {path: 'recommended', component: RecommendComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecommendRoutingModule { }
