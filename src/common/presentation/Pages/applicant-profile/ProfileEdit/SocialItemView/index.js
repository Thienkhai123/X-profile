import XProfileIcon from 'common/presentation/Icons'
import PropTypes from 'prop-types'

const ICONS = {
  facebook: 'socialFacebook',
  twitter: 'socialTwitter',
  linkedIn: 'socialLinkedIn',
  instagram: 'socialInstagram',
  behance: 'socialBehanceIcon',
  zalo: 'socialZalo',
  youtube: 'socialYoutube',
  telegram: 'socialTelegram',
  blog: 'socialFacebook',
  tiktok: 'socialTiktok',
  gitHub: 'socialGithub',
  dribbble: 'socialDribbble'
}

const SocialItemView = (props) => {
  const { type, typeDisplay, url, handleDelete, index } = props
  return (
    <div className="mb-[28px] flex justify-between items-center py-[8px] px-[16px] border border-stoke">
      <div className="flex items-center gap-[8px]">
        <XProfileIcon name={ICONS[type]} fill="#666666" />
        <p className="sm:text-p14 text-p12 text-black">{typeDisplay}</p>
      </div>
      <div className="flex items-center gap-[12px]">
        <div className="cursor-pointer" onClick={() => window.open(url)}>
          <XProfileIcon name="link" />
        </div>
        <div className="cursor-pointer" onClick={() => handleDelete(index)}>
          <XProfileIcon name="trash" />
        </div>
      </div>
    </div>
  )
}

SocialItemView.propTypes = {
  type: PropTypes.string,
  typeName: PropTypes.string,
  url: PropTypes.string,
  handleDelete: PropTypes.func
}

SocialItemView.defaultProps = {
  type: 'facebook',
  typeName: 'Facebook',
  url: '',
  handleDelete: () => {}
}

export default SocialItemView
