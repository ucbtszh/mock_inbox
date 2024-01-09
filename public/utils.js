// listen for the msg from Inbox.vue
window.addEventListener("message", (event) => {
  // NOTE: we assume here that the parent Inbox component only posts one specific message!
  // call this function once you get the msg from the parent
  var origin = event.origin || event.originalEvent.origin; // For Chrome, the origin property is in the event.originalEvent object.
  if (
    !(
      origin === "https://mock-inbox.web.app" ||
      origin === "http://localhost:8080"
    )
  ) {
    console.log("message origin not allowed");
  } else {
    let URLs = document.getElementsByTagName("a");

    for (let i = 0; i < URLs.length; i++) {
      let url = URLs[i];
      url.onclick = function () {
        event.source.window.postMessage(url.href, "*"); // send msg back to parent
      };
      // url.removeEventListener("click", handler...) // TODO: we need to "turn off" listening to the URL clicks after an e-mail has been labelled to prevent storing too many events!
    }
  }
}, false);
