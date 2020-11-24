# [Sendbird](https://sendbird.com) UIKit for React

![Platform](https://img.shields.io/badge/platform-JAVASCRIPT-orange.svg)
![Languages](https://img.shields.io/badge/language-JAVASCRIPT-orange.svg)
[![npm](https://img.shields.io/npm/v/sendbird.svg?style=popout&colorB=red)](https://www.npmjs.com/package/sendbird)

## Table of contents

  1. [Introduction](#introduction)
  1. [Before getting started](#before-getting-started)
  1. [Getting started](#getting-started)
  1. [UIKit at a glance](#uikit-at-a-glance)  
  1. [Appendix](#appendix)  

<br />

## Introduction

**Sendbird UIKit** for React is a development kit that enables fast and easy integration of standard chat features into new or existing applications. From the overall theme to individual styles such as colors and fonts, components can be fully customized to create an in-app chat experience unique to your brand identity.

> **Note**: Currently, UIKit for React supports group channels only.

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
- `css-vars-ponyfill 2.3.2`
- `date-fns 2.16.1`

<br />

## Getting started

This section gives you information you need to get started with Sendbird UIKit for React.

### Try the sample app

Our sample app has all the core features of Sendbird UIKit for React. Download the app from our GitHub repository to get an idea of what you can build with the actual UIKit before building your own project.

- https://github.com/sendbird/Sendbird-JavaScript/tree/master/uikit-samples

### Install UIKit for React with npm or yarn

Enter the following on the command line with `npm` to install Sendbird UIKit.

> **Note** : The [minimum requirements for UIKit](https://sendbird.com/docs/uikit/v1/javascript/getting-started/about-uikit#2-requirements) must be installed on your system to use `npm`.

```bash
npm install sendbird-uikit --save
```

or with `yarn`.

```bash
yarn add sendbird-uikit
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

<br />

## Appendix

### Color set for Light theme

|Key|Value|
|---|---|
|`--sendbird-light-primary-500`|#4d2aa6|
|`--sendbird-light-primary-400`|#6440C4|
|`--sendbird-light-primary-300`|#7B53EF|
|`--sendbird-light-primary-200`|#9E8CF5|
|`--sendbird-light-primary-100`|#E2DFFF|
|`--sendbird-light-secondary-500`|#007A7A|
|`--sendbird-light-secondary-400`|#189A8D|
|`--sendbird-light-secondary-300`|#2EBA9F|
|`--sendbird-light-secondary-200`|#6FD6BE|
|`--sendbird-light-secondary-100`|#AEF2DC|
|`--sendbird-light-information-100`|#b2d9ff|
|`--sendbird-light-error-500`|#A30E2D|
|`--sendbird-light-error-400`|#C11F41|
|`--sendbird-light-error-300`|#E53157|
|`--sendbird-light-error-200`|#FF6183|
|`--sendbird-light-error-100`|#FFABBD|
|`--sendbird-light-background-700`|#000000|
|`--sendbird-light-background-600`|#161616|
|`--sendbird-light-background-500`|#2C2C2C|
|`--sendbird-light-background-400`|#393939|
|`--sendbird-light-background-300`|#A8A8A8|
|`--sendbird-light-background-200`|#D9D9D9|
|`--sendbird-light-background-100`|#F0F0F0|
|`--sendbird-light-background-50`| #FFFFFF|
|`--sendbird-light-overlay`|rgba(0, 0, 0, 0.32)|
|`--sendbird-light-onlight-01`|rgba(0, 0, 0, 0.88)|
|`--sendbird-light-onlight-02`|rgba(0, 0, 0, 0.50)|
|`--sendbird-light-onlight-03`|rgba(0, 0, 0, 0.38)|
|`--sendbird-light-onlight-04`|rgba(0, 0, 0, 0.12)|
|`--sendbird-light-ondark-01`|rgba(255, 255, 255, 0.88)|
|`--sendbird-light-ondark-02`|rgba(255, 255, 255, 0.50)|
|`--sendbird-light-ondark-03`|rgba(255, 255, 255, 0.38)|
|`--sendbird-light-ondark-04`|rgba(255, 255, 255, 0.12)|
|`--sendbird-light-shadow-01`|0 1px 5px 0 rgba(33, 34, 66, 0.04), 0 0 3px 0 rgba(0, 0, 0, 0.08), 0 2px 1px 0 rgba(0, 0, 0, 0.12)|
|`--sendbird-light-shadow-02`|0 3px 5px -3px rgba(33, 34, 66, 0.04), 0 3px 14px 2px rgba(0, 0, 0, 0.08), 0 8px 10px 1px rgba(0, 0, 0, 0.12)|
|`--sendbird-light-shadow-03`|0 6px 10px -5px rgba(0, 0, 0, 0.04), 0 6px 30px 5px rgba(0, 0, 0, 0.08), 0 16px 24px 2px rgba(0, 0, 0, 0.12)|
|`--sendbird-light-shadow-04`|0 9px 15px -7px rgba(0, 0, 0, 0.04), 0 9px 46px 8px rgba(0, 0, 0, 0.08), 0 24px 38px 3px rgba(0, 0, 0, 0.12)|
|`--sendbird-light-shadow-message-input`|0 1px 5px 0 rgba(33, 34, 66, 0.12), 0 0 1px 0 rgba(33, 34, 66, 0.16), 0 2px 1px 0 rgba(33, 34, 66, 0.08), 0 1px 5px 0 rgba(0, 0, 0, 0.12)|
|`--sendbird-light-theme-surface-2`|#EAEAEA|


### Color set for Dark theme

|Key|Value|
|---|---|
|`--sendbird-dark-primary-500`|#4d2aa6|
|`--sendbird-dark-primary-400`|#6440C4|
|`--sendbird-dark-primary-300`|#7B53EF|
|`--sendbird-dark-primary-200`|#9E8CF5|
|`--sendbird-dark-primary-100`|#E2DFFF|
|`--sendbird-dark-secondary-500`|#007A7A|
|`--sendbird-dark-secondary-400`|#189A8D|
|`--sendbird-dark-secondary-300`|#2EBA9F|
|`--sendbird-dark-secondary-200`|#6FD6BE|
|`--sendbird-dark-secondary-100`|#AEF2DC|
|`--sendbird-dark-information-100`|#b2d9ff|
|`--sendbird-dark-error-500`|#A30E2D|
|`--sendbird-dark-error-400`|#C11F41|
|`--sendbird-dark-error-300`|#E53157|
|`--sendbird-dark-error-200`|#FF6183|
|`--sendbird-dark-error-100`|#FFABBD|
|`--sendbird-dark-background-700`|#000000|
|`--sendbird-dark-background-600`|#161616|
|`--sendbird-dark-background-500`|#2C2C2C|
|`--sendbird-dark-background-400`|#393939|
|`--sendbird-dark-background-300`|#A8A8A8|
|`--sendbird-dark-background-200`|#D9D9D9|
|`--sendbird-dark-background-100`|#F0F0F0|
|`--sendbird-dark-background-50`| #FFFFFF|
|`--sendbird-dark-overlay`|rgba(0, 0, 0, 0.32)|
|`--sendbird-dark-onlight-01`|rgba(0, 0, 0, 0.88)|
|`--sendbird-dark-onlight-02`|rgba(0, 0, 0, 0.50)|
|`--sendbird-dark-onlight-03`|rgba(0, 0, 0, 0.38)|
|`--sendbird-dark-onlight-04`|rgba(0, 0, 0, 0.12)|
|`--sendbird-dark-ondark-01`|rgba(255, 255, 255, 0.88)|
|`--sendbird-dark-ondark-02`|rgba(255, 255, 255, 0.50)|
|`--sendbird-dark-ondark-03`|rgba(255, 255, 255, 0.38)|
|`--sendbird-dark-ondark-04`|rgba(255, 255, 255, 0.12)|
|`--sendbird-dark-shadow-01`|0 1px 5px 0 rgba(33, 34, 66, 0.04), 0 0 3px 0 rgba(0, 0, 0, 0.08), 0 2px 1px 0 rgba(0, 0, 0, 0.12)|
|`--sendbird-dark-shadow-02`|0 3px 5px -3px rgba(33, 34, 66, 0.04), 0 3px 14px 2px rgba(0, 0, 0, 0.08), 0 8px 10px 1px rgba(0, 0, 0, 0.12)|
|`--sendbird-dark-shadow-03`|0 6px 10px -5px rgba(0, 0, 0, 0.04), 0 6px 30px 5px rgba(0, 0, 0, 0.08), 0 16px 24px 2px rgba(0, 0, 0, 0.12)|
|`--sendbird-dark-shadow-04`|0 9px 15px -7px rgba(0, 0, 0, 0.04), 0 9px 46px 8px rgba(0, 0, 0, 0.08), 0 24px 38px 3px rgba(0, 0, 0, 0.12)|
|`--sendbird-dark-shadow-message-input`|0 1px 5px 0 rgba(33, 34, 66, 0.12), 0 0 1px 0 rgba(33, 34, 66, 0.16), 0 2px 1px 0 rgba(33, 34, 66, 0.08), 0 1px 5px 0 rgba(0, 0, 0, 0.12)|


#### Color set for all themes

|Key|Value|
|---|---|
|`--sendbird-iconbutton-color`|#825eeb|
|`--sendbird-message-input-border-active`|#7B53EF|
|`--sendbird-selected-reaction-button-border-hover`|#9E8CF5|
|`--sendbird-add-reaction-button-border-hover`|#9E8CF5|
|`--sendbird-tooltip-background`|#000000|
|`--sendbird-tooltip-text-color`|rgba(255, 255, 255, 0.88)|
|`--sendbird-button-border-focus`|#FFFFFF|
|`--sendbird-file-message-icon-background`|#FFFFFF|
|`--sendbird-font-family-default`|'Open Sans', sans-serif|
|`--sendbird-message-balloon-width`|404px|
