import XProfileIcon from 'common/presentation/Icons'
import Link from 'next/link'

const BreadCrumbs = ({ jobCategoryId = 0, jobName = '' }) => {
  return (
    <div className="flex items-center gap-[8px]">
      <Link href="/">
        <a>
          <p className="text-grey-1 md:text-p16 text-p14 truncate">Home</p>
        </a>
      </Link>
      <XProfileIcon name="arrowNext" />
      <a href={`/career-path/${jobCategoryId}`}>
        <p className="text-grey-1 md:text-p16 text-p14 truncate">Career Path</p>
      </a>
      <XProfileIcon name="arrowNext" />
      <p
        className={`text-black md:text-p16 text-p14 ${
          jobName.length > 10 ? 'truncate' : ''
        }`}
      >
        {jobName}
      </p>
    </div>
  )
}

export default BreadCrumbs
