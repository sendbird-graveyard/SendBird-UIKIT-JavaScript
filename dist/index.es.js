import React, { useReducer, useEffect, useState, Component, useRef } from 'react';
import PropTypes from 'prop-types';
import Sb from 'sendbird';
import moment from 'moment';
import { createPortal } from 'react-dom';

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

var SendbirdSdkContext = React.createContext();

var withSendbirdContext = function withSendbirdContext(OriginalComponent, mapStoreToProps) {
  var ContextAwareComponent = function ContextAwareComponent(props) {
    return React.createElement(SendbirdSdkContext.Consumer, null, function (context) {
      if (mapStoreToProps && typeof mapStoreToProps !== 'function') {
        // eslint-disable-next-line no-console
        console.warn('Second parameter to withSendbirdContext must be a pure function');
      }

      var mergedProps = mapStoreToProps && typeof mapStoreToProps === 'function' ? _objectSpread2({}, mapStoreToProps(context), {}, props) : _objectSpread2({}, context, {}, props); // eslint-disable-next-line react/jsx-props-no-spreading

      return React.createElement(OriginalComponent, mergedProps);
    });
  };

  var componentName = OriginalComponent.displayName || OriginalComponent.name || 'Component';
  ContextAwareComponent.displayName = "SendbirdAware".concat(componentName);
  return ContextAwareComponent;
};

var INIT_SDK = 'INIT_SDK';
var SET_SDK_LOADING = 'SET_SDK_LOADING';
var RESET_SDK = 'RESET_SDK';
var SDK_ERROR = 'SDK_ERROR';

var INIT_USER = 'INIT_USER';
var RESET_USER = 'RESET_USER';
var UPDATE_USER_INFO = 'UPDATE_USER_INFO';

var disconnectSdk = function disconnectSdk(_ref) {
  var sdkDispatcher = _ref.sdkDispatcher,
      userDispatcher = _ref.userDispatcher,
      sdk = _ref.sdk,
      onDisconnect = _ref.onDisconnect;
  sdkDispatcher({
    type: SET_SDK_LOADING,
    payload: true
  });

  if (sdk && sdk.disconnect) {
    sdk.disconnect(function (response, error) {
      var swapParams = sdk.getErrorFirstCallback();
      var err = error;

      if (swapParams) {
        err = response;
      }

      if (!err) {
        sdkDispatcher({
          type: RESET_SDK
        });
        userDispatcher({
          type: RESET_USER
        });
      }

      onDisconnect();
    });
  } else {
    onDisconnect();
  }
};
var handleConnection = function handleConnection(_ref2, dispatchers) {
  var userId = _ref2.userId,
      appId = _ref2.appId,
      nickname = _ref2.nickname,
      profileUrl = _ref2.profileUrl,
      accessToken = _ref2.accessToken,
      sdk = _ref2.sdk;
  var sdkDispatcher = dispatchers.sdkDispatcher,
      userDispatcher = dispatchers.userDispatcher;
  disconnectSdk({
    sdkDispatcher: sdkDispatcher,
    userDispatcher: userDispatcher,
    sdk: sdk,
    onDisconnect: function onDisconnect() {
      sdkDispatcher({
        type: SET_SDK_LOADING,
        payload: true
      });

      if (userId && appId) {
        var newSdk = new Sb({
          appId: appId
        });

        var connectCb = function connectCb(response, error) {
          var swapParams = newSdk.getErrorFirstCallback();
          var user = response;
          var err = error;

          if (swapParams) {
            user = error;
            err = response;
          }

          if (!err) {
            sdkDispatcher({
              type: INIT_SDK,
              payload: newSdk
            });
            userDispatcher({
              type: INIT_USER,
              payload: user
            });

            if (nickname || profileUrl) {
              var userInfoParams = [nickname || user.userId, profileUrl || user.profileUrl];
              newSdk.updateCurrentUserInfo.apply(newSdk, userInfoParams.concat([function (r, e) {
                var namedUser = r;
                var errorUpdatingInfo = e;

                if (swapParams) {
                  namedUser = e;
                  errorUpdatingInfo = r;
                }

                if (!errorUpdatingInfo) {
                  userDispatcher({
                    type: UPDATE_USER_INFO,
                    payload: namedUser
                  });
                }
              }]));
            }
          } else {
            sdkDispatcher({
              type: RESET_SDK
            });
            sdkDispatcher({
              type: RESET_USER
            });
            sdkDispatcher({
              type: SDK_ERROR
            });
          }
        };

        if (accessToken) {
          newSdk.connect(userId, accessToken, connectCb);
        } else {
          newSdk.connect(userId, connectCb);
        }
      } else {
        sdkDispatcher({
          type: SDK_ERROR
        });
      }
    }
  });
};

var sdkInitialState = {
  initialized: false,
  loading: false,
  sdk: {},
  error: false
};

function reducer(state, action) {
  switch (action.type) {
    case SET_SDK_LOADING:
      return _objectSpread2({}, state, {
        initialized: false,
        loading: action.payload
      });

    case SDK_ERROR:
      return _objectSpread2({}, state, {
        initialized: false,
        loading: false,
        error: true
      });

    case INIT_SDK:
      return {
        sdk: action.payload,
        initialized: true,
        loading: false,
        error: false
      };

    case RESET_SDK:
      return sdkInitialState;

    default:
      return state;
  }
}

var userInitialState = {
  initialized: false,
  loading: false,
  user: {}
};

function reducer$1(state, action) {
  switch (action.type) {
    case INIT_USER:
      return {
        initialized: true,
        loading: false,
        user: action.payload
      };

    case RESET_USER:
      return userInitialState;

    case UPDATE_USER_INFO:
      return _objectSpread2({}, state, {
        user: action.payload
      });

    default:
      return state;
  }
}

function Sendbird(props) {
  var userId = props.userId,
      appId = props.appId,
      accessToken = props.accessToken,
      children = props.children,
      theme = props.theme,
      nickname = props.nickname,
      profileUrl = props.profileUrl,
      userListQuery = props.userListQuery;

  var _useReducer = useReducer(reducer, sdkInitialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      sdkStore = _useReducer2[0],
      sdkDispatcher = _useReducer2[1];

  var _useReducer3 = useReducer(reducer$1, userInitialState),
      _useReducer4 = _slicedToArray(_useReducer3, 2),
      userStore = _useReducer4[0],
      userDispatcher = _useReducer4[1];

  useEffect(function () {
    // dispatch action
    handleConnection({
      userId: userId,
      appId: appId,
      accessToken: accessToken,
      sdkStore: sdkStore,
      nickname: nickname,
      profileUrl: profileUrl,
      sdk: sdkStore.sdk
    }, {
      sdkDispatcher: sdkDispatcher,
      userDispatcher: userDispatcher
    });
  }, [userId, appId, accessToken]); // to create DOM elements for appending modal & context menu
  // might fail on server side render

  useEffect(function () {
    var appentElemWithId = function appentElemWithId(id) {
      var elem = document.createElement('div');
      elem.setAttribute('id', id);
      var body = document.querySelector('body');
      body.appendChild(elem);
    };

    var modalRoot = 'sendbird-modal-root';
    var menuRoot = 'sendbird-dropdown-portal';
    appentElemWithId(modalRoot);
    appentElemWithId(menuRoot);
  }, []); // add-remove theme from body

  useEffect(function () {
    try {
      var body = document.querySelector('body');
      body.classList.add("sendbird-theme--".concat(theme || 'light')); // eslint-disable-next-line no-empty
    } catch (_unused) {}

    return function () {
      try {
        var _body = document.querySelector('body');

        _body.classList.remove('sendbird-theme--light');

        _body.classList.remove('sendbird-theme--dark'); // eslint-disable-next-line no-empty

      } catch (_unused2) {}
    };
  }, [theme]);
  return React.createElement(SendbirdSdkContext.Provider, {
    value: {
      stores: {
        sdkStore: sdkStore,
        userStore: userStore
      },
      dispatchers: {
        sdkDispatcher: sdkDispatcher,
        userDispatcher: userDispatcher,
        reconnect: function reconnect() {
          handleConnection({
            userId: userId,
            appId: appId,
            accessToken: accessToken,
            sdkStore: sdkStore,
            nickname: nickname,
            profileUrl: profileUrl,
            sdk: sdkStore.sdk
          }, {
            sdkDispatcher: sdkDispatcher,
            userDispatcher: userDispatcher
          });
        }
      },
      config: {
        userId: userId,
        appId: appId,
        accessToken: accessToken,
        theme: theme,
        userListQuery: userListQuery
      }
    }
  }, children);
}
Sendbird.propTypes = {
  userId: PropTypes.string.isRequired,
  appId: PropTypes.string.isRequired,
  accessToken: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element), PropTypes.any]).isRequired,
  theme: PropTypes.string,
  nickname: PropTypes.string,
  profileUrl: PropTypes.string,
  userListQuery: PropTypes.func
};
Sendbird.defaultProps = {
  accessToken: '',
  theme: 'light',
  nickname: '',
  profileUrl: '',
  userListQuery: null
};

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
var ON_USER_LEFT = 'ON_USER_LEFT';
var ON_CHANNEL_CHANGED = 'ON_CHANNEL_CHANGED';
var ON_READ_RECEIPT_UPDATED = 'ON_READ_RECEIPT_UPDATED';
var ON_DELIVERY_RECEIPT_UPDATED = 'ON_DELIVERY_RECEIPT_UPDATED';

var channelListInitialState = {
  // we might not need this initialized state -> should remove
  initialized: false,
  loading: false,
  allChannels: [],
  currentChannel: null,
  showSettings: false
};

function reducer$2(state, action) {
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
      return _objectSpread2({}, state, {
        allChannels: [action.payload].concat(_toConsumableArray(state.allChannels.filter(function (channel) {
          return channel.url !== action.payload.url;
        }))),
        currentChannel: action.payload.url
      });

    case LEAVE_CHANNEL_SUCCESS:
    case ON_CHANNEL_DELETED:
      {
        var newAllChannels = state.allChannels.filter(function (_ref2) {
          var url = _ref2.url;
          return url !== action.payload;
        });
        var currentChannel = newAllChannels.length > 0 ? newAllChannels[0].url : '';
        return _objectSpread2({}, state, {
          currentChannel: currentChannel,
          allChannels: newAllChannels
        });
      }

    case ON_USER_LEFT:
      {
        var channel = action.payload;
        var myMemberState = channel.myMemberState,
            url = channel.url; // I left

        var _newAllChannels = state.allChannels.filter(function (c) {
          return c.url !== url;
        });

        var _currentChannel = _newAllChannels.length > 0 ? _newAllChannels[0].url : '';

        if (myMemberState === 'none') {
          return _objectSpread2({}, state, {
            currentChannel: _currentChannel,
            allChannels: _newAllChannels
          });
        } // other user left


        return _objectSpread2({}, state, {
          currentChannel: _currentChannel,
          allChannels: [action.payload].concat(_toConsumableArray(_newAllChannels))
        });
      }

    case ON_USER_JOINED:
    case ON_CHANNEL_CHANGED:
    case ON_READ_RECEIPT_UPDATED:
    case ON_DELIVERY_RECEIPT_UPDATED:
      {
        var _state$allChannels = state.allChannels,
            allChannels = _state$allChannels === void 0 ? [] : _state$allChannels;
        var unreadMessageCount = action.payload.unreadMessageCount; // if its only an unread message count change, dont push to top

        if (unreadMessageCount === 0) {
          var _currentChannel2 = allChannels.find(function (_ref3) {
            var url = _ref3.url;
            return url === action.payload.url;
          });

          var currentUnReadCount = _currentChannel2 && _currentChannel2.unreadMessageCount;

          if (currentUnReadCount === 0) {
            return _objectSpread2({}, state, {
              allChannels: allChannels.map(function (c) {
                if (c.url === action.payload.url) {
                  return action.payload;
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

    default:
      return state;
  }
}

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _ref =
/*#__PURE__*/
React.createElement("g", {
  fill: "none",
  fillRule: "evenodd"
}, React.createElement("circle", {
  cx: 28,
  cy: 28,
  r: 28,
  fill: "#A8A8A8"
}), React.createElement("path", {
  className: "no-image_svg__fill",
  fill: "#FFF",
  fillRule: "nonzero",
  d: "M34.667 31.333A8.333 8.333 0 0143 39.667V43a1.667 1.667 0 01-3.333 0v-3.333a5 5 0 00-5-5H21.333a5 5 0 00-5 5V43A1.667 1.667 0 1113 43v-3.333a8.333 8.333 0 018.333-8.334zm-6.667-20A8.333 8.333 0 1128 28a8.333 8.333 0 010-16.667zm0 3.334a5 5 0 100 10 5 5 0 000-10z"
}));

function SvgNoImage(props) {
  return React.createElement("svg", _extends({
    viewBox: "0 0 56 56",
    className: "no-image_svg__sendbird-no-image"
  }, props), _ref);
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

var Img = function Img(_ref) {
  var src = _ref.src,
      height = _ref.height,
      width = _ref.width,
      alt = _ref.alt;
  return src ? React.createElement("img", {
    src: src,
    alt: alt,
    height: height,
    width: width,
    className: "sendbird-avatar-img"
  }) : React.createElement("div", {
    className: "sendbird-avatar-img sendbird-default-avatar"
  }, React.createElement(SvgNoImage, {
    alt: alt,
    height: height,
    width: width
  }));
};
Img.propTypes = {
  src: PropTypes.string,
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};
Img.defaultProps = {
  src: null
};
var AvatarInner = function AvatarInner(_ref2) {
  var src = _ref2.src,
      height = _ref2.height,
      width = _ref2.width,
      alt = _ref2.alt;

  if (typeof src === 'string') {
    return React.createElement("div", {
      style: {
        height: height,
        width: width,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: "url(".concat(src, ")")
      }
    });
  }

  if (src && src.length) {
    if (src.length === 1) {
      return React.createElement("div", {
        style: {
          height: height,
          width: width,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImage: "url(".concat(src[0], ")")
        }
      });
    }

    if (src.length === 2) {
      return React.createElement("div", {
        className: "sendbird-avatar--inner__two-child"
      }, React.createElement(Img, {
        src: src[0],
        height: height,
        width: width,
        alt: alt
      }), React.createElement(Img, {
        src: src[1],
        height: height,
        width: width,
        alt: alt
      }));
    }

    if (src.length === 3) {
      return React.createElement(React.Fragment, null, React.createElement("div", {
        className: "sendbird-avatar--inner__three-child--upper"
      }, React.createElement(Img, {
        src: src[0],
        height: height,
        width: width,
        alt: alt
      })), React.createElement("div", {
        className: "sendbird-avatar--inner__three-child--lower"
      }, React.createElement(Img, {
        src: src[1],
        height: height,
        width: width,
        alt: alt
      }), React.createElement(Img, {
        src: src[2],
        height: height,
        width: width,
        alt: alt
      })));
    }

    return React.createElement("div", {
      className: "sendbird-avatar--inner__four-child"
    }, src.slice(0, 4).map(function (i) {
      return React.createElement(Img, {
        src: i,
        height: height,
        width: width,
        alt: alt,
        key: uuidv4()
      });
    }));
  } // default img


  return React.createElement(Img, {
    height: height,
    width: width,
    alt: alt
  });
};
AvatarInner.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};
AvatarInner.defaultProps = {
  src: ''
};
function Avatar(_ref3) {
  var src = _ref3.src,
      height = _ref3.height,
      width = _ref3.width,
      alt = _ref3.alt,
      className = _ref3.className;
  var injectingClassName = Array.isArray(className) ? className : [className];
  return React.createElement("div", {
    className: [].concat(_toConsumableArray(injectingClassName), ['sendbird-avatar']).join(' '),
    style: {
      height: height,
      width: width
    }
  }, React.createElement(AvatarInner, {
    src: src,
    height: height,
    width: width,
    alt: alt
  }));
}
Avatar.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  height: PropTypes.string,
  width: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
};
Avatar.defaultProps = {
  height: '56px',
  width: '56px',
  alt: '',
  src: '',
  className: ''
};

var Typography = {
  H_1: 'H_1',
  H_2: 'H_2',
  SUBTITLE_1: 'SUBTITLE_1',
  SUBTITLE_2: 'SUBTITLE_2',
  BODY_1: 'BODY_1',
  BODY_2: 'BODY_2',
  BUTTON_1: 'BUTTON_1',
  BUTTON_2: 'BUTTON_2',
  CAPTION_1: 'CAPTION_1',
  CAPTION_2: 'CAPTION_2',
  CAPTION_3: 'CAPTION_3'
};
var Colors = {
  ONBACKGROUND_1: 'ONBACKGROUND_1',
  ONBACKGROUND_2: 'ONBACKGROUND_2',
  ONBACKGROUND_3: 'ONBACKGROUND_3',
  ONCONTENT_1: 'ONCONTENT_1',
  PRIMARY: 'PRIMARY',
  ERROR: 'ERROR'
};

function changeTypographyToClassName(type) {
  switch (type) {
    case Typography.H_1:
      return 'sendbird-label--h-1';

    case Typography.H_2:
      return 'sendbird-label--h-2';

    case Typography.SUBTITLE_1:
      return 'sendbird-label--subtitle-1';

    case Typography.SUBTITLE_2:
      return 'sendbird-label--subtitle-2';

    case Typography.BODY_1:
      return 'sendbird-label--body-1';

    case Typography.BODY_2:
      return 'sendbird-label--body-2';

    case Typography.BUTTON_1:
      return 'sendbird-label--button-1';

    case Typography.BUTTON_2:
      return 'sendbird-label--button-2';

    case Typography.CAPTION_1:
      return 'sendbird-label--caption-1';

    case Typography.CAPTION_2:
      return 'sendbird-label--caption-2';

    case Typography.CAPTION_3:
      return 'sendbird-label--caption-3';

    default:
      return null;
  }
}
function changeColorToClassName(color) {
  switch (color) {
    case Colors.ONBACKGROUND_1:
      return 'sendbird-label--color-onbackground-1';

    case Colors.ONBACKGROUND_2:
      return 'sendbird-label--color-onbackground-2';

    case Colors.ONBACKGROUND_3:
      return 'sendbird-label--color-onbackground-3';

    case Colors.ONCONTENT_1:
      return 'sendbird-label--color-oncontent-1';

    case Colors.PRIMARY:
      return 'sendbird-label--color-primary';

    case Colors.ERROR:
      return 'sendbird-label--color-error';

    default:
      return null;
  }
}

var getStringSet = function getStringSet(lang) {
  var stringSet = {
    en: {
      CHANNEL_LIST__TITLE: 'Channels',
      CHANNEL__MESSAGE_INPUT__PLACE_HOLDER: 'Enter message',
      CHANNEL__MESSAGE_LIST__NOTIFICATION__NEW_MESSAGE: 'new message(s) since',
      CHANNEL__MESSAGE_LIST__NOTIFICATION__ON: 'on',
      CHANNEL_SETTING__HEADER__TITLE: 'Channel information',
      CHANNEL_SETTING__PROFILE__EDIT: 'Edit',
      CHANNEL_SETTING__MEMBERS__TITLE: 'Members',
      CHANNEL_SETTING__MEMBERS__SEE_ALL_MEMBERS: 'All members',
      CHANNEL_SETTING__MEMBERS__INVITE_MEMBER: 'Invite users',
      CHANNEL_SETTING__LEAVE_CHANNEL__TITLE: 'Leave channel',
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
      MODAL__CREATE_CHANNEL__SELECTED: 'seledted',
      MODAL__USER_LIST__TITLE: 'members',
      TYPING_INDICATOR__IS_TYPING: 'is typing...',
      TYPING_INDICATOR__AND: 'and',
      TYPING_INDICATOR__ARE_TYPING: 'are typing...',
      TYPING_INDICATOR__MULTIPLE_TYPING: 'Several people are typing...',
      MESSAGE_STATUS__SENDING_FAILED: 'Couldn\'t send message.',
      MESSAGE_STATUS__TRY_AGAIN: 'Try again',
      MESSAGE_STATUS__OR: 'or',
      MESSAGE_STATUS__DELETE: 'delete',
      PLACE_HOLDER__NO_CHANNEL: 'No channels',
      PLACE_HOLDER__WRONG: 'Something went wrong',
      PLACE_HOLDER__RETRY_TO_CONNECT: 'Retry'
    }
  };
  return stringSet && stringSet[lang] ? stringSet[lang] : {};
};

function Label(_ref) {
  var type = _ref.type,
      color = _ref.color,
      children = _ref.children,
      className = _ref.className;
  var injectingClassName = Array.isArray(className) ? className : [className];
  return React.createElement("div", {
    className: [].concat(_toConsumableArray(injectingClassName), ['sendbird-label', changeTypographyToClassName(type), changeColorToClassName(color)]).join(' ')
  }, children);
}
Label.propTypes = {
  type: PropTypes.oneOf(Object.keys(Typography)),
  color: PropTypes.oneOf(Object.keys(Colors)),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.element, PropTypes.any]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
};
Label.defaultProps = {
  type: Typography.H_1,
  color: Colors.ONBACKGROUND_1,
  className: [],
  children: null
};
var LabelTypography = Typography;
var LabelColors = Colors;
var LabelStringSet = getStringSet('en');

function Badge(_ref) {
  var count = _ref.count,
      maxLevel = _ref.maxLevel,
      className = _ref.className;
  var maximumNumber = parseInt('9'.repeat(maxLevel > 6 ? 6 : maxLevel), 10);
  var injectingClassName = Array.isArray(className) ? className : [className];
  return React.createElement("div", {
    className: [].concat(_toConsumableArray(injectingClassName), ['sendbird-badge']).join(' ')
  }, React.createElement("div", {
    className: "sendbird-badge__text"
  }, React.createElement(Label, {
    type: LabelTypography.CAPTION_2,
    color: LabelColors.ONCONTENT_1
  }, count > maximumNumber ? "".concat(maximumNumber).concat(LabelStringSet.BADGE__OVER) : count)));
}
Badge.propTypes = {
  count: PropTypes.number.isRequired,
  maxLevel: PropTypes.number,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
};
Badge.defaultProps = {
  maxLevel: 2,
  className: []
};

var truncate = function truncate(fullStr, strLen) {
  if (fullStr === null || fullStr === undefined) return '';
  if (fullStr.length <= strLen) return fullStr;
  var separator = '...';
  var sepLen = separator.length;
  var charsToShow = strLen - sepLen;
  var frontChars = Math.ceil(charsToShow / 2);
  var backChars = Math.floor(charsToShow / 2);
  return fullStr.substr(0, frontChars) + separator + fullStr.substr(fullStr.length - backChars);
};

var getChannelAvatarSource = function getChannelAvatarSource(channel, currentUserId) {
  if (channel && channel.coverUrl) {
    if (channel.coverUrl !== 'https://static.sendbird.com/sample/cover/cover_') {
      return channel.coverUrl;
    }
  }

  return channel && channel.members ? channel.members.filter(function (member) {
    return member.userId !== currentUserId;
  }).map(function (_ref) {
    var profileUrl = _ref.profileUrl;
    return profileUrl;
  }) : [];
};
var getChannelTitle = function getChannelTitle() {
  var channel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var currentUserId = arguments.length > 1 ? arguments[1] : undefined;

  if (!channel || !channel.name && !channel.members) {
    return 'No Title';
  }

  if (channel.name && channel.name !== 'Group Channel') {
    return channel.name;
  }

  if (channel.members.length === 1) {
    return '(No Members)';
  }

  return channel.members.filter(function (_ref2) {
    var userId = _ref2.userId;
    return userId !== currentUserId;
  }).map(function (_ref3) {
    var nickname = _ref3.nickname;
    return nickname;
  }).join(', ');
};
var getLastMessageCreatedAt = function getLastMessageCreatedAt(channel) {
  if (!channel || !channel.lastMessage) {
    return '';
  }

  var moment$1 = moment(channel.lastMessage.createdAt);

  switch (moment$1.calendar().split(' ')[0]) {
    case 'Today':
      {
        return moment$1.format('LT');
      }

    case 'Yesterday':
      {
        return 'Yesterday';
      }

    default:
      return moment$1.format('ll').split(',')[0];
  }
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
      onClick = _ref.onClick,
      tabIndex = _ref.tabIndex,
      currentUser = _ref.currentUser;
  var userId = currentUser.userId;
  return React.createElement("div", {
    role: "link",
    tabIndex: tabIndex,
    onClick: onClick,
    onKeyPress: onClick,
    className: "\n        sendbird-channel-preview\n        ".concat(isActive ? 'sendbird-channel-preview--active' : null, "\n      ")
  }, React.createElement("div", {
    className: "sendbird-channel-preview__avatar"
  }, React.createElement(Avatar, {
    src: getChannelAvatarSource(channel, userId)
  })), React.createElement("div", {
    className: "sendbird-channel-preview__content"
  }, React.createElement("div", {
    className: "sendbird-channel-preview__content__upper"
  }, React.createElement("div", {
    className: "sendbird-channel-preview__content__upper__header"
  }, React.createElement(Label, {
    className: "sendbird-channel-preview__content__upper__header__channel-name",
    type: LabelTypography.SUBTITLE_2,
    color: LabelColors.ONBACKGROUND_1
  }, getChannelTitle(channel, userId)), React.createElement(Label, {
    className: "sendbird-channel-preview__content__upper__header__total-members",
    type: LabelTypography.CAPTION_2,
    color: LabelColors.ONBACKGROUND_2
  }, getTotalMembers(channel))), React.createElement(Label, {
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
  channel: PropTypes.shape({
    members: PropTypes.arrayOf(PropTypes.shape({}))
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
  onClick: function onClick() {},
  tabIndex: 0,
  currentUser: {}
};

var IconButton = React.forwardRef(function (props, ref) {
  var children = props.children,
      className = props.className,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      type = props.type,
      height = props.height,
      width = props.width,
      onClick = props.onClick;
  return (// eslint-disable-next-line react/button-has-type
    React.createElement("button", {
      className: "sendbird-iconbutton ".concat(className),
      disabled: disabled,
      ref: ref,
      type: type,
      style: {
        height: height,
        width: width
      },
      onClick: onClick
    }, React.createElement("span", {
      className: "sendbird-iconbutton__inner"
    }, children))
  );
});
IconButton.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element), PropTypes.any]).isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};
IconButton.defaultProps = {
  height: '56px',
  width: '56px',
  className: '',
  type: 'button',
  disabled: false,
  onClick: function onClick() {}
};

function ChannelHeader(_ref) {
  var title = _ref.title,
      iconButton = _ref.iconButton;
  return React.createElement("div", {
    className: "sendbird-channel-header"
  }, React.createElement("div", {
    className: "sendbird-channel-header__title"
  }, React.createElement(Label, {
    type: LabelTypography.H_2,
    color: LabelColors.ONBACKGROUND_1
  }, title || LabelStringSet.CHANNEL_LIST__TITLE)), React.createElement("div", {
    className: "sendbird-channel-header__right-icon"
  }, iconButton));
}
ChannelHeader.propTypes = {
  title: PropTypes.string,
  iconButton: PropTypes.oneOfType([PropTypes.element, PropTypes.instanceOf(IconButton)])
};
ChannelHeader.defaultProps = {
  title: '',
  iconButton: null
};

function Types() {
  return {
    LOADING: 'LOADING',
    NO_CHANNELS: 'NO_CHANNELS',
    WRONG: 'WRONG'
  };
}
var PlaceHolderTypes = Types();

var Type = {
  ATTACH: 'ATTACH',
  ADD: 'ADD',
  ARROW_LEFT: 'ARROW_LEFT',
  CAMERA: 'CAMERA',
  MORE: 'MORE',
  MUTE: 'MUTE',
  CHECKBOX: 'CHECKBOX',
  CHECKBOX_OFF: 'CHECKBOX_OFF',
  CLOSE: 'CLOSE',
  COPY: 'COPY',
  CHAT: 'CHAT',
  CREATE: 'CREATE',
  DELETE: 'DELETE',
  DUMMY: 'DUMMY',
  EDIT: 'EDIT',
  ERROR: 'ERROR',
  ERROR_FILLED: 'ERROR_FILLED',
  DELIVERED: 'DELIVERED',
  DOCUMENT: 'DOCUMENT',
  DOWNLOAD: 'DOWNLOAD',
  FILE_AUDIO: 'FILE_AUDIO',
  FILE_DOCUMENT: 'FILE_DOCUMENT',
  GIF: 'GIF',
  INFO: 'INFO',
  LEAVE: 'LEAVE',
  MEMBERS: 'MEMBERS',
  NOTIFICATIONS: 'NOTIFICATIONS',
  PHOTO: 'PHOTO',
  PLAY: 'PLAY',
  PLUS: 'PLUS',
  READ: 'READ',
  REFRESH: 'REFRESH',
  SEND: 'SEND',
  SENT: 'SENT',
  SHEVRON: 'SHEVRON',
  SHEVRON_DOWN: 'SHEVRON_DOWN',
  SPINNER: 'SPINNER',
  USER: 'USER'
};

function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }

var _ref$1 =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-add_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M19 2a3 3 0 013 3v14a3 3 0 01-3 3H5a3 3 0 01-3-3V5a3 3 0 013-3zm0 2H5a1 1 0 00-1 1v14a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1zm-7 3a1 1 0 01.993.883L13 8v3h3a1 1 0 01.117 1.993L16 13h-3v3a1 1 0 01-1.993.117L11 16v-3H8a1 1 0 01-.117-1.993L8 11h3V8a1 1 0 011-1z"
});

function SvgIconAdd(props) {
  return React.createElement("svg", _extends$1({
    viewBox: "0 0 24 24"
  }, props), _ref$1);
}

function _extends$2() { _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }

var _ref$2 =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-attach_svg__fill",
  fillOpacity: 0.88,
  fillRule: "evenodd",
  d: "M19.021 9.943l-8.424 8.023c-1.795 1.71-4.723 1.71-6.518 0-1.77-1.685-1.77-4.398 0-6.084l8.424-8.023c1.079-1.027 2.845-1.027 3.924 0a2.461 2.461 0 010 3.614l-8.433 8.022a.984.984 0 01-1.33 0 .772.772 0 010-1.142l7.782-7.403a.917.917 0 00-1.264-1.328L5.4 13.025a2.605 2.605 0 000 3.798 2.816 2.816 0 003.858 0l8.433-8.022a4.294 4.294 0 000-6.27C15.905.83 13.025.83 11.24 2.531l-8.425 8.023c-2.528 2.408-2.528 6.332 0 8.74 2.504 2.384 6.544 2.384 9.047 0l8.425-8.023a.917.917 0 10-1.265-1.328z"
});

function SvgIconAttach(props) {
  return React.createElement("svg", _extends$2({
    viewBox: "0 0 22 22"
  }, props), _ref$2);
}

function _extends$3() { _extends$3 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$3.apply(this, arguments); }

var _ref$3 =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-arrow-left_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M12.707 3.293a1 1 0 01.083 1.32l-.083.094L6.415 11H21a1 1 0 01.117 1.993L21 13H6.415l6.292 6.293a1 1 0 01.083 1.32l-.083.094a1 1 0 01-1.32.083l-.094-.083-8-8a1 1 0 01-.083-1.32l.083-.094 8-8a1 1 0 011.414 0z"
});

function SvgIconArrowLeft(props) {
  return React.createElement("svg", _extends$3({
    viewBox: "0 0 24 24"
  }, props), _ref$3);
}

function _extends$4() { _extends$4 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$4.apply(this, arguments); }

var _ref$4 =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-camera_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M15 2a1 1 0 01.832.445L17.535 5H21a3 3 0 012.995 2.824L24 8v11a3 3 0 01-3 3H3a3 3 0 01-3-3V8a3 3 0 013-3h3.464l1.704-2.555a1 1 0 01.708-.437L9 2zm-.536 2H9.535L7.832 6.555a1 1 0 01-.708.437L7 7H3a1 1 0 00-1 1v11a1 1 0 001 1h18a1 1 0 001-1V8a1 1 0 00-1-1h-4a1 1 0 01-.832-.445L14.464 4zM12 8a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z"
});

