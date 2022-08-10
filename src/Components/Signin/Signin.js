import { Component } from 'react';
import './Signin.css';

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signInPassword: "",
            signInEmail: ""
        }
    }


    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value });
    }

    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value });
    }

    onSubmitBtnClick = () => {
        // console.log(this.state);
        if (this.state.signInEmail.length === 0 || this.state.signInPassword.length === 0) {
            document.getElementById("error").innerText = "Email and password cannot be empty";
        }
        else {
            document.getElementById("error").innerText = "";
            fetch("http://localhost:3001/signin", {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify({
                    email: this.state.signInEmail,
                    password: this.state.signInPassword
                })
            }).then(response => response.json()).then(user => {
                if (user.id != null) {
                    this.props.loadUser(user)
                    this.props.onRouteChange('home')
                }
                else {
                    document.getElementById("error").innerHTML = "Wrong Credentials please try again!!!!!!";
                }
            })
        }
    }

    render() {
        return (
            <main className=" white pa2 black-20">
                <div className="measure center shadow-5 ba b--black pa2">
                    <fieldset
                        id="sign_up"
                        className="ba b--transparent ph0 mh0"
                    >
                        <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white  b--black w-100"
                                type="email"
                                name="email-address"
                                id="email-address"
                                onChange={this.onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input
                                className="b pa2 b--black input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="password"
                                name="password"
                                id="password"
                                onChange={this.onPasswordChange}
                            />
                        </div>
                        <div id="error" style={{ color: 'yellow', fontSize: '13px', fontFamily: 'Courier', fontWeight: 'bolder' }}></div>
                        <div className="">
                            <input
                                onClick={this.onSubmitBtnClick}
                                className="b ph3 pv2 input-reset ba b--black white bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Sign in"
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => this.props.onRouteChange('register')}
                                className="f6 link dim db" >Register</p>
                        </div>
                    </fieldset>
                </div>
            </main>
        );
    }

}


export default Signin;