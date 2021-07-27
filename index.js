export { default as SendBirdProvider } from './SendbirdProvider.js';
export { default as App } from './App.js';
export { default as ChannelSettings } from './ChannelSettings.js';
export { default as ChannelList } from './ChannelList.js';
export { default as Channel, getAllEmojisFromEmojiContainer, getEmojiCategoriesFromEmojiContainer, getEmojisFromEmojiContainer } from './Channel.js';
import { S as SendbirdSdkContext } from './LocalizationContext-5502b61d.js';
export { g as getStringSet, w as withSendBird } from './LocalizationContext-5502b61d.js';
export { default as OpenChannel } from './OpenChannel.js';
export { default as OpenChannelSettings } from './OpenChannelSettings.js';
export { default as MessageSearch } from './MessageSearch.js';
export { s as sendBirdSelectors } from './index-bd743b97.js';
import { useContext } from 'react';
import 'prop-types';
import 'sendbird';
import './actionTypes-fc3fc1c2.js';
import 'css-vars-ponyfill';
import './index-4fb99a01.js';
import './LeaveChannel-352fa9f0.js';
import './index-66022763.js';
import './index-cbd77cfb.js';
import './utils-9606270f.js';
import './index-d7577123.js';
import './index-786e1490.js';
import './index-0a658dd3.js';
import './utils-3464ac37.js';
import './type-cfe68896.js';
import './index-586eeef1.js';
import 'react-dom';
import './utils-9ee7329c.js';

/**
 * Example:
 * const MyComponent = () => {
 *  const context = useSendbirdStateContext();
 *  const sdk = sendbirdSelectors.getSdk(context);
 *  return (<div>...</div>);
 * }
 */

function useSendbirdStateContext() {
  var context = useContext(SendbirdSdkContext);
  return context;
}

export { useSendbirdStateContext };
//# sourceMappingURL=index.js.map
