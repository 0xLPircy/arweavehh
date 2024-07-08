-- dummy process 1wsCJtrztr99c3Qw5ENVfhr59SLjpjRODXCLwE3OZYU
_SATP_VAL = 0.5 
Ticker = "SAT"
_SATP_TOKEN = "R0kARdLKbO6j8SVZ-Ui9iR5O6FVPLnRjFxtAwjZp5lk"
Handlers.add(
    "Notif",
    Handlers.utils.hasMatchingTag("Action", "Notif"),
    function(msg)
        -- recieved notif
        print(msg.User)
        print(msg.Quantity)
        local ToSend = math.floor(msg.Quantity * _SATP_VAL)
        -- TODO ADD CHECK TO MAKE SURE FROM IS PLATFORM
        print(tostring(ToSend))
        ao.send({
            Target = _SATP_TOKEN,
            Action = "Transfer",
            Quantity = tostring(ToSend),
            Recipient = "b8wVsxqaX_FloDZidv0uia220gjZWaab5q6XXGyk3gY",
            -- platform PID
            -- ["X-Project"] = Ticker
            ["X-Action"] = "PToken-To-User", 
            ["X-Qnty"] = tostring(ToSend),
            ["X-User"] = msg.User,
          })
          print(Colors.green .. "saturn sent message")
    end
)