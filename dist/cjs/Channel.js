'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var LocalizationContext = require('./LocalizationContext-253833e3.js');
var React = require('react');
var PropTypes = require('prop-types');
var index$2 = require('./index-b36bb0d8.js');
var type = require('./type-a2e61165.js');
var index$1 = require('./index-ba566fa2.js');
var index = require('./index-c74bfd29.js');
var index$3 = require('./index-478e7242.js');
var utils = require('./utils-34763613.js');
var utils$1 = require('./utils-26f911d4.js');
var utils$2 = require('./utils-7a073a7a.js');
var index$4 = require('./index-d30bcb18.js');
require('react-dom');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

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
    return index.isImage(message.type) || index.isVideo(message.type) ? MessageTypes.THUMBNAIL : MessageTypes.FILE;
  }

  return '';
};

var UNDEFINED = 'undefined';
var SUCCEEDED$1 = SendingMessageStatus.SUCCEEDED,
    FAILED$1 = SendingMessageStatus.FAILED,
    PENDING$1 = SendingMessageStatus.PENDING;
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
  subscriber.set(index$1.SEND_USER_MESSAGE, pubSub.subscribe(index$1.SEND_USER_MESSAGE, function (msg) {
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
  subscriber.set(index$1.SEND_MESSAGE_START, pubSub.subscribe(index$1.SEND_MESSAGE_START, function (msg) {
    var channel = msg.channel,
        message = msg.message;

    if (channel && channelUrl === channel.url) {
      dispatcher({
        type: SEND_MESSAGEGE_START,
        payload: message
      });
    }
  }));
  subscriber.set(index$1.SEND_FILE_MESSAGE, pubSub.subscribe(index$1.SEND_FILE_MESSAGE, function (msg) {
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
  subscriber.set(index$1.UPDATE_USER_MESSAGE, pubSub.subscribe(index$1.UPDATE_USER_MESSAGE, function (msg) {
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
  subscriber.set(index$1.DELETE_MESSAGE, pubSub.subscribe(index$1.DELETE_MESSAGE, function (msg) {
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
  if (message.requestState === FAILED$1) {
    return type.MessageStatusType.FAILED;
  }

  if (message.requestState === PENDING$1) {
    return type.MessageStatusType.PENDING;
  }

  if (message.requestState === SUCCEEDED$1) {
    if (!currentGroupChannel) {
      return type.MessageStatusType.SENT;
    }

    var unreadCount = currentGroupChannel.getReadReceipt(message);

    if (unreadCount === 0) {
      return type.MessageStatusType.READ;
    }

    var isDelivered = currentGroupChannel.getDeliveryReceipt(message) === 0;

    if (isDelivered) {
      return type.MessageStatusType.DELIVERED;
    }

    return type.MessageStatusType.SENT;
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
var getEmojiCategoriesFromEmojiContainer$1 = function getEmojiCategoriesFromEmojiContainer() {
  var emojiContainer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return emojiContainer.emojiCategories ? emojiContainer.emojiCategories : [];
};
var getAllEmojisFromEmojiContainer$1 = function getAllEmojisFromEmojiContainer() {
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
var getEmojisFromEmojiContainer$1 = function getEmojisFromEmojiContainer() {
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
var getMessageCreatedAt$3 = function getMessageCreatedAt(message) {
  return index$2.format(message.createdAt, 'p');
};
var isSameGroup = function isSameGroup(message, comparingMessage) {
  if (!message || !comparingMessage || !message.sender || !comparingMessage.sender || !message.createdAt || !comparingMessage.createdAt || !message.sender.userId || !comparingMessage.sender.userId) {
    return false;
  }

  return message.sendingStatus === comparingMessage.sendingStatus && message.sender.userId === comparingMessage.sender.userId && getMessageCreatedAt$3(message) === getMessageCreatedAt$3(comparingMessage);
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

  if (sendingStatus === SUCCEEDED$1 || sendingStatus === PENDING$1) {
    var lastIndexOfSucceededMessage = allMessages.map(function (message) {
      return message.sendingStatus || (message.isAdminMessage && message.isAdminMessage() ? SUCCEEDED$1 : UNDEFINED);
    }).lastIndexOf(SUCCEEDED$1);

    if (lastIndexOfSucceededMessage + 1 < allMessages.length) {
      var messages = LocalizationContext._toConsumableArray(allMessages);

      messages.splice(lastIndexOfSucceededMessage + 1, 0, newMessage);
      return messages;
    }
  }

  return [].concat(LocalizationContext._toConsumableArray(allMessages), [newMessage]);
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
  // onScrollDownCallback is added for navigation to different timestamps on messageSearch
  // hasMoreToBottom, onScrollDownCallback -> scroll down
  // hasMore, onScrollCallback -> scroll up(default behavior)
  hasMoreToBottom: false,
  latestFetchedMessageTimeStamp: 0,
  emojiContainer: {},
  readStatus: {},
  unreadCount: 0,
  unreadSince: null,
  isInvalid: false
};

var SUCCEEDED = SendingMessageStatus.SUCCEEDED,
    FAILED = SendingMessageStatus.FAILED,
    PENDING = SendingMessageStatus.PENDING;
function reducer(state, action) {
  switch (action.type) {
    case RESET_STATE:
      return messagesInitialState;

    case RESET_MESSAGES:
      return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
        // when user switches channel, if the previous channel `hasMore`
        // the onScroll gets called twice, setting hasMore false prevents this
        hasMore: false,
        allMessages: []
      });

    case GET_PREV_MESSAGES_START:
      return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
        loading: true
      });

    case CLEAR_SENT_MESSAGES:
      return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
        allMessages: LocalizationContext._toConsumableArray(state.allMessages.filter(function (m) {
          return m.sendingStatus !== SUCCEEDED;
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
            return index.compareIds(messageId, msg.messageId);
          });
        });
        var hasHasMoreToBottom = hasOwnProperty('hasMoreToBottom')(action.payload);
        var hasLatestFetchedMessageTimeStamp = hasOwnProperty('latestFetchedMessageTimeStamp')(action.payload);
        return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2(LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
          loading: false,
          initialized: true,
          hasMore: action.payload.hasMore,
          lastMessageTimeStamp: action.payload.lastMessageTimeStamp
        }, hasHasMoreToBottom && {
          hasMoreToBottom: action.payload.hasMoreToBottom
        }), hasLatestFetchedMessageTimeStamp && {
          latestFetchedMessageTimeStamp: action.payload.latestFetchedMessageTimeStamp
        }), {}, {
          allMessages: [].concat(LocalizationContext._toConsumableArray(receivedMessages), LocalizationContext._toConsumableArray(filteredAllMessages))
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
            return index.compareIds(messageId, msg.messageId);
          });
        });

        return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
          loading: false,
          initialized: true,
          hasMore: action.payload.hasMore,
          lastMessageTimeStamp: action.payload.lastMessageTimeStamp,
          hasMoreToBottom: action.payload.hasMoreToBottom,
          latestFetchedMessageTimeStamp: action.payload.latestFetchedMessageTimeStamp,
          allMessages: [].concat(LocalizationContext._toConsumableArray(_filteredAllMessages), LocalizationContext._toConsumableArray(_receivedMessages))
        });
      }

    case GET_NEXT_MESSAGES_FAILURE:
      {
        return LocalizationContext._objectSpread2({}, state);
      }

    case SEND_MESSAGEGE_START:
      return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
        allMessages: [].concat(LocalizationContext._toConsumableArray(state.allMessages), [LocalizationContext._objectSpread2({}, action.payload)])
      });

    case SEND_MESSAGEGE_SUCESS:
      {
        var newMessages = state.allMessages.map(function (m) {
          return index.compareIds(m.reqId, action.payload.reqId) ? action.payload : m;
        });

        LocalizationContext._toConsumableArray(newMessages).sort(function (a, b) {
          return a.sendingStatus && b.sendingStatus && a.sendingStatus === SUCCEEDED && (b.sendingStatus === PENDING || b.sendingStatus === FAILED) ? -1 : 1;
        });

        return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
          allMessages: newMessages
        });
      }

    case SEND_MESSAGEGE_FAILURE:
      {
        // eslint-disable-next-line no-param-reassign
        action.payload.failed = true;
        return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
          allMessages: state.allMessages.map(function (m) {
            return index.compareIds(m.reqId, action.payload.reqId) ? action.payload : m;
          })
        });
      }

    case SET_CURRENT_CHANNEL:
      {
        return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
          currentGroupChannel: action.payload,
          isInvalid: false
        });
      }

    case SET_CHANNEL_INVALID:
      {
        return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
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

        if (!index.compareIds(channel.url, currentGroupChannelUrl)) {
          return state;
        }

        return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
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

        if (!index.compareIds(_channel.url, _currentGroupChannelUrl)) {
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
          return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
            allMessages: passUnsuccessfullMessages(state.allMessages, message)
          });
        }

        return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
          unreadCount: _unreadCount,
          unreadSince: _unreadCount === 1 ? index$2.format(new Date(), 'p MMM dd') : unreadSince,
          allMessages: passUnsuccessfullMessages(state.allMessages, message)
        });
      }

    case ON_MESSAGE_UPDATED:
      return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
        allMessages: state.allMessages.map(function (m) {
          return index.compareIds(m.messageId, action.payload.message.messageId) ? action.payload.message : m;
        })
      });

    case RESEND_MESSAGEGE_START:
      return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
        allMessages: state.allMessages.map(function (m) {
          return index.compareIds(m.reqId, action.payload.reqId) ? action.payload : m;
        })
      });

    case MARK_AS_READ:
      return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
        unreadCount: 0,
        unreadSince: null
      });

    case ON_MESSAGE_DELETED:
      return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
        allMessages: state.allMessages.filter(function (m) {
          return !index.compareIds(m.messageId, action.payload);
        })
      });

    case ON_MESSAGE_DELETED_BY_REQ_ID:
      return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
        allMessages: state.allMessages.filter(function (m) {
          return !index.compareIds(m.reqId, action.payload);
        })
      });

    case SET_EMOJI_CONTAINER:
      {
        return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
          emojiContainer: action.payload
        });
      }

    case SET_READ_STATUS:
      {
        return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
          readStatus: action.payload
        });
      }

    case ON_REACTION_UPDATED:
      {
        return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
          allMessages: state.allMessages.map(function (m) {
            if (index.compareIds(m.messageId, action.payload.messageId)) {
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
  React.useEffect(function () {
    var messageReceiverId = LocalizationContext.uuidv4();

    if (channelUrl && sdk && sdk.ChannelHandler) {
      var ChannelHandler = new sdk.ChannelHandler();
      logger.info('Channel | useHandleChannelEvents: Setup event handler', messageReceiverId);

      ChannelHandler.onMessageReceived = function (channel, message) {
        // donot update if hasMoreToBottom
        if (index.compareIds(channel.url, currentGroupChannel.url) && !hasMoreToBottom) {
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

        if (index.compareIds(channel.url, currentGroupChannel.url) && hasMoreToBottom) {
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
        if (index.compareIds(groupChannel.url, currentGroupChannel.url)) {
          logger.info('Channel | useHandleChannelEvents: onChannelChanged', groupChannel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL,
            payload: groupChannel
          });
        }
      };

      ChannelHandler.onChannelFrozen = function (groupChannel) {
        if (index.compareIds(groupChannel.url, currentGroupChannel.url)) {
          logger.info('Channel | useHandleChannelEvents: onChannelFrozen', groupChannel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL,
            payload: groupChannel
          });
        }
      };

      ChannelHandler.onChannelUnfrozen = function (groupChannel) {
        if (index.compareIds(groupChannel.url, currentGroupChannel.url)) {
          logger.info('Channel | useHandleChannelEvents: onChannelUnFrozen', groupChannel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL,
            payload: groupChannel
          });
        }
      };

      ChannelHandler.onUserMuted = function (groupChannel) {
        if (index.compareIds(groupChannel.url, currentGroupChannel.url)) {
          logger.info('Channel | useHandleChannelEvents: onUserMuted', groupChannel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL,
            payload: groupChannel
          });
        }
      };

      ChannelHandler.onUserUnmuted = function (groupChannel) {
        if (index.compareIds(groupChannel.url, currentGroupChannel.url)) {
          logger.info('Channel | useHandleChannelEvents: onUserUnmuted', groupChannel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL,
            payload: groupChannel
          });
        }
      };

      ChannelHandler.onUserBanned = function (groupChannel) {
        if (index.compareIds(groupChannel.url, currentGroupChannel.url)) {
          logger.info('Channel | useHandleChannelEvents: onUserBanned', groupChannel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL,
            payload: groupChannel
          });
        }
      };

      ChannelHandler.onOperatorUpdated = function (groupChannel) {
        if (index.compareIds(groupChannel.url, currentGroupChannel.url)) {
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
  React.useEffect(function () {
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
  React.useEffect(function () {
    logger.info('Channel useInitialMessagesFetch: Setup started', currentGroupChannel);
    messagesDispatcher({
      type: RESET_MESSAGES
    });

    if (sdk && sdk.MessageListParams && currentGroupChannel && currentGroupChannel.getMessagesByTimestamp) {
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
  /**
   * Note - useEffect(() => {}, [currentGroupChannel])
   * was buggy, that is why we did
   * const channelUrl = currentGroupChannel && currentGroupChannel.url;
   * useEffect(() => {}, [channelUrl])
   * Again, this hook is supposed to execute when currentGroupChannel changes
   * The 'channelUrl' here is not the same memory reference from Conversation.props
   */
}

function useHandleReconnect(_ref, _ref2) {
  var isOnline = _ref.isOnline;
  var logger = _ref2.logger,
      sdk = _ref2.sdk,
      currentGroupChannel = _ref2.currentGroupChannel,
      messagesDispatcher = _ref2.messagesDispatcher,
      userFilledMessageListQuery = _ref2.userFilledMessageListQuery;
  React.useEffect(function () {
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
  return React.useCallback(function (cb) {
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
  return React.useCallback(function (cb) {
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
  return React.useCallback(function (message, cb) {
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
  return React.useCallback(function (messageId, text, cb) {
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
        pubSub.publish(index$1.UPDATE_USER_MESSAGE, {
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
  return React.useCallback(function (failedMessage) {
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
  var messageInputRef = React.useRef(null);
  var sendMessage = React.useCallback(function () {
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
    pubSub.publish(index$1.SEND_MESSAGE_START, {
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
  var sendMessage = React.useCallback(function (file) {
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
                  _ref4 = LocalizationContext._slicedToArray(_ref3, 2),
                  message = _ref4[0],
                  error = _ref4[1];

              if (error) {
                // sending params instead of pending message
                // to make sure that we can resend the message once it fails
                logger.error('Channel: Sending file message failed!', {
                  message: message,
                  error: error
                });
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
            pubSub.publish(index$1.SEND_MESSAGE_START, {
              /* pubSub is used instead of messagesDispatcher
                to avoid redundantly calling `messageActionTypes.SEND_MESSAGEGE_START` */
              message: LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, pendingMessage), {}, {
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
        logger.error('Channel: Sending file message failed!', error);
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
            _ref6 = LocalizationContext._slicedToArray(_ref5, 2),
            message = _ref6[0],
            error = _ref6[1];

        if (error) {
          // sending params instead of pending message
          // to make sure that we can resend the message once it fails
          logger.error('Channel: Sending file message failed!', {
            message: message,
            error: error
          });
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
      pubSub.publish(index$1.SEND_MESSAGE_START, {
        /* pubSub is used instead of messagesDispatcher
          to avoid redundantly calling `messageActionTypes.SEND_MESSAGEGE_START` */
        message: LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, pendingMsg), {}, {
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
  React.useEffect(function () {
    if (!sdk.ChannelHandler || !currentGroupChannel.url) {
      return function () {};
    } // todo: move to reducer?


    var setReadStatus = function setReadStatus() {
      var allReadStatus = allMessages.reduce(function (accumulator, msg) {
        if (msg.messageId !== 0) {
          return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, accumulator), {}, LocalizationContext._defineProperty({}, msg.messageId, getParsedStatus(msg, currentGroupChannel)));
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

    var handlerId = LocalizationContext.uuidv4();
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

var ReactionButton = /*#__PURE__*/React__default['default'].forwardRef(function (props, ref) {
  var className = props.className,
      width = props.width,
      height = props.height,
      selected = props.selected,
      _onClick = props.onClick,
      children = props.children;
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: [].concat(LocalizationContext._toConsumableArray(Array.isArray(className) ? className : [className]), ["sendbird-reaction-button".concat(selected ? '--selected' : '')]).join(' '),
    ref: ref,
    role: "button",
    style: {
      width: typeof width === 'string' ? "".concat(width.slice(0, -2) - 2, "px") : "".concat(width - 2, "px"),
      height: typeof height === 'string' ? "".concat(height.slice(0, -2) - 2, "px") : "".concat(height - 2, "px")
    },
    onClick: function onClick(e) {
      return _onClick(e);
    },
    onKeyDown: function onKeyDown(e) {
      return _onClick(e);
    },
    tabIndex: 0
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-reaction-button__inner"
  }, children));
});
ReactionButton.propTypes = {
  className: PropTypes__default['default'].oneOfType([PropTypes__default['default'].string, PropTypes__default['default'].arrayOf(PropTypes__default['default'].string)]),
  width: PropTypes__default['default'].oneOfType([PropTypes__default['default'].number, PropTypes__default['default'].string]),
  height: PropTypes__default['default'].oneOfType([PropTypes__default['default'].number, PropTypes__default['default'].string]),
  selected: PropTypes__default['default'].bool,
  onClick: PropTypes__default['default'].func,
  children: PropTypes__default['default'].element.isRequired
};
ReactionButton.defaultProps = {
  className: '',
  width: '36px',
  height: '36px',
  selected: false,
  onClick: function onClick() {}
};

function useMemoizedEmojiListItems(_ref, _ref2) {
  var emojiContainer = _ref.emojiContainer,
      toggleReaction = _ref.toggleReaction;
  var useReaction = _ref2.useReaction,
      logger = _ref2.logger,
      userId = _ref2.userId,
      emojiAllList = _ref2.emojiAllList;

  /* eslint-disable react/prop-types */
  return React.useMemo(function () {
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

      return /*#__PURE__*/React__default['default'].createElement(index$1.EmojiListItems, {
        parentRef: parentRef,
        parentContainRef: parentContainRef,
        closeDropdown: closeDropdown,
        spaceFromTrigger: spaceFromTrigger
      }, emojiAllList.map(function (emoji) {
        var reactedReaction = message.reactions.filter(function (reaction) {
          return reaction.key === emoji.key;
        })[0];
        var isReacted = reactedReaction ? !(reactedReaction.userIds.indexOf(userId) < 0) : false;
        return /*#__PURE__*/React__default['default'].createElement(ReactionButton, {
          key: emoji.key,
          width: "36px",
          height: "36px",
          selected: isReacted,
          onClick: function onClick() {
            closeDropdown();
            toggleReaction(message, emoji.key, isReacted);
          }
        }, /*#__PURE__*/React__default['default'].createElement(index$2.ImageRenderer, {
          url: emoji.url,
          width: "28px",
          height: "28px",
          defaultComponent: /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
            width: "28px",
            height: "28px",
            type: index$2.IconTypes.QUESTION
          })
        }));
      }));
    };
  }, [emojiContainer, toggleReaction]);
}

function useToggleReactionCallback(_ref, _ref2) {
  var currentGroupChannel = _ref.currentGroupChannel;
  var logger = _ref2.logger;
  return React.useCallback(function (message, key, isReacted) {
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
  var className = _ref.className,
      message = _ref.message,
      status = _ref.status;

  var label = function label() {
    switch (status) {
      case type.MessageStatusType.FAILED:
      case type.MessageStatusType.PENDING:
        {
          return null;
        }

      case type.MessageStatusType.SENT:
      case type.MessageStatusType.DELIVERED:
      case type.MessageStatusType.READ:
        {
          return /*#__PURE__*/React__default['default'].createElement(index$2.Label, {
            className: "sendbird-message-status__text",
            type: index$2.LabelTypography.CAPTION_3,
            color: index$2.LabelColors.ONBACKGROUND_2
          }, utils.getMessageCreatedAt(message));
        }

      default:
        return null;
    }
  };

  var icon = {
    PENDING: /*#__PURE__*/React__default['default'].createElement(index$2.Loader, {
      className: "sendbird-message-status__icon",
      width: "16px",
      height: "16px"
    }, /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
      type: index$2.IconTypes.SPINNER,
      fillColor: index$2.IconColors.PRIMARY,
      width: "16px",
      height: "16px"
    })),
    SENT: /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
      className: "sendbird-message-status__icon",
      type: index$2.IconTypes.DONE,
      fillColor: index$2.IconColors.SENT,
      width: "16px",
      height: "16px"
    }),
    DELIVERED: /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
      className: "sendbird-message-status__icon",
      type: index$2.IconTypes.DONE_ALL,
      fillColor: index$2.IconColors.SENT,
      width: "16px",
      height: "16px"
    }),
    READ: /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
      className: "sendbird-message-status__icon",
      type: index$2.IconTypes.DONE_ALL,
      fillColor: index$2.IconColors.READ,
      width: "16px",
      height: "16px"
    }),
    FAILED: /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
      className: "sendbird-message-status__icon",
      type: index$2.IconTypes.ERROR,
      fillColor: index$2.IconColors.ERROR,
      width: "16px",
      height: "16px"
    })
  };
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: [].concat(LocalizationContext._toConsumableArray(Array.isArray(className) ? className : [className]), ['sendbird-message-status']).join(' ')
  }, icon[status], /*#__PURE__*/React__default['default'].createElement("br", null), label());
}
MessageStatus.propTypes = {
  className: PropTypes__default['default'].oneOfType([PropTypes__default['default'].string, PropTypes__default['default'].arrayOf(PropTypes__default['default'].string)]),
  message: PropTypes__default['default'].shape({
    createdAt: PropTypes__default['default'].number,
    sender: PropTypes__default['default'].shape({
      friendName: PropTypes__default['default'].string,
      nickname: PropTypes__default['default'].string,
      userId: PropTypes__default['default'].string,
      profileUrl: PropTypes__default['default'].string
    })
  }),
  status: PropTypes__default['default'].string
};
MessageStatus.defaultProps = {
  className: '',
  message: null,
  status: ''
};

var ReactionBadge = /*#__PURE__*/React__default['default'].forwardRef(function (props, ref) {
  var className = props.className,
      children = props.children,
      count = props.count,
      selected = props.selected,
      isAdd = props.isAdd,
      onClick = props.onClick;

  var getClassNameTail = function getClassNameTail() {
    if (selected && !isAdd) {
      return '--selected';
    }

    if (isAdd) {
      return '--is-add';
    }

    return '';
  };

  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: [].concat(LocalizationContext._toConsumableArray(Array.isArray(className) ? className : [className]), ["sendbird-reaction-badge".concat(getClassNameTail())]).join(' '),
    role: "button",
    ref: ref,
    onClick: onClick,
    onKeyDown: onClick,
    tabIndex: 0
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-reaction-badge__inner"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-reaction-badge__inner__icon"
  }, children), /*#__PURE__*/React__default['default'].createElement(index$2.Label, {
    className: children && count && 'sendbird-reaction-badge__inner__count',
    type: index$2.LabelTypography.CAPTION_3,
    color: index$2.LabelColors.ONBACKGROUND_1
  }, count)));
});
ReactionBadge.propTypes = {
  className: PropTypes__default['default'].oneOfType([PropTypes__default['default'].string, PropTypes__default['default'].arrayOf(PropTypes__default['default'].string)]),
  children: PropTypes__default['default'].element.isRequired,
  count: PropTypes__default['default'].oneOfType([PropTypes__default['default'].number, PropTypes__default['default'].string]),
  selected: PropTypes__default['default'].bool,
  isAdd: PropTypes__default['default'].bool,
  onClick: PropTypes__default['default'].func
};
ReactionBadge.defaultProps = {
  className: '',
  count: '',
  selected: false,
  isAdd: false,
  onClick: function onClick() {}
};

function Tooltip(_ref) {
  var className = _ref.className,
      children = _ref.children;
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: [].concat(LocalizationContext._toConsumableArray(Array.isArray(className) ? className : [className]), ['sendbird-tooltip']).join(' ')
  }, /*#__PURE__*/React__default['default'].createElement(index$2.Label, {
    className: "sendbird-tooltip__text",
    type: index$2.LabelTypography.CAPTION_2,
    color: index$2.LabelColors.ONCONTENT_1
  }, children));
}
Tooltip.propTypes = {
  className: PropTypes__default['default'].string,
  children: PropTypes__default['default'].oneOfType([PropTypes__default['default'].element, PropTypes__default['default'].arrayOf(PropTypes__default['default'].string), PropTypes__default['default'].string])
};
Tooltip.defaultProps = {
  className: '',
  children: ''
};

var SPACE_FROM_TRIGGER = 8;
function TooltipWrapper(_ref) {
  var className = _ref.className,
      children = _ref.children,
      hoverTooltip = _ref.hoverTooltip;

  var _useState = React.useState(false),
      _useState2 = LocalizationContext._slicedToArray(_useState, 2),
      showHoverTooltip = _useState2[0],
      setShowHoverTooltip = _useState2[1];

  var childrenRef = React.useRef(null);
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: [].concat(LocalizationContext._toConsumableArray(Array.isArray(className) ? className : [className]), ['sendbird-tooltip-wrapper']).join(' '),
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
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-tooltip-wrapper__children",
    ref: childrenRef
  }, children), showHoverTooltip && /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-tooltip-wrapper__hover-tooltip",
    style: {
      bottom: "calc(100% + ".concat(SPACE_FROM_TRIGGER, "px)")
    }
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-tooltip-wrapper__hover-tooltip__inner"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-tooltip-wrapper__hover-tooltip__inner__tooltip-container",
    style: {
      left: childrenRef.current && "calc(".concat(childrenRef.current.offsetWidth / 2, "px - 50%)")
    }
  }, hoverTooltip))));
}
TooltipWrapper.propTypes = {
  className: PropTypes__default['default'].oneOfType([PropTypes__default['default'].string, PropTypes__default['default'].arrayOf(PropTypes__default['default'].string)]),
  children: PropTypes__default['default'].element.isRequired,
  hoverTooltip: PropTypes__default['default'].oneOfType([PropTypes__default['default'].element, PropTypes__default['default'].func]).isRequired
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
  var MemoizedEmojiListItems = memoizedEmojiListItems;
  var imageWidth = '20px';
  var imageHeight = '20px';
  var emojiReactionAddRef = React.useRef(null);
  var _message$reactions = message.reactions,
      reactions = _message$reactions === void 0 ? [] : _message$reactions;
  var messageReactions = reactions;

  var _useContext = React.useContext(LocalizationContext.LocalizationContext),
      stringSet = _useContext.stringSet;

  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: [].concat(LocalizationContext._toConsumableArray(Array.isArray(className) ? className : [className]), ['sendbird-emoji-reactions']).join(' ')
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-emoji-reactions--inner"
  }, messageReactions && messageReactions.map(function (reaction) {
    // function component
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
    return /*#__PURE__*/React__default['default'].createElement(TooltipWrapper, {
      className: "sendbird-emoji-reactions__emoji-reaction",
      key: reaction.key,
      hoverTooltip: userIds.length > 0 && /*#__PURE__*/React__default['default'].createElement(Tooltip, null, /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, "".concat(nicknames.join(', ')).concat(reactedByMe ? stringSetForMe : '')))
    }, /*#__PURE__*/React__default['default'].createElement(ReactionBadge, {
      count: reactedUserCount,
      selected: reactedByMe,
      onClick: function onClick() {
        return toggleReaction(message, reaction.key, reactedByMe);
      }
    }, /*#__PURE__*/React__default['default'].createElement(index$2.ImageRenderer, {
      circle: true,
      url: emojiUrl,
      width: imageWidth,
      height: imageHeight,
      defaultComponent: /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
        width: imageWidth,
        height: imageHeight,
        type: index$2.IconTypes.QUESTION
      })
    })));
  }), messageReactions.length < emojiAllMap.size && /*#__PURE__*/React__default['default'].createElement(index$1.ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return /*#__PURE__*/React__default['default'].createElement(ReactionBadge, {
        className: "sendbird-emoji-reactions__emoji-reaction-add",
        isAdd: true,
        onClick: toggleDropdown,
        ref: emojiReactionAddRef
      }, /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
        width: imageWidth,
        height: imageHeight,
        fillColor: index$2.IconColors.ON_BACKGROUND_3,
        type: index$2.IconTypes.EMOJI_MORE
      }));
    },
    menuItems: function menuItems(closeDropdown) {
      return /*#__PURE__*/React__default['default'].createElement(MemoizedEmojiListItems, {
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
  className: PropTypes__default['default'].oneOfType([PropTypes__default['default'].string, PropTypes__default['default'].arrayOf(PropTypes__default['default'].string)]),
  userId: PropTypes__default['default'].string,
  message: PropTypes__default['default'].shape({
    reactions: PropTypes__default['default'].arrayOf(PropTypes__default['default'].shape({}))
  }).isRequired,
  emojiAllMap: PropTypes__default['default'].instanceOf(Map).isRequired,
  membersMap: PropTypes__default['default'].instanceOf(Map),
  toggleReaction: PropTypes__default['default'].func,
  memoizedEmojiListItems: PropTypes__default['default'].func
};
EmojiReactions.defaultProps = {
  className: '',
  userId: '',
  membersMap: new Map(),
  toggleReaction: function toggleReaction() {},
  memoizedEmojiListItems: function memoizedEmojiListItems() {
    return '';
  }
};

function useMemoizedMessageText$1(_ref) {
  var message = _ref.message,
      updatedAt = _ref.updatedAt,
      className = _ref.className,
      incoming = _ref.incoming;

  var _useContext = React.useContext(LocalizationContext.LocalizationContext),
      stringSet = _useContext.stringSet;

  var WORD_TYPOGRAPHY = index$2.LabelTypography.BODY_1;
  var EDITED_COLOR = incoming ? index$2.LabelColors.ONBACKGROUND_2 : index$2.LabelColors.ONCONTENT_2;
  return React.useMemo(function () {
    return function () {
      var splitMessage = message.split(/\r/);
      var matchedMessage = splitMessage.map(function (word) {
        return word !== '' ? word : /*#__PURE__*/React__default['default'].createElement("br", null);
      });

      if (updatedAt > 0) {
        matchedMessage.push( /*#__PURE__*/React__default['default'].createElement(index$2.Label, {
          key: LocalizationContext.uuidv4(),
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

  React.useEffect(function () {
    var current = ref.current;

    if (current) {
      current.addEventListener(MOUSE_ENTER, handleMouseOver);
      current.addEventListener(MOUSE_LEAVE, handleMouseOut);
    }

    return function () {
      if (current) {
        current.removeEventListener(MOUSE_ENTER, handleMouseOver);
        current.removeEventListener(MOUSE_LEAVE, handleMouseOut);
      }
    };
  });
};

var noop$5 = function noop() {};

var GROUPING_PADDING$3 = '1px';
var NORMAL_PADDING$3 = '8px';
function Message(props) {
  var className = props.className,
      message = props.message,
      isByMe = props.isByMe,
      userId = props.userId,
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
  var outgoingMemoizedMessageText = useMemoizedMessageText$1({
    className: 'sendbird-user-message-word',
    message: message.message,
    updatedAt: message.updatedAt
  });
  var incomingMemoizedMessageText = useMemoizedMessageText$1({
    className: 'sendbird-user-message-word',
    message: message.message,
    updatedAt: message.updatedAt,
    incoming: true
  });
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: [].concat(LocalizationContext._toConsumableArray(Array.isArray(className) ? className : [className]), ['sendbird-message', "sendbird-message".concat(isByMe ? '--outgoing' : '--incoming')]).join(' ')
  }, isByMe ? /*#__PURE__*/React__default['default'].createElement(OutgoingUserMessage, {
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
  }) : /*#__PURE__*/React__default['default'].createElement(IncomingUserMessage, {
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
  isByMe: PropTypes__default['default'].bool,
  disabled: PropTypes__default['default'].bool,
  userId: PropTypes__default['default'].string,
  message: PropTypes__default['default'].objectOf(PropTypes__default['default'].oneOfType([PropTypes__default['default'].string, PropTypes__default['default'].number, PropTypes__default['default'].bool, PropTypes__default['default'].array, PropTypes__default['default'].object])).isRequired,
  className: PropTypes__default['default'].oneOfType([PropTypes__default['default'].string, PropTypes__default['default'].arrayOf(PropTypes__default['default'].string)]),
  showEdit: PropTypes__default['default'].func,
  status: PropTypes__default['default'].string,
  showRemove: PropTypes__default['default'].func,
  resendMessage: PropTypes__default['default'].func,
  useReaction: PropTypes__default['default'].bool.isRequired,
  emojiAllMap: PropTypes__default['default'].instanceOf(Map),
  membersMap: PropTypes__default['default'].instanceOf(Map),
  toggleReaction: PropTypes__default['default'].func,
  memoizedEmojiListItems: PropTypes__default['default'].func,
  chainTop: PropTypes__default['default'].bool,
  chainBottom: PropTypes__default['default'].bool
};
Message.defaultProps = {
  isByMe: false,
  disabled: false,
  userId: '',
  resendMessage: noop$5,
  className: '',
  showEdit: noop$5,
  showRemove: noop$5,
  status: '',
  emojiAllMap: new Map(),
  membersMap: new Map(),
  toggleReaction: noop$5,
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

  var messageRef = React.useRef(null);
  var parentRefReactions = React.useRef(null);
  var parentRefMenus = React.useRef(null);
  var parentContainRef = React.useRef(null);

  var _useState = React.useState(false),
      _useState2 = LocalizationContext._slicedToArray(_useState, 2),
      mousehover = _useState2[0],
      setMousehover = _useState2[1];

  var _useState3 = React.useState(false),
      _useState4 = LocalizationContext._slicedToArray(_useState3, 2),
      moreActive = _useState4[0],
      setMoreActive = _useState4[1];

  var _useState5 = React.useState(false),
      _useState6 = LocalizationContext._slicedToArray(_useState5, 2),
      menuDisplaying = _useState6[0],
      setMenuDisplaying = _useState6[1];

  var isMessageSent = utils$1.getIsSentFromStatus(status);
  var showReactionAddButton = useReaction && emojiAllMap.size > 0 && utils$1.getIsSentFromSendingStatus(message);

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
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-user-message--outgoing",
    ref: messageRef,
    style: {
      paddingTop: chainTop ? GROUPING_PADDING$3 : NORMAL_PADDING$3,
      paddingBottom: chainBottom ? GROUPING_PADDING$3 : NORMAL_PADDING$3
    }
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-user-message--inner"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-user-message__left-padding"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-user-message__more",
    ref: parentContainRef
  }, /*#__PURE__*/React__default['default'].createElement(index$1.ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return /*#__PURE__*/React__default['default'].createElement(index$1.IconButton, {
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
      }, /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
        type: index$2.IconTypes.MORE,
        fillColor: index$2.IconColors.CONTENT_INVERSE,
        width: "24px",
        height: "24px"
      }));
    },
    menuItems: function menuItems(close) {
      var closeDropdown = function closeDropdown() {
        close();
        setMenuDisplaying(false);
      };

      return /*#__PURE__*/React__default['default'].createElement(index$1.MenuItems
      /**
       * parentRef: For catching location(x, y) of MenuItems
       * parentContainRef: For toggling more options(menus & reactions)
       */
      , {
        parentRef: parentRefMenus,
        parentContainRef: parentContainRef,
        closeDropdown: closeDropdown,
        openLeft: true
      }, isMessageSent && /*#__PURE__*/React__default['default'].createElement(index$1.MenuItem, {
        className: "sendbird-user-message--copy",
        onClick: function onClick() {
          utils$1.copyToClipboard(message.message);
          closeDropdown();
        }
      }, "Copy"), isMessageSent && /*#__PURE__*/React__default['default'].createElement(index$1.MenuItem, {
        onClick: function onClick() {
          if (disabled) {
            return;
          }

          showEdit(true);
          closeDropdown();
        }
      }, "Edit"), message && message.isResendable && message.isResendable() && /*#__PURE__*/React__default['default'].createElement(index$1.MenuItem, {
        onClick: function onClick() {
          resendMessage(message);
          closeDropdown();
        }
      }, "Resend"), /*#__PURE__*/React__default['default'].createElement(index$1.MenuItem, {
        onClick: function onClick() {
          if (disabled) {
            return;
          }

          showRemove(true);
          closeDropdown();
        }
      }, "Delete"));
    }
  }), isMessageSent && showReactionAddButton && /*#__PURE__*/React__default['default'].createElement(index$1.ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return /*#__PURE__*/React__default['default'].createElement(index$1.IconButton, {
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
      }, /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
        width: "24px",
        height: "24px",
        type: index$2.IconTypes.EMOJI_MORE,
        fillColor: index$2.IconColors.CONTENT_INVERSE
      }));
    },
    menuItems: function menuItems(close) {
      var closeDropdown = function closeDropdown() {
        close();
        setMenuDisplaying(false);
      };

      return /*#__PURE__*/React__default['default'].createElement(MemoizedEmojiListItems, {
        message: message,
        parentRef: parentRefReactions,
        parentContainRef: parentContainRef,
        closeDropdown: closeDropdown,
        spaceFromTrigger: {
          y: 2
        }
      });
    }
  })), !chainBottom && !(mousehover || moreActive || menuDisplaying) && /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-user-message__status"
  }, /*#__PURE__*/React__default['default'].createElement(MessageStatus, {
    message: message,
    status: status
  }))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-user-message__text-balloon"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-user-message__text-balloon__inner"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-user-message__text-balloon__inner__text-place"
  }, /*#__PURE__*/React__default['default'].createElement(index$2.Label, {
    className: "sendbird-user-message__text-balloon__inner__text-place__text",
    type: index$2.LabelTypography.BODY_1,
    color: index$2.LabelColors.ONCONTENT_1
  }, /*#__PURE__*/React__default['default'].createElement(MemoizedMessageText, null))), useReaction && message.reactions && message.reactions.length > 0 && /*#__PURE__*/React__default['default'].createElement(EmojiReactions, {
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
  var messageRef = React.useRef(null);
  var parentRefReactions = React.useRef(null);
  var parentRefMenus = React.useRef(null);
  var parentContainRef = React.useRef(null);
  var avatarRef = React.useRef(null);

  var _React$useContext = React__default['default'].useContext(index$1.UserProfileContext),
      disableUserProfile = _React$useContext.disableUserProfile,
      renderUserProfile = _React$useContext.renderUserProfile;

  var _useState7 = React.useState(false),
      _useState8 = LocalizationContext._slicedToArray(_useState7, 2),
      mousehover = _useState8[0],
      setMousehover = _useState8[1];

  var _useState9 = React.useState(false),
      _useState10 = LocalizationContext._slicedToArray(_useState9, 2),
      moreActive = _useState10[0],
      setMoreActive = _useState10[1];

  var _useState11 = React.useState(false),
      _useState12 = LocalizationContext._slicedToArray(_useState11, 2),
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
  return /*#__PURE__*/React__default['default'].createElement("div", {
    ref: messageRef,
    className: "sendbird-user-message--incoming",
    style: {
      paddingTop: chainTop ? GROUPING_PADDING$3 : NORMAL_PADDING$3,
      paddingBottom: chainBottom ? GROUPING_PADDING$3 : NORMAL_PADDING$3
    }
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-user-message--inner"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-user-message--body"
  }, !chainBottom && /*#__PURE__*/React__default['default'].createElement(index$1.ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return /*#__PURE__*/React__default['default'].createElement(index$2.Avatar, {
        ref: avatarRef,
        onClick: function onClick() {
          if (!disableUserProfile) {
            toggleDropdown();
          }
        },
        className: "sendbird-user-message__avatar",
        src: utils$1.getSenderProfileUrl(message),
        width: "28px",
        height: "28px"
      });
    },
    menuItems: function menuItems(closeDropdown) {
      return /*#__PURE__*/React__default['default'].createElement(index$1.MenuItems
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
      }) : /*#__PURE__*/React__default['default'].createElement(index$1.ConnectedUserProfile, {
        user: message.sender,
        onSuccess: closeDropdown
      }));
    }
  }), !chainTop && /*#__PURE__*/React__default['default'].createElement(index$2.Label, {
    className: "sendbird-user-message__sender-name",
    type: index$2.LabelTypography.CAPTION_2,
    color: index$2.LabelColors.ONBACKGROUND_2
  }, utils$1.getSenderName(message)), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-user-message__text-balloon"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-user-message__text-balloon__inner"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-user-message__text-balloon__inner__text-place"
  }, /*#__PURE__*/React__default['default'].createElement(index$2.Label, {
    className: "sendbird-user-message__text-balloon__inner__text-place__text",
    type: index$2.LabelTypography.BODY_1,
    color: index$2.LabelColors.ONBACKGROUND_1
  }, /*#__PURE__*/React__default['default'].createElement(MemoizedMessageText, null))), showEmojiReactions && /*#__PURE__*/React__default['default'].createElement(EmojiReactions, {
    className: "sendbird-user-message__text-balloon__inner__emoji-reactions",
    userId: userId,
    message: message,
    emojiAllMap: emojiAllMap,
    membersMap: membersMap,
    toggleReaction: toggleReaction,
    memoizedEmojiListItems: memoizedEmojiListItems
  })))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-user-message__right-padding"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-user-message__more",
    ref: parentContainRef,
    style: {
      top: chainTop ? '6px' : '22px'
    }
  }, showReactionAddButton && /*#__PURE__*/React__default['default'].createElement(index$1.ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return /*#__PURE__*/React__default['default'].createElement(index$1.IconButton, {
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
      }, /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
        width: "24px",
        height: "24px",
        type: index$2.IconTypes.EMOJI_MORE,
        fillColor: index$2.IconColors.CONTENT_INVERSE
      }));
    },
    menuItems: function menuItems(close) {
      var closeDropdown = function closeDropdown() {
        close();
        setMenuDisplaying(false);
      };

      return /*#__PURE__*/React__default['default'].createElement(MemoizedEmojiListItems, {
        parentRef: parentRefReactions,
        parentContainRef: parentContainRef,
        closeDropdown: closeDropdown,
        message: message,
        spaceFromTrigger: {
          y: 2
        }
      });
    }
  }), /*#__PURE__*/React__default['default'].createElement(index$1.ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return /*#__PURE__*/React__default['default'].createElement(index$1.IconButton, {
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
      }, /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
        width: "24px",
        height: "24px",
        type: index$2.IconTypes.MORE,
        fillColor: index$2.IconColors.CONTENT_INVERSE
      }));
    },
    menuItems: function menuItems(close) {
      var closeDropdown = function closeDropdown() {
        close();
        setMenuDisplaying(false);
      };

      return /*#__PURE__*/React__default['default'].createElement(index$1.MenuItems, {
        parentRef: parentRefMenus,
        parentContainRef: parentContainRef,
        closeDropdown: closeDropdown
      }, /*#__PURE__*/React__default['default'].createElement(index$1.MenuItem, {
        className: "sendbird-user-message--copy",
        onClick: function onClick() {
          utils$1.copyToClipboard(message.message);
          closeDropdown();
        }
      }, "Copy"));
    }
  })), !chainBottom && !(mousehover || moreActive || menuDisplaying) && /*#__PURE__*/React__default['default'].createElement(index$2.Label, {
    className: "sendbird-user-message__sent-at",
    type: index$2.LabelTypography.CAPTION_3,
    color: index$2.LabelColors.ONBACKGROUND_2
  }, utils$1.getMessageCreatedAt(message)))));
}

