'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var LocalizationContext = require('./LocalizationContext-96132df1.js');
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));

/*
  ImageRenderer displays image with url or source
  it checks if the source exist with img tag first
  if it exists onLoad is called, if not onError is called
  and those properties switch img tag to real purposing element
*/

function ImageRenderer(_ref) {
  var className = _ref.className,
      url = _ref.url,
      alt = _ref.alt,
      width = _ref.width,
      height = _ref.height,
      defaultComponent = _ref.defaultComponent,
      circle = _ref.circle;

  var _useState = React.useState(false),
      _useState2 = LocalizationContext._slicedToArray(_useState, 2),
      showDefaultComponent = _useState2[0],
      setShowDefaultComponent = _useState2[1];

  var DefaultComponent = React.useMemo(function () {
    if (typeof defaultComponent === 'function') {
      return defaultComponent();
    }

    return defaultComponent;
  }, [defaultComponent]);
  return React__default.createElement("div", {
    className: [].concat(LocalizationContext._toConsumableArray(Array.isArray(className) ? className : [className]), ['sendbird-image-renderer']).join(' ')
  }, showDefaultComponent ? DefaultComponent : React__default.createElement("div", {
    className: "sendbird-image-renderer__image",
    style: {
      width: width,
      height: height,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundImage: "url(".concat(url, ")"),
      borderRadius: circle ? '50%' : null
    }
  }), React__default.createElement("img", {
    className: "sendbird-image-renderer__hidden-image-loader",
    alt: alt,
    onError: function onError() {
      return setShowDefaultComponent(true);
    },
    src: url
  }));
}
ImageRenderer.propTypes = {
  className: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  url: PropTypes.string.isRequired,
  alt: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  circle: PropTypes.bool
};
ImageRenderer.defaultProps = {
  className: '',
  alt: '',
  width: null,
  height: null,
  defaultComponent: null,
  circle: false
};

var Type = {
  ADD: 'ADD',
  ARROW_LEFT: 'ARROW_LEFT',
  ATTACH: 'ATTACH',
  BAN: 'BAN',
  BROADCAST: 'BROADCAST',
  CAMERA: 'CAMERA',
  CHANNELS: 'CHANNELS',
  CHAT: 'CHAT',
  CHAT_FILLED: 'CHAT_FILLED',
  CHEVRON_DOWN: 'CHEVRON_DOWN',
  CHEVRON_RIGHT: 'CHEVRON_RIGHT',
  CLOSE: 'CLOSE',
  COLLAPSE: 'COLLAPSE',
  COPY: 'COPY',
  CREATE: 'CREATE',
  DELETE: 'DELETE',
  DISCONNECTED: 'DISCONNECTED',
  DOCUMENT: 'DOCUMENT',
  DONE: 'DONE',
  DONE_ALL: 'DONE_ALL',
  DOWNLOAD: 'DOWNLOAD',
  EDIT: 'EDIT',
  EMOJI_MORE: 'EMOJI_MORE',
  ERROR: 'ERROR',
  EXPAND: 'EXPAND',
  FILE_AUDIO: 'FILE_AUDIO',
  FILE_DOCUMENT: 'FILE_DOCUMENT',
  FREEZE: 'FREEZE',
  GIF: 'GIF',
  INFO: 'INFO',
  LEAVE: 'LEAVE',
  MEMBERS: 'MEMBERS',
  MESSAGE: 'MESSAGE',
  MODERATIONS: 'MODERATIONS',
  MORE: 'MORE',
  MUTE: 'MUTE',
  NOTIFICATIONS: 'NOTIFICATIONS',
  NOTIFICATIONS_OFF_FILLED: 'NOTIFICATIONS_OFF_FILLED',
  OPERATOR: 'OPERATOR',
  PHOTO: 'PHOTO',
  PLAY: 'PLAY',
  PLUS: 'PLUS',
  QUESTION: 'QUESTION',
  REFRESH: 'REFRESH',
  REMOVE: 'REMOVE',
  SEARCH: 'SEARCH',
  SEND: 'SEND',
  SETTINGS_FILLED: 'SETTINGS_FILLED',
  SPINNER: 'SPINNER',
  SUPERGROUP: 'SUPERGROUP',
  THUMBNAIL_NONE: 'THUMBNAIL_NONE',
  TOGGLE_OFF: 'TOGGLE_OFF',
  TOGGLE_ON: 'TOGGLE_ON',
  USER: 'USER'
};

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _ref =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-add_svg__fill",
  d: "M50.667 5.333a8 8 0 018 8v37.334a8 8 0 01-8 8H13.333a8 8 0 01-8-8V13.333a8 8 0 018-8zm0 5.334H13.333a2.667 2.667 0 00-2.666 2.666v37.334a2.667 2.667 0 002.666 2.666h37.334a2.667 2.667 0 002.666-2.666V13.333a2.667 2.667 0 00-2.666-2.666zm-18.667 8a2.667 2.667 0 012.649 2.355l.018.311v8h8a2.667 2.667 0 01.311 5.316l-.311.018h-8v8a2.667 2.667 0 01-5.316.311l-.018-.311v-8h-8a2.667 2.667 0 01-.311-5.316l.311-.018h8v-8A2.667 2.667 0 0132 18.667z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconAdd(props) {
  return React__default.createElement("svg", _extends({
    viewBox: "0 0 64 64"
  }, props), _ref);
}

function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }

var _ref$1 =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-arrow-left_svg__fill",
  d: "M33.886 8.781a2.668 2.668 0 01.221 3.52l-.221.251-16.78 16.781H56a2.667 2.667 0 01.311 5.316l-.311.018-38.895-.001 16.78 16.782a2.666 2.666 0 01.222 3.52l-.221.251a2.668 2.668 0 01-3.52.222l-.252-.222L8.781 33.886a2.668 2.668 0 01-.222-3.52l.222-.252L30.114 8.781a2.668 2.668 0 013.772 0z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconArrowLeft(props) {
  return React__default.createElement("svg", _extends$1({
    viewBox: "0 0 64 64"
  }, props), _ref$1);
}

function _extends$2() { _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }

var _ref$2 =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-attach_svg__fill",
  d: "M55.334 28.926l-24.506 23.34c-5.222 4.973-13.74 4.973-18.962 0-5.149-4.903-5.149-12.797 0-17.7l24.506-23.34c3.138-2.988 8.278-2.988 11.416 0 3.064 2.919 3.064 7.594 0 10.513L23.255 45.077c-1.055 1.005-2.815 1.005-3.87.001-.98-.933-.98-2.39 0-3.325l22.64-21.535a2.667 2.667 0 00-3.676-3.864L15.709 37.89a7.578 7.578 0 00-.001 11.05c3.113 2.966 8.11 2.966 11.224 0l24.533-23.338c5.272-5.021 5.272-13.217 0-18.238-5.197-4.95-13.573-4.95-18.77 0L8.187 30.704c-7.356 7.005-7.356 18.419 0 25.424 7.281 6.935 19.036 6.935 26.318 0l24.506-23.34a2.666 2.666 0 10-3.678-3.862z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconAttach(props) {
  return React__default.createElement("svg", _extends$2({
    viewBox: "0 0 64 64"
  }, props), _ref$2);
}

function _extends$3() { _extends$3 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$3.apply(this, arguments); }

var _ref$3 =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-ban_svg__fill",
  d: "M32 2.667C48.2 2.667 61.333 15.8 61.333 32S48.2 61.333 32 61.333 2.667 48.2 2.667 32 15.8 2.667 32 2.667zM32 8C18.745 8 8 18.745 8 32s10.745 24 24 24 24-10.745 24-24S45.255 8 32 8zm12.333 21.333a1 1 0 011 1v3.334a1 1 0 01-1 1H19.667a1 1 0 01-1-1v-3.334a1 1 0 011-1h24.666z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconBan(props) {
  return React__default.createElement("svg", _extends$3({
    viewBox: "0 0 64 64"
  }, props), _ref$3);
}

function _extends$4() { _extends$4 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$4.apply(this, arguments); }

var _ref$4 =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-broadcast_svg__fill",
  d: "M58.545 5.498c.08.258.122.526.122.796v46.079a2.666 2.666 0 01-3.462 2.546l-17.951-5.61c-.645 5.273-5.14 9.358-10.587 9.358C20.776 58.667 16 53.89 16 48v-5.334h-5.333a8 8 0 01-7.997-7.75l-.003-.25V24a8 8 0 018-8H16L55.205 3.749a2.665 2.665 0 013.34 1.75zM21.333 44.587V48a5.333 5.333 0 0010.652.398L32 47.92l-10.667-3.333zm32-34.667l-32 9.997v18.83l32 9.997V9.92zM16 21.333h-5.333a2.67 2.67 0 00-2.65 2.356L8 24v10.667a2.667 2.667 0 002.667 2.666H16v-16z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconBroadcast(props) {
  return React__default.createElement("svg", _extends$4({
    viewBox: "0 0 64 64"
  }, props), _ref$4);
}

function _extends$5() { _extends$5 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$5.apply(this, arguments); }

var _ref$5 =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-camera_svg__fill",
  d: "M40 5.333c.892 0 1.724.446 2.219 1.188l4.541 6.812H56a8 8 0 017.986 7.53l.014.47v29.334a8 8 0 01-8 8H8a8 8 0 01-8-8V21.333a8 8 0 018-8h9.237l4.544-6.812a2.665 2.665 0 011.888-1.167l.331-.02zm-1.43 5.334H25.428l-4.542 6.812a2.66 2.66 0 01-1.887 1.167l-.331.02H8a2.668 2.668 0 00-2.667 2.667v29.334A2.667 2.667 0 008 53.333h48a2.667 2.667 0 002.667-2.666V21.333A2.667 2.667 0 0056 18.667H45.333a2.665 2.665 0 01-2.218-1.188l-4.544-6.812zM32 21.333c7.364 0 13.333 5.97 13.333 13.334C45.333 42.03 39.363 48 32 48c-7.364 0-13.333-5.97-13.333-13.333 0-7.364 5.97-13.334 13.333-13.334zm0 5.334a8 8 0 100 16 8 8 0 000-16z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconCamera(props) {
  return React__default.createElement("svg", _extends$5({
    viewBox: "0 0 64 64"
  }, props), _ref$5);
}

function _extends$6() { _extends$6 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$6.apply(this, arguments); }

var _ref$6 =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-channels_svg__fill",
  d: "M42.65 5.333l.311.017a2.666 2.666 0 012.373 2.633l-.017.311-1.45 13.04h9.466a2.667 2.667 0 01.311 5.315l-.31.018H43.271l-1.184 10.666h11.245a2.667 2.667 0 01.312 5.316l-.31.018H41.495l-1.512 13.627a2.667 2.667 0 01-5.318-.277l.017-.311 1.448-13.04H25.496l-1.512 13.628a2.667 2.667 0 01-5.318-.277l.017-.311 1.448-13.04h-9.464a2.667 2.667 0 01-.311-5.315l.31-.018h10.057l1.186-10.667H10.667a2.667 2.667 0 01-.311-5.315l.31-.018h11.835l1.515-13.627a2.668 2.668 0 012.634-2.373l.311.017a2.666 2.666 0 012.373 2.633l-.017.311-1.45 13.04H38.5l1.515-13.628a2.668 2.668 0 012.634-2.373zm-5.927 32l1.186-10.667H27.272l-1.184 10.667h10.635z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconChannels(props) {
  return React__default.createElement("svg", _extends$6({
    viewBox: "0 0 64 64"
  }, props), _ref$6);
}

