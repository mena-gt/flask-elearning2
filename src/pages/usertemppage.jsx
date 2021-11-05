import React from 'react';
import { Link } from 'react-router-dom';


class UserPage extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            data: []
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
        let response = await fetch ('http://127.0.0.1:4000/api/custom/');
        let data = await response.json ();
        console.log ('fetch all');
        this.setState ({
            data: data.customs
        });
    }

    deleteRemoveUser = async (id) => {
        const configs = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        let response = await fetch (`http://127.0.0.1:4000/api/custom/${id}`, configs);
        let data = await response.json ();
        const position = this.state.data.findIndex ((item) => item.code === id)
        console.log (position);
        this.state.data.splice (position, 1);
        this.setState ({
            data: this.state.data
        });
    }

    handleChange = e => {
        this.setState ({
            [e.target.name]: e.target.value
        });
    }

    handleViewClick = async (id) => {
        this.props.history.push (`/view/${id}`);
    }

    handleEditClick = async (id) => {
        this.props.history.push (`/edit/${id}`);
    }

    handleDeleteClick = (id) => {
        // const option = confirm ('Desea eliminarlo ?');
        try {
            this.deleteRemoveUser (id);
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
                                        <p className="card-header-title">
                                            List of items
                                        </p>
                                    </header>
                                    <div className="card-content">
                                        <div className="field has-addons">
                                            <p className="control">
                                                <Link className="button" to="/new">
                                                    <span>Add new custom</span>
                                                </Link>
                                            </p>
                                        </div>
                                        <div className="content">
                                            <div className="tab-content" id="pane-1">
                                                <table className="table is-hoverable is-fullwidth">
                                                    <thead>
                                                        <tr>
                                                            <th>Code</th>
                                                            <th>Name</th>
                                                            <th>Email</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td colSpan="4">No hay registros por el momento.</td>
                                                        </tr>
                                                        {this.state.data.map ((item)=> {
                                                            return (
                                                                <tr key={item['code']}>
                                                                    <td>{item['code']}</td>
                                                                    <td>{item['name']}</td>
                                                                    <td>{item['email']}</td>
                                                                    <td>
                                                                        <button onClick={this.handleEditClick.bind(this, item['code'])} >Edit</button>
                                                                        <button onClick={this.handleViewClick.bind(this, item['code'])} >View</button>
                                                                        <button onClick={this.handleDeleteClick.bind (this, item['code'])} >Delete</button>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
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

export default UserPage;