# react-native-coinhive-miner

#### Install via npm

`npm i react-native-coinhive-miner --save`

#### Usage

```Javascript
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import CoinHiveClient from 'react-native-coinhive-miner'

export default class App extends Component<{}> {
  state = {
    speed: 100
  }

  onPress() {
    this.setState({
      speed: 90
    })
  }

  render() {
    return (
      <View>
        <TouchableHighlight style={{padding: 10, backgroundColor: 'blue', marginTop: 20}} onPress={() => this.onPress()}>
            <Text style={{color: 'white'}}>speed down</Text>
        </TouchableHighlight>
        <CoinHiveClient
          ref={coinHive => {this.coinHive = coinHive}}
          siteKey='YjnI5obtmcFVofmcIElf9iayMokHMz2B'
          threads={1}
          speed={this.state.speed}
          onSpeed={(speed) => { console.log(speed) }}
          onThreads={(threads) => { console.log(threads) }}
          ...
        />
      </View>
    );
  }
}
```

## API

### Props
* `siteKey`  - String
* `threads`  - Number
* `speed`    - Number (10 - 100),


### Ref Function
* `stopNow`         - Inmediate stop
* `stop()`          - stop mining
* `addThread()`     - add 1 thread
* `removeThread()`  - remove 1 thread
* `speedUp()`       - add 10% to speed
* `speedDown()`     - remove 10% to speed

### Events
* `onStats`  - Event Function
* `onStop`   - Event Function
* `onRunning`- Event Function
* `onStart`  - Event Function
* `onSpeed`  - Event Function
* `onThreads`- Event Function
* `onInit`   - Event Function
* `onStart`  - Event Function
* `onStop`   - Event Function

#### LICENSE
MIT
