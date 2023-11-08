// SPDX-License-Identifier: GPL-3.0 
pragma solidity >=0.8.0 <0.9.0;  

contract Voting {

    uint public voterNum;  // Num assigned to each voter
    uint public candidateNum; // Num assigend to each candidate
    uint public numOfAdmins;

    // The voter participating in the election
    struct Voter {
        bool hasVoted;  // True if a vote has been cast
        string usersVote; // Name of the candidate the user voted for 
    }

    // Candidate with a name and vote count
    struct Candidate {
        string name;    // Candidate name
        uint voteCount; // Num of accumulated votes
        uint id;
    }

    // Set up an admin who can add candidates and determine who has won
    struct Admin {
        string password;    // Admin password 
    }

    // Mapping to store all voters according to voterNum
    // mapping(uint => Voter) public voters;
    mapping(address => Voter) public voters;

    Candidate[] public candidates;
    string[] public can;

    // Constructor
    constructor() {
        voterNum = 999;
        candidateNum = 0;
        numOfAdmins = 0;
    }

    // Add candidate to candidates array
    function addCandidate(string memory _name) public {
        candidates.push(Candidate({
            name: _name,
            voteCount: 0,
            id: candidateNum
        }));

        popStringList();

        candidateNum++;
    }

    

    // Make a ballot and update a candidates vote count
    function createBallot(string memory _usersVote, uint _candidateNum) public {
        // require(candidateNum < can.length, "Invalid candidate input");
        require(!voters[msg.sender].hasVoted, "You have already voted");
        voters[msg.sender].hasVoted = true;
        voters[msg.sender].usersVote = _usersVote;
        // require(!voters[voterNum].hasVoted, "You have already voted");
        // voters[voterNum].hasVoted = true;
        // voters[voterNum].usersVote = _usersVote;
        voterNum++;

        // Increment vote count for a candidate
        for (uint i = 0; i < candidates.length; i++) {
            // If the ballot's candidate num == candidates candidate num
            if (_candidateNum == candidates[i].id) {
                candidates[i].voteCount += 1;
                break;
            }
        }
    }

    function getVoteCount(uint _candidateNum) external view returns (uint) {
        return candidates[_candidateNum].voteCount;
    }

    function getCandidateName(uint _candidateNum) external view returns (string memory) {
        return candidates[_candidateNum].name;
    }

    function getCandidateIndex(string memory _name) public view returns (int) {
        for (uint i = 0; i < candidates.length; i++) {
            if (keccak256(abi.encodePacked(candidates[i].name)) == keccak256(abi.encodePacked(_name))) {
                return int(i);
            }
        }
        // Return a value (-1 or any other sentinel value) to indicate that the candidate was not found
        return -1;
    }

    function getVoterStatus() external view returns (bool) {
        return voters[msg.sender].hasVoted;
        // return voters[voterNum].hasVoted;
    }

    function getUsersVote() external view returns (string memory) {
        return voters[msg.sender].usersVote;
        // return voters[voterNum].usersVote;
    }

    function getVoterNum() external view returns (uint) {
        return voterNum;
    }

    // function getCandidateLength() public view returns (uint){
    //     return candidates.length;
    // }

    function getArrayElement(uint index) public view returns (uint, string memory) {
        require(index < candidates.length, "Index out of bounds");
        return (candidates[index].id, candidates[index].name);
    }

    // function votingSatus() public view returns (string memory) {
    //     string memory result = "";
    //     for (uint i = 0; i < candidates.length; i++) {
    //     (uint candidateId, string memory candidateName) = getArrayElement(i);
    //     result = string(abi.encodePacked(result, candidateId, " ", candidateName, "\n"));
    // }
    // return result;
    // }


    function getChartData() public view returns (int[] memory) {
        int[] memory localArray = new int[](candidates.length);
        for (uint i = 0; i < candidates.length; i++) {
            localArray[i] = int256(candidates[i].voteCount);
        }
        return localArray;
    }
    

    function popStringList() public {
    string memory result = "";
    uint x = candidates.length-1;

    (uint candidateId, string memory candidateName) = getArrayElement(x);
    can.push(string(abi.encodePacked(result, candidateId, " ", candidateName, "\n")));
    
    }
    

    function getTodoList() public view returns (string[] memory) {
        return can;
    }

   

 

}