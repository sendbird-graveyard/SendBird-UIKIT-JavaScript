export { default as SendBirdProvider } from './SendbirdProvider.js';
export { default as App } from './App.js';
export { default as ChannelSettings } from './ChannelSettings.js';
export { default as ChannelList } from './ChannelList.js';
export { default as Channel, getAllEmojisFromEmojiContainer, getEmojiCategoriesFromEmojiContainer, getEmojisFromEmojiContainer } from './Channel.js';
import { S as SendbirdSdkContext } from './LocalizationContext-61e3c047.js';
export { g as getStringSet, w as withSendBird } from './LocalizationContext-61e3c047.js';
export { default as OpenChannel } from './OpenChannel.js';
export { default as OpenChannelSettings } from './OpenChannelSettings.js';
export { default as MessageSearch } from './MessageSearch.js';
export { s as sendBirdSelectors } from './index-1ab03a57.js';
import { useContext } from 'react';
import 'prop-types';
import 'sendbird';
import './actionTypes-96bd4f9a.js';
import 'css-vars-ponyfill';
import './index-596c5f0c.js';
import './LeaveChannel-6efa8681.js';
import './index-da803cf5.js';
import './index-8a5ef965.js';
import './utils-07256c7e.js';
import './index-3119618e.js';
import './utils-7d975c75.js';
import './type-58833f13.js';
import './index-3a4f8133.js';
import './index-cd260eec.js';
import './index-8c25373a.js';
import 'react-dom';
import './utils-046f9fef.js';

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
