// listen for the mssg
window.addEventListener("message", scanEml);

// call this function once you get the mssg
function scanEml(event) {
  console.log("hi scanEMl called");
  var origin = event.origin || event.originalEvent.origin; // For Chrome, the origin property is in the event.originalEvent object.
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
    // let NameRes = scanName();
    let result = { URLscan: URLRes } //, nameScan: NameRes };

    event.source.postMessage(result);
  }
}

function scanURLs() {
  let doc = document.body.innerHTML;
  let parser = new DOMParser();
  let docHTML = parser.parseFromString(doc, "text/html");
  let URLs = [...docHTML.getElementsByTagName("a")];

  let data = [];
  console.log('hey scanURLs is called');

  URLs.forEach((url) => {
    let link = new URL(url.href);

    let urlInfo = {
      urlRaw: link.href,
      urlDomain: link.hostname,
      urlDisplayTxt: url.innerText,
    };

    // add event listener to each url
    // in event handler, send mssg back to parent
    // url.addEventListener('click', () => {
    //   window.parent.postMessage({ clickedUrl: urlInfo.urlRaw }, '*');
    // });

    data.push(urlInfo);

  });
  // console.log("parsed URL data", data);
  return data;
}

// whenever clicked, send that click back to parent?

// function scanName() {
//   let emlBody = document.body.innerText.split(/\n/);
//   // console.log("inner HTML", emlBody);
  
//   // TODO: change to look for words not in common English dictionary -> names -> display as "names found in e-mail message"?
//   let lastSent = emlBody[emlBody.length - 1].split(/\s/)[0];
//   console.log("last sentence", lastSent);

//   return lastSent;
// }
