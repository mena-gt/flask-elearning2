import React from 'react';
import { Link } from 'react-router-dom';


class ViewCustomPage extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            data: [],
            user: {},
            action: 'POST' // or 'PATCH'
        }
    }

    async componentDidMount () {
        try {
            await this.getFetchAllUsers ();
        } catch (error) {
            console.log ('--error--');
            console.log (error);
        }
    }

    getFetchAllUsers = async () => {
        let response = await fetch ('http://127.0.0.1:5000/api/users/');
        let data = await response.json ();
        this.setState ({
            data: data.data.users
        });
    }

    getFetchOneUser = async (id) => {
        let response = await fetch (`http://127.0.0.1:5000/api/users/${id}`);
        let data = await response.json ();
        return data.data.user;
    }

    postNewUser = async (form) => {
        const configs = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify (form)
        };

        let response = await fetch ('http://127.0.0.1:5000/api/users/', configs);
        let data = await response.json ();
        if (data.success) {
            this.getFetchAllUsers ();
            this.setState ({
                code: '',
                fname: '',
                lname: '',
                email: '',
                passw: '',
                confirmpassw: '',
                role: ''
            });
        }
    }

    patchEditedUser = async (form, id) => {
        const configs = {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify (form)
        };

        let response = await fetch (`http://127.0.0.1:5000/api/users/${id}`, configs)
        let data = await response.json ();
        if (data.success) {
            this.getFetchAllUsers ();
            this.setState ({
                code: '',
                fname: '',
                lname: '',
                email: '',
                passw: '',
                confirmpassw: '',
                role: ''
            });
        }
    }

    deleteRemoveUser = async (id) => {
        const configs = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        let response = await fetch (`http://127.0.0.1:5000/api/users/${id}`, configs);
        let data = await response.json ();
        if (data.success) {
            this.getFetchAllUsers ();
        }
    }

    handleChange = e => {
        this.setState ({
            [e.target.name]: e.target.value
        });
    }

    handleViewClick = async (id) => {
        try {
            let user = await this.getFetchOneUser (id);
            this.setState ({
                user
            });
        } catch (error) {
            console.log ('--error--');
            console.log (error);
        }
    }

    handleEditClick = async (id) => {
        try {
            let user = await this.getFetchOneUser (id);
            this.setState ({
                code: user.code,
                fname: user.firstname,
                lname: user.lastname,
                email: user.email,
                passw: '',
                confirmpassw: '',
                role: user.role
            });
            this.setState ({
                action: 'PATCH'
            });
        } catch (error) {
            console.log ('--error--');
            console.log (error);
        }
    }

    handleDeleteClick = (id) => {
        try {
            this.deleteRemoveUser (id);
        } catch (error) {
            console.log ('--error--');
            console.log (error);
        }
    }

    handleSubmit = e => {
        e.preventDefault ();
        // validar formulario
        const formdata = {
            'fname': this.state.fname,
            'lname': this.state.lname,
            'email': this.state.email,
            'password': this.state.passw,
            'confirm': this.state.confirmpassw,
            'active': false,
            'role': this.state.role
        };

        console.log ('state: ', this.state.action);
        
        try {
            if ('POST' === this.state.action) {
                this.postNewUser (formdata);
            }
            else if ('PATCH' === this.state.action) {
                this.patchEditedUser (formdata, this.state.code);
            }
        } catch (error) {
            console.log ('--error--');
            console.log (error);
        } finally {
            this.setState ({
                action: 'POST'
            });
        }
    }

    render () {
        return (
            <main>
                <article className="section">
                    <section className="container">
                        <div className="columns">
                            <div className="column">
                                <div className="card">
                                    <header className="card-header">
                                        <p className="card-header-title">
                                            View register
                                        </p>
                                    </header>
                                    <div className="card-content">
                                        <div className="field has-addons">
                                            <p className="control">
                                                <Link className="button" to="/">
                                                    <span>Back</span>
                                                </Link>
                                            </p>
                                        </div>
                                        <div className="content">
                                            <div className="tab-content" id="pane-3">
                                                <hr />
                                                {this.state.user !== {} &&
                                                <article className="media">
                                                    <figure className="media-left">
                                                        <p className="image is-64x64">
                                                            <img src="https://bulma.io/images/placeholders/128x128.png" alt="none" />
                                                        </p>
                                                    </figure>
                                                    <div className="media-content">
                                                        <div className="content">
                                                            <div className="field is-horizontal">
                                                                <div className="field-label is-normal">
                                                                    <label className="label">Code</label>
                                                                </div>
                                                                <div className="field-body">
                                                                    <div className="field">
                                                                        <p className="control">
                                                                            <input className="input is-static" 
                                                                                type="text" 
                                                                                readOnly
                                                                                value={this.state.user.code} />
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="field is-horizontal">
                                                                <div className="field-label is-normal">
                                                                    <label className="label">Name</label>
                                                                </div>
                                                                <div className="field-body">
                                                                    <div className="field">
                                                                        <p className="control">
                                                                            <input className="input is-static" 
                                                                                type="text"
                                                                                readOnly
                                                                                value={this.state.user.name} />
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="field is-horizontal">
                                                                <div className="field-label is-normal">
                                                                    <label className="label">Email</label>
                                                                </div>
                                                                <div className="field-body">
                                                                    <div className="field">
                                                                        <p className="control">
                                                                            <input className="input is-static"
                                                                                type="text" 
                                                                                readOnly
                                                                                value={this.state.user.email}  />
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </article>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </article>
            </main>
        );
    }
}

export default ViewCustomPage;