import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as Feather from 'feather-icons';
import {SpotifyService} from '../../core/services/spotify/spotify.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
    constructor(private route: ActivatedRoute, private router: Router , private spotifyService: SpotifyService) {
    }

    ngOnInit(): void {
        const token = this.route.snapshot.queryParamMap.get('access_token');
        this.spotifyService.authenticate(token).subscribe(
            (data) => {
                this.router.navigate(['/profile']);
            },
            (err) => {
            }
        );
    }



    ngAfterViewInit() {
        Feather.replace();
    }

    onLogin() {
        window.location.href = window.location.href.includes('localhost') ?
        'http://localhost:8888/login' : 'https://spotifyvisualizer.herokuapp.com/login';
    }
}
