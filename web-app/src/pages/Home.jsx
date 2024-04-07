import React from 'react'
import Section1 from '../components/Home/section1'
import { Section2 } from '../components/Home/section2'

const Home = () => {
  return (
    <div className='bg-gray-300 text-yellow-400'>
        <Section1 />
        <Section2 />
    </div>
  )
}

export default Home