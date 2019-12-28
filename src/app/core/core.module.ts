import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpotifyService} from './services/spotify/spotify.service';
import {AuthGuard} from './guards/auth.guard';

@NgModule({
    imports: [CommonModule],
    declarations: [],
    providers: [SpotifyService, AuthGuard],
    exports: []
})
export class CoreModule {}
