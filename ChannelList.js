import { a as _objectSpread2, c as _toConsumableArray, d as LocalizationContext, w as withSendbirdContext, b as _slicedToArray, u as uuidv4 } from './LocalizationContext-12658c38.js';
import React, { useContext, useRef, useState, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { U as UPDATE_USER_INFO } from './actionTypes-a85c0eaa.js';
import { I as IconButton, M as Modal, T as Type, a as TextButton, C as ContextMenu, b as MenuItems, c as MenuItem, d as CREATE_CHANNEL$1, U as UPDATE_USER_MESSAGE, L as LEAVE_CHANNEL, S as SEND_MESSAGE_START, e as UserProfileProvider } from './index-711ec843.js';
import { C as ChannelAvatar } from './index-4eb938ab.js';
import { e as LabelStringSet, I as Icon, c as IconTypes, d as IconColors, L as Label, a as LabelTypography, b as LabelColors, A as Avatar, P as PlaceHolder, f as PlaceHolderTypes } from './index-ad616be9.js';
import { n as noop$1 } from './utils-53ba1773.js';
import { B as Badge, i as isBroadcastChannelEnabled, a as isSuperGroupChannelEnabled, I as InviteMembers, c as createDefaultUserListQuery, b as createChannel, L as LeaveChannelModal } from './LeaveChannel-2c2f8e8e.js';
import isToday from 'date-fns/isToday';
import format from 'date-fns/format';
import isYesterday from 'date-fns/isYesterday';
import './type-0296584d.js';
import { t as truncate } from './utils-cfdeb084.js';
import 'react-dom';
import { I as InputLabel, a as Input } from './index-5788a124.js';

var RESET_CHANNEL_LIST = 'RESET_CHANNEL_LIST';
var CREATE_CHANNEL = 'CREATE_CHANNEL';
var LEAVE_CHANNEL_SUCCESS = 'LEAVE_CHANNEL_SUCCESS';
var SET_CURRENT_CHANNEL = 'SET_CURRENT_CHANNEL';
var SHOW_CHANNEL_SETTINGS = 'SHOW_CHANNEL_SETTINGS';
var HIDE_CHANNEL_SETTINGS = 'HIDE_CHANNEL_SETTINGS';
var FETCH_CHANNELS_START = 'FETCH_CHANNELS_START';
var FETCH_CHANNELS_SUCCESS = 'FETCH_CHANNELS_SUCCESS';
var FETCH_CHANNELS_FAILURE = 'FETCH_CHANNELS_FAILURE';
var INIT_CHANNELS_START = 'INIT_CHANNELS_START';
var INIT_CHANNELS_SUCCESS = 'INIT_CHANNELS_SUCCESS';
var INIT_CHANNELS_FAILURE = 'INIT_CHANNELS_FAILURE';
var ON_USER_JOINED = 'ON_USER_JOINED';
var ON_CHANNEL_DELETED = 'ON_CHANNEL_DELETED';
var ON_LAST_MESSAGE_UPDATED = 'ON_LAST_MESSAGE_UPDATED';
var ON_USER_LEFT = 'ON_USER_LEFT';
var ON_CHANNEL_CHANGED = 'ON_CHANNEL_CHANGED';
var ON_CHANNEL_ARCHIVED = 'ON_CHANNEL_ARCHIVED';
var ON_CHANNEL_FROZEN = 'ON_CHANNEL_FROZEN';
var ON_CHANNEL_UNFROZEN = 'ON_CHANNEL_UNFROZEN';
var ON_READ_RECEIPT_UPDATED = 'ON_READ_RECEIPT_UPDATED';
var ON_DELIVERY_RECEIPT_UPDATED = 'ON_DELIVERY_RECEIPT_UPDATED';
var CHANNEL_REPLACED_TO_TOP = 'CHANNEL_REPLACED_TO_TOP';

var channelListInitialState = {
  // we might not need this initialized state -> should remove
  initialized: false,
  loading: false,
  allChannels: [],
  currentChannel: null,
  showSettings: false
};

function reducer(state, action) {
  switch (action.type) {
    case INIT_CHANNELS_START:
      return _objectSpread2({}, state, {
        loading: true
      });

    case RESET_CHANNEL_LIST:
      return channelListInitialState;

    case INIT_CHANNELS_SUCCESS:
      return _objectSpread2({}, state, {
        initialized: true,
        loading: false,
        allChannels: action.payload,
        currentChannel: action.payload && action.payload.length && action.payload.length > 0 ? action.payload[0].url : null
      });

    case FETCH_CHANNELS_SUCCESS:
      {
        var currentChannels = state.allChannels.map(function (c) {
          return c.url;
        });
        var filteredChannels = action.payload.filter(function (_ref) {
          var url = _ref.url;
          return !currentChannels.find(function (c) {
            return c === url;
          });
        });
        return _objectSpread2({}, state, {
          allChannels: [].concat(_toConsumableArray(state.allChannels), _toConsumableArray(filteredChannels))
        });
      }

    case CREATE_CHANNEL:
      {
        return _objectSpread2({}, state, {
          allChannels: [action.payload].concat(_toConsumableArray(state.allChannels.filter(function (channel) {
            return channel.url !== action.payload.url;
          }))),
          currentChannel: action.payload.url
        });
      }

    case ON_CHANNEL_ARCHIVED:
    case LEAVE_CHANNEL_SUCCESS:
    case ON_CHANNEL_DELETED:
      {
        var channelUrl = action.payload;
        var leftCurrentChannel = state.currentChannel === channelUrl;
        var newAllChannels = state.allChannels.filter(function (_ref2) {
          var url = _ref2.url;
          return url !== channelUrl;
        });
        var currentChannel = leftCurrentChannel ? function () {
          return newAllChannels.length > 0 ? newAllChannels[0].url : '';
        }() : state.currentChannel;
        return _objectSpread2({}, state, {
          currentChannel: currentChannel,
          allChannels: newAllChannels
        });
      }

    case ON_USER_LEFT:
      {
        var _action$payload = action.payload,
            channel = _action$payload.channel,
            isMe = _action$payload.isMe;
        var url = channel.url;

        if (isMe) {
          var _leftCurrentChannel = url === state.currentChannel;

          var _newAllChannels2 = state.allChannels.filter(function (c) {
            return c.url !== url;
          });

          var _currentChannel = _leftCurrentChannel ? function () {
            return _newAllChannels2.length > 0 ? _newAllChannels2[0].url : '';
          }() : state.currentChannel;

          return _objectSpread2({}, state, {
            currentChannel: _currentChannel,
            allChannels: _newAllChannels2
          });
        } // other user left


        var _newAllChannels = state.allChannels.map(function (c) {
          return c.url === url ? channel : c;
        });

        return _objectSpread2({}, state, {
          allChannels: _newAllChannels
        });
      }

    case ON_USER_JOINED:
    case ON_CHANNEL_CHANGED:
    case ON_READ_RECEIPT_UPDATED:
    case ON_DELIVERY_RECEIPT_UPDATED:
      {
        var _state$allChannels = state.allChannels,
            allChannels = _state$allChannels === void 0 ? [] : _state$allChannels;
        var unreadMessageCount = action.payload.unreadMessageCount;
        var _channel = action.payload;

        if (!_channel.lastMessage) {
          return state;
        } // if its only an unread message count change, dont push to top


        if (unreadMessageCount === 0) {
          var _currentChannel2 = allChannels.find(function (_ref3) {
            var url = _ref3.url;
            return url === _channel.url;
          });

          var currentUnReadCount = _currentChannel2 && _currentChannel2.unreadMessageCount;

          if (currentUnReadCount === 0) {
            return _objectSpread2({}, state, {
              allChannels: allChannels.map(function (c) {
                if (c.url === _channel.url) {
                  return _channel;
                }

                return c;
              })
            });
          }
        }

        return _objectSpread2({}, state, {
          allChannels: [action.payload].concat(_toConsumableArray(state.allChannels.filter(function (_ref4) {
            var url = _ref4.url;
            return url !== action.payload.url;
          })))
        });
      }

    case SET_CURRENT_CHANNEL:
      return _objectSpread2({}, state, {
        currentChannel: action.payload
      });

    case SHOW_CHANNEL_SETTINGS:
      return _objectSpread2({}, state, {
        showSettings: true
      });

    case HIDE_CHANNEL_SETTINGS:
      return _objectSpread2({}, state, {
        showSettings: false
      });

    case ON_LAST_MESSAGE_UPDATED:
      return _objectSpread2({}, state, {
        allChannels: state.allChannels.map(function (channel) {
          if (channel.url === action.payload.url) {
            return action.payload;
          }

          return channel;
        })
      });

    case ON_CHANNEL_FROZEN:
      return _objectSpread2({}, state, {
        allChannels: state.allChannels.map(function (channel) {
          if (channel.url === action.payload.url) {
            // eslint-disable-next-line no-param-reassign
            channel.isFrozen = true;
            return channel;
          }

          return channel;
        })
      });

    case ON_CHANNEL_UNFROZEN:
      return _objectSpread2({}, state, {
        allChannels: state.allChannels.map(function (channel) {
          if (channel.url === action.payload.url) {
            // eslint-disable-next-line no-param-reassign
            channel.isFrozen = false;
            return channel;
          }

          return channel;
        })
      });

    case CHANNEL_REPLACED_TO_TOP:
      return _objectSpread2({}, state, {
        allChannels: [action.payload].concat(_toConsumableArray(state.allChannels.filter(function (channel) {
          return channel.url !== action.payload.url;
        })))
      });

    default:
      return state;
  }
}

var getChannelTitle = function getChannelTitle() {
  var channel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var currentUserId = arguments.length > 1 ? arguments[1] : undefined;
  var stringSet = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : LabelStringSet;

  if (!channel || !channel.name && !channel.members) {
    return stringSet.NO_TITLE;
  }

  if (channel.name && channel.name !== 'Group Channel') {
    return channel.name;
  }

  if (channel.members.length === 1) {
    return stringSet.NO_MEMBERS;
  }

  return channel.members.filter(function (_ref) {
    var userId = _ref.userId;
    return userId !== currentUserId;
  }).map(function (_ref2) {
    var nickname = _ref2.nickname;
    return nickname || stringSet.NO_NAME;
  }).join(', ');
};
var getLastMessageCreatedAt = function getLastMessageCreatedAt(channel) {
  if (!channel || !channel.lastMessage) {
    return '';
  }

  var date = channel.lastMessage.createdAt;

  if (isToday(date)) {
    return format(date, 'p');
  }

  if (isYesterday(date)) {
    return 'Yesterday';
  }

  return format(date, 'MMM dd');
};
var getTotalMembers = function getTotalMembers(channel) {
  return channel && channel.memberCount ? channel.memberCount : 0;
};

var getPrettyLastMessage = function getPrettyLastMessage() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var MAXLEN = 30;
  var messageType = message.messageType,
      name = message.name;

  if (messageType === 'file') {
    return truncate(name, MAXLEN);
  }

  return message.message;
};

