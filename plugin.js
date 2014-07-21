// To use this widget, edit your username / api key into the URL
var xml = httpGet("http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=jonnydoesmusic&api_key=c64600ddca04dfc310703c59fe1b5230");

var track = xml.getElementsByTagName("track");
var i = 0;

// If you want album cover:

// src = track[0].getElementsByTagName("image")[0].childNodes[0].nodeValue;
// document.write("<img src='" + src + "'/>");

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
    artist = (track[0].getElementsByTagName("artist")[0].childNodes[0].nodeValue);
    song = (track[0].getElementsByTagName("name")[0].childNodes[0].nodeValue);
    streamable = (track[0].getElementsByTagName("streamable")[0].childNodes[0].nodeValue);
    album = (track[0].getElementsByTagName("album")[0].childNodes[0].nodeValue);
    
    // more album cover things

    //albumimg = (track[0].getElementsByTagName("image")[0].childNodes[0].nodeValue);
    //var imgobject = $("<img />").attr("src", albumimg);
    
    txt = "<div id='text'><marquee behavior='alternate' scrollamount='3' direction='left' width='425'> #np - " + artist + " - " + song + "</marquee></div>";
    return txt;
}