function SvgIconCamera(props) {
  return React.createElement("svg", _extends$4({
    viewBox: "0 0 24 24"
  }, props), _ref$4);
}

function _extends$5() { _extends$5 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$5.apply(this, arguments); }

var _ref$5 =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-more_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M12 17a2 2 0 110 4 2 2 0 010-4zm0-6.5a2 2 0 110 4 2 2 0 010-4zM12 4a2 2 0 110 4 2 2 0 010-4z"
});

function SvgIconMore(props) {
  return React.createElement("svg", _extends$5({
    viewBox: "0 0 24 24"
  }, props), _ref$5);
}

function _extends$6() { _extends$6 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$6.apply(this, arguments); }

var _ref$6 =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-mute_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M15.125 20.09c0 .602-.694 2.41-2.778 2.41-1.389 0-2.315-.804-2.778-2.41zM12.789 1.606a6.496 6.496 0 015.388 2.861l2.464-2.463a.788.788 0 011.025-.077l.088.077a.788.788 0 010 1.113L3.378 21.494a.788.788 0 01-1.025.077l-.088-.077a.788.788 0 010-1.113l1.9-1.903-.04-.004a.387.387 0 01-.241-.596l1.557-2.295.001-.208a545.875 545.875 0 00-.028-6.563l-.008-.614a6.503 6.503 0 016.414-6.59h.969zm6.381 5.246c.08.407.122.827.122 1.257l-.001 7.53 1.52 2.238a.387.387 0 01-.32.604H7.54l3.214-3.214 8.415-8.415z"
});

function SvgIconMute(props) {
  return React.createElement("svg", _extends$6({
    viewBox: "0 0 24 24"
  }, props), _ref$6);
}

function _extends$7() { _extends$7 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$7.apply(this, arguments); }

var _ref$7 =
/*#__PURE__*/
React.createElement("g", {
  className: "icon-checkbox_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd"
}, React.createElement("path", {
  d: "M18 1H6a5 5 0 00-5 5v12a5 5 0 005 5h12a5 5 0 005-5V6a5 5 0 00-5-5zm0 2a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6a3 3 0 013-3h12z"
}), React.createElement("path", {
  d: "M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
}));

function SvgIconCheckbox(props) {
  return React.createElement("svg", _extends$7({
    viewBox: "0 0 24 24"
  }, props), _ref$7);
}

function _extends$8() { _extends$8 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$8.apply(this, arguments); }

var _ref$8 =
/*#__PURE__*/
React.createElement("g", {
  className: "icon-checkbox-off_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd"
}, React.createElement("path", {
  d: "M18 1H6a5 5 0 00-5 5v12a5 5 0 005 5h12a5 5 0 005-5V6a5 5 0 00-5-5zm0 2a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6a3 3 0 013-3h12z"
}), React.createElement("path", {
  d: "M19 19H5V5h14v14zm0-16H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
}));

function SvgIconCheckboxOff(props) {
  return React.createElement("svg", _extends$8({
    viewBox: "0 0 24 24"
  }, props), _ref$8);
}

function _extends$9() { _extends$9 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$9.apply(this, arguments); }

var _ref$9 =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-close_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M6.613 5.21l.094.083L12 10.585l5.293-5.292a1 1 0 011.497 1.32l-.083.094L13.415 12l5.292 5.293a1 1 0 01-1.32 1.497l-.094-.083L12 13.415l-5.293 5.292a1 1 0 01-1.497-1.32l.083-.094L10.585 12 5.293 6.707a1 1 0 011.32-1.497z"
});

function SvgIconClose(props) {
  return React.createElement("svg", _extends$9({
    viewBox: "0 0 24 24"
  }, props), _ref$9);
}

function _extends$a() { _extends$a = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$a.apply(this, arguments); }

var _ref$a =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-copy_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M20 8a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9a3 3 0 013-3zm0 2h-9a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1v-9a1 1 0 00-1-1zm-7-9a3 3 0 012.995 2.824L16 4v1a1 1 0 01-1.993.117L14 5V4a1 1 0 00-.883-.993L13 3H4a1 1 0 00-.993.883L3 4v9a1 1 0 00.883.993L4 14h1a1 1 0 01.117 1.993L5 16H4a3 3 0 01-2.995-2.824L1 13V4a3 3 0 012.824-2.995L4 1h9z"
});

function SvgIconCopy(props) {
  return React.createElement("svg", _extends$a({
    viewBox: "0 0 24 24"
  }, props), _ref$a);
}

function _extends$b() { _extends$b = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$b.apply(this, arguments); }

var _ref$b =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-chat_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11c-1.67 0-3.255-.373-4.673-1.039l-.657.218c-2.237.716-3.8.964-4.69.742-1.049-.261-1.256-.72-.62-1.373.439-.524.805-1.178 1.097-1.963.234-.625.142-1.5-.276-2.625A10.933 10.933 0 011 12C1 5.925 5.925 1 12 1zm0 2a9 9 0 00-8.187 12.742l.152.314.051.101.04.107c.569 1.532.709 2.859.275 4.02l-.143.365-.072.162.088-.019a23.181 23.181 0 001.832-.511l.646-.213.765-.26.73.343A8.962 8.962 0 0012 21a9 9 0 000-18z"
});

function SvgIconChat(props) {
  return React.createElement("svg", _extends$b({
    viewBox: "0 0 24 24"
  }, props), _ref$b);
}

function _extends$c() { _extends$c = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$c.apply(this, arguments); }

var _ref$c =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-create_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11c-1.67 0-3.255-.373-4.673-1.039l-.657.218c-2.237.716-3.8.964-4.69.742-1.049-.261-1.256-.72-.62-1.373.439-.524.805-1.178 1.097-1.963.234-.625.142-1.5-.276-2.625A10.933 10.933 0 011 12C1 5.925 5.925 1 12 1zm0 2a9 9 0 00-8.187 12.742l.152.314.051.101.04.107c.569 1.532.709 2.859.275 4.02l-.143.365-.072.162.088-.019a23.181 23.181 0 001.832-.511l.646-.213.765-.26.73.343A8.962 8.962 0 0012 21a9 9 0 000-18zm1 6v2h2c1.333 0 1.333 2 0 2h-2v2c0 1.333-2 1.333-2 0v-2H9c-1.333 0-1.333-2 0-2h2V9c0-1.333 2-1.333 2 0z"
});

function SvgIconCreate(props) {
  return React.createElement("svg", _extends$c({
    viewBox: "0 0 24 24"
  }, props), _ref$c);
}

function _extends$d() { _extends$d = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$d.apply(this, arguments); }

var _ref$d =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-delete_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M14 1a3 3 0 012.995 2.824L17 4v1h4a1 1 0 01.117 1.993L21 7h-1v13a3 3 0 01-2.824 2.995L17 23H7a3 3 0 01-2.995-2.824L4 20V7H3a1 1 0 01-.117-1.993L3 5h4V4a3 3 0 012.824-2.995L10 1h4zm4 6H6v13a1 1 0 00.883.993L7 21h10a1 1 0 00.993-.883L18 20V7zm-8 3a1 1 0 01.993.883L11 11v6a1 1 0 01-1.993.117L9 17v-6a1 1 0 011-1zm4 0a1 1 0 01.993.883L15 11v6a1 1 0 01-1.993.117L13 17v-6a1 1 0 011-1zm0-7h-4a1 1 0 00-.993.883L9 4v1h6V4a1 1 0 00-.883-.993L14 3z"
});

function SvgIconDelete(props) {
  return React.createElement("svg", _extends$d({
    viewBox: "0 0 24 24"
  }, props), _ref$d);
}

function _extends$e() { _extends$e = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$e.apply(this, arguments); }

var _ref$e =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-dummy_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
});

function SvgIconDummy(props) {
  return React.createElement("svg", _extends$e({
    viewBox: "0 0 24 24"
  }, props), _ref$e);
}

function _extends$f() { _extends$f = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$f.apply(this, arguments); }

var _ref$f =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-edit_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M21.875 21.875a1.042 1.042 0 01.121 2.076l-.121.007H3.125a1.042 1.042 0 01-.121-2.076l.121-.007h18.75zM13.847 1.347a1.042 1.042 0 011.473 0l4.167 4.166a1.042 1.042 0 010 1.474L8.028 18.445c-.195.195-.46.305-.736.305H3.125a1.042 1.042 0 01-1.042-1.042v-4.166c0-.277.11-.542.305-.737zm.736 2.21L4.167 13.973v2.694h2.691L17.276 6.25l-2.693-2.693z"
});

function SvgIconEdit(props) {
  return React.createElement("svg", _extends$f({
    viewBox: "0 0 26 26"
  }, props), _ref$f);
}

function _extends$g() { _extends$g = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$g.apply(this, arguments); }

var _ref$g =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-error_svg__fill",
  fill: "#E53157",
  fillRule: "evenodd",
  d: "M8 1.265c.655 0 1.266.32 1.64.856l.072.11 5.652 9.436c.355.615.357 1.373.006 1.99-.33.579-.925.953-1.59 1.004l-.133.006H2.346a2.001 2.001 0 01-1.772-2.883l.067-.127 5.649-9.43A2 2 0 018 1.266zm0 1.333a.669.669 0 00-.52.248l-.048.07-5.641 9.417a.669.669 0 00.477.994l.085.006H13.64a.664.664 0 00.612-.914l-.036-.076L8.57 2.919a.663.663 0 00-.57-.32zm0 8.069A.667.667 0 118 12a.667.667 0 010-1.333zm0-5.334c.342 0 .624.258.662.59L8.667 6v2.667a.667.667 0 01-1.329.077l-.005-.077V6c0-.368.299-.667.667-.667z"
});

function SvgIconError(props) {
  return React.createElement("svg", _extends$g({
    viewBox: "0 0 16 16"
  }, props), _ref$g);
}

function _extends$h() { _extends$h = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$h.apply(this, arguments); }

var _ref$h =
/*#__PURE__*/
React.createElement("g", {
  fill: "none",
  fillRule: "evenodd"
}, React.createElement("path", {
  className: "icon-error-filled_svg__fill",
  fill: "#E53157",
  d: "M10.281 4.18L1.77 17.85a1.87 1.87 0 00-.005 1.924c.353.597 1.01.968 1.724.976h17.024a2.024 2.024 0 001.724-.976 1.87 1.87 0 00-.005-1.924L13.719 4.18A2.028 2.028 0 0012 3.25a2.03 2.03 0 00-1.719.93z"
}), React.createElement("path", {
  fill: "#FFF",
  fillRule: "nonzero",
  d: "M11.125 12.875V8.5c0-1.167 1.75-1.167 1.75 0v4.375c0 1.167-1.75 1.167-1.75 0zm0 3.5c0-1.167 1.75-1.167 1.75 0s-1.75 1.167-1.75 0z"
}));

function SvgIconErrorFilled(props) {
  return React.createElement("svg", _extends$h({
    viewBox: "0 0 24 24"
  }, props), _ref$h);
}

function _extends$i() { _extends$i = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$i.apply(this, arguments); }

var _ref$i =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-delivered_svg__fill",
  fillOpacity: 0.38,
  fillRule: "evenodd",
  d: "M2.207 11.793l5 5a1 1 0 01-1.414 1.414l-5-5a1 1 0 011.414-1.414zm19.586-6a1 1 0 011.414 1.414l-11 11a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414l4.293 4.293zm-3.586 0a1 1 0 010 1.414l-5.999 5.999a1 1 0 01-1.414-1.414l5.999-6a1 1 0 011.414 0z"
});

function SvgIconDelivered(props) {
  return React.createElement("svg", _extends$i({
    viewBox: "0 0 24 24"
  }, props), _ref$i);
}

function _extends$j() { _extends$j = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$j.apply(this, arguments); }

var _ref$j =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-document_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M14 1a1.01 1.01 0 01.25.031l.03.009c.03.009.061.02.091.031l.027.012a.914.914 0 01.195.112c.04.03.078.062.114.098l-.093-.082.011.009.082.073 6 6a1.006 1.006 0 01.21.309l.012.027c.012.03.022.06.031.091l.008.03A.921.921 0 0121 8l-.008-.126.001.01L21 8v12a3 3 0 01-3 3H6a3 3 0 01-3-3V4a3 3 0 013-3h8zm-1 2H6a1 1 0 00-1 1v16a1 1 0 001 1h12a1 1 0 001-1V9h-5a1 1 0 01-.993-.883L13 8V3zm4.585 4L15 4.415V7h2.585z"
});

function SvgIconDocument(props) {
  return React.createElement("svg", _extends$j({
    viewBox: "0 0 24 24"
  }, props), _ref$j);
}

function _extends$k() { _extends$k = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$k.apply(this, arguments); }

var _ref$k =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-download_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M21 16a1 1 0 01.993.883L22 17v3a3 3 0 01-2.824 2.995L19 23H5a3 3 0 01-2.995-2.824L2 20v-3a1 1 0 011.993-.117L4 17v3a1 1 0 00.883.993L5 21h14a1 1 0 00.993-.883L20 20v-3a1 1 0 011-1zM12 1a1 1 0 01.993.883L13 2v11.585l2.293-2.292a1 1 0 011.32-.083l.094.083a1 1 0 01.083 1.32l-.083.094-4 4a1.006 1.006 0 01-.09.08l.09-.08a1.008 1.008 0 01-.674.292L12 17h-.032l-.054-.004L12 17a1.008 1.008 0 01-.613-.21 1.037 1.037 0 01-.094-.083l-4-4a1 1 0 011.32-1.497l.094.083L11 13.585V2a1 1 0 011-1z"
});

