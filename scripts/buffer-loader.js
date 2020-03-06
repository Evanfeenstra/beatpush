BufferLoader = function(context, urlList, callback) {
	this.context = context;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = new Array();
    this.loadCount = 0;
}

/*arr2ab = function(arr) {
  var aLen = arr.byteLength;
  var buf = new ArrayBuffer(aLen); // 2 bytes for each char
  var view = new DataView(buf);
  for (var i=0; i<aLen; i++) {
    //buf[i] = arr[i];
    view.setUint8(i,arr[i],false);
  }
  return buf;
}

function str2ab(str) {
  var buf = new ArrayBuffer(str.length*2);
  var bufView = new Uint16Array(buf);
  for (var i=0, strLen=str.length*2; i<strLen; i++) {
    bufView[i] = str[i];
  }
  return buf;
}*/

BufferLoader.prototype.loadBuffer = function(url, index) {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    
    request.responseType = "arraybuffer";

    var loader = this;

    request.onload = function() {
        //console.log(request.response)
        loader.context.decodeAudioData(
            request.response,
            function(buffer) {
                //console.log(buffer)
                // this function is the "success callback", the argument is the audio buffer
                if (!buffer) {
                    alert('error decoding file data: ' + url);
                    return;
                }
                loader.bufferList[index] = buffer;
                if (++loader.loadCount == loader.urlList.length)
                    loader.onload(loader.bufferList);
            }    
        );
    }

    request.onerror = function() {
        alert('BL: XHR error', url);        
    }

    request.send();
}

BufferLoader.prototype.load = function() {
    for (var i = 0; i < this.urlList.length; ++i)
        this.loadBuffer(this.urlList[i], i);
}