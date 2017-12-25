import React from 'react';
import ReactDOM from 'react-dom';
import ContentLayout from './ContentLayout.jsx'
import {Link} from 'react-router-dom';
class RequestTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tableHeads: ["Tên công việc", "Mức độ ưu tiên", "Người yêu cầu", "Người thực hiện", "Ngày hết hạn", "Trạng thái"],
			tableData: [
				["Sửa bàn phím", "Cao", "Phạm Tuấn Anh", "PTA", "2017-12-18 20:00:00", 1],
				["Active window", "Bình thường", "Phạm Tuấn Anh", "PTA", "2017-12-17 20:00:00", 2],
				["Active window", "Thấp", "Phạm Tuấn Anh", "PTA", "2017-12-17 20:00:00", 3],
				["Active window", "Khẩn cấp", "Phạm Tuấn Anh", "PTA", "2017-12-17 20:00:00", 4]
			]
		}
	}

	componentWillMount() {
		const s = document.createElement('script');
    	s.type = 'text/javascript';
    	s.async = true;
    	s.src = "/RequestTable.js";
    	document.body.appendChild(s);
	}
	//props: status, user_id
	//status:0 - all, 1 - new, 2 - inprogress, 3 - resolved, 4 - feedback, 5 - closed, 6 - cancelled 
	//props: index
  	//0-Viec toi yeu cau, 1 - Cong viec lien quan, 2-Cong viec duoc giao 3- Công việc của team  4-Công việc của bộ phận IT
      
	render() {
		const titles = ["Việc tôi yêu cầu", "Công việc liên quan", "Công việc được giao", "Công việc của team", 
			"Công việc của bộ phận IT"];
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
											{this.state.tableData.map((request, index) =>  
											 (request[5] === this.props.status || this.props.status === 0) 
											 ? <TableRow key = {index} data = {request} /> : <tr></tr>)}
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
			isRead: false
		}
	}

	select() {
		this.setState({isRead: true});
		ReactDOM.render(<ContentLayout />, document.getElementById("dashboard"));
	}
	render() {
		const status = ["", "New", "In progress", "Resolved", "Feedback", "Closed", "Cancelled"];
		// const markRead = ["unread", "read"];
		let markRead = "unread";
		if (this.state.isRead) {
			markRead = "";
		}
		return (
			<tr onClick={this.select} className={markRead}>
				<td></td>
				<td>{this.props.data[0]}</td>
				<td>{this.props.data[1]}</td>
				<td>{this.props.data[2]}</td>
				<td>{this.props.data[3]}</td>
				<td>{this.props.data[4]}</td>
				<td>{status[this.props.data[5]]}</td>
			</tr>
		);
	}
}

export default RequestTable;