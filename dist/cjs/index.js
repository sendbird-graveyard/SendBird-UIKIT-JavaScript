'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var LocalizationContext = require('./LocalizationContext-12a9343d.js');
var SendbirdProvider = require('./SendbirdProvider.js');
var React = require('react');
var React__default = _interopDefault(React);
require('prop-types');
require('sendbird');
require('./actionTypes-920b541f.js');
require('css-vars-ponyfill');
var index$1 = require('./index-2a2230b8.js');
var ChannelList = require('./ChannelList.js');
require('./index-9431d920.js');
require('./utils-6aedec02.js');
require('./LeaveChannel-c93b4597.js');
require('date-fns/isToday');
require('date-fns/format');
require('date-fns/isYesterday');
require('./type-c7a3bee7.js');
require('./utils-a8277ca2.js');
require('react-dom');
require('./index-a8367321.js');
var Channel = require('./Channel.js');
require('./index-5fe9ee1f.js');
require('date-fns/isSameDay');
require('./utils-c8e36c68.js');
require('date-fns/formatDistanceToNowStrict');
var ChannelSettings = require('./ChannelSettings.js');
require('./index-ccc7b14d.js');
var App = require('./App.js');
var OpenChannel = require('./OpenChannel.js');
var OpenChannelSettings = require('./OpenChannelSettings.js');

function useSendbirdStateContext() {
  var context = React.useContext(LocalizationContext.SendbirdSdkContext);
  return context;
}

exports.getStringSet = LocalizationContext.getStringSet;
exports.withSendBird = LocalizationContext.withSendbirdContext;
exports.SendBirdProvider = SendbirdProvider;
exports.sendBirdSelectors = index$1.selectors;
exports.ChannelList = ChannelList;
exports.Channel = Channel.default;
exports.getAllEmojisFromEmojiContainer = Channel.getAllEmojisFromEmojiContainer;
exports.getEmojiCategoriesFromEmojiContainer = Channel.getEmojiCategoriesFromEmojiContainer;
exports.getEmojisFromEmojiContainer = Channel.getEmojisFromEmojiContainer;
exports.ChannelSettings = ChannelSettings;
exports.App = App;
exports.OpenChannel = OpenChannel.default;
exports.OpenChannelSettings = OpenChannelSettings;
exports.useSendbirdStateContext = useSendbirdStateContext;
//# sourceMappingURL=index.js.map
