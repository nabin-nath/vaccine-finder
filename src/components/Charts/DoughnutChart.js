import React from 'react'
import { Doughnut } from 'react-chartjs-2'

export default function DoughnutChart(props) {

    const data = {
        labels: ['Confirmed', 'Recovered', 'Death', 'Active'],
        datasets: [
            {
                label: 'Covid data of India',
                data: [props.total, props.recovered, props.death, props.active],
                backgroundColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54,162,235,1)',
                    'rgba(83, 83, 82, 1)',
                    'rgba(101, 210, 146, 1)'
                ]
            }
        ]

    }

    const options = {
        title: {
            display: true,
            text: 'Doughnut Chart'
        }
    }

    return (

        <Doughnut data={data} options={options} />

    )
}
