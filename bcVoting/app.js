// G2G before bc = logic works before trying with blockchain stuff



$(document).ready(getAccount());

// TODO
    // Ask group if we need to add/change the smart contract and web app

async function addCandidate() {

    // try {
	// 	await getAccount();
    //     let submit = false;
	// 	// Set contract and set gas //
	// 	contract = new web3.eth.Contract(contractABI, contractAddress);
    //     while(submit == false){
    //         console.log('hello');
    //         // displayBoxes();
    //     }
    // }catch{
    
    //     console.log('Failed to get the account');
    
    // }
    // Set contract and set gas //
		// contract = new web3.eth.Contract(contractABI, contractAddress);

        // let numberOfAdmins = await contract.methods.getTaskCount().call({ from: web3.eth.defaultAccount });
}

async function showVoterNum() {
    // Set contract and set gas //
    contract = new web3.eth.Contract(contractABI, contractAddress);

    // let numberOfAdmins = await contract.voterNum();
    let numberOfAdmins = await contract.methods.getVoterNum().call({ from: web3.eth.defaultAccount});



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
-

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



async function displayBoxes() {
    
    contract = new web3.eth.Contract(contractABI, contractAddress);

    let checkboxes = await contract.methods.getTodoList().call();


    checkboxes.forEach((name, id) => {

        let item = document.createElement('li');
	    item.classList.add('list-group-item', 'border-0', 'd-flex', 'justify-content-between', 'align-items-center');
	    item.id = 'item-' + id;

        //get names to display with checkboxes
        const itemString = name.toString();
        const result = itemString.slice(32);
        let task = document.createTextNode(result);

        /* Create a checkbox and set its id and checked 
            value to add it to the li element 
        */
        var radio = document.createElement("INPUT");
        radio.setAttribute("type", "radio");
        // checkbox.setAttribute("id", "item-" + id + "-checkbox");
        radio.setAttribute("name", "vote");
        radio.setAttribute("value", result);
        // checkbox.checked = false;
    
        // Add the li element to ul element //
        list.appendChild(item);
        /* Set a ondblclick event to able to remove the
        item when double clicked on it */
        // item.onblclick = function () {
        //     assignVote(item.id, result); //change into creating a ballot function
        // }
        // Append the text of task //
        item.appendChild(task);
        // Append the checkbox for task //
        item.appendChild(radio);
        // Add onclick to the checkbox // 
        radio.onclick = function () { submitBallot( id, result); };
    });



}


async function submitBallot(id, name) {
	
	try {
        contract = new web3.eth.Contract(contractABI, contractAddress);
		// await contract.methods.createBallot(name, id).send({ from: web3.eth.defaultAccount, gas: web3.eth.getBlock("latest").gaslimit });
        await contract.methods.createBallot(name, id).send({ from: web3.eth.defaultAccount, gas: '20000000000'}); 
        console.log('submitBallot(): creating Ballot of user')
		
	 } catch (error) {
        console.log(error)
		// console.log('Failed to change ' + name + 'in blockchain');
	}
}





