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

async function addCandidate(name) {

    await contract.methods.addCandidate(name).send({ from: web3.eth.defaultAccount, gas: web3.eth.getBlock("latest").gasLimit });

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
