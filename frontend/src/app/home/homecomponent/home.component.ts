import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as Feather from 'feather-icons';
import {SpotifyService} from '../../core/services/spotify/spotify.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
    constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) {
    }

    ngOnInit(): void {
        const token = this.route.snapshot.queryParamMap.get('access_token');
        this.spotifyService.authenticate(token).subscribe(
            (data) => {
                console.log('Success:Redirect');
                console.log(JSON.stringify(data));
            },
            (err) => {
                console.log('err:' + JSON.stringify(err));
            }
        );
    }



    ngAfterViewInit() {
        Feather.replace();
    }
}