var getLastMessage = function getLastMessage(channel) {
  return channel && channel.lastMessage ? getPrettyLastMessage(channel.lastMessage) : '';
};
var getChannelUnreadMessageCount = function getChannelUnreadMessageCount(channel) {
  return channel && channel.unreadMessageCount ? channel.unreadMessageCount : 0;
};

function ChannelPreview(_ref) {
  var channel = _ref.channel,
      isActive = _ref.isActive,
      ChannelAction = _ref.ChannelAction,
      theme = _ref.theme,
      onClick = _ref.onClick,
      tabIndex = _ref.tabIndex,
      currentUser = _ref.currentUser;
  var userId = currentUser.userId;
  var isBroadcast = channel.isBroadcast,
      isFrozen = channel.isFrozen;

  var _useContext = useContext(LocalizationContext),
      stringSet = _useContext.stringSet;

  return React.createElement("div", {
    role: "link",
    tabIndex: tabIndex,
    onClick: onClick,
    onKeyPress: onClick,
    className: "\n        sendbird-channel-preview\n        ".concat(isActive ? 'sendbird-channel-preview--active' : null, "\n      ")
  }, React.createElement("div", {
    className: "sendbird-channel-preview__avatar"
  }, React.createElement(ChannelAvatar, {
    channel: channel,
    userId: userId,
    theme: theme
  })), React.createElement("div", {
    className: "sendbird-channel-preview__content"
  }, React.createElement("div", {
    className: "sendbird-channel-preview__content__upper"
  }, React.createElement("div", {
    className: "sendbird-channel-preview__content__upper__header"
  }, isBroadcast && React.createElement("div", {
    className: "sendbird-channel-preview__broadcast-icon"
  }, React.createElement(Icon, {
    type: IconTypes.BROADCAST,
    fillColor: IconColors.SECONDARY,
    height: "16px",
    width: "16px"
  })), React.createElement(Label, {
    className: "sendbird-channel-preview__content__upper__header__channel-name",
    type: LabelTypography.SUBTITLE_2,
    color: LabelColors.ONBACKGROUND_1
  }, getChannelTitle(channel, userId, stringSet)), React.createElement(Label, {
    className: "sendbird-channel-preview__content__upper__header__total-members",
    type: LabelTypography.CAPTION_2,
    color: LabelColors.ONBACKGROUND_2
  }, getTotalMembers(channel)), isFrozen && React.createElement("div", {
    title: "Frozen",
    className: "sendbird-channel-preview__frozen-icon"
  }, React.createElement(Icon, {
    type: IconTypes.FREEZE,
    fillColor: IconColors.PRIMARY,
    height: 12,
    width: 12
  }))), React.createElement(Label, {
    className: "sendbird-channel-preview__content__upper__last-message-at",
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_2
  }, getLastMessageCreatedAt(channel))), React.createElement("div", {
    className: "sendbird-channel-preview__content__lower"
  }, React.createElement(Label, {
    className: "sendbird-channel-preview__content__lower__last-message",
    type: LabelTypography.BODY_2,
    color: LabelColors.ONBACKGROUND_3
  }, getLastMessage(channel)), React.createElement("div", {
    className: "sendbird-channel-preview__content__lower__unread-message-count"
  }, getChannelUnreadMessageCount(channel) ? React.createElement(Badge, {
    count: getChannelUnreadMessageCount(channel)
  }) : null))), React.createElement("div", {
    className: "sendbird-channel-preview__action"
  }, ChannelAction));
}
ChannelPreview.propTypes = {
  isActive: PropTypes.bool,
  theme: PropTypes.string,
  channel: PropTypes.shape({
    members: PropTypes.arrayOf(PropTypes.shape({})),
    coverUrl: PropTypes.string,
    isBroadcast: PropTypes.bool,
    isFrozen: PropTypes.bool
  }),
  ChannelAction: PropTypes.element.isRequired,
  onClick: PropTypes.func,
  tabIndex: PropTypes.number,
  currentUser: PropTypes.shape({
    userId: PropTypes.string
  })
};
ChannelPreview.defaultProps = {
  channel: {},
  isActive: false,
  theme: 'light',
  onClick: function onClick() {},
  tabIndex: 0,
  currentUser: {}
};

