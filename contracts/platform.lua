local utils = require(".utils")
local json = require("json")
local constants = require("constants")

AOETH_TOKEN_PID = constants.AOETH_TOKEN_PID
_OUR_CUT = constants._OUR_CUT

-- cooldown period, unstaking (negative amount), stake details (exchange rate)

-- Zr44oFbd4i9Tiq7SdoyPzmWxH_k-Fu_KtvbvgOjEv4s
-- ENK3n22aHK0tSlDh54E1eXujnDroUgg8CPmUs8cfAKw - parth
local PROJECTS = require("projects")

TRANSACTION = TRANSACTION or {}
-- {
--     user = "WGUCLSI5JUuOvqWczDFTmjBc-BgxbbaAdPCadK2xDbc",
--     msg = {
--         -- {
--         --         messageId = ""
--         --         aoEthQuantity = "100",
--         --         projectTicker = "SATP",
--         --         ProjectTokenReceived = "",
--         --         ptReceived = false,
--         --         ptSent = false,
--         --         amtUnstaked = false,
--         --         date = 5323543443323
--         -- },
--         --latest time stamp if past cooldown, unstake
--     }
-- }





-- Get Handers

Handlers.add("Get User Data",
    function(msg)
        return msg.Action == "Get-User-Data"
    end,
    function(msg)
        local user = msg.From
        print("user" .. user)
        local userTransactions = utils.find(function(val) return val.user == user end)(TRANSACTION)
        Send({ Target = msg.From, Action = "User-Data", Data = json.encode(userTransactions) })
    end

)


-- Stake Handlers

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
        local quantityStaked = 0
        for k, v in ipairs(TRANSACTION) do
            if (v.user == msg.Recipient) then
                for i, j in ipairs(TRANSACTION[k].msg) do
                    if (j.messageId == tags["X-MessageId"]) then
                        TRANSACTION[k].msg[i].ptSent = true
                        quantityStaked = TRANSACTION[k].msg[i].aoEthQuantity
                    end
                end
            end
        end

        -- update project amount staked
        PROJECTS = utils.map(function(val, key)
            if (val.tokenProcess == msg.From) then
                val.amountStaked = val.amountStaked + tonumber(quantityStaked)
            end
            return val
        end)(PROJECTS)

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
            if (v.user == tags["X-User"]) then
                for i, j in ipairs(TRANSACTION[k].msg) do
                    if (j.messageId == tags["X-MessageId"]) then
                        TRANSACTION[k].msg[i].ProjectTokenReceived = tags["X-Quantity"]
                        TRANSACTION[k].msg[i].ptReceived = true
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
        local project = utils.find(function(val) return val.ticker == tags["X-Ticker"] end)(PROJECTS)
        if (project == nil) then
            print("project not found") --TODO
            return
        end
        local projectPID = project.process
        print("pid" .. tostring(projectPID))
        local msgId = msg.Id
        print("u to p mid" .. tostring(msgId))
        -- add a new transaction
        local userTransactions = utils.find(function(val) return val.user == tags["X-User"] end)(TRANSACTION)
        local newMsg = {
            messageId = msgId,
            aoEthQuantity = tags["X-Quantity"],
            projectTicker = tags["X-Ticker"],
            ProjectTokenReceived = "",
            ptReceived = false,
            ptSent = false,
            amtUnstaked = false,
            date = msg.Timestamp
        }
        if (userTransactions == nil) then
            -- new user staking first time
            table.insert(TRANSACTION, {
                user = tags["X-User"],
                msg = { newMsg }
            })
        else
            -- user is staking again
            table.insert(userTransactions.msg, newMsg)
        end

        print("before notif send")
        -- Send notification to the project
        ao.send({
            Target = projectPID,
            Action = "Notif",
            User = tags["X-User"],
            Quantity = tags["X-Quantity"],
            MessageId = msgId,
        })

        -- tags["X-Type"] LATER
        print("exit u to p")
    end
)

Handlers.add("Unstaking AoETH", Handlers.utils.hasMatchingTag("Action", "Unstake"),
    function(msg)
        print("unstaking all aoeth of" .. msg.From .. "from" .. msg.Tags["Ticker"])
        local projectTicker = msg.Tags["Ticker"]
        local project = utils.find(function(val) return val.ticker == projectTicker end)(PROJECTS)
        local userTransactions = utils.find(function(val) return val.user == msg.From end)(TRANSACTION)
        assert(userTransactions, "User has not staked any aoeth")

        local userProjectTransactions = utils.filter(
            function(val)
                return val.projectTicker == projectTicker and not val.amtUnstaked
            end)(userTransactions.msg)

        assert(#userProjectTransactions > 0, "User has not staked any aoeth in this project")

        --    find the latest transaction
        local latestTxn = utils.reduce(function(acc, val)
            if (val.date > acc.date) then
                return val
            else
                return acc
            end
        end, userProjectTransactions[1], userProjectTransactions)


        local cooldownPeriod = project.cooldownPeriod

        assert(msg.Timestamp - latestTxn.date > cooldownPeriod,
            "You cannot unstake before the cooldown period, still have " ..
            tostring(cooldownPeriod - (msg.Timestamp - latestTxn.date)) .. " seconds left")

        -- get total amount staked by user
        local totalAmount = utils.reduce(function(acc, val)
            local amt = acc + tonumber(val.aoEthQuantity)
            return amt
        end, 0, userProjectTransactions)

        print("total amount" .. tostring(totalAmount))

        -- update the project amount staked
        PROJECTS = utils.map(function(val, key)
            if (val.ticker == projectTicker) then
                val.amountStaked = val.amountStaked - totalAmount
            end
            return val
        end)(PROJECTS)

        for k, v in ipairs(TRANSACTION) do
            if (v.user == msg.From) then
                for i, j in ipairs(TRANSACTION[k].msg) do
                    if (j.projectTicker == projectTicker and not j.amtUnstaked) then
                        TRANSACTION[k].msg[i].amtUnstaked = true
                    end
                end
            end
        end

        print("updated transactions")

        table.insert(userTransactions.msg, {
            messageId = msg.Id,
            aoEthQuantity = -totalAmount,
            projectTicker = projectTicker,
            ProjectTokenReceived = "",
            ptReceived = false,
            ptSent = false,
            amtUnstaked = true,
            date = msg.Timestamp
        })

        Send({
            Target = AOETH_TOKEN_PID,
            Action = "Transfer",
            Quantity = tostring(totalAmount),
            Recipient = msg.From,
            ["X-Action"] = "Unstake",
            ["X-Ticker"] = projectTicker,
            ["X-MessageId"] = msg.Id
        })
    end
)

-- AOETH_TOKEN_PID = ""
-- Handlers.add("DistributeAO", function(msg)
--     return msg.Action == "Credit-Notice" and msg.From == AOETH_TOKEN_PID
--     end,
--     function(msg)
--         for k, v in ipairs(PROJECTS) do
--             -- volumeOfAll : total volume of assets bridged to the ao network
--             -- yield : annual staking yield of aoEth
--             local toSend = v.amountStaked * yield / volumeOfAll
--         end
--     end
-- )

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
--                                 ProjectTokenReceived = "", -- string type
--                                 ptReceived = false,        -- boolean type
--                                 ptSent = false,            -- boolean type
--                             },
--                         })
--                     end
--                 end
--             end
--         end
--     end
-- )
