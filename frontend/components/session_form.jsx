
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { login, signup, receiveErrors } from '../actions/session_actions';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleErrors = this.handleErrors.bind(this);
  }

  update(field) {
		return e => this.setState({
			[field]: e.currentTarget.value
		});
	}

  handleSubmit() {
    this.props.processForm({email: this.state.email, password: this.state.password})
      .then(() => this.props.router.push("/"));
  }

  handleErrors() {
    this.props.receiveErrors({});
  }


  render() {
    const formType = this.props.formType;
    const header = formType === "/login" ? "Sign In" : "Sign Up";
    const buttonText = formType === "/login" ? "Sign In" : "Sign Up";
    const otherForm = this.props.formType === "/login" ? "/signup" : "/login";
    const otherLinkText = formType === "/login" ? "New to Getflix? " : "Already a member? ";
    const otherFormText = this.props.formType === "/login" ? "Sign up now." : "Sign in now.";
    const errors = this.props.errors.responseJSON != undefined ? this.props.errors.responseJSON.join(", ") : this.props.errors.responseText;

    let errorBox;

    if (errors) {
      errorBox = <detail className="errorBox" >{errors}</detail>;
    } else {
      errorBox = <detail></detail>;
    }

    return (
      <div className="sessionForm">

          <form className="formWindow" onSubmit={this.handleSubmit} >
            <h1>{header}</h1>
            {errorBox}
            <label> Email
              <input type="text" onChange={this.update('email')} value={this.state.email} />
            </label>
            <label> Password
              <input type="password" onChange={this.update('password')} value={this.state.password} />
            </label>

            <button className="submitBtn" >{ buttonText }</button>

            <label className="otherForm">
              { otherLinkText }
              <Link to={otherForm} onClick={this.handleErrors} className="otherLink">{otherFormText}</Link>
            </label>
          </form>

        <img className="splashImg" src="https://assets.nflxext.com/ffe/siteui/acquisition/login/login-the-crown_2-1500x1000.jpg" />
      </div>
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: state.session.currentUser ? true : false,
    errors: state.session.errors,
    formType: ownProps.location.pathname
  };

};

const mapDispatchToProps = (dispatch, ownProps) => {
  const formAction = ownProps.location.pathname;
  if (formAction === '/login') {
      return {
        processForm: (user) => (dispatch(login(user))),
        receiveErrors: (errors) => (dispatch(receiveErrors(errors)))
      };
    } else {
      return {
        processForm: (user) => (dispatch(signup(user))),
        receiveErrors: (errors) => (dispatch(receiveErrors(errors)))
      };
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);