import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from 'mongodb';
import Head from 'next/head';
import { Fragment } from "react";
const Homepage = ({meetups}) => {
  console.log('Home page...');
  return (
    <Fragment>
      <Head>
        <title>React Meetups page</title>
        <meta type="description" content="React Meetups page" />
      </Head>
      <MeetupList meetups={meetups} />
    </Fragment>
  );
};

export async function getStaticProps() {

  const client = await MongoClient.connect('mongodb+srv://reduxranga:ReactAngular123@cluster0.4mrlw.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();
  const collection = db.collection('meetups');
  const meetups = await collection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map( (meetup) => { return {
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString()
      } }),
      revalidate: 1
    }
  }
}

// export async function getServerSideProps() {
//   return {
//     props: {
//       meetups: DUMMY_MEETSUPS
//     }
//   }
// }

export default Homepage;
