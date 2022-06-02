import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {uploadImage,getImg} from "../actions/action";


const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
        marginLeft: '30%'
    },
    input: {
        display: 'none',
    },
    image: {
        position: 'relative',
        height: 300,
        width: 250,
        boxShadow: `0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)`,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageMarkedPrice': {
                backgroundColor: 'black',
            },
            '& $imageTitle': {
                border: '1px solid currentColor',
                backgroundColor: '#252525c2',
            }
        },
        margin: '20px 2%'
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
        transition: theme.transitions.create('background'),
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
    imageMarkedPrice: {
        padding: '5px',
        borderRadius: '5px',
        transition: theme.transitions.create('background'),
    },
    imageChangeButton: {
        marginTop: 20,
        marginLeft: 130
    },
    imageName: {
        marginTop: 20
    },
    finalText: {
        marginTop: 20,
        textAlign: 'center'
    }
}));

const ImageUploader = () => {

    const classes = useStyles();
    const [imagePreview, setImagePreview] = useState(null);
    const [imageData, setImageData] = useState(null);
    const [image, setImage] = useState(null);
    const [ch, setCh] = useState(null)
    const [resImg, setResImg] = useState(null);

    const handleUploadClick =  (event) => {
        let file = event.target.files[0];
        const imageData = new FormData();
        imageData.append('image', file);
        setImageData(imageData);
        setCh(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const uploadImageWithAdditionalData = async () => {
        let resImage = await uploadImage(imageData);
        console.log("Storage Successfull!")
        const img = await getImg(resImage.path);
        console.log("Retrive Successfull!");
        setResImg(URL.createObjectURL(ch))
    };


    return (
        <Container maxWidth="lg" className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    {imagePreview != null ? (<Card>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                image={imagePreview}
                            />
                        </CardActionArea>
                    </Card>):
                    <Typography className={classes.finalText}>Select An Image To Preview</Typography>
                   }
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="upload-profile-image"
                        type="file"
                        onChange={handleUploadClick}
                    />
                    <label htmlFor="upload-profile-image">
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.imageChangeButton}
                            component="span"
                        >
                            Change Image
                        </Button>
                    </label>
                  
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.imageChangeButton}
                        onClick={() => uploadImageWithAdditionalData()}
                    >
                        Upload Image
                    </Button>
                    {resImg == null ? (<Typography className={classes.finalText}>{image === null ? "Select An Image To Upload" : "Image Uploaded. Saved as " + image}</Typography>):
                      ( <Card>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                image={
                                    resImg }
                            />
                        </CardActionArea>
                    </Card>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

export default ImageUploader;