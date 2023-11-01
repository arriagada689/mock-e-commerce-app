import { useEffect, useState } from 'react';
import '../styling/profile.css';
import SemiDisplay from './SemiDisplay';

const Profile = ({ userId, setLoggedIn, setUser, signOut, setSignOut, handleDisplay, error }) => {
    const [favoriteList, setFavoriteList] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [editPopupMessage, setEditPopupMessage] = useState(false);
    const [passwordPopupMessage, setPasswordPopupMessage] = useState(false);
    const [removePopupMessage, setRemovePopupMessage] = useState(false);
    const [update, setUpdate] = useState(0);
    const [formUsername, setFormUsername] = useState({
        username: ''
    })
    const [formPassword, setFormPassword] = useState({
        password: '',
        confirm_password: ''
    })

    useEffect(() => {
        
        fetch(`https://tattered-common-pineapple.glitch.me/favoritelist?userId=${userId}`)
        .then(response => response.json())
        .then((data) => {
            setFavoriteList(data);
        })

        fetch(`https://tattered-common-pineapple.glitch.me/order?userId=${userId}`)
        .then(response => response.json())
        .then((data) => {
            setOrderList(data);
        })

    }, [userId, update])

    const handleChange1 = (event) => {
        setFormUsername({
            ...formUsername,
            [event.target.name]: event.target.value
        })
    }
    const handleChange2 = (event) => {
        setFormPassword({
            ...formPassword,
            [event.target.name]: event.target.value
        })
    }

    const handleEditUsername = (event) => {
        event.preventDefault();
        
        fetch('https://tattered-common-pineapple.glitch.me/username', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: formUsername.username,
                userId: userId
            }),
        })
        .then(response => response.json())
        .then((data) => {
            if(data.message === 'Username updated successfully!' || 
                data.message === 'Username cannot be empty.' || 
                data.message === 'Username is already taken.' ||
                data.message === 'This is your current username.') {
                    setEditPopupMessage(data.message);
                    setUser(prevUser => ({
                        ...prevUser, 
                        username: formUsername.username
                    }));
                    setTimeout(() => {
                        setEditPopupMessage(false);
                    }, 5000);
                }
        })
        .catch(error => {
            console.error('There was an error updating the username:', error);
        });
    }

    const handlePasswordChange = (event) => {
        event.preventDefault();
        fetch('https://tattered-common-pineapple.glitch.me/password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                newPassword: formPassword.password,
                confirmNewPassword: formPassword.confirm_password
            })
        })
        .then(response => response.json())
        .then((data) => {
            if(data.message === 'All fields are required.' || 
                data.message === 'Password is already in the system.' || 
                data.message === 'Passwords do not match.' ||
                data.message === 'Password updated successfully!'){
                setPasswordPopupMessage(data.message);
                setTimeout(() => {
                    setPasswordPopupMessage(false);
                }, 5000);
            }
        })
    }

    const handleSignOut = () => {
        setUser({
            id: '',
            username: ''
        });
        setLoggedIn(false);
        handleDisplay('Home');
        setSignOut(signOut + 1);
    }

    return (  
        <div className='background-color pb'>
            <div className="profile-label">Edit Profile</div>
            {editPopupMessage.length > 0 && editPopupMessage === 'Username updated successfully!' && <div className='edit-popup-message bgcg'>{editPopupMessage}</div>}
            {editPopupMessage.length > 0 && editPopupMessage === 'Username cannot be empty.' && <div className='edit-popup-message cr'>*{editPopupMessage + ' Please try again.'}</div>}
            {editPopupMessage.length > 0 && editPopupMessage === 'Username is already taken.' && <div className='edit-popup-message cr'>*{editPopupMessage + ' Please try again.'}</div>}
            {editPopupMessage.length > 0 && editPopupMessage === 'This is your current username.' && <div className='edit-popup-message cr'>*{editPopupMessage + ' Please try again.'}</div>}
            {passwordPopupMessage.length > 0 && passwordPopupMessage === 'Password updated successfully!' && <div className='edit-popup-message bgcg'>{passwordPopupMessage}</div>}
            {passwordPopupMessage.length > 0 && passwordPopupMessage === 'All fields are required.' && <div className='edit-popup-message cr'>*{passwordPopupMessage + ' Please try again.'}</div>}
            {passwordPopupMessage.length > 0 && passwordPopupMessage === 'Password is already in the system.' && <div className='edit-popup-message cr'>*{passwordPopupMessage + ' Please try again.'}</div>}
            {passwordPopupMessage.length > 0 && passwordPopupMessage === 'Passwords do not match.' && <div className='edit-popup-message cr'>*{passwordPopupMessage + ' Please try again.'}</div>}
            
            <div className="profile-container">
                <div className="edit-profile-container">
                    
                    <div className="dual-form-container">
                        
                        <div className="dual-left-container">
                            <div className="profile-sub-label">Edit username</div>
                            <div className="horizontalize">
                                <i className="fa-solid fa-user margina-left mt"></i>
                                <input type='text' name='username' value={formUsername.username} onChange={handleChange1} className='profile-input' autoComplete="new-password" placeholder='Enter new username'/>
                            </div>
                            <div className="centralize">
                                    <div className="div-sepa"></div>
                                </div>
                            <div className="centralize">
                                <input type='submit' value='Change username' className='profile-submit-button mt' onClick={handleEditUsername}/>
                            </div>
                        </div>
                    
                        <div className="dual-right-container">
                            <div className="profile-sub-label">Change password</div>
                            
                                <div className="horizontalize">
                                    <i className="fa-solid fa-lock margina-left mt"></i>
                                    <input type='password' name='password' value={formPassword.password} onChange={handleChange2} className='profile-input' autoComplete="new-password" placeholder='Enter new password'/>
                                </div>
                                <div className="centralize">
                                    <div className="div-sepa"></div>
                                </div>
                                <div className="horizontalize">
                                    <i className="fa-solid fa-lock margina-left mt"></i>
                                    <input type='password' name='confirm_password' value={formPassword.confirm_password} onChange={handleChange2} className='profile-input' autoComplete="new-password" placeholder='Confirm new password'/>
                                </div>
                                <div className="centralize">
                                    <div className="div-sepa"></div>
                                </div>
                            
                            <div className="centralize">
                                <input type='submit' value='Change password' className='profile-submit-button mt' onClick={handlePasswordChange}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile-label mt">Favorites</div>
            {removePopupMessage.length > 0 && <div className='edit-popup-message cr'>{removePopupMessage}</div>}
            {favoriteList && <SemiDisplay data={favoriteList} type={'favorites'} userId={userId} setRemovePopupMessage={setRemovePopupMessage} setUpdate={setUpdate} update={update} error={error}/>}
            
            <div className="profile-label mt">Order History</div>
            {orderList && <SemiDisplay data={orderList} type={'order history'} userId={userId} error={error}/> }

            <div className='centralize'>
                <button className='sign-out-button' onClick={handleSignOut}>Sign out</button>
            </div>
            
        </div>
    );
}
 
export default Profile;