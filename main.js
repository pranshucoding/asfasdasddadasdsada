song="";
leftWristX="";
rightWristX="";
scoreLeftWrist="";
scoreRightWrist="";

function preload(){
    song = loadSound(music.mp3);
}

function setup(){
    canvas=createCanvas(500,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modeLoaded);
    poseNet.on("pose",gotPoses);
}
function modeLoaded(){
    console.log("Posenet model is initialized");
}

function draw(){
    image(video,0,0,600,500);

    fill("#FF0000");
    stroke("#FF0000");
if(scoreLeftWrist>0.2){
    circle(leftWristX,leftWristY,18);
    InNumberleftWristY=Number(leftWristY);
    rd=floor(InNumberleftWristY);
    leftWristY_divide_100=rd/1000;
    document.getElementById("volume").innerHTML="Volume = " + volume;
    volume=leftWristY_divide_100*2;
    song.setVolume(volume)
  }
if (scoreRightWrist>.2){
    circle(rightWristX,rightWristY,18);
    if(rightWrist>0 && rightWrist<=100){
        document.getElementById("speed").innerHTML="speed = 0.5x";
        song.rate(0.5);
    }
    else if(rightWrist>100 && rightWrist<=200){
        document.getElementById("speed").innerHTML="speed = 1x";
        song.rate(1);
    }
    else if(rightWrist>200 && rightWrist<=300){
        document.getElementById("speed").innerHTML="speed = 1.5x";
        song.rate(1.5);
    }
    else if(rightWrist>300 && rightWrist<=400){
        document.getElementById("speed").innerHTML="speed = 2x";
        song.rate(2);
    }

    else if(rightWrist>400 && rightWrist<=500){
        document.getElementById("speed").innerHTML="speed = 2x";
        song.rate(2);
    }
}
}

function play(){
    song.play();
    song.setVolume(0.5);
    song.setRate(1);
}

function preload(){
    song=loadSound("music.mp3");  
}

function gotPoses(result){
 if(result.length>0)
 {
    scoreLeftWrist=result[0].pose.keypoints[9].score;
    scoreLeftWrist=result[0].pose.keypoints[10].score;
    leftWristY=result[0].pose.leftWrist.y;
    console.log("scoreLeftWrist = " + scoreLeftWrist + "scoreRightWrist = " + scoreRightWrist);
    leftWristX=result[0].pose.leftWrist.x;
    leftWristY=result[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

    rightWristX=result[0].pose.rightWrist.x;
    rightWristY=result[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
 }
}

