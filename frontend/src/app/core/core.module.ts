import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpotifyService} from './services/spotify/spotify.service';

@NgModule({
    imports: [CommonModule],
    declarations: [],
    providers: [SpotifyService],
    exports: []
})
export class CoreModule {}