function _extends$7() { _extends$7 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$7.apply(this, arguments); }

var _ref$7 =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-chat_svg__fill",
  d: "M32 2.667C48.2 2.667 61.333 15.8 61.333 32S48.2 61.333 32 61.333c-4.455 0-8.679-.993-12.461-2.77l-1.753.58c-5.965 1.912-10.133 2.572-12.504 1.981-2.799-.698-3.351-1.919-1.657-3.663 1.171-1.396 2.147-3.14 2.928-5.234.622-1.668.377-4.001-.737-7A29.15 29.15 0 012.666 32C2.667 15.8 15.8 2.667 32 2.667zM32 8C18.745 8 8 18.745 8 32c0 3.5.747 6.88 2.168 9.978l.405.837.137.271.106.285c1.517 4.085 1.89 7.622.734 10.72l-.382.972-.192.433.235-.05a62.067 62.067 0 004.886-1.363l1.721-.568 2.04-.696 1.95.917A23.882 23.882 0 0032 56c13.255 0 24-10.745 24-24S45.255 8 32 8z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconChat(props) {
  return React__default.createElement("svg", _extends$7({
    viewBox: "0 0 64 64"
  }, props), _ref$7);
}

function _extends$8() { _extends$8 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$8.apply(this, arguments); }

var _ref$8 =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-chat-filled_svg__fill",
  d: "M32 2.667C48.2 2.667 61.333 15.8 61.333 32S48.2 61.333 32 61.333c-4.455 0-8.679-.993-12.461-2.77l-1.753.58c-5.965 1.912-10.133 2.572-12.504 1.981-2.799-.698-3.351-1.919-1.657-3.663 1.171-1.396 2.147-3.14 2.928-5.234.622-1.668.377-4.001-.737-7A29.15 29.15 0 012.666 32C2.667 15.8 15.8 2.667 32 2.667z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconChatFilled(props) {
  return React__default.createElement("svg", _extends$8({
    viewBox: "0 0 64 64"
  }, props), _ref$8);
}

function _extends$9() { _extends$9 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$9.apply(this, arguments); }

var _ref$9 =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-chevron-down_svg__fill",
  d: "M16.121 21.879a2.998 2.998 0 00-4.242 0 2.998 2.998 0 000 4.242l18 18a2.998 2.998 0 004.242 0l18-18a2.998 2.998 0 000-4.242 2.998 2.998 0 00-4.242 0L32 37.757 16.121 21.88z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconChevronDown(props) {
  return React__default.createElement("svg", _extends$9({
    viewBox: "0 0 64 64"
  }, props), _ref$9);
}

function _extends$a() { _extends$a = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$a.apply(this, arguments); }

var _ref$a =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-chevron-right_svg__fill",
  d: "M22.114 46.114a2.668 2.668 0 003.772 3.772l16-16a2.668 2.668 0 000-3.772l-16-16a2.668 2.668 0 00-3.772 3.772L36.23 32 22.114 46.114z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconChevronRight(props) {
  return React__default.createElement("svg", _extends$a({
    viewBox: "0 0 64 64"
  }, props), _ref$a);
}

function _extends$b() { _extends$b = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$b.apply(this, arguments); }

var _ref$b =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-close_svg__fill",
  d: "M52.552 11.448a2.666 2.666 0 01.222 3.52l-.222.251-16.781 16.78 16.781 16.782a2.665 2.665 0 010 3.771 2.666 2.666 0 01-3.52.222l-.251-.222L32 35.771 15.219 52.552a2.665 2.665 0 01-3.771 0 2.666 2.666 0 01-.222-3.52l.222-.251L28.228 32l-16.78-16.781a2.665 2.665 0 010-3.771 2.666 2.666 0 013.52-.222l.251.222 16.78 16.78 16.782-16.78a2.665 2.665 0 013.771 0z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconClose(props) {
  return React__default.createElement("svg", _extends$b({
    viewBox: "0 0 64 64"
  }, props), _ref$b);
}

function _extends$c() { _extends$c = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$c.apply(this, arguments); }

var _ref$c =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-collapse_svg__fill",
  d: "M16 8a2.667 2.667 0 00-2.649 2.356l-.018.31v42.667a2.667 2.667 0 005.316.311l.018-.31V34.666h25.56l-6.113 6.114a2.668 2.668 0 00-.221 3.52l.221.251a2.666 2.666 0 003.52.222l.252-.222 10.666-10.666a2.666 2.666 0 00.222-3.52l-.222-.252-10.666-10.666a2.666 2.666 0 00-3.993 3.52l.221.251 6.113 6.114h-25.56V10.667A2.667 2.667 0 0016 8z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconCollapse(props) {
  return React__default.createElement("svg", _extends$c({
    viewBox: "0 0 64 64"
  }, props), _ref$c);
}

function _extends$d() { _extends$d = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$d.apply(this, arguments); }

var _ref$d =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-copy_svg__fill",
  d: "M53.333 21.333a8 8 0 018 8v24a8 8 0 01-8 8h-24a8 8 0 01-8-8v-24a8 8 0 018-8zm0 5.334h-24a2.667 2.667 0 00-2.666 2.666v24A2.667 2.667 0 0029.333 56h24A2.667 2.667 0 0056 53.333v-24a2.667 2.667 0 00-2.667-2.666zm-18.666-24a8 8 0 017.986 7.53l.014.47v2.666a2.667 2.667 0 01-5.316.311l-.018-.31v-2.667a2.67 2.67 0 00-2.355-2.65L34.667 8h-24a2.67 2.67 0 00-2.65 2.356l-.017.31v24a2.67 2.67 0 002.356 2.65l.31.017h2.667a2.667 2.667 0 01.311 5.316l-.31.018h-2.667a8.001 8.001 0 01-7.987-7.53l-.013-.47v-24c0-4.26 3.33-7.743 7.53-7.987l.47-.013h24z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconCopy(props) {
  return React__default.createElement("svg", _extends$d({
    viewBox: "0 0 64 64"
  }, props), _ref$d);
}

function _extends$e() { _extends$e = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$e.apply(this, arguments); }

var _ref$e =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-create_svg__fill",
  d: "M32 2.667C48.2 2.667 61.333 15.8 61.333 32S48.2 61.333 32 61.333c-4.455 0-8.679-.993-12.461-2.77l-1.753.58c-5.965 1.912-10.133 2.572-12.504 1.981-2.799-.698-3.351-1.919-1.657-3.663 1.171-1.396 2.147-3.14 2.928-5.234.622-1.668.377-4.001-.737-7A29.15 29.15 0 012.666 32C2.667 15.8 15.8 2.667 32 2.667zM32 8C18.745 8 8 18.745 8 32c0 3.5.747 6.88 2.168 9.978l.405.837.137.271.106.285c1.517 4.085 1.89 7.622.734 10.72l-.382.972-.192.433.235-.05a62.067 62.067 0 004.886-1.363l1.721-.568 2.04-.696 1.95.917A23.882 23.882 0 0032 56c13.255 0 24-10.745 24-24S45.255 8 32 8zm2.667 16v5.333H40c3.556 0 3.556 5.334 0 5.334h-5.333V40c0 3.556-5.334 3.556-5.334 0v-5.333H24c-3.556 0-3.556-5.334 0-5.334h5.333V24c0-3.556 5.334-3.556 5.334 0z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconCreate(props) {
  return React__default.createElement("svg", _extends$e({
    viewBox: "0 0 64 64"
  }, props), _ref$e);
}

function _extends$f() { _extends$f = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$f.apply(this, arguments); }

var _ref$f =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-delete_svg__fill",
  d: "M37.333 2.667c4.26 0 7.743 3.33 7.987 7.53l.013.47v2.666H56a2.667 2.667 0 01.311 5.316l-.311.018h-2.668l.001 34.666c0 4.26-3.33 7.743-7.53 7.987l-.47.013H18.667a8.001 8.001 0 01-7.987-7.53l-.013-.47V18.667H8a2.667 2.667 0 01-.311-5.316L8 13.333h10.666v-2.666a8.002 8.002 0 017.53-7.987l.47-.013h10.667zm10.666 16H16v34.666a2.67 2.67 0 002.356 2.65l.31.017h26.667a2.67 2.67 0 002.65-2.356l.017-.31V18.666zm-21.332 8a2.667 2.667 0 012.648 2.355l.018.311v16a2.667 2.667 0 01-5.316.311l-.017-.31v-16a2.667 2.667 0 012.667-2.667zm10.666 0a2.67 2.67 0 012.65 2.355l.017.311v16a2.667 2.667 0 01-5.315.311l-.018-.31v-16a2.667 2.667 0 012.666-2.667zm0-18.667H26.667a2.67 2.67 0 00-2.65 2.356l-.017.31v2.667h16v-2.666a2.67 2.67 0 00-2.356-2.65L37.334 8z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconDelete(props) {
  return React__default.createElement("svg", _extends$f({
    viewBox: "0 0 64 64"
  }, props), _ref$f);
}

function _extends$g() { _extends$g = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$g.apply(this, arguments); }

var _ref$g =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-disconnected_svg__fill",
  d: "M54.534 6.069l-.248.217-9.736 9.735-.04.04-9.573 9.573c-.15.118-.286.254-.405.404L6.286 54.286a2.423 2.423 0 003.18 3.645l.248-.217 13.374-13.373a2.419 2.419 0 001.88-.401 12.119 12.119 0 0114.04 0 2.424 2.424 0 102.808-3.952 16.951 16.951 0 00-11.303-3.072l6.743-6.744a24.105 24.105 0 0110.159 5.021 2.424 2.424 0 003.11-3.719 28.945 28.945 0 00-9.34-5.23l5.633-5.634a36.153 36.153 0 019.225 5.934 2.425 2.425 0 003.211-3.633 40.972 40.972 0 00-8.796-5.941l7.256-7.256a2.423 2.423 0 00-3.18-3.645zm-35.04 21.474a28.936 28.936 0 00-6.032 3.942 2.424 2.424 0 003.137 3.697 24.018 24.018 0 015.022-3.282 2.425 2.425 0 00-2.127-4.357zM4.748 22.909a2.424 2.424 0 003.207 3.636 36.363 36.363 0 0126.978-8.977 2.424 2.424 0 00.389-4.832A41.204 41.204 0 004.748 22.909z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconDisconnected(props) {
  return React__default.createElement("svg", _extends$g({
    viewBox: "0 0 64 64"
  }, props), _ref$g);
}

function _extends$h() { _extends$h = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$h.apply(this, arguments); }

