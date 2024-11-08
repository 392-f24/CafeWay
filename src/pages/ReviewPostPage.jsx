import React, { useState, useEffect } from 'react';
import '../App.css';
import { useAuthState } from '../utilities/firebase';
import { findCafes } from '../utilities/findCafes';

const ReviewPostPage = () => {
    const [reviews, setReviews] = useState([]);
    const [availability, setAvailability] = useState({});
    const [newReview, setNewReview] = useState('');
    const [selectedReview, setSelectedReview] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [cafeStatus, setCafeStatus] = useState({ seating: '', outlets: '' });
    const [address, setAddress] = useState('');
    const [dist, setDist] = useState('');
    const [cafes, setCafes] = useState([]);
    useEffect(() => { }, []);

    const findCafesWrapper = () => {
        findCafes(dist, address, setCafes);
    };

    const handleReviewSubmit = () => {
        if (newReview.trim()) {
            const review = { id: Date.now(), text: newReview, replies: [] };
            setReviews((prevReviews) => [...prevReviews, review]);
            setNewReview('');
        }
    };

    const handleReplySubmit = (reviewId) => {
        if (replyText.trim()) {
            setReviews((prevReviews) =>
                prevReviews.map((review) =>
                    review.id === reviewId
                        ? { ...review, replies: [...review.replies, replyText] }
                        : review
                )
            );
            setReplyText('');
            setSelectedReview(null);
        }
    };

    const handleAvailabilityUpdate = (cafeId) => {
        const timestamp = new Date().toLocaleString();
        const newUpdate = { timestamp, seating: cafeStatus.seating, outlets: cafeStatus.outlets };

        setAvailability((prevAvailability) => ({
            ...prevAvailability,
            [cafeId]: {
                history: [...(prevAvailability[cafeId]?.history || []), newUpdate],
            },
        }));
        setCafeStatus({ seating: '', outlets: '' });
    };
    return (
        <div>
            <div className="listings-container">
                <div className="listings-column">
                    <h2>Share a Review</h2>
                    <input
                        type="text"
                        placeholder="Share a quick review..."
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                    />
                    <button onClick={handleReviewSubmit}>Submit</button>

                    <ul className="review-list">
                        {reviews.map((review) => (
                            <li key={review.id} className="review-item">
                                <p onClick={() => setSelectedReview(review)}>{review.text}</p>
                                <ul className="reply-list">
                                    {review.replies.map((reply, index) => (
                                        <li key={index} className="reply-item">
                                            <span className="reply-label">Reply:</span> {reply}
                                        </li>
                                    ))}
                                </ul>
                                {selectedReview && selectedReview.id === review.id && (
                                    <div className="reply-input">
                                        <input
                                            type="text"
                                            placeholder="Write a reply..."
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                        />
                                        <button onClick={() => handleReplySubmit(review.id)}>Send</button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>

                    <h2>Update Cafe Availability</h2>
                    <input
                        type="text"
                        placeholder="Seating status (e.g., Few seats left)"
                        value={cafeStatus.seating}
                        onChange={(e) => setCafeStatus({ ...cafeStatus, seating: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Outlet status (e.g., All taken)"
                        value={cafeStatus.outlets}
                        onChange={(e) => setCafeStatus({ ...cafeStatus, outlets: e.target.value })}
                    />
                    <button onClick={() => handleAvailabilityUpdate('cafe-123')}>Update Availability</button>

                    <h2>Availability History</h2>
                    {availability['cafe-123']?.history?.map((update, index) => (
                        <div key={index} className="availability-item">
                            <p>
                                <strong>{update.timestamp}:</strong> Seating: {update.seating}, Outlets: {update.outlets}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="map-column">
                    <h2>Cafes Near Me</h2>
                    <input
                        type="text"
                        placeholder="Enter zip code"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Enter radius (in miles)"
                        value={dist}
                        onChange={(e) => setDist(e.target.value)}
                    />
                    <button onClick={findCafesWrapper}>Search</button>
                    <h2>Cafes Near Me</h2>
                    <ul>
                        {cafes.map((cafe, index) => (
                            <li className="cafe-card" key={index}>{cafe}</li>
                        ))}
                    </ul>


                    <ul className="cafe-list">
                        {cafes.map((cafesMap, index) => (
                            <li key={index} className="cafe-item">
                                {cafe.name} (Lat: {cafe.lat}, Lng: {cafe.lng})
                            </li>
                        ))}
                    </ul>

                </div>
            </div>
        </div>
    )
}

export default ReviewPostPage;