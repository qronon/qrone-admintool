/* jsxmlsocket.js
 * 
 * The MIT License
 *
 * Copyright (c) 2009 Erik Rigtorp <erik@rigtorp.com>
 * Copyright (c) 2008 Tjeerd Jan 'Aidamina' van der Molen
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

// Container that holds the jSocket Objects
var jsXMLSocketContainer = [];

// jsXMLSocket Constructor
function jsXMLSocket(){
    // Random id to identify the socket
    while(true){
        this.id = "jsXMLSocket_"+Math.round(Math.random()*10000);
        try{
            // Should throw an exception if it can't find the id in the container
            jsXMLSocket_GetSocket(this.id);         
        }
        catch(e){
            // We found an unused id
            break;
        }
    }    
    // Put the jSocket in the container
    jsXMLSocketContainer.push({id: this.id, socket:this});     
    
    // Unused variable name used in flash for testing
    // Should use jSocket.variableTest = 'whatever' 
    // If you are using a variable 'xt' in your flashmovie
    this.variableTest ='xt';     
    // Connection state
    this.connected = false;  
}

// Find the Swf object
jsXMLSocket.prototype.findSwf = function(){
    if (window.document[this.id]){
        return window.document[this.id];
    }
    if (!$.browser.msi){
        if (document.embeds && document.embeds[this.id])
        return document.embeds[this.id]; 
    }
    else{
        return $("#"+this.id)[0];
    }
}

// Setup the socket
// target: jQuery selector specifying the container that the jSocket will be placed in
jsXMLSocket.prototype.setup = function(target)
{
    if(this.target!=undefined) throw 'Can only call setup on a jsXMLSocket Object once.';
    this.target = target; 
    
    // Add the object to the dom    
    $(this.target).append("<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0\" width=\"1\" height=\"1\" id=\""+this.id+"\"><param name=\"movie\" value=\"jsxmlsocket.swf?"+this.id+"\"/><param name=\"allowScriptAccess\" value=\"always\"/><param name=\"quality\" value=\"high\"/><embed src=\"jsXMLSocket.swf?"+this.id+"\" quality=\"high\" width=\"1\" height=\"1\" type=\"application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash\" name=\""+this.id+"\" swLiveConnect=\"true\"></embed></object>");    
}

// Connect to a listening socket
// host: hostname/ip to connect to
// port: tcp/ip port to connect on
jsXMLSocket.prototype.connect = function(host,port){    
    if(!this.movie)
        throw "jsXMLSocket isn't ready yet, use the onReady event";
    if(this.connected)
        this.movie.close();
    this.movie.connect(host, port);     
}

//  Close the socket connection
jsXMLSocket.prototype.close = function(){
    this.connected = false;
    if(this.movie)
        this.movie.close();    
}

// Find a socket by id in the jsXMLSocketContainer
// id: socket id
function jsXMLSocket_GetSocket(id){
    var socket = false;
    $.each(jsXMLSocketContainer,function()
    {
        if(this.id==id){
            socket = this.socket;
            return false;
        }    
    });
    if(socket)
        return socket;
    // Exception is used in the constructor
    throw "jsXMLSocket '"+id+"' not found in jsXMLSocketContainer";
}

// Callback for the flash object to signal the flash file is loaded
// triggers jsXMLSocket.onReady
function jsXMLSocket_onInit(id){
    var socket = jsXMLSocket_GetSocket(id);
    
    var v = socket.variableTest;
    // Wait until we can actually set Variables in flash
    var f = function(){
        var err = true;
	    try{
	        // Needs to be in the loop, early results might fail, when DOM hasn't updated yet
	        var m = socket.findSwf();
            m.SetVariable(v, 't');
            if('t' != m.GetVariable(v))
                throw null;
            m.SetVariable(v, '');
            // Store the found movie for later use
            socket.movie = m; 
            err=false;
        }
        catch(e){ 
            window.setTimeout(f,0);
        }
        // Fire the event
        if(!err&&socket.onReady)
            socket.onReady();
    }
    window.setTimeout(f,0);
}

// Callback for the flash object to signal data is received
// triggers jsXMLSocket.onData
function jsXMLSocket_onData(id, data){
    var socket = jsXMLSocket_GetSocket(id);
    if(socket.onData)
        socket.onData(data);
}

// Callback for the flash object to signal the connection attempt is finished
// triggers jsXMLSocket.onConnect
function jsXMLSocket_onConnect(id){
    var socket = jsXMLSocket_GetSocket(id);
    socket.connected = true;
    if(socket.onConnect)
        socket.onConnect(true);
}

// Callback for the flash object to signal the connection attempt is finished
// triggers jsXMLSocket.onError
function jsXMLSocket_onError(id, error){
    var socket = jsXMLSocket_GetSocket(id);
    if(socket.onConnect)
        socket.onConnect(false,error);
}

// Callback for the flash object to signal the connection was closed from the other end
// triggers jsXMLSocket.onClose
function jsXMLSocket_onClose(id){
    var socket = jsXMLSocket_GetSocket(id);
    socket.connected = false;
    if(socket.onClose)
        socket.onClose();
}


jsXMLSocket.prototype.checkConnected = function(){      
    if(!this.connected||!this.movie)
        throw "jSocket is not connected, use the onConnect event ";
}

// Generic write
jsXMLSocket.prototype.send = function(data)
{
    this.checkConnected();
    this.movie.send(data);
}





