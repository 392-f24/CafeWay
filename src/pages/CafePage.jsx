import './CafePage.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { findZipcode } from '../utilities/findZipcode';
import { findCafes } from '../utilities/findCafes';
import { useAuthState } from '../utilities/firebase';
import { findCafePosts } from '../utilities/posts';
import Banner from '../components/Banner';

const CafePage = () => {
    const { place_id } = useParams();
    const [user] = useAuthState();
    const [zipcode, setZipcode] = useState(null);
    const [cafes, setCafes] = useState([]);
    const [cafe, setCafe] = useState(null);

    useEffect(() => {
        if (user && user.email) {
            const fetchZipCode = async () => {
                const userZipcode = await findZipcode(user.email);
                setZipcode(userZipcode);
            };
            fetchZipCode();
        }
    }, [user]);

    useEffect(() => {
        if (zipcode) {
            const fetchCafes = async () => {
                try {
                    await findCafes(5, zipcode, setCafes);
                } catch (error) {
                    console.error('Error fetching cafes:', error);
                    setCafes([]);
                }
            };
            fetchCafes();
        }
    }, [zipcode]);

    useEffect(() => {
        if (cafes.length > 0) {
            const foundCafe = cafes.find((cafe) => cafe.placeId === place_id);
            setCafe(foundCafe);
        }
    }, [cafes, place_id]);

    const [posts, postError] = findCafePosts(cafe?.placeId);
    console.log(posts);

    if (!cafe) {
        return (
            <div className="error-message">
                <h1>Cafe not found</h1>
                <p>Sorry, we couldn't find a cafe with the specified ID.</p>
            </div>
        );
    }

    const postItems = posts ? Object.values(posts) : [];

    const sortedPosts = postItems.sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div>
            <Banner cafes={cafes} />
            <div className="cafe-page-container">
                <div className="cafe-header">
                    <h1>{cafe.name}</h1>
                    <p><strong>Location:</strong> {cafe.vicinity}</p>
                </div>

                {sortedPosts && sortedPosts.length > 0 ? (
                    <div className="posts-section">
                        <h2>Posts</h2>
                        <ul className="posts-list">
                            {sortedPosts.map((post, index) => (
                                <li key={index} className="post-item">
                                    <div className="post-header">
                                        <p><strong>Category:</strong> {post.category}</p>
                                        <small>{new Date(post.date).toLocaleString()}</small>
                                    </div>
                                    <div className="post-content">
                                        <p>{post.content}</p>
                                    </div>
                                    {post.replies && Object.entries(post.replies).length > 0 ? (
                                        <div className="replies-section">
                                            <h3>Replies:</h3>
                                            <ul>
                                                {Object.entries(post.replies).map(([replyId, message], replyIndex) => (
                                                    <li key={replyIndex} className="reply-item">
                                                        <p>{message}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : (
                                        <p>No replies for this post.</p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>No posts available for this cafe.</p>
                )}
                {postError && (
                    <div className="error-message">
                        <h3>Error loading posts</h3>
                        <p>{postError.message}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CafePage;
