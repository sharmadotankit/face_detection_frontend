import { Component } from "react";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            registerEmail: "",
            registerName: "",
            registerPassword: "",
            error: "",
        }
    }

    onNameChange = (event) => {
        this.setState({ registerName: event.target.value });
    }

    onEmailChange = (event) => {
        this.setState({ registerEmail: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ registerPassword: event.target.value })
    }

    onRegisterBtnClick = () => {
        if (this.state.registerEmail.length === 0 || this.state.registerName.length === 0 || this.state.registerPassword.length === 0) {
            this.setState({ error: 'Please fill valid data' })
        }
        else {
            this.setState({ error: '' });
            fetch("http://localhost:3001/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.registerName,
                    email: this.state.registerEmail,
                    password: this.state.registerPassword,
                })
            }).then(response => {
                if (response.status === 200) {
                    (response.json().then(user => {
                        // console.log(user)
                        if (user.id) {
                            this.props.loadUser(user);
                            this.props.onRouteChange('home');
                        }
                    }
                    ))
                }
                else {
                    response.json().then(err => this.setState({ error: err }))
                }
            }).catch(err => this.setState({ error: "Unable to Register " }))
        }
    }


    render(props) {
        return (
            <main className=" white pa2 black-20">
                <div className="measure center shadow-5 ba b--black pa2">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white  b--black"
                                type="name"
                                name="name"
                                id="name"
                                onChange={this.onNameChange}
                            />
                        </div>
                        <div className="mv3">
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
                        <div className="">
                            <input onClick={this.onRegisterBtnClick} className="b ph3 pv2 input-reset ba b--black white bg-transparent grow pointer f6 dib" type="submit" value="Register" />
                            <br /><br />
                            <h4 style={{ color: 'yellow', fontSize: '13px', fontFamily: 'Courier', fontWeight: 'bolder' }}>{this.state.error}</h4>
                        </div>

                    </fieldset>
                </div>
            </main>
        );
    }

}


export default Register;