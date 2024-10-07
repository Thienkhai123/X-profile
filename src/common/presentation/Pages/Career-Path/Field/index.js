import React from 'react'
import Image from 'next/image'

const Field = (props) => {
  return (
    <div className="xl:flex xl:justify-center">
      <Image
        width={300}
        height={500}
        placeholder="blur"
        blurDataURL="/images/bearBoss.png"
        quality={100}
        src="/images/bearBoss.png"
        alt="career"
      />
    </div>
  )
}

Field.propTypes = {}

export default Field
