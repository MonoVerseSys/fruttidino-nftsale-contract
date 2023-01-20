// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
/**
 * @title FruttidinoFamNFT
 * @author Ho Dong Kim (monoverse.io)
 * @dev FruttiDino family
 */
contract FruttidinoFamNFT is Ownable, ERC721Enumerable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    string private _baseUri;
    constructor() ERC721("Frutti Dino Family Badge", "FDB") {
        setBaseURI("https://monoverse.io/nft-info/metadata/");
    }
    
    function supportsInterface(bytes4 interfaceId) public view virtual
        override returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function setBaseURI(string memory base) public onlyOwner {
        _baseUri = base;
    }

    function _baseURI() internal override view returns(string memory) {
        return _baseUri;
    }


    function mint(address to)
        public onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(to, newItemId);
        return newItemId;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override {
        require(address(0) == from, "cannot transfer assets.");
        super._beforeTokenTransfer(from, to, tokenId);
    }


   
    uint256[46] private __gap;
}