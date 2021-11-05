import React from 'react';
import { Link } from 'react-router-dom';

import MTable from '../components/MTable.jsx';


class TUser extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            columns: [
                'No', 'Created', 'First', 'Last', 'Email', 'Active', 'Last login', 'Role', 'Actions'
            ],
            rows: []
        };
    }

    render () {
        const styles = {
            backgroundColor: '#121212',
            color: '#BB86FC'
        }
        let rows = this.props.rows;
        rows = rows.map ((r, index) => {
            return [
                index, r['created'], r['firstname'], r['lastname'], r['email'], r['active'], r['lastlogin'], r['role'], ''
            ]
        });
        return (
            <main className="section" style={styles}>
                <article className="hero is-fullheight">
                    <header>
                        <h1 className="title" >Users Page</h1>
                        <Link to="/">Back</Link>
                    </header>
                    <section className="container">
                        <MTable 
                            columns={this.state.columns} 
                            rows={rows} />
                    </section>
                </article>

            </main>
        );
    }
}

export default TUser;
