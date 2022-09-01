import React from 'react';
import "../pagination.css"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


const Pagination = ({ currentPage, postsPerPage, totalPosts, setCurrentPage }) => {

  const handlePrev = () => {
    if (currentPage >= 1) {
      setCurrentPage(prev => prev - 1);
    }
    // console.log(currentPage, totalPosts)
  }

  const handleNext = () => {
    if (currentPage < Math.ceil(totalPosts / postsPerPage)) {
      setCurrentPage(prev => prev + 1);
    }
    // console.log("hello", currentPage)
  }


  const pageNum = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNum.push(i);
  }

  return (
    <nav>

      <div className="PageRow">
        <div> <button onClick={handlePrev} className="PageBtn"> <ChevronLeftIcon /> </button></div>
        <p style={{ marginTop: 10 }}>{currentPage * postsPerPage} of {totalPosts} </p>
        <div > <button onClick={handleNext} className="PageBtn"> <ChevronRightIcon /> </button></div>
      </div>
    </nav>
  );
};

export default Pagination;