var _ref$h =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-document_svg__fill",
  d: "M37.333 2.667a3.305 3.305 0 01.274.014l.085.01.058.008c.047.007.094.016.141.026l.029.007c.05.01.098.023.146.037l.034.01c.237.07.46.173.663.303l.034.022c.036.023.07.047.104.072l.057.043a2.646 2.646 0 01.261.228l-.126-.117c.05.043.097.088.143.135L55.21 19.438c.047.046.091.094.134.143l.035.04c.026.032.052.063.076.096l.04.054.07.1.024.038c.16.253.279.535.347.836l.01.048c.009.043.017.086.024.13l.006.048.007.051.004.041c.01.09.014.18.014.27v32a8 8 0 01-8 8H16a8 8 0 01-8-8V10.667a8 8 0 018-8h21.333zM34.666 8H16a2.667 2.667 0 00-2.667 2.667v42.666A2.667 2.667 0 0016 56h32a2.667 2.667 0 002.667-2.667L50.666 24H37.333a2.667 2.667 0 01-2.648-2.356l-.018-.31L34.666 8zm12.227 10.667l-6.894-6.894.001 6.894h6.893z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconDocument(props) {
  return React__default.createElement("svg", _extends$h({
    viewBox: "0 0 64 64"
  }, props), _ref$h);
}

function _extends$i() { _extends$i = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$i.apply(this, arguments); }

var _ref$i =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-done_svg__fill",
  d: "M12.552 31.448a2.665 2.665 0 10-3.771 3.771l13.333 13.333a2.666 2.666 0 003.772 0L55.219 19.22a2.667 2.667 0 00-3.771-3.771L24 42.895 12.552 31.448z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconDone(props) {
  return React__default.createElement("svg", _extends$i({
    viewBox: "0 0 64 64"
  }, props), _ref$i);
}

function _extends$j() { _extends$j = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$j.apply(this, arguments); }

var _ref$j =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-done-all_svg__fill",
  d: "M5.886 31.448L19.219 44.78a2.667 2.667 0 01-3.771 3.771L2.114 35.22a2.667 2.667 0 013.772-3.771zm52.228-16a2.666 2.666 0 113.772 3.771L32.552 48.552a2.665 2.665 0 01-3.771 0L15.448 35.22a2.665 2.665 0 010-3.771 2.665 2.665 0 013.771 0l11.448 11.447zm-9.562 0a2.665 2.665 0 010 3.771L32.556 35.215a2.665 2.665 0 01-3.771 0 2.664 2.664 0 010-3.77L44.78 15.447a2.665 2.665 0 013.771 0z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconDoneAll(props) {
  return React__default.createElement("svg", _extends$j({
    viewBox: "0 0 64 64"
  }, props), _ref$j);
}

function _extends$k() { _extends$k = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$k.apply(this, arguments); }

var _ref$k =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-download_svg__fill",
  d: "M56 42.667a2.667 2.667 0 012.649 2.355l.018.311v8c0 4.26-3.33 7.743-7.53 7.987l-.47.013H13.333a8 8 0 01-7.986-7.53l-.014-.47v-8a2.667 2.667 0 015.316-.311l.018.311v8a2.67 2.67 0 002.355 2.65l.311.017h37.334a2.667 2.667 0 002.648-2.356l.018-.31v-8A2.667 2.667 0 0156 42.667zm-36.552-8.781a2.666 2.666 0 013.52-3.993l.251.221 6.114 6.114V5.333a2.667 2.667 0 015.316-.311l.018.311v30.894l6.114-6.113a2.668 2.668 0 013.52-.221l.251.221a2.666 2.666 0 01.222 3.52l-.222.252-10.658 10.657a2.341 2.341 0 01-.135.128l.127-.119a2.67 2.67 0 01-.195.176l-.056.045a1.74 1.74 0 01-.086.064l-.056.04-.086.056-.06.036-.081.046-.079.04a2.528 2.528 0 01-.14.065l-.09.036c-.023.01-.045.017-.067.025l-.09.03-.063.019c-.043.012-.086.024-.13.034l-.013.003a3.06 3.06 0 01-.144.028l-.064.01c-.03.005-.061.009-.092.012l-.084.008a1.727 1.727 0 01-.103.006l-.069.002h-.095c-.028 0-.055-.002-.082-.003l.139.003c-.084 0-.167-.004-.249-.011l-.061-.007a1.359 1.359 0 01-.092-.012l-.09-.015a2.242 2.242 0 01-.118-.025l-.04-.01a2.644 2.644 0 01-.34-.11l-.015-.006c-.05-.02-.097-.04-.145-.063l-.042-.02L30.71 45a1.16 1.16 0 01-.067-.039c-.03-.018-.059-.035-.087-.054l-.062-.041c-.03-.02-.06-.042-.088-.063l-.04-.03-.008-.007a2.796 2.796 0 01-.251-.223L19.448 33.886z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconDownload(props) {
  return React__default.createElement("svg", _extends$k({
    viewBox: "0 0 64 64"
  }, props), _ref$k);
}

function _extends$l() { _extends$l = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$l.apply(this, arguments); }

var _ref$l =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-edit_svg__fill",
  d: "M56 56a2.667 2.667 0 01.311 5.315l-.311.018H8a2.667 2.667 0 01-.311-5.316L8 56h48zM35.448 3.448a2.665 2.665 0 013.771 0l10.667 10.666a2.668 2.668 0 010 3.772L20.552 47.219c-.5.5-1.178.781-1.885.781H8a2.667 2.667 0 01-2.667-2.667V34.667c0-.708.281-1.386.781-1.886zm1.885 5.659L10.667 35.77v6.896h6.89L44.227 16l-6.894-6.893z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconEdit(props) {
  return React__default.createElement("svg", _extends$l({
    viewBox: "0 0 65 65"
  }, props), _ref$l);
}

function _extends$m() { _extends$m = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$m.apply(this, arguments); }

var _ref$m =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-emoji-more_svg__fill",
  d: "M32.097 3.22c2.65 0 5.255.357 7.763 1.054a2.134 2.134 0 01-1.144 4.111 24.669 24.669 0 00-6.619-.899c-13.603 0-24.63 11.027-24.63 24.63s11.027 24.63 24.63 24.63 24.63-11.027 24.63-24.63c0-2.227-.295-4.413-.87-6.518a2.13 2.13 0 011.494-2.62 2.13 2.13 0 012.62 1.494 28.895 28.895 0 011.023 7.644c0 15.96-12.938 28.897-28.897 28.897-15.96 0-28.897-12.937-28.897-28.897C3.2 16.157 16.138 3.22 32.097 3.22zm10.705 34.792a2.133 2.133 0 012.024 2.808c-1.873 5.623-6.937 9.488-12.729 9.488-5.792 0-10.856-3.865-12.73-9.488a2.134 2.134 0 011.875-2.803l.15-.005h21.41zm-3.477 4.266H24.867l.294.382c1.539 1.887 3.718 3.113 6.115 3.342l.314.024.507.015c2.617 0 5.037-1.188 6.743-3.151l.193-.23.292-.382zM21.392 21.954c1.087 0 1.985.814 2.116 1.866l.017.267v5.353a2.133 2.133 0 01-4.25.268l-.017-.268v-5.353c0-1.178.955-2.133 2.134-2.133zm21.41 0c1.088 0 1.985.814 2.117 1.866l.017.267v5.353a2.133 2.133 0 01-4.25.268l-.017-.268v-5.353c0-1.178.955-2.133 2.133-2.133zM54.853 0a.8.8 0 01.8.8v7.786h7.76a.8.8 0 01.8.8v2.667a.8.8 0 01-.8.8h-7.76v7.758a.8.8 0 01-.8.8h-2.666a.8.8 0 01-.8-.8v-7.758h-7.785a.8.8 0 01-.8-.8V9.387a.8.8 0 01.8-.8l7.784-.001V.8a.8.8 0 01.8-.8h2.667z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconEmojiMore(props) {
  return React__default.createElement("svg", _extends$m({
    viewBox: "0 0 64 64"
  }, props), _ref$m);
}

function _extends$n() { _extends$n = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$n.apply(this, arguments); }

var _ref$n =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-error_svg__fill",
  d: "M32 5.06a8 8 0 016.561 3.424l.287.439 22.608 37.744a8 8 0 01.022 7.962 8.005 8.005 0 01-6.356 4.014l-.535.024H9.384a8.002 8.002 0 01-6.862-4.038 8.008 8.008 0 01-.226-7.493l.27-.506L25.16 8.91A8.001 8.001 0 0132 5.06zm0 5.333c-.816 0-1.58.372-2.076.99l-.196.28-22.565 37.67a2.669 2.669 0 001.909 3.973l.341.027h45.144a2.67 2.67 0 002.45-3.659l-.148-.304L34.28 11.676A2.666 2.666 0 0032 10.393zm0 32.274A2.667 2.667 0 1132 48a2.667 2.667 0 010-5.333zm0-21.334a2.667 2.667 0 012.649 2.356l.018.311v10.667a2.667 2.667 0 01-5.316.311l-.018-.311V24A2.667 2.667 0 0132 21.333z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconError(props) {
  return React__default.createElement("svg", _extends$n({
    viewBox: "0 0 64 64"
  }, props), _ref$n);
}

function _extends$o() { _extends$o = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$o.apply(this, arguments); }

var _ref$o =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-expand_svg__fill",
  d: "M48 8a2.667 2.667 0 012.649 2.356l.018.31V32l-.001.027v21.306a2.667 2.667 0 01-5.315.311l-.018-.31V34.665H19.772l6.114 6.115a2.668 2.668 0 01.221 3.52l-.221.251a2.666 2.666 0 01-3.52.222l-.252-.222-10.666-10.666a2.666 2.666 0 01-.222-3.52l.222-.252 10.666-10.666a2.666 2.666 0 013.993 3.52l-.221.251-6.113 6.114h25.56V10.667A2.667 2.667 0 0148 8z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconExpand(props) {
  return React__default.createElement("svg", _extends$o({
    viewBox: "0 0 64 64"
  }, props), _ref$o);
}

function _extends$p() { _extends$p = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$p.apply(this, arguments); }

var _ref$p =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-file-audio_svg__fill",
  d: "M30.52 12.51c1.685-1.226 4.139-.103 4.139 1.893v35.194c0 1.996-2.454 3.119-4.138 1.893l-12.45-9.909H7.898c-1.416 0-2.564-1.074-2.564-2.399V24.818c0-1.325 1.148-2.4 2.564-2.4h10.175zm20.427.163c10.293 10.667 10.293 27.987 0 38.654a2.137 2.137 0 01-3.156-.047c-.86-.942-.84-2.448.044-3.364 8.49-8.799 8.49-23.033 0-31.832-.884-.916-.904-2.422-.044-3.364a2.137 2.137 0 013.156-.047zm-8.492 8.799c5.597 5.8 5.597 15.231 0 21.031a2.136 2.136 0 01-3.156-.046c-.86-.942-.84-2.448.044-3.364 3.794-3.932 3.794-10.279 0-14.211-.884-.916-.904-2.422-.044-3.363a2.136 2.136 0 013.156-.047z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconFileAudio(props) {
  return React__default.createElement("svg", _extends$p({
    viewBox: "0 0 64 64"
  }, props), _ref$p);
}

