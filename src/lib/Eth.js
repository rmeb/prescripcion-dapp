import {DespachoReceta} from 'rmeb-contracts'
import {restore_keystore} from './Lightwallet'
import {signing, txutils} from 'eth-lightwallet'
const SignerProvider = require('ethjs-provider-signer');
const Web3 = require('web3')

//let instanceContract = null
let web3;
let ks;

function signTransaction(rawTx, cb) {
  let tx = {
    nonce: rawTx.nonce,
    gasPrice: rawTx.gasPrice,
    to: rawTx.to,
    value: rawTx.value,
    gasLimit: rawTx.gas,
    data: rawTx.data
  }
  console.log(rawTx)
  get_derived_key(rawTx.password).then(pwDerivedKey => {
    let contractTx = txutils.createContractTx(rawTx.from, tx)
    console.log(contractTx)
    let signedTx = signing.signTx(ks, pwDerivedKey, contractTx.tx, rawTx.from)
    cb(null, '0x' + signedTx)
  }).catch(e => cb(e))
}

export function initWeb3(keystore){
    ks = restore_keystore(keystore)
    ks.signTransaction = signTransaction
    const provider = new SignerProvider('https://rinkeby.infura.io', ks);
    web3 = new Web3(provider)
    //initContract()
}

export function deployContract(drugs, password) {
  let artifact = DespachoReceta.v1;
  let abi = artifact.abi;
  let bytecode = artifact.bytecode;
  let instanceContract = new web3.eth.Contract(abi);

  let BN = web3.utils.BN;

  let codes = drugs.map(d => (
    web3.utils.toHex(new BN(d.code.toString()).toArray())
  ))
  let quantity = drugs.map(d => (
    web3.utils.toHex(d.dose)
  ))

  console.log(codes, quantity)

  return instanceContract.deploy({
      data: bytecode,
      arguments: [codes, quantity, '0x0', '0x0']
  }).send({
    from: '0x' + ks.addresses[0],
    gas: 600000,
    password
  })
}

export function get_accounts() {
    return ks.addresses
}

export function get_seed_words(password) {
  return get_derived_key(password).then(pwDerivedKey => {
    return Promise.resolve(ks.getSeed(pwDerivedKey).toString())
  })
}

function get_derived_key(password) {
  return new Promise((resolve, reject) => {
    ks.keyFromPassword(password, (e, pwDerivedKey) => {
      if (e) return reject(e)
      resolve(pwDerivedKey)
    })
  })
}

export function getWeiBalance(address) {
    return web3.eth.getBalance(address)
}

export function getTransaction(txHash) {
  return web3.eth.getTransaction(txHash)
}

export function network() {
  return web3.eth.net.getId()
}

export function net_label(netId) {
  switch (netId) {
    case 1:
      return 'Mainnet'
    case 2:
      return 'Deprecated'
    case 3:
      return 'Ropsten'
    case 4:
      return 'Rinkeby'
    case 42:
      return 'Kovan'
    default:
      return 'Unknown'
  }
}

export function from_wei(wei) {
  return (parseInt(wei, 10) / 1000000000000000000)
}

export function sendTransaction(password, tx) {
  return get_derived_key(password).then(pwDerivedKey => {
    tx.pwDerivedKey = pwDerivedKey
    console.log('send', pwDerivedKey)
    return web3.eth.sendTransaction(tx)
  })
}
