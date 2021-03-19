import { d as LocalizationContext, b as _slicedToArray } from './LocalizationContext-12658c38.js';
import Sendbird from './SendbirdProvider.js';
import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import 'sendbird';
import './actionTypes-a85c0eaa.js';
import 'css-vars-ponyfill';
import { I as IconButton } from './index-711ec843.js';
import ChannelList from './ChannelList.js';
import './index-4eb938ab.js';
import { L as Label, a as LabelTypography, b as LabelColors, I as Icon, c as IconTypes, d as IconColors, h as Loader } from './index-ad616be9.js';
import './utils-53ba1773.js';
import './LeaveChannel-2c2f8e8e.js';
import 'date-fns/isToday';
import 'date-fns/format';
import 'date-fns/isYesterday';
import './type-0296584d.js';
import './utils-cfdeb084.js';
import 'react-dom';
import './index-5788a124.js';
import Conversation from './Channel.js';
import './index-aeef4ba5.js';
import 'date-fns/isSameDay';
import './utils-d7f59026.js';
import 'date-fns/formatDistanceToNowStrict';
import ChannelSettings from './ChannelSettings.js';
import './index-70190ac9.js';
import MessageSearch from './MessageSearch.js';

var COMPONENT_CLASS_NAME = 'sendbird-message-search-pannel';

