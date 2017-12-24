import React from 'react';
import HeaderNavbar from './HeaderNavbar.jsx'
import RequestTable from './RequestTable.jsx';
import RequestDescription from './RequestDescription.jsx';
import SideMenuItem from './SideMenuItem.jsx';
import Navbar from './Navbar.jsx';



class App extends React.Component {
	constructor(props) {
		super(props);		
	}

	render() {
		return(
			<div>
				<Navbar />
				<RequestTable />
				<RequestDescription />
			</div>
		);
	}
}	

export default App;