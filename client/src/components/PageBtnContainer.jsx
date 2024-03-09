import React from 'react'
import { HiChevronDoubleLeft, HiChevronDoubleRight, HiOutlineChevronDoubleLeft } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAllJobsContext } from '../pages/AllJobs';


const PageBtnContainer = () => {
  const {data : {numOfPages, currentPage}} = useAllJobsContext()
  const pages = Array.from({length: numOfPages}, (_, index) => { return index + 1})

 const {search, pathname} = useLocation()
 const navigate = useNavigate()

  const handlePageChange = (pagesNumber) => {
    const searchParams = new URLSearchParams(search)
    searchParams.set('page', pagesNumber)
    console.log(searchParams)
    navigate(`${pathname}?${searchParams.toString()}`)
  }

  const addPageButton = ({pagesNumber, activeClass}) => {
    return <button className={`btn page-btn ${activeClass && 'active'}`}
    key={pagesNumber} onClick={() => handlePageChange(pagesNumber)}>{pagesNumber}</button>
  }

  const renderPageButtons = () => {
    const pageButtons = [];
    /* first page */
    pageButtons.push(addPageButton({pagesNumber:1, 
        activeClass: currentPage === 1}))
    
    if (currentPage > 3) {
        pageButtons.push(
            <span className='page-btn dots' key='dots-1'>...</span>
        )
    }
    /* one before current page */
    if (currentPage !== 1 && currentPage !== 2) {
        pageButtons.push(addPageButton({pagesNumber:currentPage - 1, 
            activeClass: false}))
    }
    /* current page */
    if (currentPage !== 1 && currentPage !== numOfPages) {
        pageButtons.push(addPageButton({pagesNumber:currentPage, 
            activeClass: true}))
    }
    /* one after current page */
    if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
        pageButtons.push(addPageButton({pagesNumber:currentPage + 1, 
            activeClass: false}))
    }
    
    if (currentPage < numOfPages - 2) {
        pageButtons.push(
            <span className='page-btn dots' key='dots+1'>...</span>
        )
    }

    pageButtons.push(addPageButton({pagesNumber:numOfPages, 
        activeClass: currentPage === numOfPages}))
    return pageButtons
  }


  return (
    <Wrapper>
        <button className="btn prev-btn"
        onClick={() => {
            let prevPage = currentPage - 1
            if(prevPage < 1) prevPage = 1
            handlePageChange(prevPage)
        }}>
            <HiOutlineChevronDoubleLeft>
            </HiOutlineChevronDoubleLeft>
            prev
        </button>
        <div className="btn-container">
            {renderPageButtons()}
        </div>
        <button className="btn next-btn">
        <button className="btn next-btn"
            onClick={() => {
                let nextPage = currentPage + 1
                if(nextPage > numOfPages) nextPage = 1
                handlePageChange(nextPage)
            }}>next
            <HiChevronDoubleRight></HiChevronDoubleRight></button>
        </button>
    </Wrapper>
  )
}

export default PageBtnContainer