db.createUser(
    {
        user: "game",
        pwd: "game",
        roles:[
            {
                role: "readWrite",
                db: "gamenews"
            }
        ]
    }
)