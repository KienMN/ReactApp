import React from 'react';
import './css/loginForm.css'
import ReactDOM from 'react-dom'
import {Link, Redirect} from 'react-router-dom';
import Dashboard from './Dashboard.jsx'
class LoginForm extends React.Component {
    
    constructor(props) {
      super(props);
      
      this.state = {
        username: '',
        password: '',
        passwordConfirm: '', 
        valid: false
      };
      
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.submitData = this.submitData.bind(this);
    }
    
    handleChange(e) {
      e.target.classList.add('active');
      
      this.setState({
        [e.target.name]: e.target.value
      });
      
      this.showInputError(e.target.name);
    }
 
    handleSubmit(e) {    
      e.preventDefault();
      console.log('component state', JSON.stringify(this.state));
      
      if (!this.showFormErrors()) {
        console.log('form is invalid: do not submit');
      } else {
        console.log('form is valid: submit');
        this.submitData();
     
        // if (this.state.valid)  this.context.router.push("/dashboard") 
       // else this.props.history.push("/login") 
      }
    }
    
    submitData() {
      fetch('http://localhost:3001/api/v1/login', {
        method: 'POST',
        headers: {
          "Access-Control-Allow-Origin" : "*"
        }, 
        body:JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      })
      .then(results => {
        return results.json();
      }).then(data => {
        if (data.status === 200) {
          this.props.onHandle(data.data)
          //console.log(data.data.sessionkey)
          this.setState({
            valid: true
          });


        } else {
          this.setState({
            valid: false
          });
        }
      })
    }


      showFormErrors() {
      const inputs = document.querySelectorAll('input');
      let isFormValid = true;
      
      inputs.forEach(input => {
        input.classList.add('active');
        
        const isInputValid = this.showInputError(input.name);
        
        if (!isInputValid) {
          isFormValid = false;
        }
      });
      
      return isFormValid;
    }
    
    showInputError(refName) {
      const validity = this.refs[refName].validity;
      const label = document.getElementById(`${refName}Label`).textContent;
      const error = document.getElementById(`${refName}Error`);
      const isPassword = refName.indexOf('password') !== -1;
      const isPasswordConfirm = refName === 'passwordConfirm';
        
      if (isPasswordConfirm) {
        if (this.refs.password.value !== this.refs.passwordConfirm.value) {
          this.refs.passwordConfirm.setCustomValidity('Passwords do not match');
        } else {
          this.refs.passwordConfirm.setCustomValidity('');
        }
      }
          
      if (!validity.valid) {
        if (validity.valueMissing) {
          error.textContent = `${label} is a required field`; 
        } else if (validity.typeMismatch) {
          error.textContent = `${label} should be a valid email address`; 
        } else if (isPassword && validity.patternMismatch) {
          error.textContent = `${label} should be longer than 4 chars`; 
        } else if (isPasswordConfirm && validity.customError) {
          error.textContent = 'Passwords do not match';
        }
        return false;
      }
      
      error.textContent = '';
      return true;
    }
  
    render() {
      const loginStyles = {backgroundColor: 'white', 
        borderRadius: 3, 
        padding: 20,
        width: 500,
        marginTop: '10%'
      };
      return (
        <div style={loginStyles} id="login-container" className="container">
        <form id="login-form" noValidate>
          <div className="form-group">
            <label id="usernameLabel">Username</label>
            <input className="form-control"
              type="username"
              name="username"
              ref="username"
              placeholder="example@example.com"
              value={ this.state.username } 
              onChange={ this.handleChange }
              required />
            <div className="error" id="usernameError" />
          </div>
          <div className="form-group">
            <label id="passwordLabel">Password</label>
            <input className="form-control"
              type="password" 
              name="password"
              ref="password"
              value={ this.state.password } 
              onChange={ this.handleChange }
              pattern=".{5,}"
              required />
            <div className="error" id="passwordError" />
          </div>
          <div className="form-group">
            <label id="passwordConfirmLabel">Confirm Password</label>
            <input className="form-control"
              type="password" 
              name="passwordConfirm"
              ref="passwordConfirm"
              value={ this.state.passwordConfirm } 
              onChange={ this.handleChange }
              required />
            <div className="error" id="passwordConfirmError" />
          </div>
          <Link to = "/dashboard">
          <button className="btn btn-primary pull-right btn-lg"
            onClick={this.handleSubmit}>Login</button>
          </Link>
        </form>
        </div>
      );
    }
  }
  export default LoginForm;