song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreleftWrist=0;
scorerightWrist=0;

function setup()
{
    canvas=createCanvas(600,500);
    canvas.position(450,160);

    video=createCapture(VIDEO);
    video.hide();

    posenet=ml5.poseNet(video,modelLoaded());
    posenet.on('pose',gotPoses);
}
function preload()
{
    song=loadSound("music.mp3");
}
function draw()
{
    image(video,0,0,600,500);

    if(scoreleftWrist>0.2)
    {
    fill("#ff0000");
    stroke("#ff0000");
    circle(leftWristX,leftWristY,20);
    console.log("Circle Drawn");

    leftWristYInNumbers=Number(leftWristY);
    floorleftWristY=floor(leftWristYInNumbers);
    volume=(floorleftWristY/500);
    document.getElementById("volume_button").innerHTML="Volume="+volume;
    song.setVolume(volume);
    }
    if(scorerightWrist>0.2)
    {
        fill("#ff0000");
        stroke("#ff0000");
        circle(rightWristX,rightWristY,20);
        console.log("Circle Drawn");

        if(rightWristY>0 && rightWristY<=100)
        {
            song.rate(0.5);
            document.getElementById("Speed_button").innerHTML="Speed = 0.5";
        }
        else if(rightWristY>100 && rightWristY<=200)
        {
            song.rate(1);
            document.getElementById("Speed_button").innerHTML="Speed = 1";
        }
        else if(rightWristY>200 && rightWristY<=300)
        {
            song.rate(1.5);
            document.getElementById("Speed_button").innerHTML="Speed = 1.5";
        }
        else if(rightWristY>300 && rightWristY<=400)
        {
            song.rate(2);
            document.getElementById("Speed_button").innerHTML="Speed = 2";
        }
        else if(rightWristY>400 && rightWristY<=500)
        {
            song.rate(2.5);
            document.getElementById("Speed_button").innerHTML="Speed = 2.5";
        }
    }
}
function start()
{
    song.play();
    song.rate(1);
    song.setVolume(1);
}
function modelLoaded()
{
    console.log("Posenet is on!");
}
function gotPoses(results)
{
    if (results.length>0)
    {
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log(leftWristX,leftWristY);

        righhtWristX = results[0].pose.leftWrist.x;
        rightWristY = results[0].pose.leftWrist.y;
        console.log(rightWristX,rightWristY);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        scorerightWrist = results[0].pose.keypoints[10].score;
    }
}