function SvgIconDownload(props) {
  return React.createElement("svg", _extends$k({
    viewBox: "0 0 24 24"
  }, props), _ref$k);
}

function _extends$l() { _extends$l = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$l.apply(this, arguments); }

var _ref$l =
/*#__PURE__*/
React.createElement("g", {
  fill: "none",
  fillRule: "evenodd"
}, React.createElement("rect", {
  fill: "#FFF",
  fillRule: "nonzero",
  rx: 10
}), React.createElement("path", {
  className: "icon-file-audio_svg__fill",
  fill: "#7B53EF",
  d: "M18.815 9.185c2.913 2.934 2.913 7.696 0 10.63a.617.617 0 01-.894-.013.67.67 0 01.012-.925 6.215 6.215 0 000-8.754.67.67 0 01-.012-.925.617.617 0 01.894-.013zm-5.291 0a.646.646 0 011.044.517v9.596c0 .544-.62.85-1.044.516l-3.31-2.702H7.646A.65.65 0 017 16.458v-3.916a.65.65 0 01.647-.654h2.566zm2.886 2.42a4.113 4.113 0 010 5.783.617.617 0 01-.893-.012.67.67 0 01.012-.925 2.772 2.772 0 000-3.908.67.67 0 01-.012-.925.617.617 0 01.893-.013z"
}));

function SvgIconFileAudio(props) {
  return React.createElement("svg", _extends$l({
    viewBox: "0 0 28 28"
  }, props), _ref$l);
}

function _extends$m() { _extends$m = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$m.apply(this, arguments); }

var _ref$m =
/*#__PURE__*/
React.createElement("g", {
  fill: "none",
  fillRule: "evenodd"
}, React.createElement("rect", {
  fill: "#FFF",
  fillRule: "nonzero",
  rx: 10
}), React.createElement("path", {
  className: "icon-file-document_svg__fill",
  fill: "#7B53EF",
  d: "M16.317 5.667H9.05C7.907 5.667 7 6.58 7 7.687v12.625c0 1.107.907 2.021 2.05 2.021h9.9c1.143 0 2.05-.914 2.05-2.02v-9.97a.673.673 0 00-.198-.473l-3.95-3.984a.753.753 0 00-.535-.22z"
}), React.createElement("path", {
  fill: "#FFF",
  d: "M17.025 16.667c.354 0 .642.302.642.675 0 .372-.288.675-.642.675h-6.383c-.355 0-.642-.303-.642-.675 0-.373.287-.675.642-.675zm0-2.667c.354 0 .642.302.642.675 0 .373-.288.675-.642.675h-6.383c-.355 0-.642-.302-.642-.675 0-.373.287-.675.642-.675zm-3.357-2.667c.369 0 .668.303.668.675 0 .373-.3.675-.668.675h-3a.672.672 0 01-.668-.675c0-.372.3-.675.668-.675z"
}));

function SvgIconFileDocument(props) {
  return React.createElement("svg", _extends$m({
    viewBox: "0 0 28 28"
  }, props), _ref$m);
}

function _extends$n() { _extends$n = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$n.apply(this, arguments); }

var _ref$n =
/*#__PURE__*/
React.createElement("g", {
  fill: "none",
  fillRule: "evenodd"
}, React.createElement("circle", {
  cx: 28,
  cy: 28,
  r: 28,
  fill: "#FFF",
  fillOpacity: 0.88
}), React.createElement("path", {
  className: "icon-gif_svg__fill",
  fill: "#000",
  fillOpacity: 0.55,
  d: "M20.608 35.182c1.094 0 2.09-.162 2.99-.487.899-.325 1.595-.783 2.087-1.372v-5.296h-5.223v2.015h2.489v2.287c-.438.438-1.17.657-2.197.657-1.02 0-1.796-.356-2.324-1.067-.529-.71-.793-1.762-.793-3.153v-.848c.006-1.38.252-2.418.738-3.117.486-.699 1.194-1.048 2.124-1.048.729 0 1.302.176 1.718.528.416.353.685.909.806 1.668h2.662c-.164-1.434-.69-2.526-1.577-3.276s-2.118-1.126-3.691-1.126c-1.13 0-2.116.257-2.958.77-.842.514-1.486 1.255-1.932 2.224-.447.97-.67 2.116-.67 3.44v.903c.012 1.288.253 2.41.724 3.363.471.954 1.14 1.682 2.006 2.183.865.502 1.873.752 3.021.752zm10.2-.182V21.73h-2.735V35h2.734zm5.268 0v-5.423h5.25V27.37h-5.25v-3.427h5.906v-2.215h-8.64V35h2.734z"
}));

function SvgIconGif(props) {
  return React.createElement("svg", _extends$n({
    viewBox: "0 0 56 56"
  }, props), _ref$n);
}

function _extends$o() { _extends$o = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$o.apply(this, arguments); }

var _ref$o =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-info_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zm0 2a9 9 0 100 18 9 9 0 000-18zm0 8a1 1 0 011 1v4a1 1 0 01-2 0v-4a1 1 0 011-1zm0-3a1 1 0 110 2 1 1 0 010-2z"
});

function SvgIconInfo(props) {
  return React.createElement("svg", _extends$o({
    viewBox: "0 0 24 24"
  }, props), _ref$o);
}

function _extends$p() { _extends$p = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$p.apply(this, arguments); }

var _ref$p =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-leave_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M12 2a1 1 0 01.117 1.993L12 4H4a1 1 0 00-.993.883L3 5v14a1 1 0 00.883.993L4 20h8a1 1 0 01.117 1.993L12 22H4a3 3 0 01-2.995-2.824L1 19V5a3 3 0 012.824-2.995L4 2h8zm6.613 5.21l.094.083 4 4a1 1 0 01.083 1.32l-.083.094-4 4a1 1 0 01-1.497-1.32l.083-.094 1.792-1.793H7.5a1 1 0 01-.117-1.993L7.5 11.5h12.585l-2.792-2.793a1 1 0 01-.083-1.32l.083-.094a1 1 0 011.32-.083z"
});

function SvgIconLeave(props) {
  return React.createElement("svg", _extends$p({
    viewBox: "0 0 24 24"
  }, props), _ref$p);
}

function _extends$q() { _extends$q = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$q.apply(this, arguments); }

var _ref$q =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-members_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M13 14a5 5 0 014.995 4.783L18 19v2a1 1 0 01-1.993.117L16 21v-2a3 3 0 00-2.824-2.995L13 16H5a3 3 0 00-2.995 2.824L2 19v2a1 1 0 01-1.993.117L0 21v-2a5 5 0 014.783-4.995L5 14h8zm7.25.162a5 5 0 013.745 4.611L24 19v2a1 1 0 01-1.993.117L22 21v-2a3 3 0 00-2.25-2.902 1 1 0 11.5-1.936zM9 2a5 5 0 110 10A5 5 0 019 2zm7.248.161a5 5 0 010 9.688 1 1 0 01-.496-1.938 3 3 0 000-5.812 1 1 0 11.496-1.938zM9 4a3 3 0 100 6 3 3 0 000-6z"
});

function SvgIconMembers(props) {
  return React.createElement("svg", _extends$q({
    viewBox: "0 0 24 24"
  }, props), _ref$q);
}

function _extends$r() { _extends$r = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$r.apply(this, arguments); }

var _ref$r =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-notifications_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M13.73 20a1 1 0 01.865 1.502 3 3 0 01-5.19 0 1 1 0 01.752-1.496L10.27 20h3.46zM12 1a8 8 0 017.996 7.75L20 9v5a2 2 0 001.85 1.995l.283.012c1.111.12 1.154 1.73.128 1.965l-.128.021L22 18H2l-.133-.007c-1.156-.124-1.156-1.862 0-1.986l.282-.012a2 2 0 001.845-1.838L4 14V9a8 8 0 018-8zm0 2a6 6 0 00-5.996 5.775L6 9v5c0 .586-.126 1.142-.352 1.643l-.103.212-.082.145h13.073l-.08-.145a3.973 3.973 0 01-.43-1.402l-.021-.253L18 14V9a6 6 0 00-6-6z"
});

function SvgIconNotifications(props) {
  return React.createElement("svg", _extends$r({
    viewBox: "0 0 24 24"
  }, props), _ref$r);
}

function _extends$s() { _extends$s = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$s.apply(this, arguments); }

var _ref$s =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-photo_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M19 2a3 3 0 013 3v14a3 3 0 01-3 3H4.941v-.002l-.117-.003A3 3 0 012 19V5a3 3 0 013-3zm-3 9.415L7.414 20H19a1 1 0 00.993-.883L20 19v-3.585l-4-4zM19 4H5a1 1 0 00-1 1v14a1 1 0 00.65.937L15.292 9.293a1 1 0 011.32-.083l.094.083L20 12.585V5a1 1 0 00-.883-.993L19 4zM8.5 6a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm0 2a.5.5 0 100 1 .5.5 0 000-1z"
});

function SvgIconPhoto(props) {
  return React.createElement("svg", _extends$s({
    viewBox: "0 0 24 24"
  }, props), _ref$s);
}

function _extends$t() { _extends$t = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$t.apply(this, arguments); }

var _ref$t =
/*#__PURE__*/
React.createElement("g", {
  fill: "none",
  fillRule: "evenodd"
}, React.createElement("circle", {
  cx: 28,
  cy: 28,
  r: 28,
  fill: "#FFF",
  fillOpacity: 0.88
}), React.createElement("path", {
  className: "icon-play_svg__fill",
  fill: "#000",
  fillOpacity: 0.55,
  d: "M38.91 29.987c1.009-.63 1.007-1.664.007-2.304l-17.29-11.055c-1.006-.643-1.809-.2-1.793 1.004l.277 21.891c.015 1.198.847 1.657 1.855 1.029L38.91 29.987z"
}));

function SvgIconPlay(props) {
  return React.createElement("svg", _extends$t({
    viewBox: "0 0 56 56"
  }, props), _ref$t);
}

function _extends$u() { _extends$u = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$u.apply(this, arguments); }

var _ref$u =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-plus_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M13 11h7c1.333 0 1.333 2 0 2h-7v7c0 1.333-2 1.333-2 0v-7H4c-1.333 0-1.333-2 0-2h7V4c0-1.333 2-1.333 2 0v7z"
});

function SvgIconPlus(props) {
  return React.createElement("svg", _extends$u({
    viewBox: "0 0 24 24"
  }, props), _ref$u);
}

function _extends$v() { _extends$v = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$v.apply(this, arguments); }

var _ref$v =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-read_svg__fill",
  fill: "#2EBA9F",
  fillRule: "evenodd",
  d: "M2.207 11.793l5 5a1 1 0 01-1.414 1.414l-5-5a1 1 0 011.414-1.414zm19.586-6a1 1 0 011.414 1.414l-11 11a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414l4.293 4.293zm-3.586 0a1 1 0 010 1.414l-5.999 5.999a1 1 0 01-1.414-1.414l5.999-6a1 1 0 011.414 0z"
});

function SvgIconRead(props) {
  return React.createElement("svg", _extends$v({
    viewBox: "0 0 24 24"
  }, props), _ref$v);
}

function _extends$w() { _extends$w = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$w.apply(this, arguments); }

var _ref$w =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-refresh_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M14.419 4.51l.175.167 2.073 1.927V4.167c0-.428.321-.78.736-.828l.097-.006c.427 0 .78.322.828.736l.005.098v5c0 .427-.321.78-.736.827L17.5 10h-5a.833.833 0 01-.097-1.661l.097-.006h3.578L13.44 5.88a5.982 5.982 0 00-7.05-.986C4.083 6.15 2.898 8.756 3.48 11.286c.58 2.534 2.792 4.385 5.425 4.537 2.635.152 5.05-1.433 5.928-3.883a.833.833 0 011.569.561c-1.127 3.15-4.223 5.18-7.593 4.986-3.37-.195-6.206-2.57-6.954-5.828-.748-3.261.778-6.617 3.738-8.229 2.884-1.57 6.453-1.118 8.826 1.08z"
});

function SvgIconRefresh(props) {
  return React.createElement("svg", _extends$w({
    width: 20,
    height: 20
  }, props), _ref$w);
}

function _extends$x() { _extends$x = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$x.apply(this, arguments); }

var _ref$x =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-send_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M20.554 10.117L2.52 1.024C1.613.619.605 1.428 1.008 2.337l2.115 5.685a2 2 0 001.545 1.275l10.345 1.73-10.345 1.728a2 2 0 00-1.545 1.275l-2.115 5.685c-.302.91.605 1.718 1.511 1.213l18.035-9.094c.706-.303.706-1.313 0-1.717z"
});

function SvgIconSend(props) {
  return React.createElement("svg", _extends$x({
    viewBox: "0 0 22 22"
  }, props), _ref$x);
}

function _extends$y() { _extends$y = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$y.apply(this, arguments); }

var _ref$y =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-sent_svg__fill",
  fillOpacity: 0.38,
  fillRule: "evenodd",
  d: "M4.707 11.793a1 1 0 10-1.414 1.414l5 5a1 1 0 001.414 0l11-11a1 1 0 10-1.414-1.414L9 16.086l-4.293-4.293z"
});

function SvgIconSent(props) {
  return React.createElement("svg", _extends$y({
    viewBox: "0 0 24 24"
  }, props), _ref$y);
}

function _extends$z() { _extends$z = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$z.apply(this, arguments); }

var _ref$z =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-shevron_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M8.293 17.293a1 1 0 001.414 1.414l6-6a1 1 0 000-1.414l-6-6a1 1 0 00-1.414 1.414L13.586 12l-5.293 5.293z"
});

function SvgIconShevron(props) {
  return React.createElement("svg", _extends$z({
    viewBox: "0 0 24 24"
  }, props), _ref$z);
}

function _extends$A() { _extends$A = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$A.apply(this, arguments); }

var _ref$A =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-shevron-down_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M6.045 8.205a1.125 1.125 0 10-1.59 1.59l6.75 6.75c.439.44 1.151.44 1.59 0l6.75-6.75a1.125 1.125 0 10-1.59-1.59L12 14.159 6.045 8.205z"
});

function SvgIconShevronDown(props) {
  return React.createElement("svg", _extends$A({
    viewBox: "0 0 24 24"
  }, props), _ref$A);
}

function _extends$B() { _extends$B = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$B.apply(this, arguments); }

var _ref$B =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-spinner-small_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M12 22.5c5.799 0 10.5-4.701 10.5-10.5S17.799 1.5 12 1.5 1.5 6.201 1.5 12a1.432 1.432 0 002.864 0A7.636 7.636 0 1112 19.636a1.432 1.432 0 000 2.864z"
});

function SvgIconSpinnerSmall(props) {
  return React.createElement("svg", _extends$B({
    viewBox: "0 0 24 24"
  }, props), _ref$B);
}

function _extends$C() { _extends$C = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$C.apply(this, arguments); }

var _ref$C =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-user_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M16 14a5 5 0 014.995 4.783L21 19v2a1 1 0 01-1.993.117L19 21v-2a3 3 0 00-2.824-2.995L16 16H8a3 3 0 00-2.995 2.824L5 19v2a1 1 0 01-1.993.117L3 21v-2a5 5 0 014.783-4.995L8 14h8zM12 2a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z"
});

function SvgIconUser(props) {
  return React.createElement("svg", _extends$C({
    viewBox: "0 0 24 24"
  }, props), _ref$C);
}

var Colors$1 = {
  DEFAULT: 'DEFAULT',
  PRIMARY: 'PRIMARY',
  SECONDARY: 'SECONDARY',
  CONTENT: 'CONTENT',
  WHITE: 'WHITE',
  SENT: 'SENT',
  READ: 'READ'
};

function changeColorToClassName$1(color) {
  switch (color) {
    case Colors$1.PRIMARY:
      return 'sendbird-color--primary';

    case Colors$1.SECONDARY:
      return 'sendbird-color--secondary';

    case Colors$1.CONTENT:
      return 'sendbird-color--content';

    case Colors$1.WHITE:
      return 'sendbird-color--white';

    case Colors$1.SENT:
      return 'sendbird-color--sent';

    case Colors$1.READ:
      return 'sendbird-color--read';

    default:
      return '';
  }
}

function changeTypeToIconComponent(type) {
  switch (type) {
    case Type.ADD:
      return React.createElement(SvgIconAdd, null);

    case Type.ARROW_LEFT:
      return React.createElement(SvgIconArrowLeft, null);

    case Type.CAMERA:
      return React.createElement(SvgIconCamera, null);

    case Type.ATTACH:
      return React.createElement(SvgIconAttach, null);

    case Type.MORE:
      return React.createElement(SvgIconMore, null);

    case Type.MUTE:
      return React.createElement(SvgIconMute, null);

    case Type.CHECKBOX:
      return React.createElement(SvgIconCheckbox, null);

    case Type.CHECKBOX_OFF:
      return React.createElement(SvgIconCheckboxOff, null);

    case Type.CLOSE:
      return React.createElement(SvgIconClose, null);

    case Type.COPY:
      return React.createElement(SvgIconCopy, null);

    case Type.CHAT:
      return React.createElement(SvgIconChat, null);

    case Type.CREATE:
      return React.createElement(SvgIconCreate, null);

    case Type.DELETE:
      return React.createElement(SvgIconDelete, null);

    case Type.DUMMY:
      return React.createElement(SvgIconDummy, null);

    case Type.EDIT:
      return React.createElement(SvgIconEdit, null);

    case Type.ERROR:
      return React.createElement(SvgIconError, null);

    case Type.ERROR_FILLED:
      return React.createElement(SvgIconErrorFilled, null);

    case Type.DELIVERED:
      return React.createElement(SvgIconDelivered, null);

    case Type.DOCUMENT:
      return React.createElement(SvgIconDocument, null);

    case Type.DOWNLOAD:
      return React.createElement(SvgIconDownload, null);

    case Type.FILE_AUDIO:
      return React.createElement(SvgIconFileAudio, null);

    case Type.FILE_DOCUMENT:
      return React.createElement(SvgIconFileDocument, null);

    case Type.GIF:
      return React.createElement(SvgIconGif, null);

    case Type.INFO:
      return React.createElement(SvgIconInfo, null);

    case Type.LEAVE:
      return React.createElement(SvgIconLeave, null);

    case Type.MEMBERS:
      return React.createElement(SvgIconMembers, null);

    case Type.NOTIFICATIONS:
      return React.createElement(SvgIconNotifications, null);

    case Type.PHOTO:
      return React.createElement(SvgIconPhoto, null);

    case Type.PLAY:
      return React.createElement(SvgIconPlay, null);

    case Type.PLUS:
      return React.createElement(SvgIconPlus, null);

    case Type.READ:
      return React.createElement(SvgIconRead, null);

    case Type.REFRESH:
      return React.createElement(SvgIconRefresh, null);

    case Type.SEND:
      return React.createElement(SvgIconSend, null);

    case Type.SENT:
      return React.createElement(SvgIconSent, null);

    case Type.SHEVRON:
      return React.createElement(SvgIconShevron, null);

    case Type.SHEVRON_DOWN:
      return React.createElement(SvgIconShevronDown, null);

    case Type.SPINNER:
      return React.createElement(SvgIconSpinnerSmall, null);

    case Type.USER:
      return React.createElement(SvgIconUser, null);

    default:
      return null;
  }
}

function Icon(_ref) {
  var type = _ref.type,
      width = _ref.width,
      height = _ref.height,
      children = _ref.children,
      className = _ref.className,
      onClick = _ref.onClick,
      fillColor = _ref.fillColor;
  var style = {
    width: typeof width === 'string' ? width : "".concat(width, "px"),
    height: typeof height === 'string' ? height : "".concat(height, "px")
  };
  var injectingClassName = Array.isArray(className) ? className : [className];
  return React.createElement("div", {
    onClick: onClick,
    onKeyDown: onClick,
    role: "button",
    tabIndex: "0",
    className: [].concat(_toConsumableArray(injectingClassName), ['sendbird-icon', changeColorToClassName$1(fillColor)]).join(' '),
    style: style
  }, children || changeTypeToIconComponent(type));
}
Icon.propTypes = {
  type: PropTypes.oneOfType([PropTypes.oneOf(Object.keys(Type)), PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
  children: PropTypes.element,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  fillColor: PropTypes.oneOf(Object.keys(Colors$1))
};
Icon.defaultProps = {
  type: '',
  onClick: function onClick() {},
  width: 26,
  height: 26,
  children: null,
  className: '',
  fillColor: Colors$1.DEFAULT
};
var IconTypes = Type;
var IconColors = Colors$1;

// simple component to be used as modal root
var MODAL_ROOT = 'sendbird-modal-root';
var ModalRoot = (function () {
  return React.createElement("div", {
    id: MODAL_ROOT
  });
});

var Type$1 = {
  PRIMARY: 'PRIMARY',
  SECONDARY: 'SECONDARY',
  DANGER: 'DANGER',
  DISABLED: 'DISABLED'
};
var Size = {
  BIG: 'BIG',
  SMALL: 'SMALL'
};

function changeTypeToClassName(type) {
  switch (type) {
    case Type$1.PRIMARY:
      return 'sendbird-button--primary';

    case Type$1.SECONDARY:
      return 'sendbird-button--secondary';

    case Type$1.DANGER:
      return 'sendbird-button--danger';

    case Type$1.DISABLED:
      return 'sendbird-button--disabled';

    default:
      return null;
  }
}
function changeSizeToClassName(size) {
  switch (size) {
    case Size.BIG:
      return 'sendbird-button--big';

    case Size.SMALL:
      return 'sendbird-button--small';

    default:
      return null;
  }
}

function Button(_ref) {
  var type = _ref.type,
      size = _ref.size,
      children = _ref.children,
      onClick = _ref.onClick,
      className = _ref.className;
  var injectingClassNames = ['sendbird-button', changeTypeToClassName(type), changeSizeToClassName(size)].concat(_toConsumableArray(Array.isArray(className) ? className : [className])).join(' ');
  return React.createElement("button", {
    type: "button",
    className: injectingClassNames,
    onClick: onClick
  }, React.createElement(Label, {
    className: "sendbird-button__text",
    type: LabelTypography.BUTTON_1,
    color: LabelColors.ONCONTENT_1
  }, children));
}
Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  type: PropTypes.oneOf(Object.keys(Type$1)),
  size: PropTypes.oneOf(Object.keys(Size)),
  onClick: PropTypes.func,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
};
Button.defaultProps = {
  children: 'Button',
  type: Type$1.PRIMARY,
  size: Size.BIG,
  onClick: function onClick() {},
  className: ''
};

var ModalHeader = function ModalHeader(_ref) {
  var titleText = _ref.titleText;
  return React.createElement("div", {
    className: "sendbird-modal-header"
  }, React.createElement(Label, {
    type: LabelTypography.H_1,
    color: LabelColors.ONBACKGROUND_1
  }, titleText));
};
ModalHeader.propTypes = {
  titleText: PropTypes.string.isRequired
};
var ModalBody = function ModalBody(_ref2) {
  var children = _ref2.children;
  return React.createElement("div", {
    className: "sendbird-modal-body"
  }, children);
};
ModalBody.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element.isRequired, PropTypes.arrayOf(PropTypes.element.isRequired)])
};
ModalBody.defaultProps = {
  children: null
};
var ModalFooter = function ModalFooter(_ref3) {
  var onSubmit = _ref3.onSubmit,
      onCancel = _ref3.onCancel,
      submitText = _ref3.submitText,
      type = _ref3.type;
  return React.createElement("div", {
    className: "sendbird-modal-footer"
  }, React.createElement(Button, {
    type: Type$1.SECONDARY,
    onClick: onCancel
  }, React.createElement(Label, {
    type: LabelTypography.BUTTON_1,
    color: LabelColors.ONBACKGROUND_1
  }, LabelStringSet.BUTTON__CANCEL)), React.createElement(Button, {
    type: type,
    onClick: onSubmit
  }, submitText));
};
ModalFooter.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string.isRequired,
  type: PropTypes.string
};
ModalFooter.defaultProps = {
  type: Type$1.DANGER
};

