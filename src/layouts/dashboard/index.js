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

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import PropTypes from 'prop-types';

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import HorizontalBarChart from "examples/Charts/BarCharts/HorizontalBarChart";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import { Card } from "@mui/material";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
'use client'


import React, { useState } from 'react';
function Dashboard() {

  const formStyles = {
    container: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '600px',
      margin: '0 auto',
    },
    header: {
      textAlign: 'center',
      marginBottom: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    sectionTitle: {
      marginBottom: '10px',
      fontSize: '18px',
      fontWeight: 'bold',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontSize: '14px',
      color: '#333',
    },
    checkboxGroup: {
      marginBottom: '20px',
    },
    checkbox: {
      marginRight: '10px',
    },
    inputGroup: {
      marginBottom: '15px',
    },
    input: {
      width: '100%',
      padding: '10px',
      fontSize: '14px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      boxSizing: 'border-box',
      marginTop: '5px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer',
      width: '100%',
      marginTop: '20px',
    },
    buttonHover: {
      backgroundColor: '#45a049',
    }
  };




  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const s = {
    labels: ["Shooting", "Defense", "Playmaking", "Athleticism"],
    datasets: [
      {
        label: "Lebron James",
        color: "info",
        data: [50, 40, 300, 220],
      },
      {
        label: "Stepen Curry",
        color: "dark",
        data: [30, 90, 40, 140],
      },
    ],
  };
  

  const SliderInput = ({ label, value, onChange }) => (

    <div style={{ maxWidth: 'fit-content', fontFamily: '"Yolk Semibold", sans-serif' }}>
      <label style={formStyles.label}>
        {label}:
        <input
          type="range"
          min="1"
          max="5"
          value={value}
          onChange={onChange}
        />
        {value}
      </label>
    </div>
  );
  SliderInput.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  const [priority, setPriority] = useState({
    blocks: 3,
    defense: 3,
    threePoint: 3,
    rebounds: 3,
    steals: 3
  });

  const playerTypes = {
    shooter: ["Far2A_pg", "Close2A_pg", "FTA_pg", "OBPM", "eFG", "3PA_pg", "Far 2 %", "Close 2 %", "3P%"],
    slasher: ["Close2A_pg", "DunksA_pg", "ORB_per", "PRPG!", "Ortg", "TS_per", "eFG"],
    playmaker: ["Ast", "TO_per", "3P%", "PRPG!", "Ortg", "TS_per", "Stl", "eFG", "FT_per", "FTA_pg"],
    defense: ["Height", "BPM", "D-PRPG", "DBPM", "D-Rtg", "DRB_per", "Blk", "Stl", 'DRB_per'],
    general: ['usg', 'Height', 'PRPG!', 'OBPM', 'DBPM', 'eFG', 'ORB_per', 'DRB_per', 'TO_per', 'A/TO', 'Blk', 'Stl', 'Ast', 'Reb', 'Pts', 'DunksA_pg', 'DunksM_pg', 'Close2A_pg', 'Close2M_pg', 'Far2A_pg', 'Far2M_pg', 'FTA_pg', 'FTM_pg', '3PA_pg', '3PM_pg']
  };
  
  // Predefined set of possible fields (can be extended)
  const [selectedPlayerType, setSelectedPlayerType] = useState('');
  const [selectedFields, setSelectedFields] = useState({});

  // Handle selection of player type
  const handlePlayerTypeChange = (event) => {
    const playerType = event.target.value;
    setSelectedPlayerType(playerType);
    setSelectedFields({}); // Clear previously selected fields when player type changes
  };

  // Handle input change for specific fields
  const handleInputChange = (e, fieldId) => {
    const { value } = e.target;
    setSelectedFields(prev => ({
      ...prev,
      [fieldId]: value,
    }));
  };



  const possibleFields = playerTypes[selectedPlayerType] || [];

  // Handle form submission (e.g., to save or process the data)
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', selectedFields);
    const postData = { ...selectedFields, ...priority };



    try {
      const response = await fetch('http://localhost:8000/submit', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });


    } catch (error) {
      console.error('Error while submitting:', error);
    }
  };




  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Current draft pick" }}
                count="5"
                icon={{ color: "info", component: "public" }}

              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Prefered stats" }}
                count="3 Pt%, Blocks, Steals"
                icon={{ color: "info", component: "public" }}
              />
            </Grid>

            <Grid item xs={12} sm={6} xl={6}>
              <MiniStatisticsCard
                title={{ text: "Welcome Back" }}
                count="Bob Meyers"
                icon={{ color: "info", component: "public" }}
              />
            </Grid>

          </Grid>
        </SoftBox>

        <SoftBox mb={3}>
          <Grid container spacing={3}>

            
            <Grid item xs={6} lg={6}>
            <div style={formStyles.container}>
        <h1 style={formStyles.header}>NBA Draft Prediction Stats</h1>
        <form onSubmit={handleSubmit}>
          {/* Player Type Selection */}
          <div style={formStyles.checkboxGroup}>
            <h2 style={formStyles.sectionTitle}>Select Player Type</h2>
            <label style={formStyles.label}>
              <input
                type="radio"
                value="shooter"
                checked={selectedPlayerType === 'shooter'}
                onChange={handlePlayerTypeChange}
                style={formStyles.checkbox}
              />
              Shooter
            </label>
            <label style={formStyles.label}>
              <input
                type="radio"
                value="slasher"
                checked={selectedPlayerType === 'slasher'}
                onChange={handlePlayerTypeChange}
                style={formStyles.checkbox}
              />
              Slasher
            </label>
            <label style={formStyles.label}>
              <input
                type="radio"
                value="playmaker"
                checked={selectedPlayerType === 'playmaker'}
                onChange={handlePlayerTypeChange}
                style={formStyles.checkbox}
              />
              Playmaker
            </label>
            <label style={formStyles.label}>
              <input
                type="radio"
                value="defense"
                checked={selectedPlayerType === 'defense'}
                onChange={handlePlayerTypeChange}
                style={formStyles.checkbox}
              />
              Defender
            </label>
            <label style={formStyles.label}>
              <input
                type="radio"
                value="general"
                checked={selectedPlayerType === 'general'}
                onChange={handlePlayerTypeChange}
                style={formStyles.checkbox}
              />
              General
            </label>
          </div>

          {/* Stats Input Fields */}
          {selectedPlayerType && (
            <div>
              <h2 style={formStyles.sectionTitle}>Enter Stats for {selectedPlayerType}</h2>
              {possibleFields.map(field => (
                <div key={field} style={formStyles.inputGroup}>
                  <label style={formStyles.label}>{field}:</label>
                  <input
                    type="number"
                    value={selectedFields[field] || ''}
                    onChange={(e) => handleInputChange(e, field)}
                    placeholder={`Enter ${field}`}
                    required
                    style={formStyles.input}
                  />
                </div>
              ))}
            </div>
          )}

          <button type="submit" style={formStyles.button}>
            Submit
          </button>
        </form>
      </div>
            </Grid>

            <Grid item xs={6} lg={6} sm = {1}>
              <Card>
                <div style={{ maxWidth: 'fit-content', marginLeft: 'auto', marginRight: 'auto' }}>
                  <h3 style={formStyles.header}> Select Priorities </h3>
                  <SliderInput
                    label="Blocks"
                    value={priority.blocks}
                    onChange={(e) => setPriority({ ...priority, blocks: parseInt(e.target.value) })}
                  />
                  <SliderInput
                    label="Defense"
                    value={priority.defense}
                    onChange={(e) => setPriority({ ...priority, defense: parseInt(e.target.value) })}
                  />
                  <SliderInput
                    label="3-Point Shooting"
                    value={priority.threePoint}
                    onChange={(e) => setPriority({ ...priority, threePoint: parseInt(e.target.value) })}
                  />
                  <SliderInput
                    label="Rebounds"
                    value={priority.rebounds}
                    onChange={(e) => setPriority({ ...priority, rebounds: parseInt(e.target.value) })}
                  />
                  <SliderInput
                    label="Steals"
                    value={priority.steals}
                    onChange={(e) => setPriority({ ...priority, steals: parseInt(e.target.value) })}
                  />
                </div>
              </Card>

            </Grid>

            <Grid item xs={6} lg={12}>
                <Card>  
                  <HorizontalBarChart 
                    title = "player comps"
                    chart = {s}></HorizontalBarChart>
                </Card>
            </Grid>
          </Grid>
          
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
            </Grid>
            <Grid item xs={12} lg={5}>
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
              <ReportsBarChart
                title="Current Draft Stock"
                description={
                  <>
                    (<strong>+23%</strong>) than last week
                  </>
                }
                chart={chart}
                items={items}
              />
            </Grid>
            <Grid item xs={12} lg={7}>
              <GradientLineChart
                title="Draft Pick Overview"
                description={
                  <SoftBox display="flex" alignItems="center">
                    <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                      <Icon className="font-bold">arrow_upward</Icon>
                    </SoftBox>
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                      4% more{" "}
                      <SoftTypography variant="button" color="text" fontWeight="regular">
                        in 2021
                      </SoftTypography>
                    </SoftTypography>
                  </SoftBox>
                }
                height="20.25rem"
                chart={gradientLineChartData}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
