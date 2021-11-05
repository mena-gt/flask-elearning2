import React from 'react';
import { Link } from 'react-router-dom';

import Sidebar from '../components/Sidebar.jsx';
import '../components/table.css';


class CourseDashboardPage extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            columns: ['No.', 'Code', 'Created', 'Title', 'Actions'],
            rows: [],
            close: true
        };
    }

    fetchAllCourses = (data) => {
        return fetch ('http://127.0.0.1:5000/api/courses');
    }

    deleteCourseOne = (code) => {
        const configs = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'}
        };
        return fetch (`http://127.0.0.1:5000/api/courses/${code}`, configs);
    }

    async componentDidMount () {
        await this.fetchAllCourses ()
            .then (data => data.json ())
            .then ((response) => {
                if (response.success) {
                    let courses = response.data.courses.map ((c, index) => {
                        return {actions: c.actions, data: [c.code, c.created, c.title]}
                    });
                    this.setState ({
                        rows: courses
                    });
                }
            })
            .catch ((error) => {
                console.log ('<--- API Error --->');
                console.log (error);
                console.log ('</--- API Error --->');
            });
    }

    tableHeader () {
        return (
            <thead>
                <tr>
                    <th><input type="checkbox" name="" /></th>
                    {this.state.columns.map ((column, index) => <th key={index}>{column}</th>)}
                </tr>
            </thead>
        );
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

    handleClick = async (action, index) => {
        let code = this.state.rows[index].data[0];
        if ('view' === action) {
            const url = `http://127.0.0.1:5000/api/courses/${code}`;
            this.props.history.push ({
                pathname: '/courses/view',
                state: {url: url}
            });
        } else {
            await this.deleteCourseOne (code)
                .then (data => { 
                    if (data.status === 204) {
                        return { success: true }
                    } else {
                        return data.json ();
                    }
                })
                .then ((response) => {
                    console.log (response);
                    if (response.success) {
                        let result = this.state.rows;
                        result.splice (index, 1)
                        this.setState ({
                            rows: result
                        });
                    }
                })
                .catch ((error) => {
                    console.log ('<--- API Error --->');
                    console.log (error);
                    console.log ('</--- API Error --->');
                });
        }
    }

    tableBody () {
        const hasData = this.state.rows.length > 0;
        const colSpanLength = this.state.columns.length + 1;

        return (
            <tbody>
                {hasData ?
                    this.state.rows.map ((row, index) => 
                        <tr key={index}>
                            <td><input type="checkbox" name="" /></td>
                            <td>{index+1}</td>
                            {row.data.map ((data, index1) => <td key={index1}>{data}</td>)}
                            <td>
                                {row.actions.map ((action, index2) => 
                                    <button key={index2} onClick={this.handleClick.bind(this, action.name, index)}>
                                        {action.name}
                                    </button>)
                                }
                            </td>
                        </tr>
                    )
                 :
                    <tr className="row-empty">
                        <td colSpan={colSpanLength}>No hay registros por el momento.</td>
                    </tr>
                }
            </tbody>
        );
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
                            <h1>Course Dashboard</h1>
                        </header>
                        <section>
                            <div>
                                <p>Actions</p>
                                <ul>
                                    <li>
                                        <Link to="/courses/form">
                                            + Add New Course
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <table className="table">
                                    {this.tableHeader ()}
                                    {this.tableBody ()}
                                </table>
                            </div>
                        </section>
                    </article>
                </main>
            </React.Fragment>
        );
    }


}

export default CourseDashboardPage;