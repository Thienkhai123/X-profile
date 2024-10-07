import { Divider } from 'common/presentation/Divider'
import XProfileIcon from 'common/presentation/Icons'
import { useState } from 'react'

const FAKE_LIST = [
  {
    icon: 'case',
    name: 'Agile methodologies, frameworks, practices and processes'
  },
  {
    icon: 'case',
    name: 'Agile methodologies, frameworks, practices and processes'
  },
  {
    icon: 'case',
    name: 'Agile methodologies, frameworks, practices and processes'
  }
]

const AccordionDocument = ({
  level = '',
  name = '',
  knowledges = [],
  abilities = []
}) => {
  const [hidden, setHidden] = useState(true)
  return (
    <div className="w-full rounded-[24px] border border-grey-4 overflow-hidden pb-8">
      <div className="flex items-center gap-2 px-8 py-3  bg-[#F6F7FB] justify-between ">
        <p className="text-neutral text-h5">{name}</p>
        <div
          className={`cursor-pointer ${hidden ? '' : 'rotate-180'}`}
          onClick={() => setHidden(!hidden)}
        >
          <XProfileIcon name="arrowToeic" />
        </div>
      </div>

      <div
        className={`bg-white px-8 ${
          hidden ? 'h-0 opacity-0' : 'h-auto duration-300 pt-5'
        }`}
      >
        <ul role="list" className="flex flex-col gap-2">
          {knowledges.map((item, ind) => {
            return (
              <li
                key={`document-kn-${ind}`}
                className="border-solid border-b border-grey-3 last:border-b-0 pb-3 last:pb-0 flex items-center gap-3"
              >
                <div>
                  <XProfileIcon
                    name="documentQuiz"
                    width="20"
                    height="20"
                    fill="#294F9B"
                  />
                </div>
                <p>{item}</p>
              </li>
            )
          })}

          {abilities.map((item, ind) => {
            return (
              <li
                key={`document-ab-${ind}`}
                className="border-solid border-b border-grey-3 last:border-b-0 pb-3 last:pb-0 flex items-center gap-3"
              >
                <div>
                  <XProfileIcon
                    name="case"
                    width="20"
                    height="20"
                    fill="#294F9B"
                  />
                </div>
                <p>{item}</p>
              </li>
            )
          })}
        </ul>
      </div>

      {!hidden && (
        <div className="mt-5">
          <Divider />
        </div>
      )}
      <div className="flex items-center justify-between gap-2 px-8 pt-4">
        <div className="flex items-center gap-7">
          <div className="flex items-center gap-1">
            <XProfileIcon
              name="documentQuiz"
              width="20"
              height="20"
              fill="#294F9B"
            />
            <p className="text-p2 text-[#1B75BB]">
              {knowledges?.length || 0} knowledge
            </p>
          </div>

          <div className="flex items-center gap-1">
            <XProfileIcon name="case" width="20" height="20" fill="#294F9B" />
            <p className="text-p2 text-[#1B75BB]">
              {abilities?.length || 0} ability
            </p>
          </div>
        </div>

        <div>
          <p className="text-h5 text-neutral">Level {level}</p>
        </div>
      </div>
    </div>
  )
}

export default AccordionDocument
