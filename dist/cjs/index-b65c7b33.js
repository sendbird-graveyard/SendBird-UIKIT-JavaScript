'use strict';

var React = require('react');
var PropTypes = require('prop-types');
var reactDom = require('react-dom');
var LocalizationContext = require('./LocalizationContext-9319934a.js');
var index = require('./index-3f565819.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

/**
 * user profile goes deep inside the component tree
 * use this context as a short circuit to send in values
 */

var UserProfileContext = /*#__PURE__*/React__default['default'].createContext({
  disableUserProfile: true,
  isOpenChannel: false,
  renderUserProfile: null
});

var UserProfileProvider = function UserProfileProvider(props) {
  var children = props.children,
      className = props.className;
  return /*#__PURE__*/React__default['default'].createElement(UserProfileContext.Provider, {
    value: props
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: className
  }, children));
};

UserProfileProvider.propTypes = {
  children: PropTypes__default['default'].oneOfType([PropTypes__default['default'].element, PropTypes__default['default'].arrayOf(PropTypes__default['default'].element), PropTypes__default['default'].any]).isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  isOpenChannel: PropTypes__default['default'].bool,
  // eslint-disable-next-line react/no-unused-prop-types
  disableUserProfile: PropTypes__default['default'].bool,
  // eslint-disable-next-line react/no-unused-prop-types
  renderUserProfile: PropTypes__default['default'].func,
  className: PropTypes__default['default'].string
};
UserProfileProvider.defaultProps = {
  className: null,
  isOpenChannel: false,
  disableUserProfile: false,
  renderUserProfile: null
};

var IconButton = /*#__PURE__*/React__default['default'].forwardRef(function (props, ref) {
  var className = props.className,
      children = props.children,
      disabled = props.disabled,
      width = props.width,
      height = props.height,
      type = props.type,
      _onClick = props.onClick,
      _onBlur = props.onBlur,
      style = props.style;

  var _useState = React.useState(''),
      _useState2 = LocalizationContext._slicedToArray(_useState, 2),
      pressed = _useState2[0],
      setPressed = _useState2[1];

  return (
    /*#__PURE__*/
    // eslint-disable-next-line react/button-has-type
    React__default['default'].createElement("button", {
      className: [].concat(LocalizationContext._toConsumableArray(Array.isArray(className) ? className : [className]), ['sendbird-iconbutton', pressed]).join(' '),
      disabled: disabled,
      ref: ref,
      type: type // eslint-disable-line react/button-has-type
      ,
      style: LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, style), {}, {
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
    }, /*#__PURE__*/React__default['default'].createElement("span", {
      className: "sendbird-iconbutton__inner"
    }, children))
  );
});
IconButton.propTypes = {
  className: PropTypes__default['default'].oneOfType([PropTypes__default['default'].string, PropTypes__default['default'].arrayOf(PropTypes__default['default'].string)]),
  children: PropTypes__default['default'].oneOfType([PropTypes__default['default'].element, PropTypes__default['default'].arrayOf(PropTypes__default['default'].element), PropTypes__default['default'].any]).isRequired,
  disabled: PropTypes__default['default'].bool,
  width: PropTypes__default['default'].string,
  height: PropTypes__default['default'].string,
  type: PropTypes__default['default'].string,
  onClick: PropTypes__default['default'].func,
  onBlur: PropTypes__default['default'].func,
  style: PropTypes__default['default'].shape({})
};
IconButton.defaultProps = {
  className: '',
  disabled: false,
  width: '56px',
  height: '56px',
  type: 'button',
  onClick: function onClick() {},
  onBlur: function onBlur() {},
  style: {}
};

// simple component to be used as modal root
var MODAL_ROOT = 'sendbird-modal-root';

