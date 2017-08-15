const users = []
app.post('/users', function(req, res) {
    // retrieve user posted data from the body
    const user = req.body
    users.push({
        name: user.name,
        age: user.age
    })
    res.send('successfully registered')
})

// Ram is expensive,
// memory resets each time you restart your application,
// if you don't clean up, sometimes you'll end up with stack overflow.
