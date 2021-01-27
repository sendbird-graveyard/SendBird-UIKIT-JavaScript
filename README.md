# [Sendbird](https://sendbird.com) UIKit for React

![Platform](https://img.shields.io/badge/platform-JAVASCRIPT-orange.svg)
![Languages](https://img.shields.io/badge/language-JAVASCRIPT-orange.svg)
[![npm](https://img.shields.io/npm/v/sendbird.svg?style=popout&colorB=red)](https://www.npmjs.com/package/sendbird)

## Note

v2.0.0-alpha.x is still under QA. Please donot use it for production
Try it only if you want to test OpenChannel

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

### Color set for Light and Dark theme

|Light Theme variables|Values|Dark Theme variables|Values|
|:--------------------|:----:|:-------------------|:----:|
|`--sendbird-light-primary-100`|![#E2DFFF](https://via.placeholder.com/15/E2DFFF/000000?text=+) #E2DFFF|`--sendbird-dark-primary-100`|![#E2DFFF](https://via.placeholder.com/15/E2DFFF/000000?text=+) #E2DFFF|
|`--sendbird-light-primary-200`|![#9E8CF5](https://via.placeholder.com/15/9E8CF5/000000?text=+) #9E8CF5|`--sendbird-dark-primary-200`|![#9E8CF5](https://via.placeholder.com/15/9E8CF5/000000?text=+) #9E8CF5|
|`--sendbird-light-primary-300`|![#7B53EF](https://via.placeholder.com/15/7B53EF/000000?text=+) #7B53EF|`--sendbird-dark-primary-300`|![#7B53EF](https://via.placeholder.com/15/7B53EF/000000?text=+) #7B53EF|
|`--sendbird-light-primary-400`|![#6440C4](https://via.placeholder.com/15/6440C4/000000?text=+) #6440C4|`--sendbird-dark-primary-400`|![#6440C4](https://via.placeholder.com/15/6440C4/000000?text=+) #6440C4|
|`--sendbird-light-primary-500`|![#4d2aa6](https://via.placeholder.com/15/4d2aa6/000000?text=+) #4d2aa6|`--sendbird-dark-primary-500`|![#4d2aa6](https://via.placeholder.com/15/4d2aa6/000000?text=+) #4d2aa6|
|`--sendbird-light-secondary-100`|![#AEF2DC](https://via.placeholder.com/15/AEF2DC/000000?text=+) #AEF2DC|`--sendbird-dark-secondary-100`|![#AEF2DC](https://via.placeholder.com/15/AEF2DC/000000?text=+) #AEF2DC|
|`--sendbird-light-secondary-200`|![#6FD6BE](https://via.placeholder.com/15/6FD6BE/000000?text=+) #6FD6BE|`--sendbird-dark-secondary-200`|![#6FD6BE](https://via.placeholder.com/15/6FD6BE/000000?text=+) #6FD6BE|
|`--sendbird-light-secondary-300`|![#2EBA9F](https://via.placeholder.com/15/2EBA9F/000000?text=+) #2EBA9F|`--sendbird-dark-secondary-300`|![#2EBA9F](https://via.placeholder.com/15/2EBA9F/000000?text=+) #2EBA9F|
|`--sendbird-light-secondary-400`|![#189A8D](https://via.placeholder.com/15/189A8D/000000?text=+) #189A8D|`--sendbird-dark-secondary-400`|![#189A8D](https://via.placeholder.com/15/189A8D/000000?text=+) #189A8D|
|`--sendbird-light-secondary-500`|![#007A7A](https://via.placeholder.com/15/007A7A/000000?text=+) #007A7A|`--sendbird-dark-secondary-500`|![#007A7A](https://via.placeholder.com/15/007A7A/000000?text=+) #007A7A|
|`--sendbird-light-information-100`|![#b2d9ff](https://via.placeholder.com/15/b2d9ff/000000?text=+) #b2d9ff|`--sendbird-dark-information-100`|![#b2d9ff](https://via.placeholder.com/15/b2d9ff/000000?text=+) #b2d9ff|
|`--sendbird-light-error-100`|![#FFABBD](https://via.placeholder.com/15/FFABBD/000000?text=+) #FFABBD|`--sendbird-dark-error-100`|![#FFABBD](https://via.placeholder.com/15/FFABBD/000000?text=+) #FFABBD|
|`--sendbird-light-error-200`|![#FF6183](https://via.placeholder.com/15/FF6183/000000?text=+) #FF6183|`--sendbird-dark-error-200`|![#FF6183](https://via.placeholder.com/15/FF6183/000000?text=+) #FF6183|
|`--sendbird-light-error-300`|![#E53157](https://via.placeholder.com/15/E53157/000000?text=+) #E53157|`--sendbird-dark-error-300`|![#E53157](https://via.placeholder.com/15/E53157/000000?text=+) #E53157|
|`--sendbird-light-error-400`|![#C11F41](https://via.placeholder.com/15/C11F41/000000?text=+) #C11F41|`--sendbird-dark-error-400`|![#C11F41](https://via.placeholder.com/15/C11F41/000000?text=+) #C11F41|
|`--sendbird-light-error-500`|![#A30E2D](https://via.placeholder.com/15/A30E2D/000000?text=+) #A30E2D|`--sendbird-dark-error-500`|![#A30E2D](https://via.placeholder.com/15/A30E2D/000000?text=+) #A30E2D|
|`--sendbird-light-background-50`|![#FFFFFF](https://via.placeholder.com/15/FFFFFF/000000?text=+) #FFFFFF|`--sendbird-dark-background-50`|![#FFFFFF](https://via.placeholder.com/15/FFFFFF/000000?text=+) #FFFFFF|
|`--sendbird-light-background-100`|![#F0F0F0](https://via.placeholder.com/15/F0F0F0/000000?text=+) #F0F0F0|`--sendbird-dark-background-100`|![#F0F0F0](https://via.placeholder.com/15/F0F0F0/000000?text=+) #F0F0F0|
|`--sendbird-light-background-200`|![#D9D9D9](https://via.placeholder.com/15/D9D9D9/000000?text=+) #D9D9D9|`--sendbird-dark-background-200`|![#D9D9D9](https://via.placeholder.com/15/D9D9D9/000000?text=+) #D9D9D9|
|`--sendbird-light-background-300`|![#A8A8A8](https://via.placeholder.com/15/A8A8A8/000000?text=+) #A8A8A8|`--sendbird-dark-background-300`|![#A8A8A8](https://via.placeholder.com/15/A8A8A8/000000?text=+) #A8A8A8|
|`--sendbird-light-background-400`|![#393939](https://via.placeholder.com/15/393939/000000?text=+) #393939|`--sendbird-dark-background-400`|![#393939](https://via.placeholder.com/15/393939/000000?text=+) #393939|
|`--sendbird-light-background-500`|![#2C2C2C](https://via.placeholder.com/15/2C2C2C/000000?text=+) #2C2C2C|`--sendbird-dark-background-500`|![#2C2C2C](https://via.placeholder.com/15/2C2C2C/000000?text=+) #2C2C2C|
|`--sendbird-light-background-600`|![#161616](https://via.placeholder.com/15/161616/161616?text=+) #161616|`--sendbird-dark-background-600`|![#161616](https://via.placeholder.com/15/161616/161616?text=+) #161616|
|`--sendbird-light-background-700`|![#000000](https://via.placeholder.com/15/000000/000000?text=+) #000000|`--sendbird-dark-background-700`|![#000000](https://via.placeholder.com/15/000000/000000?text=+) #000000|
|`--sendbird-light-overlay`|![rgba(0, 0, 0, 0.32)](https://user-images.githubusercontent.com/46333979/103625341-3181dd00-4f7e-11eb-9ae3-4253ae3acabf.png) rgba(0, 0, 0, 0.32)|`--sendbird-dark-overlay`|![rgba(0, 0, 0, 0.32)](https://user-images.githubusercontent.com/46333979/103625341-3181dd00-4f7e-11eb-9ae3-4253ae3acabf.png) rgba(0, 0, 0, 0.32)|
|`--sendbird-light-onlight-01`|![rgba(0, 0, 0, 0.88)](https://user-images.githubusercontent.com/46333979/103625475-60984e80-4f7e-11eb-969b-66ba6404f4e8.png) rgba(0, 0, 0, 0.88)|`--sendbird-dark-onlight-01`|![rgba(0, 0, 0, 0.88)](https://user-images.githubusercontent.com/46333979/103625475-60984e80-4f7e-11eb-969b-66ba6404f4e8.png) rgba(0, 0, 0, 0.88)|
|`--sendbird-light-onlight-02`|![rgba(0, 0, 0, 0.50)](https://user-images.githubusercontent.com/46333979/103625587-89b8df00-4f7e-11eb-9219-37e22b3e2d64.png) rgba(0, 0, 0, 0.50)|`--sendbird-dark-onlight-02`|![rgba(0, 0, 0, 0.50)](https://user-images.githubusercontent.com/46333979/103625587-89b8df00-4f7e-11eb-9219-37e22b3e2d64.png) rgba(0, 0, 0, 0.50)|
|`--sendbird-light-onlight-03`|![rgba(0, 0, 0, 0.38)](https://user-images.githubusercontent.com/46333979/103625907-e9af8580-4f7e-11eb-86f3-c6032819fff3.png) rgba(0, 0, 0, 0.38)|`--sendbird-dark-onlight-03`|![rgba(0, 0, 0, 0.38)](https://user-images.githubusercontent.com/46333979/103625907-e9af8580-4f7e-11eb-86f3-c6032819fff3.png) rgba(0, 0, 0, 0.38)|
|`--sendbird-light-onlight-04`|![rgba(0, 0, 0, 0.12)](https://user-images.githubusercontent.com/46333979/103626188-309d7b00-4f7f-11eb-94ef-d09260f02510.png) rgba(0, 0, 0, 0.12)|`--sendbird-dark-onlight-04`|![rgba(0, 0, 0, 0.12)](https://user-images.githubusercontent.com/46333979/103626188-309d7b00-4f7f-11eb-94ef-d09260f02510.png) rgba(0, 0, 0, 0.12)|
|`--sendbird-light-ondark-01`|![rgba(255, 255, 255, 0.88)](https://user-images.githubusercontent.com/46333979/103626638-d355f980-4f7f-11eb-8d1d-7351b989aca6.png) rgba(255, 255, 255, 0.88)|`--sendbird-dark-ondark-01`|![rgba(255, 255, 255, 0.88)](https://user-images.githubusercontent.com/46333979/103626638-d355f980-4f7f-11eb-8d1d-7351b989aca6.png) rgba(255, 255, 255, 0.88)|
|`--sendbird-light-ondark-02`|![rgba(255, 255, 255, 0.50)](https://user-images.githubusercontent.com/46333979/103626741-faacc680-4f7f-11eb-8b3b-b3dc3386d923.png) rgba(255, 255, 255, 0.50)|`--sendbird-dark-ondark-02`|![rgba(255, 255, 255, 0.50)](https://user-images.githubusercontent.com/46333979/103626741-faacc680-4f7f-11eb-8b3b-b3dc3386d923.png) rgba(255, 255, 255, 0.50|
|`--sendbird-light-ondark-03`|![rgba(255, 255, 255, 0.38)](https://user-images.githubusercontent.com/46333979/103626861-2039d000-4f80-11eb-91c7-e8191d213c9c.png) rgba(255, 255, 255, 0.38)|`--sendbird-dark-ondark-03`|![rgba(255, 255, 255, 0.38)](https://user-images.githubusercontent.com/46333979/103626861-2039d000-4f80-11eb-91c7-e8191d213c9c.png) rgba(255, 255, 255, 0.38)|
|`--sendbird-light-ondark-04`|![rgba(255, 255, 255, 0.12)](https://user-images.githubusercontent.com/46333979/103626968-48c1ca00-4f80-11eb-9b89-fbbe4aed75c7.png) rgba(255, 255, 255, 0.12)|`--sendbird-dark-ondark-04`|![rgba(255, 255, 255, 0.12)](https://user-images.githubusercontent.com/46333979/103626968-48c1ca00-4f80-11eb-9b89-fbbe4aed75c7.png) rgba(255, 255, 255, 0.12)|
|`--sendbird-light-shadow-message-input`|0 1px 5px 0 rgba(33, 34, 66, 0.12),<br /> 0 0 1px 0 rgba(33, 34, 66, 0.16),<br /> 0 2px 1px 0 rgba(33, 34, 66, 0.08), 0 1px 5px 0 rgba(0, 0, 0, 0.12)|`--sendbird-dark-shadow-message-input`|0 1px 5px 0 rgba(33, 34, 66, 0.12),<br /> 0 0 1px 0 rgba(33, 34, 66, 0.16),<br /> 0 2px 1px 0 rgba(33, 34, 66, 0.08), 0 1px 5px 0 rgba(0, 0, 0, 0.12)|

#### Color set for all themes

|Key|Value|
|---|---|
|`--sendbird-add-reaction-button-border-hover`|![#9E8CF5](https://via.placeholder.com/15/9E8CF5/000000?text=+) #9E8CF5|
|`--sendbird-selected-reaction-button-border-hover`|![#9E8CF5](https://via.placeholder.com/15/9E8CF5/000000?text=+) #9E8CF5|
|`--sendbird-iconbutton-color`|![#825eeb](https://via.placeholder.com/15/825eeb/000000?text=+) #825eeb|
|`--sendbird-message-input-border-active`|![#7B53EF](https://via.placeholder.com/15/7B53EF/000000?text=+) #7B53EF|
|`--sendbird-tooltip-background`|![#000000](https://via.placeholder.com/15/000000/000000?text=+) #000000|
|`--sendbird-tooltip-text-color`|![rgba(255, 255, 255, 0.88)](https://user-images.githubusercontent.com/46333979/103626638-d355f980-4f7f-11eb-8d1d-7351b989aca6.png) rgba(255, 255, 255, 0.88)|
|`--sendbird-button-border-focus`|![#FFFFFF](https://via.placeholder.com/15/FFFFFF/000000?text=+) #FFFFFF|
|`--sendbird-file-message-icon-background`|![#FFFFFF](https://via.placeholder.com/15/FFFFFF/000000?text=+) #FFFFFF|
|`--sendbird-font-family-default`|<span style="font-family: 'Open Sans', sans-serif">'Open Sans', sans-serif</span>|
|`--sendbird-message-balloon-width`|404px|
