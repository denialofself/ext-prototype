# Youtube chat reader extension

This is a simple Firefox browser extension and accompanying Flask app that allows you to save chat data to a file.

## Installation

1. Clone the repository:
```
git clone https://github.com/denialofself/ext-prototype.git
```

2. Install python requirements:
```
cd receiver
pip install -r requirements.txt
```

3. Load the Firefox extension:
   - Open Firefox and navigate to about:debugging.
   - Click the This Firefox tab.
   - Click the Load Temporary Add-on button.
   - Navigate to the extension directory in the project directory and select the manifest.json file.
   - The extension should now be loaded in Firefox.

4. Set env variables for the flask server app:
```
export FLASK_APP=app.py
export FLASK_ENV=development
export CHAT_FILE_PATH=/path/to/chat_log
flask run
```

5. Run the extension:
   - Open a new tab in the same firefox instance where you loaded the extension
   - Paste a direct link to the youtube live chat popout
   - Open the Browser tools (F12 on windows, function-F12 on mac)
   - In the Firefox debug tab, click Inspect on the extension

The extension inspect window should begin logging attempts to POST the JSON data to the python flask server. Successful POSTS should look as follows in the python console:
```
127.0.0.1 - - [03/Jul/2023 11:04:55] "POST /api/youtube_chat_logger HTTP/1.1" 200 -
127.0.0.1 - - [03/Jul/2023 11:04:56] "POST /api/youtube_chat_logger HTTP/1.1" 200 -
127.0.0.1 - - [03/Jul/2023 11:04:56] "POST /api/youtube_chat_logger HTTP/1.1" 200 -
127.0.0.1 - - [03/Jul/2023 11:04:57] "POST /api/youtube_chat_logger HTTP/1.1" 200 -
127.0.0.1 - - [03/Jul/2023 11:04:57] "POST /api/youtube_chat_logger HTTP/1.1" 200 -
127.0.0.1 - - [03/Jul/2023 11:04:57] "POST /api/youtube_chat_logger HTTP/1.1" 200 -
127.0.0.1 - - [03/Jul/2023 11:04:58] "POST /api/youtube_chat_logger HTTP/1.1" 200 -
127.0.0.1 - - [03/Jul/2023 11:04:58] "POST /api/youtube_chat_logger HTTP/1.1" 200 -
```

Note: Make sure to set the CHAT_FILE_PATH environment variable to the path of the file where you want to save the chat data. You can set this variable using the command export CHAT_FILE_PATH=/path/to/chat/file. Each POST should result in a single newline of JSON data to the file. 

