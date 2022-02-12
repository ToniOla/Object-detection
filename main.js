img="";
status="";
object=[];
function preload(){
    img=loadImage("traffic.jpg");
    }
function setup(){
canvas=createCanvas(380,380);
canvas.center();
video=createCapture(VIDEO);
video.size(380,380);
video.hide();

objectDetector=ml5.objectDetector("cocossd",modelLoaded);
document.getElementById("status").innerHTML="status:Detecting objects";
}
function modelLoaded(){
    console.log("modelLoaded")
    status=true;
    

}
function gotResult(error,results){
if(error){
console.log(error);
}
console.log(results);
object=results;
}
function draw(){
    image(video,0,0,380,380);
 if(status !=""){
     r=random(255);
     g=random(255);
     b=random(255);
    objectDetector.detect(video,gotResult);
for(i=0;i<object.length;i++){
    document.getElementById("status").innerHTML="status-object-detected";
    fill(r,g,b);
    document.getElementById("number_of_objects").innerHTML="number of objects detected are" +object.length;
    percent=floor(object[i].confidence*100);
    text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y+15);
    noFill();
    stroke(r,g,b);
    rect(object[i].x,object[i].y,object[i].width,object[i].height);
}
 }
}