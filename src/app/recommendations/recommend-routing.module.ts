import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RecommendComponent} from './recommendcomponent/recommend.component';
import {AuthGuard} from '../core/guards/auth.guard';
const routes: Routes = [
    {path: 'recommended', component: RecommendComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecommendRoutingModule { }
