import React from 'react'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Routers from '../../routeer/Routers'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  return (
    <>

<Header />
<Routers />
<ToastContainer position='top-center' limit={1}  />

<Footer />


</>
)
}

export default Layout