import { select, json, scaleOrdinal, schemeSet3 } from "d3";
import "../scss/main.scss";
import { Treemap } from "./Treemap";
import { colorLegends } from "./colorLegend";
import { Navigation } from "./Navigation";

/**
 * worked inspired from Guglielmo Celata and  AliNisar
 * visit:http://bl.ocks.org/guglielmo/16d880a6615da7f502116220cb551498
 * vist: https://codesandbox.io/s/github/AliNisarAhmed/FCC-d3-treeMap
 * update pattern form Curran Kelleher's and Mike bostock
 * vist: https://bl.ocks.org/curran/0b5c3711cb8772088179e56106fe1844
 * vist: https://bl.ocks.org/mbostock/3808218
 */
//create svg elements
const svg = select(".display__svg").append('svg')
//create colorScale
const colorScale = scaleOrdinal().range(schemeSet3);

const options = ["Video Game Sales", "Movies Sales", "Kickstarter Pledges"];
let selectedOption = options[0];

// STATE
let idx = 0;
let dataset;
let data;

const onOptionClick = (option, idx) => {
  selectedOption = option;
  //selecting dataset
  data = dataset[idx];
  //updating title
  select("#title>h1").text(option);
  render();
};

//Loading all the dataset
Promise.all([
  json(
    "https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/kickstarter-funding-data.json"
  ),
  json(
    "https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/movie-data.json"
  ),
  json(
    "https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/kickstarter-funding-data.json"
  )
]).then(([video, movies, kickstarter]) => {
  //remove preloader
  select("#loading").remove();

  dataset = [video, movies, kickstarter];
  data = dataset[idx];
window.addEventListener("resize", render);
  render();
});

function render() {
  //Assigning margin and dimension of windows
  const width = document.querySelector(".display__svg").offsetWidth;
  const height = width / 2;
  const margin = { top: 30, bottom: 20, left: 10, right: 10 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
 
  //Invoking treemap function
  Treemap(svg, {
    data,
    height,
    width,
    margin,
    innerHeight,
    innerWidth,
    colorScale
  });

  //Legeds
  colorLegends(select(".display__svg"), {
    data,
    innerHeight,
    innerWidth,
    margin,
    colorScale
  });

  //Drop down list
  Navigation(select("nav>.select"), { options, onOptionClick, selectedOption });
}


