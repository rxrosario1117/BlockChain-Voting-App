// SPDX-License-Identifier: GPL-3.0 
pragma solidity >=0.8.0 <0.9.0; 
/// @title A contract for demonstrate how to build a to-do list application
/// @notice For now, this contract just show how to add/delete/get/update/count the task
contract Bloc{
	// Defining a structure to
	// store a task
	struct Task
	{
		string task;
		bool isDone;
        bool hasVoted;
	}

	mapping (address => Task[]) private Users;
		
	// Defining function to add a task
	function addTask(string calldata _task) external
	{
		Users[msg.sender].push(Task({
			task:_task,
			isDone:false,
            hasVoted:false
		}));
	}

	// Defining a function to get details of a task
	function getTask(uint _taskIndex) external view returns (Task memory)
	{
		Task storage task = Users[msg.sender][_taskIndex];
		return task;
	}

	// Defining a function to update status of a task
	function updateStatus(uint256 _taskIndex,bool _status) external
	{
		Users[msg.sender][_taskIndex].isDone = _status;
	}

	// Defining a function to delete a task
	function deleteTask(uint256 _taskIndex) external
	{
		delete Users[msg.sender][_taskIndex];
	}

	// Defining a function to get task count.
	function getTaskCount() external view returns (uint256)
	{
		return Users[msg.sender].length;
	}

    // VOTING STUFF BELOW 
    // Works to get voting status and changes the voter status to make sure the user only votes once
    function getVoteStatus(uint _taskIndex) external view returns (bool) {
        return Users[msg.sender][_taskIndex].hasVoted;
    }

    function updateVoteStatus(uint _taskIndex) external {
		bool x = Users[msg.sender][_taskIndex].hasVoted;

		Users[msg.sender][_taskIndex].hasVoted = !x;
    }
}
