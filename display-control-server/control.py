from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit

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
        image_url = data['image_url']
        socketio.emit('image_updated', {'image_url': image_url})
        return jsonify({'status': 'success'})
    
    else:
        return jsonify({'status': 'error', 'message': 'Invalid command'})

if __name__ == '__main__':
    socketio.run(app, debug=True)