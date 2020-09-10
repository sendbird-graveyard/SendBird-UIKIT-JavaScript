"use strict";

function _interopDefault(ex) {
  return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
}

var React = require("react");
var React__default = _interopDefault(React);
var reactDom = require("react-dom");
var PropTypes = _interopDefault(require("prop-types"));
var Sb = _interopDefault(require("sendbird"));
var moment = _interopDefault(require("moment"));

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
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
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
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
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
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
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
  return (
    _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest()
  );
}

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread()
  );
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++)
      arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (
    Symbol.iterator in Object(iter) ||
    Object.prototype.toString.call(iter) === "[object Arguments]"
  )
    return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (
    !(
      Symbol.iterator in Object(arr) ||
      Object.prototype.toString.call(arr) === "[object Arguments]"
    )
  ) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (
      var _i = arr[Symbol.iterator](), _s;
      !(_n = (_s = _i.next()).done);
      _n = true
    ) {
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

var Typography = {
  H_1: "H_1",
  H_2: "H_2",
  SUBTITLE_1: "SUBTITLE_1",
  SUBTITLE_2: "SUBTITLE_2",
  BODY_1: "BODY_1",
  BODY_2: "BODY_2",
  BUTTON_1: "BUTTON_1",
  BUTTON_2: "BUTTON_2",
  CAPTION_1: "CAPTION_1",
  CAPTION_2: "CAPTION_2",
  CAPTION_3: "CAPTION_3"
};
var Colors = {
  ONBACKGROUND_1: "ONBACKGROUND_1",
  ONBACKGROUND_2: "ONBACKGROUND_2",
  ONBACKGROUND_3: "ONBACKGROUND_3",
  ONCONTENT_1: "ONCONTENT_1",
  PRIMARY: "PRIMARY",
  ERROR: "ERROR"
};

function changeTypographyToClassName(type) {
  switch (type) {
    case Typography.H_1:
      return "sendbird-label--h-1";

    case Typography.H_2:
      return "sendbird-label--h-2";

    case Typography.SUBTITLE_1:
      return "sendbird-label--subtitle-1";

    case Typography.SUBTITLE_2:
      return "sendbird-label--subtitle-2";

    case Typography.BODY_1:
      return "sendbird-label--body-1";

    case Typography.BODY_2:
      return "sendbird-label--body-2";

    case Typography.BUTTON_1:
      return "sendbird-label--button-1";

    case Typography.BUTTON_2:
      return "sendbird-label--button-2";

    case Typography.CAPTION_1:
      return "sendbird-label--caption-1";

    case Typography.CAPTION_2:
      return "sendbird-label--caption-2";

    case Typography.CAPTION_3:
      return "sendbird-label--caption-3";

    default:
      return null;
  }
}
function changeColorToClassName(color) {
  switch (color) {
    case Colors.ONBACKGROUND_1:
      return "sendbird-label--color-onbackground-1";

    case Colors.ONBACKGROUND_2:
      return "sendbird-label--color-onbackground-2";

    case Colors.ONBACKGROUND_3:
      return "sendbird-label--color-onbackground-3";

    case Colors.ONCONTENT_1:
      return "sendbird-label--color-oncontent-1";

    case Colors.PRIMARY:
      return "sendbird-label--color-primary";

    case Colors.ERROR:
      return "sendbird-label--color-error";

    default:
      return null;
  }
}

var getStringSet = function getStringSet(lang) {
  var stringSet = {
    en: {
      CHANNEL_LIST__TITLE: "Channels",
      CHANNEL__MESSAGE_INPUT__PLACE_HOLDER: "Type a message",
      CHANNEL__MESSAGE_LIST__NOTIFICATION__NEW_MESSAGE: "new message since",
      // NOT USED
      CHANNEL__MESSAGE_LIST__NOTIFICATION__ON: "on",
      // NOT USED
      CHANNEL_SETTING__HEADER__TITLE: "Channel details",
      CHANNEL_SETTING__PROFILE__EDIT: "Edit",
      CHANNEL_SETTING__MEMBERS__TITLE: "Members",
      CHANNEL_SETTING__MEMBERS__SEE_ALL_MEMBERS: "See all members",
      CHANNEL_SETTING__MEMBERS__INVITE_MEMBER: "Invite member",
      CHANNEL_SETTING__LEAVE_CHANNEL__TITLE: "Leave channel",
      BUTTON__CANCEL: "Cancel",
      BUTTON__DELETE: "Delete",
      BUTTON__SAVE: "Save",
      BUTTON__OK: "OK",
      BUTTON__CLOSE: "Close",
      BADGE__OVER: "+",
      MODAL__DELETE_MESSAGE__TITLE: "Delete message?",
      MODAL__CHANNEL_INFORMATION__TITLE: "Channel information",
      MODAL__CHANNEL_INFORMATION__CHANNEL_IMAGE: "Channel image",
      MODAL__CHANNEL_INFORMATION__UPLOAD: "Upload",
      MODAL__CHANNEL_INFORMATION__CHANNEL_NAME: "Channel name",
      MODAL__CHANNEL_INFORMATION__INPUT__PLACE_HOLDER: "User input text",
      MODAL__INVITE_MEMBER__TITLE: "Invite member",
      MODAL__INVITE_MEMBER__SELECTEC: "selected",
      MODAL__CREATE_CHANNEL__TITLE: "Create new channel",
      MODAL__CREATE_CHANNEL__SELECTED: "seledted",
      MODAL__USER_LIST__TITLE: "members",
      TYPING_INDICATOR__IS_TYPING: "is typing...",
      TYPING_INDICATOR__AND: "and",
      TYPING_INDICATOR__ARE_TYPING: "are typing...",
      TYPING_INDICATOR__MULTIPLE_TYPING: "Multiple people are typing...",
      MESSAGE_STATUS__SENDING_FAILED: "Sending failed.",
      MESSAGE_STATUS__TRY_AGAIN: "Try again",
      MESSAGE_STATUS__OR: "or",
      MESSAGE_STATUS__DELETE: "Delete",
      PLACE_HOLDER__NO_CHANNEL: "There are no channels",
      PLACE_HOLDER__WRONG: "Something is wrong",
      PLACE_HOLDER__RETRY_TO_CONNECT: "Retry to connect"
    }
  };
  return stringSet && stringSet[lang] ? stringSet[lang] : {};
};

var StringSet = getStringSet("en");
function Label(_ref) {
  var type = _ref.type,
    color = _ref.color,
    children = _ref.children,
    className = _ref.className;
  var injectingClassName = Array.isArray(className) ? className : [className];
  return React__default.createElement(
    "div",
    {
      className: []
        .concat(_toConsumableArray(injectingClassName), [
          "sendbird-label",
          changeTypographyToClassName(type),
          changeColorToClassName(color)
        ])
        .join(" ")
    },
    children
  );
}
Label.propTypes = {
  type: PropTypes.oneOf(Object.keys(Typography)),
  color: PropTypes.oneOf(Object.keys(Colors)),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element
  ]).isRequired,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ])
};
Label.defaultProps = {
  type: Typography.H_1,
  color: Colors.ONBACKGROUND_1,
  className: []
};

var MenuItem = function MenuItem(_ref) {
  var children = _ref.children,
    onClick = _ref.onClick;
  return React__default.createElement(
    "li",
    {
      tabIndex: 0,
      className: "sendbird-dropdown__menu-item",
      onClick: onClick,
      onKeyPress: function onKeyPress(e) {
        if (e.keyCode === 13) {
          onClick(e);
        }
      },
      role: "menuitem"
    },
    React__default.createElement(
      Label,
      {
        type: Typography.SUBTITLE_2,
        color: Colors.ONBACKGROUND_1,
        className: "sendbird-dropdown__menu-item__text"
      },
      children
    )
  );
};
MenuItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired
};
var MenuRoot = function MenuRoot() {
  return React__default.createElement("div", {
    id: "sendbird-dropdown-portal"
  });
};
var MenuItems =
  /*#__PURE__*/
  (function(_Component) {
    _inherits(MenuItems, _Component);

    function MenuItems(props) {
      var _this;

      _classCallCheck(this, MenuItems);

      _this = _possibleConstructorReturn(
        this,
        _getPrototypeOf(MenuItems).call(this, props)
      );

      _defineProperty(_assertThisInitialized(_this), "setupEvents", function() {
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

        document.addEventListener("mousedown", handleClickOutside);
      });

      _defineProperty(
        _assertThisInitialized(_this),
        "cleanUpEvents",
        function() {
          var handleClickOutside = _this.state.handleClickOutside;
          document.removeEventListener("mousedown", handleClickOutside);
        }
      );

      _defineProperty(
        _assertThisInitialized(_this),
        "getMenuPosition",
        function() {
          var parentRef = _this.props.parentRef;
          var parentRect = parentRef.current.getBoundingClientRect();
          var x = parentRect.x,
            y = parentRect.y;
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

          if (x + rect.width > innerWidth) {
            menuStyle.left -= rect.width;
          }

          if (menuStyle.top < 0) {
            menuStyle.top =
              rect.height < innerHeight ? (innerHeight - rect.height) / 2 : 0;
          }

          if (menuStyle.left < 0) {
            menuStyle.left =
              rect.width < innerWidth ? (innerWidth - rect.width) / 2 : 0;
          }

          return _this.setState({
            menuStyle: menuStyle
          });
        }
      );

      _this.menuRef = React__default.createRef();
      _this.state = {
        menuStyle: {},
        handleClickOutside: function handleClickOutside() {}
      };
      return _this;
    }

    _createClass(MenuItems, [
      {
        key: "componentDidMount",
        value: function componentDidMount() {
          this.setupEvents();
          this.getMenuPosition();
        }
      },
      {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this.cleanUpEvents();
        }
      },
      {
        key: "render",
        value: function render() {
          var menuStyle = this.state.menuStyle;
          var children = this.props.children;
          return reactDom.createPortal(
            React__default.createElement(
              React__default.Fragment,
              null,
              React__default.createElement("div", {
                className: "sendbird-dropdown__menu-backdrop"
              }),
              React__default.createElement(
                "ul",
                {
                  className: "sendbird-dropdown__menu",
                  ref: this.menuRef,
                  style: {
                    display: "inline-block",
                    position: "fixed",
                    left: "".concat(Math.round(menuStyle.left), ".px"),
                    top: "".concat(Math.round(menuStyle.top), ".px")
                  }
                },
                children
              )
            ),
            document.getElementById("sendbird-dropdown-portal")
          );
        }
      }
    ]);

    return MenuItems;
  })(React.Component);
MenuItems.propTypes = {
  closeDropdown: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,
  // https://stackoverflow.com/a/51127130
  parentRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.instanceOf(Element)
    })
  ]).isRequired
};
function ContextMenu(props) {
  var _useState = React.useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    showMenu = _useState2[0],
    setShowMenu = _useState2[1];

  var menuTrigger = props.menuTrigger,
    menuItems = props.menuItems;
  return React__default.createElement(
    "div",
    {
      style: {
        display: "inline"
      }
    },
    menuTrigger(function() {
      return setShowMenu(!showMenu);
    }),
    showMenu &&
      menuItems(function() {
        return setShowMenu(false);
      })
  );
}
ContextMenu.propTypes = {
  menuTrigger: PropTypes.func.isRequired,
  menuItems: PropTypes.func.isRequired
};

// simple component to be used as modal root
var MODAL_ROOT = "sendbird-modal-root";
var ModalRoot = function() {
  return React__default.createElement("div", {
    id: MODAL_ROOT
  });
};

var SendbirdSdkContext = React__default.createContext();

var withSendbirdContext = function withSendbirdContext(
  OriginalComponent,
  mapStoreToProps
) {
  var ContextAwareComponent = function ContextAwareComponent(props) {
    return React__default.createElement(
      SendbirdSdkContext.Consumer,
      null,
      function(context) {
        if (mapStoreToProps && typeof mapStoreToProps !== "function") {
          // eslint-disable-next-line no-console
          console.warn(
            "Second parameter to withSendbirdContext must be a pure function"
          );
        }

        var mergedProps =
          mapStoreToProps && typeof mapStoreToProps === "function"
            ? _objectSpread2({}, mapStoreToProps(context), {}, props)
            : _objectSpread2({}, context, {}, props); // eslint-disable-next-line react/jsx-props-no-spreading

        return React__default.createElement(OriginalComponent, mergedProps);
      }
    );
  };

  var componentName =
    OriginalComponent.displayName || OriginalComponent.name || "Component";
  ContextAwareComponent.displayName = "SendbirdAware".concat(componentName);
  return ContextAwareComponent;
};

var INIT_SDK = "INIT_SDK";
var SET_SDK_LOADING = "SET_SDK_LOADING";

var INIT_USER = "INIT_USER";
var UPDATE_USER_INFO = "UPDATE_USER_INFO";

var connectToSDK = function connectToSDK(_ref, dispatchers) {
  var userId = _ref.userId,
    appId = _ref.appId,
    sdkStore = _ref.sdkStore,
    nickname = _ref.nickname;
  var sdkDispatcher = dispatchers.sdkDispatcher,
    userDispatcher = dispatchers.userDispatcher;
  sdkDispatcher({
    type: SET_SDK_LOADING,
    payload: true
  });

  if (sdkStore && sdkStore.disconnect); // to do: accessToken

  if (userId && appId) {
    var sdk = new Sb({
      appId: appId
    });
    sdk.connect(userId, function(user, error) {
      if (!error) {
        sdkDispatcher({
          type: INIT_SDK,
          payload: sdk
        });
        userDispatcher({
          type: INIT_USER,
          paylod: user
        });

        if (nickname) {
          sdk.updateCurrentUserInfo(nickname, user.profileUrl, function(
            namedUser,
            err
          ) {
            if (!err) {
              userDispatcher({
                type: UPDATE_USER_INFO,
                payload: namedUser
              });
            }
          });
        }
      } else {
        // to do: error handling
        // eslint-disable-next-line no-console
        console.warn("Error", {
          error: error
        });
      }
    });
  }
};

function reducer(state, action) {
  switch (action.type) {
    case SET_SDK_LOADING:
      return _objectSpread2({}, state, {
        loading: action.payload
      });

    case INIT_SDK:
      return {
        sdk: action.payload,
        initialized: true,
        loading: false
      };

    default:
      return state;
  }
}

function reducer$1(state, action) {
  switch (action.type) {
    case INIT_USER:
      return {
        initialized: true,
        loading: false,
        user: action.payload
      };

    case UPDATE_USER_INFO:
      return _objectSpread2({}, state, {
        user: action.payload
      });

    default:
      return state;
  }
}

var sdkInitialState = {
  initialized: false,
  loading: false,
  sb: null
};

var userInitialState = {
  initialized: false,
  loading: false,
  user: null
};

function Sendbird(props) {
  var userId = props.userId,
    appId = props.appId,
    accessToken = props.accessToken,
    children = props.children,
    theme = props.theme,
    nickname = props.nickname;

  var _useReducer = React.useReducer(reducer, sdkInitialState),
    _useReducer2 = _slicedToArray(_useReducer, 2),
    sdkStore = _useReducer2[0],
    sdkDispatcher = _useReducer2[1];

  var _useReducer3 = React.useReducer(reducer$1, userInitialState),
    _useReducer4 = _slicedToArray(_useReducer3, 2),
    userStore = _useReducer4[0],
    userDispatcher = _useReducer4[1];

  React.useEffect(
    function() {
      // dispatch action
      connectToSDK(
        {
          userId: userId,
          appId: appId,
          accessToken: accessToken,
          sdkStore: sdkStore,
          nickname: nickname
        },
        {
          sdkDispatcher: sdkDispatcher,
          userDispatcher: userDispatcher
        }
      );
      return function() {
        // todo-cleanup
      };
    },
    [userId, appId, accessToken]
  ); // to create DOM elements for appending modal & context menu
  // might fail on server side render

  React.useEffect(function() {
    var appentElemWithId = function appentElemWithId(id) {
      var elem = document.createElement("div");
      elem.setAttribute("id", id);
      var body = document.querySelector("body");
      body.appendChild(elem);
    };

    var modalRoot = "sendbird-modal-root";
    var menuRoot = "sendbird-dropdown-portal";
    appentElemWithId(modalRoot);
    appentElemWithId(menuRoot);
  }, []);
  return React__default.createElement(
    SendbirdSdkContext.Provider,
    {
      value: {
        stores: {
          sdkStore: sdkStore,
          userStore: userStore
        },
        dispatchers: {
          sdkDispatcher: sdkDispatcher,
          userDispatcher: userDispatcher
        },
        config: {
          userId: userId,
          appId: appId,
          accessToken: accessToken,
          theme: theme
        }
      }
    },
    React__default.createElement(
      "div",
      {
        className: "sendbird-theme--".concat(theme)
      },
      children
    )
  );
}
Sendbird.propTypes = {
  userId: PropTypes.string.isRequired,
  appId: PropTypes.string.isRequired,
  accessToken: PropTypes.string,
  children: PropTypes.element.isRequired,
  theme: PropTypes.string,
  nickname: PropTypes.string
};
Sendbird.defaultProps = {
  accessToken: "",
  theme: "light",
  nickname: ""
};

var RESET_CHANNEL_LIST = "RESET_CHANNEL_LIST";
var CREATE_CHANNEL = "CREATE_CHANNEL";
var LEAVE_CHANNEL_SUCCESS = "LEAVE_CHANNEL_SUCCESS";
var SET_CURRENT_CHANNEL = "SET_CURRENT_CHANNEL";
var SHOW_CHANNEL_SETTINGS = "SHOW_CHANNEL_SETTINGS";
var HIDE_CHANNEL_SETTINGS = "HIDE_CHANNEL_SETTINGS";
var FETCH_CHANNELS_START = "FETCH_CHANNELS_START";
var FETCH_CHANNELS_SUCCESS = "FETCH_CHANNELS_SUCCESS";
var FETCH_CHANNELS_FAILURE = "FETCH_CHANNELS_FAILURE";
var INIT_CHANNELS_START = "INIT_CHANNELS_START";
var INIT_CHANNELS_SUCCESS = "INIT_CHANNELS_SUCCESS";
var INIT_CHANNELS_FAILURE = "INIT_CHANNELS_FAILURE";
var ON_USER_JOINED = "ON_USER_JOINED";
var ON_CHANNEL_DELETED = "ON_CHANNEL_DELETED";
var ON_USER_LEFT = "ON_USER_LEFT";
var ON_CHANNEL_CHANGED = "ON_CHANNEL_CHANGED";
var ON_READ_RECEIPT_UPDATED = "ON_READ_RECEIPT_UPDATED";
var ON_DELIVERY_RECEIPT_UPDATED = "ON_DELIVERY_RECEIPT_UPDATED";

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
        currentChannel:
          action.payload && action.payload.length && action.payload.length > 0
            ? action.payload[0].url
            : null
      });

    case FETCH_CHANNELS_SUCCESS: {
      var currentChannels = state.allChannels.map(function(c) {
        return c.url;
      });
      var filteredChannels = action.payload.filter(function(_ref) {
        var url = _ref.url;
        return !currentChannels.find(function(c) {
          return c === url;
        });
      });
      return _objectSpread2({}, state, {
        allChannels: [].concat(
          _toConsumableArray(state.allChannels),
          _toConsumableArray(filteredChannels)
        )
      });
    }

    case CREATE_CHANNEL:
      return _objectSpread2({}, state, {
        allChannels: [action.payload].concat(
          _toConsumableArray(
            state.allChannels.filter(function(channel) {
              return channel.url !== action.payload.url;
            })
          )
        ),
        currentChannel: action.payload.url
      });

    case LEAVE_CHANNEL_SUCCESS:
    case ON_CHANNEL_DELETED: {
      var newAllChannels = state.allChannels.filter(function(_ref2) {
        var url = _ref2.url;
        return url !== action.payload;
      });
      var currentChannel =
        newAllChannels.length > 0 ? newAllChannels[0].url : "";
      return _objectSpread2({}, state, {
        currentChannel: currentChannel,
        allChannels: newAllChannels
      });
    }

    case ON_USER_LEFT: {
      var channel = action.payload;
      var myMemberState = channel.myMemberState,
        url = channel.url; // I left

      var _newAllChannels = state.allChannels.filter(function(c) {
        return c.url !== url;
      });

      var _currentChannel =
        _newAllChannels.length > 0 ? _newAllChannels[0].url : "";

      if (myMemberState === "none") {
        return _objectSpread2({}, state, {
          currentChannel: _currentChannel,
          allChannels: _newAllChannels
        });
      } // other user left

      return _objectSpread2({}, state, {
        currentChannel: _currentChannel,
        allChannels: [action.payload].concat(
          _toConsumableArray(_newAllChannels)
        )
      });
    }

    case ON_CHANNEL_CHANGED:
    case ON_USER_JOINED:
    case ON_READ_RECEIPT_UPDATED:
    case ON_DELIVERY_RECEIPT_UPDATED:
      return _objectSpread2({}, state, {
        allChannels: [action.payload].concat(
          _toConsumableArray(
            state.allChannels.filter(function(_ref3) {
              var url = _ref3.url;
              return url !== action.payload.url;
            })
          )
        )
      });

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

var _ref =
  /*#__PURE__*/
  React__default.createElement(
    "g",
    {
      fill: "none",
      fillRule: "evenodd"
    },
    React__default.createElement("circle", {
      cx: 28,
      cy: 28,
      r: 28,
      fill: "#A8A8A8"
    }),
    React__default.createElement("path", {
      fill: "#FFF",
      fillRule: "nonzero",
      d:
        "M34.667 31.333A8.333 8.333 0 0143 39.667V43a1.667 1.667 0 01-3.333 0v-3.333a5 5 0 00-5-5H21.333a5 5 0 00-5 5V43A1.667 1.667 0 1113 43v-3.333a8.333 8.333 0 018.333-8.334zm-6.667-20A8.333 8.333 0 1128 28a8.333 8.333 0 010-16.667zm0 3.334a5 5 0 100 10 5 5 0 000-10z"
    })
  );

var DefaultAvatar =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2056%2056%22%20class%3D%22sendbird-no-image%22%3E%20%20%20%20%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%2228%22%20cy%3D%2228%22%20r%3D%2228%22%20fill%3D%22%23A8A8A8%22%2F%3E%20%20%20%20%20%20%20%20%3Cpath%20fill%3D%22%23FFF%22%20fill-rule%3D%22nonzero%22%20d%3D%22M34.667%2031.333A8.333%208.333%200%200%201%2043%2039.667V43a1.667%201.667%200%200%201-3.333%200v-3.333a5%205%200%200%200-5-5H21.333a5%205%200%200%200-5%205V43A1.667%201.667%200%201%201%2013%2043v-3.333a8.333%208.333%200%200%201%208.333-8.334zm-6.667-20A8.333%208.333%200%201%201%2028%2028a8.333%208.333%200%200%201%200-16.667zm0%203.334a5%205%200%201%200%200%2010%205%205%200%200%200%200-10z%22%2F%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E";

/* eslint-disable no-bitwise */

/* eslint-disable eqeqeq */

/* eslint-disable no-mixed-operators */
// https://stackoverflow.com/a/2117523
// used mainly for dom key generation
var uuidv4 = function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0;
    var v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

