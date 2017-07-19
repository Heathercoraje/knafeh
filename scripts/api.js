//defining global variable
var url1 = "https://content.guardianapis.com/search?q="; //the main url
var url2 = "&api-key=7b8fdba3-2d40-4d8e-b725-99d86676fbe9&show-fields=thumbnail";
var urlIsrael = url1 + 'israel' + url2;

function fetch(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.status === 200 && xhr.readyState == 4) {
      var data = JSON.parse(xhr.responseText);
      console.log(data);
      return callback(data);

    }
  };
  xhr.open('GET', url, true);
  xhr.send();
}

fetch(urlIsrael, function(data) {
  data.response.results.forEach(function(result, index) {
    var storyBlock = document.createElement('div');
    storyBlock.setAttribute('class', 'storyBlock');


    var storyTitle = document.createElement('h3');
    storyTitle.setAttribute('id', 'h3' + index);
    // storyTitle.innerText = result.webTitle; //textContent

    var storyLink = document.createElement('a');
    storyLink.setAttribute('id', 'a' + index);
    storyLink.href = result.webUrl;
    //console.log(storyLink);
    storyLink.innerText = result.webTitle;
    storyTitle.appendChild(storyLink);
    storyBlock.appendChild(storyTitle);



    var storyImage = document.createElement('img');
    storyImage.src = result.fields.thumbnail;
    storyImage.setAttribute('id', 'img' + index);
    storyBlock.appendChild(storyImage);
    document.querySelector('.search-results').appendChild(storyBlock);
  })
})

addListener('select', 'change', function(event) {
  //console.log(event.target.value);
  //console.log(typeof(event.target.value));
  var url = url1 + event.target.value + url2;
  fetch(url, function(data) {
    data.response.results.forEach(function(result, index) {

      var storyTitle = document.querySelector('#a' + index)
      storyTitle.innerText = result.webTitle;
      storyTitle.href = result.webUrl;

      var storyImage = document.querySelector('#img' + index)
      storyImage.src = result.fields.thumbnail;
    })
  })
})

function addListener(selector, eventName, callback) {
  document.querySelector(selector).addEventListener(eventName, callback);
}
