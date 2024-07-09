-- dummy process 1wsCJtrztr99c3Qw5ENVfhr59SLjpjRODXCLwE3OZYU
_SATP_VAL = 0.5
Ticker = "SAT"
_SATP_TOKEN = "TodIkfiRyzdzBFvRQEuwWNXlXYSRiY6vTuA4Xq-9oTk"
PLATFORM_PID = "ENK3n22aHK0tSlDh54E1eXujnDroUgg8CPmUs8cfAKw"

Handlers.add(
    "Notif",
    Handlers.utils.hasMatchingTag("Action", "Notif"),
    function(msg)
        -- recieved notif
        print("entered notif")
        print("notif user:" .. tostring(msg.User))
        print("quantity" .. tostring(msg.Quantity))
        -- Formua to calculate the amount to send - TODO
        local ToSend = math.floor(msg.Quantity * _SATP_VAL)
        -- TODO ADD CHECK TO MAKE SURE FROM IS PLATFORM

        print("to send" .. tostring(ToSend))
        ao.send({
            Target = _SATP_TOKEN,
            Action = "Transfer",
            Quantity = tostring(ToSend),
            Recipient = PLATFORM_PID, -- platform PID
            -- platform PID
            -- ["X-Project"] = Ticker
            ["X-Action"] = "Project-Token-To-User",
            ["X-Quantity"] = tostring(ToSend),
            ["X-User"] = msg.User,
            ["X-MessageId"] = msg.MessageId
        })
        print(Colors.green .. "saturn sent message")
    end
)