function Modal(props) {
  var children = props.children,
      onCancel = props.onCancel,
      onSubmit = props.onSubmit,
      submitText = props.submitText,
      titleText = props.titleText,
      hideFooter = props.hideFooter,
      type = props.type;
  return createPortal(React.createElement("div", {
    className: "sendbird-modal"
  }, React.createElement("div", {
    className: "sendbird-modal-content"
  }, React.createElement(ModalHeader, {
    titleText: titleText
  }), React.createElement(ModalBody, null, children), !hideFooter && React.createElement(ModalFooter, {
    onCancel: onCancel,
    onSubmit: onSubmit,
    submitText: submitText,
    type: type
  }), React.createElement("div", {
    className: "sendbird-modal-close"
  }, React.createElement(IconButton, {
    width: "32px",
    height: "32px",
    onClick: onCancel
  }, React.createElement(Icon, {
    type: IconTypes.CLOSE,
    fillColor: IconColors.SECONDARY,
    width: "24px",
    height: "24px"
  })))), React.createElement("div", {
    className: "sendbird-modal-backdrop"
  })), document.getElementById(MODAL_ROOT));
}

Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  hideFooter: PropTypes.bool,
  type: PropTypes.string
};
Modal.defaultProps = {
  children: null,
  hideFooter: false,
  type: Type$1.DANGER
};

function Checkbox(_ref) {
  var id = _ref.id,
      checked = _ref.checked,
      onChange = _ref.onChange;

  var _useState = useState(checked),
      _useState2 = _slicedToArray(_useState, 2),
      isChecked = _useState2[0],
      setCheck = _useState2[1];

  return React.createElement("label", {
    className: "sendbird-checkbox",
    htmlFor: id
  }, React.createElement("input", {
    id: id,
    type: "checkbox",
    checked: isChecked,
    onClick: function onClick() {
      return setCheck(!isChecked);
    },
    onChange: onChange
  }), React.createElement("span", {
    className: "sendbird-checkbox--checkmark"
  }));
}
Checkbox.propTypes = {
  id: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func
};
Checkbox.defaultProps = {
  id: 'sendbird-checkbox-input',
  checked: false,
  onChange: function onChange() {}
};

var filterUser = function filterUser(idsToFilter) {
  return function (currentId) {
    return idsToFilter.includes(currentId);
  };
};

var InviteMembers = function InviteMembers(props) {
  var userQueryCreator = props.userQueryCreator,
      closeModal = props.closeModal,
      _onSubmit = props.onSubmit,
      submitText = props.submitText,
      titleText = props.titleText,
      idsToFilter = props.idsToFilter,
      swapParams = props.swapParams;

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      users = _useState2[0],
      setUsers = _useState2[1];

  var _useState3 = useState({}),
      _useState4 = _slicedToArray(_useState3, 2),
      selectedUsers = _useState4[0],
      setSelectedUsers = _useState4[1];

  var _useState5 = useState({}),
      _useState6 = _slicedToArray(_useState5, 2),
      usersDataSource = _useState6[0],
      setUsersDataSource = _useState6[1];

  var selectedCount = Object.keys(selectedUsers).length;
  useEffect(function () {
    var applicationUserListQuery = userQueryCreator();
    setUsersDataSource(applicationUserListQuery);
    applicationUserListQuery.next(function (res, err) {
      // eslint-disable-next-line no-underscore-dangle
      var users_ = res;
      var error = err;

      if (swapParams) {
        users_ = err;
        error = users_;
      }

      if (error) {
        return;
      }

      setUsers(users_);
    });
  }, []);
  return React.createElement(Modal, {
    onCancel: closeModal,
    onSubmit: function onSubmit() {
      var selectedUserList = Object.keys(selectedUsers);

      if (selectedUserList.length > 0) {
        _onSubmit(selectedUserList);

        closeModal();
      }
    },
    submitText: submitText,
    titleText: titleText,
    type: Type$1.PRIMARY
  }, React.createElement("div", null, React.createElement(Label, {
    color: selectedCount > 0 ? LabelColors.PRIMARY : LabelColors.ONBACKGROUND_3,
    type: LabelTypography.CAPTION_1
  }, "".concat(selectedCount, " ").concat(LabelStringSet.MODAL__INVITE_MEMBER__SELECTEC)), React.createElement("div", {
    className: "sendbird-create-channel--scroll",
    onScroll: function onScroll(e) {
      var hasNext = usersDataSource.hasNext;
      var fetchMore = e.target.clientHeight + e.target.scrollTop === e.target.scrollHeight;

      if (hasNext && fetchMore) {
        usersDataSource.next(function (usersBatch, error) {
          if (error) {
            return;
          }

          setUsers([].concat(_toConsumableArray(users), _toConsumableArray(usersBatch)));
        });
      }
    }
  }, users.map(function (user) {
    return !filterUser(idsToFilter)(user.userId) && React.createElement("div", {
      key: user.userId,
      className: "sendbird-create-channel--user-row"
    }, React.createElement("div", {
      className: "sendbird-create-channel--user-row--avatar"
    }, React.createElement(Avatar, {
      height: "40px",
      width: "40px",
      src: user.profileUrl
    })), React.createElement("div", {
      className: "sendbird-create-channel--user-row--label"
    }, React.createElement(Label, {
      type: LabelTypography.SUBTITLE_1,
      color: LabelColors.ONBACKGROUND_1
    }, user.nickname || user.userId)), React.createElement("label", {
      htmlFor: user.userId,
      className: "sendbird-create-channel--user-row--checkbox"
    }, React.createElement(Checkbox, {
      id: user.userId,
      checked: selectedUsers[user.userId],
      onChange: function onChange(event) {
        var modifiedSelectedUsers = _objectSpread2({}, selectedUsers, _defineProperty({}, event.target.id, event.target.checked));

        if (!event.target.checked) {
          delete modifiedSelectedUsers[event.target.id];
        }

        setSelectedUsers(modifiedSelectedUsers);
      }
    })));
  }))));
};

InviteMembers.propTypes = {
  idsToFilter: PropTypes.arrayOf(PropTypes.string),
  swapParams: PropTypes.bool,
  userQueryCreator: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string,
  titleText: PropTypes.string
};
InviteMembers.defaultProps = {
  swapParams: false,
  submitText: 'create',
  titleText: 'Create new channel',
  idsToFilter: []
};

var createChannel = function createChannel(sdk, selectedUsers) {
  return new Promise(function (resolve, reject) {
    sdk.GroupChannel.createChannelWithUserIds(selectedUsers, false, // 'distinct' is false
    '', // NAME
    '', // COVER_IMAGE_OR_URL
    '', // DATA
    function (response, error) {
      var swapParams = sdk.getErrorFirstCallback();
      var groupChannel = response;
      var err = error;

      if (swapParams) {
        groupChannel = error;
        err = response;
      }

      if (err) {
        reject(err);
      }

      resolve(groupChannel);
    });
  });
};

function AddChannel(_ref) {
  var sdk = _ref.sdk,
      channelListDispatcher = _ref.channelListDispatcher,
      userId = _ref.userId,
      userListQuery = _ref.userListQuery;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      showModal = _useState2[0],
      setshowModal = _useState2[1];

  if (!sdk || !sdk.createApplicationUserListQuery) {
    return null;
  }

  return React.createElement(React.Fragment, null, React.createElement(IconButton, {
    height: "32px",
    width: "32px",
    onClick: function onClick() {
      setshowModal(true);
    }
  }, React.createElement(Icon, {
    type: IconTypes.CREATE,
    fillColor: IconColors.PRIMARY,
    width: "24px",
    height: "24px"
  })), showModal && React.createElement(InviteMembers, {
    swapParams: sdk && sdk.getErrorFirstCallback && sdk.getErrorFirstCallback(),
    titleText: LabelStringSet.MODAL__CREATE_CHANNEL__TITLE,
    submitText: LabelStringSet.BUTTON__CREATE,
    closeModal: function closeModal() {
      return setshowModal(false);
    },
    idsToFilter: [userId],
    userQueryCreator: function userQueryCreator() {
      return userListQuery && typeof userListQuery === 'function' ? userListQuery() : sdk.createApplicationUserListQuery();
    },
    onSubmit: function onSubmit(selectedUsers) {
      return createChannel(sdk, selectedUsers).then(function (channel) {
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
  channelListDispatcher: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  userListQuery: PropTypes.func
};
AddChannel.defaultProps = {
  userListQuery: null
};

var MenuItem = function MenuItem(_ref) {
  var children = _ref.children,
      onClick = _ref.onClick;
  return React.createElement("li", {
    tabIndex: 0,
    className: "sendbird-dropdown__menu-item",
    onClick: onClick,
    onKeyPress: function onKeyPress(e) {
      if (e.keyCode === 13) {
        onClick(e);
      }
    },
    role: "menuitem"
  }, React.createElement(Label, {
    type: LabelTypography.SUBTITLE_2,
    color: LabelColors.ONBACKGROUND_1,
    className: "sendbird-dropdown__menu-item__text"
  }, children));
};
MenuItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired
};
var MenuRoot = function MenuRoot() {
  return React.createElement("div", {
    id: "sendbird-dropdown-portal"
  });
};
var MenuItems =
/*#__PURE__*/
function (_Component) {
  _inherits(MenuItems, _Component);

  function MenuItems(props) {
    var _this;

    _classCallCheck(this, MenuItems);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MenuItems).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "setupEvents", function () {
      var closeDropdown = _this.props.closeDropdown;

      var _assertThisInitialize = _assertThisInitialized(_this),
          menuRef = _assertThisInitialize.menuRef;

      var handleClickOutside = function handleClickOutside(event) {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          closeDropdown();
        }
      };

      _this.setState({
        handleClickOutside: handleClickOutside
      });

      document.addEventListener('mousedown', handleClickOutside);
    });

    _defineProperty(_assertThisInitialized(_this), "cleanUpEvents", function () {
      var handleClickOutside = _this.state.handleClickOutside;
      document.removeEventListener('mousedown', handleClickOutside);
    });

    _defineProperty(_assertThisInitialized(_this), "getMenuPosition", function () {
      var _this$props = _this.props,
          parentRef = _this$props.parentRef,
          openLeft = _this$props.openLeft;
      var parentRect = parentRef.current.getBoundingClientRect();
      var x = parentRect.x || parentRect.left;
      var y = parentRect.y || parentRect.top;
      var menuStyle = {
        top: y,
        left: x
      };
      if (!_this.menuRef.current) return menuStyle;
      var _window = window,
          innerWidth = _window.innerWidth,
          innerHeight = _window.innerHeight;

      var rect = _this.menuRef.current.getBoundingClientRect();

      if (y + rect.height > innerHeight) {
        menuStyle.top -= rect.height;
      }

      if (x + rect.width > innerWidth && !openLeft) {
        menuStyle.left -= rect.width;
      }

      if (menuStyle.top < 0) {
        menuStyle.top = rect.height < innerHeight ? (innerHeight - rect.height) / 2 : 0;
      }

      if (menuStyle.left < 0) {
        menuStyle.left = rect.width < innerWidth ? (innerWidth - rect.width) / 2 : 0;
      }

      menuStyle.top += 32;

      if (openLeft) {
        menuStyle.left -= 108;
      }

      return _this.setState({
        menuStyle: menuStyle
      });
    });

    _this.menuRef = React.createRef();
    _this.state = {
      menuStyle: {},
      handleClickOutside: function handleClickOutside() {}
    };
    return _this;
  }

  _createClass(MenuItems, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setupEvents();
      this.getMenuPosition();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.cleanUpEvents();
    }
  }, {
    key: "render",
    value: function render() {
      var menuStyle = this.state.menuStyle;
      var children = this.props.children;
      return createPortal(React.createElement(React.Fragment, null, React.createElement("div", {
        className: "sendbird-dropdown__menu-backdrop"
      }), React.createElement("ul", {
        className: "sendbird-dropdown__menu",
        ref: this.menuRef,
        style: {
          display: 'inline-block',
          position: 'fixed',
          left: "".concat(Math.round(menuStyle.left), "px"),
          top: "".concat(Math.round(menuStyle.top), "px")
        }
      }, children)), document.getElementById('sendbird-dropdown-portal'));
    }
  }]);

  return MenuItems;
}(Component);
MenuItems.propTypes = {
  closeDropdown: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]).isRequired,
  // https://stackoverflow.com/a/51127130
  parentRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  })]).isRequired,
  openLeft: PropTypes.bool
};
MenuItems.defaultProps = {
  openLeft: false
};
function ContextMenu(_ref2) {
  var menuTrigger = _ref2.menuTrigger,
      menuItems = _ref2.menuItems;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      showMenu = _useState2[0],
      setShowMenu = _useState2[1];

  return React.createElement("div", {
    style: {
      display: 'inline'
    }
  }, menuTrigger(function () {
    return setShowMenu(!showMenu);
  }), showMenu && menuItems(function () {
    return setShowMenu(false);
  }));
}
ContextMenu.propTypes = {
  menuTrigger: PropTypes.func.isRequired,
  menuItems: PropTypes.func.isRequired
};

var LeaveChannel = function LeaveChannel(props) {
  var onCloseModal = props.onCloseModal,
      onLeaveChannel = props.onLeaveChannel;
  return React.createElement(Modal, {
    onCancel: onCloseModal,
    onSubmit: onLeaveChannel,
    submitText: "Leave",
    titleText: "Leave this channel?"
  });
};

LeaveChannel.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  onLeaveChannel: PropTypes.func.isRequired
};

function ChannelPreviewAction(_ref) {
  var onLeaveChannel = _ref.onLeaveChannel;
  var parentRef = useRef(null);

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      showModal = _useState2[0],
      setShowModal = _useState2[1];

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
        closeDropdown: closeDropdown
      }, React.createElement(MenuItem, {
        onClick: function onClick() {
          setShowModal(true);
          closeDropdown();
        }
      }, LabelStringSet.CHANNEL_SETTING__LEAVE_CHANNEL__TITLE));
    }
  }), showModal && React.createElement(LeaveChannel, {
    onCloseModal: function onCloseModal() {
      return setShowModal(false);
    },
    onLeaveChannel: onLeaveChannel
  }));
}
ChannelPreviewAction.propTypes = {
  onLeaveChannel: PropTypes.func.isRequired
};

function Loader(_ref) {
  var children = _ref.children,
      className = _ref.className,
      width = _ref.width,
      height = _ref.height;
  var injectingClassName = Array.isArray(className) ? className : [className];
  return React.createElement("div", {
    className: [].concat(_toConsumableArray(injectingClassName), ['sendbird-loader']).join(' '),
    style: {
      width: typeof width === 'string' ? width : "".concat(width, "px"),
      height: typeof height === 'string' ? height : "".concat(height, "px")
    }
  }, children);
}
Loader.propTypes = {
  children: PropTypes.element,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
Loader.defaultProps = {
  children: React.createElement(Icon, {
    type: IconTypes.SPINNER,
    width: "26px",
    height: "26px"
  }),
  className: '',
  width: '26px',
  height: '26px'
};

function PlaceHolder(_ref) {
  var className = _ref.className,
      type = _ref.type,
      retryToConnect = _ref.retryToConnect;
  var injectingClassName = Array.isArray(className) ? className : [className];
  return React.createElement("div", {
    className: [].concat(_toConsumableArray(injectingClassName), ['sendbird-place-holder']).join(' ')
  }, type === PlaceHolderTypes.LOADING ? React.createElement(Loader, {
    width: "48px",
    height: "48px"
  }, React.createElement(Icon, {
    type: IconTypes.SPINNER,
    width: "48px",
    height: "48px"
  })) : null, type === PlaceHolderTypes.NO_CHANNELS || type === PlaceHolderTypes.WRONG ? React.createElement("div", {
    className: "sendbird-place-holder__body"
  }, React.createElement(Icon, {
    className: "sendbird-place-holder__body__icon",
    type: IconTypes.CHAT,
    width: "64px",
    height: "64px"
  }), React.createElement(Label, {
    className: "sendbird-place-holder__body__text",
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_2
  }, type === PlaceHolderTypes.NO_CHANNELS ? LabelStringSet.PLACE_HOLDER__NO_CHANNEL : LabelStringSet.PLACE_HOLDER__WRONG), retryToConnect ? React.createElement("div", {
    className: "sendbird-place-holder__body__reconnect",
    role: "button",
    tabIndex: 0,
    onClick: retryToConnect,
    onKeyPress: retryToConnect
  }, React.createElement(Icon, {
    className: "sendbird-place-holder__body__reconnect__icon",
    type: IconTypes.REFRESH,
    width: "20px",
    height: "20px"
  }), React.createElement(Label, {
    className: "sendbird-place-holder__body__reconnect__text",
    type: LabelTypography.BUTTON_1,
    color: LabelColors.PRIMARY
  }, LabelStringSet.PLACE_HOLDER__RETRY_TO_CONNECT)) : null) : null);
}
PlaceHolder.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  type: PropTypes.oneOfType([PropTypes.oneOf(Object.keys(PlaceHolderTypes)), PropTypes.string]).isRequired,
  retryToConnect: PropTypes.func
};
PlaceHolder.defaultProps = {
  className: '',
  retryToConnect: null
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
      channelListDispatcher = _ref.channelListDispatcher;
  var ChannelHandler = new sdk.ChannelHandler();

  ChannelHandler.onChannelChanged = function (channel) {
    channelListDispatcher({
      type: ON_CHANNEL_CHANGED,
      payload: channel
    });
  };

  ChannelHandler.onChannelDeleted = function (channelUrl) {
    channelListDispatcher({
      type: ON_CHANNEL_DELETED,
      payload: channelUrl
    });
  };

  ChannelHandler.onUserJoined = function (channel) {
    if (channel.lastMessage) {
      channelListDispatcher({
        type: ON_USER_JOINED,
        payload: channel
      });
    }
  };

  ChannelHandler.onUserLeft = function (channel) {
    channelListDispatcher({
      type: ON_USER_LEFT,
      payload: channel
    });
  };

  ChannelHandler.onReadStatus = function (channel) {
    channelListDispatcher({
      type: ON_READ_RECEIPT_UPDATED,
      payload: channel
    });
  };

  ChannelHandler.onDeliveryReceiptUpdated = function (channel) {
    if (channel.lastMessage) {
      channelListDispatcher({
        type: ON_DELIVERY_RECEIPT_UPDATED,
        payload: channel
      });
    }
  };

  sdk.addChannelHandler(sdkChannelHandlerId, ChannelHandler);
};
/**
 * Setup event listener
 * create channel source query
 * addloading screen
 */


function setupChannelList(_ref2) {
  var sdk = _ref2.sdk,
      sdkChannelHandlerId = _ref2.sdkChannelHandlerId,
      channelListDispatcher = _ref2.channelListDispatcher,
      setChannelSource = _ref2.setChannelSource,
      onChannelSelect = _ref2.onChannelSelect;
  createEventHandler({
    sdk: sdk,
    channelListDispatcher: channelListDispatcher,
    sdkChannelHandlerId: sdkChannelHandlerId
  });
  var channelListQuery = sdk.GroupChannel.createMyGroupChannelListQuery();
  channelListQuery.includeEmpty = false;
  channelListQuery.order = 'latest_last_message'; // 'chronological', 'latest_last_message', 'channel_name_alphabetical', and 'metadata_value_alphabetical'

  channelListQuery.limit = 20; // The value of pagination limit could be set up to 100.

  setChannelSource(channelListQuery);
  channelListDispatcher({
    type: INIT_CHANNELS_START
  });

  if (channelListQuery.hasNext) {
    channelListQuery.next(function (response, error) {
      var swapParams = sdk.getErrorFirstCallback();
      var channelList = response;
      var err = error;

      if (swapParams) {
        channelList = error;
        err = response;
      }

      if (err) {
        channelListDispatcher({
          type: INIT_CHANNELS_FAILURE
        });
        return;
      } // select first channel


      onChannelSelect(channelList[0]);
      channelListDispatcher({
        type: INIT_CHANNELS_SUCCESS,
        payload: channelList
      });

      if (channelList && typeof channelList.forEach === 'function') {
        channelList.forEach(function (c) {
          return c.markAsDelivered();
        });
      }
    });
  }
}

var noop = function noop() {};

