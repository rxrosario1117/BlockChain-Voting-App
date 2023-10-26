// G2G before bc = logic works before trying with blockchain stuff



$(document).ready(addCandidate());

// TODO
    // Ask group if we need to add/change the smart contract and web app

async function addCandidate() {
    // Set contract and set gas //
		// contract = new web3.eth.Contract(contractABI, contractAddress);

        // let numberOfAdmins = await contract.methods.getTaskCount().call({ from: web3.eth.defaultAccount });
}

async function showVoterNum() {
    // Set contract and set gas //
    contract = new web3.eth.Contract(contractABI, contractAddress);

    // let numberOfAdmins = await contract.voterNum();
    let numberOfAdmins = await contract.methods.getVoterNum().call({ from: web3.eth.defaultAccount });



    document.getElementById('voter-id').innerText = numberOfAdmins;
}

// G2G before bc -  Verifies password then
function verifyPassword(buttonToHide) {
    const adminPass = document.getElementById('admin-pass').value;
    // GET admin pass from bc
    const bcPass = '33';

    if (adminPass == bcPass) {
        document.getElementById('admin-pass').value = '';
        showButton();
        hideButton(buttonToHide);
    }
}

// G2G before bc - Hides the button if there's already an admin cuz there can only be ONE admin
function hideButton(buttonToHide) {
    // GET number of admins from bc
    const admins = 1;    

    if (admins >= 1) {
        document.getElementById(buttonToHide).hidden = true;
        document.getElementById('admin-pass').hidden = true;
        document.getElementById('top-title').innerText = 'ADMIN LOGGED IN'
    }
}

// G2G before bc
function showButton() {
    document.getElementById('candidate-page-button').hidden = false;
}
