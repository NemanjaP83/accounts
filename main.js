//jshint esversion:6
window.addEventListener('beforeunload', save);

let htmlAccounts = document.querySelector('#accounts-data');
// let accountsViewLink = document.querySelector('[href="accounts-view"]');
// let addAccountViewLink = document.querySelector('[href="add-account-view"]');
let allLinks = document.querySelectorAll('.nav-link');
let accountsView = document.querySelector('#accounts-view');
let addAccountView = document.querySelector('#add-account-view');
let views = document.querySelectorAll('.view');
// input polja mogu da se selektuju i preko placeholder-a
// let idInput = document.querySelector('[placeholder="id"]');
let IdInput = document.querySelector('#id');
let nameInput = document.querySelector('#name');
let lastnameInput = document.querySelector('#lastname');
let emailInput = document.querySelector('#email');
let phoneInput = document.querySelector('#phone'); 
let saveBtn = document.querySelector('#save');
let editBtn = document.querySelector('#saveEdit');
let eId = document.querySelector('.eId');
let eName = document.querySelector('.eName');
let eLastname = document.querySelector('.eLastname');
let eEmail = document.querySelector('.eEmail');
let ePhone = document.querySelector('.ePhone');
let id;


// Ovo nije dobar nacin za prikazivanje view kada ih ima mnogo
// accountsViewLink.addEventListener('click', function(event){
//     event.preventDefault();
//     addAccountView.style.display = "none";
//     accountsView.style.display = "block";

// });

// addAccountViewLink.addEventListener('click', function(event) {
//     event.preventDefault();
//     addAccountView.style.display = "block"; 
//     accountsView.style.display = "none";
// });
editBtn.addEventListener('click', saveEditedAccount);
saveBtn.addEventListener('click', saveAccount);

function saveEditedAccount() {
    const editedAccount = {
        id: eId.value,
        name: eName.value,
        lastname: eLastname.value,
        email: eEmail.value,
        phone: ePhone.value
    };
    // console.log(editedAccount);
    db[id] = editedAccount;
    createTable();
    showView('#accounts-view');
}

function saveAccount() {
    const account = {
        id: IdInput.value,
        name: nameInput.value,
        lastname: lastnameInput.value,
        email: emailInput.value,
        phone: phoneInput.value
    };
    // console.log(account);
    db.push(account);
    IdInput.value = "";
    nameInput.value = "";
    lastnameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
    createTable();
    showView('#accounts-view');
}

// selektuje sve linkove i dodaje im event listener koji pokrece f-ju showView
for (let i = 0; i < allLinks.length; i++) {
    allLinks[i].addEventListener('click', showView);
}
// f-ja showView u zavisnosti  na koji je link kliknuto, uzima njegov atribut i menja mu display property -
// koji je inicijalno namesten da onemoguci svaki view
function showView(event) {
    for (let i = 0; i < views.length; i++) {
        views[i].style.display = "none";
    }
    if (event instanceof Event) {
        event.preventDefault();
        let id = `#${this.getAttribute('href')}`;// id ce u zavisnosti na sta je kliknuto - imati taj atribut (href = "nesto")
        document.querySelector(id).style.display = "block"; // pronalazi element sa selektovanim #${this.getAttribute('href')} id-jem
    } else {
        document.querySelector(event).style.display = "block";
    }  
}

function createTable() {
    let tableData = ``;
    for (let i = 0; i < db.length; i++) {
        const account = db[i];
        tableData += `
            <tr>
                <td>${account.id}</td>
                <td>${account.name}</td>
                <td>${account.lastname}</td>
                <td>${account.email}</td>
                <td>${account.phone}</td>
                <td><button data-id="${i}" class="edit-btn btn-sm btn-info form-control">Edit</button></td>
                <td><button data-id="${i}" class="delete-btn btn-sm btn-danger form-control">Delete</button></td>
            </tr>
        `;
    }
    // console.log(tableData);
    htmlAccounts.innerHTML = tableData;
    let allDeleteBtns = document.querySelectorAll('.delete-btn');
    let allEditBtns = document.querySelectorAll('.edit-btn');
    for (let i = 0; i < allEditBtns.length; i++) {
        allDeleteBtns[i].addEventListener('click', deleteAccount);
        allEditBtns[i].addEventListener('click', editAccount);
    }
}

createTable();

function deleteAccount() {
    let id = this.getAttribute('data-id');
    // console.log(id);
    db.splice(id, 1);
    createTable();
    showView('#accounts-view');
}

function editAccount() {
    id = this.getAttribute('data-id');
    let selectedAccount = db[id];
    eId.value = selectedAccount.id;
    eName.value = selectedAccount.name;
    eLastname.value = selectedAccount.lastname;
    eEmail.value = selectedAccount.email;
    ePhone.value = selectedAccount.phone;
    showView('#edit-account-view'); 
}

function save() {
    localStorage.db = JSON.stringify(db);
}