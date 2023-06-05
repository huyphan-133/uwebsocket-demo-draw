// npm install uNetworking/uWebSockets.js#v16.2.0
const uWS = require('uWebSockets.js');
const redis = require('redis');

const publisher = redis.createClient({
  socket: {
    host: 'redis',
    port: 6379
  }
});
publisher.connect();

const subscriber = publisher.duplicate();
subscriber.connect();

subscriber.subscribe('message', sData => {
  let data = JSON.parse(sData)
  app.publish(data.room, str2ab(data.message), true);
  // app.publish("drawing/canvas1", message, true);
})

// an "app" is much like Express.js apps with URL routes,
// here we handle WebSocket traffic on the wildcard "/*" route
const app = uWS.App().ws('/*', {  // handle messages from client

  open: (socket, req) => {
    /* For now we only have one canvas */
    console.log("Have client connecting!")
    socket.subscribe("drawing/canvas1");
  },
  message: (socket, message, isBinary) => {
    /* In this simplified example we only have drawing commands */
    publisher.publish('message', JSON.stringify({ room: "drawing/canvas1", message: ab2str(message) }));
  }
});

const port = 3000;
app.listen(port, (listenSocket) => {
  if (listenSocket) {
    console.log('Listening to port ' + port);
  }
});


function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

function str2ab(str) {
  var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

