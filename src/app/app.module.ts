import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ContainerService } from './container.service';
//import * as io from 'socket.io';;
import 'he';
import { AppComponent } from './app.component';



@NgModule({
  declarations: [
    AppComponent    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [ContainerService],
  bootstrap: [AppComponent]
})
export class AppModule { }