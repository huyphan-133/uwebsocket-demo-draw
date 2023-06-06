// npm install uNetworking/uWebSockets.js#v16.2.0
const uWS = require('uWebSockets.js');
const convertStrAb = require('../helper/convert_str_ab');

function createApp(publisher) {
    const app = uWS.App().ws('/*', {  // handle messages from client
        open: (socket, req) => {
            /* For now we only have one canvas */
            console.log("Have client connecting!")
            socket.subscribe("drawing/canvas1");
        },
        message: (socket, message, isBinary) => {
            /* In this simplified example we only have drawing commands */
            publisher.publish('message', JSON.stringify({ room: "drawing/canvas1", message: convertStrAb.ab2str(message) }));
        }
    });
    return app;
}

module.exports = {createApp}