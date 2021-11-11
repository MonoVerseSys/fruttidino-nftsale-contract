// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract FruttiDinoNFT is Initializable, ERC721EnumerableUpgradeable, OwnableUpgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;

    event MintDino(address indexed to, uint256 indexed tokenId, uint256 indexed dinoId);

    CountersUpgradeable.Counter private _tokenIds;
    string private _baseUri;
    mapping(uint256 => uint256) private _dinoIds; // key : tokenid, value : dino id

    function initialize(string memory __baseUri) public initializer {
        __Ownable_init();
        __ERC721Enumerable_init();
        __ERC721_init("FruttiDino NFT", "FRTD");
        setBaseURI(__baseUri);
    }

    function setBaseURI(string memory base) public onlyOwner {
        _baseUri = base;
    }

    function _baseURI() internal override view returns(string memory) {
        return _baseUri;
    }

    function dinoIdFromTokenId(uint256 tokenId) public view returns(uint256) {
        return _dinoIds[tokenId];
    }


    function mintDino(address player, uint256 dinoId)
        public onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        _dinoIds[newItemId] = dinoId;
        emit MintDino(player, newItemId, dinoId);
        return newItemId;
    }


    uint256[47] private __gap;
}