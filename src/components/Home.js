import '../styling/home.css';
import { useEffect, useState } from "react";
import ProductMiniCard from './ProductMiniCard';

const Home = ({ handleDisplay, handleProductClick, handleCartClick, handleFavoriteClick, setFakeCounter, tempUserId, userId, loggedIn, setShowRemoveFavoritePopup }) => {
    const [data, setData] = useState(null);
    const [categories, setCategories] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [favoriteList, setFavoriteList] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                setError(true);
            })

        fetch('https://fakestoreapi.com/products/categories')
            .then(response => response.json())
            .then(categories => {
                setCategories(categories);
            })
            .catch(error => {
                setError(true);
            })

        let userIdToSend = '';
        if(loggedIn){
            userIdToSend = userId;
        } else {
            userIdToSend = tempUserId;
        }
        
        fetch(`https://tattered-common-pineapple.glitch.me/favorite?userId=${userIdToSend}`)
            .then(response => response.json())
            .then((data) => {
                setFavoriteList(data);
            })

    }, [userId])

    const renderCards = () => {
        return data.map((product, index) => {
            let isFavorite = false;
            for(let i = 0; i < favoriteList.length; i++){
                if(product.id === favoriteList[i].productid){
                    isFavorite = true;
                    break;
                }
            }
            return <ProductMiniCard 
                        key={index} 
                        data={product} 
                        handleDisplay={handleDisplay} 
                        handleProductClick={handleProductClick} 
                        handleCartClick={handleCartClick} 
                        handleFavoriteClick={handleFavoriteClick}
                        isFavorite={isFavorite}
                        tempUserId={tempUserId}
                        userId={userId}
                        loggedIn={loggedIn}
                        setShowRemoveFavoritePopup={setShowRemoveFavoritePopup}
                        />
        });
    }

    const handleCategoryClick = (input) => {
        if(input === 'All Categories'){
            fetch('https://fakestoreapi.com/products')
                .then(response => response.json())
                .then(data => {
                    setSelectedCategory(input);
                    setData(data);
                })
            return;
        }

        fetch(`https://fakestoreapi.com/products/category/${input}`)
            .then(response => response.json())
            .then(data => {
                setSelectedCategory(input);
                setData(data);
            })
    }

    const renderButtons = () => {
        return categories.map((category, index) => {
            return <button 
                        key={index} 
                        onClick={() => handleCategoryClick(category)}
                        className={`category-button ${selectedCategory === category ? `selected-category-button` : ``}`}>
                            {capitalizeFirstLetterOfString(category)}
                    </button>
        })
    }

    return (  
        <div className="">
            
            <div className="home-page-label">{capitalizeFirstLetterOfString(selectedCategory)}</div>
            
            <div className='category-products-container'>
                <div className="category-button-container">
                    <button className='meta-button'>Categories</button>
                    <button className={`category-button ${selectedCategory === 'All Categories' ? `selected-category-button` : ``}`} onClick={() => handleCategoryClick('All Categories')}>All Categories</button>
                    {categories && renderButtons()}
                </div>
                <div className='cards-container'>
                    {data && favoriteList && renderCards()}
                    {error && <div className='fetch-error'>Problem fetching data. Fake Store API may be down.</div>}
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
 
export default Home;