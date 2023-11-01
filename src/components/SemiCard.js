import { useEffect, useState } from "react";
import '../styling/semi-card-container.css';

const SemiCard = ({ productid, type, userId, tempUserId, setRemovePopupMessage, setUpdate, update }) => {
    const [productData, setProductData] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${productid}`)
            .then(response => response.json())
            .then((data) => {
                setProductData(data);
            })
    }, [productid])

    const handleFavRemove = (event, product) => {

        if(userId === ''){
            fetch(`https://tattered-common-pineapple.glitch.me/favorite?productId=${product.id}&userId=${tempUserId}`, {
                method: 'DELETE',
            })
            .then(response => response.json())
            .then(data => {
                if(data.success){
                    setRemovePopupMessage('Item removed from favorites!');

                    setTimeout(function() {
                        setRemovePopupMessage('');
                    }, 4000);
                }
            })
        } else {
            fetch(`https://tattered-common-pineapple.glitch.me/favorite?productId=${product.id}&userId=${userId}`, {
                method: 'DELETE',
            })
            .then(response => response.json())
            .then(data => {
                if(data.success){
                    setRemovePopupMessage('Item removed from favorites!');

                    setTimeout(function() {
                        setRemovePopupMessage('');
                    }, 4000);
                }
            })
        }
        setTimeout(function() {
            setUpdate(update + 1);
        }, 400);
    }

    return (  
        <div className="semi-card-container">
            {productData && <img src={productData.image} alt="product"/>}
            {productData && <div className="name-price">
                                <div className="semi-card-name">{productData.title}</div>
                                <div className="semi-card-price">${formatPrice(productData.price)}</div>
                                {type === 'favorites' ? <button className="semi-card-button" onClick={(e) => handleFavRemove(e, productData)}>Remove from favorites</button> : null}
                                {type === 'cart' ? <div className="product-quantity">
                                                        <label htmlFor="quantity">Quantity: </label>
                                                        <select
                                                            id="quantity"
                                                            value={quantity}
                                                            onChange={(e) => setQuantity(e.target.value)}
                                                        >
                                                            {Array.from({ length: 10 }, (_, i) => (
                                                                <option key={i + 1} value={i + 1}>
                                                                    {i + 1}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div> : null}
                            </div>}
        </div>
    );
}

function formatPrice(price) {
    return parseFloat(price).toFixed(2);
}
 
export default SemiCard;