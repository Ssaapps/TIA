import React from 'react'
import { chartLinearGradient, customTooltips } from '../../../Shared/Component/Chart/utilities';
import DashboardChart from '../../../Shared/Component/Chart/DashboardChart';


function OrdersLineChart() {
    const ordersData = {
        orders: [[0, 25, 20, 5, 60, 18, 20, 45, 35, 50, 48, 45], [20, 40, 55, 26, 40, 55, 38, 35, 25, 70, 20, 80]],
        totalOrder: '8550',
        orderGrowth: '25',
        totalSales: '5550',
        salesDown: '15',
        labels: ['Jan', 'Feb', 'Mar', 'App', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    };

    return (
        <div className='rounded-lg bg-white text-center shadow px-5 py-6'>
            <h4 className='text-2xl  mb-4 font-medium'>Orders Trend</h4>

            <div className="flex items-center justify-center ssm:flex-col ssm:gap-y-[15px]">
                <div className="relative flex items-center mx-3 gap-[15px]">
                    <span className="flex items-center ltr:pl-3 rtl:pr-3 text-sm text-body dark:text-white60 before:absolute before:bg-primary before:w-2 before:h-2 before:rounded-full ltr:before:left-0 rtl:before:right-0 before:top-1/2 before:-translate-y-2/4">
                        Orders
                    </span>
                    <span className="inline-block text-dark dark:text-white87 ltr:mr-1 rtl:ml-1 ltr:ml-2.5 rtl:mr-2.5 text-22 font-semibold">
                        $8,550
                    </span>

                </div>

            </div>
            <div className="mt-3 hexadash-chart-container">
                <DashboardChart
                    type="line"
                    id="hexadash-sales-revenue"
                    labels={ordersData.labels}
                    datasets={[{
                        data: ordersData.orders[1],
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
                                callback(label) {
                                    return `${label}k`;
                                },
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
                            },
                        },
                    }}
                    tooltip={{
                        custom: customTooltips,
                        callbacks: {
                            title() {
                                return `Total Revenue`;
                            },
                            label(t) {
                                const { formattedValue, dataset } = t;
                                return `${dataset.label}: ${formattedValue}k`;
                            },
                        },
                    }}
                    height={window.innerWidth < 1399 ? (window.innerWidth < 575 ? 175 : 100) : 100}
                />
            </div>
        </div>
    )
}

export default OrdersLineChart