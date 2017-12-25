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
            <Switch >
                <Route path={this.props.match.url+ "/create"} component={CreateRequestForm} /> 

                <Route
                    path={this.props.match.url + "/my"}
                   render={() => <RequestTable index={0} />} />
                <Route
                    path={this.props.match.url + "/related"}
                   render={() => <RequestTable index={1} />} />
                <Route
                    path={this.props.match.url + "/offered"}
                   render={() => <RequestTable index={2} />} />
                <Route
                    path={this.props.match.url + "/team"}
                   render={() => <RequestTable index={3} />} />
                <Route
                    path={this.props.match.url + "/dept"}
                   render={() => <RequestTable index={4} />} />
                <Route path={this.props.match.url + "/content"} component={ContentLayout}/>
                <Route path={this.props.match.url} component={RequestTable} />  
            </Switch>
            </div>
         </div>
        );
    }
}

export default DashBoard;