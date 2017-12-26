import React from 'react';

import Navbar from './Navbar.jsx'
import RequestTable from './RequestTable.jsx'
import CreateRequestForm from './CreateRequestForm.jsx'
import ContentLayout from './ContentLayout.jsx'
import { Switch, Route } from 'react-router-dom'

class DashBoard extends React.Component {
    render() {
        return(
         <div>
            <Navbar data={this.props.data} />
            <div id="dashboard">
         
              {console.log(this.props.data)}
                {/*
                <Route
                    path="/dashboard"
                    render={() => <RequestTable data={this.props.data} index={0} status={0}/>} />
                */}
                {/*<RequestTable data={this.props.data} index={0} status={0}/>*/}
                <Route path="/" component={ContentLayout}/>
            </div>
         </div>
        );
    }
}

export default DashBoard;