import { useEffect, useState } from "react"
import Axios from "../../../Shared/utils/axios_instance"


//TOODO: Delete mock files
const files = [
    {
        "name": "IMG_4985.HEIC",
        "size": "3.9 MB",
        "source": "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
        "current": true
    },
    {
        "name": "IMG_4985.HEIC",
        "size": "3.9 MB",
        "source": "https://images.unsplash.com/photo-1614926857083-7be149266cda?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=512&q=80",
        "current": true
    },
    {
        "name": "IMG_4985.HEIC",
        "size": "3.9 MB",
        "source": "https://images.unsplash.com/photo-1614705827065-62c3dc488f40?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
        "current": true
    },
    {
        "name": "IMG_4985.HEIC",
        "size": "3.9 MB",
        "source": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
        "current": true
    },
    {
        "name": "IMG_4985.HEIC",
        "size": "3.9 MB",
        "source": "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
        "current": true
    },
    {
        "name": "IMG_4985.HEIC",
        "size": "3.9 MB",
        "source": "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=512&q=80",
        "current": true
    },
    {
        "name": "IMG_4985.HEIC",
        "size": "3.9 MB",
        "source": "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
        "current": true
    },
    {
        "name": "IMG_4985.HEIC",
        "size": "3.9 MB",
        "source": "https://images.unsplash.com/photo-1492724724894-7464c27d0ceb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
        "current": true
    },
    {
        "name": "IMG_4985.HEIC",
        "size": "3.9 MB",
        "source": "https://images.unsplash.com/photo-1513682322455-ea8b2d81d418?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=512&q=80",
        "current": true
    },
    {
        "name": "IMG_4985.HEIC",
        "size": "3.9 MB",
        "source": "https://images.unsplash.com/photo-1463107971871-fbac9ddb920f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
        "current": true
    },
    {
        "name": "IMG_4985.HEIC",
        "size": "3.9 MB",
        "source": "https://images.unsplash.com/photo-1552461871-ce4f9fb3b438?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
        "current": true
    },
    {
        "name": "IMG_4985.HEIC",
        "size": "3.9 MB",
        "source": "https://images.unsplash.com/photo-1446292532430-3e76f6ab6444?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=512&q=80",
        "current": true
    },
    {
        "name": "IMG_4985.HEIC",
        "size": "3.9 MB",
        "source": "https://images.unsplash.com/photo-1508669232496-137b159c1cdb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
        "current": true
    },
    {
        "name": "IMG_4985.HEIC",
        "size": "3.9 MB",
        "source": "https://images.unsplash.com/photo-1431512284068-4c4002298068?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
        "current": true
    },
    {
        "name": "IMG_4985.HEIC",
        "size": "3.9 MB",
        "source": "https://images.unsplash.com/photo-1581320546160-0078de357255?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
        "current": true
    },
    {
        "name": "IMG_4985.HEIC",
        "size": "3.9 MB",
        "source": "https://images.unsplash.com/photo-1541956628-68d338ae09d5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=512&q=80",
        "current": true
    },
    {
        "name": "IMG_4985.HEIC",
        "size": "3.9 MB",
        "source": "https://images.unsplash.com/photo-1505429155379-441cc7a574f7?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=512&q=80",
        "current": true
    },
    {
        "name": "IMG_4985.HEIC",
        "size": "3.9 MB",
        "source": "https://images.unsplash.com/photo-1582029133746-96031e5c8d00?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
        "current": true
    },
    {
        "name": "IMG_4985.HEIC",
        "size": "3.9 MB",
        "source": "https://images.unsplash.com/photo-1575868053350-9fd87f68f984?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
        "current": true
    },
    {
        "name": "IMG_4985.HEIC",
        "size": "3.9 MB",
        "source": "https://images.unsplash.com/photo-1588391051471-1a5283d5a625?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
        "current": true
    },
    {
        "name": "IMG_4985.HEIC",
        "size": "3.9 MB",
        "source": "https://images.unsplash.com/photo-1575314146619-ec67b6213351?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
        "current": true
    },
    {
        "name": "IMG_4985.HEIC",
        "size": "3.9 MB",
        "source": "https://images.unsplash.com/photo-1579874107960-e602329ef20a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
        "current": true
    },
    {
        "name": "IMG_4985.HEIC",
        "size": "3.9 MB",
        "source": "https://images.unsplash.com/flagged/photo-1551385229-2925ed4eb53d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=512&q=80",
        "current": true
    },
    {
        "name": "IMG_4985.HEIC",
        "size": "3.9 MB",
        "source": "https://images.unsplash.com/photo-1498575637358-821023f27355?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
        "current": true
    }
]


