import { useParams } from "react-router";
import { useEffect } from "react";
import { getAlbum, getAlbums } from "../Admin/albums/duck/action";
import { useDispatch, useSelector } from "react-redux";

export default function Album() {

    const dispatch = useDispatch();
    const params = useParams();

    const albumState = useSelector((state) => state.albums)

    useEffect(() => {
        dispatch(getAlbum(params.id))
    }, [])

    useEffect(() => {
        console.log("albumState", albumState)
    }, [albumState])


    return (
        <div>

            <div style={{ height: '50vh' }} className={"bg-red-200 relative"}>

                <img
                    className={"object-cover w-full h-full"}
                    src={albumState.show.data && `https://7206-154-160-11-174.ngrok-free.app${albumState.show.data.media[0].path}`}
                />
                <div className={"absolute top-0 right-0 bg-black bottom-0 left-0 opacity-50"} />
                <div className={"absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center"}>
                    <div className={"text-center flex flex-col justify-center items-center  text-white"}>
                        <h2 className={"text-4xl font-proximaBold"}>{albumState.show.data && albumState.show.data.name}</h2>
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
                    albumState.show.data && albumState.show.data.media.map((media, index) => {
                        return (
                            <div
                                key={index}
                                className={`relative bg-gray-200  ${(index + 1) % 3 === 0 ? 'col-span-2' : ''} `}
                                style={
                                    {
                                        backgroundImage: `url(https://7206-154-160-11-174.ngrok-free.app${media.path})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: "left-top",
                                        height: (index + 1) % 6 === 4 ? '1000px' : '500px',
                                        marginTop: (index + 1) % 6 === 4 ? '-500px' : ''
                                    }
                                }
                            >

                                <div className={"absolute top-0 left-0 right-0 cursor-pointer bottom-0 bg-black opacity-10"} />
                            </div>


                        )
                    })
                }


            </div>

        </div>
    )
}