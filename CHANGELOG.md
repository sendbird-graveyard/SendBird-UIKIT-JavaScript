# Changelog

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
