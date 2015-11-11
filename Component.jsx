'use strict';

var React = require('react');
var request = require('request');

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

        request({url: url, json: true}, function(err, res, json) {
            res.header("Access-Control-Allow-Origin", req.headers.origin);
            res.header('Access-Control-Allow-Origin', 'http://localhost:8080/');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            if (err) {
                throw err;
            }
            console.log(json);
        });

        //http.get(url, function(res) {
        //    var body = '';
        //    res.on('data', function (chunk) {
        //        body += chunk;
        //    });
        //    res.on('end', function() {
        //        _this.setState({
        //            lastFMData: JSON.parse(body)
        //        });
        //    });
        //}).on('error', function(e) {
        //    console.log('Error:  Could not receive tracks for username and API key.');
        //});
    },

    _getTrack: function(trackData) {
        var component = '';
        var text = '#text';

        if (trackData.recenttracks) {
            var data = trackData.recenttracks;
            component = (
                <a href={'http://www.last.fm/user/' + this.props.username} target='_blank'>
                    <img className="widget-img" src={data.track[0].image[0]['#text']}/>
                    {'#np - ' + data.track[0].artist['#text'] + ' - "' + data.track[0].name + '"'}
                </a>);
        }

        return component;
    },

    render: function() {
        var lastFMData = this.state.lastFMData;
        var track = this._getTrack(lastFMData);

        return (
                <div id='widget'>
                    {track}
                </div>
                );
    }

});

module.exports = Component;
