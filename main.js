/** Connect to Moralis server */
const serverUrl = "https://z1l3tres8onn.usemoralis.com:2053/server";
const appId = "1V5lpC0CDvLXkVK57EXPNgXDN3PoB91C5L2uCx8u";
Moralis.start({ serverUrl, appId });

/** Add from here down */
async function login() {
  let user = Moralis.User.current();
  if (!user) {
    try {
      user = await Moralis.authenticate({ signingMessage: "Hello World!" });
      await Moralis.enableWeb3();
      console.log(user);
      console.log(user.get("ethAddress"));
    } catch (error) {
      console.log(error);
    }
  }
}

async function logOut() {
  await Moralis.User.logOut();
  console.log("logged out");
}

async function donate() {
  let options = {
    contractAddress: "0x54CccaA9f315daaA44404DAb98C016A443453f31",
    functionName: "newDonation",
    abi: [
      {
        inputs: [{ internalType: "string", name: "note", type: "string" }],
        name: "newDonation",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
    ],
    params: {
      note: "Thanks for your work",
    },
    msgValue: Moralis.Units.ETH(0.05),
  };
  await Moralis.executeFunction(options);
}

document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;
document.getElementById("btn-donate").onclick = donate;
