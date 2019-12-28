import 'circular-std';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CoreModule} from './core/core.module';
import {HomeModule} from './home/home.module';
import {MenuModule} from './menu/menu.module';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ProfileModule} from './profile/profile.module';
import {RecentSongsModule} from './recentsongs/recentsongs.module';
import {PlaylistsModule} from './playlists/playlists.module';
import {TopTracksModule} from './toptracks/toptracks.module';
import { AppComponent } from './app.component';
import {PlaylistViewerModule} from './playlistviewer/playlistviewer.module';
import {TrackModule} from './track/track.module';
import {TopArtistsModule} from './topartists/topartists.module';
import {ArtistModule} from './artist/artist.module';
import {RecommendModule} from './recommendations/recommend.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    TopTracksModule,
    AppRoutingModule,
    HttpClientModule,
    MenuModule,
    ProfileModule,
    RecentSongsModule,
    PlaylistsModule,
    PlaylistViewerModule,
    TrackModule,
    TopArtistsModule,
    ArtistModule,
    RecommendModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
