import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLeft, faCircle, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

const TableComponent = ({ colleges }) => {
  const [sortedColleges, setSortedColleges] = useState(colleges);
  const [sortCriteria, setSortCriteria] = useState('collegeduniaRank');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const sortColleges = (criteria, order,collegesToSort) => {
    const sorted = [...collegesToSort].sort((a, b) => {
      const aValue = parseFloat(a[criteria]);
      const bValue = parseFloat(b[criteria]);

      if (isNaN(aValue) || isNaN(bValue)) return 0;

      if (aValue === bValue) return 0;
      if (order === 'asc') {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue > bValue ? -1 : 1;
      }
    });

    setSortedColleges(sorted);
  };

  const handleSort = (criteria) => {
    if (criteria === sortCriteria) {
      // Toggle the order if sorting by the same criteria
      setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      // Set the new sorting criteria and default to ascending order
      setSortCriteria(criteria);
      setSortOrder('asc');
    }
  };

  const handleSearch = (event) => {
    
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    // Filter colleges based on search term
    const filteredColleges = colleges.filter((college) =>
      college.collegeName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Sort filtered colleges
    sortColleges(sortCriteria, sortOrder, filteredColleges);
  }, [searchTerm, sortCriteria, sortOrder, colleges]);

  return (
    <div className='m-8'>
        <div className='flex items-center'>
            <div className='mr-6 text-bold'>Search for college by name</div>
            <input
                type='text'
                placeholder='Search by college name...'
                value={searchTerm}
                onChange={handleSearch}
                className='my-4 px-2 py-1 border border-gray-300 rounded'
            />
      </div>
      <div className='grid grid-cols-12 text-center bg bg-teal-300 border rounded-sm border-slate-400'>
        <div className="col-span-1 cursor-pointer" onClick={() => handleSort('collegeduniaRank')}>
          CD Rank {sortCriteria === 'collegeduniaRank' && <FontAwesomeIcon icon={sortOrder === 'asc' ? faSortUp : faSortDown} />}
        </div>
        <div className='col-span-3'>College Name</div>
        <div className='col-span-2 cursor-pointer' onClick={() => handleSort('collegeFees')}>
          College fees {sortCriteria === 'collegeFees' && <FontAwesomeIcon icon={sortOrder === 'asc' ? faSortUp : faSortDown} />}
        </div>
        <div className='col-span-2'>Placement</div>
        <div className='col-span-2 cursor-pointer' onClick={()=> handleSort('userReviewRating')}>
            User Review {sortCriteria==='userReviewRating' && <FontAwesomeIcon icon={sortOrder === 'asc' ? faSortUp : faSortDown} />}
        </div>
        <div className='col-span-2'>Ranking</div>
      </div>
      {sortedColleges?.map((college, index) => (
        <div key={index} className='grid grid-cols-12 text-center border border-slate-400'>
          <div className='col-span-1 border border-slate-400'>{college.collegeduniaRank}</div>
          <div className='col-span-3 border border-slate-400'>
            {college.isfeatured && <div className='bg bg-red-500 w-20 rounded-md mb-2'>Featured</div>}
            <div className='text-sky-600 text-bold'>{college.collegeName}</div>
        </div>
          <div className='col-span-2 border border-slate-400 '>
            <div className='text-green-500 text-bold'>{college.collegeFees}</div>
            <div>BE/BTech</div>
            <div>-1st year fees</div>
            <div className='flex items-center text-orange-400 text-bold justify-center cursor-pointer mb-6'>
              <FontAwesomeIcon icon={faRightLeft} className='mr-2' />
              <div>Compare fees</div>
            </div>
          </div>
          <div className='col-span-2 border border-slate-400'>
            <div className='text-green-500 text-bold'>{college.collegePlacement.averagePackage}</div>
            <div>Average Package</div>
            <div className='text-green-500 text-bold'>{college.collegePlacement.highestPackage}</div>
            <div>Highest Package</div>
          </div>
          <div className='col-span-2 border border-slate-400 flex items-center justify-center'>
            <FontAwesomeIcon icon={faCircle} className='mr-2' />
            <div>{college.userReviewRating}/5</div>
          </div>
          <div className='col-span-2 border border-slate-400'>{college.collegeAllIndiaRanking} in India</div>
        </div>
      ))}
    </div>
  );
};

export default TableComponent;
