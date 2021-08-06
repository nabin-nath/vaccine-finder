import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CenterInfo from './CenterInfo';
import Container from '@material-ui/core/Container'
import Masonry from 'react-masonry-css'
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';


import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        width: '40%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function State() {

    const classes = useStyles();
    const [id, setID] = React.useState('');
    const [districtID, setDistrictId] = useState('');
    const [selectedState, setSelectedState] = React.useState(true);
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([])
    const [isSelected, setIsSelected] = useState(false);
    const [center, setCenter] = useState([]);
    const [notFound, setNotFound] = useState(false)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        fetch('https://cdn-api.co-vin.in/api/v2/admin/location/states')
            .then((res) => res.json())
            .then((data) => {
                return setStates(data.states)
                // console.log(states)
            })
            .catch((e) => console.log(e))
    }, [])

    const handleChangeState = (event) => {
        setID(event.target.value);
        // console.log(event.target.value)
        setSelectedState(false);
        getDistricts(event.target.value);
        setCenter([])
    };

    const getDistricts = (districtId) => {
        // console.log('i am here and the id is:', districtId);
        fetch(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${districtId}`)
            .then((res) => res.json()
            ).then((data) => {
                setDistricts(data.districts)
            })
            .catch((e) => console.log(e));
    }

    const handleChangeDistrict = (event) => {
        setDistrictId(event.target.value);
        getCenters(event.target.value);
    }

    const getCenters = (districtID) => {
        setLoading(true)
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '-' + mm + '-' + yyyy;
        // console.log(today, districtID);
        fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${districtID}&date=${today}`)
            .then((res) => res.json())
            .then((data) => {
                setCenter([])
                setLoading(false)
                setCenter(data.sessions)
                return data
            }).then((data) => {
                setNotFound(false)
                if (data.sessions.length === 0) {
                    setIsSelected(false)
                    setNotFound(true)
                }
                else setIsSelected(true)

            })
            .catch((e) => console.log(e));
    }

    const breakpoints = {
        default: 3,
        1100: 2,
        700: 1
    };

    const breakpoints1 = {
        default: 1,
        1100: 1,
        700: 1
    };


    return (
        <Container style={{ marginTop: '20px' }}>
            <Container style={{ marginBottom: '10px', textAlign: 'center' }}>
                <FormControl variant="filled" className={classes.formControl} required>
                    <InputLabel id="demo-simple-select-filled-label">Select State</InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={id}
                        onChange={handleChangeState}
                    >
                        {
                            states.map((item) => <MenuItem value={item.state_id}>{item.state_name}</MenuItem>)
                        }
                    </Select>
                </FormControl>

                <FormControl variant="filled" className={classes.formControl} disabled={selectedState}>
                    <InputLabel id="demo-simple-select-filled-label">Select District</InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={districtID}
                        onChange={handleChangeDistrict}
                    >
                        {
                            districts.map((item) => <MenuItem value={item.district_id}>{item.district_name}</MenuItem>)
                        }
                    </Select>
                </FormControl>
            </Container>
            {loading ? <Container><h2>Loading centers....</h2></Container> : null}
            {notFound === true ?
                <Container>
                    <Masonry
                        breakpointCols={breakpoints1}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column">
                        <div>
                            <Card elevation={1} style={{ backgroundColor: '#e57373' }}>
                                <CardHeader
                                    title="No Vaccination Center is available for booking"
                                    subheader="*If you have selected a state and district"
                                />
                            </Card>

                        </div>
                    </Masonry>
                </Container>
                : null
            }
            {isSelected === true ?
                <Container>
                    <Masonry
                        breakpointCols={breakpoints}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column">
                        {center.map(item => (
                            <div key={item.center_id}>
                                <CenterInfo name={item.name} vaccine={item.vaccine} address={item.address} available={item.available_capacity} availableDose1={item.available_capacity_dose1} availableDose2={item.available_capacity_dose2} agelimit={item.min_age_limit} />
                            </div>
                        ))}
                    </Masonry>
                </Container> :
                <Container>
                    <Masonry
                        breakpointCols={breakpoints1}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column">
                        <div>
                            <Card elevation={1} style={{ backgroundColor: 'lightblue' }}>
                                <CardHeader
                                    title="On-site registration and vaccination services are now available."
                                    subheader="Slots are updated by state vaccination centers and private hospitals everyday at 8AM, 12PM, 4PM & 8PM."
                                />
                                <CardContent>
                                    <Typography variant="h6" color="textSecondary">
                                        Note:
                                    </Typography>
                                    <Typography variant="p" color="textSecondary">
                                        <DirectionsWalkIcon />Walk-in available at all vaccination centers – both Government and Private centers for all people aged 18 years or above. For slot availability and timing of walk-ins, please contact the vaccination center directly. However, it is recommended that you book your appointment online for convenience.
                                    </Typography><br></br>
                                </CardContent>
                            </Card>

                        </div>
                    </Masonry>
                </Container>
            }
        </Container>
    );
}
