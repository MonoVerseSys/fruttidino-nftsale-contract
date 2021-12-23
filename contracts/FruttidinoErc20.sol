// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract FruttidinoErc20 is ERC20 {
    constructor() ERC20("Fruttidino", "FDT") {
        uint256 amount = 10 ** decimals() * 1000000000;
        _mint(_msgSender(), amount);

    }
}

