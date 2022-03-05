
import classes from './MeetupDetails.module.css';
const MeetupDetails = ({title, description, image, address}) => {
    return(
        <section className={classes.details}>
            <img src={image} alt={title} />
            <h1>{title}</h1>
            <address>{address}</address>
            <p>{description}</p>
        </section>
    )
}

export default MeetupDetails;