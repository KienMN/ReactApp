import React from 'react';

import RequestDescription from './RequestDescription.jsx';
import ContentBoard from './ContentBoard.jsx';

class ContentLayout extends React.Component {

    render() {
        return(
            <div id="page-wrapper">
                <RequestDescription />
                <ContentBoard />
            </div>
        );
    }
}

export default ContentLayout;