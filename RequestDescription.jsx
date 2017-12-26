import React from "react";
import AssignedEmployeeSuggest from './AssignedEmployeeSuggest.jsx';
import RelatersSuggest from './RelatersSuggest.jsx';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import Timestamp from 'react-timestamp'

let employeesNameAndId = [];

class RequestDescription extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				"created_by": 1,
				"status": 1,
				"priority": 2,
				"created_at": 1513811420,
				"deadline": 1513811420,
				"dept_id": 2,
				"assigned_to": 1,
				"relaters": [1]
			},
			tmpData: {
				"created_by": 1,
				"status": 1,
				"priority": 2,
				"created_at": 1513811420,
				"deadline": 1513811420,
				"dept_id": 2,
				"assigned_to": 1,
				"relaters": [1]
			},
			availableStatus: [0, 0, 0, 0, 0, 1],
			empNameAndId: this.props.employees
		}
		// Handle change dept
		this.handleDeptChange = this.handleDeptChange.bind(this);
		this.handleSubmitDeptChange = this.handleSubmitDeptChange.bind(this);
		this.resetDept = this.resetDept.bind(this);
		// Handle change priority
		this.handlePriorityChange = this.handlePriorityChange.bind(this);
		this.handleReasonChange = this.handleReasonChange.bind(this);
		this.handleSubmitPriorityChange = this.handleSubmitPriorityChange.bind(this);
		this.resetPriority = this.resetPriority.bind(this);
		// Handle change day
		this.handleDayChange = this.handleDayChange.bind(this);
		// Handle change relaters
		this.handleRelatersRemove = this.handleRelatersRemove.bind(this);
		this.handleRelatersAdd = this.handleRelatersAdd.bind(this);
		this.handleSubmitRelatersChange = this.handleSubmitRelatersChange.bind(this);
		this.resetRelaters = this.resetRelaters.bind(this);
		// Hanlde change assigned employee
		this.handleAssignedEmployeeChange = this.handleAssignedEmployeeChange.bind(this);
		this.handleSubmitAssignedEmployeeChange = this.handleSubmitAssignedEmployeeChange.bind(this);
		// Handle change status
		this.handleStatusChange = this.handleStatusChange.bind(this);
		this.handleSubmitStatusChange = this.handleSubmitStatusChange.bind(this);
		this.resetStatus = this.resetStatus.bind(this);
	}

	componentDidMount() {
		let resultData;
		let resultTmpData;
		fetch('http://192.168.43.166:3001/api/v1/requests/3/info/' + this.props.requestId,{
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				"sessionkey": "f18caa8deb3a9c833dd0bafe6e5b7b6680a8848ce28da2c298aae560401b9952318867ce6c31c9c7948b2271f0e6741a253f97bf89266a95398ce77d0cd26a25"
			}
		})
		.then((res) => res.json())
		.then((result) => {
			resultData = result.data;
			resultTmpData = JSON.parse(JSON.stringify(result.data));
			this.setState({
				data: resultData,
				tmpData: resultTmpData
			})
		})
		let dataRelaters = []
		// fetch('/SampleJsonData/employees.json').then((res) => res.json())
		// .then((result) => {
		// 	result.data.map((p, i) => employeesNameAndId.push({"name": p.name, "id": p.employee_id}));
		// 	this.setState({
		// 		data: resultData,
		// 		tmpData: resultTmpData,
		// 		empNameAndId: employeesNameAndId
		// 	})
		// })
	}

	// Handle change dept
	handleDeptChange(event) {
    	let new_dept_id = Number.parseInt(event.target.value);
    	this.setState((prevState, props) => {
    		let {dept_id, ...others} = prevState.tmpData;
    		return {tmpData: {dept_id: new_dept_id, ...others}}
    	});
  	}
  	handleSubmitDeptChange(event) {
  		let new_dept_id = this.state.tmpData.dept_id;
  		this.setState((prevState, props) => {
  			let {dept_id, ...others} = prevState.data;
  			return {data: {dept_id: new_dept_id, ...others}};
  		});
  	}
  	resetDept(event) {
		let old_dept_id = this.state.data.dept_id;
		this.setState((prevState, props) => {
			let {dept_id, ...others} = prevState.tmpData;
			return {tmpData: {dept_id: old_dept_id, ...others}};
		});
	}
	// Handle change priority
	handlePriorityChange(event) {
		let newPriority = Number.parseInt(event.target.value);
    	this.setState((prevState, props) => {
    		let {priority, ...others} = prevState.tmpData;
    		return {tmpData: {priority: newPriority, ...others}}
    	});
	}
	handleReasonChange(event) {
		if (event.target.value.length != 0) {
			document.getElementById("changePriorityButton").className = "btn btn-primary";
		} else {
			document.getElementById("changePriorityButton").className = "btn btn-primary disabled";
		}
	}
	handleSubmitPriorityChange(event) {
		let newPriority = this.state.tmpData.priority;
		alert(document.getElementById("reason").value);
    	this.setState((prevState, props) => {
    		let {priority, ...others} = prevState.data;
    		return {data: {priority: newPriority, ...others}};
    	});
	}
	resetPriority(event) {
		let oldPriority = this.state.data.priority;
    	this.setState((prevState, props) => {
    		let {priority, ...others} = prevState.tmpData;
    		return {tmpData: {priority: oldPriority, ...others}}
    	});
	}
	// Handle change deadline
	handleDayChange(date) {
		console.log(date);
	}
	// Handle change relaters
	handleRelatersRemove(event) {
		let index = event.target.id;
        this.state.tmpData.relaters.splice(index, 1);
        let newRelaters = this.state.tmpData.relaters;
        this.setState((prevState, props) => {
              let {relaters, ...others} = prevState.tmpData;
              return {tmpData: {relaters: newRelaters, ...others}};
        });
	}
	handleRelatersAdd(empId) {
		// Check if username is existed
		if (this.state.tmpData.relaters.filter(relater => (relater === empId)).length == 0) {
			this.state.tmpData.relaters.push(empId);
	        let newRelaters = this.state.tmpData.relaters;
	        this.setState((prevState, props) => {
	              let {relaters, ...others} = prevState.tmpData;
	              return {tmpData: {relaters: newRelaters, ...others}};
	        });	
		}
	}
	handleSubmitRelatersChange() {
		let newRelaters = this.state.tmpData.relaters;
    	this.setState((prevState, props) => {
    		let {relaters, ...others} = prevState.data;
    		return {data: {relaters: newRelaters, ...others}};
    	});
	}
	resetRelaters() {
		let oldRelaters = this.state.data.relaters.splice();
    	this.setState((prevState, props) => {
    		let {relaters, ...others} = prevState.tmpData;
    		return {tmpData: {relaters: oldRelaters, ...others}};
    	});
	}
	// Handle change assigned employee
	handleAssignedEmployeeChange(empId) {
		let newAssignedEmployee = empId;
		this.setState((prevState, props) => {
              let {assigned_to, ...others} = prevState.tmpData;
              return {tmpData: {assigned_to: newAssignedEmployee, ...others}};
        });
	}

	handleSubmitAssignedEmployeeChange() {
		let newAssignedEmployee = this.state.tmpData.assigned_to;
		this.setState((prevState, props) => {
			let {assigned_to, ...others} = prevState.data;
			return {data: {assigned_to: newAssignedEmployee, ...others}};
		});
	}
	// Handle change status
	handleStatusChange(event) {
    	let newStatus = Number.parseInt(event.target.value);
    	this.setState((prevState, props) => {
    		let {status, ...others} = prevState.tmpData;
    		return {tmpData: {status: newStatus, ...others}}
    	});
  	}
  	handleSubmitStatusChange(event) {
  		let newStatus = this.state.tmpData.status;
  		this.setState((prevState, props) => {
  			let {status, ...others} = prevState.data;
  			return {data: {status: newStatus, ...others}};
  		});
  	}
  	resetStatus(event) {
		let oldStatus = this.state.data.status;
		this.setState((prevState, props) => {
			let {status, ...others} = prevState.tmpData;
			return {tmpData: {status: oldStatus, ...others}};
		});
	}

	render() {
		const deptNames = ["Hà Nội - IT", "Đà Nẵng - IT"];
		const priority = ["", "Thấp", "Bình thường", "Cao", "Khẩn cấp"];
		const status = ["", "New", "In progress", "Resolved", "Feedback", "Closed", "Cancelled"];
		
		return (
			<div>
				{/* Request Info */}
				<div className="row">
					<div className="col-lg-12">
						<div className="panel panel-default">
							{/* Request title */}
							<div className="panel-heading">
								{this.state.data.subject}
							</div>
							{/* Edit buttons */}
							<div className="break-line">
								<p className="text-center">
									<button type="button" className="btn btn-default" data-toggle="modal" data-target="#deptChangeModal"><i className="fa fa-users" aria-hidden="true"></i> Thay đổi bộ phận IT</button>
									<button type="button" className="btn btn-default" data-toggle="modal" data-target="#priorityChangeModal"><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Thay đổi mức độ ưu tiên</button>
									<button type="button" className="btn btn-default" data-toggle="modal" data-target="#deadlineChangeModal"><i className="fa fa-calendar" aria-hidden="true"></i> Thay đổi deadline</button>
									<button type="button" className="btn btn-default" data-toggle="modal" data-target="#relatersChangeModal"><i className="fa fa-user" aria-hidden="true"></i> Thay đổi người liên quan</button>
									<button type="button" className="btn btn-default" data-toggle="modal" data-target="#assignedEmployeeChangeModal"><i className="fa fa-hand-o-right" aria-hidden="true"></i> Assign</button>
									<button type="button" className="btn btn-default" data-toggle="modal" data-target="#statusChangeModal"><i className="fa fa-exchange" aria-hidden="true"></i> Thay đổi trạng thái <b className="caret"></b></button>
								</p>
							</div>
							{/* Request Info */}
							<div className="panel-body">
								<div className="dataTable_wrapper">
									<table className="table table-borderless" id="testTable">
										<tbody>
											<tr>
												<td><span><strong>Ngày tạo:</strong></span></td>
												<td><Timestamp time={this.state.data.created_at} format='full' /></td>
												<td><span><strong>Ngày hết hạn:</strong></span></td>
												<td><Timestamp time={this.state.data.deadline} format='full' /></td>
												<td></td>
												<td></td>
											</tr>
											<tr>
												<td><span><strong>Người yêu cầu:</strong></span></td>
												<td>{this.state.empNameAndId[this.state.data.created_by - 1].name}</td>
												<td><span><strong>Người thực hiện:</strong></span></td>
												<td>{this.state.empNameAndId[this.state.data.assigned_to - 1].name}</td>
												<td><span><strong>Bộ phận IT:</strong></span></td>
												<td>{deptNames[this.state.data.dept_id]}</td>
											</tr>
											<tr>
												<td><span><strong>Mức độ ưu tiên:</strong></span></td>
												<td>{priority[this.state.data.priority]}</td>
												<td><span><strong>Trạng thái:</strong></span></td>
												<td>{status[this.state.data.status]}</td>
												<td><span><strong>Người liên quan:</strong></span></td>
												<td>
													{this.state.data.relaters.map((person, i) => this.state.empNameAndId[person - 1].name + "; ")}
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Pop-up menu */}
				{/* Dept Change Modal */}
				<div className="modal fade" id="deptChangeModal" role="dialog">
					<div className="modal-dialog">
						{/*<!-- Modal content-->*/}
						<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="close" data-dismiss="modal">&times;</button>
								<h4 className="modal-title">Thay đổi bộ phận IT</h4>
							</div>
							<div className="modal-body">
								<p>Chọn bộ phận IT</p>
								<select className="form-control" onChange={this.handleDeptChange} value={this.state.tmpData.dept_id}>
									<option value="1">Hà Nội - IT</option>
									<option value="2">Đà Nẵng - IT</option>
								</select>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleSubmitDeptChange}>Xác nhận</button>
								<button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.resetDept}>Huỷ</button>
							</div>
						</div>
					</div>
				</div>

				{/* Priority Change Modal */}
				<div className="modal fade" id="priorityChangeModal" role="dialog">
					<div className="modal-dialog">
						{/*<!-- Modal content-->*/}
						<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="close" data-dismiss="modal">&times;</button>
								<h4 className="modal-title">Thay đổi mức độ ưu tiên</h4>
							</div>
							<div className="modal-body">
								<label>Chọn mức độ</label>
								<select className="form-control" onChange={this.handlePriorityChange} value={this.state.tmpData.priority}>
									<option value="1">Thấp</option>
									<option value="2">Bình thường</option>
									<option value="3">Cao</option>
									<option value="4">Khẩn cấp</option>
								</select>
								<br/>
								<label>Lý do thay đổi mức độ (bắt buộc)</label>
								<textarea className="form-control" onChange={this.handleReasonChange} id="reason" />
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-primary disabled" data-dismiss="modal" onClick={this.handleSubmitPriorityChange} id="changePriorityButton">Xác nhận</button>
								<button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.resetPriority}>Huỷ</button>
							</div>
						</div>
					</div>
				</div>

				{/* Deadline Change Modal */}
				<div className="modal fade" id="deadlineChangeModal" role="dialog">
					<div className="modal-dialog">
						{/*<!-- Modal content-->*/}
						<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="close" data-dismiss="modal">&times;</button>
								<h4 className="modal-title">Thay đổi deadline</h4>
							</div>
							<div className="modal-body">
								<label>Chọn deadline</label>
								<DayPickerInput onDayChange={this.handleDayChange} />
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-primary" data-dismiss="modal">Xác nhận</button>
								<button type="button" className="btn btn-default" data-dismiss="modal">Huỷ</button>
							</div>
						</div>
					</div>
				</div>

				{/* Relaters Change Modal */}
				<div className="modal fade" id="relatersChangeModal" role="dialog">
					<div className="modal-dialog">
						{/*<!-- Modal content-->*/}
						<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="close" data-dismiss="modal">&times;</button>
								<h4 className="modal-title">Thay đổi người liên quan</h4>
							</div>
							<div className="modal-body">
								<label>Danh sách người liên quan</label>
								<RelatersSuggest relaters = {this.state.tmpData.relaters} removeRelater={this.handleRelatersRemove} addRelater={this.handleRelatersAdd} employeesNameAndId={this.state.empNameAndId}/>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleSubmitRelatersChange}>Xác nhận</button>
								<button type="button" className="btn btn-default" data-dismiss="modal">Huỷ</button>
							</div>
						</div>
					</div>
				</div>
				{/* Assigned Employee Change Modal */}
				<div className="modal fade" id="assignedEmployeeChangeModal" role="dialog">
					<div className="modal-dialog">
						{/*<!-- Modal content-->*/}
						<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="close" data-dismiss="modal">&times;</button>
								<h4 className="modal-title">Thay đổi người thực hiện</h4>
							</div>
							<div className="modal-body">
								<label>Nhập tên người thực hiện</label>
								<AssignedEmployeeSuggest assignedEmployee={this.state.data.assigned_to} buttonId="changeAssignedEmployeeButton" employeesNameAndId={this.state.empNameAndId} changeEmployee={this.handleAssignedEmployeeChange}/>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-primary disabled" data-dismiss="modal" onClick={this.handleSubmitAssignedEmployeeChange} id="changeAssignedEmployeeButton">Xác nhận</button>
								<button type="button" className="btn btn-default" data-dismiss="modal">Huỷ</button>
							</div>
						</div>
					</div>
				</div>
				
				{/* Status Change Modal */}
				<div className="modal fade" id="statusChangeModal" role="dialog">
					<div className="modal-dialog">
						{/*<!-- Modal content-->*/}
						<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="close" data-dismiss="modal">&times;</button>
								<h4 className="modal-title">Thay đổi trạng thái</h4>
							</div>
							<div className="modal-body">
								<label>Lựa chọn trạng thái</label>
								<select className="form-control" onChange={this.handleStatusChange} value={this.state.tmpData.status}>
									{this.state.availableStatus.map((val, i) => (val == 0) ? <option value={i + 1} key={i} disabled>{status[i + 1]}</option> : <option value={i + 1} key={i}>{status[i + 1]}</option>)};
								</select>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleSubmitStatusChange}>Xác nhận</button>
								<button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.resetStatus}>Huỷ</button>
							</div>
						</div>
					</div>
				</div>{/* End of pop up */}
			</div>
		);
	}
}

export default RequestDescription;