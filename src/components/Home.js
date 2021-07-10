import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Container from '@material-ui/core/Container'
import Masonry from 'react-masonry-css'
import DoughnutChart from './Charts/DoughnutChart'
import VaccinatedPeople from './Charts/VaccinatedPeople'

const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
};

export default function Home() {

    const [countryData, setCountryData] = useState([]);
    const [totalVaccinatedPop, setTotalVaccinatedPop] = useState(0);

    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/countries/india')
            .then((res) => res.json())
            .then((data) => {
                // console.log(data)
                setCountryData(data)
            })
            .catch((e) => console.log(e));
    }, [])


    useEffect(() => {
        fetch('https://raw.githubusercontent.com/datameet/covid19/master/data/mohfw_vaccination_status.json')
            .then((res) => res.json())
            .then((data) => {
                // console.log(data.rows)
                let ans = data.rows;
                Object.keys(ans);
                // console.log(ans[Object.keys(ans)[Object.keys(ans).length - 1]].value.total)
                setTotalVaccinatedPop(ans[Object.keys(ans)[Object.keys(ans).length - 1]].value.total)

            })
            .catch((e) => console.log(e));
    }, [])

    return (
        <Container>
            <Masonry
                breakpointCols={breakpoints}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">

                {/* <Card elevation={1}>
                    <CardHeader
                        title={countryData.country}
                    />
                    <CardContent>
                        <Typography variant="h6" color="textSecondary">
                            Total available:
                        </Typography>
                        <Typography variant="p" color="textSecondary">
                            Dose-1:
                        </Typography><br />
                        <Typography variant="p" color="textSecondary">
                            Dose-2:
                        </Typography>
                        <Typography variant="h6" color="textSecondary">
                            Minimum age:
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            address
                        </Typography>
                    </CardContent>
                </Card> */}

                <Card elevation={1}>
                    <CardHeader
                        title={countryData.country}
                        subheader="Total data"
                    />
                    <DoughnutChart active={countryData.active} recovered={countryData.recovered} death={countryData.deaths} total={countryData.cases} />
                </Card>

                <Card elevation={1}>
                    <CardHeader
                        title={countryData.country}
                        subheader="Today's data"
                    />
                    <DoughnutChart recovered={countryData.todayRecovered} death={countryData.todayDeaths} total={countryData.todayCases} />
                </Card>

                <Card elevation={1}>
                    <CardHeader
                        title={countryData.country}
                        subheader="Total vaccinated data"
                    />
                    <VaccinatedPeople current={totalVaccinatedPop} total={countryData.population} />
                </Card>

            </Masonry>



        </Container >
    )
}
