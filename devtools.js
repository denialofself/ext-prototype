function saveStringToFile(base64String, fileName) {
    const decodedString = atob(base64String);
    const blob = new Blob([decodedString], { type: 'text/plain' });
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
  

  function handleRequestFinished(request) {
    if (request.method === 'POST') {
        console.log(request);
        console.log("Server IP: ", request.serverIPAddress);
        request.getContent().then(([content, mimeType]) => {
        console.log("Content: ", content);
        console.log("MIME type: ", mimeType);
        if (mimeType === 'application/json') {
            const newString = JSON.stringify(content);
            saveStringToFile(newString, "D:\\temp\\LOGS\\output.txt");
        }  
    });
  }
}
  
  browser.devtools.network.onRequestFinished.addListener(handleRequestFinished);