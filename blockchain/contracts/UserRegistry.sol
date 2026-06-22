// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract UserRegistry {

    // User roles
    enum Role {
        None,
        Patient,
        Doctor,
        Admin
    }

    // User structure
    struct User {
        address walletAddress;
        string name;
        Role role;
        bool verified;
    }

    // Mapping wallet => user
    mapping(address => User) public users;

    // Admin wallet
    address public owner;

    // Events
    event UserRegistered(
        address indexed userAddress,
        string name,
        Role role
    );

    event DoctorVerified(address indexed doctor);

    // Constructor
    constructor() {
        owner = msg.sender;

        // Register contract deployer as admin
        users[msg.sender] = User(
            msg.sender,
            "Admin",
            Role.Admin,
            true
        );
    }

    // Register user
    function registerUser(
        string memory _name,
        Role _role
    ) public {

        require(
            users[msg.sender].walletAddress == address(0),
            "User already registered"
        );

        require(
            _role == Role.Patient || _role == Role.Doctor,
            "Invalid role"
        );

        users[msg.sender] = User(
            msg.sender,
            _name,
            _role,
            false
        );

        emit UserRegistered(
            msg.sender,
            _name,
            _role
        );
    }

    // Verify doctor
    function verifyDoctor(address _doctor) public {

        require(
            users[msg.sender].role == Role.Admin,
            "Only admin can verify"
        );

        require(
            users[_doctor].role == Role.Doctor,
            "Not a doctor"
        );

        users[_doctor].verified = true;

        emit DoctorVerified(_doctor);
    }

    // Get user details
    function getUser(
        address _user
    ) public view returns (User memory) {
        return users[_user];
    }
}