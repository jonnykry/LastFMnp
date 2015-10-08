var React = require('react');

var Component = require('./components/Component.jsx');
var keys = require('../keys.json');

React.render(<Component username="jonnydoesmusic" api_key={keys.apikeys.key} />, document.body);
