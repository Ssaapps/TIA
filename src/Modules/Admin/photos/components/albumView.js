import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAlbums} from "../../albums/duck/action";
import {useParams} from "react-router";

export default function AlbumView(props) {

    const dispatch = useDispatch();
    const albumState = useSelector( (state) => state.albums)

    useEffect(() => {
        dispatch(getAlbums());

    },[]);

    const onItemClick = (album) => {
        props.onItemClicked({...album,type: 'album'});
    }



    return (
        <div className={"grid grid-cols-3 gap-1 outline-hidden"}>
            {
                albumState.fetch.data.map(album => {

                    return (
                        <div onClick={() => onItemClick(album)} className={"relative cursor-pointer"}>
                            <img
                                className={"h-full w-full rounded"}
                                src={"https://images.unsplash.com/photo-1674574124475-16dd78234342?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
                            }/>
                            <div className={"absolute text-sm px-2 py-1 top-5 text-white right-0 bg-red-800"}>
                                {album.media_count} resources
                            </div>
                            <div className={"absolute bottom-0 leading-none w-full text-white h-1/3 px-4 pb-1 bg-black opacity-70"}>
                                <h2 className={"font-proximaBold text-sm"}>{album.name}</h2>
                                <span className={"text-xs"}>{album.description}</span>
                            </div>

                        </div>
                    )
                })
            }
        </div>
    )
}