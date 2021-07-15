import React from 'react'
import Container from '@material-ui/core/Container'
import Masonry from 'react-masonry-css'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

export default function NotFound() {

    const breakpoints1 = {
        default: 1,
        1100: 1,
        700: 1
    };

    return (
        <Container style={{ marginTop: '20px' }}>
            <Masonry
                breakpointCols={breakpoints1}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
                <div>
                    <Card elevation={1} style={{ backgroundColor: '#e57373' }}>
                        <CardHeader
                            title="On-site registration and vaccination services are now available."
                            subheader="Slots are updated by state vaccination centers and private hospitals everyday at 8AM, 12PM, 4PM & 8PM."
                        />
                        <CardContent>
                            <Typography variant="h1" color="textSecondary">
                                404
                            </Typography>
                            <Typography variant="h2" color="textSecondary">
                                Page not found
                            </Typography>
                        </CardContent>
                    </Card>

                </div>
            </Masonry>
        </Container>
    )
}
