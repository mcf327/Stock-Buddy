import { Component } from 'react';
import { registerVendor } from '../../utilities/users-service';
import './VendorRegistrationForm.css';

export default class VendorRegistrationForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const { name, email, password } = this.state;
      const formData = { name, email, password, userType: 'vendor' };

      const user = await registerVendor(formData);
      this.props.setUser(user);
    } catch (err) {
        console.log(err);
        this.setState({ error: 'Registration Failed - Try Again' });
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div className="vendor-registration">
        <div className="form-container">
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <label>Account Name</label>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
            <label>Email</label>
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
            <label>Password</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
            <label>Confirm</label>
            <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
            <button type="submit" disabled={disable}>REGISTER AS VENDOR</button>
          </form>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}