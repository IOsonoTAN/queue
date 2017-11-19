const request = require('request')
const faker = require('faker')
const async = require('async')

const url = 'http://10.22.24.57:3000/users'

const users = []

const queue = async.queue((task, callback) => {

    let jsonData = { 
        firstname: task.firstname,
        lastname: task.lastname,
        email: task.email

    }
    request.post(url).form(jsonData)
    console.log(jsonData.firstname + " process complete ")
    callback()

}, 1)

queue.drain = () => {
    console.log("All process complete")
}


for(i = 0; i < 5; i++) {
    users.push({
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email()
    })
}

queue.push(users)

