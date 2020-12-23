import { b as _slicedToArray, c as _toConsumableArray, d as __spreadArrays, u as uuidv4, g as getStringSet, a as _objectSpread2, e as LocalizationContext, w as withSendbirdContext, f as _inherits, h as _createClass, i as _classCallCheck, j as _possibleConstructorReturn, k as _getPrototypeOf, l as _defineProperty, m as _assertThisInitialized } from './LocalizationContext-5c5b45a0.js';
import React, { useState, useEffect, useContext, Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

var UserProfileContext = React.createContext({
  disableUserProfile: true,
  isOpenChannel: false,
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
  isOpenChannel: PropTypes.bool,
  // eslint-disable-next-line react/no-unused-prop-types
  disableUserProfile: PropTypes.bool,
  // eslint-disable-next-line react/no-unused-prop-types
  renderUserProfile: PropTypes.func,
  className: PropTypes.string
};
UserProfileProvider.defaultProps = {
  className: null,
  isOpenChannel: false,
  disableUserProfile: false,
  renderUserProfile: null
};

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
    className: "sendbird-image-renderer--hidden-placeholder ".concat(injectingClassName.join(' ')),
    src: url,
    alt: alt,
    onError: function onError() {
      setRealElement(typeof defaultComponent === 'function' ? defaultComponent() : defaultComponent);
    },
    onLoad: function onLoad() {
      setRealElement(React.createElement("div", {
        className: injectingClassName.join(' '),
        style: {
          width: width,
          height: height,
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
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  defaultComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  circle: PropTypes.bool
};
ImageRenderer.defaultProps = {
  alt: '',
  className: '',
  circle: false,
  defaultComponent: null,
  width: null,
  height: null
};

var Type = {
  ADD: 'ADD',
  ATTACH: 'ATTACH',
  ARROW_LEFT: 'ARROW_LEFT',
  AVATAR_DARK: 'AVATAR_DARK',
  AVATAR_LIGHT: 'AVATAR_LIGHT',
  AVATAR_NO_IMAGE: 'AVATAR_NO_IMAGE',
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
  MESSAGE: 'MESSAGE',
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
  fill: "none",
  fillRule: "evenodd"
}, React.createElement("circle", {
  cx: 16,
  cy: 16,
  r: 16,
  className: "avatar-no-image-light_svg__fill"
}), React.createElement("path", {
  d: "M19.043 8.381l.089.004a.762.762 0 01.677.753l-.004.089-.415 3.725h2.705a.762.762 0 01.089 1.519l-.089.005H19.22l-.338 3.048h3.213a.762.762 0 01.089 1.518l-.089.005h-3.382l-.432 3.894a.762.762 0 01-1.519-.079l.004-.09.414-3.725h-3.038l-.433 3.894a.76.76 0 01-1.519-.079l.005-.09.414-3.725H9.905a.76.76 0 01-.089-1.518l.089-.005h2.872l.339-3.048H9.905a.762.762 0 01-.089-1.519l.089-.005h3.381l.433-3.893a.76.76 0 01.752-.678l.09.004a.763.763 0 01.677.753l-.005.089-.414 3.725h3.038l.433-3.893a.762.762 0 01.753-.678zm-1.694 9.143l.34-3.048h-3.04l-.338 3.048h3.038z",
  fill: "#FFF",
  fillOpacity: 0.88
}));

function SvgAvatarNoImageLight(props) {
  return React.createElement("svg", _extends$5({
    viewBox: "0 0 32 32"
  }, props), _ref$5);
}

function _extends$6() { _extends$6 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$6.apply(this, arguments); }

var _ref$6 =
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
  return React.createElement("svg", _extends$6({
    viewBox: "0 0 56 56"
  }, props), _ref$6);
}

function _extends$7() { _extends$7 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$7.apply(this, arguments); }

var _ref$7 =
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
  return React.createElement("svg", _extends$7({
    viewBox: "0 0 56 56"
  }, props), _ref$7);
}

function _extends$8() { _extends$8 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$8.apply(this, arguments); }

var _ref$8 =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-broadcast-dark_svg__fill",
  fill: "#6FD6BE",
  fillRule: "evenodd",
  d: "M14.636 2.041c.02.065.03.132.03.2V13.76a.667.667 0 01-.865.637l-4.488-1.403A2.667 2.667 0 014 12.666v-1.334H2.667a2 2 0 01-1.995-1.85l-.005-.15V6.667a2 2 0 012-2H4l9.801-3.063a.666.666 0 01.835.437zm-9.303 9.772v.854a1.333 1.333 0 002.664.099l.003-.12-2.667-.833zm8-8.666l-8 2.499v4.707l8 2.5V3.147zM4 6H2.667a.668.668 0 00-.663.589L2 6.667v2.666c0 .369.298.667.667.667H4V6z"
});

function SvgIconBroadcastDark(props) {
  return React.createElement("svg", _extends$8({
    viewBox: "0 0 16 16"
  }, props), _ref$8);
}

function _extends$9() { _extends$9 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$9.apply(this, arguments); }

var _ref$9 =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-broadcast-light_svg__fill",
  fill: "#2EBA9F",
  fillRule: "evenodd",
  d: "M14.636 2.041c.02.065.03.132.03.2V13.76a.667.667 0 01-.865.637l-4.488-1.403A2.667 2.667 0 014 12.666v-1.334H2.667a2 2 0 01-1.995-1.85l-.005-.15V6.667a2 2 0 012-2H4l9.801-3.063a.666.666 0 01.835.437zm-9.303 9.772v.854a1.333 1.333 0 002.664.099l.003-.12-2.667-.833zm8-8.666l-8 2.499v4.707l8 2.5V3.147zM4 6H2.667a.668.668 0 00-.663.589L2 6.667v2.666c0 .369.298.667.667.667H4V6z"
});

function SvgIconBroadcastLight(props) {
  return React.createElement("svg", _extends$9({
    viewBox: "0 0 16 16"
  }, props), _ref$9);
}

function _extends$a() { _extends$a = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$a.apply(this, arguments); }

var _ref$a =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-broadcast_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M14.636 2.041c.02.065.03.132.03.2V13.76a.667.667 0 01-.865.637l-4.488-1.403A2.667 2.667 0 014 12.666v-1.334H2.667a2 2 0 01-1.995-1.85l-.005-.15V6.667a2 2 0 012-2H4l9.801-3.063a.666.666 0 01.835.437zm-9.303 9.772v.854a1.333 1.333 0 002.664.099l.003-.12-2.667-.833zm8-8.666l-8 2.499v4.707l8 2.5V3.147zM4 6H2.667a.668.668 0 00-.663.589L2 6.667v2.666c0 .369.298.667.667.667H4V6z"
});

function SvgIconBroadcast(props) {
  return React.createElement("svg", _extends$a({
    viewBox: "0 0 16 16"
  }, props), _ref$a);
}

function _extends$b() { _extends$b = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$b.apply(this, arguments); }

var _ref$b =
/*#__PURE__*/
React.createElement("path", {
  className: "frozen-dark_svg__fill",
  fill: "#9E8CF5",
  fillRule: "evenodd",
  d: "M10.409.806l.063.056c.24.24.259.618.055.88l-.055.063-1.805 1.804v3.236l2.801-1.618.662-2.465a.665.665 0 011.304.263l-.016.082-.56 2.088 2.088.56a.665.665 0 01.488.734l-.016.082a.666.666 0 01-.735.488l-.082-.016-2.465-.661L9.334 8l2.801 1.618 2.466-.66.082-.017a.667.667 0 01.735.488l.016.082a.666.666 0 01-.488.734l-2.088.56.56 2.088.016.082a.666.666 0 01-1.304.263l-.662-2.465-2.801-1.618v3.236l1.805 1.804a.668.668 0 01-.88.999l-.063-.056L8 13.61l-1.528 1.53a.668.668 0 01-.88.055l-.063-.056a.668.668 0 01-.056-.88l.056-.063 1.804-1.805V9.155L4.53 10.773l-.66 2.465a.667.667 0 01-1.304-.263l.017-.082.559-2.088-2.088-.56a.667.667 0 01-.488-.734l.017-.082a.665.665 0 01.734-.488l.082.016 2.466.66L6.666 8 3.864 6.382l-2.465.66-.082.017a.666.666 0 01-.734-.488L.566 6.49a.667.667 0 01.488-.734l2.088-.56-.56-2.088-.016-.082a.667.667 0 011.305-.263l.659 2.465 2.803 1.618V3.61L5.529 1.805a.668.668 0 01.88-.999l.063.056L8 2.39 9.53.862a.668.668 0 01.88-.056z"
});

