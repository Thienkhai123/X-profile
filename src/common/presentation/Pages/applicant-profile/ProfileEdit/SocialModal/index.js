import Button from 'common/presentation/Button'
import XProfileIcon from 'common/presentation/Icons'
import { useState } from 'react'

const SOCIALS = [
  {
    typeDisplay: 'Facebook',
    icon: 'socialFacebook',
    type: 'facebook',
    viewBox: '0 0 100 100',
    fillActive: '#039BE5'
  },
  // {
  //   typeDisplay: 'Twitter',
  //   icon: 'socialTwitter',
  //   type: 'twitter',
  //   viewBox: '0 0 100 100',
  //   fillActive: '#03A9F4'
  // },
  // {
  //   typeDisplay: 'Zalo',
  //   icon: 'socialZalo',
  //   type: 'zalo',
  //   viewBox: '0 0 200 200',
  //   fillActive: '#2962FF'
  // },
  {
    typeDisplay: 'Youtube',
    icon: 'socialYoutube',
    type: 'youtube',
    viewBox: '0 0 100 100',
    fillActive: '#FF3D00'
  },
  // {
  //   typeDisplay: 'Telegram',
  //   icon: 'socialTelegram',
  //   type: 'telegram',
  //   viewBox: '0 0 100 100',
  //   fillActive: '#29B6F6'
  // },
  {
    typeDisplay: 'Blog',
    icon: 'socialFacebook',
    type: 'blog',
    viewBox: '0 0 100 100',
    fillActive: '#317AE8'
  },
  {
    typeDisplay: 'Tiktok',
    icon: 'socialTiktok',
    type: 'tiktok',
    viewBox: '0 0 100 100',
    fillActive: '#000000'
  }
]

const SocialModal = ({ handleSubmitModal = () => {} }) => {
  const [selectedSocial, setSelectedSocial] = useState({
    typeDisplay: 'Facebook',
    icon: 'socialFacebook',
    type: 'facebook'
  })

  return (
    <div>
      <p className="text-h2 text-center text-semantic">Chọn Social</p>
      <div className="grid grid-cols-4 min-h-[40vh] p-[24px] gap-[20px]">
        {SOCIALS.map((social, ind) => (
          <div
            key={`select-social-${ind}`}
            onClick={() => setSelectedSocial(social)}
          >
            <XProfileIcon
              scale={4}
              width="100"
              height="100"
              fill={
                selectedSocial.typeDisplay === social.typeDisplay
                  ? social.fillActive
                  : '#666666'
              }
              margin="0 auto"
              name={social.icon}
              viewBox={social.viewBox}
            />
            <p className="text-center text-grey-1 mt-[8x]">
              {social.typeDisplay}
            </p>
          </div>
        ))}
      </div>
      <Button
        title="Xác nhận"
        rounded="rounded-[8px]"
        background={'bg-[#F6BB3A]'}
        color="text-neutral"
        padding="py-[10px] px-[20px]"
        height="h-auto"
        width="w-[240px]"
        textWeight={'text-p18 font-bold'}
        margin="mx-auto"
        onClick={() => handleSubmitModal(selectedSocial)}
      />
    </div>
  )
}

export default SocialModal
