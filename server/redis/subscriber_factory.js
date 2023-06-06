const redis = require('redis');
const convertStrAb = require('../helper/convert_str_ab')

function createSubscriber(redis_info, app) {
    const subscriber = redis.createClient(redis_info);
    subscriber.connect();

    subscriber.subscribe('message', sData => {
        let data = JSON.parse(sData)
        app.publish(data.room, convertStrAb.str2ab(data.message), true);
    })
    return subscriber;
}

module.exports = {createSubscriber}