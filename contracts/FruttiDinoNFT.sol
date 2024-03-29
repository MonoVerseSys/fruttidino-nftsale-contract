// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
/**
 * @title FruttiDinoNFT
 * @author Ho Dong Kim (monoverse.io)
 * @dev frutti dino nft v1
 */
contract FruttiDinoNFT is Initializable, OwnableUpgradeable, AccessControlUpgradeable, ERC721EnumerableUpgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;
    event MintDino(address indexed to, uint256 indexed tokenId, string dinoId);

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    CountersUpgradeable.Counter private _tokenIds;
    string private _baseUri;
    mapping(string => uint256) private _dinoIds;// key : dino, value : token id

    function initialize() public initializer {
        __Ownable_init();
        __ERC721Enumerable_init();
        __ERC721_init("FruttiDino NFT", "FTDT");
        setBaseURI("https://api.fruttidino.com/dino/");
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual
        override(AccessControlUpgradeable, ERC721EnumerableUpgradeable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function setBaseURI(string memory base) public onlyOwner {
        _baseUri = base;
    }

    function _baseURI() internal override view returns(string memory) {
        return _baseUri;
    }

    function tokenIdFromDinoId(string memory dinoId) public view returns(uint256) {
        return _dinoIds[dinoId];
    }


    function mintDino(address player, string memory dinoId)
        public onlyRole(MINTER_ROLE)
        returns (uint256)
    {
        require(tokenIdFromDinoId(dinoId) == 0, "It already exists");
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        _dinoIds[dinoId] = newItemId;
        emit MintDino(player, newItemId, dinoId);
        return newItemId;
    }

    function mint(address player, uint256 tokenId, string memory dinoId)
        public onlyRole(MINTER_ROLE)
        returns (uint256)
    {
        require(tokenIdFromDinoId(dinoId) == 0, "It already exists");
        _tokenIds.increment();
        _mint(player, tokenId);
        _dinoIds[dinoId] = tokenId;
        emit MintDino(player, tokenId, dinoId);
        return tokenId;
    }


    uint256[46] private __gap;
}