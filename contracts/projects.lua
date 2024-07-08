local json = require("json")

PROJECTS = PROJECTS or {
    {
        process = "1wsCJtrztr99c3Qw5ENVfhr59SLjpjRODXCLwE3OZYU",
        tokenProcess = "R0kARdLKbO6j8SVZ-Ui9iR5O6FVPLnRjFxtAwjZp5lk",

        id = "sat",
        name = "Saturn",
        description = "A revolutionary project aiming to explore the outer limits of blockchain technology.",
        logo =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgEBALqlU/cAAAAASUVORK5CYII=",
        ticker = "SAT",
        founders = {
            {
                name = "Alice Johnson",
                designation = "CEO",
                photo =
                "",
            },
            {
                name = "Bob Smith",
                designation = "CTO",
                photo =
                "",
            },
        },
        socials = {
            website = "https://www.saturn.io",
            x = "https://x.com/saturn",
            discord = "https://discord.gg/saturn",
            github = "https://github.com/saturn",
        },
    },
}

Handlers.add("projects", function(msg)
        return msg.Action == "Get-Projects"
    end,

    function(msg)
        Send({ Target = msg.From, Action = "All-Projects", Data = json.encode(PROJECTS) })
    end

)

return PROJECTS
