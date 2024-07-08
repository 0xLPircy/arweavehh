local utils = require(".utils")

-- b8wVsxqaX_FloDZidv0uia220gjZWaab5q6XXGyk3gY
local PROJECTS = require("projects")


TRANSACTION = TRANSACTION or {
    {
        user = "WGUCLSI5JUuOvqWczDFTmjBc-BgxbbaAdPCadK2xDbc",
        msg = {
            -- {
            --     msgId = {
            --         aoEthQuantity = "100",
            --         projectTicker = "SATP",
            --         ProjectTokenRecieved = "",
            --         ptRecieved = false,
            --         ptSent = false,
            --     },
            -- },
        }
    }
}

_OUR_CUT = 0.9

Handlers.add(
    "Project Token Confirmed to User",
    function(msg)
        return msg.Action == "Debit-Notice" and msg["X-Action"] == "Project-Token-To-User"
    end,
    function(msg)
        local tags = msg.Tags
        local userTransactions = utils.find(function(val) return val.user == tags["X-User"] end)(TRANSACTION)
        userTransactions.msg[tags["X-MessageId"]]["ptSent"] = true
    end
)

Handlers.add(
    "Project Token To User",
    function(msg)
        return msg.Action == "Credit-Notice" and msg["X-Action"] == "Project-Token-To-User"
    end,
    function(msg)
        local tags = msg.Tags
        print(tags)
        -- finding which project the token is from
        local tokenProcess = utils.find(function(val) return val.process == msg.Sender end)(PROJECTS).tokenProcess
        -- upadate the TRANSACTION table
        local userTransactions = utils.find(function(val) return val.user == tags["X-User"] end)(TRANSACTION)
        local message = userTransactions.msg[tags["X-MessageId"]]
        if (message == nil) then
            print("Message not found" .. tags["X-MessageId"])
            return
        end
        userTransactions.msg[tags["X-MessageId"]]["ProjectTokenRecieved"] = tags["X-Quantity"]
        userTransactions.msg[tags["X-MessageId"]]["ptRecieved"] = true


        -- OUR CUT- $$$
        local transferQuantity = math.floor(_OUR_CUT * tags["X-Quantity"])
        print(transferQuantity)
        ao.send({
            Target = tokenProcess,
            Action = "Transfer",
            Quantity = tostring(transferQuantity),
            Recipient = tags["X-User"],
            ["X-Action"] = "Project-Token-To-User",
            ["X-MessageId"] = tags["X-MessageId"],
        })
    end
)


--  1. user sends aoeth to our platform
-- X-User, X-Action, X-Ticker, X-Quantity
Handlers.add(
    "User To Platform",
    function(msg)
        return msg.Action == "Credit-Notice" and msg["X-Action"] == "User-to-Platform"
    end,
    function(msg)
        print("entered u to p")
        local tags = msg.Tags
        local projectID = utils.find(function(val) return val.ticker == tags["X-Ticker"] end)(PROJECTS).process
        print(projectID)
        local msgId = msg.Id
        -- add a new transaction
        local userTransactions = utils.find(function(val) return val.user == tags["X-User"] end)(TRANSACTION)
        local newMsg = {
            aoEthQuantity = tags["X-Quantity"],
            projectTicker = tags["X-Ticker"],
            ProjectTokenRecieved = "",
            ptRecieved = false,
            ptSent = false,
        }
        if (userTransactions == nil) then
            table.insert(TRANSACTION, {
                user = tags["X-User"],
                msg = {
                    msgId = newMsg,
                },
            })
        else
            table.insert(userTransactions.msg, {
                msgId = {
                    aoEthQuantity = tags["X-Quantity"],
                    projectTicker = tags["X-Ticker"],
                    ProjectTokenRecieved = "",
                    ptRecieved = false,
                    ptSent = false,
                },
            })
        end

        print("before notif send")
        -- Send notification to the project
        ao.send({
            Target = projectID,
            Action = "Notif",
            User = tags["X-User"],
            Quantity = tags["X-Quantity"],
            MessageId = msgId,
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
                            Id = {                         -- Nested table
                                aoEthQuantity = "",        -- string type
                                projectTicker = "",        -- string type
                                ProjectTokenRecieved = "", -- string type
                                ptRecieved = false,        -- boolean type
                                ptSent = false,            -- boolean type
                            },
                        })
                    end
                end
            end
        end
    end
)
