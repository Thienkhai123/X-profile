import XProfileIcon from 'common/presentation/Icons'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Button from 'common/presentation/Button'

const FIELDLIST = [
  { name: 'facebook', icon: 'socialFacebook', title: 'Facebook' },
  { name: 'youtube', icon: 'socialYoutube', title: 'Youtube' },
  { name: 'linkedin', icon: 'socialLinkedIn', title: 'LinkedIn' },
  { name: 'instagram', icon: 'socialInstagram', title: 'Instagram' },
  { name: 'tiktok', icon: 'socialTiktok', title: 'Tiktok' }
]

const FooterSocial = ({
  toggleModal = () => {},
  handleChangeSocial = () => {},
  socials = []
}) => {
  const schema = yup.object().shape({
    // url: yup.string().required('Vui lòng nhập thông tin bạn nhé')
  })
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      facebook: socials ? socials[0]?.url : '',
      youtube: socials ? socials[1]?.url : '',
      linkedin: socials ? socials[2]?.url : '',
      instagram: socials ? socials[3]?.url : '',
      tiktok: socials ? socials[4]?.url : ''
    }
  })

  const onSubmit = async (data) => {
    const { facebook, youtube, linkedin, instagram, tiktok } = data
    const listUpdate = [
      { type: 'facebook', typeDisplay: 'Facebook', url: facebook },
      { type: 'youtube', typeDisplay: 'Youtube', url: youtube },
      { type: 'linkedin', typeDisplay: 'Linkedin', url: linkedin },
      { type: 'instagram', typeDisplay: 'Instagram', url: instagram },
      { type: 'tiktok', typeDisplay: 'Tiktok', url: tiktok }
    ]
    handleChangeSocial(listUpdate)
    toggleModal()
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <div className="flex justify-between items-center">
        <p className="text-h3 text-black">Thêm tài khoản Social</p>
        <div className="cursor-pointer" onClick={toggleModal}>
          <XProfileIcon name="cross" scale={1.4} stroke="#333333" />
        </div>
      </div> */}
      <div className="flex flex-col gap-6 mt-10">
        {FIELDLIST?.map((field, ind) => {
          const watchField = watch(`${field?.name}`)
          return (
            <div key={ind} className="flex items-center gap-8">
              <div className="flex gap-4 w-[128px]">
                <XProfileIcon name={field?.icon} fill="#000000" />
                <p className="text-p18 text-neutral">{field?.title}</p>
              </div>

              <div className="flex items-center bg-light-nude py-2 px-6 rounded-[8px] flex-1 gap-2">
                <input
                  {...register(field?.name)}
                  placeholder="http://"
                  className="outline-0 bg-transparent w-full"
                />
                {watchField?.length > 0 && (
                  <div
                    className="cursor-pointer rounded-full p-1 bg-grey-2"
                    onClick={() => setValue(field?.name, '')}
                  >
                    <XProfileIcon name="cross" stroke="white" scale={0.7} />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex justify-end mt-10">
        <div className="flex items-center gap-4">
          <Button
            margin="m-0"
            title="Huỷ"
            type="button"
            background="bg-grey-4"
            rounded="rounded-[8px]"
            onClick={toggleModal}
          />
          <Button margin="m-0" title="Lưu" rounded="rounded-[8px]" />
        </div>
      </div>
    </form>
  )
}

export default FooterSocial