function SvgFrozenDark(props) {
  return React.createElement("svg", _extends$b({
    viewBox: "0 0 16 16"
  }, props), _ref$b);
}

function _extends$c() { _extends$c = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$c.apply(this, arguments); }

var _ref$c =
/*#__PURE__*/
React.createElement("path", {
  className: "frozen-light_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M10.409.806l.063.056c.24.24.259.618.055.88l-.055.063-1.805 1.804v3.236l2.801-1.618.662-2.465a.665.665 0 011.304.263l-.016.082-.56 2.088 2.088.56a.665.665 0 01.488.734l-.016.082a.666.666 0 01-.735.488l-.082-.016-2.465-.661L9.334 8l2.801 1.618 2.466-.66.082-.017a.667.667 0 01.735.488l.016.082a.666.666 0 01-.488.734l-2.088.56.56 2.088.016.082a.666.666 0 01-1.304.263l-.662-2.465-2.801-1.618v3.236l1.805 1.804a.668.668 0 01-.88.999l-.063-.056L8 13.61l-1.528 1.53a.668.668 0 01-.88.055l-.063-.056a.668.668 0 01-.056-.88l.056-.063 1.804-1.805V9.155L4.53 10.773l-.66 2.465a.667.667 0 01-1.304-.263l.017-.082.559-2.088-2.088-.56a.667.667 0 01-.488-.734l.017-.082a.665.665 0 01.734-.488l.082.016 2.466.66L6.666 8 3.864 6.382l-2.465.66-.082.017a.666.666 0 01-.734-.488L.566 6.49a.667.667 0 01.488-.734l2.088-.56-.56-2.088-.016-.082a.667.667 0 011.305-.263l.659 2.465 2.803 1.618V3.61L5.529 1.805a.668.668 0 01.88-.999l.063.056L8 2.39 9.53.862a.668.668 0 01.88-.056z"
});

function SvgFrozenLight(props) {
  return React.createElement("svg", _extends$c({
    viewBox: "0 0 16 16"
  }, props), _ref$c);
}

function _extends$d() { _extends$d = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$d.apply(this, arguments); }

var _ref$d =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-camera_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M15 2a1 1 0 01.832.445L17.535 5H21a3 3 0 012.995 2.824L24 8v11a3 3 0 01-3 3H3a3 3 0 01-3-3V8a3 3 0 013-3h3.464l1.704-2.555a1 1 0 01.708-.437L9 2zm-.536 2H9.535L7.832 6.555a1 1 0 01-.708.437L7 7H3a1 1 0 00-1 1v11a1 1 0 001 1h18a1 1 0 001-1V8a1 1 0 00-1-1h-4a1 1 0 01-.832-.445L14.464 4zM12 8a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z"
});

function SvgIconCamera(props) {
  return React.createElement("svg", _extends$d({
    viewBox: "0 0 24 24"
  }, props), _ref$d);
}

function _extends$e() { _extends$e = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$e.apply(this, arguments); }

var _ref$e =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-more_svg__fill",
  fillRule: "evenodd",
  d: "M12 17a2 2 0 110 4 2 2 0 010-4zm0-6.5a2 2 0 110 4 2 2 0 010-4zM12 4a2 2 0 110 4 2 2 0 010-4z"
});

function SvgIconMore(props) {
  return React.createElement("svg", _extends$e({
    viewBox: "0 0 24 24"
  }, props), _ref$e);
}

function _extends$f() { _extends$f = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$f.apply(this, arguments); }

var _ref$f =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-mute_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M15.125 20.09c0 .602-.694 2.41-2.778 2.41-1.389 0-2.315-.804-2.778-2.41zM12.789 1.606a6.496 6.496 0 015.388 2.861l2.464-2.463a.788.788 0 011.025-.077l.088.077a.788.788 0 010 1.113L3.378 21.494a.788.788 0 01-1.025.077l-.088-.077a.788.788 0 010-1.113l1.9-1.903-.04-.004a.387.387 0 01-.241-.596l1.557-2.295.001-.208a545.875 545.875 0 00-.028-6.563l-.008-.614a6.503 6.503 0 016.414-6.59h.969zm6.381 5.246c.08.407.122.827.122 1.257l-.001 7.53 1.52 2.238a.387.387 0 01-.32.604H7.54l3.214-3.214 8.415-8.415z"
});

function SvgIconMute(props) {
  return React.createElement("svg", _extends$f({
    viewBox: "0 0 24 24"
  }, props), _ref$f);
}

function _extends$g() { _extends$g = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$g.apply(this, arguments); }

var _ref$g =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-no-thumbnail_svg__fill",
  fillOpacity: 0.5,
  fillRule: "evenodd",
  d: "M30.333 4.667a2.333 2.333 0 110 4.666H11.667a2.334 2.334 0 00-2.334 2.334v32.666c0 1.001.63 1.855 1.516 2.186l24.834-24.836a2.336 2.336 0 013.3 0l7.684 7.683v-3.7c0-1.234.96-2.245 2.173-2.327l.16-.006a2.333 2.333 0 012.333 2.334v18.666a7 7 0 01-7 7H11.665a6.999 6.999 0 01-6.998-7V11.667a7 7 0 017-7zm7 21.966L17.3 46.666h27.034a2.333 2.333 0 002.328-2.173l.006-.16v-8.367l-9.334-9.333zM19.833 14a5.834 5.834 0 110 11.668 5.834 5.834 0 010-11.668zm0 4.667a1.166 1.166 0 100 2.332 1.166 1.166 0 000-2.332zm29.85-15.65a2.334 2.334 0 013.3 3.3L48.8 10.499l4.184 4.184c.87.87.91 2.256.119 3.173l-.119.127a2.334 2.334 0 01-3.3 0L45.5 13.8l-4.183 4.184c-.87.87-2.256.91-3.173.119l-.127-.119a2.334 2.334 0 010-3.3L42.2 10.5l-4.183-4.182a2.334 2.334 0 01-.119-3.173l.119-.127a2.334 2.334 0 013.3 0L45.5 7.2z"
});

function SvgIconNoThumbnail(props) {
  return React.createElement("svg", _extends$g({
    viewBox: "0 0 56 56"
  }, props), _ref$g);
}

function _extends$h() { _extends$h = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$h.apply(this, arguments); }

var _ref$h =
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
  return React.createElement("svg", _extends$h({
    viewBox: "0 0 24 24"
  }, props), _ref$h);
}

function _extends$i() { _extends$i = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$i.apply(this, arguments); }

var _ref$i =
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
  return React.createElement("svg", _extends$i({
    viewBox: "0 0 24 24"
  }, props), _ref$i);
}

function _extends$j() { _extends$j = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$j.apply(this, arguments); }

var _ref$j =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-close_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M6.613 5.21l.094.083L12 10.585l5.293-5.292a1 1 0 011.497 1.32l-.083.094L13.415 12l5.292 5.293a1 1 0 01-1.32 1.497l-.094-.083L12 13.415l-5.293 5.292a1 1 0 01-1.497-1.32l.083-.094L10.585 12 5.293 6.707a1 1 0 011.32-1.497z"
});

function SvgIconClose(props) {
  return React.createElement("svg", _extends$j({
    viewBox: "0 0 24 24"
  }, props), _ref$j);
}

function _extends$k() { _extends$k = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$k.apply(this, arguments); }

var _ref$k =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-copy_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M20 8a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9a3 3 0 013-3zm0 2h-9a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1v-9a1 1 0 00-1-1zm-7-9a3 3 0 012.995 2.824L16 4v1a1 1 0 01-1.993.117L14 5V4a1 1 0 00-.883-.993L13 3H4a1 1 0 00-.993.883L3 4v9a1 1 0 00.883.993L4 14h1a1 1 0 01.117 1.993L5 16H4a3 3 0 01-2.995-2.824L1 13V4a3 3 0 012.824-2.995L4 1h9z"
});

