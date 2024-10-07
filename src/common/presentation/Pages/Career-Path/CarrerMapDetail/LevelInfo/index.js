import Image from 'next/image'

const LevelInfo = ({
  jobLevelId = 0,
  levelId = 0,
  src = '/images/career_path/level_avatar.png',
  name = '',
  meta = {},
  handleAction = () => {}
}) => {
  const { experience, averageSalary } = meta || {}
  return (
    <div
      className="flex flex-col justify-center items-center cursor-pointer"
      onClick={() => handleAction(jobLevelId)}
    >
      <div className="md:w-[3.7vw] w-[11.2vw] md:h-[4vw] h-[12.63vw] relative">
        <Image alt="" src={src} layout="fill" objectFit="contain" />
      </div>
      <p
        className={`text-p18-bold text-center ${
          levelId === jobLevelId ? 'text-blue-light' : 'text-black'
        }`}
      >
        {name}
      </p>
      <p className="text-grey-1 text-center text-p16">
        {experience} kinh nghiệm
        <br /> Mức lương: {averageSalary}
      </p>
    </div>
  )
}

export default LevelInfo