function ChannelHeader(_ref) {
  var user = _ref.user,
      iconButton = _ref.iconButton,
      onEdit = _ref.onEdit,
      renderHeader = _ref.renderHeader,
      allowProfileEdit = _ref.allowProfileEdit;

  var _useContext = useContext(LocalizationContext),
      stringSet = _useContext.stringSet;

  return React.createElement("div", {
    className: "\n        ".concat(allowProfileEdit && 'sendbird-channel-header--allow-edit', "\n        sendbird-channel-header\n      ")
  }, renderHeader ? renderHeader() : React.createElement("div", {
    className: "sendbird-channel-header__title",
    role: "button",
    onKeyDown: onEdit,
    onClick: onEdit,
    tabIndex: "0"
  }, React.createElement("div", {
    className: "sendbird-channel-header__title--left"
  }, React.createElement(Avatar, {
    height: "32px",
    width: "32px",
    src: user.profileUrl,
    alt: user.nickname
  })), React.createElement("div", {
    className: "sendbird-channel-header__title--right"
  }, React.createElement(Label, {
    className: "sendbird-channel-header__title--name",
    type: LabelTypography.SUBTITLE_2,
    color: LabelColors.ONBACKGROUND_1
  }, user.nickname || stringSet.NO_NAME), React.createElement(Label, {
    className: "sendbird-channel-header__title--user-id",
    type: LabelTypography.BODY_2,
    color: LabelColors.ONBACKGROUND_2
  }, user.userId))), React.createElement("div", {
    className: "sendbird-channel-header__right-icon"
  }, iconButton));
}
ChannelHeader.propTypes = {
  user: PropTypes.shape({
    profileUrl: PropTypes.string,
    nickname: PropTypes.string,
    userId: PropTypes.string
  }),
  renderHeader: PropTypes.func,
  allowProfileEdit: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
  iconButton: PropTypes.oneOfType([PropTypes.element, PropTypes.instanceOf(IconButton)])
};
ChannelHeader.defaultProps = {
  user: {},
  renderHeader: null,
  allowProfileEdit: false,
  iconButton: null
};

