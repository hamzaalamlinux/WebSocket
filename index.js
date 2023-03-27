const express = require("express");
const app = express();

const http = require("http");
const WebSocket = require("ws");
const port = process.env.PORT || 9001;
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", function connection(ws)
{
    ws.on("message", function incoming(message, isBinary)
    {
        console.log(message.toString(), isBinary);

        wss.clients.forEach(function each(client)
        {
            if (client.readyState === WebSocket.OPEN)
            {
                console.log("done");
                client.send(message.toString());
                
            }
        });
    });
});

app.get("/", (req, res) =>
{
    res.send("Hello World!");
});

server.listen(port, () =>
{
    console.log("Listening to port 9001");
});