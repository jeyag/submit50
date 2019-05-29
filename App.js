import * as React from 'react';
import { Text, View, StyleSheet, Button, TextInput, Vibration, KeyboardAvoidingView } from 'react-native';
import { Constants } from 'expo';

// You can import from local files


// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeRemaining: this.props.workMin * 60 + this.props.workSec,
      isStopped: false,
      isWork: true,
    };
  }
componentWillReceiveProps(props){
  // alert(props.workMin)
  this.props = props;
  this.restart();
}
  componentDidMount() {
    this.handle = setInterval(() => {
      this.countdown();
    }, 1000);
  }
  stop() {
    this.setState(prevState => {
      prevState.isStopped = true;
      return prevState;
    });
    clearInterval(this.handle);
  }

  start() {
    this.setState(prevState => {
      prevState.isStopped = false;
      return prevState;
    });
    this.handle = setInterval(() => {
      this.countdown();
    }, 1000);
  }
  countdown() {
    this.setState(prevState => {
      prevState.timeRemaining = prevState.timeRemaining - 1;
      if (prevState.timeRemaining <= -1) {
        Vibration.vibrate([500, 500, 500]);
        prevState.isWork = !prevState.isWork;
        if (prevState.isWork) {
          prevState.timeRemaining =
            this.props.workMin * 60 + this.props.workSec;
        } else {
          prevState.timeRemaining =
            this.props.breakMin * 60 + this.props.breakSec;
        }
      }

      return prevState;
    });
  }

  getMin(sec) {
    var rawQuotient = sec / 60;
    var remainder = rawQuotient % 1;
    var quotient = rawQuotient - remainder;
    return quotient;
  }

  getSec(sec) {
    return sec % 60;
  }

  restart() {
    this.setState(prevState => {
      prevState.isStopped = false;
      prevState.isWork = true;
      prevState.timeRemaining = this.props.workMin * 60 + this.props.workSec;
      return prevState;
    });
  }

  render() {
    let startPauseButton;
    let label = this.state.isWork ? (
      <View style={{ alignSelf: 'center' }}>
        <Text style={[styles.timer, { alignSelf: 'center' }]}>🤦‍</Text>
        <Text style={styles.timer}>WORK </Text>
      </View>
    ) : (
      <View style={{ alignSelf: 'center' }}>
        <Text style={[styles.timer, { alignSelf: 'center' }]}>💃</Text>
        <Text style={styles.timer}>BREAK </Text>
      </View>
    );
    if (this.state.isStopped) {
      startPauseButton = <Button onPress={() => this.start()} title="Resume" />;
    } else {
      startPauseButton = <Button onPress={() => this.stop()} title="Pause" />;
    }
    return (
      <View>
        <View>{label}</View>
        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
          <Text style={styles.timer}>
            {this.getMin(this.state.timeRemaining)}
          </Text>
          <Text style={styles.timer}>:</Text>
          <Text style={styles.timer}>
            {this.getSec(this.state.timeRemaining)}
          </Text>
        </View>
        <View style={{ margin: 3 }}>{startPauseButton}</View>
        <View style={{ margin: 3 }}>
          <Button title="Reset" onPress={() => this.restart()} />
        </View>
      </View>
    );
  }
}

class Pomodoro extends React.Component {
  constructor() {
    super();
    this.state = {
      workMin: 25,
      workSec: 0,
      breakMin: 5,
      breakSec: 0,
    };
  }

  update(p,val){
    this.setState(prevState=>{
      prevState[p] = val;
      // alert(JSON.stringify(prevState))
      return prevState;
    })
  }

  render() {
    return (
      <View>
        <Timer
          workMin={Number(this.state.workMin)}
          workSec={Number(this.state.workSec)}
          breakMin={Number(this.state.breakMin)}
          breakSec={Number(this.state.breakSec)}
        />
        <Card style={{ flexDirection: 'row', padding: 5 }}>
          <View>
            <Text style={{ fontSize: 32 }}>⚙ Work</Text>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <Text>Minutes</Text>
            <TextInput
              value={this.state.workMin + ''}
              placeholder="Minutes"
              keyboardType="numeric"
              onChangeText={text => this.update('workMin',text)}
            />
            <Text>Seconds</Text>
            <TextInput
              defaultValue={this.state.workSec + ''}
              placeholder="Seconds"
              keyboardType="numeric"
              onChangeText={text => this.update('workSec',text)}
            />
          </View>
        </Card>
        <Card
          style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
          <Text style={{ fontSize: 32 }}>⚙ Break</Text>
          <Text>Minutes</Text>
          <TextInput
            defaultValue={this.state.breakMin + ''}
            placeholder="Minutes"
            keyboardType="numeric"
            onChangeText={text => this.update('breakMin',text)}
          />
          <Text>Seconds</Text>
          <TextInput
            defaultValue={this.state.breakSec + ''}
            placeholder="Seconds"
            keyboardType="numeric"
            onChangeText={text => this.update('breakSec',text)}
          />
        </Card>
      </View>
    );
  }
}
export default class App extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="position" style={styles.container}>
        <Pomodoro />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
  timer: {
    fontSize: 48,
  },
});
