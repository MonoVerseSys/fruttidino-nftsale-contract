// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";


contract FruttiDinoTeamLockupWallet  is Initializable, OwnableUpgradeable {
    event Allocated(address indexed member, uint256 indexed amount, uint256 indexed releaseTimestamp);
    event Withdrawal(address indexed member, uint256 indexed amount);
    event Burn(address indexed member,  uint256 indexed amount, address to);


    using AddressUpgradeable for address;
    uint256 _allocAmount;
    address _fdtAddress;


    struct AllocationInfo {
        uint256 amount;
        uint256 releaseTimestamp;
    }
    mapping(address => AllocationInfo[]) _allocationInfos;
    function initialize(address fdtAddress) public initializer {
        __Ownable_init();
        setFdtAddress(fdtAddress);
    }

    function setFdtAddress(address fdtAddress) public onlyOwner {
        _fdtAddress = fdtAddress;
    }

    function allocAmount() public view returns(uint256) {
        return _allocAmount;
    }

    function _getTimestamp() internal view returns(uint256) {
        return block.timestamp;
    }

    function allocation(address to, uint256 amount, uint256 releaseTimestamp) public onlyOwner {


        bytes memory currentBalancePayload = abi.encodeWithSignature("balanceOf(address)", address(this));
        bytes memory balanceResult = _fdtAddress.functionStaticCall(currentBalancePayload);
        uint256 balance = abi.decode(balanceResult, (uint256));

        require(_allocAmount + amount <= balance, "contract balance is insufficient.");
        _allocAmount += amount;

        _allocationInfos[to].push(
            AllocationInfo(amount, releaseTimestamp)
        );

        emit Allocated(to, amount, releaseTimestamp);
    }

    function totalBalance(address member) public view returns(uint256) {
        AllocationInfo[] memory allocs = _allocationInfos[member];
        // block.timestamp
        uint256 totalAmount;
        for(uint i = 0; i < allocs.length; i++) {
            totalAmount += allocs[i].amount;
        }
        return totalAmount;
    }

    function lockBalance(address member) public view returns(uint256) {
        AllocationInfo[] memory allocs = _allocationInfos[member];
        // block.timestamp
        uint256 totalAmount;
        for(uint i = 0; i < allocs.length; i++) {
            if(_getTimestamp() < allocs[i].releaseTimestamp) {
                totalAmount += allocs[i].amount;
            }
        }
        return totalAmount;
    }

    function releaseBalance(address member) public view returns(uint256) {
        AllocationInfo[] memory allocs = _allocationInfos[member];
        // block.timestamp
        uint256 totalAmount;
        for(uint i = 0; i < allocs.length; i++) {
            if(_getTimestamp() >= allocs[i].releaseTimestamp) {
                totalAmount += allocs[i].amount;
            }
        }
        return totalAmount;
    }

    function _reduceAllocationInfo(address member, uint256 amount) internal {
        AllocationInfo[] storage allocs = _allocationInfos[member];
        uint256 remain = amount;
        for(uint i = 0; i < allocs.length; i++) {
            if(_getTimestamp() >= allocs[i].releaseTimestamp && remain > 0 && allocs[i].amount > 0) {
                if(remain > allocs[i].amount) {
                    allocs[i].amount = 0;
                    remain -= allocs[i].amount;
                } else {
                    allocs[i].amount = allocs[i].amount - remain;
                    remain = 0;
                }
            }
        }
    }

    function withdrawFromMember() public returns(bool) {
        uint256 availableBalance = releaseBalance(_msgSender());
        require(availableBalance > 0, "no withdrawal amount available.");
        _allocAmount -= availableBalance;
        _reduceAllocationInfo(_msgSender(), availableBalance);
        bytes memory transferPayload = abi.encodeWithSignature("transfer(address,uint256)", _msgSender(), availableBalance);
        bytes memory result = _fdtAddress.functionCall(transferPayload);
        bool r = abi.decode(result, (bool));
        emit Withdrawal(_msgSender(), availableBalance);
        return r;

    }

    function burn(address member, address to) public onlyOwner returns(bool)  {
        AllocationInfo[] storage allocs = _allocationInfos[member];
        uint256 total;
        for(uint i = 0; i < allocs.length; i++) {
            total += allocs[i].amount;
            allocs[i].amount = 0;
        }
        _allocAmount -= total;

        bytes memory transferPayload = abi.encodeWithSignature("transfer(address,uint256)", to, total);
        bytes memory result = _fdtAddress.functionCall(transferPayload);
        bool r = abi.decode(result, (bool));
        emit Burn(member, total, to);
        return r;
    }


}