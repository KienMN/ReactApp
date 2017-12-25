import React from 'react';

class SideMenuItem extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<li className={this.props.active}><a href="#"><i className="fa fa-dashboard fa-fw"></i> {this.props.title}<span className="fa arrow"></span></a>
				<ul className="nav nav-second-level">
					<li>
						<a href="#"><i className="fa fa-inbox fa-fw"></i> All<span className="label label-danger float-right">18</span></a>
					</li>
					<li>
						<a href="#"><i className="fa fa-envelope-o fa-fw"></i> New</a>
					</li>
					<li>
						<a href="#"><i className="fa fa-hourglass-half fa-fw"></i> Inprogress</a>
					</li>
					<li>
						<a href="#"><i className="fa fa-registered fa-fw"></i> Resolved</a>
					</li>
					<li>
						<a href="#"><i className="fa fa-calendar-minus-o fa-fw"></i> Out Of Date</a>
					</li>
				</ul>
			</li>				
					
		);
	}
}

export default SideMenuItem;