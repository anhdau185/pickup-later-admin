import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

const processChartData = data => ({
    labels: data.map(({ date }) => new Date(date).toLocaleDateString()),
    datasets: [{
        label: 'Total Orders',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        borderColor: 'rgba(46, 184, 92, 1)',
        borderWidth: 2,
        lineTension: 0.2,
        yAxisID: 'A',
        data: data.map(({ totalOrder }) => totalOrder)
    },
    {
        label: 'Total Order Amount',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        borderColor: 'rgba(229, 83, 83, 1)',
        borderWidth: 2,
        lineTension: 0.2,
        yAxisID: 'B',
        data: data.map(({ totalAmount }) => totalAmount)
    }]
});

const SaleAvenueChart = ({ data }) => {
    return (
        <Line
            data={processChartData(data)}
            options={{
                title: {
                    display: true,
                    text: 'Sale Avenue and Total Orders for the Last Few Days ',
                    fontSize: 16
                },
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        id: 'A',
                        ticks: {
                            beginAtZero: true,
                            stepSize: 1,
                            suggestedMax: 5,
                        }
                    },
                    {
                        id: 'B',
                        ticks: {
                            beginAtZero: true,
                            suggestedMax: 50000,
                        }
                    }]
                },
                plugins: {
                    datalabels: {
                        display: true,
                        color: 'rgba(0, 0, 0, 1)',
                        anchor: 'end',
                        align: 'start',
                        offset: 6
                    }
                }
            }}
        />
    );
};

export default SaleAvenueChart;
