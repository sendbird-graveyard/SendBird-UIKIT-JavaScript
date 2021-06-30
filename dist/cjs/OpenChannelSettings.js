'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var LocalizationContext = require('./LocalizationContext-96132df1.js');
var React = require('react');
var React__default = _interopDefault(React);
require('prop-types');
var index$1 = require('./index-7bb6095b.js');
var index$2 = require('./index-944fbc98.js');
var utils = require('./utils-6aedec02.js');
require('date-fns/format');
require('./type-c7a3bee7.js');
require('react-dom');
var index$3 = require('./index-f441aa10.js');
var utils$2 = require('./utils-c8e36c68.js');
var index$4 = require('./index-c092ddb7.js');

function ChannelAvatar(_a) {
  var channel = _a.channel,
      theme = _a.theme,
      _b = _a.height,
      height = _b === void 0 ? 56 : _b,
      _c = _a.width,
      width = _c === void 0 ? 56 : _c;
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  var memoizedAvatar = React.useMemo(function () {
    return React__default.createElement(index$2.Avatar, {
      className: "sendbird-chat-header__avatar--open-channel",
      src: utils.getOpenChannelAvatar(channel),
      width: width + "px",
      height: height + "px",
      alt: channel.name || stringSet.OPEN_CHANNEL_SETTINGS__NO_TITLE
    });
  }, [channel.coverUrl, theme]);
  return React__default.createElement(React__default.Fragment, null, memoizedAvatar);
}

var EditDetails = function EditDetails(props) {
  var _onSubmit = props.onSubmit,
      onCancel = props.onCancel,
      channel = props.channel,
      theme = props.theme;
  var inputRef = React.useRef(null);
  var formRef = React.useRef(null);
  var hiddenInputRef = React.useRef(null);

  var _a = React.useState(null),
      currentImg = _a[0],
      setCurrentImg = _a[1];

  var _b = React.useState(null),
      newFile = _b[0],
      setNewFile = _b[1];

  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  var title = channel.name;
  return React__default.createElement(index$1.Modal, {
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
    type: index$1.Type.PRIMARY
  }, React__default.createElement("form", {
    className: "channel-profile-form",
    ref: formRef,
    onSubmit: function onSubmit(e) {
      e.preventDefault();
    }
  }, React__default.createElement("div", {
    className: "channel-profile-form__img-section"
  }, React__default.createElement(index$3.InputLabel, null, stringSet.MODAL__CHANNEL_INFORMATION__CHANNEL_IMAGE), React__default.createElement("div", {
    className: "channel-profile-form__avatar"
  }, currentImg ? React__default.createElement(index$2.Avatar, {
    height: "80px",
    width: "80px",
    src: currentImg
  }) : React__default.createElement(ChannelAvatar, {
    height: 80,
    width: 80,
    channel: channel,
    theme: theme
  })), React__default.createElement("input", {
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
  }), React__default.createElement(index$1.TextButton, {
    className: "channel-profile-form__avatar-button",
    onClick: function onClick() {
      return hiddenInputRef.current.click();
    },
    notUnderline: true
  }, React__default.createElement(index$2.Label, {
    type: index$2.LabelTypography.BUTTON_1,
    color: index$2.LabelColors.PRIMARY
  }, stringSet.MODAL__CHANNEL_INFORMATION__UPLOAD))), React__default.createElement("div", {
    className: "channel-profile-form__name-section"
  }, React__default.createElement(index$3.InputLabel, null, stringSet.MODAL__CHANNEL_INFORMATION__CHANNEL_NAME), React__default.createElement(index$3.Input, {
    required: title !== '',
    name: "channel-profile-form__name",
    ref: inputRef,
    value: title,
    placeHolder: stringSet.MODAL__CHANNEL_INFORMATION__INPUT__PLACE_HOLDER
  }))));
};

