function searchAndPrintValues(jsonObject, keys) {
  for (const key in jsonObject) {
    if (jsonObject.hasOwnProperty(key)) {
      const value = jsonObject[key];

      if (typeof value === 'object' && value !== null) {
        // Recursively search nested objects
        searchAndPrintValues(value, keys);
      } else if (keys.includes(key)) {
        // Print value if key is found
        console.log(`${key}: ${value}`);
      }
    }
  }
}

function printKeys(jsonString) {
  const jsonObject = JSON.parse(jsonString);

  for (const key in jsonObject) {
    if (jsonObject.hasOwnProperty(key)) {
      console.log(key);
    }
  }
}


function saveStringToFile(content, fileName) {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;

  // Programmatically click the link to trigger the download
  anchor.click();

  // Clean up the URL object
  URL.revokeObjectURL(url);
}

function saveJSONToFile(jsonObject, fileName) {
  const jsonString = JSON.stringify(jsonObject);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;

  // Programmatically click the link to trigger the download
  anchor.click();

  // Clean up the URL object
  URL.revokeObjectURL(url);
}


browser.devtools.panels.create("Network Logger", "", "devtools-panel.html");

const keysToSearch = ['text', 'authorName'];

function handleRequestFinished(request) {
    if (request.request.method === 'POST' && request.request.url.includes("youtube.com/youtubei/v1/live_chat/get_live_chat")) {
      console.log("MATCHED: METHOD: ", request.request.method, "URL: ", request.request.url);
      console.log(request);
      request.getContent().then(([content, mimeType]) => {
      const jsonObject = JSON.parse(content);
      console.log("Got content as type: ", Object.prototype.toString.call(content))
      // console.log("JSON CONTENT: ", jsonContentString);
      // searchAndPrintValues(content, keysToSearch);
      saveJSONToFile(jsonObject, `D:\\temp\\LOGS\\output-${request.startedDateTime}.json`);
      });   
    }
    //   
}
  
browser.devtools.network.onRequestFinished.addListener(handleRequestFinished);