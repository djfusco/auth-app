import db from "./db";

export default async function (req, res) {
    const id = req.body.uid;

    if (req.method === 'GET') {
    const params = {
        TableName: 'GUID'
      };
/*
    db.getItem(params, function (err, data) {
      if (err) {
        console.log('Error', err);
      } else {
        // send the json response from the callback
        res.json(data.Item);
      }
    });
*/

    var result = await db.scan(params).promise();
    console.log(JSON.stringify(result));


  } else if (req.method === 'PUT') {
    // Allow a blog post to update its likes (via a button) or views (on rendering)
  }
  res.statusCode = 201;
  return res.json(JSON.stringify(result));
}