var Img = function Img(_ref) {
  var src = _ref.src,
    height = _ref.height,
    width = _ref.width,
    alt = _ref.alt;
  return src
    ? React__default.createElement("img", {
        src: src,
        alt: alt,
        height: height,
        width: width,
        className: "sendbird-avatar-img"
      })
    : React__default.createElement(
        "div",
        {
          className: "sendbird-avatar-img sendbird-default-avatar"
        },
        React__default.createElement(DefaultAvatar, {
          alt: alt,
          height: height,
          width: width
        })
      );
};
Img.propTypes = {
  src: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};
var AvatarInner = function AvatarInner(_ref2) {
  var src = _ref2.src,
    height = _ref2.height,
    width = _ref2.width,
    alt = _ref2.alt;

  if (typeof src === "string") {
    return React__default.createElement(Img, {
      src: src,
      height: height,
      width: width,
      alt: alt
    });
  }

  if (src && src.length) {
    if (src.length === 1) {
      return React__default.createElement(Img, {
        src: src[0],
        height: height,
        width: width,
        alt: alt
      });
    }

    if (src.length === 2) {
      return React__default.createElement(
        "div",
        {
          className: "sendbird-avatar--inner__two-child"
        },
        React__default.createElement(Img, {
          src: src[0],
          height: height,
          width: width,
          alt: alt
        }),
        React__default.createElement(Img, {
          src: src[1],
          height: height,
          width: width,
          alt: alt
        })
      );
    }

    if (src.length === 3) {
      return React__default.createElement(
        React__default.Fragment,
        null,
        React__default.createElement(
          "div",
          {
            className: "sendbird-avatar--inner__three-child--upper"
          },
          React__default.createElement(Img, {
            src: src[0],
            height: height,
            width: width,
            alt: alt
          })
        ),
        React__default.createElement(
          "div",
          {
            className: "sendbird-avatar--inner__three-child--lower"
          },
          React__default.createElement(Img, {
            src: src[1],
            height: height,
            width: width,
            alt: alt
          }),
          React__default.createElement(Img, {
            src: src[2],
            height: height,
            width: width,
            alt: alt
          })
        )
      );
    }

    return React__default.createElement(
      "div",
      {
        className: "sendbird-avatar--inner__four-child"
      },
      src.slice(0, 4).map(function(i) {
        return React__default.createElement(Img, {
          src: i,
          height: height,
          width: width,
          alt: alt,
          key: uuidv4()
        });
      })
    );
  } // default img

  return React__default.createElement(Img, {
    height: height,
    width: width,
    alt: alt
  });
};
AvatarInner.propTypes = {
  src: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};
AvatarInner.defaultProps = {
  src: ""
};
function Avatar(_ref3) {
  var src = _ref3.src,
    height = _ref3.height,
    width = _ref3.width,
    alt = _ref3.alt,
    className = _ref3.className;
  var injectingClassName = Array.isArray(className) ? className : [className];
  return React__default.createElement(
    "div",
    {
      className: []
        .concat(_toConsumableArray(injectingClassName), ["sendbird-avatar"])
        .join(" "),
      style: {
        height: height,
        width: width
      }
    },
    React__default.createElement(AvatarInner, {
      src: src,
      height: height,
      width: width,
      alt: alt
    })
  );
}
Avatar.propTypes = {
  src: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  height: PropTypes.string,
  width: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ])
};
Avatar.defaultProps = {
  height: "56px",
  width: "56px",
  alt: "",
  src: "",
  className: ""
};

function Badge(_ref) {
  var count = _ref.count,
    maxLevel = _ref.maxLevel,
    className = _ref.className;
  var maximumNumber = parseInt("9".repeat(maxLevel > 6 ? 6 : maxLevel), 10);
  var injectingClassName = Array.isArray(className) ? className : [className];
  return React__default.createElement(
    "div",
    {
      className: []
        .concat(_toConsumableArray(injectingClassName), ["sendbird-badge"])
        .join(" ")
    },
    React__default.createElement(
      "div",
      {
        className: "sendbird-badge__text"
      },
      React__default.createElement(
        Label,
        {
          type: Typography.CAPTION_2,
          color: Colors.ONCONTENT_1
        },
        count > maximumNumber
          ? "".concat(maximumNumber).concat(StringSet.BADGE__OVER)
          : count
      )
    )
  );
}
Badge.propTypes = {
  count: PropTypes.number.isRequired,
  maxLevel: PropTypes.number,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ])
};
Badge.defaultProps = {
  maxLevel: 2,
  className: []
};

var getChannelAvatarSource = function getChannelAvatarSource(channel) {
  if (channel && channel.coverUrl) {
    return channel.coverUrl;
  }

  return channel && channel.members
    ? channel.members.map(function(_ref) {
        var profileUrl = _ref.profileUrl;
        return profileUrl;
      })
    : [];
};
var getChannelTitle = function getChannelTitle() {
  var channel =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!channel || (!channel.name && !channel.members)) {
    return "No Title";
  }

  if (channel.name) {
    return channel.name;
  }

  return channel.members
    .map(function(_ref2) {
      var nickname = _ref2.nickname;
      return nickname;
    })
    .join(", ");
};
var prettyDate = function prettyDate(date) {
  return moment(date, "x").fromNow();
};
var getLastSeenAt = function getLastSeenAt(channel) {
  if (!channel || !channel.getReadStatus) {
    return "";
  }

  var readStatus = channel.getReadStatus(true);
  var keysOfReadStatus = Object.keys(readStatus);
  return prettyDate(
    keysOfReadStatus.reduce(function(latest, key) {
      return latest > readStatus[key].last_seen_at
        ? latest
        : readStatus[key].last_seen_at;
    }, 0)
  );
};
var getTotalMembers = function getTotalMembers(channel) {
  return channel && channel.memberCount ? channel.memberCount : 0;
};
var getLastMessage = function getLastMessage(channel) {
  return channel && channel.lastMessage ? channel.lastMessage.message : "";
};
var getChannelUnreadMessageCount = function getChannelUnreadMessageCount(
  channel
) {
  return channel && channel.unreadMessageCount ? channel.unreadMessageCount : 0;
};

function ChannelPreview(_ref) {
  var channel = _ref.channel,
    isActive = _ref.isActive,
    ChannelAction = _ref.ChannelAction,
    onClick = _ref.onClick,
    tabIndex = _ref.tabIndex;
  return React__default.createElement(
    "div",
    {
      role: "link",
      tabIndex: tabIndex,
      onClick: onClick,
      onKeyPress: onClick,
      className: "\n        sendbird-channel-preview\n        ".concat(
        isActive ? "sendbird-channel-preview--active" : null,
        "\n      "
      )
    },
    React__default.createElement(
      "div",
      {
        className: "sendbird-channel-preview__avatar"
      },
      React__default.createElement(Avatar, {
        src: getChannelAvatarSource(channel)
      })
    ),
    React__default.createElement(
      "div",
      {
        className: "sendbird-channel-preview__content"
      },
      React__default.createElement(
        "div",
        {
          className: "sendbird-channel-preview__content__upper"
        },
        React__default.createElement(
          "div",
          {
            className: "sendbird-channel-preview__content__upper__header"
          },
          React__default.createElement(
            Label,
            {
              className:
                "sendbird-channel-preview__content__upper__header__channel-name",
              type: Typography.SUBTITLE_2,
              color: Colors.ONBACKGROUND_1
            },
            getChannelTitle(channel)
          ),
          React__default.createElement(
            Label,
            {
              className:
                "sendbird-channel-preview__content__upper__header__total-members",
              type: Typography.CAPTION_2,
              color: Colors.ONBACKGROUND_2
            },
            getTotalMembers(channel)
          )
        ),
        React__default.createElement(
          Label,
          {
            className:
              "sendbird-channel-preview__content__upper__last-message-at",
            type: Typography.CAPTION_3,
            color: Colors.ONBACKGROUND_2
          },
          getLastSeenAt(channel)
        )
      ),
      React__default.createElement(
        "div",
        {
          className: "sendbird-channel-preview__content__lower"
        },
        React__default.createElement(
          Label,
          {
            className: "sendbird-channel-preview__content__lower__last-message",
            type: Typography.BODY_2,
            color: Colors.ONBACKGROUND_3
          },
          getLastMessage(channel)
        ),
        React__default.createElement(
          "div",
          {
            className:
              "sendbird-channel-preview__content__lower__unread-message-count"
          },
          getChannelUnreadMessageCount(channel)
            ? React__default.createElement(Badge, {
                count: getChannelUnreadMessageCount(channel)
              })
            : null
        )
      )
    ),
    React__default.createElement(
      "div",
      {
        className: "sendbird-channel-preview__action"
      },
      ChannelAction
    )
  );
}
ChannelPreview.propTypes = {
  isActive: PropTypes.bool,
  channel: PropTypes.shape({}),
  ChannelAction: PropTypes.element.isRequired,
  onClick: PropTypes.func,
  tabIndex: PropTypes.number
};
ChannelPreview.defaultProps = {
  channel: {},
  isActive: false,
  onClick: function onClick() {},
  tabIndex: 0
};

var IconButton = React__default.forwardRef(function(props, ref) {
  var children = props.children,
    className = props.className,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    type = props.type,
    height = props.height,
    width = props.width,
    onClick = props.onClick;
  return (
    // eslint-disable-next-line react/button-has-type
    React__default.createElement(
      "button",
      {
        className: "sendbird-iconbutton ".concat(className),
        disabled: disabled,
        ref: ref,
        type: type,
        style: {
          height: height,
          width: width
        },
        onClick: onClick
      },
      React__default.createElement(
        "span",
        {
          className: "sendbird-iconbutton__inner"
        },
        children
      )
    )
  );
});
IconButton.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};
IconButton.defaultProps = {
  height: "56px",
  width: "56px",
  className: "",
  type: "button",
  disabled: false,
  onClick: function onClick() {}
};

function ChannelHeader(_ref) {
  var title = _ref.title,
    iconButton = _ref.iconButton;
  return React__default.createElement(
    "div",
    {
      className: "sendbird-channel-header"
    },
    React__default.createElement(
      "div",
      {
        className: "sendbird-channel-header__title"
      },
      React__default.createElement(
        Label,
        {
          type: Typography.H_2,
          color: Colors.ONBACKGROUND_1
        },
        title || StringSet.CHANNEL_LIST__TITLE
      )
    ),
    React__default.createElement(
      "div",
      {
        className: "sendbird-channel-header__right-icon"
      },
      iconButton
    )
  );
}
ChannelHeader.propTypes = {
  title: PropTypes.string,
  iconButton: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.instanceOf(IconButton)
  ])
};
ChannelHeader.defaultProps = {
  title: "",
  iconButton: null
};

function Types() {
  return {
    LOADING: "LOADING",
    NO_CHANNELS: "NO_CHANNELS",
    WRONG: "WRONG"
  };
}
var PlaceHolderTypes = Types();

var ModalHeader = function ModalHeader(_ref) {
  var children = _ref.children;
  return React__default.createElement(
    "div",
    {
      className: "sendbird-modal--header"
    },
    children
  );
};
ModalHeader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired
};
var ModalClose = function ModalClose(_ref2) {
  var children = _ref2.children;
  return React__default.createElement(
    "div",
    {
      className: "sendbird-modal--close"
    },
    children
  );
};
ModalClose.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired
};
var ModalFooter = function ModalFooter(_ref3) {
  var children = _ref3.children;
  return React__default.createElement(
    "div",
    {
      className: "sendbird-modal--footer"
    },
    children
  );
};
ModalFooter.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired
};

var Modal = function Modal(_ref) {
  var children = _ref.children,
    _ref$isOpen = _ref.isOpen,
    isOpen = _ref$isOpen === void 0 ? false : _ref$isOpen,
    _ref$modalRoot = _ref.modalRoot,
    modalRoot = _ref$modalRoot === void 0 ? MODAL_ROOT : _ref$modalRoot,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "" : _ref$className;

  if (isOpen === false) {
    return null;
  }

  return reactDom.createPortal(
    React__default.createElement(
      "div",
      {
        className: "sendbird-modal__wrapper ".concat(className)
      },
      React__default.createElement("div", {
        className: "sendbird-modal__mask"
      }),
      React__default.createElement(
        "div",
        {
          className: "sendbird-modal__container"
        },
        children
      )
    ),
    document.getElementById(modalRoot)
  );
};

var useModal = function useModal(className) {
  var _useState = React.useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isOpen = _useState2[0],
    setOpen = _useState2[1];

  var open = React.useCallback(
    function() {
      return setOpen(true);
    },
    [setOpen]
  );
  var close = React.useCallback(
    function() {
      return setOpen(false);
    },
    [setOpen]
  );

  var ModalWrapper = function ModalWrapper(_ref2) {
    var children = _ref2.children;
    return React__default.createElement(
      Modal,
      {
        isOpen: isOpen,
        close: close,
        className: className
      },
      children
    );
  };

  ModalWrapper.propTypes = {
    children: PropTypes.element.isRequired
  };
  return [ModalWrapper, open, close];
};
var ModalComponents = {
  ModalHeader: ModalHeader,
  ModalClose: ModalClose,
  ModalFooter: ModalFooter
};

var Type = {
  PRIMARY: "PRIMARY",
  SECONDARY: "SECONDARY",
  DANGER: "DANGER",
  DISABLED: "DISABLED"
};
var Size = {
  BIG: "BIG",
  SMALL: "SMALL"
};

function changeTypeToClassName(type) {
  switch (type) {
    case Type.PRIMARY:
      return "sendbird-button--primary";

    case Type.SECONDARY:
      return "sendbird-button--secondary";

    case Type.DANGER:
      return "sendbird-button--danger";

    case Type.DISABLED:
      return "sendbird-button--disabled";

    default:
      return null;
  }
}
function changeSizeToClassName(size) {
  switch (size) {
    case Size.BIG:
      return "sendbird-button--big";

    case Size.SMALL:
      return "sendbird-button--small";

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
  var injectingClassNames = [
    "sendbird-button",
    changeTypeToClassName(type),
    changeSizeToClassName(size)
  ]
    .concat(
      _toConsumableArray(Array.isArray(className) ? className : [className])
    )
    .join(" ");
  return React__default.createElement(
    "button",
    {
      type: "button",
      className: injectingClassNames,
      onClick: onClick
    },
    React__default.createElement(
      Label,
      {
        className: "sendbird-button__text",
        type: Typography.BUTTON_1,
        color: Colors.ONCONTENT_1
      },
      children
    )
  );
}
Button.propTypes = {
  children: PropTypes.string,
  type: PropTypes.oneOf(Object.keys(Type)),
  size: PropTypes.oneOf(Object.keys(Size)),
  onClick: PropTypes.func,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ])
};
Button.defaultProps = {
  children: "Button",
  type: Type.PRIMARY,
  size: Size.BIG,
  onClick: function onClick() {},
  className: ""
};

var Type$1 = {
  ATTACH: "ATTACH",
  ADD: "ADD",
  ARROW_LEFT: "ARROW_LEFT",
  CAMERA: "CAMERA",
  MORE: "MORE",
  MUTE: "MUTE",
  CHECKBOX: "CHECKBOX",
  CHECKBOX_OFF: "CHECKBOX_OFF",
  CLOSE: "CLOSE",
  COPY: "COPY",
  CHAT: "CHAT",
  CREATE: "CREATE",
  DELETE: "DELETE",
  DUMMY: "DUMMY",
  EDIT: "EDIT",
  ERROR: "ERROR",
  ERROR_FILLED: "ERROR_FILLED",
  DELIVERED: "DELIVERED",
  DOCUMENT: "DOCUMENT",
  DOWNLOAD: "DOWNLOAD",
  FILE_AUDIO: "FILE_AUDIO",
  FILE_DOCUMENT: "FILE_DOCUMENT",
  GIF: "GIF",
  INFO: "INFO",
  LEAVE: "LEAVE",
  NEW_MESSAGE: "NEW_MESSAGE",
  MEMBERS: "MEMBERS",
  NOTIFICATIONS: "NOTIFICATIONS",
  PHOTO: "PHOTO",
  PLAY: "PLAY",
  PLUS: "PLUS",
  READ: "READ",
  REFRESH: "REFRESH",
  SEND: "SEND",
  SENT: "SENT",
  SHEVRON_RIGHT: "SHEVRON_RIGHT",
  SPINNER: "SPINNER",
  USER: "USER"
};

var IconAdd =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20viewBox%3D%220%200%2024%2024%22%3E%20%20%20%20%3Cpath%20fill%3D%22%237B53EF%22%20fill-rule%3D%22evenodd%22%20d%3D%22M19%202a3%203%200%200%201%203%203v14a3%203%200%200%201-3%203H5a3%203%200%200%201-3-3V5a3%203%200%200%201%203-3zm0%202H5a1%201%200%200%200-1%201v14a1%201%200%200%200%201%201h14a1%201%200%200%200%201-1V5a1%201%200%200%200-1-1zm-7%203a1%201%200%200%201%20.993.883L13%208v3h3a1%201%200%200%201%20.117%201.993L16%2013h-3v3a1%201%200%200%201-1.993.117L11%2016v-3H8a1%201%200%200%201-.117-1.993L8%2011h3V8a1%201%200%200%201%201-1z%22%2F%3E%3C%2Fsvg%3E";

var IconAttach =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2022%2022%22%3E%20%20%20%20%3Cpath%20fill%3D%22%23000%22%20fill-opacity%3D%22.88%22%20fill-rule%3D%22evenodd%22%20d%3D%22M19.021%209.943l-8.424%208.023c-1.795%201.71-4.723%201.71-6.518%200-1.77-1.685-1.77-4.398%200-6.084l8.424-8.023c1.079-1.027%202.845-1.027%203.924%200a2.461%202.461%200%200%201%200%203.614l-8.433%208.022a.984.984%200%200%201-1.33%200%20.772.772%200%200%201%200-1.142l7.782-7.403a.917.917%200%200%200-1.264-1.328L5.4%2013.025a2.605%202.605%200%200%200%200%203.798%202.816%202.816%200%200%200%203.858%200l8.433-8.022a4.294%204.294%200%200%200%200-6.27C15.905.83%2013.025.83%2011.24%202.531l-8.425%208.023c-2.528%202.408-2.528%206.332%200%208.74%202.504%202.384%206.544%202.384%209.047%200l8.425-8.023a.917.917%200%201%200-1.265-1.328z%22%2F%3E%3C%2Fsvg%3E";

var IconArrowLeft =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20viewBox%3D%220%200%2024%2024%22%3E%20%20%20%20%3Cpath%20fill%3D%22%237B53EF%22%20fill-rule%3D%22evenodd%22%20d%3D%22M12.707%203.293a1%201%200%200%201%20.083%201.32l-.083.094L6.415%2011H21a1%201%200%200%201%20.117%201.993L21%2013H6.415l6.292%206.293a1%201%200%200%201%20.083%201.32l-.083.094a1%201%200%200%201-1.32.083l-.094-.083-8-8a1%201%200%200%201-.083-1.32l.083-.094%208-8a1%201%200%200%201%201.414%200z%22%2F%3E%3C%2Fsvg%3E";

var IconCamera =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20viewBox%3D%220%200%2024%2024%22%3E%20%20%20%20%3Cpath%20fill%3D%22%237B53EF%22%20fill-rule%3D%22evenodd%22%20d%3D%22M15%202a1%201%200%200%201%20.832.445L17.535%205H21a3%203%200%200%201%202.995%202.824L24%208v11a3%203%200%200%201-3%203H3a3%203%200%200%201-3-3V8a3%203%200%200%201%203-3h3.464l1.704-2.555a1%201%200%200%201%20.708-.437L9%202zm-.536%202H9.535L7.832%206.555a1%201%200%200%201-.708.437L7%207H3a1%201%200%200%200-1%201v11a1%201%200%200%200%201%201h18a1%201%200%200%200%201-1V8a1%201%200%200%200-1-1h-4a1%201%200%200%201-.832-.445L14.464%204zM12%208a5%205%200%201%201%200%2010%205%205%200%200%201%200-10zm0%202a3%203%200%201%200%200%206%203%203%200%200%200%200-6z%22%2F%3E%3C%2Fsvg%3E";

var IconMore =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20viewBox%3D%220%200%2024%2024%22%3E%20%20%20%20%3Cpath%20fill%3D%22%237B53EF%22%20fill-rule%3D%22evenodd%22%20d%3D%22M12%2017a2%202%200%201%201%200%204%202%202%200%200%201%200-4zm0-6.5a2%202%200%201%201%200%204%202%202%200%200%201%200-4zM12%204a2%202%200%201%201%200%204%202%202%200%200%201%200-4z%22%2F%3E%3C%2Fsvg%3E";

var IconMute =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20viewBox%3D%220%200%2024%2024%22%3E%20%20%20%20%3Cpath%20fill%3D%22%237B53EF%22%20fill-rule%3D%22evenodd%22%20d%3D%22M15.125%2020.09c0%20.602-.694%202.41-2.778%202.41-1.389%200-2.315-.804-2.778-2.41zM12.789%201.606a6.496%206.496%200%200%201%205.388%202.861l2.464-2.463a.788.788%200%200%201%201.025-.077l.088.077a.788.788%200%200%201%200%201.113L3.378%2021.494a.788.788%200%200%201-1.025.077l-.088-.077a.788.788%200%200%201%200-1.113l1.9-1.903-.04-.004a.387.387%200%200%201-.241-.596l1.557-2.295.001-.208a545.875%20545.875%200%200%200-.028-6.563l-.008-.614a6.503%206.503%200%200%201%206.414-6.59h.969zm6.381%205.246c.08.407.122.827.122%201.257l-.001%207.53%201.52%202.238a.387.387%200%200%201-.32.604H7.54l3.214-3.214%208.415-8.415z%22%2F%3E%3C%2Fsvg%3E";

var _ref$1 =
  /*#__PURE__*/
  React__default.createElement(
    "g",
    {
      fill: "#7B53EF",
      fillRule: "evenodd"
    },
    React__default.createElement("path", {
      d:
        "M18 1H6a5 5 0 00-5 5v12a5 5 0 005 5h12a5 5 0 005-5V6a5 5 0 00-5-5zm0 2a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6a3 3 0 013-3h12z"
    }),
    React__default.createElement("path", {
      d:
        "M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
    })
  );

var IconCheckbox =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20viewBox%3D%220%200%2024%2024%22%3E%20%20%20%20%3Cg%20fill%3D%22%237B53EF%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M18%201H6a5%205%200%200%200-5%205v12a5%205%200%200%200%205%205h12a5%205%200%200%200%205-5V6a5%205%200%200%200-5-5zm0%202a3%203%200%200%201%203%203v12a3%203%200%200%201-3%203H6a3%203%200%200%201-3-3V6a3%203%200%200%201%203-3h12z%22%2F%3E%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M19%203H5a2%202%200%200%200-2%202v14a2%202%200%200%200%202%202h14a2%202%200%200%200%202-2V5a2%202%200%200%200-2-2zm-9%2014l-5-5%201.41-1.41L10%2014.17l7.59-7.59L19%208l-9%209z%22%2F%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E";

var _ref$2 =
  /*#__PURE__*/
  React__default.createElement(
    "g",
    {
      fill: "#7B53EF",
      fillRule: "evenodd"
    },
    React__default.createElement("path", {
      d:
        "M18 1H6a5 5 0 00-5 5v12a5 5 0 005 5h12a5 5 0 005-5V6a5 5 0 00-5-5zm0 2a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6a3 3 0 013-3h12z"
    }),
    React__default.createElement("path", {
      d:
        "M19 19H5V5h14v14zm0-16H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
    })
  );

