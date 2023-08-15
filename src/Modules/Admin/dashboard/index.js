import { ChevronDownIcon, PhotoIcon, RectangleStackIcon, VideoCameraIcon } from '@heroicons/react/24/outline'
import React, { useEffect } from 'react'
import OverViewCard from './OverViewCard'
import TrendingAlbumCard from './TrendingAlbumCard'
import JavSelect from "../../../Shared/Component/Forms/JavSelect";
import JavFormSelect from "../../../Shared/Component/Forms/JavFormSelect";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard } from "./duck/action";
import { MEDIA_URL } from "../../../Shared/utils/constants";
import DashboardChart from '../../../Shared/Component/Chart/DashboardChart';
import OrdersLineChart from './OrdersLineChart';
import StorageCapacityDougnutChart from './StorageCapacityDougnutChart';
import OtherChart from './OtherChart';
import AlbumsDownloadedDoughnutChart from './AlbumsDownloadedDoughnutChart';

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
                                        photo={`${MEDIA_URL}${album.media[0].watermark_path}`} />
                                )
                            })
                        }
                        {/*<TrendingAlbumCard name={"Museums of History New South Wale"} photo='https://images.unsplash.com/photo-1680169755527-ce101aead0ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2524&q=80'/>*/}
                        {/*<TrendingAlbumCard name={"Beautiful People "} photo='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'/>*/}
                    </div>
                </div>

                <hr className='mx-[-40px]' />
                <div className='mt-4'>
                    <OrdersLineChart />
                </div>
            </main>
            <aside className="hidden w-96 overflow-y-auto border-l border-gray-200 bg-white py-2 lg:block ">
                <StorageCapacityDougnutChart />
                <hr className='mb-8' />
                <AlbumsDownloadedDoughnutChart />

            </aside>
        </div>
    )
}

export default Dashboard