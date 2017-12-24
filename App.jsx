import React from 'react';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data:
			["Alo"],
			header: "This is a header",
			content: "This is content"
		}
		this.setStateHandler = this.setStateHandler.bind(this);
		this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
	}

	setStateHandler() {
		var item = "Setting state...";
		var myArray = this.state.data.slice();
		myArray.push(item);
		this.setState({data: myArray});
	}

	forceUpdateHandler() {
		this.forceUpdate();
	}

	render() {
		return (
			<div>
				Hello World!!!
            	<Header headerProp={this.state.header} />
				<Content contentProp={this.state.content} />
				<button onClick={this.setStateHandler}>SET STATE</button>
				<h4>{this.state.data}</h4>
				<button onClick={this.forceUpdateHandler}>FORCE UPDATE</button>
				<h4>{Math.random()}</h4>
			</div>
		);
	}
}

class Header extends React.Component {
	render() {
		return (
			<div>
				<h3>{this.props.headerProp}</h3>
			</div>
		);
	}
}

class Content extends React.Component {
	render() {
		return (
			<div>
				<h3>{this.props.contentProp}</h3>
			</div>
		);
	}
}

class TableRow extends React.Component {
	render() {
		return (
			<tr>
				<td>{this.props.data.id}</td>
				<td>{this.props.data.name}</td>
				<td>{this.props.data.age}</td>
			</tr>
		);
	}
}

export default App;