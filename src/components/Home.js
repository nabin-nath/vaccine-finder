import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Container from '@material-ui/core/Container'
import Masonry from 'react-masonry-css'
import DoughnutChart from './Charts/DoughnutChart'
import VaccinatedPeople from './Charts/VaccinatedPeople'
import LineChartExample from './Charts/LineChart'

const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
};

export default function Home() {

    const [countryData, setCountryData] = useState([]);
    const [totalVaccinatedPop, setTotalVaccinatedPop] = useState(0);
    const [todayCases, setTodayCases] = useState(0)
    const [todayDeath, setTodayDeath] = useState(0)
    const [todayRecovered, setTodayRecovered] = useState(0)


    const [active_cases, setActiveCases] = useState([])
    const [cured, setCured] = useState([])
    const [death, setDeath] = useState([])
    const [confirmed, setConfirmed] = useState([])
    const [label, setLabel] = useState([])

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


    const [lineChartData, setLineChartData] = useState([])

    // test data
    useEffect(() => {
        fetch('https://raw.githubusercontent.com/datameet/covid19/master/data/all_totals.json')
            .then((res) => res.json())
            .then((data) => {
                // console.log(data.rows)
                let ans = data.rows;
                setLineChartData(ans)
                Object.keys(ans);
                setTodayCases(ans[Object.keys(ans)[Object.keys(ans).length - 1]].value - ans[Object.keys(ans)[Object.keys(ans).length - 5]].value);
                setTodayDeath(ans[Object.keys(ans)[Object.keys(ans).length - 2]].value - ans[Object.keys(ans)[Object.keys(ans).length - 6]].value);
                setTodayRecovered(ans[Object.keys(ans)[Object.keys(ans).length - 3]].value - ans[Object.keys(ans)[Object.keys(ans).length - 7]].value);

                console.log(ans[1452].value)

                let temp = []
                let temp1 = []
                let temp2 = []
                let temp3 = []
                let temp4 = []
                temp4.push(ans[0].key[0].substring(0, 10))
                temp.push(ans[0].value)
                temp1.push(ans[0 + 1].value)
                temp2.push(ans[0 + 2].value)
                temp3.push(ans[0 + 3].value)
                for (let i = 4; i < ans.length; i += 4) {
                    temp4.push(ans[i].key[0].substring(0, 10))
                    // console.log(ans[i].key[0].substring(0,10))
                    temp.push(ans[i].value - ans[i - 4].value)
                    temp1.push(ans[i + 1].value - ans[i + 1 - 4].value)
                    temp2.push(ans[i + 2].value - ans[i + 2 - 4].value)
                    temp3.push(ans[i + 3].value - ans[i + 3 - 4].value)
                }
                setActiveCases(temp)
                setCured(temp1)
                setDeath(temp2)
                setConfirmed(temp3)
                setLabel(temp4)
                // console.log(active_cases)
            })
            .catch((e) => console.log(e))
    }, [])


    return (
        <Container>
            {lineChartData !== [] ?
                <Container style={{ marginBottom: "40px" }}>
                    <LineChartExample active={active_cases} cured={cured} death={death} confirmed={confirmed} label={label} />
                </Container> : null
            }

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

                <Card elevation={1} style={{ paddingBottom: '10px' }}>
                    <CardHeader
                        title={countryData.country}
                        subheader="Total data"
                    />
                    <DoughnutChart active={countryData.active} recovered={countryData.recovered} death={countryData.deaths} total={countryData.cases} />
                </Card>

                <Card elevation={1} style={{ paddingBottom: '10px' }}>
                    <CardHeader
                        title={countryData.country}
                        subheader="Today's data"
                    />
                    <DoughnutChart recovered={todayRecovered} death={todayDeath} total={todayCases} />
                </Card>

                <Card elevation={1} style={{ paddingBottom: '10px' }}>
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
