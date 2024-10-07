import BadgeBearSkill from 'common/presentation/BadgeBearSkill'
import BadgeMouseSkill from 'common/presentation/BadgeMoueseSkill'
import BadgeSheepSkill from 'common/presentation/BadgeSheepSkill'
import BadgeTestsSkill from 'common/presentation/BadgeTestsSkill'

const WrapperSkillItem = ({
  persent = 0,
  skillName = '',
  redirectToExam = () => {},
  isShowTooltip = true
}) => {
  if (persent === 0) {
    return (
      <BadgeTestsSkill
        title={skillName}
        redirectToExam={redirectToExam}
        isShowTooltip={isShowTooltip}
        hiddenIcon={isShowTooltip}
        disableCursor={isShowTooltip}
      />
    )
  }
  if (persent > 0 && persent <= 30) {
    return (
      <BadgeSheepSkill
        titlePopup="Làm kiểm tra để nâng cao cấp độ !"
        description={`(Bạn đang đạt ${persent}% ở cấp độ cơ bản)`}
        persent={persent}
        title={skillName}
        redirectToExam={redirectToExam}
        isShowTooltip={isShowTooltip}
        disableCursor={isShowTooltip}
      />
    )
  }
  if (persent > 30 && persent <= 60) {
    return (
      <BadgeMouseSkill
        titlePopup="Làm kiểm tra để nâng cao cấp độ !"
        description={`(Bạn đang đạt ${persent}% ở cấp độ trung bình)`}
        persent={persent}
        title={skillName}
        redirectToExam={redirectToExam}
        isShowTooltip={isShowTooltip}
        disableCursor={isShowTooltip}
      />
    )
  }
  if (persent > 60) {
    return (
      <BadgeBearSkill
        titlePopup="Làm kiểm tra để nâng cao cấp độ !"
        description={`(Bạn đang đạt ${persent}% ở cấp độ trung bình)`}
        persent={persent}
        title={skillName}
        redirectToExam={redirectToExam}
        isShowTooltip={isShowTooltip}
        disableCursor={isShowTooltip}
      />
    )
  }
}

export default WrapperSkillItem
