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
            <Navbar />
            <div id="dashboard">
         
              {console.log(this.props.data)}
                <Route
                    path="/dashboard"
                    render={() => <RequestTable data={this.props.data} index={0} status={0}/>} />
              
                {/*<RequestTable data={this.props.data} index={0} status={0}/>*/}
       
            </div>
         </div>
        );
    }
}

export default DashBoard;