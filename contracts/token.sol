pragma solidity ^0.5.11;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.0-solc-0.7/contracts/token/ERC20/ERC20.sol";
contract Token is ERC20{
    constructor() ERC20 ("MCIT Token","MCITX"){
    _mint(msg.sender,10000);

}
}