import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';
import './css/createRequestForm.css';
import Editor  from './Editor.jsx';
import { Link } from 'react-router-dom';

/**
 * Chua ro mot so muc 
 * data-flow???
 * Them mot so chu y validate 
 * @va
 */

 class CreateRequestForm extends React.Component {
    //props: user_id, sessionkey
    constructor(props) {
        super(props);
        this.state = {
            employee_id: 0, 
            team_id: 0, subject: '',
            content: '', priority: 1,
            deadline: undefined, //in mills 
            relaters: '', image: '',
            dept_id: 0,
            content_set: false, content_st:'', sub_st:'', 
            deadline_set: false, deadline_st: ''
        }
        this.submit = this.submit.bind(this);
        this.handleDayChange = this.handleDayChange.bind(this);
        this.validate = this.validate.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
    }

    submit() {
        fetch('http://192.168.43.166:3001/api/v1/requests/'+ this.props.employee_id, {
            method: 'POST',
            headers: {
              "Access-Control-Allow-Origin" : "*",
              "sessionkey": this.props.sessionkey
            }, 
            body:JSON.stringify({
                team_id: 0,//this.state.team_id,
                dept_id: parseInt(this.state.dept_id, 10),
                subject: this.state.subject,
                content: this.state.content,
                priority: parseInt(this.state.priority, 10),
                deadline: this.state.deadline
               // relaters: this.

            })
          })
          .then(results => {
            return results.json();
          }).then(data => {
            if (data.status === 200) {
                console.log(data.data)
                alert("Tạo yêu cầu thành công")
            } else {
                alert("Tạo yêu cầu thất bại")
            }
          })
    }

    handleDayChange(date) {
        this.setState({
            deadline: moment(date).format('x') / 1000,
            deadline_set: true
        });
        console.log(moment(date).format('x') / 1000);
      }
    handleEditorChange(text) {
        this.setState({
            content: text,
            content_set: true
        });
    }
    validate() {
        (this.state.subject.trim() === "") ? this.setState({sub_st: "has-error"}) : this.setState({sub_st: ""})   
        !(this.state.deadline_set) ? this.setState({deadline_st: "has-error"}) : this.setState({deadline_st: ""}) 
        !(this.state.content_set) ? this.setState({content_st: "has-error"}) : this.setState({content_st: ""})   
      
    }

    cancel() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
    render() {
      
        const dept_info = [
            {    dept_id: "0",
                dept_name: "Hà Nội - IT",
            }, 
            {
                dept_id: "1",
                dept_name: "Đà Nẵng IT"
            }    
        ];

        const priority_arr = [
            {id: "1", name: "Thấp"},
            {id: "2", name: "Bình thường"},
            {id: "3", name: "Cao"},
            {id: "4", name: "Khẩn cấp"}
        ];
        return(
            
            <div id="page-wrapper">
            <div className="panel panel-default">
                <div className="panel-heading">
                    Thêm Công Việc
                </div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className={"form-group " + this.state.sub_st}>
                                <label>Tên công việc</label>
                                <input className="form-control" placeholder="Enter text" onBlur={(e) => this.setState({
                                    subject: e.target.value
                                })} />
                            </div>
                        </div>           
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group">
                                <label>Mức độ ưu tiên</label>
                                <select className="form-control" onChange={(e) => this.setState({
                                        priority: e.target.value
                                
                                    })}> {console.log(typeof(this.state.priority))}
                                        {priority_arr.map((prior, index) => (
                                            <option key={index} value={prior.id}>{prior.name}</option>
                                        ))}
                                      
                                </select>
                            </div>      
                            <div className="form-group">
                                <label>Bộ phận IT</label>
                                    <select className="form-control" onChange={(e) => this.setState({
                                        dept_id: e.target.value
                                    })}>
                                        {dept_info.map((dept, index) => (
                                            <option key={index} value={dept.dept_id}>{dept.dept_name}</option>
                                        ))}
                                      
                                    </select> 
                            </div>         
                        </div>
                        <div className="col-lg-6">
                            <div className={"form-group " + this.state.deadline_st}>
                                <label>Ngày hết hạn</label>
                               
                                <DayPickerInput     
                                    onDayChange={this.handleDayChange}
                                />
                            
                            
                            </div>
                            <div className="form-group">
                                <label>Người liên quan</label>
                                <input className="form-control" placeholder="Enter text" onBlur={(e) => this.setState({
                                    relaters: e.target.value
                                })} />
                            </div>
                        </div>
                    </div>
               
                    <div className="row" >
                         <div className="col-lg-12">
                            <label>Nội dung</label>
                            <Editor placeholder="Nhập vào nội dung" onChange={this.handleEditorChange}/>
                            <div className="form-group">
                                <label>Choose file to upload</label>
                                <input type="file" />
                            </div>
                         </div>
                    </div>
                    
                    <button type="submit" className="btn btn-primary pull-right" onClick={this.submit}>Submit</button>
                
                   
                    <button type="cancel" className="btn btn-default pull-right" onClick={this.cancel}>Cancel</button>
                   
                </div>    
            </div>
            </div>
        );
    
    }
}

export default CreateRequestForm;