'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var LocalizationContext = require('./LocalizationContext-6447a7a3.js');
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var index = require('./index-43aca630.js');

var InputLabel = function InputLabel(_ref) {
  var children = _ref.children;
  return React__default.createElement(index.Label, {
    type: index.LabelTypography.CAPTION_3,
    color: index.LabelColors.ONBACKGROUND_1,
    className: "sendbird-input-label"
  }, children);
};
InputLabel.propTypes = {
  children: PropTypes.string.isRequired
}; // future: add validations? onChange? more props etc etc

var Input = React__default.forwardRef(function (props, ref) {
  var value = props.value,
      placeHolder = props.placeHolder,
      disabled = props.disabled,
      name = props.name,
      required = props.required;

  var _useState = React.useState(value),
      _useState2 = LocalizationContext._slicedToArray(_useState, 2),
      inputValue = _useState2[0],
      setInputValue = _useState2[1];

  return React__default.createElement("div", {
    className: "sendbird-input"
  }, React__default.createElement("input", {
    required: required,
    ref: ref,
    name: name,
    disabled: disabled,
    value: inputValue,
    className: "sendbird-input--input",
    onChange: function onChange(e) {
      setInputValue(e.target.value);
    }
  }), placeHolder && !inputValue && React__default.createElement(index.Label, {
    className: "sendbird-input--placeholder",
    type: index.LabelTypography.BODY_1,
    color: index.LabelColors.ONBACKGROUND_3
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

function MutedAvatarOverlay(props) {
  var _a = props.height,
      height = _a === void 0 ? 24 : _a,
      _b = props.width,
      width = _b === void 0 ? 24 : _b;
  return React__default.createElement("div", {
    className: "sendbird-muted-avatar",
    style: {
      height: height + "px",
      width: width + "px"
    }
  }, React__default.createElement("div", {
    className: "sendbird-muted-avatar__icon"
  }, React__default.createElement("div", {
    className: "sendbird-muted-avatar__bg",
    style: {
      height: height + "px",
      width: width + "px"
    }
  }), React__default.createElement(index.Icon, {
    type: index.IconTypes.MUTE,
    fillColor: index.IconColors.WHITE,
    width: height - 8 + "px",
    height: width - 8 + "px"
  })));
}

function Checkbox(_ref) {
  var id = _ref.id,
      checked = _ref.checked,
      onChange = _ref.onChange;

  var _useState = React.useState(checked),
      _useState2 = LocalizationContext._slicedToArray(_useState, 2),
      isChecked = _useState2[0],
      setCheck = _useState2[1];

  return React__default.createElement("label", {
    className: "sendbird-checkbox",
    htmlFor: id
  }, React__default.createElement("input", {
    id: id,
    type: "checkbox",
    checked: isChecked,
    onClick: function onClick() {
      return setCheck(!isChecked);
    },
    onChange: onChange
  }), React__default.createElement("span", {
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

var COMPONENT_NAME = 'sendbird-user-list-item';
function UserListItem(_ref) {
  var user = _ref.user,
      className = _ref.className,
      checkBox = _ref.checkBox,
      _ref$disableMessaging = _ref.disableMessaging,
      disableMessaging = _ref$disableMessaging === void 0 ? false : _ref$disableMessaging,
      currentUser = _ref.currentUser,
      checked = _ref.checked,
      _onChange = _ref.onChange,
      action = _ref.action;
  var injectingClassNames = Array.isArray(className) ? className : [className];
  var uniqueKey = user.userId;
  var actionRef = React__default.useRef(null);
  var parentRef = React__default.useRef(null);
  var avatarRef = React__default.useRef(null);

  var _useContext = React.useContext(index.UserProfileContext),
      disableUserProfile = _useContext.disableUserProfile,
      renderUserProfile = _useContext.renderUserProfile;

  var _useContext2 = React.useContext(LocalizationContext.LocalizationContext),
      stringSet = _useContext2.stringSet;

  return React__default.createElement("div", {
    ref: parentRef,
    className: [COMPONENT_NAME].concat(LocalizationContext._toConsumableArray(injectingClassNames)).join(' ')
  }, user.isMuted && React__default.createElement(MutedAvatarOverlay, {
    height: 40,
    width: 40
  }), React__default.createElement(index.ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return React__default.createElement(index.Avatar, {
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
      return React__default.createElement(index.MenuItems, {
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
      }) : React__default.createElement(index.UserProfile, {
        disableMessaging: disableMessaging,
        user: user,
        currentUserId: currentUser,
        onSuccess: closeDropdown
      }));
    }
  }), React__default.createElement(index.Label, {
    className: "".concat(COMPONENT_NAME, "__title"),
    type: index.LabelTypography.SUBTITLE_1,
    color: index.LabelColors.ONBACKGROUND_1
  }, user.nickname || stringSet.NO_NAME, currentUser === user.userId && ' (You)'), // if there is now nickname, display userId
  !user.nickname && React__default.createElement(index.Label, {
    className: "".concat(COMPONENT_NAME, "__subtitle"),
    type: index.LabelTypography.CAPTION_3,
    color: index.LabelColors.ONBACKGROUND_2
  }, user.userId), checkBox && // eslint-disable-next-line jsx-a11y/label-has-associated-control
  React__default.createElement("label", {
    className: "".concat(COMPONENT_NAME, "__checkbox"),
    htmlFor: uniqueKey
  }, React__default.createElement(Checkbox, {
    id: uniqueKey,
    checked: checked,
    onChange: function onChange(event) {
      return _onChange(event);
    }
  })), user.role === 'operator' && React__default.createElement(index.Label, {
    className: "".concat(COMPONENT_NAME, "__operator"),
    type: index.LabelTypography.SUBTITLE_2,
    color: index.LabelColors.ONBACKGROUND_2
  }, "Operator"), action && React__default.createElement("div", {
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
  disableMessaging: PropTypes.bool,
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
  disableMessaging: false,
  checked: false,
  action: null,
  onChange: function onChange() {}
};

exports.Input = Input;
exports.InputLabel = InputLabel;
exports.MutedAvatarOverlay = MutedAvatarOverlay;
exports.UserListItem = UserListItem;
//# sourceMappingURL=index-00d55707.js.map
