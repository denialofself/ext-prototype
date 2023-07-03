function saveJSONToServer(jsonObject, endpoint) {
  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonObject)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log('JSON data sent to server successfully');
  })
  .catch(error => {
    console.error('Error sending JSON data to server:', error);
    console.log('JSON data: ', jsonObject);
  });
}

browser.devtools.panels.create("Network Logger", "", "devtools-panel.html");

const keysToSearch = ['text', 'authorName'];

function handleRequestFinished(request) {
    if (request.request.method === 'POST' && request.request.url.includes("youtube.com/youtubei/v1/live_chat/get_live_chat")) {
      console.log("MATCHED: METHOD: ", request.request.method, "URL: ", request.request.url);
      request.getContent().then(([content, mimeType]) => {
      const jsonObject = JSON.parse(content);
      saveJSONToServer(jsonObject, 'http://localhost:5000/api/youtube_chat_logger');
      });   
    }
    //   
}
  
browser.devtools.network.onRequestFinished.addListener(handleRequestFinished);