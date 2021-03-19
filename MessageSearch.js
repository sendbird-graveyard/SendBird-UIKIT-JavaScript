import { _ as __assign, m as __spreadArrays, d as LocalizationContext, w as withSendbirdContext } from './LocalizationContext-12658c38.js';
import React, { useState, useEffect, useCallback, useContext, useReducer, useRef } from 'react';
import 'prop-types';
import { A as Avatar, L as Label, a as LabelTypography, b as LabelColors, c as IconTypes, I as Icon, d as IconColors, P as PlaceHolder, i as PlaceHolderTypes } from './index-ad616be9.js';
import isToday from 'date-fns/isToday';
import format from 'date-fns/format';
import isYesterday from 'date-fns/isYesterday';

var GET_SEARCHED_MESSAGES = 'GET_SEARCHED_MESSAGES';
var GET_NEXT_SEARCHED_MESSAGES = 'GET_NEXT_SEARCHED_MESSAGES';
var START_MESSAGE_SEARCH = 'START_MESSAGE_SEARCH';
var START_GETTING_SEARCHED_MESSAGES = 'START_GETTING_SEARCHED_MESSAGES';
var SET_QUERY_INVALID = 'SET_QUERY_INVALID';
var SET_CURRENT_CHANNEL = 'SET_CURRENT_CHANNEL';
var CHANNEL_INVALID = 'CHANNEL_INVALID';

function reducer(state, action) {
  switch (action.type) {
    case SET_CURRENT_CHANNEL:
      {
        var currentChannel = action.payload;
        return __assign(__assign({}, state), {
          currentChannel: currentChannel,
          initialized: true
        });
      }

    case CHANNEL_INVALID:
      {
        return __assign(__assign({}, state), {
          currentChannel: null,
          initialized: false
        });
      }

    case GET_SEARCHED_MESSAGES:
      {
        var _a = action.payload,
            messages = _a.messages,
            createdQuery = _a.createdQuery;

        if (createdQuery && createdQuery.channelUrl === state.currentMessageSearchQuery.channelUrl && createdQuery.key === state.currentMessageSearchQuery.key) {
          return __assign(__assign({}, state), {
            loading: false,
            isInvalid: false,
            allMessages: __spreadArrays(messages),
            hasMoreResult: state.currentMessageSearchQuery.hasNext
          });
        }

        return __assign({}, state);
      }

    case SET_QUERY_INVALID:
      {
        return __assign(__assign({}, state), {
          isInvalid: true
        });
      }

    case START_MESSAGE_SEARCH:
      {
        return __assign(__assign({}, state), {
          isInvalid: false,
          loading: false
        });
      }

    case START_GETTING_SEARCHED_MESSAGES:
      {
        var currentMessageSearchQuery = action.payload;
        return __assign(__assign({}, state), {
          loading: true,
          currentMessageSearchQuery: currentMessageSearchQuery
        });
      }

    case GET_NEXT_SEARCHED_MESSAGES:
      {
        var messages = action.payload;
        return __assign(__assign({}, state), {
          allMessages: __spreadArrays(state.allMessages, messages),
          hasMoreResult: state.currentMessageSearchQuery.hasNext
        });
      }

    default:
      {
        return state;
      }
  }
}

var initialState = {
  allMessages: [],
  loading: false,
  isInvalid: false,
  initialized: false,
  currentChannel: null,
  currentMessageSearchQuery: null,
  hasMoreResult: false
};

