import React, { useEffect } from "react";
import './ReviewList.css';

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

const ReviewList = () => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
        });

        const reviewCards = document.querySelectorAll('.review-card');
        reviewCards.forEach(card => {
            observer.observe(card);
        });

        return () => {
            reviewCards.forEach(card => {
                observer.unobserve(card);
            });
        };
    }, []);

    return (
        <div className='review-div'>
            <h1>Recent Reviews</h1>
            <div className="review-list">
                {reviews.map((review) => (
                    <div key={review.id} className='review-card'>
                        <h3>{review.author}</h3>
                        <p>{review.location}</p>
                        <div>
                            {Array.from({ length: review.rating }).map((_, index) => (
                                <span key={index} className="star">&#9733;</span>
                            ))}
                        </div>
                        <p>{review.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewList;
