import './CafeList.css';

const CafeList = ({ cafes }) => {
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
                {cafes.map((cafe, index) => (
                    <div key={index} className="cafe-card">
                        <h3>{cafe.name}</h3>
                        <p>{cafe.vicinity}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CafeList;
