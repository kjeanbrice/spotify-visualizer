import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RecentSongsComponent} from './recentsongscomponent/recentsongs.component';

const routes: Routes = [
    {path: 'recentsongs', component: RecentSongsComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecentSongsRoutingModule {}
