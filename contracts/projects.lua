local json = require("json")
local utils = require(".utils")


-- TODO: save variable when adding new projects dynamically
PROJECTS = {
    {
        process = "pwqHpclb9H39d-XmuU-RfMRBRu4GjzX7v5SWlBGZhsY",
        tokenProcess = "1mCv9ODdJsHWhxVVhc_6s1BFkX7uewWpgWakSaTot6Y",
        id = "sat",
        amountStaked = 1.5,
        name = "Saturn",
        description = "A revolutionary project aiming to explore the outer limits of blockchain technology.",
        logo =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgEBALqlU/cAAAAASUVORK5CYII=",
        ticker = "SAT",
        cooldownPeriod = 60 * 60 * 24 * 3, -- 3 days in seconds
        aoethRewardRate = 10,              -- for 1 aoeth, how many tokens of reward
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
    {
        process = "-XmuU-RfMRBRu4GjzX7v5SWlBGZhsY",
        tokenProcess = "1mCv9ODdJsHWhxVVhckX7uewWpgWakSaTot6Y",
        id = "mar",
        amountStaked = 1.5,
        name = "Mars",
        description = "A revolutionary project aiming to explore the outer limits of blockchain technology.",
        logo =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgEBALqlU/cAAAAASUVORK5CYII=",
        ticker = "MARS",
        cooldownPeriod = 60 * 60 * 24 * 3, -- 3 days in seconds
        aoethRewardRate = 10,              -- for 1 aoeth, how many tokens of reward
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

Handlers.add("Get All Projects", function(msg)
        return msg.Action == "Get-Projects"
    end,

    function(msg)
        Send({ Target = msg.From, Action = "All-Projects", Data = json.encode(PROJECTS) })
    end
)

Handlers.add("Get One Project", function(msg)
        return msg.Action == "Get-Project"
    end,

    function(msg)
        print("Get One Project" .. msg.ProjectId)
        local project = utils.find(function(val) return val.id == msg.ProjectId end)(PROJECTS)

        Send({ Target = msg.From, Action = "One-Project", Data = json.encode(project) })
    end

)

return PROJECTS
