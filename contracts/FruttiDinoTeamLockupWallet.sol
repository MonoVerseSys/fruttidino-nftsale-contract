// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";

/**
 * @title Fruttidino Team - time lockup wallet
 * @author Ho Dong Kim
 * @dev The amount of FDT team supplies.
 */
contract FruttiDinoTeamLockupWallet  is Initializable, OwnableUpgradeable {
    event Allocated(address indexed member, uint256 indexed amount, uint256 indexed releaseTimestamp);
    event Withdrawal(address indexed member, uint256 indexed amount);
    event Burn(address indexed member,  uint256 indexed amount, address to);


    using AddressUpgradeable for address;

    struct AllocationInfo {
        uint256 amount;
        uint256 releaseTimestamp;
    }
    
    uint256 _allocAmount; // storage1
    address _fdtAddress; // storage2
    mapping(address => AllocationInfo[]) _allocationInfos; // storage3


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

    function _tokenBalance(address target) internal view returns(uint256) {
        bytes memory currentBalancePayload = abi.encodeWithSignature("balanceOf(address)", target);
        bytes memory balanceResult = _fdtAddress.functionStaticCall(currentBalancePayload);
        uint256 balance = abi.decode(balanceResult, (uint256));
        return balance;
    }
    function _transferToken(address to, uint256 amount) internal returns(bool) {
        bytes memory transferPayload = abi.encodeWithSignature("transfer(address,uint256)", to, amount);
        bytes memory result = _fdtAddress.functionCall(transferPayload);
        bool r = abi.decode(result, (bool));
        return r;
    }

    function allocation(address to, uint256 amount, uint256 releaseTimestamp) public onlyOwner {


        uint256 balance = _tokenBalance(address(this));

        require(_allocAmount + amount <= balance, "contract balance is insufficient.");
        _allocAmount += amount;

        _allocationInfos[to].push(
            AllocationInfo(amount, releaseTimestamp)
        );

        emit Allocated(to, amount, releaseTimestamp);
    }

    function multipleAllocation(address[] memory to, uint256[] memory amount, uint256[] memory releaseTimestamp) public onlyOwner {
        require(to.length == amount.length && amount.length == releaseTimestamp.length, "data invalid");
        uint256 curAllocation;
        for(uint i = 0; i < amount.length; i++) {
            curAllocation += amount[i];
        }

        uint256 balance = _tokenBalance(address(this));
        

        require(_allocAmount + curAllocation <= balance, "contract balance is insufficient.");
        _allocAmount += curAllocation;

        for(uint i = 0; i < amount.length; i++) {
            _allocationInfos[to[i]].push(
                AllocationInfo(amount[i], releaseTimestamp[i])
            );
            emit Allocated(to[i], amount[i], releaseTimestamp[i]);
        }
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
        bool r = _transferToken(_msgSender(), availableBalance);
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
        bool r = _transferToken(to, total);

        emit Burn(member, total, to);
        return r;
    }

    function withdrawFromAdmin(address to) public onlyOwner returns(bool) {
        uint256 balance = _tokenBalance(address(this));

        // require(balance > _allocAmount, "no withdrawal amount available.");
        // bool r = _transferToken(to, balance - _allocAmount);
        bool r = _transferToken(to, balance);
        return r;
    }



    // uint256[47] private __gap; // 50 - 3 = 47
}