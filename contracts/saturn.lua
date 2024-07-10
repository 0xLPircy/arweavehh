-- dummy process 1wsCJtrztr99c3Qw5ENVfhr59SLjpjRODXCLwE3OZYU
-- esha pwqHpclb9H39d-XmuU-RfMRBRu4GjzX7v5SWlBGZhsY

local constants = require("constants")

_SATP_VAL = 10
Ticker = "SAT"
_SATP_TOKEN = constants.SATURN_TOKEN_PID

PLATFORM_PID = constants.PLATFORM_PID


Handlers.add(
    "Notif",
    Handlers.utils.hasMatchingTag("Action", "Notif"),
    function(msg)
        -- recieved notif
        print("entered notif")
        print("notif user:" .. tostring(msg.User))
        print("quantity" .. tostring(msg.Quantity))
        assert(msg.From == PLATFORM_PID, 'Message must be from the fundAr Platform Process!')

        -- Formua to calculate the amount to send - TODO
        local ToSend = math.floor(msg.Quantity * _SATP_VAL)

        print("to send" .. tostring(ToSend))
        ao.send({
            Target = _SATP_TOKEN,
            Action = "Transfer",
            Quantity = tostring(ToSend),
            Recipient = PLATFORM_PID,
            ["X-Action"] = "Project-Token-To-User",
            ["X-Quantity"] = tostring(ToSend),
            ["X-User"] = msg.User,
            ["X-MessageId"] = msg.MessageId
        })
        print(Colors.green .. "saturn sent transfer message")
    end
)