function useSetChannel(_a, _b) {
  var channelUrl = _a.channelUrl,
      sdkInit = _a.sdkInit;
  var sdk = _b.sdk,
      logger = _b.logger,
      messageSearchDispathcer = _b.messageSearchDispathcer;

  var _c = useState(null),
      groupInvalid = _c[0],
      setGroupInvalid = _c[1];

  var _d = useState(null),
      openInvalid = _d[0],
      setOpenInvalid = _d[1];

  useEffect(function () {
    if (channelUrl && sdkInit && sdk && (sdk.OpenChannel || sdk.GroupChannel)) {
      sdk.GroupChannel.getChannel(channelUrl, function (groupChannel, error) {
        if (!error) {
          logger.info('MessageSearch | useSetChannel group channel', groupChannel);
          messageSearchDispathcer({
            type: SET_CURRENT_CHANNEL,
            payload: groupChannel
          });
        } else {
          setGroupInvalid(true);
        }
      });
      sdk.OpenChannel.getChannel(channelUrl, function (openChannel, error) {
        if (!error) {
          logger.info('MessageSearch | useSetChannel open channel', openChannel);
          messageSearchDispathcer({
            type: SET_CURRENT_CHANNEL,
            payload: openChannel
          });
          openChannel.enter(function (_, error) {
            logger.warning('MessageSearch | useSetChannel failed enter open channel', error);
            messageSearchDispathcer({
              type: CHANNEL_INVALID,
              payload: null
            });
          });
        } else {
          setOpenInvalid(true);
        }
      });
    }
  }, [channelUrl, sdkInit]);
  useEffect(function () {
    if (groupInvalid && openInvalid) {
      console.log('sheet');
      logger.info('MessageSearch | useSetChannel failed get channel', {
        errorGroupChannel: groupInvalid,
        errorOpenChannel: openInvalid
      });
      messageSearchDispathcer({
        type: CHANNEL_INVALID,
        payload: null
      });
    }
  }, [groupInvalid, openInvalid]);
}

function useGetSearchedMessages(_a, _b) {
  var currentChannel = _a.currentChannel,
      channelUrl = _a.channelUrl,
      searchString = _a.searchString,
      messageSearchQuery = _a.messageSearchQuery,
      onResultLoaded = _a.onResultLoaded,
      retryCount = _a.retryCount;
  var sdk = _b.sdk,
      logger = _b.logger,
      messageSearchDispathcer = _b.messageSearchDispathcer;
  useEffect(function () {
    messageSearchDispathcer({
      type: START_MESSAGE_SEARCH,
      payload: null
    });

    if (sdk && channelUrl && sdk.createMessageSearchQuery) {
      if (searchString) {
        var inputSearchMessageQueryObject = __assign(__assign({}, messageSearchQuery), {
          channelUrl: channelUrl,
          messageTimestampFrom: currentChannel.invitedAt
        });

        var createdQuery_1 = sdk.createMessageSearchQuery(searchString, inputSearchMessageQueryObject);
        createdQuery_1.next(function (messages, error) {
          if (!error) {
            logger.info('MessageSearch | useGetSearchedMessages: succeeded getting messages', messages);
            messageSearchDispathcer({
              type: GET_SEARCHED_MESSAGES,
              payload: {
                messages: messages,
                createdQuery: createdQuery_1
              }
            });

            if (onResultLoaded && typeof onResultLoaded === 'function') {
              onResultLoaded(messages, null);
            }
          } else {
            logger.warning('MessageSearch | useGetSearchedMessages: getting failed', error);
            messageSearchDispathcer({
              type: SET_QUERY_INVALID,
              payload: null
            });

            if (onResultLoaded && typeof onResultLoaded === 'function') {
              onResultLoaded(null, error);
            }
          }
        });
        messageSearchDispathcer({
          type: START_GETTING_SEARCHED_MESSAGES,
          payload: createdQuery_1
        });
      } else {
        logger.info('MessageSearch | useGetSeasrchedMessages: search string is empty');
      }
    }
  }, [channelUrl, messageSearchQuery, searchString, currentChannel, retryCount]);
}

