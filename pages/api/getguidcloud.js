import { connectToDatabase } from "./_connector";

var hash = require('object-hash');

export default async (req, res) => {
  ///res.setHeader("Access-Control-Allow-Credentials", "true");
  ///res.setHeader("Access-Control-Allow-Origin", "*");
  ///res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  ///res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");

  const db = await connectToDatabase();

  if (req.body !== '' && req.body.uid !== undefined && req.body.uid !== '') {
    const valueGUID = hash(req.body.uid, {algorithm: 'md5'});
    
    const entry = await db.db('links_db').collection('links_collection').updateOne(
      {_id: req.body.uid}, 
      {$set: {GUID: valueGUID} },
      {upsert: true}  
      );

    res.statusCode = 201;
    return res.json({ guid: `${valueGUID}` });
  }
  res.statusCode = 409;
  res.json({ error: 'no_link_found', error_description: 'No link found'})
}

