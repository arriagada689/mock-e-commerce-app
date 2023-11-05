import { useEffect, useState } from "react";
import '../styling/popup.css';
import Navbar from "./Navbar";
import Home from "./Home";
import Signin from "./Signin";
import Register from "./Register";
import Profile from "./Profile";
import Cart from "./Cart";
import ProductCard from "./ProductCard";
import LoadingEllipses from './LoadingEllipses';

function App() {
  const [display, setDisplay] = useState('Home');
  const [fakeCounter, setFakeCounter] = useState(0);
  const [cartNumber, setCartNumber] = useState(null);
  const [error, setError] = useState(false);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [showFavoritePopup, setShowFavoritePopup] = useState(false);
  const [showRemoveFavoritePopup, setShowRemoveFavoritePopup] = useState(false);
  const [showQuantityError, setShowQuantityError] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [clickedProduct, setClickedProduct] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [tempUserId, setTempUserId] = useState(getRandomNumberBetween()); 
  const [signOut, setSignOut] = useState(0); 
  const [hashmap, setHashmap] = useState({});
  
  const [user, setUser] = useState({
    id: '',
    username: ''
  });

  useEffect(() => {
    
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        
      })
      .catch(error => {
        setError(true);
      })

    if(user.id === ''){
      fetch(`https://tattered-common-pineapple.glitch.me/cart?userId=${tempUserId}`)
        .then(response => response.json())
        .then((data) => {
            let num = 0;
            for(let i = 0; i < data.length; i++){
                num += data[i].quantity;
            }
            setTimeout(function() {
                setCartNumber(num);
            }, 1000);
        })
        .catch((error) => {
          setCartNumber(null);
        })
    } else{
        fetch(`https://tattered-common-pineapple.glitch.me/cart?userid=${user.id}`)
        .then(response => response.json())
        .then((data) => {
            let num = 0;
            for(let i = 0; i < data.length; i++){
                num += data[i].quantity;
            }
            setTimeout(function() {
                setCartNumber(num);
            }, 1000);
        })
        .catch((error) => {
          setCartNumber(null);
        })
    }

  }, [signOut, loggedIn])

  const handleDisplay = (str) => {
    if(str === 'Home'){
      setDisplay('Home');
    } else if(str === 'About') {
      setDisplay('About');
    } else if(str === 'Signin') {
      setDisplay('Signin');
    } else if(str === 'Register') {
      setDisplay('Register');
    } else if(str === 'Profile') {
      setDisplay('Profile');
    } else if(str === 'Cart') {
      setDisplay('Cart');
    } else if(str === 'ProductCard') {
      setDisplay('ProductCard');
    }
  }

  const handleLogin = (data) => {
    setLoggedIn(true);
    const { password, ...userInfo } = data;
    setUser(userInfo);
  }

  const handleProductClick = (product, isFavorite) => {
    setClickedProduct(product);
  }

  const handleCartClick = (product, quantity, increment) => {

    let userIdToSend;
    if (loggedIn) {
        userIdToSend = user.id;
    } else {
        userIdToSend = tempUserId;
    }

    fetch('https://tattered-common-pineapple.glitch.me/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userIdToSend,
            productId: product.id,
            quantity: quantity,
            price: product.price
        })
    })
    .then(response => response.json())
    .then((data) => {
        if (data === 'success') {
            setShowCartPopup(true);

            
            setFakeCounter(fakeCounter + 1);
            handleAddToCart(product, quantity, increment);

            setTimeout(() => {
                setShowCartPopup(false);
            }, 3000);

            
            
        } else if (data.error) {
            setShowQuantityError(true);
            setTimeout(() => {
                setShowQuantityError(false);
            }, 3000);
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error.message);
    });
  }

  const handleAddToCart = (product, quantity, increment) => {
    
    if(increment){
      setCartNumber(cartNumber + Number(quantity));
      setHashmap(prevMap => {
        const currentQuantity = prevMap[product.id] || 0;
  
        return {
            ...prevMap,
            [product.id]: currentQuantity + quantity
        };
      });
    } else {
      setHashmap(prevMap => {
        return {
            ...prevMap,
            [product.id]: quantity
        };
      });
    }
    
  };

  const handleFavoriteClick = (product) => {
    let userIdToSend;
    if(loggedIn){
      userIdToSend = user.id;
    } else {
      userIdToSend = tempUserId;
    }

    fetch('https://tattered-common-pineapple.glitch.me/favorite', {
      method: 'POST',  
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: userIdToSend,
        productId: product.id,
        quantity: 1
      })
    })
    .then(response => response.json())
    .then((data) => {
      if(data === 'success'){
        setShowFavoritePopup(true);
        setTimeout(() => {
          setShowFavoritePopup(false);
        }, 3000);
      }
    })
  }
  
  return (
    <div className="App">
      <Navbar handleDisplay={handleDisplay} loggedIn={loggedIn} displayUsername={user.username} cartNumber={cartNumber} hashmap={hashmap} fakeCounter={fakeCounter}/>
      {showCartPopup ? <div className="popup">Item added to cart!</div> : null}
      {showFavoritePopup ? <div className="popup">Item added to favorites!</div> : null}
      {showRemoveFavoritePopup ? <div className="popup">Item removed from favorites!</div> : null}
      {showQuantityError ? <div className="popup">Quantity limit exceeded for this item.</div> : null}
      {cartNumber === null && <div className="centered-container"><div className="loading place-next">Loading<LoadingEllipses /></div></div>}
      {display === 'Home' && cartNumber !== null ? <Home handleDisplay={handleDisplay} handleProductClick={handleProductClick} handleCartClick={handleCartClick} handleFavoriteClick={handleFavoriteClick} setFakeCounter={setFakeCounter} tempUserId={tempUserId} userId={user.id} loggedIn={loggedIn} setShowRemoveFavoritePopup={setShowRemoveFavoritePopup}/> : ''}
      {display === 'Signin' ? <Signin handleLogin={handleLogin} /> : ''}
      {display === 'Register' ? <Register handleLogin={handleLogin} /> : ''}
      {display === 'Profile' ? <Profile userId={user.id} setLoggedIn={setLoggedIn} setUser={setUser} signOut={signOut} setSignOut={setSignOut} handleDisplay={handleDisplay} error={error} /> : ''}
      {display === 'Cart' ? <Cart loggedIn={loggedIn} tempUserId={tempUserId} userId={user.id} error={error} setFakeCounter={setFakeCounter} fakeCounter={fakeCounter} setHashmap={setHashmap} handleAddToCart={handleAddToCart} setCartNumber={setCartNumber} /> : ''}
      {display === 'ProductCard' ? <ProductCard product={clickedProduct} handleDisplay={handleDisplay} handleCartClick={handleCartClick} isFavorite={isFavorite} handleFavoriteClick={handleFavoriteClick} loggedIn={loggedIn} userId={user.id} tempUserId={tempUserId} setShowRemoveFavoritePopup={setShowRemoveFavoritePopup}/> : ''}
    </div>
  );
}

function formatPrice(price) {
  return parseFloat(price).toFixed(2);
}

function getRandomNumberBetween(min = 200, max = 100000) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default App;