var Type = {
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
    case Type.PRIMARY:
      return 'sendbird-button--primary';

    case Type.SECONDARY:
      return 'sendbird-button--secondary';

    case Type.DANGER:
      return 'sendbird-button--danger';

    case Type.DISABLED:
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
  var className = _ref.className,
      type = _ref.type,
      size = _ref.size,
      children = _ref.children,
      disabled = _ref.disabled,
      onClick = _ref.onClick;
  var injectingClassNames = [].concat(LocalizationContext._toConsumableArray(Array.isArray(className) ? className : [className]), ['sendbird-button', disabled ? 'sendbird-button__disabled' : '', changeTypeToClassName(type), changeSizeToClassName(size)]).join(' ');
  return /*#__PURE__*/React__default['default'].createElement("button", {
    className: injectingClassNames,
    type: "button",
    onClick: onClick,
    disabled: disabled
  }, /*#__PURE__*/React__default['default'].createElement(index.Label, {
    className: "sendbird-button__text",
    type: index.LabelTypography.BUTTON_1,
    color: index.LabelColors.ONCONTENT_1
  }, children));
}
var ButtonTypes = Type;
var ButtonSizes = Size;
Button.propTypes = {
  className: PropTypes__default['default'].oneOfType([PropTypes__default['default'].string, PropTypes__default['default'].arrayOf(PropTypes__default['default'].string)]),
  type: PropTypes__default['default'].oneOf(Object.keys(Type)),
  size: PropTypes__default['default'].oneOf(Object.keys(Size)),
  children: PropTypes__default['default'].oneOfType([PropTypes__default['default'].string, PropTypes__default['default'].element, PropTypes__default['default'].arrayOf(PropTypes__default['default'].element)]),
  disabled: PropTypes__default['default'].bool,
  onClick: PropTypes__default['default'].func
};
Button.defaultProps = {
  className: '',
  type: Type.PRIMARY,
  size: Size.BIG,
  children: 'Button',
  disabled: false,
  onClick: function onClick() {}
};

var ModalHeader = function ModalHeader(_ref) {
  var titleText = _ref.titleText;
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-modal__header"
  }, /*#__PURE__*/React__default['default'].createElement(index.Label, {
    type: index.LabelTypography.H_1,
    color: index.LabelColors.ONBACKGROUND_1
  }, titleText));
};
ModalHeader.propTypes = {
  titleText: PropTypes__default['default'].string.isRequired
};
var ModalBody = function ModalBody(_ref2) {
  var children = _ref2.children;
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-modal__body"
  }, children);
};
ModalBody.propTypes = {
  children: PropTypes__default['default'].oneOfType([PropTypes__default['default'].element.isRequired, PropTypes__default['default'].arrayOf(PropTypes__default['default'].element.isRequired)])
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

  var _useContext = React.useContext(LocalizationContext.LocalizationContext),
      stringSet = _useContext.stringSet;

  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-modal__footer"
  }, /*#__PURE__*/React__default['default'].createElement(Button, {
    type: ButtonTypes.SECONDARY,
    onClick: onCancel
  }, /*#__PURE__*/React__default['default'].createElement(index.Label, {
    type: index.LabelTypography.BUTTON_1,
    color: index.LabelColors.ONBACKGROUND_1
  }, stringSet.BUTTON__CANCEL)), /*#__PURE__*/React__default['default'].createElement(Button, {
    type: type,
    disabled: disabled,
    onClick: onSubmit
  }, submitText));
};
ModalFooter.propTypes = {
  onCancel: PropTypes__default['default'].func.isRequired,
  onSubmit: PropTypes__default['default'].func.isRequired,
  submitText: PropTypes__default['default'].string.isRequired,
  disabled: PropTypes__default['default'].bool,
  type: PropTypes__default['default'].string
};
ModalFooter.defaultProps = {
  disabled: false,
  type: ButtonTypes.DANGER
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
  return /*#__PURE__*/reactDom.createPortal( /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-modal"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-modal__content"
  }, /*#__PURE__*/React__default['default'].createElement(ModalHeader, {
    titleText: titleText
  }), /*#__PURE__*/React__default['default'].createElement(ModalBody, null, children), !hideFooter && /*#__PURE__*/React__default['default'].createElement(ModalFooter, {
    disabled: disabled,
    onCancel: onCancel,
    onSubmit: onSubmit,
    submitText: submitText,
    type: type
  }), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-modal__close"
  }, /*#__PURE__*/React__default['default'].createElement(IconButton, {
    width: "32px",
    height: "32px",
    onClick: onCancel
  }, /*#__PURE__*/React__default['default'].createElement(index.Icon, {
    type: index.IconTypes.CLOSE,
    fillColor: index.IconColors.DEFAULT,
    width: "24px",
    height: "24px"
  })))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-modal__backdrop"
  })), document.getElementById(MODAL_ROOT));
}

