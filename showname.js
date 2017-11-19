const { MongoClient } = require('mongodb')
const fs = require('fs')

const asyncLib = require('async')

const mongodbName = 'register'
const mongodbUrl = 'mongodb://192.168.99.100:27017/' + mongodbName

const showUser = () => {
    MongoClient.connect(mongodbUrl, async (err, database) => {
        
            const dbResults = await database.collection("users").find().toArray()
            const queue = asyncLib.queue((user, callback) => {
                fs.writeFile(user.name + ".txt", user.name, (err) => {
                    callback()
                })
            }, 2)

            queue.drain = () => {
                console.log("process complete")
                process.exit()
            }
            queue.push(dbResults)
        })

        console.log("end program")
}

showUser()
