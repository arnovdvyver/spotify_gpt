import { SpotifyAPI } from './spotify_api.js';
import QueryString from 'qs';
import express from 'express'
import * as dotenv from 'dotenv';
dotenv.config()


const app = express();
const port = 3000;
const controller = new SpotifyAPI();

//home
app.get("/", (req, res) => {
    res.send("Hometown");
});


//login
app.get("/login", (req, res) => {
    res.redirect('https://accounts.spotify.com/authorize?' +
    QueryString.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: 'user-read-private user-read-email',
      redirect_uri: encodeURI("http://localhost:3000/auth_user"),
    }));
});

//get user token
app.get("/auth_user", (req, res) => {
    controller.newToken(req.query.code)
        .then(() => {
            res.redirect("https://localhost:3000");
        });
});

//request album
app.get("/search", (req, res) => {
    
});





//port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});