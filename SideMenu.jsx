import React from 'react';
import ReactDOM from 'react-dom';
import SideMenuItem from './SideMenuItem.jsx';
import {Link} from 'react-router-dom';
import CreateRequestForm from './CreateRequestForm.jsx';

class SideMenu extends React.Component {
	//props: data
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		const employee_id = this.props.data.employee_id;
		const sessionkey = this.props.data.sessionkey;
		ReactDOM.render(<CreateRequestForm employee_id= {employee_id} sessionkey={sessionkey}/>, document.getElementById("dashboard"));
	}
	render() {
		const type_id = this.props.data.type; //employee_type
		return (	
			<div className="navbar-default sidebar" role="navigation">
				<div className="sidebar-nav navbar-collapse">
					<ul className="nav" id="side-menu">
						<li className="sidebar-search">
							<button onClick={this.handleClick}className="input-group custom-search-form form-control btn btn-danger">
                                <i className="fa fa-plus"></i> Thêm yêu cầu
                            </button>
                        </li>
						<SideMenuItem data={this.props.data} user_id={this.props.user_id} type={0} name="Việc tôi yêu cầu" active="active"/>
						<SideMenuItem data={this.props.data} user_id={this.props.user_id} type={1} name="Công việc liên quan"/>
						<SideMenuItem data={this.props.data} user_id={this.props.user_id} type={2} name="Công việc tôi được giao"/>
						{(type_id == 1) ? 
						<SideMenuItem data={this.props.data} user_id={this.props.user_id} type={3} name="Công việc của team" />
						: <div></div>}
						{(type_id == 2) ?
						<SideMenuItem data={this.props.data} user_id={this.props.user_id} type={4} name="Công việc của bộ phận IT"/>
						:<div></div>
						}
            </ul>
				</div>			
			</div>
		);
	}
}
SideMenu.defaultProps = {
	user_id : 1
}
export default SideMenu;