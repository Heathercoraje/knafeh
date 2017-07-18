var xhr = new XMLHttpRequest();
var url1 = "https://content.guardianapis.com/search?";
var url2 = "api-key=7b8fdba3-2d40-4d8e-b725-99d86676fbe9";
var urlIsrael = url1 + 'q=Israel&' +url2;


function addListener (selector, eventName, callback) {
  document.querySelector(selector).addEventListener(eventName, callback);
}

function fetch (url, callback) {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.status === 200 && xhr.readyState == 4) {
      var data = JSON.parse(xhr.responseText);
      return callback(data);
    }
  };

  xhr.open('GET', url, true);
  xhr.send();
}

fetch(urlIsrael, function(data){
  console.log(data);
});
