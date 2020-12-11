import { b as _slicedToArray } from './LocalizationContext-619bafba.js';
import Sendbird from './SendbirdProvider.js';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import 'sendbird';
import './actionTypes-a85c0eaa.js';
import 'css-vars-ponyfill';
import './index-ec3bf9fe.js';
import ChannelList from './ChannelList.js';
import './utils-53ba1773.js';
import './index-aebda3d2.js';
import './LeaveChannel-da8b5d0b.js';
import 'date-fns/isToday';
import 'date-fns/format';
import 'date-fns/isYesterday';
import './type-0296584d.js';
import './utils-cfdeb084.js';
import 'react-dom';
import './index-aa89d60a.js';
import Conversation from './Channel.js';
import './index-19f570c9.js';
import 'date-fns/isSameDay';
import './utils-d7f59026.js';
import 'date-fns/formatDistanceToNowStrict';
import ChannelSettings from './ChannelSettings.js';
import './index-8abf69b8.js';

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

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      currentChannelUrl = _useState2[0],
      setCurrentChannelUrl = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      showSettings = _useState4[0],
      setShowSettings = _useState4[1];

  return React.createElement(Sendbird, {
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
  }, React.createElement("div", {
    className: "sendbird-app__wrap"
  }, React.createElement("div", {
    className: "sendbird-app__channellist-wrap"
  }, React.createElement(ChannelList, {
    allowProfileEdit: allowProfileEdit,
    onProfileEditSuccess: onProfileEditSuccess,
    onChannelSelect: function onChannelSelect(channel) {
      if (channel && channel.url) {
        setCurrentChannelUrl(channel.url);
      } else {
        setCurrentChannelUrl('');
      }
    }
  })), React.createElement("div", {
    className: "\n            ".concat(showSettings ? 'sendbird-app__conversation--settings-open' : '', "\n            sendbird-app__conversation-wrap\n          ")
  }, React.createElement(Conversation, {
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
  })), showSettings && React.createElement("div", {
    className: "sendbird-app__settingspanel-wrap"
  }, React.createElement(ChannelSettings, {
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

export default App;
//# sourceMappingURL=App.js.map
