//jshint esversion:6

// let db = [
//     {
//         id: "1",
//         name: "Nemanja",
//         lastname: "Pantelic",
//         email: "nemanja@gmail.com",
//         phone: "1111-1111"
//     },
//     {
//         id: "2",
//         name: "Marija",
//         lastname: "Majic",
//         email: "marija@gmail.com",
//         phone: "2222-2222"
//     },
//     {
//         id: "3",
//         name: "Stefan",
//         lastname: "Peric",
//         email: "stefan@gmail.com",
//         phone: "3333-3333"
//     }
// ];

let db = [];
if (localStorage.db) {
    db = JSON.parse(localStorage.db);
}