import { d as __spreadArray } from './LocalizationContext-ec52e278.js';
import { M as MessageStatusType } from './type-d77d0e67.js';

var hasSameMembers = function hasSameMembers(a, b) {
  if (a === b) {
    return true;
  }

  if (a == null || b == null) {
    return false;
  }

  if (a.length !== b.length) {
    return false;
  }

  var sortedA = __spreadArray([], a).sort();

  var sortedB = __spreadArray([], b).sort();

  for (var i = 0; i < sortedA.length; ++i) {
    if (sortedA[i] !== sortedB[i]) {
      return false;
    }
  }

  return true;
};
var isFriend = function isFriend(user) {
  return !!(user.friendDiscoveryKey || user.friendName);
};
var filterMessageListParams = function filterMessageListParams(params, message) {
  var _a, _b, _c;

  if ((params === null || params === void 0 ? void 0 : params.messageType) && params.messageType !== message.messageType) {
    return false;
  }

  if (((_a = params === null || params === void 0 ? void 0 : params.customTypes) === null || _a === void 0 ? void 0 : _a.length) > 0 && !params.customTypes.includes(message.customType)) {
    return false;
  }

  if (((_b = params === null || params === void 0 ? void 0 : params.senderUserIds) === null || _b === void 0 ? void 0 : _b.length) > 0) {
    if ((message === null || message === void 0 ? void 0 : message.isUserMessage()) || message.isFileMessage()) {
      if (!((_c = params === null || params === void 0 ? void 0 : params.senderUserIds) === null || _c === void 0 ? void 0 : _c.includes(message.sender.userId))) {
        return false;
      }
    } else {
      return false;
    }
  }

  return true;
};
var filterChannelListParams = function filterChannelListParams(params, channel, currentUserId) {
  var _a, _b, _c, _d, _e, _f, _g, _h;

  if (!(params === null || params === void 0 ? void 0 : params.includeEmpty) && (channel === null || channel === void 0 ? void 0 : channel.lastMessage) && channel.lastMessage === null) {
    return false;
  }

  if (((_a = params === null || params === void 0 ? void 0 : params._searchFilter) === null || _a === void 0 ? void 0 : _a.search_query) && ((_b = params._searchFilter.search_fields) === null || _b === void 0 ? void 0 : _b.length) > 0) {
    var searchFilter = params._searchFilter;
    var searchQuery_1 = searchFilter.search_query;
    var searchFields = searchFilter.search_fields;

    if (searchQuery_1 && searchFields && searchFields.length > 0) {
      if (!searchFields.some(function (searchField) {
        switch (searchField) {
          case 'channel_name':
            {
              return channel.name.toLowerCase().includes(searchQuery_1.toLowerCase());
            }

          case 'member_nickname':
            {
              return channel.members.some(function (member) {
                return member.nickname.toLowerCase().includes(searchQuery_1.toLowerCase());
              });
            }

          default:
            {
              return true;
            }
        }
      })) {
        return false;
      }
    }
  }

  if (((_d = (_c = params === null || params === void 0 ? void 0 : params._userIdsFilter) === null || _c === void 0 ? void 0 : _c.userIds) === null || _d === void 0 ? void 0 : _d.length) > 0) {
    var userIdsFilter = params._userIdsFilter;
    var includeMode = userIdsFilter.includeMode,
        queryType = userIdsFilter.queryType;
    var userIds = userIdsFilter.userIds;
    var memberIds_1 = channel.members.map(function (member) {
      return member.userId;
    });

    if (!includeMode) {
      // exact match
      if (!userIds.includes(currentUserId)) {
        userIds.push(currentUserId); // add the caller's userId if not added already.
      }

      if (channel.members.length > userIds.length) {
        return false; // userIds may contain one or more non-member(s).
      }

      if (!hasSameMembers(userIds, memberIds_1)) {
        return false;
      }
    } else if (userIds.length > 0) {
      // inclusive
      switch (queryType) {
        case 'AND':
          if (userIds.some(function (userId) {
            return !memberIds_1.includes(userId);
          })) {
            return false;
          }

          break;

        case 'OR':
          if (userIds.every(function (userId) {
            return !memberIds_1.includes(userId);
          })) {
            return false;
          }

          break;
      }
    }
  }

  if ((params === null || params === void 0 ? void 0 : params.includeEmpty) === false && (channel === null || channel === void 0 ? void 0 : channel.lastMessage) === null) {
    return false;
  }

  if ((params === null || params === void 0 ? void 0 : params.includeFrozen) === false && (channel === null || channel === void 0 ? void 0 : channel.isFrozen) === true) {
    return false;
  }

  if (((_e = params === null || params === void 0 ? void 0 : params.customTypesFilter) === null || _e === void 0 ? void 0 : _e.length) > 0 && !params.customTypesFilter.includes(channel === null || channel === void 0 ? void 0 : channel.customType)) {
    return false;
  }

  if ((params === null || params === void 0 ? void 0 : params.customTypeStartsWithFilter) && !new RegExp("^" + params.customTypeStartsWithFilter).test(channel === null || channel === void 0 ? void 0 : channel.customType)) {
    return false;
  }

  if ((params === null || params === void 0 ? void 0 : params.channelNameContainsFilter) && !((_f = channel === null || channel === void 0 ? void 0 : channel.name) === null || _f === void 0 ? void 0 : _f.toLowerCase().includes(params.channelNameContainsFilter.toLowerCase()))) {
    return false;
  }

  if (params === null || params === void 0 ? void 0 : params.nicknameContainsFilter) {
    var lowerCasedSubString_1 = params.nicknameContainsFilter.toLowerCase();

    if ((_g = channel === null || channel === void 0 ? void 0 : channel.members) === null || _g === void 0 ? void 0 : _g.every(function (member) {
      return !member.nickname.toLowerCase().includes(lowerCasedSubString_1);
    })) {
      return false;
    }
  }

  if (((_h = params === null || params === void 0 ? void 0 : params.channelUrlsFilter) === null || _h === void 0 ? void 0 : _h.length) > 0 && !params.channelUrlsFilter.includes(channel === null || channel === void 0 ? void 0 : channel.url)) {
    return false;
  }

  if (params === null || params === void 0 ? void 0 : params.memberStateFilter) {
    switch (params.memberStateFilter) {
      case 'joined_only':
        if ((channel === null || channel === void 0 ? void 0 : channel.myMemberState) !== 'joined') {
          return false;
        }

        break;

      case 'invited_only':
        if ((channel === null || channel === void 0 ? void 0 : channel.myMemberState) !== 'invited') {
          return false;
        }

        break;

      case 'invited_by_friend':
        if ((channel === null || channel === void 0 ? void 0 : channel.myMemberState) !== 'invited' || !isFriend(channel.inviter)) {
          return false;
        }

        break;

      case 'invited_by_non_friend':
        if ((channel === null || channel === void 0 ? void 0 : channel.myMemberState) !== 'invited' || isFriend(channel.inviter)) {
          return false;
        }

        break;
    }
  }

  if (params === null || params === void 0 ? void 0 : params.hiddenChannelFilter) {
    switch (params.hiddenChannelFilter) {
      case 'unhidden_only':
        if ((channel === null || channel === void 0 ? void 0 : channel.isHidden) || (channel === null || channel === void 0 ? void 0 : channel.hiddenState) !== 'unhidden') {
          return false;
        }

        break;

      case 'hidden_only':
        if (!(channel === null || channel === void 0 ? void 0 : channel.isHidden)) {
          return false;
        }

        break;

      case 'hidden_allow_auto_unhide':
        if (!(channel === null || channel === void 0 ? void 0 : channel.isHidden) || (channel === null || channel === void 0 ? void 0 : channel.hiddenState) !== 'hidden_allow_auto_unhide') {
          return false;
        }

        break;

      case 'hidden_prevent_auto_unhide':
        if (!(channel === null || channel === void 0 ? void 0 : channel.isHidden) || (channel === null || channel === void 0 ? void 0 : channel.hiddenState) !== 'hidden_prevent_auto_unhide') {
          return false;
        }

        break;
    }
  }

  if (params === null || params === void 0 ? void 0 : params.unreadChannelFilter) {
    switch (params.unreadChannelFilter) {
      case 'unread_message':
        if ((channel === null || channel === void 0 ? void 0 : channel.unreadMessageCount) === 0) {
          return false;
        }

        break;
    }
  }

  if (params === null || params === void 0 ? void 0 : params.publicChannelFilter) {
    switch (params.publicChannelFilter) {
      case 'public':
        if (!(channel === null || channel === void 0 ? void 0 : channel.isPublic)) {
          return false;
        }

        break;

      case 'private':
        if (channel === null || channel === void 0 ? void 0 : channel.isPublic) {
          return false;
        }

        break;
    }
  }

  if (params === null || params === void 0 ? void 0 : params.superChannelFilter) {
    switch (params.superChannelFilter) {
      case 'super':
        if (!(channel === null || channel === void 0 ? void 0 : channel.isSuper)) {
          return false;
        }

        break;

      case 'nonsuper':
        if (channel === null || channel === void 0 ? void 0 : channel.isSuper) {
          return false;
        }

        break;
    }
  }

  return true;
};

