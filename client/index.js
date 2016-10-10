const ReactDOM = require('react-dom')
const React = require('react')
const app = require('./lib/app')
const ChatApp = require('./components/ChatApp')

app.authenticate().then(() => {
  ReactDOM.render(<div id="app" className="flex flex-column">
  <header className="title-bar flex flex-row flex-center">
    <div className="title-wrapper block center-element">
      <img className="logo" src="http://feathersjs.com/img/feathers-logo-wide.png"
        alt="Feathers Logo" />
      <span className="title">Chat</span>
    </div>
  </header>

  <ChatApp />
</div>, document.querySelector('main'));
}).catch(error => {
  if(error.code === 401) {
    window.location.href = '/login.html'
  }

  console.error(error);
});
