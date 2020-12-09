'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var LocalizationContext = require('./LocalizationContext-7c9df62c.js');
var React = require('react');
var React__default = _interopDefault(React);
require('prop-types');
var index$1 = require('./index-710314fd.js');
var format = _interopDefault(require('date-fns/format'));
require('react-dom');
var index$2$1 = require('./index-95b18747.js');
var isSameDay = _interopDefault(require('date-fns/isSameDay'));

var getMessageCreatedAt = function getMessageCreatedAt(message) {
  return format(message.createdAt, 'p');
};
var scrollIntoLast = function scrollIntoLast(selector, intialTry) {
  if (intialTry === void 0) {
    intialTry = 0;
  }

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
var isSameGroup = function isSameGroup(message, comparingMessage) {
  if (!message || !comparingMessage || message.messageType === 'admin' || comparingMessage.messageType === 'admin') {
    return false;
  }

  return message.sendingStatus === comparingMessage.sendingStatus && message.sender.userId === comparingMessage.sender.userId && getMessageCreatedAt(message) === getMessageCreatedAt(comparingMessage);
};
var compareMessagesForGrouping = function compareMessagesForGrouping(prevMessage, currMessage, nextMessage) {
  return [isSameGroup(prevMessage, currMessage), isSameGroup(currMessage, nextMessage)];
};
var kFormatter = function kFormatter(num) {
  if (Math.abs(num) > 999999) {
    return (Math.abs(num) / 1000000).toFixed(1) + "M";
  }

  if (Math.abs(num) > 999) {
    return (Math.abs(num) / 1000).toFixed(1) + "K";
  }

  return "" + num;
};
var isOperator = function isOperator(openChannel, userId) {
  var operators = openChannel.operators;

  if (operators.map(function (operator) {
    return operator.userId;
  }).indexOf(userId) < 0) {
    return false;
  }

  return true;
};
var isDisabledBecauseFrozen = function isDisabledBecauseFrozen(openChannel, userId) {
  var isFrozen = openChannel.isFrozen;
  return isFrozen && !isOperator(openChannel, userId);
};

var MessageInputWrapper = function MessageInputWrapper(_a, ref) {
  var channel = _a.channel,
      user = _a.user,
      disabled = _a.disabled,
      onSendMessage = _a.onSendMessage,
      onFileUpload = _a.onFileUpload,
      renderMessageInput = _a.renderMessageInput;

  if (!channel) {
    return;
  }

  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;

  if (renderMessageInput) {
    return renderMessageInput({
      channel: channel,
      user: user,
      disabled: disabled
    });
  }

  return React__default.createElement("div", {
    className: "sendbird-openchannel-footer"
  }, React__default.createElement(index$2$1.MessageInput, {
    ref: ref,
    disabled: disabled,
    onSendMessage: onSendMessage,
    onFileUpload: onFileUpload,
    placeholder: disabled && stringSet.CHANNEL__MESSAGE_INPUT__PLACE_HOLDER__DISABLED // add disabled because of muted state

  }));
};

var MessageInputWrapper$1 = React__default.forwardRef(MessageInputWrapper);

var FrozenNotification = function FrozenNotification() {
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  return React__default.createElement("div", {
    className: "sendbird-frozen-channel-notification"
  }, React__default.createElement(index$1.Label, {
    className: "sendbird-frozen-channel-notification__text",
    type: index$1.LabelTypography.CAPTION_2
  }, stringSet.CHANNEL_FROZEN));
};

var COMPONENT_CLASS_NAME = 'sendbird-openchannel-conversation-header';
function OpenchannelConversationHeader(_a) {
  var coverImage = _a.coverImage,
      _b = _a.title,
      title = _b === void 0 ? index$1.LabelStringSet.NO_TITLE : _b,
      _c = _a.subTitle,
      subTitle = _c === void 0 ? index$1.LabelStringSet.NO_TITLE : _c,
      onActionClick = _a.onActionClick;
  return React__default.createElement("div", {
    className: COMPONENT_CLASS_NAME
  }, React__default.createElement("div", {
    className: COMPONENT_CLASS_NAME + "__left"
  }, coverImage ? React__default.createElement(index$1.Avatar, {
    className: COMPONENT_CLASS_NAME + "__left__cover-image",
    src: coverImage,
    alt: "channel cover image",
    width: "32px",
    height: "32px"
  }) : React__default.createElement(index$1.Icon, {
    className: COMPONENT_CLASS_NAME + "__left__cover-image--icon",
    width: "32px",
    height: "32px",
    type: index$1.IconTypes.AVATAR_NO_IMAGE,
    fillColor: index$1.IconColors.BACKGROUND_3
  }), React__default.createElement(index$1.Label, {
    className: COMPONENT_CLASS_NAME + "__left__title",
    type: index$1.LabelTypography.H_2,
    color: index$1.LabelColors.ONBACKGROUND_1
  }, title), React__default.createElement(index$1.Label, {
    className: COMPONENT_CLASS_NAME + "__left__sub-title",
    type: index$1.LabelTypography.BODY_2,
    color: index$1.LabelColors.ONBACKGROUND_2
  }, subTitle)), React__default.createElement("div", {
    className: COMPONENT_CLASS_NAME + "__right"
  }, React__default.createElement(index$1.IconButton, {
    className: COMPONENT_CLASS_NAME + "__right__trigger",
    width: "32px",
    height: "32px",
    onClick: onActionClick
  }, React__default.createElement(index$1.Icon, {
    type: index$1.IconTypes.INFO,
    fillColor: index$1.IconColors.PRIMARY,
    width: "24px",
    height: "24px"
  }))));
}

var copyToClipboard = function copyToClipboard(text) {
  // @ts-ignore: Unreachable code error
  if (window.clipboardData && window.clipboardData.setData) {
    // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
    // @ts-ignore: Unreachable code error
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

var OpenChannelMessageStatusTypes = {
  NONE: 'none',
  PENDING: 'pending',
  FAILED: 'failed',
  CANCELED: 'canceled',
  SUCCEEDED: 'succeeded'
};
var getSenderFromMessage = function getSenderFromMessage(message) {
  return message.sender || message._sender;
};
var checkIsSent = function checkIsSent(status) {
  return status === OpenChannelMessageStatusTypes.SUCCEEDED;
};
var checkIsByMe = function checkIsByMe(message, userId) {
  return getSenderFromMessage(message).userId === userId;
};
var isFineCopy = function isFineCopy(_a) {
  var message = _a.message;
  return message.messageType === 'user' && message.message.length > 0;
};
var isFineResend = function isFineResend(_a) {
  var message = _a.message,
      status = _a.status,
      userId = _a.userId;
  return checkIsByMe(message, userId) && !checkIsSent(status) && message.isResendable && message.isResendable();
};
var isFineEdit = function isFineEdit(_a) {
  var message = _a.message,
      status = _a.status,
      userId = _a.userId;
  return checkIsByMe(message, userId) && checkIsSent(status);
};
var isFineDelete = function isFineDelete(_a) {
  var message = _a.message,
      userId = _a.userId;
  return checkIsByMe(message, userId);
};
var showMenuTrigger = function showMenuTrigger(props) {
  var message = props.message,
      status = props.status,
      userId = props.userId;

  if (message.messageType === 'user') {
    return isFineDelete({
      message: message,
      status: status,
      userId: userId
    }) || isFineEdit({
      message: message,
      status: status,
      userId: userId
    }) || isFineCopy({
      message: message,
      status: status,
      userId: userId
    }) || isFineResend({
      message: message,
      status: status,
      userId: userId
    });
  } else {
    return isFineDelete({
      message: message,
      status: status,
      userId: userId
    }) || isFineResend({
      message: message,
      status: status,
      userId: userId
    });
  }
};

function OpenchannelUserMessage(_a) {
  var message = _a.message,
      className = _a.className,
      userId = _a.userId,
      resendMessage = _a.resendMessage,
      disabled = _a.disabled,
      showEdit = _a.showEdit,
      showRemove = _a.showRemove,
      chainTop = _a.chainTop,
      status = _a.status;

  if (!message || message.messageType !== 'user') {
    return null;
  } // hooks


  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;

  var _b = React.useContext(index$1.UserProfileContext),
      disableUserProfile = _b.disableUserProfile,
      renderUserProfile = _b.renderUserProfile;

  var messageRef = React.useRef(null);
  var avatarRef = React.useRef(null);
  var contextMenuRef = React.useRef(null);

  var _c = React.useState({}),
      contextStyle = _c[0],
      setContextStyle = _c[1]; // consts


  var injectingClassName = Array.isArray(className) ? className : [className];
  injectingClassName.push("sendbird-openchannel-user-message");
  var isByMe = checkIsByMe(message, userId);
  var sender = getSenderFromMessage(message);
  var MemoizedMessageText = React.useMemo(function () {
    return function () {
      var splitMessage = message.message.split(/\r/);
      var matchedMessage = splitMessage.map(function (word) {
        return word !== '' ? word : React__default.createElement("br", null);
      });

      if (message.updatedAt > 0) {
        matchedMessage.push(React__default.createElement(index$1.Label, {
          key: LocalizationContext.uuidv4$1(),
          type: index$1.LabelTypography.BODY_1,
          color: index$1.LabelColors.ONBACKGROUND_2,
          calssName: "sendbird-openchannel-user-message-word"
        }, " " + stringSet.MESSAGE_EDITED + " "));
      }

      return matchedMessage;
    };
  }, [message, message.updatedAt]); // place context menu top depending clientHeight of message component

  React.useEffect(function () {
    if (messageRef.current.clientHeight > 36) {
      setContextStyle({
        top: '8px '
      });
    } else {
      setContextStyle({
        top: '2px'
      });
    }
  }, [window.innerWidth]);
  return React__default.createElement("div", {
    className: injectingClassName.join(' '),
    ref: messageRef
  }, React__default.createElement("div", {
    className: "sendbird-openchannel-user-message__left"
  }, !chainTop && React__default.createElement(index$1.ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return React__default.createElement(index$1.Avatar, {
        className: "sendbird-openchannel-user-message__left__avatar",
        src: sender.profileUrl || '',
        ref: avatarRef,
        width: "28px",
        height: "28px",
        onClick: function onClick() {
          if (!disableUserProfile) {
            toggleDropdown();
          }
        }
      });
    },
    menuItems: function menuItems(closeDropdown) {
      return React__default.createElement(index$1.MenuItems, {
        parentRef: avatarRef,
        parentContainRef: avatarRef,
        closeDropdown: closeDropdown,
        style: {
          paddingTop: 0,
          paddingBottom: 0
        }
      }, renderUserProfile ? renderUserProfile({
        user: sender,
        close: closeDropdown
      }) : React__default.createElement(index$1.UserProfile, {
        user: sender,
        onSuccess: closeDropdown,
        disableMessaging: true
      }));
    }
  })), React__default.createElement("div", {
    className: "sendbird-openchannel-user-message__right"
  }, !chainTop && React__default.createElement("div", {
    className: "sendbird-openchannel-user-message__right__top"
  }, React__default.createElement(index$1.Label, {
    className: "sendbird-openchannel-user-message__right__top__sender-name",
    type: index$1.LabelTypography.CAPTION_2,
    color: isByMe ? index$1.LabelColors.SECONDARY_3 : index$1.LabelColors.ONBACKGROUND_2
  }, sender && (sender.friendName || sender.nickname || sender.userId)), React__default.createElement(index$1.Label, {
    className: "sendbird-openchannel-user-message__right__top__sent-at",
    type: index$1.LabelTypography.CAPTION_3,
    color: index$1.LabelColors.ONBACKGROUND_3
  }, message.createdAt && format(message.createdAt, 'p'))), React__default.createElement("div", {
    className: "sendbird-openchannel-user-message__right__bottom"
  }, React__default.createElement(index$1.Label, {
    className: "sendbird-openchannel-user-message__right__bottom__message",
    type: index$1.LabelTypography.BODY_1,
    color: index$1.LabelColors.ONBACKGROUND_1
  }, MemoizedMessageText()))), React__default.createElement("div", {
    className: "sendbird-openchannel-user-message__context-menu",
    ref: contextMenuRef,
    style: contextStyle
  }, React__default.createElement(index$1.ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return showMenuTrigger({
        message: message,
        userId: userId,
        status: status
      }) && React__default.createElement(index$1.IconButton, {
        className: "sendbird-openchannel-user-message__context-menu--icon",
        width: "32px",
        height: "32px",
        onClick: function onClick() {
          toggleDropdown();
        }
      }, React__default.createElement(index$1.Icon, {
        width: "24px",
        height: "24px",
        type: index$1.IconTypes.MORE,
        fillColor: index$1.IconColors.CONTENT_INVERSE
      }));
    },
    menuItems: function menuItems(closeDropdown) {
      return React__default.createElement(index$1.MenuItems, {
        parentRef: contextMenuRef,
        parentContainRef: contextMenuRef,
        closeDropdown: closeDropdown,
        openLeft: true
      }, isFineCopy({
        message: message,
        userId: userId,
        status: status
      }) && React__default.createElement(index$1.MenuItem, {
        className: "sendbird-openchannel-user-message__context-menu__copy",
        onClick: function onClick() {
          copyToClipboard(message.message);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__COPY), isFineEdit({
        message: message,
        userId: userId,
        status: status
      }) && React__default.createElement(index$1.MenuItem, {
        className: "sendbird-openchannel-user-message__context-menu__edit",
        onClick: function onClick() {
          if (disabled) {
            return;
          }

          showEdit(true);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__EDIT), isFineResend({
        message: message,
        userId: userId,
        status: status
      }) && React__default.createElement(index$1.MenuItem, {
        className: "sendbird-openchannel-user-message__context-menu__resend",
        onClick: function onClick() {
          resendMessage(message);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__RESEND), isFineDelete({
        message: message,
        userId: userId,
        status: status
      }) && React__default.createElement(index$1.MenuItem, {
        className: "sendbird-openchannel-user-message__context-menu__delete",
        onClick: function onClick() {
          if (disabled) {
            return;
          }

          showRemove(true);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__DELETE));
    }
  })));
}

function OpenChannelAdminMessage(_a) {
  var message = _a.message,
      className = _a.className;
  var injectingClassName = Array.isArray(className) ? className : [className];
  injectingClassName.push('sendbird-openchannel-admin-message');
  return React__default.createElement("div", {
    className: LocalizationContext.__spreadArrays(injectingClassName).join(' ')
  }, React__default.createElement(index$1.Label, {
    className: "sendbird-openchannel-admin-message__text",
    type: index$1.LabelTypography.CAPTION_2,
    color: index$1.LabelColors.ONBACKGROUND_2
  }, message.message || ''));
}

var URL_REG = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
var createUrlTester = function createUrlTester(regexp) {
  return function (text) {
    return regexp.test(text);
  };
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

function OpenchannelOGMessage(_a) {
  var message = _a.message,
      className = _a.className,
      disabled = _a.disabled,
      showEdit = _a.showEdit,
      showRemove = _a.showRemove,
      resendMessage = _a.resendMessage,
      chainTop = _a.chainTop,
      status = _a.status,
      userId = _a.userId;

  if (!message || message.messageType !== 'user') {
    return null;
  }

  var ogMetaData = message.ogMetaData;
  var defaultImage = ogMetaData.defaultImage;
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;

  var _b = React.useContext(index$1.UserProfileContext),
      disableUserProfile = _b.disableUserProfile,
      renderUserProfile = _b.renderUserProfile;

  var _c = React.useState({}),
      contextStyle = _c[0],
      setContextStyle = _c[1];

  var messageComponentRef = React.useRef(null);
  var contextMenuRef = React.useRef(null);
  var avatarRef = React.useRef(null);
  var isUrl = createUrlTester(URL_REG);
  var injectingClassName = Array.isArray(className) ? className : [className];
  injectingClassName.push('sendbird-openchannel-og-message');
  var isByMe = checkIsByMe(message, userId);
  var sender = getSenderFromMessage(message);
  var MemoizedMessageText = React.useMemo(function () {
    return function () {
      var wordClassName = 'sendbird-openchannel-og-message--word';
      var splitMessage = message.message.split(' ');
      var matchedMessage = splitMessage.map(function (word) {
        return isUrl(word) ? React__default.createElement(index$2$1.LinkLabel, {
          key: LocalizationContext.uuidv4$1(),
          className: [wordClassName, 'sendbird-openchannel-og-message--word--link'],
          src: word,
          type: index$1.LabelTypography.BODY_1,
          color: index$1.LabelColors.PRIMARY
        }, word) : React__default.createElement(index$1.Label, {
          key: LocalizationContext.uuidv4$1(),
          className: wordClassName,
          type: index$1.LabelTypography.BODY_1,
          color: index$1.LabelColors.ONBACKGROUND_1
        }, word);
      });

      if (message.updatedAt > 0) {
        matchedMessage.push(React__default.createElement(index$1.Label, {
          key: LocalizationContext.uuidv4$1(),
          className: wordClassName,
          type: index$1.LabelTypography.BODY_1,
          color: index$1.LabelColors.ONBACKGROUND_2
        }, stringSet.MESSAGE_EDITED));
      }

      return matchedMessage;
    };
  }, [message, message.updatedAt]);

  var openLink = function openLink() {
    if (checkOGIsEnalbed(message)) {
      var url = ogMetaData.url;
      window.open(url);
    }
  }; // place conxt menu top depending clientHeight of message component


  React.useEffect(function () {
    if (messageComponentRef.current.clientHeight > 36) {
      setContextStyle({
        top: '8px '
      });
    } else {
      setContextStyle({
        top: '2px'
      });
    }
  }, [window.innerWidth]);
  return React__default.createElement("div", {
    className: injectingClassName.join(' '),
    ref: messageComponentRef
  }, React__default.createElement("div", {
    className: "sendbird-openchannel-og-message__top"
  }, React__default.createElement("div", {
    className: "sendbird-openchannel-og-message__top__left"
  }, !chainTop && React__default.createElement(index$1.ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return React__default.createElement(index$1.Avatar, {
        className: "sendbird-openchannel-og-message__top__left__avatar",
        src: sender.profileUrl || '',
        ref: avatarRef,
        width: "28px",
        height: "28px",
        onClick: function onClick() {
          if (!disableUserProfile) {
            toggleDropdown();
          }
        }
      });
    },
    menuItems: function menuItems(closeDropdown) {
      return React__default.createElement(index$1.MenuItems, {
        parentRef: avatarRef,
        parentContainRef: avatarRef,
        closeDropdown: closeDropdown,
        style: {
          paddingTop: 0,
          paddingBottom: 0
        }
      }, renderUserProfile ? renderUserProfile({
        user: sender,
        close: closeDropdown
      }) : React__default.createElement(index$1.UserProfile, {
        user: sender,
        onSuccess: closeDropdown,
        disableMessaging: true
      }));
    }
  })), React__default.createElement("div", {
    className: "sendbird-openchannel-og-message__top__right"
  }, !chainTop && React__default.createElement("div", {
    className: "sendbird-openchannel-og-message__top__right__title"
  }, React__default.createElement(index$1.Label, {
    className: "sendbird-openchannel-og-message__top__right__title__sender-name",
    type: index$1.LabelTypography.CAPTION_2,
    color: isByMe ? index$1.LabelColors.SECONDARY_3 : index$1.LabelColors.ONBACKGROUND_2
  }, sender && (sender.friendName || sender.nickname || sender.userId)), React__default.createElement(index$1.Label, {
    className: "sendbird-openchannel-og-message__top__right__title__sent-at",
    type: index$1.LabelTypography.CAPTION_3,
    color: index$1.LabelColors.ONBACKGROUND_3
  }, message.createdAt && format(message.createdAt, 'p'))), React__default.createElement("div", {
    className: "sendbird-openchannel-og-message__top__right__description"
  }, React__default.createElement(index$1.Label, {
    className: "sendbird-openchannel-og-message__top__right__description__message",
    type: index$1.LabelTypography.BODY_1,
    color: index$1.LabelColors.ONBACKGROUND_1
  }, MemoizedMessageText()))), React__default.createElement("div", {
    className: "sendbird-openchannel-og-message__top__context-menu",
    ref: contextMenuRef,
    style: contextStyle
  }, React__default.createElement(index$1.ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return showMenuTrigger({
        message: message,
        userId: userId,
        status: status
      }) && React__default.createElement(index$1.IconButton, {
        className: "sendbird-openchannel-og-message__top__context-menu--icon",
        width: "32px",
        height: "32px",
        onClick: function onClick() {
          toggleDropdown();
        }
      }, React__default.createElement(index$1.Icon, {
        width: "24px",
        height: "24px",
        type: index$1.IconTypes.MORE,
        fillColor: index$1.IconColors.CONTENT_INVERSE
      }));
    },
    menuItems: function menuItems(closeDropdown) {
      return React__default.createElement(index$1.MenuItems, {
        parentRef: contextMenuRef,
        parentContainRef: contextMenuRef,
        closeDropdown: closeDropdown,
        openLeft: true
      }, isFineCopy({
        message: message,
        userId: userId,
        status: status
      }) && React__default.createElement(index$1.MenuItem, {
        className: "sendbird-openchannel-og-message__top__context-menu__copy",
        onClick: function onClick() {
          copyToClipboard(message.message);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__COPY), isFineEdit({
        message: message,
        userId: userId,
        status: status
      }) && React__default.createElement(index$1.MenuItem, {
        className: "sendbird-openchannel-og-message__top__context-menu__edit",
        onClick: function onClick() {
          if (disabled) {
            return;
          }

          showEdit(true);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__EDIT), isFineResend({
        message: message,
        userId: userId,
        status: status
      }) && React__default.createElement(index$1.MenuItem, {
        className: "sendbird-openchannel-og-message__top__context-menu__resend",
        onClick: function onClick() {
          resendMessage(message);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__RESEND), isFineDelete({
        message: message,
        userId: userId,
        status: status
      }) && React__default.createElement(index$1.MenuItem, {
        className: "sendbird-openchannel-og-message__top__context-menu__delete",
        onClick: function onClick() {
          if (disabled) {
            return;
          }

          showRemove(true);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__DELETE));
    }
  }))), React__default.createElement("div", {
    className: "sendbird-openchannel-og-message__bottom"
  }, React__default.createElement("div", {
    className: "sendbird-openchannel-og-message__bottom__og-tag"
  }, ogMetaData.url && React__default.createElement(index$1.Label, {
    className: "sendbird-openchannel-og-message__bottom__og-tag__url",
    type: index$1.LabelTypography.CAPTION_3,
    color: index$1.LabelColors.ONBACKGROUND_2
  }, ogMetaData.url), ogMetaData.title && React__default.createElement(index$2$1.LinkLabel, {
    className: "sendbird-openchannel-og-message__bottom__og-tag__title",
    type: index$1.LabelTypography.SUBTITLE_2,
    color: index$1.LabelColors.PRIMARY,
    src: ogMetaData.url
  }, ogMetaData.title), ogMetaData.description && React__default.createElement(index$1.Label, {
    className: "sendbird-openchannel-og-message__bottom__og-tag__description",
    type: index$1.LabelTypography.BODY_2,
    color: index$1.LabelColors.ONBACKGROUND_1
  }, ogMetaData.description), ogMetaData.url && React__default.createElement("div", {
    className: "sendbird-openchannel-og-message__bottom__og-tag__thumbnail",
    onClick: openLink,
    onKeyDown: openLink,
    role: "button",
    tabIndex: 0
  }, defaultImage && React__default.createElement(index$1.ImageRenderer, {
    url: defaultImage.url || '',
    alt: defaultImage.alt || '',
    className: "sendbird-openchannel-og-message__bottom__og-tag__thumbnail__image",
    height: "189px",
    defaultComponent: React__default.createElement("div", {
      className: "sendbird-openchannel-og-message__bottom__og-tag__thumbnail__image--placeholder"
    }, React__default.createElement(index$1.Icon, {
      width: "56px",
      height: "56px",
      type: index$1.IconTypes.NO_THUMBNAIL
    }))
  })))));
}

var SUPPORTING_TYPES = {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  UNSUPPORTED: 'UNSUPPORTED'
};
var SUPPORTED_MIMES = {
  IMAGE: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  VIDEO: ['video/mpeg', 'video/ogg', 'video/webm', 'video/mp4']
};
var getSupportingFileType = function getSupportingFileType(type) {
  if (SUPPORTED_MIMES.IMAGE.indexOf(type) >= 0) {
    return SUPPORTING_TYPES.IMAGE;
  }

  if (SUPPORTED_MIMES.VIDEO.indexOf(type) >= 0) {
    return SUPPORTING_TYPES.VIDEO;
  }

  return SUPPORTING_TYPES.UNSUPPORTED;
};

function OpenchannelThumbnailMessage(_a) {
  var _b;

  var message = _a.message,
      className = _a.className,
      disabled = _a.disabled,
      userId = _a.userId,
      status = _a.status,
      chainTop = _a.chainTop,
      _onClick = _a.onClick,
      showRemove = _a.showRemove,
      resendMessage = _a.resendMessage;
  var type = message.type,
      url = message.url,
      localUrl = message.localUrl;
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;

  var _c = React.useContext(index$1.UserProfileContext),
      disableUserProfile = _c.disableUserProfile,
      renderUserProfile = _c.renderUserProfile;

  var contextMenuRef = React.useRef(null);
  var avatarRef = React.useRef(null);
  var injectingClassName = Array.isArray(className) ? className : [className];
  injectingClassName.push('sendbird-openchannel-thumbnail-message');
  var isByMe = checkIsByMe(message, userId);
  var isMessageSent = checkIsSent(status);
  var sender = getSenderFromMessage(message);
  return React__default.createElement("div", {
    className: injectingClassName.join(' ')
  }, React__default.createElement("div", {
    className: "sendbird-openchannel-thumbnail-message__left"
  }, !chainTop && React__default.createElement(index$1.ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return React__default.createElement(index$1.Avatar, {
        className: "sendbird-openchannel-thumbnail-message__left__avatar",
        src: sender.profileUrl || '',
        ref: avatarRef,
        width: "28px",
        height: "28px",
        onClick: function onClick() {
          if (!disableUserProfile) {
            toggleDropdown();
          }
        }
      });
    },
    menuItems: function menuItems(closeDropdown) {
      return React__default.createElement(index$1.MenuItems, {
        parentRef: avatarRef,
        parentContainRef: avatarRef,
        closeDropdown: closeDropdown,
        style: {
          paddingTop: 0,
          paddingBottom: 0
        }
      }, renderUserProfile ? renderUserProfile({
        user: sender,
        close: closeDropdown
      }) : React__default.createElement(index$1.UserProfile, {
        user: sender,
        onSuccess: closeDropdown,
        disableMessaging: true
      }));
    }
  })), React__default.createElement("div", {
    className: "sendbird-openchannel-thumbnail-message__right"
  }, !chainTop && React__default.createElement("div", {
    className: "sendbird-openchannel-thumbnail-message__right__title"
  }, React__default.createElement(index$1.Label, {
    className: "sendbird-openchannel-thumbnail-message__right__title__sender-name",
    type: index$1.LabelTypography.CAPTION_2,
    color: isByMe ? index$1.LabelColors.SECONDARY_3 : index$1.LabelColors.ONBACKGROUND_2
  }, sender && (sender.friendName || sender.nickname || sender.userId)), React__default.createElement(index$1.Label, {
    className: "sendbird-openchannel-thumbnail-message__right__title__sent-at",
    type: index$1.LabelTypography.CAPTION_3,
    color: index$1.LabelColors.ONBACKGROUND_3
  }, message.createdAt && format(message.createdAt, 'p'))), React__default.createElement("div", {
    className: "sendbird-openchannel-thumbnail-message__right__body"
  }, React__default.createElement("div", {
    className: "sendbird-openchannel-thumbnail-message__right__body__wrap",
    onClick: function onClick() {
      if (isMessageSent) {
        _onClick(true);
      }
    },
    onKeyDown: function onKeyDown() {
      if (isMessageSent) {
        _onClick(true);
      }
    },
    tabIndex: 0,
    role: "button"
  }, React__default.createElement("div", {
    className: "sendbird-openchannel-thumbnail-message__right__body__wrap__overlay"
  }), (_b = {}, _b[SUPPORTING_TYPES.VIDEO] = url || localUrl ? React__default.createElement("div", {
    className: "sendbird-openchannel-thumbnail-message__right__body__wrap__video"
  }, React__default.createElement("video", {
    className: "sendbird-openchannel-thumbnail-message__right__body__wrap__video__video"
  }, React__default.createElement("source", {
    src: url || localUrl,
    type: type
  })), React__default.createElement(index$1.Icon, {
    className: "sendbird-openchannel-thumbnail-message__right__body__wrap__video__icon",
    width: "56px",
    height: "56px",
    type: index$1.IconTypes.PLAY
  })) : React__default.createElement(index$1.Icon, {
    className: "sendbird-openchannel-thumbnail-message__right__body__wrap__video--icon",
    width: "56px",
    height: "56px",
    type: index$1.IconTypes.PHOTO,
    fillColor: index$1.IconColors.ON_BACKGROUND_2
  }), _b[SUPPORTING_TYPES.IMAGE] = url || localUrl ? React__default.createElement(index$1.ImageRenderer, {
    className: "sendbird-openchannel-thumbnail-message__right__body__wrap__image",
    height: "270px",
    url: url || localUrl,
    alt: "image"
  }) : React__default.createElement(index$1.Icon, {
    className: "sendbird-openchannel-thumbnail-message__right__body__wrap__image--icon",
    width: "56px",
    height: "56px",
    type: index$1.IconTypes.PHOTO,
    fillColor: index$1.IconColors.ON_BACKGROUND_2
  }), _b[SUPPORTING_TYPES.UNSUPPORTED] = React__default.createElement(index$1.Icon, {
    className: "sendbird-openchannel-thumbnail-message__right__body__wrap__unknown",
    width: "56px",
    height: "56px",
    type: index$1.IconTypes.PHOTO,
    fillColor: index$1.IconColors.ON_BACKGROUND_2
  }), _b)[getSupportingFileType(type)]))), React__default.createElement("div", {
    className: "sendbird-openchannel-thumbnail-message__context-menu",
    ref: contextMenuRef
  }, React__default.createElement(index$1.ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return showMenuTrigger({
        message: message,
        userId: userId,
        status: status
      }) && React__default.createElement(index$1.IconButton, {
        className: "sendbird-openchannel-thumbnail-message__context-menu--icon",
        width: "32px",
        height: "32px",
        onClick: toggleDropdown
      }, React__default.createElement(index$1.Icon, {
        width: "24px",
        height: "24px",
        type: index$1.IconTypes.MORE,
        fillColor: index$1.IconColors.CONTENT_INVERSE
      }));
    },
    menuItems: function menuItems(closeDropdown) {
      return React__default.createElement(index$1.MenuItems, {
        parentRef: contextMenuRef,
        parentContainRef: contextMenuRef,
        closeDropdown: closeDropdown,
        openLeft: true
      }, isFineResend({
        message: message,
        userId: userId,
        status: status
      }) && React__default.createElement(index$1.MenuItem, {
        onClick: function onClick() {
          resendMessage(message);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__RESEND), isFineDelete({
        message: message,
        userId: userId,
        status: status
      }) && React__default.createElement(index$1.MenuItem, {
        onClick: function onClick() {
          if (disabled) {
            return;
          }

          showRemove(true);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__DELETE));
    }
  })));
}

var checkFileType = function checkFileType(fileUrl) {
  var result = null;
  var imageFile = /(\.gif|\.jpg|\.jpeg|\.txt|\.pdf)$/i;
  var audioFile = /(\.mp3)$/i;

  if (imageFile.test(fileUrl)) {
    result = index$1.IconTypes.FILE_DOCUMENT;
  } else if (audioFile.test(fileUrl)) {
    result = index$1.IconTypes.FILE_AUDIO;
  }

  return result;
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

function OpenchannelFileMessage(_a) {
  var message = _a.message,
      className = _a.className,
      userId = _a.userId,
      disabled = _a.disabled,
      chainTop = _a.chainTop,
      status = _a.status,
      showRemove = _a.showRemove,
      resendMessage = _a.resendMessage;
  var contextMenuRef = React.useRef(null);
  var avatarRef = React.useRef(null);
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;

  var _b = React.useContext(index$1.UserProfileContext),
      disableUserProfile = _b.disableUserProfile,
      renderUserProfile = _b.renderUserProfile;

  var openFileUrl = function openFileUrl() {
    window.open(message.url);
  };

  var injectingClassName = Array.isArray(className) ? className : [className];
  injectingClassName.push('sendbird-openchannel-file-message');
  var isByMe = checkIsByMe(message, userId);
  var sender = getSenderFromMessage(message);
  return React__default.createElement("div", {
    className: injectingClassName.join(' ')
  }, React__default.createElement("div", {
    className: "sendbird-openchannel-file-message__left"
  }, !chainTop && React__default.createElement(index$1.ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return React__default.createElement(index$1.Avatar, {
        className: "sendbird-openchannel-file-message__left__avatar",
        src: sender.profileUrl || '',
        ref: avatarRef,
        width: "28px",
        height: "28px",
        onClick: function onClick() {
          if (!disableUserProfile) {
            toggleDropdown();
          }
        }
      });
    },
    menuItems: function menuItems(closeDropdown) {
      return React__default.createElement(index$1.MenuItems, {
        parentRef: avatarRef,
        parentContainRef: avatarRef,
        closeDropdown: closeDropdown,
        style: {
          paddingTop: 0,
          paddingBottom: 0
        }
      }, renderUserProfile ? renderUserProfile({
        user: sender,
        close: closeDropdown
      }) : React__default.createElement(index$1.UserProfile, {
        user: sender,
        onSuccess: closeDropdown,
        disableMessaging: true
      }));
    }
  })), React__default.createElement("div", {
    className: "sendbird-openchannel-file-message__right"
  }, !chainTop && React__default.createElement("div", {
    className: "sendbird-openchannel-file-message__right__title"
  }, React__default.createElement(index$1.Label, {
    className: "sendbird-openchannel-file-message__right__title__sender-name",
    type: index$1.LabelTypography.CAPTION_2,
    color: isByMe ? index$1.LabelColors.SECONDARY_3 : index$1.LabelColors.ONBACKGROUND_2
  }, sender && (sender.friendName || sender.nickname || sender.userId)), React__default.createElement(index$1.Label, {
    className: "sendbird-openchannel-file-message__right__title__sent-at",
    type: index$1.LabelTypography.CAPTION_3,
    color: index$1.LabelColors.ONBACKGROUND_3
  }, message.createdAt && format(message.createdAt, 'p'))), React__default.createElement("div", {
    className: "sendbird-openchannel-file-message__right__body"
  }, checkFileType(message.url) && React__default.createElement(index$1.Icon, {
    className: "sendbird-openchannel-file-message__right__body__icon",
    width: "48px",
    height: "48px",
    type: checkFileType(message.url),
    color: index$1.IconColors.PRIMARY
  }), React__default.createElement(index$1.TextButton, {
    className: "sendbird-openchannel-file-message__right__body__file-name",
    onClick: openFileUrl
  }, React__default.createElement(index$1.Label, {
    type: index$1.LabelTypography.BODY_1,
    color: index$1.LabelColors.ONBACKGROUND_1
  }, truncate(message.url, 40))))), React__default.createElement("div", {
    className: "sendbird-openchannel-file-message__context-menu",
    ref: contextMenuRef
  }, React__default.createElement(index$1.ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return showMenuTrigger({
        message: message,
        userId: userId,
        status: status
      }) && React__default.createElement(index$1.IconButton, {
        className: "sendbird-openchannel-file-message__context-menu__icon",
        width: "32px",
        height: "32px",
        onClick: toggleDropdown
      }, React__default.createElement(index$1.Icon, {
        type: index$1.IconTypes.MORE,
        width: "24px",
        height: "24px"
      }));
    },
    menuItems: function menuItems(closeDropdown) {
      return React__default.createElement(index$1.MenuItems, {
        parentRef: contextMenuRef,
        parentContainRef: contextMenuRef,
        closeDropdown: closeDropdown,
        openLeft: true
      }, isFineResend({
        message: message,
        userId: userId,
        status: status
      }) && React__default.createElement(index$1.MenuItem, {
        onClick: function onClick() {
          if (disabled) {
            return;
          }

          resendMessage(message);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__RESEND), isFineDelete({
        message: message,
        userId: userId,
        status: status
      }) && React__default.createElement(index$1.MenuItem, {
        onClick: function onClick() {
          if (disabled) {
            return;
          }

          showRemove(true);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__DELETE));
    }
  })));
}

function RemoveMessageModal(_a) {
  var onCloseModal = _a.onCloseModal,
      onDeleteMessage = _a.onDeleteMessage;
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  return React__default.createElement(index$1.Modal, {
    onCancel: onCloseModal,
    onSubmit: onDeleteMessage,
    submitText: "Delete",
    titleText: stringSet.MODAL__DELETE_MESSAGE__TITLE
  });
}

var MessageTypes = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  FILE: 'FILE',
  THUMBNAIL: 'THUMBNAIL',
  OG: 'OG',
  UNKNOWN: 'UNKNOWN'
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

  if (message.messageType === 'file') {
    return index$2$1.isImage(message.type) || index$2$1.isVideo(message.type) ? MessageTypes.THUMBNAIL : MessageTypes.FILE;
  }

  return MessageTypes.UNKNOWN;
};

function MessageHoc(_a) {
  var _b;

  var message = _a.message,
      userId = _a.userId,
      disabled = _a.disabled,
      editDisabled = _a.editDisabled,
      hasSeperator = _a.hasSeperator,
      deleteMessage = _a.deleteMessage,
      updateMessage = _a.updateMessage,
      resendMessage = _a.resendMessage,
      status = _a.status,
      chainTop = _a.chainTop,
      chainBottom = _a.chainBottom;
  var sender = null;

  if (message.messageType !== 'admin') {
    sender = message.sender;
  }

  var _c = React.useState(false),
      showEdit = _c[0],
      setShowEdit = _c[1];

  var _d = React.useState(false),
      showRemove = _d[0],
      setShowRemove = _d[1];

  var _e = React.useState(false),
      showFileViewer = _e[0],
      setShowFileViewer = _e[1];

  var editMessageInputRef = React.useRef(null);
  var isByMe = false;

  if (sender && message.messageType !== 'admin') {
    // pending and failed messages are by me
    isByMe = userId === sender.userId || message.requestState === SendingMessageStatus.PENDING || message.requestState === SendingMessageStatus.FAILED;
  }

  if (message.messageType === 'user' && showEdit) {
    return React__default.createElement(index$2$1.MessageInput, {
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

  return React__default.createElement("div", {
    className: "sendbird-msg-hoc sendbird-msg--scroll-ref"
  }, hasSeperator && React__default.createElement(index$2$1.DateSeparator, null, React__default.createElement(index$1.Label, {
    type: index$1.LabelTypography.CAPTION_2,
    color: index$1.LabelColors.ONBACKGROUND_2
  }, format(message.createdAt, 'MMMM dd, yyyy'))), (_b = {}, _b[MessageTypes.ADMIN] = function () {
    if (message.messageType === 'admin') {
      return React__default.createElement(OpenChannelAdminMessage, {
        message: message
      });
    }
  }(), _b[MessageTypes.FILE] = function () {
    if (message.messageType === 'file') {
      return React__default.createElement(OpenchannelFileMessage, {
        message: message,
        disabled: disabled,
        userId: userId,
        showRemove: setShowRemove,
        resendMessage: resendMessage,
        status: status,
        chainTop: chainTop,
        chainBottom: chainBottom
      });
    }

    return;
  }(), _b[MessageTypes.OG] = function () {
    if (message.messageType === 'user') {
      return React__default.createElement(OpenchannelOGMessage, {
        message: message,
        status: status,
        userId: userId,
        showEdit: setShowEdit,
        disabled: disabled,
        showRemove: setShowRemove,
        resendMessage: resendMessage,
        chainTop: chainTop,
        chainBottom: chainBottom
      });
    }

    return;
  }(), _b[MessageTypes.THUMBNAIL] = function () {
    if (message.messageType === 'file') {
      return React__default.createElement(OpenchannelThumbnailMessage, {
        message: message,
        disabled: disabled,
        userId: userId,
        showRemove: setShowRemove,
        resendMessage: resendMessage,
        onClick: setShowFileViewer,
        status: status,
        chainTop: chainTop,
        chainBottom: chainBottom
      });
    }

    return;
  }(), _b[MessageTypes.USER] = function () {
    if (message.messageType === 'user') {
      return React__default.createElement(OpenchannelUserMessage, {
        message: message,
        userId: userId,
        disabled: disabled,
        showEdit: setShowEdit,
        showRemove: setShowRemove,
        resendMessage: resendMessage,
        status: status,
        chainTop: chainTop,
        chainBottom: chainBottom
      });
    }

    return;
  }(), _b[MessageTypes.UNKNOWN] = function () {
    return; // return (
    //   <OpenChannelUnknownMessage message={message} />
    // );
  }(), _b)[getMessageType(message)], showRemove && React__default.createElement(RemoveMessageModal, {
    onCloseModal: function onCloseModal() {
      return setShowRemove(false);
    },
    onDeleteMessage: function onDeleteMessage() {
      if (message.messageType !== 'admin') {
        deleteMessage(message);
      }
    }
  }), showFileViewer && React__default.createElement(index$2$1.FileViewer, {
    onClose: function onClose() {
      return setShowFileViewer(false);
    },
    message: message,
    onDelete: deleteMessage,
    isByMe: isByMe
  }));
}

function OpenchannelConversationScroll(_a) {
  var _b = _a.useMessageGrouping,
      useMessageGrouping = _b === void 0 ? true : _b,
      openchannel = _a.openchannel,
      user = _a.user,
      allMessages = _a.allMessages,
      _c = _a.isOnline,
      isOnline = _c === void 0 ? true : _c,
      hasMore = _a.hasMore,
      onScroll = _a.onScroll,
      scrollDownPromise = _a.scrollDownPromise,
      showScrollDownButton = _a.showScrollDownButton,
      updateMessage = _a.updateMessage,
      deleteMessage = _a.deleteMessage,
      resendMessage = _a.resendMessage;
  var scrollRef = React.useRef(null);

  var handleOnScroll = function handleOnScroll(e) {
    var element = e.target;
    var scrollTop = element.scrollTop,
        scrollHeight = element.scrollHeight,
        clientHeight = element.clientHeight;

    if (showScrollDownButton) {
      if (scrollHeight > scrollTop + clientHeight) {
        showScrollDownButton(true);
      } else {
        showScrollDownButton(false);
      }
    }

    if (scrollTop === 0) {
      if (!hasMore) {
        return;
      }

      var nodes_1 = scrollRef.current.querySelectorAll('.sendbird-msg--scroll-ref');
      onScroll(function () {
        var first = nodes_1[0];
        first.scrollIntoView();
      });
    }
  };

  React.useEffect(function () {
    // This promise is created in everytime when user click the scroll to bottom button
    // This scope waits when user click the button and scrolls to the bottom of conversation
    if (scrollDownPromise && scrollRef && scrollRef.current) {
      scrollDownPromise.then(function () {
        scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);

        if (showScrollDownButton) {
          showScrollDownButton(false);
        }
      });
    }

    return;
  }, [scrollDownPromise]);
  return React__default.createElement("div", {
    className: "sendbird-openchannel-conversation-scroll",
    onScroll: handleOnScroll,
    ref: scrollRef
  }, React__default.createElement("div", {
    className: "sendbird-openchannel-conversation-scroll__container"
  }, React__default.createElement("div", {
    className: "sendbird-openchannel-conversation-scroll__container__padding"
  }), React__default.createElement("div", {
    className: "sendbird-openchannel-conversation-scroll__container__item-container"
  }, allMessages.map(function (message, index) {
    var status;

    if (message.messageType !== 'admin') {
      status = message.sendingStatus;
    }

    var previousMessage = allMessages[index - 1];
    var nextMessage = allMessages[index - 1];
    var previousMessageCreatedAt = previousMessage && previousMessage.createdAt;
    var currentCreatedAt = message.createdAt; // https://stackoverflow.com/a/41855608

    var hasSeperator = !(previousMessageCreatedAt && isSameDay(currentCreatedAt, previousMessageCreatedAt));

    var _a = useMessageGrouping ? compareMessagesForGrouping(previousMessage, message, nextMessage) : [false, false],
        chainTop = _a[0],
        chainBottom = _a[1];

    return React__default.createElement(MessageHoc, {
      key: message.messageId,
      message: message,
      status: status,
      userId: user.userId,
      disabled: !isOnline,
      editDisabled: openchannel.isFrozen,
      hasSeperator: hasSeperator,
      chainTop: chainTop,
      chainBottom: chainBottom,
      deleteMessage: deleteMessage,
      updateMessage: updateMessage,
      resendMessage: resendMessage
    });
  }))));
}

var SET_CURRENT_CHANNEL = 'SET_CURRENT_CHANNEL';
var SET_CHANNEL_INVALID = 'SET_CHANNEL_INVALID';
var RESET_MESSAGES = 'RESET_MESSAGES';
var GET_PREV_MESSAGES_SUCESS = 'GET_PREV_MESSAGES_SUCESS';
var GET_PREV_MESSAGES_FAIL = 'GET_PREV_MESSAGES_FAIL';
var SENDING_MESSAGE_FAILED = 'SENDING_MESSAGE_FAILED';
var SENDING_MESSAGE_SUCCEEDED = 'SENDING_MESSAGE_SUCCEEDED';
var SENDING_MESSAGE_START = 'SENDING_MESSAGE_START';
var RESENDING_MESSAGE_START = 'RESENDING_MESSAGE_START'; // event handlers

var ON_MESSAGE_RECEIVED = 'ON_MESSAGE_RECEIVED';
var ON_MESSAGE_UPDATED = 'ON_MESSAGE_UPDATED';
var ON_MESSAGE_DELETED = 'ON_MESSAGE_DELETED';
var ON_MESSAGE_DELETED_BY_REQ_ID = 'ON_MESSAGE_DELETED_BY_REQ_ID';
var ON_OPERATOR_UPDATED = 'ON_OPERATOR_UPDATED';
var ON_USER_ENTERED = 'ON_USER_ENTERED';
var ON_USER_EXITED = 'ON_USER_EXITED';
var ON_USER_MUTED = 'ON_USER_MUTED';
var ON_USER_UNMUTED = 'ON_USER_UNMUTED';
var ON_USER_BANNED = 'ON_USER_BANNED';
var ON_USER_UNBANNED = 'ON_USER_UNBANNED';
var ON_CHANNEL_FROZEN = 'ON_CHANNEL_FROZEN';
var ON_CHANNEL_UNFROZEN = 'ON_CHANNEL_UNFROZEN';
var ON_CHANNEL_CHANGED = 'ON_CHANNEL_CHANGED';
var ON_META_DATA_CREATED = 'ON_META_DATA_CREATED';
var ON_META_DATA_UPDATED = 'ON_META_DATA_UPDATED';
var ON_META_DATA_DELETED = 'ON_META_DATA_DELETED';
var ON_META_COUNTERS_CREATED = 'ON_META_COUNTERS_CREATED';
var ON_META_COUNTERS_UPDATED = 'ON_META_COUNTERS_UPDATED';
var ON_META_COUNTERS_DELETED = 'ON_META_COUNTERS_DELETED';
var ON_MENTION_RECEIVED = 'ON_MENTION_RECEIVED';

function reducer(state, action) {
  switch (action.type) {
    case RESET_MESSAGES:
      {
        return LocalizationContext.__assign(LocalizationContext.__assign({}, state), {
          allMessages: []
        });
      }

    case SET_CURRENT_CHANNEL:
      {
        var currentChannel = action.payload;
        var operators = currentChannel.operators;

        if (!state.isInvalid && state.currentOpenChannel && state.currentOpenChannel.url && state.currentOpenChannel.url === currentChannel.url) {
          return state;
        }

        return LocalizationContext.__assign(LocalizationContext.__assign({}, state), {
          currentOpenChannel: currentChannel,
          isInvalid: false,
          operators: operators,
          participants: operators
        });
      }

    case SET_CHANNEL_INVALID:
      {
        return LocalizationContext.__assign(LocalizationContext.__assign({}, state), {
          isInvalid: true
        });
      }

    case GET_PREV_MESSAGES_SUCESS:
    case GET_PREV_MESSAGES_FAIL:
      {
        var isFailed = action.type === GET_PREV_MESSAGES_FAIL;
        var _a = action.payload,
            _b = _a.currentOpenChannel,
            currentOpenChannel = _b === void 0 ? {} : _b,
            _c = _a.messages,
            messages = _c === void 0 ? [] : _c,
            hasMore = _a.hasMore,
            lastMessageTimestamp = _a.lastMessageTimestamp;
        var actionChannelUrl = currentOpenChannel.url;
        var receivedMessages_1 = isFailed ? [] : messages;

        var _hasMore = isFailed ? false : hasMore;

        var _lastMessageTimestamp = isFailed ? 0 : lastMessageTimestamp;

        var stateChannel = state.currentOpenChannel;
        var stateChannelUrl = stateChannel.url;

        if (actionChannelUrl !== stateChannelUrl) {
          return state;
        }

        var filteredAllMessages = state.allMessages.filter(function (message) {
          return !receivedMessages_1.find(function (_a) {
            var messageId = _a.messageId;
            return index$2$1.compareIds(messageId, message.messageId);
          });
        });
        return LocalizationContext.__assign(LocalizationContext.__assign({}, state), {
          loading: false,
          initialized: true,
          hasMore: _hasMore,
          lastMessageTimestamp: _lastMessageTimestamp,
          allMessages: LocalizationContext.__spreadArrays(receivedMessages_1, filteredAllMessages)
        });
      }

    case SENDING_MESSAGE_START:
      {
        var _d = action.payload,
            message = _d.message,
            channel = _d.channel;

        if (channel.url !== state.currentOpenChannel.url) {
          return state;
        }

        return LocalizationContext.__assign(LocalizationContext.__assign({}, state), {
          allMessages: LocalizationContext.__spreadArrays(state.allMessages, [LocalizationContext.__assign({}, message)])
        });
      }

    case SENDING_MESSAGE_SUCCEEDED:
      {
        var sentMessage_1 = action.payload;
        var newMessages = state.allMessages.map(function (m) {
          return index$2$1.compareIds(m.reqId, sentMessage_1.reqId) ? sentMessage_1 : m;
        });
        return LocalizationContext.__assign(LocalizationContext.__assign({}, state), {
          allMessages: newMessages
        });
      }

    case SENDING_MESSAGE_FAILED:
      {
        var sentMessage_2 = action.payload;
        return LocalizationContext.__assign(LocalizationContext.__assign({}, state), {
          allMessages: state.allMessages.map(function (m) {
            return index$2$1.compareIds(m.reqId, sentMessage_2.reqId) ? sentMessage_2 : m;
          })
        });
      }

    case RESENDING_MESSAGE_START:
      {
        var eventedChannel = action.payload.channel;
        var resentMessage_1 = action.payload.message;

        if (eventedChannel.url !== state.currentOpenChannel.url) {
          return state;
        }

        return LocalizationContext.__assign(LocalizationContext.__assign({}, state), {
          allMessages: state.allMessages.map(function (m) {
            return index$2$1.compareIds(m.reqId, resentMessage_1.reqId) ? resentMessage_1 : m;
          })
        });
      }

    case ON_MESSAGE_RECEIVED:
      {
        var eventedChannel = action.payload.channel;
        var receivedMessage = action.payload.message;
        var currentOpenChannel = state.currentOpenChannel;

        if (!index$2$1.compareIds(eventedChannel.url, currentOpenChannel.url) || !(state.allMessages.map(function (message) {
          return message.messageId;
        }).indexOf(receivedMessage.messageId) < 0)) {
          return state;
        }

        return LocalizationContext.__assign(LocalizationContext.__assign({}, state), {
          allMessages: LocalizationContext.__spreadArrays(state.allMessages, [receivedMessage])
        });
      }

    case ON_MESSAGE_UPDATED:
      {
        var eventedChannel = action.payload.channel;
        var updatedMessage_1 = action.payload.message;
        var currentChannel = state.currentOpenChannel;

        if (!currentChannel || currentChannel.url && currentChannel.url !== eventedChannel.url) {
          return state;
        }

        return LocalizationContext.__assign(LocalizationContext.__assign({}, state), {
          allMessages: state.allMessages.map(function (message) {
            return message.isIdentical(updatedMessage_1) ? updatedMessage_1 : message;
          })
        });
      }

    case ON_MESSAGE_DELETED:
      {
        var eventedChannel = action.payload.channel;
        var deletedMessageId_1 = action.payload.messageId;
        var currentChannel = state.currentOpenChannel;

        if (!currentChannel || currentChannel.url && currentChannel.url !== eventedChannel.url) {
          return state;
        }

        return LocalizationContext.__assign(LocalizationContext.__assign({}, state), {
          allMessages: state.allMessages.filter(function (message) {
            return !index$2$1.compareIds(message.messageId, deletedMessageId_1);
          })
        });
      }

    case ON_MESSAGE_DELETED_BY_REQ_ID:
      {
        return LocalizationContext.__assign(LocalizationContext.__assign({}, state), {
          allMessages: state.allMessages.filter(function (m) {
            return !index$2$1.compareIds(m.reqId, action.payload);
          })
        });
      }

    case ON_OPERATOR_UPDATED:
      {
        var eventedChannel = action.payload.channel;
        var updatedOperators = action.payload.operators;
        var currentChannel = state.currentOpenChannel;

        if (!currentChannel || currentChannel.url && currentChannel.url !== eventedChannel.url) {
          return state;
        }

        return LocalizationContext.__assign(LocalizationContext.__assign({}, state), {
          currentOpenChannel: LocalizationContext.__assign(LocalizationContext.__assign({}, state.currentOpenChannel), {
            operators: updatedOperators
          }),
          operators: updatedOperators
        });
      }

    case ON_USER_ENTERED:
      {
        var eventedChannel = action.payload.channel;
        var enteredUser = action.payload.user;
        var currentChannel = state.currentOpenChannel;

        if (!currentChannel || currentChannel.url && currentChannel.url !== eventedChannel.url) {
          return state;
        }

        return LocalizationContext.__assign(LocalizationContext.__assign({}, state), {
          participants: LocalizationContext.__spreadArrays(state.participants, [enteredUser])
        });
      }

    case ON_USER_EXITED:
      {
        var eventedChannel = action.payload.channel;
        var exitedUser_1 = action.payload.user;
        var currentChannel = state.currentOpenChannel;

        if (!currentChannel || currentChannel.url && currentChannel.url !== eventedChannel.url) {
          return state;
        }

        return LocalizationContext.__assign(LocalizationContext.__assign({}, state), {
          participants: state.participants.filter(function (participant) {
            return !index$2$1.compareIds(participant.userId, exitedUser_1.userId);
          })
        });
      }

    case ON_USER_MUTED:
      {
        // const eventedChannel = action.payload.channel;
        // const mutedUser = action.payload.user;
        // return {
        //   ...state
        // };
        return state;
      }

    case ON_USER_UNMUTED:
      {
        // const eventedChannel = action.payload.channel;
        // const unmutedUser = action.payload.user;
        // return {
        //   ...state
        // };
        return state;
      }

    case ON_USER_BANNED:
      {
        // const eventedChannel = action.payload.channel;
        // const bannedUser = action.payload.user;
        // return {
        //   ...state
        // };
        return state;
      }

    case ON_USER_UNBANNED:
      {
        // const eventedChannel = action.payload.channel;
        // const unbannedUser = action.payload.user;
        // return {
        //   ...state
        // };
        return state;
      }

    case ON_CHANNEL_FROZEN:
      {
        var frozenChannel = action.payload;
        var currentChannel = state.currentOpenChannel;

        if (!currentChannel || currentChannel.url && currentChannel.url !== frozenChannel.url) {
          return state;
        }

        return LocalizationContext.__assign(LocalizationContext.__assign({}, state), {
          frozen: true
        });
      }

    case ON_CHANNEL_UNFROZEN:
      {
        var unfrozenChannel = action.payload;
        var currentChannel = state.currentOpenChannel;

        if (!currentChannel || currentChannel.url && currentChannel.url !== unfrozenChannel.url) {
          return state;
        }

        return LocalizationContext.__assign(LocalizationContext.__assign({}, state), {
          frozen: false
        });
      }

    case ON_CHANNEL_CHANGED:
      {
        var changedChannel = action.payload;
        var currentChannel = state.currentOpenChannel;

        if (!currentChannel || currentChannel.url && currentChannel.url !== changedChannel.url) {
          return state;
        }

        return LocalizationContext.__assign(LocalizationContext.__assign({}, state), {
          currentOpenChannel: changedChannel
        });
      }

    case ON_META_DATA_CREATED:
      {
        // const eventedChannel = action.payload.channel;
        // const createdMetaData = action.payload.metaData;
        // return {
        //   ...state
        // };
        return state;
      }

    case ON_META_DATA_UPDATED:
      {
        // const eventedChannel = action.payload.channel;
        // const updatedMetaData = action.payload.metaData;
        // return {
        //   ...state
        // };
        return state;
      }

    case ON_META_DATA_DELETED:
      {
        // const eventedChannel = action.payload.channel;
        // const deletedMetaDataKeys = action.payload.metaDataKeys;
        // return {
        //   ...state
        // };
        return state;
      }

    case ON_META_COUNTERS_CREATED:
      {
        // const eventedChannel = action.payload.channel;
        // const createdMetaCounter = action.payload.metaCounter;
        // return {
        //   ...state
        // };
        return state;
      }

    case ON_META_COUNTERS_UPDATED:
      {
        // const eventedChannel = action.payload.channel;
        // const updatedMetaCounter = action.payload.metaCounter;
        // return {
        //   ...state
        // };
        return state;
      }

    case ON_META_COUNTERS_DELETED:
      {
        // const eventedChannel = action.payload.channel;
        // const deletedMetaCounterKeys = action.payload.metaCounterKeys;
        // return {
        //   ...state
        // };
        return state;
      }

    case ON_MENTION_RECEIVED:
      {
        // const eventedChannel = action.payload.channel;
        // const mentionedMessage = action.payload.message;
        // return {
        //   ...state
        // };
        return state;
      }

    default:
      return state;
  }
}

var initialState = {
  allMessages: [],
  loading: false,
  initialized: false,
  currentOpenChannel: null,
  isInvalid: false,
  hasMore: false,
  lastMessageTimestamp: 0,
  frozen: false,
  operators: [],
  participants: []
};

var COMPONENT_CLASS_NAME$1 = 'sendbird-openchannel-conversation';
var OpenchannelConversation = function OpenchannelConversation(props) {
  // props
  var useMessageGrouping = props.useMessageGrouping,
      channelUrl = props.channelUrl,
      stores = props.stores,
      config = props.config,
      _a = props.queries,
      queries = _a === void 0 ? {} : _a,
      disableUserProfile = props.disableUserProfile,
      renderUserProfile = props.renderUserProfile,
      renderChannelTitle = props.renderChannelTitle,
      renderMessageInput = props.renderMessageInput,
      onBeforeSendUserMessage = props.onBeforeSendUserMessage,
      onBeforeSendFileMessage = props.onBeforeSendFileMessage,
      onChatHeaderActionClick = props.onChatHeaderActionClick;
  var sdkStore = stores.sdkStore,
      userStore = stores.userStore;
  var userId = config.userId,
      isOnline = config.isOnline,
      logger = config.logger;
  var sdk = sdkStore.sdk;
  var user = userStore.user; // hook variables

  var _b = React.useReducer(reducer, initialState),
      messagesStore = _b[0],
      messagesDispatcher = _b[1];

  var allMessages = messagesStore.allMessages,
      loading = messagesStore.loading,
      initialized = messagesStore.initialized,
      currentOpenChannel = messagesStore.currentOpenChannel,
      isInvalid = messagesStore.isInvalid,
      hasMore = messagesStore.hasMore,
      lastMessageTimestamp = messagesStore.lastMessageTimestamp; // ref

  var messageInputRef = React.useRef(null); // useSendMessageCallback

  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;

  var _c = React.useState(null),
      scrollDownPromise = _c[0],
      setScrollDownPromise = _c[1];

  var _d = React.useState(false),
      showScrollDownButton = _d[0],
      setShowScrollDownButton = _d[1]; // const


  var sdkInit = sdkStore.initialized;
  var userFilledMessageListParams = queries ? queries.messageListParams : null;
  var disabled = !initialized || !isOnline || isDisabledBecauseFrozen(currentOpenChannel, userId); // || utils.isDisabledBecauseMuted(mutedParticipantIds, userId)

  var userDefinedDisableUserProfile = disableUserProfile || config.disableUserProfile;
  var userDefinedRenderProfile = renderUserProfile || config.renderUserProfile; // useSetChannel

  React.useEffect(function () {
    if (channelUrl && sdkInit && sdk && sdk.OpenChannel) {
      logger.info('OpenChannel | useSetChannel fetching channel', channelUrl);
      sdk.OpenChannel.getChannel(channelUrl, function (openChannel, error) {
        if (!error) {
          logger.info('OpenChannel | useSetChannel fetched channel', openChannel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL,
            payload: openChannel
          });
          openChannel.enter(function (error) {
            if (error) {
              logger.warning('OpenChannel | useSetChannel enter channel failed', {
                channelUrl: channelUrl,
                error: error
              });
              messagesDispatcher({
                type: SET_CHANNEL_INVALID
              });
            }
          });
        } else {
          logger.warning('OpenChannel | useSetChannel fetch channel failed', {
            channelUrl: channelUrl,
            error: error
          });
          messagesDispatcher({
            type: SET_CHANNEL_INVALID
          });
        }
      }); // .then((openChannel) => {
      //   logger.info('OpenChannel | useSetChannel fetched channel', openChannel);
      //   messagesDispatcher({
      //     type: messageActionTypes.SET_CURRENT_CHANNEL,
      //     payload: openChannel,
      //   });
      // })
      // .catch((error) => {
      //   logger.warning('OpenChannel | useSetChannel fetch channel failed', { channelUrl, error });
      //   messagesDispatcher({
      //     type: messageActionTypes.SET_CHANNEL_INVALID,
      //   });
      // });
    }
  }, [channelUrl, sdkInit]); // useHandleChannelEvents

  React.useEffect(function () {
    var messageReceiverId = LocalizationContext.uuidv4$1();

    if (currentOpenChannel && currentOpenChannel.url && sdk && sdk.ChannelHandler) {
      var ChannelHandler = new sdk.ChannelHandler();
      logger.info('OpenChannel | useHandleChannelEvents: Setup event handler', messageReceiverId);

      ChannelHandler.onMessageReceived = function (channel, message) {
        var channelUrl = channel.url;
        logger.info('OpenChannel | useHandleChannelEvents: onMessageReceived', {
          channelUrl: channelUrl,
          message: message
        });
        messagesDispatcher({
          type: ON_MESSAGE_RECEIVED,
          payload: {
            channel: channel,
            message: message
          }
        });
      };

      ChannelHandler.onMessageUpdated = function (channel, message) {
        var channelUrl = channel.url;
        logger.info('OpenChannel | useHandleChannelEvents: onMessageUpdated', {
          channelUrl: channelUrl,
          message: message
        });
        messagesDispatcher({
          type: ON_MESSAGE_UPDATED,
          payload: {
            channel: channel,
            message: message
          }
        });
      };

      ChannelHandler.onMessageDeleted = function (channel, messageId) {
        var channelUrl = channel.url;
        logger.info('OpenChannel | useHandleChannelEvents: onMessageDeleted', {
          channelUrl: channelUrl,
          messageId: messageId
        });
        messagesDispatcher({
          type: ON_MESSAGE_DELETED,
          payload: {
            channel: channel,
            messageId: messageId
          }
        });
      };

      ChannelHandler.onOperatorUpdated = function (channel, operators) {
        var channelUrl = channel.url;
        logger.info('OpenChannel | useHandleChannelEvents: onOperatorUpdated', {
          channelUrl: channelUrl,
          operators: operators
        });
        messagesDispatcher({
          type: ON_OPERATOR_UPDATED,
          payload: {
            channel: channel,
            operators: operators
          }
        });
      };

      ChannelHandler.onUserEntered = function (channel, user) {
        var channelUrl = channel.url;
        logger.info('OpenChannel | useHandleChannelEvents: onUserEntered', {
          channelUrl: channelUrl,
          user: user
        });
        messagesDispatcher({
          type: ON_USER_ENTERED,
          payload: {
            channel: channel,
            user: user
          }
        });
      };

      ChannelHandler.onUserExited = function (channel, user) {
        var channelUrl = channel.url;
        logger.info('OpenChannel | useHandleChannelEvents: onUserExited', {
          channelUrl: channelUrl,
          user: user
        });
        messagesDispatcher({
          type: ON_USER_EXITED,
          payload: {
            channel: channel,
            user: user
          }
        });
      };

      ChannelHandler.onUserMuted = function (channel, user) {
        var channelUrl = channel.url;
        logger.info('OpenChannel | useHandleChannelEvents: onUserMuted', {
          channelUrl: channelUrl,
          user: user
        });
        messagesDispatcher({
          type: ON_USER_MUTED,
          payload: {
            channel: channel,
            user: user
          }
        });
      };

      ChannelHandler.onUserUnmuted = function (channel, user) {
        var channelUrl = channel.url;
        logger.info('OpenChannel | useHandleChannelEvents: onUserUnmuted', {
          channelUrl: channelUrl,
          user: user
        });
        messagesDispatcher({
          type: ON_USER_UNMUTED,
          payload: {
            channel: channel,
            user: user
          }
        });
      };

      ChannelHandler.onUserBanned = function (channel, user) {
        var channelUrl = channel.url;
        logger.info('OpenChannel | useHandleChannelEvents: onUserBanned', {
          channelUrl: channelUrl,
          user: user
        });
        messagesDispatcher({
          type: ON_USER_BANNED,
          payload: {
            channel: channel,
            user: user
          }
        });
      };

      ChannelHandler.onUserUnbanned = function (channel, user) {
        var channelUrl = channel.url;
        logger.info('OpenChannel | useHandleChannelEvents: onUserUnbanned', {
          channelUrl: channelUrl,
          user: user
        });
        messagesDispatcher({
          type: ON_USER_UNBANNED,
          payload: {
            channel: channel,
            user: user
          }
        });
      };

      ChannelHandler.onChannelFrozen = function (channel) {
        logger.info('OpenChannel | useHandleChannelEvents: onChannelFrozen', channel);
        messagesDispatcher({
          type: ON_CHANNEL_FROZEN,
          payload: channel
        });
      };

      ChannelHandler.onChannelUnfrozen = function (channel) {
        logger.info('OpenChannel | useHandleChannelEvents: onChannelUnfrozen', channel);
        messagesDispatcher({
          type: ON_CHANNEL_UNFROZEN,
          payload: channel
        });
      };

      ChannelHandler.onChannelChanged = function (channel) {
        logger.info('OpenChannel | useHandleChannelEvents: onChannelChanged', channel);
        messagesDispatcher({
          type: ON_CHANNEL_CHANGED,
          payload: channel
        });
      };

      ChannelHandler.onMetaDataCreated = function (channel, metaData) {
        var channelUrl = channel.url;
        logger.info('OpenChannel | useHandleChannelEvents: onMetaDataCreated', {
          channelUrl: channelUrl,
          metaData: metaData
        });
        messagesDispatcher({
          type: ON_META_DATA_CREATED,
          payload: {
            channel: channel,
            metaData: metaData
          }
        });
      };

      ChannelHandler.onMetaDataUpdated = function (channel, metaData) {
        var channelUrl = channel.url;
        logger.info('OpenChannel | useHandleChannelEvents: onMetaDataUpdated', {
          channelUrl: channelUrl,
          metaData: metaData
        });
        messagesDispatcher({
          type: ON_META_DATA_UPDATED,
          payload: {
            channel: channel,
            metaData: metaData
          }
        });
      };

      ChannelHandler.onMetaDataDeleted = function (channel, metaDataKeys) {
        var channelUrl = channel.url;
        logger.info('OpenChannel | useHandleChannelEvents: onMetaDataDeleted', {
          channelUrl: channelUrl,
          metaDataKeys: metaDataKeys
        });
        messagesDispatcher({
          type: ON_META_DATA_DELETED,
          payload: {
            channel: channel,
            metaDataKeys: metaDataKeys
          }
        });
      };

      ChannelHandler.onMetaCountersCreated = function (channel, metaCounter) {
        var channelUrl = channel.url;
        logger.info('OpenChannel | useHandleChannelEvents: onMetaCountersCreated', {
          channelUrl: channelUrl,
          metaCounter: metaCounter
        });
        messagesDispatcher({
          type: ON_META_COUNTERS_CREATED,
          payload: {
            channel: channel,
            metaCounter: metaCounter
          }
        });
      };

      ChannelHandler.onMetaCountersUpdated = function (channel, metaCounter) {
        var channelUrl = channel.url;
        logger.info('OpenChannel | useHandleChannelEvents: onMetaCountersUpdated', {
          channelUrl: channelUrl,
          metaCounter: metaCounter
        });
        messagesDispatcher({
          type: ON_META_COUNTERS_UPDATED,
          payload: {
            channel: channel,
            metaCounter: metaCounter
          }
        });
      };

      ChannelHandler.onMetaCountersDeleted = function (channel, metaCounterKeys) {
        var channelUrl = channel.url;
        logger.info('OpenChannel | useHandleChannelEvents: onMetaCountersDeleted', {
          channelUrl: channelUrl,
          metaCounterKeys: metaCounterKeys
        });
        messagesDispatcher({
          type: ON_META_COUNTERS_DELETED,
          payload: {
            channel: channel,
            metaCounterKeys: metaCounterKeys
          }
        });
      };

      ChannelHandler.onMentionReceived = function (channel, message) {
        var channelUrl = channel.url;
        logger.info('OpenChannel | useHandleChannelEvents: onMentionReceived', {
          channelUrl: channelUrl,
          message: message
        });
        messagesDispatcher({
          type: ON_MENTION_RECEIVED,
          payload: {
            channel: channel,
            message: message
          }
        });
      };

      sdk.addChannelHandler(messageReceiverId, ChannelHandler);
    }

    return function () {
      if (sdk && sdk.removeChannelHandler) {
        logger.info('OpenChannel | useHandleChannelEvents: Removing message receiver handler', messageReceiverId);
        sdk.removeChannelHandler(messageReceiverId);
      }
    };
  }, [currentOpenChannel]); // useInitialMessagesFetch

  React.useEffect(function () {
    logger.info('OpenChannel | useInitialMessagesFetch: Setup started', currentOpenChannel);
    messagesDispatcher({
      type: RESET_MESSAGES
    });

    if (sdk && sdk.MessageListParams && currentOpenChannel && currentOpenChannel.getMessagesByTimestamp) {
      var messageListParams_1 = new sdk.MessageListParams();
      messageListParams_1.prevResultSize = 30;
      messageListParams_1.isInclusive = true;
      messageListParams_1.includeReplies = false;
      messageListParams_1.includeReactions = false;

      if (userFilledMessageListParams) {
        Object.keys(userFilledMessageListParams).forEach(function (key) {
          messageListParams_1[key] = userFilledMessageListParams[key];
        });
        logger.info('OpenChannel | Used customizedMessageListParams');
      }

      logger.info('OpenChannel | Fetching messages', {
        currentOpenChannel: currentOpenChannel,
        messageListParams: messageListParams_1
      });
      currentOpenChannel.getMessagesByTimestamp(new Date().getTime(), messageListParams_1, function (messages, error) {
        if (!error) {
          logger.info('OpenChannel | Fetching messages succeeded', messages);
          var hasMore_1 = messages && messages.length > 0;
          var lastMessageTimestamp_1 = hasMore_1 ? messages[0].createdAt : null;
          messagesDispatcher({
            type: GET_PREV_MESSAGES_SUCESS,
            payload: {
              currentOpenChannel: currentOpenChannel,
              messages: messages,
              hasMore: hasMore_1,
              lastMessageTimestamp: lastMessageTimestamp_1
            }
          });
          setTimeout(function () {
            scrollIntoLast('.sendbird-msg--scroll-ref');
          });
        } else {
          logger.error('OpenChannel | Fetching messages failed', error);
          messagesDispatcher({
            type: GET_PREV_MESSAGES_FAIL,
            payload: {
              currentOpenChannel: currentOpenChannel,
              messages: [],
              hasMore: false,
              lastMessageTimestamp: 0
            }
          });
        }
      }); // todo: use promise after CoreSDK adds required TS methods
      // .then((messages) => {
      //   console.log('get messages via getMessagesByTimestamp', messages);
      //   const hasMore = (messages && messages.length > 0);
      //   const lastMessageTimestamp = hasMore
      //     ? messages[0].createdAt
      //     : null;
      //   messagesDispatcher({
      //     type: messageActionTypes.GET_PREV_MESSAGES_SUCESS,
      //     payload: {
      //       currentOpenChannel,
      //       messages,
      //       hasMore,
      //       lastMessageTimestamp,
      //     },
      //   });
      // })
      // .catch((error: Error): void => {
      //   logger.error('OpenChannel | Fetching messages failed', error);
      //   messagesDispatcher({
      //     type: messageActionTypes.GET_PREV_MESSAGES_FAIL,
      //     payload: {
      //       currentOpenChannel,
      //       messages: [],
      //       hasMore: false,
      //       lastMessageTimestamp: 0,
      //     }
      //   });
      // });
    }
  }, [currentOpenChannel]); // useScrollCallback

  var onScroll = React.useCallback(function (callback) {
    if (!hasMore) {
      return;
    }

    var messageListParams = new sdk.MessageListParams();
    messageListParams.prevResultSize = 30;
    messageListParams.includeReplies = false;
    messageListParams.includeReactions = false;

    if (userFilledMessageListParams) {
      Object.keys(userFilledMessageListParams).forEach(function (key) {
        messageListParams[key] = userFilledMessageListParams[key];
      });
      logger.info('OpenChannel: Used userFilledMessageListParams');
    }

    logger.info('OpenChannel: Fetching messages', {
      currentOpenChannel: currentOpenChannel,
      messageListParams: messageListParams
    });
    currentOpenChannel.getMessagesByTimestamp(lastMessageTimestamp || new Date().getTime(), messageListParams, function (messages, error) {
      if (!error) {
        logger.info('OpenChannel | Fetching messages succeeded', messages);
        var hasMore_2 = messages && messages.length > 0;
        var lastMessageTimestamp_2 = hasMore_2 ? messages[0].createdAt : null;
        messagesDispatcher({
          type: GET_PREV_MESSAGES_SUCESS,
          payload: {
            currentOpenChannel: currentOpenChannel,
            messages: messages,
            hasMore: hasMore_2,
            lastMessageTimestamp: lastMessageTimestamp_2
          }
        });
        setTimeout(function () {
          callback();
        });
      } else {
        logger.error('OpenChannel | Fetching messages failed', error);
        messagesDispatcher({
          type: GET_PREV_MESSAGES_FAIL,
          payload: {
            currentOpenChannel: currentOpenChannel,
            messages: [],
            hasMore: false,
            lastMessageTimestamp: 0
          }
        });
      }
    });
  }, [currentOpenChannel, lastMessageTimestamp]); // useSendMessageCallback

  var handleSendMessage = React.useCallback(function () {
    var text = messageInputRef.current.value;

    function createParamsDefualt(txt) {
      var message = typeof txt === 'string' ? txt.trim() : txt.toString(10).trim();
      var params = new sdk.UserMessageParams();
      params.message = message;
      return params;
    }

    var createCustomParams = onBeforeSendUserMessage && typeof onBeforeSendUserMessage === 'function';

    if (createCustomParams) {
      logger.info('OpenChannel | Creating params using onBeforeSendUserMessage', onBeforeSendUserMessage);
    }

    var params = onBeforeSendUserMessage ? onBeforeSendUserMessage(text) : createParamsDefualt(text);
    logger.info('OpenChannel | Sending message has started', params);
    var pendingMessage = currentOpenChannel.sendUserMessage(params, function (message, error) {
      if (error) {
        logger.warning('OpenChannel | Sending message failed', {
          message: message
        });
        messagesDispatcher({
          type: SENDING_MESSAGE_FAILED,
          payload: message
        });
        return;
      }

      logger.info('OpenChannel | Sending message succeeded', {
        message: message
      });
      messagesDispatcher({
        type: SENDING_MESSAGE_SUCCEEDED,
        payload: message
      });
    });
    messagesDispatcher({
      type: SENDING_MESSAGE_START,
      payload: {
        message: pendingMessage,
        channel: currentOpenChannel
      }
    });
  }, [currentOpenChannel, onBeforeSendUserMessage]); // useFileUploadCallback

  var handleFileUpload = React.useCallback(function (file) {
    function createParamsDefualt(file_) {
      var params = new sdk.FileMessageParams();
      params.file = file_;
      return params;
    }

    var createCustomParams = onBeforeSendFileMessage && typeof onBeforeSendFileMessage === 'function';

    if (createCustomParams) {
      logger.info('OpenChannel | Creating params using onBeforeSendFileMessage', onBeforeSendFileMessage);
    }

    var params = onBeforeSendFileMessage ? onBeforeSendFileMessage(file) : createParamsDefualt(file);
    logger.info('OpenChannel | Uploading file message start', params);
    var pendingMessage = currentOpenChannel.sendFileMessage(params, function (message, error) {
      if (error) {
        logger.error('OpenChannel | Sending file message failed', {
          message: message,
          error: error
        });
        message.localUrl = URL.createObjectURL(file);
        message.file = file;
        messagesDispatcher({
          type: SENDING_MESSAGE_FAILED,
          payload: message
        });
        return;
      }

      logger.info('OpenChannel | Sending message succeeded', message);
      messagesDispatcher({
        type: SENDING_MESSAGE_SUCCEEDED,
        payload: message
      });
    });
    messagesDispatcher({
      type: SENDING_MESSAGE_START,
      payload: {
        message: LocalizationContext.__assign(LocalizationContext.__assign({}, pendingMessage), {
          url: URL.createObjectURL(file),
          // pending thumbnail message seems to be failed
          requestState: 'pending'
        }),
        channel: currentOpenChannel
      }
    });
  }, [currentOpenChannel, onBeforeSendFileMessage]); // useUpdateMessageCallback

  var updateMessage = React.useCallback(function (messageId, text, callback) {
    function createParamsDefualt(txt) {
      var params = new sdk.UserMessageParams();
      params.message = txt;
      return params;
    }

    if (onBeforeSendUserMessage && typeof onBeforeSendUserMessage === 'function') {
      logger.info('OpenChannel | Creating params using onBeforeUpdateUserMessage');
    }

    var params = onBeforeSendUserMessage ? onBeforeSendUserMessage(text) : createParamsDefualt(text);
    currentOpenChannel.updateUserMessage(messageId, params, function (message, error) {
      if (callback) {
        callback();
      }

      if (!error) {
        logger.info('OpenChannel | Updating message succeeded', {
          message: message,
          params: params
        });
        messagesDispatcher({
          type: ON_MESSAGE_UPDATED,
          payload: {
            channel: currentOpenChannel,
            message: message
          }
        });
      } else {
        logger.warning('OpenChannel | Updating message failed', error);
      }
    });
  }, [currentOpenChannel, messagesDispatcher, onBeforeSendUserMessage]); // useDeleteMessageCallback

  var deleteMessage = React.useCallback(function (message, callback) {
    logger.info('OpenChannel | useDeleteMessageCallback: Deleting message', message);
    var requestState = message.requestState;
    logger.info('OpenChannel | useDeleteMessageCallback: Deleting message requestState: ', requestState);

    if (requestState === 'failed' || requestState === 'pending') {
      logger.info('OpenChannel | useDeleteMessageCallback: Deleted message from local: ', message);
      messagesDispatcher({
        type: ON_MESSAGE_DELETED_BY_REQ_ID,
        payload: message.reqId
      });

      if (callback) {
        callback();
      }

      return;
    }

    currentOpenChannel.deleteMessage(message, function (error) {
      logger.info('OpenChannel | useDeleteMessageCallback: Deleting message from remote: ', requestState);

      if (callback) {
        callback();
      }

      if (!error) {
        logger.info('OpenChannel | useDeleteMessageCallback: Deleting message succeeded', message);
        messagesDispatcher({
          type: ON_MESSAGE_DELETED,
          payload: {
            channel: currentOpenChannel,
            messageId: message.messageId
          }
        });
      } else {
        logger.warning('OpenChannel | useDeleteMessageCallback: Deleting message failed', error);
      }
    });
  }, [currentOpenChannel, messagesDispatcher]); // useResendMessageCallback

  var resendMessage = React.useCallback(function (failedMessage) {
    logger.info('OpenChannel | Reseding message has started', failedMessage);
    var messageType = failedMessage.messageType,
        file = failedMessage.file;

    if (failedMessage && typeof failedMessage.isResendable === 'function' && failedMessage.isResendable()) {
      // eslint-disable-next-line no-param-reassign
      failedMessage.requestState = 'pending';
      messagesDispatcher({
        type: RESENDING_MESSAGE_START,
        payload: {
          channel: currentOpenChannel,
          message: failedMessage
        }
      }); // userMessage

      if (messageType === 'user' && failedMessage.messageType === 'user') {
        currentOpenChannel.resendUserMessage(failedMessage, function (message, error) {
          if (!error) {
            logger.info('OpenChannel | Reseding message succeeded', message);
            messagesDispatcher({
              type: SENDING_MESSAGE_SUCCEEDED,
              payload: message
            });
          } else {
            logger.warning('OpenChannel | Resending message failed', error); // eslint-disable-next-line no-param-reassign

            failedMessage.requestState = 'failed';
            messagesDispatcher({
              type: SENDING_MESSAGE_FAILED,
              payload: failedMessage
            });
          }
        });
        return;
      } // fileMessage


      if (messageType === 'file' && failedMessage.messageType === 'file') {
        currentOpenChannel.resendFileMessage(failedMessage, file, function (message, error) {
          if (!error) {
            logger.info('OpenChannel | Resending file message succeeded', message);
            messagesDispatcher({
              type: SENDING_MESSAGE_SUCCEEDED,
              payload: message
            });
          } else {
            logger.warning('OpenChannel | Resending file message failed', error); // eslint-disable-next-line no-param-reassign

            failedMessage.requestState = 'failed';
            messagesDispatcher({
              type: SENDING_MESSAGE_FAILED,
              payload: failedMessage
            });
          }
        });
      }
    } else {
      // to alert user on console
      // eslint-disable-next-line no-console
      console.error('OpenChannel | Message is not resendable');
      logger.warning('OpenChannel | Message is not resendable', failedMessage);
    }
  }, [currentOpenChannel, messagesDispatcher]);

  var handleClickScrollDownButton = function handleClickScrollDownButton() {
    var promise = new Promise(function (resolve) {
      resolve();
    });
    setScrollDownPromise(promise);
  };

  if (!currentOpenChannel || !currentOpenChannel.url) {
    return React__default.createElement("div", {
      className: COMPONENT_CLASS_NAME$1
    }, React__default.createElement(index$1.PlaceHolder, {
      type: index$1.PlaceHolderTypes$1.NO_CHANNELS
    }));
  }

  if (loading) {
    return React__default.createElement("div", {
      className: COMPONENT_CLASS_NAME$1
    }, React__default.createElement(index$1.PlaceHolder, {
      type: index$1.PlaceHolderTypes$1.LOADING
    }));
  }

  if (isInvalid) {
    return React__default.createElement("div", {
      className: COMPONENT_CLASS_NAME$1
    }, React__default.createElement(index$1.PlaceHolder, {
      type: index$1.PlaceHolderTypes$1.WRONG
    }));
  }

  return React__default.createElement(index$1.UserProfileProvider, {
    className: COMPONENT_CLASS_NAME$1,
    disableUserProfile: userDefinedDisableUserProfile,
    renderUserProfile: userDefinedRenderProfile
  }, showScrollDownButton && React__default.createElement("div", {
    className: COMPONENT_CLASS_NAME$1 + "__go-to-bottom",
    onClick: handleClickScrollDownButton,
    onKeyDown: handleClickScrollDownButton,
    tabIndex: 0,
    role: "button"
  }, React__default.createElement(index$1.Icon, {
    width: "24px",
    height: "24px",
    type: index$1.IconTypes.SHEVRON_DOWN,
    fillColor: index$1.IconColors.CONTENT
  })), renderChannelTitle ? renderChannelTitle({
    channel: currentOpenChannel,
    user: user
  }) : React__default.createElement(OpenchannelConversationHeader, {
    title: currentOpenChannel.name,
    subTitle: kFormatter(currentOpenChannel.participantCount) + " " + stringSet.OPEN_CHANNEL_CONVERSATION__TITLE_PARTICIPANTS,
    coverImage: currentOpenChannel.coverUrl,
    onActionClick: onChatHeaderActionClick
  }), currentOpenChannel.isFrozen && React__default.createElement(FrozenNotification, null), React__default.createElement(OpenchannelConversationScroll, {
    openchannel: currentOpenChannel,
    user: user,
    useMessageGrouping: useMessageGrouping,
    isOnline: isOnline,
    allMessages: allMessages,
    onScroll: onScroll,
    hasMore: hasMore,
    scrollDownPromise: scrollDownPromise,
    showScrollDownButton: setShowScrollDownButton,
    updateMessage: updateMessage,
    deleteMessage: deleteMessage,
    resendMessage: resendMessage
  }), renderMessageInput ? renderMessageInput({
    channel: currentOpenChannel,
    user: user,
    disabled: disabled
  }) : React__default.createElement(MessageInputWrapper$1, {
    channel: currentOpenChannel,
    user: user,
    ref: messageInputRef,
    disabled: disabled,
    onSendMessage: handleSendMessage,
    onFileUpload: handleFileUpload,
    renderMessageInput: renderMessageInput
  }));
};
var index = LocalizationContext.withSendbirdContext(OpenchannelConversation);

exports.OpenchannelConversation = OpenchannelConversation;
exports.default = index;
//# sourceMappingURL=OpenChannel.js.map
