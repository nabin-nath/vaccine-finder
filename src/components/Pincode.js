import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CenterInfo from './CenterInfo';
import Container from '@material-ui/core/Container'
import Masonry from 'react-masonry-css'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block'

    }
})

export default function Pincode() {
    const classes = useStyles();
    const [pin, setPin] = useState('');
    const [center, setCenter] = useState([]);
    const [foundCenter, setFoundCenter] = useState(false);


    function check(val) {
        var reg = /^\d+$/;
        if (reg.test(val) && val.toString().length === 6) {
            // console.log(true)
            setPin(val);

            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = dd + '-' + mm + '-' + yyyy;


            fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${val}&date=${today}`)
                .then((res) => res.json())
                .then((data) => {
                    setCenter([])
                    if (data.sessions.length !== 0) {
                        setCenter(data.sessions)
                        setFoundCenter(true)
                    }
                    // console.log(data.sessions)


                })
                .catch((e) => console.log(e));
        }

        else {
            setCenter([]);
            setFoundCenter(false);
        }


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

            <Container style={{ alignItems: 'center' }}>
                <TextField
                    className={classes.field}
                    id="filled-basic"
                    type="text"
                    label="Pincode"
                    variant="filled"
                    onChange={(e) => check(e.target.value)}
                    color='secondary'
                    required
                />
            </Container>
            {foundCenter === true ?
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
                </Container> : <Container>
                    <Masonry
                        breakpointCols={breakpoints1}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column">
                        <div>
                            <Card elevation={1} style={{ backgroundColor: 'lightblue' }}>
                                <CardHeader
                                    title="No Vaccination Center is available for booking"
                                    subheader="*Either enter a valid pin or there is no vaccination center on the entered pincode"
                                />
                                <CardContent>
                                    <Typography variant="h6" color="textSecondary">
                                        Note:
                                    </Typography>
                                    <Typography variant="p" color="textSecondary">
                                        On-site registration and vaccination services are now available.
                                    </Typography><br></br>
                                    <br></br>
                                    <Typography variant="p" color="textSecondary">
                                        Slots are updated by state vaccination centers and private hospitals everyday at 8AM, 12PM, 4PM & 8PM.
                                    </Typography>
                                </CardContent>
                            </Card>

                        </div>
                    </Masonry>
                </Container>

            }

        </Container>
    )
}
