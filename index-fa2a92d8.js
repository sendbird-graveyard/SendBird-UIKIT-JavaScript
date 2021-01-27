import React, { useMemo } from 'react';
import { I as Icon, a as IconTypes, A as Avatar } from './index-c97add1b.js';
import { u as useDefaultAvatar, g as getChannelAvatarSource } from './utils-53ba1773.js';

function ChannelAvatar(_a) {
  var channel = _a.channel,
      userId = _a.userId,
      theme = _a.theme,
      _b = _a.height,
      height = _b === void 0 ? 56 : _b,
      _c = _a.width,
      width = _c === void 0 ? 56 : _c;
  var isBroadcast = channel.isBroadcast;
  var memoizedAvatar = useMemo(function () {
    return isBroadcast ? useDefaultAvatar(channel) ? theme === 'dark' ? React.createElement(Icon, {
      type: IconTypes.BROADCAST_LARGE_DARK,
      width: width,
      height: height,
      className: "sendbird-chat-header__default--broadcast-channel-dark"
    }) : React.createElement(Icon, {
      type: IconTypes.BROADCAST_LARGE_LIGHT,
      width: width,
      height: height,
      className: "sendbird-chat-header__default--broadcast-channel-light"
    }) : React.createElement(Avatar, {
      className: "sendbird-chat-header__avatar--broadcast-channel",
      src: getChannelAvatarSource(channel, userId),
      width: width,
      height: height,
      alt: channel.name
    }) : React.createElement(Avatar, {
      className: "sendbird-chat-header__avatar--group-channel",
      src: getChannelAvatarSource(channel, userId),
      width: width + "px",
      height: height + "px",
      alt: channel.name
    });
  }, [channel.members, channel.coverUrl, theme]);
  return React.createElement(React.Fragment, null, memoizedAvatar);
}

export { ChannelAvatar as C };
//# sourceMappingURL=index-fa2a92d8.js.map
