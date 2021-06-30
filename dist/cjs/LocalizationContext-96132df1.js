'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var SendbirdSdkContext = React__default.createContext();

var withSendbirdContext = function withSendbirdContext(OriginalComponent, mapStoreToProps) {
  var ContextAwareComponent = function ContextAwareComponent(props) {
    return React__default.createElement(SendbirdSdkContext.Consumer, null, function (context) {
      if (mapStoreToProps && typeof mapStoreToProps !== 'function') {
        // eslint-disable-next-line no-console
        console.warn('Second parameter to withSendbirdContext must be a pure function');
      }

      var mergedProps = mapStoreToProps && typeof mapStoreToProps === 'function' ? _objectSpread2({}, mapStoreToProps(context), {}, props) : _objectSpread2({}, context, {}, props); // eslint-disable-next-line react/jsx-props-no-spreading

      return React__default.createElement(OriginalComponent, mergedProps);
    });
  };

  var componentName = OriginalComponent.displayName || OriginalComponent.name || 'Component';
  ContextAwareComponent.displayName = "SendbirdAware".concat(componentName);
  return ContextAwareComponent;
};

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

exports.__assign = function() {
    exports.__assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return exports.__assign.apply(this, arguments);
};

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

/* eslint-disable no-bitwise */

/* eslint-disable eqeqeq */

/* eslint-disable no-mixed-operators */
// https://stackoverflow.com/a/2117523
// used mainly for dom key generation
var uuidv4 = function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
};