function EditUserProfile(_a) {
  var user = _a.user,
      onCancel = _a.onCancel,
      _onSubmit = _a.onSubmit,
      _b = _a.onThemeChange,
      onThemeChange = _b === void 0 ? null : _b,
      _c = _a.theme,
      theme = _c === void 0 ? 'light' : _c,
      _d = _a.changeTheme,
      changeTheme = _d === void 0 ? noop$1 : _d;
  var hiddenInputRef = useRef(null);
  var inputRef = useRef(null);
  var formRef = useRef(null);
  var stringSet = useContext(LocalizationContext).stringSet;

  var _e = useState(null),
      currentImg = _e[0],
      setCurrentImg = _e[1];

  var _f = useState(null),
      newFile = _f[0],
      setNewFile = _f[1];

  return React.createElement(Modal, {
    titleText: stringSet.EDIT_PROFILE__TITLE,
    submitText: stringSet.BUTTON__SAVE,
    onCancel: onCancel,
    onSubmit: function onSubmit() {
      if (user.nickname !== '' && !inputRef.current.value) {
        if (formRef.current.reportValidity) {
          // might not work in explorer
          formRef.current.reportValidity();
        }

        return;
      }

      _onSubmit(inputRef.current.value, newFile);

      onCancel();
    },
    type: Type.PRIMARY
  }, React.createElement("form", {
    className: "sendbird__edit-user-profile",
    ref: formRef,
    onSubmit: function onSubmit(e) {
      e.preventDefault();
    }
  }, React.createElement("section", {
    className: "sendbird__edit-user-profile__img"
  }, React.createElement(InputLabel, null, stringSet.EDIT_PROFILE__IMAGE_LABEL), React.createElement("div", {
    className: "sendbird__edit-user__avatar"
  }, React.createElement(Avatar, {
    height: "80px",
    width: "80px",
    src: currentImg || user.profileUrl
  })), React.createElement("input", {
    ref: hiddenInputRef,
    type: "file",
    accept: "image/gif, image/jpeg, image/png",
    style: {
      display: 'none'
    },
    onChange: function onChange(e) {
      setCurrentImg(URL.createObjectURL(e.target.files[0]));
      setNewFile(e.target.files[0]);
      hiddenInputRef.current.value = '';
    }
  }), React.createElement(TextButton, {
    className: "sendbird__edit-user__avatar-button",
    onClick: function onClick() {
      return hiddenInputRef.current.click();
    },
    notUnderline: true
  }, React.createElement(Label, {
    type: LabelTypography.BUTTON_1,
    color: LabelColors.PRIMARY
  }, stringSet.EDIT_PROFILE__IMAGE_UPLOAD))), React.createElement("section", {
    className: "sendbird__edit-user__name"
  }, React.createElement(InputLabel, null, stringSet.EDIT_PROFILE__NICKNAME_LABEL), React.createElement(Input, {
    required: user.nickname !== '',
    name: "sendbird__edit-user__name",
    ref: inputRef,
    value: user.nickname,
    placeHolder: stringSet.EDIT_PROFILE__NICKNAME_PLACEHOLDER
  })), React.createElement("section", {
    className: "sendbird__edit-user__userid"
  }, React.createElement(InputLabel, null, stringSet.EDIT_PROFILE__USERID_LABEL), React.createElement(Input, {
    disabled: true,
    name: "sendbird__edit-user__userid",
    value: user.userId
  })), React.createElement("section", {
    className: "sendbird__edit-user__theme"
  }, React.createElement(InputLabel, null, stringSet.EDIT_PROFILE__THEME_LABEL), React.createElement("div", {
    className: "sendbird__edit-user__theme-icon"
  }, theme === 'dark' ? React.createElement(Icon, {
    onClick: function onClick() {
      changeTheme('light');

      if (onThemeChange && typeof onThemeChange === 'function') {
        onThemeChange('light');
      }
    },
    type: IconTypes.TOGGLE_ON,
    width: 44,
    height: 24
  }) : React.createElement(Icon, {
    onClick: function onClick() {
      changeTheme('dark');

      if (onThemeChange && typeof onThemeChange === 'function') {
        onThemeChange('dark');
      }
    },
    type: IconTypes.TOGGLE_OFF,
    width: 44,
    height: 24
  })))));
}

var mapStoreToProps = function mapStoreToProps(store) {
  return {
    theme: store.config.theme,
    changeTheme: store.config.setCurrenttheme
  };
};

var ConnectedEditUserProfile = withSendbirdContext(EditUserProfile, mapStoreToProps);

function AddChannel(_ref) {
  var sdk = _ref.sdk,
      disabled = _ref.disabled,
      channelListDispatcher = _ref.channelListDispatcher,
      onBeforeCreateChannel = _ref.onBeforeCreateChannel,
      userId = _ref.userId,
      userFilledApplicationUserListQuery = _ref.userFilledApplicationUserListQuery,
      userListQuery = _ref.userListQuery;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      showModal = _useState2[0],
      setShowModal = _useState2[1];

  var _useState3 = useState(0),
      _useState4 = _slicedToArray(_useState3, 2),
      step = _useState4[0],
      setStep = _useState4[1];

  var _useState5 = useState('group'),
      _useState6 = _slicedToArray(_useState5, 2),
      type = _useState6[0],
      setType = _useState6[1];

  var _useContext = useContext(LocalizationContext),
      stringSet = _useContext.stringSet;

  if (!sdk || !sdk.createApplicationUserListQuery) {
    return null;
  }

  var isBroadcastAvailable = isBroadcastChannelEnabled(sdk);
  var isSupergroupAvailable = isSuperGroupChannelEnabled(sdk);
  return React.createElement(React.Fragment, null, React.createElement(IconButton, {
    height: "32px",
    width: "32px",
    onClick: function onClick() {
      setShowModal(true);
    },
    disabled: disabled
  }, React.createElement(Icon, {
    type: IconTypes.CREATE,
    fillColor: IconColors.PRIMARY,
    width: "24px",
    height: "24px"
  })), showModal && step === 0 && React.createElement(Modal, {
    titleText: "New channel",
    hideFooter: true,
    onCancel: function onCancel() {
      setShowModal(false);
    },
    onSubmit: function onSubmit() {}
  }, React.createElement("div", {
    className: "sendbird-add-channel__rectangle-wrap"
  }, React.createElement("div", {
    className: "sendbird-add-channel__rectangle",
    onClick: function onClick() {
      setType('group');
      setStep(1);
    },
    role: "button",
    tabIndex: 0,
    onKeyDown: function onKeyDown() {
      setType('group');
      setStep(1);
    }
  }, React.createElement(Icon, {
    className: "sendbird-add-channel__rectangle__chat-icon",
    type: IconTypes.CHAT,
    fillColor: IconColors.PRIMARY,
    width: "28px",
    height: "28px"
  }), React.createElement(Label, {
    type: LabelTypography.SUBTITLE_1,
    color: LabelColors.ONBACKGROUND_1
  }, "Group")), isSupergroupAvailable && React.createElement("div", {
    className: "sendbird-add-channel__rectangle",
    onClick: function onClick() {
      setType('supergroup');
      setStep(1);
    },
    role: "button",
    tabIndex: 0,
    onKeyDown: function onKeyDown() {
      setType('supergroup');
      setStep(1);
    }
  }, React.createElement(Icon, {
    className: "sendbird-add-channel__rectangle__supergroup-icon",
    type: IconTypes.SUPERGROUP,
    fillColor: IconColors.PRIMARY,
    width: "28px",
    height: "28px"
  }), React.createElement(Label, {
    type: LabelTypography.SUBTITLE_1,
    color: LabelColors.ONBACKGROUND_1
  }, "Super group")), isBroadcastAvailable && React.createElement("div", {
    className: "sendbird-add-channel__rectangle",
    onClick: function onClick() {
      setType('broadcast');
      setStep(1);
    },
    role: "button",
    tabIndex: 0,
    onKeyDown: function onKeyDown() {
      setType('broadcast');
      setStep(1);
    }
  }, React.createElement(Icon, {
    className: "sendbird-add-channel__rectangle__broadcast-icon",
    type: IconTypes.BROADCAST,
    fillColor: IconColors.PRIMARY,
    width: "28px",
    height: "28px"
  }), React.createElement(Label, {
    type: LabelTypography.SUBTITLE_1,
    color: LabelColors.ONBACKGROUND_1
  }, "Broadcast")))), showModal && step === 1 && React.createElement(InviteMembers, {
    swapParams: sdk && sdk.getErrorFirstCallback && sdk.getErrorFirstCallback(),
    titleText: stringSet.MODAL__CREATE_CHANNEL__TITLE,
    submitText: stringSet.BUTTON__CREATE,
    closeModal: function closeModal() {
      setStep(0);
      setShowModal(false);
    },
    idsToFilter: [userId],
    userQueryCreator: function userQueryCreator() {
      return userListQuery && typeof userListQuery === 'function' ? userListQuery() : createDefaultUserListQuery({
        sdk: sdk,
        userFilledApplicationUserListQuery: userFilledApplicationUserListQuery
      });
    },
    onSubmit: function onSubmit(selectedUsers) {
      return createChannel(sdk, selectedUsers, onBeforeCreateChannel, userId, type).then(function (channel) {
        // maybe - do this in event listener
        channelListDispatcher({
          type: CREATE_CHANNEL,
          payload: channel
        });
      });
    }
  }));
}
AddChannel.propTypes = {
  sdk: PropTypes.shape({
    getErrorFirstCallback: PropTypes.func,
    createApplicationUserListQuery: PropTypes.func
  }).isRequired,
  disabled: PropTypes.bool,
  channelListDispatcher: PropTypes.func.isRequired,
  userFilledApplicationUserListQuery: PropTypes.shape({}),
  onBeforeCreateChannel: PropTypes.func,
  userId: PropTypes.string.isRequired,
  userListQuery: PropTypes.func
};
AddChannel.defaultProps = {
  disabled: false,
  userFilledApplicationUserListQuery: {},
  onBeforeCreateChannel: null,
  userListQuery: null
};