function MessageSearchPannel(props) {
  var channelUrl = props.channelUrl,
      onResultClick = props.onResultClick,
      onCloseClick = props.onCloseClick;

  var _a = useState(''),
      searchString = _a[0],
      setSearchString = _a[1];

  var _b = useState(''),
      inputString = _b[0],
      setInputString = _b[1];

  var _c = useState(false),
      loading = _c[0],
      setLoading = _c[1];

  var stringSet = useContext(LocalizationContext).stringSet;
  var timeout = null;
  useEffect(function () {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(function () {
      setSearchString(inputString);
      setLoading(true);
      timeout = null;
    }, 500);
  }, [inputString]);

  var handleOnChangeInputString = function handleOnChangeInputString(e) {
    setInputString(e.target.value);
  };

  var handleOnResultLoaded = function handleOnResultLoaded() {
    setLoading(false);
  };

  var handleOnClickResetStringButton = function handleOnClickResetStringButton(e) {
    e.stopPropagation();
    setInputString('');
    setSearchString('');
  };

  return React.createElement("div", {
    className: COMPONENT_CLASS_NAME
  }, React.createElement("div", {
    className: COMPONENT_CLASS_NAME + "__header"
  }, React.createElement(Label, {
    className: COMPONENT_CLASS_NAME + "__header__title",
    type: LabelTypography.H_2,
    color: LabelColors.ONBACKGROUND_1
  }, stringSet.SEARCH_IN_CHANNEL), React.createElement(IconButton, {
    className: COMPONENT_CLASS_NAME + "__header__close-button",
    width: "32px",
    height: "32px",
    onClick: onCloseClick
  }, React.createElement(Icon, {
    type: IconTypes.CLOSE,
    fillColor: IconColors.ON_BACKGROUND_1,
    width: "22px",
    height: "22px"
  }))), React.createElement("div", {
    className: COMPONENT_CLASS_NAME + "__input"
  }, React.createElement("div", {
    className: COMPONENT_CLASS_NAME + "__input__container"
  }, React.createElement(Icon, {
    className: COMPONENT_CLASS_NAME + "__input__container__search-icon",
    type: IconTypes.SEARCH,
    fillColor: IconColors.ON_BACKGROUND_3,
    width: "24px",
    height: "24px"
  }), React.createElement("input", {
    className: COMPONENT_CLASS_NAME + "__input__container__input-area",
    placeholder: stringSet.SEARCH,
    value: inputString,
    onChange: handleOnChangeInputString
  }), inputString && loading && React.createElement(Loader, {
    className: COMPONENT_CLASS_NAME + "__input__container__spinner",
    width: "20px",
    height: "20px"
  }, React.createElement(Icon, {
    type: IconTypes.SPINNER,
    fillColor: IconColors.PRIMARY,
    width: "20px",
    height: "20px"
  })), !loading && inputString && React.createElement(Icon, {
    className: COMPONENT_CLASS_NAME + "__input__container__reset-input-button",
    type: IconTypes.REMOVE,
    fillColor: IconColors.ON_BACKGROUND_3,
    width: "20px",
    height: "20px",
    onClick: handleOnClickResetStringButton
  }))), React.createElement("div", {
    className: COMPONENT_CLASS_NAME + "__message-search"
  }, React.createElement(MessageSearch, {
    channelUrl: channelUrl,
    searchString: searchString,
    onResultClick: onResultClick,
    onResultLoaded: handleOnResultLoaded
  })));
}

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
      showSearchIcon = props.showSearchIcon,
      onProfileEditSuccess = props.onProfileEditSuccess,
      imageCompression = props.imageCompression;

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      currentChannelUrl = _useState2[0],
      setCurrentChannelUrl = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      showSettings = _useState4[0],
      setShowSettings = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      showSearch = _useState6[0],
      setShowSearch = _useState6[1];

  var _useState7 = useState(null),
      _useState8 = _slicedToArray(_useState7, 2),
      highlightedMessage = _useState8[0],
      setHighlightedMessage = _useState8[1];

  var _useState9 = useState(null),
      _useState10 = _slicedToArray(_useState9, 2),
      startingPoint = _useState10[0],
      setStartingPoint = _useState10[1];

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
    renderUserProfile: renderUserProfile,
    imageCompression: imageCompression
  }, React.createElement("div", {
    className: "sendbird-app__wrap"
  }, React.createElement("div", {
    className: "sendbird-app__channellist-wrap"
  }, React.createElement(ChannelList, {
    allowProfileEdit: allowProfileEdit,
    onProfileEditSuccess: onProfileEditSuccess,
    onChannelSelect: function onChannelSelect(channel) {
      setStartingPoint(null);
      setHighlightedMessage(null);

      if (channel && channel.url) {
        setCurrentChannelUrl(channel.url);
      } else {
        setCurrentChannelUrl('');
      }
    }
  })), React.createElement("div", {
    className: "\n            ".concat(showSettings ? 'sendbird-app__conversation--settings-open' : '', "\n            ").concat(showSearch ? 'sendbird-app__conversation--search-open' : '', "\n            sendbird-app__conversation-wrap\n          ")
  }, React.createElement(Conversation, {
    channelUrl: currentChannelUrl,
    onChatHeaderActionClick: function onChatHeaderActionClick() {
      setShowSearch(false);
      setShowSettings(!showSettings);
    },
    onSearchClick: function onSearchClick() {
      setShowSettings(false);
      setShowSearch(!showSearch);
    },
    showSearchIcon: showSearchIcon,
    startingPoint: startingPoint,
    highlightedMessage: highlightedMessage,
    useReaction: useReaction,
    useMessageGrouping: useMessageGrouping
  })), showSettings && React.createElement("div", {
    className: "sendbird-app__settingspanel-wrap"
  }, React.createElement(ChannelSettings, {
    className: "sendbird-channel-settings",
    channelUrl: currentChannelUrl,
    onCloseClick: function onCloseClick() {
      setShowSettings(false);
    }
  })), showSearch && React.createElement("div", {
    className: "sendbird-app__searchpanel-wrap"
  }, React.createElement(MessageSearchPannel, {
    channelUrl: currentChannelUrl,
    onResultClick: function onResultClick(message) {
      if (message.messageId === highlightedMessage) {
        setHighlightedMessage(null);
        setTimeout(function () {
          setHighlightedMessage(message.messageId);
        });
      } else {
        setStartingPoint(message.createdAt);
        setHighlightedMessage(message.messageId);
      }
    },
    onCloseClick: function onCloseClick() {
      setShowSearch(false);
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
  showSearchIcon: PropTypes.bool,
  useMessageGrouping: PropTypes.bool,
  stringSet: PropTypes.objectOf(PropTypes.string),
  colorSet: PropTypes.objectOf(PropTypes.string),
  imageCompression: PropTypes.shape({
    compressionRate: PropTypes.number,
    resizingWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    resizingHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  })
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
  showSearchIcon: false,
  renderUserProfile: null,
  config: {},
  useReaction: true,
  useMessageGrouping: true,
  stringSet: null,
  colorSet: null,
  imageCompression: {}
};

export default App;
//# sourceMappingURL=App.js.map