var getStringSet = function getStringSet() {
  var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'en';
  var stringSet = {
    en: {
      OPEN_CHANNEL_SETTINGS__OPERATOR_TITLE: 'Channel Information',
      OPEN_CHANNEL_SETTINGS__OPERATOR_URL: 'URL',
      OPEN_CHANNEL_SETTINGS__PARTICIPANTS_ACCORDION_TITLE: 'Participants',
      OPEN_CHANNEL_SETTINGS__DELETE_CHANNEL_PANEL: 'Delete channel',
      OPEN_CHANNEL_SETTINGS__DELETE_CHANNEL_TITLE: 'Delete this channel',
      OPEN_CHANNEL_SETTINGS__DELETE_CHANNEL_SUBMIT: 'Delete',
      OPEN_CHANNEL_SETTINGS__PARTICIPANTS_TITLE: 'Participants',
      OPEN_CHANNEL_SETTINGS__EMPTY_LIST: 'No participants yet',
      OPEN_CHANNEL_SETTINGS__SEE_ALL: 'See all participants',
      OPEN_CHANNEL_SETTINGS__ALL_PARTICIPANTS_TITLE: 'All participants',
      OPEN_CHANNEL_SETTINGS__NO_TITLE: '(No title)',
      OPEN_CHANNEL_CONVERSATION__TITLE_PARTICIPANTS: 'participants',
      TRYING_TO_CONNECT: 'Trying to connect…',
      USER_PROFILE__MESSAGE: 'Message',
      USER_PROFILE__USER_ID: 'User ID',
      EDIT_PROFILE__TITLE: 'My profile',
      EDIT_PROFILE__IMAGE_LABEL: 'Profile image',
      EDIT_PROFILE__IMAGE_UPLOAD: 'Upload',
      EDIT_PROFILE__NICKNAME_LABEL: 'Nickname',
      EDIT_PROFILE__NICKNAME_PLACEHOLDER: 'Enter your nickname',
      EDIT_PROFILE__USERID_LABEL: 'User ID',
      EDIT_PROFILE__THEME_LABEL: 'Dark theme',
      CHANNEL_LIST__TITLE: 'Channels',
      CHANNEL__MESSAGE_INPUT__PLACE_HOLDER: 'Enter message',
      CHANNEL__MESSAGE_INPUT__PLACE_HOLDER__DISABLED: 'Chat is unavailable in this channel',
      CHANNEL__MESSAGE_INPUT__PLACE_HOLDER__MUTED: 'Chat is unavailable because you are being muted',
      CHANNEL__MESSAGE_LIST__NOTIFICATION__NEW_MESSAGE: 'new message(s) since',
      CHANNEL__MESSAGE_LIST__NOTIFICATION__ON: 'on',
      CHANNEL_SETTING__HEADER__TITLE: 'Channel information',
      CHANNEL_SETTING__PROFILE__EDIT: 'Edit',
      CHANNEL_SETTING__MEMBERS__TITLE: 'Members',
      CHANNEL_SETTING__MEMBERS__SEE_ALL_MEMBERS: 'All members',
      CHANNEL_SETTING__MEMBERS__INVITE_MEMBER: 'Invite users',
      CHANNEL_SETTING__LEAVE_CHANNEL__TITLE: 'Leave channel',
      CHANNEL_SETTING__OPERATORS__TITLE: 'Operators',
      CHANNEL_SETTING__OPERATORS__TITLE_ALL: 'All operators',
      CHANNEL_SETTING__OPERATORS__TITLE_ADD: 'Add operator',
      CHANNEL_SETTING__MUTED_MEMBERS__TITLE: 'Muted members',
      CHANNEL_SETTING__MUTED_MEMBERS__TITLE_ALL: 'All muted members',
      CHANNEL_SETTING__BANNED_MEMBERS__TITLE: 'Banned members',
      CHANNEL_SETTING__BANNED_MEMBERS__TITLE_ALL: 'All banned members',
      CHANNEL_SETTING__FREEZE_CHANNEL: 'Freeze Channel',
      BUTTON__CANCEL: 'Cancel',
      BUTTON__DELETE: 'Delete',
      BUTTON__SAVE: 'Save',
      BUTTON__CREATE: 'Create',
      BUTTON__INVITE: 'Invite',
      BUTTON__CLOSE: 'Close',
      BADGE__OVER: '+',
      MODAL__DELETE_MESSAGE__TITLE: 'Delete this message?',
      MODAL__CHANNEL_INFORMATION__TITLE: 'Edit channel information',
      MODAL__CHANNEL_INFORMATION__CHANNEL_IMAGE: 'Channel image',
      MODAL__CHANNEL_INFORMATION__UPLOAD: 'Upload',
      MODAL__CHANNEL_INFORMATION__CHANNEL_NAME: 'Channel name',
      MODAL__CHANNEL_INFORMATION__INPUT__PLACE_HOLDER: 'Enter name',
      MODAL__INVITE_MEMBER__TITLE: 'Invite member',
      MODAL__INVITE_MEMBER__SELECTEC: 'selected',
      MODAL__CREATE_CHANNEL__TITLE: 'New channel',
      MODAL__CREATE_CHANNEL__SELECTED: 'selected',
      MODAL__USER_LIST__TITLE: 'members',
      TYPING_INDICATOR__IS_TYPING: 'is typing...',
      TYPING_INDICATOR__AND: 'and',
      TYPING_INDICATOR__ARE_TYPING: 'are typing...',
      TYPING_INDICATOR__MULTIPLE_TYPING: 'Several people are typing...',
      MESSAGE_STATUS__SENDING_FAILED: 'Couldn\'t send message.',
      MESSAGE_STATUS__TRY_AGAIN: 'Try again',
      MESSAGE_STATUS__OR: 'or',
      MESSAGE_STATUS__DELETE: 'delete',
      CHANNEL_FROZEN: 'Channel frozen',
      MUTED_PL: 'Channel frozen',
      PLACE_HOLDER__NO_CHANNEL: 'No channels',
      PLACE_HOLDER__WRONG: 'Something went wrong',
      PLACE_HOLDER__RETRY_TO_CONNECT: 'Retry',
      PLACE_HOLDER__NO_MESSAGES: 'No messages',
      NO_TITLE: 'No title',
      NO_NAME: '(No name)',
      NO_MEMBERS: '(No members)',
      TOOLTIP__AND_YOU: ', and you',
      TOOLTIP__YOU: 'you',
      YOU: ' (You)',
      TOOLTIP__UNKOWN_USER: '(no name)',
      UNKNOWN__UNKNOWN_MESSAGE_TYPE: '(Unknown message type)',
      UNKNOWN__CANNOT_READ_MESSAGE: 'Cannot read this message.',
      MESSAGE_EDITED: '(edited)',
      CONTEXT_MENU_DROPDOWN__COPY: 'Copy',
      CONTEXT_MENU_DROPDOWN__EDIT: 'Edit',
      CONTEXT_MENU_DROPDOWN__RESEND: 'Resend',
      CONTEXT_MENU_DROPDOWN__DELETE: 'Delete',
      SEARCH: 'Search',
      SEARCH_IN_CHANNEL: 'Search in channel',
      SEARCH_IN: 'Search in',
      SEARCHING: 'Searching for messages...',
      NO_SEARCHED_MESSAGE: 'No results found.'
    }
  };
  return stringSet[lang];
};

var LocalizationContext = React__default.createContext({
  stringSet: getStringSet('en')
});

var LocalizationProvider = function LocalizationProvider(props) {
  var children = props.children;
  return React__default.createElement(LocalizationContext.Provider, {
    value: props
  }, children);
};

exports.LocalizationContext = LocalizationContext;
exports.LocalizationProvider = LocalizationProvider;
exports.SendbirdSdkContext = SendbirdSdkContext;
exports.__spreadArrays = __spreadArrays;
exports._assertThisInitialized = _assertThisInitialized;
exports._classCallCheck = _classCallCheck;
exports._createClass = _createClass;
exports._defineProperty = _defineProperty;
exports._getPrototypeOf = _getPrototypeOf;
exports._inherits = _inherits;
exports._objectSpread2 = _objectSpread2;
exports._possibleConstructorReturn = _possibleConstructorReturn;
exports._slicedToArray = _slicedToArray;
exports._toConsumableArray = _toConsumableArray;
exports.getStringSet = getStringSet;
exports.uuidv4 = uuidv4;
exports.uuidv4$1 = uuidv4;
exports.withSendbirdContext = withSendbirdContext;
//# sourceMappingURL=LocalizationContext-96132df1.js.map
