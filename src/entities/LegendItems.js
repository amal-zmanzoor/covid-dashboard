import LegendItem from "./LengendItem";

var legendItems = [
  new LegendItem(
    "1,000,000 +",
    "#011f4b",
    (cases) => cases >= 1_000_000,
    "white"
  ),

  new LegendItem(
    "500,000 - 999,999",
    "#03396c",
    (cases) => cases >= 500_000 && cases < 1_000_000,
    "White"
  ),

  new LegendItem(
    "200,000 - 499,999",
    "#005b96",
    (cases) => cases >= 200_000 && cases < 500_000
  ),

  new LegendItem(
    "50,000 - 199,999",
    "#6497b1",
    (cases) => cases >= 50_000 && cases < 200_000
  ),

  new LegendItem(
    "0 - 49,999",
    "#b3cde0",
    (cases) => cases > 0 && cases < 50_000
  ),

  new LegendItem("No Data", "#ffffff", (cases) => true),
];

export default legendItems;

