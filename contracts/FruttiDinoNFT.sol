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
    event MintDino(address indexed to, uint256 indexed tokenId);

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    CountersUpgradeable.Counter private _tokenIds; // deprecated
    string private _baseUri;
    mapping(string => uint256) private _dinoIds;// deprecated
    uint256 private  _latestTokenId;
    
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
        return interfaceId == type(IERC165Upgradeable).interfaceId;
    }

    function setBaseURI(string memory base) public onlyOwner {
        _baseUri = base;
    }

    function _baseURI() internal override view returns(string memory) {
        return _baseUri;
    }


    function getLatestTokenId() public view returns(uint256) {
        return _latestTokenId;
    }


    function mintDino(address player, uint256 nftId)
        public onlyRole(MINTER_ROLE)
    {
        require(!_exists(nftId), "It already exists (nft id)");
        // _tokenIds.increment();

        // uint256 newItemId = _tokenIds.current();
        _mint(player, nftId);
        // _dinoIds[dinoId] = nftId;
        _latestTokenId = nftId;
        emit MintDino(player, nftId);
    }

    function batchMintDino(address[] memory players, uint256[] memory nftIds) public {
        uint256 dataLen = players.length;
        require(dataLen > 0, "data length must be greater than zero");
        require(dataLen == nftIds.length, "invalid params");
        for(uint256 i=0; i<dataLen; i++) {
            mintDino(players[i], nftIds[i]);
        }
    }

    function burn(uint256 tokenId) external {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721Burnable: caller is not owner nor approved");
        _burn(tokenId);
    }
}