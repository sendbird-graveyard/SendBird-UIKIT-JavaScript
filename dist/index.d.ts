/**
 * Type Definitions for SendbirdUIKit 1.3.0-rc.3
 * homepage: https://sendbird.com/
 * git: https://github.com/sendbird/SendBird-UIKIT-JavaScript
 */
import React from 'react';
import Sendbird from 'sendbird';

export as namespace SendbirdUIKit;
export const App: React.FunctionComponent<AppProps>
export const SendBirdProvider: React.FunctionComponent<SendBirdProviderProps>
export const sendBirdSelectors: sendBirdSelectors;
export const ChannelSettings: React.FunctionComponent<ChannelSettingsProps>
export const ChannelList: React.FunctionComponent<ChannelListProps>
export const Channel: React.FunctionComponent<ChannelProps>
export function withSendBird(
  ChildComp: React.Component | React.ElementType,
  mapStoreToProps?: (store: SendBirdState) => unknown
): (props: unknown) => React.ReactNode;


// to be used with Conversation.renderMessageInput
interface RenderMessageInputProps {
  channel: Sendbird.GroupChannel;
  user: Sendbird.User;
  disabled: boolean;
}
interface SendBirdStateConfig {
  disableUserProfile: boolean;
  renderUserProfile?: (props: RenderUserProfileProps) => React.ReactNode;
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
  sdk: Sendbird.SendBirdInstance;
}
interface UserStore {
  initialized: boolean;
  loading: boolean;
  user: Sendbird.User;
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
  user: Sendbird.Member | Sendbird.User;
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
  channel: Sendbird.GroupChannel;
}
interface RenderUserProfileProps {
  user: Sendbird.User | Sendbird.Member;
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
  channel: Sendbird.GroupChannel;
  onLeaveChannel(
    channel: Sendbird.GroupChannel,
    onLeaveChannelCb?: (c: Sendbird.GroupChannel) => void,
  );
}
interface EmojiContainer {
  emojiCategories: Array<Sendbird.EmojiCategory>;
  emojiHash: string;
}
interface RenderChatItemProps {
  message: SendBird.UserMessage | SendBird.FileMessage | SendBird.AdminMessage;
  channel: Sendbird.GroupChannel;
  onDeleteMessage(
    message: SendBird.AdminMessage | SendBird.UserMessage | SendBird.FileMessage,
    onDeleteCb: () => void,
  );
  onUpdateMessage(
    messageId: string,
    text: string,
    onUpdateCb: (
      err: Sendbird.SendBirdError,
      message: Sendbird.UserMessage
    ) => void,
  );
  onResendMessage: (
    failedMessage: SendBird.AdminMessage | SendBird.UserMessage | SendBird.FileMessage
  ) => void;
  emojiContainer: EmojiContainer;
}
interface RenderChatHeaderProps {
  channel: Sendbird.GroupChannel;
  user: Sendbird.User;
}

interface SendBirdProviderProps {
  userId: string;
  appId: string;
  accessToken?: string;
  children?: React.ReactNode;
  theme?: 'light' | 'dark';
  nickname?: string;
  profileUrl?: string;
  disableUserProfile?: boolean;
  renderUserProfile?: (props: RenderUserProfileProps) => React.ReactNode;
  allowProfileEdit?: boolean;
  userListQuery?(): UserListQuery;
  config?: SendBirdProviderConfig;
  colorSet?: Record<string, string>;
}

interface ChannelListProps {
  disableUserProfile?: boolean;
  allowProfileEdit?: boolean;
  onBeforeCreateChannel?(users: [string]): Sendbird.GroupChannelParams;
  onThemeChange?(theme: string): void;
  onProfileEditSuccess?(user: Sendbird.User): void;
  onChannelSelect?(channel: Sendbird.GroupChannel): void;
  renderChannelPreview?: (props: RenderChannelPreviewProps) => React.ReactNode;
  renderUserProfile?: (props: RenderUserProfileProps) => React.ReactNode;
  renderHeader?: (props: void) => React.ReactNode;
  queries?: ChannelListQueries;
}

