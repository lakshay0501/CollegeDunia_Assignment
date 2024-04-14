import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TableComponent from '../components/TableComponent';

const HomePage = () => {
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/data.json'); // Make sure this URL is correct
        console.log(response.data.colleges);
        setColleges(response.data.colleges); // Assuming the data is an array
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
        <div className='bg bg-pink-700 text-white'>Note: Please click on CD Rank to get the sorting by CD Rank , click on UserReview to get sorting by userReview and click on fees to get sorting by fees</div>
      <TableComponent colleges={colleges}></TableComponent>
    </div>
  );
};

export default HomePage;
