'use strict'
const couchbase = require('couchbase');
const app       = require('./app');
const cluster   = new couchbase.Cluster(`${app.couchbase.host}:${app.couchbase.post}`);
const bucket    = cluster.openBucket(app.couchbase.bucket, app.couchbase.password);


bucket.upsert("PING", {}, (err, res) => {
    if (err) {
        console.log('Fail 1');
    } else {
        bucket.remove("PING", (err, res) => {
            if (err) {
                console.log("Fail 2");
            } else {
                console.log("Couchbase connected");
            }
        })
    }
});

module.exports = bucket;