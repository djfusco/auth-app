import db from "./db";

export default async function (req, res) {
    const id = req.body.uid;
    var hash = require('object-hash');
    const valueID = hash(id, {algorithm: 'md5'});

    if (req.method === 'GET') {
        const params = {
            TableName: 'GUID',
            Key: {
                haxuguid: id
            }
        };
        var result = await db.get(params).promise();
        console.log(JSON.stringify(result));
        return res.json(result.Item.guid);

     } else if (req.method === 'PUT') {
        const params = {
            TableName: 'GUID',
            Item: {
                "haxuguid":  id,
                "guid": valueID
            }
        }
        var result = db.put(params, function(err, data) {
            if (err) {
              console.error("Can't add data");
            } else {
              console.log("Succeeded adding an item for: ", id, " with guid: ", valueID);
              return res.json(valueID);
            }
          });
    };
}