import XProfileIcon from 'common/presentation/Icons'
import Image from 'next/image'
import PropTypes from 'prop-types'

export const DiscoveryCard = (props) => {
  const {
    shortDescription,
    height,
    contentButton,
    isUserLiked,
    shadowCard,
    positionGroupButton,
    alignText,
    isLastIndex,
    borderCard,
    handleClickDiscoveryButton,
    handleClickIconHeart,
    hiddenLike
  } = props
  return (
    <div
      className={`flex flex-col  justify-center ${shadowCard} items-center  ${borderCard} rounded-[12px] px-[20px] 
      transition w-full ${height} bg-white
      ${
        isLastIndex
          ? 'after:-right-2 after:bg-white after:w-8 after:h-8'
          : 'after:-left-2 after:bg-white after:w-8 after:h-8'
      }
      relative after:content-['']   after:absolute  after:rotate-45 after:top-[47.8%]
      `}
    >
      <p className={`text-p16 text-neutral ${alignText}  mb-[20px]`}>
        {shortDescription}
      </p>
      <div
        className={`flex justify-center  items-center gap-[12px] ${positionGroupButton}`}
      >
        {!hiddenLike && (
          <div
            onClick={() => handleClickIconHeart()}
            className={`${
              isUserLiked
                ? 'border-button border'
                : 'bg-white border border-grey-2'
            }  p-[12px] rounded-lg cursor-pointer hover:opacity-80`}
          >
            <XProfileIcon
              name="heart"
              fill={`${isUserLiked ? '#F7BB3A' : '#999'}`}
            />
          </div>
        )}
        <button
          onClick={() => handleClickDiscoveryButton()}
          className="rounded-lg bg-button  px-[20px] py-[10px] font-bold text-[14px] hover:opacity-80"
        >
          {contentButton}
        </button>
      </div>
    </div>
  )
}

DiscoveryCard.propTypes = {
  shortDescription: PropTypes.string,
  contentButton: PropTypes.string,
  shadowCard: PropTypes.string,
  positionGroupButton: PropTypes.string,
  alignText: PropTypes.string,
  handleClickButton: PropTypes.func,
  handleClickIconHeart: PropTypes.func
}

DiscoveryCard.defaultProps = {
  shortDescription: '',
  contentButton: 'Khám phá',
  shadowCard: 'shadow-xl',
  positionGroupButton: '',
  alignText: ' text-center',
  borderCard: '',
  handleClickDiscoveryButton: () => {},
  handleClickIconHeart: () => {}
}