function useScrollCallback(_a, _b) {
  var currentMessageSearchQuery = _a.currentMessageSearchQuery,
      hasMoreResult = _a.hasMoreResult,
      onResultLoaded = _a.onResultLoaded;
  var logger = _b.logger,
      messageSearchDispathcer = _b.messageSearchDispathcer;
  return useCallback(function (cb) {
    if (!hasMoreResult) {
      logger.warning('MessageSearch | useScrollCallback: no more searched results', hasMoreResult);
    }

    if (currentMessageSearchQuery && currentMessageSearchQuery.hasNext) {
      currentMessageSearchQuery.next(function (messages, error) {
        if (!error) {
          logger.info('MessageSearch | useScrollCallback: succeeded getting searched messages', messages);
          messageSearchDispathcer({
            type: GET_NEXT_SEARCHED_MESSAGES,
            payload: messages
          });
          cb(messages, null);

          if (onResultLoaded && typeof onResultLoaded === 'function') {
            onResultLoaded(messages, null);
          }
        } else {
          logger.warning('MessageSearch | useScrollCallback: failed getting searched messages', error);
          cb(null, error);

          if (onResultLoaded && typeof onResultLoaded === 'function') {
            onResultLoaded(null, error);
          }
        }
      });
    } else {
      logger.warning('MessageSearch | useScrollCallback: no currentMessageSearchQuery');
    }
  }, [currentMessageSearchQuery, hasMoreResult]);
}

var getCreatedAt = (function (createdAt) {
  if (!createdAt) {
    return '';
  }

  if (isToday(createdAt)) {
    return format(createdAt, 'p');
  }

  if (isYesterday(createdAt)) {
    return 'Yesterday';
  }

  return format(createdAt, 'MMM dd');
});

function MessageSearchItem(_a) {
  var className = _a.className,
      message = _a.message,
      _onClick = _a.onClick,
      selected = _a.selected;
  var createdAt = message.createdAt;
  var messageText = message.message;
  var sender = message.sender || message._sender;
  var profileUrl = sender.profileUrl,
      nickname = sender.nickname;
  var stringSet = useContext(LocalizationContext).stringSet;
  var injectingClassNames = Array.isArray(className) ? className : [className];
  injectingClassNames.push('sendbird-message-search-item');

  if (selected) {
    injectingClassNames.push('sendbird-message-search-item--selected');
  }

  return React.createElement("div", {
    className: injectingClassNames.join(' '),
    onClick: function onClick(e) {
      e.stopPropagation();

      _onClick(message);
    }
  }, React.createElement("div", {
    className: "sendbird-message-search-item__left"
  }, React.createElement(Avatar, {
    className: "sendbird-message-search-item__left__sender-avatar",
    src: profileUrl,
    alt: "profile image",
    width: "56px",
    height: "56px"
  })), React.createElement("div", {
    className: "sendbird-message-search-item__right"
  }, React.createElement(Label, {
    className: "sendbird-message-search-item__right__sender-name",
    type: LabelTypography.SUBTITLE_2,
    color: LabelColors.ONBACKGROUND_1
  }, nickname || stringSet.NO_NAME), React.createElement(Label, {
    className: "sendbird-message-search-item__right__message-text",
    type: LabelTypography.BODY_2,
    color: LabelColors.ONBACKGROUND_3
  }, messageText), React.createElement(Label, {
    className: "sendbird-message-search-item__right__message-created-at",
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_2
  }, getCreatedAt(createdAt))), React.createElement("div", {
    className: "sendbird-message-search-item__right-footer"
  }));
}

