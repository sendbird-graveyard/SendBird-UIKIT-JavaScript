'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var format = _interopDefault(require('date-fns/format'));

var DEFAULT_URL_PREFIX = 'https://static.sendbird.com/sample/cover/cover_';
var getOpenChannelAvatar = function getOpenChannelAvatar(channel) {
  if (channel && channel.coverUrl) {
    return channel.coverUrl;
  }
};
var getChannelAvatarSource = function getChannelAvatarSource(channel, currentUserId) {
  if (channel && channel.coverUrl) {
    if (!new RegExp("^" + DEFAULT_URL_PREFIX).test(channel.coverUrl)) {
      return channel.coverUrl;
    }
  }

  return channel && channel.members ? channel.members.filter(function (member) {
    return member.userId !== currentUserId;
  }).map(function (_a) {
    var profileUrl = _a.profileUrl;
    return profileUrl;
  }) : [];
};
var useDefaultAvatar = function useDefaultAvatar(channel) {
  if (channel && channel.coverUrl) {
    if (new RegExp("^" + DEFAULT_URL_PREFIX).test(channel.coverUrl)) {
      return true;
    }

    return false;
  }

  return true;
};

var noop = function noop() {};
var getMessageCreatedAt = function getMessageCreatedAt(message) {
  return format(message.createdAt, 'p');
};
var getSenderName = function getSenderName(message) {
  return message.sender && (message.sender.friendName || message.sender.nickname || message.sender.userId);
};
var getSenderProfileUrl = function getSenderProfileUrl(message) {
  return message.sender && message.sender.profileUrl;
};

exports.getChannelAvatarSource = getChannelAvatarSource;
exports.getMessageCreatedAt = getMessageCreatedAt;
exports.getOpenChannelAvatar = getOpenChannelAvatar;
exports.getSenderName = getSenderName;
exports.getSenderProfileUrl = getSenderProfileUrl;
exports.noop = noop;
exports.useDefaultAvatar = useDefaultAvatar;
//# sourceMappingURL=utils-6aedec02.js.map