export default function Albums() {
    const [albums, setAlbums] = useState([])
    const [fetchingAlbums, setFetchingAlbums] = useState(false)
    const [selectedAlbum, setSelectedAlbum] = useState(null)

    const fetchAlbums = async () => {
        try {
            setFetchingAlbums(true)
            const res = await Axios.get("/albums")
            setAlbums(res.data)
        }
        catch (e) {
            //TODO: Implement better error alert
            alert("An error occured while fetching albums")
        }
        finally {
            setFetchingAlbums(false)
        }
    }
    useEffect(() => {
        fetchAlbums()
    }, [

    ])


    return (
        <div className="flex flex-1 items-stretch overflow-hidden">
            <main className="flex-1 overflow-y-auto px-10 pt-4">

                <div className="px-4 pt-5 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-xl font-semibold text-gray-900">Albums</h1>
                            <p className="mt-2 text-sm text-gray-700">
                                A list of all the albums .
                            </p>
                        </div>
                        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                            >
                                Add new album
                            </button>
                        </div>
                    </div>
                    <div className="mt-8 flex flex-col">
                        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="relative w-12 px-2 sm:w-10 sm:px-2">
                                                </th>
                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                    Name
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Description
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Status
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                                                    Created At
                                                </th>
                                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                    <span className="sr-only">Edit</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {fetchingAlbums ? (
                                                [0, 0, 0, 0].map((album) => (
                                                    <tr key="animate-pulse">
                                                        <td className="relative w-12 px-2 sm:w-10 sm:px-2">

                                                            <div className='h-4 w-4  bg-gray-300 rounded'></div>

                                                        </td>
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                            <div className="flex items-center">
                                                                <div className="h-10 w-10 flex-shrink-0">
                                                                    <div className='h-12 w-12  bg-gray-300 rounded'></div>
                                                                </div>
                                                                <div className="ml-4 flex-1">
                                                                    <div className='h-2 w-full bg-gray-300 rounded'></div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                            <div className='h-2 bg-gray-300 rounded'></div>
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                            <div className='h-2 bg-gray-300 rounded'></div>

                                                        </td>
                                                        {/* //TODO: format date */}
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">
                                                            <div className='h-2 bg-gray-300 rounded'></div>

                                                        </td>
                                                        <td className="max-h-full whitespace-nowrap py-4 text-sm pl-3 pr-4 space-x-4 text-center items-center justify-center gap-x-4 sm:pr-6">
                                                            <div className='h-2 bg-gray-300 rounded'></div>

                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (albums.length == 0 ? (<td colspan={6} className="text-center py-4">


                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-auto h-12 w-12 text-gray-400">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                                                </svg>

                                                <h3 className="mt-2 text-sm font-medium text-gray-900">No albums  created yet </h3>


                                                <p className="mt-1 text-sm text-gray-500">Get started by creating an album</p>
                                                <div className="mt-6">

                                                </div>

                                            </td>) : (albums.map((album) => (

                                                <tr key={album.id} className={`${selectedAlbum == album.id && "bg-gray-50"}`}>
                                                    <td className="relative w-12 px-2 sm:w-10 sm:px-2">

                                                        <input
                                                            type="checkbox"
                                                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                                                            checked={selectedAlbum == album.id}
                                                            onChange={() => {
                                                                if (selectedAlbum == album.id) {
                                                                    setSelectedAlbum(null)
                                                                } else {
                                                                    setSelectedAlbum(album.id)
                                                                }
                                                            }}
                                                        />
                                                    </td>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                        <div className="flex items-center">
                                                            <div className="h-10 w-10 flex-shrink-0">
                                                                <img className="h-10 w-12 " src={"https://via.placeholder.com/350x150"} alt="" />
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="font-medium text-gray-900">{album.name}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        <div className="text-gray-900">{album.description}</div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                                            Active
                                                        </span>
                                                    </td>
    //TODO: format date
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">{album.createdAt}</td>
                                                    <td className="max-h-full whitespace-nowrap py-4 text-sm pl-3 pr-4 space-x-4 text-center items-center justify-center gap-x-4 sm:pr-6">
                                                        <a href="#" className="text-indigo-600  hover:text-indigo-900">
                                                            Edit<span className="sr-only">, {album.name}</span>
                                                        </a>
                                                        <a href="#" className="text-red-600 hover:text-red-900">
                                                            Delete<span className="sr-only">, {album.name}</span>
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))))}


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {selectedAlbum && (
                <aside className="hidden w-96 overflow-y-auto border-l border-gray-200 bg-white p-8 lg:block">
                    {/* //List of selected images for current album  */}
                    <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                        {files.map((file) => (
                            <li key={file.source} className="relative">
                                <div className="group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                                    <img src={file.source} alt="" className="pointer-events-none object-cover group-hover:opacity-75" />
                                    <button type="button" className="absolute inset-0 focus:outline-none">
                                        <span className="sr-only">View details for {file.title}</span>
                                    </button>
                                </div>
                                <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">{file.title}</p>
                                <p className="pointer-events-none block text-sm font-medium text-gray-500">{file.size}</p>
                            </li>
                        ))}
                    </ul>

                </aside>
            )}
        </div>
    )
}
