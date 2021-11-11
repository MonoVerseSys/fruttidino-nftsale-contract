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
    npx hardhat run --network bsctest scripts/FruttiDinoNFT/deploy.js
    ```

## etherscan verify 예

```
npx hardhat verify --contract  contracts/FruttiDinoNFT.sol:FruttiDinoNFT 0x1B7c88FB3e14a148C7cdF329C72fa1A86409c644  --network bsctest
```


# Etherscan verification

