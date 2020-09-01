# Changelog

## 1.2.1(Sept 01, 2020)

- Bugfixes:
  * Unordered message history
  * Message text break on middle of word

## 1.2.0(Aug 27, 2020)

- Features:
  * Add GroupChannel type selector UI to create channel
  * Ability to create supergroup(to be enabled from dashboard)
  * Channel creator will become operator user
  * Channel moderation for operator user
    * Mute user
    * Ban user
    * Promote/Demote other users to operator
    * Freeze/Unfreeze Channels
  * Visual indicators for different channel states in ChannelList
  * Visual indicators for MessageInput based on channel state

- Bugfixes:
  * Remove multiple imports of font family
  * Visual glitches

- Dependency updates:
  * SDK version - 3.0.132

## 1.1.5(Aug 25, 2020)

- Features:
  * Edit sign on updated messages

- Bugfixes:
  * Race condition on Channel switch
  * Visual glitches

## 1.1.4(Aug 12, 2020)

- Features:
  * Implement OG tag messages
  * Apply broadcast/Freeze indicators in Conversation

- Bugfixes:
  * Reload conversation and ChannelList on query change
  * Change channel placeholder to match design
  * Fix typing indicator bug

- Dependency updates:
  * SDK version - 3.0.129

## 1.1.3(July 29, 2020)

- Features:
  * Visual indicator for frozen, broadcast channels

- Bugfixes:
  * Sort Channels in ChannelList by send message
  * Update ChannelPreview on edit message
  * Hide channel on onChannelHidden
  * Other stability fixes

## 1.1.2(July 14, 2020)

- Features:
  * Implement render messsage input and render chat header
    * Channel.renderChatHeader({channel, user})
    * Channel.renderMessageInput({channel, user, disabled})
  * Rename messageListQuery to messageListParams

- Bugfixes:
  * Avatar size issue in ChannelList
  * Various PropType warnings
  * Other stability fixes

## 1.1.1(July 10, 2020)

- Features:
  * Reactions
    * Reactions are available for users who have it enabled
    * getEmojiCategoriesFromEmojiContainer
    * getAllEmojisFromEmojiContainer
    * getEmojisFromEmojiContainer
- Bugfixes:
  * Avatar flickering issue
  * SDK version mismatch issue
  * Various stability fixes

- Dependency updates:
  * SDK version - 3.0.128

## 1.1.0(July 10, 2020)(deprecated)

## 1.0.7(June 26, 2020)

- Features:
  * Implement query customization - users can now customize internal queries that we use inside the app
  to customize - ChannelList, MessageList and UserList rendering

    * ChannelList.queries.channelListQuery (MyGroupChannelListQuery)
    * ChannelList.queries.applicationUserListQuery (ApplicationUserListQuery), ChannelSettings.queries.applicationUserListQuery (ApplicationUserListQuery)
    * Channel.queries.messageListQuery (MessageListQuery)

  * UI for unknown message type


 - Example

  ```
  <ChannelList
    queries={{
      channelListQuery: { includeEmpty: true },
      applicationUserListQuery: { limit: 30, userIdsFilter: ['yourId'] },
    }}
  />

  <Channel
    channelUrl={channelUrl}
    queries={{
      messageListQuery: { prevResultSize: 10, includeParentMessageText: true, includeReaction: false },
    }}
  />

  <ChannelSetting
    channelUrl={channelUrl}
    queries={{
      applicationUserListQuery: { limit: 30, userIdsFilter: ['yourId'] },
    }}
  />
  ```

- Bug fixes:
  * Various stability fixes

## 1.0.6(June 18, 2020)

- Bug fixes:
  * Improve disconnect/reconnect UX
  * Various stability fixes

## 1.0.5(June 9, 2020)

- Summary:
Includes all of 1.0.4 and disable useReaction feature flag

- Features:
  * Implement frozen channel:
    * Disable edit/send message
    * Real time status change
  * Allow configuring params before operations through props:
    * ChannelList.onBeforeCreateChannel
    * ChannelSettings.onBeforeUpdateChannel
    * Channel.onBeforeSendUserMessage
    * Channel.onBeforeSendFileMessage
    * Channel.onBeforeUpdateUserMessage
  * Expose internal methods through sendBirdSelectors:
    * sendBirdSelectors.getSdk
    * sendBirdSelectors.getSendUserMessage
    * sendBirdSelectors.getSendFileMessage
    * sendBirdSelectors.getUpdateUserMessage
    * sendBirdSelectors.getDeleteMessage
    * sendBirdSelectors.getResendUserMessage
    * sendBirdSelectors.getResendFileMessage
    * sendBirdSelectors.getCreateChannel
    * sendBirdSelectors.getLeaveChannel

- Bug fixes:
  * Various stability fixes

- Dependency updates:
  * SDK version - 3.0.123

## 1.0.4(June 9, 2020)

- Features:
  * Implement frozen channel:
    * Disable edit/send message
    * Real time status change
  * Allow configuring params before operations through props:
    * ChannelList.onBeforeCreateChannel
    * ChannelSettings.onBeforeUpdateChannel
    * Channel.onBeforeSendUserMessage
    * Channel.onBeforeSendFileMessage
    * Channel.onBeforeUpdateUserMessage
  * Expose internal methods through sendBirdSelectors:
    * sendBirdSelectors.getSdk
    * sendBirdSelectors.getSendUserMessage
    * sendBirdSelectors.getSendFileMessage
    * sendBirdSelectors.getUpdateUserMessage
    * sendBirdSelectors.getDeleteMessage
    * sendBirdSelectors.getResendUserMessage
    * sendBirdSelectors.getResendFileMessage
    * sendBirdSelectors.getCreateChannel
    * sendBirdSelectors.getLeaveChannel

- Bug fixes:
  * Various stability fixes

- Dependency updates:
  * SDK version - 3.0.123

## 1.0.3(May 27, 2020)

- Bug fixes:
  * Option to delete messages that failed because of image moderation
  * Stability fix for resending failed messages
  * Minor visual fixes

## 1.0.2(May 12, 2020)

- Features:
  * Loglevels
  * Add user-agent to identify ui kit version
- Bug fixes:
  * Webpack break due to MomentJS update 2.24.xx
  * Duplicate messages are filtered on fetch
  * Fix double invocation of onChannelSelect
  * Various stability fixes
- Dependency updates:
  * SDK version - 3.0.122
  * MomentJS - 2.25.3

## 1.0.1(APR 16, 2020)

- Show default icon if avatar link is broken
- Show parent icon button when context menu is opened
- Show `(No Name)` when user has no nickname
- Do not update notification bar on admin messages
- Message will be send on `Enter` key, use `Shft + Enter` for newline
- Various internal stability improvements

## 1.0.0(APR 1, 2020)

- Official release of v1

## beta.3(APR 1, 2020)

- Branding fix - sendbird b -> B
