//defining global variable
var newsUrl = "https://content.guardianapis.com/search?q="; //the main url
var newsUrl2 = "&api-key=7b8fdba3-2d40-4d8e-b725-99d86676fbe9&show-fields=all";
var newsUrlIsrael = newsUrl + 'israel' + newsUrl2;
var picUrl = "https://countryapi.gear.host/v1/Country/getCountries?pName=";
var israelUrl = "israel";
var picUrlIsrael = picUrl + israelUrl;
var koreaUrl = "Korea+(Republic+of)";
var ukUrl = "united+kingdom";


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

fetch(picUrlIsrael, function(data) {
    var backgroundDiv = document.createElement('div');
    backgroundDiv.setAttribute('class', 'backgroundDiv');
    var backgroundImage = document.createElement('img');
    console.log(data.Response[0].flag)
    backgroundImage.src = data.Response[0].Flag;
    backgroundImage.setAttribute('class', 'backgroundImage');
    backgroundImage.setAttribute('alt', 'Israel flag');
    backgroundDiv.appendChild(backgroundImage);
    document.querySelector(".menu").appendChild(backgroundDiv);
});

fetch(newsUrlIsrael, function(data) {
  data.response.results.forEach(function(result, index) {
    var storyBlock = document.createElement('div');
    storyBlock.setAttribute('class', 'storyBlock');
    var storyTitle = document.createElement('h3');
    var storyLink = document.createElement('a');
    storyLink.setAttribute('id', 'a' + index);
    storyLink.href = result.webUrl;
    storyLink.innerText = result.webTitle;
    storyTitle.appendChild(storyLink);
    storyBlock.appendChild(storyTitle);

    var storySummary = document.createElement('p');
    storySummary.setAttribute('id', 'p'+index);
    storySummary.setAttribute('class', 'storySummary');
    storySummary.innerText = result.fields.bodyText.split('. ').slice(0, 4).join('. ');
    //console.log(storySummary);
    storyBlock.appendChild(storySummary);

    var storyImage = document.createElement('img');
    storyImage.src = result.fields.thumbnail;
    storyImage.setAttribute('id', 'img' + index);
    storyImage.setAttribute('alt', result.webTitle);
    storyBlock.appendChild(storyImage);
    document.querySelector('.search-results').appendChild(storyBlock);
  })
})

addListener('select', 'change', function(event) {
  //console.log(event.target.value);
  //console.log(typeof(event.target.value));
  var news = newsUrl + event.target.value + newsUrl2;
  var flag;
  if(event.target.value === "UK")
        flag = picUrl + ukUrl;
  else if (event.target.value === "South Korea")
        flag = picUrl + koreaUrl;
  else
        flag = picUrl + event.target.value;
//  console.log(event.target.value)
  fetch(news, function(data) {
    data.response.results.forEach(function(result, index) {
      var storyTitle = document.querySelector('#a' + index)
      storyTitle.innerText = result.webTitle;
      storyTitle.href = result.webUrl;

      var storySummary = document.querySelector('#p' + index);
      storySummary.innerText = result.fields.bodyText.split('. ').slice(0, 4).join('. ');

      var storyImage = document.querySelector('#img' + index)
      storyImage.src = result.fields.thumbnail;
    });
  });
  fetch(flag, function(data) {
      var flagImg = document.querySelector('.backgroundImage');
      flagImg.setAttribute('alt', event.target.value + " flag");
      flagImg.src = data.Response[0].Flag;
    });
});

function addListener(selector, eventName, callback) {
  document.querySelector(selector).addEventListener(eventName, callback);
}

module.exports = fetch;