function _extends$q() { _extends$q = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$q.apply(this, arguments); }

var _ref$q =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-file-document_svg__fill",
  d: "M39.414 6.4a2.41 2.41 0 011.71.701l12.642 12.75c.407.41.634.953.634 1.516v29.765c0 3.542-4.342 6.468-8 6.468H16.16c-3.658 0-6.4-2.926-6.4-6.468L9.6 12.868c0-3.542 2.902-6.468 6.56-6.468zm3.331 35.173l-21.49.027-.147.005c-1.066.08-1.908 1.014-1.908 2.155 0 1.193.92 2.16 2.055 2.16l21.49-.027.147-.005c1.066-.08 1.908-1.014 1.908-2.155 0-1.193-.92-2.16-2.055-2.16zm0-8.533l-21.49.027-.147.005c-1.066.08-1.908 1.014-1.908 2.155 0 1.193.92 2.16 2.055 2.16l21.49-.027.147-.005c1.066-.08 1.908-1.014 1.908-2.155 0-1.193-.92-2.16-2.055-2.16zm-11.807-8.507h-9.6l-.153.006a2.15 2.15 0 00-1.985 2.154c0 1.193.957 2.16 2.138 2.16h9.6l.152-.005a2.152 2.152 0 001.985-2.155c0-1.193-.957-2.16-2.137-2.16z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconFileDocument(props) {
  return React__default.createElement("svg", _extends$q({
    viewBox: "0 0 64 64"
  }, props), _ref$q);
}

function _extends$r() { _extends$r = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$r.apply(this, arguments); }

var _ref$r =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-freeze_svg__fill",
  d: "M41.636 3.226l.251.222a2.668 2.668 0 01.222 3.52l-.222.251-7.219 7.218V27.38l11.209-6.472 2.643-9.86a2.667 2.667 0 015.218 1.051l-.067.329-2.237 8.35 8.352 2.24a2.668 2.668 0 011.952 2.938l-.067.328a2.667 2.667 0 01-2.937 1.952l-.329-.066-9.861-2.643L37.334 32l11.209 6.47 9.862-2.64.329-.067a2.667 2.667 0 012.937 1.952l.067.328a2.669 2.669 0 01-1.952 2.938l-8.353 2.237 2.238 8.353.067.329a2.666 2.666 0 01-5.218 1.052l-2.643-9.861-11.209-6.472v12.944l7.219 7.218a2.667 2.667 0 01-3.52 3.993l-.251-.222L32 54.437l-6.114 6.115a2.666 2.666 0 01-3.52.222l-.251-.222a2.666 2.666 0 01-.222-3.52l.222-.251 7.218-7.22V36.62l-11.209 6.47-2.642 9.863a2.666 2.666 0 01-5.218-1.052l.067-.329 2.236-8.351-8.35-2.24a2.665 2.665 0 01-1.953-2.937l.067-.328a2.665 2.665 0 012.937-1.952l.329.066 9.861 2.642L26.667 32l-11.209-6.472-9.86 2.643-.329.066a2.665 2.665 0 01-2.937-1.952l-.067-.328a2.668 2.668 0 011.952-2.938l8.35-2.239-2.235-8.351-.067-.329a2.667 2.667 0 015.218-1.052l2.642 9.862 11.209 6.47V14.439L22.116 7.22a2.665 2.665 0 010-3.771 2.666 2.666 0 013.52-.222l.251.222 6.114 6.112 6.115-6.112a2.666 2.666 0 013.52-.222z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconFreeze(props) {
  return React__default.createElement("svg", _extends$r({
    viewBox: "0 0 64 64"
  }, props), _ref$r);
}

function _extends$s() { _extends$s = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$s.apply(this, arguments); }

var _ref$s =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-gif_svg__fill",
  d: "M16.664 45.333c2.155 0 4.119-.318 5.89-.953 1.772-.636 3.143-1.53 4.113-2.683V31.34h-10.29v3.94h4.902v4.474c-.861.856-2.304 1.283-4.327 1.283-2.011 0-3.538-.695-4.58-2.085-1.04-1.39-1.562-3.446-1.562-6.168v-1.657c.012-2.698.497-4.73 1.455-6.097.958-1.366 2.352-2.05 4.184-2.05 1.437 0 2.565.345 3.385 1.034.82.69 1.35 1.777 1.59 3.262h5.243c-.324-2.804-1.36-4.94-3.107-6.408-1.748-1.468-4.172-2.201-7.273-2.201-2.226 0-4.169.502-5.827 1.506-1.658 1.004-2.927 2.454-3.807 4.35-.88 1.895-1.32 4.138-1.32 6.728v1.765c.024 2.52.5 4.712 1.428 6.578.928 1.865 2.245 3.288 3.95 4.269 1.707.98 3.69 1.47 5.953 1.47zm20.67 0V18.667H32v26.666h5.333zm10.396 0V34.436h9.721v-4.432H47.73v-6.887h10.937v-4.45h-16v26.666h5.063z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconGif(props) {
  return React__default.createElement("svg", _extends$s({
    viewBox: "0 0 64 64"
  }, props), _ref$s);
}

function _extends$t() { _extends$t = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$t.apply(this, arguments); }

var _ref$t =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-info_svg__fill",
  d: "M32 2.667C48.2 2.667 61.333 15.8 61.333 32S48.2 61.333 32 61.333 2.667 48.2 2.667 32 15.8 2.667 32 2.667zM32 8C18.745 8 8 18.745 8 32s10.745 24 24 24 24-10.745 24-24S45.255 8 32 8zm1.667 21.333a1 1 0 011 1v14a1 1 0 01-1 1h-3.334a1 1 0 01-1-1v-14a1 1 0 011-1h3.334zm-1.667-8a2.667 2.667 0 110 5.334 2.667 2.667 0 010-5.334z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconInfo(props) {
  return React__default.createElement("svg", _extends$t({
    viewBox: "0 0 64 64"
  }, props), _ref$t);
}

function _extends$u() { _extends$u = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$u.apply(this, arguments); }

var _ref$u =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-leave_svg__fill",
  d: "M32 5.333a2.667 2.667 0 01.311 5.316l-.311.018H10.667a2.67 2.67 0 00-2.65 2.355L8 13.333v37.334a2.667 2.667 0 002.356 2.648l.31.018H32a2.667 2.667 0 01.311 5.316l-.311.018H10.667a8.001 8.001 0 01-7.987-7.53l-.013-.47V13.333a8 8 0 017.53-7.986l.47-.014H32zm17.634 13.893l.252.222 10.666 10.666a2.666 2.666 0 01.222 3.52l-.222.252-10.666 10.666a2.666 2.666 0 01-3.993-3.52l.221-.251 4.78-4.782L20 36a2.667 2.667 0 01-.311-5.315l.311-.018h33.56l-7.446-7.448a2.668 2.668 0 01-.221-3.52l.221-.251a2.666 2.666 0 013.52-.222z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconLeave(props) {
  return React__default.createElement("svg", _extends$u({
    viewBox: "0 0 64 64"
  }, props), _ref$u);
}

function _extends$v() { _extends$v = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$v.apply(this, arguments); }

var _ref$v =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-members_svg__fill",
  d: "M34.667 37.333c7.17 0 13.018 5.66 13.32 12.755l.013.579V56a2.667 2.667 0 01-5.315.311L42.667 56v-5.333c0-4.26-3.33-7.743-7.53-7.987l-.47-.013H13.333a8 8 0 00-7.986 7.53l-.014.47V56a2.667 2.667 0 01-5.316.311L0 56v-5.333c0-7.17 5.66-13.019 12.755-13.321l.578-.013h21.334zM54 37.765a13.333 13.333 0 019.986 12.297l.014.605V56a2.667 2.667 0 01-5.315.311L58.667 56v-5.331a8 8 0 00-6-7.74A2.667 2.667 0 1154 37.765zM24 5.333c7.364 0 13.333 5.97 13.333 13.334C37.333 26.03 31.363 32 24 32c-7.364 0-13.333-5.97-13.333-13.333 0-7.364 5.97-13.334 13.333-13.334zm19.328.43a13.333 13.333 0 010 25.834 2.667 2.667 0 11-1.323-5.167 8 8 0 000-15.5 2.667 2.667 0 111.323-5.167zM24 10.667a8 8 0 100 16 8 8 0 000-16z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconMembers(props) {
  return React__default.createElement("svg", _extends$v({
    viewBox: "0 0 64 64"
  }, props), _ref$v);
}

function _extends$w() { _extends$w = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$w.apply(this, arguments); }

var _ref$w =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-message_svg__fill",
  d: "M32 2.667C48.2 2.667 61.333 15.8 61.333 32S48.2 61.333 32 61.333c-4.455 0-8.679-.993-12.461-2.77l-1.753.58c-5.965 1.912-10.133 2.572-12.504 1.981-2.799-.698-3.351-1.919-1.657-3.663 1.171-1.396 2.147-3.14 2.928-5.234.622-1.668.377-4.001-.737-7A29.15 29.15 0 012.666 32C2.667 15.8 15.8 2.667 32 2.667zM32 8C18.745 8 8 18.745 8 32c0 3.5.747 6.88 2.168 9.978l.405.837.137.271.106.285c1.517 4.085 1.89 7.622.734 10.72l-.382.972-.192.433.235-.05a62.067 62.067 0 004.886-1.363l1.721-.568 2.04-.696 1.95.917A23.882 23.882 0 0032 56c13.255 0 24-10.745 24-24S45.255 8 32 8zM18.667 29.333a2.667 2.667 0 11-.001 5.333 2.667 2.667 0 01.001-5.333zm13.333 0a2.667 2.667 0 110 5.334 2.667 2.667 0 010-5.334zm13.333 0a2.667 2.667 0 110 5.334 2.667 2.667 0 010-5.334z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconMessage(props) {
  return React__default.createElement("svg", _extends$w({
    viewBox: "0 0 64 64"
  }, props), _ref$w);
}

function _extends$x() { _extends$x = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$x.apply(this, arguments); }

var _ref$x =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-moderations_svg__fill",
  d: "M18.667 34.667a2.667 2.667 0 01.311 5.316l-.311.017h-5.334v16a2.667 2.667 0 01-5.316.311L8 56V40H2.667a2.667 2.667 0 01-.311-5.315l.31-.018h16zM32 29.333a2.667 2.667 0 012.649 2.356l.018.311v24a2.667 2.667 0 01-5.316.311L29.333 56V32A2.667 2.667 0 0132 29.333zM61.333 40a2.667 2.667 0 01.311 5.315l-.31.018h-5.335L56 56a2.667 2.667 0 01-5.315.311L50.667 56l-.001-10.668-5.333.001a2.667 2.667 0 01-.311-5.316l.311-.017h16zm-8-34.667a2.67 2.67 0 012.65 2.356L56 8v24a2.667 2.667 0 01-5.315.311L50.667 32V8a2.667 2.667 0 012.666-2.667zm-42.666 0a2.667 2.667 0 012.648 2.356l.018.311v18.667a2.667 2.667 0 01-5.316.311L8 26.667V8a2.667 2.667 0 012.667-2.667zm21.333 0a2.667 2.667 0 012.649 2.356l.018.311-.001 10.666H40a2.668 2.668 0 01.311 5.317L40 24H24a2.667 2.667 0 01-.311-5.315l.311-.018h5.333V8A2.667 2.667 0 0132 5.333z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconModerations(props) {
  return React__default.createElement("svg", _extends$x({
    viewBox: "0 0 64 64"
  }, props), _ref$x);
}

