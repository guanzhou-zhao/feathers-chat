const React = require('react')
const Link = require('react-router').Link
const app = require('../lib/app')
const hashHistory = require('../lib/hashHistory')
const Login = React.createClass({
  getInitialState() {
    return {
      email: '',
      password: ''
    }
  },
  updateEmail(ev) {
    this.setState({ email: ev.target.value });
  },
  updatePassword(ev) {
    this.setState({ password: ev.target.value });
  },
  handleSubmit(e) {
    console.log('handle login');
    e.preventDefault()
    console.log('handle submit');
    var { email, password } = this.state
    var { login } = this.props
    app.authenticate({
      type: 'local',
      'email': email,
      'password': password
    }).then(function(result){
      console.log('Authenticated!', app.get('token'));
      login()
      // hashHistory.push('/ChatApp')
    }).catch(function(error){
      console.error('Error authenticating!', error);
    });
  },
  render () {
    var { email, password } = this.state
    return (
      <main className="login container">
        <div className="row">
          <div className="col-12 col-6-tablet push-3-tablet text-center">
            <h1 className="font-100">Welcome Back</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-6-tablet push-3-tablet col-4-desktop push-4-desktop text-center">
            <form className="form" onSubmit={this.handleSubmit} method="post" action="/auth/local">
              <fieldset>
                <input onChange={this.updateEmail} className="block" type="email" name="email" placeholder="email" defaultValue={email}/>
              </fieldset>
              <fieldset>
                <input onChange={this.updatePassword} className="block" type="password" name="password" placeholder="password" defaultValue={password}/>
              </fieldset>
              <button type="submit" className="button button-primary block login">
                Login
              </button>
            </form>
          </div>
        </div>
      </main>
    )
  }
})


module.exports = Login
