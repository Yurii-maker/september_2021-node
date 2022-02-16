// Створити основну папку (main), в яку покласти дві інші папки: перша - online, друга - inPerson

const path = require('path');
const fs = require('fs');

// fs.mkdir(path.join(__dirname, 'main', 'online'), {recursive: true}, (err => {
//     if (err) {
//         console.log(err)
//         throw err
//     }
// }));
// fs.mkdir(path.join(__dirname, 'main', 'inPerson'), {recursive: true}, (err => {
//     if (err) {
//         console.log(err)
//         throw err
//     }
// }));


// Потім створити в вашому головному файлі (для прикладу app.js) два масиви з обєктами user ({. name: "Andrii", age: 22, city: "Lviv" }),  відповідно перший - onlineUsers, другий - inPersonUsers;

const onlineUsers = [{name: "Andrii", age: 22, city: "Ternopil"}, {name: "Yurii", age: 25, city: "Lviv"},
    {name: "Orysia", age: 25, city: "Lviv"}, {name: "Cat", age: 16, city: "Lutsk"}];
const inPersonUsers = [{name: "Max", age: 12, city: "Ternopil"}, {name: "Vasia", age: 30, city: "Dubai"},
    {name: "Nadia", age: 19, city: "Praha"}, {name: "Dog", age: 12, city: "Rivne"}];


// і створити файли txt в папках (online, inPerson) в яких як дату покласти юзерів з ваших масивів, але щоб ваш файл виглядав як NAME: ім'я з обєкту і т.д і всі пункти з нового рядка.

// onlineUsers.map((user, i) => {
//     for (const key in user) {
//         fs.writeFile(path.join(__dirname, 'main', 'online', `user${i + 1}.txt`), `${key}: ${user[key]}\n`, {flag: 'a'}, (err => {
//             if (err) {
//                 console.log(err)
//                 throw err
//             }
//         }))
//     }
// });
// inPersonUsers.map((user, i) => {
//     for (const key in user) {
//         fs.writeFile(path.join(__dirname, 'main', 'inPerson', `user${i + 1}.txt`), `${key}: ${user[key]}\n`, {flag: 'a'}, (err => {
//             if (err) {
//                 console.log(err)
//                 throw err
//             }
//         }))
//     }
// })


// Коли ви це виконаєте напишіть функцію яка буде міняти місцями юзерів з одного файлу і папки в іншу. (ті, що були в папці inPerson будуть в папці online)

function changer(fileToChange, changedFile) {

    fs.readFile(path.join(__dirname, 'main', 'online', fileToChange), 'utf8', (err, data1) => {
        if (err) {
            console.log(err)
            throw err
        }
        fs.readFile(path.join(__dirname, 'main', 'inPerson', changedFile), 'utf8', (err1, data2) => {
            if (err) {
                console.log(err)
                throw err
            }
            fs.appendFile(path.join(__dirname, 'main', 'online', fileToChange), data2, {flag: 'w'}, (err) => {
                    if (err) {
                        console.log(err)
                        throw err
                    }
                    fs.appendFile(path.join(__dirname, 'main', 'inPerson', fileToChange), data1, {flag: 'w'}, (err) => {
                        if (err) {
                            console.log(err)
                            throw err
                        }
                    })

                }
            )

        })

    })
}

changer('user1.txt', 'user1.txt')