var binarySearch = function binarySearch(list, number) {
  var pivot = Math.floor(list.length / 2);

  if (list[pivot] === number) {
    return pivot;
  }

  var leftList = list.slice(0, pivot);
  var rightList = list.slice(pivot + 1, list.length);

  if (list[pivot] > number) {
    if (rightList.length === 0) {
      return pivot + 1;
    }

    return pivot + binarySearch(rightList, number);
  } else {
    if (leftList.length === 0) {
      return pivot;
    }

    return binarySearch(leftList, number);
  }
}; // This is required when channel is displayed on channel list by filter


var getChannelsWithUpsertedChannel = function getChannelsWithUpsertedChannel(channels, channel) {
  var _a;

  if (channels.some(function (ch) {
    return ch.url === channel.url;
  })) {
    return channels.map(function (ch) {
      return ch.url === channel.url ? channel : ch;
    });
  }

  var targetIndex = binarySearch(channels.map(function (channel) {
    var _a;

    return (_a = channel === null || channel === void 0 ? void 0 : channel.lastMessage) === null || _a === void 0 ? void 0 : _a.createdAt;
  }), (_a = channel === null || channel === void 0 ? void 0 : channel.lastMessage) === null || _a === void 0 ? void 0 : _a.createdAt);
  return __spreadArray(__spreadArray(__spreadArray([], channels.slice(0, targetIndex + 1)), [channel]), channels.slice(targetIndex + 1, channels.length));
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
var getIsSentFromStatus = function getIsSentFromStatus(status) {
  return status === MessageStatusType.SENT || status === MessageStatusType.DELIVERED || status === MessageStatusType.READ;
};
var getIsSentFromSendingStatus = function getIsSentFromSendingStatus() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (message.sendingStatus && typeof message.sendingStatus === 'string') {
    return message.sendingStatus === 'none' || message.sendingStatus === 'succeeded';
  }

  return false;
};

export { filterMessageListParams as a, getIsSentFromSendingStatus as b, getIsSentFromStatus as c, filterChannelListParams as f, getChannelsWithUpsertedChannel as g, truncate as t };
//# sourceMappingURL=utils-818b10da.js.map
