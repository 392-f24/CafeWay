import './Banner.css';
import Icon from '../Icon.svg';
import Search from '../Search.svg';
import { handleSignIn } from '../utilities/firebase';
import { useNavigate } from 'react-router-dom';

export const Banner = () => {
    const navigate = useNavigate();
    const navigateToReviews = () => {
        navigate('/cafes')
    }
    return (
        <div className='banner-div'>
            <div className="logo-search-div">
                <div className='logo-div'>
                    <img src={Icon}/>
                    <h1>
                        CafeWay
                    </h1>
                </div>
                <form>
                    <input className="text-input" type="text" placeholder="Search for cafes near you" />
                    <button className="search-btn" onClick={navigateToReviews}> 
                        <img src={Search}/>
                    </button>
                </form>
            </div>
            <div className="banner-buttons">
                <button className="banner-btn">
                    Review
                </button>
                <button className="banner-btn" onClick={handleSignIn}>
                    Login
                </button>
            </div>
        </div>
    )
}

export default Banner;