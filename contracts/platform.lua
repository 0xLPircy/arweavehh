-- b8wVsxqaX_FloDZidv0uia220gjZWaab5q6XXGyk3gY
PROJECTS = PROJECTS or {
    {
        process = "1wsCJtrztr99c3Qw5ENVfhr59SLjpjRODXCLwE3OZYU",
        tokenProcess = "R0kARdLKbO6j8SVZ-Ui9iR5O6FVPLnRjFxtAwjZp5lk",
        ticker = "SATP",
        name = "Saturn",
    },
}

TRANSACTION = TRANSACTION or {
    {
        user = "WGUCLSI5JUuOvqWczDFTmjBc-BgxbbaAdPCadK2xDbc",
        msg = {

        }
    }
}

_OUR_CUT = 0.9

function isPTokentoUserSuccessTransfer(msg)
    if msg.Action == "Credit-Notice" and msg["X-Action"] == "Project-Token-To-User" then
        return true
    else
        return false
    end
end

Handlers.add(
    "Project Token To User",
    isPTokentoUserSuccessTransfer,
    function(msg)
        local tokenProcess
        local tags = msg.Tags
        print(tags)
        -- finding which project the token is from
        for _, projectData in ipairs(PROJECTS) do
            print("v:")
            print(projectData)
            if (projectData.process == msg.Sender) then
                print("ENTERED")
                tokenProcess = projectData.tokenProcess
            end
        end

        -- OUR CUT- $$$
        local transferQuantity = math.floor(_OUR_CUT * tags["X-Quantity"])
        print(transferQuantity)
        ao.send({
            Target = tokenProcess,
            Action = "Transfer",
            Quantity = tostring(transferQuantity),
            Recipient = tags["X-User"]
        })
    end
)

function isUsertoPlatformSuccessTransfer(msg)
    if msg.Action == "Credit-Notice" and msg["X-Action"] == "User-to-Platform" then
        return true
    else
        return false
    end
end

--  1. user sends aoeth to our platform
-- X-User, X-Action, X-Ticker, X-Quantity
Handlers.add(
    "User To Platform",
    isUsertoPlatformSuccessTransfer,
    function(msg)
        local tags = msg.Tags
        local projectID
        for _, projectData in ipairs(PROJECTS) do
            print(projectData.ticker)
            if (projectData.ticker == tags["X-Ticker"]) then
                print("inn")
                projectID = projectData.process
            end
        end
        local msgId = msg.Id

        -- TODO
        for _, v in ipairs(TRANSACTION) do
            if (v.user == tags["X-User"]) then
                table.insert(TRANSACTION[_].msg, {
                    msgId = {                               -- Nested table
                        aoEthQuantity = tags["X-Quantity"], -- string type
                        projectTicker = tags["X-Ticker"],   -- string type
                        PTokenPlatformRecieved = "",        -- string type
                        ptRecieved = false,                 -- boolean type
                        ptSent = false,                     -- boolean type
                    },
                })
            end
        end

        -- Send notification to the project
        ao.send({
            Target = projectID,
            Action = "Notif",
            User = tags["X-User"],
            Quantity = tags["X-Quantity"],
        })

        -- tags["X-Type"] LATER
    end
)

-- NOT NEEDED
Handlers.add(
    "check",
    Handlers.utils.hasMatchingTag("Action", "check"),
    function(msg)
        local tags = msg.Tags
        local user = tags["X-User"]
        for _, v in ipairs(TRANSACTION) do
            print(TRANSACTION[_])
            if (v.user == tags["X-User"]) then
                print("in")
                for k, j in pairs(v) do
                    if (k == "msg") then
                        print("in2")
                        table.insert(TRANSACTION[_].msg, {
                            Id = {                           -- Nested table
                                aoEthQuantity = "",          -- string type
                                projectTicker = "",          -- string type
                                PTokenPlatformRecieved = "", -- string type
                                ptRecieved = false,          -- boolean type
                                ptSent = false,              -- boolean type
                            },
                        })
                    end
                end
            end
        end
    end
)
