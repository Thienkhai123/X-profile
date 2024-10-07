import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const Typing = (props) => {
  const {} = props

  return (
    <div className="pt-5 pb-5 pl-8 pr-8 flex justify-start">
      <div className=" relative  w-[5em] h-[2em] p-2.5 bg-grey-4 ml-1 rounded-xl">
        {[...Array(3)].map((item, index) => (
          <div
            key={index}
            className="typing__dot float-left w-2 h-2 mx-1 bg-grey-1 rounded-full opacity-0 animate-waitReply"
          ></div>
        ))}
      </div>
    </div>
  )
}

Typing.propTypes = {}

export default Typing
