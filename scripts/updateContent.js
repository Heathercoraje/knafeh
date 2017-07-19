//functions for updating content

function updateStory(result, index){
  var storyTitle = document.querySelector('#a' + index)
  storyTitle.innerText = result.webTitle;
  storyTitle.href = result.webUrl;

  var storySummary = document.querySelector('#p' + index);
  storySummary.innerText = result.fields.bodyText.split('. ').slice(0, 4).join('. ');

  var storyImage = document.querySelector('#img' + index)
  storyImage.src = result.fields.thumbnail;
}

function flagUrl(country){
  var flag;
  if(country === "UK")
    flag = picUrl + ukUrl;
  else if (country === "South Korea")
    flag = picUrl + koreaUrl;
  else
    flag = picUrl + country;
  return flag;
}

if (typeof module !== 'undefined')
  module.exports  = flagUrl; 