var IconCheckboxOff =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20viewBox%3D%220%200%2024%2024%22%3E%20%20%20%20%3Cg%20fill%3D%22%237B53EF%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M18%201H6a5%205%200%200%200-5%205v12a5%205%200%200%200%205%205h12a5%205%200%200%200%205-5V6a5%205%200%200%200-5-5zm0%202a3%203%200%200%201%203%203v12a3%203%200%200%201-3%203H6a3%203%200%200%201-3-3V6a3%203%200%200%201%203-3h12z%22%2F%3E%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M19%2019H5V5h14v14zm0-16H5c-1.1%200-2%20.9-2%202v14c0%201.1.9%202%202%202h14c1.1%200%202-.9%202-2V5c0-1.1-.9-2-2-2z%22%2F%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E";

var IconClose =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20viewBox%3D%220%200%2024%2024%22%3E%20%20%20%20%3Cpath%20fill%3D%22%237B53EF%22%20fill-rule%3D%22evenodd%22%20d%3D%22M6.613%205.21l.094.083L12%2010.585l5.293-5.292a1%201%200%200%201%201.497%201.32l-.083.094L13.415%2012l5.292%205.293a1%201%200%200%201-1.32%201.497l-.094-.083L12%2013.415l-5.293%205.292a1%201%200%200%201-1.497-1.32l.083-.094L10.585%2012%205.293%206.707a1%201%200%200%201%201.32-1.497z%22%2F%3E%3C%2Fsvg%3E";

var IconCopy =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20viewBox%3D%220%200%2024%2024%22%3E%20%20%20%20%3Cpath%20fill%3D%22%237B53EF%22%20fill-rule%3D%22evenodd%22%20d%3D%22M20%208a3%203%200%200%201%203%203v9a3%203%200%200%201-3%203h-9a3%203%200%200%201-3-3v-9a3%203%200%200%201%203-3zm0%202h-9a1%201%200%200%200-1%201v9a1%201%200%200%200%201%201h9a1%201%200%200%200%201-1v-9a1%201%200%200%200-1-1zm-7-9a3%203%200%200%201%202.995%202.824L16%204v1a1%201%200%200%201-1.993.117L14%205V4a1%201%200%200%200-.883-.993L13%203H4a1%201%200%200%200-.993.883L3%204v9a1%201%200%200%200%20.883.993L4%2014h1a1%201%200%200%201%20.117%201.993L5%2016H4a3%203%200%200%201-2.995-2.824L1%2013V4a3%203%200%200%201%202.824-2.995L4%201h9z%22%2F%3E%3C%2Fsvg%3E";

var IconChat =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20viewBox%3D%220%200%2024%2024%22%3E%20%20%20%20%3Cpath%20fill%3D%22%237B53EF%22%20fill-rule%3D%22evenodd%22%20d%3D%22M12%201c6.075%200%2011%204.925%2011%2011s-4.925%2011-11%2011c-1.67%200-3.255-.373-4.673-1.039l-.657.218c-2.237.716-3.8.964-4.69.742-1.049-.261-1.256-.72-.62-1.373.439-.524.805-1.178%201.097-1.963.234-.625.142-1.5-.276-2.625A10.933%2010.933%200%200%201%201%2012C1%205.925%205.925%201%2012%201zm0%202a9%209%200%200%200-8.187%2012.742l.152.314.051.101.04.107c.569%201.532.709%202.859.275%204.02l-.143.365-.072.162.088-.019a23.181%2023.181%200%200%200%201.832-.511l.646-.213.765-.26.73.343C9.363%2020.708%2010.659%2021%2012%2021a9%209%200%200%200%200-18z%22%2F%3E%3C%2Fsvg%3E";

var IconCreate =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20viewBox%3D%220%200%2024%2024%22%3E%20%20%20%20%3Cpath%20fill%3D%22%237B53EF%22%20fill-rule%3D%22evenodd%22%20d%3D%22M12%201c6.075%200%2011%204.925%2011%2011s-4.925%2011-11%2011c-1.67%200-3.255-.373-4.673-1.039l-.657.218c-2.237.716-3.8.964-4.69.742-1.049-.261-1.256-.72-.62-1.373.439-.524.805-1.178%201.097-1.963.234-.625.142-1.5-.276-2.625A10.933%2010.933%200%200%201%201%2012C1%205.925%205.925%201%2012%201zm0%202a9%209%200%200%200-8.187%2012.742l.152.314.051.101.04.107c.569%201.532.709%202.859.275%204.02l-.143.365-.072.162.088-.019a23.181%2023.181%200%200%200%201.832-.511l.646-.213.765-.26.73.343C9.363%2020.708%2010.659%2021%2012%2021a9%209%200%200%200%200-18zm1%206v2h2c1.333%200%201.333%202%200%202h-2v2c0%201.333-2%201.333-2%200v-2H9c-1.333%200-1.333-2%200-2h2V9c0-1.333%202-1.333%202%200z%22%2F%3E%3C%2Fsvg%3E";

var IconDelete =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20viewBox%3D%220%200%2024%2024%22%3E%20%20%20%20%3Cpath%20fill%3D%22%237B53EF%22%20fill-rule%3D%22evenodd%22%20d%3D%22M14%201a3%203%200%200%201%202.995%202.824L17%204v1h4a1%201%200%200%201%20.117%201.993L21%207h-1v13a3%203%200%200%201-2.824%202.995L17%2023H7a3%203%200%200%201-2.995-2.824L4%2020V7H3a1%201%200%200%201-.117-1.993L3%205h4V4a3%203%200%200%201%202.824-2.995L10%201h4zm4%206H6v13a1%201%200%200%200%20.883.993L7%2021h10a1%201%200%200%200%20.993-.883L18%2020V7zm-8%203a1%201%200%200%201%20.993.883L11%2011v6a1%201%200%200%201-1.993.117L9%2017v-6a1%201%200%200%201%201-1zm4%200a1%201%200%200%201%20.993.883L15%2011v6a1%201%200%200%201-1.993.117L13%2017v-6a1%201%200%200%201%201-1zm0-7h-4a1%201%200%200%200-.993.883L9%204v1h6V4a1%201%200%200%200-.883-.993L14%203z%22%2F%3E%3C%2Fsvg%3E";

var IconDummy =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20viewBox%3D%220%200%2024%2024%22%3E%20%20%20%20%3Cpath%20fill%3D%22%237B53EF%22%20fill-rule%3D%22evenodd%22%20d%3D%22M12%2021.35l-1.45-1.32C5.4%2015.36%202%2012.28%202%208.5%202%205.42%204.42%203%207.5%203c1.74%200%203.41.81%204.5%202.09C13.09%203.81%2014.76%203%2016.5%203%2019.58%203%2022%205.42%2022%208.5c0%203.78-3.4%206.86-8.55%2011.54L12%2021.35z%22%2F%3E%3C%2Fsvg%3E";

var IconEdit =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2026%2026%22%3E%20%20%20%20%3Cpath%20fill%3D%22%237B53EF%22%20fill-rule%3D%22evenodd%22%20d%3D%22M21.875%2021.875a1.042%201.042%200%200%201%20.121%202.076l-.121.007H3.125a1.042%201.042%200%200%201-.121-2.076l.121-.007h18.75zM13.847%201.347a1.042%201.042%200%200%201%201.473%200l4.167%204.166a1.042%201.042%200%200%201%200%201.474L8.028%2018.445c-.195.195-.46.305-.736.305H3.125a1.042%201.042%200%200%201-1.042-1.042v-4.166c0-.277.11-.542.305-.737zm.736%202.21L4.167%2013.973v2.694h2.691L17.276%206.25l-2.693-2.693z%22%2F%3E%3C%2Fsvg%3E";

var IconError =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20viewBox%3D%220%200%2024%2024%22%3E%20%20%20%20%3Cpath%20fill%3D%22%237B53EF%22%20fill-rule%3D%22evenodd%22%20d%3D%22M12%201.897c.983%200%201.9.481%202.46%201.284l.108.165L23.046%2017.5a3%203%200%200%201-2.375%204.491L20.47%2022H3.519a3%203%200%200%201-2.658-4.324l.101-.19L9.435%203.341A3%203%200%200%201%2012%201.897zm0%202a1%201%200%200%200-.779.372l-.073.105L2.686%2018.5a1%201%200%200%200%20.716%201.49l.128.01h16.929a1%201%200%200%200%20.919-1.372l-.056-.114-8.467-14.135A1%201%200%200%200%2012%203.897zM12%2016a1%201%200%201%201%200%202%201%201%200%200%201%200-2zm0-8a1%201%200%200%201%20.993.883L13%209v4a1%201%200%200%201-1.993.117L11%2013V9a1%201%200%200%201%201-1z%22%2F%3E%3C%2Fsvg%3E";

var _ref$3 =
  /*#__PURE__*/
  React__default.createElement(
    "g",
    {
      fill: "none",
      fillRule: "evenodd"
    },
    React__default.createElement("path", {
      fill: "#E53157",
      d:
        "M10.281 4.18L1.77 17.85a1.87 1.87 0 00-.005 1.924c.353.597 1.01.968 1.724.976h17.024a2.024 2.024 0 001.724-.976 1.87 1.87 0 00-.005-1.924L13.719 4.18A2.028 2.028 0 0012 3.25a2.03 2.03 0 00-1.719.93z"
    }),
    React__default.createElement("path", {
      fill: "#FFF",
      fillRule: "nonzero",
      d:
        "M11.125 12.875V8.5c0-1.167 1.75-1.167 1.75 0v4.375c0 1.167-1.75 1.167-1.75 0zm0 3.5c0-1.167 1.75-1.167 1.75 0s-1.75 1.167-1.75 0z"
    })
  );

var IconErrorFilled =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20viewBox%3D%220%200%2024%2024%22%3E%20%20%20%20%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Cpath%20fill%3D%22%23E53157%22%20d%3D%22M10.281%204.18L1.77%2017.85a1.87%201.87%200%200%200-.005%201.924c.353.597%201.01.968%201.724.976h17.024a2.024%202.024%200%200%200%201.724-.976%201.87%201.87%200%200%200-.005-1.924L13.719%204.18A2.028%202.028%200%200%200%2012%203.25c-.703%200-1.354.353-1.719.93z%22%2F%3E%20%20%20%20%20%20%20%20%3Cpath%20fill%3D%22%23FFF%22%20fill-rule%3D%22nonzero%22%20d%3D%22M11.125%2012.875V8.5c0-1.167%201.75-1.167%201.75%200v4.375c0%201.167-1.75%201.167-1.75%200zm0%203.5c0-1.167%201.75-1.167%201.75%200s-1.75%201.167-1.75%200z%22%2F%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E";

var IconDelivered =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20viewBox%3D%220%200%2024%2024%22%3E%20%20%20%20%3Cpath%20fill%3D%22%23000%22%20fill-opacity%3D%22.38%22%20fill-rule%3D%22evenodd%22%20d%3D%22M2.207%2011.793l5%205a1%201%200%200%201-1.414%201.414l-5-5a1%201%200%200%201%201.414-1.414zm19.586-6a1%201%200%200%201%201.414%201.414l-11%2011a1%201%200%200%201-1.414%200l-5-5a1%201%200%200%201%201.414-1.414l4.293%204.293zm-3.586%200a1%201%200%200%201%200%201.414l-5.999%205.999a1%201%200%200%201-1.414-1.414l5.999-6a1%201%200%200%201%201.414%200z%22%2F%3E%3C%2Fsvg%3E";

var IconDocument =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20viewBox%3D%220%200%2024%2024%22%3E%20%20%20%20%3Cpath%20fill%3D%22%237B53EF%22%20fill-rule%3D%22evenodd%22%20d%3D%22M14%201a1.01%201.01%200%200%201%20.25.031l.03.009c.03.009.061.02.091.031l.027.012a.914.914%200%200%201%20.195.112c.04.03.078.062.114.098l-.093-.082.011.009.082.073%206%206a1.006%201.006%200%200%201%20.21.309l.012.027c.012.03.022.06.031.091l.008.03A.921.921%200%200%201%2021%208l-.008-.126.001.01L21%208v12a3%203%200%200%201-3%203H6a3%203%200%200%201-3-3V4a3%203%200%200%201%203-3h8zm-1%202H6a1%201%200%200%200-1%201v16a1%201%200%200%200%201%201h12a1%201%200%200%200%201-1V9h-5a1%201%200%200%201-.993-.883L13%208V3zm4.585%204L15%204.415V7h2.585z%22%2F%3E%3C%2Fsvg%3E";

var IconDownload =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20viewBox%3D%220%200%2024%2024%22%3E%20%20%20%20%3Cpath%20fill%3D%22%237B53EF%22%20fill-rule%3D%22evenodd%22%20d%3D%22M21%2016a1%201%200%200%201%20.993.883L22%2017v3a3%203%200%200%201-2.824%202.995L19%2023H5a3%203%200%200%201-2.995-2.824L2%2020v-3a1%201%200%200%201%201.993-.117L4%2017v3a1%201%200%200%200%20.883.993L5%2021h14a1%201%200%200%200%20.993-.883L20%2020v-3a1%201%200%200%201%201-1zM12%201a1%201%200%200%201%20.993.883L13%202v11.585l2.293-2.292a1%201%200%200%201%201.32-.083l.094.083a1%201%200%200%201%20.083%201.32l-.083.094-4%204a1.006%201.006%200%200%201-.09.08l.09-.08a1.008%201.008%200%200%201-.674.292L12%2017h-.032l-.054-.004L12%2017a1.008%201.008%200%200%201-.613-.21%201.037%201.037%200%200%201-.094-.083l-4-4a1%201%200%200%201%201.32-1.497l.094.083L11%2013.585V2a1%201%200%200%201%201-1z%22%2F%3E%3C%2Fsvg%3E";

var _ref$4 =
  /*#__PURE__*/
  React__default.createElement(
    "g",
    {
      fill: "none",
      fillRule: "evenodd"
    },
    React__default.createElement("rect", {
      fill: "#FFF",
      fillRule: "nonzero",
      rx: 10
    }),
    React__default.createElement("path", {
      fill: "#7B53EF",
      d:
        "M18.815 9.185c2.913 2.934 2.913 7.696 0 10.63a.617.617 0 01-.894-.013.67.67 0 01.012-.925 6.215 6.215 0 000-8.754.67.67 0 01-.012-.925.617.617 0 01.894-.013zm-5.291 0a.646.646 0 011.044.517v9.596c0 .544-.62.85-1.044.516l-3.31-2.702H7.646A.65.65 0 017 16.458v-3.916a.65.65 0 01.647-.654h2.566zm2.886 2.42a4.113 4.113 0 010 5.783.617.617 0 01-.893-.012.67.67 0 01.012-.925 2.772 2.772 0 000-3.908.67.67 0 01-.012-.925.617.617 0 01.893-.013z"
    })
  );

var IconFileAudio =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2028%2028%22%3E%20%20%20%20%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Crect%20fill%3D%22%23FFF%22%20fill-rule%3D%22nonzero%22%20rx%3D%2210%22%2F%3E%20%20%20%20%20%20%20%20%3Cpath%20fill%3D%22%237B53EF%22%20d%3D%22M18.815%209.185c2.913%202.934%202.913%207.696%200%2010.63a.617.617%200%200%201-.894-.013.67.67%200%200%201%20.012-.925%206.215%206.215%200%200%200%200-8.754.67.67%200%200%201-.012-.925.617.617%200%200%201%20.894-.013zm-5.291%200a.646.646%200%200%201%201.044.517v9.596c0%20.544-.62.85-1.044.516l-3.31-2.702H7.646A.65.65%200%200%201%207%2016.458v-3.916a.65.65%200%200%201%20.647-.654h2.566zm2.886%202.42a4.113%204.113%200%200%201%200%205.783.617.617%200%200%201-.893-.012.67.67%200%200%201%20.012-.925%202.772%202.772%200%200%200%200-3.908.67.67%200%200%201-.012-.925.617.617%200%200%201%20.893-.013z%22%2F%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E";

var _ref$5 =
  /*#__PURE__*/
  React__default.createElement(
    "g",
    {
      fill: "none",
      fillRule: "evenodd"
    },
    React__default.createElement("rect", {
      fill: "#FFF",
      fillRule: "nonzero",
      rx: 10
    }),
    React__default.createElement("path", {
      fill: "#7B53EF",
      d:
        "M16.317 5.667H9.05C7.907 5.667 7 6.58 7 7.687v12.625c0 1.107.907 2.021 2.05 2.021h9.9c1.143 0 2.05-.914 2.05-2.02v-9.97a.673.673 0 00-.198-.473l-3.95-3.984a.753.753 0 00-.535-.22z"
    }),
    React__default.createElement("path", {
      fill: "#FFF",
      d:
        "M17.025 16.667c.354 0 .642.302.642.675 0 .372-.288.675-.642.675h-6.383c-.355 0-.642-.303-.642-.675 0-.373.287-.675.642-.675zm0-2.667c.354 0 .642.302.642.675 0 .373-.288.675-.642.675h-6.383c-.355 0-.642-.302-.642-.675 0-.373.287-.675.642-.675zm-3.357-2.667c.369 0 .668.303.668.675 0 .373-.3.675-.668.675h-3a.672.672 0 01-.668-.675c0-.372.3-.675.668-.675z"
    })
  );

var IconFileDocument =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2028%2028%22%3E%20%20%20%20%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Crect%20fill%3D%22%23FFF%22%20fill-rule%3D%22nonzero%22%20rx%3D%2210%22%2F%3E%20%20%20%20%20%20%20%20%3Cpath%20fill%3D%22%237B53EF%22%20d%3D%22M16.317%205.667H9.05C7.907%205.667%207%206.58%207%207.687v12.625c0%201.107.907%202.021%202.05%202.021h9.9c1.143%200%202.05-.914%202.05-2.02v-9.97a.673.673%200%200%200-.198-.473l-3.95-3.984a.753.753%200%200%200-.535-.22z%22%2F%3E%20%20%20%20%20%20%20%20%3Cpath%20fill%3D%22%23FFF%22%20d%3D%22M17.025%2016.667c.354%200%20.642.302.642.675%200%20.372-.288.675-.642.675h-6.383c-.355%200-.642-.303-.642-.675%200-.373.287-.675.642-.675zm0-2.667c.354%200%20.642.302.642.675%200%20.373-.288.675-.642.675h-6.383c-.355%200-.642-.302-.642-.675%200-.373.287-.675.642-.675zm-3.357-2.667c.369%200%20.668.303.668.675%200%20.373-.3.675-.668.675h-3a.672.672%200%200%201-.668-.675c0-.372.3-.675.668-.675z%22%2F%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E";

var _ref$6 =
  /*#__PURE__*/
  React__default.createElement(
    "g",
    {
      fill: "none",
      fillRule: "evenodd"
    },
    React__default.createElement("circle", {
      cx: 28,
      cy: 28,
      r: 28,
      fill: "#FFF",
      fillOpacity: 0.88
    }),
    React__default.createElement("path", {
      fill: "#000",
      fillOpacity: 0.55,
      d:
        "M20.608 35.182c1.094 0 2.09-.162 2.99-.487.899-.325 1.595-.783 2.087-1.372v-5.296h-5.223v2.015h2.489v2.287c-.438.438-1.17.657-2.197.657-1.02 0-1.796-.356-2.324-1.067-.529-.71-.793-1.762-.793-3.153v-.848c.006-1.38.252-2.418.738-3.117.486-.699 1.194-1.048 2.124-1.048.729 0 1.302.176 1.718.528.416.353.685.909.806 1.668h2.662c-.164-1.434-.69-2.526-1.577-3.276s-2.118-1.126-3.691-1.126c-1.13 0-2.116.257-2.958.77-.842.514-1.486 1.255-1.932 2.224-.447.97-.67 2.116-.67 3.44v.903c.012 1.288.253 2.41.724 3.363.471.954 1.14 1.682 2.006 2.183.865.502 1.873.752 3.021.752zm10.2-.182V21.73h-2.735V35h2.734zm5.268 0v-5.423h5.25V27.37h-5.25v-3.427h5.906v-2.215h-8.64V35h2.734z"
    })
  );

var IconGif =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2056%2056%22%3E%20%20%20%20%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%2228%22%20cy%3D%2228%22%20r%3D%2228%22%20fill%3D%22%23FFF%22%20fill-opacity%3D%22.88%22%2F%3E%20%20%20%20%20%20%20%20%3Cpath%20fill%3D%22%23000%22%20fill-opacity%3D%22.55%22%20d%3D%22M20.608%2035.182c1.094%200%202.09-.162%202.99-.487.899-.325%201.595-.783%202.087-1.372v-5.296h-5.223v2.015h2.489v2.287c-.438.438-1.17.657-2.197.657-1.02%200-1.796-.356-2.324-1.067-.529-.71-.793-1.762-.793-3.153v-.848c.006-1.38.252-2.418.738-3.117.486-.699%201.194-1.048%202.124-1.048.729%200%201.302.176%201.718.528.416.353.685.909.806%201.668h2.662c-.164-1.434-.69-2.526-1.577-3.276s-2.118-1.126-3.691-1.126c-1.13%200-2.116.257-2.958.77-.842.514-1.486%201.255-1.932%202.224-.447.97-.67%202.116-.67%203.44v.903c.012%201.288.253%202.41.724%203.363.471.954%201.14%201.682%202.006%202.183.865.502%201.873.752%203.021.752zm10.2-.182V21.73h-2.735V35h2.734zm5.268%200v-5.423h5.25V27.37h-5.25v-3.427h5.906v-2.215h-8.64V35h2.734z%22%2F%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E";

var IconInfo =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20viewBox%3D%220%200%2024%2024%22%3E%20%20%20%20%3Cpath%20fill%3D%22%237B53EF%22%20fill-rule%3D%22evenodd%22%20d%3D%22M12%201c6.075%200%2011%204.925%2011%2011s-4.925%2011-11%2011S1%2018.075%201%2012%205.925%201%2012%201zm0%202a9%209%200%201%200%200%2018%209%209%200%200%200%200-18zm0%208a1%201%200%200%201%201%201v4a1%201%200%200%201-2%200v-4a1%201%200%200%201%201-1zm0-3a1%201%200%201%201%200%202%201%201%200%200%201%200-2z%22%2F%3E%3C%2Fsvg%3E";

var IconLeave =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20viewBox%3D%220%200%2024%2024%22%3E%20%20%20%20%3Cpath%20fill%3D%22%237B53EF%22%20fill-rule%3D%22evenodd%22%20d%3D%22M12%202a1%201%200%200%201%20.117%201.993L12%204H4a1%201%200%200%200-.993.883L3%205v14a1%201%200%200%200%20.883.993L4%2020h8a1%201%200%200%201%20.117%201.993L12%2022H4a3%203%200%200%201-2.995-2.824L1%2019V5a3%203%200%200%201%202.824-2.995L4%202h8zm6.613%205.21l.094.083%204%204a1%201%200%200%201%20.083%201.32l-.083.094-4%204a1%201%200%200%201-1.497-1.32l.083-.094%201.792-1.793H7.5a1%201%200%200%201-.117-1.993L7.5%2011.5h12.585l-2.792-2.793a1%201%200%200%201-.083-1.32l.083-.094a1%201%200%200%201%201.32-.083z%22%2F%3E%3C%2Fsvg%3E";

