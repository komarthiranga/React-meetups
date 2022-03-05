import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Fragment } from "react";

const NewMeetup = () => {
  const router = useRouter();
  const addMettupHandler = async(enteredMeetupDate) => { 
   
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupDate),
     headers: {
       'Content-Type': 'application/json'
     }
    });

    const responseData = await response.json();
    console.log(responseData);
    router.push('/');
  
  };

  return (
    <Fragment>
      <Head>
        <title>A New Meetup</title>
        <meta type="description" content="A New Meetup page" />
      </Head>
       <NewMeetupForm onAddMeetup={addMettupHandler} />
    </Fragment>
  );
};

export default NewMeetup;
