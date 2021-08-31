pragma experimental ABIEncoderV2;
pragma solidity >=0.4.21 <0.7.0;
import "token.sol";
//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.0-solc-0.7/contracts/token/ERC20/ERC20.sol";
contract Lottery{
    string public manager = "0xFB25244c258603Fe19842751c64284A176169E5F";
    //  uint public constant MaxNumber = 50;

    string x = "Testt";
    uint updatedBal;

    struct userInfo {
        address user;
        uint steps;
        uint balance;
        bool stepRestrict;
    }

    mapping (uint => userInfo) public users;
    uint numOfUsers;


   constructor() public{
       manager=msg.sender;
   }

    function enter(uint ustep,address uadd,uint ubalance) public returns(bool) {
        bool stepRestrict = false;
        if (ustep >= 10000){
            stepRestrict=true;
        }
        users[numOfUsers]=userInfo(uadd, ustep, ubalance, stepRestrict);
        numOfUsers++;
        return stepRestrict;
    }

    function getBalance(uint oldBal, address add) public  view returns(uint) {
        for(uint i=0; i<numOfUsers; i++){
            if (users[i].address==add)
            updatedBal=users[i].balance+oldBal
        }
        return updatedBal;
    }

    function getAll() public view returns(userInfo[] memory){
        userInfo[] memory allUsers = new userInfo[](numOfUsers);
        for(uint i=0; i<numOfUsers; i++){
            userInfo memory instance = users[i];
            allUsers[i] = instance;
        }
        return allUsers;
    }

    
    

    function transfer(address to,uint amount) external {
        token toke = token(0xFB25244c258603Fe19842751c64284A176169E5F);
        toke.transfer(to,amount);
    }
    function getBalance(uint b) public view returns(uint){
      return users[numOfUsers].balance= users[numOfUsers].balance+b;
        
    }
}