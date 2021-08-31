import React, { Component } from "react";
import Lottery from "../contracts/Lottery.json";
import getWeb3 from "../getWeb3";



class Main extends Component {
    state = {
        manager: "",
        players: [],
        amount: 100,
        address:"",
        message: "",
        steps: "",
        balance: "",
        voucher: '',
        web3: null,
        accounts: null,
        contract: null
      };
    
      componentDidMount=async()=> {
        try {
          // Get network provider and web3 instance.
          const web3 = await getWeb3();

          // Use web3 to get the user's accounts.
          const accounts = await web3.eth.getAccounts();

          // Get the contract instance.
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = Lottery.networks[networkId];
          const instance = new web3.eth.Contract(
            Lottery.abi,
            deployedNetwork && deployedNetwork.address,
          );

          // Set web3, accounts, and contract to the state, and then proceed with an
          // example of interacting with the contract's methods.
          this.setState({ web3, accounts, contract: instance }, this.runExample);

          const manager = await Lottery.methods.manager().call();
          const players = await Lottery.methods.getPlayers().call();
          const balance = await web3.eth.getBalance(Lottery.options.address);
          this.setState({manager, players, balance});


        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
          console.error(error);
        }
        
      }
    
      
    
      //user enter his steps
      onSubmit = async (event) => {
        event.preventDefault();
        const {accounts, contract} = this.state;
        // const accounts = await web3.eth.getAccounts();
        this.setState({message: "Waiting on transaction success..."});
        await Lottery.methods.enter(this.state.steps, accounts[0]).send({
          from: accounts[0],
          uadd: this.state.address,
          ustep: this.state.steps
        });
        this.setState({message: "You have been entered!"});
        //this.setState({message: "You have acheived the # of points! ", this.state.steps});
      }

      onClick = async (event) => {
        event.preventDefault();
        //const accounts = await web3.eth.getAccounts();
        //by default the social media link is unactivated
        document.getElementById("link").innerHTML = "https://www.instagram.com".deactive;
        this.setState({message: "Waiting on transaction of opening link to  success..."});
      }
      //function to check the # of steps, transfer etherum and activate social media website

      myFunction = async() => {
        const {accounts, contract} = this.state;
        if (this.steps>= 10000) {
          this.setState({message: "transfer etherum to accounts"});
          await Lottery.methods.transfer().send({
            from: accounts[0],
            to: (this.state.address),
            amount: (this.state.amount),
          });

          //this.setState({ message: "Your voucher number is :" , lottery.methods.random().call()});
          document.getElementById("link").innerHTML = "https://www.instagram.com".active;
        }
      }

      test = async() => {
        const {accounts, contract} = this.state;
        const response = await contract.methods.get().call();
        console.log(response)
      }

  render() {
    return (
        <div className="App">
        <h2>Lottery Contract</h2>
        <p>
          This contract is managed by {this.state.manager}. There are currently{" "}
          {this.state.players.length} people entered, competing to win{" "}
          {/* {web3.utils.fromWei(this.state.balance, "ether")} ether! */}
        </p>
        <form onSubmit={this.onSubmit}>
          <h4>Want to enter the competsion?</h4>
          <div>
            <label># of steps do you acheived</label>
            <input  value={this.state.steps}
            onChange={event => 
            this.setState({steps: event.target.value})}
            />
          </div>

          <div>
            <label>user address</label>
            <input  value={this.state.address}
            onChange={event => 
            this.setState({address: event.target.value})}
            />
          </div>

          <button>Enter</button>
        </form>
        <hr/>
        
        <a href="https://www.instagram.com" onclick="registerSetInfo()" id="link">Instagram</a>
        <h1>{this.state.message}</h1>

        <button onClick={this.test}>get x</button>
      </div>
    );
  }
}

export default Main;
