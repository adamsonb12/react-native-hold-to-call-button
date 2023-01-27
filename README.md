# React Native Hold to Call Button

**React Native component for a button that is called after the user holds down on the button for a set duration**

## Getting Started

### Installation

```
yarn add react-native-hold-to-call-button
```

or

```
npm install react-native-hold-to-call-button --save
```

## Usage

You can use the button anywhere in your react native app

### Basic Example

```js
import { HoldToCallButton } from "react-native-hold-to-call-button";

export const App = () => {
  return (
    <HoldToCallButton
      onHoldFinished={() => {
        //  do something cool
      }}
    >
      Hold to Confirm
    </HoldToCallButton>
  );
};
```

## Customization

Styles can be customized so that colors of the workflow match your app's theme and tone via props.

```js
import { HoldToCallButton } from "react-native-hold-to-call-button";

export const App = () => {
  return (
    <HoldToCallButton
      onHoldFinished={() => {
        //  do something cool
      }}
      // customization options
      primaryColor="pink" // animation color
      inactiveColor="red" // button background when not pressed down
    >
      Hold to Confirm
    </HoldToCallButton>
  );
};
```

## Screenshots

Images of this library in use in production

### Hold to Call

The animation is smoother in real life, the gif does not do it justice.

![hold to call button](https://play-lh.googleusercontent.com/Fm3fK0INdAjdnJIYPmeKjd07KLttf6RhBuLy51BEVg4nETv5xxxG6tl1AanH9BQ0NQ=w2560-h1440-rw)
