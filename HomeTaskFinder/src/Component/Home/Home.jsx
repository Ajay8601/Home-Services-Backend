import React from 'react'
import PopularServices from '../PopulerPage/PopularServices';
import Home_page from '../HomePage/Home_page';
import MostBookedServices from '../Most_booked_employee/mbs';
import SimplePage from '../samplePage/SimplePage';
import MoreServices from '../MoreServices/MoreServices';

const Home = () => {
  return (
    <>
    <Home_page />
    <PopularServices/>
    <MostBookedServices/>
    <SimplePage/>
    <MoreServices/>
    </>
  )
}

export default Home
