import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import chartContent from '../../../Shared/demo/dashboardChartContent.json';
import DoughnutChart from '../../../Shared/Component/Chart/DoughnutChart';
import { convertToKBorMBorGB, } from '../../../Shared/utils/common';
import Shimmer from '../../../Shared/Component/Suspense/Shimmer';


const StorageCapacityDougnutChart = React.memo(() => {
    const [data, setData] = useState(null);

    const dashboardState = useSelector((state) => state.dashboard);
    useEffect(() => {
        if (dashboardState.fetch.data) {
            setData([dashboardState.fetch.data.charts.storage_usage.raw.free, dashboardState.fetch.data.charts.storage_usage.raw.total - dashboardState.fetch.data.charts.storage_usage.raw.free])

        }
    }, [dashboardState])
    const totalAlbums = data !== null && dashboardState?.fetch.data.charts.storage_usage.raw.total + dashboardState.fetch.data.charts.storage_usage.raw.free
    const labels = ['Free', 'Used',];
    const options = {
        cutout: 62,
        borderWidth: 2,
        borderColor: "#FFFFFF",
        maintainAspectRatio: false,
        responsive: false,
        plugins: {
            legend: {
                display: false,
            },
            labels: {
                display: false,
            },
        },
        animation: {
            animateScale: true,
            animateRotate: true,
        },
    };

    const datasets = [
        {
            data: data,
            backgroundColor: ['#FA8B0C', '#FB3586', '#5840FF'],
            centerText: data != null && convertToKBorMBorGB(dashboardState.fetch.data?.charts.storage_usage.raw.total),
            centerTextLabel: 'Total',
            fontSize: 16,
        },
    ];


    /* Tab Activation */


    return (
        <div>
            <div className="h-full">
                <div className="bg-white dark:bg-white10 m-0 p-0 text-theme-gray dark:text-white60 text-[15px] rounded-10 relative h-full">
                    <div className="h-[60px] px-[25px] text-dark dark:text-white87 font-medium text-[17px] flex flex-wrap items-center justify-between sm:flex-col sm:h-auto sm:mb-[15px]">
                        <h1 className="mb-0 inline-flex items-center py-[18px] sm:pb-[5px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                            Storage Usage
                        </h1>

                    </div>
                    {dashboardState.fetch.data ?
                        (<div className="p-[25px] border-t border-regular dark:border-white10 [&>.doughnutchart-inner]:relative [&>.doughnutchart-inner>.doughnutchart-inner-text]:absolute [&>.doughnutchart-inner>.doughnutchart-inner-text]:left-1/2 [&>.doughnutchart-inner>.doughnutchart-inner-text]:top-1/2 [&>.doughnutchart-inner>.doughnutchart-inner-text]:-translate-x-1/2 [&>.doughnutchart-inner>.doughnutchart-inner-text]:-translate-y-1/2 [&>.doughnutchart-inner>.doughnutchart-inner-text]:w-[200px] [&>.doughnutchart-inner>.doughnutchart-inner-text]:text-center [&>.doughnutchart-inner>.doughnutchart-inner-text>.doughnutchart-inner-content]:block [&>.doughnutchart-inner>.doughnutchart-inner-text>.doughnutchart-inner-content]:text-3xl [&>.doughnutchart-inner>.doughnutchart-inner-text>.doughnutchart-inner-content]:font-semibold [&>.doughnutchart-inner>.doughnutchart-inner-text>.doughnutchart-inner-content]:leading-none [&>.doughnutchart-inner>.doughnutchart-inner-text>.doughnutchart-inner-content>.doughnutchart-inner-label]:text-body dark:[&>.doughnutchart-inner>.doughnutchart-inner-text>.doughnutchart-inner-content>.doughnutchart-inner-label]:text-white60">
                            {/* Doughnut Chart */}

                            <DoughnutChart
                                type="doughnut"
                                id="salesOverview"
                                className="mx-auto"
                                labels={labels}
                                datasets={datasets}
                                height={200}
                                width={window.innerWidth <= 575 ? 200 : 250}
                                option={options}
                                tooltip={{
                                    backgroundColor: '#FFF',
                                    titleFontSize: 16,
                                    titleFontColor: '#0066ff',
                                    bodyFontColor: '#000',
                                    bodyFontSize: 14,
                                    displayColors: false,

                                    callbacks: {},
                                }}
                            />

                            {/* Pverview Percentage */}
                            <div className="flex items-center justify-center mt-3">
                                {data?.map((value, index) => {
                                    const itemPercent = Math.round((value / totalAlbums) * 100);
                                    return (
                                        <div className="flex items-center gap-[5px] m-[15px]" key={index}>
                                            <span
                                                className="block w-[10px] h-[10px] rounded-full"
                                                style={{
                                                    backgroundColor: datasets[0].backgroundColor[index],
                                                }}
                                            />
                                            <span className="text-dark dark:text-white87 text-[15px] font-medium">{itemPercent}%</span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Overview Box */}
                            <div className="flex items-center justify-around bg-regularBG dark:bg-white10 mt-[10px] py-4 p-8 rounded-[8px]">
                                {data?.map((value, index) => {
                                    return (
                                        <div className="text-center" key={index}>
                                            <h4 className="text-dark dark:text-white87 text-lg font-semibold leading-none mb-1.5">{convertToKBorMBorGB(value)}</h4>
                                            <p className="text-body dark:text-white60 text-[15px] mb-0">{labels[index]}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>) : (
                            <div className="flex flex-col items-center gap-y-6 mb-4">
                                <Shimmer className={"rounded-full h-[200px] w-[200px]"} />
                                <Shimmer className={"h-5 w-5/12"} />
                                <Shimmer className={"h-5 w-1/2"} />
                            </div>
                        )}
                </div>
            </div>

        </div>
    );
});

export default StorageCapacityDougnutChart;
