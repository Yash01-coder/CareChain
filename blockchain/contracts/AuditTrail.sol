// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AuditTrail {

    struct AuditLog {
        address user;
        string actionType;
        uint256 recordId;
        uint256 timestamp;
    }

    AuditLog[] public logs;

    // Event
    event ActionLogged(
        address indexed user,
        string actionType,
        uint256 recordId,
        uint256 timestamp
    );

    // Add audit log
    function logAction(
        string memory _actionType,
        uint256 _recordId
    ) public {

        logs.push(
            AuditLog(
                msg.sender,
                _actionType,
                _recordId,
                block.timestamp
            )
        );

        emit ActionLogged(
            msg.sender,
            _actionType,
            _recordId,
            block.timestamp
        );
    }

    // Get all logs
    function getLogs()
        public
        view
        returns (AuditLog[] memory)
    {
        return logs;
    }
}