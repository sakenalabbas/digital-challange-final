var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Lottery = artifacts.require("./Lottery.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage, {gas:10000}).then(function(){
    return deployer.deploy(Lottery, {gas:10000});
  });
};
