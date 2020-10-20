// sendbird provider component to handle sdk connection and data
export SendBirdProvider from './lib/Sendbird';

// complete app component - If user wants an out of the box solution
export App from './smart-components/App/index';

// Individual smart components
// - say user want to show only a specific channel use <Conversation {channelUrl} />
export ChannelSettings from './smart-components/ChannelSettings';
export ChannelList from './smart-components/ChannelList';
export Channel, {
  getEmojiCategoriesFromEmojiContainer,
  getAllEmojisFromEmojiContainer,
  getEmojisFromEmojiContainer,
} from './smart-components/Conversation';
export getStringSet from './ui/Label/stringSet';

// HOC for using ui-kit state
// withBird(MyCustomComponent) will give the sendbird state as props to MyCustomComponent
export withSendBird from './lib/SendbirdSdkContext';
export sendBirdSelectors from './lib/selectors';
