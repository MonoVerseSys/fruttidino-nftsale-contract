// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BulkTransfer is Ownable {
    using Address for address;
    address _nftAddress;

    constructor(address nftAddress) {
        _nftAddress = nftAddress;
    }

    function multipleTransfer(address[] memory senders, address[] memory receivers, uint256[] memory tokenIds) public onlyOwner {
        require(senders.length == receivers.length && receivers.length == tokenIds.length, "invalid params");
        for (uint i = 0; i < tokenIds.length; i++) {
            uint256 tokenId = tokenIds[i];
            address from = senders[i];
            address to = receivers[i];

            bytes memory transferPayload = abi.encodeWithSignature("transferFrom(address,address,uint256)", from, to, tokenId);
            _nftAddress.functionCall(transferPayload);
        }
    }
}