function SvgIconCopy(props) {
  return React.createElement("svg", _extends$k({
    viewBox: "0 0 24 24"
  }, props), _ref$k);
}

function _extends$l() { _extends$l = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$l.apply(this, arguments); }

var _ref$l =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-chat_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11c-1.67 0-3.255-.373-4.673-1.039l-.657.218c-2.237.716-3.8.964-4.69.742-1.049-.261-1.256-.72-.62-1.373.439-.524.805-1.178 1.097-1.963.234-.625.142-1.5-.276-2.625A10.933 10.933 0 011 12C1 5.925 5.925 1 12 1zm0 2a9 9 0 00-8.187 12.742l.152.314.051.101.04.107c.569 1.532.709 2.859.275 4.02l-.143.365-.072.162.088-.019a23.181 23.181 0 001.832-.511l.646-.213.765-.26.73.343A8.962 8.962 0 0012 21a9 9 0 000-18z"
});

function SvgIconChat(props) {
  return React.createElement("svg", _extends$l({
    viewBox: "0 0 24 24"
  }, props), _ref$l);
}

function _extends$m() { _extends$m = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$m.apply(this, arguments); }

var _ref$m =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-supergroup_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M16.139 18.818c2.89 0 5.303 2.05 5.438 4.696l.006.235v1.626a1.166 1.166 0 01-2.326.136l-.007-.136v-1.626c0-1.343-1.255-2.501-2.903-2.592l-.208-.006H11.86c-1.679 0-3.001 1.105-3.105 2.431l-.006.167v1.626a1.166 1.166 0 01-2.325.136l-.008-.136v-1.626c0-2.68 2.329-4.806 5.19-4.926l.254-.005h4.278zm8.128-7.565c.116 0 .232.018.343.052 2.026.624 3.289 2.1 3.384 4.239l.006.26v5.6a1.166 1.166 0 01-2.325.136l-.008-.137v-5.599c-.001-1.135-.509-1.825-1.543-2.202l-.046-.016h-1.095c-.598 0-1.091-.45-1.158-1.03l-.008-.136c0-.598.45-1.092 1.03-1.159l.136-.008h1.284zm-19.25 0l.136.008c.58.067 1.03.56 1.03 1.159l-.008.136c-.067.58-.56 1.03-1.158 1.03H3.919l-.052.018c-.983.372-1.533 1.126-1.534 2.252v5.547l-.008.136A1.166 1.166 0 010 21.404v-5.548l.006-.259c.099-2.132 1.402-3.681 3.374-4.29.112-.035.228-.053.345-.053h1.292zM14 8.732c2.412 0 4.375 1.928 4.375 4.318 0 2.39-1.963 4.319-4.375 4.319S9.625 15.44 9.625 13.05c0-2.39 1.963-4.318 4.375-4.318zm0 2.333c-1.132 0-2.042.893-2.042 1.985s.91 1.986 2.042 1.986c1.132 0 2.042-.894 2.042-1.986s-.91-1.985-2.042-1.985zM7.583 1.167c2.412 0 4.375 1.929 4.375 4.318 0 2.39-1.963 4.32-4.375 4.32-2.411 0-4.375-1.93-4.375-4.32 0-2.39 1.964-4.318 4.375-4.318zm12.834 0c2.411 0 4.375 1.929 4.375 4.318 0 2.39-1.964 4.32-4.375 4.32-2.412 0-4.375-1.93-4.375-4.32 0-2.39 1.963-4.318 4.375-4.318zM7.583 3.5c-1.132 0-2.041.894-2.041 1.985 0 1.092.91 1.986 2.041 1.986 1.132 0 2.042-.894 2.042-1.986 0-1.091-.91-1.985-2.042-1.985zm12.834 0c-1.132 0-2.042.894-2.042 1.985 0 1.092.91 1.986 2.042 1.986 1.132 0 2.041-.894 2.041-1.986 0-1.091-.91-1.985-2.041-1.985z"
});

function SvgIconSupergroup(props) {
  return React.createElement("svg", _extends$m({
    viewBox: "0 0 28 28"
  }, props), _ref$m);
}

function _extends$n() { _extends$n = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$n.apply(this, arguments); }

var _ref$n =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-create_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11c-1.67 0-3.255-.373-4.673-1.039l-.657.218c-2.237.716-3.8.964-4.69.742-1.049-.261-1.256-.72-.62-1.373.439-.524.805-1.178 1.097-1.963.234-.625.142-1.5-.276-2.625A10.933 10.933 0 011 12C1 5.925 5.925 1 12 1zm0 2a9 9 0 00-8.187 12.742l.152.314.051.101.04.107c.569 1.532.709 2.859.275 4.02l-.143.365-.072.162.088-.019a23.181 23.181 0 001.832-.511l.646-.213.765-.26.73.343A8.962 8.962 0 0012 21a9 9 0 000-18zm1 6v2h2c1.333 0 1.333 2 0 2h-2v2c0 1.333-2 1.333-2 0v-2H9c-1.333 0-1.333-2 0-2h2V9c0-1.333 2-1.333 2 0z"
});

function SvgIconCreate(props) {
  return React.createElement("svg", _extends$n({
    viewBox: "0 0 24 24"
  }, props), _ref$n);
}

function _extends$o() { _extends$o = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$o.apply(this, arguments); }

var _ref$o =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-delete_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M14 1a3 3 0 012.995 2.824L17 4v1h4a1 1 0 01.117 1.993L21 7h-1v13a3 3 0 01-2.824 2.995L17 23H7a3 3 0 01-2.995-2.824L4 20V7H3a1 1 0 01-.117-1.993L3 5h4V4a3 3 0 012.824-2.995L10 1h4zm4 6H6v13a1 1 0 00.883.993L7 21h10a1 1 0 00.993-.883L18 20V7zm-8 3a1 1 0 01.993.883L11 11v6a1 1 0 01-1.993.117L9 17v-6a1 1 0 011-1zm4 0a1 1 0 01.993.883L15 11v6a1 1 0 01-1.993.117L13 17v-6a1 1 0 011-1zm0-7h-4a1 1 0 00-.993.883L9 4v1h6V4a1 1 0 00-.883-.993L14 3z"
});

function SvgIconDelete(props) {
  return React.createElement("svg", _extends$o({
    viewBox: "0 0 24 24"
  }, props), _ref$o);
}

function _extends$p() { _extends$p = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$p.apply(this, arguments); }

var _ref$p =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-dummy_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
});

function SvgIconDummy(props) {
  return React.createElement("svg", _extends$p({
    viewBox: "0 0 24 24"
  }, props), _ref$p);
}

function _extends$q() { _extends$q = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$q.apply(this, arguments); }

var _ref$q =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-edit_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M21.875 21.875a1.042 1.042 0 01.121 2.076l-.121.007H3.125a1.042 1.042 0 01-.121-2.076l.121-.007h18.75zM13.847 1.347a1.042 1.042 0 011.473 0l4.167 4.166a1.042 1.042 0 010 1.474L8.028 18.445c-.195.195-.46.305-.736.305H3.125a1.042 1.042 0 01-1.042-1.042v-4.166c0-.277.11-.542.305-.737zm.736 2.21L4.167 13.973v2.694h2.691L17.276 6.25l-2.693-2.693z"
});

function SvgIconEdit(props) {
  return React.createElement("svg", _extends$q({
    viewBox: "0 0 26 26"
  }, props), _ref$q);
}

function _extends$r() { _extends$r = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$r.apply(this, arguments); }

