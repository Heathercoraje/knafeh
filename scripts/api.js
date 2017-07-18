var xhr = new XMLHttpRequest();
var url1 = "https://content.guardianapis.com/search?";
var url2 = "api-key=7b8fdba3-2d40-4d8e-b725-99d86676fbe9&show-fields=thumbnail";

var urlIsrael = url1 + 'q=Israel&' + url2;


function addListener(selector, eventName, callback) {
  document.querySelector(selector).addEventListener(eventName, callback);
}

function fetch(url, callback) {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.status === 200 && xhr.readyState == 4) {
      var data = JSON.parse(xhr.responseText);
      data.response.results.forEach(function(result) {

        var storyTitle = document.createElement('h3');
        storyTitle.innerText = result.webTitle;

        document.querySelector('.search-results').appendChild(storyTitle);

        var storyImage = document.createElement('img');
        storyImage.src = result.fields.thumbnail;

        document.querySelector('.search-results').appendChild(storyImage);

        // '<img src=' + result.fields.thumbnail + '>'

      })
      return callback(data);
    }
  };

  xhr.open('GET', url, true);
  xhr.send();
}

fetch(urlIsrael, function(data) {
  console.log(data);
});
