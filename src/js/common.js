import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import WOW from "wowjs";

import "swiper/css";
import "swiper/css/navigation";

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  menuBtn.addEventListener("click", () => {
    const headerList = document.querySelector(".header__list-mobi");
    headerList.classList.toggle("active");
    menuBtn.classList.toggle("active");
  });
  const swiper = new Swiper(".roadmap__swiper", {
    // configure Swiper to use modules
    modules: [Navigation],
    navigation: {
      nextEl: ".roadmap__button-next",
      prevEl: ".roadmap__button-prev",
    },
    slidesPerView: "auto",
    spaceBetween: 30,
    // breakpoints: {
    //   1000: {
    //     slidesPerView: 3,
    //   },
    //   1300: {
    //     slidesPerView: 4,
    //   },
    // },
  });
  const getTimeRemaining = (endtime) => {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  };
  function setTimeRemaining() {
    const deadline = document.querySelector(".public-timer").dataset.date;
    const { days, hours, seconds, minutes } = getTimeRemaining(deadline);
    const daysElement = document.querySelector("#timer-days");
    const hoursElement = document.querySelector("#timer-hours");
    const minutesElement = document.querySelector("#timer-minutes");
    const secondsElement = document.querySelector("#timer-seconds");
    daysElement.textContent = days;
    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;
    secondsElement.textContent = seconds;
  }
  setInterval(() => {
    setTimeRemaining();
  }, 1000);
  (function setPublicPercent() {
    const percent = document.querySelector(".public-percent").dataset.percent;
    const percentTitle = document.querySelector(".public-percent__title");
    percentTitle.textContent = `${percent}/100`;
    const percentLine = document.querySelector(".public-percent__lines");
    percentLine.style.width = `${percent}%`;
  })();
  (function setClipboardText() {
    const copyBtn = document.querySelector(".public-ref__copy");
    const clipboardText =
      document.querySelector(".public-ref__text").textContent;
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(clipboardText).catch(function (err) {
        console.error("Произошла ошибка при копировании текста: ", err);
      });
    });
  })();
  (function setProgressTokenLine() {
    const totalLine = document.querySelector(".presale-percent__line");
    const progressLine = document.querySelector(".presale-percent__progress");
    const totalProgress = totalLine.dataset.total;
    const currentProgress = totalLine.dataset.progress;
    const items = document.querySelectorAll(".presale-percent__item");
    progressLine.style.width = `${(currentProgress * 100) / totalProgress}%`;
    items.forEach((item) => {
      const startPosition = item.dataset.numberposition;
      const itemPosition = (startPosition * 100) / totalProgress;
      item.style.left = `${itemPosition}%`;
      if (startPosition < currentProgress) {
        item.classList.add("active");
      }
    });
  })();
  new WOW.WOW({
    live: false,
    //и любые другие параметры - это просто пример
  }).init();
});
