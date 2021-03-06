import React from 'react';

class HeaderNavbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: this.props.username
		}
	}
	render() {
		return (
			<div>
				<div className="navbar-header">
					<a href="#" className="navbar-brand">Callog IT</a>
				</div>

				<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>

				<ul className="nav navbar-right navbar-top-links">
					<li className="dropdown">
						<a href="" className="dropdown-toggle" data-toggle="dropdown">
							<i className="fa fa-user fa-fw"></i> {this.state.username} <b className="caret"></b>
						</a>
						<ul className="dropdown-menu dropdown-user">
							<li>
								<a href="#"><i className="fa fa-user fa-fw"></i> User Profile</a>
							</li>
							<li>
								<a href="#"><i className="fa fa-gear fa-fw"></i> Settings</a>
							</li>
							<li className="divider"></li>
							<li>
								<a href="/"><i className="fa fa-sign-out fa-fw"></i> Logout</a>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		);
	}
}

export default HeaderNavbar;