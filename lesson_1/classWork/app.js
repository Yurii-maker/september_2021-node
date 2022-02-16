// Завдання на практику
//
// 1. Спробуйте створити якийсь файл txt, прочитайте з нього дані і одразу, дані які ви отримали запишіть їх в інший
// файл, в вас вийде невеликий callback hell, пізніше я вам покажу
// як можна це обійти, але поки зробіть так


const fs = require('fs');
const path = require('path')

// fs.writeFile(path.join(__dirname, 'users.txt'), 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
//     err => {
//         if (err) {
//             console.log(err)
//             throw err
//         }
//         fs.readFile(path.join(__dirname, 'users.txt'), (err, data) => {
//             if (err) {
//                 console.log(err)
//                 throw err
//             }
//             fs.writeFile(path.join(__dirname, 'newUsers.txt'), data, err => {
//                 if (err) {
//                     console.log(err)
//                     throw err
//                 }
//             })
//         })
//
//     })


// 2. Створіть файл ( можете вручну ) заповніть його якимись даними
// Прочитайте його, скопіюйте всі дані з нього і перенесіть їх в нову папку та файл в ній, старий файл видаліть
// після того як все завершиться. Також вийде callback hell


// fs.readFile(path.join(__dirname, 'users.txt'), (err, data) => {
//     if (err) {
//         console.log(err)
//         throw err
//     }
//     fs.mkdir(path.join(__dirname, 'newDir'), err => {
//         if (err) {
//             console.log(err)
//             throw err
//         }
//         fs.writeFile(path.join(__dirname, 'newDir', 'newUsers.txt'), data, err => {
//             if (err) {
//                 console.log(err)
//                 throw err
//             }
//             fs.unlink(path.join(__dirname, 'users.txt'), err => {
//                 if (err) {
//                     console.log(err)
//                     throw err
//                 }
//             })
//
//         })
//
//
//     })
// })


// 3. Створіть папку (можете вручну) напишіть скріпт який створить в ній якись дані (можуть бути нові папки і
// файли(в файли запишіть якусь дату) )

//
// fs.mkdir(path.join(__dirname, 'newDir'), err => {
//     if (err) {
//         console.log(err)
//         throw err
//     }
//     fs.mkdir(path.join(__dirname, 'newDir', 'USERS'), err => {
//         if (err) {
//             console.log(err)
//             throw err
//         }
//         fs.mkdir(path.join(__dirname, 'newDir', 'POSTS'), err => {
//             if (err) {
//                 console.log(err)
//                 throw err
//             }
//             fs.writeFile(path.join(__dirname, 'newDir', 'Users.txt'), 'hjdfsdfsdfsdfsdfsdfsdfsd', err => {
//                 if (err) {
//                     console.log(err)
//                     throw err
//                 }
//                 fs.writeFile(path.join(__dirname, 'newDir', 'Posts.txt'), 'kl;dfgskl;dfkl;dfgkl;dfkl;dkl;dgkl;', err => {
//                     if (err) {
//                         console.log(err)
//                         throw err
//                     }
//                 })
//             })
//         })
//     })
// });

// і напишіть функцію яка буде зчитувати папку і перевіряти якщо дані які в ній
// // лежать - це файли тоді вам потрібно їх очистити, але не видаляти, якщо дані - це папки, вам потрібно їх перейменувати
// // і додати до назви префікс _new

function checker() {
    fs.readdir(path.join(__dirname, 'newDir'), (err, files) => {
        if (err) {
            console.log(err)
            throw err
        }

        files.map(file => {
            fs.lstat(path.join(__dirname, 'newDir', file), (err1, data) => {
                if (err) {
                    console.log(err)
                    throw err
                }
                if (data.isFile()) {
                    fs.truncate(path.join(__dirname, 'newDir', file), err => {
                        if (err) {
                            console.log(err)
                            throw err
                        }
                    })
                } else {
                    fs.rename(path.join(__dirname, 'newDir', file), path.join(__dirname, 'newDir', `new${file}`), err => {
                        if (err) {
                            console.log(err)
                            throw err
                        }
                    })


                }
            })


        })

    })


}

checker()

