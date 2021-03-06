import React, { Component, Fragment } from 'react';
import { Link ,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {register} from '../actions/auth';
import {createMessage} from '../actions/message'

class Register extends Component {
    static propTypes ={
        register:PropTypes.func.isRequired,
        isAuthenticated:PropTypes.bool


    };
    state ={
        username:'',
        email:'',
        password:'',
        password2:''
    }

    onSubmit = e=>{
        e.preventDefault();
        const {username,email,password,password2} =this.state;
        if(password!==password2){
            this.props.createMessage({passwordNotMatch:'Password do not match'})
        }
        else{
            const newUser ={username,password,email};
            this.props.register(newUser);
        }
    }

    onChange =e=> this.setState({[e.target.name]:e.target.value});

    render() {
        if(this.props.isAuthenticated){
            return <Redirect to = '/' />;
        }
        const {username,email,password,password2}=this.state
        return (
            <div className="col-md-6 m-auto">
            <div className="card card-body mt-5">
                <h2 className="text-center">Register</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                         className="form-control"
                         type="text"
                         name="username"
                         value={username}
                         onChange={this.onChange}/>
                         </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                         className="form-control"
                         type="text"
                         name="email"
                         value={email}
                         onChange={this.onChange}/>
                         </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                         className="form-control"
                         type="password"
                         name="password"
                         value={password}
                         onChange={this.onChange}/>
                         </div> 
                         <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                         className="form-control"
                         type="password"
                         name="password2"
                         value={password2}
                         onChange={this.onChange}/>
                         </div> 
                    <div className="form-group">
                        <button
                        type="submit"
                        className="btn btn-primary">Register</button>
                        </div>    
                    <p>Already have an account?? <Link to ="/login">Login</Link></p>
                </form>

            </div>
        </div>
        )
    }
}
const mapStateToProps =state =>({
    isAuthenticated:state.authReducer.isAuthenticated
});
export default connect(mapStateToProps,{register,createMessage})(Register);