function ChannelPreviewAction(_ref) {
  var disabled = _ref.disabled,
      onLeaveChannel = _ref.onLeaveChannel;
  var parentRef = useRef(null);

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      showModal = _useState2[0],
      setShowModal = _useState2[1];

  var _useContext = useContext(LocalizationContext),
      stringSet = _useContext.stringSet;

  return React.createElement("div", {
    role: "button",
    style: {
      display: 'inline-block'
    },
    onKeyDown: function onKeyDown(e) {
      e.stopPropagation();
    },
    tabIndex: 0,
    onClick: function onClick(e) {
      e.stopPropagation();
    }
  }, React.createElement(ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return React.createElement(IconButton, {
        ref: parentRef,
        onClick: toggleDropdown,
        height: "32px",
        width: "32px"
      }, React.createElement(Icon, {
        type: IconTypes.MORE,
        fillColor: IconColors.PRIMARY,
        width: "24px",
        height: "24px"
      }));
    },
    menuItems: function menuItems(closeDropdown) {
      return React.createElement(MenuItems, {
        parentRef: parentRef,
        parentContainRef: parentRef,
        closeDropdown: closeDropdown
      }, React.createElement(MenuItem, {
        onClick: function onClick() {
          if (disabled) {
            return;
          }

          setShowModal(true);
          closeDropdown();
        }
      }, stringSet.CHANNEL_SETTING__LEAVE_CHANNEL__TITLE));
    }
  }), showModal && React.createElement(LeaveChannelModal, {
    onCloseModal: function onCloseModal() {
      return setShowModal(false);
    },
    onLeaveChannel: onLeaveChannel
  }));
}
ChannelPreviewAction.propTypes = {
  disabled: PropTypes.bool,
  onLeaveChannel: PropTypes.func.isRequired
};
ChannelPreviewAction.defaultProps = {
  disabled: false
};

function ChannelsPlaceholder(_ref) {
  var type = _ref.type;
  return React.createElement("div", {
    className: "sendbird-channel-list"
  }, React.createElement(PlaceHolder, {
    type: type
  }));
}
ChannelsPlaceholder.propTypes = {
  type: PropTypes.string.isRequired
};

var createEventHandler = function createEventHandler(_ref) {
  var sdk = _ref.sdk,
      sdkChannelHandlerId = _ref.sdkChannelHandlerId,
      channelListDispatcher = _ref.channelListDispatcher,
      logger = _ref.logger;
  var ChannelHandler = new sdk.ChannelHandler();

  ChannelHandler.onChannelChanged = function (channel) {
    logger.info('ChannelList: onChannelChanged', channel);
    channelListDispatcher({
      type: ON_CHANNEL_CHANGED,
      payload: channel
    });
  };

  ChannelHandler.onChannelDeleted = function (channelUrl) {
    logger.info('ChannelList: onChannelDeleted', channelUrl);
    channelListDispatcher({
      type: ON_CHANNEL_DELETED,
      payload: channelUrl
    });
  };

  ChannelHandler.onUserJoined = function (channel) {
    logger.info('ChannelList: onUserJoined', channel);

    if (channel.lastMessage) {
      channelListDispatcher({
        type: ON_USER_JOINED,
        payload: channel
      });
    }
  };

  ChannelHandler.onUserBanned = function (channel, user) {
    var currentUser = sdk.currentUser;
    logger.info('Channel | useHandleChannelEvents: onUserBanned', channel);

    if (user.userId === currentUser.userId) {
      channelListDispatcher({
        type: ON_USER_LEFT,
        payload: {
          channel: channel,
          isMe: true
        }
      });
    } else {
      channelListDispatcher({
        type: ON_USER_LEFT,
        payload: {
          channel: channel,
          isMe: false
        }
      });
    }
  };

  ChannelHandler.onUserLeft = function (channel, leftUser) {
    var currentUser = sdk.currentUser;
    var isMe = currentUser.userId === leftUser.userId;
    logger.info('ChannelList: onUserLeft', channel);
    channelListDispatcher({
      type: ON_USER_LEFT,
      payload: {
        channel: channel,
        isMe: isMe
      }
    });
  };

  ChannelHandler.onReadStatus = function (channel) {
    logger.info('ChannelList: onReadStatus', channel);
    channelListDispatcher({
      type: ON_READ_RECEIPT_UPDATED,
      payload: channel
    });
  };

  ChannelHandler.onDeliveryReceiptUpdated = function (channel) {
    logger.info('ChannelList: onDeliveryReceiptUpdated', channel);

    if (channel.lastMessage) {
      channelListDispatcher({
        type: ON_DELIVERY_RECEIPT_UPDATED,
        payload: channel
      });
    }
  };

  ChannelHandler.onMessageUpdated = function (channel, message) {
    if (channel.lastMessage.isEqual(message)) {
      logger.info('ChannelList: onMessageUpdated', channel);
      channelListDispatcher({
        type: ON_LAST_MESSAGE_UPDATED,
        payload: channel
      });
    }
  };

  ChannelHandler.onChannelHidden = function (channel) {
    logger.info('ChannelList: onChannelHidden', channel);
    channelListDispatcher({
      type: ON_CHANNEL_ARCHIVED,
      payload: channel.url
    });
  };

  ChannelHandler.onChannelFrozen = function (channel) {
    logger.info('ChannelList: onChannelFrozen', channel);
    channelListDispatcher({
      type: ON_CHANNEL_FROZEN,
      payload: channel
    });
  };

  ChannelHandler.onChannelUnfrozen = function (channel) {
    logger.info('ChannelList: onChannelUnfrozen', channel);
    channelListDispatcher({
      type: ON_CHANNEL_UNFROZEN,
      payload: channel
    });
  };

  logger.info('ChannelList: Added channelHandler');
  sdk.addChannelHandler(sdkChannelHandlerId, ChannelHandler);
};

