import { useState } from 'react';
import '../styling/product-mini-card.css';

const ProductMiniCard = ({ data, handleDisplay, handleProductClick, handleCartClick, handleFavoriteClick, isFavorite, tempUserId, userId, loggedIn, setShowRemoveFavoritePopup }) => {
    const [favorite, setFavorite] = useState(isFavorite);
    const name = data.title.length > 55 ? `${data.title.slice(0, 52)}...` : data.title
    const image = data.image;
    const price = formatPrice(data.price);

    const cartClickHandler = (event, product) => {
        event.stopPropagation();  
        handleCartClick(product, 1, true);
    }

    const favoriteClickHandler = (event, product) => {
        event.stopPropagation();
        
        if(favorite){
            setFavorite(false);

            let userIdToSend = '';
            if(loggedIn){
                userIdToSend = userId;
            } else {
                userIdToSend = tempUserId;
            }

            fetch(`https://tattered-common-pineapple.glitch.me/favorite?productId=${product.id}&userId=${userIdToSend}`, {
                method: 'DELETE',
            })
            .then(response => response.json())
            .then(data => {
                setShowRemoveFavoritePopup(true);
                setTimeout(() => {
                    setShowRemoveFavoritePopup(false);
                }, 5000)
            })
            .catch(error => {
                console.error("Error removing favorite:", error);
            });

        } else {
            setFavorite(true);
            handleFavoriteClick(product);
        }

    }
    
    return (  
        <div className="grocery-mini-card-container" onClick={() => {handleDisplay('ProductCard', isFavorite); handleProductClick(data, isFavorite)}}>
            
            <img src={image} alt='product'></img>
            <div className='verticalize'>
                <div className="mini-card-name">{name}</div>
            </div>
            <div className="lower-container">
                <div className="lower-left-container">
                    <div className="mini-card-price">${price}</div>
                </div>
                
                <div className="lower-right-container">
                    <button className='card-upper-button' onClick={(e) => cartClickHandler(e, data)}>Add to Cart</button>
                    <button className='card-lower-button' onClick={(e) => favoriteClickHandler(e, data)}>Favorite<i className={favorite ? "fa-solid fa-heart ml" : "fa-regular fa-heart ml"}></i></button>
                </div>
            </div>
        </div>
    );
}

function formatPrice(price) {
    return parseFloat(price).toFixed(2);
}
 
export default ProductMiniCard;