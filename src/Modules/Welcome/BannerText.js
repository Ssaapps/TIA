import React from 'react'

function BannerText(props) {
    console.log("props", props)
    return (
        <div className="px-10 mb-4">
            <div className='  text-center py-2  w-full' style={{
                backgroundColor: props?.bgColor || '#FE0000',
                color: props?.color || '#fff',
            }}>
                <h4 className=' ld:text-2xl md:text-xl text-base font-medium xl:w-2/4 lg:w-2/3 md:h-3/4 w-[90%]  tracking-wide leading-snug text-center mx-auto '>{props?.text || ""}</h4>
            </div>
        </div>
    )
}

export default BannerText