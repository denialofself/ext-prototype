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
  
browser.devtools.panels.create("Network Logger", "", "devtools-panel.html");
  

function handleRequestFinished(request) {
    console.log(request);
    console.log("Server IP: ", request.serverIPAddress);
    request.getContent().then(([content, mimeType]) => {
    console.log("Content: ", content);
    console.log("MIME type: ", mimeType);
    // saveStringToFile(content, "D:\\temp\\LOGS\\output.txt"); 
    });    
}
  
browser.devtools.network.onRequestFinished.addListener(handleRequestFinished);