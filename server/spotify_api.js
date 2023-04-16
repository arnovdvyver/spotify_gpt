import queryString from 'query-string';
import * as dotenv from 'dotenv';
dotenv.config()

export class SpotifyAPI {
    _accessToken;
    _refreshToken;
    _currentScope;

    //get token
    async newToken(user_auth_code) {
        const data = {
        grant_type: 'authorization_code',
        code: user_auth_code,
        redirect_uri: 'http://localhost:3000/auth_user',
        };

        let response = await fetch('https://accounts.spotify.com/api/token', {
            method: "POST",
            body: queryString.stringify(data),
            headers: {
                'Authorization': 'Basic ' + btoa(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`),
                'Content-Type': 'application/x-www-form-urlencoded'
              }
        });

        let resp = await response.json();
        console.log(resp);

        //define tokens
        this._accessToken = resp.access_token;
        this._refreshToken = resp.refresh_token;
        this._currentScope = resp.scope;
    }
}