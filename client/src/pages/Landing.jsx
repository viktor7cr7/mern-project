import React from 'react'
import styled from 'styled-components';
import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/main.svg'
import { Logo } from '../components';
import { Link } from 'react-router-dom';


const Landing = () => {
  return (
    <Wrapper>
        <nav>
            <Logo></Logo>
        </nav>
            <div className="container page">
                <div className="info">
                    <h1>
                        job <span>tracking</span> app
                    </h1>
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi ipsa quas iste assumenda mollitia sapiente eaque quibusdam, porro officia. Perspiciatis mollitia sint debitis non rerum? Atque ex in aspernatur iure!
                    </p>
                    <Link to='/register' className='btn register-link'>
                        Register
                    </Link>
                    <Link to='/login' className='btn register-link'>
                        Login / Demo User
                    </Link>
                </div>
                <img src={main} alt='job hunt' className='img main-img'></img>
            </div>
    </Wrapper>
  )
}

export default Landing