var IconNewMessage =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20viewBox%3D%220%200%2024%2024%22%3E%20%20%20%20%3Cpath%20fill%3D%22%237B53EF%22%20fill-rule%3D%22evenodd%22%20d%3D%22M6.045%208.205a1.125%201.125%200%201%200-1.59%201.59l6.75%206.75c.439.44%201.151.44%201.59%200l6.75-6.75a1.125%201.125%200%201%200-1.59-1.59L12%2014.159%206.045%208.205z%22%2F%3E%3C%2Fsvg%3E";

var IconMembers =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20viewBox%3D%220%200%2024%2024%22%3E%20%20%20%20%3Cpath%20fill%3D%22%237B53EF%22%20fill-rule%3D%22evenodd%22%20d%3D%22M13%2014a5%205%200%200%201%204.995%204.783L18%2019v2a1%201%200%200%201-1.993.117L16%2021v-2a3%203%200%200%200-2.824-2.995L13%2016H5a3%203%200%200%200-2.995%202.824L2%2019v2a1%201%200%200%201-1.993.117L0%2021v-2a5%205%200%200%201%204.783-4.995L5%2014h8zm7.25.162a5%205%200%200%201%203.745%204.611L24%2019v2a1%201%200%200%201-1.993.117L22%2021v-2a3%203%200%200%200-2.25-2.902%201%201%200%201%201%20.5-1.936zM9%202a5%205%200%201%201%200%2010A5%205%200%200%201%209%202zm7.248.161a5%205%200%200%201%200%209.688%201%201%200%200%201-.496-1.938%203%203%200%200%200%200-5.812%201%201%200%201%201%20.496-1.938zM9%204a3%203%200%201%200%200%206%203%203%200%200%200%200-6z%22%2F%3E%3C%2Fsvg%3E";

var IconNotifications =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20viewBox%3D%220%200%2024%2024%22%3E%20%20%20%20%3Cpath%20fill%3D%22%237B53EF%22%20fill-rule%3D%22evenodd%22%20d%3D%22M13.73%2020a1%201%200%200%201%20.865%201.502%203%203%200%200%201-5.19%200%201%201%200%200%201%20.752-1.496L10.27%2020h3.46zM12%201a8%208%200%200%201%207.996%207.75L20%209v5a2%202%200%200%200%201.85%201.995l.283.012c1.111.12%201.154%201.73.128%201.965l-.128.021L22%2018H2l-.133-.007c-1.156-.124-1.156-1.862%200-1.986l.282-.012a2%202%200%200%200%201.845-1.838L4%2014V9a8%208%200%200%201%208-8zm0%202a6%206%200%200%200-5.996%205.775L6%209v5c0%20.586-.126%201.142-.352%201.643l-.103.212-.082.145h13.073l-.08-.145a3.973%203.973%200%200%201-.43-1.402l-.021-.253L18%2014V9a6%206%200%200%200-6-6z%22%2F%3E%3C%2Fsvg%3E";

var IconPhoto =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20viewBox%3D%220%200%2024%2024%22%3E%20%20%20%20%3Cpath%20fill%3D%22%237B53EF%22%20fill-rule%3D%22evenodd%22%20d%3D%22M19%202a3%203%200%200%201%203%203v14a3%203%200%200%201-3%203H4.941v-.002l-.117-.003A3%203%200%200%201%202%2019V5a3%203%200%200%201%203-3zm-3%209.415L7.414%2020H19a1%201%200%200%200%20.993-.883L20%2019v-3.585l-4-4zM19%204H5a1%201%200%200%200-1%201v14a1%201%200%200%200%20.65.937L15.292%209.293a1%201%200%200%201%201.32-.083l.094.083L20%2012.585V5a1%201%200%200%200-.883-.993L19%204zM8.5%206a2.5%202.5%200%201%201%200%205%202.5%202.5%200%200%201%200-5zm0%202a.5.5%200%201%200%200%201%20.5.5%200%200%200%200-1z%22%2F%3E%3C%2Fsvg%3E";

var _ref$7 =
  /*#__PURE__*/
  React__default.createElement(
    "g",
    {
      fill: "none",
      fillRule: "evenodd"
    },
    React__default.createElement("circle", {
      cx: 28,
      cy: 28,
      r: 28,
      fill: "#FFF",
      fillOpacity: 0.88
    }),
    React__default.createElement("path", {
      fill: "#000",
      fillOpacity: 0.55,
      d:
        "M38.91 29.987c1.009-.63 1.007-1.664.007-2.304l-17.29-11.055c-1.006-.643-1.809-.2-1.793 1.004l.277 21.891c.015 1.198.847 1.657 1.855 1.029L38.91 29.987z"
    })
  );

var IconPlay =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2056%2056%22%3E%20%20%20%20%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%2228%22%20cy%3D%2228%22%20r%3D%2228%22%20fill%3D%22%23FFF%22%20fill-opacity%3D%22.88%22%2F%3E%20%20%20%20%20%20%20%20%3Cpath%20fill%3D%22%23000%22%20fill-opacity%3D%22.55%22%20d%3D%22M38.91%2029.987c1.009-.63%201.007-1.664.007-2.304l-17.29-11.055c-1.006-.643-1.809-.2-1.793%201.004l.277%2021.891c.015%201.198.847%201.657%201.855%201.029L38.91%2029.987z%22%2F%3E%20%20%20%20%3C%2Fg%3E%3C%2Fsvg%3E";

var IconPlus =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20viewBox%3D%220%200%2024%2024%22%3E%20%20%20%20%3Cpath%20fill%3D%22%237B53EF%22%20fill-rule%3D%22evenodd%22%20d%3D%22M13%2011h7c1.333%200%201.333%202%200%202h-7v7c0%201.333-2%201.333-2%200v-7H4c-1.333%200-1.333-2%200-2h7V4c0-1.333%202-1.333%202%200v7z%22%2F%3E%3C%2Fsvg%3E";

var IconRead =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20viewBox%3D%220%200%2024%2024%22%3E%20%20%20%20%3Cpath%20fill%3D%22%232EBA9F%22%20fill-rule%3D%22evenodd%22%20d%3D%22M2.207%2011.793l5%205a1%201%200%200%201-1.414%201.414l-5-5a1%201%200%200%201%201.414-1.414zm19.586-6a1%201%200%200%201%201.414%201.414l-11%2011a1%201%200%200%201-1.414%200l-5-5a1%201%200%200%201%201.414-1.414l4.293%204.293zm-3.586%200a1%201%200%200%201%200%201.414l-5.999%205.999a1%201%200%200%201-1.414-1.414l5.999-6a1%201%200%200%201%201.414%200z%22%2F%3E%3C%2Fsvg%3E";

var IconRefresh =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%3E%20%20%20%20%3Cpath%20fill%3D%22%237B53EF%22%20fill-rule%3D%22evenodd%22%20d%3D%22M14.419%204.51l.175.167%202.073%201.927V4.167c0-.428.321-.78.736-.828l.097-.006c.427%200%20.78.322.828.736l.005.098v5c0%20.427-.321.78-.736.827L17.5%2010h-5c-.46%200-.833-.373-.833-.833%200-.428.321-.78.736-.828l.097-.006h3.578L13.44%205.88c-1.864-1.841-4.74-2.244-7.05-.986C4.083%206.15%202.898%208.756%203.48%2011.286c.58%202.534%202.792%204.385%205.425%204.537%202.635.152%205.05-1.433%205.928-3.883.155-.433.632-.659%201.065-.504.433.155.659.632.504%201.065-1.127%203.15-4.223%205.18-7.593%204.986-3.37-.195-6.206-2.57-6.954-5.828-.748-3.261.778-6.617%203.738-8.229%202.884-1.57%206.453-1.118%208.826%201.08z%22%2F%3E%3C%2Fsvg%3E";

var IconSend =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2022%2022%22%3E%20%20%20%20%3Cpath%20fill%3D%22%237B53EF%22%20fill-rule%3D%22evenodd%22%20d%3D%22M20.554%2010.117L2.52%201.024C1.613.619.605%201.428%201.008%202.337l2.115%205.685a2%202%200%200%200%201.545%201.275l10.345%201.73-10.345%201.728a2%202%200%200%200-1.545%201.275l-2.115%205.685c-.302.91.605%201.718%201.511%201.213l18.035-9.094c.706-.303.706-1.313%200-1.717z%22%2F%3E%3C%2Fsvg%3E";

var IconSent =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20viewBox%3D%220%200%2024%2024%22%3E%20%20%20%20%3Cpath%20fill%3D%22%23000%22%20fill-opacity%3D%22.38%22%20fill-rule%3D%22evenodd%22%20d%3D%22M4.707%2011.793a1%201%200%201%200-1.414%201.414l5%205a1%201%200%200%200%201.414%200l11-11a1%201%200%201%200-1.414-1.414L9%2016.086l-4.293-4.293z%22%2F%3E%3C%2Fsvg%3E";

var IconShevronRight =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20viewBox%3D%220%200%2024%2024%22%3E%20%20%20%20%3Cpath%20fill%3D%22%237B53EF%22%20fill-rule%3D%22evenodd%22%20d%3D%22M8.293%2017.293a1%201%200%200%200%201.414%201.414l6-6a1%201%200%200%200%200-1.414l-6-6a1%201%200%200%200-1.414%201.414L13.586%2012l-5.293%205.293z%22%2F%3E%3C%2Fsvg%3E";

var IconSpinner =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20viewBox%3D%220%200%2024%2024%22%3E%20%20%20%20%3Cpath%20fill%3D%22%237B53EF%22%20fill-rule%3D%22evenodd%22%20d%3D%22M12%2022.5c5.799%200%2010.5-4.701%2010.5-10.5S17.799%201.5%2012%201.5%201.5%206.201%201.5%2012a1.432%201.432%200%200%200%202.864%200A7.636%207.636%200%201%201%2012%2019.636a1.432%201.432%200%200%200%200%202.864z%22%2F%3E%3C%2Fsvg%3E";

var IconUser =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%20viewBox%3D%220%200%2024%2024%22%3E%20%20%20%20%3Cpath%20fill%3D%22%237B53EF%22%20fill-rule%3D%22evenodd%22%20d%3D%22M16%2014a5%205%200%200%201%204.995%204.783L21%2019v2a1%201%200%200%201-1.993.117L19%2021v-2a3%203%200%200%200-2.824-2.995L16%2016H8a3%203%200%200%200-2.995%202.824L5%2019v2a1%201%200%200%201-1.993.117L3%2021v-2a5%205%200%200%201%204.783-4.995L8%2014h8zM12%202a5%205%200%201%201%200%2010%205%205%200%200%201%200-10zm0%202a3%203%200%201%200%200%206%203%203%200%200%200%200-6z%22%2F%3E%3C%2Fsvg%3E";

function changeTypeToIconComponent(type) {
  switch (type) {
    case Type$1.ADD:
      return React__default.createElement(IconAdd, null);

    case Type$1.ARROW_LEFT:
      return React__default.createElement(IconArrowLeft, null);

    case Type$1.CAMERA:
      return React__default.createElement(IconCamera, null);

    case Type$1.ATTACH:
      return React__default.createElement(IconAttach, null);

    case Type$1.MORE:
      return React__default.createElement(IconMore, null);

    case Type$1.MUTE:
      return React__default.createElement(IconMute, null);

    case Type$1.CHECKBOX:
      return React__default.createElement(IconCheckbox, null);

    case Type$1.CHECKBOX_OFF:
      return React__default.createElement(IconCheckboxOff, null);

    case Type$1.CLOSE:
      return React__default.createElement(IconClose, null);

    case Type$1.COPY:
      return React__default.createElement(IconCopy, null);

    case Type$1.CHAT:
      return React__default.createElement(IconChat, null);

    case Type$1.CREATE:
      return React__default.createElement(IconCreate, null);

    case Type$1.DELETE:
      return React__default.createElement(IconDelete, null);

    case Type$1.DUMMY:
      return React__default.createElement(IconDummy, null);

    case Type$1.EDIT:
      return React__default.createElement(IconEdit, null);

    case Type$1.ERROR:
      return React__default.createElement(IconError, null);

    case Type$1.ERROR_FILLED:
      return React__default.createElement(IconErrorFilled, null);

    case Type$1.DELIVERED:
      return React__default.createElement(IconDelivered, null);

    case Type$1.DOCUMENT:
      return React__default.createElement(IconDocument, null);

    case Type$1.DOWNLOAD:
      return React__default.createElement(IconDownload, null);

    case Type$1.FILE_AUDIO:
      return React__default.createElement(IconFileAudio, null);

    case Type$1.FILE_DOCUMENT:
      return React__default.createElement(IconFileDocument, null);

    case Type$1.GIF:
      return React__default.createElement(IconGif, null);

    case Type$1.INFO:
      return React__default.createElement(IconInfo, null);

    case Type$1.LEAVE:
      return React__default.createElement(IconLeave, null);

    case Type$1.NEW_MESSAGE:
      return React__default.createElement(IconNewMessage, null);

    case Type$1.MEMBERS:
      return React__default.createElement(IconMembers, null);

    case Type$1.NOTIFICATIONS:
      return React__default.createElement(IconNotifications, null);

    case Type$1.PHOTO:
      return React__default.createElement(IconPhoto, null);

    case Type$1.PLAY:
      return React__default.createElement(IconPlay, null);

    case Type$1.PLUS:
      return React__default.createElement(IconPlus, null);

    case Type$1.READ:
      return React__default.createElement(IconRead, null);

    case Type$1.REFRESH:
      return React__default.createElement(IconRefresh, null);

    case Type$1.SEND:
      return React__default.createElement(IconSend, null);

    case Type$1.SENT:
      return React__default.createElement(IconSent, null);

    case Type$1.SHEVRON_RIGHT:
      return React__default.createElement(IconShevronRight, null);

    case Type$1.SPINNER:
      return React__default.createElement(IconSpinner, null);

    case Type$1.USER:
      return React__default.createElement(IconUser, null);

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
    onClick = _ref.onClick;
  var injectingClassName = Array.isArray(className) ? className : [className];
  var style = {
    width: typeof width === "string" ? width : "".concat(width, "px"),
    height: typeof height === "string" ? height : "".concat(height, "px")
  };
  return React__default.createElement(
    "div",
    {
      onClick: onClick,
      onKeyDown: onClick,
      role: "button",
      tabIndex: "0",
      className: []
        .concat(_toConsumableArray(injectingClassName), ["sendbird-icon"])
        .join(" "),
      style: style
    },
    children || changeTypeToIconComponent(type)
  );
}
Icon.propTypes = {
  type: PropTypes.oneOfType([
    PropTypes.oneOf(Object.keys(Type$1)),
    PropTypes.string
  ]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
  children: PropTypes.element,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ])
};
Icon.defaultProps = {
  type: "",
  onClick: function onClick() {},
  width: 26,
  height: 26,
  children: null,
  className: ""
};
var Types$1 = Type$1;

var createChannel = function createChannel(sdk, selectedUsers) {
  return new Promise(function(resolve, reject) {
    sdk.GroupChannel.createChannelWithUserIds(
      Object.keys(selectedUsers),
      false, // 'distinct' is false
      "", // NAME
      "", // COVER_IMAGE_OR_URL
      "", // DATA
      function(groupChannel, error) {
        if (error) {
          reject(error);
        }

        resolve(groupChannel);
      }
    );
  });
};
var getUsers = function getUsers(
  sdk,
  setUsers,
  callback,
  setUsersDataSource,
  userListQuery
) {
  var applicationUserListQuery =
    userListQuery && typeof userListQuery === "function"
      ? userListQuery()
      : sdk.createApplicationUserListQuery();
  setUsersDataSource(applicationUserListQuery);
  applicationUserListQuery.next(function(users, error) {
    if (error) {
      return;
    }

    setUsers(users);
    callback();
  });
};

function Checkbox(_ref) {
  var id = _ref.id,
    checked = _ref.checked,
    onChange = _ref.onChange;

  var _useState = React.useState(checked),
    _useState2 = _slicedToArray(_useState, 2),
    isChecked = _useState2[0],
    setCheck = _useState2[1];

  return React__default.createElement(
    "label",
    {
      className: "sendbird-checkbox",
      htmlFor: id
    },
    React__default.createElement("input", {
      id: id,
      type: "checkbox",
      checked: isChecked,
      onClick: function onClick() {
        return setCheck(!isChecked);
      },
      onChange: onChange
    }),
    React__default.createElement("span", {
      className: "sendbird-checkbox--checkmark"
    })
  );
}
Checkbox.propTypes = {
  id: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func
};
Checkbox.defaultProps = {
  id: "sendbird-checkbox-input",
  checked: false,
  onChange: function onChange() {}
};

function AddChannel(_ref) {
  var sdk = _ref.sdk,
    channelListDispatcher = _ref.channelListDispatcher,
    userId = _ref.userId,
    userListQuery = _ref.userListQuery;

  var _useModal = useModal("sendbird-create-channel"),
    _useModal2 = _slicedToArray(_useModal, 3),
    Modal = _useModal2[0],
    openModal = _useModal2[1],
    closeModal = _useModal2[2];

  var _useState = React.useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    users = _useState2[0],
    setUsers = _useState2[1];

  var _useState3 = React.useState({}),
    _useState4 = _slicedToArray(_useState3, 2),
    selectedUsers = _useState4[0],
    setSelectedUsers = _useState4[1];

  var _useState5 = React.useState({}),
    _useState6 = _slicedToArray(_useState5, 2),
    usersDataSource = _useState6[0],
    setUsersDataSource = _useState6[1];

  var selectedCount = Object.keys(selectedUsers).length;
  return React__default.createElement(
    IconButton,
    {
      height: "32px",
      width: "32px"
    },
    React__default.createElement(Icon, {
      type: Types$1.CREATE,
      width: "22px",
      height: "22px",
      onClick: function onClick() {
        // reset selectedusers
        setSelectedUsers({}); // todo - add loader(?)

        getUsers(sdk, setUsers, openModal, setUsersDataSource, userListQuery);
      }
    }),
    React__default.createElement(
      Modal,
      null,
      React__default.createElement(
        "div",
        {
          className: "sendbird-create-channel--content"
        },
        React__default.createElement(
          ModalComponents.ModalHeader,
          null,
          React__default.createElement(
            Label,
            {
              type: Typography.H_1,
              color: Colors.ONBACKGROUND_1
            },
            StringSet.MODAL__CREATE_CHANNEL__TITLE
          ),
          React__default.createElement(
            ModalComponents.ModalClose,
            null,
            React__default.createElement(
              IconButton,
              {
                onClick: closeModal,
                height: "32px",
                width: "32px"
              },
              React__default.createElement(Icon, {
                type: Types$1.CLOSE,
                width: "22px",
                height: "22px"
              })
            )
          )
        ),
        React__default.createElement(
          Label,
          {
            color: selectedCount > 0 ? Colors.PRIMARY : Colors.ONBACKGROUND_3,
            type: Typography.CAPTION_1
          },
          ""
            .concat(selectedCount, " ")
            .concat(StringSet.MODAL__CREATE_CHANNEL__SELECTED)
        ),
        React__default.createElement(
          "div",
          {
            className: "sendbird-create-channel--scroll",
            onScroll: function onScroll(e) {
              var hasNext = usersDataSource.hasNext;
              var fetchMore =
                e.target.clientHeight + e.target.scrollTop ===
                e.target.scrollHeight;

              if (hasNext && fetchMore) {
                usersDataSource.next(function(usersBatch, error) {
                  if (error) {
                    return;
                  }

                  setUsers(
                    [].concat(
                      _toConsumableArray(users),
                      _toConsumableArray(usersBatch)
                    )
                  );
                });
              }
            }
          },
          users.map(function(user) {
            return (
              user.userId !== userId &&
              React__default.createElement(
                "div",
                {
                  key: user.userId,
                  className: "sendbird-create-channel--user-row"
                },
                React__default.createElement(
                  "div",
                  {
                    className: "sendbird-create-channel--user-row--avatar"
                  },
                  React__default.createElement(Avatar, {
                    height: "40px",
                    width: "40px",
                    src: user.profileUrl
                  })
                ),
                React__default.createElement(
                  "div",
                  {
                    className: "sendbird-create-channel--user-row--label"
                  },
                  React__default.createElement(
                    Label,
                    {
                      type: Typography.SUBTITLE_1,
                      color: Colors.ONBACKGROUND_1
                    },
                    user.nickname
                  )
                ),
                React__default.createElement(
                  "label",
                  {
                    htmlFor: user.userId,
                    className: "sendbird-create-channel--user-row--checkbox"
                  },
                  React__default.createElement(Checkbox, {
                    role: "checkbox",
                    "aria-labelledby": user.userId,
                    id: user.userId,
                    checked: selectedUsers[user.userId],
                    onChange: function onChange(event) {
                      var modifiedSelectedUsers = _objectSpread2(
                        {},
                        selectedUsers,
                        _defineProperty(
                          {},
                          event.target.id,
                          event.target.checked
                        )
                      );

                      if (!event.target.checked) {
                        delete modifiedSelectedUsers[event.target.id];
                      }

                      setSelectedUsers(modifiedSelectedUsers);
                    }
                  })
                )
              )
            );
          })
        ),
        React__default.createElement(
          ModalComponents.ModalFooter,
          null,
          React__default.createElement(
            Button,
            {
              className: "sendbird-create-channel__footer__close",
              type: Type.SECONDARY,
              onClick: closeModal
            },
            StringSet.BUTTON__CLOSE
          ),
          React__default.createElement(
            Button,
            {
              className: "sendbird-create-channel__footer__ok",
              type: Type.PRIMARY,
              disabled: Object.keys(selectedUsers).length < 1,
              onClick: function onClick() {
                return createChannel(sdk, selectedUsers).then(function(
                  channel
                ) {
                  // maybe - do this in event listener
                  channelListDispatcher({
                    type: CREATE_CHANNEL,
                    payload: channel
                  });
                  closeModal();
                });
              } // show error toast?
              // .catch((e) => {
              //   console.warn(e);
              // })
            },
            StringSet.BUTTON__OK
          )
        )
      )
    )
  );
}
AddChannel.propTypes = {
  sdk: PropTypes.shape({}).isRequired,
  channelListDispatcher: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  userListQuery: PropTypes.func.isRequired
};

var ModalHeader$1 = function ModalHeader(_ref) {
  var titleText = _ref.titleText;
  return React__default.createElement(
    "div",
    {
      className: "sendbird-modal-header"
    },
    React__default.createElement(
      Label,
      {
        type: Typography.H_1,
        color: Colors.ONBACKGROUND_1
      },
      titleText
    )
  );
};
ModalHeader$1.propTypes = {
  titleText: PropTypes.string.isRequired
};
var ModalBody = function ModalBody(_ref2) {
  var children = _ref2.children;
  return React__default.createElement(
    "div",
    {
      className: "sendbird-modal-body"
    },
    children
  );
};
ModalBody.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.arrayOf(PropTypes.element.isRequired)
  ]).isRequired
};
var ModalFooter$1 = function ModalFooter(_ref3) {
  var onSubmit = _ref3.onSubmit,
    onCancel = _ref3.onCancel,
    submitText = _ref3.submitText,
    type = _ref3.type;
  return React__default.createElement(
    "div",
    {
      className: "sendbird-modal-footer"
    },
    React__default.createElement(
      Button,
      {
        type: Type.SECONDARY,
        onClick: onCancel
      },
      React__default.createElement(
        Label,
        {
          type: Typography.BUTTON_1,
          color: Colors.ONBACKGROUND_1
        },
        StringSet.BUTTON__CANCEL
      )
    ),
    React__default.createElement(
      Button,
      {
        type: type,
        onClick: onSubmit
      },
      submitText
    )
  );
};
ModalFooter$1.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string.isRequired,
  type: PropTypes.string
};
ModalFooter$1.defaultProps = {
  type: Type.DANGER
};

