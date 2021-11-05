import React from 'react';


class MUserForm extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            show: true
        };
    }

    handleChange () {
        this.setState ({ show: false})
    }

    render () {
        const { onSubmit } = this.props;
        return (
            <form onSubmit={this.handleSubmit}>
                
                <div className="field">
                    <label className="label">First name</label>
                    <div className="control">
                        <input 
                            className="input" 
                            type="text" 
                            name="fname" 
                            onChange={this.handleChange} 
                            value={this.state.fname} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Last name</label>
                    <div className="control">
                        <input 
                            className="input" 
                            type="text" 
                            name="lname" 
                            onChange={this.handleChange} 
                            value={this.state.lname} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input 
                            className="input" 
                            type="text" 
                            name="email" 
                            onChange={this.handleChange} 
                            value={this.state.email} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input 
                            className="input" 
                            type="text" 
                            name="passw" 
                            onChange={this.handleChange} 
                            value={this.state.passw}  />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Confirm password</label>
                    <div className="control">
                        <input 
                            className="input" 
                            type="text" 
                            name="confirmpassw" 
                            onChange={this.handleChange} 
                            value={this.state.confirmpassw} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Role</label>
                    <div className="control">
                        <div className="select">
                            <select 
                                name="role" 
                                onChange={this.handleChange} 
                                value={this.state.role} >
                                <option>Select dropdown</option>
                                <option>With options</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Active User?</label>
                    <div className="control">
                        <label className="radio">
                            <input type="radio" name="question" /> Yes
                            </label>
                        <label className="radio">
                            <input type="radio" name="question" /> No
                        </label>
                    </div>
                </div>

                <div className="field is-grouped is-grouped-right">
                    <div className="control">
                        <button className="button is-link">Submit</button>
                    </div>
                    <div className="control">
                        <button className="button is-link is-light">Cancel</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default MUserForm;