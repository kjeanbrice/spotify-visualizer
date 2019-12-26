import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TopArtistsComponent} from './topartistscomponent/topartists.component';
const routes: Routes = [
    {path: 'topartists', component: TopArtistsComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TopArtistsRoutingModule { }
