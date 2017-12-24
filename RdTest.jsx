import React from "react";

class RdTest extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			data: {
				"created_by": "Phạm Tuấn Anh",
				"status": "New",
				"priority": "2",
				"created_at": "2017/12/20 14:00:00",
				"deadline": "2017/12/20 16:00:00",
				"dept_id": "2",
				"assigned_to": "NA",
				"relaters": ""
			},data2: {}
		}
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		// this.setState({data: {status: event.target.value}});
		let newStatus = event.target.value;
		console.log(newStatus);
		this.setState((prevState, props) => {
			let {status, ...others} = prevState.data;
			return {data: {status: newStatus, ...others}};
		})
				
		console.log(this.state.data.status);
		console.log(this.state.data.priority);
		console.log(this.state.data.created_by);
	}

	render() {
		return (
			<div>
				<textarea onChange={this.handleChange} />
				<button></button>
			</div>
		);
	}
}

export default RdTest;