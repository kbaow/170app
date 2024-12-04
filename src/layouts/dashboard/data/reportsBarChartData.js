/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

const reportsBarChartData = {
  chart: {
    labels: ["Lebron James Jr.", "Rob Dillingham", "Stephen Curry", "Manu Ginobly", "MJ", "Rudy Gobert", "Ja Morant", "Zach Edey", "Larry Bird"],
    datasets: { label: "Rating", data: [450, 200, 100, 220, 500, 100, 400, 230, 500] },
  },
  items: [
    {
      icon: { color: "primary" },
      label: "Lebron James Jr",
      progress: { content: "450", percentage: 60 },
    },
    {
      icon: { color: "info" },
      label: "Stephen Curry",
      progress: { content: "100", percentage: 90 },
    },
    {
      icon: { color: "info" },
      label: "MJ",
      progress: { content: "500", percentage: 99 },
    },
    {
      icon: { color: "error" },
      label: "Zach Edey",
      progress: { content: "230", percentage: 50 },
    },
  ],
};

export default reportsBarChartData;
