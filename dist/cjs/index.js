'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var LocalizationContext = require('./LocalizationContext-96132df1.js');
var SendbirdProvider = require('./SendbirdProvider.js');
var React = require('react');
var React__default = _interopDefault(React);
require('prop-types');
require('sendbird');
require('./actionTypes-920b541f.js');
require('css-vars-ponyfill');
var index$1 = require('./index-7bb6095b.js');
var ChannelList = require('./ChannelList.js');
require('./index-733abb37.js');
require('./index-944fbc98.js');
require('./utils-6aedec02.js');
require('./LeaveChannel-8f107f63.js');
require('date-fns/isToday');
require('date-fns/format');
require('date-fns/isYesterday');
require('./type-c7a3bee7.js');
require('./utils-a8277ca2.js');
require('react-dom');
require('./index-f441aa10.js');
var Channel = require('./Channel.js');
require('./index-04d33fe2.js');
require('date-fns/isSameDay');
require('./utils-c8e36c68.js');
require('date-fns/formatDistanceToNowStrict');
var ChannelSettings = require('./ChannelSettings.js');
require('./index-c092ddb7.js');
var App = require('./App.js');
var MessageSearch = require('./MessageSearch.js');
var OpenChannel = require('./OpenChannel.js');
var OpenChannelSettings = require('./OpenChannelSettings.js');

/**
 * Example:
 * const MyComponent = () => {
 *  const context = useSendbirdStateContext();
 *  const sdk = sendbirdSelectors.getSdk(context);
 *  return (<div>...</div>);
 * }
 */

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
exports.MessageSearch = MessageSearch;
exports.OpenChannel = OpenChannel.default;
exports.OpenChannelSettings = OpenChannelSettings;
exports.useSendbirdStateContext = useSendbirdStateContext;
//# sourceMappingURL=index.js.map
