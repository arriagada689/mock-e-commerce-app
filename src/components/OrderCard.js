import '../styling/order-card.css';

const OrderCard = ({ data, index }) => {
    
    const price = data.price;
    const date = data.checkout_date.slice(0, 10);

    return (  
        <div className="order-card-container">
            <div className='order-card-label'>{index + 1}</div>
            <div className='order-card-label'>${price}</div>
            <div className='order-card-label'>{date}</div>
        </div>
    );
}
 
export default OrderCard;