var _ref$r =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-error_svg__fill",
  fill: "#E53157",
  fillRule: "evenodd",
  d: "M8 1.265c.655 0 1.266.32 1.64.856l.072.11 5.652 9.436c.355.615.357 1.373.006 1.99-.33.579-.925.953-1.59 1.004l-.133.006H2.346a2.001 2.001 0 01-1.772-2.883l.067-.127 5.649-9.43A2 2 0 018 1.266zm0 1.333a.669.669 0 00-.52.248l-.048.07-5.641 9.417a.669.669 0 00.477.994l.085.006H13.64a.664.664 0 00.612-.914l-.036-.076L8.57 2.919a.663.663 0 00-.57-.32zm0 8.069A.667.667 0 118 12a.667.667 0 010-1.333zm0-5.334c.342 0 .624.258.662.59L8.667 6v2.667a.667.667 0 01-1.329.077l-.005-.077V6c0-.368.299-.667.667-.667z"
});

function SvgIconError(props) {
  return React.createElement("svg", _extends$r({
    viewBox: "0 0 16 16"
  }, props), _ref$r);
}

function _extends$s() { _extends$s = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$s.apply(this, arguments); }

var _ref$s =
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
  return React.createElement("svg", _extends$s({
    viewBox: "0 0 24 24"
  }, props), _ref$s);
}

function _extends$t() { _extends$t = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$t.apply(this, arguments); }

var _ref$t =
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
  return React.createElement("svg", _extends$t({
    viewBox: "0 0 28 28"
  }, props), _ref$t);
}

function _extends$u() { _extends$u = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$u.apply(this, arguments); }

var _ref$u =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-reactions-add_svg__fill",
  fillOpacity: 0.88,
  fillRule: "evenodd",
  d: "M11.033 1.107a9.98 9.98 0 012.669.362.734.734 0 01-.393 1.413A8.466 8.466 0 002.567 11.04 8.466 8.466 0 1019.2 8.8a.736.736 0 01.514-.902.735.735 0 01.901.514c.233.85.352 1.731.352 2.628 0 5.486-4.448 9.933-9.934 9.933-5.486 0-9.933-4.447-9.933-9.933s4.447-9.933 9.933-9.933zm3.68 11.96c.5 0 .854.49.696.965-.644 1.933-2.385 3.261-4.376 3.261-1.99 0-3.732-1.328-4.375-3.261a.733.733 0 01.597-.959l.098-.006h7.36zm-1.195 1.466h-4.97l.101.131a3.115 3.115 0 002.012 1.14l.198.018.174.005c.868 0 1.672-.38 2.254-1.012l.13-.15.101-.132zM7.353 7.547c.374 0 .683.28.728.641l.006.092v1.84a.734.734 0 01-1.461.092l-.006-.092V8.28c0-.405.328-.733.733-.733zm7.36 0c.374 0 .683.28.728.641l.006.092v1.84a.734.734 0 01-1.461.092l-.006-.092V8.28c0-.405.328-.733.733-.733zM18.398 0c.405 0 .733.328.733.733v2.218h2.209a.734.734 0 010 1.467h-2.21v2.209a.732.732 0 11-1.466 0V4.418h-2.217a.734.734 0 110-1.466l2.216-.001.001-2.218c0-.405.328-.733.733-.733z"
});

function SvgIconReactionsAdd(props) {
  return React.createElement("svg", _extends$u({
    viewBox: "0 0 22 22"
  }, props), _ref$u);
}

function _extends$v() { _extends$v = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$v.apply(this, arguments); }

var _ref$v =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-emoji-reactions-add_svg__fill",
  fillOpacity: 0.38,
  fillRule: "evenodd",
  d: "M10.03 1.006c.828 0 1.643.112 2.426.33a.666.666 0 11-.357 1.284 7.741 7.741 0 00-2.069-.28 7.697 7.697 0 107.697 7.696c0-.696-.092-1.379-.272-2.037a.667.667 0 011.287-.352c.21.773.319 1.574.319 2.39a9.03 9.03 0 01-9.03 9.03 9.03 9.03 0 11-.001-18.06zm3.346 10.873c.455 0 .776.445.632.877-.585 1.757-2.168 2.965-3.978 2.965s-3.392-1.208-3.978-2.965a.667.667 0 01.538-.87l.095-.007h6.69zm-1.087 1.333H7.771l.092.12c.46.563 1.103.938 1.813 1.033l.196.018.158.005c.784 0 1.512-.341 2.04-.91l.128-.147.091-.12zM6.685 6.86c.34 0 .62.254.661.583l.006.083V9.2a.667.667 0 01-1.329.084L6.018 9.2V7.527c0-.368.299-.666.667-.666zm6.69 0c.34 0 .621.254.662.583l.005.083V9.2a.667.667 0 01-1.328.084L12.71 9.2V7.527c0-.368.299-.666.667-.666zM16.726 0c.368 0 .667.298.667.667l-.001 2.016H19.4a.667.667 0 010 1.334l-2.01-.001.002 2.008a.667.667 0 01-1.334 0V4.016h-2.016a.666.666 0 110-1.333h2.016V.667c0-.369.299-.667.667-.667z"
});

function SvgIconEmojiReactionsAdd(props) {
  return React.createElement("svg", _extends$v({
    viewBox: "0 0 20 20"
  }, props), _ref$v);
}

function _extends$w() { _extends$w = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$w.apply(this, arguments); }

var _ref$w =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-delivered_svg__fill",
  fillOpacity: 0.38,
  fillRule: "evenodd",
  d: "M2.207 11.793l5 5a1 1 0 01-1.414 1.414l-5-5a1 1 0 011.414-1.414zm19.586-6a1 1 0 011.414 1.414l-11 11a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414l4.293 4.293zm-3.586 0a1 1 0 010 1.414l-5.999 5.999a1 1 0 01-1.414-1.414l5.999-6a1 1 0 011.414 0z"
});

function SvgIconDelivered(props) {
  return React.createElement("svg", _extends$w({
    viewBox: "0 0 24 24"
  }, props), _ref$w);
}

function _extends$x() { _extends$x = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$x.apply(this, arguments); }

var _ref$x =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-disconnected_svg__fill",
  fillRule: "evenodd",
  d: "M3.55 2.276l.093.081L10.9 9.615a.895.895 0 01.148.147l10.594 10.595a.91.91 0 01-1.193 1.367l-.093-.081-5.015-5.015a.913.913 0 01-.705-.15 4.545 4.545 0 00-5.265 0 .91.91 0 01-1.053-1.483 6.358 6.358 0 014.24-1.151l-2.529-2.53c-1.4.316-2.706.96-3.81 1.883a.91.91 0 01-1.167-1.394 10.854 10.854 0 013.504-1.962L6.445 7.728a13.518 13.518 0 00-3.461 2.226.909.909 0 01-1.204-1.362 15.38 15.38 0 013.299-2.229l-2.722-2.72A.91.91 0 013.55 2.276zm13.14 8.052c.812.397 1.572.894 2.262 1.479a.908.908 0 11-1.177 1.386 9.015 9.015 0 00-1.883-1.23.91.91 0 01.798-1.635zm5.53-1.737a.91.91 0 01-1.203 1.363A13.642 13.642 0 0010.9 6.588a.91.91 0 01-.146-1.813A15.457 15.457 0 0122.22 8.591z"
});

function SvgIconDisconnected(props) {
  return React.createElement("svg", _extends$x({
    viewBox: "0 0 24 24"
  }, props), _ref$x);
}

function _extends$y() { _extends$y = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$y.apply(this, arguments); }

var _ref$y =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-document_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M14 1a1.01 1.01 0 01.25.031l.03.009c.03.009.061.02.091.031l.027.012a.914.914 0 01.195.112c.04.03.078.062.114.098l-.093-.082.011.009.082.073 6 6a1.006 1.006 0 01.21.309l.012.027c.012.03.022.06.031.091l.008.03A.921.921 0 0121 8l-.008-.126.001.01L21 8v12a3 3 0 01-3 3H6a3 3 0 01-3-3V4a3 3 0 013-3h8zm-1 2H6a1 1 0 00-1 1v16a1 1 0 001 1h12a1 1 0 001-1V9h-5a1 1 0 01-.993-.883L13 8V3zm4.585 4L15 4.415V7h2.585z"
});

function SvgIconDocument(props) {
  return React.createElement("svg", _extends$y({
    viewBox: "0 0 24 24"
  }, props), _ref$y);
}

