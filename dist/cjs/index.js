'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var SendbirdProvider = require('./SendbirdProvider.js');
var App = require('./App.js');
var ChannelSettings = require('./ChannelSettings.js');
var ChannelList = require('./ChannelList.js');
var Channel = require('./Channel.js');
var LocalizationContext = require('./LocalizationContext-253833e3.js');
var OpenChannel = require('./OpenChannel.js');
var OpenChannelSettings = require('./OpenChannelSettings.js');
var MessageSearch = require('./MessageSearch.js');
var index = require('./index-ba566fa2.js');
var React = require('react');
require('prop-types');
require('sendbird');
require('./actionTypes-5d643716.js');
require('css-vars-ponyfill');
require('./index-b36bb0d8.js');
require('./LeaveChannel-8e141138.js');
require('./index-8f452e47.js');
require('./index-d30bcb18.js');
require('./utils-34763613.js');
require('./index-c7e62984.js');
require('./index-4cbbd5f7.js');
require('./index-478e7242.js');
require('./utils-7a073a7a.js');
require('./type-a2e61165.js');
require('./index-c74bfd29.js');
require('react-dom');
require('./utils-26f911d4.js');

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

exports.SendBirdProvider = SendbirdProvider;
exports.App = App;
exports.ChannelSettings = ChannelSettings;
exports.ChannelList = ChannelList;
exports.Channel = Channel['default'];
exports.getAllEmojisFromEmojiContainer = Channel.getAllEmojisFromEmojiContainer;
exports.getEmojiCategoriesFromEmojiContainer = Channel.getEmojiCategoriesFromEmojiContainer;
exports.getEmojisFromEmojiContainer = Channel.getEmojisFromEmojiContainer;
exports.getStringSet = LocalizationContext.getStringSet;
exports.withSendBird = LocalizationContext.withSendbirdContext;
exports.OpenChannel = OpenChannel['default'];
exports.OpenChannelSettings = OpenChannelSettings;
exports.MessageSearch = MessageSearch;
exports.sendBirdSelectors = index.selectors;
exports.useSendbirdStateContext = useSendbirdStateContext;
//# sourceMappingURL=index.js.map
