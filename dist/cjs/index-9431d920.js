'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var index = require('./index-2a2230b8.js');
var utils = require('./utils-6aedec02.js');

function ChannelAvatar(_a) {
  var channel = _a.channel,
      userId = _a.userId,
      theme = _a.theme,
      _b = _a.height,
      height = _b === void 0 ? 56 : _b,
      _c = _a.width,
      width = _c === void 0 ? 56 : _c;
  var isBroadcast = channel.isBroadcast;
  var memoizedAvatar = React.useMemo(function () {
    return isBroadcast ? utils.useDefaultAvatar(channel) ? React__default.createElement("div", {
      className: "sendbird-chat-header__default-avatar",
      style: {
        width: width,
        height: height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
    }, React__default.createElement(index.Icon, {
      type: index.IconTypes.BROADCAST,
      fillColor: index.IconColors.CONTENT,
      width: width * 0.575,
      height: height * 0.575
    })) : React__default.createElement(index.Avatar, {
      className: "sendbird-chat-header__avatar--broadcast-channel",
      src: utils.getChannelAvatarSource(channel, userId),
      width: width,
      height: height,
      alt: channel.name
    }) : React__default.createElement(index.Avatar, {
      className: "sendbird-chat-header__avatar--group-channel",
      src: utils.getChannelAvatarSource(channel, userId),
      width: width + "px",
      height: height + "px",
      alt: channel.name
    });
  }, [channel.members, channel.coverUrl, theme]);
  return React__default.createElement(React__default.Fragment, null, memoizedAvatar);
}

exports.ChannelAvatar = ChannelAvatar;
//# sourceMappingURL=index-9431d920.js.map
