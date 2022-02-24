function notify() {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
      return;
    }

    else if (Notification.permission === "granted") {
      const notification = new Notification("Hi there!", {
        body: "this is my first notification",
      });
      return;
    }

    Notification.requestPermission(function (permission) {
      if (permission === "granted") {
        var notification = new Notification("Hi there!");
      }
    });
}