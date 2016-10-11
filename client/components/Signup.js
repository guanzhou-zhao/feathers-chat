const React = require('react')
const Link = require('react-router').Link
const app = require('../lib/app')
const hashHistory = require('../lib/hashHistory')
const Signup = React.createClass({
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
    e.preventDefault()
    console.log('handle submit');
    var userService = app.service('users')
    userService.on('created', user => {
      console.log('Created a user', user)
      hashHistory.push('/Login')
    });
    console.log(this.state.email, this.state.password);
    userService.create({
      'email': this.state.email,
      'password': this.state.password
    })

  },
  render() {
    var { email, password } = this.state
    return (
      <main className="login container">
        <div className="row">
          <div className="col-12 col-6-tablet push-3-tablet text-center">
            <h1 className="font-100">Create an Account</h1>
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


module.exports = Signup
