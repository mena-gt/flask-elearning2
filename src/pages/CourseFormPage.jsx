import React from 'react';

import Sidebar from '../components/Sidebar.jsx';

// import '../components/form.css';
// from: https://www.youtube.com/watch?v=okbByPWS1Xc
class CourseFormPage extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            close: true,
            data: {
                title: '',
                description: ''
            },
            validations: {
                title: {
                    required: true,
                    maxLenght: 200
                },
                description: {
                    required: true
                }
            },
            validationMessages: {
                title: {
                    required: 'The title is required.',
                    maxLenght: 'The maximum length of title is 250.'
                },
                description: {
                    required: 'The description is required.'
                }
            }
        };
    }

    postNewCourse = (data) => {
        const configs = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify (data)
        };
        return fetch ('http://127.0.0.1:5000/api/courses/', configs);
    }

    handleValidation = (data) => {
        let errors = {};

        errors['title'] = [];
        if (this.state.validations.title.required) {
            if (!data.title) {
                errors.title.push (this.state.validationMessages.title.required);
            } 
            else {
                if (this.state.validations.title.maxLength < data.title.lenth) {
                    errors.title.push (this.state.validationMessages.title.maxLength);
                }
            }
        }

        errors['description'] = [];
        if (this.state.validations.description.required) {
            if (!data.description) {
                errors.description.push (this.state.validationMessages.description.required);
            }
        }

        return errors;
    }

    hasErrors = (errors) => {
        for (let [key, value] of Object.entries (errors)) {
            if (value.length > 0) {
                console.log ('SE CUMPLE EN: ', key);
                return true
            };
        }
        return false;
    }

    showErrors = (errors) => {
        console.log (errors);
    }

    handleSubmit = async (e) => {
        e.preventDefault ();
        let errors = this.handleValidation (this.state.data);
        if (this.hasErrors (errors)) {
            this.showErrors (errors);
        }
        else {
            console.log ('data por enviar: ', this.state.data);
            await this.postNewCourse (this.state.data)
                .then (data => data.json ())
                .then ((response) => {
                    console.log (response);
                    this.data.title = '';
                    this.data.content = '';
                })
                .catch ((error) => {
                    console.log ('<--- API Error --->');
                    console.log (error);
                    console.log ('</--- API Error --->');
                });
        }
    }

    handleOnChange = (e) => {
        this.setState ({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value
            }
        })   
    }

    render () {
        return (
            <React.Fragment>
                <Sidebar close={this.state.close} />
                <main className="home-section">
                    <div className="home-content">
                        <i className='bx bx-menu' ></i>
                        <span className="text"></span>
                    </div>
                    <article>
                        <header>
                            <h1>Course Form</h1>
                        </header>
                        <section className="container">
                            <div>
                                <p>Message</p>
                            </div>
                            <p className="title">Course form</p>
                            <form onSubmit={this.handleSubmit}>
                                <div className="field">
                                    <label className="label">Title</label>
                                    <div className="control has-icons-left has-icons-right">
                                        <input className="input is-success" type="text" name="title" onChange={this.handleOnChange} />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-user"></i>
                                        </span>
                                        <span className="icon is-small is-right">
                                            <i className="fas fa-check"></i>
                                        </span>
                                    </div>
                                    <p className="help is-success">This username is available</p>
                                </div>
                                <div className="field">
                                    <label className="label">Message</label>
                                    <div className="control">
                                        <textarea className="textarea" placeholder="Textarea" name="description" onChange={this.handleOnChange} ></textarea>
                                    </div>
                                </div>
                                <div className="field is-grouped">
                                    <div className="control">
                                        <button className="button is-link">Submit</button>
                                    </div>
                                    <div className="control">
                                        <button className="button is-link is-light">Cancel</button>
                                    </div>
                                </div>
                            </form>
                        </section>
                    </article>
                </main>
            </React.Fragment>
        );
    }
}

export default CourseFormPage;