// Connect to the server using SocketIO
const socket = io.connect('http://localhost:5000');

// Register a callback function to handle the image_updated event
socket.on('image_updated', function(data) {
    console.log('received data: ' + JSON.stringify(data));
    // Update the media container with the new image
    const mediaContainer = document.getElementById('media-container');
    const image = document.createElement('img');
    image.src = data.image_url;
    mediaContainer.innerHTML = '';
    mediaContainer.appendChild(image);
});