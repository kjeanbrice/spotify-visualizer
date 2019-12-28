import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SpotifyService } from '../services/spotify/spotify.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private spotifyService: SpotifyService, private router: Router) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.spotifyService.getUserProfile().pipe(
        map((res) => {
            console.log('Hello from AuthGuard: true');
            return true;
        }),
        catchError((err) => {
            window.location.href = window.location.href.includes('localhost') ?
            'http://localhost:8888/login' : 'https://spotifyvisualizer.herokuapp.com/login';
            return of(false);
        })
    );
  }
}
