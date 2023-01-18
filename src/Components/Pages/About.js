import React from 'react';
const About = () => {
    const aboutStyle = { display: 'flex', backgroundColor: 'rgba(255,0,0,0.2)', justifyContent: 'center', width: '100%', textAlign: 'center', gap: '1.5rem', flexDirection: 'column' }
    return (
        <div style={aboutStyle}>
            <h1>About Github Finder</h1>
            <h2>An app to search github users and see their profile.</h2>
            <h2>Version: 1.0.0</h2>
        </div>
    );
}

export default About;
