import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TopTracksComponent} from './toptrackscomponent/toptracks.component';
const routes: Routes = [
    {path: 'toptracks', component: TopTracksComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TopTracksRoutingModule { }
