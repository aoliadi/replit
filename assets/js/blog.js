"use strict";

// let url = "../../news.json";
// const BASE_URL =
// "https://newsapi.org/v2/top-headlines?country=us&category=business";
const BASE_URL = "https://guardian-blog.herokuapp.com/google?_limit=7";

const newsContainer1 = document.querySelector(".main__news-container--1"),
  newsContainer2 = document.querySelector(".main__news-container--2"),
  newsContainer3 = document.querySelector(".main__news-container--3"),
  topNewsContainer = document.querySelector(".top-news__container");

async function getData(url) {
  let response = await fetch(url);
<<<<<<< HEAD
=======
  console.log(response);
>>>>>>> 7d84f33951463b5e52ec3c9044978e67d0b822bf
  let data = await response.json();
  return data;
}

function renderTopNews(theChoice) {
  const { url, title, description, urlToImage } = theChoice;
  topNewsContainer.parentNode.style.background = `url(${
    urlToImage || `https://via.placeholder.com/300.webp`
  }) top/cover no-repeat`;
  const topNews = `
      <div class="">
          <h1 class="top-news__heading">
            <a href="${url}" class="main__news-link  main__news-link--heading">
              ${title}
            </a>
          </h1>
          <p class="">
            ${description ?? ""}
          </p>
        </div>
      </div>
  `;
  topNewsContainer.innerHTML = topNews;
}

function renderListItems(list) {
  const arr = [...list];
  const rearrange = [];
  for (let index = 0; index <= arr.length + 1; index++) {
    const randomNumber = Math.floor(Math.random() * arr.length);
    rearrange.push(arr[`${randomNumber}`]);
    arr.splice(randomNumber, 1);
  }
  newsContainer1.innerHTML = rearrange[0].join("");
  newsContainer2.innerHTML = rearrange[1].join("");
  newsContainer3.innerHTML = rearrange[2].join("");
}

function divideArray(oldArr, lengthOfArr) {
  const arr1 = [],
    arr2 = [];
  const maxLengthOfNewArr = Math.floor(oldArr.length / 3);
  for (let i = 1; i <= lengthOfArr; i++) {
    const randomNumber = Math.floor(Math.random() * oldArr.length);
    if (arr1.length == maxLengthOfNewArr) {
      if (arr2.length == maxLengthOfNewArr) {
        return [oldArr, arr1, arr2];
      } else arr2.push(oldArr[randomNumber]);
    } else {
      arr1.push(oldArr[randomNumber]);
    }
    oldArr.splice(randomNumber, 1);
  }
  return [oldArr, arr1, arr2];
}

getData(BASE_URL)
  .then((data) => {
<<<<<<< HEAD
    let theData = [...data];
=======
    // let theData = [...data.articles];
    let theData = [...data];
    console.log(data);
>>>>>>> 7d84f33951463b5e52ec3c9044978e67d0b822bf

    const randomNumber = Math.floor(Math.random() * theData.length);

    let topNews = theData[`${randomNumber}`];
    theData.splice(`${randomNumber}`, 1);
    renderTopNews(topNews);

    let listItems = theData.map((item) => {
      const theDate = new Date(`${item.publishedAt}`).toDateString();
      return `
      <li class="main__news-item">
          <h5 class="main__news-item--category">
          ${item.source.name}
          </h5>
          <img src="${
            item.urlToImage || `https://via.placeholder.com/150.webp`
          }" alt="" class="main__news-item--img" width="100%" height="150px">
          <small class="main__news-item--date"> ${theDate} </small>
          <h3 class="main__news-item--heading">
          <a href="${
            item.url
          }" class="main__news-link main__news-link--heading">
          ${item.title}
          </a>
          </h3>
          <small class="main__news-item--author">
            ${item.author ?? item.source.name ?? ""}
          </small>
          <p class="main__news-item--desc">
          ${item.description ?? ""}
          </p>
          <a href="${item.url}" class="main__news-link">Read more</a>
      </li>
      `;
    });

    let newsArrays = [...divideArray(listItems, listItems.length)];
    renderListItems(newsArrays);
  })
  .catch((err) => alert(err.message));
