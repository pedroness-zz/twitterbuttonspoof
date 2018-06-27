var request = require('request');
const fs = require('fs');
const { exec } = require('child_process');
var moment = require('moment');
var version_file='./docker_logger_version.txt';
var messages=[];
var current_version={};
var options = {
    url: 'https://api.github.com/repos/pedroness/Docker-Logger-Front-End/commits',
    headers: {
      'User-Agent': 'Docker Logger Updater', 
    }
  };




function commit_updater(current_date,commit){

  var this_repo_date=new Date(commit.commit.author.date).valueOf();
  console.log("each date:"+commit.commit.author.date);
  if (current_date<this_repo_date)
    {
     messages.push({date:commit.commit.author.date,message:commit.commit.message}); 
     return false;
    }
 else
    {
     return true;
    }   
}

function updateTheFile(commit,messages,auth_status,stopfn) {
 
  stopfn();
  //to stop for repeat
  fs.truncate(version_file, 0, function(){
    console.log("_____________________________________________________________");
    console.log(JSON.stringify(current_version));;
    current_version = {
      date:commit.author.date,
      message: messages,
      auth_status:auth_status
    };
    fs.appendFile(version_file, JSON.stringify(current_version), (err) => {
      if (err) {
        console.log(err);
        //Emmitter will go here
      } 
    });
  })

}

function checkUpdates(options) {
  setTimeout(function() {  
   request(options, function (error, response, body){
    if (!error && response.statusCode == 200) {
        body=JSON.parse(body);
        current_date=new Date(current_version.date).valueOf();
        repo_date=new Date(body[0].commit.author.date).valueOf();
        messages=[];   
        if (current_date<repo_date)
          {                       
            for (i=0;body.length>i;i++)  {
                if (commit_updater(current_date,body[i])){
                  updateTheFile(body[0].commit,messages,false,function(){i=body.length});
               }        
              }
          }    
     }
     console.log("nog a keer");
     checkUpdates(options);
    });
    
  }, 1200000);
//check every 20 min

}

fs.open(version_file, 'r', (err, fd) => {  
  if (err) {
    request(options, function (error, response, body){    
      if (!error && response.statusCode == 200) {       
        body=JSON.parse(body);    
        updateTheFile(body[0].commit,[{date:body[0].commit.author.date, message:body[0].commit.message}],true,function(){});
        checkUpdates(options);
      }
    });  
    }
   else{    
    var data=fs.readFileSync(version_file, (err) => {
      if (err) throw err;
      console.log('Error Reading File');
    });
    current_version=JSON.parse(data);
    checkUpdates(options);
    fs.close(fd, (err) => {
      if (err) {} 
    });
  }
});