function ChannelList(props) {
  var _props$stores = props.stores,
      _props$stores$sdkStor = _props$stores.sdkStore,
      sdkStore = _props$stores$sdkStor === void 0 ? {} : _props$stores$sdkStor,
      _props$stores$userSto = _props$stores.userStore,
      userStore = _props$stores$userSto === void 0 ? {} : _props$stores$userSto,
      _props$config = props.config,
      userId = _props$config.userId,
      userListQuery = _props$config.userListQuery,
      renderChannelPreview = props.renderChannelPreview,
      onChannelSelect = props.onChannelSelect;
  var _sdkStore$sdk = sdkStore.sdk,
      sdk = _sdkStore$sdk === void 0 ? {} : _sdkStore$sdk;
  var sdkError = sdkStore.error;
  var _userStore$user = userStore.user,
      user = _userStore$user === void 0 ? {} : _userStore$user;
  var sdkIntialized = sdkStore.initialized;

  var _useReducer = useReducer(reducer$2, channelListInitialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      channelListStore = _useReducer2[0],
      channelListDispatcher = _useReducer2[1];

  var _useState = useState({}),
      _useState2 = _slicedToArray(_useState, 2),
      channelSource = _useState2[0],
      setChannelSource = _useState2[1];

  var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      sdkChannelHandlerId = _useState4[0],
      setSdkChannelHandlerId = _useState4[1];

  var loading = channelListStore.loading,
      currentChannel = channelListStore.currentChannel;
  useEffect(function () {
    setSdkChannelHandlerId(uuidv4);

    if (sdkIntialized) {
      setupChannelList({
        sdk: sdk,
        sdkChannelHandlerId: sdkChannelHandlerId,
        channelListDispatcher: channelListDispatcher,
        setChannelSource: setChannelSource,
        onChannelSelect: onChannelSelect
      });
    } else {
      // remove previous channelHandlers
      if (sdk && sdk.removeChannelHandler) {
        sdk.removeChannelHandler(sdkChannelHandlerId);
      } // remove channelSource


      setChannelSource({}); // cleanup

      channelListDispatcher({
        type: RESET_CHANNEL_LIST
      });
    }

    return function () {
      if (sdk && sdk.removeChannelHandler) {
        sdk.removeChannelHandler(sdkChannelHandlerId);
      }
    };
  }, [sdkIntialized]);
  var allChannels = channelListStore.allChannels;
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
  return React.createElement("div", {
    className: "sendbird-channel-list"
  }, React.createElement("div", {
    className: "sendbird-channel-list__header"
  }, React.createElement(ChannelHeader, {
    title: "Channels",
    iconButton: React.createElement(AddChannel, {
      userListQuery: userListQuery,
      sdk: sdk,
      channelListDispatcher: channelListDispatcher,
      userId: userId
    })
  })), React.createElement("div", {
    className: "sendbird-channel-list__body",
    onScroll: function onScroll(e) {
      var fetchMore = e.target.clientHeight + e.target.scrollTop === e.target.scrollHeight;

      if (fetchMore && channelSource.hasNext) {
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
            channelListDispatcher({
              type: FETCH_CHANNELS_FAILURE,
              payload: channelList
            });
            return;
          }

          channelListDispatcher({
            type: FETCH_CHANNELS_SUCCESS,
            payload: channelList
          });

          if (channelList && typeof channelList.forEach === 'function') {
            channelList.forEach(function (c) {
              return c.markAsDelivered();
            });
          }
        });
      }
    }
  }, sdkError && React.createElement(ChannelsPlaceholder, {
    type: PlaceHolderTypes.WRONG
  }), React.createElement("div", null, allChannels && allChannels.map(function (channel, idx) {
    var _onLeaveChannel = function onLeaveChannel(c, cb) {
      c.leave(function (response, error) {
        var swapParams = sdk.getErrorFirstCallback();
        var res = response;
        var err = error;

        if (swapParams) {
          res = error;
          err = response;
        }

        if (cb) {
          cb(res, err);
        }

        if (!err) {
          channelListDispatcher({
            type: LEAVE_CHANNEL_SUCCESS,
            payload: channel.url
          });
        }
      });
    };

    var onClick = function onClick() {
      onChannelSelect(channel);
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
      isActive: channel.url === currentChannel // todo - potential performance hit refactor
      ,
      ChannelAction: React.createElement(ChannelPreviewAction, {
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
  config: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    userListQuery: PropTypes.func
  }).isRequired,
  renderChannelPreview: PropTypes.element,
  onChannelSelect: PropTypes.func
};
ChannelList.defaultProps = {
  renderChannelPreview: null,
  onChannelSelect: noop
};
var ChannelList$1 = withSendbirdContext(ChannelList);

var RESET_MESSAGES = 'RESET_MESSAGES';
var GET_PREV_MESSAGES_START = 'GET_PREV_MESSAGES_START';
var GET_PREV_MESSAGES_SUCESS = 'GET_PREV_MESSAGES_SUCESS';
var SEND_MESSAGEGE_START = 'SEND_MESSAGEGE_START';
var SEND_MESSAGEGE_SUCESS = 'SEND_MESSAGEGE_SUCESS';
var SEND_MESSAGEGE_FAILURE = 'SEND_MESSAGEGE_FAILURE';
var ON_MESSAGE_RECEIVED = 'ON_MESSAGE_RECEIVED';
var ON_MESSAGE_UPDATED = 'ON_MESSAGE_UPDATED';
var ON_MESSAGE_DELETED = 'ON_MESSAGE_DELETED';
var SET_CURRENT_CHANNEL$1 = 'SET_CURRENT_CHANNEL';
var MARK_AS_READ = 'MARK_AS_READ';

var messagesInitialState = {
  initialized: false,
  loading: false,
  allMessages: [],
  currentChannel: null,
  hasMore: false,
  unreadCount: 0,
  unreadSince: null
};

var isEmpty = function isEmpty(val) {
  return val === null || val === undefined;
}; // Some Ids return string and number inconsistently
// only use to comapre IDs


function compareIds (a, b) {
  if (isEmpty(a) || isEmpty(b)) {
    return false;
  }

  var aString = a.toString();
  var bString = b.toString();
  return aString === bString;
}

function reducer$3(state, action) {
  switch (action.type) {
    case RESET_MESSAGES:
      return messagesInitialState;

    case GET_PREV_MESSAGES_START:
      return _objectSpread2({}, state, {
        loading: true
      });

    case GET_PREV_MESSAGES_SUCESS:
      return _objectSpread2({}, state, {
        loading: false,
        initialized: true,
        hasMore: action.payload.hasMore,
        allMessages: [].concat(_toConsumableArray(action.payload.messages), _toConsumableArray(state.allMessages))
      });

    case SEND_MESSAGEGE_START:
      return _objectSpread2({}, state, {
        allMessages: [].concat(_toConsumableArray(state.allMessages), [_objectSpread2({}, action.payload)])
      });

    case SEND_MESSAGEGE_SUCESS:
      return _objectSpread2({}, state, {
        allMessages: state.allMessages.map(function (m) {
          return compareIds(m.reqId, action.payload.reqId) ? action.payload : m;
        })
      });

    case SEND_MESSAGEGE_FAILURE:
      return _objectSpread2({}, state, {
        allMessages: state.allMessages.map(function (m) {
          return compareIds(m.reqId, action.payload.reqId) ? _objectSpread2({}, action.payload, {
            failed: true
          }) : m;
        })
      });

    case SET_CURRENT_CHANNEL$1:
      {
        return _objectSpread2({}, state, {
          currentChannel: action.payload
        });
      }

    case ON_MESSAGE_RECEIVED:
      {
        var _action$payload = action.payload,
            channel = _action$payload.channel,
            message = _action$payload.message;
        var currentChannel = state.currentChannel,
            unreadCount = state.unreadCount,
            unreadSince = state.unreadSince;

        if (!compareIds(channel.url, currentChannel)) {
          return state;
        } // Excluded overlapping messages


        if (!(state.allMessages.map(function (msg) {
          return msg.messageId;
        }).indexOf(message.messageId) < 0)) {
          return state;
        }

        return _objectSpread2({}, state, {
          unreadCount: unreadCount + 1,
          unreadSince: unreadCount === 0 ? moment().format('LT MMM DD') : unreadSince,
          allMessages: [].concat(_toConsumableArray(state.allMessages), [message])
        });
      }

    case ON_MESSAGE_UPDATED:
      return _objectSpread2({}, state, {
        allMessages: state.allMessages.map(function (m) {
          return compareIds(m.messageId, action.payload.messageId) ? action.payload : m;
        })
      });

    case MARK_AS_READ:
      return _objectSpread2({}, state, {
        unreadCount: 0,
        unreadSince: null
      });

    case ON_MESSAGE_DELETED:
      return _objectSpread2({}, state, {
        allMessages: state.allMessages.filter(function (m) {
          return !compareIds(m.messageId, action.payload);
        })
      });

    default:
      return state;
  }
}

var eventHandler = (function (_ref) {
  var messagesDispatcher = _ref.messagesDispatcher,
      sdk = _ref.sdk,
      uniqueId = _ref.uniqueId;

  if (!sdk || !sdk.ChannelHandler) {
    return;
  }

  var ChannelHandler = new sdk.ChannelHandler();

  ChannelHandler.onMessageReceived = function (channel, message) {
    messagesDispatcher({
      type: ON_MESSAGE_RECEIVED,
      payload: {
        channel: channel,
        message: message
      }
    });
  };

  ChannelHandler.onMessageUpdated = function (_, message) {
    messagesDispatcher({
      type: ON_MESSAGE_UPDATED,
      payload: message
    });
  };

  ChannelHandler.onMessageDeleted = function (_, messageId) {
    messagesDispatcher({
      type: ON_MESSAGE_DELETED,
      payload: messageId
    });
  }; // Add this channel event handler to the SendBird object.


  sdk.addChannelHandler(uniqueId, ChannelHandler);
});

var getMessageCreatedAt = function getMessageCreatedAt(message) {
  return moment(message.createdAt).format('LT');
};
var getSenderName = function getSenderName(message) {
  return message.sender && (message.sender.friendName || message.sender.nickname || message.sender.userId);
};
var getSenderProfileUrl = function getSenderProfileUrl(message) {
  return message.sender && message.sender.profileUrl;
};

var MessageStatusType = {
  PENDING: 'PENDING',
  SENT: 'SENT',
  DELIVERED: 'DELIVERED',
  READ: 'READ',
  FAILED: 'FAILED'
};

var MessageStatusTypes = MessageStatusType;
function MessageStatus(_ref) {
  var message = _ref.message,
      status = _ref.status,
      className = _ref.className,
      onClickEvents = _ref.onClickEvents;
  var injectingClassName = Array.isArray(className) ? className : [className];

  var label = function label() {
    switch (status) {
      case MessageStatusType.PENDING:
        {
          return null;
        }

      case MessageStatusType.SENT:
      case MessageStatusType.DELIVERED:
      case MessageStatusType.READ:
        {
          return React.createElement(Label, {
            className: "sendbird-message-status__text",
            type: LabelTypography.CAPTION_3,
            color: LabelColors.ONBACKGROUND_2
          }, getMessageCreatedAt(message));
        }

      case MessageStatusType.FAILED:
        {
          // check onClickEvents
          return React.createElement(Label, {
            className: "sendbird-message-status__text",
            type: LabelTypography.CAPTION_3,
            color: LabelColors.ERROR
          }, LabelStringSet.MESSAGE_STATUS__SENDING_FAILED, React.createElement("span", {
            className: "sendbird-message-status__text__try-again",
            role: "button",
            tabIndex: 0,
            onClick: onClickEvents[0],
            onKeyPress: onClickEvents[0]
          }, LabelStringSet.MESSAGE_STATUS__TRY_AGAIN), LabelStringSet.MESSAGE_STATUS__OR, React.createElement("span", {
            className: "sendbird-message-status__text__delete",
            role: "button",
            tabIndex: 0,
            onClick: onClickEvents[1],
            onKeyPress: onClickEvents[1]
          }, LabelStringSet.MESSAGE_STATUS__DELETE));
        }

      default:
        return null;
    }
  };

  var icon = {
    PENDING: React.createElement(Loader, {
      className: "sendbird-message-status__icon",
      width: "16px",
      height: "16px"
    }, React.createElement(Icon, {
      type: IconTypes.SPINNER,
      width: "16px",
      height: "16px"
    })),
    SENT: React.createElement(Icon, {
      className: "sendbird-message-status__icon",
      width: "16px",
      height: "16px",
      type: IconTypes.SENT,
      fillColor: IconColors.SENT
    }),
    DELIVERED: React.createElement(Icon, {
      className: "sendbird-message-status__icon",
      width: "16px",
      height: "16px",
      type: IconTypes.DELIVERED,
      fillColor: IconColors.SENT
    }),
    READ: React.createElement(Icon, {
      className: "sendbird-message-status__icon",
      width: "16px",
      height: "16px",
      type: IconTypes.READ,
      fillColor: IconColors.READ
    }),
    FAILED: React.createElement(Icon, {
      className: "sendbird-message-status__icon",
      width: "16px",
      height: "16px",
      type: IconTypes.ERROR
    })
  };
  return React.createElement("div", {
    className: [].concat(_toConsumableArray(injectingClassName), ['sendbird-message-status']).join(' ')
  }, label(), icon[status]);
}
MessageStatus.propTypes = {
  message: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.array, PropTypes.object])),
  status: PropTypes.string,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  onClickEvents: PropTypes.arrayOf(PropTypes.func)
};
MessageStatus.defaultProps = {
  message: null,
  status: '',
  className: '',
  onClickEvents: [function () {}, function () {}]
};

var copyToClipboard = function copyToClipboard(text) {
  if (window.clipboardData && window.clipboardData.setData) {
    // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
    return window.clipboardData.setData('Text', text);
  }

  if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
    var textarea = document.createElement('textarea');
    textarea.textContent = text;
    textarea.style.position = 'fixed'; // Prevent scrolling to bottom of page in Microsoft Edge.

    document.body.appendChild(textarea);
    textarea.select();

    try {
      return document.execCommand('copy'); // Security exception may be thrown by some browsers.
    } catch (ex) {
      return false;
    } finally {
      document.body.removeChild(textarea);
    }
  }

  return false;
};

function OutgoingUserMessage(_ref) {
  var message = _ref.message,
      showEdit = _ref.showEdit,
      showRemove = _ref.showRemove,
      status = _ref.status;
  // TODO: when message.requestState is succeeded, consider if it's SENT or DELIVERED
  var parentRef = useRef(null);
  return React.createElement("div", {
    className: "sendbird-user-message--outgoing"
  }, React.createElement(ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return React.createElement(IconButton, {
        ref: parentRef,
        className: "sendbird-user-message__more",
        width: "32px",
        height: "32px",
        onClick: toggleDropdown
      }, React.createElement(Icon, {
        width: "24px",
        height: "24px",
        type: IconTypes.MORE,
        fillColor: IconColors.PRIMARY
      }));
    },
    menuItems: function menuItems(closeDropdown) {
      return React.createElement(MenuItems, {
        parentRef: parentRef,
        closeDropdown: closeDropdown,
        openLeft: true
      }, React.createElement(MenuItem, {
        onClick: function onClick() {
          copyToClipboard(message.message);
          closeDropdown();
        }
      }, "Copy"), React.createElement(MenuItem, {
        onClick: function onClick() {
          showEdit(true);
          closeDropdown();
        }
      }, "Edit"), React.createElement(MenuItem, {
        onClick: function onClick() {
          showRemove(true);
          closeDropdown();
        }
      }, "Delete"));
    }
  }), React.createElement("div", {
    className: "sendbird-user-message__tooltip"
  }, React.createElement(Label, {
    className: "sendbird-user-message__tooltip__text",
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_1
  }, message.message)), React.createElement("div", {
    className: "sendbird-user-message__status"
  }, React.createElement(MessageStatus, {
    message: message,
    status: status
  })));
}

function IncomingUserMessage(_ref2) {
  var message = _ref2.message;
  var parentRef = useRef(null);
  return React.createElement("div", {
    className: "sendbird-user-message--incoming"
  }, React.createElement(Avatar, {
    className: "sendbird-user-message__avatar",
    src: getSenderProfileUrl(message),
    width: "28px",
    height: "28px"
  }), React.createElement(Label, {
    className: "sendbird-user-message__sender-name",
    type: LabelTypography.CAPTION_2,
    color: LabelColors.ONBACKGROUND_2
  }, getSenderName(message)), React.createElement("div", {
    className: "sendbird-user-message__tooltip"
  }, React.createElement(Label, {
    className: "sendbird-user-message__tooltip__text",
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_1
  }, message.message)), React.createElement(Label, {
    className: "sendbird-user-message__sent-at",
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_2
  }, getMessageCreatedAt(message)), React.createElement(ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return React.createElement(IconButton, {
        ref: parentRef,
        className: "sendbird-user-message__more",
        width: "32px",
        height: "32px",
        onClick: toggleDropdown
      }, React.createElement(Icon, {
        width: "24px",
        height: "24px",
        type: IconTypes.MORE,
        fillColor: IconColors.PRIMARY
      }));
    },
    menuItems: function menuItems(closeDropdown) {
      return React.createElement(MenuItems, {
        parentRef: parentRef,
        closeDropdown: closeDropdown
      }, React.createElement(MenuItem, {
        onClick: function onClick() {
          copyToClipboard(message.message);
          closeDropdown();
        }
      }, "Copy"));
    }
  }));
}

IncomingUserMessage.propTypes = {
  message: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.array, PropTypes.object]))
};
IncomingUserMessage.defaultProps = {
  message: {}
};
OutgoingUserMessage.propTypes = {
  message: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.array, PropTypes.object])),
  showEdit: PropTypes.func,
  showRemove: PropTypes.func,
  status: PropTypes.string.isRequired
};
OutgoingUserMessage.defaultProps = {
  message: {},
  showEdit: function showEdit() {},
  showRemove: function showRemove() {}
};

var noop$1 = function noop() {};

function Message(props) {
  var isByMe = props.isByMe,
      message = props.message,
      className = props.className,
      showEdit = props.showEdit,
      showRemove = props.showRemove,
      status = props.status;
  var injectingClassName = Array.isArray(className) ? className : [className];
  injectingClassName.push("sendbird-message".concat(isByMe ? '--outgoing' : '--incoming'));
  if (!message) return null;
  return React.createElement("div", {
    className: [].concat(_toConsumableArray(injectingClassName), ['sendbird-message']).join(' ')
  }, isByMe ? React.createElement(OutgoingUserMessage, {
    message: message,
    showEdit: showEdit,
    showRemove: showRemove,
    status: status
  }) : React.createElement(IncomingUserMessage, {
    message: message
  }) // file messages should be here
  );
}
Message.propTypes = {
  isByMe: PropTypes.bool,
  message: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.array, PropTypes.object])).isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  showEdit: PropTypes.func,
  status: PropTypes.string,
  showRemove: PropTypes.func
};
Message.defaultProps = {
  isByMe: false,
  className: '',
  showEdit: noop$1,
  showRemove: noop$1,
  status: ''
};

function AdminMessage(_ref) {
  var className = _ref.className,
      message = _ref.message;

  if (!message.messageType || message.messageType !== 'admin') {
    // change to use message.isAdminMessage()
    return null;
  }

  var injectingClassName = Array.isArray(className) ? className : [className];
  return React.createElement("div", {
    className: [].concat(_toConsumableArray(injectingClassName), ['sendbird-admin-message']).join(' ')
  }, React.createElement(Label, {
    className: "sendbird-admin-message__text",
    type: LabelTypography.CAPTION_2,
    color: LabelColors.ONBACKGROUND_2
  }, message.message));
}
AdminMessage.propTypes = {
  message: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.array, PropTypes.object])),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
};
AdminMessage.defaultProps = {
  message: {},
  className: ''
};

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
var SUPPORTED_MIMES = {
  IMAGE: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp' // not supported in IE
  ],
  VIDEO: ['video/mpeg', 'video/ogg', 'video/webm', 'video/mp4']
};
var isImage = function isImage(type) {
  return SUPPORTED_MIMES.IMAGE.includes(type);
};
var isVideo = function isVideo(type) {
  return SUPPORTED_MIMES.VIDEO.includes(type);
};
var unSupported = function unSupported(type) {
  return !(isImage(type) || isVideo(type));
};

var noop$2 = function noop() {};

function ThumbnailMessage(_ref) {
  var _ref$message = _ref.message,
      message = _ref$message === void 0 ? {} : _ref$message,
      isByMe = _ref.isByMe,
      onClick = _ref.onClick,
      showRemove = _ref.showRemove,
      status = _ref.status;
  var type = message.type,
      url = message.url,
      _message$name = message.name,
      name = _message$name === void 0 ? '' : _message$name;
  var parentRef = useRef(null);

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      imgLoaded = _useState2[0],
      setImgLoaded = _useState2[1];

  var isMoreActive = status === MessageStatusTypes.SENT || status === MessageStatusTypes.DELIVERED || status === MessageStatusTypes.READ;
  return React.createElement("div", {
    className: ['sendbird-thumbnail', !isByMe ? 'sendbird-thumbnail--incoming' : '', !imgLoaded ? 'sendbird-thumbnail--loading' : ''].join(' ')
  }, !isByMe && React.createElement(React.Fragment, null, React.createElement(Avatar, {
    className: "sendbird-thumbnail__avatar",
    src: getSenderProfileUrl(message),
    width: "28px",
    height: "28px"
  }), React.createElement(Label, {
    className: "sendbird-thumbnail__sender-name",
    type: LabelTypography.CAPTION_2,
    color: LabelColors.ONBACKGROUND_2
  }, getSenderName(message) || '')), React.createElement("div", {
    className: "sendbird-thumbnail__body"
  }, isByMe && React.createElement(ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return React.createElement(IconButton, {
        ref: parentRef,
        className: "sendbird-thumbnail__more",
        width: "32px",
        height: "32px",
        onClick: toggleDropdown
      }, React.createElement(Icon, {
        width: "24px",
        height: "24px",
        type: IconTypes.MORE
      }));
    },
    menuItems: function menuItems(closeDropdown) {
      return React.createElement(MenuItems, {
        parentRef: parentRef,
        closeDropdown: closeDropdown,
        openLeft: true
      }, React.createElement(MenuItem, {
        onClick: function onClick() {
          showRemove(true);
          closeDropdown();
        }
      }, "Delete"));
    }
  }), React.createElement("div", {
    onClick: isMoreActive ? function () {
      return onClick(true);
    } : function () {},
    onKeyDown: isMoreActive ? function () {
      return onClick(true);
    } : function () {},
    tabIndex: 0,
    role: "button",
    className: "sendbird-thumbnail__wrap"
  }, isVideo(type) && React.createElement(React.Fragment, null, React.createElement("video", {
    className: "sendbird-thumbnail__video",
    onLoadedData: function onLoadedData() {
      return setImgLoaded(true);
    }
  }, React.createElement("source", {
    src: url,
    type: type
  })), React.createElement(Icon, {
    className: "sendbird-thumbnail__video-icon",
    width: "56px",
    height: "56px",
    type: IconTypes.PLAY
  })), isImage(type) && React.createElement("img", {
    onLoad: function onLoad() {
      return setImgLoaded(true);
    },
    src: url,
    alt: name,
    className: "sendbird-thumbnail__img"
  }), unSupported(type) && React.createElement("div", {
    className: "sendbird-thumbnail__other"
  }, "Unknown type"), React.createElement("div", {
    className: "sendbird-thumbnail__wrap-overlay"
  })), isByMe && React.createElement("div", {
    className: "sendbird-thumbnail__status"
  }, React.createElement(MessageStatus, {
    message: message,
    status: status
  }))));
}
ThumbnailMessage.propTypes = {
  message: PropTypes.shape({
    type: PropTypes.string,
    url: PropTypes.string,
    name: PropTypes.string
  }).isRequired,
  status: PropTypes.string,
  isByMe: PropTypes.bool,
  onClick: PropTypes.func,
  showRemove: PropTypes.func
};
ThumbnailMessage.defaultProps = {
  isByMe: false,
  onClick: noop$2,
  showRemove: noop$2,
  status: ''
};

