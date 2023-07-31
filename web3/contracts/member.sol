// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./Admin.sol";  // Import the JAM305Registration contract

contract MemberContract {
    address public memberAddress;
    JAM305Registration public adminContract;

    struct MemberProfile {
        string name;
        string phoneNumber;
        string image;
        string maritalStatus;
        string emailAddress;
        string houseAddress;
        string sex;
        string dateOfBirth;
        string validIdNumber;
        uint256 registrationFees;
        uint256 membershipRenewalFees;
        uint256 monthlyDues;
        uint256 monthlyLevies;
    }

    struct MemberDetails {
        string name;
        string registrationId;
        string image;
    }

    MemberProfile public memberProfile;
    bool public isAdminRegistered;
    string public registrationId;

    constructor(address _adminContractAddress) {
        memberAddress = msg.sender; // Set the member address to the sender (the member)
        adminContract = JAM305Registration(_adminContractAddress);
        isAdminRegistered = false;
    }

    // Function for members to input their unique registration ID provided by the admin
    function inputRegistrationId(string memory _registrationId) external {
        // Ensure the member hasn't already inputted a registration ID
        require(isAdminRegistered == false, "You have already inputted a registration ID.");

        // Check if the provided registration ID exists in the admin contract
        require(bytes(adminContract.getMemberName(memberAddress)).length > 0, "Invalid registration ID.");

        // Mark the member as registered by the admin
        isAdminRegistered = true;

        // Set the member's registration ID
        registrationId = _registrationId;
    }

    // Function for a member to self-register with their details
    function registerSelf(
        string memory _name,
        string memory _phoneNumber,
        string memory _image,
        string memory _maritalStatus,
        string memory _emailAddress,
        string memory _houseAddress,
        string memory _sex,
        string memory _dateOfBirth,
        string memory _validIdNumber
    ) external {
        // Make sure the member has inputted a registration ID from the admin
        require(isAdminRegistered, "Please input a valid registration ID provided by the admin.");

        // Initialize the member's profile information
        memberProfile = MemberProfile(
            _name,
            _phoneNumber,
            _image,
            _maritalStatus,
            _emailAddress,
            _houseAddress,
            _sex,
            _dateOfBirth,
            _validIdNumber,
            0,  // These values will be updated via the getMemberDashboard function
            0,  // They are set to 0 initially to avoid potential confusion
            0,
            0
        );
    }

    // Function to update member profile information
    function updateProfile(
        string memory _name,
        string memory _phoneNumber,
        string memory _image,
        string memory _maritalStatus,
        string memory _emailAddress,
        string memory _houseAddress,
        string memory _sex,
        string memory _dateOfBirth,
        string memory _validIdNumber
    ) external {
        require(msg.sender == memberAddress, "You can only update your own profile.");

        // Update the member's profile information
        memberProfile.name = _name;
        memberProfile.phoneNumber = _phoneNumber;
        memberProfile.image = _image;
        memberProfile.maritalStatus = _maritalStatus;
        memberProfile.emailAddress = _emailAddress;
        memberProfile.houseAddress = _houseAddress;
        memberProfile.sex = _sex;
        memberProfile.dateOfBirth = _dateOfBirth;
        memberProfile.validIdNumber = _validIdNumber;

        emit ProfileUpdated(memberAddress, _name, _image);
    }

    // Function to get the member's dashboard information
    function getMemberDashboard() external view returns (
        string memory,      // MemberProfile name
        string memory,      // MemberProfile phoneNumber
        string memory,      // MemberProfile image
        string memory,      // MemberProfile maritalStatus
        string memory,      // MemberProfile emailAddress
        string memory,      // MemberProfile houseAddress
        string memory,      // MemberProfile sex
        string memory,      // MemberProfile dateOfBirth
        string memory,      // MemberProfile validIdNumber
        uint256,            // registrationFees
        uint256,            // membershipRenewalFees
        uint256,            // monthlyDues
        uint256             // monthlyLevies
    ) {
        // Get the financial status of the member from the admin contract
        (
            uint256 registrationFees,
            uint256 membershipRenewalFees,
            uint256 monthlyDues,
            uint256 monthlyLevies
        ) = adminContract.getFinancialStatus(memberAddress);

        return (
            memberProfile.name,
            memberProfile.phoneNumber,
            memberProfile.image,
            memberProfile.maritalStatus,
            memberProfile.emailAddress,
            memberProfile.houseAddress,
            memberProfile.sex,
            memberProfile.dateOfBirth,
            memberProfile.validIdNumber,
            registrationFees,
            membershipRenewalFees,
            monthlyDues,
            monthlyLevies
        );
    }


    // Function to generate a unique registration ID in the format "JAM/305-SMG/xxx"
    function generateUniqueRegistrationId() private view returns (string memory) {
        uint256 memberId = adminContract.getMembersCount();
        string memory prefix = "JAM/305-SMG/";
        string memory idNumber = toString(memberId + 1);
        string memory uniqueId = string(abi.encodePacked(prefix, idNumber));
        return uniqueId;
    }

    // Function to convert a uint to a string
    function toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }

        uint256 temp = value;
        uint256 digits;

        while (temp != 0) {
            digits++;
            temp /= 10;
        }

        bytes memory buffer = new bytes(digits);

        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }

        return string(buffer);
    }

    // Event to notify when the profile is updated
    event ProfileUpdated(address indexed member, string name, string image);
}