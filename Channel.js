import { c as _toConsumableArray, a as _objectSpread2, u as uuidv4$1, b as _slicedToArray, k as _defineProperty, d as LocalizationContext, e as _inherits, f as _createClass, h as _classCallCheck, i as _possibleConstructorReturn, j as _getPrototypeOf, l as _assertThisInitialized, w as withSendbirdContext } from './LocalizationContext-12658c38.js';
import React, { useEffect, useCallback, useRef, useMemo, useState, useContext, useLayoutEffect, Component, useReducer } from 'react';
import PropTypes from 'prop-types';
import { h as SEND_USER_MESSAGE, S as SEND_MESSAGE_START, i as SEND_FILE_MESSAGE, U as UPDATE_USER_MESSAGE, D as DELETE_MESSAGE, E as EmojiListItems, C as ContextMenu, I as IconButton, b as MenuItems, c as MenuItem, f as UserProfileContext, g as UserProfile, a as TextButton, M as Modal, e as UserProfileProvider } from './index-711ec843.js';
import { C as ChannelAvatar } from './index-4eb938ab.js';
import { g as ImageRenderer, I as Icon, c as IconTypes, h as Loader, d as IconColors, L as Label, a as LabelTypography, b as LabelColors, A as Avatar, P as PlaceHolder, i as PlaceHolderTypes, e as LabelStringSet } from './index-ad616be9.js';
import { a as getMessageCreatedAt$4, b as getSenderName$2, c as getSenderProfileUrl$2 } from './utils-53ba1773.js';
import format from 'date-fns/format';
import { M as MessageStatusType } from './type-0296584d.js';
import { t as truncate, g as getIsSentFromStatus$3 } from './utils-cfdeb084.js';
import 'react-dom';
import { i as isImage, a as isVideo, c as compareIds, u as unSupported, L as LinkLabel, D as DateSeparator, M as MessageInput, F as FileViewer } from './index-aeef4ba5.js';
import isSameDay from 'date-fns/isSameDay';
import { c as copyToClipboard$1, g as getSenderProfileUrl$1, a as getSenderName$1, b as getMessageCreatedAt$5, d as getIsSentFromStatus$2 } from './utils-d7f59026.js';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';

