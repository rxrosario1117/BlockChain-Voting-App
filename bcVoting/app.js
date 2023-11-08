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

async function displayBoxes() {
    
    // const contract = new web3.eth.Contract(contractABI, contractAddress);

    let checkboxes = await contract.methods.getTodoList().call();


    checkboxes.forEach((name, id) => {

        let item = document.createElement('li');
	    item.classList.add('list-group-item', 'border-0', 'd-flex', 'justify-content-between', 'align-items-center');
	    item.id = 'item-' + id;

        //get names to display with checkboxes
        const itemString = name.toString();
        const result = itemString.slice(32);
        let task = document.createTextNode(result);

        /* Create a checkbox:
            <input type="radio" id = [id] name="vote" value=[name]> [task]
            and set its id and checked 
            value to add it to the li element 
        */
        var radio = document.createElement("INPUT");
        radio.setAttribute("type", "radio");
        radio.setAttribute("id", id);
        // checkbox.setAttribute("id", "item-" + id + "-checkbox");
        radio.setAttribute("name", "vote");
        radio.setAttribute("value", result);
        // checkbox.checked = false;
    
        // Add the li element to ul element //
        list.appendChild(item);
        
        item.appendChild(task);
        // Append the checkbox for task //
        item.appendChild(radio);
        // Add onclick to the checkbox // 
        
    });

}




async function submitBallot(){
    
    const canList = document.getElementById("list");
    const selectedCan = canList.querySelector('input[name="vote"]:checked');

    if (selectedCan) {
        try {
            // const contract = new web3.eth.Contract(contractABI, contractAddress);
            // await contract.methods.createBallot(name, id).send({ from: web3.eth.defaultAccount, gas: web3.eth.getBlock("latest").gaslimit });
            await contract.methods.createBallot(selectedCan.value, selectedCan.id).send({ from: web3.eth.defaultAccount, gas: '1000000'}); 
            console.log('submitBallot(): creating Ballot of user: ', selectedCan.value)
            document.getElementById("submission").innerHTML = "Succesfully voted";
            
         } catch (error) {
            // console.log(error)
            if (error.message.includes("function inside a smart contract")) {
                console.error("You have already submitted sucessfully");
            } else {
                console.error("An unexpected error occurred:", error);
            }
        }
        // check if querySelector is working (below)
        // console.log("Selected answer: " + selectedCan.value);
    } else {
        console.log("Please select an option.");
    }

    
}

// async function showBarChart(){

//     var ctx = document.getElementById('barChart').getContext('2d');
//     var data = {
//         labels: initialLabels,
//         datasets: [{
//             label: 'Sample Data',
//             data: initialData,
//             backgroundColor: ['red', 'green', 'blue'],
//         }]
//     };
//     var config = {
//         type: 'bar',
//         data: data,
//     };
//     var barChart = new Chart(ctx, config);

    
    
// }

async function updateChart() {

    let voteCount = await contract.methods.getChartData().call();

    //get inputs id and use that to call votecount. then also print names as labels 
    const initialData = [];
    const initialLabels = [];

    const canList = document.getElementById("list");
    const inputElements = canList.querySelectorAll('input');

    //get votecount data for each canidate from remix
    voteCount.forEach((inputData) => {
        let x = parseInt(inputData);
        try{
            initialData.push(x);
            console.log('push data:', x);
        }catch(error){
            console.log("error with pushing data in chart: ", error);
        }

    });

    // Loop through each input element and get its id's for bar labels
    inputElements.forEach(function(input) {
        try{
            const id = input.id;
            const name = input.value;

            initialLabels.push(name);
            console.log('Input ID:', id, " Input Value: ", name, " have been pushed in data sets");
        }catch(error){
            console.log("error with pushing labels in chart: ", error)
        }
        
    });
    // Fetch new data and labels from an external source (e.g., Remix)
    // For simplicity, we'll use static data here
    var newData = initialData;
    var newLabels = initialLabels;

    // Update the chart with the new data and labels
    barChart.destroy(); // Destroy the existing chart
    barChart = createChart(newData, newLabels); // Create a new chart with updated data
}
