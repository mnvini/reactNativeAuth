import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native'
import firebase from 'firebase'
import { Button, Card, CardSection, Input, Spinner } from './common';


class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false }

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({
      error: '',
      loading: true
    })

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSucess.bind(this))
      .catch(errorLogin => {
        console.log(errorLogin)
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSucess.bind(this))
          .catch(this.onLoginFail.bind(this))
      })
  }

  onLoginSucess() {
    this.setState({
      error: '',
      email: '',
      password: '',
      loading: false
    })
  }

  onLoginFail() {
    this.setState({ error: 'Authentication Failed', loading: false })
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size='small' />
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Log in
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            placeholder='user@provider.com'
            label='Email'
          />
        </CardSection>

        <CardSection>
          <Input
            value={this.state.password}
            secureTextEntry
            onChangeText={password => this.setState({ password })}
            placeholder='password'
            label='Password'
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
})

export default LoginForm;
