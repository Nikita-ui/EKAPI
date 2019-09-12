import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ShareIcon from '@material-ui/icons/Share';
import cardimg from '../../Assets/SmallExpo.jpg';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import './EventList_Cards.css';
const EventCards=()=>{
    const useStyles = makeStyles(theme => ({
        card: {
          display: 'flex',
        },
        details: {
          display: 'flex',
          flexDirection: 'column',
        },
        content: {
          flex: '1 0 auto',
        },
        cover: {
          width: 151,
        },
        controls: {
          display: 'flex',
          alignItems: 'center',
          paddingLeft: theme.spacing(1),
          paddingBottom: theme.spacing(1),
        },
        playIcon: {
          height: 38,
          width: 38,
        },
      }));
        
        const classes = useStyles();
          
    return(
        <>
        <Card id="event_card" className={classes.card}>
            <CardMedia id="img1"
        className={classes.cover}
        image={cardimg}
        title="Live from space album cover"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
          PDMEX
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Pasay, Philippines
           </Typography>
          <Typography variant="subtitle1" color="textSecondary">
           20 Aug 2019
          </Typography>
        </CardContent>
        <div className={classes.controls}>
        <IconButton aria-label="play/pause">
        <ThumbUpOutlinedIcon className={classes.playIcon} />
          </IconButton>
          <IconButton aria-label="next">
          <ShareIcon className={classes.playIcon} />
          </IconButton>
        </div>
      </div>
       </Card>
   </>
  );
}



export default EventCards;
    
    
      
