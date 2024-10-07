import React from 'react'
import PropTypes from 'prop-types'
import { Avatar } from 'common/presentation/Avatar'

const MessCard = (props) => {
  const { comment } = props
  const { avatarUrl, name, description } = comment
  return (
    <div className="px-5 py-8 bg-white rounded-borderStep">
      <div className="flex justify-center mb-[16px]">
        <Avatar
          avatarUrl={avatarUrl}
          width="w-[120px]"
          height="h-[120px]"
          border="border-[4px] border-oragin"
        />
      </div>
      <div className="text-center">
        <p className="text-p18-bold text-neutral">{name}</p>
      </div>
      <div className="text-center">
        <p className="text-p18 text-grey-1">{description}</p>
      </div>
    </div>
  )
}

MessCard.propTypes = {
  comment: PropTypes.object
}
MessCard.defaultProps = {
  comment: {}
}

export default MessCard
