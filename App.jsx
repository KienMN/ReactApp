import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link,
	Switch
  } from 'react-router-dom';
  
import RequestTable from './RequestTable.jsx';
import Navbar from './Navbar.jsx';
import CreateRequestForm from './CreateRequestForm.jsx';
import ContentLayout from './ContentLayout.jsx';
import LoginForm from './LoginForm.jsx'
import Dashboard from './Dashboard.jsx'

class App extends React.Component {
	constructor(props) {
		super(props);		
	}

	render() {
		return(

			<div className="App">
				<Switch>
					<Route path="/dashboard" component={Dashboard}/>
					<Route path="/login" component={LoginForm}/>
				</Switch>				
    	</div>

		);
	}
}	

export default App;