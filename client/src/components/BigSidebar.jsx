import React from 'react'
import Wrapper from '../assets/wrappers/BigSidebar'
import NavLinks from './NavLinks'
import { useDashboardContext } from '../pages/DashboardLayout'
import Logo from './Logo'

const BIgSidebar = () => {
  const {showSidebar} = useDashboardContext()

  return <Wrapper>
    <div className={showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'}>

      <div className='content'>
        <header>
          <Logo></Logo>
        </header>
        <NavLinks isBigSidebar></NavLinks>
      </div>
    </div>
  </Wrapper>
}

export default BIgSidebar