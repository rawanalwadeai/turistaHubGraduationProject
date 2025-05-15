// import React  , {useRef , useEffect} from 'react'
// import { Container, Row, Button } from 'reactstrap'
// import { NavLink, Link } from 'react-router-dom'


// import logo from '../../assets/images/logo.png';
// import './header.css'

// const nav___links = [
//   {
//     path: '/home',
//     display: 'Home'
//   },

//   {
//     path: '/about',
//     display: 'About'
//   },

//   {
//     path: '/tour',
//     display: 'Tour'

//   }
// ]

// const Header = () => {


// const headerRef = useRef(null)

// const stickyHeaderFunc = () => {
//   window.addEventListener('scroll' , () => {
//     if(document.body.scrollTop >80 || document.documentElement.scrollTop > 80) {
//       headerRef.current.classList.add('sticky__header')
//     }
//     else{
//       headerRef.current.classList.remove('sticky__header')

//     }

//   })
// }

// useEffect(() => {
//   stickyHeaderFunc()

//   return window.removeEventListener('scroll' , stickyHeaderFunc)
// })



//   return <header className='header'   ref={headerRef}>
//     <Container>
//       <Row>
//         <div className='nav__wrapper d-flex align-items-center justify-content-between'>

//           { /** logo */}
//           <div className='logo'>
//             <img src={logo} alt="" />
//           </div>
//           { /** logo end */}


//           { /** menu  */}
//           <div className='navigation'>
//             <ul className='menu d-flex align-items-center gap-5'>
// {
//   nav___links.map((item ,index)=>(
//     <li className='nav__item' key={index}>
//       <NavLink to={item.path} 
//       className={navClass=>navClass. isActive ? 'active__link' : ""}>{item.display}</NavLink>
//     </li>
//   ))
// }
//             </ul>
//           </div>


//           { /** menu end */}

//           <div className='nav__right d-flex align-items-center gap-4'>
//           <div className='nav__btns d-flex align-items-center gap-4'>
//             <button className='btn secondary__btn'><Link to='/login'>Login</Link></button>
//             <button className='btn primary__btn'><Link to='/login'>Register</Link></button>
//               </div> 

//               <span className='mobile__menu'>
//              <i className="fa-solid fa-bars"></i>
//                             </span>
//           </div>


//         </div>
//       </Row>
//     </Container>

//   </header>
// }

// export default Header



// the up one is from the tutorial but it was not work clearly bc the null and cLass list so edited by chat gpt lie that 

import React, { useRef, useEffect , useContext} from 'react'
import { Button, Container, Row } from 'reactstrap'
import { NavLink, Link ,useNavigate } from 'react-router-dom'

import logo from '../../assets/images/logo.png'
import './header.css'

//K
import {AuthContext} from './../../context/AuthContext'

const nav___links = [
  {
    path: '/home',
    display: 'Home'
  },
  // {
  //   path: '/about',
  //   display: 'About'
  // },
  {
    path: '/tour',
    display: 'Tour'
  },
  {
    path: '/houses',
    display:'Houses'
  },
  {
    path: '/cars',
    display:'Cars'
  }

  ,
  {
    path: '/translator',
    display:'Translator'
  },

  {
    path: '/boat',
    display:'Boat'
  }
]

const Header = () => {
  const headerRef = useRef(null)
  const menuRef = useRef(null)


  //K
  const navigate =useNavigate()
  const {user , dispatch} = useContext(AuthContext)
  const logout = () =>{
    dispatch({type :'LOGOUT'})
    navigate('/')


  }

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return

      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky__header')
      } else {
        headerRef.current.classList.remove('sticky__header')
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


const toggleMenu = ()=> menuRef.current.classList.toggle('show__menu')


  return (
    <header className='header' ref={headerRef}>
      <Container>
        <Row>
          <div className='nav__wrapper d-flex align-items-center justify-content-between'>
            {/* logo */}
            <div className='logo'>
              <img src={logo} alt='logo' />
            </div>

            {/* menu */}
            <div className='navigation' ref={menuRef} onClick={toggleMenu}>
              <ul className='menu d-flex align-items-center gap-5'>
                {nav___links.map((item, index) => (
                  <li className='nav__item' key={index}>
                    <NavLink
                      to={item.path}
                      className={navClass => (navClass.isActive ? 'active__link' : '')}
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* nav right */}
            <div className='nav__right d-flex align-items-center gap-4'>
              <div className='nav__btns d-flex align-items-center gap-4'>

{/**K */}

{
  user? <>
  <h5 className='mb-0'> {user.username} </h5>
  <Button className='btn btn-dark' onClick={logout}>Logout</Button>
  </> : <>
  <button className='btn secondary__btn'>
                  <Link to='/login'>Login</Link>
                </button>
                <button className='btn primary__btn'>
                  <Link to='/register'>Register</Link>
                </button>
  
  </>
}

{/**K end*/}

               
              </div>

              <span className='mobile__menu' onClick={toggleMenu}>
                <i className='fa-solid fa-bars'></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  )
}

export default Header