var RESET_MESSAGES = 'RESET_MESSAGES';
var RESET_STATE = 'RESET_STATE';
var CLEAR_SENT_MESSAGES = 'CLEAR_SENT_MESSAGES';
var GET_PREV_MESSAGES_START = 'GET_PREV_MESSAGES_START';
var GET_PREV_MESSAGES_SUCESS = 'GET_PREV_MESSAGES_SUCESS';
var GET_NEXT_MESSAGES_SUCESS = 'GET_NEXT_MESSAGES_SUCESS';
var GET_NEXT_MESSAGES_FAILURE = 'GET_NEXT_MESSAGES_FAILURE';
var SEND_MESSAGEGE_START = 'SEND_MESSAGEGE_START';
var SEND_MESSAGEGE_SUCESS = 'SEND_MESSAGEGE_SUCESS';
var SEND_MESSAGEGE_FAILURE = 'SEND_MESSAGEGE_FAILURE';
var RESEND_MESSAGEGE_START = 'RESEND_MESSAGEGE_START';
var ON_MESSAGE_RECEIVED = 'ON_MESSAGE_RECEIVED';
var UPDATE_UNREAD_COUNT = 'UPDATE_UNREAD_COUNT';
var ON_MESSAGE_UPDATED = 'ON_MESSAGE_UPDATED';
var ON_MESSAGE_DELETED = 'ON_MESSAGE_DELETED';
var ON_MESSAGE_DELETED_BY_REQ_ID = 'ON_MESSAGE_DELETED_BY_REQ_ID';
var SET_CURRENT_CHANNEL = 'SET_CURRENT_CHANNEL';
var SET_CHANNEL_INVALID = 'SET_CHANNEL_INVALID';
var MARK_AS_READ = 'MARK_AS_READ';
var ON_REACTION_UPDATED = 'ON_REACTION_UPDATED';
var SET_EMOJI_CONTAINER = 'SET_EMOJI_CONTAINER';
var SET_READ_STATUS = 'SET_READ_STATUS';

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
var scrollIntoLast = function scrollIntoLast() {
  var intialTry = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var MAX_TRIES = 10;
  var currentTry = intialTry;

  if (currentTry > MAX_TRIES) {
    return;
  }

  try {
    var scrollDOM = document.querySelector('.sendbird-conversation__scroll-container'); // eslint-disable-next-line no-multi-assign

    scrollDOM.scrollTop = scrollDOM.scrollHeight;
  } catch (error) {
    setTimeout(function () {
      scrollIntoLast(currentTry + 1);
    }, 500 * currentTry);
  }
};
var pubSubHandleRemover = function pubSubHandleRemover(subscriber) {
  subscriber.forEach(function (s) {
    try {
      s.remove();
    } catch (_unused) {//
    }
  });
};
var pubSubHandler = function pubSubHandler(channelUrl, pubSub, dispatcher) {
  var subscriber = new Map();
  if (!pubSub || !pubSub.subscribe) return subscriber;
  subscriber.set(SEND_USER_MESSAGE, pubSub.subscribe(SEND_USER_MESSAGE, function (msg) {
    var channel = msg.channel,
        message = msg.message;
    scrollIntoLast();

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
    scrollIntoLast();

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
        payload: {
          channel: channel,
          message: message
        }
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
var getMessageCreatedAt = function getMessageCreatedAt(message) {
  return format(message.createdAt, 'p');
};
var isSameGroup = function isSameGroup(message, comparingMessage) {
  if (!message || !comparingMessage || !message.sender || !comparingMessage.sender || !message.createdAt || !comparingMessage.createdAt || !message.sender.userId || !comparingMessage.sender.userId) {
    return false;
  }

  return message.sendingStatus === comparingMessage.sendingStatus && message.sender.userId === comparingMessage.sender.userId && getMessageCreatedAt(message) === getMessageCreatedAt(comparingMessage);
};
var compareMessagesForGrouping = function compareMessagesForGrouping(prevMessage, currMessage, nextMessage) {
  return [isSameGroup(prevMessage, currMessage), isSameGroup(currMessage, nextMessage)];
};
var hasOwnProperty = function hasOwnProperty(property) {
  return function (payload) {
    // eslint-disable-next-line no-prototype-builtins
    if (payload && payload.hasOwnProperty && payload.hasOwnProperty(property)) {
      return true;
    }

    return false;
  };
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
var pxToNumber = function pxToNumber(px) {
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
};

var messagesInitialState = {
  initialized: false,
  loading: false,
  allMessages: [],
  currentGroupChannel: {
    members: []
  },
  // for scrollup
  hasMore: false,
  lastMessageTimeStamp: 0,
  // for scroll down
  hasMoreToBottom: false,
  latestFetchedMessageTimeStamp: 0,
  emojiContainer: {},
  readStatus: {},
  unreadCount: 0,
  unreadSince: null,
  isInvalid: false
};

var SUCCEEDED$1 = SendingMessageStatus.SUCCEEDED,
    FAILED$1 = SendingMessageStatus.FAILED,
    PENDING$1 = SendingMessageStatus.PENDING;
function reducer(state, action) {
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
        var receivedMessages = action.payload.messages || [];
        var _action$payload$curre = action.payload.currentGroupChannel,
            currentGroupChannel = _action$payload$curre === void 0 ? {} : _action$payload$curre;
        var stateChannel = state.currentGroupChannel || {};
        var stateChannelUrl = stateChannel.url;
        var actionChannelUrl = currentGroupChannel.url;

        if (actionChannelUrl !== stateChannelUrl) {
          return state;
        } // remove duplicate messages


        var filteredAllMessages = state.allMessages.filter(function (msg) {
          return !receivedMessages.find(function (_ref) {
            var messageId = _ref.messageId;
            return compareIds(messageId, msg.messageId);
          });
        });
        var hasHasMoreToBottom = hasOwnProperty('hasMoreToBottom')(action.payload);
        var hasLatestFetchedMessageTimeStamp = hasOwnProperty('latestFetchedMessageTimeStamp')(action.payload);
        return _objectSpread2({}, state, {
          loading: false,
          initialized: true,
          hasMore: action.payload.hasMore,
          lastMessageTimeStamp: action.payload.lastMessageTimeStamp
        }, hasHasMoreToBottom && {
          hasMoreToBottom: action.payload.hasMoreToBottom
        }, {}, hasLatestFetchedMessageTimeStamp && {
          latestFetchedMessageTimeStamp: action.payload.latestFetchedMessageTimeStamp
        }, {
          allMessages: [].concat(_toConsumableArray(receivedMessages), _toConsumableArray(filteredAllMessages))
        });
      }

    case GET_NEXT_MESSAGES_SUCESS:
      {
        var _receivedMessages = action.payload.messages || [];

        var _action$payload$curre2 = action.payload.currentGroupChannel,
            _currentGroupChannel = _action$payload$curre2 === void 0 ? {} : _action$payload$curre2;

        var _stateChannel = state.currentGroupChannel || {};

        var _stateChannelUrl = _stateChannel.url;
        var _actionChannelUrl = _currentGroupChannel.url;

        if (_actionChannelUrl !== _stateChannelUrl) {
          return state;
        } // remove duplicate messages


        var _filteredAllMessages = state.allMessages.filter(function (msg) {
          return !_receivedMessages.find(function (_ref2) {
            var messageId = _ref2.messageId;
            return compareIds(messageId, msg.messageId);
          });
        });

        return _objectSpread2({}, state, {
          loading: false,
          initialized: true,
          hasMore: action.payload.hasMore,
          lastMessageTimeStamp: action.payload.lastMessageTimeStamp,
          hasMoreToBottom: action.payload.hasMoreToBottom,
          latestFetchedMessageTimeStamp: action.payload.latestFetchedMessageTimeStamp,
          allMessages: [].concat(_toConsumableArray(_filteredAllMessages), _toConsumableArray(_receivedMessages))
        });
      }

    case GET_NEXT_MESSAGES_FAILURE:
      {
        return _objectSpread2({}, state);
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

    case SET_CURRENT_CHANNEL:
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

    case UPDATE_UNREAD_COUNT:
      {
        var channel = action.payload.channel;

        var _state$currentGroupCh = state.currentGroupChannel,
            _currentGroupChannel2 = _state$currentGroupCh === void 0 ? {} : _state$currentGroupCh,
            unreadCount = state.unreadCount;

        var currentGroupChannelUrl = _currentGroupChannel2.url;

        if (!compareIds(channel.url, currentGroupChannelUrl)) {
          return state;
        }

        return _objectSpread2({}, state, {
          unreadSince: unreadCount + 1
        });
      }

    case ON_MESSAGE_RECEIVED:
      {
        var _action$payload = action.payload,
            _channel = _action$payload.channel,
            message = _action$payload.message,
            scrollToEnd = _action$payload.scrollToEnd;
        var _unreadCount = 0;

        var _state$currentGroupCh2 = state.currentGroupChannel,
            _currentGroupChannel3 = _state$currentGroupCh2 === void 0 ? {} : _state$currentGroupCh2,
            unreadSince = state.unreadSince;

        var _currentGroupChannelUrl = _currentGroupChannel3.url;

        if (!compareIds(_channel.url, _currentGroupChannelUrl)) {
          return state;
        } // Excluded overlapping messages


        if (!(state.allMessages.map(function (msg) {
          return msg.messageId;
        }).indexOf(message.messageId) < 0)) {
          return state;
        }

        _unreadCount = state.unreadCount + 1; // reset unreadCount if have to scrollToEnd

        if (scrollToEnd) {
          _unreadCount = 0;
        }

        if (message.isAdminMessage && message.isAdminMessage()) {
          return _objectSpread2({}, state, {
            allMessages: passUnsuccessfullMessages(state.allMessages, message)
          });
        }

        return _objectSpread2({}, state, {
          unreadCount: _unreadCount,
          unreadSince: _unreadCount === 1 ? format(new Date(), 'p MMM dd') : unreadSince,
          allMessages: passUnsuccessfullMessages(state.allMessages, message)
        });
      }

    case ON_MESSAGE_UPDATED:
      return _objectSpread2({}, state, {
        allMessages: state.allMessages.map(function (m) {
          return compareIds(m.messageId, action.payload.message.messageId) ? action.payload.message : m;
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
      sdkInit = _ref.sdkInit,
      hasMoreToBottom = _ref.hasMoreToBottom;
  var messagesDispatcher = _ref2.messagesDispatcher,
      sdk = _ref2.sdk,
      logger = _ref2.logger,
      scrollRef = _ref2.scrollRef;
  var channelUrl = currentGroupChannel && currentGroupChannel.url;
  useEffect(function () {
    var messageReceiverId = uuidv4$1();

    if (channelUrl && sdk && sdk.ChannelHandler) {
      var ChannelHandler = new sdk.ChannelHandler();
      logger.info('Channel | useHandleChannelEvents: Setup event handler', messageReceiverId);

      ChannelHandler.onMessageReceived = function (channel, message) {
        // donot update if hasMoreToBottom
        if (compareIds(channel.url, currentGroupChannel.url) && !hasMoreToBottom) {
          var scrollToEnd = false;

          try {
            var current = scrollRef.current;
            scrollToEnd = current.offsetHeight + current.scrollTop >= current.scrollHeight;
          } catch (error) {//
          }

          logger.info('Channel | useHandleChannelEvents: onMessageReceived', message);
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
                scrollIntoLast();
              });
            } catch (error) {
              logger.warning('Channel | onMessageReceived | scroll to end failed');
            }
          }
        }

        if (compareIds(channel.url, currentGroupChannel.url) && hasMoreToBottom) {
          messagesDispatcher({
            type: UPDATE_UNREAD_COUNT,
            payload: {
              channel: channel
            }
          });
        }
      };

      ChannelHandler.onMessageUpdated = function (channel, message) {
        logger.info('Channel | useHandleChannelEvents: onMessageUpdated', message);
        messagesDispatcher({
          type: ON_MESSAGE_UPDATED,
          payload: {
            channel: channel,
            message: message
          }
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
            type: SET_CURRENT_CHANNEL,
            payload: groupChannel
          });
        }
      };

      ChannelHandler.onChannelFrozen = function (groupChannel) {
        if (compareIds(groupChannel.url, currentGroupChannel.url)) {
          logger.info('Channel | useHandleChannelEvents: onChannelFrozen', groupChannel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL,
            payload: groupChannel
          });
        }
      };

      ChannelHandler.onChannelUnfrozen = function (groupChannel) {
        if (compareIds(groupChannel.url, currentGroupChannel.url)) {
          logger.info('Channel | useHandleChannelEvents: onChannelUnFrozen', groupChannel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL,
            payload: groupChannel
          });
        }
      };

      ChannelHandler.onUserMuted = function (groupChannel) {
        if (compareIds(groupChannel.url, currentGroupChannel.url)) {
          logger.info('Channel | useHandleChannelEvents: onUserMuted', groupChannel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL,
            payload: groupChannel
          });
        }
      };

      ChannelHandler.onUserUnmuted = function (groupChannel) {
        if (compareIds(groupChannel.url, currentGroupChannel.url)) {
          logger.info('Channel | useHandleChannelEvents: onUserUnmuted', groupChannel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL,
            payload: groupChannel
          });
        }
      };

      ChannelHandler.onUserBanned = function (groupChannel) {
        if (compareIds(groupChannel.url, currentGroupChannel.url)) {
          logger.info('Channel | useHandleChannelEvents: onUserBanned', groupChannel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL,
            payload: groupChannel
          });
        }
      };

      ChannelHandler.onOperatorUpdated = function (groupChannel) {
        if (compareIds(groupChannel.url, currentGroupChannel.url)) {
          logger.info('Channel | useHandleChannelEvents: onOperatorUpdated', groupChannel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL,
            payload: groupChannel
          });
        }
      }; // Add this channel event handler to the SendBird object.


      sdk.addChannelHandler(messageReceiverId, ChannelHandler);
    }

    return function () {
      if (sdk && sdk.removeChannelHandler) {
        logger.info('Channel | useHandleChannelEvents: Removing message reciver handler', messageReceiverId);
        sdk.removeChannelHandler(messageReceiverId);
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
          type: SET_CURRENT_CHANNEL,
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

var PREV_RESULT_SIZE = 30;
var NEXT_RESULT_SIZE = 10;

var getLatestMessageTimeStamp = function getLatestMessageTimeStamp() {
  var messages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var latestMessage = messages[messages.length - 1];
  return latestMessage && latestMessage.createdAt || null;
};

function useInitialMessagesFetch(_ref, _ref2) {
  var currentGroupChannel = _ref.currentGroupChannel,
      userFilledMessageListQuery = _ref.userFilledMessageListQuery,
      intialTimeStamp = _ref.intialTimeStamp;
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
      messageListParams.prevResultSize = PREV_RESULT_SIZE;
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
      messagesDispatcher({
        type: GET_PREV_MESSAGES_START
      });

      if (intialTimeStamp) {
        messageListParams.nextResultSize = NEXT_RESULT_SIZE;
        currentGroupChannel.getMessagesByTimestamp(intialTimeStamp, messageListParams).then(function (messages) {
          var hasMore = messages && messages.length > 0;
          var lastMessageTimeStamp = hasMore ? messages[0].createdAt : null;
          var latestFetchedMessageTimeStamp = getLatestMessageTimeStamp(messages); // to make sure there are no more messages below

          var nextMessageListParams = new sdk.MessageListParams();
          nextMessageListParams.nextResultSize = NEXT_RESULT_SIZE;
          currentGroupChannel.getMessagesByTimestamp(latestFetchedMessageTimeStamp || new Date().getTime(), nextMessageListParams).then(function (nextMessages) {
            messagesDispatcher({
              type: GET_PREV_MESSAGES_SUCESS,
              payload: {
                messages: messages,
                hasMore: hasMore,
                lastMessageTimeStamp: lastMessageTimeStamp,
                currentGroupChannel: currentGroupChannel,
                latestFetchedMessageTimeStamp: latestFetchedMessageTimeStamp,
                hasMoreToBottom: nextMessages && nextMessages.length > 0
              }
            });
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
          if (!intialTimeStamp) {
            setTimeout(function () {
              return scrollIntoLast();
            });
          }

          currentGroupChannel.markAsRead();
        });
      } else {
        currentGroupChannel.getMessagesByTimestamp(new Date().getTime(), messageListParams).then(function (messages) {
          var hasMore = messages && messages.length > 0;
          var lastMessageTimeStamp = hasMore ? messages[0].createdAt : null;
          var latestFetchedMessageTimeStamp = getLatestMessageTimeStamp(messages);
          messagesDispatcher({
            type: GET_PREV_MESSAGES_SUCESS,
            payload: {
              messages: messages,
              hasMore: hasMore,
              lastMessageTimeStamp: lastMessageTimeStamp,
              currentGroupChannel: currentGroupChannel,
              latestFetchedMessageTimeStamp: latestFetchedMessageTimeStamp,
              hasMoreToBottom: false
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
          if (!intialTimeStamp) {
            setTimeout(function () {
              return scrollIntoLast();
            });
          }

          currentGroupChannel.markAsRead();
        });
      }
    }
  }, [channelUrl, userFilledMessageListQuery, intialTimeStamp]);
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
              return scrollIntoLast();
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

var RESULT_SIZE = 30;

function useScrollDownCallback(_ref, _ref2) {
  var currentGroupChannel = _ref.currentGroupChannel,
      latestFetchedMessageTimeStamp = _ref.latestFetchedMessageTimeStamp,
      userFilledMessageListQuery = _ref.userFilledMessageListQuery,
      hasMoreToBottom = _ref.hasMoreToBottom;
  var logger = _ref2.logger,
      messagesDispatcher = _ref2.messagesDispatcher,
      sdk = _ref2.sdk;
  return useCallback(function (cb) {
    if (!hasMoreToBottom) {
      return;
    }

    var messageListParams = new sdk.MessageListParams();
    messageListParams.nextResultSize = RESULT_SIZE;
    messageListParams.includeReplies = false;
    messageListParams.includeReaction = true;

    if (userFilledMessageListQuery) {
      Object.keys(userFilledMessageListQuery).forEach(function (key) {
        messageListParams[key] = userFilledMessageListQuery[key];
      });
    }

    logger.info('Channel: Fetching later messages', {
      currentGroupChannel: currentGroupChannel,
      userFilledMessageListQuery: userFilledMessageListQuery
    });
    currentGroupChannel.getMessagesByTimestamp(latestFetchedMessageTimeStamp || new Date().getTime(), messageListParams).then(function (messages) {
      var messagesLength = messages && messages.length || 0;
      var hasMoreMessages = messagesLength > 0 && messageListParams.nextResultSize === messagesLength;
      var lastMessageTs = hasMoreMessages ? messages[messages.length - 1].createdAt : null;
      messagesDispatcher({
        type: GET_NEXT_MESSAGES_SUCESS,
        payload: {
          messages: messages,
          hasMoreToBottom: hasMoreMessages,
          latestFetchedMessageTimeStamp: lastMessageTs,
          currentGroupChannel: currentGroupChannel
        }
      });
      cb([messages, null]);
    }).catch(function (error) {
      logger.error('Channel: Fetching later messages failed', error);
      messagesDispatcher({
        type: GET_NEXT_MESSAGES_FAILURE,
        payload: {
          messages: [],
          hasMoreToBottom: false,
          latestFetchedMessageTimeStamp: 0,
          currentGroupChannel: currentGroupChannel
        }
      });
      cb([null, error]);
    }).finally(function () {
      currentGroupChannel.markAsRead();
    });
  }, [currentGroupChannel, latestFetchedMessageTimeStamp, hasMoreToBottom]);
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
      logger.info('Channel: creating params using onBeforeUpdateUserMessage', onBeforeUpdateUserMessage);
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
          payload: {
            channel: currentGroupChannel,
            message: message
          }
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
      logger.info('Channel: creating params using onBeforeSendUserMessage', onBeforeSendUserMessage);
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
      return scrollIntoLast();
    });
  }, [currentGroupChannel, onBeforeSendUserMessage]);
  return [messageInputRef, sendMessage];
}

function useSendFileMessageCallback(_ref, _ref2) {
  var currentGroupChannel = _ref.currentGroupChannel,
      onBeforeSendFileMessage = _ref.onBeforeSendFileMessage,
      _ref$imageCompression = _ref.imageCompression,
      imageCompression = _ref$imageCompression === void 0 ? {} : _ref$imageCompression;
  var sdk = _ref2.sdk,
      logger = _ref2.logger,
      pubSub = _ref2.pubSub,
      messagesDispatcher = _ref2.messagesDispatcher;
  var sendMessage = useCallback(function (file) {
    var compressionRate = imageCompression.compressionRate,
        resizingWidth = imageCompression.resizingWidth,
        resizingHeight = imageCompression.resizingHeight;
    var createCustomParams = onBeforeSendFileMessage && typeof onBeforeSendFileMessage === 'function';
    var compressibleFileType = file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/jpeg';
    var compressibleRatio = compressionRate > 0 && compressionRate < 1; // pxToNumber returns null if values are invalid

    var compressibleDiamensions = pxToNumber(resizingWidth) || pxToNumber(resizingHeight);
    var canCompressImage = compressibleFileType && (compressibleRatio || compressibleDiamensions);

    var createParamsDefault = function createParamsDefault(file_) {
      var params = new sdk.FileMessageParams();
      params.file = file_;
      return params;
    };

    if (canCompressImage) {
      // Using image compression
      try {
        var image = document.createElement('img');
        image.src = URL.createObjectURL(file);

        image.onload = function () {
          URL.revokeObjectURL(image.src);
          var canvas = document.createElement('canvas');
          var imageWdith = image.naturalWidth || image.width;
          var imageHeight = image.naturalHeight || image.height;
          var targetWidth = pxToNumber(resizingWidth) || imageWdith;
          var targetHeight = pxToNumber(resizingHeight) || imageHeight; // In canvas.toBlob(callback, mimeType, qualityArgument)
          // qualityArgument doesnt work
          // so in case compressibleDiamensions are not present, we use ratio

          if (file.type === 'image/png' && !compressibleDiamensions) {
            targetWidth *= compressionRate;
            targetHeight *= compressionRate;
          }

          canvas.width = targetWidth;
          canvas.height = targetHeight;
          var context = canvas.getContext('2d');
          context.drawImage(image, 0, 0, targetWidth, targetHeight);
          context.canvas.toBlob(function (newImageBlob) {
            var compressedFile = new File([newImageBlob], file.name, {
              type: file.type
            });

            if (createCustomParams) {
              logger.info('Channel: Creating params using onBeforeSendFileMessage', onBeforeSendFileMessage);
            }

            var params = createCustomParams ? onBeforeSendFileMessage(compressedFile) : createParamsDefault(compressedFile);
            logger.info('Channel: Uploading file message start!', params);
            var pendingMessage = currentGroupChannel.sendFileMessage(params, function (response, err) {
              var swapParams = sdk.getErrorFirstCallback();

              var _ref3 = swapParams ? [err, response] : [response, err],
                  _ref4 = _slicedToArray(_ref3, 2),
                  message = _ref4[0],
                  error = _ref4[1];

              if (error) {
                // sending params instead of pending message
                // to make sure that we can resend the message once it fails
                logger.error('Channel: Sending file message failed!', message);
                message.localUrl = URL.createObjectURL(compressedFile);
                message.file = compressedFile;
                messagesDispatcher({
                  type: SEND_MESSAGEGE_FAILURE,
                  payload: message
                });
                return;
              }

              logger.info('Channel: Sending file message success!', message);
              messagesDispatcher({
                type: SEND_MESSAGEGE_SUCESS,
                payload: message
              });
            });
            pubSub.publish(SEND_MESSAGE_START, {
              /* pubSub is used instead of messagesDispatcher
                to avoid redundantly calling `messageActionTypes.SEND_MESSAGEGE_START` */
              message: _objectSpread2({}, pendingMessage, {
                url: URL.createObjectURL(compressedFile),
                // pending thumbnail message seems to be failed
                requestState: 'pending'
              }),
              channel: currentGroupChannel
            });
            setTimeout(function () {
              return scrollIntoLast();
            }, 1000);
          }, file.type, compressionRate);
        };
      } catch (error) {
        logger.error('Channel: Sending file message failed!');
      }
    } else {
      // Not using image compression
      if (createCustomParams) {
        logger.info('Channel: creating params using onBeforeSendFileMessage', onBeforeSendFileMessage);
      }

      var params = onBeforeSendFileMessage ? onBeforeSendFileMessage(file) : createParamsDefault(file);
      logger.info('Channel: Uploading file message start!', params);
      var pendingMsg = currentGroupChannel.sendFileMessage(params, function (response, err) {
        var swapParams = sdk.getErrorFirstCallback();

        var _ref5 = swapParams ? [err, response] : [response, err],
            _ref6 = _slicedToArray(_ref5, 2),
            message = _ref6[0],
            error = _ref6[1];

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
        return scrollIntoLast();
      }, 1000);
    }
  }, [currentGroupChannel, onBeforeSendFileMessage, imageCompression]);
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

    var handlerId = uuidv4$1();
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

      return React.createElement(EmojiListItems, {
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
            type: IconTypes.QUESTION
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
          }, getMessageCreatedAt$4(message));
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
      height: "16px",
      fillColor: IconColors.PRIMARY
    })),
    SENT: React.createElement(Icon, {
      className: "sendbird-message-status__icon",
      width: "16px",
      height: "16px",
      type: IconTypes.DONE,
      fillColor: IconColors.SENT
    }),
    DELIVERED: React.createElement(Icon, {
      className: "sendbird-message-status__icon",
      width: "16px",
      height: "16px",
      type: IconTypes.DONE_ALL,
      fillColor: IconColors.SENT
    }),
    READ: React.createElement(Icon, {
      className: "sendbird-message-status__icon",
      width: "16px",
      height: "16px",
      type: IconTypes.DONE_ALL,
      fillColor: IconColors.READ
    }),
    FAILED: React.createElement(Icon, {
      className: "sendbird-message-status__icon",
      width: "16px",
      height: "16px",
      type: IconTypes.ERROR,
      fillColor: IconColors.ERROR
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

var CLASS_NAME = 'sendbird-tooltip';
function Tooltip(_ref) {
  var className = _ref.className,
      children = _ref.children;
  var injectingClassName = Array.isArray(className) ? className : [className];
  injectingClassName.unshift(CLASS_NAME);
  return React.createElement("div", {
    className: injectingClassName.join(' ')
  }, React.createElement(Label, {
    className: "".concat(CLASS_NAME, "__text")
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

var CLASS_NAME$1 = 'sendbird-tooltip-wrapper';
var SPACE_FROM_TRIGGER = 8;
function TooltipWrapper(_ref) {
  var className = _ref.className,
      children = _ref.children,
      hoverTooltip = _ref.hoverTooltip;
  var injectingClassName = Array.isArray(className) ? [CLASS_NAME$1].concat(_toConsumableArray(className)) : [CLASS_NAME$1, className];

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
    className: "".concat(CLASS_NAME$1, "__children"),
    ref: childrenRef
  }, children), showHoverTooltip && React.createElement("div", {
    className: "".concat(CLASS_NAME$1, "__hover-tooltip"),
    style: {
      bottom: "calc(100% + ".concat(SPACE_FROM_TRIGGER, "px)")
    }
  }, React.createElement("div", {
    className: "".concat(CLASS_NAME$1, "__hover-tooltip__inner")
  }, React.createElement("div", {
    className: "".concat(CLASS_NAME$1, "__hover-tooltip__inner__tooltip-container"),
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
        type: IconTypes.QUESTION
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
        type: IconTypes.EMOJI_MORE
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

function useMemoizedMessageText(_ref) {
  var message = _ref.message,
      updatedAt = _ref.updatedAt,
      className = _ref.className,
      incoming = _ref.incoming;

  var _useContext = useContext(LocalizationContext),
      stringSet = _useContext.stringSet;

  var WORD_TYPOGRAPHY = LabelTypography.BODY_1;
  var EDITED_COLOR = incoming ? LabelColors.ONBACKGROUND_2 : LabelColors.ONCONTENT_2;
  return useMemo(function () {
    return function () {
      var splitMessage = message.split(/\r/);
      var matchedMessage = splitMessage.map(function (word) {
        return word !== '' ? word : React.createElement("br", null);
      });

      if (updatedAt > 0) {
        matchedMessage.push(React.createElement(Label, {
          key: uuidv4$1(),
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

var noop = function noop() {};

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
  var outgoingMemoizedMessageText = useMemoizedMessageText({
    message: message.message,
    updatedAt: message.updatedAt,
    className: 'sendbird-user-message-word'
  });
  var incomingMemoizedMessageText = useMemoizedMessageText({
    message: message.message,
    updatedAt: message.updatedAt,
    className: 'sendbird-user-message-word',
    incoming: true
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
    memoizedMessageText: outgoingMemoizedMessageText,
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
    memoizedMessageText: incomingMemoizedMessageText,
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
  resendMessage: noop,
  className: '',
  showEdit: noop,
  showRemove: noop,
  status: '',
  emojiAllMap: new Map(),
  membersMap: new Map(),
  toggleReaction: noop,
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
  var isMessageSent = getIsSentFromStatus$2(status);

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      mousehover = _useState2[0],
      setMousehover = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      moreActive = _useState4[0],
      setMoreActive = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      menuDisplaying = _useState6[0],
      setMenuDisplaying = _useState6[1];

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
          setMenuDisplaying(true);
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
    menuItems: function menuItems(close) {
      var closeDropdown = function closeDropdown() {
        close();
        setMenuDisplaying(false);
      };

      return React.createElement(MenuItems
      /**
       * parentRef: For catching location(x, y) of MenuItems
       * parentContainRef: For toggling more options(menus & reactions)
       */
      , {
        parentRef: parentRefMenus,
        parentContainRef: parentContainRef,
        closeDropdown: closeDropdown,
        openLeft: true
      }, isMessageSent && React.createElement(MenuItem, {
        className: "sendbird-user-message--copy",
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
        className: "sendbird-user-message__more__add-reaction",
        ref: parentRefReactions,
        width: "32px",
        height: "32px",
        onClick: function onClick() {
          toggleDropdown();
          handleMoreIconClick();
          setMenuDisplaying(true);
        },
        onBlur: function onBlur() {
          handleMoreIconBlur();
        }
      }, React.createElement(Icon, {
        width: "24px",
        height: "24px",
        type: IconTypes.EMOJI_MORE,
        fillColor: IconColors.CONTENT_INVERSE
      }));
    },
    menuItems: function menuItems(close) {
      var closeDropdown = function closeDropdown() {
        close();
        setMenuDisplaying(false);
      };

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
  })), !chainBottom && !(mousehover || moreActive || menuDisplaying) && React.createElement("div", {
    className: "sendbird-user-message__status"
  }, React.createElement(MessageStatus, {
    message: message,
    status: status
  }))), React.createElement("div", {
    className: "sendbird-user-message__text-balloon"
  }, React.createElement("div", {
    className: "sendbird-user-message__text-balloon__inner"
  }, React.createElement("div", {
    className: "sendbird-user-message__text-balloon__inner__text-place"
  }, React.createElement(Label, {
    className: "sendbird-user-message__text-balloon__inner__text-place__text",
    type: LabelTypography.BODY_1,
    color: LabelColors.ONCONTENT_1
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

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      mousehover = _useState8[0],
      setMousehover = _useState8[1];

  var _useState9 = useState(false),
      _useState10 = _slicedToArray(_useState9, 2),
      moreActive = _useState10[0],
      setMoreActive = _useState10[1];

  var _useState11 = useState(false),
      _useState12 = _slicedToArray(_useState11, 2),
      menuDisplaying = _useState12[0],
      setMenuDisplaying = _useState12[1];

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
      return React.createElement(Avatar, {
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
      return React.createElement(MenuItems
      /**
       * parentRef: For catching location(x, y) of MenuItems
       * parentContainRef: For toggling more options(menus & reactions)
       */
      , {
        parentRef: avatarRef,
        parentContainRef: avatarRef,
        closeDropdown: closeDropdown,
        style: {
          paddingTop: 0,
          paddingBottom: 0
        }
      }, renderUserProfile ? renderUserProfile({
        user: message.sender,
        close: closeDropdown
      }) : React.createElement(UserProfile, {
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
    ref: parentContainRef,
    style: {
      top: chainTop ? '6px' : '22px'
    }
  }, showReactionAddButton && React.createElement(ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return React.createElement(IconButton, {
        ref: parentRefReactions,
        width: "32px",
        height: "32px",
        onClick: function onClick() {
          toggleDropdown();
          handleMoreIconClick();
          setMenuDisplaying(true);
        },
        onBlur: function onBlur() {
          handleMoreIconBlur();
        }
      }, React.createElement(Icon, {
        width: "24px",
        height: "24px",
        type: IconTypes.EMOJI_MORE,
        fillColor: IconColors.CONTENT_INVERSE
      }));
    },
    menuItems: function menuItems(close) {
      var closeDropdown = function closeDropdown() {
        close();
        setMenuDisplaying(false);
      };

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
          setMenuDisplaying(true);
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
    menuItems: function menuItems(close) {
      var closeDropdown = function closeDropdown() {
        close();
        setMenuDisplaying(false);
      };

      return React.createElement(MenuItems, {
        parentRef: parentRefMenus,
        parentContainRef: parentContainRef,
        closeDropdown: closeDropdown
      }, React.createElement(MenuItem, {
        className: "sendbird-user-message--copy",
        onClick: function onClick() {
          copyToClipboard$1(message.message);
          closeDropdown();
        }
      }, "Copy"));
    }
  })), !chainBottom && !(mousehover || moreActive || menuDisplaying) && React.createElement(Label, {
    className: "sendbird-user-message__sent-at",
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_2
  }, getMessageCreatedAt$5(message)))));
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
  toggleReaction: noop,
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
  resendMessage: noop,
  showEdit: noop,
  showRemove: noop,
  disabled: false,
  emojiAllMap: new Map(),
  membersMap: new Map(),
  toggleReaction: noop,
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

var getMessageCreatedAt$1 = function getMessageCreatedAt(message) {
  return format(message.createdAt, 'p');
};
var getIsSentFromStatus = function getIsSentFromStatus(status) {
  return status === MessageStatusType.SENT || status === MessageStatusType.DELIVERED || status === MessageStatusType.READ;
};

var noop$1 = function noop() {};

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
      localUrl = message.localUrl,
      thumbnails = message.thumbnails;
  var thumbnailUrl = thumbnails && thumbnails.length > 0 && thumbnails[0].url || null;

  var _useContext = useContext(LocalizationContext),
      stringSet = _useContext.stringSet;

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

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      menuDisplaying = _useState6[0],
      setMenuDisplaying = _useState6[1];

  var showReactionAddButton = useReaction && emojiAllMap && emojiAllMap.size > 0;
  var MemoizedEmojiListItems = memoizedEmojiListItems;
  var isMessageSent = getIsSentFromStatus(status);

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
          setMenuDisplaying(true);
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
    menuItems: function menuItems(close) {
      var closeDropdown = function closeDropdown() {
        close();
        setMenuDisplaying(false);
      };

      return React.createElement(MenuItems
      /**
       * parentRef: For catching location(x, y) of MenuItems
       * parentContainRef: For toggling more options(menus & reactions)
       */
      , {
        parentRef: menuRef,
        parentContainRef: parentContainRef,
        closeDropdown: closeDropdown,
        openLeft: true
      }, message && message.isResendable && message.isResendable() && React.createElement(MenuItem, {
        onClick: function onClick() {
          resendMessage(message);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__RESEND), React.createElement(MenuItem, {
        onClick: function onClick() {
          if (disabled) {
            return;
          }

          showRemove(true);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__DELETE));
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
          setMenuDisplaying(true);
        },
        onBlur: function onBlur() {
          handleMoreIconBlur();
        }
      }, React.createElement(Icon, {
        width: "24px",
        height: "24px",
        type: IconTypes.EMOJI_MORE,
        fillColor: IconColors.CONTENT_INVERSE
      }));
    },
    menuItems: function menuItems(close) {
      var closeDropdown = function closeDropdown() {
        close();
        setMenuDisplaying(false);
      };

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
  })), !chainBottom && !(mousehover || moreActive || menuDisplaying) && React.createElement(MessageStatus, {
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
  }, isVideo(type) && React.createElement(React.Fragment, null, thumbnailUrl ? React.createElement(ImageRenderer, {
    className: "".concat(OUTGOING_THUMBNAIL_MESSAGE, "-body__video"),
    url: thumbnailUrl,
    alt: "video/thumbnail",
    width: "404px",
    height: "280px",
    defaultComponent: React.createElement("div", {
      className: "".concat(OUTGOING_THUMBNAIL_MESSAGE, "__thumbnail-placeholder--video")
    }, React.createElement(Icon, {
      type: IconTypes.PLAY,
      fillColor: IconColors.ON_BACKGROUND_2,
      width: "56px",
      height: "56px"
    }))
  }) :
  /* eslint-disable-next-line jsx-a11y/media-has-caption */
  React.createElement("video", {
    className: "".concat(OUTGOING_THUMBNAIL_MESSAGE, "-body__video")
  }, React.createElement("source", {
    src: url || localUrl,
    type: type
  })), React.createElement(Icon, {
    className: "".concat(OUTGOING_THUMBNAIL_MESSAGE, "-body__video-icon"),
    type: IconTypes.PLAY,
    width: "56px",
    height: "56px"
  })), isImage(type) && React.createElement(ImageRenderer, {
    className: "".concat(OUTGOING_THUMBNAIL_MESSAGE, "-body__img"),
    url: thumbnailUrl || url || localUrl,
    alt: "image/thumbnail",
    width: "404px",
    height: "280px",
    defaultComponent: React.createElement("div", {
      className: "".concat(OUTGOING_THUMBNAIL_MESSAGE, "__thumbnail-placeholder--video")
    }, React.createElement(Icon, {
      type: IconTypes.PHOTO,
      fillColor: IconColors.ON_BACKGROUND_2,
      width: "56px",
      height: "56px"
    }))
  }), unSupported(type) && React.createElement("div", {
    className: "".concat(OUTGOING_THUMBNAIL_MESSAGE, "-body__other")
  }, stringSet.UNKNOWN__UNKNOWN_MESSAGE_TYPE), React.createElement("div", {
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
      localUrl = message.localUrl,
      thumbnails = message.thumbnails;
  var thumbnailUrl = thumbnails && thumbnails.length > 0 && thumbnails[0].url || null;

  var _React$useContext = React.useContext(UserProfileContext),
      disableUserProfile = _React$useContext.disableUserProfile,
      renderUserProfile = _React$useContext.renderUserProfile;

  var _useContext2 = useContext(LocalizationContext),
      stringSet = _useContext2.stringSet;

  var messageRef = useRef(null);
  var parentContainRef = useRef(null);
  var reactionAddRef = useRef(null);
  var avatarRef = useRef(null);

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      mousehover = _useState8[0],
      setMousehover = _useState8[1];

  var _useState9 = useState(false),
      _useState10 = _slicedToArray(_useState9, 2),
      moreActive = _useState10[0],
      setMoreActive = _useState10[1];

  var _useState11 = useState(false),
      _useState12 = _slicedToArray(_useState11, 2),
      menuDisplaying = _useState12[0],
      setMenuDisplaying = _useState12[1];

  var showReactionAddButton = useReaction && emojiAllMap && emojiAllMap.size > 0;
  var MemoizedEmojiListItems = memoizedEmojiListItems;
  var isMessageSent = getIsSentFromStatus(status);

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
  }, getSenderName$2(message) || ''), React.createElement("div", {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "--inner")
  }, React.createElement("div", {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "__body")
  }, React.createElement("div", {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "-body__wrap")
  }, !chainBottom && React.createElement(ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return React.createElement(Avatar, {
        ref: avatarRef,
        onClick: function onClick() {
          if (!disableUserProfile) {
            toggleDropdown();
          }
        },
        className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "__avatar"),
        src: getSenderProfileUrl$2(message),
        width: "28px",
        height: "28px"
      });
    },
    menuItems: function menuItems(closeDropdown) {
      return React.createElement(MenuItems
      /**
       * parentRef: For catching location(x, y) of MenuItems
       * parentContainRef: For toggling more options(menus & reactions)
       */
      , {
        parentRef: avatarRef,
        parentContainRef: avatarRef,
        closeDropdown: closeDropdown,
        style: {
          paddingTop: 0,
          paddingBottom: 0
        }
      }, renderUserProfile ? renderUserProfile({
        user: message.sender,
        close: closeDropdown
      }) : React.createElement(UserProfile, {
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
  }, isVideo(type) && React.createElement(React.Fragment, null, thumbnailUrl ? React.createElement(ImageRenderer, {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "__video"),
    url: thumbnailUrl,
    alt: "video/thumbnail",
    width: "404px",
    height: "280px",
    defaultComponent: React.createElement("div", {
      className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "__thumbnail-placeholder--video")
    }, React.createElement(Icon, {
      type: IconTypes.PLAY,
      fillColor: IconColors.ON_BACKGROUND_2,
      width: "56px",
      height: "56px"
    }))
  }) :
  /* eslint-disable-next-line jsx-a11y/media-has-caption */
  React.createElement("video", {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "__video")
  }, React.createElement("source", {
    src: url || localUrl,
    type: type
  })), React.createElement(Icon, {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "__video-icon"),
    type: IconTypes.PLAY,
    width: "56px",
    height: "56px"
  })), isImage(type) && React.createElement(ImageRenderer, {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "__img"),
    url: thumbnailUrl || url || localUrl,
    alt: "image/thumbnail",
    width: "404px",
    height: "280px",
    defaultComponent: React.createElement("div", {
      className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "__thumbnail-placeholder--image")
    }, React.createElement(Icon, {
      type: IconTypes.PHOTO,
      fillColor: IconColors.ON_BACKGROUND_2,
      width: "56px",
      height: "56px"
    }))
  }), unSupported(type) && React.createElement("div", {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "__other")
  }, stringSet.UNKNOWN__UNKNOWN_MESSAGE_TYPE), React.createElement("div", {
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
  }, !chainBottom && !(mousehover || moreActive || menuDisplaying) && React.createElement(Label, {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "__sent-at"),
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_2
  }, getMessageCreatedAt$1(message)), React.createElement("div", {
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
          setMenuDisplaying(true);
        },
        onBlur: function onBlur() {
          handleMoreIconBlur();
        }
      }, React.createElement(Icon, {
        type: IconTypes.EMOJI_MORE,
        fillColor: IconColors.CONTENT_INVERSE,
        width: "24px",
        height: "24px"
      }));
    },
    menuItems: function menuItems(close) {
      var closeDropdown = function closeDropdown() {
        close();
        setMenuDisplaying(false);
      };

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
  resendMessage: noop$1,
  onClick: noop$1,
  showRemove: noop$1,
  status: '',
  userId: '',
  emojiAllMap: new Map(),
  membersMap: new Map(),
  toggleReaction: noop$1,
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

var noop$2 = function noop() {};

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
  var url = message.plainUrl || message.url;

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

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      menuDisplaying = _useState6[0],
      setMenuDisplaying = _useState6[1];

  var showReactionAddButton = useReaction && emojiAllMap && emojiAllMap.size > 0;
  var MemoizedEmojiListItems = memoizedEmojiListItems;
  var isMessageSent = getIsSentFromStatus$3(status);
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
          setMenuDisplaying(true);
        },
        onBlur: function onBlur() {
          handleMoreIconBlur();
        }
      }, React.createElement(Icon, {
        type: IconTypes.MORE,
        fillColor: IconColors.CONTENT_INVERSE,
        width: "24px",
        height: "24px"
      }));
    },
    menuItems: function menuItems(close) {
      var closeDropdown = function closeDropdown() {
        close();
        setMenuDisplaying(false);
      };

      return React.createElement(MenuItems
      /**
       * parentRef: For catching location(x, y) of MenuItems
       * parentContainRef: For toggling more options(menus & reactions)
       */
      , {
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
          setMenuDisplaying(true);
        },
        onBlur: function onBlur() {
          handleMoreIconBlur();
        }
      }, React.createElement(Icon, {
        width: "24px",
        height: "24px",
        type: IconTypes.EMOJI_MORE,
        fillColor: IconColors.CONTENT_INVERSE
      }));
    },
    menuItems: function menuItems(close) {
      var closeDropdown = function closeDropdown() {
        close();
        setMenuDisplaying(false);
      };

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
  })), !chainBottom && !(mousehover || moreActive || menuDisplaying) && React.createElement("div", {
    className: "sendbird-file-message__status"
  }, React.createElement(MessageStatus, {
    message: message,
    status: status
  }))), React.createElement("div", {
    className: "sendbird-file-message__tooltip"
  }, React.createElement("div", {
    className: "sendbird-file-message__tooltip__inner"
  }, checkFileType(url) ? React.createElement("div", {
    className: "sendbird-file-message__tooltip__icon-box"
  }, React.createElement(Icon, {
    className: "sendbird-file-message__tooltip__icon-box__icon",
    type: checkFileType(url),
    fillColor: IconColors.PRIMARY,
    width: "24px",
    height: "24px"
  })) : null, React.createElement(TextButton, {
    className: "sendbird-file-message__tooltip__text",
    onClick: openFileUrl,
    color: LabelColors.ONCONTENT_1
  }, React.createElement(Label, {
    type: LabelTypography.BODY_1,
    color: LabelColors.ONCONTENT_1
  }, truncate(message.name || message.url, MAX_TRUNCATE_LENGTH)))), showEmojiReactions && React.createElement(EmojiReactions, {
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

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      mousehover = _useState8[0],
      setMousehover = _useState8[1];

  var _useState9 = useState(false),
      _useState10 = _slicedToArray(_useState9, 2),
      moreActive = _useState10[0],
      setMoreActive = _useState10[1];

  var _useState11 = useState(false),
      _useState12 = _slicedToArray(_useState11, 2),
      menuDisplaying = _useState12[0],
      setMenuDisplaying = _useState12[1];

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
      return React.createElement(Avatar, {
        ref: avatarRef,
        onClick: function onClick() {
          if (!disableUserProfile) {
            toggleDropdown();
          }
        },
        className: "sendbird-file-message__avatar",
        src: getSenderProfileUrl$2(message),
        width: "28px",
        height: "28px"
      });
    },
    menuItems: function menuItems(closeDropdown) {
      return React.createElement(MenuItems
      /**
       * parentRef: For catching location(x, y) of MenuItems
       * parentContainRef: For toggling more options(menus & reactions)
       */
      , {
        parentRef: avatarRef,
        parentContainRef: avatarRef,
        closeDropdown: closeDropdown,
        style: {
          paddingTop: 0,
          paddingBottom: 0
        }
      }, renderUserProfile ? renderUserProfile({
        user: message.sender,
        close: closeDropdown
      }) : React.createElement(UserProfile, {
        user: message.sender,
        onSuccess: closeDropdown
      }));
    }
  }), !chainTop && React.createElement(Label, {
    className: "sendbird-file-message__sender-name",
    type: LabelTypography.CAPTION_2,
    color: LabelColors.ONBACKGROUND_2
  }, getSenderName$2(message)), React.createElement("div", {
    className: "sendbird-file-message__tooltip"
  }, React.createElement("div", {
    className: "sendbird-file-message__tooltip__inner"
  }, checkFileType(message.url) ? React.createElement("div", {
    className: "sendbird-file-message__tooltip__icon-box"
  }, React.createElement(Icon, {
    className: "sendbird-file-message__tooltip__icon-box__icon",
    type: checkFileType(message.url),
    fillColor: IconColors.PRIMARY,
    width: "24px",
    height: "24px"
  })) : null, React.createElement(TextButton, {
    className: "sendbird-file-message__tooltip__text",
    onClick: openFileUrl
  }, React.createElement(Label, {
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_1
  }, truncate(message.name || message.url, MAX_TRUNCATE_LENGTH)))), useReaction && message.reactions && message.reactions.length > 0 && React.createElement(EmojiReactions, {
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
          setMenuDisplaying(true);
        },
        onBlur: function onBlur() {
          handleMoreIconBlur();
        }
      }, React.createElement(Icon, {
        width: "24px",
        height: "24px",
        type: IconTypes.EMOJI_MORE,
        fillColor: IconColors.CONTENT_INVERSE
      }));
    },
    menuItems: function menuItems(close) {
      var closeDropdown = function closeDropdown() {
        close();
        setMenuDisplaying(false);
      };

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
  })), !chainBottom && !(mousehover || moreActive || menuDisplaying) && React.createElement(Label, {
    className: "sendbird-file-message__sent-at",
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_2
  }, getMessageCreatedAt$4(message)))));
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
  showRemove: noop$2,
  resendMessage: noop$2,
  message: {},
  userId: '',
  disabled: false,
  emojiAllMap: new Map(),
  membersMap: new Map(),
  toggleReaction: noop$2,
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
  toggleReaction: noop$2,
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
  showRemove: noop$2,
  resendMessage: noop$2,
  userId: '',
  emojiAllMap: new Map(),
  membersMap: new Map(),
  toggleReaction: noop$2,
  memoizedEmojiListItems: function memoizedEmojiListItems() {
    return '';
  },
  chainTop: false,
  chainBottom: false
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

var getMessageCreatedAt$2 = function getMessageCreatedAt(message) {
  return format(message.createdAt, 'p');
};

var CLASS_NAME$2 = 'sendbird-unknown-message';
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
  injectingClassName.unshift(CLASS_NAME$2);
  injectingClassName.push("".concat(CLASS_NAME$2).concat(isByMe ? '--outgoing' : '--incoming'));
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

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      menuDisplaying = _useState6[0],
      setMenuDisplaying = _useState6[1];

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
          setMenuDisplaying(true);
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
    menuItems: function menuItems(close) {
      var closeDropdown = function closeDropdown() {
        close();
        setMenuDisplaying(false);
      };

      return React.createElement(MenuItems
      /**
       * parentRef: For catching location(x, y) of MenuItems
       * parentContainRef: For toggling more options(menus & reactions)
       */
      , {
        parentRef: menuRef,
        parentContainRef: parentContainRef,
        closeDropdown: closeDropdown,
        openLeft: true
      }, React.createElement(MenuItem, {
        onClick: function onClick() {
          showRemove(true);
          closeDropdown();
        }
      }, "Delete"));
    }
  })), !chainBottom && !(mousehover || moreActive || menuDisplaying) && React.createElement("div", {
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
      return React.createElement(Avatar, {
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
      return React.createElement(MenuItems
      /**
       * parentRef: For catching location(x, y) of MenuItems
       * parentContainRef: For toggling more options(menus & reactions)
       */
      , {
        parentRef: avatarRef,
        parentContainRef: avatarRef,
        closeDropdown: closeDropdown,
        style: {
          paddingTop: 0,
          paddingBottom: 0
        }
      }, renderUserProfile ? renderUserProfile({
        user: message.sender,
        close: closeDropdown
      }) : React.createElement(UserProfile, {
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
  }, getMessageCreatedAt$2(message)))));
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
var getIsSentFromStatus$1 = function getIsSentFromStatus(status) {
  return status === MessageStatusType.SENT || status === MessageStatusType.DELIVERED || status === MessageStatusType.READ;
};
var copyToClipboard = function copyToClipboard(text) {
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
var getSenderProfileUrl = function getSenderProfileUrl(message) {
  return message.sender && message.sender.profileUrl;
};
var getSenderName = function getSenderName(message) {
  return message.sender && (message.sender.friendName || message.sender.nickname || message.sender.userId);
};
var getMessageCreatedAt$3 = function getMessageCreatedAt(message) {
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

var isUrl = createUrlTester(URL_REG);
function useMemoizedMessageText$1(_ref) {
  var message = _ref.message,
      updatedAt = _ref.updatedAt,
      className = _ref.className,
      _ref$incoming = _ref.incoming,
      incoming = _ref$incoming === void 0 ? false : _ref$incoming;

  var _useContext = useContext(LocalizationContext),
      stringSet = _useContext.stringSet;

  var WORD_TYPOGRAPHY = LabelTypography.BODY_1;
  var WORD_COLOR = incoming ? LabelColors.ONBACKGROUND_1 : LabelColors.ONCONTENT_1;
  var EDITED_COLOR = incoming ? LabelColors.ONBACKGROUND_2 : LabelColors.ONCONTENT_2;
  return useMemo(function () {
    return function () {
      var splitMessage = message.split(' ');
      var matchedMessage = splitMessage.map(function (word) {
        return isUrl(word) ? React.createElement(LinkLabel, {
          key: uuidv4$1(),
          className: className,
          src: word,
          type: WORD_TYPOGRAPHY,
          color: WORD_COLOR
        }, word) : React.createElement(Label, {
          key: uuidv4$1(),
          className: className,
          type: WORD_TYPOGRAPHY,
          color: WORD_COLOR
        }, word);
      });

      if (updatedAt > 0) {
        matchedMessage.push(React.createElement(Label, {
          key: uuidv4$1(),
          className: className,
          type: WORD_TYPOGRAPHY,
          color: EDITED_COLOR
        }, stringSet.MESSAGE_EDITED));
      }

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

  var openLink = function openLink() {
    if (checkOGIsEnalbed(message)) {
      var url = ogMetaData.url;
      window.open(url);
    }
  };

  var outoingMemoizedMessageText = useMemoizedMessageText$1({
    message: message.message,
    updatedAt: message.updatedAt,
    className: 'sendbird-og-message-word'
  });
  var incomingMemoizedMessageText = useMemoizedMessageText$1({
    message: message.message,
    updatedAt: message.updatedAt,
    className: 'sendbird-og-message-word',
    incoming: true
  });
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
    memoizedMessageText: outoingMemoizedMessageText,
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
    memoizedMessageText: incomingMemoizedMessageText,
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

  var _useContext = useContext(LocalizationContext),
      stringSet = _useContext.stringSet;

  var MemoizedMessageText = memoizedMessageText;
  var MemoizedEmojiListItems = memoizedEmojiListItems;
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
      return React.createElement(MenuItems, {
        parentRef: parentRefMenus // for catching location(x, y) of MenuItems
        ,
        parentContainRef: parentContainRef // for toggling more options(menus & reactions)
        ,
        closeDropdown: closeDropdown,
        openLeft: true
      }, isMessageSent && React.createElement(MenuItem, {
        className: "".concat(OUTGOING_OG_MESSAGE, "__more__menu__copy"),
        onClick: function onClick() {
          copyToClipboard(message.message);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__COPY), isMessageSent && React.createElement(MenuItem, {
        onClick: function onClick() {
          if (disabled) {
            return;
          }

          showEdit(true);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__EDIT), message && message.isResendable && message.isResendable() && React.createElement(MenuItem, {
        onClick: function onClick() {
          resendMessage(message);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__RESEND), React.createElement(MenuItem, {
        onClick: function onClick() {
          if (disabled) {
            return;
          }

          showRemove(true);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__DELETE));
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
        type: IconTypes.EMOJI_MORE,
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
      type: IconTypes.THUMBNAIL_NONE
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
  }, ogMetaData.description)), ogMetaData.url && React.createElement(Label, {
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_2,
    className: "".concat(OUTGOING_OG_MESSAGE, "__og-tag__url")
  }, ogMetaData.url), showEmojiReactions && React.createElement("div", {
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

  var _useContext2 = useContext(LocalizationContext),
      stringSet = _useContext2.stringSet;

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
      return React.createElement(Avatar, {
        ref: avatarRef,
        onClick: function onClick() {
          if (!disableUserProfile) {
            toggleDropdown();
          }
        },
        className: "".concat(INCOMING_OG_MESSAGE, "__avatar"),
        src: getSenderProfileUrl(message),
        width: "28px",
        height: "28px",
        alt: "sender-profile-image"
      });
    },
    menuItems: function menuItems(closeDropdown) {
      return React.createElement(MenuItems, {
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
      }) : React.createElement(UserProfile, {
        user: message.sender,
        onSuccess: closeDropdown
      }));
    }
  }), !chainTop && React.createElement(Label, {
    className: "".concat(INCOMING_OG_MESSAGE, "__sender-name"),
    type: LabelTypography.CAPTION_2,
    color: LabelColors.ONBACKGROUND_2
  }, getSenderName(message)), React.createElement("div", {
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
      type: IconTypes.THUMBNAIL_NONE
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
  }, getMessageCreatedAt$3(message)), React.createElement("div", {
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
        type: IconTypes.EMOJI_MORE,
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
      return React.createElement(MenuItems, {
        parentRef: parentRefMenus,
        parentContainRef: parentContainRef,
        closeDropdown: closeDropdown
      }, React.createElement(MenuItem, {
        className: "".concat(INCOMING_OG_MESSAGE, "__more__menu__copy"),
        onClick: function onClick() {
          copyToClipboard(message.message);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__COPY));
    }
  })))));
}

var noop$3 = function noop() {};

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
  showEdit: noop$3,
  showRemove: noop$3,
  resendMessage: noop$3,
  toggleReaction: noop$3,
  membersMap: new Map(),
  emojiAllMap: new Map(),
  memoizedEmojiListItems: noop$3,
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
      useReaction = _ref.useReaction,
      chainTop = _ref.chainTop,
      chainBottom = _ref.chainBottom,
      emojiAllMap = _ref.emojiAllMap,
      membersMap = _ref.membersMap,
      highLightedMessageId = _ref.highLightedMessageId,
      toggleReaction = _ref.toggleReaction,
      memoizedEmojiListItems = _ref.memoizedEmojiListItems,
      renderCustomMessage = _ref.renderCustomMessage,
      currentGroupChannel = _ref.currentGroupChannel;
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

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      isAnimated = _useState8[0],
      setIsAnimated = _useState8[1];

  var editMessageInputRef = useRef(null);
  var useMessageScrollRef = useRef(null);
  useLayoutEffect(function () {
    if (highLightedMessageId === message.messageId) {
      if (useMessageScrollRef && useMessageScrollRef.current) {
        useMessageScrollRef.current.scrollIntoView({
          block: 'center',
          inline: 'center'
        });
        setTimeout(function () {
          setIsAnimated(true);
        }, 500);
      }
    } else {
      setIsAnimated(false);
    }
  }, [highLightedMessageId, useMessageScrollRef.current, message.messageId]);
  var RenderedMessage = useMemo(function () {
    if (renderCustomMessage) {
      return renderCustomMessage(message, currentGroupChannel, chainTop, chainBottom); // Let's change this to object type on next major version up
    }

    return null;
  }, [message, message.message, renderCustomMessage]);
  var isByMe = userId === sender.userId || message.requestState === 'pending' || message.requestState === 'failed';

  if (RenderedMessage) {
    return React.createElement("div", {
      ref: useMessageScrollRef,
      className: "\n          sendbird-msg-hoc sendbird-msg--scroll-ref\n          ".concat(isAnimated ? 'sendbird-msg-hoc__highlighted' : '', "\n        ")
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
    ref: useMessageScrollRef,
    className: "\n        sendbird-msg-hoc sendbird-msg--scroll-ref\n        ".concat(isAnimated ? 'sendbird-msg-hoc__animated' : '', "\n      ")
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
  highLightedMessageId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  renderCustomMessage: PropTypes.func,
  currentGroupChannel: PropTypes.shape({}),
  hasSeperator: PropTypes.bool,
  disabled: PropTypes.bool,
  editDisabled: PropTypes.bool,
  deleteMessage: PropTypes.func.isRequired,
  updateMessage: PropTypes.func.isRequired,
  resendMessage: PropTypes.func.isRequired,
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
  renderCustomMessage: null,
  currentGroupChannel: {},
  message: {},
  hasSeperator: false,
  disabled: false,
  highLightedMessageId: null,
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
          onScrollDown = _this$props.onScrollDown,
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
        var first = nodes && nodes[0];
        onScroll(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 1),
              messages = _ref2[0];

          if (messages) {
            // https://github.com/scabbiaza/react-scroll-position-on-updating-dom
            try {
              first.scrollIntoView();
            } catch (error) {//
            }
          }
        });
      }

      if (clientHeight + scrollTop === scrollHeight) {
        var _nodes = scrollRef.current.querySelectorAll('.sendbird-msg--scroll-ref');

        var last = _nodes && _nodes[_nodes.length - 1];
        onScrollDown(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 1),
              messages = _ref4[0];

          if (messages) {
            // https://github.com/scabbiaza/react-scroll-position-on-updating-dom
            try {
              last.scrollIntoView();
            } catch (error) {//
            }
          }
        });
      } // do this later


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
          allMessages = _this$props2.allMessages,
          useReaction = _this$props2.useReaction,
          emojiAllMap = _this$props2.emojiAllMap,
          editDisabled = _this$props2.editDisabled,
          deleteMessage = _this$props2.deleteMessage,
          updateMessage = _this$props2.updateMessage,
          resendMessage = _this$props2.resendMessage,
          renderCustomMessage = _this$props2.renderCustomMessage,
          renderChatItem = _this$props2.renderChatItem,
          highLightedMessageId = _this$props2.highLightedMessageId,
          emojiContainer = _this$props2.emojiContainer,
          toggleReaction = _this$props2.toggleReaction,
          useMessageGrouping = _this$props2.useMessageGrouping,
          currentGroupChannel = _this$props2.currentGroupChannel,
          memoizedEmojiListItems = _this$props2.memoizedEmojiListItems,
          showScrollBot = _this$props2.showScrollBot,
          onClickScrollBot = _this$props2.onClickScrollBot;

      if (allMessages.length < 1) {
        return React.createElement(PlaceHolder, {
          className: "sendbird-conversation__no-messages",
          type: PlaceHolderTypes.NO_MESSAGES
        });
      }

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
      }, allMessages.map(function (m, idx) {
        var previousMessage = allMessages[idx - 1];
        var nextMessage = allMessages[idx + 1];

        var _ref5 = useMessageGrouping ? compareMessagesForGrouping(previousMessage, m, nextMessage) : [false, false],
            _ref6 = _slicedToArray(_ref5, 2),
            chainTop = _ref6[0],
            chainBottom = _ref6[1];

        var previousMessageCreatedAt = previousMessage && previousMessage.createdAt;
        var currentCreatedAt = m.createdAt; // https://stackoverflow.com/a/41855608

        var hasSeperator = !(previousMessageCreatedAt && isSameDay(currentCreatedAt, previousMessageCreatedAt));

        if (renderChatItem) {
          return React.createElement("div", {
            key: m.messageId || m.reqId,
            className: "sendbird-msg--scroll-ref"
          }, renderChatItem({
            message: m,
            highLightedMessageId: highLightedMessageId,
            channel: currentGroupChannel,
            onDeleteMessage: deleteMessage,
            onUpdateMessage: updateMessage,
            onResendMessage: resendMessage,
            emojiContainer: emojiContainer,
            chainTop: chainTop,
            chainBottom: chainBottom
          }));
        }

        return React.createElement(MessageHoc, {
          highLightedMessageId: highLightedMessageId,
          renderCustomMessage: renderCustomMessage,
          key: m.messageId || m.reqId,
          userId: userId,
          status: readStatus[m.messageId] || getParsedStatus(m, currentGroupChannel) // show status for pending/failed messages
          ,
          message: m,
          currentGroupChannel: currentGroupChannel,
          disabled: disabled,
          membersMap: membersMap,
          chainTop: chainTop,
          useReaction: useReaction,
          emojiAllMap: emojiAllMap,
          editDisabled: editDisabled,
          hasSeperator: hasSeperator,
          chainBottom: chainBottom,
          updateMessage: updateMessage,
          deleteMessage: deleteMessage,
          resendMessage: resendMessage,
          toggleReaction: toggleReaction,
          memoizedEmojiListItems: memoizedEmojiListItems
        });
      }))), showScrollBot && React.createElement("div", {
        className: "sendbird-conversation__scroll-bottom-button",
        onClick: onClickScrollBot,
        onKeyDown: onClickScrollBot,
        tabIndex: 0,
        role: "button"
      }, React.createElement(Icon, {
        width: "24px",
        height: "24px",
        type: IconTypes.CHEVRON_DOWN,
        fillColor: IconColors.CONTENT
      })));
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
  onScrollDown: PropTypes.func,
  editDisabled: PropTypes.bool,
  disabled: PropTypes.bool,
  userId: PropTypes.string,
  allMessages: PropTypes.arrayOf(PropTypes.shape({
    createdAt: PropTypes.number
  })).isRequired,
  deleteMessage: PropTypes.func.isRequired,
  resendMessage: PropTypes.func.isRequired,
  updateMessage: PropTypes.func.isRequired,
  readStatus: PropTypes.shape({}).isRequired,
  currentGroupChannel: PropTypes.shape({
    markAsRead: PropTypes.func,
    members: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired,
  highLightedMessageId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  renderChatItem: PropTypes.element,
  renderCustomMessage: PropTypes.func,
  useReaction: PropTypes.bool,
  showScrollBot: PropTypes.bool,
  onClickScrollBot: PropTypes.func,
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
  userId: '',
  renderCustomMessage: null,
  renderChatItem: null,
  highLightedMessageId: null,
  onScroll: null,
  onScrollDown: null,
  useReaction: true,
  emojiContainer: {},
  showScrollBot: false,
  onClickScrollBot: function onClickScrollBot() {},
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
      type: IconTypes.CHEVRON_DOWN,
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

  var _useState = useState(uuidv4$1()),
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
      var newHandlerId = uuidv4$1();
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

var noop$4 = function noop() {};

function ChatHeader(props) {
  var currentGroupChannel = props.currentGroupChannel,
      currentUser = props.currentUser,
      title = props.title,
      subTitle = props.subTitle,
      isActive = props.isActive,
      isMuted = props.isMuted,
      showSearchIcon = props.showSearchIcon,
      onSearchClick = props.onSearchClick,
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
  }, title || getChannelTitle(currentGroupChannel, userId, stringSet)), typeof isActive === 'string' && isActive === 'true' || typeof isActive === 'boolean' && isActive ? React.createElement("div", {
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
    type: IconTypes.NOTIFICATIONS_OFF_FILLED,
    width: "24px",
    height: "24px"
  }) : null, showSearchIcon && React.createElement(IconButton, {
    className: "sendbird-chat-header__search",
    width: "32px",
    height: "32px",
    onClick: onSearchClick
  }, React.createElement(Icon, {
    type: IconTypes.SEARCH,
    fillColor: IconColors.PRIMARY,
    width: "24px",
    height: "24px"
  })), React.createElement(IconButton, {
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
  onSearchClick: PropTypes.func,
  showSearchIcon: PropTypes.bool,
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
  onSearchClick: noop$4,
  showSearchIcon: false,
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
      _props$config = props.config,
      userId = _props$config.userId,
      logger = _props$config.logger,
      pubSub = _props$config.pubSub,
      isOnline = _props$config.isOnline,
      theme = _props$config.theme,
      imageCompression = _props$config.imageCompression,
      reconnect = props.dispatchers.reconnect,
      _props$queries = props.queries,
      queries = _props$queries === void 0 ? {} : _props$queries,
      startingPoint = props.startingPoint,
      highlightedMessage = props.highlightedMessage,
      useReaction = props.useReaction,
      showSearchIcon = props.showSearchIcon,
      onSearchClick = props.onSearchClick,
      renderChatItem = props.renderChatItem,
      renderChatHeader = props.renderChatHeader,
      renderCustomMessage = props.renderCustomMessage,
      renderUserProfile = props.renderUserProfile,
      disableUserProfile = props.disableUserProfile,
      renderMessageInput = props.renderMessageInput,
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
    console.warn('messageListQuery has been deprecated, please use messageListParams instead');
  }

  var _useState = useState(startingPoint),
      _useState2 = _slicedToArray(_useState, 2),
      intialTimeStamp = _useState2[0],
      setIntialTimeStamp = _useState2[1];

  useEffect(function () {
    setIntialTimeStamp(startingPoint);
  }, [startingPoint, channelUrl]);

  var _useState3 = useState(highlightedMessage),
      _useState4 = _slicedToArray(_useState3, 2),
      highLightedMessageId = _useState4[0],
      setHighLightedMessageId = _useState4[1];

  useEffect(function () {
    setHighLightedMessageId(highlightedMessage);
  }, [highlightedMessage]);
  var userFilledMessageListQuery = queries.messageListParams;

  var _useReducer = useReducer(reducer, messagesInitialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      messagesStore = _useReducer2[0],
      messagesDispatcher = _useReducer2[1];

  var scrollRef = useRef(null);
  var allMessages = messagesStore.allMessages,
      loading = messagesStore.loading,
      initialized = messagesStore.initialized,
      unreadCount = messagesStore.unreadCount,
      unreadSince = messagesStore.unreadSince,
      isInvalid = messagesStore.isInvalid,
      _messagesStore$curren = messagesStore.currentGroupChannel,
      currentGroupChannel = _messagesStore$curren === void 0 ? {} : _messagesStore$curren,
      hasMore = messagesStore.hasMore,
      lastMessageTimeStamp = messagesStore.lastMessageTimeStamp,
      hasMoreToBottom = messagesStore.hasMoreToBottom,
      latestFetchedMessageTimeStamp = messagesStore.latestFetchedMessageTimeStamp,
      emojiContainer = messagesStore.emojiContainer,
      readStatus = messagesStore.readStatus;
  var isFrozen = currentGroupChannel.isFrozen,
      isBroadcast = currentGroupChannel.isBroadcast,
      isSuper = currentGroupChannel.isSuper;
  var _sdk$appInfo = sdk.appInfo,
      appInfo = _sdk$appInfo === void 0 ? {} : _sdk$appInfo;
  var usingReaction = appInfo.isUsingReaction && !isBroadcast && !isSuper && useReaction;
  var userDefinedDisableUserProfile = disableUserProfile || config.disableUserProfile;
  var userDefinedRenderProfile = renderUserProfile || config.renderUserProfile;
  var showScrollBot = hasMoreToBottom;
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
  var onScrollDownCallback = useScrollDownCallback({
    currentGroupChannel: currentGroupChannel,
    latestFetchedMessageTimeStamp: latestFetchedMessageTimeStamp,
    userFilledMessageListQuery: userFilledMessageListQuery,
    hasMoreToBottom: hasMoreToBottom
  }, {
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
    sdkInit: sdkInit,
    hasMoreToBottom: hasMoreToBottom
  }, {
    messagesDispatcher: messagesDispatcher,
    sdk: sdk,
    logger: logger,
    scrollRef: scrollRef
  });
  useInitialMessagesFetch({
    currentGroupChannel: currentGroupChannel,
    userFilledMessageListQuery: userFilledMessageListQuery,
    intialTimeStamp: intialTimeStamp
  }, {
    sdk: sdk,
    logger: logger,
    messagesDispatcher: messagesDispatcher
  }); // handles API calls from withSendbird

  useEffect(function () {
    var subScriber = pubSubHandler(channelUrl, pubSub, messagesDispatcher);
    return function () {
      pubSubHandleRemover(subScriber);
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
    onBeforeSendFileMessage: onBeforeSendFileMessage,
    imageCompression: imageCompression
  }, {
    sdk: sdk,
    logger: logger,
    pubSub: pubSub,
    messagesDispatcher: messagesDispatcher
  }),
      _useSendFileMessageCa2 = _slicedToArray(_useSendFileMessageCa, 1),
      onSendFileMessage = _useSendFileMessageCa2[0];

  if (!channelUrl) {
    return React.createElement("div", {
      className: "sendbird-conversation"
    }, React.createElement(PlaceHolder, {
      type: PlaceHolderTypes.NO_CHANNELS
    }));
  }

  if (isInvalid) {
    return React.createElement("div", {
      className: "sendbird-conversation"
    }, React.createElement(PlaceHolder, {
      type: PlaceHolderTypes.WRONG
    }));
  }

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
    showSearchIcon: showSearchIcon,
    onSearchClick: onSearchClick,
    onActionClick: onChatHeaderActionClick,
    subTitle: currentGroupChannel.members && currentGroupChannel.members.length !== 2,
    isActive: false,
    isMuted: false
  }), isFrozen && React.createElement(FrozenNotification, null), unreadCount > 0 && React.createElement(Notification, {
    count: unreadCount,
    onClick: function onClick() {
      if (intialTimeStamp) {
        setIntialTimeStamp(null);
        setHighLightedMessageId(null);
      } else {
        scrollIntoLast(); // there is no scroll

        if (scrollRef.current.scrollTop === 0) {
          currentGroupChannel.markAsRead();
          messagesDispatcher({
            type: MARK_AS_READ
          });
        }
      }
    },
    time: unreadSince
  }), loading ? React.createElement("div", {
    className: "sendbird-conversation"
  }, React.createElement(PlaceHolder, {
    type: PlaceHolderTypes.LOADING
  })) : React.createElement(ConversationScroll, {
    swapParams: sdk && sdk.getErrorFirstCallback && sdk.getErrorFirstCallback(),
    highLightedMessageId: highLightedMessageId,
    userId: userId,
    hasMore: hasMore,
    disabled: !isOnline,
    onScroll: onScrollCallback,
    onScrollDown: onScrollDownCallback,
    scrollRef: scrollRef,
    readStatus: readStatus,
    useReaction: usingReaction,
    allMessages: allMessages,
    emojiAllMap: emojiAllMap,
    membersMap: nicknamesMap,
    editDisabled: isDisabledBecauseFrozen(currentGroupChannel),
    deleteMessage: deleteMessage,
    updateMessage: updateMessage,
    resendMessage: resendMessage,
    toggleReaction: toggleReaction,
    emojiContainer: emojiContainer,
    renderChatItem: renderChatItem,
    showScrollBot: showScrollBot,
    onClickScrollBot: function onClickScrollBot() {
      setIntialTimeStamp(null);
      setHighLightedMessageId(null);
    },
    renderCustomMessage: renderCustomMessage,
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
    }),
    imageCompression: PropTypes.shape({
      compressionRate: PropTypes.number,
      resizingWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      resizingHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
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
    })
  }),
  startingPoint: PropTypes.number,
  highlightedMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onBeforeSendUserMessage: PropTypes.func,
  // onBeforeSendUserMessage(text)
  onBeforeSendFileMessage: PropTypes.func,
  // onBeforeSendFileMessage(File)
  onBeforeUpdateUserMessage: PropTypes.func,
  renderChatItem: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  renderCustomMessage: PropTypes.func,
  renderMessageInput: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  renderChatHeader: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  showSearchIcon: PropTypes.bool,
  onSearchClick: PropTypes.func,
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
  startingPoint: null,
  highlightedMessage: null,
  renderChatItem: null,
  renderCustomMessage: null,
  renderMessageInput: null,
  renderChatHeader: null,
  useReaction: true,
  showSearchIcon: false,
  onSearchClick: noop$5,
  disableUserProfile: false,
  renderUserProfile: null,
  useMessageGrouping: true,
  onChatHeaderActionClick: noop$5
};
var getEmojiCategoriesFromEmojiContainer$1 = getEmojiCategoriesFromEmojiContainer,
    getAllEmojisFromEmojiContainer$1 = getAllEmojisFromEmojiContainer,
    getEmojisFromEmojiContainer$1 = getEmojisFromEmojiContainer;
var Conversation = withSendbirdContext(ConversationPanel);

export default Conversation;
export { ConversationPanel, getAllEmojisFromEmojiContainer$1 as getAllEmojisFromEmojiContainer, getEmojiCategoriesFromEmojiContainer$1 as getEmojiCategoriesFromEmojiContainer, getEmojisFromEmojiContainer$1 as getEmojisFromEmojiContainer };
//# sourceMappingURL=Channel.js.map
