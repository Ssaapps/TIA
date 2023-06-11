import { ChevronDownIcon, PhotoIcon, RectangleStackIcon, VideoCameraIcon } from '@heroicons/react/24/outline'
import React, { useEffect } from 'react'
import OverViewCard from './OverViewCard'
import TrendingAlbumCard from './TrendingAlbumCard'
import JavSelect from "../../../Shared/Component/Forms/JavSelect";
import JavFormSelect from "../../../Shared/Component/Forms/JavFormSelect";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard } from "./duck/action";

function Dashboard() {

    const dispatch = useDispatch();

    const dashboardState = useSelector((state) => state.dashboard);


    useEffect(() => {
        console.log("dashboardState", dashboardState)
        dispatch(getDashboard())
    }, [])
    return (
        <div className="flex flex-1 items-stretch overflow-hidden">

            <main className="flex-1 overflow-y-auto px-10 pt-4">
                <div className="flex justify-between ">
                    <h4 className='text-xl font-medium'>Overview</h4>
                    <JavFormSelect
                        items={["today", "last week", "last monthly", "last year"]}
                        position={"bottom"}
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-3">

                    <OverViewCard
                        icon={<PhotoIcon className='w-5 h-5 text-green-500' />}
                        text={`${dashboardState.fetch.data ? dashboardState.fetch.data.count.orders : '...'} Orders`} />

                    <OverViewCard
                        icon={<PhotoIcon className='w-5 h-5 text-blue-500' />}
                        text={`${dashboardState.fetch.data ? dashboardState.fetch.data.count.media : '...'} Media`} />


                    <OverViewCard
                        icon={<RectangleStackIcon className='w-5 h-5 text-orange-500' />}
                        text={`${dashboardState.fetch.data ? dashboardState.fetch.data.count.albums : '...'} Albums`} />

                </div>

                <div className='my-6'>
                    <h4 className='text-xl font-medium'>Trending Albums</h4>
                    <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-3">
                        {
                            dashboardState.fetch.data && dashboardState.fetch.data.tending_albums.map(album => {
                                return (
                                    <TrendingAlbumCard name={album.name}
                                        description={album.description}
                                        photo={`https://7206-154-160-11-174.ngrok-free.app${album.media[0].path}`} />
                                )
                            })
                        }
                        {/*<TrendingAlbumCard name={"Museums of History New South Wale"} photo='https://images.unsplash.com/photo-1680169755527-ce101aead0ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2524&q=80'/>*/}
                        {/*<TrendingAlbumCard name={"Beautiful People "} photo='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'/>*/}
                    </div>
                </div>

                <hr className='mx-[-40px]' />
                <div className='mt-4'>
                    <div className='flex justify-between'>
                        <h4 className='text-xl font-medium'>Recent Offers</h4>
                        <button className='flex justify-center px-3 py-1.5 rounded-lg border items-center'>
                            <span className='text-gray-500 text-sm'>All bids</span>
                            <ChevronDownIcon className="w-4 h-4 text-gray-500 ml-1" />
                        </button>
                    </div>

                    {/* <table>
                    <thead>
                    <tr
                        className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <th className="px-6 py-3">List items</th>

                        </tr>
                        <?
                </table> */}

                </div>
            </main>
            <aside className="hidden w-96 overflow-y-auto border-l border-gray-200 bg-white p-8 lg:block">
            </aside>
        </div>
    )
}

export default Dashboard