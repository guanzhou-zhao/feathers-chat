const ReactDOM = require('react-dom')
const React = require('react')
const app = require('./lib/app')
const ChatApp = require('./components/ChatApp')
const Home = require('./components/Home')
const Login = require('./components/Login')
const Signup = require('./components/Signup')

// const { Router, Match, MatchWhenAuthorized } = require('react-router')
const Route = require('react-router').Route
// const MatchWhenAuthorized = require('react-router').MatchWhenAuthorized
const Router = require('react-router').Router
const HashRouter = require('react-router').HashRouter
const hashHistory = require('./lib/hashHistory')
const browserHistory = require('react-router').browserHistory
const Match = require('react-router').Match

  ReactDOM.render(
    <div id="app" className="flex flex-column">
      <header className="title-bar flex flex-row flex-center">
        <div className="title-wrapper block center-element">
          <img className="logo" src="http://feathersjs.com/img/feathers-logo-wide.png"
            alt="Feathers Logo" />
          <span className="title">Chat</span>
        </div>
      </header>
      <Router history={hashHistory}>
        <Route path="/" component={Home}/>
        <Route path="/Login" component={Login}/>
        <Route path="/Signup" component={Signup}/>
        <Route path="/ChatApp" component={ChatApp}/>
      </Router>
    </div>
    , document.querySelector('main')
    )
