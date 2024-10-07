/* eslint-disable react/jsx-key */

import React from 'react'
import classnames from 'classnames'
import { usePagination, DOTS } from './usePagination'
const Pagination = (props) => {
  const {
    totalPages,
    onPageChange,
    totalCount,
    siblingCount = 2,
    currentPage = 1,
    pageSize = 10
  } = props
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  })
  if (currentPage === 0 && paginationRange && paginationRange?.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  let lastPage = paginationRange && paginationRange[paginationRange?.length - 1]

  return (
    <ul className="flex list-none">
      {totalPages > 1 && (
        <li
          className={`px-2.5 h-8 hidden lg:flex min-w-8 border border-stoke bg-white rounded-lg cursor-pointer text-center mx-1  items-center justify-center text-black text-p16   ${
            currentPage === 1 && 'pointer-events-none'
          }`}
          onClick={onPrevious}
        >
          <span>&laquo;</span>
        </li>
      )}

      {paginationRange?.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li
              key={index}
              className="px-3 h-8 text-p16  text-center mx-1 flex items-center justify-center text-black  min-w-8 bg-white rounded-lg border-stoke "
            >
              &#8230;
            </li>
          )
        }

        return (
          <li
            key={index}
            className={` px-2.5 w-8 h-8 min-w-8 text-p16 justify-center  text-center mx-2 flex items-center cursor-pointer  rounded-lg border border-stoke  ${
              pageNumber === currentPage
                ? 'bg-blue-light text-white'
                : 'bg-white text-black'
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        )
      })}
      {totalPages > 1 && (
        <li
          className={` px-2.5 h-8 text-center mx-1 hidden lg:flex cursor-pointer items-center justify-center text-black min-w-8 border border-stoke rounded-lg bg-white ${
            currentPage === lastPage && 'pointer-events-none'
          }`}
          onClick={onNext}
        >
          <span>&raquo;</span>
        </li>
      )}
    </ul>
  )
}

export default Pagination
