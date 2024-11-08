import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { findZipcode } from '../utilities/findZipcode';
import { findCafes } from '../utilities/findCafes';
import { useAuthState } from '../utilities/firebase';
import { findCafePosts } from '../utilities/posts'; // Import the hook

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

    // Use the findCafePosts hook correctly here
    const [posts, postError] = findCafePosts(cafe?.placeId); // Using the hook directly
    console.log(posts);  // Check the format of posts

    if (!cafe) {
        return (
            <div>
                <h1>Cafe not found</h1>
                <p>Sorry, we couldn't find a cafe with the specified ID.</p>
            </div>
        );
    }

    // Assuming posts are in the form of an object with keys like test_id
    const postItems = posts ? Object.values(posts) : []; // Convert the object into an array if needed

    return (
        <div>
            <h1>{cafe.name}</h1>
            <p><strong>Location:</strong> {cafe.vicinity}</p>

            {/* Render posts if they exist */}
            {postItems && postItems.length > 0 ? (
                <div>
                    <h2>Posts</h2>
                    <ul>
                        {postItems.map((post, index) => (
                            <li key={index}>
                                <p><strong>Category:</strong> {post.category}</p>
                                <p><strong>Content:</strong> {post.content}</p>
                                <small>{new Date(post.date).toLocaleString()}</small>
                                
                                {/* Render replies if they exist */}
                                {post.replies && Object.entries(post.replies).length > 0 ? (
                                    <div style={{ marginLeft: '20px', marginTop: '10px' }}>
                                        <h3>Replies:</h3>
                                        <ul>
                                            {Object.entries(post.replies).map(([replyId, message], replyIndex) => (
                                                <li key={replyIndex}>
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

            {/* Handle errors in fetching posts */}
            {postError && (
                <div>
                    <h3>Error loading posts</h3>
                    <p>{postError.message}</p>
                </div>
            )}
        </div>
    );
}

export default CafePage;
