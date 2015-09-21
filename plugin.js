
// To re-use this component, you must enter your own strings below
var LASTFM_USERNAME = 'jonnydoesmusic';
var LASTFM_URL = 'http://www.last.fm/user/jonnydoesmusic';

// For the API key, add a key to keys.json in the root directory with the same format as below
//
// {
//    "apikeys": {
//        "lastfm": YOUR_KEY_HERE
//    }
// }
//

$(document).ready( function() {
    var artist = null;
    var song = null;
    var album = null;
    var albumimg = null;
    var widgetSelector = $('#widget');

    $.ajax({
        dataType: 'json',
        url: 'keys.json',
        success: function(response) {
            var url = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=' + LASTFM_USERNAME + '&api_key=' + response.apikeys.lastfm;

            // Request data from LastFM
            $.ajax({
                url: url,
                success: function(response) {
                    displayTrack(response.getElementsByTagName('track'));
                }
            });
        }
    });

    function displayTrack(track)
    {

        // Sometimes LastFM does not supply the image, which throws an error
        // We account for this with the try/catch.
        try {
            song = (track[0].getElementsByTagName("name")[0].childNodes[0].nodeValue);

            // Take previous song if current one hasn't loaded
            if(song.indexOf('(') > -1) {
                artist = (track[1].getElementsByTagName("artist")[0].childNodes[0].nodeValue);
                song = (track[1].getElementsByTagName("name")[0].childNodes[0].nodeValue);
                album = (track[1].getElementsByTagName("album")[0].childNodes[0].nodeValue);
                albumimg = (track[1].getElementsByTagName("image")[0].childNodes[0].nodeValue);
            }
            else {
                // add in album and img from current song
                artist = (track[0].getElementsByTagName("artist")[0].childNodes[0].nodeValue);
                album = (track[0].getElementsByTagName("album")[0].childNodes[0].nodeValue);
                albumimg = (track[0].getElementsByTagName("image")[0].childNodes[0].nodeValue);
            }
        } catch(err) {
            text = "<a href='" + LASTFM_URL + "' target='_blank'>"
                + "<img src='" + albumimg + "' style='padding-right: 5px;'/> #np - <strong>" + artist + ' - "' + song + '"' + "</strong></a>";
            widgetSelector.append(text);
            return text;
        }

        // This text contains the html that is appended to that page.
        text = "<a href='" + LASTFM_URL + "' target='_blank'>"
            + "<img src='" + albumimg + "' style='padding-right: 5px;'/> #np - <strong>" + artist + ' - "' + song + '"' + "</strong></a>";
        widgetSelector.append(text);
        return text;
    }

});