interface ChannelProps {
  channelUrl: string;
  disableUserProfile?: boolean,
  useMessageGrouping?: boolean,
  useReaction?: boolean,
  onBeforeSendUserMessage?(text: string): Sendbird.UserMessageParams;
  onBeforeSendFileMessage?(file: File): Sendbird.FileMessageParams;
  onBeforeUpdateUserMessage?(text: string): Sendbird.UserMessageParams;
  onChatHeaderActionClick?(event: React.MouseEvent<HTMLElement>): void;
  renderChatItem?: (props: RenderChatItemProps) => React.ReactNode;
  renderMessageInput?: (props: RenderMessageInputProps) => React.ReactNode;
  renderChatHeader?: (props: RenderChatHeaderProps) => React.ReactNode;
  renderUserProfile?: (props: RenderUserProfileProps) => React.ReactNode;
  queries?: ChannelQueries;
}

interface sendBirdSelectors {
  getSdk: (store: SendBirdState) => Sendbird.SendBirdInstance;
  getConnect: (store: SendBirdState)
    => (userId: string, accessToken?: string)
    => Promise<Sendbird.User>;
  getDisconnect: (store: SendBirdState) => () => Promise<void>;
  getUpdateUserInfo: (store: SendBirdState)
    => (nickName: string, profileUrl?: string)
    => Promise<Sendbird.User>;
  getSendUserMessage: (store: SendBirdState)
    => (channelUrl: string, userMessageParams: Sendbird.UserMessageParams)
    => Promise<Sendbird.UserMessage>; // promise chain here
  getSendFileMessage: (store: SendBirdState)
    => (channelUrl: string, fileMessageParams: Sendbird.FileMessageParams)
    => Promise<Sendbird.FileMessage>; // promise chain here
  getUpdateUserMessage: (store: SendBirdState)
    => (channelUrl: string, messageId: string, params: Sendbird.UserMessageParams)
    => Promise<Sendbird.UserMessage>;
  getDeleteMessage: (store: SendBirdState)
    => (
      channelUrl: string,
      message: SendBird.AdminMessage | SendBird.UserMessage | SendBird.FileMessage
    ) => Promise<void>;
  getResendUserMessage: (store: SendBirdState)
    => (channelUrl: string, failedMessage: Sendbird.UserMessage)
    => Promise<Sendbird.UserMessage>;
  getResendFileMessage: (store: SendBirdState)
    => (channelUrl: string, failedMessage: Sendbird.FileMessage)
    => Promise<Sendbird.FileMessage>;
  getFreezeChannel: (store: SendBirdState)
    => (channelUrl: string)
    => Promise<Sendbird.GroupChannel>;
  getUnFreezeChannel: (store: SendBirdState)
    => (channelUrl: string)
    => Promise<Sendbird.GroupChannel>;
  getCreateChannel: (store: SendBirdState)
    => (channelParams: Sendbird.GroupChannelParams)
    => Promise<Sendbird.GroupChannel>;
  getLeaveChannel: (store: SendBirdState)
    => (channelUrl: string)
    => Promise<Sendbird.GroupChannel>;
}

interface ChannelSettingsProps {
  channelUrl: string;
  disableUserProfile?: boolean;
  onCloseClick?(): void;
  onChannelModified?(channel: Sendbird.GroupChannel): void;
  onBeforeUpdateChannel?(currentTitle: string, currentImg: File, data: string): Sendbird.GroupChannelParams;
  renderChannelProfile?: (props: RenderChannelProfileProps) => React.ReactNode;
  renderUserProfile?: (props: RenderUserProfileProps) => React.ReactNode;
  queries?: ChannelSettingsQueries;
}

interface AppProps {
  appId: string;
  userId: string;
  accessToken?: string;
  theme?: string;
  userListQuery?(): UserListQuery;
  nickname?: string;
  profileUrl?: string;
  allowProfileEdit?: boolean;
  disableUserProfile?: boolean;
  renderUserProfile?: (props: RenderUserProfileProps) => React.ReactNode;
  onProfileEditSuccess?(user: Sendbird.User): void;
  config?: SendBirdProviderConfig;
  useReaction?: boolean;
  useMessageGrouping?: boolean;
}
