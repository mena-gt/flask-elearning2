import React from 'react';


class OCorePanel extends React.Component {
    render () {
        return (
            <article className="section">
                <section className="container">
                    <div className="columns">
                        <div className="column">
                            <p className="title">
                                Users' module
                            </p>
                            <p className="subtitle">
                                last updated on <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                            </p>
                            <div className="card">
                                <header className="card-header">
                                    <p className="card-header-title">
                                        <div className="tabs">
                                            <ul>
                                                <li className="is-active"><a>Users</a></li>
                                                <li><a>Creation Form</a></li>
                                                <li><a>Edition Form</a></li>
                                                <li><a>Details User</a></li>
                                            </ul>
                                        </div>
                                    </p>
                                    <a className="card-header-icon" aria-label="more options">
                                        <span className="icon"></span>
                                    </a>
                                </header>
                                <div className="card-content">
                                    {this.props.children}
                                </div>
                                <footer className="card-footer">
                                </footer>
                            </div>
                        </div>
                    </div>
                </section>
            </article>
        );
    }
}


export default OCorePanel;