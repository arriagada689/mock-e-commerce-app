import { useEffect, useState } from "react";
import '../styling/profile.css';
import '../styling/cart.css';
import SemiDisplay from "./SemiDisplay";

const Cart = ({ loggedIn, tempUserId, userId, error, setFakeCounter, fakeCounter, setHashMap, handleAddToCart, setCartNumber }) => {
    const [cartList, setCartList] = useState(null);
    const [update, setUpdate] = useState(0);
    const [cartPopupMessage, setCartPopupMessage] = useState(false);
    const [total, setTotal] = useState(0);
    const [purchaseMade, setPurchaseMade] = useState(false);

    useEffect(() => {

        if(userId === ''){
            fetch(`https://tattered-common-pineapple.glitch.me/cart?userId=${tempUserId}`)
            .then(response => response.json())
            .then((data) => {
                setCartList(data);
                let tempTotal = 0;
                for(let i = 0; i < data.length; i++){
                    tempTotal += (Number(data[i].price) * data[i].quantity);
                }
                setTotal(tempTotal);
            })
        } else {
            fetch(`https://tattered-common-pineapple.glitch.me/cart?userId=${userId}`)
            .then(response => response.json())
            .then((data) => {
                setCartList(data);
                let tempTotal = 0;
                for(let i = 0; i < data.length; i++){
                    tempTotal += (Number(data[i].price) * data[i].quantity);
                }
                setTotal(tempTotal);
            })
        }

    }, [update, userId])

    const handleCheckout = () => {
        if(userId === ''){
            fetch('https://tattered-common-pineapple.glitch.me/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: tempUserId,
                    price: total
                })
            })
            .then(response => response.json())
            .then((data) => {
                if(data === 'success'){
                    setPurchaseMade(true);
                }
            })
        } else {
            fetch('https://tattered-common-pineapple.glitch.me/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userId,
                    price: total
                })
            })
            .then(response => response.json())
            .then((data) => {
                if(data === 'success'){
                    setPurchaseMade(true);
                }
            })
        }
        setTimeout(function() {
            setUpdate(update + 1);
            setFakeCounter(fakeCounter + 1);
            setCartNumber(0);
        }, 500);
    }
    
    return (  
        <div className="background-color pb">
            {purchaseMade && loggedIn && <div className="mb">
                                <div className="purchase-label">Order complete!
                                </div>
                                <SemiDisplay type={'purchase1'} data={[]}/>
                            </div> 
                            }
            {purchaseMade && !loggedIn && <div className="mb">
                                <div className="purchase-label">Order complete!
                                </div>
                                <SemiDisplay type={'purchase2'} data={[]}/>
                            </div> 
                            }
            <div className="profile-label">Cart</div>
            {cartPopupMessage.length > 0 && <div className="edit-popup-message cr">{cartPopupMessage}</div>}
            {cartList && <SemiDisplay data={cartList} type={'cart'} userId={userId} tempUserId={tempUserId} setUpdate={setUpdate} update={update} setCartPopupMessage={setCartPopupMessage} error={error} setHashMap={setHashMap} handleAddToCart={handleAddToCart} setCartNumber={setCartNumber}/>}
            <div className="checkout-display-container">
                <div className="cart-div-separator mt"></div>
                <div className="checkout-text">Total - {formatPrice(total)}</div>
                {total > 0 && <button className="checkout-button" onClick={handleCheckout}>Check out</button>}
                
            </div>
        </div>
    );
}

function formatPrice(price) {
    return parseFloat(price).toFixed(2);
}
 
export default Cart;