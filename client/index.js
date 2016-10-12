const ReactDOM = require('react-dom')
const React = require('react')

const Route = require('react-router').Route
const HashRouter = require('react-router').HashRouter
const App = require('./components/App')

  ReactDOM.render(
    <HashRouter>
      {({router}) => {
        return (
        <App router={router} />
        )
      }}
    </HashRouter>
    , document.querySelector('main')
    )
