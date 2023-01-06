# FDT Address (BSC network)
- token
    https://bscscan.com/token/0x3a599e584075065eAAAc768D75EaEf85c2f2fF64
- logic:
    https://bscscan.com/address/0x342eACF6457b0C020F7FeC1D2Ef034414A9403Cd#code


# FDT NFT
- address
    0x60bA8Ed7cbE095FE7f47b4a70C1d92a2878DAE71

- logic:
    https://bscscan.com/address/0xb81bfbe19b3dc649781e0e0be3971298b2a6d445#code

- bsctestnet 
    0xa47A271B61d77f5a2aC69D29b0FC6d75f909bcDa
# FDT Team Wallet (BSC network)
- address
    0xE7c6C24a952Ec16eCf04153eE2285764616907F1

- logic:
    https://bscscan.com/address/0xe77556c70fbd77ed2ef4c10ac1516b356a322356#code



# Bulk transaction 
- transfer : 0x06E3337F6Fe74Ea5B22fA5dD6caf74BB7E7596eC
- mint : 0x0e59cF37bD4AFF10a2A1ecf25CD411E76A31988a

# FruttiDino NFT Sale Project

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.js
node scripts/deploy.js
npx eslint '**/*.js'
npx eslint '**/*.js' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```

## deploy command
hardhat.config.js 에 정의된 네트워크를 선택해서 명령어를 실행한다. ( --network bsctest )

* FruttiDinoNFT
    ```
    npx hardhat run --network bsc scripts/FruttiDinoNFT/deploy.js
    ```

* FruttiDinoTeamLockupWallet
    ```
    npx hardhat run --network bsc scripts/FruttiDinoTeamLockupWallet/deploy.js
    ```

* FruttidinoBep20
    ```
    npx hardhat run --network bsc scripts/FruttidinoBep20/deploy.js
    ```



## etherscan verify 예

```
npx hardhat verify --contract  contracts/FruttidinoInvest.sol:FruttidinoInvest 0xf6F753dA16057A768358AE7470561205d37C4615  --network bsc
```

```
npx hardhat verify --contract  contracts/FruttiDinoNFT.sol:FruttiDinoNFT 0x0CAA268b0Af11e95F75F562FcbCD27DA79862D21  --network bsc
```

```
npx hardhat verify --contract  contracts/FruttidinoBep20.sol:FruttidinoBep20 0x3427ceda1514e23E54dD22703F4b8c0037c9E4E2 --network bsc
```

<!-- npx hardhat verify --contract  node_modules/@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol:TransparentUpgradeableProxy 0xBbc4424eBEf5a9a54abCa54dC2624748a0d47517  --network bsc
 -->

# Etherscan verification

