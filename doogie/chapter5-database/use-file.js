const fs = require('fs')

app.post('/users', function(req, res) {
    const user =req.body
    fs.appendFile('users.text' JSON.stringify({
        name: user.name,
        age: user.age
    }), (err) => {
        res.send('successfully registered')
    })
})

// Appending is okay, but think about updating or deleting.
// If we're working with files, there is no easy way to access them
// in parallel (system-wide locks will prevent you from writing).
// When we try to scale our application up, we cannot split files
// in between severs.
