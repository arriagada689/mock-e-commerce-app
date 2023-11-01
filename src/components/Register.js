import { useState } from 'react';
import '../styling/register.css';
import '../styling/signin.css';

const Register = ({handleLogin}) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirm_password: ''
    });
    const [statusMessage, setStatusMessage] = useState('');

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('https://tattered-common-pineapple.glitch.me/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if(data.id){
                handleLogin(data);
                setStatusMessage('Registered!');
            } else if(data.error){
                if(data.details === 'Username already taken'){
                    setStatusMessage(data.details);
                } else if(data.error === 'Passwords do not match'){
                    setStatusMessage(data.error);
                } else if(data.error === 'All fields are required'){
                    setStatusMessage(data.error);
                }
            }
        })
        .catch(error => {
            console.error("There was a problem", error);
        });
    }

    return (  
        <div className='signin-container'>
            {statusMessage.length > 0 && <div className={`status-message ${statusMessage === 'Registered!' ? 'logged-in' : 'error-message'}`}>{statusMessage}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="signin-box">
                    <div className="signin-label">Register an account</div>

                    <div className="signin-input-row">
                        <div className="signin-sub-label">Enter a username</div>
                        <div className="horizontalize">
                            <i className="fa-solid fa-user"></i>
                            <input type="text" name="username" className='signin-input' value={formData.username} onChange={handleChange} autoComplete="username" placeholder='Type a username'/>
                        </div>
                        <div className="div-separator"></div>
                    </div>

                    <div className="signin-input-row">
                        <div className="signin-sub-label">Enter a password</div>
                        <div className="horizontalize">
                            <i className="fa-solid fa-lock"></i>
                            <input type="password" name="password" className='signin-input' value={formData.password} onChange={handleChange} autoComplete="new-password" placeholder='Type a password'/>
                        </div>
                        <div className="div-separator"></div>
                    </div>

                    <div className="signin-input-row">
                        <div className="signin-sub-label">Confirm password</div>
                        <div className="horizontalize">
                            <i className="fa-solid fa-lock"></i>
                            <input type="password" name="confirm_password" className='signin-input' value={formData.confirm_password} onChange={handleChange} autoComplete="new-password" placeholder='Confirm password'/>
                        </div>
                        <div className="div-separator"></div>
                    </div>
                    
                    <div className="center-input">
                        <input type="submit" value="Register" id='signin-submit-button'/>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Register;