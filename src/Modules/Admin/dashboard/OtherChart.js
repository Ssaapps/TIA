import React from 'react';
import { useSelector } from 'react-redux';
import DashboardChart from '../../../Shared/Component/Chart/DashboardChart';


const OtherChart = React.memo(() => {
    const chartHeight = window.innerWidth <= 1699 ? (window.innerWidth <= 991 ? 200 : 200) : 300;
    const chartWidth = window.innerWidth <= 1699 ? (window.innerWidth <= 991 ? 200 : 200) : 300;
    const chartjsPieChart = {
        height: 150,
        width: window.innerWidth <= 575 ? 200 : 200,
        labels: ['Twitter', 'Google', 'Facebook'],
        datasets: [
            {
                data: [1540, 1540, 5346],
                backgroundColor: ['#00AAFF', '#8231D3', '#5840FF'],
            },
        ],
        scales: {
            x: {
                display: false,
            },
            y: {
                display: false,
            },
        },

        option: {
            borderColor: "#FFFFFF",
            maintainAspectRatio: true,
            responsive: false,
        },

        tooltip: {
            mode: 'index',
            callbacks: {
                label(t) {
                    const { dataset, label, dataIndex } = t;
                    return `  ${label} ${dataset.data[dataIndex]}`;
                },
                labelColor({ dataIndex, dataset }) {
                    return {
                        backgroundColor: dataset.backgroundColor[dataIndex],
                        borderColor: 'transparent',
                        color: '#0a0a0a',
                    };
                },
            },
        },
    };

    return (
        <div className="hexadash-chart-container flex items-center justify-between flex-wrap gap-y-[20px] py-[20px] sm:pt-0 px-[25px] 3xl:justify-center lg:justify-start md:justify-center gap-x-[20px] [&>.chartjs-tooltip>table>tbody>tr>td]:text-dark dark:[&>.chartjs-tooltip>table>tbody>tr>td]:text-white60">
            <DashboardChart {...chartjsPieChart} type="pie" id="pieChart" />
            {/* <div className="flex flex-wrap gap-x-[44px] gap-y-[22px] ssm:gap-x-[15px] ssm:gap-y-[15px] ssm:justify-center">
                <div>
                    <div className="flex items-center justify-center bg-info-transparent text-info w-[80px] h-[80px] mb-[10px] rounded-[10px]">
                        <UilTwitter />
                    </div>
                    <div className="text-center">
                        <span className="text-[15px] text-dark dark:text-white87 block font-medium">
                            {chartjsPieChart.labels[0]}
                        </span>
                        <span className="text-[14px] text-light dark:text-white60 block font-medium">
                            ${chartjsPieChart.datasets[0].data[0]}
                        </span>
                    </div>
                </div>
                <div>
                    <div className="flex items-center justify-center bg-danger-transparent text-danger w-[80px] h-[80px] mb-[10px] rounded-[10px]">
                        <ReactSVG src={GoogleIcon} />
                    </div>
                    <div className="text-center">
                        <span className="text-[15px] text-dark dark:text-white87 block font-medium">
                            {chartjsPieChart.labels[1]}
                        </span>
                        <span className="text-[14px] text-light dark:text-white60 block font-medium">
                            ${chartjsPieChart.datasets[0].data[1]}
                        </span>
                    </div>
                </div>
                <div>
                    <div className="flex items-center justify-center bg-secondary-transparent text-secondary w-[80px] h-[80px] mb-[10px] rounded-[10px]">
                        <UilFacebook />
                    </div>
                    <div className="text-center">
                        <span className="text-[15px] text-dark dark:text-white87 block font-medium">
                            {chartjsPieChart.labels[2]}
                        </span>
                        <span className="text-[14px] text-light dark:text-white60 block font-medium">
                            ${chartjsPieChart.datasets[0].data[2]}
                        </span>
                    </div>
                </div>
            </div> */}
        </div>
    );
});

export default OtherChart;
