import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

const CHART_LABEL = 'All-Time Best Sellers';

const processChartData = data => ({
    labels: data.map(({ name }) => name),
    datasets: [{
        label: CHART_LABEL,
        backgroundColor: 'rgba(249, 177, 21, 1)',
        data: data.map(({ quantity }) => quantity)
    }]
});

const BestSellersChart = ({ data }) => {
    return (
        <HorizontalBar
            data={processChartData(data)}
            options={{
                title: {
                    display: true,
                    text: CHART_LABEL,
                    fontSize: 16
                },
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    yAxes: [{
                        barThickness: 30
                    }]
                },
                plugins: {
                    datalabels: {
                        display: true,
                        color: 'rgba(255, 255, 255, 1)',
                        anchor: 'end',
                        align: 'start',
                        offset: 0
                    }
                }
            }}
        />
    );
};

export default BestSellersChart;
