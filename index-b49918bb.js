import { b as _slicedToArray, e as LocalizationContext, c as _toConsumableArray } from './LocalizationContext-5c5b45a0.js';
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { b as Label, c as LabelTypography, d as LabelColors, I as Icon, g as IconColors, a as IconTypes, n as UserProfileContext, C as ContextMenu, A as Avatar, h as MenuItems, o as UserProfile } from './index-a2b521ce.js';

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
      return React.createElement(Avatar, {
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
      return React.createElement(MenuItems, {
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
      }) : React.createElement(UserProfile, {
        disableMessaging: disableMessaging,
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

export { InputLabel as I, MutedAvatarOverlay as M, UserListItem as U, Input as a };
//# sourceMappingURL=index-b49918bb.js.map
