# Sendbird UIKIT React

Find the docs at: https://docs.sendbird.com/javascript/ui_kit_getting_started

For bugs and feature requests, visit: https://community.sendbird.com/

Samples: https://github.com/sendbird/SendBird-JavaScript/tree/master/uikit-samples

## Install

`npm i sendbird-uikit`

## Available Components

The components that you receive once you install the uikit

* SendBirdProvider: The context provider that stores SDK and user information
* withSendBird: The Higher Order Component to access data from SendBirdProvider
* ChannelList: UI component to render a list of components
* Channel: A UI Component where conversations happen
* ChannelSettings: A component to change various settings of a given channel
* App: A full fledged app component made by combining the above components

## Usage

There are two usages

### Simple

```
import React from 'react';

import { App as SendBirdApp } from 'sendbird-uikit';
import 'sendbird-uikit/dist/index.css';

function App() {
  return (
    <div className="App">
      <SendBirdApp
        appId={APP_ID}
        userId="sendbird"
        nickname="sendbird"
      />
    </div>
  );
}

export default App;
```

### With provider

```
import React, { useEffect, useState } from 'react';

import {
  SendBirdProvider,
  ChannelList,
  Channel,
  ChannelSettings,
} from 'sendbird-uikit';
import 'sendbird-uikit/dist/index.css';

export default function Chat({ userId, nickname, theme }) {
  const [showSettings, setShowSettings] = useState(false);
  const [currentChannelUrl, setCurrentChannelUrl] = useState(null);
  return (
    <div style={{ height: '100vh' }}>
      <SendBirdProvider
        appId={APP_ID}
        theme={theme}
        userId={userId}
        nickname={nickname}
      >
        <div className="sendbird-app__wrap">
          <div className="sendbird-app__channellist-wrap">
            <ChannelList
              onChannelSelect={(channel) => {
                if (channel && channel.url) {
                  setCurrentChannelUrl(channel.url);
                }
              }}
            />
          </div>
          <div className="sendbird-app__conversation-wrap">
            <Channel
              channelUrl={currentChannelUrl}
              onChatHeaderActionClick={() => { setShowSettings(true); }}
            />
          </div>
        </div>
        {showSettings && (
          <div className="sendbird-app__settingspanel-wrap">
            <ChannelSettings
              channelUrl={currentChannelUrl}
              onCloseClick={() => { setShowSettings(false); }}
            />
          </div>
        )}
      </SendBirdProvider>
    </div>
  )
}
```
