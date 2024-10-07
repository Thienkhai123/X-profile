import XProfileIcon from 'common/presentation/Icons'
import ExperienceItem from '../../TemplateContainer/ExperienceBlock/ExperienceItem'

const fakeData = [
  {
    Title: 'Graphic Designer',
    TimeOfExp: '4+',
    UnitOfTime: 'Năm',
    SubTitle: 'Alpha Lion Holdings',
    Time: '03/2018 - 08/2020'
  },
  {
    Title: 'UI/UX Designer',
    TimeOfExp: '8',
    UnitOfTime: 'Tháng',
    SubTitle: 'Alpha Lion Holdings',
    Time: '03/2018 - 08/2020'
  }
]

const ExperienceSelect = (props) => {
  const { title, status } = props
  return (
    <div
      className={`border border-stoke rounded-lg overflow-hidden${
        status ? ' opacity-60' : 'opacity-100'
      }`}
    >
      <div
        className={`px-5 py-3  cursor-pointer flex items-center justify-between bg-stoke ${
          !status ? 'hover:bg-yellow-bg' : ''
        }`}
      >
        <div className="flex items-center gap-4">
          <XProfileIcon name="career" fill="#294F9B" />
          <p className="uppercase text-p18-bold text-blue-light">{title}</p>
        </div>
        {status && (
          <XProfileIcon
            name="check"
            fill="#F6BB3A"
            width={'20'}
            height={'20'}
          />
        )}
      </div>
      <div className="w-full py-[24px] px-[28px]">
        {fakeData?.map((el, ind) => {
          return (
            <div key={ind}>
              <ExperienceItem {...el} isDisable />
            </div>
          )
        })}
      </div>
    </div>
  )
}

ExperienceSelect.propTypes = {}
ExperienceSelect.defaultProps = {
  title: '',
  status: true,
  templateOptionName: ''
}

export default ExperienceSelect
