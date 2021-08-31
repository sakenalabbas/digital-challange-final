import React, {Component} from 'react';
import Lottery from "../contracts/Lottery.json";
import getWeb3 from "../getWeb3";


class Home extends Component {

    state = {
        manager: "",
        players: [],
        amount: 5,
        address:"",
        message: "",
        steps: "",
        balance: 0,
        voucher: '',
        tran:"",
      
        web3: null,
        accounts: null,
        contract: null,
        allUsers:null
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


          //const manager = await Lottery.methods.manager().call();
          //const balance = await web3.eth.getBalance(Lottery.options.address);
         // this.setState({manager});


        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
          console.error(error);
        }
      }
      
      

      runExample = async() => {
        const {accounts, contract} = this.state;
        const result=await contract.methods.getAll().call();
        this.setState({allUsers: result})
        console.log(this.state.allUsers)

    }
  

     //user enter his steps
onSubmit = async (event) => {

  event.preventDefault();
  const ran=Math.floor(Math.random()*100);

  const {accounts, contract} = this.state;
  this.setState({message: "Waiting on transaction success..."});
 const r= await contract.methods.enter(this.state.steps, this.state.address,this.state.balance).send({
    from: accounts[0],
  
  });

   this.setState({message: "You have been entered!"});

 if(this.state.steps>=10000){
   
   this.setState({message: "transfer etherum to accounts"});
   
   await contract.methods.transfer(this.state.address,this.state.amount).send({
    from: accounts[0],
 });
 
 const test=async () => {
  const {accounts, contract} = this.state;

  const newBal= await contract.methods.getBalance(this.state.balance, this.state.address).call();

this.setState({balance:newBal})
//console.log(balance)

 }

 
 alert('according to your balance, you got ' +this.state.balance+' as a points and voucher with number '+ran+ ' because you walked '+ this.state.steps);


  document.getElementById('link').setAttribute("class","active");
 alert('you have ' +this.state.steps/10000+' hours for browsing instegram, engoy! ')
  

  } else
  alert( "your steps less than the target");


     }//on submit




  render(){
      return(
        <div className="App">
        <h2> Increase your steps and get vouchers </h2>
       <p>this contract managed by 0xFB25244c258603Fe19842751c64284A176169E5F.</p>
       
    
       <form onSubmit={this.onSubmit}>
       <h4>Want to enter the competsion?</h4>
    
       <div>
                <label># of steps do you acheived</label>
                <input  
                value={this.state.steps}
                onChange={event => 
                this.setState({steps: event.target.value})}
                />
              </div>
    
              <div>
                <label>user address</label>
                <input  
                value={this.state.address}
                onChange={event => 
                this.setState({address: event.target.value})}
                />
              </div>
    
              <div>
              <label>amount of Ether do you have in your account</label>
                <input  value={this.state.balance}
                onChange={event => 
                this.setState({balance: event.target.value})}
                />
              </div>
    
    
              <button>Enter</button>
            </form>
            <hr/>
            
            <span class="disable-links"> <a href="https://www.instagram.com"  id="link"  >Instagram</a></span>
            <hr/>
            
            {this.state.allUsers != null?

              <>
  
              {this.state.allUsers.map((p,i) =>
  
                  <div key={i}>
  
                  <p>{p[0]}</p>
  
                  <p>{p[1]}</p>
  
                  <p>{p[2]}</p>
  
                  </div>
  
                  
  
                  )}
  
              </>
  
              :
  
              <></>}
  
  
  
              </div>
  
        )
  
    }
  
  }
  
  
  
  export default Home;
  
  