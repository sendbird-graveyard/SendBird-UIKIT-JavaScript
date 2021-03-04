import { S as SendbirdSdkContext } from './LocalizationContext-34316336.js';
export { g as getStringSet, w as withSendBird } from './LocalizationContext-34316336.js';
export { default as SendBirdProvider } from './SendbirdProvider.js';
import { useContext } from 'react';
import 'prop-types';
import 'sendbird';
import './actionTypes-a85c0eaa.js';
import 'css-vars-ponyfill';
export { F as sendBirdSelectors } from './index-79d744e1.js';
export { default as ChannelList } from './ChannelList.js';
import './index-cee71d44.js';
import './utils-53ba1773.js';
import './LeaveChannel-42e6a67d.js';
import 'date-fns/isToday';
import 'date-fns/format';
import 'date-fns/isYesterday';
import './type-0296584d.js';
import './utils-cfdeb084.js';
import 'react-dom';
import './index-49dfd24f.js';
export { default as Channel, getAllEmojisFromEmojiContainer, getEmojiCategoriesFromEmojiContainer, getEmojisFromEmojiContainer } from './Channel.js';
import './index-5b744991.js';
import 'date-fns/isSameDay';
import './utils-d7f59026.js';
import 'date-fns/formatDistanceToNowStrict';
export { default as ChannelSettings } from './ChannelSettings.js';
import './index-cb09a8ab.js';
export { default as App } from './App.js';
export { default as OpenChannel } from './OpenChannel.js';
export { default as OpenChannelSettings } from './OpenChannelSettings.js';

function useSendbirdStateContext() {
  var context = useContext(SendbirdSdkContext);
  return context;
}

export { useSendbirdStateContext };
//# sourceMappingURL=index.js.map