var createApplicationUserListQuery = function createApplicationUserListQuery(_ref2) {
  var sdk = _ref2.sdk,
      _ref2$userFilledChann = _ref2.userFilledChannelListQuery,
      userFilledChannelListQuery = _ref2$userFilledChann === void 0 ? {} : _ref2$userFilledChann;
  var channelListQuery = sdk.GroupChannel.createMyGroupChannelListQuery();
  channelListQuery.includeEmpty = false;
  channelListQuery.order = 'latest_last_message'; // 'chronological', 'latest_last_message', 'channel_name_alphabetical', and 'metadata_value_alphabetical'

  channelListQuery.limit = 20; // The value of pagination limit could be set up to 100.

  if (userFilledChannelListQuery) {
    Object.keys(userFilledChannelListQuery).forEach(function (key) {
      channelListQuery[key] = userFilledChannelListQuery[key];
    });
  }

  return channelListQuery;
};
/**
 * Setup event listener
 * create channel source query
 * addloading screen
 */


function setupChannelList(_ref3) {
  var sdk = _ref3.sdk,
      sdkChannelHandlerId = _ref3.sdkChannelHandlerId,
      channelListDispatcher = _ref3.channelListDispatcher,
      setChannelSource = _ref3.setChannelSource,
      onChannelSelect = _ref3.onChannelSelect,
      userFilledChannelListQuery = _ref3.userFilledChannelListQuery,
      logger = _ref3.logger,
      sortChannelList = _ref3.sortChannelList;
  createEventHandler({
    sdk: sdk,
    channelListDispatcher: channelListDispatcher,
    sdkChannelHandlerId: sdkChannelHandlerId,
    logger: logger
  });
  logger.info('ChannelList - creating query', {
    userFilledChannelListQuery: userFilledChannelListQuery
  });
  var channelListQuery = createApplicationUserListQuery({
    sdk: sdk,
    userFilledChannelListQuery: userFilledChannelListQuery
  });
  logger.info('ChannelList - created query', channelListQuery);
  setChannelSource(channelListQuery);
  channelListDispatcher({
    type: INIT_CHANNELS_START
  });
  logger.info('ChannelList - fetching channels');

  if (channelListQuery.hasNext) {
    channelListQuery.next(function (response, error) {
      var swapParams = sdk.getErrorFirstCallback();
      var channelList = response;
      var err = error;

      if (swapParams) {
        channelList = error;
        err = response;
      }

      logger.info('ChannelList - fetched channels', channelList);

      if (err) {
        logger.error('ChannelList - couldnt fetch channels', err);
        channelListDispatcher({
          type: INIT_CHANNELS_FAILURE
        });
        return;
      } // select first channel


      logger.info('ChannelList - highlight channel', channelList[0]);
      var sorted = channelList;

      if (sortChannelList && typeof sortChannelList === 'function') {
        sorted = sortChannelList(channelList);
        logger.info('ChannelList - channel list sorted', sorted);
      }

      onChannelSelect(sorted[0]);
      channelListDispatcher({
        type: INIT_CHANNELS_SUCCESS,
        payload: sorted
      });

      if (channelList && typeof channelList.forEach === 'function') {
        logger.info('ChannelList - mark all channels as delivered');
        channelList.forEach(function (c) {
          return c.markAsDelivered();
        });
      }
    });
  } else {
    logger.warning('ChannelList - there are no more channels');
  }
}

var pubSubHandleRemover = function pubSubHandleRemover(subscriber) {
  subscriber.forEach(function (s) {
    try {
      s.remove();
    } catch (_unused) {//
    }
  });
};
var pubSubHandler = function pubSubHandler(pubSub, channelListDispatcher) {
  var subScriber = new Map();
  if (!pubSub) return subScriber;
  subScriber.set(CREATE_CHANNEL$1, pubSub.subscribe(CREATE_CHANNEL$1, function (msg) {
    var channel = msg.channel;
    channelListDispatcher({
      type: 'CREATE_CHANNEL',
      payload: channel
    });
  }));
  subScriber.set(UPDATE_USER_MESSAGE, pubSub.subscribe(UPDATE_USER_MESSAGE, function (msg) {
    var channel = msg.channel,
        message = msg.message;
    var updatedChannel = channel;
    updatedChannel.lastMessage = message;

    if (channel) {
      channelListDispatcher({
        type: ON_LAST_MESSAGE_UPDATED,
        payload: updatedChannel
      });
    }
  }));
  subScriber.set(LEAVE_CHANNEL, pubSub.subscribe(LEAVE_CHANNEL, function (msg) {
    var channel = msg.channel;
    channelListDispatcher({
      type: LEAVE_CHANNEL_SUCCESS,
      payload: channel.url
    });
  }));
  subScriber.set(SEND_MESSAGE_START, pubSub.subscribe(SEND_MESSAGE_START, function (msg) {
    var channel = msg.channel;
    channelListDispatcher({
      type: CHANNEL_REPLACED_TO_TOP,
      payload: channel
    });
  }));
  return subScriber;
};

var noop = function noop() {};

