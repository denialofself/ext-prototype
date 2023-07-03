browser.devtools.network.getHAR((harLog) => {
    harLog.entries.forEach((entry) => {
      console.log(entry.request.url);
    });
  });
  