import { AccountCreateTransaction, AccountId, Client, Hbar, PrivateKey } from '@hashgraph/sdk'
import config from '../config/index.js'
import { User } from '../resources/user/user.model.js'
import jwt from 'jsonwebtoken'

export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
}

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

  async function createAccount(){
    const client = Client.forTestnet();
    const myAccountid = AccountId.fromString("0.0.7642391")
    const myPrivatekey = PrivateKey.fromStringECDSA("3030020100300706052b8104000a04220420e6fe76e1a11b50f0b773eb0bc942eea8ef15aa3254718cecd76983b91d485a60")
    client.setOperator(myAccountid,myPrivatekey);
    const newPrivateKey = PrivateKey.generateECDSA();
    const newPublicKey = newPrivateKey.publicKey;
    const newAccount = new AccountCreateTransaction()
    .setInitialBalance(new Hbar(1000)).setKey(newPublicKey);
  
    const txResponse = await newAccount.execute(client);
    const receipt = await txResponse.getReceipt(client);
    const newAccountId = receipt.accountId;
    console.log("new acc id is: ",newAccountId.toString());
    return {accountid: newAccountId.toString(), privateKey: newPrivateKey.toStringDer()};
  }
  

export const signup = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send({ message: 'need username and password' })
  }

  const newacc = await createAccount()

  try {
    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
      isTeacher: true,
      privateKey: newacc.privateKey,
      accountId: newacc.accountid
    })
    const token = newToken(user)
    return res.status(201).send({ token })
  } catch (e) {
    return res.status(500).end()
  }
}

export const signin = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send({ message: 'need username and password' })
  }

  const invalid = { message: 'Invalid username and passoword combination' }

  try {
    const user = await User.findOne({ where: { username: req.body.username, password: req.body.password }})

    if (!user) {
      return res.status(401).send(invalid)
    }

    const token = newToken(user)
    return res.status(200).send({ token })
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }
}

export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).end()
  }

  const token = bearer.split('Bearer ')[1].trim()
  let payload
  try {
    payload = await verifyToken(token)
  } catch (e) {
    return res.status(401)
  }

  const user = await User.findOne({where: {id: payload.id}})

  if (!user) {
    return res.status(401)
  }

  req.user = user
  next()
}