IncomingUserMessage.propTypes = {
  userId: PropTypes__default['default'].string.isRequired,
  message: PropTypes__default['default'].objectOf(PropTypes__default['default'].oneOfType([PropTypes__default['default'].string, PropTypes__default['default'].number, PropTypes__default['default'].bool, PropTypes__default['default'].array, PropTypes__default['default'].object])),
  useReaction: PropTypes__default['default'].bool.isRequired,
  emojiAllMap: PropTypes__default['default'].instanceOf(Map),
  membersMap: PropTypes__default['default'].instanceOf(Map),
  toggleReaction: PropTypes__default['default'].func,
  memoizedMessageText: PropTypes__default['default'].func.isRequired,
  memoizedEmojiListItems: PropTypes__default['default'].func,
  chainTop: PropTypes__default['default'].bool.isRequired,
  chainBottom: PropTypes__default['default'].bool.isRequired
};
IncomingUserMessage.defaultProps = {
  message: {},
  emojiAllMap: new Map(),
  membersMap: new Map(),
  toggleReaction: noop$5,
  memoizedEmojiListItems: function memoizedEmojiListItems() {
    return '';
  }
};
OutgoingUserMessage.propTypes = {
  userId: PropTypes__default['default'].string.isRequired,
  message: PropTypes__default['default'].objectOf(PropTypes__default['default'].oneOfType([PropTypes__default['default'].string, PropTypes__default['default'].number, PropTypes__default['default'].bool, PropTypes__default['default'].array, PropTypes__default['default'].object])),
  showEdit: PropTypes__default['default'].func,
  showRemove: PropTypes__default['default'].func,
  disabled: PropTypes__default['default'].bool,
  resendMessage: PropTypes__default['default'].func,
  status: PropTypes__default['default'].string.isRequired,
  useReaction: PropTypes__default['default'].bool.isRequired,
  emojiAllMap: PropTypes__default['default'].instanceOf(Map),
  membersMap: PropTypes__default['default'].instanceOf(Map),
  toggleReaction: PropTypes__default['default'].func,
  memoizedMessageText: PropTypes__default['default'].func.isRequired,
  memoizedEmojiListItems: PropTypes__default['default'].func,
  chainTop: PropTypes__default['default'].bool.isRequired,
  chainBottom: PropTypes__default['default'].bool.isRequired
};
OutgoingUserMessage.defaultProps = {
  message: {},
  resendMessage: noop$5,
  showEdit: noop$5,
  showRemove: noop$5,
  disabled: false,
  emojiAllMap: new Map(),
  membersMap: new Map(),
  toggleReaction: noop$5,
  memoizedEmojiListItems: function memoizedEmojiListItems() {
    return '';
  }
};

