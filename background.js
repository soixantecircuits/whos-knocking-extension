/*
  Displays a notification with the message. Requires "notifications"
  permission in the manifest file (or calling
  "webkitNotifications.requestPermission" beforehand).
*/

function init(){
  var socket = io.connect('http://whosknocking.herokuapp.com/');
          socket.on('new_tweet', function (data) {
            console.log(data);
            var time = /(..)(:..)/.exec(new Date());     // The prettyprinted time.
            var hour = time[1] % 12 || 12;               // The prettyprinted hour.
            var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.
            var notification = window.webkitNotifications.createNotification(
              'icon48.png',                      // The image.
              data.user.name + " is knocking !", // The title.
              data.text      // The body.
            );
            notification.show();
   });
   var notification = window.webkitNotifications.createNotification(
              'icon48.png',                      // The image.
              "Who's Knocking initialization ...", // The title.
              "Welcome ! Hope you will enjoy your daily knock knock."      // The body.
            );
            notification.show();
}
// Conditionally initialize the options.
if (!localStorage.isInitialized) {
  localStorage.isActivated = true;   // The display activation.
  localStorage.isInitialized = true; // The option initialization.
}

// Test for notification support.
if (window.webkitNotifications) {
    if (JSON.parse(localStorage.isActivated)) {
      init();

    }
}else{
  alert("Sorry you need to upgrade your system. It seems notification support is not enable.")
}
