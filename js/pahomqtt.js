let mqtt;
let reconnectTimeout =2000;
let host="rosexplorer.io";
let port=1883;

function onConnect() {
    console.log("connected");
}

function MQTTconnect() {
    console.log("connecting");
    mqtt = new Paho.MQTT.Client(host,port,"clientjs");
    var options = { 
        timeout:3,
        onSuccess: onConnect,
    
    };
    mqtt.connect(options);

}