function _extends$z() { _extends$z = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$z.apply(this, arguments); }

var _ref$z =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-download_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M21 16a1 1 0 01.993.883L22 17v3a3 3 0 01-2.824 2.995L19 23H5a3 3 0 01-2.995-2.824L2 20v-3a1 1 0 011.993-.117L4 17v3a1 1 0 00.883.993L5 21h14a1 1 0 00.993-.883L20 20v-3a1 1 0 011-1zM12 1a1 1 0 01.993.883L13 2v11.585l2.293-2.292a1 1 0 011.32-.083l.094.083a1 1 0 01.083 1.32l-.083.094-4 4a1.006 1.006 0 01-.09.08l.09-.08a1.008 1.008 0 01-.674.292L12 17h-.032l-.054-.004L12 17a1.008 1.008 0 01-.613-.21 1.037 1.037 0 01-.094-.083l-4-4a1 1 0 011.32-1.497l.094.083L11 13.585V2a1 1 0 011-1z"
});

function SvgIconDownload(props) {
  return React.createElement("svg", _extends$z({
    viewBox: "0 0 24 24"
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
  className: "icon-file-audio_svg__fill",
  fill: "#7B53EF",
  d: "M18.815 9.185c2.913 2.934 2.913 7.696 0 10.63a.617.617 0 01-.894-.013.67.67 0 01.012-.925 6.215 6.215 0 000-8.754.67.67 0 01-.012-.925.617.617 0 01.894-.013zm-5.291 0a.646.646 0 011.044.517v9.596c0 .544-.62.85-1.044.516l-3.31-2.702H7.646A.65.65 0 017 16.458v-3.916a.65.65 0 01.647-.654h2.566zm2.886 2.42a4.113 4.113 0 010 5.783.617.617 0 01-.893-.012.67.67 0 01.012-.925 2.772 2.772 0 000-3.908.67.67 0 01-.012-.925.617.617 0 01.893-.013z"
}));

function SvgIconFileAudio(props) {
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
  return React.createElement("svg", _extends$B({
    viewBox: "0 0 28 28"
  }, props), _ref$B);
}

function _extends$C() { _extends$C = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$C.apply(this, arguments); }

var _ref$C =
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
  return React.createElement("svg", _extends$C({
    viewBox: "0 0 56 56"
  }, props), _ref$C);
}

function _extends$D() { _extends$D = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$D.apply(this, arguments); }

var _ref$D =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-info_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zm0 2a9 9 0 100 18 9 9 0 000-18zm0 8a1 1 0 011 1v4a1 1 0 01-2 0v-4a1 1 0 011-1zm0-3a1 1 0 110 2 1 1 0 010-2z"
});

function SvgIconInfo(props) {
  return React.createElement("svg", _extends$D({
    viewBox: "0 0 24 24"
  }, props), _ref$D);
}

function _extends$E() { _extends$E = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$E.apply(this, arguments); }

var _ref$E =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-leave_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M12 2a1 1 0 01.117 1.993L12 4H4a1 1 0 00-.993.883L3 5v14a1 1 0 00.883.993L4 20h8a1 1 0 01.117 1.993L12 22H4a3 3 0 01-2.995-2.824L1 19V5a3 3 0 012.824-2.995L4 2h8zm6.613 5.21l.094.083 4 4a1 1 0 01.083 1.32l-.083.094-4 4a1 1 0 01-1.497-1.32l.083-.094 1.792-1.793H7.5a1 1 0 01-.117-1.993L7.5 11.5h12.585l-2.792-2.793a1 1 0 01-.083-1.32l.083-.094a1 1 0 011.32-.083z"
});

function SvgIconLeave(props) {
  return React.createElement("svg", _extends$E({
    viewBox: "0 0 24 24"
  }, props), _ref$E);
}

function _extends$F() { _extends$F = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$F.apply(this, arguments); }

var _ref$F =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-members_svg__fill",
  fillRule: "evenodd",
  d: "M13 14a5 5 0 014.995 4.783L18 19v2a1 1 0 01-1.993.117L16 21v-2a3 3 0 00-2.824-2.995L13 16H5a3 3 0 00-2.995 2.824L2 19v2a1 1 0 01-1.993.117L0 21v-2a5 5 0 014.783-4.995L5 14h8zm7.25.162a5 5 0 013.745 4.611L24 19v2a1 1 0 01-1.993.117L22 21v-2a3 3 0 00-2.25-2.902 1 1 0 11.5-1.936zM9 2a5 5 0 110 10A5 5 0 019 2zm7.248.161a5 5 0 010 9.688 1 1 0 01-.496-1.938 3 3 0 000-5.812 1 1 0 11.496-1.938zM9 4a3 3 0 100 6 3 3 0 000-6z"
});

function SvgIconMembers(props) {
  return React.createElement("svg", _extends$F({
    viewBox: "0 0 24 24"
  }, props), _ref$F);
}

function _extends$G() { _extends$G = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$G.apply(this, arguments); }

var _ref$G =
/*#__PURE__*/
React.createElement("g", {
  className: "icon-message_svg__fill",
  fillRule: "evenodd"
}, React.createElement("path", {
  d: "M32 2.667C48.2 2.667 61.333 15.8 61.333 32S48.2 61.333 32 61.333c-4.455 0-8.679-.993-12.461-2.77l-1.753.58c-5.965 1.912-10.133 2.572-12.504 1.981-2.799-.698-3.351-1.919-1.657-3.663 1.171-1.396 2.147-3.14 2.928-5.234.622-1.668.377-4.001-.737-7A29.15 29.15 0 012.666 32C2.667 15.8 15.8 2.667 32 2.667zM32 8C18.745 8 8 18.745 8 32c0 3.5.747 6.88 2.168 9.978l.405.837.137.271.106.285c1.517 4.085 1.89 7.622.734 10.72l-.382.972-.192.433.235-.05a62.067 62.067 0 004.886-1.363l1.721-.568 2.04-.696 1.95.917A23.882 23.882 0 0032 56c13.255 0 24-10.745 24-24S45.255 8 32 8zM18.667 29.333a2.667 2.667 0 11-.001 5.333 2.667 2.667 0 01.001-5.333zm13.333 0a2.667 2.667 0 110 5.334 2.667 2.667 0 010-5.334zm13.333 0a2.667 2.667 0 110 5.334 2.667 2.667 0 010-5.334z"
}));

function SvgIconMessage(props) {
  return React.createElement("svg", _extends$G({
    viewBox: "0 0 64 64"
  }, props), _ref$G);
}

function _extends$H() { _extends$H = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$H.apply(this, arguments); }

var _ref$H =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-notifications_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M13.73 20a1 1 0 01.865 1.502 3 3 0 01-5.19 0 1 1 0 01.752-1.496L10.27 20h3.46zM12 1a8 8 0 017.996 7.75L20 9v5a2 2 0 001.85 1.995l.283.012c1.111.12 1.154 1.73.128 1.965l-.128.021L22 18H2l-.133-.007c-1.156-.124-1.156-1.862 0-1.986l.282-.012a2 2 0 001.845-1.838L4 14V9a8 8 0 018-8zm0 2a6 6 0 00-5.996 5.775L6 9v5c0 .586-.126 1.142-.352 1.643l-.103.212-.082.145h13.073l-.08-.145a3.973 3.973 0 01-.43-1.402l-.021-.253L18 14V9a6 6 0 00-6-6z"
});

function SvgIconNotifications(props) {
  return React.createElement("svg", _extends$H({
    viewBox: "0 0 24 24"
  }, props), _ref$H);
}

function _extends$I() { _extends$I = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$I.apply(this, arguments); }

var _ref$I =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-photo_svg__fill",
  fillRule: "evenodd",
  d: "M19 2a3 3 0 013 3v14a3 3 0 01-3 3H4.941v-.002l-.117-.003A3 3 0 012 19V5a3 3 0 013-3zm-3 9.415L7.414 20H19a1 1 0 00.993-.883L20 19v-3.585l-4-4zM19 4H5a1 1 0 00-1 1v14a1 1 0 00.65.937L15.292 9.293a1 1 0 011.32-.083l.094.083L20 12.585V5a1 1 0 00-.883-.993L19 4zM8.5 6a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm0 2a.5.5 0 100 1 .5.5 0 000-1z"
});

