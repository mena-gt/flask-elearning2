import React from 'react';
import { Link } from 'react-router-dom';

import Sidebar from '../components/Sidebar.jsx';


class IndexPage extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            close: true
        };
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
                    <div>
                        <h1>Hello World</h1>
                        <ul>
                            <li>
                                <Link to="/courses">
                                    Course page
                                </Link>
                            </li>
                            <li>
                                <Link to="/roles">
                                    Role page
                                </Link>
                            </li>
                            <li>
                                <Link to="/users">
                                    User page
                                </Link>
                            </li>
                            <li>
                                <Link to="/subscriptions">
                                    Subcription page
                                </Link>
                            </li>
                        </ul>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

export default IndexPage;