function ChannelProfile(props) {
  var disabled = props.disabled,
      channel = props.channel,
      theme = props.theme,
      onChannelInfoChange = props.onChannelInfoChange;
  var title = channel.name;

  var _a = React.useState(false),
      showModal = _a[0],
      setShowModal = _a[1];

  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  return React__default.createElement("div", {
    className: "sendbird-openchannel-profile"
  }, React__default.createElement("div", {
    className: "sendbird-openchannel-profile--inner"
  }, React__default.createElement("div", {
    className: "sendbird-openchannel-profile__avatar"
  }, React__default.createElement(ChannelAvatar, {
    channel: channel,
    theme: theme,
    height: 80,
    width: 80
  })), React__default.createElement(index$2.Label, {
    type: index$2.LabelTypography.SUBTITLE_2,
    color: index$2.LabelColors.ONBACKGROUND_1,
    className: "sendbird-openchannel-profile__title"
  }, title || stringSet.OPEN_CHANNEL_SETTINGS__NO_TITLE), React__default.createElement(index$1.TextButton, {
    disabled: disabled,
    className: "sendbird-openchannel-profile__edit",
    onClick: function onClick() {
      if (disabled) {
        return;
      }

      setShowModal(true);
    },
    notUnderline: true
  }, React__default.createElement(index$2.Label, {
    type: index$2.LabelTypography.BUTTON_1,
    color: disabled ? index$2.LabelColors.ONBACKGROUND_2 : index$2.LabelColors.PRIMARY
  }, stringSet.CHANNEL_SETTING__PROFILE__EDIT)), showModal && React__default.createElement(EditDetails, {
    onCancel: function onCancel() {
      return setShowModal(false);
    },
    onSubmit: onChannelInfoChange,
    channel: channel,
    theme: theme
  })));
}

function ParticipantsModal(_a) {
  var hideModal = _a.hideModal,
      channel = _a.channel;
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;

  var _b = React.useState([]),
      participants = _b[0],
      setParticipants = _b[1];

  var _c = React.useState(null),
      participantListQuery = _c[0],
      setParticipantListQuery = _c[1];

  React.useEffect(function () {
    if (!channel || !channel.createParticipantListQuery) {
      return;
    }

    var participantListQuery = channel.createParticipantListQuery();
    setParticipantListQuery(participantListQuery);
    participantListQuery.next(function (participantList, error) {
      if (error) {
        return;
      }

      setParticipants(participantList);
    });
  }, []);
  return React__default.createElement("div", null, React__default.createElement(index$1.Modal, {
    hideFooter: true,
    onCancel: function onCancel() {
      return hideModal();
    },
    onSubmit: utils.noop,
    titleText: stringSet.OPEN_CHANNEL_SETTINGS__ALL_PARTICIPANTS_TITLE
  }, React__default.createElement("div", {
    className: "sendbird-more-members__popup-scroll",
    onScroll: function onScroll(e) {
      var hasNext = participantListQuery.hasNext;
      var target = e.target;
      var fetchMore = target.clientHeight + target.scrollTop === target.scrollHeight;

      if (hasNext && fetchMore) {
        participantListQuery.next(function (fetchedParticipants, error) {
          if (error) {
            return;
          }

          setParticipants(LocalizationContext.__spreadArrays(participants, fetchedParticipants));
        });
      }
    }
  }, participants.map(function (p) {
    return React__default.createElement(index$3.UserListItem, {
      user: p,
      key: p.userId
    });
  }))));
}

