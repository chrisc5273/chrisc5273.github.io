import React from 'react';
// The path is now '../' to go up one level from 'pages'
import imageSrc from '../images/me.jpg'; 

const Introduction = () => (
  <div>
    <h2 style={{ textAlign: 'center' }}>Introduction Page</h2>
    <h3>Christopher Carchi || Couragous Crocodile</h3>
    
    <div>
      <div>
        <img 
          src={imageSrc}
          alt="Chris" 
          // You can add styles for your image here or in your App.css
          style={{ maxWidth: '400px', height: 'auto', margin: '1rem auto' }}
          onError={(e) => { e.target.src = 'https://placehold.co/400/cccccc/333333?text=Image+Missing'; }}
        />
      </div>
      <div>
        {/* Added inline style to fix the text-align: center issue from the CSS */}
        <ul style={{ textAlign: 'left', display: 'inline-block', margin: '1rem' }}>
          <li>
            <strong>Personal Background:</strong> I am from Elon, NC and I always had an interest in how computers work and the need
            to explore different places, which is why I transferred to UNCC.
          </li>
          <li>
            <strong>Professional Background:</strong> I earned an honors certificate in software development at my job at Amazon and
            have an associate degree from a community college. Currently, I am an engineering intern at Boyle
            Industries.
          </li>
          <li>
            <strong>Academic Background:</strong> I am a third year at UNCC studying computer science with a concentration in cyber
            security.
          </li>
          <li>
            <strong>Primary Computer:</strong> I am in using a dell linux laptop and I primarily use it at home for my schoolwork.
          </li>
          <li>
            <strong>Courses I’m Taking, & Why:</strong>
            <br /><br />
            ITIS 3135 - Front-end Web App Development: It is a prerequisite for a cybersecurity class <br />
            ITIS 3200 - Intro to Info Security & Privacy: It is required for my degree and I want to learn more about how privacy can be affected and how to be more secure <br />
            ITIS 3146 - Intro to Operating System and Networking: Required and I am interested in computers and how they function<br />
            ITIS 3155 - Software Engineering: Required and I wanted to be a software engineer at one point but now changed to cybersecurity<br />
            ITIS 3166 - Intro to Computer Networks: Required but I want to know how the network functions and how it
            connects to devices
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default Introduction;