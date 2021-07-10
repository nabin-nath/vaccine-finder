import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

export default function CenterInfo(props) {

    let backgroundColor = {};
    if (props.available > 0) {
        backgroundColor = { backgroundColor: '#81c784' };
    }
    else {
        backgroundColor = { backgroundColor: '#e57373' };
    }

    return (
        <div>
            <Card elevation={1} style={backgroundColor}>
                <CardHeader
                    title={props.name}
                    subheader={props.vaccine}
                />
                <CardContent>
                    <Typography variant="h6" color="textSecondary">
                        Total available:{props.available}
                    </Typography>
                    <Typography variant="p" color="textSecondary">
                        Dose-1:{props.availableDose1}
                    </Typography><br />
                    <Typography variant="p" color="textSecondary">
                        Dose-2:{props.availableDose2}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                        Minimum age:{props.agelimit}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {props.address}
                    </Typography>
                </CardContent>
            </Card>

        </div>
    );
}
