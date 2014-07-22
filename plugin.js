// To use this widget, edit your username / api key into the URL
// Please avoid using my key :')
var artist = null;
var song = null;
var streamable = null;
var album = null;
var albumimg = null;
var txt = "";

var xml = httpGet("http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=jonnydoesmusic&api_key=c64600ddca04dfc310703c59fe1b5230");

var track = xml.getElementsByTagName("track");
var i = 0;

var txt = displayTrack(track);

document.write(txt);

$("#widget").append(text);

function httpGet(theUrl)
{
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    return xmlHttp.responseXML;
}

function displayTrack(track)
{
    // Sometimes LastFM does not supply the image. This will account for it.
    // This occurs whenever there is a (feat. ____) tag on the current song.
    // Taking the song before it works.
    try {
        artist = (track[0].getElementsByTagName("artist")[0].childNodes[0].nodeValue);
        song = (track[0].getElementsByTagName("name")[0].childNodes[0].nodeValue);

        // Take prev. song instead
        if(song.indexOf('(') > -1) {
            artist = (track[1].getElementsByTagName("artist")[0].childNodes[0].nodeValue);
            song = (track[1].getElementsByTagName("name")[0].childNodes[0].nodeValue);
            album = (track[1].getElementsByTagName("album")[0].childNodes[0].nodeValue);
            albumimg = (track[1].getElementsByTagName("image")[0].childNodes[0].nodeValue);                 
        }
        else {
            // add in album and img from current song
            album = (track[0].getElementsByTagName("album")[0].childNodes[0].nodeValue);
            albumimg = (track[0].getElementsByTagName("image")[0].childNodes[0].nodeValue);   
        }
    } catch(err) {
        txt = "<div id='text'><a href='http://www.last.fm/user/jonnydoesmusic' target='_blank'>" 
        + "<img src='" + albumimg + "' style='padding-right: 5px;'/> #np - <strong>" + artist + '</strong> - "' + song + '"' + "</a></div>";
        return txt;
    }

    // This text contains the html that is appended to that page.
    // Edit the link to contain your username. 
    txt = "<div id='text'><a href='http://www.last.fm/user/jonnydoesmusic' target='_blank'>" 
    + "<img src='" + albumimg + "' style='padding-right: 5px;'/> #np - <strong>" + artist + '</strong> - "' + song + '"' + "</a></div>";
    return txt;
}