import React from 'react';
import '../App.css';
import MapComponent from "../MapComponent";
import Banner from '../components/Banner';

const LandingPage = () => {

    const cafesMap = [
        { name: "Cafe Blue", lat: 42.046, lng: -87.688 },
        { name: "Green Bean Cafe", lat: 42.048, lng: -87.684 },
        { name: "Java Lounge", lat: 42.044, lng: -87.690 },
    ];

    return (
        <div className="App">
            <Banner />
            {/* Integrate MapComponent with hardcoded data */}
            <div style={{ height: '600px', width: '100%'}}>
                <MapComponent cafes={cafesMap} />
            </div>
        </div>
    );
}

export default LandingPage;