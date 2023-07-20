import React, { useEffect, useRef } from 'react';
import ExploreMoreCard from './ExploreMoreCard';

const PaymentFailureScreen = () => {

    return (
        <div className=" items-center justify-center h-screen bg-gray-100 pt-[5%]">
            <div className="flex flex-col gap-y-5 w-[40%] text-center mx-auto">

                <div className="w-full py-3 mt-0 mb-0 relative" >

                    <svg width="100" height="100" viewBox="0 0 16 16" className='mx-auto' fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_10_23)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.493 0.015007L7.107 0.055007C5.234 0.242007 3.347 1.20801 2.071 2.63401C0.660001 4.21101 -0.0569991 6.16801 0.00900088 8.25301C0.124001 11.854 2.599 14.903 6.11 15.771C7.14372 16.0206 8.21672 16.0625 9.26676 15.8943C10.3168 15.7261 11.323 15.3511 12.227 14.791C14.0048 13.6833 15.2772 11.9226 15.771 9.88701C15.943 9.18601 15.983 8.82901 15.983 8.00001C15.983 7.17101 15.943 6.81401 15.771 6.11301C14.979 2.87801 12.315 0.498007 9 0.064007C8.716 0.027007 7.683 -0.00599302 7.493 0.015007ZM8.853 1.56301C9.97627 1.71088 11.0416 2.14894 11.944 2.83401C12.273 3.08001 12.92 3.72701 13.166 4.05601C13.727 4.80701 14.142 5.69001 14.33 6.53501C14.544 7.49995 14.544 8.50006 14.33 9.46501C13.916 11.326 12.605 12.978 10.867 13.828C10.2404 14.1346 9.57015 14.3424 8.88 14.444C8.456 14.509 7.544 14.509 7.12 14.444C5.172 14.148 3.528 13.085 2.493 11.451C2.23842 11.0289 2.02606 10.5828 1.859 10.119C1.62081 9.43832 1.50404 8.72109 1.514 8.00001C1.514 6.96101 1.715 6.07501 2.16 5.16001C2.5 4.46201 2.846 3.98001 3.413 3.41301C3.91451 2.89283 4.50648 2.46825 5.16 2.16001C6.30503 1.60067 7.59006 1.39294 8.853 1.56301ZM7.706 4.29001C7.482 4.36301 7.355 4.49101 7.293 4.70501C7.257 4.82701 7.253 5.10601 7.259 6.81601C7.267 8.78601 7.267 8.78701 7.325 8.89601C7.4012 9.03563 7.52349 9.14449 7.671 9.20401C7.803 9.25001 8.197 9.25001 8.329 9.20401C8.47651 9.14449 8.5988 9.03563 8.675 8.89601C8.733 8.78701 8.733 8.78601 8.741 6.81601C8.749 4.66401 8.749 4.66201 8.596 4.48101C8.472 4.33301 8.339 4.28401 8.04 4.27601C7.92848 4.26972 7.81661 4.27441 7.706 4.29001ZM7.786 10.53C7.58593 10.6016 7.41952 10.7448 7.319 10.932C7.24681 11.1114 7.23799 11.31 7.294 11.495C7.34807 11.6399 7.44414 11.7653 7.56991 11.8553C7.69568 11.9452 7.84543 11.9956 8 12C8.303 12 8.612 11.78 8.706 11.495C8.76201 11.31 8.75319 11.1114 8.681 10.932C8.59822 10.7859 8.47813 10.6645 8.333 10.58C8.217 10.52 7.904 10.491 7.786 10.53Z" fill="#BB0C0C" />
                        </g>
                        <defs>
                            <clipPath id="clip0_10_23">
                                <rect width="16" height="16" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>

                </div>


                <h4 className="font-medium text-3xl tracking-wide">Payment was not successful!</h4>

            </div>


        </div >
    );
};

export default PaymentFailureScreen;