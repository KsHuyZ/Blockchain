// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Faucet {
    uint256 public numOfFunder;
    mapping(uint256 => address) public lutFunder;
    mapping(address => bool) public funders;

    receive() external payable {}

    function addFunds() external payable {
        address funder = msg.sender;
        if (!funders[funder]) {
            uint256 index = numOfFunder++;
            funders[funder] = true;
            lutFunder[index] = funder;
        }
    }

    function getFunderIndex(uint256 index) external view returns (address) {
        return lutFunder[index];
    }

    function getAllFunder() external view returns (address[] memory) {
        address[] memory _funders = new address[](numOfFunder);

        for (uint256 i = 0; i < numOfFunder; i++) {
            _funders[i] = lutFunder[i];
        }
        return _funders;
    }

    function withdraw(uint256 amount) external limitWithdraw(amount){
        payable(msg.sender).transfer(amount);
    }

    modifier limitWithdraw(uint256 amount) {
        require(amount <= 1*(10 ** 18), "Can't withdraw more than 1ETH!");
        _;
    }
}
