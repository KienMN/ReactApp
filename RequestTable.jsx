import React from 'react';
import ReactDOM from 'react-dom';
import ContentLayout from './ContentLayout.jsx'
import {Link} from 'react-router-dom';
import Timestamp from 'react-timestamp';

class RequestTable extends React.Component {
	constructor(props) {
		super(props);
		//props: data cua employee_id
		this.state = {
			tableHeads: ["Tên công việc", "Mức độ ưu tiên", "Người yêu cầu", "Người thực hiện", "Ngày hết hạn", "Trạng thái"],
			tableData: [{
	            "id": 0,
	            "created_by": 1,
	            "assigned_to": 1,
	            "team_id": 1,
	            "dept_id": 1,
	            "subject": "Test create request",
	            "content": "Test create request",
	            "status": 1,
	            "priority": 1,
	            "rating": 0,
	            "relaters": [
	                1
	            ],
	            "deadline": 1513811420,
	            "created_at": 1513811420,
	            "updated_at": 1513612077,
	            "deleted_at": 0,
	            "resolved_at": 0,
	            "closed_at": 0,
	            "images": []
        	}],
        	// employee_id
			empNameAndId: [{"name": "default", "id": 1}],
			status: this.props.status
		}
	}

	componentWillReceiveProps(nextProps) {
        this.setState({
            status: nextProps.status
        })
    }

	componentWillMount() {
		const s = document.createElement('script');
    	s.type = 'text/javascript';
    	s.async = true;
    	s.src = "/RequestTable.js";
    	document.body.appendChild(s);
	}

	componentDidMount() {
		let employeesNameAndId = [];
		fetch('http://192.168.43.166:3001/api/v1/employees', {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				"sessionkey": "f18caa8deb3a9c833dd0bafe6e5b7b6680a8848ce28da2c298aae560401b9952318867ce6c31c9c7948b2271f0e6741a253f97bf89266a95398ce77d0cd26a25"
			}
		})
		// fetch('/SampleJsonData/employees.json')
		.then((res) => res.json())
		.then((result) => {
			result.data.map((p, i) => employeesNameAndId.push({"name": p.name, "id": p.employee_id}));
			this.setState({
				empNameAndId: employeesNameAndId
			})
		})
		fetch('http://192.168.43.166:3001/api/v1/requests/3/offered', {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				"sessionkey": "f18caa8deb3a9c833dd0bafe6e5b7b6680a8848ce28da2c298aae560401b9952318867ce6c31c9c7948b2271f0e6741a253f97bf89266a95398ce77d0cd26a25"
			}
		})
		.then((res) => res.json())
		.then((result) => {
			let a = [];
			result.data.map((dat, i) => {a.push(dat)});
			this.setState({
				tableData: a,
			})
		})
		
		
	}

	//props: status, user_id
	//status:0 - all, 1 - new, 2 - inprogress, 3 - resolved, 4 - feedback, 5 - closed, 6 - cancelled 
	//props: index
  	//0-Viec toi yeu cau, 1 - Cong viec lien quan, 2-Cong viec duoc giao 3- Công việc của team  4-Công việc của bộ phận IT
	 /*
	componentDidMount() {
		fetch("http://localhost:3001/api/v1/requests/" + this.props.data.employee_id, {
			method: 'GET',
			headers: {
			  "Access-Control-Allow-Origin" : "*", 
			  "sessionkey": this.props.data.sessionkey
			}
		  })
		  .then(results => {
			return results.json();
		  }).then(data => {
			if (data.status === 200) {
				console.log(data.data)
			} else {
			 //
			}
		  })
	}*/
	render() {
		const titles = ["Việc tôi yêu cầu", "Công việc liên quan", "Công việc được giao", "Công việc của team", 
			"Công việc của bộ phận IT"];
		const tableData =[];
		// = this.props.data;
		console.log(this.props.data);
		console.log(this.state);
		return (
			<div id="page-wrapper">
				<div className="row">
					<div className="col-lg-12">
						<div className="panel panel-default">
							{/* Request table title */}
							<div className="panel-heading">
								{titles[this.props.index]}
							</div>
							{/* Request table's rows */}
							<div className="panel-body">
								<div className="dataTable_wrapper">
									<table className="table table-striped table-bordered table-hover" id="requestTable">
										<thead>
											<tr>
												<th>STT</th>
												{this.state.tableHeads.map((tableHead, index) => <th key={index}>{tableHead}</th>)}
											</tr>
										</thead>
										<tbody>
											{/*tableData.map((request, index) =>  
											 (request[5] === this.props.status || this.props.status === 0) 
											 ? <TableRow key = {index} data = {request} /> : <tr></tr>)}*/}
											 {this.state.tableData.map((request, index) => <TableRow key={index} data={request} employees={this.state.empNameAndId} status={this.state.status} />)}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

class TableRow extends React.Component {
	constructor(props) {
		super(props);
		this.select = this.select.bind(this);
		this.state = {
			isRead: false,
			status: this.props.status
		}
	}

	select() {
		this.setState({isRead: true});
		ReactDOM.render(<ContentLayout requestId={this.props.data.id} employees={this.props.employees}/>, document.getElementById("dashboard"));
	}

	componentWillReceiveProps(nextProps) {
        this.setState({
            status: nextProps.status
        })
    }

	render() {
		const status = ["", "New", "In progress", "Resolved", "Feedback", "Closed", "Cancelled"];
		const priority = ["", "Thấp", "Bình thường", "Cao", "Khẩn cấp"];
		// const markRead = ["unread", "read"];
		let markRead = "unread";
		if (this.state.isRead) {
			markRead = "";
		}
		if (this.props.data.status == this.props.status || this.props.status == 0) {
		return (
			<tr onClick={this.select} className={markRead}>
				<td></td>
				<td>{this.props.data.subject}</td>
				<td>{priority[this.props.data.priority]}</td>
				<td>{this.props.employees[this.props.data.created_by - 1].name}</td>
				<td>{this.props.employees[this.props.data.assigned_to - 1].name}</td>
				<td><Timestamp time={this.props.data.deadline} format='full' /></td>
				<td>{status[this.props.data.status]}</td>
			</tr>
		);}
		else {
			return null;
		}
	}
}

export default RequestTable;