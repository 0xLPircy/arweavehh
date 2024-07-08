-- b8wVsxqaX_FloDZidv0uia220gjZWaab5q6XXGyk3gY
PROJECTS = PROJECTS or {
    {
        process = "1wsCJtrztr99c3Qw5ENVfhr59SLjpjRODXCLwE3OZYU",
        tokenProcess = "R0kARdLKbO6j8SVZ-Ui9iR5O6FVPLnRjFxtAwjZp5lk",
    },
}

function isSuccessTransfer(msg)
    if msg.Action == "Credit-Notice" and msg["X-Action"] == "PToken-To-User" then
        return true
    else 
        return false
    end
end

Handlers.add(
    "PToken To User",
   isSuccessTransfer,
    function(msg)
        local tokenProcess
        local tags = msg.Tags
        print(tags)
        for _, v in ipairs(PROJECTS) do
            print("v:") 
            print(v)
            if(v.process==msg.Sender) then
                print("ENTERED")
                tokenProcess = v.tokenProcess
            end
        end 
        local transferQuantity = math.floor(0.9 * tags["X-Qnty"]) --TO SEE TODO
        print(transferQuantity)
        ao.send({
            Target = tokenProcess,
            Action = "Transfer",
            Quantity = tostring(transferQuantity),
            Recipient = tags["X-User"]
        })
    end
)

-- Handlers.add(
--     "check",
--     Handlers.utils.hasMatchingTag("Action", "check"),
--     function(msg)
--         local tokenProcess
--         for _, v in ipairs(PROJECTS) do
--             -- print("k:") 
--             -- print(k)
--             print("v:") 
--             print(v)
--             if(v.process==msg.Sendee) then
--                 print("ENTERED")
--                 tokenProcess = v.tokenProcess
--             end
--         end 
--         print(tokenProcess)
--     end
-- )