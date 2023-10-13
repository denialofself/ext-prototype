from flask import Flask, render_template, request, jsonify, url_for
from flask_socketio import SocketIO, emit
import threading
import socket
from queue import Queue
import requests
import time
import json



# Define a FIFO list to store the received data
data_queue = Queue()

# Define a function to handle incoming data on the TCP socket
def handle_data(conn, addr):
    while True:
        data = conn.recv(1024)
        print(f"Got data: {data}")
        response = {'status': 'received'}
        if not data:
            break
        try:
            json_data = json.loads(data.decode())
            data_queue.put(json_data)
            response = {'status': 'success'}
        except Exception as e:
            response = {'status': 'error', 'message': str(e)}
        conn.sendall(json.dumps(response).encode())
    conn.close()

# Define a function to start the TCP server in a background thread
def start_server():
    print("starting server socket server")
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind(('localhost', 8000))
    server_socket.listen(1)
    while True:
        conn, addr = server_socket.accept()
        t = threading.Thread(target=handle_data, args=(conn, addr))
        t.daemon = True
        t.start()

# Define a function to monitor the queue and call the appropriate function
def monitor_queue():
    while True:
        event_data = data_queue.get()
        # Make a POST request to the /update route with the event data from the queue
        requests.post('http://localhost:5000/update', json=event_data)

# Define the Flask app
app = Flask(__name__)
socketio = SocketIO(app)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/update', methods=['POST'])
def update():
    data = request.get_json()
    if data['command'] == 'play_video':
        # Add code here to update the home page with new elements
        return jsonify({'status': 'success'})
    
    elif data['command'] == 'display_image':
        image_url = url_for('static', filename=data['image_filename'])
        socketio.emit('image_updated', {'image_url': image_url})
        return jsonify({'status': 'success'})
    
    else:
        return jsonify({'status': 'error', 'message': 'Invalid command'})

if __name__ == '__main__':

    # Start the TCP server in a background thread
    t = threading.Thread(target=start_server)
    t.daemon = True
    t.start()
    # Start the queue monitor in a background thread
    t2 = threading.Thread(target=monitor_queue)
    t2.daemon = True
    t2.start()

    # Start the Flask app
    flask_thread = threading.Thread(socketio.run(app, debug=True))
    flask_thread.start()


