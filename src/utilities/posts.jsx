import { useState, useEffect } from 'react';
import { onValue, query, orderByChild, equalTo, ref } from 'firebase/database';
import { database } from './firebase';

export const findCafePosts = (cafeId) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!cafeId) return

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