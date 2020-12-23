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
export const sendBirdSelectors: sendBirdSelectorsInterface;
export const ChannelSettings: React.FunctionComponent<ChannelSettingsProps>
export const ChannelList: React.FunctionComponent<ChannelListProps>
export const Channel: React.FunctionComponent<ChannelProps>
export const OpenChannel: React.FunctionComponent<OpenChannelProps>
export const OpenChannelSettings: React.FunctionComponent<OpenChannelSettingsProps>
export function withSendBird (
  ChildComp: React.Component | React.ElementType,
  mapStoreToProps?: (store: SendBirdState) => unknown
): (props: unknown) => React.ReactNode;

export type SendBirdState  = {
  config: SendBirdStateConfig;
  stores: SendBirdStateStore;
}
export namespace SendBirdSelectors {
  type GetSdk = Sendbird.SendBirdInstance | undefined;
  type GetConnect = (
    userId: string,
    accessToken?: string
  ) => Promise<Sendbird.User>;
  type GetDisconnect = () => Promise<void>;
  type GetUpdateUserInfo = (
    nickName: string,
    profileUrl?: string
  ) => Promise<Sendbird.User>;
  type GetSendUserMessage = (
    channelUrl: string,
    userMessageParams: Sendbird.UserMessageParams
  ) => Promise<Sendbird.UserMessage>;
  type GetSendFileMessage = (
    channelUrl: string,
    fileMessageParams: Sendbird.FileMessageParams
  ) => Promise<Sendbird.FileMessage>;
  type GetUpdateUserMessage = (
    channelUrl: string,
    messageId: string|number,
    params: Sendbird.UserMessageParams
  ) => Promise<Sendbird.UserMessage>;
  type GetDeleteMessage = (
    channelUrl: string,
    message: SendBird.AdminMessage | SendBird.UserMessage | SendBird.FileMessage
  ) => Promise<void>;
  type GetResendUserMessage = (
    channelUrl: string,
    failedMessage: Sendbird.UserMessage
  ) => Promise<Sendbird.UserMessage>;
  type GetResendFileMessage = (
    channelUrl: string,
    failedMessage: Sendbird.FileMessage
  ) => Promise<Sendbird.FileMessage>;
  type GetFreezeChannel = (channelUrl: string) => Promise<Sendbird.GroupChannel>;
  type GetUnFreezeChannel = (channelUrl: string) => Promise<Sendbird.GroupChannel>;
  type GetCreateChannel = (channelParams: Sendbird.GroupChannelParams) => Promise<Sendbird.GroupChannel>;
  type GetLeaveChannel = (channelUrl: string) => Promise<Sendbird.GroupChannel>;
}
export function getStringSet(lang?: string): {[label: string]: string}

export type Logger = {
  info?(title?: unknown, description?: unknown): void;
  error?(title?: unknown, description?: unknown): void;
  warning?(title?: unknown, description?: unknown): void;
};

export interface RenderOpenChannelTitleProps {
  channel: Sendbird.OpenChannel;
  user: Sendbird.User;
}

export interface OpenChannelProps {
  channelUrl: string;
  useMessageGrouping?: boolean;
  queries?: {
    messageListParams?: Sendbird.MessageListParams,
  };
  disableUserProfile?: boolean;
  fetchingParticipants: boolean;
  renderCustomMessage?: RenderCustomMessage;
  renderUserProfile?(): JSX.Element;
  renderChannelTitle?(renderProps: RenderOpenChannelTitleProps): JSX.Element;
  renderMessageInput?(renderProps: RenderMessageInputProps): JSX.Element;
  onBeforeSendUserMessage?(text: string): Sendbird.UserMessageParams;
  onBeforeSendFileMessage?(file_: File): Sendbird.FileMessageParams;
  onChatHeaderActionClick?(): void;
}

interface OpenChannelSettingsProps {
  channelUrl: string,
  onCloseClick?(): void;
  onBeforeUpdateChannel?(currentTitle: string, currentImg: File, data: string): Sendbird.OpenChannelParams;
  onChannelModified?(channel: Sendbird.OpenChannel): void;
  renderChannelProfile?: (props: SendbirdUIKit.RenderOpenChannelProfileProps) => React.ReactNode;
  renderUserProfile?: (props: SendbirdUIKit.RenderUserProfileProps) => React.ReactNode;
  disableUserProfile?: boolean;
}