function AdminMessage(_ref) {
  var className = _ref.className,
      message = _ref.message;

  if (!(message.isAdminMessage || message.messageType) || !message.isAdminMessage() || message.messageType !== 'admin') {
    return null;
  }

  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: [].concat(LocalizationContext._toConsumableArray(Array.isArray(className) ? className : [className]), ['sendbird-admin-message']).join(' ')
  }, /*#__PURE__*/React__default['default'].createElement(index$2.Label, {
    className: "sendbird-admin-message__text",
    type: index$2.LabelTypography.CAPTION_2,
    color: index$2.LabelColors.ONBACKGROUND_2
  }, message.message));
}
AdminMessage.propTypes = {
  message: PropTypes__default['default'].shape({
    message: PropTypes__default['default'].string,
    messageType: PropTypes__default['default'].string,
    isAdminMessage: PropTypes__default['default'].func
  }),
  className: PropTypes__default['default'].oneOfType([PropTypes__default['default'].string, PropTypes__default['default'].arrayOf(PropTypes__default['default'].string)])
};
AdminMessage.defaultProps = {
  message: {},
  className: ''
};

var getMessageCreatedAt$2 = function getMessageCreatedAt(message) {
  return index$2.format(message.createdAt, 'p');
};
var getIsSentFromStatus$1 = function getIsSentFromStatus(status) {
  return status === type.MessageStatusType.SENT || status === type.MessageStatusType.DELIVERED || status === type.MessageStatusType.READ;
};
var getIsSentFromSendingStatus$1 = function getIsSentFromSendingStatus() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (message.sendingStatus && typeof message.sendingStatus === 'string') {
    return message.sendingStatus === 'none' || message.sendingStatus === 'succeeded';
  }

  return false;
};

var noop$4 = function noop() {};

