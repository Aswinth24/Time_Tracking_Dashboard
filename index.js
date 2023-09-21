const text = {
  daily: "Yesterday",
  weekly: "Last Week",
  monthly: "Last Month",
};

const arr = [];
const days = ["daily", "weekly", "monthly"];
const image = [
  "icon-work.svg",
  "icon-play.svg",
  "icon-study.svg",
  "icon-exercise.svg",
  "icon-social.svg",
  "icon-self-care.svg",
];
const daily = document.querySelector("#daily");
const weekly = document.querySelector("#weekly");
const monthly = document.querySelector("#monthly");
let currentFn = daily;
daily.addEventListener("click", () => {
  currentFn.classList.remove("current");
  currentFn = daily;
  daily.classList.add("current");
  createCont(0);
});
weekly.addEventListener("click", () => {
  currentFn.classList.remove("current");
  currentFn = weekly;
  weekly.classList.add("current");
  createCont(1);
});
monthly.addEventListener("click", () => {
  currentFn.classList.remove("current");
  currentFn = monthly;
  monthly.classList.add("current");
  createCont(2);
});
function creatingTabs(titleText, hoursText, previousText, index, text) {
  const cont = document.createElement("div");
  cont.classList.add("cont");
  const background_cont = document.createElement("div");
  background_cont.classList.add("bg_cont");
  background_cont.setAttribute(
    "style",
    `background-image:url(assets/images/${image[index]})`
  );
  cont.appendChild(background_cont);
  const cont_child = document.createElement("div");
  cont_child.classList.add("cont-child");

  const title_cont = document.createElement("div");
  title_cont.classList.add("title-cont");
  const title = document.createElement("span");
  title.textContent = titleText;
  const img = document.createElement("img");
  img.setAttribute("src", "/assets/images/icon-ellipsis.svg");
  img.setAttribute("alt", "images");

  title_cont.appendChild(title);
  title_cont.appendChild(img);

  const hours_detials = document.createElement("div");
  hours_detials.classList.add("hours-detials");
  const hours = document.createElement("span");
  hours.classList.add("hours");
  const previous = document.createElement("span");
  previous.classList.add("previous");
  hours.textContent = hoursText + "hrs";
  previous.textContent = text + " - " + previousText + "hrs";
  hours_detials.appendChild(hours);
  hours_detials.appendChild(previous);

  cont_child.appendChild(title_cont);
  cont_child.appendChild(hours_detials);

  cont.appendChild(cont_child);

  return cont;
}

function createCont(index) {
  const daily_info = document.querySelector("#daily_info");
  daily_info.innerHTML = "";
  for (let i = 0; i < 6; i++) {
    daily_info.appendChild(
      creatingTabs(
        arr[0][i].title,
        arr[0][i].timeframes[days[index]].current,
        arr[0][i].timeframes[days[index]].previous,
        i,
        text[days[index]]
      )
    );
  }
}

async function intialize() {
  await fetch("./data.json")
    .then((res) => res.json())
    .then((json) => {
      arr.push(json);
    });
}
async function load() {
  await intialize();
  createCont(0);
  daily.classList.add("current");
}
load();
