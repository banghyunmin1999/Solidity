// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BoolExam {
    // bool boolVar = true;
    function getBoolean() public pure returns (bool) {
        bool boolVar = false;
        return !boolVar;
    }

}