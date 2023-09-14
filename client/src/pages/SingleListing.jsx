import { useParams } from 'react-router-dom';
import { searchbyID } from '../utils/API';
import { useState, useEffect } from 'react';
import { CardMedia, Typography, Button, Grid, Container, Stack, Box } from "@mui/material";
import Comments from '../components/Comments';
// zID is the id of the listing 
import "./pages.css"

const SingleListing = () => {
    const { zID } = useParams();
    const [data, setData] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await searchbyID(zID);
                setData(result);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [zID]);


    const handleNextImage = () => {
        if (data && currentImageIndex < data.big.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    const handlePrevImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    if (!data) {
        return (
            <Container>
                Loading...
            </Container>
        )
    } else {

        const currentImage = data.big[currentImageIndex].url;


        return (
            <Box mt={3}>
                <Container >
                    <Grid container spacing={2}>
                        <Grid item lg={6} >

                            <Box>
                                <CardMedia
                                    component="img"
                                    image={currentImage}
                                />
                            </Box>

                            <Stack direction="row" spacing={2}>
                                <Button onClick={handlePrevImage} disabled={currentImageIndex === 0}>
                                    Previous Image
                                </Button>
                                <Button onClick={handleNextImage} disabled={currentImageIndex === data.big.length - 1}>
                                    Next Image
                                </Button>
                            </Stack>
                        </Grid>
                        <Grid item lg={6}>


                            <Container >
                                <Typography gutterBottom variant="h5" component="div">
                                    Price: ${data.price.toLocaleString()}
                                </Typography>
                                <Typography gutterBottom variant="h6" component="div">
                                    Address: {data.address.streetAddress} , {data.address.city}, {data.address.state} {data.address.zipcode}
                                </Typography>
                                <Typography gutterBottom variant="body1" color="text.secondary">
                                    Number of bedrooms: {data.bedrooms}
                                </Typography>
                                <Typography gutterBottom variant="body1" color="text.secondary">
                                    Number of bathrooms: {data.bathrooms}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" >
                                    {data.description}
                                </Typography>
                            </Container>
                        </Grid>

                    </Grid>
                </Container>

                <div style={{margin:'4%'}}>
                    <Comments zId={zID} className="comments"/>
                </div>
            </Box>
        )

    }

}


export default SingleListing;