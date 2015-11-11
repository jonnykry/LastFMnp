'use strict';

var React = require('react');
var Dom = require('react-dom');

var Component = require('./Component.jsx');
var keys = require('./keys.json');

// input your own API key to keys.json to use this yourself
Dom.render(<Component username="jonnydoesmusic" api_key={keys.apikeys.key} />, document.getElementById("widgetContainer"));
