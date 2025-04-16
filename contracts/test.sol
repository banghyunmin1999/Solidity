contract EtherWallet {
    uint public walletEther;
    address public walletAddress;
    
    constructor (){
        walletEther = 0;
        walletAddress = msg.sender;
    }
    event Print(string message);
    receive() external  payable {}

    function inputWallet(uint inputMoney) public {
        if(walletAddress == msg.sender ){emit Print (unicode"지갑주소가 맞습니다");
            walletEther += inputMoney;
        }else if(walletAddress != msg.sender) { emit Print(unicode"지갑주소가 아닙니다");
        }
    }

}