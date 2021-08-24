export { default as SendBirdProvider } from './SendbirdProvider.js';
export { default as App } from './App.js';
export { default as ChannelSettings } from './ChannelSettings.js';
export { default as ChannelList } from './ChannelList.js';
export { default as Channel, getAllEmojisFromEmojiContainer, getEmojiCategoriesFromEmojiContainer, getEmojisFromEmojiContainer } from './Channel.js';
import { S as SendbirdSdkContext } from './LocalizationContext-ec52e278.js';
export { g as getStringSet, w as withSendBird } from './LocalizationContext-ec52e278.js';
export { default as OpenChannel } from './OpenChannel.js';
export { default as OpenChannelSettings } from './OpenChannelSettings.js';
export { default as MessageSearch } from './MessageSearch.js';
export { s as sendBirdSelectors } from './index-e9eccbb4.js';
import { useContext } from 'react';
import 'prop-types';
import 'sendbird';
import './actionTypes-f052f6d4.js';
import 'css-vars-ponyfill';
import './index-4456ba1e.js';
import './LeaveChannel-9cf98d2b.js';
import './index-38e21fef.js';
import './index-3e543129.js';
import './utils-eb6e2fbe.js';
import './index-8a482fc5.js';
import './utils-818b10da.js';
import './type-d77d0e67.js';
import './index-352ec442.js';
import './index-a8ebe06c.js';
import './index-65112a6a.js';
import 'react-dom';
import './utils-cf944c28.js';

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
