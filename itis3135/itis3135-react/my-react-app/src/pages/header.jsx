import React from 'react';
import { Link } from 'react-router-dom'; // Make sure Link is imported

// The 'setPage' prop is no longer needed
const Header = () => {
  // This array matches the routes you defined in App.jsx
  const navItems = [
    { to: '/', title: 'Home' },
    { to: '/introduction', title: 'Introduction' },
    { to: '/contract-page', title: 'Contract' },
  ];

  return (
    <header>
    <h1>Chris Carchi | Couragous Crocodile | ITIS 3135</h1>
        <nav>
            {/* Map over the navItems array to create <Link> components.
              This replaces the static <a href...> tags.
            */}
            {navItems.map((item) => (
              <Link key={item.to} to={item.to}>
                {item.title}
              </Link>
            ))}

            {/* You can add your other static links back, but they
                will navigate away from your React app. */}
            {/* <a href="/ccarchi/itis3135/hobby/index.html">Hobby</a> */}
        </nav>
    </header>
  );
};

export default Header;