var OUTGOING_THUMBNAIL_MESSAGE = 'sendbird-outgoing-thumbnail-message';
var INCOMING_THUMBNAIL_MESSAGE = 'sendbird-incoming-thumbnail-message';
var GROUPING_PADDING$2 = '1px';
var NORMAL_PADDING$2 = '8px';
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
  return isByMe ? /*#__PURE__*/React__default['default'].createElement(OutgoingThumbnailMessage, {
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
  }) : /*#__PURE__*/React__default['default'].createElement(IncomingThumbnailMessage, {
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

  var _useContext = React.useContext(LocalizationContext.LocalizationContext),
      stringSet = _useContext.stringSet;

  var messageRef = React.useRef(null);
  var parentContainRef = React.useRef(null);
  var menuRef = React.useRef(null);
  var reactionAddRef = React.useRef(null);

  var _useState = React.useState(false),
      _useState2 = LocalizationContext._slicedToArray(_useState, 2),
      mousehover = _useState2[0],
      setMousehover = _useState2[1];

  var _useState3 = React.useState(false),
      _useState4 = LocalizationContext._slicedToArray(_useState3, 2),
      moreActive = _useState4[0],
      setMoreActive = _useState4[1];

  var _useState5 = React.useState(false),
      _useState6 = LocalizationContext._slicedToArray(_useState5, 2),
      menuDisplaying = _useState6[0],
      setMenuDisplaying = _useState6[1];
  /* eslint-disable react/prop-types */


  var memorizedThumbnailPlaceHolder = React.useMemo(function () {
    return function (iconType) {
      return function (_ref3) {
        var style = _ref3.style;
        return /*#__PURE__*/React__default['default'].createElement("div", {
          style: style
        }, /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
          type: iconType,
          fillColor: index$2.IconColors.ON_BACKGROUND_2,
          width: "56px",
          height: "56px"
        }));
      };
    };
  }, []);
  var showReactionAddButton = useReaction && emojiAllMap && emojiAllMap.size > 0 && getIsSentFromSendingStatus$1(message);
  var MemoizedEmojiListItems = memoizedEmojiListItems;
  var isMessageSent = getIsSentFromStatus$1(status);

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
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: OUTGOING_THUMBNAIL_MESSAGE,
    ref: messageRef,
    style: {
      paddingTop: chainTop ? GROUPING_PADDING$2 : NORMAL_PADDING$2,
      paddingBottom: chainBottom ? GROUPING_PADDING$2 : NORMAL_PADDING$2
    }
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "".concat(OUTGOING_THUMBNAIL_MESSAGE, "--inner")
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "".concat(OUTGOING_THUMBNAIL_MESSAGE, "__left-padding")
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "".concat(OUTGOING_THUMBNAIL_MESSAGE, "-left-padding__more"),
    ref: parentContainRef
  }, /*#__PURE__*/React__default['default'].createElement(index$1.ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return /*#__PURE__*/React__default['default'].createElement(index$1.IconButton, {
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
      }, /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
        type: index$2.IconTypes.MORE,
        fillColor: index$2.IconColors.CONTENT_INVERSE,
        width: "24px",
        height: "24px"
      }));
    },
    menuItems: function menuItems(close) {
      var closeDropdown = function closeDropdown() {
        close();
        setMenuDisplaying(false);
      };

      return /*#__PURE__*/React__default['default'].createElement(index$1.MenuItems
      /**
       * parentRef: For catching location(x, y) of MenuItems
       * parentContainRef: For toggling more options(menus & reactions)
       */
      , {
        parentRef: menuRef,
        parentContainRef: parentContainRef,
        closeDropdown: closeDropdown,
        openLeft: true
      }, message && message.isResendable && message.isResendable() && /*#__PURE__*/React__default['default'].createElement(index$1.MenuItem, {
        onClick: function onClick() {
          resendMessage(message);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__RESEND), /*#__PURE__*/React__default['default'].createElement(index$1.MenuItem, {
        onClick: function onClick() {
          if (disabled) {
            return;
          }

          showRemove(true);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__DELETE));
    }
  }), isMessageSent && showReactionAddButton && /*#__PURE__*/React__default['default'].createElement(index$1.ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return /*#__PURE__*/React__default['default'].createElement(index$1.IconButton, {
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
      }, /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
        type: index$2.IconTypes.EMOJI_MORE,
        fillColor: index$2.IconColors.CONTENT_INVERSE,
        width: "24px",
        height: "24px"
      }));
    },
    menuItems: function menuItems(close) {
      var closeDropdown = function closeDropdown() {
        close();
        setMenuDisplaying(false);
      };

      return /*#__PURE__*/React__default['default'].createElement(MemoizedEmojiListItems, {
        message: message,
        parentRef: reactionAddRef,
        parentContainRef: parentContainRef,
        closeDropdown: closeDropdown,
        spaceFromTrigger: {
          y: 2
        }
      });
    }
  })), !chainBottom && !(mousehover || moreActive || menuDisplaying) && /*#__PURE__*/React__default['default'].createElement(MessageStatus, {
    className: "".concat(OUTGOING_THUMBNAIL_MESSAGE, "-left-padding__status"),
    message: message,
    status: status
  })), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "".concat(OUTGOING_THUMBNAIL_MESSAGE, "__body")
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "".concat(OUTGOING_THUMBNAIL_MESSAGE, "-body__wrap")
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "".concat(OUTGOING_THUMBNAIL_MESSAGE, "-body__wrap--inner"),
    role: "button",
    onClick: isMessageSent ? function () {
      return onClick(true);
    } : function () {},
    onKeyDown: isMessageSent ? function () {
      return onClick(true);
    } : function () {},
    tabIndex: 0
  }, index.isVideo(type) && /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, thumbnailUrl ? /*#__PURE__*/React__default['default'].createElement(index$2.ImageRenderer, {
    className: "".concat(OUTGOING_THUMBNAIL_MESSAGE, "-body__video"),
    url: thumbnailUrl,
    alt: "video/thumbnail",
    width: "404px",
    height: "280px",
    defaultComponent: /*#__PURE__*/React__default['default'].createElement("div", {
      className: "".concat(OUTGOING_THUMBNAIL_MESSAGE, "__thumbnail-placeholder--video")
    }, /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
      type: index$2.IconTypes.PLAY,
      fillColor: index$2.IconColors.ON_BACKGROUND_2,
      width: "56px",
      height: "56px"
    })),
    placeHolder: memorizedThumbnailPlaceHolder(index$2.IconTypes.PLAY)
  }) :
  /*#__PURE__*/

  /* eslint-disable-next-line jsx-a11y/media-has-caption */
  React__default['default'].createElement("video", {
    className: "".concat(OUTGOING_THUMBNAIL_MESSAGE, "-body__video")
  }, /*#__PURE__*/React__default['default'].createElement("source", {
    src: url || localUrl,
    type: type
  })), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "".concat(OUTGOING_THUMBNAIL_MESSAGE, "-body__video-icon--wrap")
  }, /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
    className: "".concat(OUTGOING_THUMBNAIL_MESSAGE, "-body__video-icon"),
    type: index$2.IconTypes.PLAY,
    fillColor: index$2.IconColors.ON_BACKGROUND_2,
    width: "34px",
    height: "34px"
  }))), index.isImage(type) && /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement(index$2.ImageRenderer, {
    className: "".concat(OUTGOING_THUMBNAIL_MESSAGE, "-body__img"),
    url: thumbnailUrl || url || localUrl,
    alt: "image/thumbnail",
    width: "404px",
    height: "280px",
    defaultComponent: /*#__PURE__*/React__default['default'].createElement("div", {
      className: "".concat(OUTGOING_THUMBNAIL_MESSAGE, "__thumbnail-placeholder--image")
    }, /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
      type: index$2.IconTypes.PHOTO,
      fillColor: index$2.IconColors.ON_BACKGROUND_2,
      width: "56px",
      height: "56px"
    })),
    placeHolder: memorizedThumbnailPlaceHolder(index$2.IconTypes.PHOTO)
  }), index.isGif(type) && /*#__PURE__*/React__default['default'].createElement("div", {
    className: "".concat(OUTGOING_THUMBNAIL_MESSAGE, "-body__gif-icon--wrap")
  }, /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
    className: "".concat(OUTGOING_THUMBNAIL_MESSAGE, "-body__gif-icon"),
    type: index$2.IconTypes.GIF,
    fillColor: index$2.IconColors.ON_BACKGROUND_2,
    width: "34px",
    height: "34px"
  }))), index.unSupported(type) && /*#__PURE__*/React__default['default'].createElement("div", {
    className: "".concat(OUTGOING_THUMBNAIL_MESSAGE, "-body__other")
  }, stringSet.UNKNOWN__UNKNOWN_MESSAGE_TYPE), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "".concat(OUTGOING_THUMBNAIL_MESSAGE, "-body__wrap__overlay")
  })), useReaction && message.reactions && message.reactions.length > 0 && /*#__PURE__*/React__default['default'].createElement(EmojiReactions, {
    className: "".concat(OUTGOING_THUMBNAIL_MESSAGE, "-body__wrap__emoji-reactions"),
    userId: userId,
    message: message,
    emojiAllMap: emojiAllMap,
    membersMap: membersMap,
    toggleReaction: toggleReaction,
    memoizedEmojiListItems: memoizedEmojiListItems
  })))));
}
function IncomingThumbnailMessage(_ref4) {
  var _ref4$message = _ref4.message,
      message = _ref4$message === void 0 ? {} : _ref4$message,
      userId = _ref4.userId,
      onClick = _ref4.onClick,
      status = _ref4.status,
      useReaction = _ref4.useReaction,
      emojiAllMap = _ref4.emojiAllMap,
      membersMap = _ref4.membersMap,
      toggleReaction = _ref4.toggleReaction,
      memoizedEmojiListItems = _ref4.memoizedEmojiListItems,
      chainTop = _ref4.chainTop,
      chainBottom = _ref4.chainBottom;
  var type = message.type,
      url = message.url,
      localUrl = message.localUrl,
      thumbnails = message.thumbnails;
  var thumbnailUrl = thumbnails && thumbnails.length > 0 && thumbnails[0].url || null;

  var _React$useContext = React__default['default'].useContext(index$1.UserProfileContext),
      disableUserProfile = _React$useContext.disableUserProfile,
      renderUserProfile = _React$useContext.renderUserProfile;

  var _useContext2 = React.useContext(LocalizationContext.LocalizationContext),
      stringSet = _useContext2.stringSet;

  var messageRef = React.useRef(null);
  var parentContainRef = React.useRef(null);
  var reactionAddRef = React.useRef(null);
  var avatarRef = React.useRef(null);

  var _useState7 = React.useState(false),
      _useState8 = LocalizationContext._slicedToArray(_useState7, 2),
      mousehover = _useState8[0],
      setMousehover = _useState8[1];

  var _useState9 = React.useState(false),
      _useState10 = LocalizationContext._slicedToArray(_useState9, 2),
      moreActive = _useState10[0],
      setMoreActive = _useState10[1];

  var _useState11 = React.useState(false),
      _useState12 = LocalizationContext._slicedToArray(_useState11, 2),
      menuDisplaying = _useState12[0],
      setMenuDisplaying = _useState12[1];
  /* eslint-disable react/prop-types */


  var memorizedThumbnailPlaceHolder = React.useMemo(function () {
    return function (iconType) {
      return function (_ref5) {
        var style = _ref5.style;
        return /*#__PURE__*/React__default['default'].createElement("div", {
          style: style
        }, /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
          type: iconType,
          fillColor: index$2.IconColors.ON_BACKGROUND_2,
          width: "56px",
          height: "56px"
        }));
      };
    };
  }, []);
  var showReactionAddButton = useReaction && emojiAllMap && emojiAllMap.size > 0;
  var MemoizedEmojiListItems = memoizedEmojiListItems;
  var isMessageSent = getIsSentFromStatus$1(status);

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
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: INCOMING_THUMBNAIL_MESSAGE,
    ref: messageRef,
    style: {
      paddingTop: chainTop ? GROUPING_PADDING$2 : NORMAL_PADDING$2,
      paddingBottom: chainBottom ? GROUPING_PADDING$2 : NORMAL_PADDING$2
    }
  }, !chainTop && /*#__PURE__*/React__default['default'].createElement(index$2.Label, {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "__sender-name"),
    type: index$2.LabelTypography.CAPTION_2,
    color: index$2.LabelColors.ONBACKGROUND_2
  }, utils.getSenderName(message) || ''), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "--inner")
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "__body")
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "-body__wrap")
  }, !chainBottom && /*#__PURE__*/React__default['default'].createElement(index$1.ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return /*#__PURE__*/React__default['default'].createElement(index$2.Avatar, {
        className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "__avatar"),
        ref: avatarRef,
        onClick: function onClick() {
          if (!disableUserProfile) {
            toggleDropdown();
          }
        },
        src: utils.getSenderProfileUrl(message),
        width: "28px",
        height: "28px"
      });
    },
    menuItems: function menuItems(closeDropdown) {
      return /*#__PURE__*/React__default['default'].createElement(index$1.MenuItems
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
      }) : /*#__PURE__*/React__default['default'].createElement(index$1.ConnectedUserProfile, {
        user: message.sender,
        onSuccess: closeDropdown
      }));
    }
  }), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "-body__wrap--inner"),
    role: "button",
    onClick: isMessageSent ? function () {
      return onClick(true);
    } : function () {},
    onKeyDown: isMessageSent ? function () {
      return onClick(true);
    } : function () {},
    tabIndex: 0
  }, index.isVideo(type) && /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, thumbnailUrl ? /*#__PURE__*/React__default['default'].createElement(index$2.ImageRenderer, {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "__video"),
    url: thumbnailUrl,
    alt: "video/thumbnail",
    width: "404px",
    height: "280px",
    defaultComponent: /*#__PURE__*/React__default['default'].createElement("div", {
      className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "__thumbnail-placeholder--video")
    }, /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
      type: index$2.IconTypes.PLAY,
      fillColor: index$2.IconColors.ON_BACKGROUND_2,
      width: "56px",
      height: "56px"
    })),
    placeHolder: memorizedThumbnailPlaceHolder(index$2.IconTypes.PLAY)
  }) :
  /*#__PURE__*/

  /* eslint-disable-next-line jsx-a11y/media-has-caption */
  React__default['default'].createElement("video", {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "__video")
  }, /*#__PURE__*/React__default['default'].createElement("source", {
    src: url || localUrl,
    type: type
  })), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "__video-icon--wrap")
  }, /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "__video-icon"),
    type: index$2.IconTypes.PLAY,
    fillColor: index$2.IconColors.ON_BACKGROUND_2,
    width: "34px",
    height: "34px"
  }))), index.isImage(type) && /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement(index$2.ImageRenderer, {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "__img"),
    url: thumbnailUrl || url || localUrl,
    alt: "image/thumbnail",
    width: "404px",
    height: "280px",
    defaultComponent: /*#__PURE__*/React__default['default'].createElement("div", {
      className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "__thumbnail-placeholder--image")
    }, /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
      type: index$2.IconTypes.PHOTO,
      fillColor: index$2.IconColors.ON_BACKGROUND_2,
      width: "56px",
      height: "56px"
    })),
    placeHolder: memorizedThumbnailPlaceHolder(index$2.IconTypes.PHOTO)
  }), index.isGif(type) && /*#__PURE__*/React__default['default'].createElement("div", {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "__gif-icon--wrap")
  }, /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "__gif-icon"),
    type: index$2.IconTypes.GIF,
    fillColor: index$2.IconColors.ON_BACKGROUND_2,
    width: "34px",
    height: "34px"
  }))), index.unSupported(type) && /*#__PURE__*/React__default['default'].createElement("div", {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "__other")
  }, stringSet.UNKNOWN__UNKNOWN_MESSAGE_TYPE), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "-body__wrap-overlay")
  })), useReaction && message.reactions && message.reactions.length > 0 && /*#__PURE__*/React__default['default'].createElement(EmojiReactions, {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "__wrap__emoji-reactions"),
    userId: userId,
    message: message,
    emojiAllMap: emojiAllMap,
    membersMap: membersMap,
    toggleReaction: toggleReaction,
    memoizedEmojiListItems: memoizedEmojiListItems
  }))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "__right-padding")
  }, !chainBottom && !(mousehover || moreActive || menuDisplaying) && /*#__PURE__*/React__default['default'].createElement(index$2.Label, {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "__sent-at"),
    type: index$2.LabelTypography.CAPTION_3,
    color: index$2.LabelColors.ONBACKGROUND_2
  }, getMessageCreatedAt$2(message)), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "".concat(INCOMING_THUMBNAIL_MESSAGE, "__more"),
    ref: parentContainRef
  }, showReactionAddButton && /*#__PURE__*/React__default['default'].createElement(index$1.ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return /*#__PURE__*/React__default['default'].createElement(index$1.IconButton, {
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
      }, /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
        type: index$2.IconTypes.EMOJI_MORE,
        fillColor: index$2.IconColors.CONTENT_INVERSE,
        width: "24px",
        height: "24px"
      }));
    },
    menuItems: function menuItems(close) {
      var closeDropdown = function closeDropdown() {
        close();
        setMenuDisplaying(false);
      };

      return /*#__PURE__*/React__default['default'].createElement(MemoizedEmojiListItems, {
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
  message: PropTypes__default['default'].shape({
    type: PropTypes__default['default'].string,
    url: PropTypes__default['default'].string,
    localUrl: PropTypes__default['default'].string
  }).isRequired,
  userId: PropTypes__default['default'].string,
  resendMessage: PropTypes__default['default'].func,
  status: PropTypes__default['default'].string,
  isByMe: PropTypes__default['default'].bool,
  disabled: PropTypes__default['default'].bool,
  onClick: PropTypes__default['default'].func,
  showRemove: PropTypes__default['default'].func,
  useReaction: PropTypes__default['default'].bool.isRequired,
  emojiAllMap: PropTypes__default['default'].instanceOf(Map),
  membersMap: PropTypes__default['default'].instanceOf(Map),
  toggleReaction: PropTypes__default['default'].func,
  memoizedEmojiListItems: PropTypes__default['default'].func,
  chainTop: PropTypes__default['default'].bool,
  chainBottom: PropTypes__default['default'].bool
};
ThumbnailMessage.defaultProps = {
  isByMe: false,
  disabled: false,
  resendMessage: noop$4,
  onClick: noop$4,
  showRemove: noop$4,
  status: '',
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
OutgoingThumbnailMessage.propTypes = {
  message: PropTypes__default['default'].shape({
    type: PropTypes__default['default'].string,
    url: PropTypes__default['default'].string,
    localUrl: PropTypes__default['default'].string
  }).isRequired,
  userId: PropTypes__default['default'].string.isRequired,
  disabled: PropTypes__default['default'].bool.isRequired,
  resendMessage: PropTypes__default['default'].func.isRequired,
  status: PropTypes__default['default'].string,
  onClick: PropTypes__default['default'].func.isRequired,
  showRemove: PropTypes__default['default'].func.isRequired,
  useReaction: PropTypes__default['default'].bool.isRequired,
  emojiAllMap: PropTypes__default['default'].instanceOf(Map).isRequired,
  membersMap: PropTypes__default['default'].instanceOf(Map).isRequired,
  toggleReaction: PropTypes__default['default'].func.isRequired,
  memoizedEmojiListItems: PropTypes__default['default'].func.isRequired,
  chainTop: PropTypes__default['default'].bool.isRequired,
  chainBottom: PropTypes__default['default'].bool.isRequired
};
OutgoingThumbnailMessage.defaultProps = {
  status: ''
};
IncomingThumbnailMessage.propTypes = {
  message: PropTypes__default['default'].shape({
    type: PropTypes__default['default'].string,
    url: PropTypes__default['default'].string,
    localUrl: PropTypes__default['default'].string
  }).isRequired,
  userId: PropTypes__default['default'].string.isRequired,
  onClick: PropTypes__default['default'].func.isRequired,
  status: PropTypes__default['default'].string,
  useReaction: PropTypes__default['default'].bool.isRequired,
  emojiAllMap: PropTypes__default['default'].instanceOf(Map).isRequired,
  membersMap: PropTypes__default['default'].instanceOf(Map).isRequired,
  toggleReaction: PropTypes__default['default'].func.isRequired,
  memoizedEmojiListItems: PropTypes__default['default'].func.isRequired,
  chainTop: PropTypes__default['default'].bool.isRequired,
  chainBottom: PropTypes__default['default'].bool.isRequired
};
IncomingThumbnailMessage.defaultProps = {
  status: ''
};

var MAX_TRUNCATE_LENGTH = 40;
var GROUPAING_PADDING = '1px';
var NORMAL_PADDING$1 = '8px';

var noop$3 = function noop() {};

function checkFileType(fileUrl) {
  var result = null;
  var imageFile = /(\.gif|\.jpg|\.jpeg|\.txt|\.pdf)$/i;
  var audioFile = /(\.mp3)$/i;

  if (imageFile.test(fileUrl)) {
    result = index$2.IconTypes.FILE_DOCUMENT;
  } else if (audioFile.test(fileUrl)) {
    result = index$2.IconTypes.FILE_AUDIO;
  }

  return result;
}

var MessageSwitch = function MessageSwitch(_ref) {
  var message = _ref.message,
      userId = _ref.userId,
      disabled = _ref.disabled,
      isByMe = _ref.isByMe,
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
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-file-message".concat(isByMe ? '--outgoing' : '--incoming')
  }, isByMe ? /*#__PURE__*/React__default['default'].createElement(OutgoingFileMessage, {
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
  }) : /*#__PURE__*/React__default['default'].createElement(IncomingFileMessage, {
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
  message: PropTypes__default['default'].shape({}),
  userId: PropTypes__default['default'].string,
  isByMe: PropTypes__default['default'].bool,
  disabled: PropTypes__default['default'].bool,
  showRemove: PropTypes__default['default'].func,
  resendMessage: PropTypes__default['default'].func,
  status: PropTypes__default['default'].string.isRequired,
  useReaction: PropTypes__default['default'].bool.isRequired,
  emojiAllMap: PropTypes__default['default'].instanceOf(Map),
  membersMap: PropTypes__default['default'].instanceOf(Map),
  toggleReaction: PropTypes__default['default'].func,
  memoizedEmojiListItems: PropTypes__default['default'].func,
  chainTop: PropTypes__default['default'].bool,
  chainBottom: PropTypes__default['default'].bool
};
MessageSwitch.defaultProps = {
  message: {},
  isByMe: false,
  disabled: false,
  showRemove: noop$3,
  resendMessage: noop$3,
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
function OutgoingFileMessage(_ref2) {
  var message = _ref2.message,
      userId = _ref2.userId,
      status = _ref2.status,
      showRemove = _ref2.showRemove,
      disabled = _ref2.disabled,
      resendMessage = _ref2.resendMessage,
      useReaction = _ref2.useReaction,
      emojiAllMap = _ref2.emojiAllMap,
      membersMap = _ref2.membersMap,
      toggleReaction = _ref2.toggleReaction,
      memoizedEmojiListItems = _ref2.memoizedEmojiListItems,
      chainTop = _ref2.chainTop,
      chainBottom = _ref2.chainBottom;
  var url = message.url;

  var openFileUrl = function openFileUrl() {
    window.open(url);
  };

  var messageRef = React.useRef(null);
  var parentContainRef = React.useRef(null);
  var menuRef = React.useRef(null);
  var reactionAddButtonRef = React.useRef(null);

  var _useState = React.useState(false),
      _useState2 = LocalizationContext._slicedToArray(_useState, 2),
      mousehover = _useState2[0],
      setMousehover = _useState2[1];

  var _useState3 = React.useState(false),
      _useState4 = LocalizationContext._slicedToArray(_useState3, 2),
      moreActive = _useState4[0],
      setMoreActive = _useState4[1];

  var _useState5 = React.useState(false),
      _useState6 = LocalizationContext._slicedToArray(_useState5, 2),
      menuDisplaying = _useState6[0],
      setMenuDisplaying = _useState6[1];

  var MemoizedEmojiListItems = memoizedEmojiListItems;
  var isMessageSent = utils$2.getIsSentFromStatus(status);
  var showReactionAddButton = useReaction && emojiAllMap && emojiAllMap.size > 0 && utils$2.getIsSentFromSendingStatus(message);
  var showEmojiReactions = isMessageSent && useReaction && message.reactions && message.reactions.length > 0 && utils$2.getIsSentFromSendingStatus(message);

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
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-file-message__outgoing",
    ref: messageRef,
    style: {
      paddingTop: chainTop ? GROUPAING_PADDING : NORMAL_PADDING$1,
      paddingBottom: chainBottom ? GROUPAING_PADDING : NORMAL_PADDING$1
    }
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-file-message__outgoing--inner"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-file-message__outgoing__left-padding"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-file-message__outgoing__left-padding__more",
    ref: parentContainRef
  }, /*#__PURE__*/React__default['default'].createElement(index$1.ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return /*#__PURE__*/React__default['default'].createElement(index$1.IconButton, {
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
      }, /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
        type: index$2.IconTypes.MORE,
        fillColor: index$2.IconColors.CONTENT_INVERSE,
        width: "24px",
        height: "24px"
      }));
    },
    menuItems: function menuItems(close) {
      var closeDropdown = function closeDropdown() {
        close();
        setMenuDisplaying(false);
      };

      return /*#__PURE__*/React__default['default'].createElement(index$1.MenuItems
      /**
       * parentRef: For catching location(x, y) of MenuItems
       * parentContainRef: For toggling more options(menus & reactions)
       */
      , {
        parentRef: menuRef,
        parentContainRef: parentContainRef,
        closeDropdown: closeDropdown,
        openLeft: true
      }, message && message.isResendable && message.isResendable() && /*#__PURE__*/React__default['default'].createElement(index$1.MenuItem, {
        onClick: function onClick() {
          resendMessage(message);
          closeDropdown();
        }
      }, "Resend"), /*#__PURE__*/React__default['default'].createElement(index$1.MenuItem, {
        onClick: function onClick() {
          if (disabled) {
            return;
          }

          showRemove(true);
          closeDropdown();
        }
      }, "Delete"));
    }
  }), showReactionAddButton && /*#__PURE__*/React__default['default'].createElement(index$1.ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return /*#__PURE__*/React__default['default'].createElement(index$1.IconButton, {
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
      }, /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
        type: index$2.IconTypes.EMOJI_MORE,
        fillColor: index$2.IconColors.CONTENT_INVERSE,
        width: "24px",
        height: "24px"
      }));
    },
    menuItems: function menuItems(close) {
      var closeDropdown = function closeDropdown() {
        close();
        setMenuDisplaying(false);
      };

      return /*#__PURE__*/React__default['default'].createElement(MemoizedEmojiListItems, {
        message: message,
        parentRef: reactionAddButtonRef,
        parentContainRef: parentContainRef,
        closeDropdown: closeDropdown,
        spaceFromTrigger: {
          y: 2
        }
      });
    }
  })), !chainBottom && !(mousehover || moreActive || menuDisplaying) && /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-file-message__outgoing__left-padding__status"
  }, /*#__PURE__*/React__default['default'].createElement(MessageStatus, {
    message: message,
    status: status
  }))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-file-message__outgoing__tooltip"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-file-message__outgoing__tooltip__inner"
  }, checkFileType(url) ? /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-file-message__outgoing__tooltip__icon-box"
  }, /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
    className: "sendbird-file-message__outgoing__tooltip__icon-box__icon",
    type: checkFileType(url),
    fillColor: index$2.IconColors.PRIMARY,
    width: "24px",
    height: "24px"
  })) : null, /*#__PURE__*/React__default['default'].createElement(index$1.TextButton, {
    className: "sendbird-file-message__outgoing__tooltip__text",
    onClick: openFileUrl,
    color: index$2.LabelColors.ONCONTENT_1
  }, /*#__PURE__*/React__default['default'].createElement(index$2.Label, {
    type: index$2.LabelTypography.BODY_1,
    color: index$2.LabelColors.ONCONTENT_1
  }, utils$2.truncate(message.name || message.url, MAX_TRUNCATE_LENGTH)))), showEmojiReactions && /*#__PURE__*/React__default['default'].createElement(EmojiReactions, {
    className: "sendbird-file-message__outgoing__tooltip__emoji-reactions",
    userId: userId,
    message: message,
    emojiAllMap: emojiAllMap,
    membersMap: membersMap,
    toggleReaction: toggleReaction,
    memoizedEmojiListItems: memoizedEmojiListItems
  }))));
}
function IncomingFileMessage(_ref3) {
  var message = _ref3.message,
      userId = _ref3.userId,
      useReaction = _ref3.useReaction,
      emojiAllMap = _ref3.emojiAllMap,
      membersMap = _ref3.membersMap,
      toggleReaction = _ref3.toggleReaction,
      memoizedEmojiListItems = _ref3.memoizedEmojiListItems,
      chainTop = _ref3.chainTop,
      chainBottom = _ref3.chainBottom;

  var openFileUrl = function openFileUrl() {
    window.open(message.url);
  };

  var messageRef = React.useRef(null);

  var _React$useContext = React__default['default'].useContext(index$1.UserProfileContext),
      disableUserProfile = _React$useContext.disableUserProfile,
      renderUserProfile = _React$useContext.renderUserProfile;

  var parentContainRef = React.useRef(null);
  var avatarRef = React.useRef(null);
  var reactionAddButtonRef = React.useRef(null);

  var _useState7 = React.useState(false),
      _useState8 = LocalizationContext._slicedToArray(_useState7, 2),
      mousehover = _useState8[0],
      setMousehover = _useState8[1];

  var _useState9 = React.useState(false),
      _useState10 = LocalizationContext._slicedToArray(_useState9, 2),
      moreActive = _useState10[0],
      setMoreActive = _useState10[1];

  var _useState11 = React.useState(false),
      _useState12 = LocalizationContext._slicedToArray(_useState11, 2),
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
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-file-message__incoming",
    ref: messageRef,
    style: {
      paddingTop: chainTop ? GROUPAING_PADDING : NORMAL_PADDING$1,
      paddingBottom: chainBottom ? GROUPAING_PADDING : NORMAL_PADDING$1
    }
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-file-message__incoming--inner"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-file-message__incoming__body"
  }, !chainBottom && /*#__PURE__*/React__default['default'].createElement(index$1.ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return /*#__PURE__*/React__default['default'].createElement(index$2.Avatar, {
        ref: avatarRef,
        onClick: function onClick() {
          if (!disableUserProfile) {
            toggleDropdown();
          }
        },
        className: "sendbird-file-message__incoming__body__avatar",
        src: utils.getSenderProfileUrl(message),
        width: "28px",
        height: "28px"
      });
    },
    menuItems: function menuItems(closeDropdown) {
      return /*#__PURE__*/React__default['default'].createElement(index$1.MenuItems
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
      }) : /*#__PURE__*/React__default['default'].createElement(index$1.ConnectedUserProfile, {
        user: message.sender,
        onSuccess: closeDropdown
      }));
    }
  }), !chainTop && /*#__PURE__*/React__default['default'].createElement(index$2.Label, {
    className: "sendbird-file-message__incoming__body__sender-name",
    type: index$2.LabelTypography.CAPTION_2,
    color: index$2.LabelColors.ONBACKGROUND_2
  }, utils.getSenderName(message)), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-file-message__incoming__body__tooltip"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-file-message__incoming__body__tooltip__inner"
  }, checkFileType(message.url) ? /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-file-message__incoming__body__tooltip__icon-box"
  }, /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
    className: "sendbird-file-message__incoming__body__tooltip__icon-box__icon",
    type: checkFileType(message.url),
    fillColor: index$2.IconColors.PRIMARY,
    width: "24px",
    height: "24px"
  })) : null, /*#__PURE__*/React__default['default'].createElement(index$1.TextButton, {
    className: "sendbird-file-message__incoming__body__tooltip__text",
    onClick: openFileUrl
  }, /*#__PURE__*/React__default['default'].createElement(index$2.Label, {
    type: index$2.LabelTypography.BODY_1,
    color: index$2.LabelColors.ONBACKGROUND_1
  }, utils$2.truncate(message.name || message.url, MAX_TRUNCATE_LENGTH)))), useReaction && message.reactions && message.reactions.length > 0 && /*#__PURE__*/React__default['default'].createElement(EmojiReactions, {
    className: "sendbird-file-message__incoming__body__tooltip__emoji-reactions",
    userId: userId,
    message: message,
    emojiAllMap: emojiAllMap,
    membersMap: membersMap,
    toggleReaction: toggleReaction,
    memoizedEmojiListItems: memoizedEmojiListItems
  }))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-file-message__incoming__right-padding"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-file-message__incoming__right-padding__more",
    ref: parentContainRef,
    style: {
      top: chainTop ? 6 : 18
    }
  }, showReactionAddButton && /*#__PURE__*/React__default['default'].createElement(index$1.ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return /*#__PURE__*/React__default['default'].createElement(index$1.IconButton, {
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
      }, /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
        width: "24px",
        height: "24px",
        type: index$2.IconTypes.EMOJI_MORE,
        fillColor: index$2.IconColors.CONTENT_INVERSE
      }));
    },
    menuItems: function menuItems(close) {
      var closeDropdown = function closeDropdown() {
        close();
        setMenuDisplaying(false);
      };

      return /*#__PURE__*/React__default['default'].createElement(MemoizedEmojiListItems, {
        message: message,
        parentRef: reactionAddButtonRef,
        parentContainRef: parentContainRef,
        closeDropdown: closeDropdown,
        spaceFromTrigger: {
          y: 2
        }
      });
    }
  })), !chainBottom && !(mousehover || moreActive || menuDisplaying) && /*#__PURE__*/React__default['default'].createElement(index$2.Label, {
    className: "sendbird-file-message__incoming__right-padding__sent-at",
    type: index$2.LabelTypography.CAPTION_3,
    color: index$2.LabelColors.ONBACKGROUND_2
  }, utils.getMessageCreatedAt(message)))));
}
OutgoingFileMessage.propTypes = {
  message: PropTypes__default['default'].objectOf(PropTypes__default['default'].oneOfType([PropTypes__default['default'].string, PropTypes__default['default'].number, PropTypes__default['default'].bool, PropTypes__default['default'].array, PropTypes__default['default'].object])),
  userId: PropTypes__default['default'].string,
  status: PropTypes__default['default'].string,
  showRemove: PropTypes__default['default'].func,
  resendMessage: PropTypes__default['default'].func,
  useReaction: PropTypes__default['default'].bool.isRequired,
  disabled: PropTypes__default['default'].bool,
  emojiAllMap: PropTypes__default['default'].instanceOf(Map),
  membersMap: PropTypes__default['default'].instanceOf(Map),
  toggleReaction: PropTypes__default['default'].func,
  memoizedEmojiListItems: PropTypes__default['default'].func,
  chainTop: PropTypes__default['default'].bool.isRequired,
  chainBottom: PropTypes__default['default'].bool.isRequired
};
OutgoingFileMessage.defaultProps = {
  status: '',
  showRemove: noop$3,
  resendMessage: noop$3,
  message: {},
  userId: '',
  disabled: false,
  emojiAllMap: new Map(),
  membersMap: new Map(),
  toggleReaction: noop$3,
  memoizedEmojiListItems: function memoizedEmojiListItems() {
    return '';
  }
};
IncomingFileMessage.propTypes = {
  message: PropTypes__default['default'].objectOf(PropTypes__default['default'].oneOfType([PropTypes__default['default'].string, PropTypes__default['default'].number, PropTypes__default['default'].bool, PropTypes__default['default'].array, PropTypes__default['default'].object])),
  userId: PropTypes__default['default'].string,
  useReaction: PropTypes__default['default'].bool.isRequired,
  emojiAllMap: PropTypes__default['default'].instanceOf(Map),
  membersMap: PropTypes__default['default'].instanceOf(Map),
  toggleReaction: PropTypes__default['default'].func,
  memoizedEmojiListItems: PropTypes__default['default'].func,
  chainTop: PropTypes__default['default'].bool.isRequired,
  chainBottom: PropTypes__default['default'].bool.isRequired
};
IncomingFileMessage.defaultProps = {
  message: {},
  userId: '',
  emojiAllMap: new Map(),
  membersMap: new Map(),
  toggleReaction: noop$3,
  memoizedEmojiListItems: function memoizedEmojiListItems() {
    return '';
  }
};

