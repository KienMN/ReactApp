import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link,
	Switch
  } from 'react-router-dom';
  
import RequestTable from './RequestTable.jsx';
import Navbar from './Navbar.jsx';
import LoginForm from './LoginForm.jsx'
import Dashboard from './Dashboard.jsx'


class App extends React.Component {
	constructor(props) {
		super(props);	
		this.state = {
			data: null
		}	
		this.getSessionKey = this.getSessionKey.bind(this);
	}

	getSessionKey(dt) {
		this.setState({
			data : dt
		});
	}
	render() {
		
		return(
			<div className="App">
		
				{
					(this.state.data) ? 
					<Dashboard data={this.state.data} />
					: <LoginForm onHandle={this.getSessionKey}/>
				}
				
			{/*	
			<Route path="/login"
               	render={() => <LoginForm onHandle={this.getSessionKey}/>} />
			{console.log(this.state.data)}	
			<Route path="/dashboard"
				render={() => <Dashboard data={this.state.data} />}/>						
			*/}
				</div>

		);
	}
}	

export default App;