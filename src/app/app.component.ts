import { Component } from '@angular/core';
import { ContainerService } from './container.service';
import * as io from 'socket.io-client';
import 'he';


//declare const io;
declare var he: any;



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  containers=[];
  container='';
  logs=[];
  logbits = [];
  containerLoading = false;
  socket = io.connect('http://0.0.0.0:3000');


    constructor(private containerService: ContainerService) {}
    
    public getContainers(){
  
        this.containerService.getContainers()
        .subscribe(
          
          (response) => {
            this.containers=response.json()
            console.log(response);
          },
          (error) => console.log(error)
        );
      }

    public getConnections(){
      this.socket.on('web', (data) => {
        if (data.type=='container_update'){
          if (data.container_name==this.container)
            {
              this.getContainerLogs(data.container_name);
            }
        console.log(this.container);
        }        
      })
      return () => {
        this.socket.disconnect();
      }
    }
    
    public getContainerLogs(event){
      this.containerLoading=true;
      this.logs=[];
      this.logbits=[];
      console.log(event)
      this.containerService.getContainerLogs(event)
        .subscribe(          
          (response) => {
            this.logbits=response.text().split("\n");
            //response.text().split("\n")
           
            
            
            var i=0;
            for (let entry of this.logbits.reverse()) {
             
              if (entry!=''){
              this.logs.push(JSON.parse(entry));
              i++;
              }

  
              //console.log(entry); // 1, "string", false
          }
          this.containerLoading=false;
          
            

          },
          (error) => console.log(error)
        );
    }
    
    ngOnInit() {
      
      this.getContainers();
      this.getConnections();
      
      
    }     

}
