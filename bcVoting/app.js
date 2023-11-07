// G2G before bc = logic works before trying with blockchain stuff

// Blockchain method call
    // let foo = await contract.methods.foo().call({ from: web3.eth.defaultAccount });

// Blockchain public attribute call
    // const foo = await contract.methods.foo().call(); 

//send({ from: web3.eth.defaultAccount, gas: web3.eth.getBlock("latest").gasLimit })
    // Sets the from address and how much gas for the transaction

// On window load, get the metamask account number
$(document).ready(getAccount());

// Smart Contract
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Account tracker
let counter = 0;
let accounts = []

async function getAccounts() {
    let accounts = await web3.eth.getAccounts();

    console.log(accounts.length)
}

async function addCandidate(name) {

    // If one doesn't work, try the other
    await contract.methods.addCandidate(name).send({ from: web3.eth.defaultAccount, gas: '1000000' });

    // await contract.methods.addCandidate(name).send({ from: web3.eth.defaultAccount, gas: web3.eth.getBlock("latest").gasLimit });

    // print something on screen saying the candidate was added successfully 

}

// Prints a candidate at some index to the console
async function getCandidateName(index) {
    console.log(await contract.methods.getCandidateName(index).call({ from: web3.eth.defaultAccount }))
}

// Prints the voters number to the console
async function showVoterNum() {
    const voterNum = await contract.methods.voterNum().call();
    
    document.getElementById('voter-id').innerText = voterNum;

    console.log(voterNum)

    getAccounts();

}

// G2G - Verifies password and if valid displays the 'add-candidate' button 
async function verifyPassword(buttonToHide) {
    const adminPass = document.getElementById('admin-pass').value;
    // GET admin pass from bc
    const bcPass = await contract.methods.getAdminPassword().call({ from: web3.eth.defaultAccount });

    if (adminPass == bcPass) {
        document.getElementById('admin-pass').value = '';
        showButton();   // Show button to get to the next page
        hideButton(buttonToHide);   
    } else {
        // Reset input field
        document.getElementById('admin-pass').value = '';
    }
}

// G2G - Hides the button if there's already an admin cuz there can only be ONE admin
async function hideButton(buttonToHide) {
    // GET number of admins from bc
    const numberOfAdmins = await contract.methods.numOfAdmins().call();    

    if (numberOfAdmins >= 1) {
        document.getElementById(buttonToHide).hidden = true;    // Hide button
        document.getElementById('admin-pass').hidden = true;    // Hide input field
        document.getElementById('top-title').innerText = 'ADMIN LOGGED IN'; // Update title
    }
}

// G2G - Show candidate button page when admin is connected
function showButton() {
    document.getElementById('candidate-page-button').hidden = false;
}

// Example to add a new candidate to a table to be displayed on voting page
let newName = 'Natalie'
let newTagID = ''
let count = 0 // Maybe the count should be the candidateNum from the smart contract??

// Maybe a for loop can be used to get the vote count for each candidate
function showCandidateRunnings() {

    // Give a unique tag id to a new candidate added to the table
    newTagID = 'candidate_' + count

    console.log(newTagID)

    // JS to add a new row with a new vote count and candidate name with a new unique tag id so it can be referenced elsewhere
    document.getElementById('canRows').innerHTML += (
        "<tr>" +
            "<td id='"+newTagID+"' style='padding: 10px; border: 1px solid black'>"+newName+"</td>" + 
            "<td style='padding: 10px; border: 1px solid black'>Vote Count</td>" + 
        "</tr>"
    );

    count += 1
}