function SvgIconPhoto(props) {
  return React.createElement("svg", _extends$I({
    viewBox: "0 0 24 24"
  }, props), _ref$I);
}

function _extends$J() { _extends$J = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$J.apply(this, arguments); }

var _ref$J =
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
  return React.createElement("svg", _extends$J({
    viewBox: "0 0 56 56"
  }, props), _ref$J);
}

function _extends$K() { _extends$K = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$K.apply(this, arguments); }

var _ref$K =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-plus_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M13 11h7c1.333 0 1.333 2 0 2h-7v7c0 1.333-2 1.333-2 0v-7H4c-1.333 0-1.333-2 0-2h7V4c0-1.333 2-1.333 2 0v7z"
});

function SvgIconPlus(props) {
  return React.createElement("svg", _extends$K({
    viewBox: "0 0 24 24"
  }, props), _ref$K);
}

function _extends$L() { _extends$L = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$L.apply(this, arguments); }

var _ref$L =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-read_svg__fill",
  fill: "#2EBA9F",
  fillRule: "evenodd",
  d: "M2.207 11.793l5 5a1 1 0 01-1.414 1.414l-5-5a1 1 0 011.414-1.414zm19.586-6a1 1 0 011.414 1.414l-11 11a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414l4.293 4.293zm-3.586 0a1 1 0 010 1.414l-5.999 5.999a1 1 0 01-1.414-1.414l5.999-6a1 1 0 011.414 0z"
});

function SvgIconRead(props) {
  return React.createElement("svg", _extends$L({
    viewBox: "0 0 24 24"
  }, props), _ref$L);
}

function _extends$M() { _extends$M = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$M.apply(this, arguments); }

var _ref$M =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-refresh_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M14.419 4.51l.175.167 2.073 1.927V4.167c0-.428.321-.78.736-.828l.097-.006c.427 0 .78.322.828.736l.005.098v5c0 .427-.321.78-.736.827L17.5 10h-5a.833.833 0 01-.097-1.661l.097-.006h3.578L13.44 5.88a5.982 5.982 0 00-7.05-.986C4.083 6.15 2.898 8.756 3.48 11.286c.58 2.534 2.792 4.385 5.425 4.537 2.635.152 5.05-1.433 5.928-3.883a.833.833 0 011.569.561c-1.127 3.15-4.223 5.18-7.593 4.986-3.37-.195-6.206-2.57-6.954-5.828-.748-3.261.778-6.617 3.738-8.229 2.884-1.57 6.453-1.118 8.826 1.08z"
});

function SvgIconRefresh(props) {
  return React.createElement("svg", _extends$M({
    width: 20,
    height: 20
  }, props), _ref$M);
}

function _extends$N() { _extends$N = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$N.apply(this, arguments); }

var _ref$N =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-send_svg__fill",
  fillRule: "evenodd",
  d: "M20.554 10.117L2.52 1.024C1.613.619.605 1.428 1.008 2.337l2.115 5.685a2 2 0 001.545 1.275l10.345 1.73-10.345 1.728a2 2 0 00-1.545 1.275l-2.115 5.685c-.302.91.605 1.718 1.511 1.213l18.035-9.094c.706-.303.706-1.313 0-1.717z"
});

function SvgIconSend(props) {
  return React.createElement("svg", _extends$N({
    viewBox: "0 0 22 22"
  }, props), _ref$N);
}

function _extends$O() { _extends$O = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$O.apply(this, arguments); }

var _ref$O =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-sent_svg__fill",
  fillOpacity: 0.38,
  fillRule: "evenodd",
  d: "M4.707 11.793a1 1 0 10-1.414 1.414l5 5a1 1 0 001.414 0l11-11a1 1 0 10-1.414-1.414L9 16.086l-4.293-4.293z"
});

function SvgIconSent(props) {
  return React.createElement("svg", _extends$O({
    viewBox: "0 0 24 24"
  }, props), _ref$O);
}

function _extends$P() { _extends$P = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$P.apply(this, arguments); }

var _ref$P =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-shevron_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M8.293 17.293a1 1 0 001.414 1.414l6-6a1 1 0 000-1.414l-6-6a1 1 0 00-1.414 1.414L13.586 12l-5.293 5.293z"
});

function SvgIconShevron(props) {
  return React.createElement("svg", _extends$P({
    viewBox: "0 0 24 24"
  }, props), _ref$P);
}

function _extends$Q() { _extends$Q = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$Q.apply(this, arguments); }

var _ref$Q =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-shevron-down_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M6.045 8.205a1.125 1.125 0 10-1.59 1.59l6.75 6.75c.439.44 1.151.44 1.59 0l6.75-6.75a1.125 1.125 0 10-1.59-1.59L12 14.159 6.045 8.205z"
});

function SvgIconShevronDown(props) {
  return React.createElement("svg", _extends$Q({
    viewBox: "0 0 24 24"
  }, props), _ref$Q);
}

function _extends$R() { _extends$R = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$R.apply(this, arguments); }

var _ref$R =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-spinner-small_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M12 22.5c5.799 0 10.5-4.701 10.5-10.5S17.799 1.5 12 1.5 1.5 6.201 1.5 12a1.432 1.432 0 002.864 0A7.636 7.636 0 1112 19.636a1.432 1.432 0 000 2.864z"
});

function SvgIconSpinnerSmall(props) {
  return React.createElement("svg", _extends$R({
    viewBox: "0 0 24 24"
  }, props), _ref$R);
}

function _extends$S() { _extends$S = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$S.apply(this, arguments); }

var _ref$S =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-spinner-large_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M24 48c13.255 0 24-10.745 24-24S37.255 0 24 0 0 10.745 0 24a2.323 2.323 0 104.645 0C4.645 13.31 13.311 4.645 24 4.645c10.69 0 19.355 8.666 19.355 19.355 0 10.69-8.666 19.355-19.355 19.355A2.323 2.323 0 0024 48z"
});

function SvgIconSpinnerLarge(props) {
  return React.createElement("svg", _extends$S({
    viewBox: "0 0 48 48"
  }, props), _ref$S);
}

function _extends$T() { _extends$T = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$T.apply(this, arguments); }

var _ref$T =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-user_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M16 14a5 5 0 014.995 4.783L21 19v2a1 1 0 01-1.993.117L19 21v-2a3 3 0 00-2.824-2.995L16 16H8a3 3 0 00-2.995 2.824L5 19v2a1 1 0 01-1.993.117L3 21v-2a5 5 0 014.783-4.995L8 14h8zM12 2a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z"
});

function SvgIconUser(props) {
  return React.createElement("svg", _extends$T({
    viewBox: "0 0 24 24"
  }, props), _ref$T);
}

function _extends$U() { _extends$U = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$U.apply(this, arguments); }

var _ref$U =
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
  return React.createElement("svg", _extends$U({
    viewBox: "0 0 24 24"
  }, props), _ref$U);
}

function _extends$V() { _extends$V = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$V.apply(this, arguments); }

var _ref$V =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-banned_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zm0 2a9 9 0 10.001 18.001A9 9 0 0012 3zm4 8a1 1 0 010 2H8a1 1 0 010-2h8z"
});

function SvgIconBanned(props) {
  return React.createElement("svg", _extends$V({
    viewBox: "0 0 24 24"
  }, props), _ref$V);
}

function _extends$W() { _extends$W = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$W.apply(this, arguments); }

