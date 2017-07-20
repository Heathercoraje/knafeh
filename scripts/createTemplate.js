//functions for creating and rendering html elements

function createIsraelFlag(data) {
  var backgroundDiv = document.createElement('div');
  backgroundDiv.setAttribute('class', 'backgroundDiv');
  var backgroundImage = document.createElement('img');
  backgroundImage.src = data.Response[0].Flag;
  backgroundImage.setAttribute('class', 'backgroundImage');
  backgroundImage.setAttribute('alt', 'Israel flag');
  backgroundDiv.appendChild(backgroundImage);
  document.querySelector(".menu").appendChild(backgroundDiv);
}

function createIsraelStory(result, index) {
  var storyBlock = document.createElement('div');
  storyBlock.setAttribute('class', 'storyBlock');
  var textContainer = document.createElement('div');
  textContainer.setAttribute('class', 'textContainer');
  var storyTitle = document.createElement('h3');
  var storyLink = document.createElement('a');
  storyLink.setAttribute('id', 'a' + index);
  storyLink.href = result.webUrl;
  storyLink.innerText = result.webTitle;
  storyTitle.appendChild(storyLink);
  textContainer.appendChild(storyTitle);

  var storySummary = document.createElement('p');
  storySummary.setAttribute('id', 'p' + index);
  storySummary.setAttribute('class', 'storySummary');
  storySummary.innerText = result.fields.bodyText.split('. ').slice(0, 4).join('. ');
  textContainer.appendChild(storySummary);

  var storyImage = document.createElement('img');
  storyImage.src = result.fields.thumbnail;
  storyImage.setAttribute('id', 'img' + index);
  storyImage.setAttribute('alt', result.webTitle);
  storyBlock.appendChild(textContainer);
  storyBlock.appendChild(storyImage);
  document.querySelector('.search-results').appendChild(storyBlock);


}
