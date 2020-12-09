'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var LocalizationContext = require('./LocalizationContext-7c9df62c.js');
var SendbirdProvider = require('./SendbirdProvider.js');
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
require('sendbird');
require('./actionTypes-920b541f.js');
require('css-vars-ponyfill');
require('./index-710314fd.js');
var ChannelList = require('./ChannelList.js');
require('./utils-6aedec02.js');
require('./index-64dcc5d9.js');
require('./LeaveChannel-cb2a36b0.js');
require('date-fns/isToday');
require('date-fns/format');
require('date-fns/isYesterday');
require('./type-c7a3bee7.js');
require('./utils-a8277ca2.js');
require('react-dom');
require('./index-6ca9e95e.js');
var Channel = require('./Channel.js');
require('./index-95b18747.js');
require('date-fns/isSameDay');
require('./utils-c8e36c68.js');
require('date-fns/formatDistanceToNowStrict');
var ChannelSettings = require('./ChannelSettings.js');
require('./index-c4d028d8.js');

function App(props) {
  var appId = props.appId,
      userId = props.userId,
      accessToken = props.accessToken,
      theme = props.theme,
      userListQuery = props.userListQuery,
      nickname = props.nickname,
      profileUrl = props.profileUrl,
      _props$config = props.config,
      config = _props$config === void 0 ? {} : _props$config,
      useReaction = props.useReaction,
      useMessageGrouping = props.useMessageGrouping,
      colorSet = props.colorSet,
      stringSet = props.stringSet,
      allowProfileEdit = props.allowProfileEdit,
      disableUserProfile = props.disableUserProfile,
      renderUserProfile = props.renderUserProfile,
      onProfileEditSuccess = props.onProfileEditSuccess;

  var _useState = React.useState(null),
      _useState2 = LocalizationContext._slicedToArray(_useState, 2),
      currentChannelUrl = _useState2[0],
      setCurrentChannelUrl = _useState2[1];

  var _useState3 = React.useState(false),
      _useState4 = LocalizationContext._slicedToArray(_useState3, 2),
      showSettings = _useState4[0],
      setShowSettings = _useState4[1];

  return React__default.createElement(SendbirdProvider, {
    stringSet: stringSet,
    appId: appId,
    userId: userId,
    accessToken: accessToken,
    theme: theme,
    nickname: nickname,
    profileUrl: profileUrl,
    userListQuery: userListQuery,
    config: config,
    colorSet: colorSet,
    disableUserProfile: disableUserProfile,
    renderUserProfile: renderUserProfile
  }, React__default.createElement("div", {
    className: "sendbird-app__wrap"
  }, React__default.createElement("div", {
    className: "sendbird-app__channellist-wrap"
  }, React__default.createElement(ChannelList, {
    allowProfileEdit: allowProfileEdit,
    onProfileEditSuccess: onProfileEditSuccess,
    onChannelSelect: function onChannelSelect(channel) {
      if (channel && channel.url) {
        setCurrentChannelUrl(channel.url);
      } else {
        setCurrentChannelUrl('');
      }
    }
  })), React__default.createElement("div", {
    className: "\n            ".concat(showSettings ? 'sendbird-app__conversation--settings-open' : '', "\n            sendbird-app__conversation-wrap\n          ")
  }, React__default.createElement(Channel.default, {
    channelUrl: currentChannelUrl,
    onChatHeaderActionClick: function onChatHeaderActionClick() {
      if (showSettings) {
        setShowSettings(false);
      } else {
        setShowSettings(true);
      }
    },
    useReaction: useReaction,
    useMessageGrouping: useMessageGrouping
  })), showSettings && React__default.createElement("div", {
    className: "sendbird-app__settingspanel-wrap"
  }, React__default.createElement(ChannelSettings, {
    channelUrl: currentChannelUrl,
    onCloseClick: function onCloseClick() {
      setShowSettings(false);
    }
  }))));
}
App.propTypes = {
  appId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  accessToken: PropTypes.string,
  theme: PropTypes.string,
  userListQuery: PropTypes.func,
  nickname: PropTypes.string,
  profileUrl: PropTypes.string,
  allowProfileEdit: PropTypes.bool,
  disableUserProfile: PropTypes.bool,
  renderUserProfile: PropTypes.func,
  onProfileEditSuccess: PropTypes.func,
  config: PropTypes.shape({
    // None Error Warning Info 'All/Debug'
    logLevel: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  }),
  useReaction: PropTypes.bool,
  useMessageGrouping: PropTypes.bool,
  stringSet: PropTypes.objectOf(PropTypes.string),
  colorSet: PropTypes.objectOf(PropTypes.string)
};
App.defaultProps = {
  accessToken: '',
  theme: 'light',
  nickname: '',
  profileUrl: '',
  userListQuery: null,
  allowProfileEdit: false,
  onProfileEditSuccess: null,
  disableUserProfile: false,
  renderUserProfile: null,
  config: {},
  useReaction: true,
  useMessageGrouping: true,
  stringSet: null,
  colorSet: null
};

module.exports = App;
//# sourceMappingURL=App.js.map
