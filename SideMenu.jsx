import React from 'react';
import SideMenuItem from './SideMenuItem.jsx';

class SideMenu extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		const type_id = 2; //employee_type
		return (
	
			<div className="navbar-default sidebar" role="navigation">
				<div className="sidebar-nav navbar-collapse">
					<ul className="nav" id="side-menu">
						<li className="sidebar-search">
                            <button className="input-group custom-search-form form-control btn btn-danger">
                                <i className="fa fa-plus"></i> Thêm yêu cầu
                            </button>
                        </li>
						<SideMenuItem user_id={this.props.user_id} type="0" name="Việc tôi yêu cầu"/>
						<SideMenuItem user_id={this.props.user_id} type="1" name="Công việc liên quan"/>
						{(type_id == 1) ? 
						<SideMenuItem user_id={this.props.user_id} type="2" name="Công việc của team"/>
						: <div></div>}
						{(type_id == 2) ?
						<SideMenuItem user_id={this.props.user_id} type="3" name="Công việc của bộ phận IT"/>
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