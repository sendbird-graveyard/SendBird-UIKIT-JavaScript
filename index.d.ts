import { SendbirdTypes } from './types';

interface SendBirdStateConfig {
  disableUserProfile: boolean;
  renderUserProfile(props: RenderUserProfileProps): React.ReactNode;
  allowProfileEdit: boolean;
  isOnline: boolean;
  userId: string;
  appId: string;
  accessToken: string;
  theme: string;
  setCurrenttheme: (theme: string) => void;
  userListQuery?(): UserListQuery;
}

interface SdkStore {
  error: boolean;
  initialized: boolean;
  loading: boolean;
  sdk: SendbirdTypes['SendBirdInstance'];
}

interface UserStore {
  initialized: boolean;
  loading: boolean;
  user: SendbirdTypes['User'];
}

interface SendBirdStateStore {
  sdkStore: SdkStore;
  userStore: UserStore;
}

interface SendBirdState {
  config: SendBirdStateConfig;
  store: SendBirdStateStore;
}

interface RenderUserProfileProps {
  user: SendbirdTypes['Member'] | SendbirdTypes['User'];
  currentUserId: string;
  close(): void;
}

interface UserListQuery {
  hasNext?: boolean;
  next(callback: unknown): void;
}

interface SendBirdProviderConfig {
  logLevel?: 'debug' | 'warning' | 'error' | 'info' | 'all' | [string];
}

interface RenderChannelProfileProps {
  channel: SendbirdTypes['GroupChannel'];
}

interface RenderUserProfileProps {
  user: SendbirdTypes['User' | 'Member'];
  currentUserId: string;
  close(): void;
}

interface ApplicationUserListQuery {
  limit?: number;
  userIdsFilter?: [string];
  metaDataKeyFilter?: string;
  metaDataValuesFilter?: [string];
}

interface ChannelSettingsQueries {
  applicationUserListQuery?: ApplicationUserListQuery;
}

interface GroupChannelListQuery {
  limit?: number;
  includeEmpty?: boolean;
  order?: 'latest_last_message' | 'chronological' | 'channel_name_alphabetical' | 'metadata_value_alphabetical';
  userIdsExactFilter?: [string];
  userIdsIncludeFilter?: [string];
  userIdsIncludeFilterQueryType?: 'AND' | 'OR';
  nicknameContainsFilter?: string;
  channelNameContainsFilter?: string;
  customTypesFilter?: [string];
  customTypeStartsWithFilter?: string;
  channelUrlsFilter?: [string];
  superChannelFilter?: 'all' | 'super' | 'nonsuper';
  publicChannelFilter?: 'all' | 'public' | 'private';
  metadataOrderKeyFilter?: string;
  memberStateFilter?: 'all' | 'joined_only' | 'invited_only' | 'invited_by_friend' | 'invited_by_non_friend';
  hiddenChannelFilter?: 'unhidden_only' | 'hidden_only' | 'hidden_allow_auto_unhide' | 'hidden_prevent_auto_unhide';
  unreadChannelFilter?: 'all' | 'unread_message';
  includeFrozen?: boolean;
}

interface MessageListParams {
  prevResultSize?: number;
  nextResultSize?: number;
  isInclusive?: boolean;
  shouldReverse?: boolean;
  messageType?: string;
  customType?: string;
  senderUserIds?: [string];
  includeMetaArray?: boolean;
  includeReactions?: boolean;
  includeReplies?: boolean;
  includeParentMessageText?: boolean;
  includeThreadInfo?: boolean;
}

interface ChannelListQueries {
  applicationUserListQuery?: ApplicationUserListQuery;
  channelListQuery?: GroupChannelListQuery;
}

interface ChannelQueries {
  messageListParams?: MessageListParams;
}

interface RenderChannelPreviewProps {
  channel: SendbirdTypes['GroupChannel'];
  onLeaveChannel(
    channel: SendbirdTypes['GroupChannel'],
    onLeaveChannelCb?: (c: SendbirdTypes['GroupChannel']) => void,
  );
}

interface EmojiContainer {
  emojiCategories: Array<SendbirdTypes['EmojiCategory']>;
  emojiHash: string;
}

interface RenderChatItemProps {
  message: SendbirdTypes['BaseMessageInstance'];
  channel: SendbirdTypes['GroupChannel'];
  onDeleteMessage(
    message: SendbirdTypes['BaseMessageInstance'],
    onDeleteCb: () => void,
  );
  onUpdateMessage(
    messageId: string,
    text: string,
    onUpdateCb: (
      err: SendbirdTypes['SendBirdError'],
      message: SendbirdTypes['UserMessage']
    ) => void,
  );
  onResendMessage: (failedMessage: SendbirdTypes['BaseMessageInstance']) => void;
  emojiContainer: EmojiContainer;
}

interface RenderMessageInputProps {
  channel: SendbirdTypes['BaseMessageInstance'];
  user: SendbirdTypes['User'];
  disabled: boolean;
}

interface RenderChatHeaderProps {
  channel: SendbirdTypes['GroupChannel'];
  user: SendbirdTypes['User'];
}

declare namespace SendbirdUIKit {
  interface SendBirdProvider {
    userId: string;
    appId: string;
    accessToken?: string;
    children?: React.ReactNode;
    theme?: 'light' | 'dark';
    nickname?: string;
    profileUrl?: string;
    disableUserProfile?: boolean;
    renderUserProfile?(props: RenderUserProfileProps): React.ReactNode;
    allowProfileEdit?: boolean;
    userListQuery?(): UserListQuery;
    config?: SendBirdProviderConfig;
    colorSet?: Record<string, string>;
  }

