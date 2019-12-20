import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TrackComponent} from './trackcomponent/track.component';

const routes: Routes = [
    {path: 'track', component: TrackComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TrackRoutingModule {}
