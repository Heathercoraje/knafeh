//functions for calling API

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
  createIsraelFlag(data);
});

fetch(newsUrlIsrael, function(data) {
  data.response.results.forEach(function(result, index) {
    createIsraelStory(result, index);
  })
})

addListener('select', 'change', function(event) {
  var news = newsUrl + event.target.value + newsUrl2;
  fetch(news, function(data) {
    data.response.results.forEach(function(result, index) {
      updateStory(result, index);
    });
  });
  fetch(flagUrl(event.target.value), function(data) {
    var flagImg = document.querySelector('.backgroundImage');
    flagImg.setAttribute('alt', event.target.value + " flag");
    flagImg.src = data.Response[0].Flag;
  });
});

function addListener(selector, eventName, callback) {
  document.querySelector(selector).addEventListener(eventName, callback);
}
