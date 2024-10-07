import XProfileIcon from 'common/presentation/Icons'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useState } from 'react'
import Modal from 'common/presentation/Modal'
import SocialModal from '../SocialModal'
import { getClickableLink } from 'store/helper/functionHelper'

const ICONS = {
  facebook: {
    icon: 'socialFacebook',
    placaholder: 'http://'
  },
  // twitter: {
  //   icon: 'socialTwitter'
  // },
  // zalo: {
  //   icon: 'socialZalo'
  // },
  youtube: {
    icon: 'socialYoutube',
    placaholder: 'http://'
  },
  // telegram: {
  //   icon: 'socialTelegram'
  // },
  blog: {
    icon: 'socialFacebook',
    placaholder: 'http://'
  },
  tiktok: {
    icon: 'socialTiktok',
    placaholder: 'http://'
  },
  gitHub: { icon: 'socialGithub', placaholder: 'http://' },
  dribbble: { icon: 'socialDribbble', placaholder: 'http://' }
}

const SocialItemEdit = (props) => {
  const {
    handleAddToSocials,
    handleDeleteTempSocial,
    type,
    typeDisplay,
    id,
    url,
    index
  } = props
  const [defaultValues, setDefaultValues] = useState({
    type: type,
    typeDisplay: typeDisplay,
    id: id,
    url: url
  })
  const [openModal, setOpenModal] = useState(false)
  const toggleModal = () => {
    setOpenModal(!openModal)
  }

  const handleSubmitModal = (social) => {
    const { type, typeDisplay } = social
    setDefaultValues({
      ...defaultValues,
      type: type,
      typeDisplay: typeDisplay
    })
    toggleModal()
  }

  const schema = yup.object().shape({
    url: yup.string().required('Vui lòng nhập thông tin bạn nhé')
  })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      url: url
    }
  })

  const onSubmit = async (data) => {
    handleAddToSocials({
      ...defaultValues,
      url: getClickableLink(data?.url)
    })
  }

  return (
    <form className="relative">
      <div
        onClick={() => handleDeleteTempSocial(index)}
        className="absolute -top-2 -right-2 cursor-pointer border rounded-full bg-red-500 border-red-500"
      >
        <XProfileIcon name="cross" stroke="white" />
      </div>
      <Modal toggleModal={toggleModal} open={openModal}>
        <SocialModal handleSubmitModal={handleSubmitModal} />
      </Modal>
      <div className="flex justify-between items-center bg-stoke py-[8px] px-[16px] border border-stoke">
        <div className="flex items-center gap-[8px]" onClick={toggleModal}>
          <XProfileIcon name={ICONS[defaultValues.type].icon} fill="#666666" />
          <p className="text-p14 text-black">{defaultValues.typeDisplay}</p>
        </div>
        <div className="flex items-center gap-[12px]">
          <input
            {...register('url')}
            className="max-w-[102px] p-[4px] text-semantic bg-white outline-0"
            autoComplete="off"
            placeholder="http://"
          />
          <div className="cursor-pointer" onClick={handleSubmit(onSubmit)}>
            <XProfileIcon name="save" />
          </div>
        </div>
      </div>
      <p className="text-p14 text-red-500 h-[22px]">{errors.url?.message}</p>
    </form>
  )
}

SocialItemEdit.propTypes = {
  handleAddToSocials: PropTypes.func,
  type: PropTypes.string,
  name: PropTypes.string
}

SocialItemEdit.defaultProps = {
  handleAddToSocials: () => {},
  type: '',
  name: ''
}

export default SocialItemEdit
