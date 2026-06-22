// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RecordRegistry {

    // ==========================
    // STRUCT
    // ==========================
    struct Record {

        string cid;

        string recordType;

        uint256 timestamp;
    }

    // ==========================
    // STORAGE
    // ==========================
    mapping(address => Record[])
        private records;

    // ==========================
    // EVENT
    // ==========================
    event RecordAdded(

        address indexed patient,

        string cid,

        string recordType,

        uint256 timestamp
    );

    // ==========================
    // ADD RECORD
    // ==========================
    function addRecord(

        string memory _cid,

        string memory _recordType

    ) public {

        records[msg.sender].push(

            Record({

                cid: _cid,

                recordType: _recordType,

                timestamp: block.timestamp
            })
        );

        emit RecordAdded(

            msg.sender,

            _cid,

            _recordType,

            block.timestamp
        );
    }

    // ==========================
    // GET RECORDS
    // ==========================
    function getMyRecords()

        public

        view

        returns (Record[] memory)

    {

        return records[msg.sender];
    }
}