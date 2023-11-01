import '../styling/semi-display.css';
import SemiCard from '../components/SemiCard.js';
import CartCard from '../components/CartCard.js';
import OrderCard from './OrderCard';

const SemiDisplay = ({ data, type, userId, tempUserId, setRemovePopupMessage, setUpdate, update, setCartPopupMessage, error, setHashMap, handleAddToCart, setCartNumber }) => {
    
    const renderSemiCards = () => {
        if(data.length > 0){
            return data.map((item, index) => <SemiCard key={index} productid={item.productid} type={type} userId={userId} tempUserId={tempUserId} setRemovePopupMessage={setRemovePopupMessage} setUpdate={setUpdate} update={update}/>);
        }
    }

    const renderSemiCards2 = () => {
        if(data.length > 0){
            return data.map((item, index) => <CartCard key={index} productid={item.productid} quantity={item.quantity} userId={userId} tempUserId={tempUserId} setUpdate={setUpdate} update={update} setCartPopupMessage={setCartPopupMessage} setHashMap={setHashMap} handleAddToCart={handleAddToCart} setCartNumber={setCartNumber} /> );
        }
    }

    const renderSemiCards3 = () => {
        if(data.length > 0){
            return data.map((item, index) => <OrderCard key={index} data={item} index={index}/>)
        }
    }

    return (  
        <div className="semi-display-container">
            {data.length > 0 && type === 'favorites' && renderSemiCards()}
            {data.length === 0 && type === 'favorites' && <div className='empty-display-text'>Products in your {type} will display here.</div>}
            {data.length > 0 && type === 'cart' && renderSemiCards2()}
            {data.length === 0 && type === 'cart' && <div className='empty-display-text'>Products in your {type} will display here.</div>}
            {data.length > 0 && type === 'order history' && renderSemiCards3()}
            {data.length === 0 && type === 'order history' && <div className='empty-display-text'>Any orders made will display here.</div>}
            {type === 'purchase1' && <div className='empty-display-text'>Check your order history on your profile page.</div>}
            {type === 'purchase2' && <div className='empty-display-text'>Make an account in order to see your order history on your profile page.</div>}
            {error && <div className='empty-display-text'>Problem fetching data. Fake Store API may be down.</div>}
        </div>
    );
}
 
export default SemiDisplay;