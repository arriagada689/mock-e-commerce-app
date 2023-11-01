import '../styling/product-card.css';
import React, { useState } from 'react';
import StarRating from './StarRating';

const ProductCard = ({ product, handleDisplay, handleCartClick, isFavorite, handleFavoriteClick, loggedIn, userId, tempUserId, setShowRemoveFavoritePopup }) => {
    const [favorite, setFavorite] = useState(isFavorite);
    const [quantity, setQuantity] = useState(1);
    
    const name = product.title;
    const image = product.image;
    const category = product.category;
    const description = product.description;
    const price = formatPrice(product.price);
    const ratingLower = product.rating.rate;
    const ratingUpper = product.rating.count;

    const favoriteClickHandler = () => {

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
        <div className="grocery-card-container">
            
            <button className='back-button' onClick={() => handleDisplay('Home')}><i className="fa-solid fa-arrow-left mr"></i>Go back to products page</button>
            
            <div className='product-container'>
                <img src={image} alt='product'></img>
                <div className='right-side-container'>
                    <div className="product-category">{capitalizeFirstLetterOfString(category)}</div>
                    <div className="product-name">{name}</div>

                    <div className="product-rating-container">
                        <StarRating rating={ratingLower}/>
                        <div className="product-rating">{ratingLower}</div>
                        <div className="product-rating">({ratingUpper})</div>
                    </div>

                    <div className="product-price">${price}</div>
                    
                    <div className="product-description">{description}</div>
                    
                    <div className="product-button-container">
                        <button className="product-button bg-color" onClick={() => handleCartClick(product, quantity, true)}>Add to Cart</button>
                        <button className="product-button light-bg-color" onClick={() => favoriteClickHandler(product)}>Favorite<i className={favorite ? "fa-solid fa-heart ml" : "fa-regular fa-heart ml"}></i></button>
                    </div>

                </div>
            </div>
        </div>
    );
}

function capitalizeFirstLetterOfString(str) {
    return str.split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
}

function formatPrice(price) {
    return parseFloat(price).toFixed(2);
}
 
export default ProductCard;