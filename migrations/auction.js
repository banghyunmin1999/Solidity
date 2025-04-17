
var web3 = new Web3('ws://localhost:7545');
 
var bidder; 
web3.eth.getAccounts().then(function(acc){
  console.log(acc)
  web3.eth.defaultAccount = acc[0]
  bidder = acc[0]

  auctionContract.methods.auction_end().call().then( (result)=>{
    document.getElementById("auction_end").innerHTML=result;
  });

  auctionContract.methods.highestBidder().call().then( (result)=>{
    document.getElementById("HighestBidder").innerHTML=result;
  }); 
      
  auctionContract.methods.highestBid().call().then( (result)=>{
    console.log("highest bid info: ", result)
    var bidEther = web3.utils.fromWei(web3.utils.toBN(result), 'ether');
    document.getElementById("HighestBid").innerHTML=bidEther;

  }); 

  auctionContract.methods.STATE().call().then( (result)=>{
    document.getElementById("STATE").innerHTML=result;
  }); 

  auctionContract.methods.Mycar().call().then( (result)=>{
      document.getElementById("car_brand").innerHTML=result[0];
      document.getElementById("registration_number").innerHTML=result[1];
  }); 

  auctionContract.methods.bids(bidder).call().then( (result) => {
      var bidEther = web3.utils.fromWei(web3.utils.toBN(result), 'ether');
      document.getElementById("MyBid").innerHTML=bidEther;
      console.log(bidder);
   
  }); 

  
}); // end of web3.eth.getAccounts()

// 한것 유닉스 타임스탬프를 사람이 읽을 수 있게 초 단위를 밀리초로 변환
function formatTimestamp(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  return date.toLocaleString(); //변환된 날짜 객체를 입찰자의 로컬 시스템 시간으로 변환환
}
// 경매의 시작 시간과 종료 시간을 가져오는 함수
async function loadAuctionTimes() {
  const startTime = await auctionContract.methods.auction_start().call();
  const endTime = await auctionContract.methods.auction_end().call();

  document.getElementById("start_time").innerHTML = formatTimestamp(startTime);
  document.getElementById("end_time").innerHTML = formatTimestamp(endTime);
}
// HTML 문서가 모두 로드된 후에 경매 시간을 불러오는 함수를 실행
window.addEventListener("DOMContentLoaded", loadAuctionTimes);

var auctionContract =  new web3.eth.Contract(
[
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_biddingTime",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_brand",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_Rnumber",
        "type": "string"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "highestBidder",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "highestBid",
        "type": "uint256"
      }
    ],
    "name": "BidEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "message",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "time",
        "type": "uint256"
      }
    ],
    "name": "CanceledEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "enum Auction.auction_state",
        "name": "newState",
        "type": "uint8"
      }
    ],
    "name": "StateUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "withdrawer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "WithdrawalEvent",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "Mycar",
    "outputs": [
      {
        "internalType": "string",
        "name": "Brand",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "Rnumber",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "STATE",
    "outputs": [
      {
        "internalType": "enum Auction.auction_state",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "auction_end",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "auction_start",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "bid",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "bids",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "cancel_auction",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "deactivateAuction",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "get_owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "highestBid",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "highestBidder",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "enum Auction.auction_state",
        "name": "newState",
        "type": "uint8"
      }
    ],
    "name": "updateAuctionState",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdrawRemainingFunds",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
);

auctionContract.options.address = '0xAB5EA3175ef6f5e081afACcD2e070a1918809b66';
var userWalletAddress = '0x497438C06ED68c0C4b1148d295283b078a33263b';

// 한것 .catch() 로 낮은 가격으로 입찰시 오류를 발생시켜 입찰을 막음
function bid() {
  
  var mybid = document.getElementById('value').value;

  auctionContract.methods.bid().send({from: userWalletAddress, value: web3.utils.toWei(mybid, "ether"), gas: 200000})
  .then((result)=>{
  console.log(result)
  document.getElementById("biding_status").innerHTML="Successfull bid, transaction ID : "+ result.transactionHash; 
  })
  .catch((error) => {
    console.error(error);
    alert("현재 경매중이 아니거나 , 입찰 금액이 현재 최고 금액보다 적습니다.");  
    document.getElementById("withdraw_status").innerHTML = "Withdraw failed: " + error.message;
  });
}
 
	

	
function init(){
 // setTimeout(() => alert("아무런 일도 일어나지 않습니다."), 3000);
 
}
   
var auction_owner=null;
auctionContract.methods.get_owner().call().then((result)=>{
  
      auction_owner=result;
     if(bidder!=auction_owner)
     $("#auction_owner_operations").hide();

})
  
  
  
function cancel_auction(){

  auctionContract.methods.cancel_auction().send({from: userWalletAddress, gas: 200000}).then((res)=>{
  // auctionContract.methods.cancel_auction().call({from: '0x3211BA2b204cdb231EF5616ec3cAd26043b71394'}).then((res)=>{
  console.log(res);
  }); 
}

function withdraw() {
    auctionContract.methods.withdraw().send({ from: userWalletAddress, gas: 200000 })
    .then((result) => {
        console.log(result);
        document.getElementById("withdraw_status").innerHTML = "Withdraw successful, transaction ID: " + result.transactionHash;
    })
    .catch((error) => {
        // 한것 최고 입찰자는 출금 못한다고 알려주기
        alert("최고 입찰자는 출금하실수 없습니다")
        console.error(error);
        document.getElementById("withdraw_status").innerHTML = "Withdraw failed: " + error.message;
    });
}
function Destruct_auction(){
  

}
function withdrawRemainingFunds() {
  auctionContract.methods.withdrawRemainingFunds().send({ from: userWalletAddress, gas: 200000 })
  .then((result) => {
      console.log(result);
      document.getElementById("withdrawRemainingFundsText").innerHTML = "최고 입찰금액을 출금했습니다: " + result.transactionHash;
  })
  .catch((error) => {
      // 한것 경매 도중에는 불가하다고 알림
      alert("경매 도중에는 불가능합니다")
      console.error(error);
      document.getElementById("withdrawRemainingFundsText").innerHTML = "Withdraw failed: " + error.message;
  });
}  


auctionContract.events.BidEvent(/*{highestBidder:"A",highestBid:"888"},*/function(error, event){ 
      console.log(event); 
  })
  .on("connected", function(subscriptionId){
      console.log(subscriptionId);
  })
  .on('data', function(event){
      console.log(event); // same results as the optional callback above
      $("#eventslog").html(event.returnValues.highestBidder + ' has bidden(' + event.returnValues.highestBid + ' wei)');

  })
  .on('changed', function(event){
      // remove event from local database
      console.log(event);
  })
  
auctionContract.events.CanceledEvent( function(error, event){ 
  console.log(event); 
  })
  .on("connected", function(subscriptionId){
      console.log(subscriptionId);
  })
  .on('data', function(event){
      console.log(event); // same results as the optional callback above
   $("#eventslog").html(event.returnValues.message+' at '+event.returnValues.time);
  })
  .on('changed', function(event){
      // remove event from local database
  })
  .on('error', function(error, receipt){ // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
   
  })

auctionContract.events.WithdrawalEvent({}, function(error, event) {
    if (error) {
        console.error(error);
    } else {
        document.getElementById("STATE").innerHTML = event.returnValues.newState;
        console.log("Auction state updated: ", event.returnValues.newState);
    }
})

