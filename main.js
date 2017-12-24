import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import RequestTable from './RequestTable.jsx';
import HeaderNavbar from './HeaderNavbar.jsx';
import RequestDescription from './RequestDescription.jsx';
import RdTest from './RdTest.jsx';

// ReactDOM.render(<App />, document.getElementById('app'));
ReactDOM.render(<HeaderNavbar />, document.getElementById('header'));
ReactDOM.render(<RequestTable />, document.getElementById('test'));
// ReactDOM.render(<RdTest />, document.getElementById('requestDescription'));
ReactDOM.render(<RequestDescription />, document.getElementById('requestDescription'));