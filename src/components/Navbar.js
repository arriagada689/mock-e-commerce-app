import '../styling/navbar.css';

const Navbar = ( { handleDisplay, loggedIn, displayUsername, cartNumber } ) => {

    return (  
        <div className="nav-bar-container sticky-navbar">
            <div className="left-side">
                <div className="brand">Mock E-Commerce Store</div>
                <div className="nav-link-container">
                    <button className="nav-link" onClick={() => handleDisplay('Home')}>Products</button>
                </div>
            </div>
            <div className="right-side">
                {!loggedIn &&
                    <div className='nav-link-container'> 
                        <button className='nav-link' onClick={() => handleDisplay('Signin')}>Sign in</button>
                        <button className='nav-link' onClick={() => handleDisplay('Register')}>Register</button>
                    </div>}
                {loggedIn && 
                    <button className='nav-link' onClick={() => handleDisplay('Profile')}>{displayUsername}</button>}
                <button className='cart-button' onClick={() => handleDisplay('Cart')}><i className="fas fa-shopping-cart margin-left"></i></button>
                <div className='cart-number'>{cartNumber}</div>
            </div>
        </div>
    );
}
 
export default Navbar;