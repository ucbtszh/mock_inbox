window.addEventListener("message", scanEml, false);

function scanEml(event) {
  var origin = event.origin || event.originalEvent.origin; // For Chrome, the origin property is in the event.originalEvent object.
  //   console.log("origin received in mail", origin)
  if (
    !(
      origin === "https://mock-inbox.web.app" ||
      origin === "http://localhost:8080"
    )
  ) {
    console.log("Origin not allowed or recognised.");
    return;
  } else {
    let URLRes = scanURLs();
    let NameRes = scanName();
    let result = { URLscan: URLRes, nameScan: NameRes };

    event.source.postMessage(result);
  }
}

function scanURLs() {
  let doc = document.body.innerHTML;
  let parser = new DOMParser();
  let docHTML = parser.parseFromString(doc, "text/html");
  let URLs = [...docHTML.getElementsByTagName("a")];

  let data = [];

  URLs.forEach((url) => {
    let link = new URL(url.href);

    data.push({
      urlRaw: link.href,
      urlDomain: link.hostname,
      urlDisplayTxt: url.innerText,
    });
  });
  // console.log("parsed URL data", data);
  return data;
}

function scanName() {
  let emlBody = document.body.innerHTML.split(/\r?\n/);
  let lastSent = emlBody[emlBody.length - 1];
  // console.log("last sentence", lastSent);

  return lastSent;
}