var SHOWN_MEMBER_MAX = 10;
var UserListItem = function UserListItem(_a) {
  var member = _a.member,
      _b = _a.currentUser,
      currentUser = _b === void 0 ? '' : _b;
  var avatarRef = React.useRef(null);

  var _c = React.useContext(index$1.UserProfileContext),
      disableUserProfile = _c.disableUserProfile,
      renderUserProfile = _c.renderUserProfile;

  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  return React__default.createElement("div", {
    className: "sendbird-participants-accordion__member"
  }, React__default.createElement("div", {
    className: "sendbird-participants-accordion__member-avatar"
  }, React__default.createElement(index$1.ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return React__default.createElement(index$2.Avatar, {
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
      return React__default.createElement(index$1.MenuItems, {
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
      }) : React__default.createElement(index$1.UserProfile, {
        disableMessaging: true,
        user: member,
        currentUserId: currentUser,
        onSuccess: closeDropdown
      }));
    }
  })), React__default.createElement(index$2.Label, {
    type: index$2.LabelTypography.SUBTITLE_2,
    color: index$2.LabelColors.ONBACKGROUND_1
  }, member.nickname || stringSet.NO_NAME, currentUser === member.userId && stringSet.YOU));
};
function ParticipantsAccordion(_a) {
  var channel = _a.channel,
      currentUser = _a.currentUser;

  var _b = React.useState([]),
      participants = _b[0],
      setParticipants = _b[1];

  var _c = React.useState(false),
      showMoreModal = _c[0],
      setShowMoreModal = _c[1];

  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  React.useEffect(function () {
    if (!channel || !channel.createParticipantListQuery) {
      return;
    }

    var participantListQuery = channel.createParticipantListQuery();
    participantListQuery.next(function (participantList, error) {
      if (error) {
        return;
      }

      setParticipants(participantList);
    });
  }, [channel]);
  return React__default.createElement(index$4.Accordion, {
    className: "sendbird-participants-accordion",
    id: "participants",
    renderTitle: function renderTitle() {
      return React__default.createElement(React__default.Fragment, null, React__default.createElement(index$2.Icon, {
        type: index$2.IconTypes.MEMBERS,
        fillColor: index$2.IconColors.PRIMARY,
        width: 24,
        height: 24,
        className: "sendbird-openchannel-settings__accordion-icon"
      }), React__default.createElement(index$2.Label, {
        type: index$2.LabelTypography.SUBTITLE_1,
        color: index$2.LabelColors.ONBACKGROUND_1
      }, stringSet.OPEN_CHANNEL_SETTINGS__PARTICIPANTS_ACCORDION_TITLE));
    },
    renderContent: function renderContent() {
      return React__default.createElement("div", {
        className: ""
      }, React__default.createElement("div", {
        className: "sendbird-participants-accordion__list"
      }, participants.slice(0, SHOWN_MEMBER_MAX).map(function (p) {
        return React__default.createElement(UserListItem, {
          member: p,
          currentUser: currentUser,
          key: p.userId
        });
      }), participants && participants.length === 0 ? React__default.createElement(index$2.Label, {
        className: "sendbird-channel-settings__empty-list",
        type: index$2.LabelTypography.SUBTITLE_2,
        color: index$2.LabelColors.ONBACKGROUND_3
      }, stringSet.OPEN_CHANNEL_SETTINGS__EMPTY_LIST) : null), participants.length >= SHOWN_MEMBER_MAX && React__default.createElement("div", {
        className: "sendbird-participants-accordion__footer"
      }, React__default.createElement(index$1.Button, {
        className: "sendbird-participants-accordion__footer__all-participants",
        type: index$1.ButtonTypes.SECONDARY,
        size: index$1.ButtonSizes.SMALL,
        onClick: function onClick() {
          return setShowMoreModal(true);
        }
      }, stringSet.OPEN_CHANNEL_SETTINGS__SEE_ALL), showMoreModal && React__default.createElement(ParticipantsModal, {
        currentUser: currentUser,
        hideModal: function hideModal() {
          setShowMoreModal(false);
        },
        channel: channel
      })));
    }
  });
}

function DeleteChannel(_a) {
  var isOnline = _a.isOnline,
      onDeleteChannel = _a.onDeleteChannel;

  var _b = React.useState(false),
      showDeleteChannelModal = _b[0],
      setShowDeleteChannelModal = _b[1];

  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  return React__default.createElement(React__default.Fragment, null, React__default.createElement("div", {
    className: "sendbird-openchannel-settings__panel-item\n          sendbird-openchannel-settings__delete-channel\n            " + (!isOnline ? 'sendbird-openchannel-settings__panel-item__disabled' : ''),
    role: "button",
    tabIndex: 0,
    onKeyDown: function onKeyDown() {
      if (!isOnline) {
        return;
      }

      setShowDeleteChannelModal(true);
    },
    onClick: function onClick() {
      if (!isOnline) {
        return;
      }

      setShowDeleteChannelModal(true);
    }
  }, React__default.createElement(index$2.Icon, {
    type: index$2.IconTypes.DELETE,
    className: ['sendbird-openchannel-settings__panel-icon-left', 'sendbird-openchannel-settings__panel-icon__delete'].join(' '),
    height: "24px",
    width: "24px"
  }), React__default.createElement(index$2.Label, {
    type: index$2.LabelTypography.SUBTITLE_1,
    color: index$2.LabelColors.ONBACKGROUND_1
  }, stringSet.OPEN_CHANNEL_SETTINGS__DELETE_CHANNEL_PANEL)), showDeleteChannelModal && React__default.createElement(index$1.Modal, {
    onCancel: function onCancel() {
      setShowDeleteChannelModal(false);
    },
    onSubmit: function onSubmit() {
      onDeleteChannel();
    },
    submitText: stringSet.OPEN_CHANNEL_SETTINGS__DELETE_CHANNEL_SUBMIT,
    titleText: stringSet.OPEN_CHANNEL_SETTINGS__DELETE_CHANNEL_TITLE
  }));
}

