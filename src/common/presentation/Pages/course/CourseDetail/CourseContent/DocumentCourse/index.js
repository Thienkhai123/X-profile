import React from 'react'
import PropTypes from 'prop-types'

const DocumentCourse = (props) => {
  const { content } = props
  return <div dangerouslySetInnerHTML={{ __html: content }} />
}

DocumentCourse.propTypes = {}
DocumentCourse.defaultProps = {}

export default DocumentCourse