var Colors$2 = {
  ONBACKGROUND_1: 'ONBACKGROUND_1',
  ONBACKGROUND_2: 'ONBACKGROUND_2',
  ONBACKGROUND_3: 'ONBACKGROUND_3',
  ONBACKGROUND_4: 'ONBACKGROUND_4',
  ONCONTENT_1: 'ONCONTENT_1',
  PRIMARY: 'PRIMARY',
  ERROR: 'ERROR'
};
function changeColorToClassName$2(color) {
  switch (color) {
    case Colors$2.ONBACKGROUND_1:
      return 'sendbird-color--onbackground-1';

    case Colors$2.ONBACKGROUND_2:
      return 'sendbird-color--onbackground-2';

    case Colors$2.ONBACKGROUND_3:
      return 'sendbird-color--onbackground-3';

    case Colors$2.ONBACKGROUND_4:
      return 'sendbird-color--onbackground-4';

    case Colors$2.ONCONTENT_1:
      return 'sendbird-color--oncontent-1';

    case Colors$2.PRIMARY:
      return 'sendbird-color--primary';

    case Colors$2.ERROR:
      return 'sendbird-color--error';

    default:
      return null;
  }
}

function TextButton(_ref) {
  var color = _ref.color,
      children = _ref.children,
      className = _ref.className,
      onClick = _ref.onClick,
      notUnderline = _ref.notUnderline;
  var injectingClassName = Array.isArray(className) ? className : [className];
  return React.createElement("div", {
    role: "button",
    tabIndex: 0,
    className: [].concat(_toConsumableArray(injectingClassName), [changeColorToClassName$2(color), notUnderline ? 'sendbird-textbutton--not-underline' : 'sendbird-textbutton']).join(' '),
    onClick: onClick,
    onKeyPress: onClick
  }, children);
}
TextButton.propTypes = {
  color: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  onClick: PropTypes.func,
  notUnderline: PropTypes.bool
};
TextButton.defaultProps = {
  color: Colors$2.ONBACKGROUND_1,
  className: '',
  onClick: function onClick() {},
  notUnderline: false
};

var MAX_TRUNCATE_LENGTH = 40;

var noop$3 = function noop() {};

function checkFileType(fileUrl) {
  var result = null;
  var imageFile = /(\.gif|\.jpg|\.jpeg|\.txt|\.pdf)$/i;
  var audioFile = /(\.mp3)$/i;

  if (imageFile.test(fileUrl)) {
    result = IconTypes.FILE_DOCUMENT;
  } else if (audioFile.test(fileUrl)) {
    result = IconTypes.FILE_AUDIO;
  }

  return result;
}

function OutgoingFileMessage(_ref) {
  var message = _ref.message,
      status = _ref.status,
      showRemove = _ref.showRemove;
  var url = message.url;

  var openFileUrl = function openFileUrl() {
    window.open(url);
  };

  var parentRef = useRef(null);
  return React.createElement("div", {
    className: "sendbird-file-message__outgoing"
  }, React.createElement(ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return React.createElement(IconButton, {
        ref: parentRef,
        className: "sendbird-file-message__more",
        width: "32px",
        height: "32px",
        onClick: toggleDropdown
      }, React.createElement(Icon, {
        width: "24px",
        height: "24px",
        type: IconTypes.MORE
      }));
    },
    menuItems: function menuItems(closeDropdown) {
      return React.createElement(MenuItems, {
        parentRef: parentRef,
        closeDropdown: closeDropdown,
        openLeft: true
      }, React.createElement(MenuItem, {
        onClick: function onClick() {
          showRemove(true);
          closeDropdown();
        }
      }, "Delete"));
    }
  }), React.createElement("div", {
    className: "sendbird-file-message__tooltip"
  }, checkFileType(url) ? React.createElement(Icon, {
    className: "sendbird-file-message__tooltip__icon",
    width: "28px",
    height: "28px",
    type: checkFileType(url)
  }) : null, React.createElement(TextButton, {
    className: "sendbird-file-message__tooltip__text",
    onClick: openFileUrl
  }, React.createElement(Label, {
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_1
  }, truncate(message.url, MAX_TRUNCATE_LENGTH)))), React.createElement("div", {
    className: "sendbird-file-message__status"
  }, React.createElement(MessageStatus, {
    message: message,
    status: status
  })));
}
function IncomingFileMessage(_ref2) {
  var message = _ref2.message;

  var openFileUrl = function openFileUrl() {
    window.open(message.url);
  };

  return React.createElement("div", {
    className: "sendbird-file-message__incoming"
  }, React.createElement(Avatar, {
    className: "sendbird-file-message__avatar",
    src: getSenderProfileUrl(message),
    width: "28px",
    height: "28px"
  }), React.createElement(Label, {
    className: "sendbird-file-message__sender-name",
    type: LabelTypography.CAPTION_2,
    color: LabelColors.ONBACKGROUND_2
  }, getSenderName(message)), React.createElement("div", {
    className: "sendbird-file-message__tooltip"
  }, checkFileType(message.url) ? React.createElement(Icon, {
    className: "sendbird-file-message__tooltip__icon",
    width: "28px",
    height: "28px",
    type: checkFileType(message.url)
  }) : null, React.createElement(TextButton, {
    className: "sendbird-file-message__tooltip__text",
    onClick: openFileUrl
  }, React.createElement(Label, {
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_1
  }, truncate(message.url, MAX_TRUNCATE_LENGTH)))), React.createElement(Label, {
    className: "sendbird-file-message__sent-at",
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_2
  }, getMessageCreatedAt(message)));
}
OutgoingFileMessage.propTypes = {
  message: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.array, PropTypes.object])),
  status: PropTypes.string,
  showRemove: PropTypes.func
};
OutgoingFileMessage.defaultProps = {
  status: '',
  showRemove: function showRemove() {},
  message: {}
};
IncomingFileMessage.propTypes = {
  message: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.array, PropTypes.object]))
};
IncomingFileMessage.defaultProps = {
  message: {}
};

var MessageSwitch = function MessageSwitch(_ref3) {
  var message = _ref3.message,
      isByMe = _ref3.isByMe,
      showRemove = _ref3.showRemove,
      status = _ref3.status;
  return React.createElement("div", {
    className: "sendbird-file-message".concat(isByMe ? '--outgoing' : '--incoming')
  }, isByMe ? React.createElement(OutgoingFileMessage, {
    message: message,
    showRemove: showRemove,
    status: status
  }) : React.createElement(IncomingFileMessage, {
    message: message
  }));
};

MessageSwitch.propTypes = {
  message: PropTypes.shape({}),
  isByMe: PropTypes.bool,
  showRemove: PropTypes.func,
  status: PropTypes.string.isRequired
};
MessageSwitch.defaultProps = {
  message: {},
  isByMe: false,
  showRemove: noop$3
};

function DateSeparator(_ref) {
  var className = _ref.className,
      children = _ref.children,
      separatorColor = _ref.separatorColor;
  var injectingClassName = Array.isArray(className) ? className : [className];
  return React.createElement("div", {
    className: [].concat(_toConsumableArray(injectingClassName), ['sendbird-separator']).join(' ')
  }, React.createElement("div", {
    className: ["".concat(changeColorToClassName$2(separatorColor), "--background-color"), 'sendbird-separator__left'].join(' ')
  }), React.createElement("div", {
    className: "sendbird-separator__text"
  }, children), React.createElement("div", {
    className: ["".concat(changeColorToClassName$2(separatorColor), "--background-color"), 'sendbird-separator__right'].join(' ')
  }));
}
DateSeparator.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string), PropTypes.element]),
  separatorColor: PropTypes.string
};
DateSeparator.defaultProps = {
  className: '',
  children: React.createElement(Label, {
    type: LabelTypography.CAPTION_2,
    color: LabelColors.ONBACKGROUND_2
  }, "Date Separator"),
  separatorColor: Colors$2.ONBACKGROUND_4
};

// import IconAttach from '../../svgs/icon-attach.svg';

var LINE_HEIGHT = 76;

var noop$4 = function noop() {};

var handleUploadFile = function handleUploadFile(callback) {
  return function (event) {
    if (event.target.files && event.target.files[0]) {
      callback(event.target.files[0]);
    } // eslint-disable-next-line no-param-reassign


    event.target.value = '';
  };
};

var MessageInput = React.forwardRef(function (props, ref) {
  var isEdit = props.isEdit,
      disabled = props.disabled,
      value = props.value,
      name = props.name,
      placeholder = props.placeholder,
      maxLength = props.maxLength,
      onFileUpload = props.onFileUpload,
      onSendMessage = props.onSendMessage,
      onCancelEdit = props.onCancelEdit,
      onStartTyping = props.onStartTyping;
  var fileInputRef = useRef(null);

  var _useState = useState(value),
      _useState2 = _slicedToArray(_useState, 2),
      inputValue = _useState2[0],
      setInputValue = _useState2[1];

  var setHeight = function setHeight() {
    var elem = ref.current;
    var MAX_HEIGHT = window.document.body.offsetHeight * 0.6;

    if (elem.scrollHeight >= LINE_HEIGHT) {
      if (MAX_HEIGHT < elem.scrollHeight) {
        elem.style.height = 'auto';
        elem.style.height = "".concat(MAX_HEIGHT, "px");
      } else {
        elem.style.height = 'auto';
        elem.style.height = "".concat(elem.scrollHeight, "px");
      }
    } else {
      elem.style.height = '';
    }
  }; // after setHeight called twice, the textarea goes to the initialized


  useEffect(function () {
    setHeight();
    return setHeight;
  }, [inputValue]);
  return React.createElement("form", {
    className: "".concat(isEdit ? 'sendbird-message-input__edit' : '')
  }, React.createElement("div", {
    className: "\n          sendbird-message-input\n          ".concat(disabled ? 'sendbird-message-input__disabled' : '', "\n        ")
  }, React.createElement("textarea", {
    disabled: disabled,
    ref: ref,
    name: name,
    value: inputValue,
    className: "sendbird-message-input--textarea",
    maxLength: maxLength,
    onChange: function onChange(e) {
      setInputValue(e.target.value);
      onStartTyping();
    }
  }), !inputValue && React.createElement(Label, {
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_3,
    className: "sendbird-message-input--placeholder"
  }, placeholder || LabelStringSet.CHANNEL__MESSAGE_INPUT__PLACE_HOLDER), !isEdit && !inputValue && React.createElement(IconButton, {
    className: "sendbird-message-input--attach",
    height: "32px",
    width: "32px",
    onClick: function onClick() {
      // todo: clear previous input
      fileInputRef.current.click();
    }
  }, React.createElement(Icon, {
    type: IconTypes.ATTACH,
    width: "20px",
    height: "20px"
  }), React.createElement("input", {
    type: "file",
    ref: fileInputRef,
    onChange: handleUploadFile(onFileUpload),
    className: "sendbird-message-input--attach-input"
  })), !isEdit && inputValue && React.createElement(IconButton, {
    className: "sendbird-message-input--send",
    height: "32px",
    width: "32px",
    onClick: function onClick() {
      var trimmedInputValue = inputValue.trim();
      onSendMessage(trimmedInputValue);
      setInputValue('');
    }
  }, React.createElement(Icon, {
    type: IconTypes.SEND,
    width: "20px",
    height: "20px"
  }))), isEdit && React.createElement("div", {
    className: "sendbird-message-input--edit-action"
  }, React.createElement(Button, {
    className: "sendbird-message-input--edit-action__cancel",
    type: Type$1.SECONDARY,
    size: Size.SMALL,
    onClick: onCancelEdit
  }, LabelStringSet.BUTTON__CANCEL), React.createElement(Button, {
    className: "sendbird-message-input--edit-action__save",
    type: Type$1.PRIMARY,
    size: Size.SMALL,
    onClick: function onClick() {
      if (inputValue) {
        var trimmedInputValue = inputValue.trim();
        onSendMessage(name, trimmedInputValue, function () {
          onCancelEdit();
        });
      }
    }
  }, LabelStringSet.BUTTON__SAVE)));
});
MessageInput.propTypes = {
  placeholder: PropTypes.string,
  isEdit: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  maxLength: PropTypes.number,
  onFileUpload: PropTypes.func,
  onSendMessage: PropTypes.func,
  onStartTyping: PropTypes.func,
  onCancelEdit: PropTypes.func
};
MessageInput.defaultProps = {
  value: '',
  onSendMessage: noop$4,
  name: 'sendbird-message-input',
  isEdit: false,
  disabled: false,
  placeholder: '',
  maxLength: 5000,
  onFileUpload: noop$4,
  onCancelEdit: noop$4,
  onStartTyping: noop$4
};

var FileViewerComponent = function FileViewerComponent(_ref) {
  var profileUrl = _ref.profileUrl,
      nickname = _ref.nickname,
      type = _ref.type,
      url = _ref.url,
      name = _ref.name,
      onClose = _ref.onClose,
      onDelete = _ref.onDelete,
      isByMe = _ref.isByMe;
  return React.createElement("div", {
    className: "sendbird-fileviewer"
  }, React.createElement("div", {
    className: "sendbird-fileviewer__header"
  }, React.createElement("div", {
    className: "sendbird-fileviewer__header-left"
  }, React.createElement("div", {
    className: "sendbird-fileviewer__header-avatar"
  }, React.createElement(Avatar, {
    height: "32px",
    width: "32px",
    src: profileUrl
  })), React.createElement(Label, {
    className: "sendbird-fileviewer__header-filename",
    type: LabelTypography.H_2,
    color: LabelColors.ONBACKGROUND_1
  }, name), React.createElement(Label, {
    className: "sendbird-fileviewer__header-sendername",
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_2
  }, nickname)), React.createElement("div", {
    className: "sendbird-fileviewer__header-right"
  }, !unSupported(type) && React.createElement("div", {
    className: "sendbird-fileviewer__header-actions"
  }, React.createElement("a", {
    href: url,
    rel: "noopener noreferrer",
    target: "_blank",
    className: "sendbird-fileviewer__header-download"
  }, React.createElement(Icon, {
    type: IconTypes.DOWNLOAD,
    height: "24px",
    width: "24px"
  })), onDelete && isByMe && React.createElement("div", {
    className: "sendbird-fileviewer__header-delete"
  }, React.createElement(Icon, {
    type: IconTypes.DELETE,
    height: "24px",
    width: "24px",
    onClick: onDelete
  }))), React.createElement("div", {
    className: "sendbird-fileviewer__header-close"
  }, React.createElement(Icon, {
    type: IconTypes.CLOSE,
    height: "24px",
    width: "24px",
    onClick: onClose
  })))), React.createElement("div", {
    className: "sendbird-fileviewer__content"
  }, isVideo(type) && // eslint-disable-next-line jsx-a11y/media-has-caption
  React.createElement("video", {
    controls: true,
    className: "sendbird-fileviewer__video"
  }, React.createElement("source", {
    src: url,
    type: type
  })), isImage(type) && React.createElement("img", {
    src: url,
    alt: name,
    className: "sendbird-fileviewer__img"
  }), unSupported(type) && React.createElement("div", {
    className: "sendbird-fileviewer__unsupported"
  }, React.createElement(Label, {
    type: LabelTypography.H_1,
    color: LabelColors.ONBACKGROUND_1
  }, "Unsupoprted message"))));
};
FileViewerComponent.propTypes = {
  profileUrl: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isByMe: PropTypes.bool
};
FileViewerComponent.defaultProps = {
  isByMe: true
};
function FileViewer(props) {
  var onClose = props.onClose,
      message = props.message,
      onDelete = props.onDelete,
      isByMe = props.isByMe;
  var sender = message.sender,
      type = message.type,
      url = message.url,
      _message$name = message.name,
      name = _message$name === void 0 ? '' : _message$name;
  var profileUrl = sender.profileUrl,
      _sender$nickname = sender.nickname,
      nickname = _sender$nickname === void 0 ? '' : _sender$nickname;
  return createPortal(React.createElement(FileViewerComponent, {
    profileUrl: profileUrl,
    nickname: nickname,
    type: type,
    url: url,
    name: name,
    onClose: onClose,
    onDelete: onDelete,
    isByMe: isByMe
  }), document.getElementById(MODAL_ROOT));
}
FileViewer.propTypes = {
  onClose: PropTypes.func.isRequired,
  message: PropTypes.shape({
    sender: PropTypes.shape({
      profileUrl: PropTypes.string,
      nickname: PropTypes.string
    }),
    type: PropTypes.string,
    url: PropTypes.string,
    name: PropTypes.string
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  isByMe: PropTypes.bool
};
FileViewer.defaultProps = {
  isByMe: true
};

var RemoveMessage = function RemoveMessage(props) {
  var onCloseModal = props.onCloseModal,
      onDeleteMessage = props.onDeleteMessage;
  return React.createElement(Modal, {
    onCancel: onCloseModal,
    onSubmit: onDeleteMessage,
    submitText: "Delete",
    titleText: LabelStringSet.MODAL__DELETE_MESSAGE__TITLE
  });
};

RemoveMessage.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  onDeleteMessage: PropTypes.func.isRequired
};

function MessageHoc(_ref) {
  var message = _ref.message,
      userId = _ref.userId,
      hasSeperator = _ref.hasSeperator,
      deleteMessage = _ref.deleteMessage,
      updateMessage = _ref.updateMessage,
      status = _ref.status;
  var _message$sender = message.sender,
      sender = _message$sender === void 0 ? {} : _message$sender;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      showEdit = _useState2[0],
      setShowEdit = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      showRemove = _useState4[0],
      setShowRemove = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      showFileViewer = _useState6[0],
      setShowFileViewer = _useState6[1];

  var editMessageInputRef = useRef(null);
  var isByMe = userId === sender.userId || message.requestState === 'pending' || message.requestState === 'failed';

  if (showEdit) {
    return React.createElement(MessageInput, {
      isEdit: true,
      ref: editMessageInputRef,
      name: message.messageId,
      onSendMessage: updateMessage,
      onCancelEdit: function onCancelEdit() {
        setShowEdit(false);
      },
      value: message.message
    });
  }

  return React.createElement("div", {
    className: "sendbird-msg-hoc sendbird-msg--scroll-ref"
  }, hasSeperator && React.createElement(DateSeparator, null, React.createElement(Label, {
    type: LabelTypography.CAPTION_2,
    color: LabelColors.ONBACKGROUND_2
  }, moment(message.createdAt).format('LL'))), (message.isFileMessage && message.isFileMessage() || message.messageType === 'file') && React.createElement(React.Fragment, null, isImage(message.type) || isVideo(message.type) ? React.createElement(ThumbnailMessage, {
    message: message,
    isByMe: isByMe,
    showRemove: setShowRemove,
    onClick: setShowFileViewer,
    status: status
  }) : React.createElement(MessageSwitch, {
    message: message,
    isByMe: isByMe,
    showRemove: setShowRemove,
    status: status
  })), message.isAdminMessage && message.isAdminMessage() && React.createElement(AdminMessage, {
    message: message
  }), (message.isUserMessage && message.isUserMessage() || message.messageType === 'user') && React.createElement(Message, {
    message: message,
    isByMe: isByMe,
    showEdit: setShowEdit,
    showRemove: setShowRemove,
    status: status
  }), showRemove && React.createElement(RemoveMessage, {
    onCloseModal: function onCloseModal() {
      return setShowRemove(false);
    },
    onDeleteMessage: function onDeleteMessage() {
      deleteMessage(message, function () {
        setShowRemove(false);
      });
    }
  }), showFileViewer && React.createElement(FileViewer, {
    onClose: function onClose() {
      return setShowFileViewer(false);
    },
    message: message,
    onDelete: function onDelete() {
      deleteMessage(message, function () {
        setShowFileViewer(false);
      });
    },
    isByMe: isByMe
  }));
}
MessageHoc.propTypes = {
  userId: PropTypes.string,
  message: PropTypes.shape({
    isFileMessage: PropTypes.func,
    isAdminMessage: PropTypes.func,
    isUserMessage: PropTypes.func,
    isDateSeperator: PropTypes.func,
    // should be a number, but there's a bug in SDK shich returns string
    messageId: PropTypes.number,
    type: PropTypes.string,
    createdAt: PropTypes.number,
    message: PropTypes.string,
    requestState: PropTypes.string,
    messageType: PropTypes.string,
    sender: PropTypes.shape({
      userId: PropTypes.string
    })
  }),
  hasSeperator: PropTypes.bool,
  deleteMessage: PropTypes.func.isRequired,
  updateMessage: PropTypes.func.isRequired,
  status: PropTypes.string
};
MessageHoc.defaultProps = {
  userId: '',
  message: {},
  hasSeperator: false,
  status: ''
};

var scrollIntoLast = function scrollIntoLast(selector) {
  var intialTry = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var MAX_TRIES = 10;
  var currentTry = intialTry;

  if (currentTry > MAX_TRIES) {
    return;
  }

  try {
    var nodes = document.querySelectorAll(selector);
    var last = nodes[nodes.length - 1];
    last.scrollIntoView(false);
    /** alignToTop: false */
  } catch (error) {
    setTimeout(function () {
      scrollIntoLast(selector, currentTry + 1);
    }, 500 * currentTry);
  }
};
var getParsedStatus = function getParsedStatus(message, currentGroupChannel) {
  if (message.requestState === 'failed') {
    return MessageStatusType.FAILED;
  }

  if (message.requestState === 'pending') {
    return MessageStatusType.PENDING;
  }

  if (message.requestState === 'succeeded') {
    if (!currentGroupChannel) {
      return MessageStatusType.SENT;
    }

    var unreadCount = currentGroupChannel.getReadReceipt(message);

    if (unreadCount === 0) {
      return MessageStatusType.READ;
    }

    var isDelivered = currentGroupChannel.getDeliveryReceipt(message) === 0;

    if (isDelivered) {
      return MessageStatusType.DELIVERED;
    }

    return MessageStatusType.SENT;
  }

  return null;
};

var ConversationScroll =
/*#__PURE__*/
function (_Component) {
  _inherits(ConversationScroll, _Component);

  function ConversationScroll() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ConversationScroll);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ConversationScroll)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onScroll", function (e) {
      var _this$props = _this.props,
          scrollRef = _this$props.scrollRef,
          hasMore = _this$props.hasMore,
          messagesDispatcher = _this$props.messagesDispatcher,
          messageSource = _this$props.messageSource,
          currentGroupChannel = _this$props.currentGroupChannel,
          swapParams = _this$props.swapParams;
      var element = e.target;
      var scrollTop = element.scrollTop,
          clientHeight = element.clientHeight,
          scrollHeight = element.scrollHeight;

      if (scrollTop === 0) {
        if (!hasMore) {
          return;
        }

        var nodes = scrollRef.current.querySelectorAll('.sendbird-msg--scroll-ref');
        var first = nodes[0];
        messageSource.load(function (response, err) {
          var messages = response;
          var error = err;

          if (swapParams) {
            messages = error;
            error = response;
          }

          if (error) {
            return;
          }

          messagesDispatcher({
            type: GET_PREV_MESSAGES_SUCESS,
            payload: {
              messages: messages,
              hasMore: messageSource.hasMore
            }
          });
          setTimeout(function () {
            // https://github.com/scabbiaza/react-scroll-position-on-updating-dom
            first.scrollIntoView();
          });
        });
      }

      setTimeout(function () {
        // mark as read if scroll is at end
        if (clientHeight + scrollTop === scrollHeight) {
          messagesDispatcher({
            type: MARK_AS_READ
          });
          currentGroupChannel.markAsRead();
        }
      }, 500);
    });

    return _this;
  }

  _createClass(ConversationScroll, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          scrollRef = _this$props2.scrollRef,
          initialized = _this$props2.initialized,
          allMessages = _this$props2.allMessages,
          userId = _this$props2.userId,
          deleteMessage = _this$props2.deleteMessage,
          updateMessage = _this$props2.updateMessage,
          readStatus = _this$props2.readStatus,
          currentGroupChannel = _this$props2.currentGroupChannel,
          renderChatItem = _this$props2.renderChatItem;
      return React.createElement("div", {
        className: "sendbird-conversation__messages"
      }, React.createElement("div", {
        ref: scrollRef,
        className: "sendbird-conversation__scroll-container",
        onScroll: this.onScroll
      }, React.createElement("div", {
        className: "sendbird-conversation__padding"
      }), React.createElement("div", {
        className: "sendbird-conversation__messages-padding"
      }, initialized && allMessages.map(function (m, idx) {
        var prev = allMessages[idx - 1];
        var prevCreatedAt = prev && prev.createdAt;
        var currentCreatedAt = m.createdAt; // https://stackoverflow.com/a/41855608

        var hasSeperator = !(prevCreatedAt && moment(currentCreatedAt).isSame(moment(prevCreatedAt), 'day'));

        if (renderChatItem) {
          return React.createElement("div", {
            key: m.messageId,
            className: "sendbird-msg--scroll-ref"
          }, renderChatItem({
            message: m,
            onDeleteMessage: deleteMessage,
            onUpdateMessage: updateMessage
          }));
        }

        return React.createElement(MessageHoc // show status for pending/failed messages
        , {
          status: readStatus[m.messageId] || getParsedStatus(m, currentGroupChannel),
          key: m.messageId,
          message: m,
          userId: userId,
          hasSeperator: hasSeperator,
          deleteMessage: deleteMessage,
          updateMessage: updateMessage
        });
      }))));
    }
  }]);

  return ConversationScroll;
}(Component);
ConversationScroll.propTypes = {
  // https://stackoverflow.com/a/52646941
  scrollRef: PropTypes.shape({
    current: PropTypes.oneOfType([PropTypes.element, PropTypes.shape({})])
  }).isRequired,
  hasMore: PropTypes.bool,
  messagesDispatcher: PropTypes.func.isRequired,
  messageSource: PropTypes.shape({
    load: PropTypes.func,
    hasMore: PropTypes.bool
  }),
  initialized: PropTypes.bool,
  userId: PropTypes.string,
  allMessages: PropTypes.arrayOf(PropTypes.shape({
    createdAt: PropTypes.number
  })).isRequired,
  deleteMessage: PropTypes.func.isRequired,
  updateMessage: PropTypes.func.isRequired,
  readStatus: PropTypes.shape({}).isRequired,
  currentGroupChannel: PropTypes.shape({
    markAsRead: PropTypes.func
  }).isRequired,
  renderChatItem: PropTypes.element,
  swapParams: PropTypes.bool
};
ConversationScroll.defaultProps = {
  hasMore: false,
  initialized: false,
  userId: '',
  renderChatItem: null,
  messageSource: null,
  swapParams: false
};

