import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CenterInfo from './CenterInfo';
import Container from '@material-ui/core/Container'
import Masonry from 'react-masonry-css'

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
                    setCenter(data.sessions)
                    setFoundCenter(true)
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


    return (

        <Container>
            <TextField
                className={classes.field}
                id="outlined-basic"
                type="text"
                label="Pincode"
                variant="outlined"
                onChange={(e) => check(e.target.value)}
                color='secondary'
                required
            />

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
                </Container> : null

            }

        </Container>
    )
}