// to be used with Conversation.renderMessageInput
export interface RenderMessageInputProps {
  channel: Sendbird.GroupChannel|Sendbird.OpenChannel;
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
export interface SdkStore {
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
  logLevel?: 'debug' | 'warning' | 'error' | 'info' | 'all' | string[];
}
interface RenderChannelProfileProps {
  channel: Sendbird.GroupChannel;
}

interface RenderOpenChannelProfileProps {
  channel: Sendbird.OpenChannel;
  user: Sendbird.User;
}
interface RenderUserProfileProps {
  user: Sendbird.User | Sendbird.Member;
  currentUserId: string;
  close(): void;
}
interface ApplicationUserListQuery {
  limit?: number;
  userIdsFilter?: string[];
  metaDataKeyFilter?: string;
  metaDataValuesFilter?: string[];
}
interface ChannelSettingsQueries {
  applicationUserListQuery?: ApplicationUserListQuery;
}
interface GroupChannelListQuery {
  limit?: number;
  includeEmpty?: boolean;
  order?: 'latest_last_message' | 'chronological' | 'channel_name_alphabetical' | 'metadata_value_alphabetical';
  userIdsExactFilter?: string[];
  userIdsIncludeFilter?: string[];
  userIdsIncludeFilterQueryType?: 'AND' | 'OR';
  nicknameContainsFilter?: string;
  channelNameContainsFilter?: string;
  customTypesFilter?: string[];
  customTypeStartsWithFilter?: string;
  channelUrlsFilter?: string[];
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
  senderUserIds?: string[];
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
    messageId: string | number,
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
  stringSet?: Record<string, string>;
  colorSet?: Record<string, string>;
}
interface ChannelListProps {
  disableUserProfile?: boolean;
  allowProfileEdit?: boolean;
  onBeforeCreateChannel?(users: string[]): Sendbird.GroupChannelParams;
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
  renderCustomMessage?: RenderCustomMessage;
  renderChatItem?: (props: RenderChatItemProps) => React.ReactNode;
  renderMessageInput?: (props: RenderMessageInputProps) => React.ReactNode;
  renderChatHeader?: (props: RenderChatHeaderProps) => React.ReactNode;
  renderUserProfile?: (props: RenderUserProfileProps) => React.ReactNode;
  queries?: ChannelQueries;
}
interface sendBirdSelectorsInterface {
  getSdk: (store: SendBirdState) => SendBirdSelectors.GetSdk;
  getConnect: (store: SendBirdState) => SendBirdSelectors.GetConnect
  getDisconnect: (store: SendBirdState) => SendBirdSelectors.GetDisconnect;
  getUpdateUserInfo: (store: SendBirdState) => SendBirdSelectors.GetUpdateUserInfo;
  getSendUserMessage: (store: SendBirdState) => SendBirdSelectors.GetSendUserMessage;
  getSendFileMessage: (store: SendBirdState) => SendBirdSelectors.GetSendFileMessage;
  getUpdateUserMessage: (store: SendBirdState) => SendBirdSelectors.GetUpdateUserMessage;
  getDeleteMessage: (store: SendBirdState) => SendBirdSelectors.GetDeleteMessage;
  getResendUserMessage: (store: SendBirdState) => SendBirdSelectors.GetResendUserMessage;
  getResendFileMessage: (store: SendBirdState) => SendBirdSelectors.GetResendFileMessage;
  getFreezeChannel: (store: SendBirdState) => SendBirdSelectors.GetFreezeChannel;
  getUnFreezeChannel: (store: SendBirdState) => SendBirdSelectors.GetUnFreezeChannel;
  getCreateChannel: (store: SendBirdState) => SendBirdSelectors.GetCreateChannel;
  getLeaveChannel: (store: SendBirdState) => SendBirdSelectors.GetLeaveChannel;
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
  theme?: 'light' | 'dark';
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
  stringSet?: Record<string, string>;
  colorSet?: Record<string, string>;
}

export type EveryMessage = ClientUserMessage|ClientFileMessage|ClientAdminMessage;

export interface ClientUserMessage extends Sendbird.UserMessage, ClientMessage {}
export interface ClientFileMessage extends Sendbird.FileMessage, ClientMessage {}
export interface ClientAdminMessage extends Sendbird.AdminMessage, ClientMessage {}
interface ClientMessage {
  reqId: string;
  file?: File;
  localUrl?: string;
  _sender: Sendbird.User;
}

type RenderCustomMessage  = (
  message: EveryMessage,
  channel: Sendbird.OpenChannel | Sendbird.GroupChannel,
) => RenderCustomMessageProps;

type RenderCustomMessageProps = ({ message: EveryMessage }) => React.ReactElement;
