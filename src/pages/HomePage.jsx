import Banner from "../components/Banner";
import ReviewList from "../components/ReviewList";
import './HomePage.css';

const HomePage = () => {
    return (
        <div>
            <Banner/>
            <div className="media-container">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2490.472543587202!2d-73.97771648280692!3d40.75359771673144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2599a6397a343%3A0x34f4da96f5c5b3fc!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1641310281611!5m2!1sen!2sus"
                    width="100%"
                    height="600"
                    style={{ border: "0", margin: "0", borderRadius: "10px" }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>
            <ReviewList/>
        </div>
    )
}

export default HomePage