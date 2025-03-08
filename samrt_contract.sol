// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0 <0.9.0;

contract Transactions {
    uint256 transactionCount;

    event Transfer(
        address from,
        address receiver,
        uint256 amount,
        string message,
        uint256 timestamp,
        string keyword
    );

    struct TransferStruct {
        address sender;
        address receiver;
        string message;
        uint256 amount;
        uint256 timestamp;
        string keyword;
    }

    TransferStruct[] transaction;

    function addToBlockchain(
        address payable receiver,
        string memory message,
        uint256 amount,
        string memory keyword
    ) public {
        transactionCount += 1;
        transaction.push(
            TransferStruct(
                msg.sender,
                receiver,
                message,
                amount,
                block.timestamp,
                keyword
            )
        );
        emit Transfer(
            msg.sender,
            receiver,
            amount,
            message,
            block.timestamp,
            keyword
        );
    }

    function getAllTransactions()
        public
        view
        returns (TransferStruct[] memory)
    {
        return transaction;
    }

    function getTransactionCounts() public view returns (uint256) {
        return transactionCount;
    }
}