function Modal$1(props) {
  var children = props.children,
    onCancel = props.onCancel,
    onSubmit = props.onSubmit,
    submitText = props.submitText,
    titleText = props.titleText,
    hideFooter = props.hideFooter,
    type = props.type;
  return reactDom.createPortal(
    React__default.createElement(
      "div",
      {
        className: "sendbird-modal"
      },
      React__default.createElement(
        "div",
        {
          className: "sendbird-modal-content"
        },
        React__default.createElement(ModalHeader$1, {
          titleText: titleText
        }),
        React__default.createElement(ModalBody, null, children),
        !hideFooter &&
          React__default.createElement(ModalFooter$1, {
            onCancel: onCancel,
            onSubmit: onSubmit,
            submitText: submitText,
            type: type
          }),
        React__default.createElement(
          "div",
          {
            className: "sendbird-modal-close"
          },
          React__default.createElement(Icon, {
            type: Types$1.CLOSE,
            onClick: onCancel
          })
        )
      ),
      React__default.createElement("div", {
        className: "sendbird-modal-backdrop"
      })
    ),
    document.getElementById(MODAL_ROOT)
  );
}

Modal$1.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.arrayOf(PropTypes.element.isRequired)
  ]),
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  hideFooter: PropTypes.bool,
  type: PropTypes.string
};
Modal$1.defaultProps = {
  children: React__default.createElement(React__default.Fragment, null),
  hideFooter: false,
  type: Type.DANGER
};

var LeaveChannel = function LeaveChannel(props) {
  var onCloseModal = props.onCloseModal,
    onLeaveChannel = props.onLeaveChannel;
  return React__default.createElement(Modal$1, {
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
  var parentRef = React.useRef(null);

  var _useState = React.useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    showModal = _useState2[0],
    setShowModal = _useState2[1];

  return React__default.createElement(
    "div",
    {
      role: "button",
      style: {
        display: "inline-block"
      },
      onKeyDown: function onKeyDown(e) {
        e.stopPropagation();
      },
      tabIndex: 0,
      onClick: function onClick(e) {
        e.stopPropagation();
      }
    },
    React__default.createElement(ContextMenu, {
      menuTrigger: function menuTrigger(toggleDropdown) {
        return React__default.createElement(
          IconButton,
          {
            ref: parentRef,
            onClick: toggleDropdown,
            height: "32px",
            width: "32px"
          },
          React__default.createElement(Icon, {
            type: Types$1.MORE,
            width: "22px",
            height: "22px"
          })
        );
      },
      menuItems: function menuItems(closeDropdown) {
        return React__default.createElement(
          MenuItems,
          {
            parentRef: parentRef,
            closeDropdown: closeDropdown
          },
          React__default.createElement(
            MenuItem,
            {
              onClick: function onClick() {
                setShowModal(true);
                closeDropdown();
              }
            },
            StringSet.CHANNEL_SETTING__LEAVE_CHANNEL__TITLE
          )
        );
      }
    }),
    showModal &&
      React__default.createElement(LeaveChannel, {
        onCloseModal: function onCloseModal() {
          return setShowModal(false);
        },
        onLeaveChannel: onLeaveChannel
      })
  );
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
  return React__default.createElement(
    "div",
    {
      className: []
        .concat(_toConsumableArray(injectingClassName), ["sendbird-loader"])
        .join(" "),
      style: {
        width: typeof width === "string" ? width : "".concat(width, "px"),
        height: typeof height === "string" ? height : "".concat(height, "px")
      }
    },
    children
  );
}
Loader.propTypes = {
  children: PropTypes.element,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
Loader.defaultProps = {
  children: React__default.createElement(Icon, {
    type: Types$1.SPINNER,
    width: "26px",
    height: "26px"
  }),
  className: "",
  width: "26px",
  height: "26px"
};

var Colors$1 = {
  ONBACKGROUND_1: "ONBACKGROUND_1",
  ONBACKGROUND_2: "ONBACKGROUND_2",
  ONBACKGROUND_3: "ONBACKGROUND_3",
  ONBACKGROUND_4: "ONBACKGROUND_4",
  ONCONTENT_1: "ONCONTENT_1",
  PRIMARY: "PRIMARY",
  ERROR: "ERROR"
};
function changeColorToClassName$1(color) {
  switch (color) {
    case Colors$1.ONBACKGROUND_1:
      return "sendbird-color--onbackground-1";

    case Colors$1.ONBACKGROUND_2:
      return "sendbird-color--onbackground-2";

    case Colors$1.ONBACKGROUND_3:
      return "sendbird-color--onbackground-3";

    case Colors$1.ONBACKGROUND_4:
      return "sendbird-color--onbackground-4";

    case Colors$1.ONCONTENT_1:
      return "sendbird-color--oncontent-1";

    case Colors$1.PRIMARY:
      return "sendbird-color--primary";

    case Colors$1.ERROR:
      return "sendbird-color--error";

    default:
      return null;
  }
}

function PlaceHolder(_ref) {
  var className = _ref.className,
    type = _ref.type,
    retryToConnect = _ref.retryToConnect;
  var injectingClassName = Array.isArray(className) ? className : [className];
  return React__default.createElement(
    "div",
    {
      className: []
        .concat(_toConsumableArray(injectingClassName), [
          "sendbird-place-holder"
        ])
        .join(" ")
    },
    type === PlaceHolderTypes.LOADING
      ? React__default.createElement(
          Loader,
          {
            width: "48px",
            height: "48px"
          },
          React__default.createElement(Icon, {
            type: Types$1.SPINNER,
            width: "48px",
            height: "48px"
          })
        )
      : null,
    type === PlaceHolderTypes.NO_CHANNELS || type === PlaceHolderTypes.WRONG
      ? React__default.createElement(
          "div",
          {
            className: "sendbird-place-holder__body"
          },
          React__default.createElement(Icon, {
            className: "sendbird-place-holder__body__icon",
            type: Types$1.CHAT,
            width: "64px",
            height: "64px"
          }),
          React__default.createElement(
            Label,
            {
              className: "sendbird-place-holder__body__text",
              type: Typography.BODY_1,
              color: Colors$1.ONBACKGROUND_2
            },
            type === PlaceHolderTypes.NO_CHANNELS
              ? StringSet.PLACE_HOLDER__NO_CHANNEL
              : StringSet.PLACE_HOLDER__WRONG
          ),
          retryToConnect
            ? React__default.createElement(
                "div",
                {
                  className: "sendbird-place-holder__body__reconnect",
                  role: "button",
                  tabIndex: 0,
                  onClick: retryToConnect,
                  onKeyPress: retryToConnect
                },
                React__default.createElement(Icon, {
                  className: "sendbird-place-holder__body__reconnect__icon",
                  type: Types$1.REFRESH,
                  width: "20px",
                  height: "20px"
                }),
                React__default.createElement(
                  Label,
                  {
                    className: "sendbird-place-holder__body__reconnect__text",
                    type: Typography.BUTTON_1,
                    color: Colors$1.PRIMARY
                  },
                  StringSet.PLACE_HOLDER__RETRY_TO_CONNECT
                )
              )
            : null
        )
      : null
  );
}
PlaceHolder.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  type: PropTypes.oneOfType([
    PropTypes.oneOf(Object.keys(PlaceHolderTypes)),
    PropTypes.string
  ]).isRequired,
  retryToConnect: PropTypes.func
};
PlaceHolder.defaultProps = {
  className: "",
  retryToConnect: null
};

function ChannelsPlaceholder(_ref) {
  var type = _ref.type;
  return React__default.createElement(
    "div",
    {
      className: "sendbird-channel-list"
    },
    React__default.createElement(PlaceHolder, {
      type: type
    })
  );
}
ChannelsPlaceholder.propTypes = {
  type: PropTypes.string.isRequired
};

var createEventHandler = function createEventHandler(_ref) {
  var sdk = _ref.sdk,
    sdkChannelHandlerId = _ref.sdkChannelHandlerId,
    channelListDispatcher = _ref.channelListDispatcher;
  var ChannelHandler = new sdk.ChannelHandler();

  ChannelHandler.onChannelChanged = function(channel) {
    channelListDispatcher({
      type: ON_CHANNEL_CHANGED,
      payload: channel
    });
  };

  ChannelHandler.onChannelDeleted = function(channelUrl) {
    channelListDispatcher({
      type: ON_CHANNEL_DELETED,
      payload: channelUrl
    });
  };

  ChannelHandler.onUserJoined = function(channel) {
    channelListDispatcher({
      type: ON_USER_JOINED,
      payload: channel
    });
  };

  ChannelHandler.onUserLeft = function(channel) {
    channelListDispatcher({
      type: ON_USER_LEFT,
      payload: channel
    });
  };

  ChannelHandler.onReadStatus = function(channel) {
    channelListDispatcher({
      type: ON_READ_RECEIPT_UPDATED,
      payload: channel
    });
  };

  ChannelHandler.onDeliveryReceiptUpdated = function(channel) {
    channelListDispatcher({
      type: ON_DELIVERY_RECEIPT_UPDATED,
      payload: channel
    });
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
  channelListQuery.order = "latest_last_message"; // 'chronological', 'latest_last_message', 'channel_name_alphabetical', and 'metadata_value_alphabetical'

  channelListQuery.limit = 20; // The value of pagination limit could be set up to 100.

  setChannelSource(channelListQuery);
  channelListDispatcher({
    type: INIT_CHANNELS_START
  });

  if (channelListQuery.hasNext) {
    channelListQuery.next(function(channelList, error) {
      if (error) {
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
    });
  }
}

var noop = function noop() {};

function ChannelList(props) {
  var _props$stores$sdkStor = props.stores.sdkStore,
    sdkStore = _props$stores$sdkStor === void 0 ? {} : _props$stores$sdkStor,
    _props$config = props.config,
    userId = _props$config.userId,
    userListQuery = _props$config.userListQuery,
    renderChannelPreview = props.renderChannelPreview,
    onChannelSelect = props.onChannelSelect;
  var sdk = sdkStore.sdk;
  var sdkIntialized = sdkStore.initialized;

  var _useReducer = React.useReducer(reducer$2, channelListInitialState),
    _useReducer2 = _slicedToArray(_useReducer, 2),
    channelListStore = _useReducer2[0],
    channelListDispatcher = _useReducer2[1];

  var _useState = React.useState({}),
    _useState2 = _slicedToArray(_useState, 2),
    channelSource = _useState2[0],
    setChannelSource = _useState2[1];

  var _useState3 = React.useState(null),
    _useState4 = _slicedToArray(_useState3, 2),
    sdkChannelHandlerId = _useState4[0],
    setSdkChannelHandlerId = _useState4[1];

  var loading = channelListStore.loading,
    currentChannel = channelListStore.currentChannel;
  React.useEffect(
    function() {
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
        if (sdk) {
          sdk.removeChannelHandler(sdkChannelHandlerId);
        } // remove channelSource

        setChannelSource({}); // cleanup

        channelListDispatcher({
          type: RESET_CHANNEL_LIST
        });
      }

      return function() {
        if (sdk) {
          sdk.removeChannelHandler(sdkChannelHandlerId);
        }
      };
    },
    [sdkIntialized]
  );
  var allChannels = channelListStore.allChannels;
  React.useEffect(
    function() {
      if (!sdk) {
        return;
      }

      sdk.GroupChannel.getChannel(currentChannel, function(groupChannel) {
        if (groupChannel) {
          onChannelSelect(groupChannel);
        } else {
          onChannelSelect(null);
        }
      });
    },
    [currentChannel]
  );
  return React__default.createElement(
    "div",
    {
      className: "sendbird-channel-list"
    },
    React__default.createElement(
      "div",
      {
        className: "sendbird-channel-list__header"
      },
      React__default.createElement(ChannelHeader, {
        title: "Channels",
        iconButton: React__default.createElement(AddChannel, {
          userListQuery: userListQuery,
          sdk: sdk,
          channelListDispatcher: channelListDispatcher,
          userId: userId
        })
      })
    ),
    React__default.createElement(
      "div",
      {
        className: "sendbird-channel-list__body",
        onScroll: function onScroll(e) {
          var fetchMore =
            e.target.clientHeight + e.target.scrollTop ===
            e.target.scrollHeight;

          if (fetchMore && channelSource.hasNext) {
            channelListDispatcher({
              type: FETCH_CHANNELS_START
            });
            channelSource.next(function(channelList, error) {
              if (error) {
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
            });
          }
        }
      },
      React__default.createElement(
        "div",
        null,
        allChannels &&
          allChannels.map(function(channel, idx) {
            var _onLeaveChannel = function onLeaveChannel(c, cb) {
              c.leave(function(response, error) {
                if (cb) {
                  cb(response, error);
                }

                if (!error) {
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

            return renderChannelPreview // eslint-disable-next-line
              ? React__default.createElement(
                  "div",
                  {
                    key: channel.url,
                    onClick: onClick
                  },
                  renderChannelPreview({
                    channel: channel,
                    onLeaveChannel: _onLeaveChannel
                  })
                )
              : React__default.createElement(ChannelPreview, {
                  key: channel.url,
                  tabIndex: idx,
                  onClick: onClick,
                  channel: channel,
                  isActive: channel.url === currentChannel, // todo - potential performance hit refactor
                  ChannelAction: React__default.createElement(
                    ChannelPreviewAction,
                    {
                      onLeaveChannel: function onLeaveChannel() {
                        return _onLeaveChannel(channel);
                      }
                    }
                  )
                });
          })
      ),
      (!sdkIntialized || loading) &&
        React__default.createElement(ChannelsPlaceholder, {
          type: PlaceHolderTypes.LOADING
        }), //  placeholder
      (!allChannels || allChannels.length === 0) &&
        React__default.createElement(ChannelsPlaceholder, {
          type: PlaceHolderTypes.NO_CHANNELS
        })
    )
  );
}

ChannelList.propTypes = {
  stores: PropTypes.shape({
    sdkStore: {
      initialized: PropTypes.bool
    }
  }).isRequired,
  config: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    userListQuery: PropTypes.func.isRequired
  }).isRequired,
  renderChannelPreview: PropTypes.element,
  onChannelSelect: PropTypes.func
};
ChannelList.defaultProps = {
  renderChannelPreview: null,
  onChannelSelect: noop
};
var ChannelList$1 = withSendbirdContext(ChannelList);

var RESET_MESSAGES = "RESET_MESSAGES";
var GET_PREV_MESSAGES_START = "GET_PREV_MESSAGES_START";
var GET_PREV_MESSAGES_SUCESS = "GET_PREV_MESSAGES_SUCESS";
var SEND_MESSAGEGE_START = "SEND_MESSAGEGE_START";
var SEND_MESSAGEGE_SUCESS = "SEND_MESSAGEGE_SUCESS";
var SEND_MESSAGEGE_FAILURE = "SEND_MESSAGEGE_FAILURE";
var ON_MESSAGE_RECEIVED = "ON_MESSAGE_RECEIVED";
var ON_MESSAGE_UPDATED = "ON_MESSAGE_UPDATED";
var ON_MESSAGE_DELETED = "ON_MESSAGE_DELETED";
var SET_CURRENT_CHANNEL$1 = "SET_CURRENT_CHANNEL";

var messagesInitialState = {
  initialized: false,
  loading: false,
  allMessages: [],
  currentChannel: null,
  hasMore: false
};

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
        allMessages: [].concat(
          _toConsumableArray(action.payload.messages),
          _toConsumableArray(state.allMessages)
        )
      });

    case SEND_MESSAGEGE_START:
      return _objectSpread2({}, state, {
        allMessages: [].concat(_toConsumableArray(state.allMessages), [
          _objectSpread2({}, action.payload)
        ])
      });

    case SEND_MESSAGEGE_SUCESS:
      return _objectSpread2({}, state, {
        allMessages: state.allMessages.map(function(m) {
          return m.reqId === action.payload.reqId ? action.payload : m;
        })
      });
    // todo: implement complex cases

    case SEND_MESSAGEGE_FAILURE:
      return _objectSpread2({}, state, {
        allMessages: state.allMessages.map(function(m) {
          return m.reqId === action.payload.reqId
            ? _objectSpread2({}, action.payload, {
                failed: true
              })
            : m;
        })
      });

    case SET_CURRENT_CHANNEL$1: {
      return _objectSpread2({}, state, {
        currentChannel: action.payload
      });
    }

    case ON_MESSAGE_RECEIVED: {
      var _action$payload = action.payload,
        channel = _action$payload.channel,
        message = _action$payload.message;
      var currentChannel = state.currentChannel;

      if (channel.url !== currentChannel) {
        return state;
      }

      return _objectSpread2({}, state, {
        allMessages: [].concat(_toConsumableArray(state.allMessages), [message])
      });
    }

    case ON_MESSAGE_UPDATED:
      return _objectSpread2({}, state, {
        allMessages: state.allMessages.map(function(m) {
          return m.messageId === action.payload.messageId ? action.payload : m;
        })
      });

    case ON_MESSAGE_DELETED:
      return _objectSpread2({}, state, {
        allMessages: state.allMessages.filter(function(m) {
          return m.messageId !== action.payload;
        })
      });

    default:
      return state;
  }
}

var eventHandler = function(_ref) {
  var messagesDispatcher = _ref.messagesDispatcher,
    sdk = _ref.sdk,
    uniqueId = _ref.uniqueId;
  var ChannelHandler = new sdk.ChannelHandler();

  ChannelHandler.onMessageReceived = function(channel, message) {
    messagesDispatcher({
      type: ON_MESSAGE_RECEIVED,
      payload: {
        channel: channel,
        message: message
      }
    });
  };

  ChannelHandler.onMessageUpdated = function(_, message) {
    messagesDispatcher({
      type: ON_MESSAGE_UPDATED,
      payload: message
    });
  };

  ChannelHandler.onMessageDeleted = function(_, messageId) {
    messagesDispatcher({
      type: ON_MESSAGE_DELETED,
      payload: messageId
    });
  }; // Add this channel event handler to the SendBird object.

  sdk.addChannelHandler(uniqueId, ChannelHandler);
};

var getMessageCreatedAt = function getMessageCreatedAt(message) {
  return moment(message.createdAt).format("LT");
};
var getSenderName = function getSenderName(message) {
  return (
    message.sender &&
    (message.sender.friendName ||
      message.sender.nickname ||
      message.sender.userId)
  );
};
var getSenderProfileUrl = function getSenderProfileUrl(message) {
  return message.sender && message.sender.profileUrl;
};

var MessageStatusType = {
  PENDING: "PENDING",
  SENT: "SENT",
  DELIVERED: "DELIVERED",
  READ: "READ",
  FAILED: "FAILED"
};

function MessageStatus(_ref) {
  var message = _ref.message,
    status = _ref.status,
    className = _ref.className,
    onClickEvents = _ref.onClickEvents;
  var injectingClassName = Array.isArray(className) ? className : [className];

  var label = function label() {
    switch (status) {
      case MessageStatusType.PENDING: {
        return null;
      }

      case MessageStatusType.SENT:
      case MessageStatusType.DELIVERED:
      case MessageStatusType.READ: {
        return React__default.createElement(
          Label,
          {
            className: "sendbird-message-status__text",
            type: Typography.CAPTION_3,
            color: Colors$1.ONBACKGROUND_2
          },
          getMessageCreatedAt(message)
        );
      }

      case MessageStatusType.FAILED: {
        // check onClickEvents
        return React__default.createElement(
          Label,
          {
            className: "sendbird-message-status__text",
            type: Typography.CAPTION_3,
            color: Colors$1.ERROR
          },
          StringSet.MESSAGE_STATUS__SENDING_FAILED,
          React__default.createElement(
            "span",
            {
              className: "sendbird-message-status__text__try-again",
              role: "button",
              tabIndex: 0,
              onClick: onClickEvents[0],
              onKeyPress: onClickEvents[0]
            },
            StringSet.MESSAGE_STATUS__TRY_AGAIN
          ),
          StringSet.MESSAGE_STATUS__OR,
          React__default.createElement(
            "span",
            {
              className: "sendbird-message-status__text__delete",
              role: "button",
              tabIndex: 0,
              onClick: onClickEvents[1],
              onKeyPress: onClickEvents[1]
            },
            StringSet.MESSAGE_STATUS__DELETE
          )
        );
      }

      default:
        return null;
    }
  };

  var icon = {
    PENDING: React__default.createElement(
      Loader,
      {
        className: "sendbird-message-status__icon",
        width: "16px",
        height: "16px"
      },
      React__default.createElement(Icon, {
        type: Types$1.SPINNER,
        width: "16px",
        height: "16px"
      })
    ),
    SENT: React__default.createElement(Icon, {
      className: "sendbird-message-status__icon",
      width: "16px",
      height: "16px",
      type: Types$1.SENT
    }),
    DELIVERED: React__default.createElement(Icon, {
      className: "sendbird-message-status__icon",
      width: "16px",
      height: "16px",
      type: Types$1.DELIVERED
    }),
    READ: React__default.createElement(Icon, {
      className: "sendbird-message-status__icon",
      width: "16px",
      height: "16px",
      type: Types$1.READ
    }),
    FAILED: React__default.createElement(Icon, {
      className: "sendbird-message-status__icon",
      width: "16px",
      height: "16px",
      type: Types$1.ERROR_FILLED
    })
  };
  return React__default.createElement(
    "div",
    {
      className: []
        .concat(_toConsumableArray(injectingClassName), [
          "sendbird-message-status"
        ])
        .join(" ")
    },
    label(),
    icon[status]
  );
}
MessageStatus.propTypes = {
  message: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.array,
      PropTypes.object
    ])
  ),
  status: PropTypes.string,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  onClickEvents: PropTypes.arrayOf(PropTypes.func)
};
MessageStatus.defaultProps = {
  message: null,
  status: "",
  className: "",
  onClickEvents: [function() {}, function() {}]
};

