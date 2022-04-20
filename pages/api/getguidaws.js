import db from "./db";

export default async function (req, res) {
    if (req.method === 'GET') {
        const id = req.query.uid;
        var hash = require('object-hash');
        const valueID = hash(id, {algorithm: 'md5'});

        const params = {
            TableName: 'GUID',
            Key: {
                haxuguid: id
            }
        };
        var result = await db.get(params).promise();
        if (result.Item){
            console.log(JSON.stringify(result));
            return res.json(result.Item.guid);
        }
        else {
            console.log(id, "Does not exist");
            return res.json("NA");
        }

     } else if (req.method === 'PUT') {
        const id = req.body.uid;
        var hash = require('object-hash');
        const valueID = hash(id, {algorithm: 'md5'});

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