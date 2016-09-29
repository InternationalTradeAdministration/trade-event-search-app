import React from 'react';
import { Form } from '../components';
import './Home.scss';

const Home = () => (
  <div className="explorer__home">
    <div className="explorer__home__header-container">
      <header>Trade Events Search</header>
    </div>
    <div className="explorer__home__form-container">
      <Form />
    </div>
  </div>
);
export default Home;
