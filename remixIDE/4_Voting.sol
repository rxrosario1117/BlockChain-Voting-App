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
    mapping(uint => Voter) public voters;

    Candidate[] public candidates;

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

        candidateNum++;
    }

    // Make a ballot and update a candidates vote count
    function createBallot(string memory _usersVote, uint _candidateNum) public {
        voters[voterNum].hasVoted = true;
        voters[voterNum].usersVote = _usersVote;
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

    function getVoterStatus(uint _voterNum) external view returns (bool) {
        return voters[_voterNum].hasVoted;
    }

    function getUsersVote(uint _voterNum) external view returns (string memory) {
        return voters[_voterNum].usersVote;
    }

    function getVoterNum() external view returns (uint) {
        return voterNum;
    }
}