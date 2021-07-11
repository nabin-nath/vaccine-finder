import React from 'react'
import { Doughnut } from 'react-chartjs-2'

export default function VaccinatedPeople(props) {

    const data = {
        labels: ['Vaccinated Population', 'Left Population'],
        datasets: [
            {
                label: 'Vaccination data of India',
                data: [props.current, `${props.total - props.current}`],
                backgroundColor: [
                    'rgba(101, 210, 146, 1)',
                    'rgba(255,99,132,1)'
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
