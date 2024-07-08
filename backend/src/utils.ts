import Arweave from "arweave";

// Since v1.5.1 you're now able to call the init function for the web version without options. The current URL path will be used by default. This is recommended when running from a gateway.
const arweave = Arweave.init({
  host: "arweave.net", // Hostname or IP address for a Arweave host
  port: 443, // Port
  protocol: "https", // Network protocol http or https
  timeout: 20000, // Network request timeouts in milliseconds
  logging: false, // Enable network request logging
});

export async function sendAr(address: string, quantity: string = "0.1") {
  const transaction = await arweave.createTransaction(
    {
      target: address,
      quantity: arweave.ar.arToWinston(quantity),
    },
    process.env.PRIVATE_KEY as any
  );
  return transaction;
}
