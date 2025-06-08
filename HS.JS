const form = document.getElementById("inventory-form");
const tableBody = document.querySelector("#inventory-table tbody");

function loadInventory() {
  const inventory = JSON.parse(localStorage.getItem("inventory")) || [];
  tableBody.innerHTML = "";
  inventory.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${item.device}</td>
            <td>${item.serial}</td>
            <td>${item.location}</td>
            <td>${item.user}</td>
            <td>${item.purchaseDate}</td>
            <td>${item.software}</td>
            <td><button class="delete-btn" onclick="deleteItem(${index})">Delete</button></td>
        `;
    tableBody.appendChild(row);
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const item = {
    device: document.getElementById("device").value,
    serial: document.getElementById("serial").value,
    location: document.getElementById("location").value,
    user: document.getElementById("user").value,
    purchaseDate: document.getElementById("purchaseDate").value,
    software: document.getElementById("software").value
  };

  const inventory = JSON.parse(localStorage.getItem("inventory")) || [];
  inventory.push(item);
  localStorage.setItem("inventory", JSON.stringify(inventory));
  loadInventory();
  form.reset();
});

function deleteItem(index) {
  const inventory = JSON.parse(localStorage.getItem("inventory")) || [];
  inventory.splice(index, 1);
  localStorage.setItem("inventory", JSON.stringify(inventory));
  loadInventory();
}

document.getElementById("export-btn").addEventListener("click", function () {
  const inventory = JSON.parse(localStorage.getItem("inventory")) || [];
  if (inventory.length === 0) {
    alert("No data to export.");
    return;
  }

  let csv = "Device,Serial,Location,User,PurchaseDate,Software\n";

  inventory.forEach((item) => {
    csv += `${item.device},${item.serial},${item.location},${item.user},${item.purchaseDate},${item.software}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "inventory.csv");
  link.click();
});

loadInventory();
