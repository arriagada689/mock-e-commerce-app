import { useEffect, useState } from "react";

const CartCard = ({productid, quantity, userId, tempUserId, setUpdate, update, setCartPopupMessage, handleAddToCart, setCartNumber }) => {
    const [productData, setProductData] = useState(null);
    const [dynamicQuantity, setDynamicQuantity] = useState(quantity);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${productid}`)
            .then(response => response.json())
            .then((data) => {
                setProductData(data);
            })
    }, [productid])

    const removeCartItem = (product) => {
        
        if(userId === ''){
            fetch(`https://tattered-common-pineapple.glitch.me/cart?productId=${product.id}&userId=${tempUserId}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then((data) => {
                if (data.success) {
                    setCartPopupMessage(data.message);
                    handleAddToCart(productData, (-1 * dynamicQuantity), true);
                    setTimeout(function() {
                        setCartPopupMessage(''); 
                    }, 4000); 
                }
            })
        } else {
            fetch(`https://tattered-common-pineapple.glitch.me/cart?productId=${product.id}&userId=${userId}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then((data) => {
                if (data.success) {
                    setCartPopupMessage(data.message);
                    handleAddToCart(productData, (-1 * dynamicQuantity), true);
                    setTimeout(function() {
                        setCartPopupMessage(''); 
                    }, 4000); 
                }
            }) 
        }
        setTimeout(function() {
            setUpdate(update + 1);
        }, 500);
        
    }

    const handleQuantityChange = (e) => {
        setDynamicQuantity(e.target.value);
        setUpdate(update + 1);
        if(userId === ''){
            fetch('https://tattered-common-pineapple.glitch.me/updatecart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: tempUserId,
                    productId: productid,
                    quantity: e.target.value
                })
            })
            .then(response => response.json())
            .then((data) => {
                setTimeout(function() {
                    if(data === 'success'){
                        
                        fetch(`https://tattered-common-pineapple.glitch.me/cart?userId=${tempUserId}`)
                        .then(response => response.json())
                        .then((data) => {
                            
                            let sum = 0;
                            for(let i = 0; i < data.length; i++){
                                sum += data[i].quantity;
                            }
                            setCartNumber(sum);
                        })
                        
                    }
                }, 500);
            })
        } else {
            fetch('https://tattered-common-pineapple.glitch.me/updatecart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userId,
                    productId: productid,
                    quantity: e.target.value
                })
            })
            .then(response => response.json())
            .then((data) => {
                setTimeout(function() {
                    if(data === 'success'){
                        
                        fetch(`https://tattered-common-pineapple.glitch.me/cart?userId=${userId}`)
                        .then(response => response.json())
                        .then((data) => {
                            
                            let sum = 0;
                            for(let i = 0; i < data.length; i++){
                                sum += data[i].quantity;
                            }
                            setCartNumber(sum);
                        })
                    }
                }, 500);
            })
        }
    }
    
    return (  
        <div className="semi-card-container">
            {productData && <img src={productData.image} alt="product"/>}
            {productData && <div className="name-price">
                                <div className="semi-card-name">{productData.title}</div>
                                <div className="semi-card-price">${formatPrice(productData.price)}</div>
                                <div className="product-quantity">
                                    <label htmlFor="quantity">Quantity: </label>
                                    <select
                                        id="quantity"
                                        value={dynamicQuantity}
                                        onChange={(e) => handleQuantityChange(e)}
                                    >
                                        {Array.from({ length: 10 }, (_, i) => (
                                            <option key={i + 1} value={i + 1}>
                                                {i + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button className="semi-card-button" onClick={(e) => removeCartItem(productData)}><i className="fa-solid fa-trash-can mr"></i>Remove from cart</button>
                            </div>}
        </div>
    );
}

function formatPrice(price) {
    return parseFloat(price).toFixed(2);
}
 
export default CartCard;