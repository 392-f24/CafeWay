import './CafeList.css';

const reviews = [
    {
        id: 1,
        author: 'John Doe',
        rating: 4,
        content: 'Currently busy.',
        location: 'Starbucks',
    },
    {
        id: 2,
        author: 'Jane Smith',
        rating: 5,
        content: 'Somewhat busy, some seats remain.',
        location: 'Colectivo',
    },
    {
        id: 3,
        author: 'Alice Johnson',
        rating: 3,
        content: 'Very empty, plenty of seats.',
        location: "Phil's",
    },
    {
        id: 4,
        author: 'Bob Brown',
        rating: 5,
        content: 'Very quiet and great coffee!',
        location: 'Coffee Lab',
    },
];

const CafeList = () => {
    return (
        <div className="cafe-list-container">
            {/* Filter section */}
            <div className="filter">
                <h4>Filter Options</h4>
                {/* Example filter options */}
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
                {/* Add more filters here as needed */}
            </div>

            {/* Review cards */}
            <div className="cafe-list">
                {reviews.map((review) => (
                    <div key={review.id} className="cafe-card">
                        <h3>{review.author}</h3>
                        <p>{review.location}</p>
                        <div>
                            {Array.from({ length: review.rating }).map((_, index) => (
                                <span key={index}>&#9733;</span>
                            ))}
                        </div>
                        <p>{review.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CafeList;