Modal.propTypes = {
  children: PropTypes__default['default'].oneOfType([PropTypes__default['default'].element, PropTypes__default['default'].arrayOf(PropTypes__default['default'].element)]),
  onCancel: PropTypes__default['default'].func.isRequired,
  onSubmit: PropTypes__default['default'].func.isRequired,
  hideFooter: PropTypes__default['default'].bool,
  disabled: PropTypes__default['default'].bool,
  type: PropTypes__default['default'].string
};
Modal.defaultProps = {
  children: null,
  hideFooter: false,
  disabled: false,
  type: ButtonTypes.DANGER
};

var Colors = {
  ONBACKGROUND_1: 'ONBACKGROUND_1',
  ONBACKGROUND_2: 'ONBACKGROUND_2',
  ONBACKGROUND_3: 'ONBACKGROUND_3',
  ONBACKGROUND_4: 'ONBACKGROUND_4',
  ONCONTENT_1: 'ONCONTENT_1',
  PRIMARY: 'PRIMARY',
  ERROR: 'ERROR'
};
function changeColorToClassName(color) {
  switch (color) {
    case Colors.ONBACKGROUND_1:
      return 'sendbird-color--onbackground-1';

    case Colors.ONBACKGROUND_2:
      return 'sendbird-color--onbackground-2';

    case Colors.ONBACKGROUND_3:
      return 'sendbird-color--onbackground-3';

    case Colors.ONBACKGROUND_4:
      return 'sendbird-color--onbackground-4';

    case Colors.ONCONTENT_1:
      return 'sendbird-color--oncontent-1';

    case Colors.PRIMARY:
      return 'sendbird-color--primary';

    case Colors.ERROR:
      return 'sendbird-color--error';

    default:
      return null;
  }
}

