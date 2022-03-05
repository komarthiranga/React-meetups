import MeetupDetails from "../../components/meetups/MeetupDetails";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

const MeetupDetailsPage = (props) => {
  return (
    <Fragment>
        <Head>
            <title>{props.meetupData.title}</title>
            <meta type="description" content={props.meetupData.title} />
        </Head>
      <MeetupDetails
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://reduxranga:ReactAngular123@cluster0.4mrlw.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const collection = db.collection("meetups");
  const meetups = await collection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetUpId = context.params.meetupId;
  console.log(meetUpId);
  const client = await MongoClient.connect(
    "mongodb+srv://reduxranga:ReactAngular123@cluster0.4mrlw.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const collection = db.collection("meetups");
  const selectedMeetup = await collection.findOne({ _id: ObjectId(meetUpId) });
  client.close();
  const modifiedObj = {};
  for (const key in selectedMeetup) {
    if (key === "_id") {
      modifiedObj[key] = selectedMeetup[key].toString();
    } else {
      modifiedObj[key] = selectedMeetup[key];
    }
  }
  return {
    props: {
      meetupData: modifiedObj,
    },
  };
}

export default MeetupDetailsPage;
