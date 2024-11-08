import { useAuthState } from "../utilities/firebase";
import { useState, useEffect } from "react";
import { findZipcode } from "../utilities/findZipcode";
import { findCafes } from "../utilities/findCafes";
import Banner from "../components/Banner";
import CafeList from "../components/CafeList";

const ReviewsPage = () => {
    const [user] = useAuthState();
    const [zipcode, setZipcode] = useState(null);
    const [cafes, setCafes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (user && user.email) {
                try {
                    const userZipcode = await findZipcode(user.email);
                    setZipcode(userZipcode);

                    if (userZipcode) {
                        await findCafes(2, userZipcode, setCafes);
                    }
                } catch (error) {
                    console.error("Error fetching zipcode or cafes:", error);
                    setZipcode(null);
                    setCafes([]);
                }
            }
        };
        fetchData();
    }, [user]);

    useEffect(() => {
        console.log(cafes);
    }, [cafes]);

    return (
        <div>
            <Banner cafes={cafes}/>
            <CafeList cafes={cafes} />
        </div>
    );
};

export default ReviewsPage;
