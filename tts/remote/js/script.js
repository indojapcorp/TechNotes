// Load CSV file data into table
fetch("data/data.csv")
  .then(response => response.text())
  .then(data => {
    const tableBody = document.querySelector("#table-body");
    const rows = data.split("\n");
    rows.forEach(row => {
      const cells = row.split(",");
      const tr = document.createElement("tr");
      for (let i = 0; i < cells.length; i++) {
        const td = document.createElement("td");
        td.textContent = cells[i];
        tr.appendChild(td);
      }
      tableBody.appendChild(tr);
    });
  });

// Add filter functionality to each column header input field
const inputFields = document.querySelectorAll("thead input[type='text']");
inputFields.forEach(input => {
  input.addEventListener("input", () => {
    const columnIndex = Array.from(input.parentNode.parentNode.children).indexOf(input.parentNode);
    const rows = document.querySelectorAll("#table-body tr");
    rows.forEach(row => {
      const cells = Array.from(row.children);
      const cellValue = cells[columnIndex].textContent.toLowerCase();
      if (cellValue.includes(input.value.toLowerCase())) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  });
});