function ParticipantsList(_a) {
  var channel = _a.channel,
      onCloseClick = _a.onCloseClick,
      currentUser = _a.currentUser;
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;

  var _b = React.useState([]),
      participants = _b[0],
      setParticipants = _b[1];

  var _c = React.useState(null),
      participantListQuery = _c[0],
      setParticipantListQuery = _c[1];

  React.useEffect(function () {
    if (!channel || !channel.createParticipantListQuery) {
      return;
    }

    var participantListQuery = channel.createParticipantListQuery();
    setParticipantListQuery(participantListQuery);
    participantListQuery.next(function (participantList, error) {
      if (error) {
        return;
      }

      setParticipants(participantList);
    });
  }, [channel]);
  return React__default.createElement("div", {
    className: "sendbird-openchannel-settings__participant"
  }, React__default.createElement("div", {
    className: "sendbird-openchannel-settings__header"
  }, React__default.createElement(index$2.Label, {
    type: index$2.LabelTypography.H_2,
    color: index$2.LabelColors.ONBACKGROUND_1
  }, stringSet.OPEN_CHANNEL_SETTINGS__PARTICIPANTS_TITLE), React__default.createElement(index$2.Icon, {
    type: index$2.IconTypes.CLOSE,
    className: "sendbird-openchannel-settings__close-icon",
    height: "24px",
    width: "24px",
    onClick: function onClick() {
      onCloseClick();
    }
  })), React__default.createElement("div", {
    className: "sendbird-openchannel-settings__participants-list",
    onScroll: function onScroll(e) {
      var hasNext = participantListQuery.hasNext;
      var target = e.target;
      var fetchMore = target.clientHeight + target.scrollTop === target.scrollHeight;

      if (hasNext && fetchMore) {
        participantListQuery.next(function (fetchedParticipants, error) {
          if (error) {
            return;
          }

          setParticipants(LocalizationContext.__spreadArrays(participants, fetchedParticipants));
        });
      }
    }
  }, React__default.createElement("div", null, participants.map(function (p) {
    return React__default.createElement(UserListItem, {
      member: p,
      currentUser: currentUser,
      key: p.userId
    });
  }), participants && participants.length === 0 ? React__default.createElement(index$2.Label, {
    className: "sendbird-channel-settings__empty-list",
    type: index$2.LabelTypography.SUBTITLE_2,
    color: index$2.LabelColors.ONBACKGROUND_3
  }, stringSet.OPEN_CHANNEL_SETTINGS__EMPTY_LIST) : null)));
}

function InvalidChannel(_a) {
  var onCloseClick = _a.onCloseClick;
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  return React__default.createElement("div", {
    className: "sendbird-openchannel-settings"
  }, React__default.createElement("div", {
    className: "sendbird-openchannel-settings__header"
  }, React__default.createElement(index$2.Label, {
    type: index$2.LabelTypography.H_2,
    color: index$2.LabelColors.ONBACKGROUND_1
  }, stringSet.CHANNEL_SETTING__HEADER__TITLE), React__default.createElement(index$2.Icon, {
    type: index$2.IconTypes.CLOSE,
    className: "sendbird-openchannel-settings__close-icon",
    height: "24px",
    width: "24px",
    onClick: function onClick() {
      onCloseClick();
    }
  })), React__default.createElement("div", {
    className: "sendbird-openchannel-settings__placeholder"
  }, React__default.createElement(index$2.PlaceHolder, {
    type: index$2.PlaceHolderTypes.WRONG
  })));
}

var emptyLogger = function emptyLogger() {
  return {
    info: utils.noop,
    error: utils.noop,
    warning: utils.noop
  };
};

