window.onload = function(){

    function camelize(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
            if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
            return index === 0 ? match.toLowerCase() : match.toUpperCase();
        });
    }


    // const dataToSend = JSON.stringify({"email": "hey@mail.com", "password": "101010"});
    // ,{
    //     method: "post",
    //     headers: { "Content-Type": "application/json" },
    //     body: dataToSend
    //     }

    //gets list of devices connected to the hardware module
    fetch('http://121.46.115.26/')
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

    var body = document.getElementsByTagName("BODY")[0];

    for(i = 0; i < rows; i++){
        
        let rDiv = document.createElement('div');
        rDiv.id = 'Row' + (i + 1);
        rDiv.className = 'row';
        body.appendChild(rDiv);

        let j;
        for(j = 0; j < columns; j++){
            if(pos < textList.length){

                var deviceId = textList[pos].id;
                var deviceState = textList[pos].state;

                var deviceName = textList[pos].name.toUpperCase() ;
                
                let cDiv = document.createElement('div');
                cDiv.id = 'Col' + i + j;
                
                let cText = document.createTextNode(deviceName);
                let cH2 = document.createElement('h2');
                cH2.id = cText;
                cH2.className = "font-roboto";

                let cImg = document.createElement('img');
                cImg.src = '/img/' + deviceName + '.png';
                cImg.className = 'icon';

                
                if(deviceState == 0){
                    cDiv.className = 'column off';
                    cImg.className = 'icon off';
                }else{
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

                    fetch('http://121.46.115.26/',{
                        method: "get",
                        headers: { "Content-Type": "application/json" },
                        body: dataToSend
                        })
                    .then(response => response.text())
                    .then(json => console.log(json));

                    if(cDiv.classList.contains('on')){
                        cDiv.className = 'column off';
                        cImg.className = 'icon off';
                    }else{
                        cDiv.className = 'column on';
                        cImg.className = 'icon on';
                    }
                });

                rDiv.appendChild(cDiv);

                ++pos;
            }
    }
}
 
    let loadingElement = document.getElementById('loading');
    loadingElement.className = 'invisible';

});


}