function _extends$y() { _extends$y = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$y.apply(this, arguments); }

var _ref$y =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-more_svg__fill",
  d: "M32 45.333a5.333 5.333 0 110 10.666 5.333 5.333 0 010-10.666zM32 28a5.333 5.333 0 110 10.668A5.333 5.333 0 0132 28zm0-17.333c2.946 0 5.333 2.387 5.333 5.333S34.946 21.333 32 21.333 26.667 18.946 26.667 16s2.387-5.333 5.333-5.333z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconMore(props) {
  return React__default.createElement("svg", _extends$y({
    viewBox: "0 0 64 64"
  }, props), _ref$y);
}

function _extends$z() { _extends$z = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$z.apply(this, arguments); }

var _ref$z =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-mute_svg__fill",
  d: "M55.62 19.616l.067.123A26.552 26.552 0 0158.667 32c0 4.326-1.03 8.41-2.864 12.025-1.012 2.726-1.235 4.847-.67 6.363.71 1.903 1.598 3.49 2.662 4.758 1.54 1.586 1.039 2.696-1.506 3.33-2.09.521-5.716-.027-10.879-1.646l-.488-.155-1.594-.527A26.56 26.56 0 0132 58.667a26.55 26.55 0 01-12.326-3.014l-.059-.03 4-4A21.24 21.24 0 0032 53.333c2.993 0 5.89-.614 8.562-1.786l.498-.226 1.925-.905 3.613 1.196.695.219c.728.225 1.414.423 2.054.595l.472.125.485.121-.167-.42-.2-.594c-.814-2.685-.484-5.681.713-9.065l.154-.425.106-.284.528-1.084a21.188 21.188 0 001.895-8.8 21.24 21.24 0 00-1.71-8.385l3.997-3.999zm2.266-13.502a2.668 2.668 0 01.221 3.52l-.221.252-48 48a2.668 2.668 0 01-3.993-3.52l.221-.252 5.238-5.237a26.563 26.563 0 01-6.015-16.412L5.333 32C5.333 17.272 17.273 5.333 32 5.333a26.55 26.55 0 0116.877 6.02l5.237-5.239a2.668 2.668 0 013.772 0zM32 10.667c-11.782 0-21.333 9.55-21.333 21.333 0 4.836 1.614 9.401 4.48 13.084l29.936-29.938A21.248 21.248 0 0032 10.666z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconMute(props) {
  return React__default.createElement("svg", _extends$z({
    viewBox: "0 0 64 64"
  }, props), _ref$z);
}

function _extends$A() { _extends$A = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$A.apply(this, arguments); }

var _ref$A =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-notifications_svg__fill",
  d: "M36.613 53.333c2.056 0 3.338 2.227 2.307 4.005a8 8 0 01-13.84 0c-.98-1.689.129-3.783 2.004-3.988l.303-.017h9.226zM32 2.667c11.56 0 20.972 9.194 21.323 20.669l.01.664v13.333a5.334 5.334 0 004.936 5.319l.753.033c2.963.318 3.077 4.616.342 5.24l-.342.056-.355.019H5.333l-.355-.019c-3.082-.33-3.082-4.965 0-5.296l.753-.033a5.335 5.335 0 004.92-4.9l.016-.419V24c0-11.782 9.55-21.333 21.333-21.333zM32 8c-8.636 0-15.674 6.842-15.989 15.4L16 24v13.333c0 1.562-.336 3.046-.939 4.383l-.275.564-.218.387h34.861l-.215-.387a10.583 10.583 0 01-1.146-3.74l-.055-.674-.013-.533V24c0-8.837-7.163-16-16-16z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconNotifications(props) {
  return React__default.createElement("svg", _extends$A({
    viewBox: "0 0 64 64"
  }, props), _ref$A);
}

function _extends$B() { _extends$B = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$B.apply(this, arguments); }

var _ref$B =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-notifications-off-filled_svg__fill",
  d: "M36.613 53.333c2.056 0 3.338 2.227 2.307 4.005a8 8 0 01-13.84 0c-.98-1.689.129-3.783 2.004-3.988l.303-.017h9.226zM32 2.667c7.173 0 13.52 3.54 17.387 8.97l5.686-5.687a2.105 2.105 0 012.85-.117l.127.117a2.105 2.105 0 010 2.977L8.927 58.05c-.78.781-2.023.82-2.85.117l-.127-.117a2.105 2.105 0 010-2.977L13.023 48h-7.69l-.355-.019c-3.082-.33-3.082-4.965 0-5.296l.753-.033a5.335 5.335 0 004.92-4.9l.016-.419V24c0-11.782 9.55-21.333 21.333-21.333zm20.85 16.795c.271 1.253.433 2.548.473 3.874l.01.664v13.333a5.334 5.334 0 004.936 5.319l.753.033c2.963.318 3.077 4.616.342 5.24l-.342.056-.355.019H24.31l28.54-28.538z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconNotificationsOffFilled(props) {
  return React__default.createElement("svg", _extends$B({
    viewBox: "0 0 64 64"
  }, props), _ref$B);
}

function _extends$C() { _extends$C = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$C.apply(this, arguments); }

var _ref$C =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-operator_svg__fill",
  d: "M29.83 6.45a2.667 2.667 0 014.34 0l11.697 16.374L57 13.918c1.88-1.504 4.573.054 4.32 2.35l-.047.29-8 37.334A2.666 2.666 0 0150.666 56H13.333a2.666 2.666 0 01-2.607-2.108l-8-37.333c-.525-2.452 2.315-4.207 4.273-2.641l11.132 8.906zM32 12.587l-11.163 15.63a2.667 2.667 0 01-3.836.532l-7.497-5.997 5.984 27.915h33.021l5.984-27.915L47 28.749a2.667 2.667 0 01-3.632-.281l-.204-.251L32 12.587zM32 32a5.333 5.333 0 110 10.668A5.333 5.333 0 0132 32z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconOperator(props) {
  return React__default.createElement("svg", _extends$C({
    viewBox: "0 0 64 64"
  }, props), _ref$C);
}

function _extends$D() { _extends$D = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$D.apply(this, arguments); }

var _ref$D =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-photo_svg__fill",
  d: "M50.667 5.333a8 8 0 018 8v37.334a8 8 0 01-8 8H13.333a8 8 0 01-8-8V13.333a8 8 0 018-8zm-8 25.107L19.77 53.332l30.896.001a2.667 2.667 0 002.661-2.498l.005-.168v-9.564L42.666 30.44zm8-19.773H13.333a2.667 2.667 0 00-2.666 2.666v37.334c0 1.143.72 2.119 1.731 2.498L40.781 24.78a2.668 2.668 0 013.52-.222l.251.222 8.78 8.78.001-20.228a2.667 2.667 0 00-2.498-2.661l-.168-.005zm-28 5.333a6.666 6.666 0 110 13.333 6.666 6.666 0 010-13.333zm0 5.333a1.334 1.334 0 100 2.667 1.334 1.334 0 000-2.667z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconPhoto(props) {
  return React__default.createElement("svg", _extends$D({
    viewBox: "0 0 64 64"
  }, props), _ref$D);
}

function _extends$E() { _extends$E = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$E.apply(this, arguments); }

var _ref$E =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-play_svg__fill",
  d: "M51.908 34.75c1.9-1.233 1.896-3.26.013-4.514L19.376 8.577c-1.893-1.26-3.404-.391-3.376 1.968l.522 42.888c.028 2.347 1.596 3.247 3.493 2.016L51.908 34.75z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconPlay(props) {
  return React__default.createElement("svg", _extends$E({
    viewBox: "0 0 64 64"
  }, props), _ref$E);
}

function _extends$F() { _extends$F = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$F.apply(this, arguments); }

var _ref$F =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-plus_svg__fill",
  d: "M34.667 29.333h18.666c3.556 0 3.556 5.334 0 5.334H34.667v18.666c0 3.556-5.334 3.556-5.334 0V34.667H10.667c-3.556 0-3.556-5.334 0-5.334h18.666V10.667c0-3.556 5.334-3.556 5.334 0v18.666z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconPlus(props) {
  return React__default.createElement("svg", _extends$F({
    viewBox: "0 0 64 64"
  }, props), _ref$F);
}

function _extends$G() { _extends$G = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$G.apply(this, arguments); }

var _ref$G =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-question_svg__fill",
  d: "M32 61.333C15.8 61.333 2.667 48.2 2.667 32S15.8 2.667 32 2.667 61.333 15.8 61.333 32 48.2 61.333 32 61.333zM32 56c13.255 0 24-10.745 24-24S45.255 8 32 8 8 18.745 8 32s10.745 24 24 24zm2.213-18.63a2.667 2.667 0 11-5.333 0v-2.69c0-1.148.734-2.168 1.823-2.53.173-.058.532-.195 1.01-.407.809-.36 1.616-.79 2.354-1.282 1.835-1.223 2.813-2.528 2.813-3.786a5.333 5.333 0 00-10.364-1.777 2.667 2.667 0 01-5.032-1.77 10.668 10.668 0 0120.729 3.551c0 3.413-2.022 6.109-5.187 8.22a21.268 21.268 0 01-2.813 1.578v.893zm-5.333 7.523a2.667 2.667 0 115.333 0v.44a2.667 2.667 0 11-5.333 0v-.44z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconQuestion(props) {
  return React__default.createElement("svg", _extends$G({
    viewBox: "0 0 64 64"
  }, props), _ref$G);
}

function _extends$H() { _extends$H = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$H.apply(this, arguments); }

var _ref$H =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-refresh_svg__fill",
  d: "M46.14 14.43l.562.537 6.631 6.167v-7.8a2.67 2.67 0 012.356-2.65l.311-.017a2.667 2.667 0 012.649 2.355l.018.311v16a2.67 2.67 0 01-2.356 2.65L56 32H40a2.667 2.667 0 01-.311-5.315l.311-.018h11.452l-8.44-7.85c-5.964-5.893-15.168-7.182-22.563-3.156-7.38 4.018-11.172 12.357-9.314 20.455 1.859 8.107 8.935 14.032 17.362 14.518 8.43.487 16.162-4.585 18.967-12.426a2.667 2.667 0 015.022 1.797C48.88 50.082 38.973 56.582 28.19 55.959c-10.785-.623-19.862-8.222-22.254-18.65C3.542 26.872 8.426 16.135 17.9 10.977c9.227-5.024 20.65-3.579 28.241 3.453z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconRefresh(props) {
  return React__default.createElement("svg", _extends$H({
    viewBox: "0 0 64 64"
  }, props), _ref$H);
}

