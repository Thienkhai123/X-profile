import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import SkillItem from '../SkillItem'

const Skills = (props) => {
  return (
    <div className="xl:flex xl:justify-center items-center h-auto xl:h-[680px]">
      <div className="xl:flex xl:justify-center">
        <div className="xl:flex xl:flex-col xl:justify-between mr-14">
          <div className="mb-24">
            <div className="mb-3">
              <p className="text-h2">Kỹ năng cần thiết</p>
            </div>
            <div className="">
              <div className="w-[369px]">
                <p className="text-p18 text-grey-1">
                  These are the most common general skills listed in job
                  postings for Salesforce Business Analyst roles.
                </p>
              </div>
            </div>
          </div>
          <div>
            <Image
              width={551}
              height={298.4}
              placeholder="blur"
              blurDataURL="/images/SOC.png"
              src="/images/SOC.png"
              alt=""
            />
          </div>
        </div>
        <div className="ml-14">
          <div className="mb-14">
            <SkillItem />
          </div>
          <div className="">
            <SkillItem title="Kỹ năng chuyên môn" />
          </div>
        </div>
      </div>
    </div>
  )
}

Skills.propTypes = {}

export default Skills
