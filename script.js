window.onload = function(){


    // const dataToSend = JSON.stringify({"email": "hey@mail.com", "password": "101010"});
    // ,{
    //     method: "post",
    //     headers: { "Content-Type": "application/json" },
    //     body: dataToSend
    //     }

    //gets list of devices connected to the hardware module
    let ip = 'http://192.168.1.107/'
    fetch(ip)
    .then(response => response.text())
    .then(json => {
        console.log(json);
        console.log(json['device_list']);
        var parsedData = JSON.parse(json);
       
        var textList = parsedData.device_list;
        var imgList = [];

        var rows, i;
        var columns = 2;
        var pos = 0;

        if(textList.length/2 == 0){
            rows = textList.length/2;
        }else{
            rows = (textList.length/2) + 1;
        }

    var buttonsView = document.getElementById("mainButtonView");

    for(i = 0; i < rows; i++){
        
        let rDiv = document.createElement('div');
        rDiv.id = 'Row' + (i + 1);
        rDiv.className = 'row';
        buttonsView.appendChild(rDiv);

        let j; 
        for(j = 0; j < columns; j++){
            if(pos < textList.length){

                var deviceId = textList[pos].id;
                var deviceState = textList[pos].state;

                var deviceName = textList[pos].name.toUpperCase() ;
                
                let cDiv = document.createElement('div');
                cDiv.id = 'Col' + i + j;
                cDiv.num = deviceId;
                console.log(cDiv.num);
                
                let cText = document.createTextNode(deviceName);
                let cH2 = document.createElement('h2');
                cH2.id = cText;
                cH2.className = "font-roboto";

                let cImg = document.createElement('img');
                cImg.id = deviceName;
                cImg.src = './img/' + deviceName + '-off.svg';
                cImg.className = 'icon';

                if(deviceState == 0){
                    cImg.src = './img/' + cImg.id.toLowerCase() + '-off.svg';
                    cDiv.className = 'column off';
                    cImg.className = 'icon off';
                }else{
                    cImg.src = './img/' + cImg.id.toLowerCase() + '-on.svg';
                    cDiv.className = 'column on';
                    cImg.className = 'icon on';
                }
                
                cDiv.appendChild(cImg);
                cH2.appendChild(cText);
                cDiv.appendChild(cH2);

                cDiv.addEventListener("click", function(){

                    const dataToSend = JSON.stringify({
                        "id": pos, 
                        "switch": "1"
                    });

                    // fetch(ip,{
                    //     method: "get",
                    //     headers: { "Content-Type": "application/json" }
                    //     //body: dataToSend
                    //     })
                    

                    if(cDiv.classList.contains('on')){
                        fetch(ip+cDiv.num+':0')
                        .then(response => response.text())
                        .then(json => console.log(json));
                        cDiv.className = 'column off';
                        cImg.className = 'icon off';
                        cImg.src = './img/' + cImg.id.toLowerCase() + '-off.svg';
                    }else{
                        fetch(ip+cDiv.num+':1')
                        .then(response => response.text())
                        .then(json => console.log(json));
                        cDiv.className = 'column on';
                        cImg.className = 'icon on onIcon';
                        cImg.src = './img/' + cImg.id.toLowerCase() + '-on.svg';
                    }
                });

                rDiv.appendChild(cDiv);

                ++pos;
            }
    }
}
 
    let loadingElement = document.getElementById('loading');
    loadingElement.className = 'invisible';

    buttonsView.className = "";

});


}
