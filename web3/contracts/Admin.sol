// SPDX-License-Identifier:  UNLICENSED
pragma solidity ^0.8.9;

contract JAM305Registration {
    address public admin;
    
    struct Member {
        string name;
        string registrationId;
        string image;
        uint256 registrationFees;
        uint256 membershipRenewalFees;
        uint256 monthlyDues;
        uint256 monthlyLevies;
    }
    
    mapping(address => Member) public members;
    address[] public memberAddresses;
    
    event RegistrationIdGenerated(address indexed member, string registrationId);
    event MembershipRevoked(address indexed member);
    event FinancialStatusUpdated(address indexed member, uint256 registrationFees, uint256 membershipRenewalFees, uint256 monthlyDues, uint256 monthlyLevies);
    
    constructor() {
        admin = msg.sender;
    }
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only the admin can call this function.");
        _;
    }
    
    modifier onlyMember(address memberAddress) {
        require(memberAddress == msg.sender, "You can only access your own dashboard.");
        _;
    }
    
    modifier onlyAdminOrMember(address memberAddress) {
        require(memberAddress == msg.sender || msg.sender == admin, "Only the admin or the member can access this function.");
        _;
    }
    
    function generateRegistrationId(string memory name, string memory image) external onlyAdmin {
        string memory registrationId = _generateRandomId();
        members[msg.sender].name = name;
        members[msg.sender].registrationId = registrationId;
        members[msg.sender].image = image;
        memberAddresses.push(msg.sender);
        emit RegistrationIdGenerated(msg.sender, registrationId);
    }
    
    function updateFinancialStatus(address member, uint256 registrationFees, uint256 membershipRenewalFees, uint256 monthlyDues, uint256 monthlyLevies) external onlyAdmin {
        members[member].registrationFees = registrationFees;
        members[member].membershipRenewalFees = membershipRenewalFees;
        members[member].monthlyDues = monthlyDues;
        members[member].monthlyLevies = monthlyLevies;
        emit FinancialStatusUpdated(member, registrationFees, membershipRenewalFees, monthlyDues, monthlyLevies);
    }
    
    function revokeMembership(address member) external onlyAdmin {
        delete members[member];
        for (uint256 i = 0; i < memberAddresses.length; i++) {
            if (memberAddresses[i] == member) {
                memberAddresses[i] = memberAddresses[memberAddresses.length - 1];
                memberAddresses.pop();
                break;
            }
        }
        emit MembershipRevoked(member);
    }
    
    function getMembersCount() external view returns (uint256) {
        return memberAddresses.length;
    }
    
    function getMemberDetails(uint256 index) external view returns (string memory, string memory, string memory) {
        require(index < memberAddresses.length, "Invalid index.");
        address memberAddress = memberAddresses[index];
        Member memory member = members[memberAddress];
        return (member.name, member.registrationId, member.image);
    }

    
    function getMemberDashboard() external view onlyMember(msg.sender) returns (string memory) {
        Member memory member = members[msg.sender];
        return string(abi.encodePacked("Welcome to your dashboard, ", member.name, "!"));
    }
    
    // function _generateRandomId() private view returns (string memory) {
    //     uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.timestamp,block.difficulty, msg.sender))) % 10000;
    //     string memory registrationId = string(abi.encodePacked(toString(randomNumber), "JAM"));
    //     return registrationId;
    //     }

    function _generateRandomId() private view returns (string memory) {
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.timestamp, block.basefee, msg.sender))) % 10000;
        string memory registrationId = string(abi.encodePacked(toString(randomNumber), "JAM"));
        return registrationId;
    }

    // Helper function to convert a uint to a string
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

         
}