const publisherFactory = require('./redis/publisher_factory');
const subscriberFactory = require('./redis/subscriber_factory');
const appFactory = require('./uws/app_factory');

const redis_info = {
  socket: {
    host: 'redis',
    port: 6379
  }
}
const publisher = publisherFactory.createPublisher(redis_info)

const port = 3000;
const app =  appFactory.createApp(publisher);
app.listen(port, (listenSocket) => {
  if (listenSocket) {
    console.log('Listening to port ' + port);
  }
});

const subscriber = subscriberFactory.createSubscriber(redis_info, app)