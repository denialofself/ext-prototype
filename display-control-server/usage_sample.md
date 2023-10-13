## Socket.io

Flask socket.io is used to respond to API events with changes to the browser side javascript.

## Starting the Flask Server

1. Open a terminal window and navigate to the directory containing the `control.py` file.

2. Run the following command to start the Flask server:

   ```
   python control.py
   ```

   This will start both the flask server and a background socket thread. The background thread listens for socket communication on `localhost:8000`; configured on line 36 of control.py

3. Open a web browser and navigate to `http://localhost:5000` to view the home page.

## Testing the `display_image` Command with `Test-SocketServer.ps1`
1. Drop an image .jpg into the static directory. The Flask server operates by using a long-lived websocket to the `display_responder.js` file loaded by the browser when the route `http://localhost:5000` is loaded. When Flask receives data from the tcp socket server thread it will emit an event to the client side javascript. 

2. Run the powershell script `Test-SocketServer.ps1`

3. The socket server will receive the request, drop the data onto the data_queue Queue() and then a separate background thread reads the queue and POSTS to the flask server to emit events to the client side javascript

3. The client-side JavaScript code in the file `display_responder.js` receive the `image_updated` event and update the `media-container` div with the new image, set a 5 second timer to clear then image, then continue to process events it receives from the Flask server.
