// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";


contract FruttidinoBep20 is Initializable, ERC20BurnableUpgradeable,  AccessControlUpgradeable {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant LOCK_ROLE = keccak256("LOCK_ROLE");
    uint256 private _cap;
    mapping(address => uint256) _lock; // key : address, value: unix timestamp ( 10 length )

    function initialize(uint256 cap_, address admin, address minter) public initializer {
        require(cap_ > 0, "ERC20Capped: cap is 0");
        _cap = cap_;

        __ERC20_init("Frutti Dino", "FDT");
        __ERC20Burnable_init();
        __AccessControl_init();

        _setupRole(DEFAULT_ADMIN_ROLE, admin);
        _setupRole(MINTER_ROLE, admin);
        _setupRole(LOCK_ROLE, admin);
        _setupRole(MINTER_ROLE, minter);

    }

    function _getTimestamp() internal view returns(uint256) {
        return block.timestamp;
    }

    function lock(address target, uint256 timestamp) public onlyRole(LOCK_ROLE) {
        require(timestamp > _getTimestamp(), "ER1");
        _lock[target] = timestamp;
    }

    function unlock(address target) public onlyRole(LOCK_ROLE) {
        _lock[target] = 0;
    }

    function isLock(address target) public view returns(bool) {
        return _lock[target] > _getTimestamp();
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {

        uint256 lockTimestamp = _lock[from];
        require(lockTimestamp == 0 || lockTimestamp < _getTimestamp(), "Lock ERR");

        super._beforeTokenTransfer(from, to, amount);
    }

    function cap() public view returns (uint256) {
        return _cap;
    }

    function mint(address account, uint256 amount) public onlyRole(MINTER_ROLE) {
        require(ERC20Upgradeable.totalSupply() + amount <= cap(), "ERC20Capped: cap exceeded");
        super._mint(account, amount);
    }
}