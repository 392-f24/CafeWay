import './CafeList.css';
import { useNavigate } from 'react-router-dom';

const CafeList = ({ cafes }) => {
    const navigate = useNavigate();
    const handleClick = (placeId) => {
        navigate(`/cafe/${placeId}`);
    };

    return (
        <div className="cafe-list-container">
            <div className="filter">
                <h4>Filter Options</h4>
                <label>
                    Rating:
                    <select>
                        <option value="1">1 Star</option>
                        <option value="2">2 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="5">5 Stars</option>
                    </select>
                </label>
                <br />
                <label>
                    Location:
                    <input type="text" placeholder="Search by location" />
                </label>
            </div>
            <div className="cafe-list">
                {cafes.map((cafe) => (
                    <div 
                        key={cafe.placeId} 
                        className="cafe-card" 
                        onClick={() => handleClick(cafe.placeId)}
                    >
                        <h3>{cafe.name}</h3>
                        <p>{cafe.vicinity}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CafeList;
