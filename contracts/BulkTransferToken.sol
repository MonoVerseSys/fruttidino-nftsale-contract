// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
// import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BulkTransferToken is Ownable {
    using Address for address;
    using Address for address payable;
    constructor() payable {

    }

    function multipleTransfer(address token, address from, address[] memory receivers, uint256[] memory amounts) public {
        require(receivers.length == amounts.length, "invalid params");
        for (uint i = 0; i < receivers.length; i++) {
            address to = receivers[i];
            uint256 amount = amounts[i];
            // SafeERC20.safeTransferFrom(IERC20(token), from, to, amount);
            bytes memory transferPayload = abi.encodeWithSignature("transferFrom(address,address,uint256)", from, to, amount);
            token.functionCall(transferPayload);
        }
    }

    function multipleCoinTransfer(address payable[] memory receivers, uint256[] memory amounts) public payable {
        require(receivers.length == amounts.length, "invalid params");
        uint256 totalAmount = 0;
        for (uint i = 0; i < receivers.length; i++) {
            totalAmount = totalAmount + amounts[i];
        }
        require(totalAmount == msg.value, "invalid amounts");

        for (uint i = 0; i < receivers.length; i++) {
            address payable to = receivers[i];
            uint256 amount = amounts[i];
            to.sendValue(amount);
        }
    }

}