function OpenChannelSettings(props) {
  var channelUrl = props.channelUrl,
      _a = props.onCloseClick,
      _onCloseClick = _a === void 0 ? utils.noop : _a,
      onBeforeUpdateChannel = props.onBeforeUpdateChannel,
      _b = props.onChannelModified,
      onChannelModified = _b === void 0 ? utils.noop : _b,
      renderChannelProfile = props.renderChannelProfile,
      renderUserProfile = props.renderUserProfile,
      _onDeleteChannel = props.onDeleteChannel,
      _c = props.disableUserProfile,
      disableUserProfile = _c === void 0 ? false : _c,
      _d = props.logger,
      logger = _d === void 0 ? emptyLogger() : _d,
      sdk = props.sdk,
      theme = props.theme,
      user = props.user,
      isOnline = props.isOnline;

  var currentUser = user.userId;

  var _e = React.useState(null),
      channel = _e[0],
      setChannel = _e[1];

  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  React.useEffect(function () {
    if (!channelUrl || !sdk || !sdk.getConnectionState) {
      setChannel(null);
      return;
    }

    sdk.OpenChannel.getChannel(channelUrl, function (openChannel, error) {
      if (!error) {
        setChannel(openChannel);
      } else {
        setChannel(null);
      }
    });
  }, [channelUrl, sdk]);

  if (!channel) {
    return React__default.createElement(InvalidChannel, {
      onCloseClick: function onCloseClick() {
        logger.info('OpenChannelSettings: Click close');

        if (_onCloseClick) {
          _onCloseClick();
        }
      }
    });
  }

  return React__default.createElement(index$1.UserProfileProvider, {
    className: "sendbird-openchannel-settings",
    disableUserProfile: disableUserProfile,
    renderUserProfile: renderUserProfile
  }, channel.isOperator(user) ? React__default.createElement(React__default.Fragment, null, React__default.createElement("div", {
    className: "sendbird-openchannel-settings__header"
  }, React__default.createElement(index$2.Label, {
    type: index$2.LabelTypography.H_2,
    color: index$2.LabelColors.ONBACKGROUND_1
  }, stringSet.CHANNEL_SETTING__HEADER__TITLE), React__default.createElement(index$2.Icon, {
    className: "sendbird-openchannel-settings__close-icon",
    type: index$2.IconTypes.CLOSE,
    height: "24px",
    width: "24px",
    onClick: function onClick() {
      _onCloseClick();
    }
  })), React__default.createElement("div", {
    className: "sendbird-openchannel-settings__profile"
  }, renderChannelProfile ? renderChannelProfile({
    channel: channel,
    user: user
  }) : React__default.createElement(ChannelProfile, {
    disabled: !isOnline,
    channel: channel,
    theme: theme,
    onChannelInfoChange: function onChannelInfoChange(currentImg, currentTitle) {
      logger.info('ChannelSettings: Channel information being updated');

      if (onBeforeUpdateChannel) {
        var params = onBeforeUpdateChannel(currentTitle, currentImg, channel.data);
        logger.info('ChannelSettings: onBeforeUpdateChannel', params);
        channel.updateChannel(params, function (openChannel) {
          onChannelModified(openChannel); // setChannel(openChannel) => alone not working

          setChannel(null);
          setChannel(openChannel);
        });
      } else {
        channel.updateChannel(currentTitle, currentImg, channel.data, function (openChannel) {
          logger.info('ChannelSettings: Channel information updated', openChannel);
          onChannelModified(openChannel); // setChannel(openChannel) => alone not working

          setChannel(null);
          setChannel(openChannel);
        });
      }
    }
  })), React__default.createElement("div", {
    className: "sendbird-openchannel-settings__url"
  }, React__default.createElement(index$2.Icon, {
    className: "sendbird-openchannel-settings__copy-icon",
    type: index$2.IconTypes.COPY,
    height: "22px",
    width: "22px",
    onClick: function onClick() {
      utils$2.copyToClipboard(channel.url);
    }
  }), React__default.createElement(index$2.Label, {
    className: "sendbird-openchannel-settings__url-label",
    type: index$2.LabelTypography.CAPTION_2,
    color: index$2.LabelColors.ONBACKGROUND_2
  }, stringSet.OPEN_CHANNEL_SETTINGS__OPERATOR_URL), React__default.createElement(index$2.Label, {
    className: "sendbird-openchannel-settings__url-value",
    type: index$2.LabelTypography.SUBTITLE_2
  }, channel.url)), React__default.createElement(index$4.AccordionGroup, null, React__default.createElement(ParticipantsAccordion, {
    channel: channel,
    currentUser: currentUser
  })), React__default.createElement(DeleteChannel, {
    isOnline: isOnline,
    onDeleteChannel: function onDeleteChannel() {
      channel.delete(function (response, error) {
        if (error) {
          logger.warning('OpenChannelSettings: Delete channel failed', error);
          return;
        }

        logger.info('OpenChannelSettings: Delete channel success', response);

        if (_onDeleteChannel) {
          _onDeleteChannel(channel);
        }
      });
    }
  })) : React__default.createElement(ParticipantsList, {
    currentUser: currentUser,
    channel: channel,
    onCloseClick: function onCloseClick() {
      _onCloseClick();
    }
  }));
}

var ChannelSettingsWithSendbird = LocalizationContext.withSendbirdContext(OpenChannelSettings, function (store) {
  var logger = store && store.config && store.config.logger;
  var theme = store && store.config && store.config.theme || 'light';
  var isOnline = store && store.config && store.config.isOnline;
  var user = store && store.stores && store.stores.userStore && store.stores.userStore.user;
  return {
    sdk: index$1.selectors.getSdk(store),
    logger: logger,
    theme: theme,
    isOnline: isOnline,
    user: user
  };
});

module.exports = ChannelSettingsWithSendbird;
//# sourceMappingURL=OpenChannelSettings.js.map