function _extends$I() { _extends$I = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$I.apply(this, arguments); }

var _ref$I =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-remove_svg__fill",
  d: "M32 2.667C48.2 2.667 61.333 15.8 61.333 32S48.2 61.333 32 61.333 2.667 48.2 2.667 32 15.8 2.667 32 2.667zm9.886 19.447a2.668 2.668 0 00-3.772 0L32 28.23l-6.114-6.115-.134-.124a2.667 2.667 0 00-3.638.124l-.124.134a2.667 2.667 0 00.124 3.638L28.23 32l-6.115 6.114-.124.134a2.667 2.667 0 00.124 3.638l.134.124a2.667 2.667 0 003.638-.124L32 35.77l6.114 6.115.134.124a2.667 2.667 0 003.638-.124l.124-.134a2.667 2.667 0 00-.124-3.638L35.77 32l6.115-6.114.124-.134a2.667 2.667 0 00-.124-3.638z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconRemove(props) {
  return React__default.createElement("svg", _extends$I({
    viewBox: "0 0 64 64"
  }, props), _ref$I);
}

function _extends$J() { _extends$J = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$J.apply(this, arguments); }

var _ref$J =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-search_svg__fill",
  d: "M26.667 48C14.885 48 5.333 38.449 5.333 26.667c0-11.782 9.552-21.334 21.334-21.334S48 14.885 48 26.667c0 4.93-1.672 9.469-4.48 13.081l13.67 13.67a2.668 2.668 0 01-3.772 3.772l-13.67-13.67A21.239 21.239 0 0126.667 48zm0-5.333c8.836 0 16-7.164 16-16 0-8.837-7.164-16-16-16-8.837 0-16 7.163-16 16 0 8.836 7.163 16 16 16z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconSearch(props) {
  return React__default.createElement("svg", _extends$J({
    viewBox: "0 0 64 64"
  }, props), _ref$J);
}

function _extends$K() { _extends$K = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$K.apply(this, arguments); }

var _ref$K =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-send_svg__fill",
  d: "M59.795 29.43L7.329 2.979C4.691 1.802 1.76 4.153 2.932 6.798l6.925 18.609a2 2 0 001.544 1.275l32.273 5.394L11.4 37.47a1.998 1.998 0 00-1.544 1.275L2.932 57.353c-.879 2.645 1.76 4.997 4.397 3.527l52.466-26.453c2.051-.882 2.051-3.82 0-4.996z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconSend(props) {
  return React__default.createElement("svg", _extends$K({
    viewBox: "0 0 64 64"
  }, props), _ref$K);
}

function _extends$L() { _extends$L = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$L.apply(this, arguments); }

var _ref$L =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-settings-filled_svg__fill",
  d: "M32 2.667A5.332 5.332 0 0137.333 8v.24A4.4 4.4 0 0040 12.267a4.4 4.4 0 004.853-.88l.16-.16a5.332 5.332 0 017.547 0 5.333 5.333 0 010 7.546l-.16.16a4.401 4.401 0 00-.88 4.854V24a4.4 4.4 0 004.027 2.667H56c2.946 0 5.333 2.387 5.333 5.333S58.946 37.333 56 37.333h-.24A4.4 4.4 0 0051.733 40a4.4 4.4 0 00.88 4.853l.16.16a5.332 5.332 0 010 7.547 5.333 5.333 0 01-7.546 0l-.16-.16a4.401 4.401 0 00-4.854-.88 4.397 4.397 0 00-2.666 4.027V56a5.333 5.333 0 01-10.667 0v-.24A4.4 4.4 0 0024 51.733a4.4 4.4 0 00-4.853.88l-.16.16a5.332 5.332 0 01-7.547 0 5.333 5.333 0 010-7.546l.16-.16a4.401 4.401 0 00.88-4.854 4.397 4.397 0 00-4.027-2.666H8A5.333 5.333 0 018 26.88h.24A4.4 4.4 0 0012.267 24a4.4 4.4 0 00-.88-4.853l-.16-.16a5.332 5.332 0 010-7.547 5.333 5.333 0 017.546 0l.16.16a4.401 4.401 0 004.854.88H24a4.4 4.4 0 002.667-4.027V8A5.332 5.332 0 0132 2.667zM32 24a8 8 0 100 16 8 8 0 000-16z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconSettingsFilled(props) {
  return React__default.createElement("svg", _extends$L({
    viewBox: "0 0 64 64"
  }, props), _ref$L);
}

function _extends$M() { _extends$M = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$M.apply(this, arguments); }

var _ref$M =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-spinner_svg__fill",
  d: "M32 61.333C48.2 61.333 61.333 48.2 61.333 32S48.2 2.667 32 2.667 2.667 15.8 2.667 32a2.838 2.838 0 105.678 0C8.344 18.935 18.934 8.344 32 8.344c13.065 0 23.656 10.591 23.656 23.656S45.065 55.656 32 55.656a2.838 2.838 0 100 5.677z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconSpinner(props) {
  return React__default.createElement("svg", _extends$M({
    viewBox: "0 0 64 64"
  }, props), _ref$M);
}

function _extends$N() { _extends$N = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$N.apply(this, arguments); }

var _ref$N =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-supergroup_svg__fill",
  d: "M36.889 43.013c6.608 0 12.121 4.685 12.43 10.734l.014.537V58a2.667 2.667 0 01-5.316.311L44 58v-3.716c0-3.07-2.87-5.718-6.636-5.925l-.475-.013H27.11c-3.838 0-6.86 2.525-7.096 5.557l-.015.381V58a2.667 2.667 0 01-5.315.311L14.667 58v-3.716c0-6.126 5.324-10.986 11.864-11.26l.58-.011h9.778zm18.578-17.291c.266 0 .53.04.784.118 4.632 1.426 7.518 4.801 7.736 9.688l.013.594v12.8a2.667 2.667 0 01-5.315.311l-.018-.311V36.124c-.002-2.595-1.163-4.171-3.528-5.034l-.104-.037-2.502.002a2.667 2.667 0 01-2.648-2.356l-.018-.31a2.67 2.67 0 012.355-2.65l.311-.017h2.934zm-44 0l.31.018a2.666 2.666 0 012.356 2.648l-.018.311a2.666 2.666 0 01-2.648 2.356l-2.51-.002-.119.042c-2.246.85-3.503 2.574-3.505 5.147v12.68l-.018.31A2.666 2.666 0 010 48.922V36.24l.014-.591c.225-4.874 3.203-8.415 7.712-9.809.255-.078.52-.118.788-.118h2.953zM32 19.958c5.512 0 10 4.409 10 9.871 0 5.463-4.488 9.872-10 9.872s-10-4.41-10-9.872 4.488-9.871 10-9.871zm0 5.333c-2.588 0-4.667 2.043-4.667 4.538 0 2.496 2.08 4.538 4.667 4.538 2.588 0 4.667-2.042 4.667-4.538 0-2.495-2.08-4.538-4.667-4.538zM17.333 2.667c5.513 0 10 4.409 10 9.871 0 5.462-4.487 9.871-10 9.871-5.512 0-10-4.409-10-9.871 0-5.462 4.488-9.871 10-9.871zm29.334 0c5.512 0 10 4.409 10 9.871 0 5.462-4.488 9.871-10 9.871-5.513 0-10-4.409-10-9.871 0-5.462 4.487-9.871 10-9.871zM17.333 8c-2.587 0-4.666 2.042-4.666 4.538 0 2.496 2.079 4.538 4.666 4.538 2.588 0 4.667-2.042 4.667-4.538C22 10.042 19.921 8 17.333 8zm29.334 0C44.079 8 42 10.042 42 12.538c0 2.496 2.079 4.538 4.667 4.538 2.587 0 4.666-2.042 4.666-4.538 0-2.496-2.079-4.538-4.666-4.538z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconSupergroup(props) {
  return React__default.createElement("svg", _extends$N({
    viewBox: "0 0 64 64"
  }, props), _ref$N);
}

function _extends$O() { _extends$O = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$O.apply(this, arguments); }

var _ref$O =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-thumbnail-none_svg__fill",
  d: "M34.667 5.333a2.667 2.667 0 010 5.334H13.333a2.667 2.667 0 00-2.666 2.666v37.334c0 1.143.72 2.118 1.73 2.497l28.384-28.383a2.667 2.667 0 013.771 0l8.781 8.78v-4.228a2.667 2.667 0 012.498-2.661l.169-.005a2.667 2.667 0 012.667 2.666v21.334a8 8 0 01-8 8H13.33a8 8 0 01-7.998-8V13.333a8 8 0 018-8zm8 25.105L19.77 53.333h30.897a2.667 2.667 0 002.661-2.498l.005-.168v-9.563L42.667 30.438zM22.667 16a6.666 6.666 0 110 13.333 6.666 6.666 0 010-13.333zm0 5.333a1.334 1.334 0 100 2.667 1.334 1.334 0 000-2.667zM56.78 3.448a2.665 2.665 0 013.771 0 2.665 2.665 0 010 3.771l-4.782 4.78 4.782 4.782c.998.998 1.04 2.59.125 3.638l-.125.133a2.665 2.665 0 01-3.771 0l-4.782-4.781-4.78 4.781a2.667 2.667 0 01-3.638.125l-.133-.125a2.665 2.665 0 010-3.771L48.228 12l-4.78-4.781a2.667 2.667 0 01-.125-3.638l.125-.133a2.665 2.665 0 013.771 0l4.78 4.78z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconThumbnailNone(props) {
  return React__default.createElement("svg", _extends$O({
    viewBox: "0 0 64 64"
  }, props), _ref$O);
}

function _extends$P() { _extends$P = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$P.apply(this, arguments); }

var _ref$P =
/*#__PURE__*/
React__default.createElement("g", {
  fill: "none",
  fillRule: "evenodd"
}, React__default.createElement("rect", {
  className: "icon-toggleoff_svg__fill",
  width: 80,
  height: 40,
  x: 4,
  y: 4,
  fill: "#000",
  rx: 20
}), React__default.createElement("circle", {
  cx: 24,
  cy: 24,
  r: 12,
  fill: "#FFF"
}), React__default.createElement("path", {
  fill: "#FFF",
  d: "M64 4c11.046 0 20 8.954 20 20s-8.954 20-20 20H24C12.954 44 4 35.046 4 24S12.954 4 24 4h40zm0 2H24C14.059 6 6 14.059 6 24c0 9.764 7.774 17.712 17.47 17.992L24 42h40c9.941 0 18-8.059 18-18 0-9.764-7.774-17.712-17.47-17.992L64 6z"
}), React__default.createElement("path", {
  className: "icon-toggleoff_svg__fill",
  fill: "#000",
  d: "M64 0H24C10.745 0 0 10.745 0 24s10.745 24 24 24h40c13.255 0 24-10.745 24-24S77.255 0 64 0zm0 4c11.046 0 20 8.954 20 20s-8.954 20-20 20H24C12.954 44 4 35.046 4 24S12.954 4 24 4h40z"
}));

