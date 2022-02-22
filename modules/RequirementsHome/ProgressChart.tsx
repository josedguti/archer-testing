import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';
import {useRef, useState, useEffect} from "react";






export default function ProgressChart() {
    const chartRef = useRef(null);
const [chartData, setChartData] = useState({
  datasets: [],
});



const options = {
  scales: {
			x: {
				grid: {
					display: false
				}
			},
			y: {
				grid: {
					display: false
				}
			},
		},
			responsive: true,
			elements: {
				point: {
					radius: 0
				},
			},
			plugins: {
				legend: {
					display: true
				},
				title: {
					display: false,
				}
			}
		};

const labels = ['10/21', '11/4', '11/18', '12/2', '12/16', '12/28'];

 const data = {
  labels,
  datasets: [
    {
                        type: "line" as const,
                        label: "Estimated Hours",
                        borderColor: "#f9d52e",
                        borderWidth: 2,
                        fill: false,
                        data: [10, 4, 7, 12, 6, 7],
                    },
                    {
                        type: "line" as const,
                        label: "Actual Hours",
                        borderColor: "#5200FF",
                        borderWidth: 2,
                        borderDash: [10, 5],
                        fill: false,
                        data: [12, 6, 7, 5, 2, 3],
                    },
                    {
                        label: 'Completed requirements per week',
                        data: [10, 12, 7, 12, 12, 11],
                        backgroundColor: "#C4C4C4"
                    },
                    {
                        label: 'New requirements per week',
                        data: [10, 7, 7, 8, 2, 6],
                        backgroundColor: "#5200FF"
                    }
  ]
};

    useEffect(() => {
        chartRef.current = data
           if (chartRef) {
             setChartData(chartRef.current);
           }
         }, []);
  return (
    <Chart type='bar' options={options} data={chartData} />
  );
}