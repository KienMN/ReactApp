import React from 'react';

let a = [];

class CallApiTest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			employee_id: 3,
			data: [],
			message: "",
			status: "",
		}
	}

	componentDidMount() {
		// fetch("http://192.168.43.166:3001/api/v1/employees", {
		// 	method: 'GET',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		'sessionkey': '7b98dc9ecde1b22c827a1f647c343f32f0994c12700ef01998c25f54a5d56e37135e8bee4fc4cbda987dd34edd2dc1911060d7086fe131b5ddeb7fd5f04f7f1a'
		// 	}
		// }).then(res => res.json())
		// .then(
		// 	(result) => {
		// 		// alert(JSON.stringify(result.data));
		// 		console.log(result.data[0]);
				
		// 		this.setState({
		// 			data: (JSON.stringify(result.data)), // can not store json
		// 			message: result.message,
		// 			status: result.status
		// 		})
		// 		console.log(this.state.data[0]);
		// 	},
		// )
		fetch("/testData.json").then(res => res.json())
      		.then(
        		(result) => {		
          			result.data.map((p, i) => {
          				a.push(p);
          			})
          			
				},)
      	console.log(a);
	}

	render() {
		return (
			<div>
				
			</div>
		)
	}
}

export default CallApiTest;