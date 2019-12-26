import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ArtistComponent} from './artistcomponent/artist.component';
const routes: Routes = [
    {path: 'artist', component: ArtistComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArtistRoutingModule { }
