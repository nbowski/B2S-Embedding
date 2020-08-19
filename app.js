console.log("Hello from B2S!");

// create the viz variable
let viz;

// grab the vizContainer element
const vizContainer = document.getElementById("vizContainer");
// the url of the tableau dashboard
const url1 =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard";
const url2 =
  "https://public.tableau.com/views/Freeschoolmealsandeducationalattainment/Dashboard";

// the options of our dashboard (desktop, width, height, etc)
const options = {
  device: "desktop",
};

const pdfButton = document.getElementById("pdfButton");
pdfButton.addEventListener("click", function () {
  viz.showExportPDFDialog();
});

const imageButton = document.getElementById("imageButton");
imageButton.addEventListener("click", function () {
  viz.showExportImageDialog();
});

const powerpointButton = document.getElementById("powerpointButton");
powerpointButton.addEventListener("click", function () {
  alert("get outta here - no powerpoint for you");
});

//grab the show and hide buttons
const showButton = document.getElementById("showButton");
const hideButton = document.getElementById("hideButton");

//hide the show button by default

//when someone clicks on hide button, remove the hide button and show the show button
hideButton.addEventListener("click", function () {
  // hide the tableau viz
  viz.hide();
  showButton.style.display = "inline";
  hideButton.style.display = "none";
  // hide the hide button and show the show button
});

showButton.addEventListener("click", function () {
  // show the tableau viz
  viz.show();
  showButton.style.display = "none";
  hideButton.style.display = "inline";
  // hide the hide button and show the show button
});

//listen for a click on the switchviz button
//if someone clicks then hide old viz, show new viz
const switchViz = document.getElementById("switchViz");
switchViz.addEventListener("click", function () {
  // remove old viz and replace with new viz
  if (viz.getUrl() === url1) {
    initViz(url2);
  } else {
    initViz(url1);
  }
});
// loop through the text buttons to create the value
document.querySelectorAll(".filter").forEach((button) => {
  console.log(button);
  button.addEventListener("click", (e) => singlefilter(e.target.value));
});

// function to filter to the different regions
function singlefilter(value) {
  const sheettofilter = viz
    .getWorkbook()
    .getActiveSheet()
    .getWorksheets()
    .get("Sales Map");
  console.log(sheettofilter);

  sheettofilter.applyFilterAsync(
    "Region",
    value,
    tableau.FilterUpdateType.REPLACE
  );
}

//test button for sheettofilter

// create a function that initialises the dashboard
function initViz(vizUrl) {
  if (viz) {
    viz.dispose();
  }
  viz = new tableau.Viz(vizContainer, vizUrl, options);
  showButton.style.display = "none";
}

initViz(url1);
