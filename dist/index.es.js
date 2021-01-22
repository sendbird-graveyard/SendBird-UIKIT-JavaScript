import React, { useLayoutEffect, useState, useEffect, useReducer, useMemo, useContext, useRef, Component, useCallback } from 'react';
import PropTypes from 'prop-types';
import Sb from 'sendbird';
import cssVars from 'css-vars-ponyfill';
import isToday from 'date-fns/isToday';
import format from 'date-fns/format';
import isYesterday from 'date-fns/isYesterday';
import { createPortal } from 'react-dom';
import isSameDay from 'date-fns/isSameDay';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';

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
      } // todo - memoize


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

var APP_VERSION_STRING = '1.3.2';
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
    sdk.disconnect().then(function () {
      sdkDispatcher({
        type: RESET_SDK
      });
      userDispatcher({
        type: RESET_USER
      });
    }).finally(function () {
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
      sdk = _ref2.sdk,
      logger = _ref2.logger;
  var sdkDispatcher = dispatchers.sdkDispatcher,
      userDispatcher = dispatchers.userDispatcher;
  disconnectSdk({
    sdkDispatcher: sdkDispatcher,
    userDispatcher: userDispatcher,
    sdk: sdk,
    logger: logger,
    onDisconnect: function onDisconnect() {
      logger.info('Setup connection');
      sdkDispatcher({
        type: SET_SDK_LOADING,
        payload: true
      });

      if (userId && appId) {
        var newSdk = new Sb({
          appId: appId
        }); // to check if code is released version from rollup and *not from storybook*
        // see rollup config file

        {
          newSdk.addExtension('sb_uikit', APP_VERSION_STRING);
        }

        var connectCbSucess = function connectCbSucess(user) {
          sdkDispatcher({
            type: INIT_SDK,
            payload: newSdk
          });
          userDispatcher({
            type: INIT_USER,
            payload: user
          }); // use nickname/profileUrl if provided
          // or set userID as nickname

          var newNickName = nickname || user.nickname;
          var newProfileUrl = profileUrl || user.profileUrl;
          newSdk.updateCurrentUserInfo(newNickName, newProfileUrl).then(function (namedUser) {
            userDispatcher({
              type: UPDATE_USER_INFO,
              payload: namedUser
            });
          });
        };

        var connectCbError = function connectCbError(e) {
          logger.error('Connection failed', "".concat(e));
          sdkDispatcher({
            type: RESET_SDK
          });
          sdkDispatcher({
            type: RESET_USER
          });
          sdkDispatcher({
            type: SDK_ERROR
          });
        };

        if (accessToken) {
          newSdk.connect(userId, accessToken).then(function (res) {
            return connectCbSucess(res);
          }).catch(function (err) {
            return connectCbError(err);
          });
        } else {
          newSdk.connect(userId).then(function (res) {
            return connectCbSucess(res);
          }).catch(function (err) {
            return connectCbError(err);
          });
        }
      } else {
        sdkDispatcher({
          type: SDK_ERROR
        });
        logger.warning('Connection failed', 'UserId or appId missing');
      }
    }
  });
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

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

var isEmpty = function isEmpty(obj) {
  if (obj === null || obj === undefined) {
    return true;
  }

  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
};

var useTheme = function useTheme(overrides) {
  useLayoutEffect(function () {
    if (!isEmpty(overrides)) {
      cssVars({
        variables: __assign({
          '--sendbird-dark-primary-500': '#4d2aa6',
          '--sendbird-dark-primary-400': '#6440C4',
          '--sendbird-dark-primary-300': '#7B53EF',
          '--sendbird-dark-primary-200': '#9E8CF5',
          '--sendbird-dark-primary-100': '#E2DFFF',
          '--sendbird-dark-secondary-500': '#007A7A',
          '--sendbird-dark-secondary-400': '#189A8D',
          '--sendbird-dark-secondary-300': '#2EBA9F',
          '--sendbird-dark-secondary-200': '#6FD6BE',
          '--sendbird-dark-secondary-100': '#AEF2DC',
          '--sendbird-dark-information-100': '#b2d9ff',
          '--sendbird-dark-error-500': '#A30E2D',
          '--sendbird-dark-error-400': '#C11F41',
          '--sendbird-dark-error-300': '#E53157',
          '--sendbird-dark-error-200': '#FF6183',
          '--sendbird-dark-error-100': '#FFABBD',
          '--sendbird-dark-background-700': '#000000',
          '--sendbird-dark-background-600': '#161616',
          '--sendbird-dark-background-500': '#2C2C2C',
          '--sendbird-dark-background-400': '#393939',
          '--sendbird-dark-background-300': '#A8A8A8',
          '--sendbird-dark-background-200': '#D9D9D9',
          '--sendbird-dark-background-100': '#F0F0F0',
          '--sendbird-dark-background-50': '#FFFFFF',
          '--sendbird-dark-overlay': 'rgba(0, 0, 0, 0.32)',
          '--sendbird-dark-onlight-01': 'rgba(0, 0, 0, 0.88)',
          '--sendbird-dark-onlight-02': 'rgba(0, 0, 0, 0.50)',
          '--sendbird-dark-onlight-03': 'rgba(0, 0, 0, 0.38)',
          '--sendbird-dark-onlight-04': 'rgba(0, 0, 0, 0.12)',
          '--sendbird-dark-ondark-01': 'rgba(255, 255, 255, 0.88)',
          '--sendbird-dark-ondark-02': 'rgba(255, 255, 255, 0.50)',
          '--sendbird-dark-ondark-03': 'rgba(255, 255, 255, 0.38)',
          '--sendbird-dark-ondark-04': 'rgba(255, 255, 255, 0.12)',
          '--sendbird-dark-shadow-01': '0 1px 5px 0 rgba(33, 34, 66, 0.04), 0 0 3px 0 rgba(0, 0, 0, 0.08), 0 2px 1px 0 rgba(0, 0, 0, 0.12)',
          '--sendbird-dark-shadow-02': '0 3px 5px -3px rgba(33, 34, 66, 0.04), 0 3px 14px 2px rgba(0, 0, 0, 0.08), 0 8px 10px 1px rgba(0, 0, 0, 0.12)',
          '--sendbird-dark-shadow-03': '0 6px 10px -5px rgba(0, 0, 0, 0.04), 0 6px 30px 5px rgba(0, 0, 0, 0.08), 0 16px 24px 2px rgba(0, 0, 0, 0.12)',
          '--sendbird-dark-shadow-04': '0 9px 15px -7px rgba(0, 0, 0, 0.04), 0 9px 46px 8px rgba(0, 0, 0, 0.08), 0 24px 38px 3px rgba(0, 0, 0, 0.12)',
          '--sendbird-dark-shadow-message-input': '0 1px 5px 0 rgba(33, 34, 66, 0.12), 0 0 1px 0 rgba(33, 34, 66, 0.16), 0 2px 1px 0 rgba(33, 34, 66, 0.08), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
          '--sendbird-light-primary-500': '#4d2aa6',
          '--sendbird-light-primary-400': '#6440C4',
          '--sendbird-light-primary-300': '#7B53EF',
          '--sendbird-light-primary-200': '#9E8CF5',
          '--sendbird-light-primary-100': '#E2DFFF',
          '--sendbird-light-secondary-500': '#007A7A',
          '--sendbird-light-secondary-400': '#189A8D',
          '--sendbird-light-secondary-300': '#2EBA9F',
          '--sendbird-light-secondary-200': '#6FD6BE',
          '--sendbird-light-secondary-100': '#AEF2DC',
          '--sendbird-light-information-100': '#b2d9ff',
          '--sendbird-light-error-500': '#A30E2D',
          '--sendbird-light-error-400': '#C11F41',
          '--sendbird-light-error-300': '#E53157',
          '--sendbird-light-error-200': '#FF6183',
          '--sendbird-light-error-100': '#FFABBD',
          '--sendbird-light-background-700': '#000000',
          '--sendbird-light-background-600': '#161616',
          '--sendbird-light-background-500': '#2C2C2C',
          '--sendbird-light-background-400': '#393939',
          '--sendbird-light-background-300': '#A8A8A8',
          '--sendbird-light-background-200': '#D9D9D9',
          '--sendbird-light-background-100': '#F0F0F0',
          '--sendbird-light-background-50': ' #FFFFFF',
          '--sendbird-light-overlay': 'rgba(0, 0, 0, 0.32)',
          '--sendbird-light-onlight-01': 'rgba(0, 0, 0, 0.88)',
          '--sendbird-light-onlight-02': 'rgba(0, 0, 0, 0.50)',
          '--sendbird-light-onlight-03': 'rgba(0, 0, 0, 0.38)',
          '--sendbird-light-onlight-04': 'rgba(0, 0, 0, 0.12)',
          '--sendbird-light-ondark-01': 'rgba(255, 255, 255, 0.88)',
          '--sendbird-light-ondark-02': 'rgba(255, 255, 255, 0.50)',
          '--sendbird-light-ondark-03': 'rgba(255, 255, 255, 0.38)',
          '--sendbird-light-ondark-04': 'rgba(255, 255, 255, 0.12)',
          '--sendbird-light-shadow-01': '0 1px 5px 0 rgba(33, 34, 66, 0.04), 0 0 3px 0 rgba(0, 0, 0, 0.08), 0 2px 1px 0 rgba(0, 0, 0, 0.12)',
          '--sendbird-light-shadow-02': '0 3px 5px -3px rgba(33, 34, 66, 0.04), 0 3px 14px 2px rgba(0, 0, 0, 0.08), 0 8px 10px 1px rgba(0, 0, 0, 0.12)',
          '--sendbird-light-shadow-03': '0 6px 10px -5px rgba(0, 0, 0, 0.04), 0 6px 30px 5px rgba(0, 0, 0, 0.08), 0 16px 24px 2px rgba(0, 0, 0, 0.12)',
          '--sendbird-light-shadow-04': '0 9px 15px -7px rgba(0, 0, 0, 0.04), 0 9px 46px 8px rgba(0, 0, 0, 0.08), 0 24px 38px 3px rgba(0, 0, 0, 0.12)',
          '--sendbird-light-shadow-message-input': '0 1px 5px 0 rgba(33, 34, 66, 0.12), 0 0 1px 0 rgba(33, 34, 66, 0.16), 0 2px 1px 0 rgba(33, 34, 66, 0.08), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
          '--sendbird-light-theme-surface-2': '#EAEAEA'
        }, overrides)
      });
    }
  }, [overrides]);
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

function useConnectionStatus(sdk, logger) {
  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      isOnline = _useState2[0],
      setIsOnline = _useState2[1];

  useEffect(function () {
    var uniqueHandlerId = uuidv4();
    logger.warning('sdk changed', uniqueHandlerId);
    var handler;

    if (sdk && sdk.ConnectionHandler) {
      handler = new sdk.ConnectionHandler();

      handler.onReconnectStarted = function () {
        setIsOnline(false);
        logger.warning('onReconnectStarted', {
          isOnline: isOnline
        });
      };

      handler.onReconnectSucceeded = function () {
        setIsOnline(true);
        logger.warning('onReconnectSucceeded', {
          isOnline: isOnline
        });
      };

      handler.onReconnectFailed = function () {
        sdk.reconnect();
        logger.warning('onReconnectFailed');
      };

      logger.info('Added ConnectionHandler', uniqueHandlerId);
      sdk.addConnectionHandler(uniqueHandlerId, handler);
    }

    return function () {
      try {
        sdk.removeConnectionHandler(uniqueHandlerId);
        logger.info('Removed ConnectionHandler', uniqueHandlerId);
      } catch (_unused) {//
      }
    };
  }, [sdk]);
  useEffect(function () {
    var tryReconnect = function tryReconnect() {
      try {
        logger.warning('Try reconnecting SDK');

        if (sdk.getConnectionState() !== 'OPEN') {
          // connection is not broken yet
          sdk.reconnect();
        }
      } catch (_unused2) {//
      }
    }; // addEventListener version


    window.addEventListener('online', tryReconnect);
    return function () {
      window.removeEventListener('online', tryReconnect);
    };
  }, [sdk]); // add offline-class to body

  useEffect(function () {
    var body = document.querySelector('body');

    if (!isOnline) {
      try {
        body.classList.add('sendbird__offline');
        logger.info('Added class sendbird__offline to body');
      } catch (e) {//
      }
    } else {
      try {
        body.classList.remove('sendbird__offline');
        logger.info('Removed class sendbird__offline from body');
      } catch (e) {//
      }
    }
  }, [isOnline]);
  return isOnline;
}

var LOG_LEVELS = {
  DEBUG: 'debug',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
  ALL: 'all'
};

var colorLog = function colorLog(level) {
  switch (level) {
    case LOG_LEVELS.WARNING:
      return 'color: Orange';

    case LOG_LEVELS.ERROR:
      return 'color: Red';

    default:
      return 'color: Gray';
  }
};

var printLog = function printLog(_ref) {
  var level = _ref.level,
      title = _ref.title,
      _ref$description = _ref.description,
      description = _ref$description === void 0 ? '' : _ref$description;
  // eslint-disable-next-line no-console
  console.log("%c SendbirdUIKit | ".concat(level, " | ").concat(new Date().toISOString(), " | ").concat(title, " ").concat(description && '|'), colorLog(level), description);
};
var getDefaultLogger = function getDefaultLogger() {
  return {
    info: function info() {},
    error: function error() {},
    warning: function warning() {}
  };
};
var LoggerFactory = function LoggerFactory(lvl, customInterface) {
  var logInterface = customInterface || printLog;
  var lvlArray = Array.isArray(lvl) ? lvl : [lvl];

  var applyLog = function applyLog(lgLvl) {
    return function (title, description) {
      return logInterface({
        level: lgLvl,
        title: title,
        description: description
      });
    };
  };

  var logger = lvlArray.reduce(function (accumulator, currentLvl) {
    if (currentLvl === LOG_LEVELS.DEBUG || currentLvl === LOG_LEVELS.ALL) {
      return _objectSpread2({}, accumulator, {
        info: applyLog(LOG_LEVELS.INFO),
        error: applyLog(LOG_LEVELS.ERROR),
        warning: applyLog(LOG_LEVELS.WARNING)
      });
    }

    if (currentLvl === LOG_LEVELS.INFO) {
      return _objectSpread2({}, accumulator, {
        info: applyLog(LOG_LEVELS.INFO)
      });
    }

    if (currentLvl === LOG_LEVELS.ERROR) {
      return _objectSpread2({}, accumulator, {
        error: applyLog(LOG_LEVELS.ERROR)
      });
    }

    if (currentLvl === LOG_LEVELS.WARNING) {
      return _objectSpread2({}, accumulator, {
        warning: applyLog(LOG_LEVELS.WARNING)
      });
    }

    return _objectSpread2({}, accumulator);
  }, getDefaultLogger());
  return logger;
};

// https://davidwalsh.name/pubsub-javascript
var pubSubFactory = (function () {
  var topics = {};
  var hOP = topics.hasOwnProperty;
  return {
    __getTopics: function __getTopics() {
      return topics;
    },
    subscribe: function subscribe(topic, listener) {
      // Create the topic's object if not yet created
      if (!hOP.call(topics, topic)) {
        topics[topic] = [];
      } // Add the listener to queue


      var index = topics[topic].push(listener) - 1; // Provide handle back for removal of topic

      return {
        remove: function remove() {
          delete topics[topic][index];
        }
      };
    },
    publish: function publish(topic, info) {
      // If the topic doesn't exist, or there's no listeners in queue, just leave
      if (!hOP.call(topics, topic)) {
        return;
      } // Cycle through topics queue, fire!


      topics[topic].forEach(function (item) {
        item(info !== undefined ? info : {});
      });
    }
  };
});

function useAppendDomNode() {
  var ids = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var rootSelector = arguments.length > 1 ? arguments[1] : undefined;
  useEffect(function () {
    var root = document.querySelector(rootSelector);
    ids.forEach(function (id) {
      var elem = document.createElement('div');
      elem.setAttribute('id', id);
      root.appendChild(elem);
    });
    return function () {
      ids.forEach(function (id) {
        var target = document.getElementById(id);

        if (target) {
          root.removeChild(target);
        }
      });
    };
  }, []);
}

var getStringSet = function getStringSet() {
  var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'en';
  var stringSet = {
    en: {
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
      PLACE_HOLDER__NO_CHANNEL: 'No channels',
      CHANNEL_FROZEN: 'Channel frozen',
      MUTED_PL: 'Channel frozen',
      PLACE_HOLDER__WRONG: 'Something went wrong',
      PLACE_HOLDER__RETRY_TO_CONNECT: 'Retry',
      NO_TITLE: 'No title',
      NO_NAME: '(No name)',
      NO_MEMBERS: '(No members)',
      TOOLTIP__AND_YOU: ', and you',
      TOOLTIP__YOU: 'you',
      TOOLTIP__UNKOWN_USER: '(no name)',
      UNKNOWN__UNKNOWN_MESSAGE_TYPE: '(Unknown message type)',
      UNKNOWN__CANNOT_READ_MESSAGE: 'Cannot read this message.',
      MESSAGE_EDITED: '(edited)'
    }
  };
  return stringSet[lang];
};

var LocalizationContext = React.createContext({
  stringSet: getStringSet('en')
});

var LocalizationProvider = function LocalizationProvider(props) {
  var children = props.children;
  return React.createElement(LocalizationContext.Provider, {
    value: props
  }, children);
};

function Sendbird(props) {
  var userId = props.userId,
      appId = props.appId,
      accessToken = props.accessToken,
      children = props.children,
      disableUserProfile = props.disableUserProfile,
      renderUserProfile = props.renderUserProfile,
      allowProfileEdit = props.allowProfileEdit,
      theme = props.theme,
      nickname = props.nickname,
      profileUrl = props.profileUrl,
      userListQuery = props.userListQuery,
      _props$config = props.config,
      config = _props$config === void 0 ? {} : _props$config,
      colorSet = props.colorSet,
      stringSet = props.stringSet;
  var _config$logLevel = config.logLevel,
      logLevel = _config$logLevel === void 0 ? '' : _config$logLevel;

  var _useState = useState(LoggerFactory(logLevel)),
      _useState2 = _slicedToArray(_useState, 2),
      logger = _useState2[0],
      setLogger = _useState2[1];

  var _useState3 = useState(),
      _useState4 = _slicedToArray(_useState3, 2),
      pubSub = _useState4[0],
      setPubSub = _useState4[1];

  var _useReducer = useReducer(reducer, sdkInitialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      sdkStore = _useReducer2[0],
      sdkDispatcher = _useReducer2[1];

  var _useReducer3 = useReducer(reducer$1, userInitialState),
      _useReducer4 = _slicedToArray(_useReducer3, 2),
      userStore = _useReducer4[0],
      userDispatcher = _useReducer4[1];

  useTheme(colorSet);
  useEffect(function () {
    setPubSub(pubSubFactory());
  }, []);
  useEffect(function () {
    logger.info('App Init'); // dispatch action

    handleConnection({
      userId: userId,
      appId: appId,
      accessToken: accessToken,
      sdkStore: sdkStore,
      nickname: nickname,
      profileUrl: profileUrl,
      sdk: sdkStore.sdk,
      logger: logger
    }, {
      sdkDispatcher: sdkDispatcher,
      userDispatcher: userDispatcher
    });
  }, [userId, appId, accessToken]); // to create a pubsub to communicate between parent and child

  useEffect(function () {
    setLogger(LoggerFactory(logLevel));
  }, [logLevel]);
  useAppendDomNode(['sendbird-modal-root', 'sendbird-dropdown-portal', 'sendbird-emoji-list-portal'], 'body'); // should move to reducer

  var _useState5 = useState(theme),
      _useState6 = _slicedToArray(_useState5, 2),
      currenttheme = _useState6[0],
      setCurrenttheme = _useState6[1];

  useEffect(function () {
    setCurrenttheme(theme);
  }, [theme]); // add-remove theme from body

  useEffect(function () {
    logger.info('Setup theme', "Theme: ".concat(currenttheme));

    try {
      var body = document.querySelector('body');
      body.classList.add("sendbird-theme--".concat(currenttheme || 'light'));
      logger.info('Finish setup theme'); // eslint-disable-next-line no-empty
    } catch (e) {
      logger.warning('Setup theme failed', "".concat(e));
    }

    return function () {
      try {
        var _body = document.querySelector('body');

        _body.classList.remove('sendbird-theme--light');

        _body.classList.remove('sendbird-theme--dark'); // eslint-disable-next-line no-empty

      } catch (_unused) {}
    };
  }, [currenttheme]);
  var isOnline = useConnectionStatus(sdkStore.sdk, logger);
  var localeStringSet = React.useMemo(function () {
    if (!stringSet) {
      return getStringSet('en');
    }

    return _objectSpread2({}, getStringSet('en'), {}, stringSet);
  }, [stringSet]);
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
            logger: logger,
            sdk: sdkStore.sdk
          }, {
            sdkDispatcher: sdkDispatcher,
            userDispatcher: userDispatcher
          });
        }
      },
      config: {
        disableUserProfile: disableUserProfile,
        renderUserProfile: renderUserProfile,
        allowProfileEdit: allowProfileEdit,
        isOnline: isOnline,
        userId: userId,
        appId: appId,
        accessToken: accessToken,
        theme: currenttheme,
        setCurrenttheme: setCurrenttheme,
        userListQuery: userListQuery,
        logger: logger,
        pubSub: pubSub
      }
    }
  }, React.createElement(LocalizationProvider, {
    stringSet: localeStringSet
  }, children));
}
Sendbird.propTypes = {
  userId: PropTypes.string.isRequired,
  appId: PropTypes.string.isRequired,
  accessToken: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element), PropTypes.any]).isRequired,
  theme: PropTypes.string,
  nickname: PropTypes.string,
  profileUrl: PropTypes.string,
  disableUserProfile: PropTypes.bool,
  renderUserProfile: PropTypes.func,
  allowProfileEdit: PropTypes.bool,
  userListQuery: PropTypes.func,
  config: PropTypes.shape({
    // None Error Warning Info 'All/Debug'
    logLevel: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    pubSub: PropTypes.shape({
      subscribe: PropTypes.func,
      publish: PropTypes.func
    })
  }),
  stringSet: PropTypes.objectOf(PropTypes.string),
  colorSet: PropTypes.objectOf(PropTypes.string)
};
Sendbird.defaultProps = {
  accessToken: '',
  theme: 'light',
  nickname: '',
  profileUrl: '',
  disableUserProfile: false,
  renderUserProfile: null,
  allowProfileEdit: false,
  userListQuery: null,
  config: {},
  stringSet: null,
  colorSet: null
};

var UserProfileContext = React.createContext({
  disableUserProfile: true,
  renderUserProfile: null
});

var UserProfileProvider = function UserProfileProvider(props) {
  var children = props.children,
      className = props.className;
  return React.createElement(UserProfileContext.Provider, {
    value: props
  }, React.createElement("div", {
    className: className
  }, children));
};

UserProfileProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element), PropTypes.any]).isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  disableUserProfile: PropTypes.bool,
  // eslint-disable-next-line react/no-unused-prop-types
  renderUserProfile: PropTypes.func,
  className: PropTypes.string
};
UserProfileProvider.defaultProps = {
  className: null,
  disableUserProfile: false,
  renderUserProfile: null
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

/*
  ImageRenderer displays image with url or source
  it checks if the source exist with img tag first
  if it exists onLoad is called, if not onError is called
  and those properties switch img tag to real purposing element
*/

function ImageRenderer(_ref) {
  var alt = _ref.alt,
      url = _ref.url,
      width = _ref.width,
      height = _ref.height,
      className = _ref.className,
      defaultComponent = _ref.defaultComponent,
      circle = _ref.circle;
  var injectingClassName = Array.isArray(className) ? className : [className];
  injectingClassName.unshift('sendbird-image-renderer');

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      realElement = _useState2[0],
      setRealElement = _useState2[1];

  useEffect(function () {
    setRealElement(null);
  }, [url]);
  return realElement || React.createElement("img", {
    className: "sendbird-image-renderer--hidden-placeholder",
    src: url,
    alt: alt,
    onError: function onError() {
      setRealElement(typeof defaultComponent === 'function' ? defaultComponent() : defaultComponent);
    },
    onLoad: function onLoad() {
      setRealElement(React.createElement("div", {
        className: injectingClassName.join(' '),
        style: {
          height: height,
          width: width,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundImage: "url(".concat(url, ")"),
          borderRadius: circle ? '50%' : null
        }
      }));
    }
  });
}
ImageRenderer.propTypes = {
  alt: PropTypes.string,
  url: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  className: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  defaultComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  circle: PropTypes.bool
};
ImageRenderer.defaultProps = {
  alt: '',
  className: '',
  circle: false
};

var Type = {
  ADD: 'ADD',
  ATTACH: 'ATTACH',
  ARROW_LEFT: 'ARROW_LEFT',
  AVATAR_DARK: 'AVATAR_DARK',
  AVATAR_LIGHT: 'AVATAR_LIGHT',
  BROADCAST_LARGE_DARK: 'BROADCAST_LARGE_DARK',
  BROADCAST_LARGE_LIGHT: 'BROADCAST_LARGE_LIGHT',
  BROADCAST_DARK: 'BROADCAST_DARK',
  BROADCAST_LIGHT: 'BROADCAST_LIGHT',
  BROADCAST: 'BROADCAST',
  FROZEN_DARK: 'FROZEN_DARK',
  FROZEN_LIGHT: 'FROZEN_LIGHT',
  CAMERA: 'CAMERA',
  MORE: 'MORE',
  MUTE: 'MUTE',
  NO_THUMBNAIL: 'NO_THUMBNAIL',
  CHECKBOX: 'CHECKBOX',
  CHECKBOX_OFF: 'CHECKBOX_OFF',
  CLOSE: 'CLOSE',
  COPY: 'COPY',
  CHAT: 'CHAT',
  CREATE: 'CREATE',
  DELETE: 'DELETE',
  DISCONNECTED: 'DISCONNECTED',
  DUMMY: 'DUMMY',
  EDIT: 'EDIT',
  ERROR: 'ERROR',
  ERROR_FILLED: 'ERROR_FILLED',
  EMOJI_FAILED: 'EMOJI_FAILED',
  EMOJI_REACTIONS_ADD: 'EMOJI_REACTIONS_ADD',
  EMOJI_REACTIONS_ADD_GRAY: 'EMOJI_REACTIONS_ADD_GRAY',
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
  SUPER_GROUP: 'SUPER_GROUP',
  SHEVRON: 'SHEVRON',
  SHEVRON_DOWN: 'SHEVRON_DOWN',
  SPINNER: 'SPINNER',
  SPINNER_LARGE: 'SPINNER_LARGE',
  USER: 'USER',
  ICON_OPERATOR: 'ICON_OPERATOR',
  ICON_BANNED: 'ICON_BANNED',
  ICON_FREEZE: 'ICON_FREEZE',
  ICON_MUTED: 'ICON_MUTED',
  ICON_MUTED_FG: 'ICON_MUTED_FG',
  TOGGLE_ON: 'TOGGLE_ON',
  TOGGLE_OFF: 'TOGGLE_OFF'
};

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _ref =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-add_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M19 2a3 3 0 013 3v14a3 3 0 01-3 3H5a3 3 0 01-3-3V5a3 3 0 013-3zm0 2H5a1 1 0 00-1 1v14a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1zm-7 3a1 1 0 01.993.883L13 8v3h3a1 1 0 01.117 1.993L16 13h-3v3a1 1 0 01-1.993.117L11 16v-3H8a1 1 0 01-.117-1.993L8 11h3V8a1 1 0 011-1z"
});

function SvgIconAdd(props) {
  return React.createElement("svg", _extends({
    viewBox: "0 0 24 24"
  }, props), _ref);
}

function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }

var _ref$1 =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-attach_svg__fill",
  fillOpacity: 0.88,
  fillRule: "evenodd",
  d: "M19.021 9.943l-8.424 8.023c-1.795 1.71-4.723 1.71-6.518 0-1.77-1.685-1.77-4.398 0-6.084l8.424-8.023c1.079-1.027 2.845-1.027 3.924 0a2.461 2.461 0 010 3.614l-8.433 8.022a.984.984 0 01-1.33 0 .772.772 0 010-1.142l7.782-7.403a.917.917 0 00-1.264-1.328L5.4 13.025a2.605 2.605 0 000 3.798 2.816 2.816 0 003.858 0l8.433-8.022a4.294 4.294 0 000-6.27C15.905.83 13.025.83 11.24 2.531l-8.425 8.023c-2.528 2.408-2.528 6.332 0 8.74 2.504 2.384 6.544 2.384 9.047 0l8.425-8.023a.917.917 0 10-1.265-1.328z"
});

function SvgIconAttach(props) {
  return React.createElement("svg", _extends$1({
    viewBox: "0 0 22 22"
  }, props), _ref$1);
}

function _extends$2() { _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }

var _ref$2 =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-arrow-left_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M12.707 3.293a1 1 0 01.083 1.32l-.083.094L6.415 11H21a1 1 0 01.117 1.993L21 13H6.415l6.292 6.293a1 1 0 01.083 1.32l-.083.094a1 1 0 01-1.32.083l-.094-.083-8-8a1 1 0 01-.083-1.32l.083-.094 8-8a1 1 0 011.414 0z"
});

function SvgIconArrowLeft(props) {
  return React.createElement("svg", _extends$2({
    viewBox: "0 0 24 24"
  }, props), _ref$2);
}

function _extends$3() { _extends$3 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$3.apply(this, arguments); }

var _ref$3 =
/*#__PURE__*/
React.createElement("path", {
  fill: "#393939",
  d: "M0 0h56v56H0z"
});

var _ref2 =
/*#__PURE__*/
React.createElement("path", {
  fillOpacity: 0.88,
  d: "M34.667 31.333a8.334 8.334 0 018.325 7.972l.008.362V43a1.667 1.667 0 01-3.322.194L39.667 43v-3.333a5 5 0 00-4.707-4.992l-.293-.008H21.333a5 5 0 00-4.991 4.706l-.009.294V43a1.667 1.667 0 01-3.322.194L13 43v-3.333a8.333 8.333 0 017.972-8.326l.361-.008h13.334zm-6.667-20A8.333 8.333 0 1128 28a8.333 8.333 0 010-16.667zm0 3.334a5 5 0 100 10 5 5 0 000-10z"
});

function SvgIconAvatarDark(props) {
  return React.createElement("svg", _extends$3({
    viewBox: "0 0 56 56"
  }, props), _ref$3, _ref2);
}

function _extends$4() { _extends$4 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$4.apply(this, arguments); }

var _ref$4 =
/*#__PURE__*/
React.createElement("path", {
  fill: "#A8A8A8",
  d: "M0 0h56v56H0z"
});

var _ref2$1 =
/*#__PURE__*/
React.createElement("path", {
  fill: "#FFF",
  fillOpacity: 0.88,
  d: "M34.667 31.333a8.334 8.334 0 018.325 7.972l.008.362V43a1.667 1.667 0 01-3.322.194L39.667 43v-3.333a5 5 0 00-4.707-4.992l-.293-.008H21.333a5 5 0 00-4.991 4.706l-.009.294V43a1.667 1.667 0 01-3.322.194L13 43v-3.333a8.333 8.333 0 017.972-8.326l.361-.008h13.334zm-6.667-20A8.333 8.333 0 1128 28a8.333 8.333 0 010-16.667zm0 3.334a5 5 0 100 10 5 5 0 000-10z"
});

function SvgIconAvatarLight(props) {
  return React.createElement("svg", _extends$4({
    viewBox: "0 0 56 56"
  }, props), _ref$4, _ref2$1);
}

function _extends$5() { _extends$5 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$5.apply(this, arguments); }

var _ref$5 =
/*#__PURE__*/
React.createElement("g", {
  className: "icon-broadcast-lrg-dark_svg__fill",
  fill: "none",
  fillRule: "evenodd"
}, React.createElement("circle", {
  cx: 28,
  cy: 28,
  r: 28,
  fill: "#6FD6BE"
}), React.createElement("path", {
  fill: "#000",
  fillOpacity: 0.88,
  d: "M41.273 16.083c.04.128.06.262.06.397v23.04a1.333 1.333 0 01-1.731 1.273l-8.975-2.805A5.335 5.335 0 0120 37.333v-2.666h-2.667a4 4 0 01-3.995-3.8l-.005-.2v-5.334a4 4 0 014-4H20l19.602-6.125a1.332 1.332 0 011.67.875zM22.667 35.627v1.706a2.667 2.667 0 005.326.199l.007-.239-5.333-1.666zm16-17.334l-16 4.999v9.415l16 4.998V18.293zM20 24h-2.667c-.683 0-1.247.515-1.324 1.178l-.009.155v5.334c0 .736.597 1.333 1.333 1.333H20v-8z"
}));

function SvgIconBroadcastLrgDark(props) {
  return React.createElement("svg", _extends$5({
    viewBox: "0 0 56 56"
  }, props), _ref$5);
}

function _extends$6() { _extends$6 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$6.apply(this, arguments); }

var _ref$6 =
/*#__PURE__*/
React.createElement("g", {
  className: "icon-broadcast-lrg-light_svg__fill",
  fill: "none",
  fillRule: "evenodd"
}, React.createElement("circle", {
  cx: 28,
  cy: 28,
  r: 28,
  fill: "#2EBA9F"
}), React.createElement("path", {
  fill: "#FFF",
  fillOpacity: 0.88,
  d: "M41.273 16.083c.04.128.06.262.06.397v23.04a1.333 1.333 0 01-1.731 1.273l-8.975-2.805A5.335 5.335 0 0120 37.333v-2.666h-2.667a4 4 0 01-3.995-3.8l-.005-.2v-5.334a4 4 0 014-4H20l19.602-6.125a1.332 1.332 0 011.67.875zM22.667 35.627v1.706a2.667 2.667 0 005.326.199l.007-.239-5.333-1.666zm16-17.334l-16 4.999v9.415l16 4.998V18.293zM20 24h-2.667c-.683 0-1.247.515-1.324 1.178l-.009.155v5.334c0 .736.597 1.333 1.333 1.333H20v-8z"
}));

function SvgIconBroadcastLrgLight(props) {
  return React.createElement("svg", _extends$6({
    viewBox: "0 0 56 56"
  }, props), _ref$6);
}

function _extends$7() { _extends$7 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$7.apply(this, arguments); }

var _ref$7 =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-broadcast-dark_svg__fill",
  fill: "#6FD6BE",
  fillRule: "evenodd",
  d: "M14.636 2.041c.02.065.03.132.03.2V13.76a.667.667 0 01-.865.637l-4.488-1.403A2.667 2.667 0 014 12.666v-1.334H2.667a2 2 0 01-1.995-1.85l-.005-.15V6.667a2 2 0 012-2H4l9.801-3.063a.666.666 0 01.835.437zm-9.303 9.772v.854a1.333 1.333 0 002.664.099l.003-.12-2.667-.833zm8-8.666l-8 2.499v4.707l8 2.5V3.147zM4 6H2.667a.668.668 0 00-.663.589L2 6.667v2.666c0 .369.298.667.667.667H4V6z"
});

function SvgIconBroadcastDark(props) {
  return React.createElement("svg", _extends$7({
    viewBox: "0 0 16 16"
  }, props), _ref$7);
}

function _extends$8() { _extends$8 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$8.apply(this, arguments); }

var _ref$8 =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-broadcast-light_svg__fill",
  fill: "#2EBA9F",
  fillRule: "evenodd",
  d: "M14.636 2.041c.02.065.03.132.03.2V13.76a.667.667 0 01-.865.637l-4.488-1.403A2.667 2.667 0 014 12.666v-1.334H2.667a2 2 0 01-1.995-1.85l-.005-.15V6.667a2 2 0 012-2H4l9.801-3.063a.666.666 0 01.835.437zm-9.303 9.772v.854a1.333 1.333 0 002.664.099l.003-.12-2.667-.833zm8-8.666l-8 2.499v4.707l8 2.5V3.147zM4 6H2.667a.668.668 0 00-.663.589L2 6.667v2.666c0 .369.298.667.667.667H4V6z"
});

function SvgIconBroadcastLight(props) {
  return React.createElement("svg", _extends$8({
    viewBox: "0 0 16 16"
  }, props), _ref$8);
}

function _extends$9() { _extends$9 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$9.apply(this, arguments); }

var _ref$9 =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-broadcast_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M14.636 2.041c.02.065.03.132.03.2V13.76a.667.667 0 01-.865.637l-4.488-1.403A2.667 2.667 0 014 12.666v-1.334H2.667a2 2 0 01-1.995-1.85l-.005-.15V6.667a2 2 0 012-2H4l9.801-3.063a.666.666 0 01.835.437zm-9.303 9.772v.854a1.333 1.333 0 002.664.099l.003-.12-2.667-.833zm8-8.666l-8 2.499v4.707l8 2.5V3.147zM4 6H2.667a.668.668 0 00-.663.589L2 6.667v2.666c0 .369.298.667.667.667H4V6z"
});

function SvgIconBroadcast(props) {
  return React.createElement("svg", _extends$9({
    viewBox: "0 0 16 16"
  }, props), _ref$9);
}

function _extends$a() { _extends$a = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$a.apply(this, arguments); }

var _ref$a =
/*#__PURE__*/
React.createElement("path", {
  className: "frozen-dark_svg__fill",
  fill: "#9E8CF5",
  fillRule: "evenodd",
  d: "M10.409.806l.063.056c.24.24.259.618.055.88l-.055.063-1.805 1.804v3.236l2.801-1.618.662-2.465a.665.665 0 011.304.263l-.016.082-.56 2.088 2.088.56a.665.665 0 01.488.734l-.016.082a.666.666 0 01-.735.488l-.082-.016-2.465-.661L9.334 8l2.801 1.618 2.466-.66.082-.017a.667.667 0 01.735.488l.016.082a.666.666 0 01-.488.734l-2.088.56.56 2.088.016.082a.666.666 0 01-1.304.263l-.662-2.465-2.801-1.618v3.236l1.805 1.804a.668.668 0 01-.88.999l-.063-.056L8 13.61l-1.528 1.53a.668.668 0 01-.88.055l-.063-.056a.668.668 0 01-.056-.88l.056-.063 1.804-1.805V9.155L4.53 10.773l-.66 2.465a.667.667 0 01-1.304-.263l.017-.082.559-2.088-2.088-.56a.667.667 0 01-.488-.734l.017-.082a.665.665 0 01.734-.488l.082.016 2.466.66L6.666 8 3.864 6.382l-2.465.66-.082.017a.666.666 0 01-.734-.488L.566 6.49a.667.667 0 01.488-.734l2.088-.56-.56-2.088-.016-.082a.667.667 0 011.305-.263l.659 2.465 2.803 1.618V3.61L5.529 1.805a.668.668 0 01.88-.999l.063.056L8 2.39 9.53.862a.668.668 0 01.88-.056z"
});

function SvgFrozenDark(props) {
  return React.createElement("svg", _extends$a({
    viewBox: "0 0 16 16"
  }, props), _ref$a);
}

function _extends$b() { _extends$b = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$b.apply(this, arguments); }

var _ref$b =
/*#__PURE__*/
React.createElement("path", {
  className: "frozen-light_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M10.409.806l.063.056c.24.24.259.618.055.88l-.055.063-1.805 1.804v3.236l2.801-1.618.662-2.465a.665.665 0 011.304.263l-.016.082-.56 2.088 2.088.56a.665.665 0 01.488.734l-.016.082a.666.666 0 01-.735.488l-.082-.016-2.465-.661L9.334 8l2.801 1.618 2.466-.66.082-.017a.667.667 0 01.735.488l.016.082a.666.666 0 01-.488.734l-2.088.56.56 2.088.016.082a.666.666 0 01-1.304.263l-.662-2.465-2.801-1.618v3.236l1.805 1.804a.668.668 0 01-.88.999l-.063-.056L8 13.61l-1.528 1.53a.668.668 0 01-.88.055l-.063-.056a.668.668 0 01-.056-.88l.056-.063 1.804-1.805V9.155L4.53 10.773l-.66 2.465a.667.667 0 01-1.304-.263l.017-.082.559-2.088-2.088-.56a.667.667 0 01-.488-.734l.017-.082a.665.665 0 01.734-.488l.082.016 2.466.66L6.666 8 3.864 6.382l-2.465.66-.082.017a.666.666 0 01-.734-.488L.566 6.49a.667.667 0 01.488-.734l2.088-.56-.56-2.088-.016-.082a.667.667 0 011.305-.263l.659 2.465 2.803 1.618V3.61L5.529 1.805a.668.668 0 01.88-.999l.063.056L8 2.39 9.53.862a.668.668 0 01.88-.056z"
});

function SvgFrozenLight(props) {
  return React.createElement("svg", _extends$b({
    viewBox: "0 0 16 16"
  }, props), _ref$b);
}

function _extends$c() { _extends$c = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$c.apply(this, arguments); }

var _ref$c =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-camera_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M15 2a1 1 0 01.832.445L17.535 5H21a3 3 0 012.995 2.824L24 8v11a3 3 0 01-3 3H3a3 3 0 01-3-3V8a3 3 0 013-3h3.464l1.704-2.555a1 1 0 01.708-.437L9 2zm-.536 2H9.535L7.832 6.555a1 1 0 01-.708.437L7 7H3a1 1 0 00-1 1v11a1 1 0 001 1h18a1 1 0 001-1V8a1 1 0 00-1-1h-4a1 1 0 01-.832-.445L14.464 4zM12 8a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z"
});

function SvgIconCamera(props) {
  return React.createElement("svg", _extends$c({
    viewBox: "0 0 24 24"
  }, props), _ref$c);
}

function _extends$d() { _extends$d = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$d.apply(this, arguments); }

var _ref$d =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-more_svg__fill",
  fillRule: "evenodd",
  d: "M12 17a2 2 0 110 4 2 2 0 010-4zm0-6.5a2 2 0 110 4 2 2 0 010-4zM12 4a2 2 0 110 4 2 2 0 010-4z"
});

function SvgIconMore(props) {
  return React.createElement("svg", _extends$d({
    viewBox: "0 0 24 24"
  }, props), _ref$d);
}

function _extends$e() { _extends$e = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$e.apply(this, arguments); }

var _ref$e =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-mute_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M15.125 20.09c0 .602-.694 2.41-2.778 2.41-1.389 0-2.315-.804-2.778-2.41zM12.789 1.606a6.496 6.496 0 015.388 2.861l2.464-2.463a.788.788 0 011.025-.077l.088.077a.788.788 0 010 1.113L3.378 21.494a.788.788 0 01-1.025.077l-.088-.077a.788.788 0 010-1.113l1.9-1.903-.04-.004a.387.387 0 01-.241-.596l1.557-2.295.001-.208a545.875 545.875 0 00-.028-6.563l-.008-.614a6.503 6.503 0 016.414-6.59h.969zm6.381 5.246c.08.407.122.827.122 1.257l-.001 7.53 1.52 2.238a.387.387 0 01-.32.604H7.54l3.214-3.214 8.415-8.415z"
});

function SvgIconMute(props) {
  return React.createElement("svg", _extends$e({
    viewBox: "0 0 24 24"
  }, props), _ref$e);
}

function _extends$f() { _extends$f = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$f.apply(this, arguments); }

var _ref$f =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-no-thumbnail_svg__fill",
  fillOpacity: 0.5,
  fillRule: "evenodd",
  d: "M30.333 4.667a2.333 2.333 0 110 4.666H11.667a2.334 2.334 0 00-2.334 2.334v32.666c0 1.001.63 1.855 1.516 2.186l24.834-24.836a2.336 2.336 0 013.3 0l7.684 7.683v-3.7c0-1.234.96-2.245 2.173-2.327l.16-.006a2.333 2.333 0 012.333 2.334v18.666a7 7 0 01-7 7H11.665a6.999 6.999 0 01-6.998-7V11.667a7 7 0 017-7zm7 21.966L17.3 46.666h27.034a2.333 2.333 0 002.328-2.173l.006-.16v-8.367l-9.334-9.333zM19.833 14a5.834 5.834 0 110 11.668 5.834 5.834 0 010-11.668zm0 4.667a1.166 1.166 0 100 2.332 1.166 1.166 0 000-2.332zm29.85-15.65a2.334 2.334 0 013.3 3.3L48.8 10.499l4.184 4.184c.87.87.91 2.256.119 3.173l-.119.127a2.334 2.334 0 01-3.3 0L45.5 13.8l-4.183 4.184c-.87.87-2.256.91-3.173.119l-.127-.119a2.334 2.334 0 010-3.3L42.2 10.5l-4.183-4.182a2.334 2.334 0 01-.119-3.173l.119-.127a2.334 2.334 0 013.3 0L45.5 7.2z"
});

function SvgIconNoThumbnail(props) {
  return React.createElement("svg", _extends$f({
    viewBox: "0 0 56 56"
  }, props), _ref$f);
}

function _extends$g() { _extends$g = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$g.apply(this, arguments); }

var _ref$g =
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
  return React.createElement("svg", _extends$g({
    viewBox: "0 0 24 24"
  }, props), _ref$g);
}

function _extends$h() { _extends$h = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$h.apply(this, arguments); }

var _ref$h =
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
  return React.createElement("svg", _extends$h({
    viewBox: "0 0 24 24"
  }, props), _ref$h);
}

function _extends$i() { _extends$i = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$i.apply(this, arguments); }

var _ref$i =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-close_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M6.613 5.21l.094.083L12 10.585l5.293-5.292a1 1 0 011.497 1.32l-.083.094L13.415 12l5.292 5.293a1 1 0 01-1.32 1.497l-.094-.083L12 13.415l-5.293 5.292a1 1 0 01-1.497-1.32l.083-.094L10.585 12 5.293 6.707a1 1 0 011.32-1.497z"
});

function SvgIconClose(props) {
  return React.createElement("svg", _extends$i({
    viewBox: "0 0 24 24"
  }, props), _ref$i);
}

function _extends$j() { _extends$j = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$j.apply(this, arguments); }

var _ref$j =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-copy_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M20 8a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9a3 3 0 013-3zm0 2h-9a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1v-9a1 1 0 00-1-1zm-7-9a3 3 0 012.995 2.824L16 4v1a1 1 0 01-1.993.117L14 5V4a1 1 0 00-.883-.993L13 3H4a1 1 0 00-.993.883L3 4v9a1 1 0 00.883.993L4 14h1a1 1 0 01.117 1.993L5 16H4a3 3 0 01-2.995-2.824L1 13V4a3 3 0 012.824-2.995L4 1h9z"
});

function SvgIconCopy(props) {
  return React.createElement("svg", _extends$j({
    viewBox: "0 0 24 24"
  }, props), _ref$j);
}

function _extends$k() { _extends$k = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$k.apply(this, arguments); }

var _ref$k =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-chat_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11c-1.67 0-3.255-.373-4.673-1.039l-.657.218c-2.237.716-3.8.964-4.69.742-1.049-.261-1.256-.72-.62-1.373.439-.524.805-1.178 1.097-1.963.234-.625.142-1.5-.276-2.625A10.933 10.933 0 011 12C1 5.925 5.925 1 12 1zm0 2a9 9 0 00-8.187 12.742l.152.314.051.101.04.107c.569 1.532.709 2.859.275 4.02l-.143.365-.072.162.088-.019a23.181 23.181 0 001.832-.511l.646-.213.765-.26.73.343A8.962 8.962 0 0012 21a9 9 0 000-18z"
});

function SvgIconChat(props) {
  return React.createElement("svg", _extends$k({
    viewBox: "0 0 24 24"
  }, props), _ref$k);
}

function _extends$l() { _extends$l = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$l.apply(this, arguments); }

var _ref$l =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-supergroup_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M16.139 18.818c2.89 0 5.303 2.05 5.438 4.696l.006.235v1.626a1.166 1.166 0 01-2.326.136l-.007-.136v-1.626c0-1.343-1.255-2.501-2.903-2.592l-.208-.006H11.86c-1.679 0-3.001 1.105-3.105 2.431l-.006.167v1.626a1.166 1.166 0 01-2.325.136l-.008-.136v-1.626c0-2.68 2.329-4.806 5.19-4.926l.254-.005h4.278zm8.128-7.565c.116 0 .232.018.343.052 2.026.624 3.289 2.1 3.384 4.239l.006.26v5.6a1.166 1.166 0 01-2.325.136l-.008-.137v-5.599c-.001-1.135-.509-1.825-1.543-2.202l-.046-.016h-1.095c-.598 0-1.091-.45-1.158-1.03l-.008-.136c0-.598.45-1.092 1.03-1.159l.136-.008h1.284zm-19.25 0l.136.008c.58.067 1.03.56 1.03 1.159l-.008.136c-.067.58-.56 1.03-1.158 1.03H3.919l-.052.018c-.983.372-1.533 1.126-1.534 2.252v5.547l-.008.136A1.166 1.166 0 010 21.404v-5.548l.006-.259c.099-2.132 1.402-3.681 3.374-4.29.112-.035.228-.053.345-.053h1.292zM14 8.732c2.412 0 4.375 1.928 4.375 4.318 0 2.39-1.963 4.319-4.375 4.319S9.625 15.44 9.625 13.05c0-2.39 1.963-4.318 4.375-4.318zm0 2.333c-1.132 0-2.042.893-2.042 1.985s.91 1.986 2.042 1.986c1.132 0 2.042-.894 2.042-1.986s-.91-1.985-2.042-1.985zM7.583 1.167c2.412 0 4.375 1.929 4.375 4.318 0 2.39-1.963 4.32-4.375 4.32-2.411 0-4.375-1.93-4.375-4.32 0-2.39 1.964-4.318 4.375-4.318zm12.834 0c2.411 0 4.375 1.929 4.375 4.318 0 2.39-1.964 4.32-4.375 4.32-2.412 0-4.375-1.93-4.375-4.32 0-2.39 1.963-4.318 4.375-4.318zM7.583 3.5c-1.132 0-2.041.894-2.041 1.985 0 1.092.91 1.986 2.041 1.986 1.132 0 2.042-.894 2.042-1.986 0-1.091-.91-1.985-2.042-1.985zm12.834 0c-1.132 0-2.042.894-2.042 1.985 0 1.092.91 1.986 2.042 1.986 1.132 0 2.041-.894 2.041-1.986 0-1.091-.91-1.985-2.041-1.985z"
});

function SvgIconSupergroup(props) {
  return React.createElement("svg", _extends$l({
    viewBox: "0 0 28 28"
  }, props), _ref$l);
}

function _extends$m() { _extends$m = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$m.apply(this, arguments); }

var _ref$m =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-create_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11c-1.67 0-3.255-.373-4.673-1.039l-.657.218c-2.237.716-3.8.964-4.69.742-1.049-.261-1.256-.72-.62-1.373.439-.524.805-1.178 1.097-1.963.234-.625.142-1.5-.276-2.625A10.933 10.933 0 011 12C1 5.925 5.925 1 12 1zm0 2a9 9 0 00-8.187 12.742l.152.314.051.101.04.107c.569 1.532.709 2.859.275 4.02l-.143.365-.072.162.088-.019a23.181 23.181 0 001.832-.511l.646-.213.765-.26.73.343A8.962 8.962 0 0012 21a9 9 0 000-18zm1 6v2h2c1.333 0 1.333 2 0 2h-2v2c0 1.333-2 1.333-2 0v-2H9c-1.333 0-1.333-2 0-2h2V9c0-1.333 2-1.333 2 0z"
});

function SvgIconCreate(props) {
  return React.createElement("svg", _extends$m({
    viewBox: "0 0 24 24"
  }, props), _ref$m);
}

function _extends$n() { _extends$n = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$n.apply(this, arguments); }

var _ref$n =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-delete_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M14 1a3 3 0 012.995 2.824L17 4v1h4a1 1 0 01.117 1.993L21 7h-1v13a3 3 0 01-2.824 2.995L17 23H7a3 3 0 01-2.995-2.824L4 20V7H3a1 1 0 01-.117-1.993L3 5h4V4a3 3 0 012.824-2.995L10 1h4zm4 6H6v13a1 1 0 00.883.993L7 21h10a1 1 0 00.993-.883L18 20V7zm-8 3a1 1 0 01.993.883L11 11v6a1 1 0 01-1.993.117L9 17v-6a1 1 0 011-1zm4 0a1 1 0 01.993.883L15 11v6a1 1 0 01-1.993.117L13 17v-6a1 1 0 011-1zm0-7h-4a1 1 0 00-.993.883L9 4v1h6V4a1 1 0 00-.883-.993L14 3z"
});

function SvgIconDelete(props) {
  return React.createElement("svg", _extends$n({
    viewBox: "0 0 24 24"
  }, props), _ref$n);
}

function _extends$o() { _extends$o = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$o.apply(this, arguments); }

var _ref$o =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-dummy_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
});

function SvgIconDummy(props) {
  return React.createElement("svg", _extends$o({
    viewBox: "0 0 24 24"
  }, props), _ref$o);
}

function _extends$p() { _extends$p = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$p.apply(this, arguments); }

var _ref$p =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-edit_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M21.875 21.875a1.042 1.042 0 01.121 2.076l-.121.007H3.125a1.042 1.042 0 01-.121-2.076l.121-.007h18.75zM13.847 1.347a1.042 1.042 0 011.473 0l4.167 4.166a1.042 1.042 0 010 1.474L8.028 18.445c-.195.195-.46.305-.736.305H3.125a1.042 1.042 0 01-1.042-1.042v-4.166c0-.277.11-.542.305-.737zm.736 2.21L4.167 13.973v2.694h2.691L17.276 6.25l-2.693-2.693z"
});

function SvgIconEdit(props) {
  return React.createElement("svg", _extends$p({
    viewBox: "0 0 26 26"
  }, props), _ref$p);
}

function _extends$q() { _extends$q = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$q.apply(this, arguments); }

var _ref$q =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-error_svg__fill",
  fill: "#E53157",
  fillRule: "evenodd",
  d: "M8 1.265c.655 0 1.266.32 1.64.856l.072.11 5.652 9.436c.355.615.357 1.373.006 1.99-.33.579-.925.953-1.59 1.004l-.133.006H2.346a2.001 2.001 0 01-1.772-2.883l.067-.127 5.649-9.43A2 2 0 018 1.266zm0 1.333a.669.669 0 00-.52.248l-.048.07-5.641 9.417a.669.669 0 00.477.994l.085.006H13.64a.664.664 0 00.612-.914l-.036-.076L8.57 2.919a.663.663 0 00-.57-.32zm0 8.069A.667.667 0 118 12a.667.667 0 010-1.333zm0-5.334c.342 0 .624.258.662.59L8.667 6v2.667a.667.667 0 01-1.329.077l-.005-.077V6c0-.368.299-.667.667-.667z"
});

function SvgIconError(props) {
  return React.createElement("svg", _extends$q({
    viewBox: "0 0 16 16"
  }, props), _ref$q);
}

function _extends$r() { _extends$r = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$r.apply(this, arguments); }

var _ref$r =
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
  return React.createElement("svg", _extends$r({
    viewBox: "0 0 24 24"
  }, props), _ref$r);
}

function _extends$s() { _extends$s = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$s.apply(this, arguments); }

var _ref$s =
/*#__PURE__*/
React.createElement("g", {
  className: "emoji-fail_svg__fill",
  fill: "none",
  fillRule: "evenodd"
}, React.createElement("rect", {
  width: 26.526,
  height: 26.526,
  x: 0.737,
  y: 0.737,
  fill: "#FFF",
  rx: 4
}), React.createElement("path", {
  fill: "#000",
  fillOpacity: 0.12,
  d: "M14 23.456a9.457 9.457 0 11.001-18.913A9.457 9.457 0 0114 23.456zm0-1.72a7.736 7.736 0 100-15.473 7.737 7.737 0 000 15.474zm.714-6.005a.86.86 0 11-1.72 0v-.867a.86.86 0 01.588-.816 5.248 5.248 0 001.084-.544c.592-.395.907-.815.907-1.22a1.72 1.72 0 00-3.341-.574.86.86 0 11-1.622-.57 3.438 3.438 0 016.682 1.145c0 1.1-.651 1.969-1.672 2.65a6.81 6.81 0 01-.906.508v.288zm-1.72 2.425a.86.86 0 011.72 0v.142a.86.86 0 11-1.72 0V18.156z"
}));

function SvgEmojiFail(props) {
  return React.createElement("svg", _extends$s({
    viewBox: "0 0 28 28"
  }, props), _ref$s);
}

function _extends$t() { _extends$t = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$t.apply(this, arguments); }

var _ref$t =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-reactions-add_svg__fill",
  fillOpacity: 0.88,
  fillRule: "evenodd",
  d: "M11.033 1.107a9.98 9.98 0 012.669.362.734.734 0 01-.393 1.413A8.466 8.466 0 002.567 11.04 8.466 8.466 0 1019.2 8.8a.736.736 0 01.514-.902.735.735 0 01.901.514c.233.85.352 1.731.352 2.628 0 5.486-4.448 9.933-9.934 9.933-5.486 0-9.933-4.447-9.933-9.933s4.447-9.933 9.933-9.933zm3.68 11.96c.5 0 .854.49.696.965-.644 1.933-2.385 3.261-4.376 3.261-1.99 0-3.732-1.328-4.375-3.261a.733.733 0 01.597-.959l.098-.006h7.36zm-1.195 1.466h-4.97l.101.131a3.115 3.115 0 002.012 1.14l.198.018.174.005c.868 0 1.672-.38 2.254-1.012l.13-.15.101-.132zM7.353 7.547c.374 0 .683.28.728.641l.006.092v1.84a.734.734 0 01-1.461.092l-.006-.092V8.28c0-.405.328-.733.733-.733zm7.36 0c.374 0 .683.28.728.641l.006.092v1.84a.734.734 0 01-1.461.092l-.006-.092V8.28c0-.405.328-.733.733-.733zM18.398 0c.405 0 .733.328.733.733v2.218h2.209a.734.734 0 010 1.467h-2.21v2.209a.732.732 0 11-1.466 0V4.418h-2.217a.734.734 0 110-1.466l2.216-.001.001-2.218c0-.405.328-.733.733-.733z"
});

function SvgIconReactionsAdd(props) {
  return React.createElement("svg", _extends$t({
    viewBox: "0 0 22 22"
  }, props), _ref$t);
}

function _extends$u() { _extends$u = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$u.apply(this, arguments); }

var _ref$u =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-emoji-reactions-add_svg__fill",
  fillOpacity: 0.38,
  fillRule: "evenodd",
  d: "M10.03 1.006c.828 0 1.643.112 2.426.33a.666.666 0 11-.357 1.284 7.741 7.741 0 00-2.069-.28 7.697 7.697 0 107.697 7.696c0-.696-.092-1.379-.272-2.037a.667.667 0 011.287-.352c.21.773.319 1.574.319 2.39a9.03 9.03 0 01-9.03 9.03 9.03 9.03 0 11-.001-18.06zm3.346 10.873c.455 0 .776.445.632.877-.585 1.757-2.168 2.965-3.978 2.965s-3.392-1.208-3.978-2.965a.667.667 0 01.538-.87l.095-.007h6.69zm-1.087 1.333H7.771l.092.12c.46.563 1.103.938 1.813 1.033l.196.018.158.005c.784 0 1.512-.341 2.04-.91l.128-.147.091-.12zM6.685 6.86c.34 0 .62.254.661.583l.006.083V9.2a.667.667 0 01-1.329.084L6.018 9.2V7.527c0-.368.299-.666.667-.666zm6.69 0c.34 0 .621.254.662.583l.005.083V9.2a.667.667 0 01-1.328.084L12.71 9.2V7.527c0-.368.299-.666.667-.666zM16.726 0c.368 0 .667.298.667.667l-.001 2.016H19.4a.667.667 0 010 1.334l-2.01-.001.002 2.008a.667.667 0 01-1.334 0V4.016h-2.016a.666.666 0 110-1.333h2.016V.667c0-.369.299-.667.667-.667z"
});

function SvgIconEmojiReactionsAdd(props) {
  return React.createElement("svg", _extends$u({
    viewBox: "0 0 20 20"
  }, props), _ref$u);
}

function _extends$v() { _extends$v = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$v.apply(this, arguments); }

var _ref$v =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-delivered_svg__fill",
  fillOpacity: 0.38,
  fillRule: "evenodd",
  d: "M2.207 11.793l5 5a1 1 0 01-1.414 1.414l-5-5a1 1 0 011.414-1.414zm19.586-6a1 1 0 011.414 1.414l-11 11a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414l4.293 4.293zm-3.586 0a1 1 0 010 1.414l-5.999 5.999a1 1 0 01-1.414-1.414l5.999-6a1 1 0 011.414 0z"
});

function SvgIconDelivered(props) {
  return React.createElement("svg", _extends$v({
    viewBox: "0 0 24 24"
  }, props), _ref$v);
}

function _extends$w() { _extends$w = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$w.apply(this, arguments); }

var _ref$w =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-disconnected_svg__fill",
  fillRule: "evenodd",
  d: "M3.55 2.276l.093.081L10.9 9.615a.895.895 0 01.148.147l10.594 10.595a.91.91 0 01-1.193 1.367l-.093-.081-5.015-5.015a.913.913 0 01-.705-.15 4.545 4.545 0 00-5.265 0 .91.91 0 01-1.053-1.483 6.358 6.358 0 014.24-1.151l-2.529-2.53c-1.4.316-2.706.96-3.81 1.883a.91.91 0 01-1.167-1.394 10.854 10.854 0 013.504-1.962L6.445 7.728a13.518 13.518 0 00-3.461 2.226.909.909 0 01-1.204-1.362 15.38 15.38 0 013.299-2.229l-2.722-2.72A.91.91 0 013.55 2.276zm13.14 8.052c.812.397 1.572.894 2.262 1.479a.908.908 0 11-1.177 1.386 9.015 9.015 0 00-1.883-1.23.91.91 0 01.798-1.635zm5.53-1.737a.91.91 0 01-1.203 1.363A13.642 13.642 0 0010.9 6.588a.91.91 0 01-.146-1.813A15.457 15.457 0 0122.22 8.591z"
});

function SvgIconDisconnected(props) {
  return React.createElement("svg", _extends$w({
    viewBox: "0 0 24 24"
  }, props), _ref$w);
}

function _extends$x() { _extends$x = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$x.apply(this, arguments); }

var _ref$x =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-document_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M14 1a1.01 1.01 0 01.25.031l.03.009c.03.009.061.02.091.031l.027.012a.914.914 0 01.195.112c.04.03.078.062.114.098l-.093-.082.011.009.082.073 6 6a1.006 1.006 0 01.21.309l.012.027c.012.03.022.06.031.091l.008.03A.921.921 0 0121 8l-.008-.126.001.01L21 8v12a3 3 0 01-3 3H6a3 3 0 01-3-3V4a3 3 0 013-3h8zm-1 2H6a1 1 0 00-1 1v16a1 1 0 001 1h12a1 1 0 001-1V9h-5a1 1 0 01-.993-.883L13 8V3zm4.585 4L15 4.415V7h2.585z"
});

function SvgIconDocument(props) {
  return React.createElement("svg", _extends$x({
    viewBox: "0 0 24 24"
  }, props), _ref$x);
}

function _extends$y() { _extends$y = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$y.apply(this, arguments); }

var _ref$y =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-download_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M21 16a1 1 0 01.993.883L22 17v3a3 3 0 01-2.824 2.995L19 23H5a3 3 0 01-2.995-2.824L2 20v-3a1 1 0 011.993-.117L4 17v3a1 1 0 00.883.993L5 21h14a1 1 0 00.993-.883L20 20v-3a1 1 0 011-1zM12 1a1 1 0 01.993.883L13 2v11.585l2.293-2.292a1 1 0 011.32-.083l.094.083a1 1 0 01.083 1.32l-.083.094-4 4a1.006 1.006 0 01-.09.08l.09-.08a1.008 1.008 0 01-.674.292L12 17h-.032l-.054-.004L12 17a1.008 1.008 0 01-.613-.21 1.037 1.037 0 01-.094-.083l-4-4a1 1 0 011.32-1.497l.094.083L11 13.585V2a1 1 0 011-1z"
});

function SvgIconDownload(props) {
  return React.createElement("svg", _extends$y({
    viewBox: "0 0 24 24"
  }, props), _ref$y);
}

function _extends$z() { _extends$z = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$z.apply(this, arguments); }

var _ref$z =
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
  return React.createElement("svg", _extends$z({
    viewBox: "0 0 28 28"
  }, props), _ref$z);
}

function _extends$A() { _extends$A = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$A.apply(this, arguments); }

var _ref$A =
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
  return React.createElement("svg", _extends$A({
    viewBox: "0 0 28 28"
  }, props), _ref$A);
}

function _extends$B() { _extends$B = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$B.apply(this, arguments); }

var _ref$B =
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
  return React.createElement("svg", _extends$B({
    viewBox: "0 0 56 56"
  }, props), _ref$B);
}

function _extends$C() { _extends$C = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$C.apply(this, arguments); }

var _ref$C =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-info_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zm0 2a9 9 0 100 18 9 9 0 000-18zm0 8a1 1 0 011 1v4a1 1 0 01-2 0v-4a1 1 0 011-1zm0-3a1 1 0 110 2 1 1 0 010-2z"
});

function SvgIconInfo(props) {
  return React.createElement("svg", _extends$C({
    viewBox: "0 0 24 24"
  }, props), _ref$C);
}

function _extends$D() { _extends$D = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$D.apply(this, arguments); }

var _ref$D =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-leave_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M12 2a1 1 0 01.117 1.993L12 4H4a1 1 0 00-.993.883L3 5v14a1 1 0 00.883.993L4 20h8a1 1 0 01.117 1.993L12 22H4a3 3 0 01-2.995-2.824L1 19V5a3 3 0 012.824-2.995L4 2h8zm6.613 5.21l.094.083 4 4a1 1 0 01.083 1.32l-.083.094-4 4a1 1 0 01-1.497-1.32l.083-.094 1.792-1.793H7.5a1 1 0 01-.117-1.993L7.5 11.5h12.585l-2.792-2.793a1 1 0 01-.083-1.32l.083-.094a1 1 0 011.32-.083z"
});

function SvgIconLeave(props) {
  return React.createElement("svg", _extends$D({
    viewBox: "0 0 24 24"
  }, props), _ref$D);
}

function _extends$E() { _extends$E = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$E.apply(this, arguments); }

var _ref$E =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-members_svg__fill",
  fillRule: "evenodd",
  d: "M13 14a5 5 0 014.995 4.783L18 19v2a1 1 0 01-1.993.117L16 21v-2a3 3 0 00-2.824-2.995L13 16H5a3 3 0 00-2.995 2.824L2 19v2a1 1 0 01-1.993.117L0 21v-2a5 5 0 014.783-4.995L5 14h8zm7.25.162a5 5 0 013.745 4.611L24 19v2a1 1 0 01-1.993.117L22 21v-2a3 3 0 00-2.25-2.902 1 1 0 11.5-1.936zM9 2a5 5 0 110 10A5 5 0 019 2zm7.248.161a5 5 0 010 9.688 1 1 0 01-.496-1.938 3 3 0 000-5.812 1 1 0 11.496-1.938zM9 4a3 3 0 100 6 3 3 0 000-6z"
});

function SvgIconMembers(props) {
  return React.createElement("svg", _extends$E({
    viewBox: "0 0 24 24"
  }, props), _ref$E);
}

function _extends$F() { _extends$F = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$F.apply(this, arguments); }

var _ref$F =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-notifications_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M13.73 20a1 1 0 01.865 1.502 3 3 0 01-5.19 0 1 1 0 01.752-1.496L10.27 20h3.46zM12 1a8 8 0 017.996 7.75L20 9v5a2 2 0 001.85 1.995l.283.012c1.111.12 1.154 1.73.128 1.965l-.128.021L22 18H2l-.133-.007c-1.156-.124-1.156-1.862 0-1.986l.282-.012a2 2 0 001.845-1.838L4 14V9a8 8 0 018-8zm0 2a6 6 0 00-5.996 5.775L6 9v5c0 .586-.126 1.142-.352 1.643l-.103.212-.082.145h13.073l-.08-.145a3.973 3.973 0 01-.43-1.402l-.021-.253L18 14V9a6 6 0 00-6-6z"
});

function SvgIconNotifications(props) {
  return React.createElement("svg", _extends$F({
    viewBox: "0 0 24 24"
  }, props), _ref$F);
}

function _extends$G() { _extends$G = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$G.apply(this, arguments); }

var _ref$G =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-photo_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M19 2a3 3 0 013 3v14a3 3 0 01-3 3H4.941v-.002l-.117-.003A3 3 0 012 19V5a3 3 0 013-3zm-3 9.415L7.414 20H19a1 1 0 00.993-.883L20 19v-3.585l-4-4zM19 4H5a1 1 0 00-1 1v14a1 1 0 00.65.937L15.292 9.293a1 1 0 011.32-.083l.094.083L20 12.585V5a1 1 0 00-.883-.993L19 4zM8.5 6a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm0 2a.5.5 0 100 1 .5.5 0 000-1z"
});

function SvgIconPhoto(props) {
  return React.createElement("svg", _extends$G({
    viewBox: "0 0 24 24"
  }, props), _ref$G);
}

function _extends$H() { _extends$H = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$H.apply(this, arguments); }

var _ref$H =
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
  return React.createElement("svg", _extends$H({
    viewBox: "0 0 56 56"
  }, props), _ref$H);
}

function _extends$I() { _extends$I = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$I.apply(this, arguments); }

var _ref$I =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-plus_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M13 11h7c1.333 0 1.333 2 0 2h-7v7c0 1.333-2 1.333-2 0v-7H4c-1.333 0-1.333-2 0-2h7V4c0-1.333 2-1.333 2 0v7z"
});

function SvgIconPlus(props) {
  return React.createElement("svg", _extends$I({
    viewBox: "0 0 24 24"
  }, props), _ref$I);
}

function _extends$J() { _extends$J = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$J.apply(this, arguments); }

var _ref$J =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-read_svg__fill",
  fill: "#2EBA9F",
  fillRule: "evenodd",
  d: "M2.207 11.793l5 5a1 1 0 01-1.414 1.414l-5-5a1 1 0 011.414-1.414zm19.586-6a1 1 0 011.414 1.414l-11 11a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414l4.293 4.293zm-3.586 0a1 1 0 010 1.414l-5.999 5.999a1 1 0 01-1.414-1.414l5.999-6a1 1 0 011.414 0z"
});

function SvgIconRead(props) {
  return React.createElement("svg", _extends$J({
    viewBox: "0 0 24 24"
  }, props), _ref$J);
}

function _extends$K() { _extends$K = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$K.apply(this, arguments); }

var _ref$K =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-refresh_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M14.419 4.51l.175.167 2.073 1.927V4.167c0-.428.321-.78.736-.828l.097-.006c.427 0 .78.322.828.736l.005.098v5c0 .427-.321.78-.736.827L17.5 10h-5a.833.833 0 01-.097-1.661l.097-.006h3.578L13.44 5.88a5.982 5.982 0 00-7.05-.986C4.083 6.15 2.898 8.756 3.48 11.286c.58 2.534 2.792 4.385 5.425 4.537 2.635.152 5.05-1.433 5.928-3.883a.833.833 0 011.569.561c-1.127 3.15-4.223 5.18-7.593 4.986-3.37-.195-6.206-2.57-6.954-5.828-.748-3.261.778-6.617 3.738-8.229 2.884-1.57 6.453-1.118 8.826 1.08z"
});

function SvgIconRefresh(props) {
  return React.createElement("svg", _extends$K({
    width: 20,
    height: 20
  }, props), _ref$K);
}

function _extends$L() { _extends$L = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$L.apply(this, arguments); }

var _ref$L =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-send_svg__fill",
  fillRule: "evenodd",
  d: "M20.554 10.117L2.52 1.024C1.613.619.605 1.428 1.008 2.337l2.115 5.685a2 2 0 001.545 1.275l10.345 1.73-10.345 1.728a2 2 0 00-1.545 1.275l-2.115 5.685c-.302.91.605 1.718 1.511 1.213l18.035-9.094c.706-.303.706-1.313 0-1.717z"
});

function SvgIconSend(props) {
  return React.createElement("svg", _extends$L({
    viewBox: "0 0 22 22"
  }, props), _ref$L);
}

function _extends$M() { _extends$M = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$M.apply(this, arguments); }

var _ref$M =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-sent_svg__fill",
  fillOpacity: 0.38,
  fillRule: "evenodd",
  d: "M4.707 11.793a1 1 0 10-1.414 1.414l5 5a1 1 0 001.414 0l11-11a1 1 0 10-1.414-1.414L9 16.086l-4.293-4.293z"
});

function SvgIconSent(props) {
  return React.createElement("svg", _extends$M({
    viewBox: "0 0 24 24"
  }, props), _ref$M);
}

function _extends$N() { _extends$N = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$N.apply(this, arguments); }

var _ref$N =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-shevron_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M8.293 17.293a1 1 0 001.414 1.414l6-6a1 1 0 000-1.414l-6-6a1 1 0 00-1.414 1.414L13.586 12l-5.293 5.293z"
});

function SvgIconShevron(props) {
  return React.createElement("svg", _extends$N({
    viewBox: "0 0 24 24"
  }, props), _ref$N);
}

function _extends$O() { _extends$O = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$O.apply(this, arguments); }

var _ref$O =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-shevron-down_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M6.045 8.205a1.125 1.125 0 10-1.59 1.59l6.75 6.75c.439.44 1.151.44 1.59 0l6.75-6.75a1.125 1.125 0 10-1.59-1.59L12 14.159 6.045 8.205z"
});

function SvgIconShevronDown(props) {
  return React.createElement("svg", _extends$O({
    viewBox: "0 0 24 24"
  }, props), _ref$O);
}

function _extends$P() { _extends$P = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$P.apply(this, arguments); }

var _ref$P =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-spinner-small_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M12 22.5c5.799 0 10.5-4.701 10.5-10.5S17.799 1.5 12 1.5 1.5 6.201 1.5 12a1.432 1.432 0 002.864 0A7.636 7.636 0 1112 19.636a1.432 1.432 0 000 2.864z"
});

function SvgIconSpinnerSmall(props) {
  return React.createElement("svg", _extends$P({
    viewBox: "0 0 24 24"
  }, props), _ref$P);
}

function _extends$Q() { _extends$Q = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$Q.apply(this, arguments); }

var _ref$Q =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-spinner-large_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M24 48c13.255 0 24-10.745 24-24S37.255 0 24 0 0 10.745 0 24a2.323 2.323 0 104.645 0C4.645 13.31 13.311 4.645 24 4.645c10.69 0 19.355 8.666 19.355 19.355 0 10.69-8.666 19.355-19.355 19.355A2.323 2.323 0 0024 48z"
});

function SvgIconSpinnerLarge(props) {
  return React.createElement("svg", _extends$Q({
    viewBox: "0 0 48 48"
  }, props), _ref$Q);
}

function _extends$R() { _extends$R = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$R.apply(this, arguments); }

var _ref$R =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-user_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M16 14a5 5 0 014.995 4.783L21 19v2a1 1 0 01-1.993.117L19 21v-2a3 3 0 00-2.824-2.995L16 16H8a3 3 0 00-2.995 2.824L5 19v2a1 1 0 01-1.993.117L3 21v-2a5 5 0 014.783-4.995L8 14h8zM12 2a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z"
});

function SvgIconUser(props) {
  return React.createElement("svg", _extends$R({
    viewBox: "0 0 24 24"
  }, props), _ref$R);
}

function _extends$S() { _extends$S = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$S.apply(this, arguments); }

var _ref$S =
/*#__PURE__*/
React.createElement("g", {
  fill: "none",
  fillRule: "evenodd"
}, React.createElement("path", {
  className: "icon-operator_svg__stroke",
  d: "M2 6l5 4 5-7 5 7 5-4-3 14H5z"
}), React.createElement("circle", {
  className: "icon-operator_svg__fill",
  cx: 12,
  cy: 14,
  r: 2
}));

function SvgIconOperator(props) {
  return React.createElement("svg", _extends$S({
    viewBox: "0 0 24 24"
  }, props), _ref$S);
}

function _extends$T() { _extends$T = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$T.apply(this, arguments); }

var _ref$T =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-banned_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zm0 2a9 9 0 10.001 18.001A9 9 0 0012 3zm4 8a1 1 0 010 2H8a1 1 0 010-2h8z"
});

function SvgIconBanned(props) {
  return React.createElement("svg", _extends$T({
    viewBox: "0 0 24 24"
  }, props), _ref$T);
}

function _extends$U() { _extends$U = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$U.apply(this, arguments); }

var _ref$U =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-muted_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M20.857 7.357l.026.045A9.96 9.96 0 0122 12a9.937 9.937 0 01-1.074 4.51c-.38 1.021-.463 1.817-.25 2.386.265.713.598 1.308.997 1.784.578.594.39 1.01-.565 1.249-.763.19-2.073 0-3.929-.571l-.333-.105-.598-.198A9.965 9.965 0 0112 22a9.952 9.952 0 01-4.622-1.13l-.022-.011 1.5-1.5c.982.42 2.046.641 3.144.641 1.073 0 2.114-.21 3.079-.613l.318-.142.722-.339 1.355.449.26.082c.228.07.445.133.65.19l.298.08.182.045-.063-.157-.075-.223c-.295-.974-.189-2.057.225-3.275l.1-.284.04-.107.198-.406A7.949 7.949 0 0020 12a7.97 7.97 0 00-.64-3.143l1.497-1.5zM12 2c2.401 0 4.604.846 6.328 2.257l1.965-1.964a1 1 0 011.497 1.32l-.083.094-18 18a1 1 0 01-1.497-1.32l.083-.094 1.963-1.965a9.956 9.956 0 01-2.25-5.998L2 12C2 6.477 6.477 2 12 2zm0 2a8 8 0 00-6.32 12.906L16.905 5.68a7.957 7.957 0 00-4.607-1.675L12 4z"
});

function SvgIconMuted(props) {
  return React.createElement("svg", _extends$U({
    viewBox: "0 0 24 24"
  }, props), _ref$U);
}

function _extends$V() { _extends$V = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$V.apply(this, arguments); }

var _ref$V =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-muted-foreground_svg__fill",
  fill: "#FFF",
  fillOpacity: 0.88,
  fillRule: "evenodd",
  d: "M13.904 4.904l.018.03c.476.919.745 1.96.745 3.066a6.628 6.628 0 01-.716 3.006c-.253.682-.309 1.212-.168 1.591.178.476.4.872.666 1.19.385.396.26.674-.377.832-.503.125-1.361.003-2.576-.367l-.266-.083-.398-.132c-.86.404-1.82.63-2.832.63a6.632 6.632 0 01-3.082-.754l-.014-.007 1-1c.655.28 1.364.427 2.096.427a5.32 5.32 0 001.999-.386l.266-.117.481-.226.903.299.174.055c.152.047.296.089.433.126l.199.054.121.03-.042-.105-.05-.149c-.192-.635-.129-1.34.133-2.132l.084-.24.026-.071.132-.271a5.294 5.294 0 00.474-2.2c0-.732-.147-1.44-.427-2.096l.998-1zm.567-3.375c.24.24.26.618.056.88l-.056.062-12 12a.666.666 0 01-.998-.88l.056-.062 1.31-1.31a6.636 6.636 0 01-1.5-3.94L1.333 8A6.667 6.667 0 0112.22 2.838l1.309-1.31c.26-.26.682-.26.942 0zM8 2.667a5.332 5.332 0 00-4.213 8.603l7.484-7.484a5.32 5.32 0 00-3.006-1.113L8 2.667z"
});

function SvgIconMutedForeground(props) {
  return React.createElement("svg", _extends$V({
    viewBox: "0 0 16 16"
  }, props), _ref$V);
}

function _extends$W() { _extends$W = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$W.apply(this, arguments); }

var _ref$W =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-freeze_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M9.613 1.21l.095.083L12 3.585l2.293-2.292a1 1 0 011.32-.083l.095.083a1 1 0 01.083 1.32l-.083.094L13 5.414v4.853l4.203-2.427.992-3.697a1 1 0 011.957.395l-.025.123-.84 3.131 3.133.84c.492.132.8.61.732 1.102l-.025.123c-.132.492-.61.8-1.102.732l-.123-.025-3.698-.991L14.001 12l4.203 2.426 3.698-.99.123-.025c.492-.068.97.24 1.102.732l.025.123a1 1 0 01-.732 1.102l-3.133.839.84 3.132.025.123a1 1 0 01-1.957.395l-.992-3.698L13 13.732v4.853l2.708 2.708a1 1 0 01-1.32 1.497l-.095-.083L12 20.414l-2.292 2.293a1 1 0 01-1.32.083l-.095-.083a1 1 0 01-.083-1.32l.083-.094L11 18.585v-4.853l-4.203 2.427-.99 3.698a1.002 1.002 0 01-1.958-.395l.025-.123.839-3.131-3.132-.84c-.492-.132-.8-.61-.732-1.102l.025-.123c.132-.492.61-.8 1.102-.732l.123.025 3.697.99 4.203-2.427-4.203-2.426-3.697.991-.123.025c-.492.068-.97-.24-1.102-.732L.85 9.734a1 1 0 01.732-1.102l3.132-.84-.839-3.131-.025-.123a1 1 0 011.957-.395l.991 3.697L11 10.267V5.414L8.293 2.707a1 1 0 011.32-1.497z"
});

function SvgIconFreeze(props) {
  return React.createElement("svg", _extends$W({
    viewBox: "0 0 24 24"
  }, props), _ref$W);
}

function _extends$X() { _extends$X = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$X.apply(this, arguments); }

var _ref$X =
/*#__PURE__*/
React.createElement("g", {
  className: "icon-toggleon_svg__fill",
  fill: "none",
  fillRule: "evenodd"
}, React.createElement("rect", {
  width: 40,
  height: 20,
  x: 2,
  y: 2,
  fill: "#7B53EF",
  rx: 10
}), React.createElement("circle", {
  cx: 32,
  cy: 12,
  r: 6,
  fill: "#FFF"
}), React.createElement("path", {
  fill: "#7B53EF",
  d: "M32 0H12C5.373 0 0 5.373 0 12s5.373 12 12 12h20c6.627 0 12-5.373 12-12S38.627 0 32 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10H12C6.477 22 2 17.523 2 12S6.477 2 12 2h20z"
}));

function SvgIconToggleon(props) {
  return React.createElement("svg", _extends$X({
    viewBox: "0 0 44 24"
  }, props), _ref$X);
}

function _extends$Y() { _extends$Y = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$Y.apply(this, arguments); }

var _ref$Y =
/*#__PURE__*/
React.createElement("g", {
  className: "icon-toggleoff_svg__fill",
  fill: "none",
  fillRule: "evenodd"
}, React.createElement("rect", {
  width: 40,
  height: 20,
  x: 2,
  y: 2,
  fill: "#A8A8A8",
  rx: 10
}), React.createElement("circle", {
  cx: 12,
  cy: 12,
  r: 6,
  fill: "#FFF"
}), React.createElement("path", {
  fill: "#A8A8A8",
  d: "M32 2c5.523 0 10 4.477 10 10s-4.477 10-10 10H12C6.477 22 2 17.523 2 12S6.477 2 12 2h20zm0 1H12a9 9 0 00-.265 17.996L12 21h20a9 9 0 00.265-17.996L32 3z"
}), React.createElement("path", {
  fill: "#FFF",
  d: "M32 0H12C5.373 0 0 5.373 0 12s5.373 12 12 12h20c6.627 0 12-5.373 12-12S38.627 0 32 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10H12C6.477 22 2 17.523 2 12S6.477 2 12 2h20z"
}));

function SvgIconToggleoff(props) {
  return React.createElement("svg", _extends$Y({
    viewBox: "0 0 44 24"
  }, props), _ref$Y);
}

var Colors = {
  DEFAULT: 'DEFAULT',
  PRIMARY: 'PRIMARY',
  SECONDARY: 'SECONDARY',
  CONTENT: 'CONTENT',
  CONTENT_INVERSE: 'CONTENT_INVERSE',
  WHITE: 'WHITE',
  SENT: 'SENT',
  READ: 'READ',
  ON_BACKGROUND_3: 'ON_BACKGROUND_3'
};

function changeColorToClassName(color) {
  switch (color) {
    case Colors.PRIMARY:
      return 'sendbird-color--primary';

    case Colors.SECONDARY:
      return 'sendbird-color--secondary';

    case Colors.CONTENT:
      return 'sendbird-color--content';

    case Colors.CONTENT_INVERSE:
      return 'sendbird-color--content-inverse';

    case Colors.WHITE:
      return 'sendbird-color--white';

    case Colors.SENT:
      return 'sendbird-color--sent';

    case Colors.READ:
      return 'sendbird-color--read';

    case Colors.ON_BACKGROUND_3:
      return 'sendbird-color--on-background';

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

    case Type.AVATAR_DARK:
      return React.createElement(SvgIconAvatarDark, null);

    case Type.AVATAR_LIGHT:
      return React.createElement(SvgIconAvatarLight, null);

    case Type.BROADCAST_LARGE_DARK:
      return React.createElement(SvgIconBroadcastLrgDark, null);

    case Type.BROADCAST_LARGE_LIGHT:
      return React.createElement(SvgIconBroadcastLrgLight, null);

    case Type.BROADCAST_DARK:
      return React.createElement(SvgIconBroadcastDark, null);

    case Type.BROADCAST_LIGHT:
      return React.createElement(SvgIconBroadcastLight, null);

    case Type.BROADCAST:
      return React.createElement(SvgIconBroadcast, null);

    case Type.FROZEN_DARK:
      return React.createElement(SvgFrozenDark, null);

    case Type.FROZEN_LIGHT:
      return React.createElement(SvgFrozenLight, null);

    case Type.MORE:
      return React.createElement(SvgIconMore, null);

    case Type.MUTE:
      return React.createElement(SvgIconMute, null);

    case Type.NO_THUMBNAIL:
      return React.createElement(SvgIconNoThumbnail, null);

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

    case Type.SUPER_GROUP:
      return React.createElement(SvgIconSupergroup, null);

    case Type.CREATE:
      return React.createElement(SvgIconCreate, null);

    case Type.DELETE:
      return React.createElement(SvgIconDelete, null);

    case Type.DISCONNECTED:
      return React.createElement(SvgIconDisconnected, null);

    case Type.DUMMY:
      return React.createElement(SvgIconDummy, null);

    case Type.EDIT:
      return React.createElement(SvgIconEdit, null);

    case Type.ERROR:
      return React.createElement(SvgIconError, null);

    case Type.ERROR_FILLED:
      return React.createElement(SvgIconErrorFilled, null);

    case Type.EMOJI_FAILED:
      return React.createElement(SvgEmojiFail, null);

    case Type.EMOJI_REACTIONS_ADD:
      return React.createElement(SvgIconReactionsAdd, null);

    case Type.EMOJI_REACTIONS_ADD_GRAY:
      return React.createElement(SvgIconEmojiReactionsAdd, null);

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

    case Type.SPINNER_LARGE:
      return React.createElement(SvgIconSpinnerLarge, null);

    case Type.USER:
      return React.createElement(SvgIconUser, null);

    case Type.ICON_OPERATOR:
      return React.createElement(SvgIconOperator, null);

    case Type.ICON_BANNED:
      return React.createElement(SvgIconBanned, null);

    case Type.ICON_MUTED:
      return React.createElement(SvgIconMuted, null);

    case Type.ICON_MUTED_FG:
      return React.createElement(SvgIconMutedForeground, null);

    case Type.ICON_FREEZE:
      return React.createElement(SvgIconFreeze, null);

    case Type.TOGGLE_ON:
      return React.createElement(SvgIconToggleon, null);

    case Type.TOGGLE_OFF:
      return React.createElement(SvgIconToggleoff, null);

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
  var iconStyle = {
    width: typeof width === 'string' ? width : "".concat(width, "px"),
    height: typeof height === 'string' ? height : "".concat(height, "px")
  };
  var injectingClassName = Array.isArray(className) ? className : [className];
  return React.createElement("div", {
    onClick: onClick,
    onKeyDown: onClick,
    role: "button",
    tabIndex: "0",
    className: [].concat(_toConsumableArray(injectingClassName), ['sendbird-icon', changeColorToClassName(fillColor)]).join(' '),
    style: iconStyle
  }, children || changeTypeToIconComponent(type));
}
Icon.propTypes = {
  type: PropTypes.oneOfType([PropTypes.oneOf(Object.keys(Type)), PropTypes.string]).isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
  children: PropTypes.element,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  fillColor: PropTypes.oneOf(Object.keys(Colors))
};
Icon.defaultProps = {
  onClick: function onClick() {},
  width: 26,
  height: 26,
  children: null,
  className: '',
  fillColor: Colors.DEFAULT
};
var IconTypes = Type;
var IconColors = Colors;

var imageRendererClassName = 'sendbird-avatar-img';

var defaultComponent = function defaultComponent(_a) {
  var width = _a.width,
      height = _a.height;
  return function () {
    return document.querySelector('.sendbird-theme--dark') ? React.createElement(Icon, {
      className: imageRendererClassName,
      type: IconTypes.AVATAR_DARK,
      width: width,
      height: height
    }) : React.createElement(Icon, {
      className: imageRendererClassName,
      type: IconTypes.AVATAR_LIGHT,
      width: width,
      height: height
    });
  };
};

var AvatarInner = function AvatarInner(_a) {
  var _b = _a.src,
      src = _b === void 0 ? '' : _b,
      _c = _a.alt,
      alt = _c === void 0 ? '' : _c,
      height = _a.height,
      width = _a.width;

  if (typeof src === 'string') {
    return React.createElement(ImageRenderer, {
      className: imageRendererClassName,
      url: src,
      height: height,
      width: width,
      alt: alt,
      defaultComponent: defaultComponent({
        height: height,
        width: width
      })
    });
  }

  if (src && src.length) {
    if (src.length === 1) {
      return React.createElement(ImageRenderer, {
        className: imageRendererClassName,
        url: src[0],
        height: height,
        width: width,
        alt: alt,
        defaultComponent: defaultComponent({
          height: height,
          width: width
        })
      });
    }

    if (src.length === 2) {
      return React.createElement("div", {
        className: "sendbird-avatar--inner__two-child"
      }, React.createElement(ImageRenderer, {
        className: imageRendererClassName,
        url: src[0],
        height: height,
        width: width,
        alt: alt,
        defaultComponent: defaultComponent({
          height: height,
          width: width
        })
      }), React.createElement(ImageRenderer, {
        className: imageRendererClassName,
        url: src[1],
        height: height,
        width: width,
        alt: alt,
        defaultComponent: defaultComponent({
          height: height,
          width: width
        })
      }));
    }

    if (src.length === 3) {
      return React.createElement(React.Fragment, null, React.createElement("div", {
        className: "sendbird-avatar--inner__three-child--upper"
      }, React.createElement(ImageRenderer, {
        className: imageRendererClassName,
        url: src[0],
        height: height,
        width: width,
        alt: alt,
        defaultComponent: defaultComponent({
          height: height,
          width: width
        })
      })), React.createElement("div", {
        className: "sendbird-avatar--inner__three-child--lower"
      }, React.createElement(ImageRenderer, {
        className: imageRendererClassName,
        url: src[1],
        height: height,
        width: width,
        alt: alt,
        defaultComponent: defaultComponent({
          height: height,
          width: width
        })
      }), React.createElement(ImageRenderer, {
        className: imageRendererClassName,
        url: src[2],
        height: height,
        width: width,
        alt: alt,
        defaultComponent: defaultComponent({
          height: height,
          width: width
        })
      })));
    }

    return React.createElement("div", {
      className: "sendbird-avatar--inner__four-child"
    }, src.slice(0, 4).map(function (i) {
      return React.createElement(ImageRenderer, {
        className: imageRendererClassName,
        url: i,
        height: height,
        width: width,
        alt: alt,
        key: uuidv4(),
        defaultComponent: defaultComponent({
          height: height,
          width: width
        })
      });
    }));
  } // default img


  return React.createElement(ImageRenderer, {
    className: imageRendererClassName,
    url: "",
    height: height,
    width: width,
    alt: alt,
    defaultComponent: defaultComponent({
      height: height,
      width: width
    })
  });
};

function Avatar(_a, ref) {
  var _b = _a.src,
      src = _b === void 0 ? '' : _b,
      _c = _a.alt,
      alt = _c === void 0 ? '' : _c,
      _d = _a.width,
      width = _d === void 0 ? '56px' : _d,
      _e = _a.height,
      height = _e === void 0 ? '56px' : _e,
      onClick = _a.onClick,
      _f = _a.className,
      className = _f === void 0 ? '' : _f;
  var injectingClassName = Array.isArray(className) ? className : [className];
  return React.createElement("div", {
    className: __spreadArrays(injectingClassName, ['sendbird-avatar']).join(' '),
    ref: ref,
    style: {
      height: height,
      width: width
    },
    onClick: onClick,
    role: "button",
    tabIndex: 0,
    onKeyDown: onClick
  }, React.createElement(AvatarInner, {
    src: src,
    height: height,
    width: width,
    alt: alt
  }));
}

var Avatar$1 = React.forwardRef(Avatar);

var DEFAULT_URL_PREFIX = 'https://static.sendbird.com/sample/cover/cover_';
var getChannelAvatarSource = function getChannelAvatarSource(channel, currentUserId) {
  if (channel && channel.coverUrl) {
    if (!new RegExp("^" + DEFAULT_URL_PREFIX).test(channel.coverUrl)) {
      return channel.coverUrl;
    }
  }

  return channel && channel.members ? channel.members.filter(function (member) {
    return member.userId !== currentUserId;
  }).map(function (_a) {
    var profileUrl = _a.profileUrl;
    return profileUrl;
  }) : [];
};
var useDefaultAvatar = function useDefaultAvatar(channel) {
  if (channel && channel.coverUrl) {
    if (new RegExp("^" + DEFAULT_URL_PREFIX).test(channel.coverUrl)) {
      return true;
    }

    return false;
  }

  return true;
};

function ChannelAvatar(_a) {
  var channel = _a.channel,
      userId = _a.userId,
      theme = _a.theme,
      _b = _a.height,
      height = _b === void 0 ? 56 : _b,
      _c = _a.width,
      width = _c === void 0 ? 56 : _c;
  var isBroadcast = channel.isBroadcast;
  var memoizedAvatar = useMemo(function () {
    return isBroadcast ? useDefaultAvatar(channel) ? theme === 'dark' ? React.createElement(Icon, {
      type: IconTypes.BROADCAST_LARGE_DARK,
      width: width,
      height: height,
      className: "sendbird-chat-header__default--broadcast-channel-dark"
    }) : React.createElement(Icon, {
      type: IconTypes.BROADCAST_LARGE_LIGHT,
      width: width,
      height: height,
      className: "sendbird-chat-header__default--broadcast-channel-light"
    }) : React.createElement(Avatar$1, {
      className: "sendbird-chat-header__avatar--broadcast-channel",
      src: getChannelAvatarSource(channel, userId),
      width: width,
      height: height,
      alt: channel.name
    }) : React.createElement(Avatar$1, {
      className: "sendbird-chat-header__avatar--group-channel",
      src: getChannelAvatarSource(channel, userId),
      width: width + "px",
      height: height + "px",
      alt: channel.name
    });
  }, [channel.members, channel.coverUrl, theme]);
  return React.createElement(React.Fragment, null, memoizedAvatar);
}

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
var Colors$1 = {
  ONBACKGROUND_1: 'ONBACKGROUND_1',
  ONBACKGROUND_2: 'ONBACKGROUND_2',
  ONBACKGROUND_3: 'ONBACKGROUND_3',
  ONCONTENT_1: 'ONCONTENT_1',
  ONCONTENT_2: 'ONCONTENT_2',
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
function changeColorToClassName$1(color) {
  switch (color) {
    case Colors$1.ONBACKGROUND_1:
      return 'sendbird-label--color-onbackground-1';

    case Colors$1.ONBACKGROUND_2:
      return 'sendbird-label--color-onbackground-2';

    case Colors$1.ONBACKGROUND_3:
      return 'sendbird-label--color-onbackground-3';

    case Colors$1.ONCONTENT_1:
      return 'sendbird-label--color-oncontent-1';

    case Colors$1.ONCONTENT_2:
      return 'sendbird-label--color-oncontent-2';

    case Colors$1.PRIMARY:
      return 'sendbird-label--color-primary';

    case Colors$1.ERROR:
      return 'sendbird-label--color-error';

    default:
      return null;
  }
}

var CLASS_NAME = 'sendbird-label';
function Label(_ref) {
  var type = _ref.type,
      color = _ref.color,
      children = _ref.children,
      className = _ref.className;
  var injectingClassName = Array.isArray(className) ? [CLASS_NAME].concat(_toConsumableArray(className)) : [CLASS_NAME, className];

  if (type) {
    injectingClassName.push(changeTypographyToClassName(type));
  }

  if (color) {
    injectingClassName.push(changeColorToClassName$1(color));
  }

  return React.createElement("span", {
    className: injectingClassName.join(' ')
  }, children);
}
Label.propTypes = {
  type: PropTypes.oneOf([].concat(_toConsumableArray(Object.keys(Typography)), [''])),
  color: PropTypes.oneOf([].concat(_toConsumableArray(Object.keys(Colors$1)), [''])),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.element, PropTypes.any]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
};
Label.defaultProps = {
  type: '',
  color: '',
  className: [],
  children: null
};
var LabelTypography = Typography;
var LabelColors = Colors$1;
var LabelStringSet = getStringSet('en');

function Badge(_ref) {
  var count = _ref.count,
      maxLevel = _ref.maxLevel,
      className = _ref.className;

  var _useContext = useContext(LocalizationContext),
      stringSet = _useContext.stringSet;

  var maximumNumber = parseInt('9'.repeat(maxLevel > 6 ? 6 : maxLevel), 10);
  var injectingClassName = Array.isArray(className) ? className : [className];
  return React.createElement("div", {
    className: [].concat(_toConsumableArray(injectingClassName), ['sendbird-badge']).join(' ')
  }, React.createElement("div", {
    className: "sendbird-badge__text"
  }, React.createElement(Label, {
    type: LabelTypography.CAPTION_2,
    color: LabelColors.ONCONTENT_1
  }, count > maximumNumber ? "".concat(maximumNumber).concat(stringSet.BADGE__OVER) : count)));
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

var MessageStatusType = {
  PENDING: 'PENDING',
  SENT: 'SENT',
  DELIVERED: 'DELIVERED',
  READ: 'READ',
  FAILED: 'FAILED'
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
var getIsSentFromStatus = function getIsSentFromStatus(status) {
  return status === MessageStatusType.SENT || status === MessageStatusType.DELIVERED || status === MessageStatusType.READ;
};

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
    type: theme === 'dark' ? IconTypes.BROADCAST_DARK : IconTypes.BROADCAST_LIGHT,
    height: 12,
    width: 12
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
    type: theme === 'dark' ? IconTypes.FROZEN_DARK : IconTypes.FROZEN_LIGHT,
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

var CLASS_NAME$1 = 'sendbird-iconbutton';
var IconButton = React.forwardRef(function (props, ref) {
  var children = props.children,
      className = props.className,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      type = props.type,
      height = props.height,
      width = props.width,
      _onClick = props.onClick,
      _onBlur = props.onBlur;

  var _useState = useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      pressed = _useState2[0],
      setPressed = _useState2[1];

  var injectingClassName = Array.isArray(className) ? className : [className];
  injectingClassName.unshift(CLASS_NAME$1);
  return (// eslint-disable-next-line react/button-has-type
    React.createElement("button", {
      className: "".concat(injectingClassName.join(' '), " ").concat(pressed),
      disabled: disabled,
      ref: ref,
      type: type,
      style: {
        height: height,
        width: width
      },
      onClick: function onClick(e) {
        if (disabled) {
          return;
        }

        setPressed('sendbird-iconbutton--pressed');

        _onClick(e);
      },
      onBlur: function onBlur(e) {
        setPressed('');

        _onBlur(e);
      }
    }, React.createElement("span", {
      className: "sendbird-iconbutton__inner"
    }, children))
  );
});
IconButton.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element), PropTypes.any]).isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onBlur: PropTypes.func
};
IconButton.defaultProps = {
  height: '56px',
  width: '56px',
  className: '',
  type: 'button',
  disabled: false,
  onClick: function onClick() {},
  onBlur: function onBlur() {}
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
  }, React.createElement(Avatar$1, {
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

// simple component to be used as modal root
var MODAL_ROOT = 'sendbird-modal-root';

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
      disabled = _ref.disabled,
      onClick = _ref.onClick,
      className = _ref.className;
  var injectingClassNames = ['sendbird-button', disabled ? 'sendbird-button__disabled' : '', changeTypeToClassName(type), changeSizeToClassName(size)].concat(_toConsumableArray(Array.isArray(className) ? className : [className])).join(' ');
  return React.createElement("button", {
    type: "button",
    className: injectingClassNames,
    onClick: onClick,
    disabled: disabled
  }, React.createElement(Label, {
    className: "sendbird-button__text",
    type: LabelTypography.BUTTON_1,
    color: LabelColors.ONCONTENT_1
  }, children));
}
Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(Object.keys(Type$1)),
  size: PropTypes.oneOf(Object.keys(Size)),
  onClick: PropTypes.func,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
};
Button.defaultProps = {
  children: 'Button',
  type: Type$1.PRIMARY,
  disabled: false,
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
      _ref3$disabled = _ref3.disabled,
      disabled = _ref3$disabled === void 0 ? false : _ref3$disabled,
      submitText = _ref3.submitText,
      type = _ref3.type;

  var _useContext = useContext(LocalizationContext),
      stringSet = _useContext.stringSet;

  return React.createElement("div", {
    className: "sendbird-modal-footer"
  }, React.createElement(Button, {
    type: Type$1.SECONDARY,
    onClick: onCancel
  }, React.createElement(Label, {
    type: LabelTypography.BUTTON_1,
    color: LabelColors.ONBACKGROUND_1
  }, stringSet.BUTTON__CANCEL)), React.createElement(Button, {
    type: type,
    disabled: disabled,
    onClick: onSubmit
  }, submitText));
};
ModalFooter.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  type: PropTypes.string
};
ModalFooter.defaultProps = {
  disabled: false,
  type: Type$1.DANGER
};

function Modal(props) {
  var children = props.children,
      onCancel = props.onCancel,
      onSubmit = props.onSubmit,
      disabled = props.disabled,
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
    disabled: disabled,
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
  disabled: PropTypes.bool,
  type: PropTypes.string
};
Modal.defaultProps = {
  children: null,
  hideFooter: false,
  disabled: false,
  type: Type$1.DANGER
};

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
      disabled = _ref.disabled,
      className = _ref.className,
      onClick = _ref.onClick,
      notUnderline = _ref.notUnderline;
  var injectingClassName = Array.isArray(className) ? className : [className];
  return React.createElement("div", {
    role: "button",
    tabIndex: 0,
    className: [].concat(_toConsumableArray(injectingClassName), [changeColorToClassName$2(color), notUnderline ? 'sendbird-textbutton--not-underline' : 'sendbird-textbutton', disabled ? 'sendbird-textbutton--disabled' : '']).join(' '),
    onClick: onClick,
    onKeyPress: onClick
  }, children);
}
TextButton.propTypes = {
  color: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  onClick: PropTypes.func,
  notUnderline: PropTypes.bool,
  disabled: PropTypes.bool
};
TextButton.defaultProps = {
  color: Colors$2.ONBACKGROUND_1,
  className: '',
  onClick: function onClick() {},
  notUnderline: false,
  disabled: false
};

var noop = function noop() {};
var getMessageCreatedAt = function getMessageCreatedAt(message) {
  return format(message.createdAt, 'p');
};
var getSenderName = function getSenderName(message) {
  return message.sender && (message.sender.friendName || message.sender.nickname || message.sender.userId);
};
var getSenderProfileUrl = function getSenderProfileUrl(message) {
  return message.sender && message.sender.profileUrl;
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
      changeTheme = _d === void 0 ? noop : _d;
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
    type: Type$1.PRIMARY
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
  }, React.createElement(Avatar$1, {
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

function Types() {
  return {
    LOADING: 'LOADING',
    NO_CHANNELS: 'NO_CHANNELS',
    WRONG: 'WRONG'
  };
}
var PlaceHolderTypes = Types();

function MutedAvatarOverlay(props) {
  var _a = props.height,
      height = _a === void 0 ? 24 : _a,
      _b = props.width,
      width = _b === void 0 ? 24 : _b;
  return React.createElement("div", {
    className: "sendbird-muted-avatar",
    style: {
      height: height + "px",
      width: width + "px"
    }
  }, React.createElement("div", {
    className: "sendbird-muted-avatar__icon"
  }, React.createElement("div", {
    className: "sendbird-muted-avatar__bg",
    style: {
      height: height + "px",
      width: width + "px"
    }
  }), React.createElement(Icon, {
    fillColor: IconColors.WHITE,
    type: IconTypes.ICON_MUTED,
    width: height - 8 + "px",
    height: width - 8 + "px"
  })));
}

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

var SEND_MESSAGE_START = 'SEND_MESSAGE_START';
var SEND_USER_MESSAGE = 'SEND_USER_MESSAGE';
var SEND_FILE_MESSAGE = 'SEND_FILE_MESSAGE';
var UPDATE_USER_MESSAGE = 'UPDATE_USER_MESSAGE';
var DELETE_MESSAGE = 'DELETE_MESSAGE';
var LEAVE_CHANNEL = 'LEAVE_CHANNEL';
var CREATE_CHANNEL$1 = 'CREATE_CHANNEL';

var getSdk = function getSdk(store) {
  var _store$stores = store.stores,
      stores = _store$stores === void 0 ? {} : _store$stores;
  var _stores$sdkStore = stores.sdkStore,
      sdkStore = _stores$sdkStore === void 0 ? {} : _stores$sdkStore;
  var sdk = sdkStore.sdk;
  return sdk;
};
var getPubSub = function getPubSub(store) {
  var _store$config = store.config,
      config = _store$config === void 0 ? {} : _store$config;
  var pubSub = config.pubSub;
  return pubSub;
}; // SendBird disconnect. Invalidates currentUser
// eslint-disable-next-line max-len

var getConnect = function getConnect(store) {
  return function (userId, accessToken) {
    return new Promise(function (resolve, reject) {
      var sdk = getSdk(store);

      if (!sdk) {
        reject(new Error('Sdk not found'));
      }

      if (!accessToken) {
        sdk.connect(userId).then(function (res) {
          return resolve(res);
        }).catch(function (err) {
          return reject(err);
        });
      } else {
        sdk.connect(userId, accessToken).then(function (res) {
          return resolve(res);
        }).catch(function (err) {
          return reject(err);
        });
      }
    });
  };
}; // SendBird disconnect. Invalidates currentUser

var getDisconnect = function getDisconnect(store) {
  return function () {
    return new Promise(function (resolve, reject) {
      var sdk = getSdk(store);

      if (!sdk) {
        reject(new Error('Sdk not found'));
      }

      sdk.disconnect().then(function (res) {
        return resolve(res);
      }).catch(function (err) {
        return reject(err);
      });
    });
  };
}; // Using the updateCurrentUserInfo() method
// you can update a user's nickname and profile image with a URL
// eslint-disable-next-line max-len

var getUpdateUserInfo = function getUpdateUserInfo(store) {
  return function (nickName, profileUrl) {
    return new Promise(function (resolve, reject) {
      var sdk = getSdk(store);

      if (!sdk) {
        reject(new Error('Sdk not found'));
      }

      sdk.updateCurrentUserInfo(nickName, profileUrl).then(function (res) {
        return resolve(res);
      }).catch(function (err) {
        return reject(err);
      });
    });
  };
};
var getSendUserMessage = function getSendUserMessage(store) {
  return function (channelUrl, userMessageParams) {
    var sdk = getSdk(store);
    var pubsub = getPubSub(store);
    return new Promise(function (resolve, reject) {
      if (!sdk) {
        reject(new Error('Sdk not found'));
      }

      sdk.GroupChannel.getChannel(channelUrl).then(function (channel) {
        var promisify = function promisify() {
          var pendingMsg = null;
          var pendingPromise = new Promise(function (resolve_, reject_) {
            pendingMsg = channel.sendUserMessage(userMessageParams, function (res, err) {
              var swapParams = sdk.getErrorFirstCallback();
              var message = res;
              var error = err;

              if (swapParams) {
                message = err;
                error = res;
              }

              if (error) {
                reject_(error);
                return;
              }

              resolve_(message);
              pubsub.publish(SEND_USER_MESSAGE, {
                message: message,
                channel: channel
              });
            });
            pubsub.publish(SEND_MESSAGE_START, {
              message: pendingMsg,
              channel: channel
            });
          });

          pendingPromise.get = function () {
            return pendingMsg;
          };

          return pendingPromise;
        };

        resolve(promisify());
      }).catch(reject);
    });
  };
};
var getSendFileMessage = function getSendFileMessage(store) {
  return function (channelUrl, fileMessageParams) {
    var sdk = getSdk(store);
    var pubsub = getPubSub(store);
    return new Promise(function (resolve, reject) {
      if (!sdk) {
        reject(new Error('Sdk not found'));
      }

      sdk.GroupChannel.getChannel(channelUrl).then(function (channel) {
        var promisify = function promisify() {
          var pendingMsg = null;
          var pendingPromise = new Promise(function (resolve_, reject_) {
            pendingMsg = channel.sendFileMessage(fileMessageParams, function (res, err) {
              var swapParams = sdk.getErrorFirstCallback();
              var message = res;
              var error = err;

              if (swapParams) {
                message = err;
                error = res;
              }

              if (error) {
                reject_(error);
                return;
              }

              resolve_(message);
              pubsub.publish(SEND_FILE_MESSAGE, {
                message: message,
                channel: channel
              });
            });
          });

          if (fileMessageParams.file) {
            // keep the file's local version in pendingMsg.localUrl
            // because promise doesnt allow overriding of pendingMsg.url
            // eslint-disable-next-line no-param-reassign
            pendingMsg.localUrl = URL.createObjectURL(fileMessageParams.file);
          }

          if (fileMessageParams.fileUrl) {
            // eslint-disable-next-line no-param-reassign
            pendingMsg.localUrl = fileMessageParams.fileUrl;
          } // eslint-disable-next-line no-param-reassign


          pendingMsg.requestState = 'pending';
          pubsub.publish(SEND_MESSAGE_START, {
            message: pendingMsg,
            channel: channel
          });

          pendingPromise.get = function () {
            return pendingMsg;
          };

          return pendingPromise;
        };

        resolve(promisify());
      }).catch(reject);
    });
  };
};
var getUpdateUserMessage = function getUpdateUserMessage(store) {
  return function (channelUrl, messageId, params) {
    var sdk = getSdk(store);
    var pubsub = getPubSub(store);
    return new Promise(function (resolve, reject) {
      if (!sdk) {
        reject(new Error('Sdk not found'));
      }

      sdk.GroupChannel.getChannel(channelUrl).then(function (channel) {
        channel.updateUserMessage(messageId, params, function (res, err) {
          var swapParams = sdk.getErrorFirstCallback();
          var message = res;
          var error = err;

          if (swapParams) {
            message = err;
            error = res;
          }

          if (error) {
            reject(error);
            return;
          }

          resolve(message);
          pubsub.publish(UPDATE_USER_MESSAGE, {
            message: message,
            channel: channel,
            // workaround for updating channelPreview on message-edit
            // https://sendbird.atlassian.net/browse/UIKIT-268
            fromSelector: true
          });
        });
      }).catch(reject);
    });
  };
};
var getDeleteMessage = function getDeleteMessage(store) {
  return function (channelUrl, message) {
    var sdk = getSdk(store);
    var pubsub = getPubSub(store);
    return new Promise(function (resolve, reject) {
      if (!sdk) {
        reject(new Error('Sdk not found'));
      }

      sdk.GroupChannel.getChannel(channelUrl).then(function (channel) {
        var messageId = message.messageId;
        channel.deleteMessage(message, function (res, err) {
          var swapParams = sdk.getErrorFirstCallback();
          var error = err;

          if (swapParams) {
            error = res;
          }

          if (error) {
            reject(error);
            return;
          }

          resolve(message);
          pubsub.publish(DELETE_MESSAGE, {
            messageId: messageId,
            channel: channel
          });
        });
      }).catch(reject);
    });
  };
};
var getResendUserMessage = function getResendUserMessage(store) {
  return function (channelUrl, failedMessage) {
    var sdk = getSdk(store);
    var pubsub = getPubSub(store);
    return new Promise(function (resolve, reject) {
      if (!sdk) {
        reject(new Error('Sdk not found'));
      }

      sdk.GroupChannel.getChannel(channelUrl).then(function (channel) {
        channel.resendUserMessage(failedMessage).then(function (message) {
          resolve(message);
          pubsub.publish(SEND_USER_MESSAGE, {
            message: message,
            channel: channel
          });
        }).catch(reject);
      }).catch(reject);
    });
  };
};
var getResendFileMessage = function getResendFileMessage(store) {
  return function (channelUrl, failedMessage) {
    var sdk = getSdk(store);
    var pubsub = getPubSub(store);
    return new Promise(function (resolve, reject) {
      if (!sdk) {
        reject(new Error('Sdk not found'));
      }

      sdk.GroupChannel.getChannel(channelUrl).then(function (channel) {
        channel.resendFileMessage(failedMessage).then(function (message) {
          resolve(message);
          pubsub.publish(SEND_FILE_MESSAGE, {
            message: message,
            channel: channel
          });
        }).catch(reject);
      }).catch(reject);
    });
  };
};
var getCreateChannel = function getCreateChannel(store) {
  return function (params) {
    var sdk = getSdk(store);
    var pubsub = getPubSub(store);
    return new Promise(function (resolve, reject) {
      if (!sdk) {
        reject(new Error('Sdk not found'));
      }

      sdk.GroupChannel.createChannel(params).then(function (channel) {
        resolve(channel);
        pubsub.publish(CREATE_CHANNEL$1, {
          channel: channel
        });
      }).catch(reject);
    });
  };
};
var getLeaveChannel = function getLeaveChannel(store) {
  return function (channelUrl) {
    var sdk = getSdk(store);
    var pubsub = getPubSub(store);
    return new Promise(function (resolve, reject) {
      if (!sdk) {
        reject(new Error('Sdk not found'));
      }

      sdk.GroupChannel.getChannel(channelUrl).then(function (channel) {
        channel.leave().then(function () {
          resolve(channel);
          pubsub.publish(LEAVE_CHANNEL, {
            channel: channel
          });
        }).catch(reject);
      }).catch(reject);
    });
  };
};
var getFreezeChannel = function getFreezeChannel(store) {
  return function (channelUrl) {
    var sdk = getSdk(store);
    return new Promise(function (resolve, reject) {
      if (!sdk) {
        reject(new Error('Sdk not found'));
      }

      sdk.GroupChannel.getChannel(channelUrl).then(function (channel) {
        channel.freeze().then(function () {
          // do not need pubsub here - event listener works
          resolve(channel);
        }).catch(reject);
      }).catch(reject);
    });
  };
};
var getUnFreezeChannel = function getUnFreezeChannel(store) {
  return function (channelUrl) {
    var sdk = getSdk(store);
    return new Promise(function (resolve, reject) {
      if (!sdk) {
        reject(new Error('Sdk not found'));
      }

      sdk.GroupChannel.getChannel(channelUrl).then(function (channel) {
        channel.unfreeze().then(function () {
          // do not need pubsub here - event listener works
          resolve(channel);
        }).catch(reject);
      }).catch(reject);
    });
  };
};
var selectors = {
  getSdk: getSdk,
  getConnect: getConnect,
  getDisconnect: getDisconnect,
  getUpdateUserInfo: getUpdateUserInfo,
  getSendUserMessage: getSendUserMessage,
  getSendFileMessage: getSendFileMessage,
  getUpdateUserMessage: getUpdateUserMessage,
  getDeleteMessage: getDeleteMessage,
  getResendUserMessage: getResendUserMessage,
  getResendFileMessage: getResendFileMessage,
  getFreezeChannel: getFreezeChannel,
  getUnFreezeChannel: getUnFreezeChannel,
  getCreateChannel: getCreateChannel,
  getLeaveChannel: getLeaveChannel
};

function UserProfile(_a) {
  var user = _a.user,
      currentUserId = _a.currentUserId,
      sdk = _a.sdk,
      logger = _a.logger,
      createChannel = _a.createChannel,
      onSuccess = _a.onSuccess;
  var stringSet = useContext(LocalizationContext).stringSet;
  return React.createElement("div", {
    className: "sendbird__user-profile"
  }, React.createElement("section", {
    className: "sendbird__user-profile-avatar"
  }, React.createElement(Avatar$1, {
    height: "80px",
    width: "80px",
    src: user.profileUrl
  })), React.createElement("section", {
    className: "sendbird__user-profile-name"
  }, React.createElement(Label, {
    type: LabelTypography.H_2,
    color: LabelColors.ONBACKGROUND_1
  }, user.nickname || stringSet.NO_NAME)), user.userId !== currentUserId && React.createElement("section", {
    className: "sendbird__user-profile-message"
  }, React.createElement(Button, {
    type: Type$1.SECONDARY,
    onClick: function onClick() {
      var params = new sdk.GroupChannelParams();
      params.isDistinct = true;
      params.addUserIds([user.userId]);
      onSuccess();
      createChannel(params).then(function (groupChannel) {
        logger.info('UserProfile, channel create', groupChannel);
      });
    }
  }, stringSet.USER_PROFILE__MESSAGE)), React.createElement("div", {
    className: "sendbird__user-profile-seperator"
  }), React.createElement("section", {
    className: "sendbird__user-profile-userId"
  }, React.createElement(Label, {
    className: "sendbird__user-profile-userId--label",
    type: LabelTypography.CAPTION_2,
    color: LabelColors.ONBACKGROUND_2
  }, stringSet.USER_PROFILE__USER_ID), React.createElement(Label, {
    className: "sendbird__user-profile-userId--value",
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_1
  }, user.userId)));
}

var mapStoreToProps$1 = function mapStoreToProps(store) {
  return {
    sdk: getSdk(store),
    createChannel: getCreateChannel(store),
    logger: store.config.logger,
    pubsub: store.config.pubSub
  };
};

var ConnectedUserProfile = withSendbirdContext(UserProfile, mapStoreToProps$1);

var MenuItems =
/*#__PURE__*/
function (_Component) {
  _inherits(MenuItems, _Component);

  function MenuItems(props) {
    var _this;

    _classCallCheck(this, MenuItems);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MenuItems).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "showParent", function () {
      var _this$props$parentCon = _this.props.parentContainRef,
          parentContainRef = _this$props$parentCon === void 0 ? {} : _this$props$parentCon;
      var current = parentContainRef.current;

      if (parentContainRef && current) {
        current.classList.add('sendbird-icon--pressed');
      }
    });

    _defineProperty(_assertThisInitialized(_this), "hideParent", function () {
      var _this$props$parentCon2 = _this.props.parentContainRef,
          parentContainRef = _this$props$parentCon2 === void 0 ? {} : _this$props$parentCon2;
      var current = parentContainRef.current;

      if (parentContainRef && current) {
        current.classList.remove('sendbird-icon--pressed');
      }
    });

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
        var padding = Number.isNaN(rect.width - 30) ? 108 // default
        : rect.width - 30;
        menuStyle.left -= padding;
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
      this.showParent();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.cleanUpEvents();
      this.hideParent();
    }
  }, {
    key: "render",
    value: function render() {
      var menuStyle = this.state.menuStyle;
      var _this$props2 = this.props,
          children = _this$props2.children,
          style = _this$props2.style;
      return createPortal(React.createElement(React.Fragment, null, React.createElement("div", {
        className: "sendbird-dropdown__menu-backdrop"
      }), React.createElement("ul", {
        className: "sendbird-dropdown__menu",
        ref: this.menuRef,
        style: _objectSpread2({
          display: 'inline-block',
          position: 'fixed',
          left: "".concat(Math.round(menuStyle.left), "px"),
          top: "".concat(Math.round(menuStyle.top), "px")
        }, style)
      }, children)), document.getElementById('sendbird-dropdown-portal'));
    }
  }]);

  return MenuItems;
}(Component);
MenuItems.propTypes = {
  closeDropdown: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]).isRequired,
  style: PropTypes.shape({}),
  // https://stackoverflow.com/a/51127130
  parentRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  })]).isRequired,
  parentContainRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  })]).isRequired,
  openLeft: PropTypes.bool
};
MenuItems.defaultProps = {
  style: {},
  openLeft: false
};

var componentClassName = 'sendbird-sort-by-row';
function SortByRow(_ref) {
  var className = _ref.className,
      maxItemCount = _ref.maxItemCount,
      itemWidth = _ref.itemWidth,
      itemHeight = _ref.itemHeight,
      children = _ref.children;
  var injectingClassName = Array.isArray(className) ? className : [className];
  injectingClassName.unshift(componentClassName);

  if (children.length > maxItemCount) {
    var result = [];

    for (var i = 0; i < children.length; i += maxItemCount) {
      result.push(React.createElement("div", {
        className: injectingClassName.join(' '),
        style: {
          width: itemWidth * maxItemCount,
          height: itemHeight
        },
        key: className + i
      }, children.slice(i, i + maxItemCount)));
    }

    return result;
  }

  return React.createElement("div", {
    className: injectingClassName.join(' '),
    style: {
      width: itemWidth * children.length,
      height: itemHeight
    }
  }, children);
}
SortByRow.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  maxItemCount: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  itemHeight: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element), PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired
};
SortByRow.defaultProps = {
  className: ''
};

var EmojiListItems =
/*#__PURE__*/
function (_Component) {
  _inherits(EmojiListItems, _Component);

  function EmojiListItems(props) {
    var _this;

    _classCallCheck(this, EmojiListItems);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EmojiListItems).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "showParent", function () {
      var _this$props$parentCon = _this.props.parentContainRef,
          parentContainRef = _this$props$parentCon === void 0 ? {} : _this$props$parentCon;
      var current = parentContainRef.current;

      if (parentContainRef && current) {
        current.classList.add('sendbird-reactions--pressed');
      }
    });

    _defineProperty(_assertThisInitialized(_this), "hideParent", function () {
      var _this$props$parentCon2 = _this.props.parentContainRef,
          parentContainRef = _this$props$parentCon2 === void 0 ? {} : _this$props$parentCon2;
      var current = parentContainRef.current;

      if (parentContainRef && current) {
        current.classList.remove('sendbird-reactions--pressed');
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setupEvents", function () {
      var closeDropdown = _this.props.closeDropdown;

      var _assertThisInitialize = _assertThisInitialized(_this),
          reactionRef = _assertThisInitialize.reactionRef;

      var handleClickOutside = function handleClickOutside(event) {
        if (reactionRef.current && !reactionRef.current.contains(event.target)) {
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

    _defineProperty(_assertThisInitialized(_this), "getBarPosition", function () {
      var _this$props = _this.props,
          parentRef = _this$props.parentRef,
          spaceFromTrigger = _this$props.spaceFromTrigger;
      var spaceFromTriggerX = spaceFromTrigger.x || 0;
      var spaceFromTriggerY = spaceFromTrigger.y || 0;
      var parentRect = parentRef.current.getBoundingClientRect();
      var x = parentRect.x || parentRect.left;
      var y = parentRect.y || parentRect.top;
      var reactionStyle = {
        top: y,
        left: x
      };
      if (!_this.reactionRef.current) return reactionStyle;

      var rect = _this.reactionRef.current.getBoundingClientRect(); // const childRect = this.reactionRef.current.children[0].getBoundingClientRect();


      if (reactionStyle.top < rect.height) {
        reactionStyle.top += parentRect.height;
        reactionStyle.top += spaceFromTriggerY;
      } else {
        reactionStyle.top -= rect.height;
        reactionStyle.top -= spaceFromTriggerY;
      }

      reactionStyle.left -= rect.width / 2;
      reactionStyle.left += parentRect.height / 2 - 2;
      reactionStyle.left += spaceFromTriggerX;
      var maximumLeft = window.innerWidth - rect.width;

      if (maximumLeft < reactionStyle.left) {
        reactionStyle.left = maximumLeft;
      }

      if (reactionStyle.left < 0) {
        reactionStyle.left = 0;
      }

      return _this.setState({
        reactionStyle: reactionStyle
      });
    });

    _this.reactionRef = React.createRef();
    _this.state = {
      reactionStyle: {},
      handleClickOutside: function handleClickOutside() {}
    };
    return _this;
  }

  _createClass(EmojiListItems, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setupEvents();
      this.getBarPosition();
      this.showParent();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.cleanUpEvents();
      this.hideParent();
    }
  }, {
    key: "render",
    value: function render() {
      var reactionStyle = this.state.reactionStyle;
      var children = this.props.children;
      return createPortal(React.createElement(React.Fragment, null, React.createElement("div", {
        className: "sendbird-dropdown__menu-backdrop"
      }), React.createElement("ul", {
        className: "sendbird-dropdown__reaction-bar",
        ref: this.reactionRef,
        style: {
          display: 'inline-block',
          position: 'fixed',
          left: "".concat(Math.round(reactionStyle.left), "px"),
          top: "".concat(Math.round(reactionStyle.top), "px")
        }
      }, React.createElement(SortByRow, {
        className: "sendbird-dropdown__reaction-bar__row",
        maxItemCount: 8,
        itemWidth: 44,
        itemHeight: 40
      }, children))), document.getElementById('sendbird-emoji-list-portal'));
    }
  }]);

  return EmojiListItems;
}(Component);
EmojiListItems.propTypes = {
  closeDropdown: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]).isRequired,
  parentRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  })]).isRequired,
  parentContainRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  })]).isRequired,
  spaceFromTrigger: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  })
};
EmojiListItems.defaultProps = {
  spaceFromTrigger: {}
};

var ENTER = 13;
var MenuItems$1 = MenuItems;
var EmojiListItems$1 = EmojiListItems;
var MenuItem = function MenuItem(_ref) {
  var children = _ref.children,
      onClick = _ref.onClick,
      className = _ref.className;
  var injectingClassName = Array.isArray(className) ? className : [className];
  return React.createElement("li", {
    tabIndex: 0,
    className: [].concat(_toConsumableArray(injectingClassName), ['sendbird-dropdown__menu-item']).join(' '),
    onClick: onClick,
    onKeyPress: function onKeyPress(e) {
      if (e.keyCode === ENTER) {
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
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired
};
MenuItem.defaultProps = {
  className: ''
};
function ContextMenu(_ref2) {
  var menuTrigger = _ref2.menuTrigger,
      menuItems = _ref2.menuItems;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      showMenu = _useState2[0],
      setShowMenu = _useState2[1];

  return React.createElement("div", {
    className: "sendbird-context-menu",
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

var COMPONENT_NAME = 'sendbird-user-list-item';
function UserListItem(_ref) {
  var user = _ref.user,
      className = _ref.className,
      checkBox = _ref.checkBox,
      currentUser = _ref.currentUser,
      checked = _ref.checked,
      _onChange = _ref.onChange,
      action = _ref.action;
  var injectingClassNames = Array.isArray(className) ? className : [className];
  var uniqueKey = user.userId;
  var actionRef = React.useRef(null);
  var parentRef = React.useRef(null);
  var avatarRef = React.useRef(null);

  var _useContext = useContext(UserProfileContext),
      disableUserProfile = _useContext.disableUserProfile,
      renderUserProfile = _useContext.renderUserProfile;

  var _useContext2 = useContext(LocalizationContext),
      stringSet = _useContext2.stringSet;

  return React.createElement("div", {
    ref: parentRef,
    className: [COMPONENT_NAME].concat(_toConsumableArray(injectingClassNames)).join(' ')
  }, user.isMuted && React.createElement(MutedAvatarOverlay, {
    height: 40,
    width: 40
  }), React.createElement(ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return React.createElement(Avatar$1, {
        onClick: function onClick() {
          if (!disableUserProfile) {
            toggleDropdown();
          }
        },
        ref: avatarRef,
        className: "".concat(COMPONENT_NAME, "__avatar"),
        src: user.profileUrl,
        width: "40px",
        height: "40px"
      });
    },
    menuItems: function menuItems(closeDropdown) {
      return React.createElement(MenuItems$1, {
        openLeft: true,
        parentRef: avatarRef // for catching location(x, y) of MenuItems
        ,
        parentContainRef: avatarRef // for toggling more options(menus & reactions)
        ,
        closeDropdown: closeDropdown,
        style: {
          paddingTop: 0,
          paddingBottom: 0
        }
      }, renderUserProfile ? renderUserProfile({
        user: user,
        currentUserId: currentUser,
        close: closeDropdown
      }) : React.createElement(ConnectedUserProfile, {
        user: user,
        currentUserId: currentUser,
        onSuccess: closeDropdown
      }));
    }
  }), React.createElement(Label, {
    className: "".concat(COMPONENT_NAME, "__title"),
    type: LabelTypography.SUBTITLE_1,
    color: LabelColors.ONBACKGROUND_1
  }, user.nickname || stringSet.NO_NAME, currentUser === user.userId && ' (You)'), // if there is now nickname, display userId
  !user.nickname && React.createElement(Label, {
    className: "".concat(COMPONENT_NAME, "__subtitle"),
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_2
  }, user.userId), checkBox && // eslint-disable-next-line jsx-a11y/label-has-associated-control
  React.createElement("label", {
    className: "".concat(COMPONENT_NAME, "__checkbox"),
    htmlFor: uniqueKey
  }, React.createElement(Checkbox, {
    id: uniqueKey,
    checked: checked,
    onChange: function onChange(event) {
      return _onChange(event);
    }
  })), user.role === 'operator' && React.createElement(Label, {
    className: "".concat(COMPONENT_NAME, "__operator"),
    type: LabelTypography.SUBTITLE_2,
    color: LabelColors.ONBACKGROUND_2
  }, "Operator"), action && React.createElement("div", {
    ref: actionRef,
    className: "".concat(COMPONENT_NAME, "__action")
  }, action({
    actionRef: actionRef,
    parentRef: parentRef
  })));
}
UserListItem.propTypes = {
  user: PropTypes.shape({
    userId: PropTypes.string,
    role: PropTypes.string,
    isMuted: PropTypes.bool,
    nickname: PropTypes.string,
    profileUrl: PropTypes.string
  }).isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  currentUser: PropTypes.string,
  action: PropTypes.element,
  checkBox: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func
};
UserListItem.defaultProps = {
  className: '',
  currentUser: '',
  checkBox: false,
  checked: false,
  action: null,
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

  var _useContext = useContext(LocalizationContext),
      stringSet = _useContext.stringSet;

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
  }, "".concat(selectedCount, " ").concat(stringSet.MODAL__INVITE_MEMBER__SELECTEC)), React.createElement("div", {
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
    return !filterUser(idsToFilter)(user.userId) && React.createElement(UserListItem, {
      key: user.userId,
      user: user,
      checkBox: true,
      checked: selectedUsers[user.userId],
      onChange: function onChange(event) {
        var modifiedSelectedUsers = _objectSpread2({}, selectedUsers, _defineProperty({}, event.target.id, event.target.checked));

        if (!event.target.checked) {
          delete modifiedSelectedUsers[event.target.id];
        }

        setSelectedUsers(modifiedSelectedUsers);
      }
    });
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

var createDefaultUserListQuery = function createDefaultUserListQuery(_ref) {
  var sdk = _ref.sdk,
      _ref$userFilledApplic = _ref.userFilledApplicationUserListQuery,
      userFilledApplicationUserListQuery = _ref$userFilledApplic === void 0 ? {} : _ref$userFilledApplic;
  var params = sdk.createApplicationUserListQuery();

  if (userFilledApplicationUserListQuery) {
    Object.keys(userFilledApplicationUserListQuery).forEach(function (key) {
      params[key] = userFilledApplicationUserListQuery[key];
    });
  }

  return params;
};

var getApplicationAttributes = function getApplicationAttributes() {
  var sdk = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _sdk$appInfo = sdk.appInfo,
      appInfo = _sdk$appInfo === void 0 ? {} : _sdk$appInfo;
  var _appInfo$applicationA = appInfo.applicationAttributes,
      applicationAttributes = _appInfo$applicationA === void 0 ? [] : _appInfo$applicationA;
  return applicationAttributes;
};

var isBroadcastChannelEnabled = function isBroadcastChannelEnabled() {
  var sdk = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var ALLOW_BROADCAST_CHANNEL = 'allow_broadcast_channel';
  var applicationAttributes = getApplicationAttributes(sdk);

  if (Array.isArray(applicationAttributes)) {
    return applicationAttributes.includes(ALLOW_BROADCAST_CHANNEL);
  }

  return false;
};
var isSuperGroupChannelEnabled = function isSuperGroupChannelEnabled() {
  var sdk = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var ALLOW_SUPER_GROUP_CHANNEL = 'allow_super_group_channel';
  var applicationAttributes = getApplicationAttributes(sdk);

  if (Array.isArray(applicationAttributes)) {
    return applicationAttributes.includes(ALLOW_SUPER_GROUP_CHANNEL);
  }

  return false;
};
var setChannelType = function setChannelType(params, type) {
  if (type === 'broadcast') {
    // eslint-disable-next-line no-param-reassign
    params.isBroadcast = true;
  }

  if (type === 'supergroup') {
    // eslint-disable-next-line no-param-reassign
    params.isSuper = true;
  }

  return params;
};
var createChannel = function createChannel(sdk, selectedUsers, onBeforeCreateChannel, userId) {
  var type = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'group';
  return new Promise(function (resolve, reject) {
    // have custom params
    if (onBeforeCreateChannel) {
      var _params = onBeforeCreateChannel(selectedUsers);

      setChannelType(_params, type);
      sdk.GroupChannel.createChannel(_params, function (response, error) {
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
      return;
    }

    var params = new sdk.GroupChannelParams();
    params.addUserIds(selectedUsers);
    params.isDistinct = false;

    if (userId) {
      params.operatorUserIds = [userId];
    }

    setChannelType(params, type); // do not have custom params

    sdk.GroupChannel.createChannel(params, function (response, error) {
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
    type: IconTypes.CHAT
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
    type: IconTypes.SUPER_GROUP
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
    type: IconTypes.BROADCAST
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
      return React.createElement(MenuItems$1, {
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
  }), showModal && React.createElement(LeaveChannel, {
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

  var _useContext = useContext(LocalizationContext),
      stringSet = _useContext.stringSet;

  var injectingClassName = Array.isArray(className) ? className : [className];
  return React.createElement("div", {
    className: [].concat(_toConsumableArray(injectingClassName), ['sendbird-place-holder']).join(' ')
  }, type === PlaceHolderTypes.LOADING ? React.createElement(Loader, {
    width: "48px",
    height: "48px"
  }, React.createElement(Icon, {
    type: IconTypes.SPINNER_LARGE,
    width: "48px",
    height: "48px"
  })) : null, type === PlaceHolderTypes.NO_CHANNELS || type === PlaceHolderTypes.WRONG ? React.createElement("div", {
    className: "sendbird-place-holder__body"
  }, type === PlaceHolderTypes.NO_CHANNELS && React.createElement(Icon, {
    className: "sendbird-place-holder__body__icon",
    type: IconTypes.CHAT,
    fillColor: IconColors.ON_BACKGROUND_3,
    width: "64px",
    height: "64px"
  }), type === PlaceHolderTypes.WRONG && React.createElement(Icon, {
    className: "sendbird-place-holder__body__icon",
    type: IconTypes.ERROR,
    fillColor: IconColors.ON_BACKGROUND_3,
    width: "64px",
    height: "64px"
  }), React.createElement(Label, {
    className: "sendbird-place-holder__body__text",
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_2
  }, type === PlaceHolderTypes.NO_CHANNELS ? stringSet.PLACE_HOLDER__NO_CHANNEL : stringSet.PLACE_HOLDER__WRONG), retryToConnect ? React.createElement("div", {
    className: "sendbird-place-holder__body__reconnect",
    role: "button",
    tabIndex: 0,
    onClick: retryToConnect,
    onKeyPress: retryToConnect
  }, React.createElement(Icon, {
    className: "sendbird-place-holder__body__reconnect__icon",
    type: IconTypes.REFRESH,
    fillColor: IconColors.PRIMARY,
    width: "20px",
    height: "20px"
  }), React.createElement(Label, {
    className: "sendbird-place-holder__body__reconnect__text",
    type: LabelTypography.BUTTON_1,
    color: LabelColors.PRIMARY
  }, stringSet.PLACE_HOLDER__RETRY_TO_CONNECT)) : null) : null);
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

var noop$1 = function noop() {};

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

  var _useReducer = useReducer(reducer$2, channelListInitialState),
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
  onChannelSelect: noop$1
};
var ChannelList$1 = withSendbirdContext(ChannelList);

var RESET_MESSAGES = 'RESET_MESSAGES';
var RESET_STATE = 'RESET_STATE';
var CLEAR_SENT_MESSAGES = 'CLEAR_SENT_MESSAGES';
var GET_PREV_MESSAGES_START = 'GET_PREV_MESSAGES_START';
var GET_PREV_MESSAGES_SUCESS = 'GET_PREV_MESSAGES_SUCESS';
var SEND_MESSAGEGE_START = 'SEND_MESSAGEGE_START';
var SEND_MESSAGEGE_SUCESS = 'SEND_MESSAGEGE_SUCESS';
var SEND_MESSAGEGE_FAILURE = 'SEND_MESSAGEGE_FAILURE';
var RESEND_MESSAGEGE_START = 'RESEND_MESSAGEGE_START';
var ON_MESSAGE_RECEIVED = 'ON_MESSAGE_RECEIVED';
var ON_MESSAGE_UPDATED = 'ON_MESSAGE_UPDATED';
var ON_MESSAGE_DELETED = 'ON_MESSAGE_DELETED';
var ON_MESSAGE_DELETED_BY_REQ_ID = 'ON_MESSAGE_DELETED_BY_REQ_ID';
var SET_CURRENT_CHANNEL$1 = 'SET_CURRENT_CHANNEL';
var SET_CHANNEL_INVALID = 'SET_CHANNEL_INVALID';
var MARK_AS_READ = 'MARK_AS_READ';
var ON_REACTION_UPDATED = 'ON_REACTION_UPDATED';
var SET_EMOJI_CONTAINER = 'SET_EMOJI_CONTAINER';
var SET_READ_STATUS = 'SET_READ_STATUS';

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

var MessageTypes = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  FILE: 'FILE',
  THUMBNAIL: 'THUMBNAIL',
  OG: 'OG'
};
var SendingMessageStatus = {
  NONE: 'none',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
  PENDING: 'pending'
};
var getMessageType = function getMessageType(message) {
  if (message.isUserMessage && message.isUserMessage() || message.messageType === 'user') {
    return message.ogMetaData ? MessageTypes.OG : MessageTypes.USER;
  }

  if (message.isAdminMessage && message.isAdminMessage()) {
    return MessageTypes.ADMIN;
  }

  if (message.isFileMessage && message.isFileMessage() || message.messageType === 'file') {
    return isImage(message.type) || isVideo(message.type) ? MessageTypes.THUMBNAIL : MessageTypes.FILE;
  }

  return '';
};

var UNDEFINED = 'undefined';
var SUCCEEDED = SendingMessageStatus.SUCCEEDED,
    FAILED = SendingMessageStatus.FAILED,
    PENDING = SendingMessageStatus.PENDING;
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
var pubSubHandleRemover$1 = function pubSubHandleRemover(subscriber) {
  subscriber.forEach(function (s) {
    try {
      s.remove();
    } catch (_unused) {//
    }
  });
};
var pubSubHandler$1 = function pubSubHandler(channelUrl, pubSub, dispatcher) {
  var subscriber = new Map();
  if (!pubSub || !pubSub.subscribe) return subscriber;
  subscriber.set(SEND_USER_MESSAGE, pubSub.subscribe(SEND_USER_MESSAGE, function (msg) {
    var channel = msg.channel,
        message = msg.message;
    scrollIntoLast('.sendbird-msg--scroll-ref');

    if (channel && channelUrl === channel.url) {
      dispatcher({
        type: SEND_MESSAGEGE_SUCESS,
        payload: message
      });
    }
  }));
  subscriber.set(SEND_MESSAGE_START, pubSub.subscribe(SEND_MESSAGE_START, function (msg) {
    var channel = msg.channel,
        message = msg.message;

    if (channel && channelUrl === channel.url) {
      dispatcher({
        type: SEND_MESSAGEGE_START,
        payload: message
      });
    }
  }));
  subscriber.set(SEND_FILE_MESSAGE, pubSub.subscribe(SEND_FILE_MESSAGE, function (msg) {
    var channel = msg.channel,
        message = msg.message;
    scrollIntoLast('.sendbird-msg--scroll-ref');

    if (channel && channelUrl === channel.url) {
      dispatcher({
        type: SEND_MESSAGEGE_SUCESS,
        payload: message
      });
    }
  }));
  subscriber.set(UPDATE_USER_MESSAGE, pubSub.subscribe(UPDATE_USER_MESSAGE, function (msg) {
    var channel = msg.channel,
        message = msg.message,
        fromSelector = msg.fromSelector;

    if (fromSelector && channel && channelUrl === channel.url) {
      dispatcher({
        type: ON_MESSAGE_UPDATED,
        payload: message
      });
    }
  }));
  subscriber.set(DELETE_MESSAGE, pubSub.subscribe(DELETE_MESSAGE, function (msg) {
    var channel = msg.channel,
        messageId = msg.messageId;

    if (channel && channelUrl === channel.url) {
      dispatcher({
        type: ON_MESSAGE_DELETED,
        payload: messageId
      });
    }
  }));
  return subscriber;
};
var getParsedStatus = function getParsedStatus(message, currentGroupChannel) {
  if (message.requestState === FAILED) {
    return MessageStatusType.FAILED;
  }

  if (message.requestState === PENDING) {
    return MessageStatusType.PENDING;
  }

  if (message.requestState === SUCCEEDED) {
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
var isOperator = function isOperator() {
  var groupChannel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var myRole = groupChannel.myRole;
  return myRole === 'operator';
};
var isDisabledBecauseFrozen = function isDisabledBecauseFrozen() {
  var groupChannel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var isFrozen = groupChannel.isFrozen;
  return isFrozen && !isOperator(groupChannel);
};
var isDisabledBecauseMuted = function isDisabledBecauseMuted() {
  var groupChannel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var myMutedState = groupChannel.myMutedState;
  return myMutedState === 'muted';
};
var getEmojiCategoriesFromEmojiContainer = function getEmojiCategoriesFromEmojiContainer() {
  var emojiContainer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return emojiContainer.emojiCategories ? emojiContainer.emojiCategories : [];
};
var getAllEmojisFromEmojiContainer = function getAllEmojisFromEmojiContainer() {
  var emojiContainer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _emojiContainer$emoji = emojiContainer.emojiCategories,
      emojiCategories = _emojiContainer$emoji === void 0 ? [] : _emojiContainer$emoji;
  var allEmojis = [];

  for (var categoryIndex = 0; categoryIndex < emojiCategories.length; categoryIndex += 1) {
    var emojis = emojiCategories[categoryIndex].emojis;

    for (var emojiIndex = 0; emojiIndex < emojis.length; emojiIndex += 1) {
      allEmojis.push(emojis[emojiIndex]);
    }
  }

  return allEmojis;
};
var getEmojisFromEmojiContainer = function getEmojisFromEmojiContainer() {
  var emojiContainer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var emojiCategoryId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return emojiContainer.emojiCategories ? emojiContainer.emojiCategories.filter(function (emojiCategory) {
    return emojiCategory.id === emojiCategoryId;
  })[0].emojis : [];
};
var getAllEmojisMapFromEmojiContainer = function getAllEmojisMapFromEmojiContainer() {
  var emojiContainer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _emojiContainer$emoji2 = emojiContainer.emojiCategories,
      emojiCategories = _emojiContainer$emoji2 === void 0 ? [] : _emojiContainer$emoji2;
  var allEmojisMap = new Map();

  for (var categoryIndex = 0; categoryIndex < emojiCategories.length; categoryIndex += 1) {
    var emojis = emojiCategories[categoryIndex].emojis;

    for (var emojiIndex = 0; emojiIndex < emojis.length; emojiIndex += 1) {
      var _emojis$emojiIndex = emojis[emojiIndex],
          key = _emojis$emojiIndex.key,
          url = _emojis$emojiIndex.url;
      allEmojisMap.set(key, url);
    }
  }

  return allEmojisMap;
};
var getNicknamesMapFromMembers = function getNicknamesMapFromMembers() {
  var members = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var nicknamesMap = new Map();

  for (var memberIndex = 0; memberIndex < members.length; memberIndex += 1) {
    var _members$memberIndex = members[memberIndex],
        userId = _members$memberIndex.userId,
        nickname = _members$memberIndex.nickname;
    nicknamesMap.set(userId, nickname);
  }

  return nicknamesMap;
};
var getMessageCreatedAt$1 = function getMessageCreatedAt(message) {
  return format(message.createdAt, 'p');
};
var isSameGroup = function isSameGroup(message, comparingMessage) {
  if (!message || !comparingMessage || !message.sender || !comparingMessage.sender || !message.createdAt || !comparingMessage.createdAt || !message.sender.userId || !comparingMessage.sender.userId) {
    return false;
  }

  return message.sendingStatus === comparingMessage.sendingStatus && message.sender.userId === comparingMessage.sender.userId && getMessageCreatedAt$1(message) === getMessageCreatedAt$1(comparingMessage);
};
var compareMessagesForGrouping = function compareMessagesForGrouping(prevMessage, currMessage, nextMessage) {
  return [isSameGroup(prevMessage, currMessage), isSameGroup(currMessage, nextMessage)];
};
var passUnsuccessfullMessages = function passUnsuccessfullMessages(allMessages, newMessage) {
  var _newMessage$sendingSt = newMessage.sendingStatus,
      sendingStatus = _newMessage$sendingSt === void 0 ? UNDEFINED : _newMessage$sendingSt;

  if (sendingStatus === SUCCEEDED || sendingStatus === PENDING) {
    var lastIndexOfSucceededMessage = allMessages.map(function (message) {
      return message.sendingStatus || (message.isAdminMessage && message.isAdminMessage() ? SUCCEEDED : UNDEFINED);
    }).lastIndexOf(SUCCEEDED);

    if (lastIndexOfSucceededMessage + 1 < allMessages.length) {
      var messages = _toConsumableArray(allMessages);

      messages.splice(lastIndexOfSucceededMessage + 1, 0, newMessage);
      return messages;
    }
  }

  return [].concat(_toConsumableArray(allMessages), [newMessage]);
};

var messagesInitialState = {
  initialized: false,
  loading: false,
  allMessages: [],
  currentGroupChannel: {
    members: []
  },
  hasMore: false,
  lastMessageTimeStamp: 0,
  emojiContainer: {},
  readStatus: {},
  unreadCount: 0,
  unreadSince: null,
  isInvalid: false
};

var isEmpty$1 = function isEmpty(val) {
  return val === null || val === undefined;
}; // Some Ids return string and number inconsistently
// only use to comapre IDs


function compareIds (a, b) {
  if (isEmpty$1(a) || isEmpty$1(b)) {
    return false;
  }

  var aString = a.toString();
  var bString = b.toString();
  return aString === bString;
}

var SUCCEEDED$1 = SendingMessageStatus.SUCCEEDED,
    FAILED$1 = SendingMessageStatus.FAILED,
    PENDING$1 = SendingMessageStatus.PENDING;
function reducer$3(state, action) {
  switch (action.type) {
    case RESET_STATE:
      return messagesInitialState;

    case RESET_MESSAGES:
      return _objectSpread2({}, state, {
        // when user switches channel, if the previous channel `hasMore`
        // the onScroll gets called twice, setting hasMore false prevents this
        hasMore: false,
        allMessages: []
      });

    case GET_PREV_MESSAGES_START:
      return _objectSpread2({}, state, {
        loading: true
      });

    case CLEAR_SENT_MESSAGES:
      return _objectSpread2({}, state, {
        allMessages: _toConsumableArray(state.allMessages.filter(function (m) {
          return m.sendingStatus !== SUCCEEDED$1;
        }))
      });

    case GET_PREV_MESSAGES_SUCESS:
      {
        var recivedMessages = action.payload.messages || [];
        var _action$payload$curre = action.payload.currentGroupChannel,
            currentGroupChannel = _action$payload$curre === void 0 ? {} : _action$payload$curre;
        var stateChannel = state.currentGroupChannel || {};
        var stateChannelUrl = stateChannel.url;
        var actionChannelUrl = currentGroupChannel.url;

        if (actionChannelUrl !== stateChannelUrl) {
          return state;
        } // remove duplicate messages


        var filteredAllMessages = state.allMessages.filter(function (msg) {
          return !recivedMessages.find(function (_ref) {
            var messageId = _ref.messageId;
            return compareIds(messageId, msg.messageId);
          });
        });
        return _objectSpread2({}, state, {
          loading: false,
          initialized: true,
          hasMore: action.payload.hasMore,
          lastMessageTimeStamp: action.payload.lastMessageTimeStamp,
          allMessages: [].concat(_toConsumableArray(recivedMessages), _toConsumableArray(filteredAllMessages))
        });
      }

    case SEND_MESSAGEGE_START:
      return _objectSpread2({}, state, {
        allMessages: [].concat(_toConsumableArray(state.allMessages), [_objectSpread2({}, action.payload)])
      });

    case SEND_MESSAGEGE_SUCESS:
      {
        var newMessages = state.allMessages.map(function (m) {
          return compareIds(m.reqId, action.payload.reqId) ? action.payload : m;
        });

        _toConsumableArray(newMessages).sort(function (a, b) {
          return a.sendingStatus && b.sendingStatus && a.sendingStatus === SUCCEEDED$1 && (b.sendingStatus === PENDING$1 || b.sendingStatus === FAILED$1) ? -1 : 1;
        });

        return _objectSpread2({}, state, {
          allMessages: newMessages
        });
      }

    case SEND_MESSAGEGE_FAILURE:
      {
        // eslint-disable-next-line no-param-reassign
        action.payload.failed = true;
        return _objectSpread2({}, state, {
          allMessages: state.allMessages.map(function (m) {
            return compareIds(m.reqId, action.payload.reqId) ? action.payload : m;
          })
        });
      }

    case SET_CURRENT_CHANNEL$1:
      {
        return _objectSpread2({}, state, {
          currentGroupChannel: action.payload,
          isInvalid: false
        });
      }

    case SET_CHANNEL_INVALID:
      {
        return _objectSpread2({}, state, {
          isInvalid: true
        });
      }

    case ON_MESSAGE_RECEIVED:
      {
        var _action$payload = action.payload,
            channel = _action$payload.channel,
            message = _action$payload.message,
            scrollToEnd = _action$payload.scrollToEnd;
        var unreadCount = 0;

        var _state$currentGroupCh = state.currentGroupChannel,
            _currentGroupChannel = _state$currentGroupCh === void 0 ? {} : _state$currentGroupCh,
            unreadSince = state.unreadSince;

        var currentGroupChannelUrl = _currentGroupChannel.url;

        if (!compareIds(channel.url, currentGroupChannelUrl)) {
          return state;
        }

        unreadCount = state.unreadCount + 1; // reset unreadCount if have to scrollToEnd

        if (scrollToEnd) {
          unreadCount = 0;
        } // Excluded overlapping messages


        if (!(state.allMessages.map(function (msg) {
          return msg.messageId;
        }).indexOf(message.messageId) < 0)) {
          return state;
        }

        if (message.isAdminMessage && message.isAdminMessage()) {
          return _objectSpread2({}, state, {
            allMessages: passUnsuccessfullMessages(state.allMessages, message)
          });
        }

        return _objectSpread2({}, state, {
          unreadCount: unreadCount,
          unreadSince: unreadCount === 1 ? format(new Date(), 'p MMM dd') : unreadSince,
          allMessages: passUnsuccessfullMessages(state.allMessages, message)
        });
      }

    case ON_MESSAGE_UPDATED:
      return _objectSpread2({}, state, {
        allMessages: state.allMessages.map(function (m) {
          return compareIds(m.messageId, action.payload.messageId) ? action.payload : m;
        })
      });

    case RESEND_MESSAGEGE_START:
      return _objectSpread2({}, state, {
        allMessages: state.allMessages.map(function (m) {
          return compareIds(m.reqId, action.payload.reqId) ? action.payload : m;
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

    case ON_MESSAGE_DELETED_BY_REQ_ID:
      return _objectSpread2({}, state, {
        allMessages: state.allMessages.filter(function (m) {
          return !compareIds(m.reqId, action.payload);
        })
      });

    case SET_EMOJI_CONTAINER:
      {
        return _objectSpread2({}, state, {
          emojiContainer: action.payload
        });
      }

    case SET_READ_STATUS:
      {
        return _objectSpread2({}, state, {
          readStatus: action.payload
        });
      }

    case ON_REACTION_UPDATED:
      {
        return _objectSpread2({}, state, {
          allMessages: state.allMessages.map(function (m) {
            if (compareIds(m.messageId, action.payload.messageId)) {
              if (m.applyReactionEvent && typeof m.applyReactionEvent === 'function') {
                m.applyReactionEvent(action.payload);
              }

              return m;
            }

            return m;
          })
        });
      }

    default:
      return state;
  }
}

/**
 * Handles ChannelEvents and send values to dispatcher using messagesDispatcher
 * messagesDispatcher: Dispatcher
 * sdk: sdkInstance
 * logger: loggerInstance
 * channelUrl: string
 * sdkInit: bool
 */

function useHandleChannelEvents(_ref, _ref2) {
  var currentGroupChannel = _ref.currentGroupChannel,
      sdkInit = _ref.sdkInit;
  var messagesDispatcher = _ref2.messagesDispatcher,
      sdk = _ref2.sdk,
      logger = _ref2.logger,
      scrollRef = _ref2.scrollRef;
  var channelUrl = currentGroupChannel && currentGroupChannel.url;
  useEffect(function () {
    var messageReciverId = uuidv4();

    if (channelUrl && sdk && sdk.ChannelHandler) {
      var ChannelHandler = new sdk.ChannelHandler();
      logger.info('Channel | useHandleChannelEvents: Setup event handler', messageReciverId);

      ChannelHandler.onMessageReceived = function (channel, message) {
        if (compareIds(channel.url, currentGroupChannel.url)) {
          logger.info('Channel | useHandleChannelEvents: onMessageReceived', message);
          var scrollToEnd = false;

          try {
            var current = scrollRef.current;
            scrollToEnd = current.offsetHeight + current.scrollTop >= current.scrollHeight;
          } catch (error) {//
          }

          messagesDispatcher({
            type: ON_MESSAGE_RECEIVED,
            payload: {
              channel: channel,
              message: message,
              scrollToEnd: scrollToEnd
            }
          });

          if (scrollToEnd) {
            try {
              setTimeout(function () {
                currentGroupChannel.markAsRead();
                scrollIntoLast('.sendbird-msg--scroll-ref');
              });
            } catch (error) {
              logger.warn('Channel | onMessageReceived | scroll to end failed');
            }
          }
        }
      };

      ChannelHandler.onMessageUpdated = function (_, message) {
        logger.info('Channel | useHandleChannelEvents: onMessageUpdated', message);
        messagesDispatcher({
          type: ON_MESSAGE_UPDATED,
          payload: message
        });
      };

      ChannelHandler.onMessageDeleted = function (_, messageId) {
        logger.info('Channel | useHandleChannelEvents: onMessageDeleted', messageId);
        messagesDispatcher({
          type: ON_MESSAGE_DELETED,
          payload: messageId
        });
      };

      ChannelHandler.onReactionUpdated = function (_, reactionEvent) {
        logger.info('Channel | useHandleChannelEvents: onReactionUpdated', reactionEvent);
        messagesDispatcher({
          type: ON_REACTION_UPDATED,
          payload: reactionEvent
        });
      };

      ChannelHandler.onChannelChanged = function (groupChannel) {
        if (compareIds(groupChannel.url, currentGroupChannel.url)) {
          logger.info('Channel | useHandleChannelEvents: onChannelChanged', groupChannel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL$1,
            payload: groupChannel
          });
        }
      };

      ChannelHandler.onChannelFrozen = function (groupChannel) {
        if (compareIds(groupChannel.url, currentGroupChannel.url)) {
          logger.info('Channel | useHandleChannelEvents: onChannelFrozen', groupChannel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL$1,
            payload: groupChannel
          });
        }
      };

      ChannelHandler.onChannelUnfrozen = function (groupChannel) {
        if (compareIds(groupChannel.url, currentGroupChannel.url)) {
          logger.info('Channel | useHandleChannelEvents: onChannelUnFrozen', groupChannel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL$1,
            payload: groupChannel
          });
        }
      };

      ChannelHandler.onUserMuted = function (groupChannel) {
        if (compareIds(groupChannel.url, currentGroupChannel.url)) {
          logger.info('Channel | useHandleChannelEvents: onUserMuted', groupChannel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL$1,
            payload: groupChannel
          });
        }
      };

      ChannelHandler.onUserUnmuted = function (groupChannel) {
        if (compareIds(groupChannel.url, currentGroupChannel.url)) {
          logger.info('Channel | useHandleChannelEvents: onUserUnmuted', groupChannel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL$1,
            payload: groupChannel
          });
        }
      };

      ChannelHandler.onUserBanned = function (groupChannel) {
        if (compareIds(groupChannel.url, currentGroupChannel.url)) {
          logger.info('Channel | useHandleChannelEvents: onUserBanned', groupChannel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL$1,
            payload: groupChannel
          });
        }
      };

      ChannelHandler.onOperatorUpdated = function (groupChannel) {
        if (compareIds(groupChannel.url, currentGroupChannel.url)) {
          logger.info('Channel | useHandleChannelEvents: onOperatorUpdated', groupChannel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL$1,
            payload: groupChannel
          });
        }
      }; // Add this channel event handler to the SendBird object.


      sdk.addChannelHandler(messageReciverId, ChannelHandler);
    }

    return function () {
      if (sdk && sdk.removeChannelHandler) {
        logger.info('Channel | useHandleChannelEvents: Removing message reciver handler', messageReciverId);
        sdk.removeChannelHandler(messageReciverId);
      }
    };
  }, [channelUrl, sdkInit]);
}

function useSetChannel(_ref, _ref2) {
  var channelUrl = _ref.channelUrl,
      sdkInit = _ref.sdkInit;
  var messagesDispatcher = _ref2.messagesDispatcher,
      sdk = _ref2.sdk,
      logger = _ref2.logger;
  useEffect(function () {
    if (channelUrl && sdkInit && sdk && sdk.GroupChannel) {
      logger.info('Channel | useSetChannel fetching channel', channelUrl);
      sdk.GroupChannel.getChannel(channelUrl).then(function (groupChannel) {
        logger.info('Channel | useSetChannel fetched channel', groupChannel);
        messagesDispatcher({
          type: SET_CURRENT_CHANNEL$1,
          payload: groupChannel
        });
        logger.info('Channel: Mark as read', groupChannel); // this order is important - this mark as read should update the event handler up above

        groupChannel.markAsRead();
      }).catch(function (e) {
        logger.warning('Channel | useSetChannel fetch channel failed', {
          channelUrl: channelUrl,
          e: e
        });
        messagesDispatcher({
          type: SET_CHANNEL_INVALID
        });
      });
      sdk.getAllEmoji(function (emojiContainer_, err) {
        if (err) {
          logger.error('Channel: Getting emojis failed', err);
          return;
        }

        logger.info('Channel: Getting emojis success', emojiContainer_);
        messagesDispatcher({
          type: SET_EMOJI_CONTAINER,
          payload: emojiContainer_
        });
      });
    }
  }, [channelUrl, sdkInit]);
}

function useInitialMessagesFetch(_ref, _ref2) {
  var currentGroupChannel = _ref.currentGroupChannel,
      userFilledMessageListQuery = _ref.userFilledMessageListQuery;
  var sdk = _ref2.sdk,
      logger = _ref2.logger,
      messagesDispatcher = _ref2.messagesDispatcher;
  var channelUrl = currentGroupChannel && currentGroupChannel.url;
  useEffect(function () {
    logger.info('Channel useInitialMessagesFetch: Setup started', currentGroupChannel);
    messagesDispatcher({
      type: RESET_MESSAGES
    });

    if (sdk && sdk.MessageListParams && currentGroupChannel && currentGroupChannel.getMessagesByMessageId) {
      var messageListParams = new sdk.MessageListParams();
      messageListParams.prevResultSize = 30;
      messageListParams.isInclusive = true;
      messageListParams.includeReplies = false;
      messageListParams.includeReaction = true;

      if (userFilledMessageListQuery) {
        Object.keys(userFilledMessageListQuery).forEach(function (key) {
          messageListParams[key] = userFilledMessageListQuery[key];
        });
      }

      logger.info('Channel: Fetching messages', {
        currentGroupChannel: currentGroupChannel,
        userFilledMessageListQuery: userFilledMessageListQuery
      });
      currentGroupChannel.getMessagesByTimestamp(new Date().getTime(), messageListParams).then(function (messages) {
        var hasMore = messages && messages.length > 0;
        var lastMessageTimeStamp = hasMore ? messages[0].createdAt : null;
        messagesDispatcher({
          type: GET_PREV_MESSAGES_SUCESS,
          payload: {
            messages: messages,
            hasMore: hasMore,
            lastMessageTimeStamp: lastMessageTimeStamp,
            currentGroupChannel: currentGroupChannel
          }
        });
      }).catch(function (error) {
        logger.error('Channel: Fetching messages failed', error);
        messagesDispatcher({
          type: GET_PREV_MESSAGES_SUCESS,
          payload: {
            messages: [],
            hasMore: false,
            lastMessageTimeStamp: 0,
            currentGroupChannel: currentGroupChannel
          }
        });
      }).finally(function () {
        currentGroupChannel.markAsRead();
        setTimeout(function () {
          return scrollIntoLast('.sendbird-msg--scroll-ref');
        });
      });
    }
  }, [channelUrl, userFilledMessageListQuery]);
}

function useHandleReconnect(_ref, _ref2) {
  var isOnline = _ref.isOnline;
  var logger = _ref2.logger,
      sdk = _ref2.sdk,
      currentGroupChannel = _ref2.currentGroupChannel,
      messagesDispatcher = _ref2.messagesDispatcher,
      userFilledMessageListQuery = _ref2.userFilledMessageListQuery;
  useEffect(function () {
    var wasOffline = !isOnline;
    return function () {
      // state changed from offline to online
      if (wasOffline) {
        logger.info('Refreshing conversation state');
        var _sdk$appInfo = sdk.appInfo,
            appInfo = _sdk$appInfo === void 0 ? {} : _sdk$appInfo;
        var useReaction = appInfo.isUsingReaction || false;
        var messageListParams = new sdk.MessageListParams();
        messageListParams.prevResultSize = 30;
        messageListParams.includeReplies = false;
        messageListParams.includeReaction = useReaction;

        if (userFilledMessageListQuery) {
          Object.keys(userFilledMessageListQuery).forEach(function (key) {
            messageListParams[key] = userFilledMessageListQuery[key];
          });
        }

        logger.info('Channel: Fetching messages', {
          currentGroupChannel: currentGroupChannel,
          userFilledMessageListQuery: userFilledMessageListQuery
        });
        messagesDispatcher({
          type: GET_PREV_MESSAGES_START
        });
        sdk.GroupChannel.getChannel(currentGroupChannel.url).then(function (groupChannel) {
          var lastMessageTime = new Date().getTime();
          groupChannel.getMessagesByTimestamp(lastMessageTime, messageListParams).then(function (messages) {
            messagesDispatcher({
              type: CLEAR_SENT_MESSAGES
            });
            var hasMore = messages && messages.length > 0;
            var lastMessageTimeStamp = hasMore ? messages[0].createdAt : null;
            messagesDispatcher({
              type: GET_PREV_MESSAGES_SUCESS,
              payload: {
                messages: messages,
                hasMore: hasMore,
                lastMessageTimeStamp: lastMessageTimeStamp,
                currentGroupChannel: currentGroupChannel
              }
            });
            setTimeout(function () {
              return scrollIntoLast('.sendbird-msg--scroll-ref');
            });
          }).catch(function (error) {
            logger.error('Channel: Fetching messages failed', error);
          }).finally(function () {
            currentGroupChannel.markAsRead();
          });
        });
      }
    };
  }, [isOnline]);
}

function useScrollCallback(_ref, _ref2) {
  var currentGroupChannel = _ref.currentGroupChannel,
      lastMessageTimeStamp = _ref.lastMessageTimeStamp,
      userFilledMessageListQuery = _ref.userFilledMessageListQuery;
  var hasMore = _ref2.hasMore,
      logger = _ref2.logger,
      messagesDispatcher = _ref2.messagesDispatcher,
      sdk = _ref2.sdk;
  return useCallback(function (cb) {
    if (!hasMore) {
      return;
    }

    var messageListParams = new sdk.MessageListParams();
    messageListParams.prevResultSize = 30;
    messageListParams.includeReplies = false;
    messageListParams.includeReaction = true;

    if (userFilledMessageListQuery) {
      Object.keys(userFilledMessageListQuery).forEach(function (key) {
        messageListParams[key] = userFilledMessageListQuery[key];
      });
    }

    logger.info('Channel: Fetching messages', {
      currentGroupChannel: currentGroupChannel,
      userFilledMessageListQuery: userFilledMessageListQuery
    });
    currentGroupChannel.getMessagesByTimestamp(lastMessageTimeStamp || new Date().getTime(), messageListParams).then(function (messages) {
      var hasMoreMessages = messages && messages.length > 0;
      var lastMessageTs = hasMoreMessages ? messages[0].createdAt : null;
      messagesDispatcher({
        type: GET_PREV_MESSAGES_SUCESS,
        payload: {
          messages: messages,
          hasMore: hasMoreMessages,
          lastMessageTimeStamp: lastMessageTs,
          currentGroupChannel: currentGroupChannel
        }
      });
      cb([messages, null]);
    }).catch(function (error) {
      logger.error('Channel: Fetching messages failed', error);
      messagesDispatcher({
        type: GET_PREV_MESSAGES_SUCESS,
        payload: {
          messages: [],
          hasMore: false,
          lastMessageTimeStamp: 0,
          currentGroupChannel: currentGroupChannel
        }
      });
      cb([null, error]);
    }).finally(function () {
      currentGroupChannel.markAsRead();
    });
  }, [currentGroupChannel, lastMessageTimeStamp]);
}

function useDeleteMessageCallback(_ref, _ref2) {
  var currentGroupChannel = _ref.currentGroupChannel,
      messagesDispatcher = _ref.messagesDispatcher;
  var logger = _ref2.logger;
  return useCallback(function (message, cb) {
    logger.info('Channel | useDeleteMessageCallback: Deleting message', message);
    var requestState = message.requestState;
    logger.info('Channel | useDeleteMessageCallback: Deleting message requestState:', requestState); // Message is only on local

    if (requestState === 'failed' || requestState === 'pending') {
      logger.info('Channel | useDeleteMessageCallback: Deleted message from local:', message);
      messagesDispatcher({
        type: ON_MESSAGE_DELETED_BY_REQ_ID,
        payload: message.reqId
      });

      if (cb) {
        cb();
      }

      return;
    } // Message is on server


    currentGroupChannel.deleteMessage(message, function (err) {
      logger.info('Channel | useDeleteMessageCallback: Deleting message from remote:', requestState);

      if (cb) {
        cb(err);
      }

      if (!err) {
        logger.info('Channel | useDeleteMessageCallback: Deleting message success!', message);
        messagesDispatcher({
          type: ON_MESSAGE_DELETED,
          payload: message.messageId
        });
      } else {
        logger.warning('Channel | useDeleteMessageCallback: Deleting message failed!', err);
      }
    });
  }, [currentGroupChannel, messagesDispatcher]);
}

function useUpdateMessageCallback(_ref, _ref2) {
  var currentGroupChannel = _ref.currentGroupChannel,
      messagesDispatcher = _ref.messagesDispatcher,
      onBeforeUpdateUserMessage = _ref.onBeforeUpdateUserMessage;
  var logger = _ref2.logger,
      pubSub = _ref2.pubSub,
      sdk = _ref2.sdk;
  return useCallback(function (messageId, text, cb) {
    var createParamsDefault = function createParamsDefault(txt) {
      var params = new sdk.UserMessageParams();
      params.message = txt;
      return params;
    };

    var createCustomPrams = onBeforeUpdateUserMessage && typeof onBeforeUpdateUserMessage === 'function';

    if (createCustomPrams) {
      logger.info('Channel: creting params using onBeforeUpdateUserMessage', onBeforeUpdateUserMessage);
    }

    var params = onBeforeUpdateUserMessage ? onBeforeUpdateUserMessage(text) : createParamsDefault(text);
    currentGroupChannel.updateUserMessage(messageId, params, function (r, e) {
      logger.info('Channel: Updating message!', params);
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
        logger.info('Channel: Updating message success!', message);
        messagesDispatcher({
          type: ON_MESSAGE_UPDATED,
          payload: message
        });
        pubSub.publish(UPDATE_USER_MESSAGE, {
          message: message,
          channel: currentGroupChannel
        });
      } else {
        logger.warning('Channel: Updating message failed!', err);
      }
    });
  }, [currentGroupChannel.url, messagesDispatcher, onBeforeUpdateUserMessage]);
}

function useResendMessageCallback(_ref, _ref2) {
  var currentGroupChannel = _ref.currentGroupChannel,
      messagesDispatcher = _ref.messagesDispatcher;
  var logger = _ref2.logger;
  return useCallback(function (failedMessage) {
    logger.info('Channel: Resending message has started', failedMessage);
    var messageType = failedMessage.messageType,
        file = failedMessage.file;

    if (failedMessage && typeof failedMessage.isResendable === 'function' && failedMessage.isResendable()) {
      // eslint-disable-next-line no-param-reassign
      failedMessage.requestState = 'pending';
      messagesDispatcher({
        type: RESEND_MESSAGEGE_START,
        payload: failedMessage
      }); // userMessage

      if (messageType === 'user') {
        currentGroupChannel.resendUserMessage(failedMessage).then(function (message) {
          logger.info('Channel: Resending message success!', {
            message: message
          });
          messagesDispatcher({
            type: SEND_MESSAGEGE_SUCESS,
            payload: message
          });
        }).catch(function (e) {
          logger.warning('Channel: Resending message failed!', {
            e: e
          }); // eslint-disable-next-line no-param-reassign

          failedMessage.requestState = 'failed';
          messagesDispatcher({
            type: SEND_MESSAGEGE_FAILURE,
            payload: failedMessage
          });
        }); // eslint-disable-next-line no-param-reassign

        failedMessage.requestState = 'pending';
        messagesDispatcher({
          type: RESEND_MESSAGEGE_START,
          payload: failedMessage
        });
        return;
      }

      if (messageType === 'file') {
        currentGroupChannel.resendFileMessage(failedMessage, file).then(function (message) {
          logger.info('Channel: Resending file message success!', {
            message: message
          });
          messagesDispatcher({
            type: SEND_MESSAGEGE_SUCESS,
            payload: message
          });
        }).catch(function (e) {
          logger.warning('Channel: Resending file message failed!', {
            e: e
          }); // eslint-disable-next-line no-param-reassign

          failedMessage.requestState = 'failed';
          messagesDispatcher({
            type: SEND_MESSAGEGE_FAILURE,
            payload: failedMessage
          });
        }); // eslint-disable-next-line no-param-reassign

        failedMessage.requestState = 'pending';
        messagesDispatcher({
          type: RESEND_MESSAGEGE_START,
          payload: failedMessage
        });
      }
    } else {
      // to alert user on console
      // eslint-disable-next-line no-console
      console.error('Message is not resendable');
      logger.warning('Message is not resendable', failedMessage);
    }
  }, [currentGroupChannel, messagesDispatcher]);
}

function useSendMessageCallback(_ref, _ref2) {
  var currentGroupChannel = _ref.currentGroupChannel,
      onBeforeSendUserMessage = _ref.onBeforeSendUserMessage;
  var sdk = _ref2.sdk,
      logger = _ref2.logger,
      pubSub = _ref2.pubSub,
      messagesDispatcher = _ref2.messagesDispatcher;
  var messageInputRef = useRef(null);
  var sendMessage = useCallback(function () {
    var text = messageInputRef.current.value;

    var createParamsDefault = function createParamsDefault(txt) {
      var message = typeof txt === 'string' ? txt.trim() : txt;
      var params = new sdk.UserMessageParams();
      params.message = message;
      return params;
    };

    var createCustomPrams = onBeforeSendUserMessage && typeof onBeforeSendUserMessage === 'function';

    if (createCustomPrams) {
      logger.info('Channel: creting params using onBeforeSendUserMessage', onBeforeSendUserMessage);
    }

    var params = onBeforeSendUserMessage ? onBeforeSendUserMessage(text) : createParamsDefault(text);
    logger.info('Channel: Sending message has started', params);
    var pendingMsg = currentGroupChannel.sendUserMessage(params, function (res, err) {
      var swapParams = sdk.getErrorFirstCallback();
      var message = res;
      var error = err;

      if (swapParams) {
        message = err;
        error = res;
      } // sending params instead of pending message
      // to make sure that we can resend the message once it fails


      if (error) {
        logger.warning('Channel: Sending message failed!', {
          message: message
        });
        messagesDispatcher({
          type: SEND_MESSAGEGE_FAILURE,
          payload: message
        });
        return;
      }

      logger.info('Channel: Sending message success!', message);
      messagesDispatcher({
        type: SEND_MESSAGEGE_SUCESS,
        payload: message
      });
    });
    pubSub.publish(SEND_MESSAGE_START, {
      /* pubSub is used instead of messagesDispatcher
        to avoid redundantly calling `messageActionTypes.SEND_MESSAGEGE_START` */
      message: pendingMsg,
      channel: currentGroupChannel
    });
    setTimeout(function () {
      return scrollIntoLast('.sendbird-msg--scroll-ref');
    });
  }, [currentGroupChannel, onBeforeSendUserMessage]);
  return [messageInputRef, sendMessage];
}

function useSendFileMessageCallback(_ref, _ref2) {
  var currentGroupChannel = _ref.currentGroupChannel,
      onBeforeSendFileMessage = _ref.onBeforeSendFileMessage;
  var sdk = _ref2.sdk,
      logger = _ref2.logger,
      pubSub = _ref2.pubSub,
      messagesDispatcher = _ref2.messagesDispatcher;
  var sendMessage = useCallback(function (file) {
    var createParamsDefault = function createParamsDefault(file_) {
      var params = new sdk.FileMessageParams();
      params.file = file_;
      return params;
    };

    var createCustomPrams = onBeforeSendFileMessage && typeof onBeforeSendFileMessage === 'function';

    if (createCustomPrams) {
      logger.info('Channel: creting params using onBeforeSendFileMessage', onBeforeSendFileMessage);
    }

    var params = onBeforeSendFileMessage ? onBeforeSendFileMessage(file) : createParamsDefault(file);
    logger.info('Channel: Uploading file message start!', params);
    var pendingMsg = currentGroupChannel.sendFileMessage(params, function (response, err) {
      var swapParams = sdk.getErrorFirstCallback();
      var message = response;
      var error = err;

      if (swapParams) {
        message = err;
        error = response;
      }

      if (error) {
        // sending params instead of pending message
        // to make sure that we can resend the message once it fails
        logger.error('Channel: Sending file message failed!', message);
        message.localUrl = URL.createObjectURL(file);
        message.file = file;
        messagesDispatcher({
          type: SEND_MESSAGEGE_FAILURE,
          payload: message
        });
        return;
      }

      logger.info('Channel: Sending message success!', message);
      messagesDispatcher({
        type: SEND_MESSAGEGE_SUCESS,
        payload: message
      });
    });
    pubSub.publish(SEND_MESSAGE_START, {
      /* pubSub is used instead of messagesDispatcher
        to avoid redundantly calling `messageActionTypes.SEND_MESSAGEGE_START` */
      message: _objectSpread2({}, pendingMsg, {
        url: URL.createObjectURL(file),
        // pending thumbnail message seems to be failed
        requestState: 'pending'
      }),
      channel: currentGroupChannel
    });
    setTimeout(function () {
      return scrollIntoLast('.sendbird-msg--scroll-ref');
    }, 1000);
  }, [currentGroupChannel, onBeforeSendFileMessage]);
  return [sendMessage];
}

function useSetReadStatus(_ref, _ref2) {
  var allMessages = _ref.allMessages,
      currentGroupChannel = _ref.currentGroupChannel;
  var messagesDispatcher = _ref2.messagesDispatcher,
      sdk = _ref2.sdk,
      logger = _ref2.logger;
  useEffect(function () {
    if (!sdk.ChannelHandler || !currentGroupChannel.url) {
      return function () {};
    } // todo: move to reducer?


    var setReadStatus = function setReadStatus() {
      var allReadStatus = allMessages.reduce(function (accumulator, msg) {
        if (msg.messageId !== 0) {
          return _objectSpread2({}, accumulator, _defineProperty({}, msg.messageId, getParsedStatus(msg, currentGroupChannel)));
        }

        return accumulator;
      }, {});
      messagesDispatcher({
        type: SET_READ_STATUS,
        payload: allReadStatus
      });
    };

    if (allMessages.length > 0) {
      setReadStatus();
    }

    var channelUrl = currentGroupChannel.url;
    var handler = new sdk.ChannelHandler();

    var handleMessageStatus = function handleMessageStatus(c) {
      if (channelUrl === c.url) {
        setReadStatus();
      }
    };

    handler.onDeliveryReceiptUpdated = handleMessageStatus;
    handler.onReadReceiptUpdated = handleMessageStatus; // Add this channel event handler to the SendBird object.

    var handlerId = uuidv4();
    logger.info('Channel | useSetReadStatus: Removing message reciver handler', handlerId);
    sdk.addChannelHandler(handlerId, handler);
    return function () {
      if (sdk && sdk.removeChannelHandler) {
        logger.info('Channel | useSetReadStatus: Removing message reciver handler', handlerId);
        sdk.removeChannelHandler(handlerId);
      }
    };
  }, [allMessages, currentGroupChannel]);
}

var ReactionButton = React.forwardRef(function (props, ref) {
  var children = props.children,
      width = props.width,
      height = props.height,
      _onClick = props.onClick,
      selected = props.selected,
      className = props.className;
  var injectingClassName = Array.isArray(className) ? className : [className];
  return React.createElement("div", {
    ref: ref,
    className: "sendbird-reaction-button".concat(selected ? '--selected' : '', " ").concat(injectingClassName.join(' ')),
    style: {
      width: typeof width === 'string' ? "".concat(width.slice(0, -2) - 2, "px") : "".concat(width - 2, "px"),
      height: typeof height === 'string' ? "".concat(height.slice(0, -2) - 2, "px") : "".concat(height - 2, "px")
    },
    onClick: function onClick(e) {
      return _onClick(e);
    },
    role: "button",
    onKeyDown: function onKeyDown(e) {
      return _onClick(e);
    },
    tabIndex: 0
  }, React.createElement("div", {
    className: "sendbird-reaction-button__inner"
  }, children));
});
ReactionButton.propTypes = {
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
};
ReactionButton.defaultProps = {
  selected: false,
  width: '36px',
  height: '36px',
  onClick: function onClick() {},
  className: ''
};

function useMemoizedEmojiListItems(_ref, _ref2) {
  var emojiContainer = _ref.emojiContainer,
      toggleReaction = _ref.toggleReaction;
  var useReaction = _ref2.useReaction,
      logger = _ref2.logger,
      userId = _ref2.userId,
      emojiAllList = _ref2.emojiAllList;
  return useMemo(function () {
    return function (_ref3) {
      var parentRef = _ref3.parentRef,
          parentContainRef = _ref3.parentContainRef,
          message = _ref3.message,
          closeDropdown = _ref3.closeDropdown,
          _ref3$spaceFromTrigge = _ref3.spaceFromTrigger,
          spaceFromTrigger = _ref3$spaceFromTrigge === void 0 ? {} : _ref3$spaceFromTrigge;

      if (!useReaction || !(parentRef || parentContainRef || message || closeDropdown)) {
        logger.warning('Channel: Invalid Params in memoizedEmojiListItems');
        return null;
      }

      return React.createElement(EmojiListItems$1, {
        parentRef: parentRef,
        parentContainRef: parentContainRef,
        closeDropdown: closeDropdown,
        spaceFromTrigger: spaceFromTrigger
      }, emojiAllList.map(function (emoji) {
        var reactedReaction = message.reactions.filter(function (reaction) {
          return reaction.key === emoji.key;
        })[0];
        var isReacted = reactedReaction ? !(reactedReaction.userIds.indexOf(userId) < 0) : false;
        return React.createElement(ReactionButton, {
          key: emoji.key,
          width: "36px",
          height: "36px",
          selected: isReacted,
          onClick: function onClick() {
            closeDropdown();
            toggleReaction(message, emoji.key, isReacted);
          }
        }, React.createElement(ImageRenderer, {
          url: emoji.url,
          width: "28px",
          height: "28px",
          defaultComponent: React.createElement(Icon, {
            width: "28px",
            height: "28px",
            type: IconTypes.EMOJI_FAILED
          })
        }));
      }));
    };
  }, [emojiContainer, toggleReaction]);
}

function useToggleReactionCallback(_ref, _ref2) {
  var currentGroupChannel = _ref.currentGroupChannel;
  var logger = _ref2.logger;
  return useCallback(function (message, key, isReacted) {
    if (isReacted) {
      currentGroupChannel.deleteReaction(message, key).then(function (res) {
        logger.info('Delete reaction success', res);
      }).catch(function (err) {
        logger.warning('Delete reaction failed', err);
      });
      return;
    }

    currentGroupChannel.addReaction(message, key).then(function (res) {
      logger.info('Add reaction success', res);
    }).catch(function (err) {
      logger.warning('Add reaction failed', err);
    });
  }, [currentGroupChannel]);
}

function MessageStatus(_ref) {
  var message = _ref.message,
      status = _ref.status,
      className = _ref.className;
  var injectingClassName = Array.isArray(className) ? className : [className];

  var label = function label() {
    switch (status) {
      case MessageStatusType.FAILED:
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
  }, icon[status], React.createElement("br", null), label());
}
MessageStatus.propTypes = {
  message: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.array, PropTypes.object])),
  status: PropTypes.string,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
};
MessageStatus.defaultProps = {
  message: null,
  status: '',
  className: ''
};

var ReactionBadge = React.forwardRef(function (props, ref) {
  var className = props.className,
      children = props.children,
      count = props.count,
      selected = props.selected,
      isAdd = props.isAdd,
      onClick = props.onClick;
  var injectingClassName = Array.isArray(className) ? className : [className];

  if (selected && !isAdd) {
    injectingClassName.unshift('sendbird-reaction-badge--selected');
  } else if (isAdd) {
    injectingClassName.push('sendbird-reaction-badge--is-add');
  } else {
    injectingClassName.unshift('sendbird-reaction-badge');
  }

  return React.createElement("div", {
    ref: ref,
    tabIndex: 0,
    role: "button",
    className: injectingClassName.join(' '),
    onClick: onClick,
    onKeyDown: onClick
  }, React.createElement("div", {
    className: "sendbird-reaction-badge__inner"
  }, React.createElement("div", {
    className: "sendbird-reaction-badge__inner__icon"
  }, children), React.createElement(Label, {
    className: children && count ? 'sendbird-reaction-badge__inner__count' : '',
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_1
  }, count)));
});
ReactionBadge.propTypes = {
  children: PropTypes.element.isRequired,
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  selected: PropTypes.bool,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  isAdd: PropTypes.bool,
  onClick: PropTypes.func
};
ReactionBadge.defaultProps = {
  className: '',
  count: '',
  selected: false,
  isAdd: false,
  onClick: function onClick() {}
};

var CLASS_NAME$2 = 'sendbird-tooltip';
function Tooltip(_ref) {
  var className = _ref.className,
      children = _ref.children;
  var injectingClassName = Array.isArray(className) ? className : [className];
  injectingClassName.unshift(CLASS_NAME$2);
  return React.createElement("div", {
    className: injectingClassName.join(' ')
  }, React.createElement(Label, {
    className: "".concat(CLASS_NAME$2, "__text")
  }, children));
}
Tooltip.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.string), PropTypes.string])
};
Tooltip.defaultProps = {
  className: '',
  children: ''
};

var CLASS_NAME$3 = 'sendbird-tooltip-wrapper';
var SPACE_FROM_TRIGGER = 8;
function TooltipWrapper(_ref) {
  var className = _ref.className,
      children = _ref.children,
      hoverTooltip = _ref.hoverTooltip;
  var injectingClassName = Array.isArray(className) ? [CLASS_NAME$3].concat(_toConsumableArray(className)) : [CLASS_NAME$3, className];

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      showHoverTooltip = _useState2[0],
      setShowHoverTooltip = _useState2[1];

  var childrenRef = useRef(null);
  return React.createElement("div", {
    className: injectingClassName.join(' '),
    onMouseOver: function onMouseOver() {
      setShowHoverTooltip(true);
    },
    onFocus: function onFocus() {
      setShowHoverTooltip(true);
    },
    onMouseOut: function onMouseOut() {
      setShowHoverTooltip(false);
    },
    onBlur: function onBlur() {
      setShowHoverTooltip(false);
    }
  }, React.createElement("div", {
    className: "".concat(CLASS_NAME$3, "__children"),
    ref: childrenRef
  }, children), showHoverTooltip && React.createElement("div", {
    className: "".concat(CLASS_NAME$3, "__hover-tooltip"),
    style: {
      bottom: "calc(100% + ".concat(SPACE_FROM_TRIGGER, "px)")
    }
  }, React.createElement("div", {
    className: "".concat(CLASS_NAME$3, "__hover-tooltip__inner")
  }, React.createElement("div", {
    className: "".concat(CLASS_NAME$3, "__hover-tooltip__inner__tooltip-container"),
    style: {
      left: childrenRef.current && "calc(".concat(childrenRef.current.offsetWidth / 2, "px - 50%)")
    }
  }, hoverTooltip))));
}
TooltipWrapper.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  children: PropTypes.element.isRequired,
  hoverTooltip: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
};
TooltipWrapper.defaultProps = {
  className: ''
};

function EmojiReactions(_ref) {
  var className = _ref.className,
      userId = _ref.userId,
      message = _ref.message,
      emojiAllMap = _ref.emojiAllMap,
      membersMap = _ref.membersMap,
      toggleReaction = _ref.toggleReaction,
      memoizedEmojiListItems = _ref.memoizedEmojiListItems;
  var injectingClassName = Array.isArray(className) ? className : [className];
  injectingClassName.unshift('sendbird-emoji-reactions');
  var MemoizedEmojiListItems = memoizedEmojiListItems;
  var imageWidth = '20px';
  var imageHeight = '20px';
  var emojiReactionAddRef = useRef(null);
  var _message$reactions = message.reactions,
      reactions = _message$reactions === void 0 ? [] : _message$reactions;
  var messageReactions = reactions;

  var _useContext = useContext(LocalizationContext),
      stringSet = _useContext.stringSet;

  return React.createElement("div", {
    className: injectingClassName.join(' ')
  }, React.createElement("div", {
    className: "sendbird-emoji-reactions--inner"
  }, messageReactions && messageReactions.map(function (reaction) {
    var _reaction$userIds = reaction.userIds,
        userIds = _reaction$userIds === void 0 ? [] : _reaction$userIds;
    var emojiUrl = emojiAllMap.get(reaction.key) || '';
    var reactedUserCount = userIds.length;
    var reactedByMe = !(userIds.indexOf(userId) < 0);
    var nicknames = userIds.filter(function (currentUserId) {
      return currentUserId !== userId;
    }).map(function (currentUserId) {
      return membersMap.get(currentUserId) || stringSet.TOOLTIP__UNKOWN_USER;
    });
    var stringSetForMe = nicknames.length > 0 ? stringSet.TOOLTIP__AND_YOU : stringSet.TOOLTIP__YOU;
    return React.createElement(TooltipWrapper, {
      className: "sendbird-emoji-reactions__emoji-reaction",
      key: reaction.key,
      hoverTooltip: userIds.length > 0 && React.createElement(Tooltip, null, React.createElement(React.Fragment, null, "".concat(nicknames.join(', ')).concat(reactedByMe ? stringSetForMe : '')))
    }, React.createElement(ReactionBadge, {
      count: reactedUserCount,
      selected: reactedByMe,
      onClick: function onClick() {
        return toggleReaction(message, reaction.key, reactedByMe);
      }
    }, React.createElement(ImageRenderer, {
      circle: true,
      url: emojiUrl,
      width: imageWidth,
      height: imageHeight,
      defaultComponent: React.createElement(Icon, {
        width: imageWidth,
        height: imageHeight,
        type: IconTypes.EMOJI_FAILED
      })
    })));
  }), messageReactions.length < emojiAllMap.size && React.createElement(ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return React.createElement(ReactionBadge, {
        isAdd: true,
        onClick: toggleDropdown,
        className: "sendbird-emoji-reactions__emoji-reaction-add",
        ref: emojiReactionAddRef
      }, React.createElement(Icon, {
        width: imageWidth,
        height: imageHeight,
        fillColor: IconColors.ON_BACKGROUND_3,
        type: IconTypes.EMOJI_REACTIONS_ADD
      }));
    },
    menuItems: function menuItems(closeDropdown) {
      return React.createElement(MemoizedEmojiListItems, {
        message: message,
        parentRef: emojiReactionAddRef,
        parentContainRef: emojiReactionAddRef,
        closeDropdown: closeDropdown,
        spaceFromTrigger: {
          y: 4
        }
      });
    }
  })));
}
EmojiReactions.propTypes = {
  userId: PropTypes.string,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  message: PropTypes.shape({
    reactions: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired,
  emojiAllMap: PropTypes.instanceOf(Map).isRequired,
  membersMap: PropTypes.instanceOf(Map),
  toggleReaction: PropTypes.func,
  memoizedEmojiListItems: PropTypes.func
};
EmojiReactions.defaultProps = {
  className: '',
  membersMap: new Map(),
  userId: '',
  toggleReaction: function toggleReaction() {},
  memoizedEmojiListItems: function memoizedEmojiListItems() {
    return '';
  }
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
var getMessageCreatedAt$2 = function getMessageCreatedAt(message) {
  return format(message.createdAt, 'p');
};
var getSenderName$1 = function getSenderName(message) {
  return message.sender && (message.sender.friendName || message.sender.nickname || message.sender.userId);
};
var getSenderProfileUrl$1 = function getSenderProfileUrl(message) {
  return message.sender && message.sender.profileUrl;
};
var getIsSentFromStatus$1 = function getIsSentFromStatus(status) {
  return status === MessageStatusType.SENT || status === MessageStatusType.DELIVERED || status === MessageStatusType.READ;
};

var WORD_TYPOGRAPHY = LabelTypography.BODY_1;
var EDITED_COLOR = LabelColors.ONBACKGROUND_2;
function useMemoizedMessageText(_ref) {
  var message = _ref.message,
      updatedAt = _ref.updatedAt,
      className = _ref.className;

  var _useContext = useContext(LocalizationContext),
      stringSet = _useContext.stringSet;

  return useMemo(function () {
    return function () {
      var splitMessage = message.split(/\r/);
      var matchedMessage = splitMessage.map(function (word) {
        return word !== '' ? word : React.createElement("br", null);
      });

      if (updatedAt > 0) {
        matchedMessage.push(React.createElement(Label, {
          key: uuidv4(),
          className: className,
          type: WORD_TYPOGRAPHY,
          color: EDITED_COLOR
        }, " ".concat(stringSet.MESSAGE_EDITED, " ")));
      }

      return matchedMessage;
    };
  }, [message, updatedAt, className]);
}

var MOUSE_ENTER = 'mouseenter';
var MOUSE_LEAVE = 'mouseleave';

var useMouseHover = function useMouseHover(_ref) {
  var ref = _ref.ref,
      setHover = _ref.setHover;

  var handleMouseOver = function handleMouseOver() {
    if (ref.current) {
      setHover(true);
    }
  };

  var handleMouseOut = function handleMouseOut() {
    if (ref.current) {
      setHover(false);
    }
  };

  useEffect(function () {
    var current = ref.current;
    current.addEventListener(MOUSE_ENTER, handleMouseOver);
    current.addEventListener(MOUSE_LEAVE, handleMouseOut);
    return function () {
      current.removeEventListener(MOUSE_ENTER, handleMouseOver);
      current.removeEventListener(MOUSE_LEAVE, handleMouseOut);
    };
  });
};

var noop$2 = function noop() {};

var GROUPING_PADDING = '1px';
var NORMAL_PADDING = '8px';
function Message(props) {
  var isByMe = props.isByMe,
      userId = props.userId,
      message = props.message,
      className = props.className,
      resendMessage = props.resendMessage,
      disabled = props.disabled,
      showEdit = props.showEdit,
      showRemove = props.showRemove,
      status = props.status,
      useReaction = props.useReaction,
      emojiAllMap = props.emojiAllMap,
      membersMap = props.membersMap,
      toggleReaction = props.toggleReaction,
      memoizedEmojiListItems = props.memoizedEmojiListItems,
      chainTop = props.chainTop,
      chainBottom = props.chainBottom;
  if (!message) return null;
  var injectingClassName = Array.isArray(className) ? className : [className];
  injectingClassName.push("sendbird-message".concat(isByMe ? '--outgoing' : '--incoming'));
  var memoizedMessageText = useMemoizedMessageText({
    message: message.message,
    updatedAt: message.updatedAt,
    className: 'sendbird-user-message-word'
  });
  return React.createElement("div", {
    className: [].concat(_toConsumableArray(injectingClassName), ['sendbird-message']).join(' ')
  }, isByMe ? React.createElement(OutgoingUserMessage, {
    userId: userId,
    message: message,
    resendMessage: resendMessage,
    disabled: disabled,
    showEdit: showEdit,
    showRemove: showRemove,
    status: status,
    useReaction: useReaction,
    emojiAllMap: emojiAllMap,
    membersMap: membersMap,
    toggleReaction: toggleReaction,
    memoizedMessageText: memoizedMessageText,
    memoizedEmojiListItems: memoizedEmojiListItems,
    chainTop: chainTop,
    chainBottom: chainBottom
  }) : React.createElement(IncomingUserMessage, {
    userId: userId,
    message: message,
    useReaction: useReaction,
    emojiAllMap: emojiAllMap,
    membersMap: membersMap,
    toggleReaction: toggleReaction,
    memoizedMessageText: memoizedMessageText,
    memoizedEmojiListItems: memoizedEmojiListItems,
    chainTop: chainTop,
    chainBottom: chainBottom
  }));
}
Message.propTypes = {
  isByMe: PropTypes.bool,
  disabled: PropTypes.bool,
  userId: PropTypes.string,
  message: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.array, PropTypes.object])).isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  showEdit: PropTypes.func,
  status: PropTypes.string,
  showRemove: PropTypes.func,
  resendMessage: PropTypes.func,
  useReaction: PropTypes.bool.isRequired,
  emojiAllMap: PropTypes.instanceOf(Map),
  membersMap: PropTypes.instanceOf(Map),
  toggleReaction: PropTypes.func,
  memoizedEmojiListItems: PropTypes.func,
  chainTop: PropTypes.bool,
  chainBottom: PropTypes.bool
};
Message.defaultProps = {
  isByMe: false,
  disabled: false,
  userId: '',
  resendMessage: noop$2,
  className: '',
  showEdit: noop$2,
  showRemove: noop$2,
  status: '',
  emojiAllMap: new Map(),
  membersMap: new Map(),
  toggleReaction: noop$2,
  memoizedEmojiListItems: function memoizedEmojiListItems() {
    return '';
  },
  chainTop: false,
  chainBottom: false
};

function OutgoingUserMessage(_ref) {
  var userId = _ref.userId,
      message = _ref.message,
      showEdit = _ref.showEdit,
      disabled = _ref.disabled,
      showRemove = _ref.showRemove,
      status = _ref.status,
      resendMessage = _ref.resendMessage,
      useReaction = _ref.useReaction,
      emojiAllMap = _ref.emojiAllMap,
      membersMap = _ref.membersMap,
      toggleReaction = _ref.toggleReaction,
      memoizedMessageText = _ref.memoizedMessageText,
      memoizedEmojiListItems = _ref.memoizedEmojiListItems,
      chainTop = _ref.chainTop,
      chainBottom = _ref.chainBottom;
  var MemoizedMessageText = memoizedMessageText;
  var MemoizedEmojiListItems = memoizedEmojiListItems; // TODO: when message.requestState is succeeded, consider if it's SENT or DELIVERED

  var messageRef = useRef(null);
  var parentRefReactions = useRef(null);
  var parentRefMenus = useRef(null);
  var parentContainRef = useRef(null);
  var isMessageSent = getIsSentFromStatus$1(status);

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      mousehover = _useState2[0],
      setMousehover = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      moreActive = _useState4[0],
      setMoreActive = _useState4[1];

  var handleMoreIconClick = function handleMoreIconClick() {
    setMoreActive(true);
  };

  var handleMoreIconBlur = function handleMoreIconBlur() {
    setMoreActive(false);
  };

  useMouseHover({
    ref: messageRef,
    setHover: setMousehover
  });
  return React.createElement("div", {
    className: "sendbird-user-message--outgoing",
    ref: messageRef,
    style: {
      paddingTop: chainTop ? GROUPING_PADDING : NORMAL_PADDING,
      paddingBottom: chainBottom ? GROUPING_PADDING : NORMAL_PADDING
    }
  }, React.createElement("div", {
    className: "sendbird-user-message--inner"
  }, React.createElement("div", {
    className: "sendbird-user-message__left-padding"
  }, React.createElement("div", {
    className: "sendbird-user-message__more",
    ref: parentContainRef
  }, React.createElement(ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return React.createElement(IconButton, {
        className: "sendbird-user-message__more__menu",
        ref: parentRefMenus,
        width: "32px",
        height: "32px",
        onClick: function onClick() {
          toggleDropdown();
          handleMoreIconClick();
        },
        onBlur: function onBlur() {
          handleMoreIconBlur();
        }
      }, React.createElement(Icon, {
        width: "24px",
        height: "24px",
        type: IconTypes.MORE,
        fillColor: IconColors.CONTENT_INVERSE
      }));
    },
    menuItems: function menuItems(closeDropdown) {
      return React.createElement(MenuItems$1, {
        parentRef: parentRefMenus // for catching location(x, y) of MenuItems
        ,
        parentContainRef: parentContainRef // for toggling more options(menus & reactions)
        ,
        closeDropdown: closeDropdown,
        openLeft: true
      }, isMessageSent && React.createElement(MenuItem, {
        className: "sendbird-user-message--copy",
        onClick: function onClick() {
          copyToClipboard(message.message);
          closeDropdown();
        }
      }, "Copy"), isMessageSent && React.createElement(MenuItem, {
        onClick: function onClick() {
          if (disabled) {
            return;
          }

          showEdit(true);
          closeDropdown();
        }
      }, "Edit"), message && message.isResendable && message.isResendable() && React.createElement(MenuItem, {
        onClick: function onClick() {
          resendMessage(message);
          closeDropdown();
        }
      }, "Resend"), React.createElement(MenuItem, {
        onClick: function onClick() {
          if (disabled) {
            return;
          }

          showRemove(true);
          closeDropdown();
        }
      }, "Delete"));
    }
  }), isMessageSent && useReaction && emojiAllMap.size > 0 && React.createElement(ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return React.createElement(IconButton, {
        className: "sendbird-user-message__more__add-reaction",
        ref: parentRefReactions,
        width: "32px",
        height: "32px",
        onClick: function onClick() {
          toggleDropdown();
          handleMoreIconClick();
        },
        onBlur: function onBlur() {
          handleMoreIconBlur();
        }
      }, React.createElement(Icon, {
        width: "24px",
        height: "24px",
        type: IconTypes.EMOJI_REACTIONS_ADD,
        fillColor: IconColors.CONTENT_INVERSE
      }));
    },
    menuItems: function menuItems(closeDropdown) {
      return React.createElement(MemoizedEmojiListItems, {
        message: message,
        parentRef: parentRefReactions,
        parentContainRef: parentContainRef,
        closeDropdown: closeDropdown,
        spaceFromTrigger: {
          y: 2
        }
      });
    }
  })), !chainBottom && !(mousehover || moreActive) && React.createElement("div", {
    className: "sendbird-user-message__status"
  }, React.createElement(MessageStatus, {
    message: message,
    status: status // onDelete={() => { showRemove(true); }}
    // onResend={() => resendMessage(message)}
    // duplicated and should replace to more

  }))), React.createElement("div", {
    className: "sendbird-user-message__text-balloon"
  }, React.createElement("div", {
    className: "sendbird-user-message__text-balloon__inner"
  }, React.createElement("div", {
    className: "sendbird-user-message__text-balloon__inner__text-place"
  }, React.createElement(Label, {
    className: "sendbird-user-message__text-balloon__inner__text-place__text",
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_1
  }, React.createElement(MemoizedMessageText, null))), useReaction && message.reactions && message.reactions.length > 0 && React.createElement(EmojiReactions, {
    className: "sendbird-user-message__text-balloon__inner__emoji-reactions",
    userId: userId,
    message: message,
    emojiAllMap: emojiAllMap,
    membersMap: membersMap,
    toggleReaction: toggleReaction,
    memoizedEmojiListItems: memoizedEmojiListItems
  })))));
}

function IncomingUserMessage(_ref2) {
  var userId = _ref2.userId,
      message = _ref2.message,
      useReaction = _ref2.useReaction,
      emojiAllMap = _ref2.emojiAllMap,
      membersMap = _ref2.membersMap,
      toggleReaction = _ref2.toggleReaction,
      memoizedMessageText = _ref2.memoizedMessageText,
      memoizedEmojiListItems = _ref2.memoizedEmojiListItems,
      chainTop = _ref2.chainTop,
      chainBottom = _ref2.chainBottom;
  var MemoizedMessageText = memoizedMessageText;
  var MemoizedEmojiListItems = memoizedEmojiListItems;
  var messageRef = useRef(null);
  var parentRefReactions = useRef(null);
  var parentRefMenus = useRef(null);
  var parentContainRef = useRef(null);
  var avatarRef = useRef(null);

  var _React$useContext = React.useContext(UserProfileContext),
      disableUserProfile = _React$useContext.disableUserProfile,
      renderUserProfile = _React$useContext.renderUserProfile;

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      mousehover = _useState6[0],
      setMousehover = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      moreActive = _useState8[0],
      setMoreActive = _useState8[1];

  var showReactionAddButton = useReaction && emojiAllMap && emojiAllMap.size > 0;
  var showEmojiReactions = useReaction && message.reactions && message.reactions.length > 0;

  var handleMoreIconClick = function handleMoreIconClick() {
    setMoreActive(true);
  };

  var handleMoreIconBlur = function handleMoreIconBlur() {
    setMoreActive(false);
  };

  useMouseHover({
    ref: messageRef,
    setHover: setMousehover
  });
  return React.createElement("div", {
    ref: messageRef,
    className: "sendbird-user-message--incoming",
    style: {
      paddingTop: chainTop ? GROUPING_PADDING : NORMAL_PADDING,
      paddingBottom: chainBottom ? GROUPING_PADDING : NORMAL_PADDING
    }
  }, React.createElement("div", {
    className: "sendbird-user-message--inner"
  }, React.createElement("div", {
    className: "sendbird-user-message--body"
  }, !chainBottom && React.createElement(ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return React.createElement(Avatar$1, {
        ref: avatarRef,
        onClick: function onClick() {
          if (!disableUserProfile) {
            toggleDropdown();
          }
        },
        className: "sendbird-user-message__avatar",
        src: getSenderProfileUrl$1(message),
        width: "28px",
        height: "28px"
      });
    },
    menuItems: function menuItems(closeDropdown) {
      return React.createElement(MenuItems$1, {
        parentRef: avatarRef // for catching location(x, y) of MenuItems
        ,
        parentContainRef: avatarRef // for toggling more options(menus & reactions)
        ,
        closeDropdown: closeDropdown,
        style: {
          paddingTop: 0,
          paddingBottom: 0
        }
      }, renderUserProfile ? renderUserProfile({
        user: message.sender,
        close: closeDropdown
      }) : React.createElement(ConnectedUserProfile, {
        user: message.sender,
        onSuccess: closeDropdown
      }));
    }
  }), !chainTop && React.createElement(Label, {
    className: "sendbird-user-message__sender-name",
    type: LabelTypography.CAPTION_2,
    color: LabelColors.ONBACKGROUND_2
  }, getSenderName$1(message)), React.createElement("div", {
    className: "sendbird-user-message__text-balloon"
  }, React.createElement("div", {
    className: "sendbird-user-message__text-balloon__inner"
  }, React.createElement("div", {
    className: "sendbird-user-message__text-balloon__inner__text-place"
  }, React.createElement(Label, {
    className: "sendbird-user-message__text-balloon__inner__text-place__text",
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_1
  }, React.createElement(MemoizedMessageText, null))), showEmojiReactions && React.createElement(EmojiReactions, {
    className: "sendbird-user-message__text-balloon__inner__emoji-reactions",
    userId: userId,
    message: message,
    emojiAllMap: emojiAllMap,
    membersMap: membersMap,
    toggleReaction: toggleReaction,
    memoizedEmojiListItems: memoizedEmojiListItems
  })))), React.createElement("div", {
    className: "sendbird-user-message__right-padding"
  }, React.createElement("div", {
    className: "sendbird-user-message__more",
    ref: parentContainRef
  }, showReactionAddButton && React.createElement(ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return React.createElement(IconButton, {
        ref: parentRefReactions,
        width: "32px",
        height: "32px",
        onClick: function onClick() {
          toggleDropdown();
          handleMoreIconClick();
        },
        onBlur: function onBlur() {
          handleMoreIconBlur();
        }
      }, React.createElement(Icon, {
        width: "24px",
        height: "24px",
        type: IconTypes.EMOJI_REACTIONS_ADD,
        fillColor: IconColors.CONTENT_INVERSE
      }));
    },
    menuItems: function menuItems(closeDropdown) {
      return React.createElement(MemoizedEmojiListItems, {
        parentRef: parentRefReactions,
        parentContainRef: parentContainRef,
        closeDropdown: closeDropdown,
        message: message,
        spaceFromTrigger: {
          y: 2
        }
      });
    }
  }), React.createElement(ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return React.createElement(IconButton, {
        ref: parentRefMenus,
        width: "32px",
        height: "32px",
        onClick: function onClick() {
          toggleDropdown();
          handleMoreIconClick();
        },
        onBlur: function onBlur() {
          handleMoreIconBlur();
        }
      }, React.createElement(Icon, {
        width: "24px",
        height: "24px",
        type: IconTypes.MORE,
        fillColor: IconColors.CONTENT_INVERSE
      }));
    },
    menuItems: function menuItems(closeDropdown) {
      return React.createElement(MenuItems$1, {
        parentRef: parentRefMenus,
        parentContainRef: parentContainRef,
        closeDropdown: closeDropdown
      }, React.createElement(MenuItem, {
        className: "sendbird-user-message--copy",
        onClick: function onClick() {
          copyToClipboard(message.message);
          closeDropdown();
        }
      }, "Copy"));
    }
  })), !chainBottom && !(mousehover || moreActive) && React.createElement(Label, {
    className: "sendbird-user-message__sent-at",
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_2
  }, getMessageCreatedAt$2(message)))));
}

IncomingUserMessage.propTypes = {
  userId: PropTypes.string.isRequired,
  message: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.array, PropTypes.object])),
  useReaction: PropTypes.bool.isRequired,
  emojiAllMap: PropTypes.instanceOf(Map),
  membersMap: PropTypes.instanceOf(Map),
  toggleReaction: PropTypes.func,
  memoizedMessageText: PropTypes.func.isRequired,
  memoizedEmojiListItems: PropTypes.func,
  chainTop: PropTypes.bool.isRequired,
  chainBottom: PropTypes.bool.isRequired
};
IncomingUserMessage.defaultProps = {
  message: {},
  emojiAllMap: new Map(),
  membersMap: new Map(),
  toggleReaction: noop$2,
  memoizedEmojiListItems: function memoizedEmojiListItems() {
    return '';
  }
};
OutgoingUserMessage.propTypes = {
  userId: PropTypes.string.isRequired,
  message: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.array, PropTypes.object])),
  showEdit: PropTypes.func,
  showRemove: PropTypes.func,
  disabled: PropTypes.bool,
  resendMessage: PropTypes.func,
  status: PropTypes.string.isRequired,
  useReaction: PropTypes.bool.isRequired,
  emojiAllMap: PropTypes.instanceOf(Map),
  membersMap: PropTypes.instanceOf(Map),
  toggleReaction: PropTypes.func,
  memoizedMessageText: PropTypes.func.isRequired,
  memoizedEmojiListItems: PropTypes.func,
  chainTop: PropTypes.bool.isRequired,
  chainBottom: PropTypes.bool.isRequired
};
OutgoingUserMessage.defaultProps = {
  message: {},
  resendMessage: noop$2,
  showEdit: noop$2,
  showRemove: noop$2,
  disabled: false,
  emojiAllMap: new Map(),
  membersMap: new Map(),
  toggleReaction: noop$2,
  memoizedEmojiListItems: function memoizedEmojiListItems() {
    return '';
  }
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

var getMessageCreatedAt$3 = function getMessageCreatedAt(message) {
  return format(message.createdAt, 'p');
};
var getIsSentFromStatus$2 = function getIsSentFromStatus(status) {
  return status === MessageStatusType.SENT || status === MessageStatusType.DELIVERED || status === MessageStatusType.READ;
};

var noop$3 = function noop() {};

var OUTGOING_THUMBNAIL_MESSAGE = 'sendbird-outgoing-thumbnail-message';
var INCOMING_THUMBNAIL_MESSAGE = 'sendbird-incoming-thumbnail-message';
var GROUPING_PADDING$1 = '1px';
var NORMAL_PADDING$1 = '8px';
function ThumbnailMessage(_ref) {
  var _ref$message = _ref.message,
      message = _ref$message === void 0 ? {} : _ref$message,
      userId = _ref.userId,
      disabled = _ref.disabled,
      isByMe = _ref.isByMe,
      onClick = _ref.onClick,
      showRemove = _ref.showRemove,
      status = _ref.status,
      resendMessage = _ref.resendMessage,
      useReaction = _ref.useReaction,
      emojiAllMap = _ref.emojiAllMap,
      membersMap = _ref.membersMap,
      toggleReaction = _ref.toggleReaction,
      memoizedEmojiListItems = _ref.memoizedEmojiListItems,
      chainTop = _ref.chainTop,
      chainBottom = _ref.chainBottom;
  return isByMe ? React.createElement(OutgoingThumbnailMessage, {
    userId: userId,
    status: status,
    message: message,
    onClick: onClick,
    disabled: disabled,
    chainTop: chainTop,
    showRemove: showRemove,
    membersMap: membersMap,
    chainBottom: chainBottom,
    useReaction: useReaction,
    emojiAllMap: emojiAllMap,
    resendMessage: resendMessage,
    toggleReaction: toggleReaction,
    memoizedEmojiListItems: memoizedEmojiListItems
  }) : React.createElement(IncomingThumbnailMessage, {
    userId: userId,
    status: status,
    message: message,
    onClick: onClick,
    chainTop: chainTop,
    membersMap: membersMap,
    chainBottom: chainBottom,
    useReaction: useReaction,
    emojiAllMap: emojiAllMap,
    toggleReaction: toggleReaction,
    memoizedEmojiListItems: memoizedEmojiListItems
  });
}
function OutgoingThumbnailMessage(_ref2) {
  var _ref2$message = _ref2.message,
      message = _ref2$message === void 0 ? {} : _ref2$message,
      userId = _ref2.userId,
      disabled = _ref2.disabled,
      onClick = _ref2.onClick,
      showRemove = _ref2.showRemove,
      status = _ref2.status,
      resendMessage = _ref2.resendMessage,
      useReaction = _ref2.useReaction,
      emojiAllMap = _ref2.emojiAllMap,
      membersMap = _ref2.membersMap,
      toggleReaction = _ref2.toggleReaction,
      memoizedEmojiListItems = _ref2.memoizedEmojiListItems,
      chainTop = _ref2.chainTop,
      chainBottom = _ref2.chainBottom;
  var type = message.type,
      url = message.url,
      localUrl = message.localUrl;
  var messageRef = useRef(null);
  var parentContainRef = useRef(null);
  var menuRef = useRef(null);
  var reactionAddRef = useRef(null);

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      mousehover = _useState2[0],
      setMousehover = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      moreActive = _useState4[0],
      setMoreActive = _useState4[1];

  var showReactionAddButton = useReaction && emojiAllMap && emojiAllMap.size > 0;
  var MemoizedEmojiListItems = memoizedEmojiListItems;
  var isMessageSent = getIsSentFromStatus$2(status);

  var handleMoreIconClick = function handleMoreIconClick() {
    setMoreActive(true);
  };

  var handleMoreIconBlur = function handleMoreIconBlur() {
    setMoreActive(false);
  };

  useMouseHover({
    ref: messageRef,
    setHover: setMousehover
  });
  return React.createElement("div", {
    className: OUTGOING_THUMBNAIL_MESSAGE,
    ref: messageRef,
    style: {
      paddingTop: chainTop ? GROUPING_PADDING$1 : NORMAL_PADDING$1,
      paddingBottom: chainBottom ? GROUPING_PADDING$1 : NORMAL_PADDING$1
    }
  }, React.createElement("div", {
    className: "".concat(OUTGOING_THUMBNAIL_MESSAGE, "--inner")
  }, React.createElement("div", {
    className: "".concat(OUTGOING_THUMBNAIL_MESSAGE, "__left-padding")
  }, React.createElement("div", {
    className: "".concat(OUTGOING_THUMBNAIL_MESSAGE, "-left-padding__more"),
    ref: parentContainRef
  }, React.createElement(ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return React.createElement(IconButton, {
        ref: menuRef,
        width: "32px",
        height: "32px",
        onClick: function onClick() {
          toggleDropdown();
          handleMoreIconClick();
        },
        onBlur: function onBlur() {
          handleMoreIconBlur();
        }
      }, React.createElement(Icon, {
        width: "24px",
        height: "24px",
        type: IconTypes.MORE,
        color: IconColors.CONTENT_INVERSE
      }));
    },
    menuItems: function menuItems(closeDropdown) {
      return React.createElement(MenuItems$1, {
        parentRef: menuRef,
        parentContainRef: parentContainRef,
        closeDropdown: closeDropdown,
        openLeft: true
      }, message && message.isResendable && message.isResendable() && React.createElement(MenuItem, {
        onClick: function onClick() {
          resendMessage(message);
          closeDropdown();
        }
      }, "Resend"), React.createElement(MenuItem, {
        onClick: function onClick() {
          if (disabled) {
            return;
          }

          showRemove(true);
          closeDropdown();
        }
      }, "Delete"));
    }
  }), isMessageSent && showReactionAddButton && React.createElement(ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return React.createElement(IconButton, {
        ref: reactionAddRef,
        width: "32px",
        height: "32px",
        onClick: function onClick() {
          toggleDropdown();
          handleMoreIconClick();
        },
        onBlur: function onBlur() {
          handleMoreIconBlur();
        }
      }, React.createElement(Icon, {
        width: "24px",
        height: "24px",
        type: IconTypes.EMOJI_REACTIONS_ADD,
        color: IconColors.CONTENT_INVERSE
      }));
    },
    menuItems: function menuItems(closeDropdown) {
      return React.createElement(MemoizedEmojiListItems, {
        message: message,
        parentRef: reactionAddRef,
        parentContainRef: parentContainRef,
        closeDropdown: closeDropdown,
        spaceFromTrigger: {
          y: 2
        }
      });
    }
  })), !chainBottom && !(mousehover || moreActive) && React.createElement(MessageStatus, {
    message: message,
    status: status,
    className: "".concat(OUTGOING_THUMBNAIL_MESSAGE, "-left-padding__status")
  })), React.createElement("div", {
    className: "".concat(OUTGOING_THUMBNAIL_MESSAGE, "__body")
  }, React.createElement("div", {
    className: "".concat(OUTGOING_THUMBNAIL_MESSAGE, "-body__wrap")
  }, React.createElement("div", {
    className: "".concat(OUTGOING_THUMBNAIL_MESSAGE, "-body__wrap--inner"),
    onClick: isMessageSent ? function () {
      return onClick(true);
    } : function () {},
    onKeyDown: isMessageSent ? function () {
      return onClick(true);
    } : function () {},
    tabIndex: 0,
    role: "button"
  }, isVideo(type) && React.createElement(React.Fragment, null, React.createElement("video", {
    className: "".concat(OUTGOING_THUMBNAIL_MESSAGE, "-body__video")
  }, React.createElement("source", {
    src: url || localUrl,
    type: type
  })), React.createElement(Icon, {
    className: "".concat(OUTGOING_THUMBNAIL_MESSAGE, "-body__video-icon"),
    width: "56px",
    height: "56px",
    type: IconTypes.PLAY
  })), isImage(type) && React.createElement("div", {
    className: "".concat(OUTGOING_THUMBNAIL_MESSAGE, "-body__img"),
    style: {
      backgroundImage: "url(".concat(url || localUrl, ")"),
      height: '280px',
      width: '404px',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    }
  }), unSupported(type) && React.createElement("div", {
    className: "".concat(OUTGOING_THUMBNAIL_MESSAGE, "-body__other")
  }, "Unknown type"), React.createElement("div", {
    className: "".concat(OUTGOING_THUMBNAIL_MESSAGE, "-body__wrap__overlay")
  })), useReaction && message.reactions && message.reactions.length > 0 && React.createElement(EmojiReactions, {
    className: "".concat(OUTGOING_THUMBNAIL_MESSAGE, "-body__wrap__emoji-reactions"),
    userId: userId,
    message: message,
    emojiAllMap: emojiAllMap,
    membersMap: membersMap,
    toggleReaction: toggleReaction,
    memoizedEmojiListItems: memoizedEmojiListItems
  })))));
}
function IncomingThumbnailMessage(_ref3) {
  var _ref3$message = _ref3.message,
      message = _ref3$message === void 0 ? {} : _ref3$message,
      userId = _ref3.userId,
      onClick = _ref3.onClick,
      status = _ref3.status,
      useReaction = _ref3.useReaction,
      emojiAllMap = _ref3.emojiAllMap,
      membersMap = _ref3.membersMap,
      toggleReaction = _ref3.toggleReaction,
      memoizedEmojiListItems = _ref3.memoizedEmojiListItems,
      chainTop = _ref3.chainTop,
      chainBottom = _ref3.chainBottom;
  var type = message.type,
      url = message.url,
      localUrl = message.localUrl;

  var _React$useContext = React.useContext(UserProfileContext),
      disableUserProfile = _React$useContext.disableUserProfile,
      renderUserProfile = _React$useContext.renderUserProfile;

  var messageRef = useRef(null);
  var parentContainRef = useRef(null);
  var reactionAddRef = useRef(null);
  var avatarRef = useRef(null);

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      mousehover = _useState6[0],
      setMousehover = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      moreActive = _useState8[0],
      setMoreActive = _useState8[1];

  var showReactionAddButton = useReaction && emojiAllMap && emojiAllMap.size > 0;
  var MemoizedEmojiListItems = memoizedEmojiListItems;
  var isMessageSent = getIsSentFromStatus$2(status);

  var handleMoreIconClick = function handleMoreIconClick() {
    setMoreActive(true);
  };

  var handleMoreIconBlur = function handleMoreIconBlur() {
    setMoreActive(false);
  };

  useMouseHover({
    ref: messageRef,
    setHover: setMousehover
  });
  return React.createElement("div", {
    className: INCOMING_THUMBNAIL_MESSAGE,
    ref: messageRef,
    style: {
      paddingTop: chainTop ? GROUPING_PADDING$1 : NORMAL_PADDING$1,
      paddingBottom: chainBottom ? GROUPING_PADDING$1 : NORMAL_PADDING$1
    }
  }, !chainTop && React.createElement(Label, {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "__sender-name"),
    type: LabelTypography.CAPTION_2,
    color: LabelColors.ONBACKGROUND_2
  }, getSenderName(message) || ''), React.createElement("div", {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "--inner")
  }, React.createElement("div", {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "__body")
  }, React.createElement("div", {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "-body__wrap")
  }, !chainBottom && React.createElement(ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return React.createElement(Avatar$1, {
        onClick: function onClick() {
          if (!disableUserProfile) {
            toggleDropdown();
          }
        },
        className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "__avatar"),
        src: getSenderProfileUrl(message),
        width: "28px",
        height: "28px"
      });
    },
    menuItems: function menuItems(closeDropdown) {
      return React.createElement(MenuItems$1, {
        parentRef: avatarRef // for catching location(x, y) of MenuItems
        ,
        parentContainRef: avatarRef // for toggling more options(menus & reactions)
        ,
        closeDropdown: closeDropdown,
        style: {
          paddingTop: 0,
          paddingBottom: 0
        }
      }, renderUserProfile ? renderUserProfile({
        user: message.sender,
        close: closeDropdown
      }) : React.createElement(ConnectedUserProfile, {
        user: message.sender,
        onSuccess: closeDropdown
      }));
    }
  }), React.createElement("div", {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "-body__wrap--inner"),
    role: "button",
    tabIndex: 0,
    onClick: isMessageSent ? function () {
      return onClick(true);
    } : function () {},
    onKeyDown: isMessageSent ? function () {
      return onClick(true);
    } : function () {}
  }, isVideo(type) && React.createElement(React.Fragment, null, React.createElement("video", {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "__video")
  }, React.createElement("source", {
    src: url || localUrl,
    type: type
  })), React.createElement(Icon, {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "__video-icon"),
    width: "56px",
    height: "56px",
    type: IconTypes.PLAY
  })), isImage(type) && React.createElement("div", {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "__img"),
    style: {
      backgroundImage: "url(".concat(url || localUrl, ")"),
      height: '280px',
      width: '404px',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    }
  }), unSupported(type) && React.createElement("div", {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "__other")
  }, "Unknown type"), React.createElement("div", {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "-body__wrap-overlay")
  })), useReaction && message.reactions && message.reactions.length > 0 && React.createElement(EmojiReactions, {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "__wrap__emoji-reactions"),
    userId: userId,
    message: message,
    emojiAllMap: emojiAllMap,
    membersMap: membersMap,
    toggleReaction: toggleReaction,
    memoizedEmojiListItems: memoizedEmojiListItems
  }))), React.createElement("div", {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "__right-padding")
  }, !chainBottom && !(mousehover || moreActive) && React.createElement(Label, {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "__sent-at"),
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_2
  }, getMessageCreatedAt$3(message)), React.createElement("div", {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "__more"),
    ref: parentContainRef
  }, showReactionAddButton && React.createElement(ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return React.createElement(IconButton, {
        ref: reactionAddRef,
        width: "32px",
        height: "32px",
        onClick: function onClick() {
          toggleDropdown();
          handleMoreIconClick();
        },
        onBlur: function onBlur() {
          handleMoreIconBlur();
        }
      }, React.createElement(Icon, {
        width: "24px",
        height: "24px",
        type: IconTypes.EMOJI_REACTIONS_ADD,
        color: IconColors.CONTENT_INVERSE
      }));
    },
    menuItems: function menuItems(closeDropdown) {
      return React.createElement(MemoizedEmojiListItems, {
        message: message,
        parentRef: reactionAddRef,
        parentContainRef: parentContainRef,
        closeDropdown: closeDropdown,
        spaceFromTrigger: {
          y: 2
        }
      });
    }
  })))));
}
ThumbnailMessage.propTypes = {
  message: PropTypes.shape({
    type: PropTypes.string,
    url: PropTypes.string,
    localUrl: PropTypes.string
  }).isRequired,
  userId: PropTypes.string,
  resendMessage: PropTypes.func,
  status: PropTypes.string,
  isByMe: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  showRemove: PropTypes.func,
  useReaction: PropTypes.bool.isRequired,
  emojiAllMap: PropTypes.instanceOf(Map),
  membersMap: PropTypes.instanceOf(Map),
  toggleReaction: PropTypes.func,
  memoizedEmojiListItems: PropTypes.func,
  chainTop: PropTypes.bool,
  chainBottom: PropTypes.bool
};
ThumbnailMessage.defaultProps = {
  isByMe: false,
  disabled: false,
  resendMessage: noop$3,
  onClick: noop$3,
  showRemove: noop$3,
  status: '',
  userId: '',
  emojiAllMap: new Map(),
  membersMap: new Map(),
  toggleReaction: noop$3,
  memoizedEmojiListItems: function memoizedEmojiListItems() {
    return '';
  },
  chainTop: false,
  chainBottom: false
};
OutgoingThumbnailMessage.propTypes = {
  message: PropTypes.shape({
    type: PropTypes.string,
    url: PropTypes.string,
    localUrl: PropTypes.string
  }).isRequired,
  userId: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  resendMessage: PropTypes.func.isRequired,
  status: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  showRemove: PropTypes.func.isRequired,
  useReaction: PropTypes.bool.isRequired,
  emojiAllMap: PropTypes.instanceOf(Map).isRequired,
  membersMap: PropTypes.instanceOf(Map).isRequired,
  toggleReaction: PropTypes.func.isRequired,
  memoizedEmojiListItems: PropTypes.func.isRequired,
  chainTop: PropTypes.bool.isRequired,
  chainBottom: PropTypes.bool.isRequired
};
OutgoingThumbnailMessage.defaultProps = {
  status: ''
};
IncomingThumbnailMessage.propTypes = {
  message: PropTypes.shape({
    type: PropTypes.string,
    url: PropTypes.string,
    localUrl: PropTypes.string
  }).isRequired,
  userId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  status: PropTypes.string,
  useReaction: PropTypes.bool.isRequired,
  emojiAllMap: PropTypes.instanceOf(Map).isRequired,
  membersMap: PropTypes.instanceOf(Map).isRequired,
  toggleReaction: PropTypes.func.isRequired,
  memoizedEmojiListItems: PropTypes.func.isRequired,
  chainTop: PropTypes.bool.isRequired,
  chainBottom: PropTypes.bool.isRequired
};
IncomingThumbnailMessage.defaultProps = {
  status: ''
};

var MAX_TRUNCATE_LENGTH = 40;
var GROUPAING_PADDING = '1px';
var NORMAL_PADDING$2 = '8px';

var noop$4 = function noop() {};

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
      userId = _ref.userId,
      status = _ref.status,
      showRemove = _ref.showRemove,
      disabled = _ref.disabled,
      resendMessage = _ref.resendMessage,
      useReaction = _ref.useReaction,
      emojiAllMap = _ref.emojiAllMap,
      membersMap = _ref.membersMap,
      toggleReaction = _ref.toggleReaction,
      memoizedEmojiListItems = _ref.memoizedEmojiListItems,
      chainTop = _ref.chainTop,
      chainBottom = _ref.chainBottom;
  var url = message.url;

  var openFileUrl = function openFileUrl() {
    window.open(url);
  };

  var messageRef = useRef(null);
  var parentContainRef = useRef(null);
  var menuRef = useRef(null);
  var reactionAddButtonRef = useRef(null);

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      mousehover = _useState2[0],
      setMousehover = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      moreActive = _useState4[0],
      setMoreActive = _useState4[1];

  var showReactionAddButton = useReaction && emojiAllMap && emojiAllMap.size > 0;
  var MemoizedEmojiListItems = memoizedEmojiListItems;
  var isMessageSent = getIsSentFromStatus(status);
  var showEmojiReactions = isMessageSent && useReaction && message.reactions && message.reactions.length > 0;

  var handleMoreIconClick = function handleMoreIconClick() {
    setMoreActive(true);
  };

  var handleMoreIconBlur = function handleMoreIconBlur() {
    setMoreActive(false);
  };

  useMouseHover({
    ref: messageRef,
    setHover: setMousehover
  });
  return React.createElement("div", {
    className: "sendbird-file-message__outgoing",
    ref: messageRef,
    style: {
      paddingTop: chainTop ? GROUPAING_PADDING : NORMAL_PADDING$2,
      paddingBottom: chainBottom ? GROUPAING_PADDING : NORMAL_PADDING$2
    }
  }, React.createElement("div", {
    className: "sendbird-file-message--inner"
  }, React.createElement("div", {
    className: "sendbird-file-message__left-padding"
  }, React.createElement("div", {
    className: "sendbird-file-message__more",
    ref: parentContainRef
  }, React.createElement(ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return React.createElement(IconButton, {
        ref: menuRef,
        width: "32px",
        height: "32px",
        onClick: function onClick() {
          toggleDropdown();
          handleMoreIconClick();
        },
        onBlur: function onBlur() {
          handleMoreIconBlur();
        }
      }, React.createElement(Icon, {
        width: "24px",
        height: "24px",
        type: IconTypes.MORE
      }));
    },
    menuItems: function menuItems(closeDropdown) {
      return React.createElement(MenuItems$1, {
        parentRef: menuRef,
        parentContainRef: parentContainRef,
        closeDropdown: closeDropdown,
        openLeft: true
      }, message && message.isResendable && message.isResendable() && React.createElement(MenuItem, {
        onClick: function onClick() {
          resendMessage(message);
          closeDropdown();
        }
      }, "Resend"), React.createElement(MenuItem, {
        onClick: function onClick() {
          if (disabled) {
            return;
          }

          showRemove(true);
          closeDropdown();
        }
      }, "Delete"));
    }
  }), showReactionAddButton && React.createElement(ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return React.createElement(IconButton, {
        ref: reactionAddButtonRef,
        width: "32px",
        height: "32px",
        onClick: function onClick() {
          toggleDropdown();
          handleMoreIconClick();
        },
        onBlur: function onBlur() {
          handleMoreIconBlur();
        }
      }, React.createElement(Icon, {
        width: "24px",
        height: "24px",
        type: IconTypes.EMOJI_REACTIONS_ADD,
        fillColor: IconColors.CONTENT_INVERSE
      }));
    },
    menuItems: function menuItems(closeDropdown) {
      return React.createElement(MemoizedEmojiListItems, {
        message: message,
        parentRef: reactionAddButtonRef,
        parentContainRef: parentContainRef,
        closeDropdown: closeDropdown,
        spaceFromTrigger: {
          y: 2
        }
      });
    }
  })), !chainBottom && !(mousehover || moreActive) && React.createElement("div", {
    className: "sendbird-file-message__status"
  }, React.createElement(MessageStatus, {
    message: message,
    status: status
  }))), React.createElement("div", {
    className: "sendbird-file-message__tooltip"
  }, React.createElement("div", {
    className: "sendbird-file-message__tooltip__inner"
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
  }, truncate(message.url, MAX_TRUNCATE_LENGTH)))), showEmojiReactions && React.createElement(EmojiReactions, {
    className: "sendbird-file-message__tooltip__emoji-reactions",
    userId: userId,
    message: message,
    emojiAllMap: emojiAllMap,
    membersMap: membersMap,
    toggleReaction: toggleReaction,
    memoizedEmojiListItems: memoizedEmojiListItems
  }))));
}
function IncomingFileMessage(_ref2) {
  var message = _ref2.message,
      userId = _ref2.userId,
      useReaction = _ref2.useReaction,
      emojiAllMap = _ref2.emojiAllMap,
      membersMap = _ref2.membersMap,
      toggleReaction = _ref2.toggleReaction,
      memoizedEmojiListItems = _ref2.memoizedEmojiListItems,
      chainTop = _ref2.chainTop,
      chainBottom = _ref2.chainBottom;

  var openFileUrl = function openFileUrl() {
    window.open(message.url);
  };

  var messageRef = useRef(null);

  var _React$useContext = React.useContext(UserProfileContext),
      disableUserProfile = _React$useContext.disableUserProfile,
      renderUserProfile = _React$useContext.renderUserProfile;

  var parentContainRef = useRef(null);
  var avatarRef = useRef(null);
  var reactionAddButtonRef = useRef(null);

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      mousehover = _useState6[0],
      setMousehover = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      moreActive = _useState8[0],
      setMoreActive = _useState8[1];

  var showReactionAddButton = useReaction && emojiAllMap && emojiAllMap.size > 0;
  var MemoizedEmojiListItems = memoizedEmojiListItems;

  var handleMoreIconClick = function handleMoreIconClick() {
    setMoreActive(true);
  };

  var handleMoreIconBlur = function handleMoreIconBlur() {
    setMoreActive(false);
  };

  useMouseHover({
    ref: messageRef,
    setHover: setMousehover
  });
  return React.createElement("div", {
    className: "sendbird-file-message__incoming",
    ref: messageRef,
    style: {
      paddingTop: chainTop ? GROUPAING_PADDING : NORMAL_PADDING$2,
      paddingBottom: chainBottom ? GROUPAING_PADDING : NORMAL_PADDING$2
    }
  }, React.createElement("div", {
    className: "sendbird-file-message--inner"
  }, React.createElement("div", {
    className: "sendbird-file-message__body"
  }, !chainBottom && React.createElement(ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return React.createElement(Avatar$1, {
        ref: avatarRef,
        onClick: function onClick() {
          if (!disableUserProfile) {
            toggleDropdown();
          }
        },
        className: "sendbird-file-message__avatar",
        src: getSenderProfileUrl(message),
        width: "28px",
        height: "28px"
      });
    },
    menuItems: function menuItems(closeDropdown) {
      return React.createElement(MenuItems$1, {
        parentRef: avatarRef // for catching location(x, y) of MenuItems
        ,
        parentContainRef: avatarRef // for toggling more options(menus & reactions)
        ,
        closeDropdown: closeDropdown,
        style: {
          paddingTop: 0,
          paddingBottom: 0
        }
      }, renderUserProfile ? renderUserProfile({
        user: message.sender,
        close: closeDropdown
      }) : React.createElement(ConnectedUserProfile, {
        user: message.sender,
        onSuccess: closeDropdown
      }));
    }
  }), !chainTop && React.createElement(Label, {
    className: "sendbird-file-message__sender-name",
    type: LabelTypography.CAPTION_2,
    color: LabelColors.ONBACKGROUND_2
  }, getSenderName(message)), React.createElement("div", {
    className: "sendbird-file-message__tooltip"
  }, React.createElement("div", {
    className: "sendbird-file-message__tooltip__inner"
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
  }, truncate(message.url, MAX_TRUNCATE_LENGTH)))), useReaction && message.reactions && message.reactions.length > 0 && React.createElement(EmojiReactions, {
    className: "sendbird-file-message__tooltip__emoji-reactions",
    userId: userId,
    message: message,
    emojiAllMap: emojiAllMap,
    membersMap: membersMap,
    toggleReaction: toggleReaction,
    memoizedEmojiListItems: memoizedEmojiListItems
  }))), React.createElement("div", {
    className: "sendbird-file-message__right-padding"
  }, React.createElement("div", {
    className: "sendbird-file-message__more",
    ref: parentContainRef
  }, showReactionAddButton && React.createElement(ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return React.createElement(IconButton, {
        ref: reactionAddButtonRef,
        width: "32px",
        height: "32px",
        onClick: function onClick() {
          toggleDropdown();
          handleMoreIconClick();
        },
        onBlur: function onBlur() {
          handleMoreIconBlur();
        }
      }, React.createElement(Icon, {
        width: "24px",
        height: "24px",
        type: IconTypes.EMOJI_REACTIONS_ADD,
        fillColor: IconColors.CONTENT_INVERSE
      }));
    },
    menuItems: function menuItems(closeDropdown) {
      return React.createElement(MemoizedEmojiListItems, {
        message: message,
        parentRef: reactionAddButtonRef,
        parentContainRef: parentContainRef,
        closeDropdown: closeDropdown,
        spaceFromTrigger: {
          y: 2
        }
      });
    }
  })), !chainBottom && !(mousehover || moreActive) && React.createElement(Label, {
    className: "sendbird-file-message__sent-at",
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_2
  }, getMessageCreatedAt(message)))));
}
OutgoingFileMessage.propTypes = {
  message: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.array, PropTypes.object])),
  userId: PropTypes.string,
  status: PropTypes.string,
  showRemove: PropTypes.func,
  resendMessage: PropTypes.func,
  useReaction: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  emojiAllMap: PropTypes.instanceOf(Map),
  membersMap: PropTypes.instanceOf(Map),
  toggleReaction: PropTypes.func,
  memoizedEmojiListItems: PropTypes.func,
  chainTop: PropTypes.bool.isRequired,
  chainBottom: PropTypes.bool.isRequired
};
OutgoingFileMessage.defaultProps = {
  status: '',
  showRemove: noop$4,
  resendMessage: noop$4,
  message: {},
  userId: '',
  disabled: false,
  emojiAllMap: new Map(),
  membersMap: new Map(),
  toggleReaction: noop$4,
  memoizedEmojiListItems: function memoizedEmojiListItems() {
    return '';
  }
};
IncomingFileMessage.propTypes = {
  message: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.array, PropTypes.object])),
  userId: PropTypes.string,
  useReaction: PropTypes.bool.isRequired,
  emojiAllMap: PropTypes.instanceOf(Map),
  membersMap: PropTypes.instanceOf(Map),
  toggleReaction: PropTypes.func,
  memoizedEmojiListItems: PropTypes.func,
  chainTop: PropTypes.bool.isRequired,
  chainBottom: PropTypes.bool.isRequired
};
IncomingFileMessage.defaultProps = {
  message: {},
  userId: '',
  emojiAllMap: new Map(),
  membersMap: new Map(),
  toggleReaction: noop$4,
  memoizedEmojiListItems: function memoizedEmojiListItems() {
    return '';
  }
};

var MessageSwitch = function MessageSwitch(_ref3) {
  var message = _ref3.message,
      userId = _ref3.userId,
      disabled = _ref3.disabled,
      isByMe = _ref3.isByMe,
      showRemove = _ref3.showRemove,
      status = _ref3.status,
      resendMessage = _ref3.resendMessage,
      useReaction = _ref3.useReaction,
      emojiAllMap = _ref3.emojiAllMap,
      membersMap = _ref3.membersMap,
      toggleReaction = _ref3.toggleReaction,
      memoizedEmojiListItems = _ref3.memoizedEmojiListItems,
      chainTop = _ref3.chainTop,
      chainBottom = _ref3.chainBottom;
  return React.createElement("div", {
    className: "sendbird-file-message".concat(isByMe ? '--outgoing' : '--incoming')
  }, isByMe ? React.createElement(OutgoingFileMessage, {
    message: message,
    userId: userId,
    disabled: disabled,
    showRemove: showRemove,
    status: status,
    resendMessage: resendMessage,
    useReaction: useReaction,
    emojiAllMap: emojiAllMap,
    membersMap: membersMap,
    toggleReaction: toggleReaction,
    memoizedEmojiListItems: memoizedEmojiListItems,
    chainTop: chainTop,
    chainBottom: chainBottom
  }) : React.createElement(IncomingFileMessage, {
    userId: userId,
    message: message,
    useReaction: useReaction,
    emojiAllMap: emojiAllMap,
    membersMap: membersMap,
    toggleReaction: toggleReaction,
    memoizedEmojiListItems: memoizedEmojiListItems,
    chainTop: chainTop,
    chainBottom: chainBottom
  }));
};

MessageSwitch.propTypes = {
  message: PropTypes.shape({}),
  userId: PropTypes.string,
  isByMe: PropTypes.bool,
  disabled: PropTypes.bool,
  showRemove: PropTypes.func,
  resendMessage: PropTypes.func,
  status: PropTypes.string.isRequired,
  useReaction: PropTypes.bool.isRequired,
  emojiAllMap: PropTypes.instanceOf(Map),
  membersMap: PropTypes.instanceOf(Map),
  toggleReaction: PropTypes.func,
  memoizedEmojiListItems: PropTypes.func,
  chainTop: PropTypes.bool,
  chainBottom: PropTypes.bool
};
MessageSwitch.defaultProps = {
  message: {},
  isByMe: false,
  disabled: false,
  showRemove: noop$4,
  resendMessage: noop$4,
  userId: '',
  emojiAllMap: new Map(),
  membersMap: new Map(),
  toggleReaction: noop$4,
  memoizedEmojiListItems: function memoizedEmojiListItems() {
    return '';
  },
  chainTop: false,
  chainBottom: false
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

var noop$5 = function noop() {};

var KeyCode = {
  SHIFT: 16,
  ENTER: 13
};

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

  var _useContext = useContext(LocalizationContext),
      stringSet = _useContext.stringSet;

  var fileInputRef = useRef(null);

  var _useState = useState(value),
      _useState2 = _slicedToArray(_useState, 2),
      inputValue = _useState2[0],
      setInputValue = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isShiftPressed = _useState4[0],
      setIsShiftPressed = _useState4[1];

  var setHeight = function setHeight() {
    var elem = ref.current;
    var MAX_HEIGHT = window.document.body.offsetHeight * 0.6;

    if (elem && elem.scrollHeight >= LINE_HEIGHT) {
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

  var sendMessage = function sendMessage() {
    if (inputValue) {
      var trimmedInputValue = inputValue.trim();

      if (isEdit) {
        onSendMessage(name, trimmedInputValue, function () {
          onCancelEdit();
        });
      } else {
        onSendMessage(trimmedInputValue);
        setInputValue('');
      }
    }
  };

  return React.createElement("form", {
    className: "\n        ".concat(isEdit ? 'sendbird-message-input__edit' : '', "\n        ").concat(disabled ? 'sendbird-message-input-form__disabled' : '', "\n      ")
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
    },
    onKeyDown: function onKeyDown(e) {
      if (e.keyCode === KeyCode.SHIFT) {
        setIsShiftPressed(true);
      }

      if (!isShiftPressed && e.keyCode === KeyCode.ENTER) {
        e.preventDefault();
        sendMessage();
      }
    },
    onKeyUp: function onKeyUp(e) {
      if (e.keyCode === KeyCode.SHIFT) {
        setIsShiftPressed(false);
      }
    }
  }), !inputValue && React.createElement(Label, {
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_3,
    className: "sendbird-message-input--placeholder"
  }, placeholder || stringSet.CHANNEL__MESSAGE_INPUT__PLACE_HOLDER), !isEdit && !inputValue && React.createElement(IconButton, {
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
    onClick: sendMessage
  }, React.createElement(Icon, {
    type: IconTypes.SEND,
    fillColor: IconColors.PRIMARY,
    width: "20px",
    height: "20px"
  }))), isEdit && React.createElement("div", {
    className: "sendbird-message-input--edit-action"
  }, React.createElement(Button, {
    className: "sendbird-message-input--edit-action__cancel",
    type: Type$1.SECONDARY,
    size: Size.SMALL,
    onClick: onCancelEdit
  }, stringSet.BUTTON__CANCEL), React.createElement(Button, {
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
  }, stringSet.BUTTON__SAVE)));
});
MessageInput.propTypes = {
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  isEdit: PropTypes.bool,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
  onSendMessage: noop$5,
  name: 'sendbird-message-input',
  isEdit: false,
  disabled: false,
  placeholder: '',
  maxLength: 5000,
  onFileUpload: noop$5,
  onCancelEdit: noop$5,
  onStartTyping: noop$5
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
  }, React.createElement(Avatar$1, {
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

  var _useContext = useContext(LocalizationContext),
      stringSet = _useContext.stringSet;

  return React.createElement(Modal, {
    onCancel: onCloseModal,
    onSubmit: onDeleteMessage,
    submitText: "Delete",
    titleText: stringSet.MODAL__DELETE_MESSAGE__TITLE
  });
};

RemoveMessage.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  onDeleteMessage: PropTypes.func.isRequired
};

var getMessageCreatedAt$4 = function getMessageCreatedAt(message) {
  return format(message.createdAt, 'p');
};

var CLASS_NAME$4 = 'sendbird-unknown-message';
var GROUPING_PADDING$2 = '1px';
var NORMAL_PADDING$3 = '8px';
function UnknownMessage(_ref) {
  var message = _ref.message,
      isByMe = _ref.isByMe,
      status = _ref.status,
      className = _ref.className,
      showRemove = _ref.showRemove,
      chainTop = _ref.chainTop,
      chainBottom = _ref.chainBottom;
  var injectingClassName = Array.isArray(className) ? className : [className];
  injectingClassName.unshift(CLASS_NAME$4);
  injectingClassName.push("".concat(CLASS_NAME$4).concat(isByMe ? '--outgoing' : '--incoming'));
  return React.createElement("div", {
    className: injectingClassName.join(' ')
  }, isByMe ? React.createElement(OutgoingUnknownMessage, {
    status: status,
    message: message,
    chainTop: chainTop,
    showRemove: showRemove,
    chainBottom: chainBottom
  }) : React.createElement(IncomingUnknownMessage, {
    message: message,
    chainTop: chainTop,
    chainBottom: chainBottom
  }));
}
UnknownMessage.propTypes = {
  message: PropTypes.shape({}).isRequired,
  isByMe: PropTypes.bool,
  status: PropTypes.string,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  showRemove: PropTypes.func,
  chainTop: PropTypes.bool,
  chainBottom: PropTypes.bool
};
UnknownMessage.defaultProps = {
  isByMe: false,
  status: '',
  className: '',
  showRemove: function showRemove() {},
  chainTop: false,
  chainBottom: false
};

function OutgoingUnknownMessage(_ref2) {
  var message = _ref2.message,
      status = _ref2.status,
      showRemove = _ref2.showRemove,
      chainTop = _ref2.chainTop,
      chainBottom = _ref2.chainBottom;
  var className = 'sendbird-outgoing-unknown-message';
  var messageRef = useRef(null);
  var parentContainRef = useRef(null);
  var menuRef = useRef(null);

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      mousehover = _useState2[0],
      setMousehover = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      moreActive = _useState4[0],
      setMoreActive = _useState4[1];

  var _useContext = useContext(LocalizationContext),
      stringSet = _useContext.stringSet;

  var handleMoreIconClick = function handleMoreIconClick() {
    setMoreActive(true);
  };

  var handleMoreIconBlur = function handleMoreIconBlur() {
    setMoreActive(false);
  };

  useMouseHover({
    ref: messageRef,
    setHover: setMousehover
  });
  return React.createElement("div", {
    ref: messageRef,
    className: className,
    style: {
      paddingTop: chainTop ? GROUPING_PADDING$2 : NORMAL_PADDING$3,
      paddingBottom: chainBottom ? GROUPING_PADDING$2 : NORMAL_PADDING$3
    }
  }, React.createElement("div", {
    className: "".concat(className, "--inner")
  }, React.createElement("div", {
    className: "".concat(className, "--left-padding")
  }, React.createElement("div", {
    className: "".concat(className, "__more"),
    ref: parentContainRef
  }, React.createElement(ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return React.createElement(IconButton, {
        className: "".concat(className, "__more__menu"),
        ref: menuRef,
        width: "32px",
        height: "32px",
        onClick: function onClick() {
          toggleDropdown();
          handleMoreIconClick();
        },
        onBlur: function onBlur() {
          handleMoreIconBlur();
        }
      }, React.createElement(Icon, {
        width: "24px",
        height: "24px",
        type: IconTypes.MORE,
        fillColor: IconColors.CONTENT_INVERSE
      }));
    },
    menuItems: function menuItems(closeDropdown) {
      return React.createElement(MenuItems$1, {
        parentRef: menuRef // for catching location(x, y) of MenuItems
        ,
        parentContainRef: parentContainRef // for toggling more options(menus & reactions)
        ,
        closeDropdown: closeDropdown,
        openLeft: true
      }, React.createElement(MenuItem, {
        onClick: function onClick() {
          showRemove(true);
          closeDropdown();
        }
      }, "Delete"));
    }
  })), !chainBottom && !(mousehover || moreActive) && React.createElement("div", {
    className: "".concat(className, "__message-status")
  }, React.createElement(MessageStatus, {
    message: message,
    status: status
  }))), React.createElement("div", {
    className: "".concat(className, "__body")
  }, React.createElement("div", {
    className: "".concat(className, "__body__text-balloon")
  }, React.createElement(Label, {
    className: "".concat(className, "__body__text-balloon__header"),
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_1
  }, stringSet.UNKNOWN__UNKNOWN_MESSAGE_TYPE), React.createElement(Label, {
    className: "".concat(className, "__body__text-balloon__description"),
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_2
  }, stringSet.UNKNOWN__CANNOT_READ_MESSAGE)))));
}

function IncomingUnknownMessage(_ref3) {
  var message = _ref3.message,
      chainTop = _ref3.chainTop,
      chainBottom = _ref3.chainBottom;
  var className = 'sendbird-incoming-unknown-message';
  var sender = message.sender;
  var avatarRef = useRef(null);

  var _useContext2 = useContext(LocalizationContext),
      stringSet = _useContext2.stringSet;

  var _React$useContext = React.useContext(UserProfileContext),
      disableUserProfile = _React$useContext.disableUserProfile,
      renderUserProfile = _React$useContext.renderUserProfile;

  return React.createElement("div", {
    className: className,
    style: {
      paddingTop: chainTop ? GROUPING_PADDING$2 : NORMAL_PADDING$3,
      paddingBottom: chainBottom ? GROUPING_PADDING$2 : NORMAL_PADDING$3
    }
  }, React.createElement("div", {
    className: "".concat(className, "--inner")
  }, React.createElement("div", {
    className: "".concat(className, "__left")
  }, !chainBottom && React.createElement(ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return React.createElement(Avatar$1, {
        ref: avatarRef,
        onClick: function onClick() {
          if (!disableUserProfile) {
            toggleDropdown();
          }
        },
        className: "".concat(className, "__left__sender-profile-image"),
        src: sender.profileUrl,
        width: "28px",
        height: "28px",
        alt: "sender-profile-image"
      });
    },
    menuItems: function menuItems(closeDropdown) {
      return React.createElement(MenuItems$1, {
        parentRef: avatarRef // for catching location(x, y) of MenuItems
        ,
        parentContainRef: avatarRef // for toggling more options(menus & reactions)
        ,
        closeDropdown: closeDropdown,
        style: {
          paddingTop: 0,
          paddingBottom: 0
        }
      }, renderUserProfile ? renderUserProfile({
        user: message.sender,
        close: closeDropdown
      }) : React.createElement(ConnectedUserProfile, {
        user: message.sender,
        onSuccess: closeDropdown
      }));
    }
  })), React.createElement("div", {
    className: "".concat(className, "__body")
  }, !chainTop && React.createElement(Label, {
    className: "".concat(className, "__body__sender-name"),
    type: LabelTypography.CAPTION_2,
    color: LabelColors.ONBACKGROUND_2
  }, sender.nickname || stringSet.NO_NAME), React.createElement("div", {
    className: "".concat(className, "__body__text-balloon")
  }, React.createElement(Label, {
    className: "".concat(className, "__body__text-balloon__header"),
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_1
  }, stringSet.UNKNOWN__UNKNOWN_MESSAGE_TYPE), React.createElement(Label, {
    className: "".concat(className, "__body__text-balloon__description"),
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_2
  }, stringSet.UNKNOWN__CANNOT_READ_MESSAGE))), React.createElement("div", {
    className: "".concat(className, "--right-padding")
  }, !chainBottom && React.createElement(Label, {
    className: "".concat(className, "__sent-at"),
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_2
  }, getMessageCreatedAt$4(message)))));
}

OutgoingUnknownMessage.propTypes = {
  message: PropTypes.shape({}).isRequired,
  status: PropTypes.string.isRequired,
  showRemove: PropTypes.func,
  chainTop: PropTypes.bool.isRequired,
  chainBottom: PropTypes.bool.isRequired
};
OutgoingUnknownMessage.defaultProps = {
  showRemove: function showRemove() {}
};
IncomingUnknownMessage.propTypes = {
  message: PropTypes.shape({
    sender: PropTypes.shape({
      nickname: PropTypes.string,
      profileUrl: PropTypes.string
    })
  }).isRequired,
  chainTop: PropTypes.bool.isRequired,
  chainBottom: PropTypes.bool.isRequired
};

var URL_REG = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
var OG_MESSAGE = 'sendbird-og-message';
var OUTGOING_OG_MESSAGE = 'sendbird-outgoing-og-message';
var INCOMING_OG_MESSAGE = 'sendbird-incoming-og-message';

var createUrlTester = function createUrlTester(regexp) {
  return function (text) {
    return regexp.test(text);
  };
};
var getIsSentFromStatus$3 = function getIsSentFromStatus(status) {
  return status === MessageStatusType.SENT || status === MessageStatusType.DELIVERED || status === MessageStatusType.READ;
};
var copyToClipboard$1 = function copyToClipboard(text) {
  try {
    if (window.clipboardData && window.clipboardData.setData) {
      // Internet Explorer-specific code path
      // to prevent textarea being shown while dialog is visible.
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
  } catch (err) {
    return err;
  }
};
var getSenderProfileUrl$2 = function getSenderProfileUrl(message) {
  return message.sender && message.sender.profileUrl;
};
var getSenderName$2 = function getSenderName(message) {
  return message.sender && (message.sender.friendName || message.sender.nickname || message.sender.userId);
};
var getMessageCreatedAt$5 = function getMessageCreatedAt(message) {
  return format(message.createdAt, 'p');
};
var checkOGIsEnalbed = function checkOGIsEnalbed(message) {
  var ogMetaData = message.ogMetaData;

  if (!ogMetaData) {
    return false;
  }

  var url = ogMetaData.url;

  if (!url) {
    return false;
  }

  return true;
};

var LINK_LABEL = 'sendbird-link-label';
var http = /https?:\/\//;
function LinkLabel(_ref) {
  var className = _ref.className,
      src = _ref.src,
      type = _ref.type,
      color = _ref.color,
      children = _ref.children;
  var injecingClassName = Array.isArray(className) ? className : [className];
  var url = http.test(src) ? src : "http://".concat(src);
  return React.createElement("a", {
    className: "".concat(LINK_LABEL, " ").concat(injecingClassName.join(' ')),
    href: url
  }, React.createElement(Label, {
    type: type,
    color: color,
    className: "".concat(LINK_LABEL, "__label")
  }, children));
}
LinkLabel.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.arrayOf(PropTypes.string), PropTypes.arrayOf(PropTypes.element)]).isRequired,
  src: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.keys(LabelTypography)).isRequired,
  color: PropTypes.oneOf(Object.keys(LabelColors)).isRequired
};
LinkLabel.defaultProps = {
  className: ''
};

var WORD_TYPOGRAPHY$1 = LabelTypography.BODY_1;
var WORD_COLOR = LabelColors.ONBACKGROUND_1;
var EDITED_COLOR$1 = LabelColors.ONBACKGROUND_2;
var isUrl = createUrlTester(URL_REG);
function useMemoizedMessageText$1(_ref) {
  var message = _ref.message,
      updatedAt = _ref.updatedAt,
      className = _ref.className;

  var _useContext = useContext(LocalizationContext),
      stringSet = _useContext.stringSet;

  return useMemo(function () {
    return function () {
      var splitMessage = message.split(' ');
      var matchedMessage = splitMessage.map(function (word) {
        return isUrl(word) ? React.createElement(LinkLabel, {
          key: uuidv4(),
          className: className,
          src: word,
          type: WORD_TYPOGRAPHY$1,
          color: WORD_COLOR
        }, word) : React.createElement(Label, {
          key: uuidv4(),
          className: className,
          type: WORD_TYPOGRAPHY$1,
          color: WORD_COLOR
        }, word);
      });

      if (updatedAt > 0) {
        matchedMessage.push(React.createElement(Label, {
          key: uuidv4(),
          className: className,
          type: WORD_TYPOGRAPHY$1,
          color: EDITED_COLOR$1
        }, stringSet.MESSAGE_EDITED));
      } // return (<>{matchedMessage}</>);


      return matchedMessage;
    };
  }, [message, updatedAt, className]);
}

var GROUPING_PADDING$3 = '1px';
var NORAML_PADDING = '8px';

var OGMessageSwitch = function OGMessageSwitch(_ref) {
  var isByMe = _ref.isByMe,
      userId = _ref.userId,
      status = _ref.status,
      message = _ref.message,
      disabled = _ref.disabled,
      showEdit = _ref.showEdit,
      chainTop = _ref.chainTop,
      className = _ref.className,
      membersMap = _ref.membersMap,
      showRemove = _ref.showRemove,
      useReaction = _ref.useReaction,
      emojiAllMap = _ref.emojiAllMap,
      chainBottom = _ref.chainBottom,
      resendMessage = _ref.resendMessage,
      toggleReaction = _ref.toggleReaction,
      memoizedEmojiListItems = _ref.memoizedEmojiListItems;
  var ogMetaData = message.ogMetaData;
  var injectingClassName = Array.isArray(className) ? className : [className];
  var memoizedMessageText = useMemoizedMessageText$1({
    message: message.message,
    updatedAt: message.updatedAt,
    className: 'sendbird-og-message-word'
  });

  var openLink = function openLink() {
    if (checkOGIsEnalbed(message)) {
      var url = ogMetaData.url;
      window.open(url);
    }
  };

  return React.createElement("div", {
    className: "".concat(OG_MESSAGE, " ").concat(OG_MESSAGE).concat(isByMe ? '--outgoing' : '--incoming', " ").concat(injectingClassName.join(' '))
  }, isByMe ? React.createElement(OutgoingOGMessage, {
    status: status,
    userId: userId,
    message: message,
    disabled: disabled,
    openLink: openLink,
    showEdit: showEdit,
    chainTop: chainTop,
    showRemove: showRemove,
    membersMap: membersMap,
    chainBottom: chainBottom,
    useReaction: useReaction,
    emojiAllMap: emojiAllMap,
    resendMessage: resendMessage,
    toggleReaction: toggleReaction,
    memoizedMessageText: memoizedMessageText,
    memoizedEmojiListItems: memoizedEmojiListItems
  }) : React.createElement(IncomingOGMessage, {
    userId: userId,
    message: message,
    openLink: openLink,
    chainTop: chainTop,
    membersMap: membersMap,
    chainBottom: chainBottom,
    useReaction: useReaction,
    emojiAllMap: emojiAllMap,
    toggleReaction: toggleReaction,
    memoizedMessageText: memoizedMessageText,
    memoizedEmojiListItems: memoizedEmojiListItems
  }));
};

function OutgoingOGMessage(props) {
  var status = props.status,
      userId = props.userId,
      message = props.message,
      disabled = props.disabled,
      openLink = props.openLink,
      showEdit = props.showEdit,
      chainTop = props.chainTop,
      showRemove = props.showRemove,
      membersMap = props.membersMap,
      chainBottom = props.chainBottom,
      emojiAllMap = props.emojiAllMap,
      useReaction = props.useReaction,
      resendMessage = props.resendMessage,
      toggleReaction = props.toggleReaction,
      memoizedMessageText = props.memoizedMessageText,
      memoizedEmojiListItems = props.memoizedEmojiListItems;
  var ogMetaData = message.ogMetaData;
  var defaultImage = ogMetaData.defaultImage;
  var MemoizedMessageText = memoizedMessageText;
  var MemoizedEmojiListItems = memoizedEmojiListItems;
  var messageRef = useRef(null);
  var parentRefReactions = useRef(null);
  var parentRefMenus = useRef(null);
  var parentContainRef = useRef(null);
  var isMessageSent = getIsSentFromStatus$3(status);

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      mousehover = _useState2[0],
      setMousehover = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      moreActive = _useState4[0],
      setMoreActive = _useState4[1];

  var showEmojiReactions = useReaction && message.reactions && message.reactions.length > 0;

  var handleMoreIconClick = function handleMoreIconClick() {
    setMoreActive(true);
  };

  var handleMoreIconBlur = function handleMoreIconBlur() {
    setMoreActive(false);
  };

  useMouseHover({
    ref: messageRef,
    setHover: setMousehover
  });
  return React.createElement("div", {
    ref: messageRef,
    className: OUTGOING_OG_MESSAGE,
    style: {
      paddingTop: chainTop ? GROUPING_PADDING$3 : NORAML_PADDING,
      paddingBottom: chainBottom ? GROUPING_PADDING$3 : NORAML_PADDING
    }
  }, React.createElement("div", {
    className: "".concat(OUTGOING_OG_MESSAGE, "--inner")
  }, React.createElement("div", {
    className: "".concat(OUTGOING_OG_MESSAGE, "--left-padding")
  }, React.createElement("div", {
    className: "".concat(OUTGOING_OG_MESSAGE, "__more"),
    ref: parentContainRef
  }, React.createElement(ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return React.createElement(IconButton, {
        className: "".concat(OUTGOING_OG_MESSAGE, "__more__menu"),
        ref: parentRefMenus,
        width: "32px",
        height: "32px",
        onClick: function onClick() {
          toggleDropdown();
          handleMoreIconClick();
        },
        onBlur: function onBlur() {
          handleMoreIconBlur();
        }
      }, React.createElement(Icon, {
        width: "24px",
        height: "24px",
        type: IconTypes.MORE,
        fillColor: IconColors.CONTENT_INVERSE
      }));
    },
    menuItems: function menuItems(closeDropdown) {
      return React.createElement(MenuItems$1, {
        parentRef: parentRefMenus // for catching location(x, y) of MenuItems
        ,
        parentContainRef: parentContainRef // for toggling more options(menus & reactions)
        ,
        closeDropdown: closeDropdown,
        openLeft: true
      }, isMessageSent && React.createElement(MenuItem, {
        className: "".concat(OUTGOING_OG_MESSAGE, "__more__menu__copy"),
        onClick: function onClick() {
          copyToClipboard$1(message.message);
          closeDropdown();
        }
      }, "Copy"), isMessageSent && React.createElement(MenuItem, {
        onClick: function onClick() {
          if (disabled) {
            return;
          }

          showEdit(true);
          closeDropdown();
        }
      }, "Edit"), message && message.isResendable && message.isResendable() && React.createElement(MenuItem, {
        onClick: function onClick() {
          resendMessage(message);
          closeDropdown();
        }
      }, "Resend"), React.createElement(MenuItem, {
        onClick: function onClick() {
          if (disabled) {
            return;
          }

          showRemove(true);
          closeDropdown();
        }
      }, "Delete"));
    }
  }), isMessageSent && useReaction && emojiAllMap.size > 0 && React.createElement(ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return React.createElement(IconButton, {
        className: "".concat(OUTGOING_OG_MESSAGE, "__more__add-reaction"),
        ref: parentRefReactions,
        width: "32px",
        height: "32px",
        onClick: toggleDropdown
      }, React.createElement(Icon, {
        width: "24px",
        height: "24px",
        type: IconTypes.EMOJI_REACTIONS_ADD,
        fillColor: IconColors.CONTENT_INVERSE
      }));
    },
    menuItems: function menuItems(closeDropdown) {
      return React.createElement(MemoizedEmojiListItems, {
        message: message,
        parentRef: parentRefReactions,
        parentContainRef: parentContainRef,
        closeDropdown: closeDropdown,
        spaceFromTrigger: {
          y: 2
        }
      });
    }
  })), !chainBottom && !(mousehover || moreActive) && React.createElement("div", {
    className: "".concat(OUTGOING_OG_MESSAGE, "__message-status")
  }, React.createElement(MessageStatus, {
    message: message,
    status: status
  }))), React.createElement("div", {
    className: "".concat(OUTGOING_OG_MESSAGE, "--body")
  }, React.createElement("div", {
    className: "".concat(OUTGOING_OG_MESSAGE, "__text-balloon")
  }, React.createElement(MemoizedMessageText, null)), React.createElement("div", {
    className: "".concat(OUTGOING_OG_MESSAGE, "__thumbnail ").concat(checkOGIsEnalbed(message) ? '' : "".concat(OUTGOING_OG_MESSAGE, "__thumbnail--disabled")),
    onClick: openLink,
    onKeyDown: openLink,
    role: "button",
    tabIndex: 0
  }, defaultImage && React.createElement(ImageRenderer, {
    url: defaultImage.url || '',
    alt: defaultImage.alt,
    className: "".concat(OUTGOING_OG_MESSAGE, "__thumbnail__image"),
    width: "320px",
    height: "180px",
    defaultComponent: React.createElement("div", {
      className: "".concat(OUTGOING_OG_MESSAGE, "__thumbnail__image__placeholder")
    }, React.createElement(Icon, {
      width: "56px",
      height: "56px",
      type: IconTypes.NO_THUMBNAIL
    }))
  })), React.createElement("div", {
    className: "".concat(OUTGOING_OG_MESSAGE, "__og-tag ").concat(checkOGIsEnalbed(message) ? '' : "".concat(OUTGOING_OG_MESSAGE, "__og-tag--disabled")),
    onClick: openLink,
    onKeyDown: openLink,
    role: "button",
    tabIndex: 0
  }, ogMetaData.title && React.createElement("div", {
    className: "".concat(OUTGOING_OG_MESSAGE, "__og-tag__title")
  }, React.createElement(Label, {
    type: LabelTypography.SUBTITLE_2,
    color: LabelColors.ONBACKGROUND_1
  }, ogMetaData.title)), ogMetaData.description && React.createElement("div", {
    className: "".concat(OUTGOING_OG_MESSAGE, "__og-tag__description")
  }, React.createElement(Label, {
    type: LabelTypography.BODY_2,
    color: LabelColors.ONBACKGROUND_1,
    className: "".concat(OUTGOING_OG_MESSAGE, "__og-tag__description__label")
  }, ogMetaData.description)), ogMetaData.url && React.createElement("div", {
    className: "".concat(OUTGOING_OG_MESSAGE, "__og-tag__url")
  }, React.createElement(Label, {
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_2,
    className: "".concat(OUTGOING_OG_MESSAGE, "__og-tag__url__label")
  }, ogMetaData.url)), showEmojiReactions && React.createElement("div", {
    className: "".concat(OUTGOING_OG_MESSAGE, "__og-tag__emoji-reactions--wrapper"),
    onClick: function onClick(event) {
      return event.stopPropagation();
    },
    onKeyDown: function onKeyDown(event) {
      return event.stopPropagation();
    },
    role: "button",
    tabIndex: 0
  }, React.createElement(EmojiReactions, {
    className: "".concat(OUTGOING_OG_MESSAGE, "__og-tag__emoji-reactions"),
    userId: userId,
    message: message,
    membersMap: membersMap,
    emojiAllMap: emojiAllMap,
    toggleReaction: toggleReaction,
    memoizedEmojiListItems: memoizedEmojiListItems
  }))))));
}

function IncomingOGMessage(props) {
  var userId = props.userId,
      message = props.message,
      openLink = props.openLink,
      chainTop = props.chainTop,
      membersMap = props.membersMap,
      chainBottom = props.chainBottom,
      useReaction = props.useReaction,
      emojiAllMap = props.emojiAllMap,
      toggleReaction = props.toggleReaction,
      memoizedMessageText = props.memoizedMessageText,
      memoizedEmojiListItems = props.memoizedEmojiListItems;
  var ogMetaData = message.ogMetaData;
  var defaultImage = ogMetaData.defaultImage;
  var MemoizedMessageText = memoizedMessageText;
  var MemoizedEmojiListItems = memoizedEmojiListItems;
  var messageRef = useRef(null);
  var avatarRef = useRef(null);
  var parentRefReactions = useRef(null);
  var parentRefMenus = useRef(null);
  var parentContainRef = useRef(null);

  var _React$useContext = React.useContext(UserProfileContext),
      disableUserProfile = _React$useContext.disableUserProfile,
      renderUserProfile = _React$useContext.renderUserProfile;

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      mousehover = _useState6[0],
      setMousehover = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      moreActive = _useState8[0],
      setMoreActive = _useState8[1];

  var showEmojiReactions = useReaction && message.reactions && message.reactions.length > 0;
  var showReactionAddButton = useReaction && emojiAllMap && emojiAllMap.size > 0;

  var handleMoreIconClick = function handleMoreIconClick() {
    setMoreActive(true);
  };

  var handleMoreIconBlur = function handleMoreIconBlur() {
    setMoreActive(false);
  };

  useMouseHover({
    ref: messageRef,
    setHover: setMousehover
  });
  return React.createElement("div", {
    ref: messageRef,
    className: INCOMING_OG_MESSAGE,
    style: {
      paddingTop: chainTop ? GROUPING_PADDING$3 : NORAML_PADDING,
      paddingBottom: chainBottom ? GROUPING_PADDING$3 : NORAML_PADDING
    }
  }, React.createElement("div", {
    className: "".concat(INCOMING_OG_MESSAGE, "--inner")
  }, React.createElement("div", {
    className: "".concat(INCOMING_OG_MESSAGE, "--body")
  }, !chainBottom && React.createElement(ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return React.createElement(Avatar$1, {
        ref: avatarRef,
        onClick: function onClick() {
          if (!disableUserProfile) {
            toggleDropdown();
          }
        },
        className: "".concat(INCOMING_OG_MESSAGE, "__avatar"),
        src: getSenderProfileUrl$2(message),
        width: "28px",
        height: "28px",
        alt: "sender-profile-image"
      });
    },
    menuItems: function menuItems(closeDropdown) {
      return React.createElement(MenuItems$1, {
        parentRef: avatarRef // for catching location(x, y) of MenuItems
        ,
        parentContainRef: avatarRef // for toggling more options(menus & reactions)
        ,
        closeDropdown: closeDropdown,
        style: {
          paddingTop: 0,
          paddingBottom: 0
        }
      }, renderUserProfile ? renderUserProfile({
        user: message.sender,
        close: closeDropdown
      }) : React.createElement(ConnectedUserProfile, {
        user: message.sender,
        onSuccess: closeDropdown
      }));
    }
  }), !chainTop && React.createElement(Label, {
    className: "".concat(INCOMING_OG_MESSAGE, "__sender-name"),
    type: LabelTypography.CAPTION_2,
    color: LabelColors.ONBACKGROUND_2
  }, getSenderName$2(message)), React.createElement("div", {
    className: "".concat(INCOMING_OG_MESSAGE, "__text-balloon")
  }, React.createElement(MemoizedMessageText, null)), React.createElement("div", {
    className: "".concat(INCOMING_OG_MESSAGE, "__thumbnail ").concat(checkOGIsEnalbed(message) ? '' : "".concat(INCOMING_OG_MESSAGE, "__thumbnail--disabled")),
    onClick: openLink,
    onKeyDown: openLink,
    role: "button",
    tabIndex: 0
  }, defaultImage && React.createElement(ImageRenderer, {
    url: defaultImage.url || '',
    alt: defaultImage.alt || '',
    className: "".concat(INCOMING_OG_MESSAGE, "__thumbnail__image"),
    width: "320px",
    height: "180px",
    defaultComponent: React.createElement("div", {
      className: "".concat(INCOMING_OG_MESSAGE, "__thumbnail__image__placeholder")
    }, React.createElement(Icon, {
      width: "56px",
      height: "56px",
      type: IconTypes.NO_THUMBNAIL
    }))
  })), React.createElement("div", {
    className: "".concat(INCOMING_OG_MESSAGE, "__og-tag ").concat(checkOGIsEnalbed(message) ? '' : "".concat(INCOMING_OG_MESSAGE, "__og-tag--disabled")),
    onClick: openLink,
    onKeyDown: openLink,
    role: "button",
    tabIndex: 0
  }, ogMetaData.title && React.createElement("div", {
    className: "".concat(INCOMING_OG_MESSAGE, "__og-tag__title")
  }, React.createElement(Label, {
    type: LabelTypography.SUBTITLE_2,
    color: LabelColors.ONBACKGROUND_1
  }, ogMetaData.title)), ogMetaData.description && React.createElement("div", {
    className: "".concat(INCOMING_OG_MESSAGE, "__og-tag__description")
  }, React.createElement(Label, {
    type: LabelTypography.BODY_2,
    color: LabelColors.ONBACKGROUND_1,
    className: "".concat(INCOMING_OG_MESSAGE, "__og-tag__description__label")
  }, ogMetaData.description)), ogMetaData.url && React.createElement("div", {
    className: "".concat(INCOMING_OG_MESSAGE, "__og-tag__url")
  }, React.createElement(Label, {
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_2,
    className: "".concat(INCOMING_OG_MESSAGE, "__og-tag__url__label")
  }, ogMetaData.url)), showEmojiReactions && React.createElement("div", {
    className: "".concat(INCOMING_OG_MESSAGE, "__og-tag__emoji-reactions--wrapper"),
    onClick: function onClick(event) {
      return event.stopPropagation();
    },
    onKeyDown: function onKeyDown(event) {
      return event.stopPropagation();
    },
    role: "button",
    tabIndex: 0
  }, React.createElement(EmojiReactions, {
    className: "".concat(INCOMING_OG_MESSAGE, "__og-tag__emoji-reactions"),
    userId: userId,
    message: message,
    membersMap: membersMap,
    emojiAllMap: emojiAllMap,
    toggleReaction: toggleReaction,
    memoizedEmojiListItems: memoizedEmojiListItems
  })))), React.createElement("div", {
    className: "".concat(INCOMING_OG_MESSAGE, "--right-padding")
  }, !chainBottom && !(mousehover || moreActive) && React.createElement(Label, {
    className: "".concat(INCOMING_OG_MESSAGE, "__sent-at"),
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_2
  }, getMessageCreatedAt$5(message)), React.createElement("div", {
    className: "".concat(INCOMING_OG_MESSAGE, "__more"),
    ref: parentContainRef
  }, showReactionAddButton && React.createElement(ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return React.createElement(IconButton, {
        ref: parentRefReactions,
        width: "32px",
        height: "32px",
        onClick: function onClick() {
          toggleDropdown();
          handleMoreIconClick();
        },
        onBlur: function onBlur() {
          handleMoreIconBlur();
        }
      }, React.createElement(Icon, {
        width: "24px",
        height: "24px",
        type: IconTypes.EMOJI_REACTIONS_ADD,
        fillColor: IconColors.CONTENT_INVERSE
      }));
    },
    menuItems: function menuItems(closeDropdown) {
      return React.createElement(MemoizedEmojiListItems, {
        parentRef: parentRefReactions,
        parentContainRef: parentContainRef,
        closeDropdown: closeDropdown,
        message: message,
        spaceFromTrigger: {
          y: 2
        }
      });
    }
  }), React.createElement(ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return React.createElement(IconButton, {
        ref: parentRefMenus,
        width: "32px",
        height: "32px",
        onClick: function onClick() {
          toggleDropdown();
          handleMoreIconClick();
        },
        onBlur: function onBlur() {
          handleMoreIconBlur();
        }
      }, React.createElement(Icon, {
        width: "24px",
        height: "24px",
        type: IconTypes.MORE,
        fillColor: IconColors.CONTENT_INVERSE
      }));
    },
    menuItems: function menuItems(closeDropdown) {
      return React.createElement(MenuItems$1, {
        parentRef: parentRefMenus,
        parentContainRef: parentContainRef,
        closeDropdown: closeDropdown
      }, React.createElement(MenuItem, {
        className: "".concat(INCOMING_OG_MESSAGE, "__more__menu__copy"),
        onClick: function onClick() {
          copyToClipboard$1(message.message);
          closeDropdown();
        }
      }, "Copy"));
    }
  })))));
}

var noop$6 = function noop() {};

OGMessageSwitch.propTypes = {
  isByMe: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
  message: PropTypes.shape({
    message: PropTypes.string,
    sender: PropTypes.shape({}),
    ogMetaData: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      url: PropTypes.string,
      defaultImage: PropTypes.shape({
        url: PropTypes.string,
        alt: PropTypes.string
      })
    }),
    reactions: PropTypes.array,
    updatedAt: PropTypes.number
  }).isRequired,
  useReaction: PropTypes.bool.isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  status: PropTypes.string,
  disabled: PropTypes.bool,
  showEdit: PropTypes.func,
  showRemove: PropTypes.func,
  resendMessage: PropTypes.func,
  toggleReaction: PropTypes.func,
  membersMap: PropTypes.instanceOf(Map),
  emojiAllMap: PropTypes.instanceOf(Map),
  memoizedEmojiListItems: PropTypes.func,
  chainTop: PropTypes.bool,
  chainBottom: PropTypes.bool
};
OGMessageSwitch.defaultProps = {
  className: '',
  status: '',
  disabled: false,
  showEdit: noop$6,
  showRemove: noop$6,
  resendMessage: noop$6,
  toggleReaction: noop$6,
  membersMap: new Map(),
  emojiAllMap: new Map(),
  memoizedEmojiListItems: noop$6,
  chainTop: false,
  chainBottom: false
};
OutgoingOGMessage.propTypes = {
  status: PropTypes.string,
  userId: PropTypes.string.isRequired,
  message: PropTypes.shape({
    message: PropTypes.string,
    ogMetaData: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      url: PropTypes.string,
      defaultImage: PropTypes.shape({
        url: PropTypes.string,
        alt: PropTypes.string
      })
    }),
    reactions: PropTypes.array,
    updatedAt: PropTypes.number,
    isResendable: PropTypes.func,
    errorCode: PropTypes.number
  }).isRequired,
  disabled: PropTypes.bool.isRequired,
  openLink: PropTypes.func.isRequired,
  showEdit: PropTypes.func.isRequired,
  showRemove: PropTypes.func.isRequired,
  membersMap: PropTypes.instanceOf(Map).isRequired,
  emojiAllMap: PropTypes.instanceOf(Map).isRequired,
  useReaction: PropTypes.bool.isRequired,
  resendMessage: PropTypes.func.isRequired,
  toggleReaction: PropTypes.func.isRequired,
  memoizedMessageText: PropTypes.func.isRequired,
  memoizedEmojiListItems: PropTypes.func.isRequired,
  chainTop: PropTypes.bool.isRequired,
  chainBottom: PropTypes.bool.isRequired
};
OutgoingOGMessage.defaultProps = {
  status: ''
};
IncomingOGMessage.propTypes = {
  userId: PropTypes.string.isRequired,
  message: PropTypes.shape({
    message: PropTypes.string,
    sender: PropTypes.shape({}),
    ogMetaData: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      url: PropTypes.string,
      defaultImage: PropTypes.shape({
        url: PropTypes.string,
        alt: PropTypes.string
      })
    }),
    reactions: PropTypes.array,
    updatedAt: PropTypes.number
  }).isRequired,
  openLink: PropTypes.func.isRequired,
  membersMap: PropTypes.instanceOf(Map).isRequired,
  emojiAllMap: PropTypes.instanceOf(Map).isRequired,
  useReaction: PropTypes.bool.isRequired,
  toggleReaction: PropTypes.func.isRequired,
  memoizedMessageText: PropTypes.func.isRequired,
  memoizedEmojiListItems: PropTypes.func.isRequired,
  chainTop: PropTypes.bool.isRequired,
  chainBottom: PropTypes.bool.isRequired
};

function MessageHoc(_ref) {
  var _MessageTypes$ADMIN$M;

  var message = _ref.message,
      userId = _ref.userId,
      disabled = _ref.disabled,
      editDisabled = _ref.editDisabled,
      hasSeperator = _ref.hasSeperator,
      deleteMessage = _ref.deleteMessage,
      updateMessage = _ref.updateMessage,
      status = _ref.status,
      resendMessage = _ref.resendMessage,
      renderCustomMessage = _ref.renderCustomMessage,
      currentGroupChannel = _ref.currentGroupChannel,
      useReaction = _ref.useReaction,
      chainTop = _ref.chainTop,
      chainBottom = _ref.chainBottom,
      emojiAllMap = _ref.emojiAllMap,
      membersMap = _ref.membersMap,
      toggleReaction = _ref.toggleReaction,
      memoizedEmojiListItems = _ref.memoizedEmojiListItems;
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
  var RenderedMessage = useMemo(function () {
    if (renderCustomMessage) {
      return renderCustomMessage(message, currentGroupChannel);
    }

    return null;
  }, [message, message.message, renderCustomMessage]);
  var isByMe = userId === sender.userId || message.requestState === 'pending' || message.requestState === 'failed';

  if (RenderedMessage) {
    return React.createElement("div", {
      className: "sendbird-msg-hoc sendbird-msg--scroll-ref"
    }, hasSeperator && React.createElement(DateSeparator, null, React.createElement(Label, {
      type: LabelTypography.CAPTION_2,
      color: LabelColors.ONBACKGROUND_2
    }, format(message.createdAt, 'MMMM dd, yyyy'))), React.createElement(RenderedMessage, {
      message: message
    }));
  }

  if (showEdit) {
    return React.createElement(MessageInput, {
      isEdit: true,
      disabled: editDisabled,
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
  }, format(message.createdAt, 'MMMM dd, yyyy'))), (_MessageTypes$ADMIN$M = {}, _defineProperty(_MessageTypes$ADMIN$M, MessageTypes.ADMIN, React.createElement(AdminMessage, {
    message: message
  })), _defineProperty(_MessageTypes$ADMIN$M, MessageTypes.FILE, React.createElement(MessageSwitch, {
    message: message,
    userId: userId,
    disabled: disabled,
    isByMe: isByMe,
    showRemove: setShowRemove,
    resendMessage: resendMessage,
    status: status,
    useReaction: useReaction,
    emojiAllMap: emojiAllMap,
    membersMap: membersMap,
    toggleReaction: toggleReaction,
    memoizedEmojiListItems: memoizedEmojiListItems,
    chainTop: chainTop,
    chainBottom: chainBottom
  })), _defineProperty(_MessageTypes$ADMIN$M, MessageTypes.OG, React.createElement(OGMessageSwitch, {
    message: message,
    status: status,
    isByMe: isByMe,
    userId: userId,
    showEdit: setShowEdit,
    disabled: disabled,
    showRemove: setShowRemove,
    resendMessage: resendMessage,
    useReaction: useReaction,
    emojiAllMap: emojiAllMap,
    membersMap: membersMap,
    toggleReaction: toggleReaction,
    memoizedEmojiListItems: memoizedEmojiListItems,
    chainTop: chainTop,
    chainBottom: chainBottom
  })), _defineProperty(_MessageTypes$ADMIN$M, MessageTypes.THUMBNAIL, React.createElement(ThumbnailMessage, {
    disabled: disabled,
    message: message,
    userId: userId,
    isByMe: isByMe,
    showRemove: setShowRemove,
    resendMessage: resendMessage,
    onClick: setShowFileViewer,
    status: status,
    useReaction: useReaction,
    emojiAllMap: emojiAllMap,
    membersMap: membersMap,
    toggleReaction: toggleReaction,
    memoizedEmojiListItems: memoizedEmojiListItems,
    chainTop: chainTop,
    chainBottom: chainBottom
  })), _defineProperty(_MessageTypes$ADMIN$M, MessageTypes.USER, React.createElement(Message, {
    message: message,
    disabled: disabled,
    isByMe: isByMe,
    userId: userId,
    showEdit: setShowEdit,
    showRemove: setShowRemove,
    resendMessage: resendMessage,
    status: status,
    useReaction: useReaction,
    emojiAllMap: emojiAllMap,
    membersMap: membersMap,
    toggleReaction: toggleReaction,
    memoizedEmojiListItems: memoizedEmojiListItems,
    chainTop: chainTop,
    chainBottom: chainBottom
  })), _MessageTypes$ADMIN$M)[getMessageType(message)], showRemove && React.createElement(RemoveMessage, {
    onCloseModal: function onCloseModal() {
      return setShowRemove(false);
    },
    onDeleteMessage: function onDeleteMessage() {
      deleteMessage(message);
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
  }), !(message.isFileMessage && message.isFileMessage() || message.messageType === 'file') && !(message.isAdminMessage && message.isAdminMessage()) && !(message.isUserMessage && message.isUserMessage() || message.messageType === 'user') && !showFileViewer && React.createElement(UnknownMessage, {
    message: message,
    status: status,
    isByMe: isByMe,
    showRemove: setShowRemove,
    chainTop: chainTop,
    chainBottom: chainBottom
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
    }),
    ogMetaData: PropTypes.shape({})
  }),
  hasSeperator: PropTypes.bool,
  disabled: PropTypes.bool,
  editDisabled: PropTypes.bool,
  deleteMessage: PropTypes.func.isRequired,
  updateMessage: PropTypes.func.isRequired,
  resendMessage: PropTypes.func.isRequired,
  renderCustomMessage: PropTypes.func,
  currentGroupChannel: PropTypes.shape({}),
  status: PropTypes.string,
  useReaction: PropTypes.bool.isRequired,
  chainTop: PropTypes.bool.isRequired,
  chainBottom: PropTypes.bool.isRequired,
  emojiAllMap: PropTypes.instanceOf(Map).isRequired,
  membersMap: PropTypes.instanceOf(Map).isRequired,
  toggleReaction: PropTypes.func,
  memoizedEmojiListItems: PropTypes.func
};
MessageHoc.defaultProps = {
  userId: '',
  editDisabled: false,
  message: {},
  hasSeperator: false,
  disabled: false,
  renderCustomMessage: null,
  currentGroupChannel: {},
  status: '',
  toggleReaction: function toggleReaction() {},
  memoizedEmojiListItems: function memoizedEmojiListItems() {
    return '';
  }
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
          onScroll = _this$props.onScroll,
          currentGroupChannel = _this$props.currentGroupChannel;
      var element = e.target;
      var scrollTop = element.scrollTop,
          clientHeight = element.clientHeight,
          scrollHeight = element.scrollHeight;

      if (scrollTop === 0) {
        if (!hasMore) {
          return;
        }

        var nodes = scrollRef.current.querySelectorAll('.sendbird-msg--scroll-ref');
        onScroll(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 1),
              messages = _ref2[0];

          if (messages) {
            // https://github.com/scabbiaza/react-scroll-position-on-updating-dom
            try {
              var first = nodes[0];
              first.scrollIntoView();
            } catch (error) {//
            }
          }
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
          userId = _this$props2.userId,
          disabled = _this$props2.disabled,
          scrollRef = _this$props2.scrollRef,
          readStatus = _this$props2.readStatus,
          membersMap = _this$props2.membersMap,
          initialized = _this$props2.initialized,
          allMessages = _this$props2.allMessages,
          useReaction = _this$props2.useReaction,
          emojiAllMap = _this$props2.emojiAllMap,
          editDisabled = _this$props2.editDisabled,
          deleteMessage = _this$props2.deleteMessage,
          updateMessage = _this$props2.updateMessage,
          resendMessage = _this$props2.resendMessage,
          renderChatItem = _this$props2.renderChatItem,
          renderCustomMessage = _this$props2.renderCustomMessage,
          emojiContainer = _this$props2.emojiContainer,
          toggleReaction = _this$props2.toggleReaction,
          useMessageGrouping = _this$props2.useMessageGrouping,
          currentGroupChannel = _this$props2.currentGroupChannel,
          memoizedEmojiListItems = _this$props2.memoizedEmojiListItems;
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
        var previousMessage = allMessages[idx - 1];
        var nextMessage = allMessages[idx + 1];

        var _ref3 = useMessageGrouping ? compareMessagesForGrouping(previousMessage, m, nextMessage) : [false, false],
            _ref4 = _slicedToArray(_ref3, 2),
            chainTop = _ref4[0],
            chainBottom = _ref4[1];

        var previousMessageCreatedAt = previousMessage && previousMessage.createdAt;
        var currentCreatedAt = m.createdAt; // https://stackoverflow.com/a/41855608

        var hasSeperator = !(previousMessageCreatedAt && isSameDay(currentCreatedAt, previousMessageCreatedAt));

        if (renderChatItem) {
          return React.createElement("div", {
            key: m.messageId || m.reqId,
            className: "sendbird-msg--scroll-ref"
          }, renderChatItem({
            message: m,
            channel: currentGroupChannel,
            onDeleteMessage: deleteMessage,
            onUpdateMessage: updateMessage,
            onResendMessage: resendMessage,
            emojiContainer: emojiContainer
          }));
        }

        return React.createElement(MessageHoc, {
          key: m.messageId || m.reqId,
          userId: userId,
          status: readStatus[m.messageId] || getParsedStatus(m, currentGroupChannel) // show status for pending/failed messages
          ,
          message: m,
          disabled: disabled,
          membersMap: membersMap,
          chainTop: chainTop,
          useReaction: useReaction,
          emojiAllMap: emojiAllMap,
          editDisabled: editDisabled,
          hasSeperator: hasSeperator,
          renderCustomMessage: renderCustomMessage,
          currentGroupChannel: currentGroupChannel,
          chainBottom: chainBottom,
          updateMessage: updateMessage,
          deleteMessage: deleteMessage,
          resendMessage: resendMessage,
          toggleReaction: toggleReaction,
          memoizedEmojiListItems: memoizedEmojiListItems
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
  onScroll: PropTypes.func,
  initialized: PropTypes.bool,
  editDisabled: PropTypes.bool,
  disabled: PropTypes.bool,
  userId: PropTypes.string,
  allMessages: PropTypes.arrayOf(PropTypes.shape({
    createdAt: PropTypes.number
  })).isRequired,
  deleteMessage: PropTypes.func.isRequired,
  resendMessage: PropTypes.func.isRequired,
  updateMessage: PropTypes.func.isRequired,
  renderCustomMessage: PropTypes.func,
  readStatus: PropTypes.shape({}).isRequired,
  currentGroupChannel: PropTypes.shape({
    markAsRead: PropTypes.func,
    members: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired,
  renderChatItem: PropTypes.element,
  useReaction: PropTypes.bool,
  emojiContainer: PropTypes.shape({}),
  emojiAllMap: PropTypes.instanceOf(Map),
  membersMap: PropTypes.instanceOf(Map),
  useMessageGrouping: PropTypes.bool,
  toggleReaction: PropTypes.func,
  memoizedEmojiListItems: PropTypes.func
};
ConversationScroll.defaultProps = {
  hasMore: false,
  editDisabled: false,
  disabled: false,
  initialized: false,
  userId: '',
  renderChatItem: null,
  renderCustomMessage: null,
  onScroll: null,
  useReaction: true,
  emojiContainer: {},
  emojiAllMap: new Map(),
  membersMap: new Map(),
  useMessageGrouping: true,
  toggleReaction: function toggleReaction() {},
  memoizedEmojiListItems: function memoizedEmojiListItems() {
    return '';
  }
};

function Notification(_ref) {
  var count = _ref.count,
      time = _ref.time,
      onClick = _ref.onClick;

  var _useContext = useContext(LocalizationContext),
      stringSet = _useContext.stringSet;

  var timeArray = time.split(' ');
  timeArray.splice(-2, 0, stringSet.CHANNEL__MESSAGE_LIST__NOTIFICATION__ON);
  return (// eslint-disable-next-line
    React.createElement("div", {
      className: "sendbird-notification",
      onClick: onClick
    }, React.createElement(Label, {
      className: "sendbird-notification__text",
      color: LabelColors.ONCONTENT_1,
      type: LabelTypography.CAPTION_2
    }, "".concat(count, " "), stringSet.CHANNEL__MESSAGE_LIST__NOTIFICATION__NEW_MESSAGE, " ".concat(timeArray.join(' '))), React.createElement(Icon, {
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

var FrozenNotification = function FrozenNotification() {
  var stringSet = useContext(LocalizationContext).stringSet;
  return React.createElement("div", {
    className: "sendbird-notification sendbird-notification--frozen"
  }, React.createElement(Label, {
    className: "sendbird-notification__text",
    type: LabelTypography.CAPTION_2
  }, stringSet.CHANNEL_FROZEN));
};

var TypingIndicatorText = function TypingIndicatorText(_ref) {
  var members = _ref.members;

  var _useContext = useContext(LocalizationContext),
      stringSet = _useContext.stringSet;

  if (!members || members.length === 0) {
    return '';
  }

  if (members && members.length === 1) {
    return "".concat(members[0].nickname, " ").concat(stringSet.TYPING_INDICATOR__IS_TYPING);
  }

  if (members && members.length === 2) {
    return "".concat(members[0].nickname, " ").concat(stringSet.TYPING_INDICATOR__AND, " ").concat(members[1].nickname, " ").concat(stringSet.TYPING_INDICATOR__ARE_TYPING);
  }

  return stringSet.TYPING_INDICATOR__MULTIPLE_TYPING;
};

function TypingIndicator(_ref2) {
  var channelUrl = _ref2.channelUrl,
      sb = _ref2.sb,
      logger = _ref2.logger;

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
        logger.info('Channel > Typing Indicator: onTypingStatusUpdated', groupChannel);
        var members = groupChannel.getTypingMembers();

        if (groupChannel.url === channelUrl) {
          setTypingMembers(members);
        }
      };

      sb.addChannelHandler(newHandlerId, handler);
      setHandlerId(newHandlerId);
    }

    return function () {
      setTypingMembers([]);

      if (sb && sb.removeChannelHandler) {
        sb.removeChannelHandler(handlerId);
      }
    };
  }, [channelUrl]);
  return React.createElement(Label, {
    type: LabelTypography.CAPTION_2,
    color: LabelColors.ONBACKGROUND_2
  }, React.createElement(TypingIndicatorText, {
    members: typingMembers
  }));
}

TypingIndicator.propTypes = {
  channelUrl: PropTypes.string.isRequired,
  sb: PropTypes.shape({
    ChannelHandler: PropTypes.func,
    removeChannelHandler: PropTypes.func,
    addChannelHandler: PropTypes.func
  }).isRequired,
  logger: PropTypes.shape({
    info: PropTypes.func
  }).isRequired
};

// Logic required to handle message input rendering

var MessageInputWrapper = function MessageInputWrapper(_a, ref) {
  var channel = _a.channel,
      user = _a.user,
      onSendMessage = _a.onSendMessage,
      onFileUpload = _a.onFileUpload,
      renderMessageInput = _a.renderMessageInput,
      isOnline = _a.isOnline,
      initialized = _a.initialized;
  var stringSet = useContext(LocalizationContext).stringSet;
  var disabled = !initialized || isDisabledBecauseFrozen(channel) || isDisabledBecauseMuted(channel) || !isOnline;
  var isOperator$1 = isOperator(channel);
  var isBroadcast = channel.isBroadcast; // custom message

  if (renderMessageInput) {
    return renderMessageInput({
      channel: channel,
      user: user,
      disabled: disabled
    });
  } // broadcast channel + not operator


  if (isBroadcast && !isOperator$1) {
    return null;
  } // other conditions


  return React.createElement(MessageInput, {
    placeholder: isDisabledBecauseFrozen(channel) && stringSet.CHANNEL__MESSAGE_INPUT__PLACE_HOLDER__DISABLED || isDisabledBecauseMuted(channel) && stringSet.CHANNEL__MESSAGE_INPUT__PLACE_HOLDER__MUTED,
    ref: ref,
    disabled: disabled,
    onStartTyping: function onStartTyping() {
      channel.startTyping();
    },
    onSendMessage: onSendMessage,
    onFileUpload: onFileUpload
  });
};

var MessageInputWrapper$1 = React.forwardRef(MessageInputWrapper);

function ConnectionStatus() {
  var _useContext = useContext(LocalizationContext),
      stringSet = _useContext.stringSet;

  return React.createElement("div", {
    className: "sendbird-conversation__connection-status"
  }, React.createElement(Label, {
    type: LabelTypography.BODY_2,
    color: LabelColors.ONBACKGROUND_2
  }, stringSet.TRYING_TO_CONNECT), React.createElement(Icon, {
    type: IconTypes.DISCONNECTED,
    fillColor: IconColors.SENT,
    height: "14px",
    width: "14px"
  }));
}

var prettyDate = function prettyDate(date) {
  return formatDistanceToNowStrict(date, {
    addSuffix: true
  });
};
var getOthersLastSeenAt = function getOthersLastSeenAt(channel) {
  if (!channel || !channel.getReadStatus || !channel.members || channel.members.length !== 2) {
    return '';
  }

  var lastSeenList = _toConsumableArray(Object.values(channel.getReadStatus()));

  var lastSeenAt = lastSeenList.length > 0 ? lastSeenList[0].last_seen_at : 0;

  if (lastSeenAt === 0) {
    return '';
  }

  return prettyDate(lastSeenAt);
};
var getChannelTitle$1 = function getChannelTitle() {
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
      onActionClick = props.onActionClick,
      theme = props.theme;
  var userId = currentUser.userId;

  var _useContext = useContext(LocalizationContext),
      stringSet = _useContext.stringSet;

  return React.createElement("div", {
    className: "sendbird-chat-header"
  }, React.createElement("div", {
    className: "sendbird-chat-header__left"
  }, React.createElement(ChannelAvatar, {
    theme: theme,
    channel: currentGroupChannel,
    userId: userId,
    height: 32,
    width: 32
  }), React.createElement(Label, {
    className: "sendbird-chat-header__title",
    type: LabelTypography.H_2,
    color: LabelColors.ONBACKGROUND_1
  }, title || getChannelTitle$1(currentGroupChannel, userId, stringSet)), typeof isActive === 'string' && isActive === 'true' || typeof isActive === 'boolean' && isActive ? React.createElement("div", {
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
  currentGroupChannel: PropTypes.shape({
    members: PropTypes.arrayOf(PropTypes.shape({})),
    coverUrl: PropTypes.string
  }),
  theme: PropTypes.string,
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
  theme: 'light',
  subTitle: '',
  isActive: false,
  isMuted: false,
  currentUser: {},
  onActionClick: function onActionClick() {}
};

var noop$7 = function noop() {};

var ConversationPanel = function ConversationPanel(props) {
  var channelUrl = props.channelUrl,
      _props$stores = props.stores,
      sdkStore = _props$stores.sdkStore,
      userStore = _props$stores.userStore,
      _props$config = props.config,
      userId = _props$config.userId,
      logger = _props$config.logger,
      pubSub = _props$config.pubSub,
      isOnline = _props$config.isOnline,
      theme = _props$config.theme,
      reconnect = props.dispatchers.reconnect,
      _props$queries = props.queries,
      queries = _props$queries === void 0 ? {} : _props$queries,
      useReaction = props.useReaction,
      renderChatItem = props.renderChatItem,
      renderChatHeader = props.renderChatHeader,
      renderMessageInput = props.renderMessageInput,
      renderCustomMessage = props.renderCustomMessage,
      useMessageGrouping = props.useMessageGrouping,
      onChatHeaderActionClick = props.onChatHeaderActionClick,
      onBeforeSendUserMessage = props.onBeforeSendUserMessage,
      onBeforeSendFileMessage = props.onBeforeSendFileMessage,
      onBeforeUpdateUserMessage = props.onBeforeUpdateUserMessage;
  var sdk = sdkStore.sdk;
  var config = props.config;
  var sdkError = sdkStore.error;
  var sdkInit = sdkStore.initialized;
  var user = userStore.user;

  if (queries.messageListQuery) {
    // eslint-disable-next-line no-console
    console.warn('messageListQuery will be deprecared in v1.3.0, please use messageListParams instead');
  }

  var userFilledMessageListQuery = queries.messageListParams || queries.messageListQuery;

  var _useReducer = useReducer(reducer$3, messagesInitialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      messagesStore = _useReducer2[0],
      messagesDispatcher = _useReducer2[1];

  var scrollRef = useRef(null);
  var allMessages = messagesStore.allMessages,
      loading = messagesStore.loading,
      hasMore = messagesStore.hasMore,
      initialized = messagesStore.initialized,
      unreadCount = messagesStore.unreadCount,
      disableUserProfile = messagesStore.disableUserProfile,
      renderUserProfile = messagesStore.renderUserProfile,
      unreadSince = messagesStore.unreadSince,
      invalidChannel = messagesStore.invalidChannel,
      _messagesStore$curren = messagesStore.currentGroupChannel,
      currentGroupChannel = _messagesStore$curren === void 0 ? {} : _messagesStore$curren,
      lastMessageTimeStamp = messagesStore.lastMessageTimeStamp,
      emojiContainer = messagesStore.emojiContainer,
      readStatus = messagesStore.readStatus;
  var isFrozen = currentGroupChannel.isFrozen,
      isBroadcast = currentGroupChannel.isBroadcast;
  var _sdk$appInfo = sdk.appInfo,
      appInfo = _sdk$appInfo === void 0 ? {} : _sdk$appInfo;
  var usingReaction = appInfo.isUsingReaction && !isBroadcast || useReaction || false;
  var userDefinedDisableUserProfile = disableUserProfile || config.disableUserProfile;
  var userDefinedRenderProfile = renderUserProfile || config.renderUserProfile;
  var emojiAllMap = useMemo(function () {
    return usingReaction ? getAllEmojisMapFromEmojiContainer(emojiContainer) : new Map();
  }, [emojiContainer]);
  var emojiAllList = useMemo(function () {
    return usingReaction ? getAllEmojisFromEmojiContainer(emojiContainer) : [];
  }, [emojiContainer]);
  var nicknamesMap = useMemo(function () {
    return usingReaction ? getNicknamesMapFromMembers(currentGroupChannel.members) : new Map();
  }, [currentGroupChannel.members]);
  var onScrollCallback = useScrollCallback({
    currentGroupChannel: currentGroupChannel,
    lastMessageTimeStamp: lastMessageTimeStamp,
    userFilledMessageListQuery: userFilledMessageListQuery
  }, {
    hasMore: hasMore,
    logger: logger,
    messagesDispatcher: messagesDispatcher,
    sdk: sdk
  });
  var toggleReaction = useToggleReactionCallback({
    currentGroupChannel: currentGroupChannel
  }, {
    logger: logger
  });
  var memoizedEmojiListItems = useMemoizedEmojiListItems({
    emojiContainer: emojiContainer,
    toggleReaction: toggleReaction
  }, {
    useReaction: usingReaction,
    logger: logger,
    userId: userId,
    emojiAllList: emojiAllList
  }); // to create message-datasource

  useSetChannel({
    channelUrl: channelUrl,
    sdkInit: sdkInit
  }, {
    messagesDispatcher: messagesDispatcher,
    sdk: sdk,
    logger: logger
  }); // Hook to handle ChannelEvents and send values to useReducer using messagesDispatcher

  useHandleChannelEvents({
    currentGroupChannel: currentGroupChannel,
    sdkInit: sdkInit
  }, {
    messagesDispatcher: messagesDispatcher,
    sdk: sdk,
    logger: logger,
    scrollRef: scrollRef
  });
  useInitialMessagesFetch({
    currentGroupChannel: currentGroupChannel,
    userFilledMessageListQuery: userFilledMessageListQuery
  }, {
    sdk: sdk,
    logger: logger,
    messagesDispatcher: messagesDispatcher
  }); // handles API calls from withSendbird

  useEffect(function () {
    var subScriber = pubSubHandler$1(channelUrl, pubSub, messagesDispatcher);
    return function () {
      pubSubHandleRemover$1(subScriber);
    };
  }, [channelUrl, sdkInit]); // to create initial read status

  useSetReadStatus({
    allMessages: allMessages,
    currentGroupChannel: currentGroupChannel
  }, {
    messagesDispatcher: messagesDispatcher,
    sdk: sdk,
    logger: logger
  }); // handling connection breaks

  useHandleReconnect({
    isOnline: isOnline
  }, {
    logger: logger,
    sdk: sdk,
    currentGroupChannel: currentGroupChannel,
    messagesDispatcher: messagesDispatcher,
    userFilledMessageListQuery: userFilledMessageListQuery
  });
  var deleteMessage = useDeleteMessageCallback({
    currentGroupChannel: currentGroupChannel,
    messagesDispatcher: messagesDispatcher
  }, {
    logger: logger
  });
  var updateMessage = useUpdateMessageCallback({
    currentGroupChannel: currentGroupChannel,
    messagesDispatcher: messagesDispatcher,
    onBeforeUpdateUserMessage: onBeforeUpdateUserMessage
  }, {
    logger: logger,
    sdk: sdk,
    pubSub: pubSub
  });
  var resendMessage = useResendMessageCallback({
    currentGroupChannel: currentGroupChannel,
    messagesDispatcher: messagesDispatcher
  }, {
    logger: logger
  });

  var _useSendMessageCallba = useSendMessageCallback({
    currentGroupChannel: currentGroupChannel,
    onBeforeSendUserMessage: onBeforeSendUserMessage
  }, {
    sdk: sdk,
    logger: logger,
    pubSub: pubSub,
    messagesDispatcher: messagesDispatcher
  }),
      _useSendMessageCallba2 = _slicedToArray(_useSendMessageCallba, 2),
      messageInputRef = _useSendMessageCallba2[0],
      onSendMessage = _useSendMessageCallba2[1];

  var _useSendFileMessageCa = useSendFileMessageCallback({
    currentGroupChannel: currentGroupChannel,
    onBeforeSendFileMessage: onBeforeSendFileMessage
  }, {
    sdk: sdk,
    logger: logger,
    pubSub: pubSub,
    messagesDispatcher: messagesDispatcher
  }),
      _useSendFileMessageCa2 = _slicedToArray(_useSendFileMessageCa, 1),
      onSendFileMessage = _useSendFileMessageCa2[0];

  if (sdkError) {
    return React.createElement("div", {
      className: "sendbird-conversation"
    }, React.createElement(PlaceHolder, {
      type: PlaceHolderTypes.WRONG,
      retryToConnect: function retryToConnect() {
        logger.info('Channel: reconnecting');
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

  return React.createElement(UserProfileProvider, {
    className: "sendbird-conversation",
    disableUserProfile: userDefinedDisableUserProfile,
    renderUserProfile: userDefinedRenderProfile
  }, renderChatHeader ? renderChatHeader({
    channel: currentGroupChannel,
    user: user
  }) : React.createElement(ChatHeader, {
    theme: theme,
    currentGroupChannel: currentGroupChannel,
    currentUser: user,
    onActionClick: onChatHeaderActionClick,
    subTitle: currentGroupChannel.members && currentGroupChannel.members.length !== 2,
    isActive: false,
    isMuted: false
  }), isFrozen && React.createElement(FrozenNotification, null), unreadCount > 0 && React.createElement(Notification, {
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
    userId: userId,
    hasMore: hasMore,
    disabled: !isOnline,
    onScroll: onScrollCallback,
    scrollRef: scrollRef,
    readStatus: readStatus,
    initialized: initialized,
    useReaction: usingReaction,
    allMessages: allMessages,
    emojiAllMap: emojiAllMap,
    membersMap: nicknamesMap,
    renderCustomMessage: renderCustomMessage,
    editDisabled: isDisabledBecauseFrozen(currentGroupChannel),
    deleteMessage: deleteMessage,
    updateMessage: updateMessage,
    resendMessage: resendMessage,
    toggleReaction: toggleReaction,
    emojiContainer: emojiContainer,
    renderChatItem: renderChatItem,
    useMessageGrouping: useMessageGrouping,
    messagesDispatcher: messagesDispatcher,
    currentGroupChannel: currentGroupChannel,
    memoizedEmojiListItems: memoizedEmojiListItems
  }), React.createElement("div", {
    className: "sendbird-conversation__footer"
  }, React.createElement(MessageInputWrapper$1, {
    channel: currentGroupChannel,
    user: user,
    ref: messageInputRef,
    onSendMessage: onSendMessage,
    onFileUpload: onSendFileMessage,
    renderMessageInput: renderMessageInput,
    isOnline: isOnline,
    initialized: initialized
  }), React.createElement("div", {
    className: "sendbird-conversation__typing-indicator"
  }, React.createElement(TypingIndicator, {
    channelUrl: channelUrl,
    sb: sdk,
    logger: logger
  })), !isOnline && React.createElement(ConnectionStatus, {
    sdkInit: sdkInit,
    sb: sdk,
    logger: logger
  })));
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
        FileMessageParams: PropTypes.any,
        getAllEmoji: PropTypes.func,
        appInfo: PropTypes.shape({})
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
    disableUserProfile: PropTypes.bool,
    renderUserProfile: PropTypes.func,
    userId: PropTypes.string.isRequired,
    isOnline: PropTypes.bool.isRequired,
    theme: PropTypes.string,
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
    messageListParams: PropTypes.shape({
      includeMetaArray: PropTypes.bool,
      includeParentMessageText: PropTypes.bool,
      includeReaction: PropTypes.bool,
      includeReplies: PropTypes.bool,
      includeThreadInfo: PropTypes.bool,
      limit: PropTypes.number,
      reverse: PropTypes.bool,
      senderUserIdsFilter: PropTypes.arrayOf(PropTypes.string)
    }),
    // deprecate in v1.3
    messageListQuery: PropTypes.shape({
      includeMetaArray: PropTypes.bool,
      includeParentMessageText: PropTypes.bool,
      includeReaction: PropTypes.bool,
      includeReplies: PropTypes.bool,
      includeThreadInfo: PropTypes.bool,
      limit: PropTypes.number,
      reverse: PropTypes.bool,
      senderUserIdsFilter: PropTypes.arrayOf(PropTypes.string)
    })
  }),
  onBeforeSendUserMessage: PropTypes.func,
  // onBeforeSendUserMessage(text)
  onBeforeSendFileMessage: PropTypes.func,
  // onBeforeSendFileMessage(File)
  onBeforeUpdateUserMessage: PropTypes.func,
  renderChatItem: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  renderMessageInput: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  renderChatHeader: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  renderCustomMessage: PropTypes.func,
  onChatHeaderActionClick: PropTypes.func,
  useReaction: PropTypes.bool,
  disableUserProfile: PropTypes.bool,
  renderUserProfile: PropTypes.func,
  useMessageGrouping: PropTypes.bool
};
ConversationPanel.defaultProps = {
  channelUrl: null,
  queries: {},
  onBeforeSendUserMessage: null,
  onBeforeSendFileMessage: null,
  onBeforeUpdateUserMessage: null,
  renderChatItem: null,
  renderMessageInput: null,
  renderChatHeader: null,
  renderCustomMessage: null,
  useReaction: true,
  disableUserProfile: false,
  renderUserProfile: null,
  useMessageGrouping: true,
  onChatHeaderActionClick: noop$7
};
var getEmojiCategoriesFromEmojiContainer$1 = getEmojiCategoriesFromEmojiContainer,
    getAllEmojisFromEmojiContainer$1 = getAllEmojisFromEmojiContainer,
    getEmojisFromEmojiContainer$1 = getEmojisFromEmojiContainer;
var Conversation = withSendbirdContext(ConversationPanel);

var EditDetails = function EditDetails(props) {
  var _onSubmit = props.onSubmit,
      onCancel = props.onCancel,
      channel = props.channel,
      userId = props.userId,
      theme = props.theme;
  var inputRef = useRef(null);
  var formRef = useRef(null);
  var hiddenInputRef = useRef(null);

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      currentImg = _useState2[0],
      setCurrentImg = _useState2[1];

  var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      newFile = _useState4[0],
      setNewFile = _useState4[1];

  var _useContext = useContext(LocalizationContext),
      stringSet = _useContext.stringSet;

  var title = channel.name;
  return React.createElement(Modal, {
    titleText: stringSet.MODAL__CHANNEL_INFORMATION__TITLE,
    submitText: stringSet.BUTTON__SAVE,
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
    ref: formRef,
    onSubmit: function onSubmit(e) {
      e.preventDefault();
    }
  }, React.createElement("div", {
    className: "channel-profile-form__img-section"
  }, React.createElement(InputLabel, null, stringSet.MODAL__CHANNEL_INFORMATION__CHANNEL_IMAGE), React.createElement("div", {
    className: "channel-profile-form__avatar"
  }, currentImg ? React.createElement(Avatar$1, {
    height: "80px",
    width: "80px",
    src: currentImg
  }) : React.createElement(ChannelAvatar, {
    height: 80,
    width: 80,
    channel: channel,
    userId: userId,
    theme: theme
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
  }, stringSet.MODAL__CHANNEL_INFORMATION__UPLOAD))), React.createElement("div", {
    className: "channel-profile-form__name-section"
  }, React.createElement(InputLabel, null, stringSet.MODAL__CHANNEL_INFORMATION__CHANNEL_NAME), React.createElement(Input, {
    required: title !== '',
    name: "channel-profile-form__name",
    ref: inputRef,
    value: title,
    placeHolder: stringSet.MODAL__CHANNEL_INFORMATION__INPUT__PLACE_HOLDER
  }))));
};

EditDetails.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  channel: PropTypes.shape({
    name: PropTypes.string
  }).isRequired,
  userId: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired
};

var ChannelProfile = function ChannelProfile(props) {
  var disabled = props.disabled,
      channel = props.channel,
      userId = props.userId,
      theme = props.theme,
      onChannelInfoChange = props.onChannelInfoChange;
  var title = channel.name;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      showModal = _useState2[0],
      setShowModal = _useState2[1];

  var _useContext = useContext(LocalizationContext),
      stringSet = _useContext.stringSet;

  return React.createElement("div", {
    className: "sendbird-channel-profile"
  }, React.createElement("div", {
    className: "sendbird-channel-profile--inner"
  }, React.createElement("div", {
    className: "sendbird-channel-profile__avatar"
  }, React.createElement(ChannelAvatar, {
    channel: channel,
    userId: userId,
    theme: theme
  })), React.createElement(Label, {
    type: LabelTypography.SUBTITLE_2,
    color: LabelColors.ONBACKGROUND_1,
    className: "sendbird-channel-profile__title"
  }, title), React.createElement(TextButton, {
    disabled: disabled,
    className: "sendbird-channel-profile__edit",
    onClick: function onClick() {
      if (disabled) {
        return;
      }

      setShowModal(true);
    },
    notUnderline: true
  }, React.createElement(Label, {
    type: LabelTypography.BUTTON_1,
    color: disabled ? LabelColors.ONBACKGROUND_2 : LabelColors.PRIMARY
  }, stringSet.CHANNEL_SETTING__PROFILE__EDIT)), showModal && React.createElement(EditDetails, {
    onCancel: function onCancel() {
      return setShowModal(false);
    },
    onSubmit: onChannelInfoChange,
    channel: channel,
    userId: userId,
    theme: theme
  })));
};

ChannelProfile.propTypes = {
  channel: PropTypes.shape({
    name: PropTypes.string
  }).isRequired,
  userId: PropTypes.string.isRequired,
  theme: PropTypes.string,
  disabled: PropTypes.bool,
  onChannelInfoChange: PropTypes.func
};
ChannelProfile.defaultProps = {
  theme: 'light',
  disabled: false,
  onChannelInfoChange: function onChannelInfoChange() {}
};

function MembersModal(_a) {
  var hideModal = _a.hideModal,
      channel = _a.channel,
      currentUser = _a.currentUser;

  var _b = useState([]),
      members = _b[0],
      setMembers = _b[1];

  var _c = useState(null),
      memberQuery = _c[0],
      setMemberQuery = _c[1];

  useEffect(function () {
    var memberListQuery = channel.createMemberListQuery();
    memberListQuery.limit = 20;
    memberListQuery.next(function (members, error) {
      if (error) {
        return;
      }

      setMembers(members);
    });
    setMemberQuery(memberListQuery);
  }, []);
  return React.createElement("div", null, React.createElement(Modal, {
    hideFooter: true,
    onCancel: function onCancel() {
      return hideModal();
    },
    onSubmit: noop,
    titleText: "All Members"
  }, React.createElement("div", {
    className: "sendbird-more-members__popup-scroll",
    onScroll: function onScroll(e) {
      var hasNext = memberQuery.hasNext;
      var target = e.target;
      var fetchMore = target.clientHeight + target.scrollTop === target.scrollHeight;

      if (hasNext && fetchMore) {
        memberQuery.next(function (o, error) {
          if (error) {
            return;
          }

          setMembers(__spreadArrays(members, o));
        });
      }
    }
  }, members.map(function (member) {
    return React.createElement(UserListItem, {
      user: member,
      key: member.userId,
      currentUser: currentUser,
      action: function action(_a) {
        var parentRef = _a.parentRef,
            actionRef = _a.actionRef;
        return React.createElement(React.Fragment, null, channel.myRole === 'operator' && React.createElement(ContextMenu, {
          menuTrigger: function menuTrigger(toggleDropdown) {
            return React.createElement(IconButton, {
              className: "sendbird-user-message__more__menu",
              width: "32px",
              height: "32px",
              onClick: toggleDropdown
            }, React.createElement(Icon, {
              width: "24px",
              height: "24px",
              type: IconTypes.MORE,
              fillColor: IconColors.CONTENT_INVERSE
            }));
          },
          menuItems: function menuItems(closeDropdown) {
            return React.createElement(MenuItems$1, {
              parentContainRef: parentRef,
              parentRef: actionRef // for catching location(x, y) of MenuItems
              ,
              closeDropdown: closeDropdown,
              openLeft: true
            }, React.createElement(MenuItem, {
              onClick: function onClick() {
                if (member.role !== 'operator') {
                  channel.addOperators([member.userId], function () {
                    setMembers(members.map(function (m) {
                      if (m.userId === member.userId) {
                        return __assign(__assign({}, member), {
                          role: 'operator'
                        });
                      }

                      return m;
                    }));
                    closeDropdown();
                  });
                } else {
                  channel.removeOperators([member.userId], function () {
                    setMembers(members.map(function (m) {
                      if (m.userId === member.userId) {
                        return __assign(__assign({}, member), {
                          role: ''
                        });
                      }

                      return m;
                    }));
                    closeDropdown();
                  });
                }
              }
            }, member.role !== 'operator' ? 'Promote to operator' : 'Demote operator'), // No muted members in broadcast channel
            !channel.isBroadcast && React.createElement(MenuItem, {
              onClick: function onClick() {
                if (member.isMuted) {
                  channel.unmuteUser(member, function () {
                    setMembers(members.map(function (m) {
                      if (m.userId === member.userId) {
                        return __assign(__assign({}, member), {
                          isMuted: false
                        });
                      }

                      return m;
                    }));
                    closeDropdown();
                  });
                } else {
                  channel.muteUser(member, function () {
                    setMembers(members.map(function (m) {
                      if (m.userId === member.userId) {
                        return __assign(__assign({}, member), {
                          isMuted: true
                        });
                      }

                      return m;
                    }));
                    closeDropdown();
                  });
                }
              }
            }, member.isMuted ? 'Unmute' : 'Mute'), React.createElement(MenuItem, {
              onClick: function onClick() {
                channel.banUser(member, -1, '', function () {
                  setMembers(members.filter(function (_a) {
                    var userId = _a.userId;
                    return userId !== member.userId;
                  }));
                });
              }
            }, "Ban"));
          }
        }));
      }
    });
  }))));
}

var SHOWN_MEMBER_MAX = 10;

var UserListItem$1 = function UserListItem(_ref) {
  var _ref$member = _ref.member,
      member = _ref$member === void 0 ? {} : _ref$member,
      _ref$currentUser = _ref.currentUser,
      currentUser = _ref$currentUser === void 0 ? '' : _ref$currentUser;
  var avatarRef = useRef(null);

  var _useContext = useContext(UserProfileContext),
      disableUserProfile = _useContext.disableUserProfile,
      renderUserProfile = _useContext.renderUserProfile;

  var _useContext2 = useContext(LocalizationContext),
      stringSet = _useContext2.stringSet;

  return React.createElement("div", {
    className: "sendbird-members-accordion__member"
  }, React.createElement("div", {
    className: "sendbird-members-accordion__member-avatar"
  }, React.createElement(ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return React.createElement(Avatar$1, {
        onClick: function onClick() {
          if (!disableUserProfile) {
            toggleDropdown();
          }
        },
        ref: avatarRef,
        src: member.profileUrl,
        width: 24,
        height: 24
      });
    },
    menuItems: function menuItems(closeDropdown) {
      return React.createElement(MenuItems$1, {
        openLeft: true,
        parentRef: avatarRef // for catching location(x, y) of MenuItems
        ,
        parentContainRef: avatarRef // for toggling more options(menus & reactions)
        ,
        closeDropdown: closeDropdown,
        style: {
          paddingTop: 0,
          paddingBottom: 0
        }
      }, renderUserProfile ? renderUserProfile({
        user: member,
        currentUserId: currentUser,
        close: closeDropdown
      }) : React.createElement(ConnectedUserProfile, {
        user: member,
        currentUserId: currentUser,
        onSuccess: closeDropdown
      }));
    }
  })), React.createElement(Label, {
    type: LabelTypography.SUBTITLE_2,
    color: LabelColors.ONBACKGROUND_1
  }, member.nickname || stringSet.NO_NAME, currentUser === member.userId && ' (You)'));
};

UserListItem$1.propTypes = {
  member: PropTypes.shape({
    userId: PropTypes.string,
    profileUrl: PropTypes.string,
    nickname: PropTypes.string
  }).isRequired,
  currentUser: PropTypes.string.isRequired
};

var MemebersAccordion = function MemebersAccordion(_ref2) {
  var channel = _ref2.channel,
      disabled = _ref2.disabled,
      currentUser = _ref2.currentUser,
      userQueryCreator = _ref2.userQueryCreator,
      onInviteMemebers = _ref2.onInviteMemebers,
      swapParams = _ref2.swapParams;
  var members = channel.members || [];

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      showMoreModal = _useState2[0],
      setShowMoreModal = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      showAddUserModal = _useState4[0],
      setShowAddUserModal = _useState4[1];

  var _useContext3 = useContext(LocalizationContext),
      stringSet = _useContext3.stringSet;

  return React.createElement("div", {
    className: "sendbird-members-accordion"
  }, React.createElement("div", {
    className: "sendbird-members-accordion__list"
  }, members.slice(0, SHOWN_MEMBER_MAX).map(function (member) {
    return React.createElement(UserListItem$1, {
      member: member,
      currentUser: currentUser,
      key: member.userId
    });
  })), React.createElement("div", {
    className: "sendbird-members-accordion__footer"
  }, members.length >= SHOWN_MEMBER_MAX && React.createElement(Button, {
    className: "sendbird-members-accordion__footer__all-members",
    type: Type$1.SECONDARY,
    size: Size.SMALL,
    onClick: function onClick() {
      return setShowMoreModal(true);
    }
  }, stringSet.CHANNEL_SETTING__MEMBERS__SEE_ALL_MEMBERS), members.length >= SHOWN_MEMBER_MAX && showMoreModal && React.createElement(MembersModal, {
    currentUser: currentUser,
    hideModal: function hideModal() {
      setShowMoreModal(false);
    },
    channel: channel
  }), React.createElement(Button, {
    className: "sendbird-members-accordion__footer__invite-users",
    type: Type$1.SECONDARY,
    size: Size.SMALL,
    disabled: disabled,
    onClick: function onClick() {
      if (disabled) {
        return;
      }

      setShowAddUserModal(true);
    }
  }, stringSet.CHANNEL_SETTING__MEMBERS__INVITE_MEMBER), showAddUserModal && React.createElement(InviteMembers, {
    swapParams: swapParams,
    titleText: stringSet.MODAL__INVITE_MEMBER__TITLE,
    submitText: stringSet.BUTTON__INVITE,
    closeModal: function closeModal() {
      return setShowAddUserModal(false);
    },
    idsToFilter: members.map(function (member) {
      return member.userId;
    }),
    userQueryCreator: userQueryCreator,
    onSubmit: onInviteMemebers
  })));
};

MemebersAccordion.propTypes = {
  swapParams: PropTypes.bool,
  disabled: PropTypes.bool,
  channel: PropTypes.shape({
    members: PropTypes.arrayOf(PropTypes.shape({}))
  }),
  currentUser: PropTypes.string,
  userQueryCreator: PropTypes.func.isRequired,
  onInviteMemebers: PropTypes.func.isRequired
};
MemebersAccordion.defaultProps = {
  swapParams: false,
  currentUser: '',
  disabled: false,
  channel: {}
};

var Context = React.createContext({
  opened: '',
  setOpened: noop
});
var Consumer = Context.Consumer;
var Provider = Context.Provider;

// Wraps all the accordions in an accordion set
function AccordionGroup(_a) {
  var children = _a.children,
      _b = _a.className,
      className = _b === void 0 ? '' : _b;

  var _c = useState(''),
      opened = _c[0],
      setOpened = _c[1];

  return React.createElement(Provider, {
    value: {
      opened: opened,
      setOpened: setOpened
    }
  }, React.createElement("div", {
    className: className
  }, children));
}

function Accordion(_a) {
  var id = _a.id,
      renderTitle = _a.renderTitle,
      renderContent = _a.renderContent,
      renderFooter = _a.renderFooter,
      className = _a.className;

  var _b = useState(false),
      showAccordion = _b[0],
      setShowAccordion = _b[1];

  return React.createElement(Consumer, null, function (value) {
    var opened = value.opened,
        setOpened = value.setOpened;

    if (id === opened) {
      setShowAccordion(true);
    } else {
      setShowAccordion(false);
    }

    var handleClick = function handleClick() {
      if (showAccordion) {
        setOpened('');
      } else {
        setOpened(id);
      }
    };

    return React.createElement(React.Fragment, null, React.createElement("div", {
      id: id,
      role: "switch",
      "aria-checked": false,
      tabIndex: 0,
      onKeyDown: handleClick,
      className: "sendbird-accordion__panel-heder " + className,
      onClick: handleClick
    }, renderTitle(), React.createElement(Icon, {
      type: IconTypes.SHEVRON,
      className: ['sendbird-accordion__panel-icon-right', 'sendbird-accordion__panel-icon--chevron', showAccordion ? 'sendbird-accordion__panel-icon--open' : ''].join(' '),
      height: "24px",
      width: "24px"
    })), showAccordion && React.createElement("div", {
      className: "sendbird-accordion"
    }, React.createElement("div", {
      className: "sendbird-accordion__list"
    }, renderContent()), renderFooter && React.createElement("div", {
      className: "sendbird-accordion__footer"
    }, renderFooter())));
  });
}
var AccordionGroup$1 = AccordionGroup;

// might move to reusable/UI
var COMPONENT_NAME$1 = 'sendbird-user-list-item--small';

var UserListItem$2 = function UserListItem(_a) {
  var user = _a.user,
      className = _a.className,
      currentUser = _a.currentUser,
      action = _a.action;
  var actionRef = useRef(null);
  var parentRef = useRef(null);
  var avatarRef = useRef(null);
  var stringSet = useContext(LocalizationContext).stringSet;

  var _b = useContext(UserProfileContext),
      disableUserProfile = _b.disableUserProfile,
      renderUserProfile = _b.renderUserProfile;

  var injectingClassNames = Array.isArray(className) ? className : [className];
  return React.createElement("div", {
    ref: parentRef,
    className: __spreadArrays([COMPONENT_NAME$1], injectingClassNames).join(' ')
  }, user.isMuted && React.createElement(MutedAvatarOverlay, null), React.createElement(ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return React.createElement(Avatar$1, {
        onClick: function onClick() {
          if (!disableUserProfile) {
            toggleDropdown();
          }
        },
        ref: avatarRef,
        className: COMPONENT_NAME$1 + "__avatar",
        src: user.profileUrl,
        width: 24,
        height: 24
      });
    },
    menuItems: function menuItems(closeDropdown) {
      return React.createElement(MenuItems$1, {
        openLeft: true,
        parentRef: avatarRef // for catching location(x, y) of MenuItems
        ,
        parentContainRef: avatarRef // for toggling more options(menus & reactions)
        ,
        closeDropdown: closeDropdown,
        style: {
          paddingTop: 0,
          paddingBottom: 0
        }
      }, renderUserProfile ? renderUserProfile({
        user: user,
        currentUserId: currentUser,
        close: closeDropdown
      }) : React.createElement(ConnectedUserProfile, {
        user: user,
        currentUserId: currentUser,
        onSuccess: closeDropdown
      }));
    }
  }), React.createElement(Label, {
    className: COMPONENT_NAME$1 + "__title",
    type: LabelTypography.SUBTITLE_1,
    color: LabelColors.ONBACKGROUND_1
  }, user.nickname || stringSet.NO_NAME, currentUser === user.userId && " (You)"), !user.nickname && React.createElement(Label, {
    className: COMPONENT_NAME$1 + "__subtitle",
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_2
  }, user.userId), user.role === 'operator' && React.createElement(Label, {
    className: COMPONENT_NAME$1 + "__operator",
    type: LabelTypography.SUBTITLE_2,
    color: LabelColors.ONBACKGROUND_2
  }, "Operator"), action && React.createElement("div", {
    ref: actionRef,
    className: COMPONENT_NAME$1 + "__action"
  }, action({
    actionRef: actionRef,
    parentRef: parentRef
  })));
};

function OperatorsModal(_a) {
  var hideModal = _a.hideModal,
      channel = _a.channel,
      currentUser = _a.currentUser;

  var _b = useState([]),
      operators = _b[0],
      setOperators = _b[1];

  var _c = useState(null),
      operatorQuery = _c[0],
      setOperatorQuery = _c[1];

  useEffect(function () {
    var operatorListQuery = channel.createOperatorListQuery();
    operatorListQuery.limit = 20;
    operatorListQuery.next(function (operators, error) {
      if (error) {
        return;
      }

      setOperators(operators);
    });
    setOperatorQuery(operatorListQuery);
  }, []);
  return React.createElement("div", null, React.createElement(Modal, {
    hideFooter: true,
    onCancel: function onCancel() {
      return hideModal();
    },
    onSubmit: noop,
    titleText: "All operators"
  }, React.createElement("div", {
    className: "sendbird-more-members__popup-scroll",
    onScroll: function onScroll(e) {
      var hasNext = operatorQuery.hasNext;
      var target = e.target;
      var fetchMore = target.clientHeight + target.scrollTop === target.scrollHeight;

      if (hasNext && fetchMore) {
        operatorQuery.next(function (o, error) {
          if (error) {
            return;
          }

          setOperators(__spreadArrays(operators, o));
        });
      }
    }
  }, operators.map(function (member) {
    return React.createElement(UserListItem, {
      currentUser: currentUser,
      user: member,
      key: member.userId,
      action: function action(_a) {
        var parentRef = _a.parentRef,
            actionRef = _a.actionRef;
        return React.createElement(ContextMenu, {
          menuTrigger: function menuTrigger(toggleDropdown) {
            return React.createElement(IconButton, {
              className: "sendbird-user-message__more__menu",
              width: "32px",
              height: "32px",
              onClick: toggleDropdown
            }, React.createElement(Icon, {
              width: "24px",
              height: "24px",
              type: IconTypes.MORE,
              fillColor: IconColors.CONTENT_INVERSE
            }));
          },
          menuItems: function menuItems(closeDropdown) {
            return React.createElement(MenuItems$1, {
              parentContainRef: parentRef,
              parentRef: actionRef // for catching location(x, y) of MenuItems
              ,
              closeDropdown: closeDropdown,
              openLeft: true
            }, React.createElement(MenuItem, {
              onClick: function onClick() {
                channel.removeOperators([member.userId], function (response, error) {
                  if (error) {
                    return;
                  }

                  setOperators(operators.filter(function (_a) {
                    var userId = _a.userId;
                    return userId !== member.userId;
                  }));
                });
                closeDropdown();
              }
            }, "Dismiss operator"));
          }
        });
      }
    });
  }))));
}

function AddOperatorsModal(_a) {
  var hideModal = _a.hideModal,
      channel = _a.channel,
      _onSubmit = _a.onSubmit;

  var _b = useState([]),
      members = _b[0],
      setMembers = _b[1];

  var _c = useState({}),
      selectedMembers = _c[0],
      setSelectedMembers = _c[1];

  var _d = useState(null),
      memberQuery = _d[0],
      setMemberQuery = _d[1];

  var stringSet = useContext(LocalizationContext).stringSet;
  useEffect(function () {
    var memberListQuery = channel.createMemberListQuery();
    memberListQuery.limit = 20;
    memberListQuery.next(function (members, error) {
      if (error) {
        return;
      }

      setMembers(members);
    });
    setMemberQuery(memberListQuery);
  }, []);
  var selectedCount = Object.keys(selectedMembers).filter(function (m) {
    return selectedMembers[m];
  }).length;
  return React.createElement("div", null, React.createElement(Modal, {
    type: Type$1.PRIMARY,
    submitText: "Add",
    onCancel: function onCancel() {
      return hideModal();
    },
    onSubmit: function onSubmit() {
      var members = Object.keys(selectedMembers).filter(function (m) {
        return selectedMembers[m];
      });

      _onSubmit(members);
    },
    titleText: "Select members"
  }, React.createElement(Label, {
    color: selectedCount > 0 ? LabelColors.PRIMARY : LabelColors.ONBACKGROUND_3,
    type: LabelTypography.CAPTION_1
  }, selectedCount + " " + stringSet.MODAL__INVITE_MEMBER__SELECTEC), React.createElement("div", {
    className: "sendbird-more-members__popup-scroll",
    onScroll: function onScroll(e) {
      var hasNext = memberQuery.hasNext;
      var target = e.target;
      var fetchMore = target.clientHeight + target.scrollTop === target.scrollHeight;

      if (hasNext && fetchMore) {
        memberQuery.next(function (o, error) {
          if (error) {
            return;
          }

          setMembers(__spreadArrays(members, o));
        });
      }
    }
  }, members.map(function (member) {
    return React.createElement(UserListItem, {
      checkBox: true,
      checked: selectedMembers[member.userId],
      onChange: function onChange(event) {
        var _a;

        var modifiedSelectedMembers = __assign(__assign({}, selectedMembers), (_a = {}, _a[event.target.id] = event.target.checked, _a));

        if (!event.target.checked) {
          delete modifiedSelectedMembers[event.target.id];
        }

        setSelectedMembers(modifiedSelectedMembers);
      },
      user: member,
      key: member.userId
    });
  }))));
}

var OperatorList = function OperatorList(_a) {
  var sdk = _a.sdk,
      channel = _a.channel;

  var _b = useState([]),
      operators = _b[0],
      setOperators = _b[1];

  var _c = useState(false),
      showMore = _c[0],
      setShowMore = _c[1];

  var _d = useState(false),
      showAdd = _d[0],
      setShowAdd = _d[1];

  var _e = useState(false),
      hasNext = _e[0],
      setHasNext = _e[1];

  var stringSet = useContext(LocalizationContext).stringSet;
  useEffect(function () {
    if (!channel) {
      setOperators([]);
      return;
    }

    var operatorListQuery = channel.createOperatorListQuery();
    operatorListQuery.limit = 10;
    operatorListQuery.next(function (operators, error) {
      if (error) {
        return;
      }

      setOperators(operators);
      setHasNext(operatorListQuery.hasNext);
    });
  }, [channel]);
  var refershList = useCallback(function () {
    if (!channel) {
      setOperators([]);
      return;
    }

    var operatorListQuery = channel.createOperatorListQuery();
    operatorListQuery.limit = 10;
    operatorListQuery.next(function (operators, error) {
      if (error) {
        return;
      }

      setOperators(operators);
      setHasNext(operatorListQuery.hasNext);
    });
  }, [channel]);
  return React.createElement(React.Fragment, null, operators.map(function (operator) {
    return React.createElement(UserListItem$2, {
      key: operator.userId,
      user: operator,
      currentUser: sdk.currentUser.userId,
      action: function action(_a) {
        var actionRef = _a.actionRef,
            parentRef = _a.parentRef;
        return React.createElement(ContextMenu, {
          menuTrigger: function menuTrigger(toggleDropdown) {
            return React.createElement(IconButton, {
              className: "sendbird-user-message__more__menu",
              width: "32px",
              height: "32px",
              onClick: toggleDropdown
            }, React.createElement(Icon, {
              width: "24px",
              height: "24px",
              type: IconTypes.MORE,
              fillColor: IconColors.CONTENT_INVERSE
            }));
          },
          menuItems: function menuItems(closeDropdown) {
            return React.createElement(MenuItems$1, {
              parentContainRef: parentRef,
              parentRef: actionRef // for catching location(x, y) of MenuItems
              ,
              closeDropdown: closeDropdown,
              openLeft: true
            }, React.createElement(MenuItem, {
              onClick: function onClick() {
                channel.removeOperators([operator.userId], function (response, error) {
                  if (error) {
                    return;
                  }

                  setOperators(operators.filter(function (_a) {
                    var userId = _a.userId;
                    return userId !== operator.userId;
                  }));
                });
                closeDropdown();
              }
            }, "Dismiss operator"));
          }
        });
      }
    });
  }), hasNext && React.createElement("div", {
    className: "sendbird-channel-settings-accordion__footer"
  }, React.createElement(Button, {
    type: Type$1.SECONDARY,
    size: Size.SMALL,
    onClick: function onClick() {
      setShowMore(true);
    }
  }, stringSet.CHANNEL_SETTING__OPERATORS__TITLE_ALL), React.createElement(Button, {
    type: Type$1.SECONDARY,
    size: Size.SMALL,
    onClick: function onClick() {
      setShowAdd(true);
    }
  }, stringSet.CHANNEL_SETTING__OPERATORS__TITLE_ADD)), showMore && React.createElement(OperatorsModal, {
    currentUser: sdk.currentUser.userId,
    hideModal: function hideModal() {
      setShowMore(false);
      refershList();
    },
    channel: channel
  }), showAdd && React.createElement(AddOperatorsModal, {
    hideModal: function hideModal() {
      return setShowAdd(false);
    },
    channel: channel,
    onSubmit: function onSubmit(members) {
      setShowAdd(false);
      channel.addOperators(members, function () {
        refershList();
      });
    }
  }));
};

var mapStoreToProps$2 = function mapStoreToProps(store) {
  return {
    sdk: getSdk(store)
  };
};

var OperatorList$1 = withSendbirdContext(OperatorList, mapStoreToProps$2);

function InviteMembers$1(_a) {
  var hideModal = _a.hideModal,
      userQueryCreator = _a.userQueryCreator,
      _onSubmit = _a.onSubmit;

  var _b = useState([]),
      members = _b[0],
      setMembers = _b[1];

  var _c = useState({}),
      selectedMembers = _c[0],
      setSelectedMembers = _c[1];

  var _d = useState(null),
      userQuery = _d[0],
      setUserQuery = _d[1];

  useEffect(function () {
    var userListQuery = userQueryCreator();
    userListQuery.limit = 20;
    userListQuery.next(function (members, error) {
      if (error) {
        return;
      }

      setMembers(members);
    });
    setUserQuery(userListQuery);
  }, []);
  return React.createElement("div", null, React.createElement(Modal, {
    disabled: Object.keys(selectedMembers).length === 0,
    submitText: "Invite",
    type: Type$1.PRIMARY,
    onCancel: function onCancel() {
      return hideModal();
    },
    onSubmit: function onSubmit() {
      var members = Object.keys(selectedMembers).filter(function (m) {
        return selectedMembers[m];
      });

      _onSubmit(members);
    },
    titleText: "Select members"
  }, React.createElement("div", {
    className: "sendbird-more-members__popup-scroll",
    onScroll: function onScroll(e) {
      var hasNext = userQuery.hasNext;
      var target = e.target;
      var fetchMore = target.clientHeight + target.scrollTop === target.scrollHeight;

      if (hasNext && fetchMore) {
        userQuery.next(function (o, error) {
          if (error) {
            return;
          }

          setMembers(__spreadArrays(members, o));
        });
      }
    }
  }, members.map(function (member) {
    return React.createElement(UserListItem, {
      checkBox: true,
      checked: selectedMembers[member.userId],
      onChange: function onChange(event) {
        var _a;

        var modifiedSelectedMembers = __assign(__assign({}, selectedMembers), (_a = {}, _a[event.target.id] = event.target.checked, _a));

        if (!event.target.checked) {
          delete modifiedSelectedMembers[event.target.id];
        }

        setSelectedMembers(modifiedSelectedMembers);
      },
      user: member,
      key: member.userId
    });
  }))));
}

var MemberList = function MemberList(_a) {
  var sdk = _a.sdk,
      channel = _a.channel,
      userQueryCreator = _a.userQueryCreator;

  var _b = useState([]),
      members = _b[0],
      setMembers = _b[1];

  var _c = useState(false),
      hasNext = _c[0],
      setHasNext = _c[1];

  var _d = useState(false),
      showAllMembers = _d[0],
      setShowAllMembers = _d[1];

  var _e = useState(false),
      showInviteMembers = _e[0],
      setShowInviteMembers = _e[1];

  useEffect(function () {
    if (!channel) {
      setMembers([]);
      return;
    }

    var memberUserListQuery = channel.createMemberListQuery();
    memberUserListQuery.limit = 10;
    memberUserListQuery.next(function (members, error) {
      if (error) {
        return;
      }

      setMembers(members);
      setHasNext(memberUserListQuery.hasNext);
    });
  }, [channel]);
  var refershList = useCallback(function () {
    if (!channel) {
      setMembers([]);
      return;
    }

    var memberUserListQuery = channel.createMemberListQuery();
    memberUserListQuery.limit = 10;
    memberUserListQuery.next(function (members, error) {
      if (error) {
        return;
      }

      setMembers(members);
      setHasNext(memberUserListQuery.hasNext);
    });
  }, [channel]);
  return React.createElement(React.Fragment, null, members.map(function (member) {
    return React.createElement(UserListItem$2, {
      key: member.userId,
      user: member,
      currentUser: sdk.currentUser.userId,
      action: function action(_a) {
        var actionRef = _a.actionRef,
            parentRef = _a.parentRef;
        return React.createElement(ContextMenu, {
          menuTrigger: function menuTrigger(toggleDropdown) {
            return React.createElement(IconButton, {
              className: "sendbird-user-message__more__menu",
              width: "32px",
              height: "32px",
              onClick: toggleDropdown
            }, React.createElement(Icon, {
              width: "24px",
              height: "24px",
              type: IconTypes.MORE,
              fillColor: IconColors.CONTENT_INVERSE
            }));
          },
          menuItems: function menuItems(closeDropdown) {
            return React.createElement(MenuItems$1, {
              parentContainRef: parentRef,
              parentRef: actionRef // for catching location(x, y) of MenuItems
              ,
              closeDropdown: closeDropdown,
              openLeft: true
            }, React.createElement(MenuItem, {
              onClick: function onClick() {
                if (member.role !== 'operator') {
                  channel.addOperators([member.userId], function () {
                    refershList();
                    closeDropdown();
                  });
                } else {
                  channel.removeOperators([member.userId], function () {
                    refershList();
                    closeDropdown();
                  });
                }
              }
            }, member.role !== 'operator' ? 'Promote to operator' : 'Demote operator'), // No muted members in broadcast channel
            !channel.isBroadcast && React.createElement(MenuItem, {
              onClick: function onClick() {
                if (member.isMuted) {
                  channel.unmuteUser(member, function () {
                    refershList();
                    closeDropdown();
                  });
                } else {
                  channel.muteUser(member, function () {
                    refershList();
                    closeDropdown();
                  });
                }
              }
            }, member.isMuted ? 'Unmute' : 'Mute'), React.createElement(MenuItem, {
              onClick: function onClick() {
                channel.banUser(member, -1, '', function () {
                  refershList();
                  closeDropdown();
                });
              }
            }, "Ban"));
          }
        });
      }
    });
  }), React.createElement("div", {
    className: "sendbird-channel-settings-accordion__footer"
  }, hasNext && React.createElement(Button, {
    type: Type$1.SECONDARY,
    size: Size.SMALL,
    onClick: function onClick() {
      return setShowAllMembers(true);
    }
  }, "All members"), React.createElement(Button, {
    type: Type$1.SECONDARY,
    size: Size.SMALL,
    onClick: function onClick() {
      return setShowInviteMembers(true);
    }
  }, "Invite members")), showAllMembers && React.createElement(MembersModal, {
    currentUser: sdk.currentUser.userId,
    channel: channel,
    hideModal: function hideModal() {
      setShowAllMembers(false);
      refershList();
    }
  }), showInviteMembers && React.createElement(InviteMembers$1, {
    userQueryCreator: userQueryCreator,
    onSubmit: function onSubmit(selectedMemebers) {
      channel.inviteWithUserIds(selectedMemebers, function () {
        setShowInviteMembers(false);
        refershList();
      });
    },
    channel: channel,
    hideModal: function hideModal() {
      return setShowInviteMembers(false);
    }
  }));
};

var mapStoreToProps$3 = function mapStoreToProps(store) {
  return {
    sdk: getSdk(store)
  };
};

var MemberList$1 = withSendbirdContext(MemberList, mapStoreToProps$3);

function BannedMembersModal(_a) {
  var hideModal = _a.hideModal,
      channel = _a.channel;

  var _b = useState([]),
      members = _b[0],
      setMembers = _b[1];

  var _c = useState(null),
      memberQuery = _c[0],
      setMemberQuery = _c[1];

  useEffect(function () {
    var bannedUserListQuery = channel.createBannedUserListQuery();
    bannedUserListQuery.next(function (users, error) {
      if (error) {
        return;
      }

      setMembers(users);
    });
    setMemberQuery(bannedUserListQuery);
  }, []);
  return React.createElement("div", null, React.createElement(Modal, {
    hideFooter: true,
    onCancel: function onCancel() {
      return hideModal();
    },
    onSubmit: noop,
    titleText: "Muted members"
  }, React.createElement("div", {
    className: "sendbird-more-members__popup-scroll",
    onScroll: function onScroll(e) {
      var hasNext = memberQuery.hasNext;
      var target = e.target;
      var fetchMore = target.clientHeight + target.scrollTop === target.scrollHeight;

      if (hasNext && fetchMore) {
        memberQuery.next(function (o, error) {
          if (error) {
            return;
          }

          setMembers(__spreadArrays(members, o));
        });
      }
    }
  }, members.map(function (member) {
    return React.createElement(UserListItem, {
      user: member,
      key: member.userId,
      action: function action(_a) {
        var parentRef = _a.parentRef,
            actionRef = _a.actionRef;
        return React.createElement(ContextMenu, {
          menuTrigger: function menuTrigger(toggleDropdown) {
            return React.createElement(IconButton, {
              className: "sendbird-user-message__more__menu",
              width: "32px",
              height: "32px",
              onClick: toggleDropdown
            }, React.createElement(Icon, {
              width: "24px",
              height: "24px",
              type: IconTypes.MORE,
              fillColor: IconColors.CONTENT_INVERSE
            }));
          },
          menuItems: function menuItems(closeDropdown) {
            return React.createElement(MenuItems$1, {
              parentContainRef: parentRef,
              parentRef: actionRef // for catching location(x, y) of MenuItems
              ,
              closeDropdown: closeDropdown,
              openLeft: true
            }, React.createElement(MenuItem, {
              onClick: function onClick() {
                channel.unbanUser(member, function () {
                  closeDropdown();
                  setMembers(members.filter(function (m) {
                    return m.userId !== member.userId;
                  }));
                });
              }
            }, "Unban"));
          }
        });
      }
    });
  }))));
}

var BannedMemberList = function BannedMemberList(_a) {
  var channel = _a.channel;

  var _b = useState([]),
      members = _b[0],
      setMembers = _b[1];

  var _c = useState(false),
      hasNext = _c[0],
      setHasNext = _c[1];

  var _d = useState(false),
      showModal = _d[0],
      setShowModal = _d[1];

  useEffect(function () {
    if (!channel) {
      setMembers([]);
      return;
    }

    var bannedUserListQuery = channel.createBannedUserListQuery();
    bannedUserListQuery.next(function (users, error) {
      if (error) {
        return;
      }

      setMembers(users);
      setHasNext(bannedUserListQuery.hasNext);
    });
  }, [channel]);
  var refreshList = useCallback(function () {
    if (!channel) {
      setMembers([]);
      return;
    }

    var bannedUserListQuery = channel.createBannedUserListQuery();
    bannedUserListQuery.next(function (users, error) {
      if (error) {
        return;
      }

      setMembers(users);
      setHasNext(bannedUserListQuery.hasNext);
    });
  }, [channel]);
  return React.createElement(React.Fragment, null, members.map(function (member) {
    return React.createElement(UserListItem$2, {
      key: member.userId,
      user: member,
      action: function action(_a) {
        var actionRef = _a.actionRef,
            parentRef = _a.parentRef;
        return React.createElement(ContextMenu, {
          menuTrigger: function menuTrigger(toggleDropdown) {
            return React.createElement(IconButton, {
              className: "sendbird-user-message__more__menu",
              width: "32px",
              height: "32px",
              onClick: toggleDropdown
            }, React.createElement(Icon, {
              width: "24px",
              height: "24px",
              type: IconTypes.MORE,
              fillColor: IconColors.CONTENT_INVERSE
            }));
          },
          menuItems: function menuItems(closeDropdown) {
            return React.createElement(MenuItems$1, {
              parentContainRef: parentRef,
              parentRef: actionRef // for catching location(x, y) of MenuItems
              ,
              closeDropdown: closeDropdown,
              openLeft: true
            }, React.createElement(MenuItem, {
              onClick: function onClick() {
                channel.unbanUser(member, function () {
                  closeDropdown();
                  refreshList();
                });
              }
            }, "Unban"));
          }
        });
      }
    });
  }), members && members.length === 0 && React.createElement(Label, {
    className: "sendbird-channel-settings__empty-list",
    type: LabelTypography.SUBTITLE_2,
    color: LabelColors.ONBACKGROUND_3
  }, "No banned members yet"), hasNext && React.createElement("div", {
    className: "sendbird-channel-settings-accordion__footer"
  }, React.createElement(Button, {
    type: Type$1.SECONDARY,
    size: Size.SMALL,
    onClick: function onClick() {
      setShowModal(true);
    }
  }, "All banned members")), showModal && React.createElement(BannedMembersModal, {
    channel: channel,
    hideModal: function hideModal() {
      setShowModal(false);
      refreshList();
    }
  }));
};

var mapStoreToProps$4 = function mapStoreToProps(store) {
  return {
    sdk: getSdk(store)
  };
};

var BannedMemberList$1 = withSendbirdContext(BannedMemberList, mapStoreToProps$4);

function MutedMembersModal(_a) {
  var hideModal = _a.hideModal,
      channel = _a.channel,
      currentUser = _a.currentUser;

  var _b = useState([]),
      members = _b[0],
      setMembers = _b[1];

  var _c = useState(null),
      memberQuery = _c[0],
      setMemberQuery = _c[1];

  useEffect(function () {
    var memberUserListQuery = channel.createMemberListQuery();
    memberUserListQuery.limit = 10;
    memberUserListQuery.mutedMemberFilter = 'muted';
    memberUserListQuery.next(function (members, error) {
      if (error) {
        return;
      }

      setMembers(members);
    });
    setMemberQuery(memberUserListQuery);
  }, []);
  return React.createElement("div", null, React.createElement(Modal, {
    hideFooter: true,
    onCancel: function onCancel() {
      return hideModal();
    },
    onSubmit: noop,
    titleText: "Muted members"
  }, React.createElement("div", {
    className: "sendbird-more-members__popup-scroll",
    onScroll: function onScroll(e) {
      var hasNext = memberQuery.hasNext;
      var target = e.target;
      var fetchMore = target.clientHeight + target.scrollTop === target.scrollHeight;

      if (hasNext && fetchMore) {
        memberQuery.next(function (o, error) {
          if (error) {
            return;
          }

          setMembers(__spreadArrays(members, o));
        });
      }
    }
  }, members.map(function (member) {
    return React.createElement(UserListItem, {
      currentUser: currentUser,
      user: member,
      key: member.userId,
      action: function action(_a) {
        var actionRef = _a.actionRef,
            parentRef = _a.parentRef;
        return React.createElement(ContextMenu, {
          menuTrigger: function menuTrigger(toggleDropdown) {
            return React.createElement(IconButton, {
              className: "sendbird-user-message__more__menu",
              width: "32px",
              height: "32px",
              onClick: toggleDropdown
            }, React.createElement(Icon, {
              width: "24px",
              height: "24px",
              type: IconTypes.MORE,
              fillColor: IconColors.CONTENT_INVERSE
            }));
          },
          menuItems: function menuItems(closeDropdown) {
            return React.createElement(MenuItems$1, {
              parentContainRef: parentRef,
              parentRef: actionRef // for catching location(x, y) of MenuItems
              ,
              closeDropdown: closeDropdown,
              openLeft: true
            }, React.createElement(MenuItem, {
              onClick: function onClick() {
                channel.unmuteUser(member, function () {
                  closeDropdown();
                  setMembers(members.filter(function (m) {
                    return m.userId !== member.userId;
                  }));
                });
              }
            }, "Unmute"));
          }
        });
      }
    });
  }))));
}

var MutedMemberList = function MutedMemberList(_a) {
  var sdk = _a.sdk,
      channel = _a.channel;

  var _b = useState([]),
      members = _b[0],
      setMembers = _b[1];

  var _c = useState(false),
      hasNext = _c[0],
      setHasNext = _c[1];

  var _d = useState(false),
      showModal = _d[0],
      setShowModal = _d[1];

  useEffect(function () {
    if (!channel) {
      setMembers([]);
      return;
    }

    var memberUserListQuery = channel.createMemberListQuery();
    memberUserListQuery.limit = 10;
    memberUserListQuery.mutedMemberFilter = 'muted';
    memberUserListQuery.next(function (members, error) {
      if (error) {
        return;
      }

      setMembers(members);
      setHasNext(memberUserListQuery.hasNext);
    });
  }, [channel]);
  var refreshList = useCallback(function () {
    if (!channel) {
      setMembers([]);
      return;
    }

    var memberUserListQuery = channel.createMemberListQuery();
    memberUserListQuery.limit = 10;
    memberUserListQuery.mutedMemberFilter = 'muted';
    memberUserListQuery.next(function (members, error) {
      if (error) {
        return;
      }

      setMembers(members);
      setHasNext(memberUserListQuery.hasNext);
    });
  }, [channel]);
  return React.createElement(React.Fragment, null, members.map(function (member) {
    return React.createElement(UserListItem$2, {
      key: member.userId,
      user: member,
      currentUser: sdk.currentUser.userId,
      action: function action(_a) {
        var actionRef = _a.actionRef,
            parentRef = _a.parentRef;
        return React.createElement(ContextMenu, {
          menuTrigger: function menuTrigger(toggleDropdown) {
            return React.createElement(IconButton, {
              className: "sendbird-user-message__more__menu",
              width: "32px",
              height: "32px",
              onClick: toggleDropdown
            }, React.createElement(Icon, {
              width: "24px",
              height: "24px",
              type: IconTypes.MORE,
              fillColor: IconColors.CONTENT_INVERSE
            }));
          },
          menuItems: function menuItems(closeDropdown) {
            return React.createElement(MenuItems$1, {
              closeDropdown: closeDropdown,
              openLeft: true,
              parentContainRef: parentRef,
              parentRef: actionRef // for catching location(x, y) of MenuItems

            }, React.createElement(MenuItem, {
              onClick: function onClick() {
                channel.unmuteUser(member, function () {
                  refreshList();
                  closeDropdown();
                });
              }
            }, "Unmute"));
          }
        });
      }
    });
  }), members && members.length === 0 && React.createElement(Label, {
    className: "sendbird-channel-settings__empty-list",
    type: LabelTypography.SUBTITLE_2,
    color: LabelColors.ONBACKGROUND_3
  }, "No muted members yet"), hasNext && React.createElement("div", {
    className: "sendbird-channel-settings-accordion__footer"
  }, React.createElement(Button, {
    type: Type$1.SECONDARY,
    size: Size.SMALL,
    onClick: function onClick() {
      setShowModal(true);
    }
  }, "All muted members")), showModal && React.createElement(MutedMembersModal, {
    currentUser: sdk.currentUser.userId,
    channel: channel,
    hideModal: function hideModal() {
      setShowModal(false);
      refreshList();
    }
  }));
};

var mapStoreToProps$5 = function mapStoreToProps(store) {
  return {
    sdk: getSdk(store)
  };
};

var MutedMemberList$1 = withSendbirdContext(MutedMemberList, mapStoreToProps$5);

var kFormatter = function kFormatter(num) {
  return Math.abs(num) > 999 ? (Math.abs(num) / 1000).toFixed(1) + "K" : num;
};

function index(_a) {
  var userQueryCreator = _a.userQueryCreator,
      channel = _a.channel;

  var _b = useState(false),
      frozen = _b[0],
      setFrozen = _b[1]; // work around for
  // https://sendbird.slack.com/archives/G01290GCDCN/p1595922832000900
  // SDK bug - after frozen/unfrozen myRole becomes "none"


  useEffect(function () {
    setFrozen(channel.isFrozen);
  }, [channel]);
  var stringSet = useContext(LocalizationContext).stringSet;
  return React.createElement(AccordionGroup$1, {
    className: "sendbird-channel-settings__operator"
  }, React.createElement(Accordion, {
    className: "sendbird-channel-settings__operators-list",
    id: "operators",
    renderTitle: function renderTitle() {
      return React.createElement(React.Fragment, null, React.createElement(Icon, {
        type: IconTypes.ICON_OPERATOR,
        fillColor: IconColors.PRIMARY,
        width: 24,
        height: 24,
        className: "sendbird-channel-settings__accordion-icon"
      }), React.createElement(Label, {
        type: LabelTypography.SUBTITLE_1,
        color: LabelColors.ONBACKGROUND_1
      }, stringSet.CHANNEL_SETTING__OPERATORS__TITLE));
    },
    renderContent: function renderContent() {
      return React.createElement(React.Fragment, null, React.createElement(OperatorList$1, {
        channel: channel
      }));
    }
  }), React.createElement(Accordion, {
    className: "sendbird-channel-settings__members-list",
    id: "members",
    renderTitle: function renderTitle() {
      return React.createElement(React.Fragment, null, React.createElement(Icon, {
        type: IconTypes.MEMBERS,
        fillColor: IconColors.PRIMARY,
        width: 24,
        height: 24,
        className: "sendbird-channel-settings__accordion-icon"
      }), React.createElement(Label, {
        type: LabelTypography.SUBTITLE_1,
        color: LabelColors.ONBACKGROUND_1
      }, stringSet.CHANNEL_SETTING__MEMBERS__TITLE), React.createElement(Badge, {
        count: kFormatter(channel.memberCount)
      }));
    },
    renderContent: function renderContent() {
      return React.createElement(React.Fragment, null, React.createElement(MemberList$1, {
        userQueryCreator: userQueryCreator,
        channel: channel
      }));
    }
  }), // No muted members in broadcast channel
  !channel.isBroadcast && React.createElement(Accordion, {
    id: "mutedMembers",
    className: "sendbird-channel-settings__muted-members-list",
    renderTitle: function renderTitle() {
      return React.createElement(React.Fragment, null, React.createElement(Icon, {
        type: IconTypes.ICON_MUTED,
        fillColor: IconColors.PRIMARY,
        width: 24,
        height: 24,
        className: "sendbird-channel-settings__accordion-icon"
      }), React.createElement(Label, {
        type: LabelTypography.SUBTITLE_1,
        color: LabelColors.ONBACKGROUND_1
      }, stringSet.CHANNEL_SETTING__MUTED_MEMBERS__TITLE));
    },
    renderContent: function renderContent() {
      return React.createElement(React.Fragment, null, React.createElement(MutedMemberList$1, {
        channel: channel
      }));
    }
  }), React.createElement(Accordion, {
    className: "sendbird-channel-settings__banned-members-list",
    id: "bannedMembers",
    renderTitle: function renderTitle() {
      return React.createElement(React.Fragment, null, React.createElement(Icon, {
        type: IconTypes.ICON_BANNED,
        fillColor: IconColors.PRIMARY,
        width: 24,
        height: 24,
        className: "sendbird-channel-settings__accordion-icon"
      }), React.createElement(Label, {
        type: LabelTypography.SUBTITLE_1,
        color: LabelColors.ONBACKGROUND_1
      }, stringSet.CHANNEL_SETTING__BANNED_MEMBERS__TITLE));
    },
    renderContent: function renderContent() {
      return React.createElement(React.Fragment, null, React.createElement(BannedMemberList$1, {
        channel: channel
      }));
    }
  }), // cannot frozen broadcast channel
  !channel.isBroadcast && React.createElement("div", {
    className: "sendbird-channel-settings__freeze"
  }, React.createElement(Icon, {
    type: IconTypes.FROZEN_LIGHT,
    fillColor: IconColors.PRIMARY,
    width: 24,
    height: 24,
    className: "sendbird-channel-settings__accordion-icon"
  }), React.createElement(Label, {
    type: LabelTypography.SUBTITLE_1,
    color: LabelColors.ONBACKGROUND_1
  }, stringSet.CHANNEL_SETTING__FREEZE_CHANNEL), React.createElement("div", {
    className: "sendbird-channel-settings__frozen-icon"
  }, frozen ? React.createElement(Icon, {
    onClick: function onClick() {
      channel.unfreeze(function () {
        setFrozen(false);
      });
    },
    type: IconTypes.TOGGLE_ON,
    width: 44,
    height: 24
  }) : React.createElement(Icon, {
    onClick: function onClick() {
      channel.freeze(function () {
        setFrozen(true);
      });
    },
    type: IconTypes.TOGGLE_OFF,
    width: 44,
    height: 24
  }))));
}

var kFormatter$1 = function kFormatter(num) {
  return Math.abs(num) > 999 ? "".concat((Math.abs(num) / 1000).toFixed(1), "K") : num;
};

function ChannelSettings(props) {
  var onCloseClick = props.onCloseClick,
      channelUrl = props.channelUrl,
      disableUserProfile = props.disableUserProfile,
      renderUserProfile = props.renderUserProfile,
      _onChannelModified = props.onChannelModified,
      renderChannelProfile = props.renderChannelProfile,
      onBeforeUpdateChannel = props.onBeforeUpdateChannel;
  var sdkStore = props.stores.sdkStore,
      _props$config = props.config,
      userListQuery = _props$config.userListQuery,
      theme = _props$config.theme,
      userId = _props$config.userId,
      logger = _props$config.logger,
      isOnline = _props$config.isOnline,
      _props$queries = props.queries,
      queries = _props$queries === void 0 ? {} : _props$queries;
  var _props$config2 = props.config,
      config = _props$config2 === void 0 ? {} : _props$config2;
  var userDefinedDisableUserProfile = disableUserProfile || config.disableUserProfile;
  var userDefinedRenderProfile = renderUserProfile || config.renderUserProfile;
  var userFilledApplicationUserListQuery = queries.applicationUserListQuery;

  var _useContext = useContext(LocalizationContext),
      stringSet = _useContext.stringSet;

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
    logger.info('ChannelSettings: Setting up');

    if (!channelUrl || !initialized || !sdk) {
      logger.warning('ChannelSettings: Setting up failed', 'No channelUrl or sdk uninitialized');
      setInvalidChannel(false);
    } else {
      if (!sdk || !sdk.GroupChannel) {
        logger.warning('ChannelSettings: No GroupChannel');
        return;
      }

      sdk.GroupChannel.getChannel(channelUrl, function (groupChannel) {
        if (!groupChannel) {
          logger.warning('ChannelSettings: Channel not found');
          setInvalidChannel(true);
        } else {
          logger.info('ChannelSettings: Fetched group channel', groupChannel);
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
    }, stringSet.CHANNEL_SETTING__HEADER__TITLE), React.createElement(Icon, {
      type: IconTypes.CLOSE,
      className: "sendbird-channel-settings__close-icon",
      height: "24px",
      width: "24px",
      onClick: function onClick() {
        logger.info('ChannelSettings: Click close');
        onCloseClick();
      }
    })), React.createElement("div", null, React.createElement(PlaceHolder, {
      type: PlaceHolderTypes.WRONG
    })));
  }

  return React.createElement(UserProfileProvider, {
    disableUserProfile: userDefinedDisableUserProfile,
    renderUserProfile: userDefinedRenderProfile,
    className: "sendbird-channel-settings"
  }, React.createElement("div", {
    className: "sendbird-channel-settings__header"
  }, React.createElement(Label, {
    type: LabelTypography.H_2,
    color: LabelColors.ONBACKGROUND_1
  }, stringSet.CHANNEL_SETTING__HEADER__TITLE), React.createElement("div", {
    className: "sendbird-channel-settings__header-icon"
  }, React.createElement(IconButton, {
    width: "32px",
    height: "32px",
    onClick: function onClick() {
      logger.info('ChannelSettings: Click close');
      onCloseClick();
    }
  }, React.createElement(Icon, {
    type: IconTypes.CLOSE,
    className: "sendbird-channel-settings__close-icon",
    height: "24px",
    width: "24px"
  })))), React.createElement("div", {
    className: "sendbird-channel-settings__scroll-area"
  }, renderChannelProfile ? renderChannelProfile({
    channel: channel
  }) : React.createElement(ChannelProfile, {
    disabled: !isOnline,
    channel: channel,
    userId: userId,
    theme: theme,
    onChannelInfoChange: function onChannelInfoChange(currentImg, currentTitle) {
      logger.info('ChannelSettings: Channel information being updated');
      var swapParams = sdk.getErrorFirstCallback();

      if (onBeforeUpdateChannel) {
        var params = onBeforeUpdateChannel(currentTitle, currentImg, channel.data); // swapParams

        channel.updateChannel(params, function (response, error) {
          var groupChannel = response;

          if (swapParams) {
            groupChannel = error;
          }

          _onChannelModified(groupChannel);

          setChannelUpdateId(uuidv4());
        });
        return;
      }

      channel.updateChannel(currentTitle, currentImg, channel.data, function (response, error) {
        var groupChannel = response;

        if (swapParams) {
          groupChannel = error;
        }

        logger.info('ChannelSettings: Channel information updated', groupChannel);

        _onChannelModified(groupChannel);

        setChannelUpdateId(uuidv4());
      });
    }
  }), channel.myRole === 'operator' ? React.createElement(index, {
    channel: channel,
    onChannelModified: function onChannelModified(groupChannel) {
      // setChannelUpdateId(uuidv4());
      _onChannelModified(groupChannel);
    },
    userQueryCreator: function userQueryCreator() {
      return userListQuery && typeof userListQuery === 'function' ? userListQuery() : createDefaultUserListQuery({
        sdk: sdk,
        userFilledApplicationUserListQuery: userFilledApplicationUserListQuery
      });
    }
  }) : React.createElement(React.Fragment, null, React.createElement("div", {
    role: "switch",
    "aria-checked": showAccordion,
    tabIndex: 0,
    onKeyDown: function onKeyDown() {
      return setShowAccordion(!showAccordion);
    },
    className: "\n                    sendbird-channel-settings__panel-item\n                    sendbird-channel-settings__members\n                  ",
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
  }, "".concat(stringSet.CHANNEL_SETTING__MEMBERS__TITLE), React.createElement(Badge, {
    count: kFormatter$1(channel.memberCount)
  })), React.createElement(Icon, {
    type: IconTypes.SHEVRON,
    className: ['sendbird-channel-settings__panel-icon-right', 'sendbird-channel-settings__panel-icon--chevron', showAccordion ? 'sendbird-channel-settings__panel-icon--open' : ''].join(' '),
    height: "24px",
    width: "24px"
  })), showAccordion && React.createElement(MemebersAccordion, {
    currentUser: userId,
    disabled: !isOnline // eslint-disable-next-line
    ,
    userQueryCreator: function userQueryCreator() {
      return userListQuery && typeof userListQuery === 'function' ? userListQuery() : createDefaultUserListQuery({
        sdk: sdk,
        userFilledApplicationUserListQuery: userFilledApplicationUserListQuery
      });
    },
    swapParams: sdk && sdk.getErrorFirstCallback && sdk.getErrorFirstCallback(),
    channel: channel,
    members: channel.members,
    onInviteMemebers: function onInviteMemebers(selectedMemebers) {
      logger.info('ChannelSettings: Inviting new users');
      channel.inviteWithUserIds(selectedMemebers).then(function (res) {
        _onChannelModified(res);

        setChannelUpdateId(uuidv4());
        logger.info('ChannelSettings: Inviting new users success!', res);
      });
    }
  })), React.createElement("div", {
    className: "sendbird-channel-settings__panel-item\n              sendbird-channel-settings__leave-channel\n              ".concat(!isOnline ? 'sendbird-channel-settings__panel-item__disabled' : ''),
    role: "button",
    tabIndex: 0,
    disabled: true,
    onKeyDown: function onKeyDown() {
      if (!isOnline) {
        return;
      }

      setShowLeaveChannelModal(true);
    },
    onClick: function onClick() {
      if (!isOnline) {
        return;
      }

      setShowLeaveChannelModal(true);
    }
  }, React.createElement(Icon, {
    type: IconTypes.LEAVE,
    className: ['sendbird-channel-settings__panel-icon-left', 'sendbird-channel-settings__panel-icon__leave'].join(' '),
    height: "24px",
    width: "24px"
  }), React.createElement(Label, {
    type: LabelTypography.SUBTITLE_1,
    color: LabelColors.ONBACKGROUND_1
  }, stringSet.CHANNEL_SETTING__LEAVE_CHANNEL__TITLE)), showLeaveChannelModal && React.createElement(LeaveChannel, {
    onCloseModal: function onCloseModal() {
      return setShowLeaveChannelModal(false);
    },
    onLeaveChannel: function onLeaveChannel() {
      logger.info('ChannelSettings: Leaving channel', channel);
      channel.leave().then(function () {
        logger.info('ChannelSettings: Leaving channel successful!', channel);
        onCloseClick();
      });
    }
  })));
}

ChannelSettings.propTypes = {
  onCloseClick: PropTypes.func,
  onChannelModified: PropTypes.func,
  onBeforeUpdateChannel: PropTypes.func,
  renderChannelProfile: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  disableUserProfile: PropTypes.bool,
  renderUserProfile: PropTypes.func,
  channelUrl: PropTypes.string.isRequired,
  queries: PropTypes.shape({
    applicationUserListQuery: PropTypes.shape({
      limit: PropTypes.number,
      userIdsFilter: PropTypes.arrayOf(PropTypes.string),
      metaDataKeyFilter: PropTypes.string,
      metaDataValuesFilter: PropTypes.arrayOf(PropTypes.string)
    })
  }),
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
    theme: PropTypes.string,
    userListQuery: PropTypes.func,
    isOnline: PropTypes.bool,
    logger: PropTypes.shape({
      info: PropTypes.func,
      error: PropTypes.func,
      warning: PropTypes.func
    })
  }).isRequired
};
ChannelSettings.defaultProps = {
  onBeforeUpdateChannel: null,
  queries: {},
  disableUserProfile: false,
  renderUserProfile: null,
  renderChannelProfile: null,
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
  }, React.createElement(ChannelList$1, {
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
  }, React.createElement(ChannelSettings$1, {
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

export { App, Conversation as Channel, ChannelList$1 as ChannelList, ChannelSettings$1 as ChannelSettings, Sendbird as SendBirdProvider, getAllEmojisFromEmojiContainer$1 as getAllEmojisFromEmojiContainer, getEmojiCategoriesFromEmojiContainer$1 as getEmojiCategoriesFromEmojiContainer, getEmojisFromEmojiContainer$1 as getEmojisFromEmojiContainer, getStringSet, selectors as sendBirdSelectors, withSendbirdContext as withSendBird };
//# sourceMappingURL=index.es.js.map
