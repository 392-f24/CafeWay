import './Banner.css';
import Icon from '../Icon.svg';
import Search from '../Search.svg';

const Banner = () => {
    // const navigate = useNavigate();
    // const navigateToReviews = () => {
    //     navigate('/reviews')
    // }
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
                    <button className="search-btn"> 
                        <img src={Search}/>
                    </button>
                </form>
            </div>
            <div className="banner-buttons">
                <button className="banner-btn">
                    Review
                </button>
                <button className="banner-btn">
                    Login
                </button>
            </div>
        </div>
    )
}

export default Banner