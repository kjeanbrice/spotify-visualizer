import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RecentSongsComponent} from './recentsongscomponent/recentsongs.component';
import {AuthGuard} from '../core/guards/auth.guard';

const routes: Routes = [
    {path: 'recentsongs', component: RecentSongsComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecentSongsRoutingModule {}
