import React, { useEffect, useRef } from 'react';
import ExploreMoreCard from './ExploreMoreCard';
import Confetti from 'react-confetti'
import { MEDIA_URL } from '../../Shared/utils/constants';
import { useNavigate } from 'react-router';

const PaymentSuccessScreen = ({ data }) => {
    const [confettiWidth, setConfettiWidth] = React.useState(window.innerWidth);
    const containerRef = useRef(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (containerRef.current) {
            setConfettiWidth(containerRef.current.offsetWidth)
        }
    }, [containerRef])
    return (
        <div className=" items-center justify-center h-screen bg-gray-100 pt-[5%]">
            <div className="flex flex-col gap-y-5 w-[80%] md:w-[60%] sm:w-[70%]  lg:w-[40%] text-center mx-auto">

                <div className="w-full py-3 mt-0 mb-0 relative" ref={containerRef}>
                    <Confetti
                        // className='w-full h-full'
                        width={confettiWidth}
                        height={250}

                        numberOfPieces={100}

                    />
                    <svg
                        width={100}
                        height={100}
                        viewBox="0 0 63 68"
                        classN ame="mx-auto"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M0.248035 20.6605L0.58121 48.7696C0.610414 51.2334 1.94636 53.5083 4.09657 54.7323L28.3722 68.4664C30.5224 69.6903 33.14 69.6593 35.2606 68.3847L59.2038 54.0791C61.3244 52.8045 62.6061 50.4986 62.5769 48.0347L62.2441 19.9604C62.2149 17.4965 60.8789 15.2216 58.7287 13.9976L34.4531 0.263567C32.3029 -0.960414 29.6853 -0.929388 27.5647 0.345215L3.62149 14.6508C1.50048 15.8907 0.218831 18.1966 0.248035 20.6605Z"
                            fill="#974AF5"
                        />
                        <g clipPath="url(#clip0_0_1)">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M43.546 27.111C43.8272 27.3923 43.9852 27.7738 43.9852 28.1715C43.9852 28.5693 43.8272 28.9507 43.546 29.232L32.303 40.475C32.1544 40.6236 31.978 40.7415 31.7839 40.8219C31.5897 40.9024 31.3816 40.9438 31.1715 40.9438C30.9614 40.9438 30.7533 40.9024 30.5591 40.8219C30.365 40.7415 30.1886 40.6236 30.04 40.475L24.454 34.89C24.3107 34.7516 24.1965 34.5861 24.1178 34.4031C24.0392 34.2201 23.9979 34.0233 23.9961 33.8241C23.9944 33.6249 24.0323 33.4274 24.1078 33.2431C24.1832 33.0587 24.2946 32.8913 24.4354 32.7504C24.5762 32.6096 24.7437 32.4982 24.9281 32.4228C25.1124 32.3474 25.3099 32.3094 25.5091 32.3111C25.7083 32.3129 25.9051 32.3542 26.0881 32.4329C26.2711 32.5115 26.4366 32.6257 26.575 32.769L31.171 37.365L41.424 27.111C41.5633 26.9716 41.7287 26.861 41.9107 26.7856C42.0928 26.7102 42.2879 26.6713 42.485 26.6713C42.6821 26.6713 42.8772 26.7102 43.0592 26.7856C43.2413 26.861 43.4067 26.9716 43.546 27.111Z"
                                fill="white"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_0_1">
                                <rect width={24} height={24} fill="white" transform="translate(22 22)" />
                            </clipPath>
                        </defs>
                    </svg>

                </div>


                <p className=" text-gray-500 text-lg ">Amazing!</p>
                <h4 className="font-medium text-3xl tracking-wide">Congratulations. You've got covered</h4>
                <p className=" text-gray-500 mb-8">REFERENCE  NUMBER: <span className='font-bold text-black'>#{data.order.payment_reference}</span> </p>
                <div className='border-dashed border w-full h-[2px]'></div>
                <p className="mt-4">Interested in exploring more</p>

                {data.media.length > 0 && data.media.map((media, index) => {
                    return <ExploreMoreCard img={`${MEDIA_URL}${media.path}`} title={media.original_name} albumName={media.album.name} price={media.item_price.price} onClick={() => {
                        navigate(`/photo/${media.id}`)
                    }} />

                })}
                <div className="flex items-center mt-8 justify-center">
                    <button onClick={() => {
                        window.location.replace("/")
                    }} className="bg-[#1e4570] hover:bg-blue-700 text-white font-bold py-2 px-8 rounded">
                        Go to Home
                    </button>
                </div>


            </div>


        </div >
    );
};

export default PaymentSuccessScreen;