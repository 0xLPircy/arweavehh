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
        print("pt to user confirmed entered")
        local tags = msg.Tags
        -- local userTransactions = utils.find(function(val) return val.user == tags["X-User"] end)(TRANSACTION)
        -- userTransactions.msg[tags["X-MessageId"]]["ptSent"] = true
        for k, v in ipairs(TRANSACTION) do 
            if(v.user == msg.Recipient) then
                for i, j in ipairs(TRANSACTION[k].msg) do
                    if(j.messageId == tags["X-MessageId"]) then
                        TRANSACTION[k].msg[i].ptSent = true
                    end
                end
            end
        end
        print("pt to user confirmed left")
    end
)

Handlers.add(
    "Project Token To User",
    function(msg)
        return msg.Action == "Credit-Notice" and msg["X-Action"] == "Project-Token-To-User"
    end,
    function(msg)
        print("pt to user entered")
        local tags = msg.Tags
        print(tags)
        -- finding which project the token is from
        local tokenProcess = utils.find(function(val) return val.process == msg.Sender end)(PROJECTS).tokenProcess
        print("token process" .. tostring(tokenProcess))
        -- -- upadate the TRANSACTION table
        for k, v in ipairs(TRANSACTION) do 
            if(v.user == tags["X-User"]) then
                for i, j in ipairs(TRANSACTION[k].msg) do
                    if(j.messageId == tags["X-MessageId"]) then
                        TRANSACTION[k].msg[i].ProjectTokenRecieved = tags["X-Quantity"] 
                        TRANSACTION[k].msg[i].ptRecieved = true
                    end
                end
            end
        end
        -- OUR CUT- $$$
        local transferQuantity = math.floor(_OUR_CUT * tags["X-Quantity"])
        print("transfer quantity" .. tostring(transferQuantity))
        ao.send({
            Target = tokenProcess,
            Action = "Transfer",
            Quantity = tostring(transferQuantity),
            Recipient = tags["X-User"],
            ["X-Action"] = "Project-Token-To-User",
            ["X-MessageId"] = tags["X-MessageId"],
        })
        print("pt to user left")
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
        print("pid" .. tostring(projectID))
        local msgId = msg.Id
        print("u to p mid" .. tostring(msgId))
        -- add a new transaction
        local userTransactions = utils.find(function(val) return val.user == tags["X-User"] end)(TRANSACTION)
        local newMsg = {
            messageId = msgId,
            aoEthQuantity = tags["X-Quantity"],
            projectTicker = tags["X-Ticker"],
            ProjectTokenRecieved = "",
            ptRecieved = false,
            ptSent = false,
        }
        if (userTransactions == nil) then
            table.insert(TRANSACTION, {
                user = tags["X-User"],
                msg = {newMsg}
            })
        else
            table.insert(userTransactions.msg, newMsg)
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
        print("exit u to p")
    end
)

-- NOT NEEDED
-- Handlers.add(
--     "check",
--     Handlers.utils.hasMatchingTag("Action", "check"),
--     function(msg)
--         local tags = msg.Tags
--         local user = tags["X-User"]
--         for _, v in ipairs(TRANSACTION) do
--             print(TRANSACTION[_])
--             if (v.user == tags["X-User"]) then
--                 print("in")
--                 for k, j in pairs(v) do
--                     if (k == "msg") then
--                         print("in2")
--                         table.insert(TRANSACTION[_].msg, {
--                             Id = {                         -- Nested table
--                                 aoEthQuantity = "",        -- string type
--                                 projectTicker = "",        -- string type
--                                 ProjectTokenRecieved = "", -- string type
--                                 ptRecieved = false,        -- boolean type
--                                 ptSent = false,            -- boolean type
--                             },
--                         })
--                     end
--                 end
--             end
--         end
--     end
-- )
