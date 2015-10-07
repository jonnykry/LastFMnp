var React = require('react');
var http = require('http');
var $ = require('jquery');

var Component = React.createClass({

    getDefaultProps: function() {
        return {
            'username': '',            
            'api_key': ''
        };
    },

    getInitialState: function() {
        return {
            'lastFMData': {}
        };
    },

    componentDidMount: function() {
        var url = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=' + this.props.username + '&api_key=' + this.props.api_key + '&format=json';
        var _this = this;
        http.get(url, function(res) {
            var body = '';
            res.on('data', function (chunk) {
                body += chunk;
            });
            res.on('end', function() {
                _this.setState({
                    lastFMData: JSON.parse(body)
                });
            });
        }).on('error', function(e) {
            console.err('Error:  Could not receive tracks for username and API key.');
        });
    },

    _getTrack: function(trackData) {
        var component = '';
        var componentText = '';
        var text = '#text';
        var LASTFM_URL = 'http://www.last.fm/user/' + this.props.username;

        if (trackData) {
            componentText = '#np - ' + trackData.track[0].artist['#text'] + ' - "' + trackData.track[0].name + '"';
            component = <a href={LASTFM_URL} target='_blank'><img className="widget-img" src={trackData.track[0].image[0]['#text']}/>{componentText}</a>;
        }

        return component;
    },

    render: function() {
        var lastFMData = this.state.lastFMData;
        console.log(lastFMData);
        var track = this._getTrack(lastFMData.recenttracks);

        return (
                <div id='widget'>
                    {track}
                </div>
                );
    }

});

module.exports = Component;