var _ref$W =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-muted_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M20.857 7.357l.026.045A9.96 9.96 0 0122 12a9.937 9.937 0 01-1.074 4.51c-.38 1.021-.463 1.817-.25 2.386.265.713.598 1.308.997 1.784.578.594.39 1.01-.565 1.249-.763.19-2.073 0-3.929-.571l-.333-.105-.598-.198A9.965 9.965 0 0112 22a9.952 9.952 0 01-4.622-1.13l-.022-.011 1.5-1.5c.982.42 2.046.641 3.144.641 1.073 0 2.114-.21 3.079-.613l.318-.142.722-.339 1.355.449.26.082c.228.07.445.133.65.19l.298.08.182.045-.063-.157-.075-.223c-.295-.974-.189-2.057.225-3.275l.1-.284.04-.107.198-.406A7.949 7.949 0 0020 12a7.97 7.97 0 00-.64-3.143l1.497-1.5zM12 2c2.401 0 4.604.846 6.328 2.257l1.965-1.964a1 1 0 011.497 1.32l-.083.094-18 18a1 1 0 01-1.497-1.32l.083-.094 1.963-1.965a9.956 9.956 0 01-2.25-5.998L2 12C2 6.477 6.477 2 12 2zm0 2a8 8 0 00-6.32 12.906L16.905 5.68a7.957 7.957 0 00-4.607-1.675L12 4z"
});

function SvgIconMuted(props) {
  return React.createElement("svg", _extends$W({
    viewBox: "0 0 24 24"
  }, props), _ref$W);
}

function _extends$X() { _extends$X = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$X.apply(this, arguments); }

var _ref$X =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-muted-foreground_svg__fill",
  fill: "#FFF",
  fillOpacity: 0.88,
  fillRule: "evenodd",
  d: "M13.904 4.904l.018.03c.476.919.745 1.96.745 3.066a6.628 6.628 0 01-.716 3.006c-.253.682-.309 1.212-.168 1.591.178.476.4.872.666 1.19.385.396.26.674-.377.832-.503.125-1.361.003-2.576-.367l-.266-.083-.398-.132c-.86.404-1.82.63-2.832.63a6.632 6.632 0 01-3.082-.754l-.014-.007 1-1c.655.28 1.364.427 2.096.427a5.32 5.32 0 001.999-.386l.266-.117.481-.226.903.299.174.055c.152.047.296.089.433.126l.199.054.121.03-.042-.105-.05-.149c-.192-.635-.129-1.34.133-2.132l.084-.24.026-.071.132-.271a5.294 5.294 0 00.474-2.2c0-.732-.147-1.44-.427-2.096l.998-1zm.567-3.375c.24.24.26.618.056.88l-.056.062-12 12a.666.666 0 01-.998-.88l.056-.062 1.31-1.31a6.636 6.636 0 01-1.5-3.94L1.333 8A6.667 6.667 0 0112.22 2.838l1.309-1.31c.26-.26.682-.26.942 0zM8 2.667a5.332 5.332 0 00-4.213 8.603l7.484-7.484a5.32 5.32 0 00-3.006-1.113L8 2.667z"
});

function SvgIconMutedForeground(props) {
  return React.createElement("svg", _extends$X({
    viewBox: "0 0 16 16"
  }, props), _ref$X);
}

function _extends$Y() { _extends$Y = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$Y.apply(this, arguments); }

var _ref$Y =
/*#__PURE__*/
React.createElement("path", {
  className: "icon-freeze_svg__fill",
  fill: "#7B53EF",
  fillRule: "evenodd",
  d: "M9.613 1.21l.095.083L12 3.585l2.293-2.292a1 1 0 011.32-.083l.095.083a1 1 0 01.083 1.32l-.083.094L13 5.414v4.853l4.203-2.427.992-3.697a1 1 0 011.957.395l-.025.123-.84 3.131 3.133.84c.492.132.8.61.732 1.102l-.025.123c-.132.492-.61.8-1.102.732l-.123-.025-3.698-.991L14.001 12l4.203 2.426 3.698-.99.123-.025c.492-.068.97.24 1.102.732l.025.123a1 1 0 01-.732 1.102l-3.133.839.84 3.132.025.123a1 1 0 01-1.957.395l-.992-3.698L13 13.732v4.853l2.708 2.708a1 1 0 01-1.32 1.497l-.095-.083L12 20.414l-2.292 2.293a1 1 0 01-1.32.083l-.095-.083a1 1 0 01-.083-1.32l.083-.094L11 18.585v-4.853l-4.203 2.427-.99 3.698a1.002 1.002 0 01-1.958-.395l.025-.123.839-3.131-3.132-.84c-.492-.132-.8-.61-.732-1.102l.025-.123c.132-.492.61-.8 1.102-.732l.123.025 3.697.99 4.203-2.427-4.203-2.426-3.697.991-.123.025c-.492.068-.97-.24-1.102-.732L.85 9.734a1 1 0 01.732-1.102l3.132-.84-.839-3.131-.025-.123a1 1 0 011.957-.395l.991 3.697L11 10.267V5.414L8.293 2.707a1 1 0 011.32-1.497z"
});

function SvgIconFreeze(props) {
  return React.createElement("svg", _extends$Y({
    viewBox: "0 0 24 24"
  }, props), _ref$Y);
}

function _extends$Z() { _extends$Z = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$Z.apply(this, arguments); }

var _ref$Z =
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
  return React.createElement("svg", _extends$Z({
    viewBox: "0 0 44 24"
  }, props), _ref$Z);
}

function _extends$_() { _extends$_ = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$_.apply(this, arguments); }

