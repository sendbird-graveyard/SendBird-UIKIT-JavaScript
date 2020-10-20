export interface SendbirdTypes {
  GroupChannel: import('sendbird').GroupChannel;
  GroupChannelParams: import('sendbird').GroupChannelParams;
  BaseChannel: import('sendbird').BaseChannel;
  Member: import('sendbird').Member;
  User: import('sendbird').User;
  UserMessageParams: import('sendbird').UserMessageParams;
  FileMessageParams: import('sendbird').FileMessageParams;
  SendBirdInstance: import('sendbird').SendBirdInstance;
  UserListQuery: import('sendbird').UserListQuery;
  BaseMessageInstance: import('sendbird').BaseMessageInstance;
  UserMessage: import('sendbird').UserMessage;
  FileMessage: import('sendbird').FileMessage;
  EmojiCategory: import('sendbird').EmojiCategory;
  SendBirdError: import('sendbird').SendBirdError;
}

// to be used with Conversation.renderMessageInput
export interface RenderMessageInputProps {
  channel: SendbirdTypes["GroupChannel"];
  user: SendbirdTypes["User"];
  disabled: boolean;
}
