// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Context.sol";

contract FruttidinoInvest is Context {
    event ERC20Released(uint256 amount);

    uint256 private _released;
    address private immutable _tokenAddress;
    address private immutable _beneficiary;
    uint64 private immutable _start;
    uint64 private immutable _duration;


    constructor(
        address tokenAddress_, // 토큰주소
        address beneficiaryAddress, // 투자자 주소
        uint64 startTimestamp, // 락업이 풀리는 시점
        uint64 durationSeconds // 선형 기간 (초)
    ) {
        require(beneficiaryAddress != address(0), "VestingWallet: beneficiary is zero address");

        _tokenAddress = tokenAddress_;
        _beneficiary = beneficiaryAddress;
        _start = startTimestamp;
        _duration = durationSeconds;
    }

    function start() public view returns (uint64) {
        return _start;
    }

    function beneficiary() public view returns (address) {
        return _beneficiary;
    }

    function tokenAddress() public view returns (address) {
        return _tokenAddress;
    }

    function duration() public view returns (uint256) {
        return _duration;
    }


    function released() public view returns (uint256) {
        return _released;
    }

    function release() public {
        uint256 releasable = vestedAmount(uint64(block.timestamp)) - released();
        _released += releasable;
        emit ERC20Released(releasable);
        SafeERC20.safeTransfer(IERC20(tokenAddress()), beneficiary(), releasable);
    }

    function vestedAmount(uint64 timestamp) public view returns (uint256) {
        return _vestingSchedule(IERC20(tokenAddress()).balanceOf(address(this)) + released(), timestamp);
    }


    function _vestingSchedule(uint256 totalAllocation, uint64 timestamp) internal view returns (uint256) {
        if (timestamp < start()) {
            return 0;
        } else if (timestamp > start() + duration()) {
            return totalAllocation;
        } else {
            return (totalAllocation * (timestamp - start())) / duration();
        }
    }

}