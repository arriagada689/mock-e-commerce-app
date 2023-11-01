import { useState } from 'react';
import '../styling/signin.css';

const Signin = ({ handleLogin }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [statusMessage, setStatusMessage] = useState('');

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSignin = (event) => {
        event.preventDefault();

        fetch('https://tattered-common-pineapple.glitch.me/signin', {
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
                setStatusMessage('Logged in!');
            } else { 
                setStatusMessage(data.error);
            }
        })
    }
    
    return (  
        <div className='signin-container'>
            
            {statusMessage.length > 0 && <div className={`status-message ${statusMessage === 'Logged in!' ? 'logged-in' : 'error-message'}`}>
                {statusMessage}
            </div>}
            
            <form onSubmit={handleSignin}>
            
                <div className="signin-box">
                    <div className='signin-label'>Sign in</div>
                    
                    <div className="signin-input-row">
                        <div className='signin-sub-label'>Username</div>
                        <div className="horizontalize">
                            <i className="fa-solid fa-user"></i>
                            <input type="text" name='username' value={formData.username} onChange={handleChange} autoComplete="new-password" className='signin-input' placeholder='Type your username'/>
                        </div>
                        <div className="div-separator"></div>
                    </div>

                    <div className="signin-input-row">
                        <div className='signin-sub-label'>Password</div>
                        <div className="horizontalize">
                            <i className="fa-solid fa-lock"></i>
                            <input type="password" name='password' value={formData.password} onChange={handleChange} autoComplete="new-password" className='signin-input' placeholder='Type your password'/>
                        </div>
                        <div className="div-separator"></div>
                    </div>

                    <div className="center-input">
                        <input type="submit" value="Sign in" id='signin-submit-button'/>
                    </div>
                </div>
            </form>

        </div>
    );
}
 
export default Signin;