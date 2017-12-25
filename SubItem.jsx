import React from 'react';
import ReactDOM from 'react-dom';
import {Link, Route, Router} from 'react-router-dom';
import RequestTable from './RequestTable.jsx'

/** 
  * Components: SubItem
  * In progress
  * Chua xu ly is_new, is_active
  * colorful badge
*/
class SubItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          //props: index
            status: this.props.status,
            name: this.props.name,
            request_count: this.props.request_count,
            is_new: this.props.is_new, 
            is_active: this.props.is_active, 
          
        };
        this.handleClick = this.handleClick.bind(this);
    }
    //cannot found #dashboard
    handleClick() {
        ReactDOM.render(<RequestTable index={this.props.index} status={this.props.status}/>, document.getElementById("dashboard"));
    }
    render() {
        //status
        //1 - new, 2 - inprogress, 3 - resolved, 4 - feedback, 5 - closed,6 - cancelled
        const icons = [
            {label: "label label-primary", gly: "fa fa-inbox fa-fw"},   //all
            {label: "label label-success", gly: "fa fa-envelope-o fa-fw"}, //new
            {label: "label label-info", gly: "fa fa-hourglass-half fa-fw"},     //inprogress
            {label: "label label-warning", gly: "fa fa-registered fa-fw"}, //resolved 
            {label: "label label-default", gly: "fa fa-comments-o"}, //feedback
            {label: "la bel label-disable", gly: "fa fa-close"}, //closed
            {label: "label label-danger", gly: "fa fa-calendar-times-o"} //outofdate
        ];
        //index: 
        //0-Viec toi yeu cau, 1 - Cong viec lien quan, 2-Cong viec duoc giao 3- Công việc của team  4-Công việc của bộ phận IT
        const request_link = ["my", "related", "offered", "team", "dept"];
       
        
        return(
            <div>
            {/*width phai bang voi width o subSideMenu
            <li>
				<a href="#"><i className="fa fa-inbox fa-fw"></i> All<span className="label label-danger float-right">18</span></a>
            </li>
            */}    
            {/*
            <Link to={"/dashboard/"+ request_link[this.props.index]}>
            */}
            
            <button style={{width:'100%', textAlign:'left'}} onClick={this.handleClick} className="list-group-item">
                <i className={icons[this.props.status].gly}></i> {"  " + this.props.name}
                { (this.props.request_count > 0) ? 
                 <span style={{float: 'right'}} className={icons[this.props.status].label}>{this.props.request_count}</span>
                 : <span></span>
                }
            </button>
            {/*</Link>*/}
            </div>
        );
    }
}

SubItem.defaultProps = {
    index: 1,
    user_id: 1,
    name: 'Sub',
    request_count: 0,
    is_new: false, 
    is_active: false
};

export default SubItem;