function getCreatedAt$1(createdAt) {
  if (!createdAt) {
    return '';
  }

  if (isToday(createdAt)) {
    return format(createdAt, 'p');
  }

  if (isYesterday(createdAt)) {
    return 'Yesterday';
  }

  return format(createdAt, 'MMM dd');
}
function getIconOfFileType(message) {
  var plainUrl = message.plainUrl,
      url = message.url;
  var fileMessageUrl = plainUrl || url;
  var fileExtension = fileMessageUrl.match(/\.([^.]*?)(?=\?|#|$)/)[1];

  if (/(jpg|jpeg|png)$/i.test(fileExtension)) {
    return IconTypes.PHOTO;
  } else if (/mp4$/i.test(fileExtension)) {
    return IconTypes.PLAY;
  } else if (/mp3/i.test(fileExtension)) {
    return IconTypes.FILE_AUDIO;
  } else if (/gif/i.test(fileExtension)) {
    return IconTypes.GIF;
  } else {
    return IconTypes.FILE_DOCUMENT;
  }
}
function truncate(fullText, textLimit) {
  if (fullText.length <= textLimit) return fullText;
  var separator = '...';
  var sepLen = separator.length;
  var charsToShow = textLimit - sepLen;
  var frontChars = Math.ceil(charsToShow / 2);
  var backChars = Math.floor(charsToShow / 2);
  return fullText.substr(0, frontChars) + separator + fullText.substr(fullText.length - backChars);
}

function MessageSearchFileItem(props) {
  var className = props.className,
      message = props.message,
      _onClick = props.onClick,
      selected = props.selected;
  var createdAt = message.createdAt,
      plainUrl = message.plainUrl,
      url = message.url,
      name = message.name;
  var fileMessageUrl = plainUrl || url;
  var sender = message.sender || message._sender;
  var profileUrl = sender.profileUrl,
      nickname = sender.nickname;
  var stringSet = useContext(LocalizationContext).stringSet;
  var injectingClassNames = Array.isArray(className) ? className : [className];
  injectingClassNames.push('sendbird-message-search-file-item');

  if (selected) {
    injectingClassNames.push('sendbird-message-search-file-item--selected');
  }

  return React.createElement("div", {
    className: injectingClassNames.join(' '),
    onClick: function onClick(e) {
      e.stopPropagation();

      _onClick(message);
    }
  }, React.createElement("div", {
    className: "sendbird-message-search-file-item__left"
  }, React.createElement(Avatar, {
    className: "sendbird-message-search-file-item__left__sender-avatar",
    src: profileUrl,
    alt: "profile image",
    width: "56px",
    height: "56px"
  })), React.createElement("div", {
    className: "sendbird-message-search-file-item__right"
  }, React.createElement(Label, {
    className: "sendbird-message-search-file-item__right__sender-name",
    type: LabelTypography.SUBTITLE_2,
    color: LabelColors.ONBACKGROUND_1
  }, nickname || stringSet.NO_NAME), React.createElement("div", {
    className: "sendbird-message-search-file-item__right__content"
  }, React.createElement("div", {
    className: "sendbird-message-search-file-item__right__content__type-icon"
  }, React.createElement(Icon, {
    type: getIconOfFileType(message),
    fillColor: IconColors.PRIMARY,
    width: "18px",
    height: "18px"
  })), React.createElement(Label, {
    className: "sendbird-message-search-file-item__right__content__url",
    type: LabelTypography.BODY_2,
    color: LabelColors.ONBACKGROUND_1
  }, truncate(name || fileMessageUrl, 28)))), React.createElement(Label, {
    className: "sendbird-message-search-file-item__message-created-at",
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_2
  }, getCreatedAt$1(createdAt)), React.createElement("div", {
    className: "sendbird-message-search-file-item__right-footer"
  }));
}

var COMPONENT_CLASS_NAME = 'sendbird-message-search';

function MessageSearch(props) {
  var // sendbird internal props
  stores = props.stores,
      config = props.config,
      // message search props
  channelUrl = props.channelUrl,
      searchString = props.searchString,
      messageSearchQuery = props.messageSearchQuery,
      renderSearchItem = props.renderSearchItem,
      onResultLoaded = props.onResultLoaded,
      onResultClick = props.onResultClick; // hook variables

  var stringSet = useContext(LocalizationContext).stringSet;

  var _a = useState(0),
      retryCount = _a[0],
      setRetryCount = _a[1]; // this is a trigger flag for activating useGetSearchMessages


  var _b = useState(0),
      selectedMessageId = _b[0],
      setSelectedMessageId = _b[1];

  var _c = useReducer(reducer, initialState),
      messageSearchStore = _c[0],
      messageSearchDispathcer = _c[1];

  var allMessages = messageSearchStore.allMessages,
      loading = messageSearchStore.loading,
      isInvalid = messageSearchStore.isInvalid,
      currentChannel = messageSearchStore.currentChannel,
      currentMessageSearchQuery = messageSearchStore.currentMessageSearchQuery,
      hasMoreResult = messageSearchStore.hasMoreResult;

  var getChannelName = function getChannelName() {
    if (currentChannel && currentChannel.name && currentChannel.name !== 'Group Channel') {
      return currentChannel.name;
    }

    if (currentChannel && (currentChannel.name === 'Group Channel' || !currentChannel.name)) {
      return currentChannel.members.map(function (member) {
        return member.nickname || stringSet.NO_NAME;
      }).join(', ');
    }

    return stringSet.NO_TITLE;
  }; // const


  var sdkStore = stores.sdkStore;
  var logger = config.logger;
  var sdk = sdkStore.sdk;
  var sdkInit = sdkStore.initialized;
  var scrollRef = useRef(null);

  var handleOnScroll = function handleOnScroll(e) {
    var scrollElement = e.target;
    var scrollTop = scrollElement.scrollTop,
        scrollHeight = scrollElement.scrollHeight,
        clientHeight = scrollElement.clientHeight;

    if (!hasMoreResult) {
      return;
    }

    if (scrollTop + clientHeight >= scrollHeight) {
      onScroll(function () {// after load more searched messages
      });
    }
  };

  useSetChannel({
    channelUrl: channelUrl,
    sdkInit: sdkInit
  }, {
    sdk: sdk,
    logger: logger,
    messageSearchDispathcer: messageSearchDispathcer
  });
  useGetSearchedMessages({
    currentChannel: currentChannel,
    channelUrl: channelUrl,
    searchString: searchString,
    messageSearchQuery: messageSearchQuery,
    onResultLoaded: onResultLoaded,
    retryCount: retryCount
  }, {
    sdk: sdk,
    logger: logger,
    messageSearchDispathcer: messageSearchDispathcer
  });
  var onScroll = useScrollCallback({
    currentMessageSearchQuery: currentMessageSearchQuery,
    hasMoreResult: hasMoreResult,
    onResultLoaded: onResultLoaded
  }, {
    logger: logger,
    messageSearchDispathcer: messageSearchDispathcer
  });

  var handleRetryToConnect = function handleRetryToConnect() {
    setRetryCount(retryCount + 1);
  };

  if (isInvalid && searchString) {
    return React.createElement("div", {
      className: COMPONENT_CLASS_NAME
    }, React.createElement(PlaceHolder, {
      type: PlaceHolderTypes.WRONG,
      retryToConnect: handleRetryToConnect
    }));
  }

  if (loading && searchString) {
    return React.createElement("div", {
      className: COMPONENT_CLASS_NAME
    }, React.createElement(PlaceHolder, {
      type: PlaceHolderTypes.SEARCHING
    }));
  }

  if (!searchString) {
    return React.createElement("div", {
      className: COMPONENT_CLASS_NAME
    }, React.createElement(PlaceHolder, {
      type: PlaceHolderTypes.SEARCH_IN,
      searchInString: getChannelName()
    }));
  }

  return React.createElement("div", {
    className: COMPONENT_CLASS_NAME,
    onScroll: handleOnScroll,
    ref: scrollRef
  }, allMessages.length > 0 ? allMessages.map(function (message) {
    if (renderSearchItem) {
      return renderSearchItem({
        message: message,
        onResultClick: onResultClick
      });
    }

    if (message.messageType === 'file') {
      return React.createElement(MessageSearchFileItem, {
        className: COMPONENT_CLASS_NAME + "__message-search-item",
        message: message,
        key: message.messageId,
        selected: selectedMessageId === message.messageId,
        onClick: function onClick() {
          onResultClick(message);
          setSelectedMessageId(message.messageId);
        }
      });
    }

    return React.createElement(MessageSearchItem, {
      className: COMPONENT_CLASS_NAME + "__message-search-item",
      message: message,
      key: message.messageId,
      selected: selectedMessageId === message.messageId,
      onClick: function onClick() {
        onResultClick(message);
        setSelectedMessageId(message.messageId);
      }
    });
  }) : React.createElement(PlaceHolder, {
    type: PlaceHolderTypes.NO_RESULTS
  }));
}

var MessageSearch$1 = withSendbirdContext(MessageSearch);

export default MessageSearch$1;
//# sourceMappingURL=MessageSearch.js.map
