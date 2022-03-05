import { MongoClient } from 'mongodb';
async function handler(req, res){
  if(req.method === 'POST') {
    const data = req.body;
    const client = await MongoClient.connect('mongodb+srv://reduxranga:ReactAngular123@cluster0.4mrlw.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const mongodbCollections = db.collection('meetups');
    const result = await mongodbCollections.insertOne(data);
    client.close();
    res.status(201).json({'message': 'Inserted successfully'});
  }
}

export default handler;