import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            punchActive: false,
            monsterAttack: false,
            punchAni1: false,
            punchAni2: false,
            dodgeAni: false,
            dodged:false,
            punchTimer: false,
            pausedGame: false,
            points: 0,
            
            //purchases
            gorillaTest: false,
    };
        
}
    
    //ENEMY ATTACKING
    
    componentDidMount = () => {
        setInterval(()=>{
            
            this.setState({
              monsterAttack: true,
                
           }); 
            
            setTimeout(()=>{
                
                if(this.state.dodged === false && this.state.monsterAttack === true){
                    this.setState({
             points: this.state.points - 30,
           }); 
                };
            
                this.setState({
              monsterAttack: false,
           }); 
                
                                    
                if(this.state.points <= 0){
                    this.setState({
              points: 0,
           }); 
                };
                
            }, 800);
            console.log("firechild got home safe")
        }, 3000);
    }
    
    //PLAYER ATTACKING and DODGING
    
    punch = () => {
        if(this.state.punchTimer === false){
            this.setState({
                punchAni1: true,
                punchTimer: true,
                points: this.state.points + 5,
            })
        }
        if(this.state.punchTimer === true){
            this.setState({
                punchAni2: true,
                punchTimer: false,
                points: this.state.points + 5,
            })
        }
        
        this.setState({
           punchActive: true, 
        });
        
        setTimeout(()=>{
           this.setState({
               punchActive: false,
               punchAni1: false,
               punchAni2: false,
                
           }); 
        }, 200);
        
        console.log(this.state.punchTimer);
    }
    
    playerDodgeFunc = () => {
       
        this.setState({
           dodgeAni: true, 
            dodged: true,
        });
        
        console.log("dodging")
        
        setTimeout(()=>{
            
           this.setState({
               dodgeAni: false,
               dodged: false,
           }); 
        }, 600);
    }
    
    //purchasing and pausing
    
    buyTest = () => {
        if(this.state.points >= 100){
            this.setState({
                gorillaTest: true,
                points: this.state.points - 100,
            });
        }
        
    }
    
    pauseBut = () => {
        this.setState({
            pausedGame: true,
            monsterAttack: false,
        });
    }
        
    
  render() {
      
      let activeClass = "";
      let activeImg = "";
      let activePlayerClass = "";
     
      
      if (this.state.punchActive === true) {
          activeClass = " active";
          
          if(this.state.punchAni1 === true){
              activePlayerClass = " activePlayer1";
              
          } if(this.state.punchAni2 === true){
              activePlayerClass = " activePlayer2";
          }
      }
      
      if (this.state.dodgeAni === true){
          activePlayerClass = " activePlayer3"
      }
      
      if (this.state.monsterAttack === true){
          activeClass = " activeGPunch"
      }
      
      if (this.state.gorillaTest === true){
          activeImg = " testGorilla"
      }
      
      if (this.state.pauseBut === true){
          activeClass = " monsterPause";
          activePlayerClass = " charPause"
      }
      
      
      
      
      
    return (
      <div className="App" onClick={this.monsterAttackFunc}>
        <div  onClick={this.punch}>
       <div className={"monster-image" + activeClass + activeImg}></div>
        <div className={"char-image" + activePlayerClass}></div>
        </div>
        <div className="controlFlex">
        <div className="pointDiv">{this.state.points}</div>
        <div className="dodgeBut" onClick={this.playerDodgeFunc}></div>
        <div className="buyTest" onClick={this.buyTest}></div>
        <div className="pause" onClick={this.pauseBut}></div>
        </div>
      </div>
    );
  }
}

export default App;
