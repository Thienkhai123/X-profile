import { useSelector } from 'react-redux'
import { selectSuitables } from 'store/app/careerPathSlice'
import ItemInfo from './ItemInfo'

const CareerSuitable = () => {
  const suitables = useSelector(selectSuitables)
  return (
    <div className="xl:w-[1140px] w-full mx-auto mt-[60px] xl:px-0 sm:px-[8px] px-6">
      <p className="sm:text-h2 text-p18-bold text-center text-black max-w-[754px] mx-auto">
        Trở thành một mảnh ghép của ngành Công nghệ thông tin nếu bạn có
      </p>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 sm:gap-[60px] gap-[48px] sm:mt-[72px] mt-[32px]">
        {suitables?.map((item, ind) => (
          <ItemInfo key={ind} {...item} />
        ))}
      </div>
    </div>
  )
}

export default CareerSuitable
