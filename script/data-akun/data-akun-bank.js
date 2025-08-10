const ipcRenderer = require("electron");

function saveDataBank() {
  const type = document.getElementById("selectType").value;
  const bankName = document.getElementById("inputBank").value;
  const id = document.getElementById("inputId").value;
  const name = document.getElementById("inputName").value;
  const phone = document.getElementById("inputPhone").value;
  const email = document.getElementById("inputEmail").value;
  const password = document.getElementById("inputPassword").value;
  const pin = document.getElementById("inputPIN").value;

  const data = {
    id: id,
    type: type,
    bankName: bankName,
    name: name,
    phone: phone,
    email: email,
    password: password,
    pin: pin,
  };

  ipcRenderer.send("save-bank", data);
  getAll();
}

function getAll() {
  ipcRenderer.send("get-all-bank");
}

ipcRenderer.on("getted-all-bank", (_, data) => {
  document.getElementById("data-bank").textContent = JSON.stringify(
    data,
    null,
    2
  );
});

ipcRenderer.on("bank-saved", (event, data) => {
  alert("Data bank berhasil disimpan");
});

window.onload = getAll;
