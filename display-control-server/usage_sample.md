## Socket.io

Flask socket.io is used to respond to API events with changes to the browser side javascript.

GitHub Copilot: Sure! Here's the documentation in Markdown format:

## Starting the Flask Server

1. Open a terminal window and navigate to the directory containing the `control.py` file.

2. Run the following command to start the Flask server:

   ```
   python control.py
   ```

   This will start the server and listen for incoming requests on `http://localhost:5000`.

3. Open a web browser and navigate to `http://localhost:5000` to view the home page.

## Testing the `display_image` Command with `curl`

1. Open a terminal window and run the following command to send a `POST` request to the `/update` endpoint of the Flask server:

   ```
   curl -X POST -H "Content-Type: application/json" -d '{"command": "display_image", "image_url": "https://i.imgur.com/8TtzUNt.jpeg"}' http://localhost:5000/update
   ```

   This will send a `POST` request to the Flask server with a JSON payload containing the `command` field set to `"display_image"`, and the `image_url` field set to `"https://example.com/image.jpg"`.

2. The Flask server will receive the request and emit an `image_updated` event to all connected clients using SocketIO.

3. The client-side JavaScript code that we discussed earlier will receive the `image_updated` event and update the `media-container` div with the new image.

4. Refresh the web browser to see the updated `media-container` div with the new image.

I hope this helps! Let me know if you have any other questions.