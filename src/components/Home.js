import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Container from '@material-ui/core/Container'
import Masonry from 'react-masonry-css'
import DoughnutChart from './Charts/DoughnutChart'
import VaccinatedPeople from './Charts/VaccinatedPeople'
import LineChartExample from './Charts/LineChart'
import axios from 'axios'

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

    const [cured, setCured] = useState([])
    const [death, setDeath] = useState([])
    const [confirmed, setConfirmed] = useState([])
    const [label, setLabel] = useState([])


    const fetchData = () => {
        const vaccine_api = 'https://raw.githubusercontent.com/datameet/covid19/master/data/mohfw_vaccination_status.json';
        const country_api = 'https://disease.sh/v3/covid-19/countries/india';
        const all_total_api = 'https://raw.githubusercontent.com/datameet/covid19/master/data/all_totals.json';

        const get_vaccinated_data = axios.get(vaccine_api)
        const get_country_data = axios.get(country_api)
        const get_all_total_data = axios.get(all_total_api)

        axios.all([get_vaccinated_data, get_country_data, get_all_total_data])
            .then(axios.spread((...allData) => {
                const data_vaccinated = allData[0]
                const data_country = allData[1]
                const data_all = allData[2]

                let ans1 = data_vaccinated.data.rows;
                Object.keys(ans1);
                // console.log(ans1[Object.keys(ans1)[Object.keys(ans1).length - 1]].value.total)
                setTotalVaccinatedPop(ans1[Object.keys(ans1)[Object.keys(ans1).length - 1]].value.total)
                setCountryData(data_country.data)


                // all total data
                let ans = data_all.data.rows;
                setLineChartData(ans)
                Object.keys(ans);
                setTodayCases(ans[Object.keys(ans)[Object.keys(ans).length - 1]].value - ans[Object.keys(ans)[Object.keys(ans).length - 5]].value);
                setTodayDeath(ans[Object.keys(ans)[Object.keys(ans).length - 2]].value - ans[Object.keys(ans)[Object.keys(ans).length - 6]].value);
                setTodayRecovered(ans[Object.keys(ans)[Object.keys(ans).length - 3]].value - ans[Object.keys(ans)[Object.keys(ans).length - 7]].value);

                let temp1 = []
                let temp2 = []
                let temp3 = []
                let temp4 = []
                // temp4.push(ans[0].key[0].substring(0, 10))
                // temp1.push(ans[0 + 1].value)
                // temp2.push(ans[0 + 2].value)
                // temp3.push(ans[0 + 3].value)
                for (let i = 480; i < ans.length; i += 4) {
                    temp4.push(ans[i].key[0].substring(0, 10))
                    // console.log(ans[i].key[0].substring(0,10))

                    if (ans[i + 1].value - ans[i + 1 - 4].value < 0 || ans[i + 2].value - ans[i + 2 - 4].value < 0 || ans[i + 3].value - ans[i + 3 - 4].value < 0) {
                        continue
                    }
                    else {
                        temp1.push(ans[i + 1].value - ans[i + 1 - 4].value)
                        temp2.push(ans[i + 2].value - ans[i + 2 - 4].value)
                        temp3.push(ans[i + 3].value - ans[i + 3 - 4].value)
                    }
                }
                setCured(temp1)
                setDeath(temp2)
                setConfirmed(temp3)
                setLabel(temp4)

            })
            )
    }

    const [lineChartData, setLineChartData] = useState([])

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <Container style={{ marginTop: '20px' }}>
            <Masonry
                breakpointCols={breakpoints}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">

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

            {lineChartData !== [] ?
                <Container style={{ marginBottom: "40px" }}>
                    <LineChartExample cured={cured} death={death} confirmed={confirmed} label={label} />
                </Container> : null
            }


        </Container >
    )
}