function SvgIconToggleoff(props) {
  return React__default.createElement("svg", _extends$P({
    viewBox: "0 0 88 48"
  }, props), _ref$P);
}

function _extends$Q() { _extends$Q = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$Q.apply(this, arguments); }

var _ref$Q =
/*#__PURE__*/
React__default.createElement("g", {
  fill: "none",
  fillRule: "evenodd"
}, React__default.createElement("rect", {
  className: "icon-toggleon_svg__fill",
  width: 80,
  height: 40,
  x: 4,
  y: 4,
  fill: "#000",
  rx: 20
}), React__default.createElement("circle", {
  cx: 64,
  cy: 24,
  r: 12,
  fill: "#FFF"
}), React__default.createElement("path", {
  fill: "#FFF",
  d: "M64 4c11.046 0 20 8.954 20 20s-8.954 20-20 20H24C12.954 44 4 35.046 4 24S12.954 4 24 4h40zm0 2H24C14.059 6 6 14.059 6 24c0 9.764 7.774 17.712 17.47 17.992L24 42h40c9.941 0 18-8.059 18-18 0-9.764-7.774-17.712-17.47-17.992L64 6z"
}), React__default.createElement("path", {
  className: "icon-toggleon_svg__fill",
  fill: "#000",
  d: "M64 0H24C10.745 0 0 10.745 0 24s10.745 24 24 24h40c13.255 0 24-10.745 24-24S77.255 0 64 0zm0 4c11.046 0 20 8.954 20 20s-8.954 20-20 20H24C12.954 44 4 35.046 4 24S12.954 4 24 4h40z"
}));

function SvgIconToggleon(props) {
  return React__default.createElement("svg", _extends$Q({
    viewBox: "0 0 88 48"
  }, props), _ref$Q);
}

function _extends$R() { _extends$R = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$R.apply(this, arguments); }

var _ref$R =
/*#__PURE__*/
React__default.createElement("path", {
  className: "icon-user_svg__fill",
  d: "M42.667 37.333c7.17 0 13.018 5.66 13.32 12.755l.013.579V56a2.667 2.667 0 01-5.315.311L50.667 56v-5.333c0-4.26-3.33-7.743-7.53-7.987l-.47-.013H21.333a8 8 0 00-7.986 7.53l-.014.47V56a2.667 2.667 0 01-5.316.311L8 56v-5.333c0-7.17 5.66-13.019 12.755-13.321l.578-.013h21.334zM32 5.333c7.364 0 13.333 5.97 13.333 13.334C45.333 26.03 39.363 32 32 32c-7.364 0-13.333-5.97-13.333-13.333 0-7.364 5.97-13.334 13.333-13.334zm0 5.334a8 8 0 100 16 8 8 0 000-16z",
  fill: "#000",
  fillRule: "evenodd"
});

function SvgIconUser(props) {
  return React__default.createElement("svg", _extends$R({
    viewBox: "0 0 64 64"
  }, props), _ref$R);
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
  ON_BACKGROUND_1: 'ON_BACKGROUND_1',
  ON_BACKGROUND_2: 'ON_BACKGROUND_2',
  ON_BACKGROUND_3: 'ON_BACKGROUND_3',
  BACKGROUND_3: 'BACKGROUND_3',
  ERROR: 'ERROR'
};

function changeColorToClassName(color) {
  switch (color) {
    case Colors.PRIMARY:
      return 'sendbird-icon-color--primary';

    case Colors.SECONDARY:
      return 'sendbird-icon-color--secondary';

    case Colors.CONTENT:
      return 'sendbird-icon-color--content';

    case Colors.CONTENT_INVERSE:
      return 'sendbird-icon-color--content-inverse';

    case Colors.WHITE:
      return 'sendbird-icon-color--white';

    case Colors.SENT:
      return 'sendbird-icon-color--sent';

    case Colors.READ:
      return 'sendbird-icon-color--read';

    case Colors.ON_BACKGROUND_1:
      return 'sendbird-icon-color--on-background-1';

    case Colors.ON_BACKGROUND_2:
      return 'sendbird-icon-color--on-background-2';

    case Colors.ON_BACKGROUND_3:
      return 'sendbird-icon-color--on-background-3';

    case Colors.BACKGROUND_3:
      return 'sendbird-icon-color--background-3';

    case Colors.ERROR:
      return 'sendbird-icon-color--error';

    default:
      return '';
  }
}

function changeTypeToIconComponent(type) {
  switch (type) {
    case Type.ADD:
      return React__default.createElement(SvgIconAdd, null);

    case Type.ARROW_LEFT:
      return React__default.createElement(SvgIconArrowLeft, null);

    case Type.ATTACH:
      return React__default.createElement(SvgIconAttach, null);

    case Type.BAN:
      return React__default.createElement(SvgIconBan, null);

    case Type.BROADCAST:
      return React__default.createElement(SvgIconBroadcast, null);

    case Type.CAMERA:
      return React__default.createElement(SvgIconCamera, null);

    case Type.CHANNELS:
      return React__default.createElement(SvgIconChannels, null);

    case Type.CHAT:
      return React__default.createElement(SvgIconChat, null);

    case Type.CHAT_FILLED:
      return React__default.createElement(SvgIconChatFilled, null);

    case Type.CHEVRON_DOWN:
      return React__default.createElement(SvgIconChevronDown, null);

    case Type.CHEVRON_RIGHT:
      return React__default.createElement(SvgIconChevronRight, null);

    case Type.CLOSE:
      return React__default.createElement(SvgIconClose, null);

    case Type.COLLAPSE:
      return React__default.createElement(SvgIconCollapse, null);

    case Type.COPY:
      return React__default.createElement(SvgIconCopy, null);

    case Type.CREATE:
      return React__default.createElement(SvgIconCreate, null);

    case Type.DELETE:
      return React__default.createElement(SvgIconDelete, null);

    case Type.DISCONNECTED:
      return React__default.createElement(SvgIconDisconnected, null);

    case Type.DOCUMENT:
      return React__default.createElement(SvgIconDocument, null);

    case Type.DONE:
      return React__default.createElement(SvgIconDone, null);

    case Type.DONE_ALL:
      return React__default.createElement(SvgIconDoneAll, null);

    case Type.DOWNLOAD:
      return React__default.createElement(SvgIconDownload, null);

    case Type.EDIT:
      return React__default.createElement(SvgIconEdit, null);

    case Type.EMOJI_MORE:
      return React__default.createElement(SvgIconEmojiMore, null);

    case Type.ERROR:
      return React__default.createElement(SvgIconError, null);

    case Type.EXPAND:
      return React__default.createElement(SvgIconExpand, null);

    case Type.FILE_AUDIO:
      return React__default.createElement(SvgIconFileAudio, null);

    case Type.FILE_DOCUMENT:
      return React__default.createElement(SvgIconFileDocument, null);

    case Type.FREEZE:
      return React__default.createElement(SvgIconFreeze, null);

    case Type.GIF:
      return React__default.createElement(SvgIconGif, null);

    case Type.INFO:
      return React__default.createElement(SvgIconInfo, null);

    case Type.LEAVE:
      return React__default.createElement(SvgIconLeave, null);

    case Type.MEMBERS:
      return React__default.createElement(SvgIconMembers, null);

    case Type.MESSAGE:
      return React__default.createElement(SvgIconMessage, null);

    case Type.MODERATIONS:
      return React__default.createElement(SvgIconModerations, null);

    case Type.MORE:
      return React__default.createElement(SvgIconMore, null);

    case Type.MUTE:
      return React__default.createElement(SvgIconMute, null);

    case Type.NOTIFICATIONS:
      return React__default.createElement(SvgIconNotifications, null);

    case Type.NOTIFICATIONS_OFF_FILLED:
      return React__default.createElement(SvgIconNotificationsOffFilled, null);

    case Type.OPERATOR:
      return React__default.createElement(SvgIconOperator, null);

    case Type.PHOTO:
      return React__default.createElement(SvgIconPhoto, null);

    case Type.PLAY:
      return React__default.createElement(SvgIconPlay, null);

    case Type.PLUS:
      return React__default.createElement(SvgIconPlus, null);

    case Type.QUESTION:
      return React__default.createElement(SvgIconQuestion, null);

    case Type.REFRESH:
      return React__default.createElement(SvgIconRefresh, null);

    case Type.REMOVE:
      return React__default.createElement(SvgIconRemove, null);

    case Type.SEARCH:
      return React__default.createElement(SvgIconSearch, null);

    case Type.SEND:
      return React__default.createElement(SvgIconSend, null);

    case Type.SETTINGS_FILLED:
      return React__default.createElement(SvgIconSettingsFilled, null);

    case Type.SPINNER:
      return React__default.createElement(SvgIconSpinner, null);

    case Type.SUPERGROUP:
      return React__default.createElement(SvgIconSupergroup, null);

    case Type.THUMBNAIL_NONE:
      return React__default.createElement(SvgIconThumbnailNone, null);

    case Type.TOGGLE_OFF:
      return React__default.createElement(SvgIconToggleoff, null);

    case Type.TOGGLE_ON:
      return React__default.createElement(SvgIconToggleon, null);

    case Type.USER:
      return React__default.createElement(SvgIconUser, null);

    default:
      return 'icon';
    // If you see this text 'icon' replace icon for it
  }
}

function Icon(_ref) {
  var className = _ref.className,
      type = _ref.type,
      fillColor = _ref.fillColor,
      width = _ref.width,
      height = _ref.height,
      onClick = _ref.onClick,
      children = _ref.children;
  var iconStyle = {
    width: typeof width === 'string' ? width : "".concat(width, "px"),
    minWidth: typeof width === 'string' ? width : "".concat(width, "px"),
    height: typeof height === 'string' ? height : "".concat(height, "px"),
    minHeight: typeof height === 'string' ? height : "".concat(height, "px")
  };
  return React__default.createElement("div", {
    className: [].concat(LocalizationContext._toConsumableArray(Array.isArray(className) ? className : [className]), ['sendbird-icon', changeColorToClassName(fillColor)]).join(' '),
    role: "button",
    onClick: onClick,
    onKeyDown: onClick,
    tabIndex: "0",
    style: iconStyle
  }, children || changeTypeToIconComponent(type));
}
Icon.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  type: PropTypes.oneOfType([PropTypes.oneOf(Object.keys(Type)), PropTypes.string]).isRequired,
  fillColor: PropTypes.oneOf(Object.keys(Colors)),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
  children: PropTypes.element
};
Icon.defaultProps = {
  className: '',
  fillColor: Colors.DEFAULT,
  width: 26,
  height: 26,
  onClick: function onClick() {},
  children: null
};
var IconTypes = Type;
var IconColors = Colors;

var pxToNumber = (function (px) {
  if (typeof px === 'number') {
    return px;
  }

  if (typeof px === 'string') {
    var parsed = Number.parseFloat(px);

    if (!Number.isNaN(parsed)) {
      return parsed;
    }
  }

  return null;
});

var imageRendererClassName = 'sendbird-avatar-img';