  interface App {
    appId: string;
    userId: string;
    accessToken?: string;
    theme?: string;
    userListQuery?(): UserListQuery;
    nickname?: string;
    profileUrl?: string;
    allowProfileEdit?: boolean;
    disableUserProfile?: boolean;
    renderUserProfile?(props: RenderUserProfileProps): React.ReactNode;
    onProfileEditSuccess?(user: SendbirdTypes['User']): void;
    config?: SendBirdProviderConfig;
    useReaction?: boolean;
    useMessageGrouping?: boolean;
  }

  interface ChannelSettings {
    channelUrl: string;
    disableUserProfile?: boolean;
    onCloseClick?(): void;
    onChannelModified?(channel: SendbirdTypes['GroupChannel']): void;
    onBeforeUpdateChannel?(currentTitle: string, currentImg: File, data: string): SendbirdTypes['GroupChannelParams'];
    renderChannelProfile?(props: RenderChannelProfileProps): React.ReactNode;
    renderUserProfile?(props: RenderUserProfileProps): React.ReactNode;
    queries?: ChannelSettingsQueries;
  }

  interface ChannelList {
    disableUserProfile?: boolean;
    allowProfileEdit?: boolean;
    onBeforeCreateChannel?(users: [string]): SendbirdTypes['GroupChannelParams'];
    onThemeChange?(theme: string): void;
    onProfileEditSuccess?(user: SendbirdTypes['User']): void;
    onChannelSelect?(channel: SendbirdTypes['GroupChannel']): void;
    renderChannelPreview?(props: RenderChannelPreviewProps): React.ReactNode;
    renderUserProfile?(props: RenderUserProfileProps): React.ReactNode;
    renderHeader?(props: void): React.ReactNode;
    queries?: ChannelListQueries;
  }

  interface Channel {
    channelUrl: string;
    disableUserProfile?: boolean,
    useMessageGrouping?: boolean,
    useReaction?: boolean,
    onBeforeSendUserMessage?(text: string): SendbirdTypes['UserMessageParams'];
    onBeforeSendFileMessage?(file: File): SendbirdTypes['FileMessageParams'];
    onBeforeUpdateUserMessage?(text: string): SendbirdTypes['UserMessageParams'];
    onChatHeaderActionClick?(event: React.MouseEvent<HTMLElement>): void;
    renderChatItem?(props: RenderChatItemProps): React.ReactNode;
    renderMessageInput?(props: RenderMessageInputProps): React.ReactNode;
    renderChatHeader?(props: RenderChatHeaderProps): React.ReactNode;
    renderUserProfile?(props: RenderUserProfileProps): React.ReactNode;
    queries?: ChannelQueries;
  }

  function withSendBird(
    ChildComp: React.Component,
    mapStoreToProps?: (store: SendBirdState) => unknown
  ): React.ReactNode;

  interface sendBirdSelectors {
    getSdk: (store: SendBirdState) => SendbirdTypes['SendBirdInstance'];
    getConnect: (store: SendBirdState)
      => (userId: string, accessToken?: string)
      => Promise<SendbirdTypes['User']>;
    getDisconnect: (store: SendBirdState) => () => Promise<void>;
    getUpdateUserInfo: (store: SendBirdState)
      => (nickName: string, profileUrl?: string)
      => Promise<SendbirdTypes['User']>;
    getSendUserMessage: (store: SendBirdState)
      => (channelUrl: string, userMessageParams: SendbirdTypes['UserMessageParams'])
      => Promise<SendbirdTypes['UserMessage']>; // promise chain here
    getSendFileMessage: (store: SendBirdState)
      => (channelUrl: string, fileMessageParams: SendbirdTypes['FileMessageParams'])
      => Promise<SendbirdTypes['FileMessage']>; // promise chain here
    getUpdateUserMessage: (store: SendBirdState)
      => (channelUrl: string, messageId: string, params: SendbirdTypes['UserMessageParams'])
      => Promise<SendbirdTypes['UserMessage']>;
    getDeleteMessage: (store: SendBirdState)
      => (channelUrl: string, message: SendbirdTypes['BaseMessageInstance'])
      => Promise<void>;
    getResendUserMessage: (store: SendBirdState)
      => (channelUrl: string, failedMessage: SendbirdTypes['UserMessage'])
      => Promise<SendbirdTypes['UserMessage']>;
    getResendFileMessage: (store: SendBirdState)
      => (channelUrl: string, failedMessage: SendbirdTypes['FileMessage'])
      => Promise<SendbirdTypes['FileMessage']>;
    getFreezeChannel: (store: SendBirdState)
      => (channelUrl: string)
      => Promise<SendbirdTypes['GroupChannel']>;
    getUnFreezeChannel: (store: SendBirdState)
      => (channelUrl: string)
      => Promise<SendbirdTypes['GroupChannel']>;
    getCreateChannel: (store: SendBirdState)
      => (channelParams: SendbirdTypes['GroupChannelParams'])
      => Promise<SendbirdTypes['GroupChannel']>;
    getLeaveChannel: (store: SendBirdState)
      => (channelUrl: string)
      => Promise<SendbirdTypes['GroupChannel']>;
  }
}
