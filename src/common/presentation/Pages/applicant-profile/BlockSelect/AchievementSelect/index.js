import XProfileIcon from 'common/presentation/Icons'
import AchievementCard from '../../TemplateContainer/AchievementBlock/AchivementCard'

const AchievementSelect = (props) => {
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
        <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2">
          {[...Array(4)].map((el, ind) => (
            <AchievementCard
              key={ind}
              value={{
                title: 'Giải 1',
                content: 'Photoshop Art',
                time: '2001-2004'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

AchievementSelect.propTypes = {}
AchievementSelect.defaultProps = {
  title: '',
  status: true,
  templateOptionName: ''
}

export default AchievementSelect
