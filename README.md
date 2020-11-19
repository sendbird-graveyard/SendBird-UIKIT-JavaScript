# [Sendbird](https://sendbird.com) UIKit for React

![Platform](https://img.shields.io/badge/platform-JAVASCRIPT-orange.svg)
![Languages](https://img.shields.io/badge/language-JAVASCRIPT-orange.svg)
[![npm](https://img.shields.io/npm/v/sendbird.svg?style=popout&colorB=red)](https://www.npmjs.com/package/sendbird)

## Table of contents

  1. [Introduction](#introduction)
  1. [Before getting started](#before-getting-started)
  1. [Getting started](#getting-started)
  1. [UIKit at a glance](#uikit-at-a-glance)  

<br />

## Introduction

Sendbird UIKit for React is a development kit that enables fast and easy integration of standard chat features into new or existing applications. From the overall theme to individual styles such as colors and fonts, components can be fully customized to create an in-app chat experience unique to your brand identity.

> **Note**: Currently, UIKit for iOS supports group channels only.

### Benefits

- Easy installation
- Fully-featured chat with a minimal amount of code
- Customizable components, events, and views
- Customizable user list to enable chat among specified users

![ThemeLight](https://static.sendbird.com/docs/uikit/javascript/theme-light_20200401.png)

### More about Sendbird UIKit for React

Find out more about Sendbird UIKit for React on [UIKit for React doc](https://sendbird.com/docs/uikit/v1/javascript/getting-started/about-uikit). If you have any comments or questions regarding bugs and feature requests, visit [Sendbird community](https://community.sendbird.com). 

<br />

## Before getting started

This section shows the prerequisites you need to check to use Sendbird UIKit for React.

### Requirements 

The minimum requirements for Sendbird UIKit for React are:

- `React 16.8.0+`
- `React DOM 16.8.0+`
- `Sendbird Chat SDK for JavaScript 3.0.115+`
- `moment 2.24.0+`

<br />

## Getting started

This section gives you information you need to get started with Sendbird UIKit for React.

### Try the sample app

Our sample app has all the core features of Sendbird UIKit for React. Download the app from our GitHub repository to get an idea of what you can build with the actual UIKit before building your own project.

- https://github.com/sendbird/Sendbird-JavaScript/tree/master/uikit-samples

### Install UIKit for React with npm

Enter the following on the command line with `npm` to install Sendbird UIKit.

> **Note** : The [minimum requirements for UIKit](https://sendbird.com/docs/uikit/v1/javascript/getting-started/about-uikit#2-requirements) must be installed on your system to use `npm`.

```bash
npm install sendbird-uikit --save
```

### Implement UIKit to your web app

Implement UIKit to your web app by either using the `App` component or combining smart components to build a chat service customized to your needs.

```javascript
import { SendBirdProvider, withSendBird, App ... } from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";
```

To use the `App` component, add the following pattern:

```javascript
import { App as SendBirdApp } from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";

const App = () => (
        <Route id={'/chat'}>
                <App appId={appId} userId={userId} />
        </Route>
)
```

To use smart components, add the following pattern:

```javascript
import {
        SendBirdProvider,
        ChannelList,
        ChannelSettings,
        Channel,
} from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";

const App = () => (
        <SendBirdProvider>
        ... other components
        <Route id={'/chat'}>
                <LeftPane>
                        <ChannelList onChannelSelect={channel => setCurrentChannel(channel.url)}/>
                </LeftPane>
                <CenterPane>
                        <Switch case={currentChannel}>
                                <Route id={channelUrl1}>
                                        <Channel channelUrl={channelUrl1} />
                                </Route>
                                <Route id={channelUrl2}>
                                        <Channel channelUrl={channelUrl2} />
                                </Route>
                        </Switch>
                </CenterPane>
                <RightPane>
                        <ChannelSettings channelUrl={currentChannel} />
                </RightPane>
        </Route>
        </SendBirdProvider>
)
```

To show a list of channels or change channels based on routes, implement as below:

```javascript
import {
        SendBirdProvider,
        ChannelList,
        Channel,
} from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";

const App = () => {
        <SendBirdProvider appId={appId} userId={userId} ...>
                <Router>
                        <Route>
                                <Sidebar>
                                        <Channel />
                                </Sidebar>
                                <Route id={yourApp/channelUrl1}>
                                        <MainPanel>
                                                <Channel channelUrl={yourApp/channelUrl1} />
                                        </MainPanel>
                                </Route>
                                <Route id={yourApp/channelUrl2}>
                                        <MainPanel>
                                                <Channel channelUrl={yourApp/channelUrl2} />
                                        </MainPanel>
                                </Route>
                        </Route>
                        ...
                </Router>
        </SendBirdProvider>
}
```

<br />

## UIKit at a glance

Here is a list of components included in the UIKit.  

|Component|Description|
|---|---|
|SendBirdProvider|The context provider that stores [Chat SDK for JavaScript](https://sendbird.com/docs/chat/v3/javascript/getting-started/about-chat-sdk) and user information.|
|withSendBird|The higher-order component to access data from `SendBirdProvider`.|
|ChannelList|The UI component that renders channel components in a list.|
|Channel|The UI component that allows close interaction among a limited number of users.|
|ChannelSettings|The UI component that enables customized settings to be configured to each channel.|
|App|The app component that combines all of the above components.|
