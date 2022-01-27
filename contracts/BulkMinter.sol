// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DinoBulkMinter is Ownable {
    using Address for address;
    address _nftAddress;

    constructor(address nftAddress) {
        _nftAddress = nftAddress;
    }

    function multipleMint(address[] memory players, string[] memory dinoIds) public onlyOwner  {
        require(players.length == dinoIds.length, "invalid params");
        for (uint i = 0; i < dinoIds.length; i++) {
            address player = players[i];
            string memory dinoId = dinoIds[i];
            bytes memory mintPayload = abi.encodeWithSignature("mintDino(address,string)", player, dinoId);
            _nftAddress.functionCall(mintPayload);
        }
    }


    function multipleMintToSelf(string[] memory dinoIds) public onlyOwner  {
        for (uint i = 0; i < dinoIds.length; i++) {
            string memory dinoId = dinoIds[i];
            bytes memory mintPayload = abi.encodeWithSignature("mintDino(address,string)", msg.sender, dinoId);
            _nftAddress.functionCall(mintPayload);
        }
    }
}