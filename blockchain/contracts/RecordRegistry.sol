// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RecordRegistry {
    struct Record {
        string cid;
        string recordType;
        string fileHash;
        uint256 timestamp;
    }

    mapping(address => Record[]) private records;

    event RecordAdded(
        address indexed patient,
        string cid,
        string recordType,
        string fileHash,
        uint256 timestamp
    );

    function addRecord(
        string memory _cid,
        string memory _recordType,
        string memory _fileHash
    ) public {
        records[msg.sender].push(
            Record({
                cid: _cid,
                recordType: _recordType,
                fileHash: _fileHash,
                timestamp: block.timestamp
            })
        );

        emit RecordAdded(
            msg.sender,
            _cid,
            _recordType,
            _fileHash,
            block.timestamp
        );
    }

    function getMyRecords() public view returns (Record[] memory) {
        return records[msg.sender];
    }
}