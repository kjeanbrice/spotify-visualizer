import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Feather from 'feather-icons';
import { SpotifyService } from '../../core/services/spotify/spotify.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

    loadingStatus: string;
    map: Map<string, number>;
    constructor(private route: ActivatedRoute, private router: Router, private spotifyService: SpotifyService) {
        this.map = new Map<string, number>();
        this.map.set('authenticate', 0);
        this.loadingStatus = ' ';
    }

    ngOnInit(): void {
        const token = this.route.snapshot.queryParamMap.get('access_token');
        this.spotifyService.authenticate(token).subscribe(
            (data) => {
                this.router.navigate(['/profile']);
                this.map.delete('authenticate');
                setTimeout(() => {
                    this.checkLoadingStatus();
                }, 5000);
            },
            (err) => {
                this.map.delete('authenticate');
                this.checkLoadingStatus();
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

    checkLoadingStatus() {
        if (this.map.size === 0) {
            this.loadingStatus = 'hide-content';
        }
    }
}
