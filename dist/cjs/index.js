'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var SendbirdProvider = require('./SendbirdProvider.js');
var App = require('./App.js');
var ChannelSettings = require('./ChannelSettings.js');
var ChannelList = require('./ChannelList.js');
var Channel = require('./Channel.js');
var LocalizationContext = require('./LocalizationContext-9319934a.js');
var OpenChannel = require('./OpenChannel.js');
var OpenChannelSettings = require('./OpenChannelSettings.js');
var MessageSearch = require('./MessageSearch.js');
var index = require('./index-b65c7b33.js');
var React = require('react');
require('prop-types');
require('sendbird');
require('./actionTypes-881e675a.js');
require('css-vars-ponyfill');
require('./index-3f565819.js');
require('./LeaveChannel-98ec2568.js');
require('./index-6f3ccdcb.js');
require('./index-5e5ae32b.js');
require('./utils-1590929e.js');
require('./index-f2a5172d.js');
require('./utils-cff6dc93.js');
require('./type-0e0e9a10.js');
require('./index-0af05ad6.js');
require('./index-6be24c2e.js');
require('./index-a3bd96db.js');
require('react-dom');
require('./utils-f61b79ef.js');

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
