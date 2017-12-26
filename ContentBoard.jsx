import React from 'react';
import Comment from './Comment.jsx'
import Editor from './Editor.jsx'
import './css/ContentBoard.css'

/**
 * Show Request's content and comments
 * @va
 */

class ContentBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: "",
            content: this.props.content,
            comments: [], 
            editor_change: ''
        };
        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleEditorChange(text) {
        this.setState({
            editor_change: text
        });
    }

    handleSubmit() {
        let new_comment = {request_id: this.props.id, employee_name: this.props.employees[this.props.employeeId - 1].name, 
            content: this.state.editor_change,
            type: 0, //0 hoặc null comment bình thường, 1 - comment đánh giá, 2 - comment thay đổi mức độ ưu tiên, 3 - comment hay đổi deadline
            note: "note gì không", create_at: 0, update_at: 0};
        var cmt_arr = this.state.comments.slice();

        fetch('http://192.168.43.166:3001/api/v1/requests/' + this.props.employeeId + '/comments/' + this.props.requestId,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "sessionkey": this.props.sessionkey
            },
            body: JSON.stringify({
                content: new_comment.content
            })
        }).then((res) => res.json())
        .then((result) => {
            alert(result.message);
            if (result.status == 200) {
                cmt_arr.push(new_comment);
                this.setState ({
                    comments: cmt_arr, 
                    editor_change: ""
                });
            }
        })

        
    }

    componentDidMount() {
        let tmpSubject = "aaa";

        fetch('http://192.168.43.166:3001/api/v1/requests/' + this.props.employeeId + '/info/' + this.props.requestId,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "sessionkey": this.props.sessionkey
            }
        })
        .then((res) => res.json())
        .then((result) => {
            tmpSubject = result.data.subject;
            // alert(result.data.subject);
        })
        fetch('http://192.168.43.166:3001/api/v1/comments/' + this.props.requestId, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "sessionkey": this.props.sessionkey
            }
        })
        .then((res) => res.json())
        .then((result) => {
            let tmpComments = []
            result.data.map((comment, i) => {
                tmpComments.push(comment);
            })
            this.setState({
                comments: tmpComments,
                subject: tmpSubject
            })
        })
    }
    
    render() {

        // const tmp_content=<p>{this.state.subject}</p>;   
        // alert(this.state.subject)
        return(
            
            <div className="panel panel-default">
                <div className="panel-heading">
                <h4> <span className="glyphicon glyphicon-folder-close"></span> Nội Dung</h4>
                </div>
                <div className="panel-body">

                    <div className="box-header with-border">
                        <div className="user-block">
                            <img style={{maxHeight: 70, maxWidth: 70}} className="img-thumbnail" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="User Image"/><br/>
                            <span className="username"><a href="#">{this.props.employees[this.props.employeeId - 1].name}</a></span>
                            <span className="text-muted"><em>Shared publicly - 7:30 PM Today</em></span>
                        </div>
                    </div>

                    <div className="box-body">
                        <span>{this.state.subject}</span>
                    </div>

                    <div className="box-footer box-comments">
                        {this.state.comments.map((_comment, index) => <Comment key={index} {..._comment} />)}
                        
                        {/*Create a new comment*/}
                        <div className="editor-comments">
                            <Editor change={this.state.editor_change} onChange={this.handleEditorChange}
                                    placeholder="Bình luận mới ..."/>
                            <button style={{marginLeft:20}} className="btn btn-primary" onClick={this.handleSubmit}>Comment</button>
                        </div>

                    </div>
                </div> 
            </div>
        ); 
    }
}

ContentBoard.defaultProps = {
    id: 1, //request_id
    created_by: 1, //employee_id
    content: "This is a request"
};

export default ContentBoard;