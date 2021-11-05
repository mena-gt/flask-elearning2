import React from 'react';

import Sidebar from '../components/Sidebar.jsx';

class CoursePage extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            close: false,
            title: '',
            slug: '',
            created: '',
            updated: '',
            description: ''
        };
    }

    fetchCourseOne (slug) {
        return fetch (`http://127.0.0.1:5000/api/course/${slug}`);
    }

    async componentDidMount () {
        const { 
            match: { 
                params 
            } 
        } = this.props;

        await this.fetchCourseOne (params.slug)
            .then ((data => data.json ()))
            .then (response => {
                if (response.success) {
                    let course = response.data.course;
                    this.setState ({
                        slug: course.slug,
                        created: course.created,
                        updated: course.updated,
                        title: course.title,
                        description: course.description
                    })
                }
            })
            .catch ((error) => {
                console.log ('<--- API Error --->');
                console.log (error);
                console.log ('</--- API Error --->');
            });
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
                            <h1>{this.state.title}</h1>
                        </header>
                        <p>Created: {this.state.created}, Updated: {this.state.updated}</p>
                        <p>Description: {this.state.description}</p>
                    </article>
                </main>
            </React.Fragment>
        );
    }
}

export default CoursePage;