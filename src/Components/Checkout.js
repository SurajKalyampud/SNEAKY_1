import React from 'react'
import Navbar from './Navbar'
import './Checkout.css'
import { Link } from 'react-router-dom'

const Checkout = () => {
  return (

    <div>
        <Navbar/>
    <div class="congratulation-area text-center mt-5">
        <div class="container">
            <div class="congratulation-wrapper">
                <div class="congratulation-contents center-text">
                    <div class="congratulation-contents-icon">
                        <i class="fas fa-check"></i>
                    </div>
                    <h4 class="congratulation-contents-title"> Congratulations! </h4>
                    <p class="congratulation-contents-para"> You successfully bought shoes!. </p>
                    <div class="btn-wrapper mt-4">
                        <Link to='/home'>
                        <button class="cmn-btn btn-bg-1"> Go to Home </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Checkout