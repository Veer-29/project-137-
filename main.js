Status="";
input_name="";
objects=[];

function setup(){
    canvas=createCanvas(400,350)
    canvas.center();
    video=createCapture(VIDEO);
    video.size(400,350);
    video.hide();
}

function start(){
    object_detector=ml5.objectDetector("cocossd" , modelLoaded);
    document.getElementById("status").innerHTML = "Status = Detecting Objects";
    input_name=document.getElementById("input_id").value;
}

function modelLoaded(){
    console.log("model_loaded");
    Status=true;
}

function draw(){
    image(video,0,0,400,350);
    if(Status !=""){
        object_detector.detect(video,gotresult);
        for( i=0; i < objects.length; i++){
            document.getElementById("status").innerHTML="Status : Object Detected";
            console.log(objects.length);
            fill("#a8ed40");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+""+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("#ed9c40")
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    
            if(objects[i].label==input_name){
                video.stop();
                object_detector.detect(gotresult);
                document.getElementById("object_found").innerHTML = input_name  + " :  Found";
                var synth = window.speechSynthesis;
                var utterThis=new SpeechSynthesisUtterance(input_name  +  " :  Found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("object_found").innerHTML=input_name  + " :  Not Found";
                var synth = window.speechSynthesis;
                var utterThis=new SpeechSynthesisUtterance(input_name  +  " :  Not Found");
                synth.speak(utterThis);
                
            }    
        }    
    }
}

function gotresult(error,result){
if(error){
    console.error(error)
}
else{
    console.log(result)
    objects=result;
}
}