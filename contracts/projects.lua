local json = require("json")
local utils = require(".utils")
local constants = require("constants")

-- TODO: save variable when adding new projects dynamically
PROJECTS = PROJECTS or {
    {
        process = constants.SATURN_PID,
        tokenProcess = constants.SATURN_TOKEN_PID,
        id = "SATP",
        amountStaked = 0,
        name = "Saturn",
        description = "A revolutionary project aiming to explore the outer limits of blockchain technology.",
        logo ="https://arweavehh.vercel.app//SATP.svg",
        ticker = "SATP",
        cooldownPeriod = 60,  -- 60 seconds
        aoethRewardRate = 10, -- for 1 aoeth, how many tokens of reward
        founders = {
            {
                name = "Alice Johnson",
                designation = "CEO",
                photo ="https://arweavehh.vercel.app/founders/saturnfounder1.png",
            },
            {
                name = "Bob Smith",
                designation = "CTO",
                photo ="https://arweavehh.vercel.app/founders/saturnfounder2.png
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
        process = "BaMK1dfayo75s3q1ow6AO64UDpD9SEFbeE8xYrY2fyQ",
        tokenProcess = "BUhZLMwQ6yZHguLtJYA5lLUa9LQzLXMXRfaq9FVcPJc",
        id = "ORBT",
        amountStaked = 0,
        name = "0rbit",
        description = "Decentralized Oracle Network on Arweave | Get ACCESS to LIMITLESS DATA",
        logo ="https://arweavehh.vercel.app/0RBT.svg",
        ticker = "0RBT",
        cooldownPeriod = 60 * 60 * 24 * 3, -- 3 days in seconds
        aoethRewardRate = 30,              -- for 1 aoeth, how many tokens of reward
        founders = {
            {
                name = "Lucifer0x17",
                designation = "Founder",
                photo ="",
            },
            {
                name = "Megabyte",
                designation = "Co-Founder",
                photo ="",
            },
        },
        socials = {
            website = "https://www.0rbit.co",
            x = "https://twitter.com/0rbitco",
            discord = "https://discord.gg/JVSjqaKJgV",
            github = "https://github.com/0rbit-co",
        },
    },
    {
        process = "UdPDhw5S7pByV3pVqwyr1qzJ8mR8ktzi9olgsdsyZz4",
        tokenProcess = "UdPDhw5S7pByV3pVqwyr1qzJ8mR8ktzi9olgsdsyZz4",
        id = "NEO",
        amountStaked = 0,
        name = "BetterIDEa",
        description = "One stop env for devs on Arweave",
        logo ="https://arweavehh.vercel.app/NEO.svg",
        ticker = "NEO",
        cooldownPeriod = 60 * 60 * 24 * 3, -- 3 days in seconds
        aoethRewardRate = 30,              -- for 1 aoeth, how many tokens of reward
        founders = {
            {
                name = "Ankush",
                designation = "Founder",
                photo ="https://arweavehh.vercel.app/founders/betterideafounder1.png",
            },
            {
                name = "Farat",
                designation = "Principle Designer",
                photo ="https://arweavehh.vercel.app/founders/betterideafound2.png",
            },
        },
        socials = {
            website = "https://betteridea.dev/",
            x = "https://twitter.com/betteridea_dev",
            discord = "https://discord.gg/nm6VKUQBrA",
            github = "https://github.com/ankushKun/betteride",
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
