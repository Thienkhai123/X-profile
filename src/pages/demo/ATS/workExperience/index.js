import React from 'react'
import PropTypes from 'prop-types'

const WorkExperience = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '8px'
      }}
    >
      <div>
        <p className="text-p20-bold text-neutral">UI/UX Designer</p>
      </div>
      <div>
        <p className="text-p18 text-neutral">Công ty ABC</p>
      </div>
      <div>
        <p className="text-p16 text-grey-1">
          Turpis lectus natoque duis sit molestie augue cras. Pharetra ad mattis
          luctus laoreet volutpat curae dictum cras aliquam vehicula. Natoque
          feugiat nullam pretium erat letius praesent etiam id. Aptent aliquet
          luctus mus vehicula nam nascetur orci felis.
        </p>
      </div>
    </div>
  )
}

WorkExperience.propTypes = {}
WorkExperience.defaultProps = {}

export default WorkExperience
