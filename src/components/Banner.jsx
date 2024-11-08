import './Banner.css';
import Icon from '../Icon.svg';
import Search from '../Search.svg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { handleSignIn, handleLogout, useAuthState } from '../utilities/firebase';

export const Banner = ({ cafes }) => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');
    const [filteredCafes, setFilteredCafes] = useState([]);
    
    const [user] = useAuthState(); 

    const handleInputChange = (e) => {
        const text = e.target.value;
        setSearchText(text);

        if (text) {
            const matches = cafes.filter(cafe => 
                cafe.name.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredCafes(matches);
        } else {
            setFilteredCafes([]);
        }
    };

    const handleSelectCafe = (cafe) => {
        setSearchText(cafe.name);
        setFilteredCafes([]);
        navigate(`/cafe/${cafe.placeId}`);
    };

    const handleSearch = (e) => {
        e.preventDefault();

        if (searchText.trim() === '') {
            navigate('/cafes');
        } else {
            const selectedCafe = cafes.find(cafe =>
                cafe.name.toLowerCase() === searchText.toLowerCase()
            );

            if (selectedCafe) {
                navigate(`/cafe/${selectedCafe.placeId}`);
            } else {
                alert('Cafe not found.');
            }
        }
    };

    return (
        <div className='banner-div'>
            <div className="logo-search-div">
                <div className='logo-div'>
                    <img src={Icon} alt="CafeWay Logo" />
                    <h1>CafeWay</h1>
                </div>
                <form onSubmit={handleSearch}>
                    <input
                        className="text-input"
                        type="text"
                        placeholder="Search for cafes near you"
                        value={searchText}
                        onChange={handleInputChange}
                    />
                    <button className="search-btn" type="submit"> 
                        <img src={Search} alt="Search Icon" />
                    </button>
                    {filteredCafes.length > 0 && (
                        <ul className="autocomplete-dropdown">
                            {filteredCafes.map((cafe) => (
                                <li
                                    key={cafe.placeId}
                                    onClick={() => handleSelectCafe(cafe)}
                                    className="autocomplete-item"
                                >
                                    {cafe.name} - {cafe.vicinity}
                                </li>
                            ))}
                        </ul>
                    )}
                </form>
            </div>

            <div className="banner-buttons">
                <button className="banner-btn">
                    Review
                </button>
                {user ? (
                    <button className="banner-btn" onClick={handleLogout}>
                        Logout
                    </button>
                ) : (
                    <button className="banner-btn" onClick={handleSignIn}>
                        Login
                    </button>
                )}
            </div>
        </div>
    );
};

export default Banner;
