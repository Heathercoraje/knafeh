var xhr = new XMLHttpRequest();
var url1 = "https://content.guardianapis.com/search?q=";
var url2 = "&api-key=7b8fdba3-2d40-4d8e-b725-99d86676fbe9&show-fields=thumbnail";
var urlIsrael = url1 + 'israel' + url2;

function fetch(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.status === 200 && xhr.readyState == 4) {
      var data = JSON.parse(xhr.responseText);
      return callback(data);
    }
  };
  xhr.open('GET', url, true);
  xhr.send();
}

fetch(urlIsrael, function(data){
  data.response.results.forEach(function(result, index) {
    var storyTitle = document.createElement('h3');
    storyTitle.setAttribute('id', 'h3'+index)
    storyTitle.innerText = result.webTitle;
    document.querySelector('.search-results').appendChild(storyTitle);
    var storyImage = document.createElement('img');
    storyImage.src = result.fields.thumbnail;
    storyImage.setAttribute('id', 'img'+index)
    document.querySelector('.search-results').appendChild(storyImage);
  })
})

addListener('select', 'change', function(event){
  console.log(event.target.value);
  console.log(typeof(event.target.value));
  var url = url1 + event.target.value + url2;
  fetch(url, function(data){
    data.response.results.forEach(function(result, index) {
      var storyTitle = document.querySelector('#h3'+index)
      storyTitle.innerText = result.webTitle;
      var storyImage = document.querySelector('#img'+index)
      storyImage.src = result.fields.thumbnail;
    })
  })
})

function addListener(selector, eventName, callback) {
  document.querySelector(selector).addEventListener(eventName, callback);
}
