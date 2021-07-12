import React, { useState, useEffect } from 'react';
import { Bar as LineChart } from 'react-chartjs-2';
import { Line as Line } from 'react-chartjs-2';

function chartData(array_data) {

    return {
        labels: array_data.label,
        datasets: [
            {
                type: 'line',
                label: 'Confirmed',
                data: array_data.data1,
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(255,99,132,1)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                pointRadius: 0,
            },
            {
                label: 'Confirmed',
                data: array_data.data1,
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(255,99,132,1)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
            },
            {
                type: 'line',
                label: 'Recovered',
                data: array_data.data2,
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(54,162,235,1)',
                borderColor: 'rgba(54,162,235,1)',
                borderWidth: 1,
                pointRadius: 0

            },
            {
                label: 'Recovered',
                data: array_data.data2,
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(54,162,235,1)',
                borderColor: 'rgba(54,162,235,1)',
                borderWidth: 1,

            },
            {
                label: 'Death',
                data: array_data.data3,
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(83, 83, 82, 1)',
                borderColor: 'rgba(83, 83, 82, 1)',
                borderWidth: 1,

            },
            {
                type: 'line',
                label: 'Death',
                data: array_data.data3,
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(83, 83, 82, 1)',
                borderColor: 'rgba(83, 83, 82, 1)',
                borderWidth: 1,
                pointRadius: 0

            },
        ]
    }
}

const styles = {
    graphContainer: {
        padding: '15px'
    }
}

function LineChartExample(props) {

    // console.log(props.active)
    // console.log(props.cured)
    // console.log(props.death)
    // console.log(props.confirmed)
    // console.log(props.label)

    const array_data = {
        label: props.label,
        data1: props.confirmed,
        data2: props.cured,
        data3: props.death
    }

    return (
        <div style={styles}>
            <LineChart data={chartData(array_data)} />
        </div>
    )
}

export default LineChartExample;