var RemoveMessage = function RemoveMessage(props) {
  var onCloseModal = props.onCloseModal,
      onDeleteMessage = props.onDeleteMessage;

  var _useContext = React.useContext(LocalizationContext.LocalizationContext),
      stringSet = _useContext.stringSet;

  return /*#__PURE__*/React__default['default'].createElement(index$1.Modal, {
    onCancel: onCloseModal,
    onSubmit: onDeleteMessage,
    submitText: "Delete",
    titleText: stringSet.MODAL__DELETE_MESSAGE__TITLE
  });
};

RemoveMessage.propTypes = {
  onCloseModal: PropTypes__default['default'].func.isRequired,
  onDeleteMessage: PropTypes__default['default'].func.isRequired
};

var getMessageCreatedAt$1 = function getMessageCreatedAt(message) {
  return index$2.format(message.createdAt, 'p');
};

var GROUPING_PADDING$1 = '1px';
var NORMAL_PADDING = '8px';
function UnknownMessage(_ref) {
  var message = _ref.message,
      isByMe = _ref.isByMe,
      status = _ref.status,
      className = _ref.className,
      showRemove = _ref.showRemove,
      chainTop = _ref.chainTop,
      chainBottom = _ref.chainBottom;
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: [].concat(LocalizationContext._toConsumableArray(Array.isArray(className) ? className : [className]), ['sendbird-unknown-message', "sendbird-unknown-message".concat(isByMe ? '--outgoing' : '--incoming')]).join(' ')
  }, isByMe ? /*#__PURE__*/React__default['default'].createElement(OutgoingUnknownMessage, {
    status: status,
    message: message,
    chainTop: chainTop,
    showRemove: showRemove,
    chainBottom: chainBottom
  }) : /*#__PURE__*/React__default['default'].createElement(IncomingUnknownMessage, {
    message: message,
    chainTop: chainTop,
    chainBottom: chainBottom
  }));
}
UnknownMessage.propTypes = {
  message: PropTypes__default['default'].shape({}).isRequired,
  isByMe: PropTypes__default['default'].bool,
  status: PropTypes__default['default'].string,
  className: PropTypes__default['default'].oneOfType([PropTypes__default['default'].string, PropTypes__default['default'].arrayOf(PropTypes__default['default'].string)]),
  showRemove: PropTypes__default['default'].func,
  chainTop: PropTypes__default['default'].bool,
  chainBottom: PropTypes__default['default'].bool
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
  var messageRef = React.useRef(null);
  var parentContainRef = React.useRef(null);
  var menuRef = React.useRef(null);

  var _useState = React.useState(false),
      _useState2 = LocalizationContext._slicedToArray(_useState, 2),
      mousehover = _useState2[0],
      setMousehover = _useState2[1];

  var _useState3 = React.useState(false),
      _useState4 = LocalizationContext._slicedToArray(_useState3, 2),
      moreActive = _useState4[0],
      setMoreActive = _useState4[1];

  var _useState5 = React.useState(false),
      _useState6 = LocalizationContext._slicedToArray(_useState5, 2),
      menuDisplaying = _useState6[0],
      setMenuDisplaying = _useState6[1];

  var _useContext = React.useContext(LocalizationContext.LocalizationContext),
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
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-outgoing-unknown-message",
    ref: messageRef,
    style: {
      paddingTop: chainTop ? GROUPING_PADDING$1 : NORMAL_PADDING,
      paddingBottom: chainBottom ? GROUPING_PADDING$1 : NORMAL_PADDING
    }
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-outgoing-unknown-message--inner"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-outgoing-unknown-message--left-padding"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-outgoing-unknown-message__more",
    ref: parentContainRef
  }, /*#__PURE__*/React__default['default'].createElement(index$1.ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return /*#__PURE__*/React__default['default'].createElement(index$1.IconButton, {
        className: "sendbird-outgoing-unknown-message__more__menu",
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
      }, /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
        type: index$2.IconTypes.MORE,
        fillColor: index$2.IconColors.CONTENT_INVERSE,
        width: "24px",
        height: "24px"
      }));
    },
    menuItems: function menuItems(close) {
      var closeDropdown = function closeDropdown() {
        close();
        setMenuDisplaying(false);
      };

      return /*#__PURE__*/React__default['default'].createElement(index$1.MenuItems
      /**
       * parentRef: For catching location(x, y) of MenuItems
       * parentContainRef: For toggling more options(menus & reactions)
       */
      , {
        parentRef: menuRef,
        parentContainRef: parentContainRef,
        closeDropdown: closeDropdown,
        openLeft: true
      }, /*#__PURE__*/React__default['default'].createElement(index$1.MenuItem, {
        onClick: function onClick() {
          showRemove(true);
          closeDropdown();
        }
      }, "Delete"));
    }
  })), !chainBottom && !(mousehover || moreActive || menuDisplaying) && /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-outgoing-unknown-message__message-status"
  }, /*#__PURE__*/React__default['default'].createElement(MessageStatus, {
    message: message,
    status: status
  }))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-outgoing-unknown-message__body"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-outgoing-unknown-message__body__text-balloon"
  }, /*#__PURE__*/React__default['default'].createElement(index$2.Label, {
    className: "sendbird-outgoing-unknown-message__body__text-balloon__header",
    type: index$2.LabelTypography.BODY_1,
    color: index$2.LabelColors.ONBACKGROUND_1
  }, stringSet.UNKNOWN__UNKNOWN_MESSAGE_TYPE), /*#__PURE__*/React__default['default'].createElement(index$2.Label, {
    className: "sendbird-outgoing-unknown-message__body__text-balloon__description",
    type: index$2.LabelTypography.BODY_1,
    color: index$2.LabelColors.ONBACKGROUND_2
  }, stringSet.UNKNOWN__CANNOT_READ_MESSAGE)))));
}

function IncomingUnknownMessage(_ref3) {
  var message = _ref3.message,
      chainTop = _ref3.chainTop,
      chainBottom = _ref3.chainBottom;
  var sender = message.sender;
  var avatarRef = React.useRef(null);

  var _useContext2 = React.useContext(LocalizationContext.LocalizationContext),
      stringSet = _useContext2.stringSet;

  var _React$useContext = React__default['default'].useContext(index$1.UserProfileContext),
      disableUserProfile = _React$useContext.disableUserProfile,
      renderUserProfile = _React$useContext.renderUserProfile;

  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-incoming-unknown-message",
    style: {
      paddingTop: chainTop ? GROUPING_PADDING$1 : NORMAL_PADDING,
      paddingBottom: chainBottom ? GROUPING_PADDING$1 : NORMAL_PADDING
    }
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-incoming-unknown-message--inner"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-incoming-unknown-message__left"
  }, !chainBottom && /*#__PURE__*/React__default['default'].createElement(index$1.ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return /*#__PURE__*/React__default['default'].createElement(index$2.Avatar, {
        className: "sendbird-incoming-unknown-message__left__sender-profile-image",
        ref: avatarRef,
        src: sender.profileUrl,
        alt: "sender-profile-image",
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
      return /*#__PURE__*/React__default['default'].createElement(index$1.MenuItems
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
      }) : /*#__PURE__*/React__default['default'].createElement(index$1.ConnectedUserProfile, {
        user: message.sender,
        onSuccess: closeDropdown
      }));
    }
  })), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-incoming-unknown-message__body"
  }, !chainTop && /*#__PURE__*/React__default['default'].createElement(index$2.Label, {
    className: "sendbird-incoming-unknown-message__body__sender-name",
    type: index$2.LabelTypography.CAPTION_2,
    color: index$2.LabelColors.ONBACKGROUND_2
  }, sender.nickname || stringSet.NO_NAME), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-incoming-unknown-message__body__text-balloon"
  }, /*#__PURE__*/React__default['default'].createElement(index$2.Label, {
    className: "sendbird-incoming-unknown-message__body__text-balloon__header",
    type: index$2.LabelTypography.BODY_1,
    color: index$2.LabelColors.ONBACKGROUND_1
  }, stringSet.UNKNOWN__UNKNOWN_MESSAGE_TYPE), /*#__PURE__*/React__default['default'].createElement(index$2.Label, {
    className: "sendbird-incoming-unknown-message__body__text-balloon__description",
    type: index$2.LabelTypography.BODY_1,
    color: index$2.LabelColors.ONBACKGROUND_2
  }, stringSet.UNKNOWN__CANNOT_READ_MESSAGE))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-incoming-unknown-message--right-padding"
  }, !chainBottom && /*#__PURE__*/React__default['default'].createElement(index$2.Label, {
    className: "sendbird-incoming-unknown-message__sent-at",
    type: index$2.LabelTypography.CAPTION_3,
    color: index$2.LabelColors.ONBACKGROUND_2
  }, getMessageCreatedAt$1(message)))));
}

