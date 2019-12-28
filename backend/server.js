var express = require('express');
var querystring = require('query-string');
require('dotenv').config({ path: '../.env'});
var request = require('request');
var app = express();
const path = require('path');

const port = process.env.PORT || 8888;
const redirect_link = process.env.REDIRECT_URI || 'http://localhost:8888/callback';


app.use(express.static(path.resolve(__dirname, '../dist/SpotifyProfile')));
app.get('/login', (req, res) => {
    const scopes = 'user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            client_id: process.env.SPOTIFY_CLIENT_ID,
            response_type: 'code',
            redirect_uri: redirect_link,
            scope: scopes
        })
    );
});

app.get('/callback', function (req, res) {
    let code = req.query.code || null
    let authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: redirect_link,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (Buffer.from(
                process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
            ).toString('base64'))
        },
        json: true
    };

    
    request.post(authOptions, function (error, response, body) {
        var access_token = body.access_token;

        let uri = process.env.FRONTEND_URI || 'http://localhost:8888/';
        res.redirect(uri + '?access_token=' + access_token);
    });
});

app.get('/refresh_token', function (req, res) {
    // requesting access token from refresh token
    const refresh_token = req.query.refresh_token;
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + (Buffer.from(
                process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
            ).toString('base64'))
        },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token,
        },
        json: true,
    };

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            const access_token = body.access_token;
            res.send({ access_token });
        }
    });
});

app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../dist/SpotifyProfile', 'index.html'));
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});