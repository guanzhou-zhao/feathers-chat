const ReactDOM = require('react-dom')
const React = require('react')
const Match = require('react-router').Match
const Redirect = require('react-router').Redirect
const Login = require('./Login')
const ChatApp = require('./ChatApp')
const app = require('../lib/app')

const App = React.createClass({
  getInitialState() {
    return {
      isAuthenticated: false
    }
  },
  componentDidMount() {
    app.authenticate().then(() => {
      this.setState({isAuthenticated: true})
    }).catch(error => {
      if(error.code === 401) {
        window.location.href = '/#/login'
      }

      console.error(error);
    });
  },
  login() {
    console.log('set isAuthenticated');
    this.setState({isAuthenticated: true})
  },
  render() {
    const { isAuthenticated } = this.state
    console.log('isAuthenticated', isAuthenticated);
    return (
      <div>

        <Match pattern="/" exactly render={ () => (
          isAuthenticated ? (
              <Redirect to="/chat" />
            ) : <Login login={this.login}/>
        )}/>
        <Match pattern="/login" render={ () => (
          isAuthenticated ? (
              <Redirect to="/chat" />
            ) : <Login login={this.login}/>
        )}/>
        {
            isAuthenticated ? (
            <Match pattern="/chat" component={ChatApp} />) : null
          }
      </div>
    )
  }
})

module.exports = App
