import React from 'react';
import SideMenuItem from './SideMenuItem.jsx';

class SideMenu extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="navbar-default sidebar" role="navigation">
				<div className="sidebar-nav navbar-collapse">
					<ul className="nav" id="side-menu">
						<li className="sidebar-search">
                            <div className="input-group custom-search-form">
                                <button className="form-control btn btn-danger">
                                	<i className="fa fa-plus"></i> Thêm yêu cầu
                                </button>
                            </div>
                        </li>
                        <SideMenuItem title="Việc tôi yêu cầu" active="active"/>
                        <SideMenuItem title="Việc tôi được giao" active=""/>
                    </ul>
				</div>
			</div>
		);
	}
}

export default SideMenu;