function TextButton(_ref) {
  var className = _ref.className,
      color = _ref.color,
      disabled = _ref.disabled,
      notUnderline = _ref.notUnderline,
      onClick = _ref.onClick,
      children = _ref.children;
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: [].concat(LocalizationContext._toConsumableArray(Array.isArray(className) ? className : [className]), [changeColorToClassName(color), notUnderline ? 'sendbird-textbutton--not-underline' : 'sendbird-textbutton', disabled ? 'sendbird-textbutton--disabled' : '']).join(' '),
    role: "button",
    tabIndex: 0,
    onClick: onClick,
    onKeyPress: onClick
  }, children);
}
TextButton.propTypes = {
  className: PropTypes__default['default'].oneOfType([PropTypes__default['default'].string, PropTypes__default['default'].arrayOf(PropTypes__default['default'].string)]),
  color: PropTypes__default['default'].string,
  disabled: PropTypes__default['default'].bool,
  notUnderline: PropTypes__default['default'].bool,
  onClick: PropTypes__default['default'].func,
  children: PropTypes__default['default'].oneOfType([PropTypes__default['default'].string, PropTypes__default['default'].element]).isRequired
};
TextButton.defaultProps = {
  className: '',
  color: Colors.ONBACKGROUND_1,
  disabled: false,
  notUnderline: false,
  onClick: function onClick() {}
};

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
  getEnterOpenChannel: enterOpenChannel,
  getExitOpenChannel: exitOpenChannel,
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
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird__user-profile"
  }, /*#__PURE__*/React__default['default'].createElement("section", {
    className: "sendbird__user-profile-avatar"
  }, /*#__PURE__*/React__default['default'].createElement(index.Avatar, {
    height: "80px",
    width: "80px",
    src: user.profileUrl
  })), /*#__PURE__*/React__default['default'].createElement("section", {
    className: "sendbird__user-profile-name"
  }, /*#__PURE__*/React__default['default'].createElement(index.Label, {
    type: index.LabelTypography.H_2,
    color: index.LabelColors.ONBACKGROUND_1
  }, user.nickname || stringSet.NO_NAME)), user.userId !== currentUserId && !disableMessaging && /*#__PURE__*/React__default['default'].createElement("section", {
    className: "sendbird__user-profile-message"
  }, /*#__PURE__*/React__default['default'].createElement(Button, {
    type: ButtonTypes.SECONDARY,
    onClick: function onClick() {
      var params = new sdk.GroupChannelParams();
      params.isDistinct = true;
      params.addUserIds([user.userId]);
      onSuccess();
      createChannel(params).then(function (groupChannel) {
        logger.info('UserProfile, channel create', groupChannel);
      });
    }
  }, stringSet.USER_PROFILE__MESSAGE)), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird__user-profile-seperator"
  }), /*#__PURE__*/React__default['default'].createElement("section", {
    className: "sendbird__user-profile-userId"
  }, /*#__PURE__*/React__default['default'].createElement(index.Label, {
    className: "sendbird__user-profile-userId--label",
    type: index.LabelTypography.CAPTION_2,
    color: index.LabelColors.ONBACKGROUND_2
  }, stringSet.USER_PROFILE__USER_ID), /*#__PURE__*/React__default['default'].createElement(index.Label, {
    className: "sendbird__user-profile-userId--value",
    type: index.LabelTypography.BODY_1,
    color: index.LabelColors.ONBACKGROUND_1
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

var ConnectedUserProfile = LocalizationContext.withSendbirdContext(UserProfile, mapStoreToProps);

var MenuItems$1 = /*#__PURE__*/function (_Component) {
  LocalizationContext._inherits(MenuItems, _Component);

  var _super = LocalizationContext._createSuper(MenuItems);

  function MenuItems(props) {
    var _this;

    LocalizationContext._classCallCheck(this, MenuItems);

    _this = _super.call(this, props);

    LocalizationContext._defineProperty(LocalizationContext._assertThisInitialized(_this), "showParent", function () {
      var _this$props$parentCon = _this.props.parentContainRef,
          parentContainRef = _this$props$parentCon === void 0 ? {} : _this$props$parentCon;
      var current = parentContainRef.current;

      if (parentContainRef && current) {
        current.classList.add('sendbird-icon--pressed');
      }
    });

    LocalizationContext._defineProperty(LocalizationContext._assertThisInitialized(_this), "hideParent", function () {
      var _this$props$parentCon2 = _this.props.parentContainRef,
          parentContainRef = _this$props$parentCon2 === void 0 ? {} : _this$props$parentCon2;
      var current = parentContainRef.current;

      if (parentContainRef && current) {
        current.classList.remove('sendbird-icon--pressed');
      }
    });

    LocalizationContext._defineProperty(LocalizationContext._assertThisInitialized(_this), "setupEvents", function () {
      var closeDropdown = _this.props.closeDropdown;

      var _assertThisInitialize = LocalizationContext._assertThisInitialized(_this),
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

    LocalizationContext._defineProperty(LocalizationContext._assertThisInitialized(_this), "cleanUpEvents", function () {
      var handleClickOutside = _this.state.handleClickOutside;
      document.removeEventListener('mousedown', handleClickOutside);
    });

    LocalizationContext._defineProperty(LocalizationContext._assertThisInitialized(_this), "getMenuPosition", function () {
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

    _this.menuRef = /*#__PURE__*/React__default['default'].createRef();
    _this.state = {
      menuStyle: {},
      handleClickOutside: function handleClickOutside() {}
    };
    return _this;
  }

  LocalizationContext._createClass(MenuItems, [{
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
      return /*#__PURE__*/reactDom.createPortal( /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("div", {
        className: "sendbird-dropdown__menu-backdrop"
      }), /*#__PURE__*/React__default['default'].createElement("ul", {
        className: "sendbird-dropdown__menu",
        ref: this.menuRef,
        style: LocalizationContext._objectSpread2({
          display: 'inline-block',
          position: 'fixed',
          left: "".concat(Math.round(menuStyle.left), "px"),
          top: "".concat(Math.round(menuStyle.top), "px")
        }, style)
      }, children)), document.getElementById('sendbird-dropdown-portal'));
    }
  }]);

  return MenuItems;
}(React.Component);
MenuItems$1.propTypes = {
  closeDropdown: PropTypes__default['default'].func.isRequired,
  children: PropTypes__default['default'].oneOfType([PropTypes__default['default'].element, PropTypes__default['default'].arrayOf(PropTypes__default['default'].element)]).isRequired,
  style: PropTypes__default['default'].shape({}),
  // https://stackoverflow.com/a/51127130
  parentRef: PropTypes__default['default'].oneOfType([PropTypes__default['default'].func, PropTypes__default['default'].shape({
    current: PropTypes__default['default'].instanceOf(Element)
  })]).isRequired,
  parentContainRef: PropTypes__default['default'].oneOfType([PropTypes__default['default'].func, PropTypes__default['default'].shape({
    current: PropTypes__default['default'].instanceOf(Element)
  })]).isRequired,
  openLeft: PropTypes__default['default'].bool
};
MenuItems$1.defaultProps = {
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

  if (children.length > maxItemCount) {
    var result = [];

    for (var i = 0; i < children.length; i += maxItemCount) {
      result.push( /*#__PURE__*/React__default['default'].createElement("div", {
        className: [].concat(LocalizationContext._toConsumableArray(Array.isArray(className) ? className : [className]), [componentClassName]).join(' '),
        key: className + i,
        style: {
          width: itemWidth * maxItemCount,
          height: itemHeight
        }
      }, children.slice(i, i + maxItemCount)));
    }

    return result;
  }

  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: [].concat(LocalizationContext._toConsumableArray(Array.isArray(className) ? className : [className]), [componentClassName]).join(' '),
    style: {
      width: itemWidth * children.length,
      height: itemHeight
    }
  }, children);
}
SortByRow.propTypes = {
  className: PropTypes__default['default'].oneOfType([PropTypes__default['default'].string, PropTypes__default['default'].arrayOf(PropTypes__default['default'].string)]),
  maxItemCount: PropTypes__default['default'].number.isRequired,
  itemWidth: PropTypes__default['default'].number.isRequired,
  itemHeight: PropTypes__default['default'].number.isRequired,
  children: PropTypes__default['default'].oneOfType([PropTypes__default['default'].element, PropTypes__default['default'].arrayOf(PropTypes__default['default'].element), PropTypes__default['default'].string, PropTypes__default['default'].arrayOf(PropTypes__default['default'].string)]).isRequired
};
SortByRow.defaultProps = {
  className: ''
};

var EmojiListItems$1 = /*#__PURE__*/function (_Component) {
  LocalizationContext._inherits(EmojiListItems, _Component);

  var _super = LocalizationContext._createSuper(EmojiListItems);

  function EmojiListItems(props) {
    var _this;

    LocalizationContext._classCallCheck(this, EmojiListItems);

    _this = _super.call(this, props);

    LocalizationContext._defineProperty(LocalizationContext._assertThisInitialized(_this), "showParent", function () {
      var _this$props$parentCon = _this.props.parentContainRef,
          parentContainRef = _this$props$parentCon === void 0 ? {} : _this$props$parentCon;
      var current = parentContainRef.current;

      if (parentContainRef && current) {
        current.classList.add('sendbird-reactions--pressed');
      }
    });

    LocalizationContext._defineProperty(LocalizationContext._assertThisInitialized(_this), "hideParent", function () {
      var _this$props$parentCon2 = _this.props.parentContainRef,
          parentContainRef = _this$props$parentCon2 === void 0 ? {} : _this$props$parentCon2;
      var current = parentContainRef.current;

      if (parentContainRef && current) {
        current.classList.remove('sendbird-reactions--pressed');
      }
    });

    LocalizationContext._defineProperty(LocalizationContext._assertThisInitialized(_this), "setupEvents", function () {
      var closeDropdown = _this.props.closeDropdown;

      var _assertThisInitialize = LocalizationContext._assertThisInitialized(_this),
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

    LocalizationContext._defineProperty(LocalizationContext._assertThisInitialized(_this), "cleanUpEvents", function () {
      var handleClickOutside = _this.state.handleClickOutside;
      document.removeEventListener('mousedown', handleClickOutside);
    });

    LocalizationContext._defineProperty(LocalizationContext._assertThisInitialized(_this), "getBarPosition", function () {
      // calculate the location that the context menu should be
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

      var rect = _this.reactionRef.current.getBoundingClientRect();

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

    _this.reactionRef = /*#__PURE__*/React__default['default'].createRef();
    _this.state = {
      reactionStyle: {},
      handleClickOutside: function handleClickOutside() {}
    };
    return _this;
  }

  LocalizationContext._createClass(EmojiListItems, [{
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
      return /*#__PURE__*/reactDom.createPortal( /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("div", {
        className: "sendbird-dropdown__menu-backdrop"
      }), /*#__PURE__*/React__default['default'].createElement("ul", {
        className: "sendbird-dropdown__reaction-bar",
        ref: this.reactionRef,
        style: {
          display: 'inline-block',
          position: 'fixed',
          left: "".concat(Math.round(reactionStyle.left), "px"),
          top: "".concat(Math.round(reactionStyle.top), "px")
        }
      }, /*#__PURE__*/React__default['default'].createElement(SortByRow, {
        className: "sendbird-dropdown__reaction-bar__row",
        maxItemCount: 8,
        itemWidth: 44,
        itemHeight: 40
      }, children))), document.getElementById('sendbird-emoji-list-portal'));
    }
  }]);

  return EmojiListItems;
}(React.Component);
EmojiListItems$1.propTypes = {
  closeDropdown: PropTypes__default['default'].func.isRequired,
  children: PropTypes__default['default'].oneOfType([PropTypes__default['default'].element, PropTypes__default['default'].arrayOf(PropTypes__default['default'].element)]).isRequired,
  parentRef: PropTypes__default['default'].oneOfType([PropTypes__default['default'].func, PropTypes__default['default'].shape({
    current: PropTypes__default['default'].instanceOf(Element)
  })]).isRequired,
  parentContainRef: PropTypes__default['default'].oneOfType([PropTypes__default['default'].func, PropTypes__default['default'].shape({
    current: PropTypes__default['default'].instanceOf(Element)
  })]).isRequired,
  spaceFromTrigger: PropTypes__default['default'].shape({
    x: PropTypes__default['default'].number,
    y: PropTypes__default['default'].number
  })
};
EmojiListItems$1.defaultProps = {
  spaceFromTrigger: {}
};

var ENTER = 13;
var MenuItems = MenuItems$1;
var EmojiListItems = EmojiListItems$1;
var MenuItem = function MenuItem(_ref) {
  var className = _ref.className,
      children = _ref.children,
      onClick = _ref.onClick;
  return /*#__PURE__*/React__default['default'].createElement("li", {
    className: [].concat(LocalizationContext._toConsumableArray(Array.isArray(className) ? className : [className]), ['sendbird-dropdown__menu-item']).join(' '),
    role: "menuitem",
    onClick: onClick,
    onKeyPress: function onKeyPress(e) {
      if (e.keyCode === ENTER) {
        onClick(e);
      }
    },
    tabIndex: 0
  }, /*#__PURE__*/React__default['default'].createElement(index.Label, {
    className: "sendbird-dropdown__menu-item__text",
    type: index.LabelTypography.SUBTITLE_2,
    color: index.LabelColors.ONBACKGROUND_1
  }, children));
};
MenuItem.propTypes = {
  className: PropTypes__default['default'].oneOfType([PropTypes__default['default'].string, PropTypes__default['default'].arrayOf(PropTypes__default['default'].string)]),
  children: PropTypes__default['default'].oneOfType([PropTypes__default['default'].string, PropTypes__default['default'].element]).isRequired,
  onClick: PropTypes__default['default'].func.isRequired
};
MenuItem.defaultProps = {
  className: ''
}; // Root components should be appended before ContextMenu is rendered
function ContextMenu(_ref2) {
  var menuTrigger = _ref2.menuTrigger,
      menuItems = _ref2.menuItems;

  var _useState = React.useState(false),
      _useState2 = LocalizationContext._slicedToArray(_useState, 2),
      showMenu = _useState2[0],
      setShowMenu = _useState2[1];

  return /*#__PURE__*/React__default['default'].createElement("div", {
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
  menuTrigger: PropTypes__default['default'].func.isRequired,
  menuItems: PropTypes__default['default'].func.isRequired
};

exports.Button = Button;
exports.ButtonSizes = ButtonSizes;
exports.ButtonTypes = ButtonTypes;
exports.CREATE_CHANNEL = CREATE_CHANNEL;
exports.Colors = Colors;
exports.ConnectedUserProfile = ConnectedUserProfile;
exports.ContextMenu = ContextMenu;
exports.DELETE_MESSAGE = DELETE_MESSAGE;
exports.EmojiListItems = EmojiListItems;
exports.IconButton = IconButton;
exports.LEAVE_CHANNEL = LEAVE_CHANNEL;
exports.MODAL_ROOT = MODAL_ROOT;
exports.MenuItem = MenuItem;
exports.MenuItems = MenuItems;
exports.Modal = Modal;
exports.SEND_FILE_MESSAGE = SEND_FILE_MESSAGE;
exports.SEND_MESSAGE_START = SEND_MESSAGE_START;
exports.SEND_USER_MESSAGE = SEND_USER_MESSAGE;
exports.TextButton = TextButton;
exports.Type = Type;
exports.UPDATE_USER_MESSAGE = UPDATE_USER_MESSAGE;
exports.UserProfileContext = UserProfileContext;
exports.UserProfileProvider = UserProfileProvider;
exports.changeColorToClassName = changeColorToClassName;
exports.getSdk = getSdk;
exports.selectors = selectors;
//# sourceMappingURL=index-b65c7b33.js.map
