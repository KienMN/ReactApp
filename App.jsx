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

class App extends React.Component {
	constructor(props) {
		super(props);		
	}

	render() {
		return(
			<div className="App">
				<Navbar />
				<RequestTable />	
    		</div>
		);
	}
}	

export default App;