function Notification(_ref) {
  var count = _ref.count,
      time = _ref.time,
      onClick = _ref.onClick;
  var timeArray = time.split(' ');
  timeArray.splice(-2, 0, LabelStringSet.CHANNEL__MESSAGE_LIST__NOTIFICATION__ON);
  return (// eslint-disable-next-line
    React.createElement("div", {
      className: "sendbird-notification",
      onClick: onClick
    }, React.createElement(Label, {
      className: "sendbird-notification__text",
      color: LabelColors.ONCONTENT_1,
      type: LabelTypography.CAPTION_2
    }, "".concat(count, " "), LabelStringSet.CHANNEL__MESSAGE_LIST__NOTIFICATION__NEW_MESSAGE, " ".concat(timeArray.join(' '))), React.createElement(Icon, {
      width: "24px",
      height: "24px",
      type: IconTypes.SHEVRON_DOWN,
      fillColor: IconColors.CONTENT
    }))
  );
}
Notification.propTypes = {
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  time: PropTypes.string,
  onClick: PropTypes.func.isRequired
};
Notification.defaultProps = {
  count: 0,
  time: ''
};

var generateTypingIndicatorString = function generateTypingIndicatorString(members) {
  if (!members || members.length === 0) {
    return '';
  }

  if (members && members.length === 1) {
    return "".concat(members[0].nickname, " ").concat(LabelStringSet.TYPING_INDICATOR__IS_TYPING);
  }

  if (members && members.length === 2) {
    return "".concat(members[0].nickname, " ").concat(LabelStringSet.TYPING_INDICATOR__AND, " ").concat(members[1].nickname, " ").concat(LabelStringSet.TYPING_INDICATOR__ARE_TYPING);
  }

  return LabelStringSet.TYPING_INDICATOR__MULTIPLE_TYPING;
};

function TypingIndicator(_ref) {
  var channelUrl = _ref.channelUrl,
      sb = _ref.sb;

  var _useState = useState(uuidv4()),
      _useState2 = _slicedToArray(_useState, 2),
      handlerId = _useState2[0],
      setHandlerId = _useState2[1];

  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      typingMembers = _useState4[0],
      setTypingMembers = _useState4[1];

  useEffect(function () {
    if (sb && sb.ChannelHandler) {
      sb.removeChannelHandler(handlerId);
      var newHandlerId = uuidv4();
      var handler = new sb.ChannelHandler(); // there is a possible warning in here - setState called after unmount

      handler.onTypingStatusUpdated = function (groupChannel) {
        var members = groupChannel.getTypingMembers();

        if (groupChannel.url === channelUrl) {
          setTypingMembers(members);
        }
      };

      sb.addChannelHandler(newHandlerId, handler);
      setHandlerId(newHandlerId);
    }

    return function () {
      if (sb && sb.removeChannelHandler) {
        sb.removeChannelHandler(handlerId);
      }
    };
  }, [channelUrl]);
  return React.createElement(Label, {
    type: LabelTypography.CAPTION_2,
    color: LabelColors.ONBACKGROUND_2
  }, generateTypingIndicatorString(typingMembers));
}

TypingIndicator.propTypes = {
  channelUrl: PropTypes.string.isRequired,
  sb: PropTypes.shape({
    ChannelHandler: PropTypes.func,
    removeChannelHandler: PropTypes.func,
    addChannelHandler: PropTypes.func
  }).isRequired
};

var prettyDate = function prettyDate(date) {
  return moment(date, 'x').fromNow();
};
var getChannelAvatarSource$1 = function getChannelAvatarSource(channel, currentUserId) {
  if (channel && channel.coverUrl) {
    if (channel.coverUrl !== 'https://static.sendbird.com/sample/cover/cover_') {
      return channel.coverUrl;
    }
  }

  return channel && channel.members ? channel.members.filter(function (member) {
    return member.userId !== currentUserId;
  }).map(function (_ref) {
    var profileUrl = _ref.profileUrl;
    return profileUrl;
  }) : [];
};
var getOthersLastSeenAt = function getOthersLastSeenAt(channel) {
  if (!channel || !channel.getReadStatus || !channel.members || channel.members.length !== 2) {
    return '';
  }

  var lastSeenAt = _toConsumableArray(Object.values(channel.getReadStatus()))[0].last_seen_at;

  if (lastSeenAt === 0) {
    return '';
  }

  return prettyDate(lastSeenAt);
};
var getChannelTitle$1 = function getChannelTitle() {
  var channel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var currentUserId = arguments.length > 1 ? arguments[1] : undefined;

  if (!channel || !channel.name && !channel.members) {
    return 'No Title';
  }

  if (channel.name && channel.name !== 'Group Channel') {
    return channel.name;
  }

  if (channel.members.length === 1) {
    return '(No Members)';
  }

  return channel.members.filter(function (_ref2) {
    var userId = _ref2.userId;
    return userId !== currentUserId;
  }).map(function (_ref3) {
    var nickname = _ref3.nickname;
    return nickname;
  }).join(', ');
};

function AutoRefresh(_ref) {
  var repeatFunc = _ref.repeatFunc;

  var _useState = useState(repeatFunc()),
      _useState2 = _slicedToArray(_useState, 2),
      label = _useState2[0],
      setLabel = _useState2[1];

  useEffect(function () {
    var interval = setInterval(function () {
      if (label !== repeatFunc()) {
        setLabel(repeatFunc());
      }
    }, 10000);
    return function () {
      clearInterval(interval);
    };
  }, []);
  return React.createElement("div", {
    className: "sendbird-repeat-text"
  }, label);
}
AutoRefresh.propTypes = {
  repeatFunc: PropTypes.func.isRequired
};

function ChatHeader(props) {
  var currentGroupChannel = props.currentGroupChannel,
      currentUser = props.currentUser,
      title = props.title,
      subTitle = props.subTitle,
      isActive = props.isActive,
      isMuted = props.isMuted,
      onActionClick = props.onActionClick;
  var userId = currentUser.userId;
  return React.createElement("div", {
    className: "sendbird-chat-header"
  }, React.createElement("div", {
    className: "sendbird-chat-header__left"
  }, React.createElement(Avatar, {
    className: "sendbird-chat-header__avatar",
    src: getChannelAvatarSource$1(currentGroupChannel, userId),
    width: "32px",
    height: "32px"
  }), React.createElement(Label, {
    className: "sendbird-chat-header__title",
    type: LabelTypography.H_2,
    color: LabelColors.ONBACKGROUND_1
  }, title || getChannelTitle$1(currentGroupChannel, userId)), typeof isActive === 'string' && isActive === 'true' || typeof isActive === 'boolean' && isActive ? React.createElement("div", {
    className: "sendbird-chat-header__active"
  }) : null, React.createElement(Label, {
    className: "sendbird-chat-header__subtitle",
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_2
  }, subTitle || React.createElement(AutoRefresh, {
    repeatFunc: function repeatFunc() {
      return getOthersLastSeenAt(currentGroupChannel);
    }
  }))), React.createElement("div", {
    className: "sendbird-chat-header__right"
  }, typeof isMuted === 'string' && isMuted === 'true' || typeof isMuted === 'boolean' && isMuted ? React.createElement(Icon, {
    className: "sendbird-chat-header__mute",
    type: IconTypes.MUTE,
    width: "24px",
    height: "24px"
  }) : null, React.createElement(IconButton, {
    className: "sendbird-chat-header__info",
    width: "32px",
    height: "32px",
    onClick: onActionClick
  }, React.createElement(Icon, {
    type: IconTypes.INFO,
    fillColor: IconColors.PRIMARY,
    width: "24px",
    height: "24px"
  }))));
}
ChatHeader.propTypes = {
  currentGroupChannel: PropTypes.shape({}),
  currentUser: PropTypes.shape({
    userId: PropTypes.string
  }),
  title: PropTypes.string,
  subTitle: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  isActive: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  isMuted: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onActionClick: PropTypes.func
};
ChatHeader.defaultProps = {
  currentGroupChannel: {},
  title: '',
  subTitle: '',
  isActive: false,
  isMuted: false,
  currentUser: {},
  onActionClick: function onActionClick() {}
};

var noop$5 = function noop() {};

