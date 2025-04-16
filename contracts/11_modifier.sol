// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract ModifierExam{

    int public  cnt = 2;

    modifier check(){
        _;
        cnt++;
       
    }

    function getCount() public check returns (int) {
        // return 0;
    }
}