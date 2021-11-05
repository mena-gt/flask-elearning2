import React from 'react';
import {Link} from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';


class CourseViewPage extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            close: true,
            url: 'error-404',
            data: {
                code: 0,
                slug: 'error-404',
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

    fetchCourseOne = (url) => {
        return fetch (url);
    }

    patchEditedCourse = (url, data) => {
       const configs = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify (data)
        }
        return fetch (url, configs);
    }

    async componentDidMount () {
        const url = this.props.location.state.url;
        await this.fetchCourseOne (url)
            .then ((data => data.json ()))
            .then (response => {
                if (response.success) {
                    console.log (response);
                    let course = response.data.course;
                    this.setState ({
                        data: {
                            code: course.code,
                            slug: course.slug,
                            title: course.title,
                            description: course.description
                        }
                    })
                }
            })
            .catch ((error) => {
                console.log ('<--- API Error --->');
                console.log (error);
                console.log ('</--- API Error --->');
            });
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
        const url = this.props.location.state.url;
        let errors = this.handleValidation (this.state.data);
        if (this.hasErrors (errors)) {
            this.showErrors (errors);
        }
        else {
            await this.patchEditedCourse (url, this.state.data)
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
                                <div className="field is-grouped">
                                    <div className="control">
                                        <button className="button is-link">Save</button>
                                    </div>
                                    <div className="control">
                                        <Link 
                                            className="button is-link is-light"
                                            to={`/course/${this.state.data.slug}`}  target="_blank">
                                            View preview
                                        </Link>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Title</label>
                                    <div className="control has-icons-left has-icons-right">
                                        <input className="input is-success" type="text" name="title" onChange={this.handleOnChange} value={this.state.data.title}  />
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
                                        <textarea className="textarea" placeholder="Textarea" name="description" onChange={this.handleOnChange} value={this.state.data.description} ></textarea>
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

export default CourseViewPage;