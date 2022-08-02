"use strict";

// let url = "../../news.json";
// const BASE_URL =
// "https://newsapi.org/v2/top-headlines?country=us&category=business";
const BASE_URL = "https://guardian-blog.herokuapp.com/google?_limit=10";

const newsContainer1 = document.querySelector(".main__news-container--1"),
  newsContainer2 = document.querySelector(".main__news-container--2"),
  newsContainer3 = document.querySelector(".main__news-container--3"),
  topNewsContainer = document.querySelector(".top-news__container"),
  navPaginationContainer = document.querySelector(
    ".nav--pagination__container"
  );

let currentPage = 1;

function selectCurrentPage(pagItems) {
  pagItems.forEach((item, index) => {
    if (index == currentPage) {
      item.className = "pag_list_item pag_list_item--active";
      return;
    }

    item.className = "pag_list_item";
  });

  if (currentPage == pagItems.length - 2) {
    pagItems[pagItems.length - 1].className =
      "pag_list_item pag_list_item--hidden";
  } else if (currentPage == 1) {
    pagItems[0].className = "pag_list_item pag_list_item--hidden";
  }
}

function appendPaginationItems(item) {
  navPaginationContainer.append(item);
}

function addListenerToPaginationItems(pagItems) {
  pagItems.forEach((child, index) => {
    child.className = "pag_list_item";
    child.addEventListener("click", (e) => {
      if (e.target.dataset.page == currentPage) return;

      const clickedPageItem = e.target.dataset.page;
      if (clickedPageItem == "prev") currentPage = currentPage - 1;
      else if (clickedPageItem == "next") currentPage = currentPage + 1;
      else currentPage = clickedPageItem;
      selectCurrentPage(pagItems);
      startProcess(`${BASE_URL}&_page=${currentPage}`);
    });
  });
}

function createPaginationItems(num) {
  let LIST_ITEMS = Array(num + 2)
    .fill()
    .map((item, index) => {
      if (index === 0) return `<li data-page="prev">«</li>`;
      if (index === num + 1) return `<li data-page="next">»</li>`;

      return `<li data-page=${index}>${index}</li>`;
    })
    .join("");

  const LIST_CONTAINER = document.createElement("ul");
  LIST_CONTAINER.className = "pagination__container";
  LIST_CONTAINER.innerHTML = LIST_ITEMS;

  const LIST__CONTAINER_ARR = Array.from(LIST_CONTAINER.children);

  addListenerToPaginationItems(LIST__CONTAINER_ARR);
  selectCurrentPage(LIST__CONTAINER_ARR);
  appendPaginationItems(LIST_CONTAINER);
}

async function getData(url) {
  let response = await fetch(url);
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

function startProcess(API_URI) {
  getData(API_URI)
    .then((data) => {
      let theData = [...data];

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
    .catch((err) => {
      document.querySelector(".main__container").innerHTML = err.message;
      topNewsContainer.innerHTML = err.message;
    });
}

createPaginationItems(5);
startProcess(BASE_URL);