var copyToClipboard = function copyToClipboard(text) {
  if (window.clipboardData && window.clipboardData.setData) {
    // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
    return window.clipboardData.setData("Text", text);
  }

  if (
    document.queryCommandSupported &&
    document.queryCommandSupported("copy")
  ) {
    var textarea = document.createElement("textarea");
    textarea.textContent = text;
    textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in Microsoft Edge.

    document.body.appendChild(textarea);
    textarea.select();

    try {
      return document.execCommand("copy"); // Security exception may be thrown by some browsers.
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
  var parentRef = React.useRef(null);
  return React__default.createElement(
    "div",
    {
      className: "sendbird-user-message--outgoing"
    },
    React__default.createElement(ContextMenu, {
      menuTrigger: function menuTrigger(toggleDropdown) {
        return React__default.createElement(
          IconButton,
          {
            className: "sendbird-user-message__more",
            width: "32px",
            height: "32px",
            onClick: toggleDropdown
          },
          React__default.createElement(Icon, {
            width: "22px",
            height: "22px",
            type: Types$1.MORE
          })
        );
      },
      menuItems: function menuItems(closeDropdown) {
        return React__default.createElement(
          MenuItems,
          {
            parentRef: parentRef,
            closeDropdown: closeDropdown
          },
          React__default.createElement(
            MenuItem,
            {
              onClick: function onClick() {
                copyToClipboard(message.message);
                closeDropdown();
              }
            },
            "Copy"
          ),
          React__default.createElement(
            MenuItem,
            {
              onClick: function onClick() {
                showEdit(true);
                closeDropdown();
              }
            },
            "Edit"
          ),
          React__default.createElement(
            MenuItem,
            {
              onClick: function onClick() {
                showRemove(true);
                closeDropdown();
              }
            },
            "Delete"
          )
        );
      }
    }),
    React__default.createElement(
      "div",
      {
        className: "sendbird-user-message__tooltip",
        ref: parentRef
      },
      React__default.createElement(
        Label,
        {
          className: "sendbird-user-message__tooltip__text",
          type: Typography.BODY_1,
          color: Colors.ONBACKGROUND_1
        },
        message.message
      )
    ),
    React__default.createElement(
      "div",
      {
        className: "sendbird-user-message__status"
      },
      React__default.createElement(MessageStatus, {
        message: message,
        status: status
      })
    )
  );
}

function IncomingUserMessage(_ref2) {
  var message = _ref2.message;
  var parentRef = React.useRef(null);
  return React__default.createElement(
    "div",
    {
      className: "sendbird-user-message--incoming"
    },
    React__default.createElement(Avatar, {
      className: "sendbird-user-message__avatar",
      src: getSenderProfileUrl(message),
      width: "28px",
      height: "28px"
    }),
    React__default.createElement(
      Label,
      {
        className: "sendbird-user-message__sender-name",
        type: Typography.CAPTION_2,
        color: Colors.ONBACKGROUND_2
      },
      getSenderName(message)
    ),
    React__default.createElement(
      "div",
      {
        className: "sendbird-user-message__tooltip",
        ref: parentRef
      },
      React__default.createElement(
        Label,
        {
          className: "sendbird-user-message__tooltip__text",
          type: Typography.BODY_1,
          color: Colors.ONBACKGROUND_1
        },
        message.message
      )
    ),
    React__default.createElement(
      Label,
      {
        className: "sendbird-user-message__sent-at",
        type: Typography.CAPTION_3,
        color: Colors.ONBACKGROUND_2
      },
      getMessageCreatedAt(message)
    ),
    React__default.createElement(ContextMenu, {
      menuTrigger: function menuTrigger(toggleDropdown) {
        return React__default.createElement(
          IconButton,
          {
            className: "sendbird-user-message__more",
            width: "32px",
            height: "32px",
            onClick: toggleDropdown
          },
          React__default.createElement(Icon, {
            width: "22px",
            height: "22px",
            type: Types$1.MORE
          })
        );
      },
      menuItems: function menuItems(closeDropdown) {
        return React__default.createElement(
          MenuItems,
          {
            parentRef: parentRef,
            closeDropdown: closeDropdown
          },
          React__default.createElement(
            MenuItem,
            {
              onClick: function onClick() {
                copyToClipboard(message.message);
                closeDropdown();
              }
            },
            "Copy"
          )
        );
      }
    })
  );
}

IncomingUserMessage.propTypes = {
  message: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.array,
      PropTypes.object
    ])
  )
};
IncomingUserMessage.defaultProps = {
  message: {}
};
OutgoingUserMessage.propTypes = {
  message: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.array,
      PropTypes.object
    ])
  ),
  showEdit: PropTypes.func.isRequired,
  showRemove: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired
};
OutgoingUserMessage.defaultProps = {
  message: {}
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
  injectingClassName.push(
    "sendbird-message".concat(isByMe ? "--outgoing" : "--incoming")
  );
  if (!message) return null;
  return React__default.createElement(
    "div",
    {
      className: []
        .concat(_toConsumableArray(injectingClassName), ["sendbird-message"])
        .join(" ")
    },
    isByMe
      ? React__default.createElement(OutgoingUserMessage, {
          message: message,
          showEdit: showEdit,
          showRemove: showRemove,
          status: status
        })
      : React__default.createElement(IncomingUserMessage, {
          message: message
        }) // file messages should be here
  );
}
Message.propTypes = {
  isByMe: PropTypes.bool,
  message: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.array,
      PropTypes.object
    ])
  ).isRequired,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  showEdit: PropTypes.func,
  status: PropTypes.string.isRequired,
  showRemove: PropTypes.func
};
Message.defaultProps = {
  isByMe: false,
  className: "",
  showEdit: noop$1,
  showRemove: noop$1
};

function AdminMessage(_ref) {
  var className = _ref.className,
    message = _ref.message;

  if (!message.messageType || message.messageType !== "admin") {
    // change to use message.isAdminMessage()
    return null;
  }

  var injectingClassName = Array.isArray(className) ? className : [className];
  return React__default.createElement(
    "div",
    {
      className: []
        .concat(_toConsumableArray(injectingClassName), [
          "sendbird-admin-message"
        ])
        .join(" ")
    },
    React__default.createElement(
      Label,
      {
        className: "sendbird-admin-message__text",
        type: Typography.CAPTION_2,
        color: Colors$1.ONBACKGROUND_2
      },
      message.message
    )
  );
}
AdminMessage.propTypes = {
  message: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.array,
      PropTypes.object
    ])
  ),
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ])
};
AdminMessage.defaultProps = {
  message: {},
  className: ""
};

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
var SUPPORTED_MIMES = {
  IMAGE: [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp" // not supported in IE
  ],
  VIDEO: ["video/mpeg", "video/ogg", "video/webm", "video/mp4"]
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
    _onClick = _ref.onClick,
    showRemove = _ref.showRemove,
    status = _ref.status;
  var type = message.type,
    url = message.url,
    _message$name = message.name,
    name = _message$name === void 0 ? "" : _message$name;
  var parentRef = React.useRef(null);

  var _useState = React.useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    imgLoaded = _useState2[0],
    setImgLoaded = _useState2[1];

  return React__default.createElement(
    "div",
    {
      className: [
        "sendbird-thumbnail",
        !isByMe ? "sendbird-thumbnail--incoming" : "",
        !imgLoaded ? "sendbird-thumbnail--loading" : ""
      ].join(" ")
    },
    !isByMe &&
      React__default.createElement(
        React__default.Fragment,
        null,
        React__default.createElement(Avatar, {
          className: "sendbird-thumbnail__avatar",
          src: getSenderProfileUrl(message),
          width: "28px",
          height: "28px"
        }),
        React__default.createElement(
          Label,
          {
            className: "sendbird-thumbnail__sender-name",
            type: Typography.CAPTION_2,
            color: Colors.ONBACKGROUND_2
          },
          getSenderName(message) || ""
        )
      ),
    React__default.createElement(
      "div",
      {
        className: "sendbird-thumbnail__body"
      },
      isByMe &&
        React__default.createElement(ContextMenu, {
          menuTrigger: function menuTrigger(toggleDropdown) {
            return React__default.createElement(
              IconButton,
              {
                className: "sendbird-thumbnail__more",
                width: "32px",
                height: "32px",
                onClick: toggleDropdown
              },
              React__default.createElement(Icon, {
                width: "22px",
                height: "22px",
                type: Types$1.MORE
              })
            );
          },
          menuItems: function menuItems(closeDropdown) {
            return React__default.createElement(
              MenuItems,
              {
                parentRef: parentRef,
                closeDropdown: closeDropdown
              },
              React__default.createElement(
                MenuItem,
                {
                  onClick: function onClick() {
                    showRemove(true);
                    closeDropdown();
                  }
                },
                "Delete"
              )
            );
          }
        }),
      React__default.createElement(
        "div",
        {
          ref: parentRef,
          onClick: function onClick() {
            return _onClick(true);
          },
          onKeyDown: function onKeyDown() {
            return _onClick(true);
          },
          tabIndex: 0,
          role: "button",
          className: "sendbird-thumbnail__wrap"
        },
        isVideo(type) && // eslint-disable-next-line jsx-a11y/media-has-caption
          React__default.createElement(
            "video",
            {
              className: "sendbird-thumbnail__video",
              onLoadedData: function onLoadedData() {
                return setImgLoaded(true);
              }
            },
            React__default.createElement("source", {
              src: url,
              type: type
            })
          ),
        isImage(type) &&
          React__default.createElement("img", {
            onLoad: function onLoad() {
              return setImgLoaded(true);
            },
            src: url,
            alt: name,
            className: "sendbird-thumbnail__img"
          }),
        unSupported(type) &&
          React__default.createElement(
            "div",
            {
              className: "sendbird-thumbnail__other"
            },
            "Unknown type"
          ),
        React__default.createElement("div", {
          className: "sendbird-thumbnail__wrap-overlay"
        })
      ),
      isByMe &&
        React__default.createElement(
          "div",
          {
            className: "sendbird-thumbnail__status"
          },
          React__default.createElement(MessageStatus, {
            message: message,
            status: status
          })
        )
    )
  );
}
ThumbnailMessage.propTypes = {
  message: PropTypes.shape({
    type: PropTypes.string,
    url: PropTypes.string,
    name: PropTypes.string
  }).isRequired,
  status: PropTypes.string,
  isByMe: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  showRemove: PropTypes.func
};
ThumbnailMessage.defaultProps = {
  isByMe: false,
  showRemove: noop$2,
  status: ""
};

function TextButton(_ref) {
  var color = _ref.color,
    children = _ref.children,
    className = _ref.className,
    onClick = _ref.onClick,
    notUnderline = _ref.notUnderline;
  var injectingClassName = Array.isArray(className) ? className : [className];
  return React__default.createElement(
    "div",
    {
      role: "button",
      tabIndex: 0,
      className: []
        .concat(_toConsumableArray(injectingClassName), [
          changeColorToClassName$1(color),
          notUnderline
            ? "sendbird-textbutton--not-underline"
            : "sendbird-textbutton"
        ])
        .join(" "),
      onClick: onClick,
      onKeyPress: onClick
    },
    children
  );
}
TextButton.propTypes = {
  color: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  onClick: PropTypes.func,
  notUnderline: PropTypes.bool
};
TextButton.defaultProps = {
  color: Colors$1.ONBACKGROUND_1,
  className: "",
  onClick: function onClick() {},
  notUnderline: false
};

var truncate = function truncate(fullStr, strLen) {
  if (fullStr.length <= strLen) return fullStr;
  var separator = "...";
  var sepLen = separator.length;
  var charsToShow = strLen - sepLen;
  var frontChars = Math.ceil(charsToShow / 2);
  var backChars = Math.floor(charsToShow / 2);
  return (
    fullStr.substr(0, frontChars) +
    separator +
    fullStr.substr(fullStr.length - backChars)
  );
};

var MAX_TRUNCATE_LENGTH = 40;

var noop$3 = function noop() {};

function checkFileType(fileUrl) {
  var result = null;
  var imageFile = /(\.gif|\.jpg|\.jpeg|\.txt|\.pdf)$/i;
  var audioFile = /(\.mp3)$/i;

  if (imageFile.test(fileUrl)) {
    result = Types$1.FILE_DOCUMENT;
  } else if (audioFile.test(fileUrl)) {
    result = Types$1.FILE_AUDIO;
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

  var parentRef = React.useRef(null);
  return React__default.createElement(
    "div",
    {
      className: "sendbird-file-message__outgoing",
      ref: parentRef
    },
    React__default.createElement(ContextMenu, {
      menuTrigger: function menuTrigger(toggleDropdown) {
        return React__default.createElement(
          IconButton,
          {
            className: "sendbird-file-message__more",
            width: "32px",
            height: "32px",
            onClick: toggleDropdown
          },
          React__default.createElement(Icon, {
            width: "22px",
            height: "22px",
            type: Types$1.MORE
          })
        );
      },
      menuItems: function menuItems(closeDropdown) {
        return React__default.createElement(
          MenuItems,
          {
            parentRef: parentRef,
            closeDropdown: closeDropdown
          },
          React__default.createElement(
            MenuItem,
            {
              onClick: function onClick() {
                showRemove(true);
                closeDropdown();
              }
            },
            "Delete"
          )
        );
      }
    }),
    React__default.createElement(
      "div",
      {
        className: "sendbird-file-message__tooltip"
      },
      checkFileType(url)
        ? React__default.createElement(Icon, {
            className: "sendbird-file-message__tooltip__icon",
            width: "28px",
            height: "28px",
            type: checkFileType(url)
          })
        : null,
      React__default.createElement(
        TextButton,
        {
          className: "sendbird-file-message__tooltip__text",
          onClick: openFileUrl
        },
        React__default.createElement(
          Label,
          {
            type: Typography.BODY_1,
            color: Colors$1.ONBACKGROUND_1
          },
          truncate(message.url, MAX_TRUNCATE_LENGTH)
        )
      )
    ),
    React__default.createElement(
      "div",
      {
        className: "sendbird-file-message__status"
      },
      React__default.createElement(MessageStatus, {
        message: message,
        status: status
      })
    )
  );
}
function IncomingFileMessage(_ref2) {
  var message = _ref2.message;

  var openFileUrl = function openFileUrl() {
    window.open(message.url);
  };

  return React__default.createElement(
    "div",
    {
      className: "sendbird-file-message__incoming"
    },
    React__default.createElement(Avatar, {
      className: "sendbird-file-message__avatar",
      src: getSenderProfileUrl(message),
      width: "28px",
      height: "28px"
    }),
    React__default.createElement(
      Label,
      {
        className: "sendbird-file-message__sender-name",
        type: Typography.CAPTION_2,
        color: Colors$1.ONBACKGROUND_2
      },
      getSenderName(message)
    ),
    React__default.createElement(
      "div",
      {
        className: "sendbird-file-message__tooltip"
      },
      checkFileType(message.url)
        ? React__default.createElement(Icon, {
            className: "sendbird-file-message__tooltip__icon",
            width: "28px",
            height: "28px",
            type: checkFileType(message.url)
          })
        : null,
      React__default.createElement(
        TextButton,
        {
          className: "sendbird-file-message__tooltip__text",
          onClick: openFileUrl
        },
        React__default.createElement(
          Label,
          {
            type: Typography.BODY_1,
            color: Colors$1.ONBACKGROUND_1
          },
          truncate(message.url, MAX_TRUNCATE_LENGTH)
        )
      )
    ),
    React__default.createElement(
      Label,
      {
        className: "sendbird-file-message__sent-at",
        type: Typography.CAPTION_3,
        color: Colors$1.ONBACKGROUND_2
      },
      getMessageCreatedAt(message)
    )
  );
}
OutgoingFileMessage.propTypes = {
  message: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.array,
      PropTypes.object
    ])
  ),
  status: PropTypes.string.isRequired,
  showRemove: PropTypes.func.isRequired
};
OutgoingFileMessage.defaultProps = {
  message: {}
};
IncomingFileMessage.propTypes = {
  message: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.array,
      PropTypes.object
    ])
  )
};
IncomingFileMessage.defaultProps = {
  message: {}
};

var MessageSwitch = function MessageSwitch(_ref3) {
  var message = _ref3.message,
    isByMe = _ref3.isByMe,
    showRemove = _ref3.showRemove,
    status = _ref3.status;
  return React__default.createElement(
    "div",
    {
      className: "sendbird-file-message".concat(
        isByMe ? "--outgoing" : "--incoming"
      )
    },
    isByMe
      ? React__default.createElement(OutgoingFileMessage, {
          message: message,
          showRemove: showRemove,
          status: status
        })
      : React__default.createElement(IncomingFileMessage, {
          message: message
        })
  );
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
  return React__default.createElement(
    "div",
    {
      className: []
        .concat(_toConsumableArray(injectingClassName), ["sendbird-separator"])
        .join(" ")
    },
    React__default.createElement("div", {
      className: [
        "".concat(
          changeColorToClassName$1(separatorColor),
          "--background-color"
        ),
        "sendbird-separator__left"
      ].join(" ")
    }),
    React__default.createElement(
      "div",
      {
        className: "sendbird-separator__text"
      },
      children
    ),
    React__default.createElement("div", {
      className: [
        "".concat(
          changeColorToClassName$1(separatorColor),
          "--background-color"
        ),
        "sendbird-separator__right"
      ].join(" ")
    })
  );
}
DateSeparator.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.element
  ]),
  separatorColor: PropTypes.string
};
DateSeparator.defaultProps = {
  className: "",
  children: React__default.createElement(
    Label,
    {
      type: Typography.CAPTION_2,
      color: Colors$1.ONBACKGROUND_2
    },
    "Date Separator"
  ),
  separatorColor: Colors$1.ONBACKGROUND_4
};

// import IconAttach from '../../svgs/icon-attach.svg';

var LINE_HEIGHT = 76;

var noop$4 = function noop() {}; // https://stackoverflow.com/questions/17772260/textarea-auto-height

var setHeight = function setHeight(e) {
  var elem = e.target;
  elem.style.height = "auto";

  if (elem.scrollHeight > LINE_HEIGHT) {
    elem.style.height = "".concat(elem.scrollHeight, "px");
  } else {
    elem.style.height = "";
  }
};

var handleUploadFile = function handleUploadFile(callback) {
  return function(event) {
    if (event.target.files && event.target.files[0]) {
      callback(event.target.files[0]);
    }
  };
};

