import React from 'react';
import HeaderNavbar from './HeaderNavbar.jsx'
import RequestTable from './RequestTable.jsx';
import RequestDescription from './RequestDescription.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);		
	}

	render() {
		return(
			<div>
				<HeaderNavbar />
				<RequestTable />
				<RequestDescription />
			</div>
		);
	}

}	

export default App;