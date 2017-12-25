import React from 'react';
import SubItem from './SubItem.jsx'

class SideMenuItem extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			all: this.props.all,
			new: this.props.new,
			inprogress: this.props.inprogress,
			resolved: this.props.resolved,
			outdate: this.props.outdate,
			feedback: this.props.feedback,
			closed: this.props.closed
		  };
	}

	render() {
		return(
			<li className="active"><a href="#"><i className="fa fa-dashboard fa-fw"></i>  {this.props.name}<span className="fa arrow"></span></a>
				<ul className="nav nav-second-level">
					<SubItem user_id={this.props.user_id} index={0} name="All" request_count={this.state.all}/>
					<SubItem user_id={this.props.user_id} index={1} name="New" request_count={this.state.new}/>
					<SubItem user_id={this.props.user_id} index={2} name="Inprocess" request_count={this.state.inprogress}/>
					{(this.props.type > 1) ?  
					<SubItem user_id={this.props.user_id} index={4} name="Feedback" request_count={this.state.feedback}/>
					:<SubItem user_id={this.props.user_id} index={3} name="Resolved" request_count={this.state.resolved}/>}
					<SubItem user_id={this.props.user_id} index={6} name="Out Of Date" request_count={this.state.outdate}/>
					{(this.props.type > 1) ?  
					<SubItem user_id={this.props.user_id} index={5} name="Closed" request_count={this.state.closed}/>
					:<span></span>
					}
				</ul>
			</li>				
					
		);
	}
}

export default SideMenuItem;