var MessageInput = React__default.forwardRef(function(props, ref) {
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
  var fileInputRef = React.useRef(null);

  var _useState = React.useState(value),
    _useState2 = _slicedToArray(_useState, 2),
    inputValue = _useState2[0],
    setInputValue = _useState2[1];

  return React__default.createElement(
    "form",
    {
      className: "".concat(isEdit ? "sendbird-message-input__edit" : "")
    },
    React__default.createElement(
      "div",
      {
        className: "\n          sendbird-message-input\n          ".concat(
          disabled ? "sendbird-message-input__disabled" : "",
          "\n        "
        )
      },
      React__default.createElement("textarea", {
        disabled: disabled,
        ref: ref,
        name: name,
        value: inputValue,
        className: "sendbird-message-input--textarea",
        maxLength: maxLength,
        onKeyDown: function onKeyDown() {
          onStartTyping();
        },
        onChange: function onChange(e) {
          setInputValue(e.target.value);
        },
        onInput: setHeight
      }),
      !inputValue &&
        React__default.createElement(
          Label,
          {
            type: Typography.BODY_1,
            color: Colors.ONBACKGROUND_3,
            className: "sendbird-message-input--placeholder"
          },
          placeholder || StringSet.CHANNEL__MESSAGE_INPUT__PLACE_HOLDER
        ),
      !isEdit &&
        !inputValue &&
        React__default.createElement(
          IconButton,
          {
            className: "sendbird-message-input--attach",
            height: "32px",
            width: "32px",
            onClick: function onClick() {
              // todo: clear previous input
              fileInputRef.current.click();
            }
          },
          React__default.createElement(Icon, {
            type: Types$1.ATTACH,
            width: "20px",
            height: "20px"
          }),
          React__default.createElement("input", {
            type: "file",
            ref: fileInputRef,
            onChange: handleUploadFile(onFileUpload),
            className: "sendbird-message-input--attach-input"
          })
        ),
      !isEdit &&
        inputValue &&
        React__default.createElement(
          IconButton,
          {
            className: "sendbird-message-input--send",
            height: "32px",
            width: "32px",
            onClick: function onClick() {
              onSendMessage(inputValue);
              setInputValue("");
            }
          },
          React__default.createElement(Icon, {
            type: Types$1.SEND,
            width: "20px",
            height: "20px"
          })
        )
    ),
    isEdit &&
      React__default.createElement(
        "div",
        {
          className: "sendbird-message-input--edit-action"
        },
        React__default.createElement(
          Button,
          {
            className: "sendbird-message-input--edit-action__cancel",
            type: Type.SECONDARY,
            size: Size.SMALL,
            onClick: onCancelEdit
          },
          StringSet.BUTTON__CANCEL
        ),
        React__default.createElement(
          Button,
          {
            className: "sendbird-message-input--edit-action__save",
            type: Type.PRIMARY,
            size: Size.SMALL,
            onClick: function onClick() {
              onSendMessage(name, inputValue, function() {
                onCancelEdit();
              });
            }
          },
          StringSet.BUTTON__SAVE
        )
      )
  );
});
MessageInput.propTypes = {
  placeholder: PropTypes.string,
  isEdit: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  maxLength: PropTypes.number,
  onFileUpload: PropTypes.func,
  onSendMessage: PropTypes.func.isRequired,
  onStartTyping: PropTypes.func,
  onCancelEdit: PropTypes.func
};
MessageInput.defaultProps = {
  value: "",
  name: "sendbird-message-input",
  isEdit: false,
  disabled: false,
  placeholder: "",
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
  return React__default.createElement(
    "div",
    {
      className: "sendbird-fileviewer"
    },
    React__default.createElement(
      "div",
      {
        className: "sendbird-fileviewer__header"
      },
      React__default.createElement(
        "div",
        {
          className: "sendbird-fileviewer__header-left"
        },
        React__default.createElement(
          "div",
          {
            className: "sendbird-fileviewer__header-avatar"
          },
          React__default.createElement(Avatar, {
            height: "32px",
            width: "32px",
            src: profileUrl
          })
        ),
        React__default.createElement(
          Label,
          {
            className: "sendbird-fileviewer__header-filename",
            type: Typography.H_2,
            color: Colors.ONBACKGROUND_1
          },
          name
        ),
        React__default.createElement(
          Label,
          {
            className: "sendbird-fileviewer__header-sendername",
            type: Typography.BODY_1,
            color: Colors.ONBACKGROUND_2
          },
          nickname
        )
      ),
      React__default.createElement(
        "div",
        {
          className: "sendbird-fileviewer__header-right"
        },
        !unSupported(type) &&
          React__default.createElement(
            "div",
            {
              className: "sendbird-fileviewer__header-actions"
            },
            React__default.createElement(
              "a",
              {
                href: url,
                rel: "noopener noreferrer",
                target: "_blank",
                className: "sendbird-fileviewer__header-download"
              },
              React__default.createElement(Icon, {
                type: Types$1.DOWNLOAD,
                height: "22px",
                width: "22px"
              })
            ),
            onDelete &&
              isByMe &&
              React__default.createElement(
                "div",
                {
                  className: "sendbird-fileviewer__header-delete"
                },
                React__default.createElement(Icon, {
                  type: Types$1.DELETE,
                  height: "22px",
                  width: "22px",
                  onClick: onDelete
                })
              )
          ),
        React__default.createElement(
          "div",
          {
            className: "sendbird-fileviewer__header-close"
          },
          React__default.createElement(Icon, {
            type: Types$1.CLOSE,
            height: "22px",
            width: "22px",
            onClick: onClose
          })
        )
      )
    ),
    React__default.createElement(
      "div",
      {
        className: "sendbird-fileviewer__content"
      },
      isVideo(type) && // eslint-disable-next-line jsx-a11y/media-has-caption
        React__default.createElement(
          "video",
          {
            controls: true,
            className: "sendbird-fileviewer__video"
          },
          React__default.createElement("source", {
            src: url,
            type: type
          })
        ),
      isImage(type) &&
        React__default.createElement("img", {
          src: url,
          alt: name,
          className: "sendbird-fileviewer__img"
        }),
      unSupported(type) &&
        React__default.createElement(
          "div",
          {
            className: "sendbird-fileviewer__unsupported"
          },
          React__default.createElement(
            Label,
            {
              type: Typography.H_1,
              color: Colors.ONBACKGROUND_1
            },
            "Unsupoprted message"
          )
        )
    )
  );
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
    name = _message$name === void 0 ? "" : _message$name;
  var profileUrl = sender.profileUrl,
    _sender$nickname = sender.nickname,
    nickname = _sender$nickname === void 0 ? "" : _sender$nickname;
  return reactDom.createPortal(
    React__default.createElement(FileViewerComponent, {
      profileUrl: profileUrl,
      nickname: nickname,
      type: type,
      url: url,
      name: name,
      onClose: onClose,
      onDelete: onDelete,
      isByMe: isByMe
    }),
    document.getElementById(MODAL_ROOT)
  );
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
  return React__default.createElement(Modal$1, {
    onCancel: onCloseModal,
    onSubmit: onDeleteMessage,
    submitText: "Delete",
    titleText: StringSet.MODAL__DELETE_MESSAGE__TITLE
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

  var _useState = React.useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    showEdit = _useState2[0],
    setShowEdit = _useState2[1];

  var _useState3 = React.useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    showRemove = _useState4[0],
    setShowRemove = _useState4[1];

  var _useState5 = React.useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    showFileViewer = _useState6[0],
    setShowFileViewer = _useState6[1];

  var isByMe =
    userId === sender.userId ||
    message.requestState === "pending" ||
    message.requestState === "failed";

  if (showEdit) {
    return React__default.createElement(MessageInput, {
      isEdit: true,
      name: message.messageId,
      onSendMessage: updateMessage,
      onCancelEdit: function onCancelEdit() {
        setShowEdit(false);
      },
      value: message.message
    });
  }

  return React__default.createElement(
    "div",
    {
      className: "sendbird-msg-hoc"
    },
    hasSeperator &&
      React__default.createElement(
        DateSeparator,
        null,
        React__default.createElement(
          Label,
          {
            type: Typography.CAPTION_2,
            color: Colors.ONBACKGROUND_2
          },
          moment(message.createdAt).format("LL")
        )
      ),
    ((message.isFileMessage && message.isFileMessage()) ||
      message.messageType === "file") &&
      React__default.createElement(
        React__default.Fragment,
        null,
        isImage(message.type) || isVideo(message.type)
          ? React__default.createElement(ThumbnailMessage, {
              message: message,
              isByMe: isByMe,
              showRemove: setShowRemove,
              onClick: setShowFileViewer,
              status: status
            })
          : React__default.createElement(MessageSwitch, {
              message: message,
              isByMe: isByMe,
              showRemove: setShowRemove,
              status: status
            })
      ),
    message.isAdminMessage &&
      message.isAdminMessage() &&
      React__default.createElement(AdminMessage, {
        message: message
      }),
    ((message.isUserMessage && message.isUserMessage()) ||
      message.messageType === "user") &&
      React__default.createElement(Message, {
        message: message,
        isByMe: isByMe,
        showEdit: setShowEdit,
        showRemove: setShowRemove,
        status: status
      }),
    showRemove &&
      React__default.createElement(RemoveMessage, {
        onCloseModal: function onCloseModal() {
          return setShowRemove(false);
        },
        onDeleteMessage: function onDeleteMessage() {
          deleteMessage(message, function() {
            setShowRemove(false);
          });
        }
      }),
    showFileViewer &&
      React__default.createElement(FileViewer, {
        onClose: function onClose() {
          return setShowFileViewer(false);
        },
        message: message,
        onDelete: function onDelete() {
          deleteMessage(message, function() {
            setShowFileViewer(false);
          });
        },
        isByMe: isByMe
      })
  );
}
MessageHoc.propTypes = {
  userId: PropTypes.string,
  message: PropTypes.shape({
    isFileMessage: PropTypes.func,
    isAdminMessage: PropTypes.func,
    isUserMessage: PropTypes.func,
    isDateSeperator: PropTypes.func,
    messageId: PropTypes.string,
    type: PropTypes.string,
    createdAt: PropTypes.string,
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
  status: PropTypes.string.isRequired
};
MessageHoc.defaultProps = {
  userId: "",
  message: {},
  hasSeperator: false
};

var scrollIntoLast = function scrollIntoLast(selector) {
  var intialTry =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var MAX_TRIES = 10;
  var currentTry = intialTry;

  if (currentTry > MAX_TRIES) {
    return;
  }

  try {
    var nodes = document.querySelectorAll(selector);
    var last = nodes[nodes.length - 1];
    last.scrollIntoView();
  } catch (error) {
    setTimeout(function() {
      scrollIntoLast(selector, currentTry + 1);
    }, 500 * currentTry);
  }
};
var getParsedStatus = function getParsedStatus(message, currentGroupChannel) {
  if (message.requestState === "failed") {
    return MessageStatusType.FAILED;
  }

  if (message.requestState === "pending") {
    return MessageStatusType.PENDING;
  }

  if (message.requestState === "succeeded") {
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
  (function(_Component) {
    _inherits(ConversationScroll, _Component);

    function ConversationScroll() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, ConversationScroll);

      for (
        var _len = arguments.length, args = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(
        this,
        (_getPrototypeOf2 = _getPrototypeOf(ConversationScroll)).call.apply(
          _getPrototypeOf2,
          [this].concat(args)
        )
      );

      _defineProperty(_assertThisInitialized(_this), "onScroll", function(e) {
        var _this$props = _this.props,
          scrollRef = _this$props.scrollRef,
          hasMore = _this$props.hasMore,
          messagesDispatcher = _this$props.messagesDispatcher,
          messageSource = _this$props.messageSource;
        var element = e.target;
        var scrollTop = element.scrollTop;

        if (scrollTop === 0) {
          if (!hasMore) {
            return;
          }

          var nodes = scrollRef.current.querySelectorAll(".sendbird-msg");
          var first = nodes[0];
          messageSource.load(function(messages, error) {
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
            setTimeout(function() {
              // https://github.com/scabbiaza/react-scroll-position-on-updating-dom
              first.scrollIntoView();
            });
          });
        }
      });

      return _this;
    }

    _createClass(ConversationScroll, [
      {
        key: "render",
        value: function render() {
          var _this$props2 = this.props,
            scrollRef = _this$props2.scrollRef,
            hasMore = _this$props2.hasMore,
            initialized = _this$props2.initialized,
            allMessages = _this$props2.allMessages,
            userId = _this$props2.userId,
            deleteMessage = _this$props2.deleteMessage,
            updateMessage = _this$props2.updateMessage,
            readStatus = _this$props2.readStatus,
            currentGroupChannel = _this$props2.currentGroupChannel,
            renderChatItem = _this$props2.renderChatItem;
          return React__default.createElement(
            "div",
            {
              className: "sendbird-conversation__messages"
            },
            React__default.createElement(
              "div",
              {
                ref: scrollRef,
                className: "sendbird-conversation__scroll-container",
                onScroll: this.onScroll
              },
              React__default.createElement(
                "div",
                {
                  className: "sendbird-conversation__padding"
                },
                hasMore && "LoadMore"
              ),
              React__default.createElement(
                "div",
                null,
                initialized &&
                  allMessages.map(function(m, idx) {
                    var prev = allMessages[idx - 1];
                    var prevCreatedAt = prev && prev.createdAt;
                    var currentCreatedAt = m.createdAt; // https://stackoverflow.com/a/41855608

                    var hasSeperator = !(
                      prevCreatedAt &&
                      moment(currentCreatedAt).isSame(
                        moment(prevCreatedAt),
                        "day"
                      )
                    );

                    if (renderChatItem) {
                      return React__default.createElement(
                        "div",
                        {
                          key: m.messageId
                        },
                        renderChatItem({
                          message: m,
                          onDeleteMessage: deleteMessage,
                          onUpdateMessage: updateMessage
                        })
                      );
                    }

                    return React__default.createElement(
                      MessageHoc, // show status for pending/failed messages
                      {
                        status:
                          readStatus[m.messageId] ||
                          getParsedStatus(m, currentGroupChannel),
                        key: m.messageId,
                        message: m,
                        userId: userId,
                        hasSeperator: hasSeperator,
                        deleteMessage: deleteMessage,
                        updateMessage: updateMessage
                      }
                    );
                  })
              )
            )
          );
        }
      }
    ]);

    return ConversationScroll;
  })(React.Component);
ConversationScroll.propTypes = {
  // https://stackoverflow.com/a/52646941
  scrollRef: PropTypes.shape({
    current: PropTypes.elementType
  }).isRequired,
  hasMore: PropTypes.bool,
  messagesDispatcher: PropTypes.func.isRequired,
  messageSource: PropTypes.shape({
    load: PropTypes.func,
    hasMore: PropTypes.bool
  }).isRequired,
  initialized: PropTypes.bool,
  userId: PropTypes.string,
  allMessages: PropTypes.arrayOf(
    PropTypes.shape({
      createdAt: PropTypes.string
    })
  ).isRequired,
  deleteMessage: PropTypes.func.isRequired,
  updateMessage: PropTypes.func.isRequired,
  readStatus: PropTypes.shape({}).isRequired,
  currentGroupChannel: PropTypes.shape({}).isRequired,
  renderChatItem: PropTypes.element
};
ConversationScroll.defaultProps = {
  hasMore: false,
  initialized: false,
  userId: "",
  renderChatItem: null
};

var generateName = function generateName(members) {
  if (!members || members.length === 0) {
    return "";
  }

  if (members && members.length === 1) {
    return ""
      .concat(members[0].nickname, " ")
      .concat(StringSet.TYPING_INDICATOR__IS_TYPING);
  }

  if (members && members.length === 2) {
    return ""
      .concat(members[0].nickname, " ")
      .concat(StringSet.TYPING_INDICATOR__AND, " ")
      .concat(members[1].nickname, " ")
      .concat(StringSet.TYPING_INDICATOR__ARE_TYPING);
  }

  return StringSet.TYPING_INDICATOR__MULTIPLE_TYPING;
};

function TypingIndicator(_ref) {
  var channelUrl = _ref.channelUrl,
    sb = _ref.sb;

  var _useState = React.useState(uuidv4()),
    _useState2 = _slicedToArray(_useState, 2),
    handlerId = _useState2[0],
    setHandlerId = _useState2[1];

  var _useState3 = React.useState([]),
    _useState4 = _slicedToArray(_useState3, 2),
    typingMembers = _useState4[0],
    setTypingMembers = _useState4[1];

  React.useEffect(
    function() {
      if (sb && sb.ChannelHandler) {
        sb.removeChannelHandler(handlerId);
        var newHandlerId = uuidv4();
        var handler = new sb.ChannelHandler();

        handler.onTypingStatusUpdated = function(groupChannel) {
          var members = groupChannel.getTypingMembers();

          if (groupChannel.url === channelUrl) {
            setTypingMembers(members);
          }
        };

        sb.addChannelHandler(newHandlerId, handler);
        setHandlerId(newHandlerId);
      }

      return function() {
        if (sb && sb.removeChannelHandler) {
          sb.removeChannelHandler(handlerId);
        }
      };
    },
    [channelUrl]
  );
  return React__default.createElement(
    Label,
    {
      type: Typography.CAPTION_2,
      color: Colors.ONBACKGROUND_2
    },
    generateName(typingMembers)
  );
}

TypingIndicator.propTypes = {
  channelUrl: PropTypes.string.isRequired,
  sb: PropTypes.shape({
    ChannelHandler: PropTypes.func,
    removeChannelHandler: PropTypes.func,
    addChannelHandler: PropTypes.func
  }).isRequired
};

function AutoRefresh(_ref) {
  var repeatFunc = _ref.repeatFunc;

  var _useState = React.useState(""),
    _useState2 = _slicedToArray(_useState, 2),
    label = _useState2[0],
    setLabel = _useState2[1];

  React.useEffect(function() {
    var interval = setInterval(function() {
      if (label !== repeatFunc()) {
        setLabel(repeatFunc());
      }
    }, 10000);
    return function() {
      clearInterval(interval);
    };
  }, []);
  return React__default.createElement(
    "div",
    {
      className: "sendbird-repeat-text"
    },
    label
  );
}
AutoRefresh.propTypes = {
  repeatFunc: PropTypes.func.isRequired
};

function ChatHeader(_ref) {
  var avatar = _ref.avatar,
    title = _ref.title,
    subTitle = _ref.subTitle,
    getLastSeenAt = _ref.getLastSeenAt,
    isActive = _ref.isActive,
    isMuted = _ref.isMuted,
    onActionClick = _ref.onActionClick;
  return React__default.createElement(
    "div",
    {
      className: "sendbird-chat-header"
    },
    React__default.createElement(
      "div",
      {
        className: "sendbird-chat-header__left"
      },
      React__default.createElement(Avatar, {
        className: "sendbird-chat-header__avatar",
        src: avatar,
        width: "32px",
        height: "32px"
      }),
      React__default.createElement(
        Label,
        {
          className: "sendbird-chat-header__title",
          type: Typography.H_2,
          color: Colors.ONBACKGROUND_1
        },
        title
      ),
      (typeof isActive === "string" && isActive === "true") ||
        (typeof isActive === "boolean" && isActive)
        ? React__default.createElement("div", {
            className: "sendbird-chat-header__active"
          })
        : null,
      React__default.createElement(
        Label,
        {
          className: "sendbird-chat-header__subtitle",
          type: Typography.BODY_1,
          color: Colors.ONBACKGROUND_2
        },
        subTitle ||
          React__default.createElement(AutoRefresh, {
            repeatFunc: getLastSeenAt
          })
      )
    ),
    React__default.createElement(
      "div",
      {
        className: "sendbird-chat-header__right"
      },
      (typeof isMuted === "string" && isMuted === "true") ||
        (typeof isMuted === "boolean" && isMuted)
        ? React__default.createElement(Icon, {
            className: "sendbird-chat-header__mute",
            type: Types$1.MUTE,
            width: "24px",
            height: "24px"
          })
        : null,
      React__default.createElement(
        IconButton,
        {
          className: "sendbird-chat-header__info",
          width: "32px",
          height: "32px",
          onClick: onActionClick
        },
        React__default.createElement(Icon, {
          type: Types$1.INFO,
          width: "22px",
          height: "22px"
        })
      )
    )
  );
}
ChatHeader.propTypes = {
  avatar: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  title: PropTypes.string,
  getLastSeenAt: PropTypes.func,
  subTitle: PropTypes.string,
  isActive: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  isMuted: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onActionClick: PropTypes.func
};
ChatHeader.defaultProps = {
  avatar: "",
  title: "",
  subTitle: "",
  getLastSeenAt: function getLastSeenAt() {},
  isActive: false,
  isMuted: false,
  onActionClick: function onActionClick() {}
};

var noop$5 = function noop() {};

var ConversationPanel = function ConversationPanel(props) {
  var channelUrl = props.channelUrl,
    sdkStore = props.stores.sdkStore,
    userId = props.config.userId,
    renderChatItem = props.renderChatItem,
    onChatHeaderActionClick = props.onChatHeaderActionClick;
  var sdk = sdkStore.sdk;
  var sdkInit = sdkStore.initialized;

  var _useReducer = React.useReducer(reducer$3, messagesInitialState),
    _useReducer2 = _slicedToArray(_useReducer, 2),
    messagesStore = _useReducer2[0],
    messagesDispatcher = _useReducer2[1];

  var _useState = React.useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    messageSource = _useState2[0],
    setMessageSource = _useState2[1];

  var _useState3 = React.useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    invalidChannel = _useState4[0],
    setInvalidChannel = _useState4[1];

  var _useState5 = React.useState(uuidv4()),
    _useState6 = _slicedToArray(_useState5, 2),
    channelHandlerId = _useState6[0],
    setChannelHandlerId = _useState6[1]; // map to update read status of messages

  var _useState7 = React.useState({}),
    _useState8 = _slicedToArray(_useState7, 2),
    readStatus = _useState8[0],
    setReadStatus = _useState8[1];

  var _useState9 = React.useState(),
    _useState10 = _slicedToArray(_useState9, 2),
    messageReciverId = _useState10[0],
    setMessageReciverId = _useState10[1];

  var _useState11 = React.useState({}),
    _useState12 = _slicedToArray(_useState11, 2),
    currentGroupChannel = _useState12[0],
    setCurrentGroupChannel = _useState12[1];

  var messageInputRef = React.useRef(null);
  var scrollRef = React.useRef(null);
  var allMessages = messagesStore.allMessages,
    loading = messagesStore.loading,
    hasMore = messagesStore.hasMore,
    initialized = messagesStore.initialized; // to create message-datasource

  React.useEffect(
    function() {
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

        sdk.removeChannelHandler(channelHandlerId);
        sdk.GroupChannel.getChannel(channelUrl, function(groupChannel) {
          if (!groupChannel) {
            setInvalidChannel(true);
            return;
          }

          setInvalidChannel(false);
          setCurrentGroupChannel(groupChannel); // for handling read status on the go

          var handler = new sdk.ChannelHandler();

          handler.onReadReceiptUpdated = function(c) {
            if (channelUrl === c.url) {
              var allReadStatus = allMessages.reduce(function(
                accumulator,
                msg
              ) {
                if (msg.messageId !== 0) {
                  return _objectSpread2(
                    {},
                    accumulator,
                    _defineProperty(
                      {},
                      msg.messageId,
                      getParsedStatus(msg, groupChannel)
                    )
                  );
                }

                return accumulator;
              },
              {});
              setReadStatus(allReadStatus);
            }
          };

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

          prevMessageListQuery.load(function(messages, error) {
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
            setTimeout(function() {
              return scrollIntoLast(".sendbird-msg-hoc");
            });
          });
        });
      }
    },
    [channelUrl, sdkInit]
  ); // todo: cleanup internal state - this is for removing messages from other person

  React.useEffect(
    function() {
      setMessageReciverId(uuidv4());

      if (channelUrl && sdk) {
        eventHandler({
          messagesDispatcher: messagesDispatcher,
          sdk: sdk
        });
      }

      return function() {
        if (sdk) {
          sdk.removeChannelHandler(messageReciverId);
        }
      };
    },
    [channelUrl, sdkInit]
  ); // to create initial read status

  React.useEffect(
    function() {
      if (allMessages.length > 0) {
        var allReadStatus = allMessages.reduce(function(accumulator, msg) {
          if (msg.messageId !== 0) {
            return _objectSpread2(
              {},
              accumulator,
              _defineProperty(
                {},
                msg.messageId,
                getParsedStatus(msg, currentGroupChannel)
              )
            );
          }

          return accumulator;
        }, {});
        setReadStatus(allReadStatus);
      }
    },
    [allMessages]
  );

  if (loading) {
    return React__default.createElement(PlaceHolder, {
      type: PlaceHolderTypes.LOADING
    });
  }

  if (invalidChannel) {
    return React__default.createElement(PlaceHolder, {
      type: PlaceHolderTypes.WRONG
    });
  }

  return React__default.createElement(
    "div",
    {
      className: "sendbird-conversation"
    },
    React__default.createElement(ChatHeader, {
      onActionClick: onChatHeaderActionClick,
      avatar: getChannelAvatarSource(currentGroupChannel),
      title: getChannelTitle(currentGroupChannel),
      getLastSeenAt: function getLastSeenAt$1() {
        return getLastSeenAt(currentGroupChannel);
      },
      isActive: false,
      isMuted: false
    }),
    React__default.createElement(ConversationScroll, {
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
        currentGroupChannel.deleteMessage(message, function(err) {
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
        currentGroupChannel.updateUserMessage(messageId, params, function(
          message,
          err
        ) {
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
    }),
    React__default.createElement(
      "div",
      {
        className: "sendbird-conversation__footer"
      },
      React__default.createElement(MessageInput, {
        ref: messageInputRef,
        disabled: !initialized,
        onStartTyping: function onStartTyping() {
          currentGroupChannel.startTyping();
        },
        onSendMessage: function onSendMessage() {
          var text = messageInputRef.current.value;
          var params = new sdk.UserMessageParams();
          params.message = text;
          var pendingMsg = currentGroupChannel.sendUserMessage(params, function(
            message,
            error
          ) {
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
          setTimeout(function() {
            return scrollIntoLast(".sendbird-msg-hoc");
          });
        },
        onFileUpload: function onFileUpload(file) {
          var params = new sdk.FileMessageParams();
          params.file = file;
          var pendingMsg = currentGroupChannel.sendFileMessage(params, function(
            message,
            error
          ) {
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
          setTimeout(function() {
            return scrollIntoLast(".sendbird-msg-hoc");
          });
        }
      }),
      React__default.createElement(
        "div",
        {
          className: "sendbird-conversation__typing-indicator"
        },
        React__default.createElement(TypingIndicator, {
          channelUrl: channelUrl,
          sb: sdk
        })
      )
    )
  );
};
ConversationPanel.propTypes = {
  channelUrl: PropTypes.string.isRequired,
  stores: PropTypes.shape({
    sdkStore: {
      initialized: PropTypes.bool
    }
  }).isRequired,
  dispatchers: PropTypes.shape({
    messagesDispatcher: PropTypes.func.isRequired,
    channelsDispatcher: PropTypes.func.isRequired
  }).isRequired,
  config: PropTypes.shape({
    userId: PropTypes.string.isRequired
  }).isRequired,
  renderChatItem: PropTypes.element,
  onChatHeaderActionClick: PropTypes.func
};
ConversationPanel.defaultProps = {
  renderChatItem: null,
  onChatHeaderActionClick: noop$5
};
var Channel = withSendbirdContext(ConversationPanel);

var InputLabel = function InputLabel(_ref) {
  var children = _ref.children;
  return React__default.createElement(
    Label,
    {
      type: Typography.CAPTION_3,
      color: Colors.ONBACKGROUND_1,
      className: "sendbird-input-label"
    },
    children
  );
};
InputLabel.propTypes = {
  children: PropTypes.string.isRequired
}; // future: add validations? onChange? more props etc etc

var Input = React__default.forwardRef(function(props, ref) {
  var value = props.value,
    placeHolder = props.placeHolder,
    disabled = props.disabled,
    name = props.name;

  var _useState = React.useState(value),
    _useState2 = _slicedToArray(_useState, 2),
    inputValue = _useState2[0],
    setInputValue = _useState2[1];

  return React__default.createElement(
    "div",
    {
      className: "sendbird-input"
    },
    React__default.createElement("input", {
      ref: ref,
      name: name,
      disabled: disabled,
      value: inputValue,
      className: "sendbird-input--input",
      onChange: function onChange(e) {
        setInputValue(e.target.value);
      }
    }),
    placeHolder &&
      !inputValue &&
      React__default.createElement(
        Label,
        {
          className: "sendbird-input--placeholder",
          type: Typography.BODY_1,
          color: Colors.ONBACKGROUND_3
        },
        placeHolder
      )
  );
});
Input.propTypes = {
  value: PropTypes.string,
  placeHolder: PropTypes.string,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool
};
Input.defaultProps = {
  value: "",
  placeHolder: "",
  disabled: false
};

var EditDetails = function EditDetails(props) {
  var _onSubmit = props.onSubmit,
    onCancel = props.onCancel,
    avatar = props.avatar,
    title = props.title;
  var inputRef = React.useRef(null);
  var hiddenInputRef = React.useRef(null);

  var _useState = React.useState(avatar),
    _useState2 = _slicedToArray(_useState, 2),
    currentImg = _useState2[0],
    setCurrentImg = _useState2[1];

  return React__default.createElement(
    Modal$1,
    {
      titleText: StringSet.MODAL__CHANNEL_INFORMATION__TITLE,
      submitText: StringSet.BUTTON__SAVE,
      onCancel: onCancel,
      onSubmit: function onSubmit() {
        _onSubmit(currentImg, inputRef.current.value);

        onCancel();
      },
      type: Type.PRIMARY
    },
    React__default.createElement(
      "form",
      {
        className: "channel-profile-form"
      },
      React__default.createElement(
        "div",
        {
          className: "channel-profile-form__img-section"
        },
        React__default.createElement(
          InputLabel,
          null,
          StringSet.MODAL__CHANNEL_INFORMATION__CHANNEL_IMAGE
        ),
        React__default.createElement(
          "div",
          {
            className: "channel-profile-form__avatar"
          },
          React__default.createElement(Avatar, {
            height: "80px",
            width: "80px",
            src: currentImg
          })
        ),
        React__default.createElement("input", {
          ref: hiddenInputRef,
          type: "file",
          accept: "image/gif, image/jpeg, image/png",
          style: {
            display: "none"
          },
          onChange: function onChange(e) {
            setCurrentImg(URL.createObjectURL(e.target.files[0]));
          }
        }),
        React__default.createElement(
          TextButton,
          {
            className: "channel-profile-form__avatar-button",
            onClick: function onClick() {
              return hiddenInputRef.current.click();
            },
            notUnderline: true
          },
          React__default.createElement(
            Label,
            {
              type: Typography.BUTTON_1,
              color: Colors$1.PRIMARY
            },
            StringSet.MODAL__CHANNEL_INFORMATION__UPLOAD
          )
        )
      ),
      React__default.createElement(
        "div",
        {
          className: "channel-profile-form__name-section"
        },
        React__default.createElement(
          InputLabel,
          null,
          StringSet.MODAL__CHANNEL_INFORMATION__CHANNEL_NAME
        ),
        React__default.createElement(Input, {
          ref: inputRef,
          value: title,
          placeHolder: StringSet.MODAL__CHANNEL_INFORMATION__INPUT__PLACE_HOLDER
        })
      )
    )
  );
};

EditDetails.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  avatar: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

var ChannelProfile = function ChannelProfile(props) {
  var avatar = props.avatar,
    title = props.title,
    onChannelInfoChange = props.onChannelInfoChange;

  var _useState = React.useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    showModal = _useState2[0],
    setShowModal = _useState2[1];

  return React__default.createElement(
    "div",
    {
      className: "sendbird-channel-profile"
    },
    React__default.createElement(
      "div",
      {
        className: "sendbird-channel-profile__avatar"
      },
      React__default.createElement(Avatar, {
        src: avatar
      })
    ),
    React__default.createElement(
      Label,
      {
        type: Typography.SUBTITLE_2,
        color: Colors$1.ONBACKGROUND_1,
        className: "sendbird-channel-profile__title"
      },
      title
    ),
    React__default.createElement(
      TextButton,
      {
        className: "sendbird-channel-profile__edit",
        onClick: function onClick() {
          return setShowModal(true);
        },
        notUnderline: true
      },
      React__default.createElement(
        Label,
        {
          type: Typography.BUTTON_1,
          color: Colors$1.PRIMARY
        },
        StringSet.CHANNEL_SETTING__PROFILE__EDIT
      )
    ),
    showModal &&
      React__default.createElement(EditDetails, {
        onCancel: function onCancel() {
          return setShowModal(false);
        },
        onSubmit: onChannelInfoChange,
        avatar: avatar,
        title: title
      })
  );
};

ChannelProfile.propTypes = {
  avatar: PropTypes.string,
  title: PropTypes.string,
  onChannelInfoChange: PropTypes.func
};
ChannelProfile.defaultProps = {
  avatar: "",
  title: "",
  onChannelInfoChange: function onChannelInfoChange() {}
};

var InviteMembers = function InviteMembers(props) {
  var userId = props.userId,
    userQueryCreator = props.userQueryCreator,
    closeModal = props.closeModal,
    _onSubmit = props.onSubmit,
    submitText = props.submitText,
    titleText = props.titleText;

  var _useState = React.useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    users = _useState2[0],
    setUsers = _useState2[1];

  var _useState3 = React.useState({}),
    _useState4 = _slicedToArray(_useState3, 2),
    selectedUsers = _useState4[0],
    setSelectedUsers = _useState4[1];

  var _useState5 = React.useState({}),
    _useState6 = _slicedToArray(_useState5, 2),
    usersDataSource = _useState6[0],
    setUsersDataSource = _useState6[1];

  var selectedCount = Object.keys(selectedUsers).length;
  React.useEffect(function() {
    var applicationUserListQuery = userQueryCreator();
    setUsersDataSource(applicationUserListQuery);
    applicationUserListQuery.next(function(users_, error) {
      if (error) {
        return;
      }

      setUsers(users_);
    });
  }, []);
  return React__default.createElement(
    Modal$1,
    {
      onCancel: closeModal,
      onSubmit: function onSubmit() {
        _onSubmit(Object.keys(selectedUsers));

        closeModal();
      },
      submitText: submitText,
      titleText: titleText,
      type: Type.PRIMARY
    },
    React__default.createElement(
      "div",
      null,
      React__default.createElement(
        Label,
        {
          color: selectedCount > 0 ? Colors.PRIMARY : Colors.ONBACKGROUND_3,
          type: Typography.CAPTION_1
        },
        ""
          .concat(selectedCount, " ")
          .concat(StringSet.MODAL__INVITE_MEMBER__SELECTEC)
      ),
      React__default.createElement(
        "div",
        {
          className: "sendbird-create-channel--scroll",
          onScroll: function onScroll(e) {
            var hasNext = usersDataSource.hasNext;
            var fetchMore =
              e.target.clientHeight + e.target.scrollTop ===
              e.target.scrollHeight;

            if (hasNext && fetchMore) {
              usersDataSource.next(function(usersBatch, error) {
                if (error) {
                  return;
                }

                setUsers(
                  [].concat(
                    _toConsumableArray(users),
                    _toConsumableArray(usersBatch)
                  )
                );
              });
            }
          }
        },
        users.map(function(user) {
          return (
            user.userId !== userId &&
            React__default.createElement(
              "div",
              {
                key: user.userId,
                className: "sendbird-create-channel--user-row"
              },
              React__default.createElement(
                "div",
                {
                  className: "sendbird-create-channel--user-row--avatar"
                },
                React__default.createElement(Avatar, {
                  height: "40px",
                  width: "40px",
                  src: user.profileUrl
                })
              ),
              React__default.createElement(
                "div",
                {
                  className: "sendbird-create-channel--user-row--label"
                },
                React__default.createElement(
                  Label,
                  {
                    type: Typography.SUBTITLE_1,
                    color: Colors.ONBACKGROUND_1
                  },
                  user.nickname
                )
              ),
              React__default.createElement(
                "label",
                {
                  htmlFor: user.userId,
                  className: "sendbird-create-channel--user-row--checkbox"
                },
                React__default.createElement(Checkbox, {
                  id: user.userId,
                  checked: selectedUsers[user.userId],
                  onChange: function onChange(event) {
                    var modifiedSelectedUsers = _objectSpread2(
                      {},
                      selectedUsers,
                      _defineProperty({}, event.target.id, event.target.checked)
                    );

                    if (!event.target.checked) {
                      delete modifiedSelectedUsers[event.target.id];
                    }

                    setSelectedUsers(modifiedSelectedUsers);
                  }
                })
              )
            )
          );
        })
      )
    )
  );
};

InviteMembers.propTypes = {
  userId: PropTypes.string.isRequired,
  userQueryCreator: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string,
  titleText: PropTypes.string
};
InviteMembers.defaultProps = {
  submitText: "create",
  titleText: "Create new channel"
};

var MemebersAccordion = function MemebersAccordion(_ref) {
  var members = _ref.members,
    userQueryCreator = _ref.userQueryCreator,
    userId = _ref.userId,
    onInviteMemebers = _ref.onInviteMemebers;

  var _useState = React.useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    showMoreModal = _useState2[0],
    setShowMoreModal = _useState2[1];

  var _useState3 = React.useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    showAddUserModal = _useState4[0],
    setShowAddUserModal = _useState4[1];

  return React__default.createElement(
    "div",
    {
      className: "sendbird-members-accordion"
    },
    React__default.createElement(
      "div",
      {
        className: "sendbird-members-accordion__list"
      }, // display only first five members
      members.slice(0, 6).map(function(member) {
        return React__default.createElement(
          "div",
          {
            className: "sendbird-members-accordion__member",
            key: member.userId
          },
          React__default.createElement(
            "div",
            {
              className: "sendbird-members-accordion__member-avatar"
            },
            React__default.createElement(Avatar, {
              height: "24px",
              width: "24px"
            })
          ),
          React__default.createElement(
            Label,
            {
              type: Typography.SUBTITLE_2,
              color: Colors.ONBACKGROUND_1
            },
            member.nickname
          )
        );
      })
    ),
    React__default.createElement(
      "div",
      {
        className: "sendbird-members-accordion__footer"
      },
      React__default.createElement(
        Button,
        {
          type: Type.SECONDARY,
          size: Size.SMALL,
          onClick: function onClick() {
            return setShowMoreModal(true);
          }
        },
        React__default.createElement(
          Label,
          {
            type: Typography.BUTTON_1,
            color: Colors.ONBACKGROUND_1
          },
          StringSet.CHANNEL_SETTING__MEMBERS__SEE_ALL_MEMBERS
        )
      ),
      showMoreModal &&
        React__default.createElement(
          Modal$1,
          {
            hideFooter: true,
            onCancel: function onCancel() {
              return setShowMoreModal(false);
            },
            onSubmit: function onSubmit() {},
            titleText: ""
              .concat(members.length, " ")
              .concat(StringSet.MODAL__USER_LIST__TITLE)
          },
          React__default.createElement(
            "div",
            {
              className: "sendbird-more-members__popup-scroll"
            },
            members.map(function(m) {
              return React__default.createElement(
                "div",
                {
                  key: m.userId,
                  className: "sendbird-more-members__popup-member"
                },
                React__default.createElement(
                  "div",
                  {
                    className: "sendbird-more-members__popup-avatar"
                  },
                  React__default.createElement(Avatar, {
                    src: m.profileUrl,
                    height: "40px",
                    width: "40px"
                  })
                ),
                React__default.createElement(
                  Label,
                  {
                    type: Typography.SUBTITLE_1,
                    Colors: Colors.ONBACKGROUND_1
                  },
                  m.nickname
                )
              );
            })
          )
        ),
      React__default.createElement(
        Button,
        {
          type: Type.SECONDARY,
          size: Size.SMALL,
          onClick: function onClick() {
            return setShowAddUserModal(true);
          }
        },
        React__default.createElement(
          Label,
          {
            type: Typography.BUTTON_1,
            color: Colors.ONBACKGROUND_1
          },
          StringSet.CHANNEL_SETTING__MEMBERS__INVITE_MEMBER
        )
      ),
      showAddUserModal &&
        React__default.createElement(InviteMembers, {
          titleText: StringSet.MODAL__INVITE_MEMBER__TITLE,
          submitText: StringSet.BUTTON__OK,
          closeModal: function closeModal() {
            return setShowAddUserModal(false);
          },
          userId: userId,
          userQueryCreator: userQueryCreator,
          onSubmit: onInviteMemebers
        })
    )
  );
};

MemebersAccordion.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape({})),
  userQueryCreator: PropTypes.func.isRequired,
  onInviteMemebers: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
};
MemebersAccordion.defaultProps = {
  members: []
};

function ChannelSettings(props) {
  var onCloseClick = props.onCloseClick,
    channelUrl = props.channelUrl,
    userListQuery = props.userListQuery,
    onChannelModified = props.onChannelModified;
  var sdkStore = props.stores.sdkStore,
    userId = props.config.userId;
  var sdk = sdkStore.sdk,
    initialized = sdkStore.initialized; // hack to kepp track of channel updates by triggering useEffect

  var _useState = React.useState(uuidv4()),
    _useState2 = _slicedToArray(_useState, 2),
    channelUpdateId = _useState2[0],
    setChannelUpdateId = _useState2[1];

  var _useState3 = React.useState(null),
    _useState4 = _slicedToArray(_useState3, 2),
    channel = _useState4[0],
    setChannel = _useState4[1];

  var _useState5 = React.useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    invalidChannel = _useState6[0],
    setInvalidChannel = _useState6[1];

  var _useState7 = React.useState(false),
    _useState8 = _slicedToArray(_useState7, 2),
    showAccordion = _useState8[0],
    setShowAccordion = _useState8[1];

  var _useState9 = React.useState(false),
    _useState10 = _slicedToArray(_useState9, 2),
    showLeaveChannelModal = _useState10[0],
    setShowLeaveChannelModal = _useState10[1];

  React.useEffect(
    function() {
      if (!channelUrl || !initialized || !sdk) {
        setInvalidChannel(false);
      } else {
        sdk.GroupChannel.getChannel(channelUrl, function(groupChannel) {
          if (!groupChannel) {
            setInvalidChannel(true);
          } else {
            setInvalidChannel(false);
            setChannel(groupChannel);
          }
        });
      }
    },
    [channelUrl, initialized, channelUpdateId]
  );

  if (!channel || invalidChannel) {
    return React__default.createElement(
      "div",
      {
        className: "sendbird-channel-settings"
      },
      React__default.createElement(
        "div",
        {
          className: "sendbird-channel-settings__header"
        },
        React__default.createElement(
          Label,
          {
            type: Typography.H_2,
            color: Colors.ONBACKGROUND_1
          },
          "Channel details"
        ),
        React__default.createElement(Icon, {
          type: Types$1.CLOSE,
          className: "sendbird-channel-settings__close-icon",
          height: "22px",
          width: "22px",
          onClick: function onClick() {
            onCloseClick();
          }
        })
      ),
      React__default.createElement(
        "div",
        null,
        React__default.createElement(PlaceHolder, {
          type: PlaceHolderTypes.WRONG
        })
      )
    );
  }

  return React__default.createElement(
    "div",
    {
      className: "sendbird-channel-settings"
    },
    React__default.createElement(
      "div",
      {
        className: "sendbird-channel-settings__header"
      },
      React__default.createElement(
        Label,
        {
          type: Typography.H_2,
          color: Colors.ONBACKGROUND_1
        },
        StringSet.CHANNEL_SETTING__HEADER__TITLE
      ),
      React__default.createElement(Icon, {
        type: Types$1.CLOSE,
        className: "sendbird-channel-settings__close-icon",
        height: "22px",
        width: "22px",
        onClick: function onClick() {
          onCloseClick();
        }
      })
    ),
    React__default.createElement(
      "div",
      null,
      React__default.createElement(ChannelProfile, {
        avatar: channel.coverUrl,
        title: channel.name,
        onChannelInfoChange: function onChannelInfoChange(
          currentImg,
          currentTitle
        ) {
          channel.updateChannel(
            currentTitle,
            currentImg,
            channel.data,
            function(response) {
              onChannelModified(response);
              setChannelUpdateId(uuidv4());
            }
          );
        }
      })
    ),
    React__default.createElement(
      "div",
      {
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
      },
      React__default.createElement(Icon, {
        type: Types$1.MEMBERS,
        className: "sendbird-channel-settings__panel-icon-left",
        height: "24px",
        width: "24px"
      }),
      React__default.createElement(
        Label,
        {
          type: Typography.SUBTITLE_1,
          color: Colors.ONBACKGROUND_1
        },
        ""
          .concat(StringSet.CHANNEL_SETTING__MEMBERS__TITLE, " (")
          .concat(channel.members.length, ")")
      ),
      React__default.createElement(Icon, {
        type: Types$1.SHEVRON_RIGHT,
        className: "\n            sendbird-channel-settings__panel-icon-right\n            sendbird-channel-settings__panel-icon--chevron\n            ".concat(
          showAccordion ? "sendbird-channel-settings__panel-icon--open" : "",
          "\n          "
        ),
        height: "24px",
        width: "24px"
      })
    ),
    showAccordion &&
      React__default.createElement(
        MemebersAccordion, // eslint-disable-next-line
        {
          userQueryCreator:
            userListQuery && typeof userListQuery === "function"
              ? userListQuery
              : sdk.createApplicationUserListQuery.bind(sdk),
          userId: userId,
          members: channel.members,
          onInviteMemebers: function onInviteMemebers(selectedMemebers) {
            channel.inviteWithUserIds(selectedMemebers, function(
              response,
              error
            ) {
              if (!error) {
                onChannelModified(response);
                setChannelUpdateId(uuidv4());
              }
            });
          }
        }
      ),
    React__default.createElement(
      "div",
      {
        className: "sendbird-channel-settings__panel-item",
        role: "button",
        tabIndex: 0,
        onKeyDown: function onKeyDown() {
          return setShowLeaveChannelModal(true);
        },
        onClick: function onClick() {
          return setShowLeaveChannelModal(true);
        }
      },
      React__default.createElement(Icon, {
        type: Types$1.LEAVE,
        className:
          "\n            sendbird-channel-settings__panel-icon-left\n            sendbird-channel-settings__panel-icon__leave\n          ",
        height: "24px",
        width: "24px"
      }),
      React__default.createElement(
        Label,
        {
          type: Typography.SUBTITLE_1,
          color: Colors.ONBACKGROUND_1
        },
        StringSet.CHANNEL_SETTING__LEAVE_CHANNEL__TITLE
      )
    ),
    showLeaveChannelModal &&
      React__default.createElement(LeaveChannel, {
        onCloseModal: function onCloseModal() {
          return setShowLeaveChannelModal(false);
        },
        onLeaveChannel: function onLeaveChannel() {
          channel.leave(function(_, error) {
            if (!error) {
              onCloseClick();
            }
          });
        }
      })
  );
}

ChannelSettings.propTypes = {
  onCloseClick: PropTypes.func,
  onChannelModified: PropTypes.func,
  channelUrl: PropTypes.string.isRequired,
  // from withSendbirdContext
  stores: PropTypes.shape({
    sdkStore: {
      sdk: PropTypes.shape({})
    }
  }).isRequired,
  config: PropTypes.shape({
    userId: PropTypes.string
  }).isRequired,
  userListQuery: PropTypes.func.isRequired
};
ChannelSettings.defaultProps = {
  onCloseClick: function onCloseClick() {},
  onChannelModified: function onChannelModified() {}
};
var ChannelSetting = withSendbirdContext(ChannelSettings);

function App(props) {
  var appId = props.appId,
    userId = props.userId,
    accessToken = props.accessToken,
    theme = props.theme,
    userListQuery = props.userListQuery,
    nickname = props.nickname;

  var _useState = React.useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    currentChannelUrl = _useState2[0],
    setCurrentChannelUrl = _useState2[1];

  var _useState3 = React.useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    showSettings = _useState4[0],
    setShowSettings = _useState4[1];

  return React__default.createElement(
    Sendbird,
    {
      appId: appId,
      userId: userId,
      accessToken: accessToken,
      theme: theme,
      nickname: nickname
    },
    React__default.createElement(
      "div",
      {
        className: "sendbird-app__wrap"
      },
      React__default.createElement(
        "div",
        {
          className: "sendbird-app__channellist-wrap"
        },
        React__default.createElement(ChannelList$1, {
          userListQuery: userListQuery,
          onChannelSelect: function onChannelSelect(channel) {
            if (channel && channel.url) {
              setCurrentChannelUrl(channel.url);
            }
          }
        })
      ),
      React__default.createElement(
        "div",
        {
          className: "sendbird-app__conversation-wrap"
        },
        React__default.createElement(Channel, {
          channelUrl: currentChannelUrl,
          onChatHeaderActionClick: function onChatHeaderActionClick() {
            setShowSettings(true);
          }
        })
      )
    ),
    showSettings &&
      React__default.createElement(
        "div",
        {
          className: "sendbird-app__settingspanel-wrap"
        },
        React__default.createElement(ChannelSetting, {
          channelUrl: currentChannelUrl,
          onCloseClick: function onCloseClick() {
            setShowSettings(false);
          }
        })
      ),
    React__default.createElement(ModalRoot, null),
    React__default.createElement(MenuRoot, null)
  );
}
App.propTypes = {
  appId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  accessToken: PropTypes.string,
  theme: PropTypes.string,
  userListQuery: PropTypes.func.isRequired,
  nickname: PropTypes.string
};
App.defaultProps = {
  accessToken: "",
  theme: "light",
  nickname: ""
};

// SendBird disconnect. Invalidates currentUser
// eslint-disable-next-line max-len
var getConnect = function getConnect(store) {
  return function(userId, accessToken) {
    return new Promise(function(resolve, reject) {
      var _store$stores = store.stores,
        stores = _store$stores === void 0 ? {} : _store$stores;
      var _stores$sdkStore = stores.sdkStore,
        sdkStore = _stores$sdkStore === void 0 ? {} : _stores$sdkStore;
      var sdk = sdkStore.sdk;

      if (!sdk) {
        reject(new Error("Sdk not found"));
      }

      if (!accessToken) {
        sdk.connect(userId, function(response, error) {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        });
      } else {
        sdk.connect(userId, accessToken, function(response, error) {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        });
      }
    });
  };
}; // SendBird disconnect. Invalidates currentUser

var getDisconnect = function getDisconnect(store) {
  return function() {
    return new Promise(function(resolve, reject) {
      var _store$stores2 = store.stores,
        stores = _store$stores2 === void 0 ? {} : _store$stores2;
      var _stores$sdkStore2 = stores.sdkStore,
        sdkStore = _stores$sdkStore2 === void 0 ? {} : _stores$sdkStore2;
      var sdk = sdkStore.sdk;

      if (!sdk) {
        reject(new Error("Sdk not found"));
      }

      sdk.disconnect(function(response, error) {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  };
}; // Using the updateCurrentUserInfo() method
// you can update a user's nickname and profile image with a URL
// eslint-disable-next-line max-len

var getUpdateUserInfo = function getUpdateUserInfo(store) {
  return function(nickName, profileUrl) {
    return new Promise(function(resolve, reject) {
      var _store$stores3 = store.stores,
        stores = _store$stores3 === void 0 ? {} : _store$stores3;
      var _stores$sdkStore3 = stores.sdkStore,
        sdkStore = _stores$sdkStore3 === void 0 ? {} : _stores$sdkStore3;
      var sdk = sdkStore.sdk;

      if (!sdk) {
        reject(new Error("Sdk not found"));
      }

      sdk.updateCurrentUserInfo(nickName, profileUrl, function(
        response,
        error
      ) {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  };
};
var sendbirdSelectors = {
  getConnect: getConnect,
  getDisconnect: getDisconnect,
  getUpdateUserInfo: getUpdateUserInfo
};

// helpers
var index = {
  MenuRoot: MenuRoot,
  ModalRoot: ModalRoot,
  SendbirdProvider: Sendbird,
  App: App,
  ChannelList: ChannelList$1,
  Channel: Channel,
  ChannelSetting: ChannelSetting,
  withSendbird: withSendbirdContext,
  sendbirdSelectors: sendbirdSelectors
};

module.exports = index;
//# sourceMappingURL=index.js.map
