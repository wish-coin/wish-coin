$(function() {
        try {
            var Web3 = require('web3');
            var web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/"));
            var version = web3.version.api;
            var count;

            $.getJSON('https://api.etherscan.io/api?module=contract&action=getabi&address=0xF6d300C651E892E48718689b426757fbF01FAb2b', function (data) {
                var contractABI = "";
                contractABI = JSON.parse(data.result);
                if (contractABI != '') {
                    var MyContract = web3.eth.contract(contractABI);
                    var myContractInstance = MyContract.at('0xF6d300C651E892E48718689b426757fbF01FAb2b');
                    $('#sold').html(myContractInstance.supply().toFixed(8));
                    $('#used').html(myContractInstance.wishes().toFixed(8));
                    $('#exist').html((myContractInstance.supply() - (myContractInstance.wishes() * 100000000)).toFixed(8));
                } 
                else {
                    console.log("Error" );
                }            
            }.bind(this));

        } catch (err) { }
});