OutgoingUnknownMessage.propTypes = {
  message: PropTypes__default['default'].shape({}).isRequired,
  status: PropTypes__default['default'].string.isRequired,
  showRemove: PropTypes__default['default'].func,
  chainTop: PropTypes__default['default'].bool.isRequired,
  chainBottom: PropTypes__default['default'].bool.isRequired
};
OutgoingUnknownMessage.defaultProps = {
  showRemove: function showRemove() {}
};
IncomingUnknownMessage.propTypes = {
  message: PropTypes__default['default'].shape({
    sender: PropTypes__default['default'].shape({
      nickname: PropTypes__default['default'].string,
      profileUrl: PropTypes__default['default'].string
    })
  }).isRequired,
  chainTop: PropTypes__default['default'].bool.isRequired,
  chainBottom: PropTypes__default['default'].bool.isRequired
};

var createUrlTester = function createUrlTester(regexp) {
  return function (text) {
    return regexp.test(text);
  };
};
var getIsSentFromStatus = function getIsSentFromStatus(status) {
  return status === type.MessageStatusType.SENT || status === type.MessageStatusType.DELIVERED || status === type.MessageStatusType.READ;
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
var getMessageCreatedAt = function getMessageCreatedAt(message) {
  return index$2.format(message.createdAt, 'p');
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
var getIsSentFromSendingStatus = function getIsSentFromSendingStatus() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (message.sendingStatus && typeof message.sendingStatus === 'string') {
    return message.sendingStatus === 'none' || message.sendingStatus === 'succeeded';
  }

  return false;
};

var URL_REG = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

var isUrl = createUrlTester(URL_REG);
function useMemoizedMessageText(_ref) {
  var message = _ref.message,
      updatedAt = _ref.updatedAt,
      className = _ref.className,
      _ref$incoming = _ref.incoming,
      incoming = _ref$incoming === void 0 ? false : _ref$incoming;

  var _useContext = React.useContext(LocalizationContext.LocalizationContext),
      stringSet = _useContext.stringSet;

  var WORD_TYPOGRAPHY = index$2.LabelTypography.BODY_1;
  var WORD_COLOR = incoming ? index$2.LabelColors.ONBACKGROUND_1 : index$2.LabelColors.ONCONTENT_1;
  var EDITED_COLOR = incoming ? index$2.LabelColors.ONBACKGROUND_2 : index$2.LabelColors.ONCONTENT_2;
  return React.useMemo(function () {
    return function () {
      var splitMessage = message.split(' ');
      var matchedMessage = splitMessage.map(function (word) {
        return isUrl(word) ? /*#__PURE__*/React__default['default'].createElement(index.LinkLabel, {
          key: LocalizationContext.uuidv4(),
          className: className,
          src: word,
          type: WORD_TYPOGRAPHY,
          color: WORD_COLOR
        }, word) : /*#__PURE__*/React__default['default'].createElement(index$2.Label, {
          key: LocalizationContext.uuidv4(),
          className: className,
          type: WORD_TYPOGRAPHY,
          color: WORD_COLOR
        }, word);
      });

      if (updatedAt > 0) {
        matchedMessage.push( /*#__PURE__*/React__default['default'].createElement(index$2.Label, {
          key: LocalizationContext.uuidv4(),
          className: className,
          type: WORD_TYPOGRAPHY,
          color: EDITED_COLOR
        }, stringSet.MESSAGE_EDITED));
      }

      return matchedMessage;
    };
  }, [message, updatedAt, className]);
}

var GROUPING_PADDING = '1px';
var NORAML_PADDING = '8px';

var OGMessageSwitch = function OGMessageSwitch(_ref) {
  var className = _ref.className,
      isByMe = _ref.isByMe,
      userId = _ref.userId,
      status = _ref.status,
      message = _ref.message,
      disabled = _ref.disabled,
      showEdit = _ref.showEdit,
      chainTop = _ref.chainTop,
      membersMap = _ref.membersMap,
      showRemove = _ref.showRemove,
      useReaction = _ref.useReaction,
      emojiAllMap = _ref.emojiAllMap,
      chainBottom = _ref.chainBottom,
      resendMessage = _ref.resendMessage,
      toggleReaction = _ref.toggleReaction,
      memoizedEmojiListItems = _ref.memoizedEmojiListItems;
  var ogMetaData = message.ogMetaData;

  var openLink = function openLink() {
    if (checkOGIsEnalbed(message)) {
      var url = ogMetaData.url;
      window.open(url);
    }
  };

  var outoingMemoizedMessageText = useMemoizedMessageText({
    message: message.message,
    updatedAt: message.updatedAt,
    className: 'sendbird-og-message-word'
  });
  var incomingMemoizedMessageText = useMemoizedMessageText({
    message: message.message,
    updatedAt: message.updatedAt,
    className: 'sendbird-og-message-word',
    incoming: true
  });
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: [].concat(LocalizationContext._toConsumableArray(Array.isArray(className) ? className : [className]), ['sendbird-og-message', "sendbird-og-message".concat(isByMe ? '--outgoing' : '--incoming')]).join(' ')
  }, isByMe ? /*#__PURE__*/React__default['default'].createElement(OutgoingOGMessage, {
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
  }) : /*#__PURE__*/React__default['default'].createElement(IncomingOGMessage, {
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
  var MemoizedMessageText = memoizedMessageText;
  var MemoizedEmojiListItems = memoizedEmojiListItems;

  var _useContext = React.useContext(LocalizationContext.LocalizationContext),
      stringSet = _useContext.stringSet;

  var isMessageSent = getIsSentFromStatus(status);
  var showEmojiReactions = useReaction && message.reactions && message.reactions.length > 0 && getIsSentFromSendingStatus(message);
  var messageRef = React.useRef(null);
  var parentContainRef = React.useRef(null);
  var parentRefMenus = React.useRef(null);
  var parentRefReactions = React.useRef(null);

  var _useState = React.useState(false),
      _useState2 = LocalizationContext._slicedToArray(_useState, 2),
      mousehover = _useState2[0],
      setMousehover = _useState2[1];

  var _useState3 = React.useState(false),
      _useState4 = LocalizationContext._slicedToArray(_useState3, 2),
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
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-outgoing-og-message",
    ref: messageRef,
    style: {
      paddingTop: chainTop ? GROUPING_PADDING : NORAML_PADDING,
      paddingBottom: chainBottom ? GROUPING_PADDING : NORAML_PADDING
    }
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-outgoing-og-message--inner"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-outgoing-og-message--left-padding"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-outgoing-og-message__more",
    ref: parentContainRef
  }, /*#__PURE__*/React__default['default'].createElement(index$1.ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return /*#__PURE__*/React__default['default'].createElement(index$1.IconButton, {
        className: "sendbird-outgoing-og-message__more__menu",
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
      }, /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
        type: index$2.IconTypes.MORE,
        fillColor: index$2.IconColors.CONTENT_INVERSE,
        width: "24px",
        height: "24px"
      }));
    },
    menuItems: function menuItems(closeDropdown) {
      return /*#__PURE__*/React__default['default'].createElement(index$1.MenuItems, {
        parentRef: parentRefMenus // for catching location(x, y) of MenuItems
        ,
        parentContainRef: parentContainRef // for toggling more options(menus & reactions)
        ,
        closeDropdown: closeDropdown,
        openLeft: true
      }, isMessageSent && /*#__PURE__*/React__default['default'].createElement(index$1.MenuItem, {
        className: "sendbird-outgoing-og-message__more__menu__copy",
        onClick: function onClick() {
          copyToClipboard(message.message);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__COPY), isMessageSent && /*#__PURE__*/React__default['default'].createElement(index$1.MenuItem, {
        onClick: function onClick() {
          if (disabled) {
            return;
          }

          showEdit(true);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__EDIT), message && message.isResendable && message.isResendable() && /*#__PURE__*/React__default['default'].createElement(index$1.MenuItem, {
        onClick: function onClick() {
          resendMessage(message);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__RESEND), /*#__PURE__*/React__default['default'].createElement(index$1.MenuItem, {
        onClick: function onClick() {
          if (disabled) {
            return;
          }

          showRemove(true);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__DELETE));
    }
  }), isMessageSent && useReaction && emojiAllMap.size > 0 && /*#__PURE__*/React__default['default'].createElement(index$1.ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return /*#__PURE__*/React__default['default'].createElement(index$1.IconButton, {
        className: "sendbird-outgoing-og-message__more__add-reaction",
        ref: parentRefReactions,
        width: "32px",
        height: "32px",
        onClick: toggleDropdown
      }, /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
        type: index$2.IconTypes.EMOJI_MORE,
        fillColor: index$2.IconColors.CONTENT_INVERSE,
        width: "24px",
        height: "24px"
      }));
    },
    menuItems: function menuItems(closeDropdown) {
      return /*#__PURE__*/React__default['default'].createElement(MemoizedEmojiListItems, {
        message: message,
        parentRef: parentRefReactions,
        parentContainRef: parentContainRef,
        closeDropdown: closeDropdown,
        spaceFromTrigger: {
          y: 2
        }
      });
    }
  })), !chainBottom && !(mousehover || moreActive) && /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-outgoing-og-message__message-status"
  }, /*#__PURE__*/React__default['default'].createElement(MessageStatus, {
    message: message,
    status: status
  }))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-outgoing-og-message--body"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-outgoing-og-message__text-balloon"
  }, /*#__PURE__*/React__default['default'].createElement(MemoizedMessageText, null)), /*#__PURE__*/React__default['default'].createElement("div", {
    className: ['sendbird-outgoing-og-message__thumbnail', checkOGIsEnalbed(message) ? '' : 'sendbird-outgoing-og-message__thumbnail--disabled'].join(' '),
    role: "button",
    onClick: openLink,
    onKeyDown: openLink,
    tabIndex: 0
  }, defaultImage && /*#__PURE__*/React__default['default'].createElement(index$2.ImageRenderer, {
    className: "sendbird-outgoing-og-message__thumbnail__image",
    url: defaultImage.url || '',
    alt: defaultImage.alt,
    width: "320px",
    height: "180px",
    defaultComponent: /*#__PURE__*/React__default['default'].createElement("div", {
      className: "sendbird-outgoing-og-message__thumbnail__image__placeholder"
    }, /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
      type: index$2.IconTypes.THUMBNAIL_NONE,
      width: "56px",
      height: "56px"
    }))
  })), /*#__PURE__*/React__default['default'].createElement("div", {
    className: ['sendbird-outgoing-og-message__og-tag', checkOGIsEnalbed(message) ? '' : 'sendbird-outgoing-og-message__og-tag--disabled'].join(' '),
    role: "button",
    onClick: openLink,
    onKeyDown: openLink,
    tabIndex: 0
  }, ogMetaData.title && /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-outgoing-og-message__og-tag__title"
  }, /*#__PURE__*/React__default['default'].createElement(index$2.Label, {
    type: index$2.LabelTypography.SUBTITLE_2,
    color: index$2.LabelColors.ONBACKGROUND_1
  }, ogMetaData.title)), ogMetaData.description && /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-outgoing-og-message__og-tag__description"
  }, /*#__PURE__*/React__default['default'].createElement(index$2.Label, {
    className: "sendbird-outgoing-og-message__og-tag__description__label",
    type: index$2.LabelTypography.BODY_2,
    color: index$2.LabelColors.ONBACKGROUND_1
  }, ogMetaData.description)), ogMetaData.url && /*#__PURE__*/React__default['default'].createElement(index$2.Label, {
    className: "sendbird-outgoing-og-message__og-tag__url",
    type: index$2.LabelTypography.CAPTION_3,
    color: index$2.LabelColors.ONBACKGROUND_2
  }, ogMetaData.url), showEmojiReactions && /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-outgoing-og-message__og-tag__emoji-reactions--wrapper",
    role: "button",
    onClick: function onClick(event) {
      return event.stopPropagation();
    },
    onKeyDown: function onKeyDown(event) {
      return event.stopPropagation();
    },
    tabIndex: 0
  }, /*#__PURE__*/React__default['default'].createElement(EmojiReactions, {
    className: "sendbird-outgoing-og-message__og-tag__emoji-reactions",
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

  var _useContext2 = React.useContext(LocalizationContext.LocalizationContext),
      stringSet = _useContext2.stringSet;

  var MemoizedMessageText = memoizedMessageText;
  var MemoizedEmojiListItems = memoizedEmojiListItems;
  var showEmojiReactions = useReaction && message.reactions && message.reactions.length > 0;
  var showReactionAddButton = useReaction && emojiAllMap && emojiAllMap.size > 0;
  var messageRef = React.useRef(null);
  var avatarRef = React.useRef(null);
  var parentRefReactions = React.useRef(null);
  var parentRefMenus = React.useRef(null);
  var parentContainRef = React.useRef(null);

  var _React$useContext = React__default['default'].useContext(index$1.UserProfileContext),
      disableUserProfile = _React$useContext.disableUserProfile,
      renderUserProfile = _React$useContext.renderUserProfile;

  var _useState5 = React.useState(false),
      _useState6 = LocalizationContext._slicedToArray(_useState5, 2),
      mousehover = _useState6[0],
      setMousehover = _useState6[1];

  var _useState7 = React.useState(false),
      _useState8 = LocalizationContext._slicedToArray(_useState7, 2),
      moreActive = _useState8[0],
      setMoreActive = _useState8[1];

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
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-incoming-og-message",
    ref: messageRef,
    style: {
      paddingTop: chainTop ? GROUPING_PADDING : NORAML_PADDING,
      paddingBottom: chainBottom ? GROUPING_PADDING : NORAML_PADDING
    }
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-incoming-og-message--inner"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-incoming-og-message--body"
  }, !chainBottom && /*#__PURE__*/React__default['default'].createElement(index$1.ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return /*#__PURE__*/React__default['default'].createElement(index$2.Avatar, {
        ref: avatarRef,
        onClick: function onClick() {
          if (!disableUserProfile) {
            toggleDropdown();
          }
        },
        className: "sendbird-incoming-og-message__avatar",
        src: getSenderProfileUrl(message),
        alt: "sender-profile-image",
        width: "28px",
        height: "28px"
      });
    },
    menuItems: function menuItems(closeDropdown) {
      return /*#__PURE__*/React__default['default'].createElement(index$1.MenuItems, {
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
      }) : /*#__PURE__*/React__default['default'].createElement(index$1.ConnectedUserProfile, {
        user: message.sender,
        onSuccess: closeDropdown
      }));
    }
  }), !chainTop && /*#__PURE__*/React__default['default'].createElement(index$2.Label, {
    className: "sendbird-incoming-og-message__sender-name",
    type: index$2.LabelTypography.CAPTION_2,
    color: index$2.LabelColors.ONBACKGROUND_2
  }, getSenderName(message)), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-incoming-og-message__text-balloon"
  }, /*#__PURE__*/React__default['default'].createElement(MemoizedMessageText, null)), /*#__PURE__*/React__default['default'].createElement("div", {
    className: ['sendbird-incoming-og-message__thumbnail', checkOGIsEnalbed(message) ? '' : 'sendbird-incoming-og-message__thumbnail--disabled'].join(' '),
    role: "button",
    onClick: openLink,
    onKeyDown: openLink,
    tabIndex: 0
  }, defaultImage && /*#__PURE__*/React__default['default'].createElement(index$2.ImageRenderer, {
    url: defaultImage.url || '',
    alt: defaultImage.alt || '',
    className: "sendbird-incoming-og-message__thumbnail__image",
    width: "320px",
    height: "180px",
    defaultComponent: /*#__PURE__*/React__default['default'].createElement("div", {
      className: "sendbird-incoming-og-message__thumbnail__image__placeholder"
    }, /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
      type: index$2.IconTypes.THUMBNAIL_NONE,
      width: "56px",
      height: "56px"
    }))
  })), /*#__PURE__*/React__default['default'].createElement("div", {
    className: ['sendbird-incoming-og-message__og-tag', checkOGIsEnalbed(message) ? '' : 'sendbird-incoming-og-message__og-tag--disabled'].join(' '),
    role: "button",
    onClick: openLink,
    onKeyDown: openLink,
    tabIndex: 0
  }, ogMetaData.title && /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-incoming-og-message__og-tag__title"
  }, /*#__PURE__*/React__default['default'].createElement(index$2.Label, {
    type: index$2.LabelTypography.SUBTITLE_2,
    color: index$2.LabelColors.ONBACKGROUND_1
  }, ogMetaData.title)), ogMetaData.description && /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-incoming-og-message__og-tag__description"
  }, /*#__PURE__*/React__default['default'].createElement(index$2.Label, {
    className: "sendbird-incoming-og-message__og-tag__description__label",
    type: index$2.LabelTypography.BODY_2,
    color: index$2.LabelColors.ONBACKGROUND_1
  }, ogMetaData.description)), ogMetaData.url && /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-incoming-og-message__og-tag__url"
  }, /*#__PURE__*/React__default['default'].createElement(index$2.Label, {
    className: "sendbird-incoming-og-message__og-tag__url__label",
    type: index$2.LabelTypography.CAPTION_3,
    color: index$2.LabelColors.ONBACKGROUND_2
  }, ogMetaData.url)), showEmojiReactions && /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-incoming-og-message__og-tag__emoji-reactions--wrapper",
    role: "button",
    onClick: function onClick(event) {
      return event.stopPropagation();
    },
    onKeyDown: function onKeyDown(event) {
      return event.stopPropagation();
    },
    tabIndex: 0
  }, /*#__PURE__*/React__default['default'].createElement(EmojiReactions, {
    className: "sendbird-incoming-og-message__og-tag__emoji-reactions",
    userId: userId,
    message: message,
    membersMap: membersMap,
    emojiAllMap: emojiAllMap,
    toggleReaction: toggleReaction,
    memoizedEmojiListItems: memoizedEmojiListItems
  })))), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-incoming-og-message--right-padding"
  }, !chainBottom && !(mousehover || moreActive) && /*#__PURE__*/React__default['default'].createElement(index$2.Label, {
    className: "sendbird-incoming-og-message__sent-at",
    type: index$2.LabelTypography.CAPTION_3,
    color: index$2.LabelColors.ONBACKGROUND_2
  }, getMessageCreatedAt(message)), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-incoming-og-message__more",
    ref: parentContainRef
  }, showReactionAddButton && /*#__PURE__*/React__default['default'].createElement(index$1.ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return /*#__PURE__*/React__default['default'].createElement(index$1.IconButton, {
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
      }, /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
        type: index$2.IconTypes.EMOJI_MORE,
        fillColor: index$2.IconColors.CONTENT_INVERSE,
        width: "24px",
        height: "24px"
      }));
    },
    menuItems: function menuItems(closeDropdown) {
      return /*#__PURE__*/React__default['default'].createElement(MemoizedEmojiListItems, {
        parentRef: parentRefReactions,
        parentContainRef: parentContainRef,
        closeDropdown: closeDropdown,
        message: message,
        spaceFromTrigger: {
          y: 2
        }
      });
    }
  }), /*#__PURE__*/React__default['default'].createElement(index$1.ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return /*#__PURE__*/React__default['default'].createElement(index$1.IconButton, {
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
      }, /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
        type: index$2.IconTypes.MORE,
        fillColor: index$2.IconColors.CONTENT_INVERSE,
        width: "24px",
        height: "24px"
      }));
    },
    menuItems: function menuItems(closeDropdown) {
      return /*#__PURE__*/React__default['default'].createElement(index$1.MenuItems, {
        parentRef: parentRefMenus,
        parentContainRef: parentContainRef,
        closeDropdown: closeDropdown
      }, /*#__PURE__*/React__default['default'].createElement(index$1.MenuItem, {
        className: "sendbird-incoming-og-message__more__menu__copy",
        onClick: function onClick() {
          copyToClipboard(message.message);
          closeDropdown();
        }
      }, stringSet.CONTEXT_MENU_DROPDOWN__COPY));
    }
  })))));
}

