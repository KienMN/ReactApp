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
	onClick() {
		alert(1)
	}
	render() {

		const type = this.props.type;
		return(
			<li className={this.props.active}><a href="#"><i className="fa fa-dashboard fa-fw"></i>  {this.props.name}<span className="fa arrow"></span></a>
				<ul className="nav nav-second-level">
					<SubItem user_id={this.props.user_id} index={type} status={0} name="All" request_count={this.state.all} handleClick={this.onClick}/>
					<SubItem user_id={this.props.user_id} index={type} status={1} name="New" request_count={this.state.new} handleClick={this.onClick}/>
					<SubItem user_id={this.props.user_id} index={type} status={2} name="Inprocess" request_count={this.state.inprogress} handleClick={this.onClick}/>
					{(this.props.type > 1) ?  
					<SubItem user_id={this.props.user_id} index={type} status={4} name="Feedback" request_count={this.state.feedback} handleClick={this.onClick}/>
					:<SubItem user_id={this.props.user_id} index={type} status={3} name="Resolved" request_count={this.state.resolved} handleClick={this.onClick}/>}
					<SubItem user_id={this.props.user_id} index={type} status={6} name="Out Of Date" request_count={this.state.outdate} handleClick={this.onClick}/>
					{(this.props.type > 1) ?  
					<SubItem user_id={this.props.user_id} index={type} status={5} name="Closed" request_count={this.state.closed} handleClick={this.onClick}/>
					:<span></span>
					}
				</ul>
			</li>				
					
		);
	}
}
SideMenuItem.defaultProps = {
	user_id: 0,
	type: 0, //0-Viec toi yeu cau, 1 - Cong viec lien quan, 2-Cong viec duoc giao 3- Công việc của team  4-Công việc của bộ phận IT
	name: 'Side menu',
	all: 18,
	new: 12,
	inprogress: 5,
	resolved: 0,
	outdate: 1, 
	closed: 5
  };
export default SideMenuItem;