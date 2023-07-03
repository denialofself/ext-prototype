import os
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/api/youtube_chat_logger', methods=['POST'])
@cross_origin()
def save_chat():
    data = request.get_json()
    file_path = os.environ.get('CHAT_FILE_PATH')
    if file_path:
        with open(file_path, 'a') as f:
            f.write(json.dumps(data))
            f.write('\n')
        response = jsonify({'message': 'JSON data saved to file'})
        return response
    else:
        return jsonify({'message': 'CHAT_FILE_PATH environment variable not set'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)