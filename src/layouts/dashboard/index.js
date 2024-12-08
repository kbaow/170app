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

  const SliderInput = ({ label, value, onChange }) => (

    <div style = {{ maxWidth: 'fit-content',  fontFamily: '"Yolk Semibold", sans-serif'     }}>
      <label  style={formStyles.label}>
        {label}:
        <input
          type="range"
          min="0"
          max="10"
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
    blocks: 1,
    defense: 1,
    threePoint: 1,
    rebounds: 1,
    steals: 1
  });

    // Predefined set of possible fields (can be extended)
    const possibleFields = [
      { id: 'shooting_percentage', label: 'Shooting Percentage (%)' },
      { id: 'three_point_percentage', label: '3P Percentage (%)' },
      { id: 'blocks', label: 'Blocks' },
      { id: 'steals', label: 'Steals' },
      { id: 'rebounds', label: 'Rebounds' },
      { id: 'assists', label: 'Assists' },
    ];
  
    // State to manage selected fields and their values
    const [selectedFields, setSelectedFields] = useState({});
    
    // Toggle a field on or off
    const handleFieldToggle = (fieldId) => {
      setSelectedFields(prev => {
        const updatedFields = { ...prev };
        if (updatedFields[fieldId]) {
          delete updatedFields[fieldId]; // Remove the field if it's already selected
        } else {
          updatedFields[fieldId] = ''; // Add the field with an empty value
        }
        return updatedFields;
      });
    };
  
    // Handle input change for specific fields
    const handleInputChange = (e, fieldId) => {
      const { value } = e.target;
      setSelectedFields(prev => ({
        ...prev,
        [fieldId]: value,
      }));
    };
  
    // Handle form submission (e.g., to save or process the data)
    const  handleSubmit = async (e) => {
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
            <Grid item xs= {6} lg={6}>
            <div style={formStyles.container}>
      <h1 style={formStyles.header}>NBA Draft Prediction Stats</h1>
      <form onSubmit={handleSubmit}>
        <div style={formStyles.checkboxGroup}>
          <h2 style={formStyles.sectionTitle}>Select the stats to input</h2>
          {possibleFields.map(field => (
            <div key={field.id}>
              <label style={formStyles.label}>
                <input
                  type="checkbox"
                  checked={selectedFields.hasOwnProperty(field.id)}
                  onChange={() => handleFieldToggle(field.id)}
                  style={formStyles.checkbox}
                />
                {field.label}
              </label>
            </div>
          ))}
        </div>

        <div>
          <h2 style={formStyles.sectionTitle}>Enter Stats</h2>
          {Object.keys(selectedFields).map(fieldId => {
            const field = possibleFields.find(f => f.id === fieldId);
            return (
              <div key={fieldId} style={formStyles.inputGroup}>
                <label style={formStyles.label}>{field.label}:</label>
                <input
                  type="number"
                  value={selectedFields[fieldId]}
                  onChange={(e) => handleInputChange(e, fieldId)}
                  placeholder={`Enter ${field.label}`}
                  required
                  style={formStyles.input}
                />
              </div>
            );
          })}
        </div>

        <button type="submit" style={formStyles.button}>
          Submit
        </button>
      </form>
    </div>
            </Grid>

            <Grid item xs={6} lg={6}>
              
              
              <Card>
              
              <div style={{ maxWidth: 'fit-content', marginLeft: 'auto', marginRight: 'auto', font: "Yolk Semibold" }}>
                <h3 style={formStyles.header}> Select Priorities </h3>
        <SliderInput
          label="Blocks"
          value={priority.blocks}
          onChange={(e) => setPriority({ ...priority, blocks: parseInt(e.target.value) })}
        />
        <SliderInput
          label="Defense"
          value={priority.defense}
          onChange={(e) => setPriority({ ...priority, defense: parseInt(e.target.value)})}
        />
        <SliderInput
          label="3-Point Shooting"
          value={priority.threePoint}
          onChange={(e) => setPriority({ ...priority, threePoint: parseInt(e.target.value) })}
        />
        <SliderInput
          label="Rebounds"
          value={priority.rebounds}
          onChange={(e) => setPriority({ ...priority, rebounds: parseInt(e.target.value)})}
        />
        <SliderInput
          label="Steals"
          value={priority.steals}
          onChange={(e) => setPriority({ ...priority, steals:parseInt(e.target.value)})}
        />
      </div>

    
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
