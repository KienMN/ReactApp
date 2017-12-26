import React from 'react';
import HeaderNavbar from './HeaderNavbar.jsx';
import SideMenu from './SideMenu.jsx';


class Navbar extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="navbar navbar-inverse navbar-fixed-top" role="navigation">
				<HeaderNavbar />
				<SideMenu data={this.props.data}/>
			</div>
		);
	}
}

export default Navbar;