var _ref$_ =
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
  return React.createElement("svg", _extends$_({
    viewBox: "0 0 44 24"
  }, props), _ref$_);
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
  ON_BACKGROUND_2: 'ON_BACKGROUND_2',
  ON_BACKGROUND_3: 'ON_BACKGROUND_3',
  BACKGROUND_3: 'BACKGROUND_3'
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

    case Colors.ON_BACKGROUND_2:
      return 'sendbird-color--on-background-2';

    case Colors.ON_BACKGROUND_3:
      return 'sendbird-color--on-background-3';

    case Colors.BACKGROUND_3:
      return 'sendbird-color--background-3';

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

    case Type.AVATAR_NO_IMAGE:
      return React.createElement(SvgAvatarNoImageLight, null);

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

    case Type.MESSAGE:
      return React.createElement(SvgIconMessage, null);

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
    minWidth: typeof width === 'string' ? width : "".concat(width, "px"),
    height: typeof height === 'string' ? height : "".concat(height, "px"),
    minHeight: typeof height === 'string' ? height : "".concat(height, "px")
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
      _onBlur = props.onBlur,
      style = props.style;

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
      style: _objectSpread2({}, style, {
        height: height,
        width: width
      }),
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
  onBlur: PropTypes.func,
  style: PropTypes.shape({})
};
IconButton.defaultProps = {
  height: '56px',
  width: '56px',
  className: '',
  type: 'button',
  disabled: false,
  onClick: function onClick() {},
  onBlur: function onBlur() {},
  style: {}
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

function Types() {
  return {
    LOADING: 'LOADING',
    NO_CHANNELS: 'NO_CHANNELS',
    NO_MESSAGES: 'NO_MESSAGES',
    WRONG: 'WRONG'
  };
}
var PlaceHolderTypes = Types();

var SEND_MESSAGE_START = 'SEND_MESSAGE_START';
var SEND_USER_MESSAGE = 'SEND_USER_MESSAGE';
var SEND_FILE_MESSAGE = 'SEND_FILE_MESSAGE';
var UPDATE_USER_MESSAGE = 'UPDATE_USER_MESSAGE';
var DELETE_MESSAGE = 'DELETE_MESSAGE';
var LEAVE_CHANNEL = 'LEAVE_CHANNEL';
var CREATE_CHANNEL = 'CREATE_CHANNEL';

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
        pubsub.publish(CREATE_CHANNEL, {
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

var getCreateOpenChannel = function getCreateOpenChannel(store) {
  return function (params) {
    var sdk = getSdk(store);
    return new Promise(function (resolve, reject) {
      if (!sdk) {
        reject(new Error('Sdk not found'));
      }

      sdk.OpenChannel.createChannel(params).then(function (channel) {
        resolve(channel);
      }).catch(reject);
    });
  };
};

var enterOpenChannel = function enterOpenChannel(store) {
  return function (channelUrl) {
    var sdk = getSdk(store);
    return new Promise(function (resolve, reject) {
      if (!sdk) {
        reject(new Error('Sdk not found'));
      }

      sdk.OpenChannel.getChannel(channelUrl, function (openChannel, error) {
        if (error) {
          reject(new Error(error));
          return;
        }

        openChannel.enter(function (response, enterError) {
          if (error) {
            reject(new Error(enterError));
            return;
          }

          resolve(response);
        });
      });
    });
  };
};

var exitOpenChannel = function exitOpenChannel(store) {
  return function (channelUrl) {
    var sdk = getSdk(store);
    return new Promise(function (resolve, reject) {
      if (!sdk) {
        reject(new Error('Sdk not found'));
      }

      sdk.OpenChannel.getChannel(channelUrl, function (openChannel, error) {
        if (error) {
          reject(new Error(error));
          return;
        }

        openChannel.exit(function (response, exitError) {
          if (error) {
            reject(new Error(exitError));
            return;
          }

          resolve(response);
        });
      });
    });
  };
};

var getOpenChannelSendUserMessage = function getOpenChannelSendUserMessage(store) {
  return function (channelUrl, userMessageParams) {
    var sdk = getSdk(store);
    var pubsub = getPubSub(store);
    return new Promise(function (resolve, reject) {
      if (!sdk) {
        reject(new Error('Sdk not found'));
      }

      sdk.OpenChannel.getChannel(channelUrl).then(function (channel) {
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

var getOpenChannelSendFileMessage = function getOpenChannelSendFileMessage(store) {
  return function (channelUrl, fileMessageParams) {
    var sdk = getSdk(store);
    var pubsub = getPubSub(store);
    return new Promise(function (resolve, reject) {
      if (!sdk) {
        reject(new Error('Sdk not found'));
      }

      sdk.OpenChannel.getChannel(channelUrl).then(function (channel) {
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

var getOpenChannelUpdateUserMessage = function getOpenChannelUpdateUserMessage(store) {
  return function (channelUrl, messageId, params) {
    var sdk = getSdk(store);
    var pubsub = getPubSub(store);
    return new Promise(function (resolve, reject) {
      if (!sdk) {
        reject(new Error('Sdk not found'));
      }

      sdk.OpenChannel.getChannel(channelUrl).then(function (channel) {
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

var getOpenChannelDeleteMessage = function getOpenChannelDeleteMessage(store) {
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

var getOpenChannelResendUserMessage = function getOpenChannelResendUserMessage(store) {
  return function (channelUrl, failedMessage) {
    var sdk = getSdk(store);
    var pubsub = getPubSub(store);
    return new Promise(function (resolve, reject) {
      if (!sdk) {
        reject(new Error('Sdk not found'));
      }

      sdk.OpenChannel.getChannel(channelUrl).then(function (channel) {
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

var getOpenChannelResendFileMessage = function getOpenChannelResendFileMessage(store) {
  return function (channelUrl, failedMessage) {
    var sdk = getSdk(store);
    var pubsub = getPubSub(store);
    return new Promise(function (resolve, reject) {
      if (!sdk) {
        reject(new Error('Sdk not found'));
      }

      sdk.OpenChannel.getChannel(channelUrl).then(function (channel) {
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
  getLeaveChannel: getLeaveChannel,
  getCreateOpenChannel: getCreateOpenChannel,
  enterOpenChannel: enterOpenChannel,
  exitOpenChannel: exitOpenChannel,
  getOpenChannelSendUserMessage: getOpenChannelSendUserMessage,
  getOpenChannelSendFileMessage: getOpenChannelSendFileMessage,
  getOpenChannelUpdateUserMessage: getOpenChannelUpdateUserMessage,
  getOpenChannelDeleteMessage: getOpenChannelDeleteMessage,
  getOpenChannelResendUserMessage: getOpenChannelResendUserMessage,
  getOpenChannelResendFileMessage: getOpenChannelResendFileMessage
};

function UserProfile(_a) {
  var user = _a.user,
      currentUserId = _a.currentUserId,
      sdk = _a.sdk,
      logger = _a.logger,
      _b = _a.disableMessaging,
      disableMessaging = _b === void 0 ? false : _b,
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
  }, user.nickname || stringSet.NO_NAME)), user.userId !== currentUserId && !disableMessaging && React.createElement("section", {
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

var mapStoreToProps = function mapStoreToProps(store) {
  return {
    sdk: getSdk(store),
    createChannel: getCreateChannel(store),
    logger: store.config.logger,
    pubsub: store.config.pubSub
  };
};

var ConnectedUserProfile = withSendbirdContext(UserProfile, mapStoreToProps);

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

var PlaceHolderTypes$1 = PlaceHolderTypes;
function PlaceHolder(_ref) {
  var className = _ref.className,
      type = _ref.type,
      retryToConnect = _ref.retryToConnect;

  var _useContext = useContext(LocalizationContext),
      stringSet = _useContext.stringSet;

  var injectingClassName = Array.isArray(className) ? className : [className];
  return React.createElement("div", {
    className: [].concat(_toConsumableArray(injectingClassName), ['sendbird-place-holder']).join(' ')
  }, type === PlaceHolderTypes$1.LOADING && React.createElement(Loader, {
    width: "48px",
    height: "48px"
  }, React.createElement(Icon, {
    type: IconTypes.SPINNER_LARGE,
    width: "48px",
    height: "48px"
  })), (type === PlaceHolderTypes$1.NO_CHANNELS || type === PlaceHolderTypes$1.NO_MESSAGES || type === PlaceHolderTypes$1.WRONG) && React.createElement("div", {
    className: "sendbird-place-holder__body"
  }, type === PlaceHolderTypes$1.NO_CHANNELS && React.createElement(Icon, {
    className: "sendbird-place-holder__body__icon",
    type: IconTypes.CHAT,
    fillColor: IconColors.ON_BACKGROUND_3,
    width: "64px",
    height: "64px"
  }), type === PlaceHolderTypes$1.WRONG && React.createElement(Icon, {
    className: "sendbird-place-holder__body__icon",
    type: IconTypes.ERROR,
    fillColor: IconColors.ON_BACKGROUND_3,
    width: "64px",
    height: "64px"
  }), type === PlaceHolderTypes$1.NO_MESSAGES && React.createElement(Icon, {
    className: "sendbird-place-holder__body__icon",
    type: IconTypes.MESSAGE,
    fillColor: IconColors.ON_BACKGROUND_3,
    width: "64px",
    height: "64px"
  }), React.createElement(Label, {
    className: "sendbird-place-holder__body__text",
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_2
  }, type === PlaceHolderTypes$1.NO_CHANNELS && stringSet.PLACE_HOLDER__NO_CHANNEL, type === PlaceHolderTypes$1.WRONG && stringSet.PLACE_HOLDER__WRONG, type === PlaceHolderTypes$1.NO_MESSAGES && stringSet.PLACE_HOLDER__NO_MESSAGES), retryToConnect && React.createElement("div", {
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
  }, stringSet.PLACE_HOLDER__RETRY_TO_CONNECT))));
}
PlaceHolder.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  type: PropTypes.oneOfType([PropTypes.oneOf(Object.keys(PlaceHolderTypes$1)), PropTypes.string]).isRequired,
  retryToConnect: PropTypes.func
};
PlaceHolder.defaultProps = {
  className: '',
  retryToConnect: null
};

export { Avatar$1 as A, Button as B, ContextMenu as C, DELETE_MESSAGE as D, EmojiListItems$1 as E, selectors as F, Icon as I, LabelStringSet as L, Modal as M, PlaceHolder as P, SEND_MESSAGE_START as S, Type$1 as T, UPDATE_USER_MESSAGE as U, IconTypes as a, Label as b, LabelTypography as c, LabelColors as d, IconButton as e, TextButton as f, IconColors as g, MenuItems$1 as h, MenuItem as i, CREATE_CHANNEL as j, LEAVE_CHANNEL as k, UserProfileProvider as l, PlaceHolderTypes as m, UserProfileContext as n, ConnectedUserProfile as o, SEND_USER_MESSAGE as p, SEND_FILE_MESSAGE as q, ImageRenderer as r, Loader as s, PlaceHolderTypes$1 as t, Colors$2 as u, changeColorToClassName$2 as v, Size as w, MODAL_ROOT as x, changeColorToClassName$1 as y, getSdk as z };
//# sourceMappingURL=index-a2b521ce.js.map
