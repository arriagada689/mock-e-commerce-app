import '../styling/star-rating.css';

const StarRating = ({rating}) => {
    const fullStars = Math.floor(rating);
    const halfStars = Math.round(rating - fullStars);
    const emptyStars = 5 - fullStars - halfStars;
    
    return (  
        <div className="star-rating">
            {[...Array(fullStars)].map((_, i) => (
                <i key={i} className="fa-solid fa-star"></i>
            ))}

            {[...Array(halfStars)].map((_, i) => (
                <div key={i + fullStars} className="half-star">
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-solid fa-star-half overlay"></i>
                </div>
            ))}

            {[...Array(emptyStars)].map((_, i) => (
                <i key={i + fullStars + halfStars} className="fa-regular fa-star"></i>
            ))}
        </div>
    );
}
 
export default StarRating;