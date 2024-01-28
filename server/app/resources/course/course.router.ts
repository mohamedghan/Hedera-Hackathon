import express from "express";
import { Course } from "./course.model.js";
import { AccountId, Client, ContractCallQuery, ContractCreateFlow, ContractExecuteTransaction, ContractFunctionParameters, ContractId, EvmAddress, Hbar, PrivateKey, TransferTransaction } from "@hashgraph/sdk";
import fs from "fs";

const bytecode = fs.readFileSync("CourseContract.bin", "utf-8");
const abi = JSON.parse(fs.readFileSync("CourseContract.json", "utf-8"));

async function deployContract(client, value) {
    const contractCreate = new ContractCreateFlow()
      .setGas(10000000)
      .setConstructorParameters(
        new ContractFunctionParameters().addUint256(value)
      )
      .setBytecode(bytecode);
  
    const txResponse = await contractCreate.execute(client);
    const receipt = await (await txResponse).getReceipt(client);
    const newContractId = await receipt.contractId;
  
    console.log("The new contract id is " + newContractId);
    return newContractId;
  }

  async function callGetBalance(client, contractId) {
    const getLeft = new ContractCallQuery()
      .setContractId(contractId)
      .setGas(210000)
      .setFunction("getBalance");
  
    const contractCallResult = await getLeft.execute(client);
    const left = contractCallResult.getUint256();

    console.log("balance:", left);
    return left
}

async function callGetfn(client, contractId, fn) {
    const getLeft = new ContractCallQuery()
      .setContractId(contractId)
      .setGas(210000)
      .setFunction(fn);
  
    const contractCallResult = await getLeft.execute(client);
    const left = contractCallResult.getUint256();

    console.log("balance:", left);
    return left
}

async function callreset(client, contractId) {
    const getLeft = await new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(100000)
        .setFunction("reset", new ContractFunctionParameters().addAddress(EvmAddress.fromString("0x0816a28bcd8cbf7d97c24195bb9449f60fda4e36")))

  
    const contractCallResult = await getLeft.execute(client);
    const left = contractCallResult.getReceipt(client);
    return left
}
  

const router = express.Router();
router.get("/", async (req, res) => {
    const courses = await Course.findAll();
    const client = Client.forTestnet();
    const myAccountId = AccountId.fromString(req.user.accountId);
    const myPrivateKey = PrivateKey.fromStringECDSA(req.user.privateKey);
    client.setOperator(myAccountId, myPrivateKey);
    client.setDefaultMaxTransactionFee(new Hbar(100));
    client.setDefaultMaxQueryPayment(new Hbar(50));

    const json = [];

    for await (const e of courses) {
        json.push({
            id: e.id,
            name: e.name,
            ownerid: e.ownerid,
            ownername: e.ownername,
            contractid: e.contractid,
            balance: parseInt(await callGetBalance(client, ContractId.fromString(e.contractid)))/(10**8),
            goal: e.goal,

            //reset: await callreset(client,ContractId.fromString(e.contractid))
        })
    }

    res.status(200).json(json)
});

async function hbar2ContractSdkFcn(client, sender, receiver, amount, pKey) {
    const transferTx = new TransferTransaction()
        .addHbarTransfer(sender, -amount)
        .addHbarTransfer(receiver, amount)
        .freezeWith(client);
    const transferSign = await transferTx.sign(pKey);
    const transferSubmit = await transferSign.execute(client);

    const transferRx = await transferSubmit.getReceipt(client);
    return transferRx;
}

async function contractExecuteNoFcn(cId, client, amountHbar) {
    const contractExecuteTx = new ContractExecuteTransaction()
        .setContractId(cId)
        .setGas(100000)
        .setPayableAmount(amountHbar);
    const contractExecuteSubmit = await contractExecuteTx.execute(client);
    const contractExecuteRx = await contractExecuteSubmit.getReceipt(client);
    return contractExecuteRx;
}

router.post("/pay", async (req, res) => {
    const client = Client.forTestnet();
    const myAccountId = AccountId.fromString(req.user.accountId);
    const myPrivateKey = PrivateKey.fromStringECDSA(req.user.privateKey);
    const contractId = req.body.contractId;
    client.setOperator(myAccountId, myPrivateKey);
    client.setDefaultMaxTransactionFee(new Hbar(100));
    client.setDefaultMaxQueryPayment(new Hbar(50));

    try {
        const receipt = await contractExecuteNoFcn(contractId, client, req.body.ammount)
        res.status(200).json({
            transactionId: receipt
        }).end()
    } catch(e) {
        res.send(400).end()
    }
});



router.post("/", async (req, res) => {
    const course = req.body;
    const client = Client.forTestnet();
    const myAccountId = AccountId.fromString(req.user.accountId);
    const myPrivateKey = PrivateKey.fromStringECDSA(req.user.privateKey);
    client.setOperator(myAccountId, myPrivateKey);
    client.setDefaultMaxTransactionFee(new Hbar(100));
    client.setDefaultMaxQueryPayment(new Hbar(50));
    
    const contid = (await deployContract(client, course.ammount*(10**8))).toString();

    Course.create({
        name: course.name,
        ownerid: req.user.id,
        ownername: req.user.username,
        contractid: contid,
        goal: course.ammount
    })
    res.status(201).json({
        name: course.name,
        ownerid: course.ownerid,
        ownername: course.ownername,
        contractid: contid,
        goal: course.ammount
    })
});

export default router;