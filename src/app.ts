// https://www.typescriptlang.org/docs/handbook/dom-manipulation.html

const message: string = "XAPI DB Viewer started";
console.log(message);

// Read the xapi db: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event

// xapidb is the input element
const xapidb_input = document.getElementById("xapidb");
if (xapidb_input) {
  console.log("xapi event set");
  xapidb_input?.addEventListener("input", loadXml);
} else {
  console.log("xapi element not found");
}

// The Event is created when the input is changed and is dispatched by
// the element that experienced it. So in our case the input element
// event.type -> the name of the event (here "input")
// event.target -> the element that triggered the event (our HTMLInputElement)
//
// async because we are using text() that is a promise
async function loadXml(e: Event) {
  console.log(e.type);
  console.log(e.target);

  const input = e.target as HTMLInputElement;
  // Now we need to read the file
  // https://developer.mozilla.org/en-US/docs/Web/API/FileList

  if (input.files && input.files.length > 0) {
    // https://developer.mozilla.org/docs/Web/API/Blob/text
    // https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString
    // https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
    // XML can be parsed
    // text() is a promise, so we need to add await
    // If we add await we need to say the function loadXml is async
    const text = await input.files[0].text();
    const xml = new DOMParser().parseFromString(text, "text/xml");
    console.log(xml);
    // TODO: parse xml
  }
}
