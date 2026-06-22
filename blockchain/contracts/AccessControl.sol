// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AccessControl {

    // ==========================
    // STORAGE
    // ==========================
    mapping(address => mapping(address => bool))
        private accessPermissions;

    // ==========================
    // EVENTS
    // ==========================
    event AccessGranted(

        address indexed patient,

        address indexed doctor
    );

    event AccessRevoked(

        address indexed patient,

        address indexed doctor
    );

    // ==========================
    // GRANT ACCESS
    // ==========================
    function grantAccess(

        address doctor

    ) public {

        accessPermissions[msg.sender][doctor] = true;

        emit AccessGranted(
            msg.sender,
            doctor
        );
    }

    // ==========================
    // REVOKE ACCESS
    // ==========================
    function revokeAccess(

        address doctor

    ) public {

        accessPermissions[msg.sender][doctor] = false;

        emit AccessRevoked(
            msg.sender,
            doctor
        );
    }

    // ==========================
    // CHECK ACCESS
    // ==========================
    function checkAccess(

        address patient,

        address doctor

    )

        public

        view

        returns (bool)

    {

        return accessPermissions[patient][doctor];
    }
}