var ConversationPanel = function ConversationPanel(props) {
  var channelUrl = props.channelUrl,
      _props$stores = props.stores,
      sdkStore = _props$stores.sdkStore,
      userStore = _props$stores.userStore,
      userId = props.config.userId,
      reconnect = props.dispatchers.reconnect,
      renderChatItem = props.renderChatItem,
      onChatHeaderActionClick = props.onChatHeaderActionClick;
  var sdk = sdkStore.sdk;
  var sdkError = sdkStore.error;
  var sdkInit = sdkStore.initialized;
  var user = userStore.user;

  var _useReducer = useReducer(reducer$3, messagesInitialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      messagesStore = _useReducer2[0],
      messagesDispatcher = _useReducer2[1];

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      messageSource = _useState2[0],
      setMessageSource = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      invalidChannel = _useState4[0],
      setInvalidChannel = _useState4[1];

  var _useState5 = useState(uuidv4()),
      _useState6 = _slicedToArray(_useState5, 2),
      channelHandlerId = _useState6[0],
      setChannelHandlerId = _useState6[1]; // map to update read status of messages


  var _useState7 = useState({}),
      _useState8 = _slicedToArray(_useState7, 2),
      readStatus = _useState8[0],
      setReadStatus = _useState8[1];

  var _useState9 = useState(),
      _useState10 = _slicedToArray(_useState9, 2),
      messageReciverId = _useState10[0],
      setMessageReciverId = _useState10[1];

  var _useState11 = useState({}),
      _useState12 = _slicedToArray(_useState11, 2),
      currentGroupChannel = _useState12[0],
      setCurrentGroupChannel = _useState12[1];

  var messageInputRef = useRef(null);
  var scrollRef = useRef(null);
  var allMessages = messagesStore.allMessages,
      loading = messagesStore.loading,
      hasMore = messagesStore.hasMore,
      initialized = messagesStore.initialized,
      unreadCount = messagesStore.unreadCount,
      unreadSince = messagesStore.unreadSince; // to create message-datasource

  useEffect(function () {
    messagesDispatcher({
      type: RESET_MESSAGES
    });

    if (!sdkInit) {
      setMessageSource(null);
    }

    if (channelUrl && sdkInit) {
      messagesDispatcher({
        type: SET_CURRENT_CHANNEL$1,
        payload: channelUrl
      }); // remove previous handler
      // to do - move to cleanup fn

      if (sdk && sdk.removeChannelHandler) {
        sdk.removeChannelHandler(channelHandlerId);
      }

      if (!sdk || !sdk.GroupChannel) {
        return;
      }

      sdk.GroupChannel.getChannel(channelUrl, function (groupChannel) {
        if (!groupChannel) {
          setInvalidChannel(true);
          return;
        }

        setInvalidChannel(false);
        setCurrentGroupChannel(groupChannel); // for handling read status on the go

        var handler = new sdk.ChannelHandler();

        var handleMessageStatus = function handleMessageStatus(c) {
          if (channelUrl === c.url) {
            var allReadStatus = allMessages.reduce(function (accumulator, msg) {
              if (msg.messageId !== 0) {
                return _objectSpread2({}, accumulator, _defineProperty({}, msg.messageId, getParsedStatus(msg, groupChannel)));
              }

              return accumulator;
            }, {});
            setReadStatus(allReadStatus);
          }
        };

        handler.onDeliveryReceiptUpdated = handleMessageStatus;
        handler.onReadReceiptUpdated = handleMessageStatus;
        var newHandlerId = uuidv4();
        sdk.addChannelHandler(newHandlerId, handler);
        setChannelHandlerId(newHandlerId); // this order is important - this mark as read should update the event handler up above

        groupChannel.markAsRead(); // There should only be one single instance per channel view.

        var prevMessageListQuery = groupChannel.createPreviousMessageListQuery();
        prevMessageListQuery.limit = 30;
        prevMessageListQuery.reverse = false;
        setMessageSource(prevMessageListQuery);
        messagesDispatcher({
          type: GET_PREV_MESSAGES_START
        }); // Retrieving previous messages.

        prevMessageListQuery.load(function (response, err) {
          var swapParams = sdk.getErrorFirstCallback();
          var messages = response;
          var error = err;

          if (swapParams) {
            messages = error;
            error = response;
          }

          if (error) {
            // maybe - add error state
            return;
          }

          messagesDispatcher({
            type: GET_PREV_MESSAGES_SUCESS,
            payload: {
              messages: messages,
              hasMore: prevMessageListQuery.hasMore
            }
          });
          setTimeout(function () {
            return scrollIntoLast('.sendbird-msg--scroll-ref');
          });
        });
      });
    } // eslint-disable-next-line consistent-return


    return function () {
      if (sdk && sdk.removeChannelHandler) {
        sdk.removeChannelHandler(channelHandlerId);
      }
    };
  }, [channelUrl, sdkInit]); // todo: cleanup internal state - this is for removing messages from other person

  useEffect(function () {
    setMessageReciverId(uuidv4());

    if (channelUrl && sdk) {
      eventHandler({
        messagesDispatcher: messagesDispatcher,
        sdk: sdk
      });
    }

    return function () {
      if (sdk && sdk.removeChannelHandler) {
        sdk.removeChannelHandler(messageReciverId);
      }
    };
  }, [channelUrl, sdkInit]); // to create initial read status

  useEffect(function () {
    if (allMessages.length > 0) {
      var allReadStatus = allMessages.reduce(function (accumulator, msg) {
        if (msg.messageId !== 0) {
          return _objectSpread2({}, accumulator, _defineProperty({}, msg.messageId, getParsedStatus(msg, currentGroupChannel)));
        }

        return accumulator;
      }, {});
      setReadStatus(allReadStatus);
    }
  }, [allMessages]);

  if (sdkError) {
    return React.createElement("div", {
      className: "sendbird-conversation"
    }, React.createElement(PlaceHolder, {
      type: PlaceHolderTypes.WRONG,
      retryToConnect: function retryToConnect() {
        reconnect();
      }
    }));
  }

  if (!channelUrl) {
    return React.createElement("div", {
      className: "sendbird-conversation"
    }, React.createElement(PlaceHolder, {
      type: PlaceHolderTypes.NO_CHANNELS
    }));
  }

  if (loading) {
    return React.createElement("div", {
      className: "sendbird-conversation"
    }, React.createElement(PlaceHolder, {
      type: PlaceHolderTypes.LOADING
    }));
  }

  if (invalidChannel) {
    return React.createElement("div", {
      className: "sendbird-conversation"
    }, React.createElement(PlaceHolder, {
      type: PlaceHolderTypes.WRONG
    }));
  }

  return React.createElement("div", {
    className: "sendbird-conversation"
  }, React.createElement(ChatHeader, {
    currentGroupChannel: currentGroupChannel,
    currentUser: user,
    onActionClick: onChatHeaderActionClick,
    subTitle: currentGroupChannel.members && currentGroupChannel.members.length !== 2,
    isActive: false,
    isMuted: false
  }), unreadCount > 0 && React.createElement(Notification, {
    count: unreadCount,
    onClick: function onClick() {
      scrollIntoLast('.sendbird-msg--scroll-ref'); // there is no scroll

      if (scrollRef.current.scrollTop === 0) {
        currentGroupChannel.markAsRead();
        messagesDispatcher({
          type: MARK_AS_READ
        });
      }
    },
    time: unreadSince
  }), React.createElement(ConversationScroll, {
    swapParams: sdk && sdk.getErrorFirstCallback && sdk.getErrorFirstCallback(),
    scrollRef: scrollRef,
    hasMore: hasMore,
    messagesDispatcher: messagesDispatcher,
    messageSource: messageSource,
    initialized: initialized,
    allMessages: allMessages,
    userId: userId,
    readStatus: readStatus,
    currentGroupChannel: currentGroupChannel,
    renderChatItem: renderChatItem,
    deleteMessage: function deleteMessage(message, cb) {
      currentGroupChannel.deleteMessage(message, function (err) {
        if (cb) {
          cb(err);
        }

        if (!err) {
          messagesDispatcher({
            type: ON_MESSAGE_DELETED,
            payload: message.messageId
          });
        }
      });
    },
    updateMessage: function updateMessage(messageId, text, cb) {
      var params = new sdk.UserMessageParams();
      params.message = text;
      currentGroupChannel.updateUserMessage(messageId, params, function (r, e) {
        var swapParams = sdk.getErrorFirstCallback();
        var message = r;
        var err = e;

        if (swapParams) {
          message = e;
          err = r;
        }

        if (cb) {
          cb(err, message);
        }

        if (!err) {
          messagesDispatcher({
            type: ON_MESSAGE_UPDATED,
            payload: message
          });
        }
      });
    }
  }), React.createElement("div", {
    className: "sendbird-conversation__footer"
  }, React.createElement(MessageInput, {
    ref: messageInputRef,
    disabled: !initialized,
    onStartTyping: function onStartTyping() {
      currentGroupChannel.startTyping();
    },
    onSendMessage: function onSendMessage() {
      var text = messageInputRef.current.value;
      var params = new sdk.UserMessageParams();
      params.message = text;
      var pendingMsg = currentGroupChannel.sendUserMessage(params, function (res, err) {
        var swapParams = sdk.getErrorFirstCallback();
        var message = res;
        var error = err;

        if (swapParams) {
          message = err;
          error = res;
        }

        if (error) {
          messagesDispatcher({
            type: SEND_MESSAGEGE_FAILURE,
            payload: params
          });
          return;
        }

        messagesDispatcher({
          type: SEND_MESSAGEGE_SUCESS,
          payload: message
        });
      });
      messagesDispatcher({
        type: SEND_MESSAGEGE_START,
        payload: pendingMsg
      });
      setTimeout(function () {
        return scrollIntoLast('.sendbird-msg--scroll-ref');
      });
    },
    onFileUpload: function onFileUpload(file) {
      var params = new sdk.FileMessageParams();
      params.file = file;
      var pendingMsg = currentGroupChannel.sendFileMessage(params, function (response, err) {
        var swapParams = sdk.getErrorFirstCallback();
        var message = response;
        var error = err;

        if (swapParams) {
          message = err;
          error = response;
        }

        if (error) {
          messagesDispatcher({
            type: SEND_MESSAGEGE_FAILURE,
            payload: params
          });
          return;
        }

        messagesDispatcher({
          type: SEND_MESSAGEGE_SUCESS,
          payload: message
        });
      });
      messagesDispatcher({
        type: SEND_MESSAGEGE_START,
        payload: _objectSpread2({}, pendingMsg, {
          url: URL.createObjectURL(file),
          // pending thumbnail message seems to be failed
          requestState: 'pending'
        })
      });
      setTimeout(function () {
        return scrollIntoLast('.sendbird-msg--scroll-ref');
      }, 1000);
    }
  }), React.createElement("div", {
    className: "sendbird-conversation__typing-indicator"
  }, React.createElement(TypingIndicator, {
    channelUrl: channelUrl,
    sb: sdk
  }))));
};
ConversationPanel.propTypes = {
  channelUrl: PropTypes.string,
  stores: PropTypes.shape({
    sdkStore: PropTypes.shape({
      initialized: PropTypes.bool,
      sdk: PropTypes.shape({
        getErrorFirstCallback: PropTypes.func,
        removeChannelHandler: PropTypes.func,
        GroupChannel: PropTypes.any,
        ChannelHandler: PropTypes.any,
        addChannelHandler: PropTypes.func,
        UserMessageParams: PropTypes.any,
        FileMessageParams: PropTypes.any
      }),
      error: PropTypes.bool
    }),
    userStore: PropTypes.shape({
      user: PropTypes.shape({})
    })
  }).isRequired,
  dispatchers: PropTypes.shape({
    reconnect: PropTypes.func
  }).isRequired,
  config: PropTypes.shape({
    userId: PropTypes.string.isRequired
  }).isRequired,
  renderChatItem: PropTypes.element,
  onChatHeaderActionClick: PropTypes.func
};
ConversationPanel.defaultProps = {
  channelUrl: null,
  renderChatItem: null,
  onChatHeaderActionClick: noop$5
};
var Conversation = withSendbirdContext(ConversationPanel);

var InputLabel = function InputLabel(_ref) {
  var children = _ref.children;
  return React.createElement(Label, {
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_1,
    className: "sendbird-input-label"
  }, children);
};
InputLabel.propTypes = {
  children: PropTypes.string.isRequired
}; // future: add validations? onChange? more props etc etc

var Input = React.forwardRef(function (props, ref) {
  var value = props.value,
      placeHolder = props.placeHolder,
      disabled = props.disabled,
      name = props.name,
      required = props.required;

  var _useState = useState(value),
      _useState2 = _slicedToArray(_useState, 2),
      inputValue = _useState2[0],
      setInputValue = _useState2[1];

  return React.createElement("div", {
    className: "sendbird-input"
  }, React.createElement("input", {
    required: required,
    ref: ref,
    name: name,
    disabled: disabled,
    value: inputValue,
    className: "sendbird-input--input",
    onChange: function onChange(e) {
      setInputValue(e.target.value);
    }
  }), placeHolder && !inputValue && React.createElement(Label, {
    className: "sendbird-input--placeholder",
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_3
  }, placeHolder));
});
Input.propTypes = {
  value: PropTypes.string,
  placeHolder: PropTypes.string,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  required: PropTypes.bool
};
Input.defaultProps = {
  value: '',
  placeHolder: '',
  disabled: false,
  required: false
};

var EditDetails = function EditDetails(props) {
  var _onSubmit = props.onSubmit,
      onCancel = props.onCancel,
      avatar = props.avatar,
      title = props.title;
  var inputRef = useRef(null);
  var formRef = useRef(null);
  var hiddenInputRef = useRef(null);

  var _useState = useState(avatar),
      _useState2 = _slicedToArray(_useState, 2),
      currentImg = _useState2[0],
      setCurrentImg = _useState2[1];

  var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      newFile = _useState4[0],
      setNewFile = _useState4[1];

  return React.createElement(Modal, {
    titleText: LabelStringSet.MODAL__CHANNEL_INFORMATION__TITLE,
    submitText: LabelStringSet.BUTTON__SAVE,
    onCancel: onCancel,
    onSubmit: function onSubmit() {
      if (title !== '' && !inputRef.current.value) {
        if (formRef.current.reportValidity) {
          // might not work in explorer
          formRef.current.reportValidity();
        }

        return;
      }

      _onSubmit(newFile, inputRef.current.value);

      onCancel();
    },
    type: Type$1.PRIMARY
  }, React.createElement("form", {
    className: "channel-profile-form",
    ref: formRef
  }, React.createElement("div", {
    className: "channel-profile-form__img-section"
  }, React.createElement(InputLabel, null, LabelStringSet.MODAL__CHANNEL_INFORMATION__CHANNEL_IMAGE), React.createElement("div", {
    className: "channel-profile-form__avatar"
  }, React.createElement(Avatar, {
    height: "80px",
    width: "80px",
    src: currentImg
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
    className: "channel-profile-form__avatar-button",
    onClick: function onClick() {
      return hiddenInputRef.current.click();
    },
    notUnderline: true
  }, React.createElement(Label, {
    type: LabelTypography.BUTTON_1,
    color: LabelColors.PRIMARY
  }, LabelStringSet.MODAL__CHANNEL_INFORMATION__UPLOAD))), React.createElement("div", {
    className: "channel-profile-form__name-section"
  }, React.createElement(InputLabel, null, LabelStringSet.MODAL__CHANNEL_INFORMATION__CHANNEL_NAME), React.createElement(Input, {
    required: title !== '',
    name: "channel-profile-form__name",
    ref: inputRef,
    value: title,
    placeHolder: LabelStringSet.MODAL__CHANNEL_INFORMATION__INPUT__PLACE_HOLDER
  }))));
};

EditDetails.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
  title: PropTypes.string.isRequired
};

var ChannelProfile = function ChannelProfile(props) {
  var avatar = props.avatar,
      title = props.title,
      onChannelInfoChange = props.onChannelInfoChange;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      showModal = _useState2[0],
      setShowModal = _useState2[1];

  return React.createElement("div", {
    className: "sendbird-channel-profile"
  }, React.createElement("div", {
    className: "sendbird-channel-profile--inner"
  }, React.createElement("div", {
    className: "sendbird-channel-profile__avatar"
  }, React.createElement(Avatar, {
    src: avatar
  })), React.createElement(Label, {
    type: LabelTypography.SUBTITLE_2,
    color: LabelColors.ONBACKGROUND_1,
    className: "sendbird-channel-profile__title"
  }, title), React.createElement(TextButton, {
    className: "sendbird-channel-profile__edit",
    onClick: function onClick() {
      return setShowModal(true);
    },
    notUnderline: true
  }, React.createElement(Label, {
    type: LabelTypography.BUTTON_1,
    color: LabelColors.PRIMARY
  }, LabelStringSet.CHANNEL_SETTING__PROFILE__EDIT)), showModal && React.createElement(EditDetails, {
    onCancel: function onCancel() {
      return setShowModal(false);
    },
    onSubmit: onChannelInfoChange,
    avatar: avatar,
    title: title
  })));
};

ChannelProfile.propTypes = {
  avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  title: PropTypes.string,
  onChannelInfoChange: PropTypes.func
};
ChannelProfile.defaultProps = {
  avatar: '',
  title: '',
  onChannelInfoChange: function onChannelInfoChange() {}
};

var SHOWN_MEMBER_MAX = 10;

var MemebersAccordion = function MemebersAccordion(_ref) {
  var members = _ref.members,
      userQueryCreator = _ref.userQueryCreator,
      onInviteMemebers = _ref.onInviteMemebers,
      swapParams = _ref.swapParams;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      showMoreModal = _useState2[0],
      setShowMoreModal = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      showAddUserModal = _useState4[0],
      setShowAddUserModal = _useState4[1];

  return React.createElement("div", {
    className: "sendbird-members-accordion"
  }, React.createElement("div", {
    className: "sendbird-members-accordion__list"
  }, members.slice(0, SHOWN_MEMBER_MAX).map(function (member) {
    return React.createElement("div", {
      className: "sendbird-members-accordion__member",
      key: member.userId
    }, React.createElement("div", {
      className: "sendbird-members-accordion__member-avatar"
    }, React.createElement(Avatar, {
      height: "24px",
      width: "24px",
      src: member.profileUrl
    })), React.createElement(Label, {
      type: LabelTypography.SUBTITLE_2,
      color: LabelColors.ONBACKGROUND_1
    }, member.nickname));
  })), React.createElement("div", {
    className: "sendbird-members-accordion__footer"
  }, members.length >= SHOWN_MEMBER_MAX && React.createElement(Button, {
    className: "sendbird-members-accordion__footer__all-members",
    type: Type$1.SECONDARY,
    size: Size.SMALL,
    onClick: function onClick() {
      return setShowMoreModal(true);
    }
  }, LabelStringSet.CHANNEL_SETTING__MEMBERS__SEE_ALL_MEMBERS), members.length >= SHOWN_MEMBER_MAX && showMoreModal && React.createElement(Modal, {
    hideFooter: true,
    onCancel: function onCancel() {
      return setShowMoreModal(false);
    },
    onSubmit: function onSubmit() {},
    titleText: "".concat(members.length, " ").concat(LabelStringSet.MODAL__USER_LIST__TITLE)
  }, React.createElement("div", {
    className: "sendbird-more-members__popup-scroll"
  }, members.map(function (m) {
    return React.createElement("div", {
      key: m.userId,
      className: "sendbird-more-members__popup-member"
    }, React.createElement("div", {
      className: "sendbird-more-members__popup-avatar"
    }, React.createElement(Avatar, {
      src: m.profileUrl,
      height: "40px",
      width: "40px"
    })), React.createElement(Label, {
      type: LabelTypography.SUBTITLE_1,
      color: LabelColors.ONBACKGROUND_1
    }, m.nickname || m.userId));
  }))), React.createElement(Button, {
    className: "sendbird-members-accordion__footer__invite-users",
    type: Type$1.SECONDARY,
    size: Size.SMALL,
    onClick: function onClick() {
      return setShowAddUserModal(true);
    }
  }, LabelStringSet.CHANNEL_SETTING__MEMBERS__INVITE_MEMBER), showAddUserModal && React.createElement(InviteMembers, {
    swapParams: swapParams,
    titleText: LabelStringSet.MODAL__INVITE_MEMBER__TITLE,
    submitText: LabelStringSet.BUTTON__INVITE,
    closeModal: function closeModal() {
      return setShowAddUserModal(false);
    },
    idsToFilter: members.map(function (m) {
      return m.userId;
    }),
    userQueryCreator: userQueryCreator,
    onSubmit: onInviteMemebers
  })));
};

MemebersAccordion.propTypes = {
  swapParams: PropTypes.bool,
  members: PropTypes.arrayOf(PropTypes.shape({})),
  userQueryCreator: PropTypes.func.isRequired,
  onInviteMemebers: PropTypes.func.isRequired
};
MemebersAccordion.defaultProps = {
  swapParams: false,
  members: []
};

function ChannelSettings(props) {
  var onCloseClick = props.onCloseClick,
      channelUrl = props.channelUrl,
      onChannelModified = props.onChannelModified;
  var sdkStore = props.stores.sdkStore,
      _props$config = props.config,
      userListQuery = _props$config.userListQuery,
      userId = _props$config.userId;
  var sdk = sdkStore.sdk,
      initialized = sdkStore.initialized; // hack to kepp track of channel updates by triggering useEffect

  var _useState = useState(uuidv4()),
      _useState2 = _slicedToArray(_useState, 2),
      channelUpdateId = _useState2[0],
      setChannelUpdateId = _useState2[1];

  var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      channel = _useState4[0],
      setChannel = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      invalidChannel = _useState6[0],
      setInvalidChannel = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      showAccordion = _useState8[0],
      setShowAccordion = _useState8[1];

  var _useState9 = useState(false),
      _useState10 = _slicedToArray(_useState9, 2),
      showLeaveChannelModal = _useState10[0],
      setShowLeaveChannelModal = _useState10[1];

  useEffect(function () {
    if (!channelUrl || !initialized || !sdk) {
      setInvalidChannel(false);
    } else {
      if (!sdk || !sdk.GroupChannel) {
        return;
      }

      sdk.GroupChannel.getChannel(channelUrl, function (groupChannel) {
        if (!groupChannel) {
          setInvalidChannel(true);
        } else {
          setInvalidChannel(false);
          setChannel(groupChannel);
        }
      });
    }
  }, [channelUrl, initialized, channelUpdateId]);

  if (!channel || invalidChannel) {
    return React.createElement("div", {
      className: "sendbird-channel-settings"
    }, React.createElement("div", {
      className: "sendbird-channel-settings__header"
    }, React.createElement(Label, {
      type: LabelTypography.H_2,
      color: LabelColors.ONBACKGROUND_1
    }, LabelStringSet.CHANNEL_SETTING__HEADER__TITLE), React.createElement(Icon, {
      type: IconTypes.CLOSE,
      className: "sendbird-channel-settings__close-icon",
      height: "24px",
      width: "24px",
      onClick: function onClick() {
        onCloseClick();
      }
    })), React.createElement("div", null, React.createElement(PlaceHolder, {
      type: PlaceHolderTypes.WRONG
    })));
  }

  return React.createElement("div", {
    className: "sendbird-channel-settings"
  }, React.createElement("div", {
    className: "sendbird-channel-settings__header"
  }, React.createElement(Label, {
    type: LabelTypography.H_2,
    color: LabelColors.ONBACKGROUND_1
  }, LabelStringSet.CHANNEL_SETTING__HEADER__TITLE), React.createElement(Icon, {
    type: IconTypes.CLOSE,
    className: "sendbird-channel-settings__close-icon",
    height: "24px",
    width: "24px",
    onClick: function onClick() {
      onCloseClick();
    }
  })), React.createElement("div", {
    className: "sendbird-channel-settings__scroll-area"
  }, React.createElement(ChannelProfile, {
    avatar: getChannelAvatarSource(channel, userId),
    title: channel.name,
    onChannelInfoChange: function onChannelInfoChange(currentImg, currentTitle) {
      channel.updateChannel(currentTitle, currentImg, channel.data, function (response) {
        onChannelModified(response);
        setChannelUpdateId(uuidv4());
      });
    }
  }), React.createElement("div", {
    role: "switch",
    "aria-checked": showAccordion,
    tabIndex: 0,
    onKeyDown: function onKeyDown() {
      return setShowAccordion(!showAccordion);
    },
    className: "sendbird-channel-settings__panel-item",
    onClick: function onClick() {
      return setShowAccordion(!showAccordion);
    }
  }, React.createElement(Icon, {
    type: IconTypes.MEMBERS,
    className: "sendbird-channel-settings__panel-icon-left",
    height: "24px",
    width: "24px",
    fillColor: IconColors.PRIMARY
  }), React.createElement(Label, {
    type: LabelTypography.SUBTITLE_1,
    color: LabelColors.ONBACKGROUND_1
  }, "".concat(LabelStringSet.CHANNEL_SETTING__MEMBERS__TITLE, " (").concat(channel.members.length, ")")), React.createElement(Icon, {
    type: IconTypes.SHEVRON,
    className: ['sendbird-channel-settings__panel-icon-right', 'sendbird-channel-settings__panel-icon--chevron', showAccordion ? 'sendbird-channel-settings__panel-icon--open' : ''].join(' '),
    height: "24px",
    width: "24px"
  })), showAccordion && React.createElement(MemebersAccordion // eslint-disable-next-line
  , {
    userQueryCreator: userListQuery && typeof userListQuery === 'function' ? userListQuery : sdk.createApplicationUserListQuery.bind(sdk),
    swapParams: sdk && sdk.getErrorFirstCallback && sdk.getErrorFirstCallback(),
    members: channel.members,
    onInviteMemebers: function onInviteMemebers(selectedMemebers) {
      channel.inviteWithUserIds(selectedMemebers, function (response, error) {
        var swapParams = sdk.getErrorFirstCallback();
        var res = response;
        var err = error;

        if (swapParams) {
          res = error;
          err = response;
        }

        if (!err) {
          onChannelModified(res);
          setChannelUpdateId(uuidv4());
        }
      });
    }
  }), React.createElement("div", {
    className: "sendbird-channel-settings__panel-item",
    role: "button",
    tabIndex: 0,
    onKeyDown: function onKeyDown() {
      return setShowLeaveChannelModal(true);
    },
    onClick: function onClick() {
      return setShowLeaveChannelModal(true);
    }
  }, React.createElement(Icon, {
    type: IconTypes.LEAVE,
    className: ['sendbird-channel-settings__panel-icon-left', 'sendbird-channel-settings__panel-icon__leave'].join(' '),
    height: "24px",
    width: "24px"
  }), React.createElement(Label, {
    type: LabelTypography.SUBTITLE_1,
    color: LabelColors.ONBACKGROUND_1
  }, LabelStringSet.CHANNEL_SETTING__LEAVE_CHANNEL__TITLE)), showLeaveChannelModal && React.createElement(LeaveChannel, {
    onCloseModal: function onCloseModal() {
      return setShowLeaveChannelModal(false);
    },
    onLeaveChannel: function onLeaveChannel() {
      channel.leave(function (_, error) {
        var swapParams = sdk.getErrorFirstCallback();
        var err = error;

        if (swapParams) {
          err = _;
        }

        if (!err) {
          onCloseClick();
        }
      });
    }
  })));
}

ChannelSettings.propTypes = {
  onCloseClick: PropTypes.func,
  onChannelModified: PropTypes.func,
  channelUrl: PropTypes.string.isRequired,
  // from withSendbirdContext
  stores: PropTypes.shape({
    sdkStore: PropTypes.shape({
      sdk: PropTypes.shape({
        getErrorFirstCallback: PropTypes.func,
        GroupChannel: PropTypes.oneOfType([PropTypes.shape({
          getChannel: PropTypes.func
        }), PropTypes.func]),
        createApplicationUserListQuery: PropTypes.any
      }),
      initialized: PropTypes.bool
    })
  }).isRequired,
  config: PropTypes.shape({
    userId: PropTypes.string,
    userListQuery: PropTypes.func
  }).isRequired
};
ChannelSettings.defaultProps = {
  onCloseClick: function onCloseClick() {},
  onChannelModified: function onChannelModified() {}
};
var ChannelSettings$1 = withSendbirdContext(ChannelSettings);

function App(props) {
  var appId = props.appId,
      userId = props.userId,
      accessToken = props.accessToken,
      theme = props.theme,
      userListQuery = props.userListQuery,
      nickname = props.nickname,
      profileUrl = props.profileUrl;

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      currentChannelUrl = _useState2[0],
      setCurrentChannelUrl = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      showSettings = _useState4[0],
      setShowSettings = _useState4[1];

  return React.createElement(Sendbird, {
    appId: appId,
    userId: userId,
    accessToken: accessToken,
    theme: theme,
    nickname: nickname,
    profileUrl: profileUrl,
    userListQuery: userListQuery
  }, React.createElement("div", {
    className: "sendbird-app__wrap"
  }, React.createElement("div", {
    className: "sendbird-app__channellist-wrap"
  }, React.createElement(ChannelList$1, {
    onChannelSelect: function onChannelSelect(channel) {
      if (channel && channel.url) {
        setCurrentChannelUrl(channel.url);
      }
    }
  })), React.createElement("div", {
    className: "sendbird-app__conversation-wrap"
  }, React.createElement(Conversation, {
    channelUrl: currentChannelUrl,
    onChatHeaderActionClick: function onChatHeaderActionClick() {
      setShowSettings(true);
    }
  }))), showSettings && React.createElement("div", {
    className: "sendbird-app__settingspanel-wrap"
  }, React.createElement(ChannelSettings$1, {
    channelUrl: currentChannelUrl,
    onCloseClick: function onCloseClick() {
      setShowSettings(false);
    }
  })), React.createElement(ModalRoot, null), React.createElement(MenuRoot, null));
}
App.propTypes = {
  appId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  accessToken: PropTypes.string,
  theme: PropTypes.string,
  userListQuery: PropTypes.func,
  nickname: PropTypes.string,
  profileUrl: PropTypes.string
};
App.defaultProps = {
  accessToken: '',
  theme: 'light',
  nickname: '',
  profileUrl: '',
  userListQuery: null
};

// SendBird disconnect. Invalidates currentUser
// eslint-disable-next-line max-len
var getConnect = function getConnect(store) {
  return function (userId, accessToken) {
    return new Promise(function (resolve, reject) {
      var _store$stores = store.stores,
          stores = _store$stores === void 0 ? {} : _store$stores;
      var _stores$sdkStore = stores.sdkStore,
          sdkStore = _stores$sdkStore === void 0 ? {} : _stores$sdkStore;
      var sdk = sdkStore.sdk;

      if (!sdk) {
        reject(new Error('Sdk not found'));
      }

      if (!accessToken) {
        sdk.connect(userId, function (response, error) {
          var swapParams = sdk.getErrorFirstCallback();
          var res = response;
          var err = error;

          if (swapParams) {
            res = error;
            err = response;
          }

          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      } else {
        sdk.connect(userId, accessToken, function (response, error) {
          var swapParams = sdk.getErrorFirstCallback();
          var res = response;
          var err = error;

          if (swapParams) {
            res = error;
            err = response;
          }

          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      }
    });
  };
}; // SendBird disconnect. Invalidates currentUser

var getDisconnect = function getDisconnect(store) {
  return function () {
    return new Promise(function (resolve, reject) {
      var _store$stores2 = store.stores,
          stores = _store$stores2 === void 0 ? {} : _store$stores2;
      var _stores$sdkStore2 = stores.sdkStore,
          sdkStore = _stores$sdkStore2 === void 0 ? {} : _stores$sdkStore2;
      var sdk = sdkStore.sdk;

      if (!sdk) {
        reject(new Error('Sdk not found'));
      }

      sdk.disconnect(function (response, error) {
        var swapParams = sdk.getErrorFirstCallback();
        var res = response;
        var err = error;

        if (swapParams) {
          res = error;
          err = response;
        }

        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  };
}; // Using the updateCurrentUserInfo() method
// you can update a user's nickname and profile image with a URL
// eslint-disable-next-line max-len

var getUpdateUserInfo = function getUpdateUserInfo(store) {
  return function (nickName, profileUrl) {
    return new Promise(function (resolve, reject) {
      var _store$stores3 = store.stores,
          stores = _store$stores3 === void 0 ? {} : _store$stores3;
      var _stores$sdkStore3 = stores.sdkStore,
          sdkStore = _stores$sdkStore3 === void 0 ? {} : _stores$sdkStore3;
      var sdk = sdkStore.sdk;

      if (!sdk) {
        reject(new Error('Sdk not found'));
      }

      sdk.updateCurrentUserInfo(nickName, profileUrl, function (response, error) {
        var swapParams = sdk.getErrorFirstCallback();
        var res = response;
        var err = error;

        if (swapParams) {
          res = error;
          err = response;
        }

        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  };
};
var selectors = {
  getConnect: getConnect,
  getDisconnect: getDisconnect,
  getUpdateUserInfo: getUpdateUserInfo
};

export { App, Conversation as Channel, ChannelList$1 as ChannelList, ChannelSettings$1 as ChannelSettings, Sendbird as SendBirdProvider, selectors as sendBirdSelectors, withSendbirdContext as withSendBird };
//# sourceMappingURL=index.es.js.map