var noop$2 = function noop() {};

OGMessageSwitch.propTypes = {
  isByMe: PropTypes__default['default'].bool.isRequired,
  userId: PropTypes__default['default'].string.isRequired,
  message: PropTypes__default['default'].shape({
    message: PropTypes__default['default'].string,
    sender: PropTypes__default['default'].shape({}),
    ogMetaData: PropTypes__default['default'].shape({
      title: PropTypes__default['default'].string,
      description: PropTypes__default['default'].string,
      url: PropTypes__default['default'].string,
      defaultImage: PropTypes__default['default'].shape({
        url: PropTypes__default['default'].string,
        alt: PropTypes__default['default'].string
      })
    }),
    reactions: PropTypes__default['default'].array,
    updatedAt: PropTypes__default['default'].number
  }).isRequired,
  useReaction: PropTypes__default['default'].bool.isRequired,
  className: PropTypes__default['default'].oneOfType([PropTypes__default['default'].string, PropTypes__default['default'].arrayOf(PropTypes__default['default'].string)]),
  status: PropTypes__default['default'].string,
  disabled: PropTypes__default['default'].bool,
  showEdit: PropTypes__default['default'].func,
  showRemove: PropTypes__default['default'].func,
  resendMessage: PropTypes__default['default'].func,
  toggleReaction: PropTypes__default['default'].func,
  membersMap: PropTypes__default['default'].instanceOf(Map),
  emojiAllMap: PropTypes__default['default'].instanceOf(Map),
  memoizedEmojiListItems: PropTypes__default['default'].func,
  chainTop: PropTypes__default['default'].bool,
  chainBottom: PropTypes__default['default'].bool
};
OGMessageSwitch.defaultProps = {
  className: '',
  status: '',
  disabled: false,
  showEdit: noop$2,
  showRemove: noop$2,
  resendMessage: noop$2,
  toggleReaction: noop$2,
  membersMap: new Map(),
  emojiAllMap: new Map(),
  memoizedEmojiListItems: noop$2,
  chainTop: false,
  chainBottom: false
};
OutgoingOGMessage.propTypes = {
  status: PropTypes__default['default'].string,
  userId: PropTypes__default['default'].string.isRequired,
  message: PropTypes__default['default'].shape({
    message: PropTypes__default['default'].string,
    ogMetaData: PropTypes__default['default'].shape({
      title: PropTypes__default['default'].string,
      description: PropTypes__default['default'].string,
      url: PropTypes__default['default'].string,
      defaultImage: PropTypes__default['default'].shape({
        url: PropTypes__default['default'].string,
        alt: PropTypes__default['default'].string
      })
    }),
    reactions: PropTypes__default['default'].array,
    updatedAt: PropTypes__default['default'].number,
    isResendable: PropTypes__default['default'].func,
    errorCode: PropTypes__default['default'].number
  }).isRequired,
  disabled: PropTypes__default['default'].bool.isRequired,
  openLink: PropTypes__default['default'].func.isRequired,
  showEdit: PropTypes__default['default'].func.isRequired,
  showRemove: PropTypes__default['default'].func.isRequired,
  membersMap: PropTypes__default['default'].instanceOf(Map).isRequired,
  emojiAllMap: PropTypes__default['default'].instanceOf(Map).isRequired,
  useReaction: PropTypes__default['default'].bool.isRequired,
  resendMessage: PropTypes__default['default'].func.isRequired,
  toggleReaction: PropTypes__default['default'].func.isRequired,
  memoizedMessageText: PropTypes__default['default'].func.isRequired,
  memoizedEmojiListItems: PropTypes__default['default'].func.isRequired,
  chainTop: PropTypes__default['default'].bool.isRequired,
  chainBottom: PropTypes__default['default'].bool.isRequired
};
OutgoingOGMessage.defaultProps = {
  status: ''
};
IncomingOGMessage.propTypes = {
  userId: PropTypes__default['default'].string.isRequired,
  message: PropTypes__default['default'].shape({
    message: PropTypes__default['default'].string,
    sender: PropTypes__default['default'].shape({}),
    ogMetaData: PropTypes__default['default'].shape({
      title: PropTypes__default['default'].string,
      description: PropTypes__default['default'].string,
      url: PropTypes__default['default'].string,
      defaultImage: PropTypes__default['default'].shape({
        url: PropTypes__default['default'].string,
        alt: PropTypes__default['default'].string
      })
    }),
    reactions: PropTypes__default['default'].array,
    updatedAt: PropTypes__default['default'].number
  }).isRequired,
  openLink: PropTypes__default['default'].func.isRequired,
  membersMap: PropTypes__default['default'].instanceOf(Map).isRequired,
  emojiAllMap: PropTypes__default['default'].instanceOf(Map).isRequired,
  useReaction: PropTypes__default['default'].bool.isRequired,
  toggleReaction: PropTypes__default['default'].func.isRequired,
  memoizedMessageText: PropTypes__default['default'].func.isRequired,
  memoizedEmojiListItems: PropTypes__default['default'].func.isRequired,
  chainTop: PropTypes__default['default'].bool.isRequired,
  chainBottom: PropTypes__default['default'].bool.isRequired
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

  var _useState = React.useState(false),
      _useState2 = LocalizationContext._slicedToArray(_useState, 2),
      showEdit = _useState2[0],
      setShowEdit = _useState2[1];

  var _useState3 = React.useState(false),
      _useState4 = LocalizationContext._slicedToArray(_useState3, 2),
      showRemove = _useState4[0],
      setShowRemove = _useState4[1];

  var _useState5 = React.useState(false),
      _useState6 = LocalizationContext._slicedToArray(_useState5, 2),
      showFileViewer = _useState6[0],
      setShowFileViewer = _useState6[1];

  var _useState7 = React.useState(false),
      _useState8 = LocalizationContext._slicedToArray(_useState7, 2),
      isAnimated = _useState8[0],
      setIsAnimated = _useState8[1];

  var editMessageInputRef = React.useRef(null);
  var useMessageScrollRef = React.useRef(null);
  React.useLayoutEffect(function () {
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
  var RenderedMessage = React.useMemo(function () {
    if (renderCustomMessage) {
      return renderCustomMessage(message, currentGroupChannel, chainTop, chainBottom); // Let's change this to object type on next major version up
    }

    return null;
  }, [message, message.message, renderCustomMessage]);
  var isByMe = userId === sender.userId || message.requestState === 'pending' || message.requestState === 'failed';

  if (RenderedMessage) {
    return /*#__PURE__*/React__default['default'].createElement("div", {
      ref: useMessageScrollRef,
      className: "\n          sendbird-msg-hoc sendbird-msg--scroll-ref\n          ".concat(isAnimated ? 'sendbird-msg-hoc__highlighted' : '', "\n        ")
    }, hasSeperator && /*#__PURE__*/React__default['default'].createElement(index.DateSeparator, null, /*#__PURE__*/React__default['default'].createElement(index$2.Label, {
      type: index$2.LabelTypography.CAPTION_2,
      color: index$2.LabelColors.ONBACKGROUND_2
    }, index$2.format(message.createdAt, 'MMMM dd, yyyy'))), /*#__PURE__*/React__default['default'].createElement(RenderedMessage, {
      message: message
    }));
  }

  if (showEdit) {
    return /*#__PURE__*/React__default['default'].createElement(index.MessageInput, {
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

  return /*#__PURE__*/React__default['default'].createElement("div", {
    ref: useMessageScrollRef,
    className: "\n        sendbird-msg-hoc sendbird-msg--scroll-ref\n        ".concat(isAnimated ? 'sendbird-msg-hoc__animated' : '', "\n      ")
  }, hasSeperator && /*#__PURE__*/React__default['default'].createElement(index.DateSeparator, null, /*#__PURE__*/React__default['default'].createElement(index$2.Label, {
    type: index$2.LabelTypography.CAPTION_2,
    color: index$2.LabelColors.ONBACKGROUND_2
  }, index$2.format(message.createdAt, 'MMMM dd, yyyy'))), (_MessageTypes$ADMIN$M = {}, LocalizationContext._defineProperty(_MessageTypes$ADMIN$M, MessageTypes.ADMIN, /*#__PURE__*/React__default['default'].createElement(AdminMessage, {
    message: message
  })), LocalizationContext._defineProperty(_MessageTypes$ADMIN$M, MessageTypes.FILE, /*#__PURE__*/React__default['default'].createElement(MessageSwitch, {
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
  })), LocalizationContext._defineProperty(_MessageTypes$ADMIN$M, MessageTypes.OG, /*#__PURE__*/React__default['default'].createElement(OGMessageSwitch, {
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
  })), LocalizationContext._defineProperty(_MessageTypes$ADMIN$M, MessageTypes.THUMBNAIL, /*#__PURE__*/React__default['default'].createElement(ThumbnailMessage, {
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
  })), LocalizationContext._defineProperty(_MessageTypes$ADMIN$M, MessageTypes.USER, /*#__PURE__*/React__default['default'].createElement(Message, {
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
  })), _MessageTypes$ADMIN$M)[getMessageType(message)], showRemove && /*#__PURE__*/React__default['default'].createElement(RemoveMessage, {
    onCloseModal: function onCloseModal() {
      return setShowRemove(false);
    },
    onDeleteMessage: function onDeleteMessage() {
      deleteMessage(message);
    }
  }), showFileViewer && /*#__PURE__*/React__default['default'].createElement(index.FileViewer, {
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
  }), !(message.isFileMessage && message.isFileMessage() || message.messageType === 'file') && !(message.isAdminMessage && message.isAdminMessage()) && !(message.isUserMessage && message.isUserMessage() || message.messageType === 'user') && !showFileViewer && /*#__PURE__*/React__default['default'].createElement(UnknownMessage, {
    message: message,
    status: status,
    isByMe: isByMe,
    showRemove: setShowRemove,
    chainTop: chainTop,
    chainBottom: chainBottom
  }));
}
MessageHoc.propTypes = {
  userId: PropTypes__default['default'].string,
  message: PropTypes__default['default'].shape({
    isFileMessage: PropTypes__default['default'].func,
    isAdminMessage: PropTypes__default['default'].func,
    isUserMessage: PropTypes__default['default'].func,
    isDateSeperator: PropTypes__default['default'].func,
    // should be a number, but there's a bug in SDK shich returns string
    messageId: PropTypes__default['default'].number,
    type: PropTypes__default['default'].string,
    createdAt: PropTypes__default['default'].number,
    message: PropTypes__default['default'].string,
    requestState: PropTypes__default['default'].string,
    messageType: PropTypes__default['default'].string,
    sender: PropTypes__default['default'].shape({
      userId: PropTypes__default['default'].string
    }),
    ogMetaData: PropTypes__default['default'].shape({})
  }),
  highLightedMessageId: PropTypes__default['default'].oneOfType([PropTypes__default['default'].string, PropTypes__default['default'].number]),
  renderCustomMessage: PropTypes__default['default'].func,
  currentGroupChannel: PropTypes__default['default'].shape({}),
  hasSeperator: PropTypes__default['default'].bool,
  disabled: PropTypes__default['default'].bool,
  editDisabled: PropTypes__default['default'].bool,
  deleteMessage: PropTypes__default['default'].func.isRequired,
  updateMessage: PropTypes__default['default'].func.isRequired,
  resendMessage: PropTypes__default['default'].func.isRequired,
  status: PropTypes__default['default'].string,
  useReaction: PropTypes__default['default'].bool.isRequired,
  chainTop: PropTypes__default['default'].bool.isRequired,
  chainBottom: PropTypes__default['default'].bool.isRequired,
  emojiAllMap: PropTypes__default['default'].instanceOf(Map).isRequired,
  membersMap: PropTypes__default['default'].instanceOf(Map).isRequired,
  toggleReaction: PropTypes__default['default'].func,
  memoizedEmojiListItems: PropTypes__default['default'].func
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

var ConversationScroll = /*#__PURE__*/function (_Component) {
  LocalizationContext._inherits(ConversationScroll, _Component);

  var _super = LocalizationContext._createSuper(ConversationScroll);

  function ConversationScroll() {
    var _this;

    LocalizationContext._classCallCheck(this, ConversationScroll);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    LocalizationContext._defineProperty(LocalizationContext._assertThisInitialized(_this), "onScroll", function (e) {
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
          var _ref2 = LocalizationContext._slicedToArray(_ref, 1),
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
          var _ref4 = LocalizationContext._slicedToArray(_ref3, 1),
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

  LocalizationContext._createClass(ConversationScroll, [{
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
        return /*#__PURE__*/React__default['default'].createElement(index$2.PlaceHolder, {
          className: "sendbird-conversation__no-messages",
          type: index$2.PlaceHolderTypes$1.NO_MESSAGES
        });
      }

      return /*#__PURE__*/React__default['default'].createElement("div", {
        className: "sendbird-conversation__messages"
      }, /*#__PURE__*/React__default['default'].createElement("div", {
        ref: scrollRef,
        className: "sendbird-conversation__scroll-container",
        onScroll: this.onScroll
      }, /*#__PURE__*/React__default['default'].createElement("div", {
        className: "sendbird-conversation__padding"
      }), /*#__PURE__*/React__default['default'].createElement("div", {
        className: "sendbird-conversation__messages-padding"
      }, allMessages.map(function (m, idx) {
        var previousMessage = allMessages[idx - 1];
        var nextMessage = allMessages[idx + 1];

        var _ref5 = useMessageGrouping ? compareMessagesForGrouping(previousMessage, m, nextMessage) : [false, false],
            _ref6 = LocalizationContext._slicedToArray(_ref5, 2),
            chainTop = _ref6[0],
            chainBottom = _ref6[1];

        var previousMessageCreatedAt = previousMessage && previousMessage.createdAt;
        var currentCreatedAt = m.createdAt; // https://stackoverflow.com/a/41855608

        var hasSeperator = !(previousMessageCreatedAt && index$3.isSameDay(currentCreatedAt, previousMessageCreatedAt));

        if (renderChatItem) {
          return /*#__PURE__*/React__default['default'].createElement("div", {
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

        return /*#__PURE__*/React__default['default'].createElement(MessageHoc, {
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
      }))), showScrollBot && /*#__PURE__*/React__default['default'].createElement("div", {
        className: "sendbird-conversation__scroll-bottom-button",
        onClick: onClickScrollBot,
        onKeyDown: onClickScrollBot,
        tabIndex: 0,
        role: "button"
      }, /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
        width: "24px",
        height: "24px",
        type: index$2.IconTypes.CHEVRON_DOWN,
        fillColor: index$2.IconColors.PRIMARY
      })));
    }
  }]);

  return ConversationScroll;
}(React.Component);
ConversationScroll.propTypes = {
  // https://stackoverflow.com/a/52646941
  scrollRef: PropTypes__default['default'].shape({
    current: PropTypes__default['default'].oneOfType([PropTypes__default['default'].element, PropTypes__default['default'].shape({})])
  }).isRequired,
  hasMore: PropTypes__default['default'].bool,
  messagesDispatcher: PropTypes__default['default'].func.isRequired,
  onScroll: PropTypes__default['default'].func,
  onScrollDown: PropTypes__default['default'].func,
  editDisabled: PropTypes__default['default'].bool,
  disabled: PropTypes__default['default'].bool,
  userId: PropTypes__default['default'].string,
  allMessages: PropTypes__default['default'].arrayOf(PropTypes__default['default'].shape({
    createdAt: PropTypes__default['default'].number
  })).isRequired,
  deleteMessage: PropTypes__default['default'].func.isRequired,
  resendMessage: PropTypes__default['default'].func.isRequired,
  updateMessage: PropTypes__default['default'].func.isRequired,
  readStatus: PropTypes__default['default'].shape({}).isRequired,
  currentGroupChannel: PropTypes__default['default'].shape({
    markAsRead: PropTypes__default['default'].func,
    members: PropTypes__default['default'].arrayOf(PropTypes__default['default'].shape({}))
  }).isRequired,
  highLightedMessageId: PropTypes__default['default'].oneOfType([PropTypes__default['default'].string, PropTypes__default['default'].number]),
  renderChatItem: PropTypes__default['default'].element,
  renderCustomMessage: PropTypes__default['default'].func,
  useReaction: PropTypes__default['default'].bool,
  showScrollBot: PropTypes__default['default'].bool,
  onClickScrollBot: PropTypes__default['default'].func,
  emojiContainer: PropTypes__default['default'].shape({}),
  emojiAllMap: PropTypes__default['default'].instanceOf(Map),
  membersMap: PropTypes__default['default'].instanceOf(Map),
  useMessageGrouping: PropTypes__default['default'].bool,
  toggleReaction: PropTypes__default['default'].func,
  memoizedEmojiListItems: PropTypes__default['default'].func
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

  var _useContext = React.useContext(LocalizationContext.LocalizationContext),
      stringSet = _useContext.stringSet;

  var timeArray = time.split(' ');
  timeArray.splice(-2, 0, stringSet.CHANNEL__MESSAGE_LIST__NOTIFICATION__ON);
  return (
    /*#__PURE__*/
    // eslint-disable-next-line
    React__default['default'].createElement("div", {
      className: "sendbird-notification",
      onClick: onClick
    }, /*#__PURE__*/React__default['default'].createElement(index$2.Label, {
      className: "sendbird-notification__text",
      color: index$2.LabelColors.ONCONTENT_1,
      type: index$2.LabelTypography.CAPTION_2
    }, "".concat(count, " "), stringSet.CHANNEL__MESSAGE_LIST__NOTIFICATION__NEW_MESSAGE, " ".concat(timeArray.join(' '))), /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
      width: "24px",
      height: "24px",
      type: index$2.IconTypes.CHEVRON_DOWN,
      fillColor: index$2.IconColors.CONTENT
    }))
  );
}
Notification.propTypes = {
  count: PropTypes__default['default'].oneOfType([PropTypes__default['default'].string, PropTypes__default['default'].number]),
  time: PropTypes__default['default'].string,
  onClick: PropTypes__default['default'].func.isRequired
};
Notification.defaultProps = {
  count: 0,
  time: ''
};

var FrozenNotification = function FrozenNotification() {
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-notification sendbird-notification--frozen"
  }, /*#__PURE__*/React__default['default'].createElement(index$2.Label, {
    className: "sendbird-notification__text",
    type: index$2.LabelTypography.CAPTION_2
  }, stringSet.CHANNEL_FROZEN));
};

var TypingIndicatorText = function TypingIndicatorText(_ref) {
  var members = _ref.members;

  var _useContext = React.useContext(LocalizationContext.LocalizationContext),
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

  var _useState = React.useState(LocalizationContext.uuidv4()),
      _useState2 = LocalizationContext._slicedToArray(_useState, 2),
      handlerId = _useState2[0],
      setHandlerId = _useState2[1];

  var _useState3 = React.useState([]),
      _useState4 = LocalizationContext._slicedToArray(_useState3, 2),
      typingMembers = _useState4[0],
      setTypingMembers = _useState4[1];

  React.useEffect(function () {
    if (sb && sb.ChannelHandler) {
      sb.removeChannelHandler(handlerId);
      var newHandlerId = LocalizationContext.uuidv4();
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
  return /*#__PURE__*/React__default['default'].createElement(index$2.Label, {
    type: index$2.LabelTypography.CAPTION_2,
    color: index$2.LabelColors.ONBACKGROUND_2
  }, /*#__PURE__*/React__default['default'].createElement(TypingIndicatorText, {
    members: typingMembers
  }));
}

TypingIndicator.propTypes = {
  channelUrl: PropTypes__default['default'].string.isRequired,
  sb: PropTypes__default['default'].shape({
    ChannelHandler: PropTypes__default['default'].func,
    removeChannelHandler: PropTypes__default['default'].func,
    addChannelHandler: PropTypes__default['default'].func
  }).isRequired,
  logger: PropTypes__default['default'].shape({
    info: PropTypes__default['default'].func
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
  var stringSet = React.useContext(LocalizationContext.LocalizationContext).stringSet;
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


  return /*#__PURE__*/React__default['default'].createElement(index.MessageInput, {
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

var MessageInputWrapper$1 = /*#__PURE__*/React__default['default'].forwardRef(MessageInputWrapper);

function ConnectionStatus() {
  var _useContext = React.useContext(LocalizationContext.LocalizationContext),
      stringSet = _useContext.stringSet;

  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-connection-status"
  }, /*#__PURE__*/React__default['default'].createElement(index$2.Label, {
    type: index$2.LabelTypography.BODY_2,
    color: index$2.LabelColors.ONBACKGROUND_2
  }, stringSet.TRYING_TO_CONNECT), /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
    type: index$2.IconTypes.DISCONNECTED,
    fillColor: index$2.IconColors.SENT,
    width: "14px",
    height: "14px"
  }));
}

var getChannelTitle = function getChannelTitle() {
  var channel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var currentUserId = arguments.length > 1 ? arguments[1] : undefined;
  var stringSet = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : index$2.LabelStringSet;

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

var noop$1 = function noop() {};

function ChatHeader(props) {
  var currentGroupChannel = props.currentGroupChannel,
      currentUser = props.currentUser,
      title = props.title,
      subTitle = props.subTitle,
      isMuted = props.isMuted,
      theme = props.theme,
      showSearchIcon = props.showSearchIcon,
      onSearchClick = props.onSearchClick,
      onActionClick = props.onActionClick;
  var userId = currentUser.userId;

  var _useContext = React.useContext(LocalizationContext.LocalizationContext),
      stringSet = _useContext.stringSet;

  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-chat-header"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-chat-header__left"
  }, /*#__PURE__*/React__default['default'].createElement(index$4.ChannelAvatar, {
    theme: theme,
    channel: currentGroupChannel,
    userId: userId,
    height: 32,
    width: 32
  }), /*#__PURE__*/React__default['default'].createElement(index$2.Label, {
    className: "sendbird-chat-header__left__title",
    type: index$2.LabelTypography.H_2,
    color: index$2.LabelColors.ONBACKGROUND_1
  }, title || getChannelTitle(currentGroupChannel, userId, stringSet)), /*#__PURE__*/React__default['default'].createElement(index$2.Label, {
    className: "sendbird-chat-header__left__subtitle",
    type: index$2.LabelTypography.BODY_1,
    color: index$2.LabelColors.ONBACKGROUND_2
  }, subTitle)), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-chat-header__right"
  }, (typeof isMuted === 'string' && isMuted === 'true' || typeof isMuted === 'boolean' && isMuted) && /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
    className: "sendbird-chat-header__right__mute",
    type: index$2.IconTypes.NOTIFICATIONS_OFF_FILLED,
    width: "24px",
    height: "24px"
  }), showSearchIcon && /*#__PURE__*/React__default['default'].createElement(index$1.IconButton, {
    className: "sendbird-chat-header__right__search",
    width: "32px",
    height: "32px",
    onClick: onSearchClick
  }, /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
    type: index$2.IconTypes.SEARCH,
    fillColor: index$2.IconColors.PRIMARY,
    width: "24px",
    height: "24px"
  })), /*#__PURE__*/React__default['default'].createElement(index$1.IconButton, {
    className: "sendbird-chat-header__right__info",
    width: "32px",
    height: "32px",
    onClick: onActionClick
  }, /*#__PURE__*/React__default['default'].createElement(index$2.Icon, {
    type: index$2.IconTypes.INFO,
    fillColor: index$2.IconColors.PRIMARY,
    width: "24px",
    height: "24px"
  }))));
}
ChatHeader.propTypes = {
  currentGroupChannel: PropTypes__default['default'].shape({
    members: PropTypes__default['default'].arrayOf(PropTypes__default['default'].shape({})),
    coverUrl: PropTypes__default['default'].string
  }),
  currentUser: PropTypes__default['default'].shape({
    userId: PropTypes__default['default'].string
  }),
  title: PropTypes__default['default'].string,
  subTitle: PropTypes__default['default'].oneOfType([PropTypes__default['default'].bool, PropTypes__default['default'].string]),
  isMuted: PropTypes__default['default'].oneOfType([PropTypes__default['default'].string, PropTypes__default['default'].bool]),
  theme: PropTypes__default['default'].string,
  showSearchIcon: PropTypes__default['default'].bool,
  onSearchClick: PropTypes__default['default'].func,
  onActionClick: PropTypes__default['default'].func
};
ChatHeader.defaultProps = {
  currentGroupChannel: {},
  currentUser: {},
  title: '',
  subTitle: '',
  isMuted: false,
  theme: 'light',
  showSearchIcon: false,
  onSearchClick: noop$1,
  onActionClick: noop$1
};

var noop = function noop() {};

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

  var _useState = React.useState(startingPoint),
      _useState2 = LocalizationContext._slicedToArray(_useState, 2),
      intialTimeStamp = _useState2[0],
      setIntialTimeStamp = _useState2[1];

  React.useEffect(function () {
    setIntialTimeStamp(startingPoint);
  }, [startingPoint, channelUrl]);

  var _useState3 = React.useState(highlightedMessage),
      _useState4 = LocalizationContext._slicedToArray(_useState3, 2),
      highLightedMessageId = _useState4[0],
      setHighLightedMessageId = _useState4[1];

  React.useEffect(function () {
    setHighLightedMessageId(highlightedMessage);
  }, [highlightedMessage]);
  var userFilledMessageListQuery = queries.messageListParams;

  var _useReducer = React.useReducer(reducer, messagesInitialState),
      _useReducer2 = LocalizationContext._slicedToArray(_useReducer, 2),
      messagesStore = _useReducer2[0],
      messagesDispatcher = _useReducer2[1];

  var scrollRef = React.useRef(null);
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
  var emojiAllMap = React.useMemo(function () {
    return usingReaction ? getAllEmojisMapFromEmojiContainer(emojiContainer) : new Map();
  }, [emojiContainer]);
  var emojiAllList = React.useMemo(function () {
    return usingReaction ? getAllEmojisFromEmojiContainer$1(emojiContainer) : [];
  }, [emojiContainer]);
  var nicknamesMap = React.useMemo(function () {
    return usingReaction ? getNicknamesMapFromMembers(currentGroupChannel.members) : new Map();
  }, [currentGroupChannel.members]); // Scrollup is default scroll for channel

  var onScrollCallback = useScrollCallback({
    currentGroupChannel: currentGroupChannel,
    lastMessageTimeStamp: lastMessageTimeStamp,
    userFilledMessageListQuery: userFilledMessageListQuery
  }, {
    hasMore: hasMore,
    logger: logger,
    messagesDispatcher: messagesDispatcher,
    sdk: sdk
  }); // onScrollDownCallback is added for navigation to different timestamps on messageSearch
  // hasMoreToBottom, onScrollDownCallback -> scroll down
  // hasMore, onScrollCallback -> scroll up(default behavior)

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
  // this hook sets currentGroupChannel asynchronously

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
  }); // hook that fetches messages when channel changes
  // to be clear here useGetChannel sets currentGroupChannel
  // and useInitialMessagesFetch executes when currentGroupChannel changes
  // p.s This one executes on intialTimeStamp change too

  useInitialMessagesFetch({
    currentGroupChannel: currentGroupChannel,
    userFilledMessageListQuery: userFilledMessageListQuery,
    intialTimeStamp: intialTimeStamp
  }, {
    sdk: sdk,
    logger: logger,
    messagesDispatcher: messagesDispatcher
  }); // handles API calls from withSendbird

  React.useEffect(function () {
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
  }); // callbacks for Message CURD actions

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
      _useSendMessageCallba2 = LocalizationContext._slicedToArray(_useSendMessageCallba, 2),
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
      _useSendFileMessageCa2 = LocalizationContext._slicedToArray(_useSendFileMessageCa, 1),
      onSendFileMessage = _useSendFileMessageCa2[0];

  if (!channelUrl) {
    return /*#__PURE__*/React__default['default'].createElement("div", {
      className: "sendbird-conversation"
    }, /*#__PURE__*/React__default['default'].createElement(index$2.PlaceHolder, {
      type: index$2.PlaceHolderTypes$1.NO_CHANNELS
    }));
  }

  if (isInvalid) {
    return /*#__PURE__*/React__default['default'].createElement("div", {
      className: "sendbird-conversation"
    }, /*#__PURE__*/React__default['default'].createElement(index$2.PlaceHolder, {
      type: index$2.PlaceHolderTypes$1.WRONG
    }));
  }

  if (sdkError) {
    return /*#__PURE__*/React__default['default'].createElement("div", {
      className: "sendbird-conversation"
    }, /*#__PURE__*/React__default['default'].createElement(index$2.PlaceHolder, {
      type: index$2.PlaceHolderTypes$1.WRONG,
      retryToConnect: function retryToConnect() {
        logger.info('Channel: reconnecting');
        reconnect();
      }
    }));
  }

  return /*#__PURE__*/React__default['default'].createElement(index$1.UserProfileProvider, {
    className: "sendbird-conversation",
    disableUserProfile: userDefinedDisableUserProfile,
    renderUserProfile: userDefinedRenderProfile
  }, renderChatHeader ? renderChatHeader({
    channel: currentGroupChannel,
    user: user
  }) : /*#__PURE__*/React__default['default'].createElement(ChatHeader, {
    theme: theme,
    currentGroupChannel: currentGroupChannel,
    currentUser: user,
    showSearchIcon: showSearchIcon,
    onSearchClick: onSearchClick,
    onActionClick: onChatHeaderActionClick,
    subTitle: currentGroupChannel.members && currentGroupChannel.members.length !== 2,
    isMuted: false
  }), isFrozen && /*#__PURE__*/React__default['default'].createElement(FrozenNotification, null), unreadCount > 0 && /*#__PURE__*/React__default['default'].createElement(Notification, {
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
  }), loading ? /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-conversation"
  }, /*#__PURE__*/React__default['default'].createElement(index$2.PlaceHolder, {
    type: index$2.PlaceHolderTypes$1.LOADING
  })) : /*#__PURE__*/React__default['default'].createElement(ConversationScroll, {
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
  }), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-conversation__footer"
  }, /*#__PURE__*/React__default['default'].createElement(MessageInputWrapper$1, {
    channel: currentGroupChannel,
    user: user,
    ref: messageInputRef,
    onSendMessage: onSendMessage,
    onFileUpload: onSendFileMessage,
    renderMessageInput: renderMessageInput,
    isOnline: isOnline,
    initialized: initialized
  }), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "sendbird-conversation__typing-indicator"
  }, /*#__PURE__*/React__default['default'].createElement(TypingIndicator, {
    channelUrl: channelUrl,
    sb: sdk,
    logger: logger
  })), !isOnline && /*#__PURE__*/React__default['default'].createElement(ConnectionStatus, {
    sdkInit: sdkInit,
    sb: sdk,
    logger: logger
  })));
};
ConversationPanel.propTypes = {
  channelUrl: PropTypes__default['default'].string,
  stores: PropTypes__default['default'].shape({
    sdkStore: PropTypes__default['default'].shape({
      initialized: PropTypes__default['default'].bool,
      sdk: PropTypes__default['default'].shape({
        getErrorFirstCallback: PropTypes__default['default'].func,
        removeChannelHandler: PropTypes__default['default'].func,
        GroupChannel: PropTypes__default['default'].any,
        ChannelHandler: PropTypes__default['default'].any,
        addChannelHandler: PropTypes__default['default'].func,
        UserMessageParams: PropTypes__default['default'].any,
        FileMessageParams: PropTypes__default['default'].any,
        getAllEmoji: PropTypes__default['default'].func,
        appInfo: PropTypes__default['default'].shape({})
      }),
      error: PropTypes__default['default'].bool
    }),
    userStore: PropTypes__default['default'].shape({
      user: PropTypes__default['default'].shape({})
    })
  }).isRequired,
  dispatchers: PropTypes__default['default'].shape({
    reconnect: PropTypes__default['default'].func
  }).isRequired,
  config: PropTypes__default['default'].shape({
    disableUserProfile: PropTypes__default['default'].bool,
    renderUserProfile: PropTypes__default['default'].func,
    userId: PropTypes__default['default'].string.isRequired,
    isOnline: PropTypes__default['default'].bool.isRequired,
    theme: PropTypes__default['default'].string,
    logger: PropTypes__default['default'].shape({
      info: PropTypes__default['default'].func,
      error: PropTypes__default['default'].func,
      warning: PropTypes__default['default'].func
    }),
    pubSub: PropTypes__default['default'].shape({
      subscribe: PropTypes__default['default'].func,
      publish: PropTypes__default['default'].func
    }),
    imageCompression: PropTypes__default['default'].shape({
      compressionRate: PropTypes__default['default'].number,
      resizingWidth: PropTypes__default['default'].oneOfType([PropTypes__default['default'].number, PropTypes__default['default'].string]),
      resizingHeight: PropTypes__default['default'].oneOfType([PropTypes__default['default'].number, PropTypes__default['default'].string])
    })
  }).isRequired,
  queries: PropTypes__default['default'].shape({
    messageListParams: PropTypes__default['default'].shape({
      includeMetaArray: PropTypes__default['default'].bool,
      includeParentMessageText: PropTypes__default['default'].bool,
      includeReaction: PropTypes__default['default'].bool,
      includeReplies: PropTypes__default['default'].bool,
      includeThreadInfo: PropTypes__default['default'].bool,
      limit: PropTypes__default['default'].number,
      reverse: PropTypes__default['default'].bool,
      senderUserIdsFilter: PropTypes__default['default'].arrayOf(PropTypes__default['default'].string)
    })
  }),
  startingPoint: PropTypes__default['default'].number,
  highlightedMessage: PropTypes__default['default'].oneOfType([PropTypes__default['default'].string, PropTypes__default['default'].number]),
  onBeforeSendUserMessage: PropTypes__default['default'].func,
  // onBeforeSendUserMessage(text)
  onBeforeSendFileMessage: PropTypes__default['default'].func,
  // onBeforeSendFileMessage(File)
  onBeforeUpdateUserMessage: PropTypes__default['default'].func,
  renderChatItem: PropTypes__default['default'].oneOfType([PropTypes__default['default'].element, PropTypes__default['default'].func]),
  renderCustomMessage: PropTypes__default['default'].func,
  renderMessageInput: PropTypes__default['default'].oneOfType([PropTypes__default['default'].element, PropTypes__default['default'].func]),
  renderChatHeader: PropTypes__default['default'].oneOfType([PropTypes__default['default'].element, PropTypes__default['default'].func]),
  showSearchIcon: PropTypes__default['default'].bool,
  onSearchClick: PropTypes__default['default'].func,
  onChatHeaderActionClick: PropTypes__default['default'].func,
  useReaction: PropTypes__default['default'].bool,
  disableUserProfile: PropTypes__default['default'].bool,
  renderUserProfile: PropTypes__default['default'].func,
  useMessageGrouping: PropTypes__default['default'].bool
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
  onSearchClick: noop,
  disableUserProfile: false,
  renderUserProfile: null,
  useMessageGrouping: true,
  onChatHeaderActionClick: noop
};
var getEmojiCategoriesFromEmojiContainer = getEmojiCategoriesFromEmojiContainer$1,
    getAllEmojisFromEmojiContainer = getAllEmojisFromEmojiContainer$1,
    getEmojisFromEmojiContainer = getEmojisFromEmojiContainer$1;
var Conversation = LocalizationContext.withSendbirdContext(ConversationPanel);

exports.ConversationPanel = ConversationPanel;
exports.default = Conversation;
exports.getAllEmojisFromEmojiContainer = getAllEmojisFromEmojiContainer;
exports.getEmojiCategoriesFromEmojiContainer = getEmojiCategoriesFromEmojiContainer;
exports.getEmojisFromEmojiContainer = getEmojisFromEmojiContainer;
//# sourceMappingURL=Channel.js.map
