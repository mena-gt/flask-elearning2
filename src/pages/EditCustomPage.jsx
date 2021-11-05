import React from 'react';
import { Link } from 'react-router-dom';


class EditCustomPage extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            name: '',
            email: ''
        }
    }

    async componentDidMount () {
        try {
        const { match: { params }  } = this.props;        
            await this.getFetchOne (params.id);
        } catch (error) {
            console.log ('--error--');
            console.log (error);
        }
    }

    getFetchOne = async (id) => {
        let response = await fetch (`http://127.0.0.1:4000/api/custom/${id}`);
        let data = await response.json ();
        console.log ('fetch one');
        this.setState ({
            name: data.custom.name,
            email: data.custom.email
        });
    }

    putEdited = async (form) => {
        const { match: { params }  } = this.props; 
        const configs = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify (form)
        };

        let response = await fetch (`http://127.0.0.1:4000/api/custom/${params.id}`, configs)
        let data = await response.json ();
        if (data.success) {
            this.getFetchAllUsers ();
            this.setState ({
                name: '',
                email: ''
            });
        }
    }

    handleChange = e => {
        this.setState ({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = e => {
        e.preventDefault ();
        // validar formulario
        const formdata = {
            'name': this.state.name,
            'email': this.state.email
        };
        
        try {
            this.putEdited (formdata);
            this.props.history.push ('/');
        } catch (error) {
            console.log ('--error--');
            console.log (error);
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
                                        <p className="card-header-title">Form</p>
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
                                           <div className="tab-content" id="pane-2">
                                                <hr />
                                                <form onSubmit={this.handleSubmit}>
                                                    <div className="field">
                                                        <label className="label">Name</label>
                                                        <div className="control">
                                                            <input className="input" 
                                                                type="text" 
                                                                name="name" 
                                                                onChange={this.handleChange} 
                                                                value={this.state.name} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <label className="label">Email</label>
                                                        <div className="control">
                                                            <input className="input" 
                                                                type="email" 
                                                                name="email" 
                                                                onChange={this.handleChange} 
                                                                value={this.state.email} />
                                                        </div>
                                                    </div>
                                                    <div className="field is-grouped is-grouped-right">
                                                        <div className="control">
                                                            <button className="button is-link">Save</button>
                                                        </div>
                                                        <div className="control">
                                                            <button className="button is-link is-light">Cancel</button>
                                                        </div>
                                                    </div>
                                                </form>
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

export default EditCustomPage;