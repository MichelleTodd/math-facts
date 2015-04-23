'use strict';

var _ = require('underscore');

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
} = React;

var randomIntBetween = function(min, max) {
  return Math.floor(Math.random()*(max - min + 1)) + min;
};

var Quizzer = React.createClass({
  getInitialState: function() {
    return {
      leftNumber: randomIntBetween(1, 10),
      rightNumber: randomIntBetween(1, 10),
      response: ''
    };
  },
  addDigit: function(value) {
    this.setState({
      response: this.state.response + value.toString()
    }, this.check);
  },
  backspace: function() {
    this.setState({
      response: this.state.response.slice(0, -1)
    });
  },
  check: function() {
    var answer = this.state.leftNumber + this.state.rightNumber;
    if (this.state.response === answer.toString()) {
      this.setState({
        leftNumber: randomIntBetween(1, 10),
        rightNumber: randomIntBetween(1, 10),
        response: ''
      });
    }
  },

  _renderNumpad: function() {

    var button = (onPress, content) => {
      return (
        <TouchableHighlight
            style={styles.button}
            onPress={onPress}
            underlayColor='transparent'
            activeOpacity={0.5}>
          <Text style={styles.buttonText}>
            {content}
          </Text>
        </TouchableHighlight>
      );
    }

    var buttons = _.map(_.range(1, 10), (value, index) => {
      return button(() => {this.addDigit(value)}, value);
    });

    buttons.push(button(this.backspace, '<-'));
    buttons.push(button(() => {this.addDigit(0)}, '0'));
    buttons.push(button(this.backspace, '<-'));

    return (
      <View style={styles.buttons}>
        <View style={styles.buttonRow}>
          {buttons.slice(0, 3)}
        </View>
        <View style={styles.buttonRow}>
          {buttons.slice(3, 6)}
        </View>
        <View style={styles.buttonRow}>
          {buttons.slice(6, 9)}
        </View>
        <View style={styles.buttonRow}>
          {buttons.slice(9, 12)}
        </View>
      </View>
    );
  },

  render: function() {
    var leftNumber = this.state.leftNumber;
    var rightNumber = this.state.rightNumber;


    return (
      <View style={styles.container}>
        <View style={styles.questionContainer}>
          <Text style={styles.question}>
            {leftNumber.toString() + ' + ' + rightNumber.toString()}
          </Text>
          <Text style={styles.response}>
            {this.state.response}
          </Text>
        </View>

        {this._renderNumpad()}

      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fafafa',
    justifyContent: 'space-between'
  },

  questionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  question: {
    fontSize: 40,
    margin: 10,
  },
  response: {
    fontSize: 60,
    height: 60,
    color: '#333333',
    marginBottom: 5,
  },

  buttons: {
    flex: 0,
    alignSelf: 'stretch',
    backgroundColor: '#eee',
  },
  buttonRow: {
    flexDirection: 'row',
    flex: 1,
  },
  button: {
    backgroundColor: '#ddd',
    flexDirection: 'column',
    height: 60,
    flex: 1,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 25,
    textAlign: 'center',
  }
});

module.exports = Quizzer;