var defaultComponent = function defaultComponent(_a) {
  var width = _a.width,
      height = _a.height;
  return function () {
    var iconWidth = pxToNumber(width);
    var iconHeight = pxToNumber(height);

    if (typeof iconWidth === 'number') {
      iconWidth *= 0.575;
    }

    if (typeof iconHeight === 'number') {
      iconHeight *= 0.575;
    }

    return React__default.createElement("div", {
      className: "sendbird-avatar-img--default",
      style: {
        width: width,
        height: height
      }
    }, React__default.createElement(Icon, {
      type: IconTypes.USER,
      fillColor: IconColors.CONTENT,
      width: iconWidth,
      height: iconHeight
    }));
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
    return React__default.createElement(ImageRenderer, {
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
      return React__default.createElement(ImageRenderer, {
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
      return React__default.createElement("div", {
        className: "sendbird-avatar--inner__two-child"
      }, React__default.createElement(ImageRenderer, {
        className: imageRendererClassName,
        url: src[0],
        height: height,
        width: width,
        alt: alt,
        defaultComponent: defaultComponent({
          height: height,
          width: width
        })
      }), React__default.createElement(ImageRenderer, {
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
      return React__default.createElement(React__default.Fragment, null, React__default.createElement("div", {
        className: "sendbird-avatar--inner__three-child--upper"
      }, React__default.createElement(ImageRenderer, {
        className: imageRendererClassName,
        url: src[0],
        height: height,
        width: width,
        alt: alt,
        defaultComponent: defaultComponent({
          height: height,
          width: width
        })
      })), React__default.createElement("div", {
        className: "sendbird-avatar--inner__three-child--lower"
      }, React__default.createElement(ImageRenderer, {
        className: imageRendererClassName,
        url: src[1],
        height: height,
        width: width,
        alt: alt,
        defaultComponent: defaultComponent({
          height: height,
          width: width
        })
      }), React__default.createElement(ImageRenderer, {
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

    return React__default.createElement("div", {
      className: "sendbird-avatar--inner__four-child"
    }, src.slice(0, 4).map(function (i) {
      return React__default.createElement(ImageRenderer, {
        className: imageRendererClassName,
        url: i,
        height: height,
        width: width,
        alt: alt,
        key: LocalizationContext.uuidv4(),
        defaultComponent: defaultComponent({
          height: height,
          width: width
        })
      });
    }));
  } // default img


  return React__default.createElement(ImageRenderer, {
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
  return React__default.createElement("div", {
    className: LocalizationContext.__spreadArrays(Array.isArray(className) ? className : [className], ['sendbird-avatar']).join(' '),
    role: "button",
    ref: ref,
    style: {
      height: height,
      width: width
    },
    onClick: onClick,
    onKeyDown: onClick,
    tabIndex: 0
  }, React__default.createElement(AvatarInner, {
    src: src,
    width: width,
    height: height,
    alt: alt
  }));
}

var Avatar$1 = React__default.forwardRef(Avatar);

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
  ERROR: 'ERROR',
  SECONDARY_3: 'SECONDARY_3'
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
    // should be Primary-3 fix me

    case Colors$1.ERROR:
      return 'sendbird-label--color-error';

    case Colors$1.SECONDARY_3:
      return 'sendbird-label--color-secondary-3';

    default:
      return null;
  }
}

function Label(_ref) {
  var className = _ref.className,
      type = _ref.type,
      color = _ref.color,
      children = _ref.children;
  return React__default.createElement("span", {
    className: [].concat(LocalizationContext._toConsumableArray(Array.isArray(className) ? className : [className]), ['sendbird-label', type ? changeTypographyToClassName(type) : '', color ? changeColorToClassName$1(color) : '']).join(' ')
  }, children);
}
Label.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  type: PropTypes.oneOf([].concat(LocalizationContext._toConsumableArray(Object.keys(Typography)), [''])),
  color: PropTypes.oneOf([].concat(LocalizationContext._toConsumableArray(Object.keys(Colors$1)), [''])),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.element, PropTypes.any])
};
Label.defaultProps = {
  className: [],
  type: '',
  color: '',
  children: null
};
var LabelTypography = Typography;
var LabelColors = Colors$1;
var LabelStringSet = LocalizationContext.getStringSet('en');

function Types() {
  return {
    LOADING: 'LOADING',
    NO_CHANNELS: 'NO_CHANNELS',
    NO_MESSAGES: 'NO_MESSAGES',
    WRONG: 'WRONG',
    SEARCH_IN: 'SEARCH_IN',
    SEARCHING: 'SEARCHING',
    NO_RESULTS: 'NO_RESULTS'
  };
}
var PlaceHolderTypes = Types();

function Loader(_ref) {
  var className = _ref.className,
      width = _ref.width,
      height = _ref.height,
      children = _ref.children;
  return React__default.createElement("div", {
    className: [].concat(LocalizationContext._toConsumableArray(Array.isArray(className) ? className : [className]), ['sendbird-loader']).join(' '),
    style: {
      width: typeof width === 'string' ? width : "".concat(width, "px"),
      height: typeof height === 'string' ? height : "".concat(height, "px")
    }
  }, children);
}
Loader.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.element
};
Loader.defaultProps = {
  className: '',
  width: '26px',
  height: '26px',
  children: React__default.createElement(Icon, {
    type: IconTypes.SPINNER,
    width: "26px",
    height: "26px"
  })
};

var PlaceHolderTypes$1 = PlaceHolderTypes;
function PlaceHolder(_ref) {
  var className = _ref.className,
      type = _ref.type,
      retryToConnect = _ref.retryToConnect,
      searchInString = _ref.searchInString;

  var _useContext = React.useContext(LocalizationContext.LocalizationContext),
      stringSet = _useContext.stringSet;

  return React__default.createElement("div", {
    className: [].concat(LocalizationContext._toConsumableArray(Array.isArray(className) ? className : [className]), ['sendbird-place-holder']).join(' ')
  }, type === PlaceHolderTypes$1.LOADING && React__default.createElement(Loader, {
    width: "48px",
    height: "48px"
  }, React__default.createElement(Icon, {
    type: IconTypes.SPINNER,
    fillColor: IconColors.PRIMARY,
    width: "48px",
    height: "48px"
  })), (type === PlaceHolderTypes$1.NO_CHANNELS || type === PlaceHolderTypes$1.NO_MESSAGES || type === PlaceHolderTypes$1.WRONG) && React__default.createElement("div", {
    className: "sendbird-place-holder__body"
  }, type === PlaceHolderTypes$1.NO_CHANNELS && React__default.createElement(Icon, {
    className: "sendbird-place-holder__body__icon",
    type: IconTypes.CHAT,
    fillColor: IconColors.ON_BACKGROUND_3,
    width: "64px",
    height: "64px"
  }), type === PlaceHolderTypes$1.WRONG && React__default.createElement(Icon, {
    className: "sendbird-place-holder__body__icon",
    type: IconTypes.ERROR,
    fillColor: IconColors.ON_BACKGROUND_3,
    width: "64px",
    height: "64px"
  }), type === PlaceHolderTypes$1.NO_MESSAGES && React__default.createElement(Icon, {
    className: "sendbird-place-holder__body__icon",
    type: IconTypes.MESSAGE,
    fillColor: IconColors.ON_BACKGROUND_3,
    width: "64px",
    height: "64px"
  }), React__default.createElement(Label, {
    className: "sendbird-place-holder__body__text",
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_2
  }, type === PlaceHolderTypes$1.NO_CHANNELS && stringSet.PLACE_HOLDER__NO_CHANNEL, type === PlaceHolderTypes$1.WRONG && stringSet.PLACE_HOLDER__WRONG, type === PlaceHolderTypes$1.NO_MESSAGES && stringSet.PLACE_HOLDER__NO_MESSAGES), retryToConnect && React__default.createElement("div", {
    className: "sendbird-place-holder__body__reconnect",
    role: "button",
    onClick: retryToConnect,
    onKeyPress: retryToConnect,
    tabIndex: 0
  }, React__default.createElement(Icon, {
    className: "sendbird-place-holder__body__reconnect__icon",
    type: IconTypes.REFRESH,
    fillColor: IconColors.PRIMARY,
    width: "20px",
    height: "20px"
  }), React__default.createElement(Label, {
    className: "sendbird-place-holder__body__reconnect__text",
    type: LabelTypography.BUTTON_1,
    color: LabelColors.PRIMARY
  }, stringSet.PLACE_HOLDER__RETRY_TO_CONNECT))), (type === PlaceHolderTypes$1.NO_RESULTS || type === PlaceHolderTypes$1.SEARCH_IN || type === PlaceHolderTypes$1.SEARCHING) && React__default.createElement("div", {
    className: "sendbird-place-holder__body--align-top"
  }, type === PlaceHolderTypes$1.SEARCH_IN && React__default.createElement("div", {
    className: "sendbird-place-holder__body--align-top__text"
  }, React__default.createElement(Label, {
    className: "sendbird-place-holder__body--align-top__text__search-in",
    type: LabelTypography.BUTTON_2,
    color: LabelColors.ONBACKGROUND_2
  }, stringSet.SEARCH_IN), React__default.createElement(Label, {
    className: "sendbird-place-holder__body--align-top__text__channel-name",
    type: LabelTypography.BUTTON_2,
    color: LabelColors.PRIMARY
  }, "'".concat(searchInString)), React__default.createElement(Label, {
    className: "sendbird-place-holder__body--align-top__text__quote",
    type: LabelTypography.BUTTON_2,
    color: LabelColors.PRIMARY
  }, '\'')), type === PlaceHolderTypes$1.SEARCHING && React__default.createElement(Label, {
    className: "sendbird-place-hlder__body--align-top__searching",
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_2
  }, stringSet.SEARCHING), type === PlaceHolderTypes$1.NO_RESULTS && React__default.createElement(Label, {
    className: "sendbird-place-hlder__body--align-top__no-result",
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_2
  }, stringSet.NO_SEARCHED_MESSAGE)));
}
PlaceHolder.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  type: PropTypes.oneOfType([PropTypes.oneOf(Object.keys(PlaceHolderTypes$1)), PropTypes.string]).isRequired,
  retryToConnect: PropTypes.func,
  searchInString: PropTypes.string
};
PlaceHolder.defaultProps = {
  className: '',
  retryToConnect: null,
  searchInString: ''
};

exports.Avatar = Avatar$1;
exports.Icon = Icon;
exports.IconColors = IconColors;
exports.IconTypes = IconTypes;
exports.ImageRenderer = ImageRenderer;
exports.Label = Label;
exports.LabelColors = LabelColors;
exports.LabelStringSet = LabelStringSet;
exports.LabelTypography = LabelTypography;
exports.Loader = Loader;
exports.PlaceHolder = PlaceHolder;
exports.PlaceHolderTypes = PlaceHolderTypes;
exports.PlaceHolderTypes$1 = PlaceHolderTypes$1;
exports.changeColorToClassName = changeColorToClassName$1;
//# sourceMappingURL=index-944fbc98.js.map
