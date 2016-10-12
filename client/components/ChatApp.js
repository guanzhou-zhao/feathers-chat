const React = require('react')
const app = require('../lib/app')
const ReactDOM = require('react-dom')
const UserList = require('./UserList')
const MessageList = require('./MessageList')
const ComposeMessage = require('./ComposeMessage')


const ChatApp = React.createClass({
  getInitialState() {
    return {
      users: [],
      messages: []
    };
  },

  componentDidUpdate: function() {
    // Whenever something happened, scroll to the bottom of the chat window
    const node = ReactDOM.findDOMNode(this).querySelector('.chat');
    node.scrollTop = node.scrollHeight - node.clientHeight;
  },

  componentDidMount() {
    const userService = app.service('users');
    const messageService = app.service('messages');

    // Find all users initially
    userService.find().then(page => this.setState({ users: page.data }));
    // Listen to new users so we can show them in real-time
    userService.on('created', user => this.setState({
      users: this.state.users.concat(user)
    }));

    // Find the last 10 messages
    messageService.find({
      query: {
        $sort: { createdAt: -1 },
        $limit: this.props.limit || 10
      }
    }).then(page => this.setState({ messages: page.data.reverse() }));
    // Listen to newly created messages
    messageService.on('created', message => this.setState({
      messages: this.state.messages.concat(message)
    }));
  },

  render() {
    return(
    <div id="app" className="flex flex-column">
      <header className="title-bar flex flex-row flex-center">
        <div className="title-wrapper block center-element">
          <img className="logo" src="http://feathersjs.com/img/feathers-logo-wide.png"
            alt="Feathers Logo" />
          <span className="title">Chat</span>
        </div>
      </header>
    <div className="flex flex-row flex-1 clear">
      <UserList users={this.state.users} />
      <div className="flex flex-column col col-9">
        <MessageList users={this.state.users} messages={this.state.messages} />
        <ComposeMessage />
      </div>
    </div>
  </div>)
  }
});

module.exports = ChatApp