function ChannelList(props) {
  var _props$stores = props.stores,
      _props$stores$sdkStor = _props$stores.sdkStore,
      sdkStore = _props$stores$sdkStor === void 0 ? {} : _props$stores$sdkStor,
      _props$stores$userSto = _props$stores.userStore,
      userStore = _props$stores$userSto === void 0 ? {} : _props$stores$userSto,
      _props$config = props.config,
      userId = _props$config.userId,
      isOnline = _props$config.isOnline,
      userListQuery = _props$config.userListQuery,
      logger = _props$config.logger,
      pubSub = _props$config.pubSub,
      theme = _props$config.theme,
      userDispatcher = props.dispatchers.userDispatcher,
      _props$queries = props.queries,
      queries = _props$queries === void 0 ? {} : _props$queries,
      renderChannelPreview = props.renderChannelPreview,
      renderHeader = props.renderHeader,
      renderUserProfile = props.renderUserProfile,
      disableUserProfile = props.disableUserProfile,
      allowProfileEdit = props.allowProfileEdit,
      sortChannelList = props.sortChannelList,
      onProfileEditSuccess = props.onProfileEditSuccess,
      onThemeChange = props.onThemeChange,
      onBeforeCreateChannel = props.onBeforeCreateChannel,
      onChannelSelect = props.onChannelSelect;
  var _props$config2 = props.config,
      config = _props$config2 === void 0 ? {} : _props$config2; // enable if it is true atleast once(both are flase by default)

  var enableEditProfile = allowProfileEdit || config.allowProfileEdit;
  var userDefinedDisableUserProfile = disableUserProfile || config.disableUserProfile;
  var userDefinedRenderProfile = renderUserProfile || config.renderUserProfile;
  var _sdkStore$sdk = sdkStore.sdk,
      sdk = _sdkStore$sdk === void 0 ? {} : _sdkStore$sdk;
  var userFilledChannelListQuery = queries.channelListQuery;
  var userFilledApplicationUserListQuery = queries.applicationUserListQuery;
  var sdkError = sdkStore.error;

  var _useState = useState({}),
      _useState2 = _slicedToArray(_useState, 2),
      user = _useState2[0],
      setUser = _useState2[1];

  useEffect(function () {
    setUser(userStore.user);
  }, [userStore.user]);
  var sdkIntialized = sdkStore.initialized;

  var _useReducer = useReducer(reducer, channelListInitialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      channelListStore = _useReducer2[0],
      channelListDispatcher = _useReducer2[1];

  var _useState3 = useState({}),
      _useState4 = _slicedToArray(_useState3, 2),
      channelSource = _useState4[0],
      setChannelSource = _useState4[1];

  var _useState5 = useState(null),
      _useState6 = _slicedToArray(_useState5, 2),
      sdkChannelHandlerId = _useState6[0],
      setSdkChannelHandlerId = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      showProfileEdit = _useState8[0],
      setShowProfileEdit = _useState8[1];

  var loading = channelListStore.loading,
      currentChannel = channelListStore.currentChannel;
  useEffect(function () {
    var subscriber = pubSubHandler(pubSub, channelListDispatcher);
    return function () {
      pubSubHandleRemover(subscriber);
    };
  }, [sdkIntialized]);
  useEffect(function () {
    setSdkChannelHandlerId(uuidv4);

    if (sdkIntialized) {
      logger.info('ChannelList: Setup channelHandlers');
      setupChannelList({
        sdk: sdk,
        sdkChannelHandlerId: sdkChannelHandlerId,
        channelListDispatcher: channelListDispatcher,
        setChannelSource: setChannelSource,
        onChannelSelect: onChannelSelect,
        userFilledChannelListQuery: userFilledChannelListQuery,
        logger: logger,
        sortChannelList: sortChannelList
      });
    } else {
      logger.info('ChannelList: Removing channelHandlers'); // remove previous channelHandlers

      if (sdk && sdk.removeChannelHandler) {
        sdk.removeChannelHandler(sdkChannelHandlerId);
      } // remove channelSource


      setChannelSource({}); // cleanup

      channelListDispatcher({
        type: RESET_CHANNEL_LIST
      });
    }

    return function () {
      logger.info('ChannelList: Removing channelHandlers');

      if (sdk && sdk.removeChannelHandler) {
        sdk.removeChannelHandler(sdkChannelHandlerId);
      }
    };
  }, [sdkIntialized, userFilledChannelListQuery, sortChannelList]);
  var allChannels = channelListStore.allChannels;
  var sortedChannels = sortChannelList && typeof sortChannelList === 'function' ? sortChannelList(allChannels) : allChannels;

  if (sortedChannels.length !== allChannels.length) {
    var warning = "ChannelList: You have removed/added extra channels on sortChannelList\n      this could cause unexpected problems"; // eslint-disable-next-line no-console

    console.warn(warning, {
      before: allChannels,
      after: sortedChannels
    });
    logger.warning(warning, {
      before: allChannels,
      after: sortedChannels
    });
  }

  useEffect(function () {
    if (!sdk || !sdk.GroupChannel) {
      return;
    }

    sdk.GroupChannel.getChannel(currentChannel, function (groupChannel) {
      if (groupChannel) {
        onChannelSelect(groupChannel);
      } else {
        onChannelSelect(null);
      }
    });
  }, [currentChannel]);
  return React.createElement(UserProfileProvider, {
    disableUserProfile: userDefinedDisableUserProfile,
    renderUserProfile: userDefinedRenderProfile,
    className: "sendbird-channel-list"
  }, React.createElement("div", {
    className: "sendbird-channel-list__header"
  }, React.createElement(ChannelHeader, {
    renderHeader: renderHeader,
    user: user,
    onEdit: function onEdit() {
      if (enableEditProfile) {
        setShowProfileEdit(true);
      }
    },
    allowProfileEdit: enableEditProfile,
    iconButton: React.createElement(AddChannel, {
      disabled: !isOnline,
      userListQuery: userListQuery,
      sdk: sdk,
      channelListDispatcher: channelListDispatcher,
      userId: userId,
      userFilledApplicationUserListQuery: userFilledApplicationUserListQuery,
      onBeforeCreateChannel: onBeforeCreateChannel
    })
  })), showProfileEdit && React.createElement(ConnectedEditUserProfile, {
    onThemeChange: onThemeChange,
    user: user,
    onCancel: function onCancel() {
      setShowProfileEdit(false);
    },
    onSubmit: function onSubmit(newName, newFile) {
      sdk.updateCurrentUserInfoWithProfileImage(newName, newFile, function (updatedUser) {
        userDispatcher({
          type: UPDATE_USER_INFO,
          payload: updatedUser
        });

        if (onProfileEditSuccess && typeof onProfileEditSuccess === 'function') {
          onProfileEditSuccess(updatedUser);
        }
      });
    }
  }), React.createElement("div", {
    className: "sendbird-channel-list__body",
    onScroll: function onScroll(e) {
      var fetchMore = e.target.clientHeight + e.target.scrollTop === e.target.scrollHeight;

      if (fetchMore && channelSource.hasNext) {
        logger.info('ChannelList: Fetching more channels');
        channelListDispatcher({
          type: FETCH_CHANNELS_START
        });
        channelSource.next(function (response, error) {
          var swapParams = sdk.getErrorFirstCallback();
          var channelList = response;
          var err = error;

          if (swapParams) {
            channelList = error;
            err = response;
          }

          if (err) {
            logger.info('ChannelList: Fetching channels failed', err);
            channelListDispatcher({
              type: FETCH_CHANNELS_FAILURE,
              payload: channelList
            });
            return;
          }

          logger.info('ChannelList: Fetching channels successful', channelList);
          channelListDispatcher({
            type: FETCH_CHANNELS_SUCCESS,
            payload: channelList
          });

          if (channelList && typeof channelList.forEach === 'function') {
            logger.info('ChannelList: Marking all channels as read');
            channelList.forEach(function (c) {
              return c.markAsDelivered();
            });
          }
        });
      }
    }
  }, sdkError && React.createElement(ChannelsPlaceholder, {
    type: PlaceHolderTypes.WRONG
  }), React.createElement("div", null, sortedChannels && sortedChannels.map(function (channel, idx) {
    var _onLeaveChannel = function onLeaveChannel(c, cb) {
      logger.info('ChannelList: Leaving channel', c);
      c.leave().then(function (res) {
        logger.info('ChannelList: Leaving channel success', res);

        if (cb && typeof cb === 'function') {
          cb(res, null);
        }

        channelListDispatcher({
          type: LEAVE_CHANNEL_SUCCESS,
          payload: channel.url
        });
      }).catch(function (err) {
        logger.error('ChannelList: Leaving channel failed', err);

        if (cb && typeof cb === 'function') {
          cb(null, err);
        }
      });
    };

    var onClick = function onClick() {
      if (!isOnline) {
        return;
      }

      logger.info('ChannelList: Clicked on channel:', channel);
      channelListDispatcher({
        type: SET_CURRENT_CHANNEL,
        payload: channel.url
      });
    };

    return renderChannelPreview ? // eslint-disable-next-line
    React.createElement("div", {
      key: channel.url,
      onClick: onClick
    }, renderChannelPreview({
      channel: channel,
      onLeaveChannel: _onLeaveChannel
    })) : React.createElement(ChannelPreview, {
      key: channel.url,
      tabIndex: idx,
      onClick: onClick,
      channel: channel,
      currentUser: user,
      theme: theme,
      isActive: channel.url === currentChannel // todo - potential performance hit refactor
      ,
      ChannelAction: React.createElement(ChannelPreviewAction, {
        disabled: !isOnline,
        onLeaveChannel: function onLeaveChannel() {
          return _onLeaveChannel(channel);
        }
      })
    });
  })), (!sdkIntialized || loading) && React.createElement(ChannelsPlaceholder, {
    type: PlaceHolderTypes.LOADING
  }), //  placeholder
  (!allChannels || allChannels.length === 0) && React.createElement(ChannelsPlaceholder, {
    type: PlaceHolderTypes.NO_CHANNELS
  })));
}

ChannelList.propTypes = {
  stores: PropTypes.shape({
    sdkStore: PropTypes.shape({
      initialized: PropTypes.bool
    }),
    userStore: PropTypes.shape({
      user: PropTypes.shape({})
    })
  }).isRequired,
  dispatchers: PropTypes.shape({
    userDispatcher: PropTypes.func
  }).isRequired,
  config: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    userListQuery: PropTypes.func,
    theme: PropTypes.string,
    isOnline: PropTypes.bool,
    logger: PropTypes.shape({
      info: PropTypes.func,
      error: PropTypes.func,
      warning: PropTypes.func
    }),
    pubSub: PropTypes.shape({
      subscribe: PropTypes.func,
      publish: PropTypes.func
    })
  }).isRequired,
  queries: PropTypes.shape({
    channelListQuery: PropTypes.shape({
      channelNameContainsFilter: PropTypes.string,
      channelUrlsFilter: PropTypes.arrayOf(PropTypes.string),
      customTypesFilter: PropTypes.arrayOf(PropTypes.string),
      customTypeStartsWithFilter: PropTypes.string,
      hiddenChannelFilter: PropTypes.string,
      includeEmpty: PropTypes.bool,
      limit: PropTypes.number,
      memberStateFilter: PropTypes.string,
      metadataOrderKeyFilter: PropTypes.string,
      nicknameContainsFilter: PropTypes.string,
      order: PropTypes.string,
      publicChannelFilter: PropTypes.string,
      superChannelFilter: PropTypes.string,
      unreadChannelFilter: PropTypes.string,
      userIdsExactFilter: PropTypes.arrayOf(PropTypes.string),
      userIdsIncludeFilter: PropTypes.arrayOf(PropTypes.string),
      userIdsIncludeFilterQueryType: PropTypes.string
    }),
    applicationUserListQuery: PropTypes.shape({
      limit: PropTypes.number,
      userIdsFilter: PropTypes.arrayOf(PropTypes.string),
      metaDataKeyFilter: PropTypes.string,
      metaDataValuesFilter: PropTypes.arrayOf(PropTypes.string)
    })
  }),
  onBeforeCreateChannel: PropTypes.func,
  renderChannelPreview: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  disableUserProfile: PropTypes.bool,
  renderUserProfile: PropTypes.func,
  allowProfileEdit: PropTypes.bool,
  sortChannelList: PropTypes.func,
  onThemeChange: PropTypes.func,
  onProfileEditSuccess: PropTypes.func,
  renderHeader: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  onChannelSelect: PropTypes.func
};
ChannelList.defaultProps = {
  onBeforeCreateChannel: null,
  renderChannelPreview: null,
  renderHeader: null,
  disableUserProfile: false,
  renderUserProfile: null,
  allowProfileEdit: false,
  onThemeChange: null,
  sortChannelList: null,
  onProfileEditSuccess: null,
  queries: {},
  onChannelSelect: noop
};
var ChannelList$1 = withSendbirdContext(ChannelList);

export default ChannelList$1;
//# sourceMappingURL=ChannelList.js.map
