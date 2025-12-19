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

  if (!input.files || input.files.length === 0) {
    console.log("No file selected");
    return;
  }

  // https://developer.mozilla.org/docs/Web/API/Blob/text
  // https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString
  // https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
  // XML can be parsed
  // text() is a promise, so we need to add await
  // If we add await we need to say the function loadXml is async
  const text = await input.files[0].text();
  const xml: Document = new DOMParser().parseFromString(text, "text/xml");
  console.log(xml);

  // We will need a serializer to print XML element
  const ser = new XMLSerializer();

  // Note that xml is an XML DOM that has been created. It is not the HTML DOM.
  const viewer = document.getElementById("viewer");
  if (!viewer) {
    console.log("viewer element not found");
    return;
  }

  // TODO: parse all XML

  // First exercise: list all tables
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details
  // We will endup with
  // <details>
  //   <summary>Table: table_name (row_count rows)</summary>
  //   <div>todo: display row 0</div>
  //   <div>todo: display row 1</div>
  //   ...
  // </details>
  xml.querySelectorAll("table").forEach((table) => {
    const name = table.getAttribute("name");
    const count = table.querySelectorAll("row").length;

    // --- create a details element for the table
    const details = document.createElement("details");

    // --- Here is the summary element of the table
    const summary = document.createElement("summary");
    summary.textContent = `${name} (${count} rows)`;

    details.appendChild(summary);
    console.log(`Table ${name} has ${count} rows`);

    // --- now add rows as div for now
    renderRows(table, details);

    viewer.appendChild(details);
  });
}

function renderRows(
  table: HTMLTableElement,
  container: HTMLDetailsElement,
): void {
  table.querySelectorAll("row").forEach((row, index) => {
    // --- create a details element for the table
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = `Row ${index}`;
    details.appendChild(summary);

    // --- now the details
    console.log(row.attributes);

    Array.from(row.attributes).forEach((attr) => {
      const div = document.createElement("div");

      const nameSpan = document.createElement("span");
      nameSpan.textContent = attr.name;
      nameSpan.classList.add("attr-name");

      const valueSpan = document.createElement("span");
      valueSpan.textContent = attr.value;
      valueSpan.classList.add("attr-value");

      div.append("ENTRY: ", nameSpan, ": ", valueSpan);
      details.appendChild(div);
    });

    // --- finally add it to container
    container.appendChild(details);
  });
}
