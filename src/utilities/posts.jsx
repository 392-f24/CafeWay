import { useState, useEffect } from 'react';
import { onValue, query, orderByChild, equalTo, ref, get, update, set, push } from 'firebase/database';
import { database } from './firebase';

export const findCafePosts = (cafeId) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!cafeId) return;

        const postsRef = ref(database, `/posts`);
        const postsQuery = query(postsRef, orderByChild('cafeId'), equalTo(cafeId));
        const unsubscribe = onValue(
            postsQuery,
            (snapshot) => {
                if (snapshot.exists()) {
                    console.log(snapshot.val());
                    setData(snapshot.val());
                } else {
                    setData([]);
                }
            },
            (error) => {
                setError(error);
            }
        );

        return () => unsubscribe();
    }, [cafeId]);
    return [data, error];
};

export const addReplyToPost = async (postId, userId, replyMessage) => {
    try {
        const postRef = ref(database, `/posts/${postId}`);
        const postSnapshot = await get(postRef);
        if (!postSnapshot.exists()) {
            return 'Post not found';
        }

        const postData = postSnapshot.val();
        const replies = postData.replies || {};
        const replyId = `replyId_${Object.keys(replies).length + 1}`;

        const newReply = {
            [replyId]: replyMessage
        };

        await update(postRef, {
            replies: {
                ...replies,
                ...newReply
            }
        });

        return null;
    } catch (error) {
        console.error('Error adding reply:', error);
        return error.message || 'Error adding reply';
    }
};

export const addCafePost = async (cafeId, post) => {
    try {
        const postsRef = ref(database, `/posts`);
        const newPostRef = push(postsRef);

        const newPost = {
            cafeId: cafeId,
            category: post.category,
            content: post.content,
            date: post.date,
            email: post.email,
            replies: post.replies || {}
        };

        await set(newPostRef, newPost);

        return null;
    } catch (error) {
        console.error('Error adding cafe post:', error);
        return error.message || 'Error adding post';
    }
};
