import React, { useEffect, useState } from 'react'
import { chartLinearGradient, customTooltips } from '../../../Shared/Component/Chart/utilities';
import DashboardChart from '../../../Shared/Component/Chart/DashboardChart';
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from 'react-redux';
import { getDashboard } from './duck/action';
import dayjs from 'dayjs';
import Shimmer from '../../../Shared/Component/Suspense/Shimmer';
import SpinIcon from '../../../Shared/Component/Icons/SpinIcon';

function OrdersLineChart() {
    const [date, setDate] = useState({
        startDate: null,
        endDate: null
    })
    const dashboardState = useSelector((state) => state.dashboard);
    const ordersData = {
        orders: dashboardState.fetch.data ? dashboardState.fetch.data.charts.orders_trend.map((order) => (order.value)) : [],
        totalOrder: dashboardState.fetch.data ? dashboardState.fetch.data.charts.orders_trend.reduce((a, b) => a + b.value, 0) : 0,
        labels: dashboardState.fetch.data ? dashboardState.fetch.data.charts.orders_trend.map((order) => (order.label)) : [],
    };

    const dispatch = useDispatch();



    useEffect(() => {
        if (date.startDate != null && date.endDate != null) {
            dispatch(getDashboard([date.startDate, date.endDate]))
        }
    }, [date.startDate, date.endDate])



    return (
        <>

            {
                dashboardState.fetch.data ?
                    <div className='rounded-lg bg-white text-center shadow px-5 py-6'>
                        <h4 className='text-2xl  mb-4 font-medium'>Orders Trend</h4>

                        <div className="flex items-center justify-center ssm:flex-col ssm:gap-y-[15px]">
                            <div className="relative flex items-center mx-3 gap-[5px]">
                                <span className="flex items-center  text-sm text-body dark:text-white60 before:absolute before:bg-primary before:w-2 before:h-2 before:rounded-full ltr:before:left-0 rtl:before:right-0 before:top-1/2 before:-translate-y-2/4">
                                    Orders
                                </span>
                                <span className="inline-block text-dark dark:text-white87 ltr:mr-1 rtl:ml-1 ltr:ml-2.5 rtl:mr-2.5 text-22 font-semibold">
                                    {ordersData.totalOrder}
                                </span>

                            </div>

                        </div>
                        <div className="">
                            <div className="flex items-center justify-center my-2 gap-x-2">
                                <span className="text-sm">Start Date:</span>
                                <input type="date" value={date.startDate} className='bg-[#F4F6F9] rounded-lg border outline-none border-gray-300  text-sm' name="" onChange={(e) => {
                                    setDate({ ...date, startDate: e.target.value })
                                }} id="" />
                                <span className="text-sm">End Date:</span>
                                <input type="date" className='bg-[#F4F6F9] rounded-lg border outline-none border-gray-300  text-sm outline' value={date.endDate} onChange={(e) => {
                                    setDate({ ...date, endDate: e.target.value })
                                }} name="" id="" />
                            </div>
                        </div>

                        <div className="mt-3 hexadash-chart-container">
                            <DashboardChart
                                type="line"
                                id="hexadash-sales-revenue"
                                labels={ordersData.labels}
                                datasets={[{
                                    data: ordersData.orders,
                                    borderColor: '#8231D3',
                                    borderWidth: 3,
                                    fill: true,
                                    backgroundColor: () =>
                                        chartLinearGradient(document.getElementById('hexadash-sales-revenue'), 300, {
                                            start: 'transparent',
                                            end: 'transparent',
                                        }),
                                    label: 'Total Orders',
                                    pointBorderColor: 'transparent',
                                    pointBackgroundColor: '#8231D3',
                                    hoverBorderWidth: 5,
                                    lineTension: 0.45,
                                    // eslint-disable-next-line no-dupe-keys
                                    borderWidth: 3,
                                    hoverRadius: '6',
                                    pointRadius: 0,
                                    pointHoverRadius: 6,
                                    pointHitRadius: 30,
                                    pointStyle: 'circle',
                                    pointHoverBorderWidth: 2,
                                }
                                ]}
                                layout={{
                                    padding: {
                                        left: -10,
                                        right: -10,
                                    },
                                }}
                                scales={{
                                    y: {
                                        grid: {
                                            color: '#485e9029',
                                            borderDash: [3, 3],
                                            zeroLineColor: '#485e9029',
                                            zeroLineWidth: 1,
                                            zeroLineBorderDash: [3, 3],
                                            drawTicks: false,
                                            drawBorder: false,
                                            // eslint-disable-next-line no-dupe-keys
                                            zeroLineWidth: 3,
                                            borderWidth: 0,
                                        },
                                        ticks: {
                                            beginAtZero: true,
                                            font: {
                                                size: 13,
                                                family: "'Jost', sans-serif",
                                            },
                                            color: '#747474',
                                            max: 80,
                                            min: 50,
                                            stepSize: 20,
                                            padding: 10,

                                        },
                                    },
                                    x: {
                                        grid: {
                                            display: true,
                                            zeroLineWidth: 2,
                                            zeroLineColor: 'transparent',
                                            color: 'transparent',
                                            z: 1,
                                            tickMarkLength: 10,
                                            drawTicks: true,
                                            drawBorder: false,
                                        },
                                        ticks: {
                                            font: {
                                                size: 13,
                                                family: "'Jost', sans-serif",
                                            },
                                            color: '#747474',
                                            beginAtZero: true, // This will start the x-axis from zero
                                        },
                                    },
                                }}
                                // tooltip={{
                                //     custom: customTooltips,
                                //     callbacks: {
                                //         // title() {
                                //         //     return `Total Revenue`;
                                //         // },
                                //         label(t) {
                                //             const { formattedValue, dataset, } = t;
                                //             return `${dataset.label}: ${formattedValue}`;
                                //         },
                                //     },
                                // }}
                                height={window.innerWidth < 1399 ? (window.innerWidth < 575 ? 175 : 100) : 100}
                            />
                        </div>


                    </div>
                    : (
                        <div className='rounded-lg bg-white text-center shadow px-5 py-6 w-full h-[40vh] grid place-items-center justify-center'>
                            <SpinIcon className="animate-spin" />
                        </div>

                    )
            }
        </>

    )
}


export default OrdersLineChart