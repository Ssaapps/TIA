export default function Album() {
    return (
        <div>

            <div style={{height: '50vh'}} className={"bg-red-200 relative"}>

                <img
                    className={"object-cover w-full h-full"}
                    src={"https://media.istockphoto.com/id/1469531463/photo/woman-at-home-decor-store.jpg?s=2048x2048&w=is&k=20&c=ynz5MAv70AbkbYP74O5VfIDdKXvvxAdtGJIQIZNUxCU="}
                />
                <div className={"absolute top-0 right-0 bg-black bottom-0 left-0 opacity-50"}/>
                <div className={"absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center"}>
                    <div className={"text-center flex flex-col justify-center items-center  text-white"}>
                        <h2 className={"text-4xl font-proximaBold"}>Smith Langa's Album</h2>
                        <div className={"flex my-2"}>
                            <div>2 views</div>
                            <div className={"mx-2"}>2 shares</div>
                            <div className={"mx-2"}>2 shares</div>

                        </div>
                    </div>
                </div>

            </div>


            <div className={"grid grid-cols-3 gap-4 m-10"}>

                {
                    [...Array(40).keys()].map(item => {

                        return (
                            <div
                                key={item}
                                className={`bg-gray-200  ${(item+1) % 3 === 0 ? 'col-span-2' : ''}   ${(item+1) % 6 === 4 ? 'h-96 -mt-48': 'h-48'}`}
                                style={{ backgroundImage: `url(https://media.istockphoto.com/id/1469531463/photo/woman-at-home-decor-store.jpg?s=2048x2048&w=is&k=20&c=ynz5MAv70AbkbYP74O5VfIDdKXvvxAdtGJIQIZNUxCU=)`, backgroundSize: 'cover' }}
                            />
                        )
                    })
                }


            </div>

        </div>
    )
}