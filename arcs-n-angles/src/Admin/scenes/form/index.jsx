import { Box, Button, TextField, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import "../../App.css";
import { useState } from "react";
import { Done } from "@material-ui/icons";
import axios from "axios";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";

const userSchema = yup.object().shape({
    brick: yup.string().required("required"),
    rebar: yup.string().required("required"),
    cement: yup.string().required("required"),
    steel: yup.string().required("required"),
    wood: yup.string().required("required"),
});

const initialValues = {
  brick: "",
  rebar: "",
  cement: "",
  steel: "",
  wood: "",
};

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSubmitted, setIsSubmitted] = useState(false); // track submission status
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleFormSubmit = (values) => {
    console.log(values);
    setIsSubmitted(true); // update submission status on form submit
  };

  const date = new Date(); // create a new Date object
  const dateString = date.toLocaleDateString("en-IN"); // get the date, month, and year as a string in the desired format

  const fetchData = () => {
    axios.get("http://localhost:4000/materialcost").then((response) => {
      var data = response.data.Material;
      console.log(data);
      setRows(data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [rows, setRows] = useState([]);

  let i=0;
  

  const columns = [
    {
      field: "material_id",
      headerName: "Sl.No",
    },
    {
      field: "material_date",
      headerName: "Date",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "material_brick",
      headerName: "Brick",
      flex: 1,
    },
    {
      field: "material_rebar",
      headerName: "Rebar",
      flex: 1,
    },
    {
      field: "material_cement",
      headerName: "Cement",
      flex: 1,
    },
    {
      field: "material_steel",
      headerName: "Steel",
      flex: 1,
    },
    {
      field: "material_wood",
      headerName: "Wood",
      flex: 1,
    },
  ];

  return (
    <>
    <Box m="20px">
      <Header title="MATERIAL PRICE UPDATE" subtitle={dateString} />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(3, minmax(0, 1fr))"
              sx={{
                "& >div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                varient="filled"
                type="text"
                label="Brick Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.brick}
                name="brick"
                color="secondary"
                error={!!touched.brick && !!errors.brick}
                helperText={touched.brick && errors.brick}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                varient="filled"
                type="text"
                color="secondary"
                label="Rebar Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.rebar}
                name="rebar"
                error={!!touched.rebar && !!errors.rebar}
                helperText={touched.rebar && errors.rebar}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                varient="filled"
                type="text"
                color="secondary"
                label="Cement Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cement}
                name="cement"
                error={!!touched.cement && !!errors.cement}
                helperText={touched.cement && errors.cement}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                varient="filled"
                type="text"
                color="secondary"
                label="Steel Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.steel}
                name="steel"
                error={!!touched.steel && !!errors.steel}
                helperText={touched.steel && errors.steel}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                varient="filled"
                type="text"
                color="secondary"
                label="Wood Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.wood}
                name="wood"
                error={!!touched.wood && !!errors.wood}
                helperText={touched.wood && errors.wood}
                sx={{ gridColumn: "span 1" }}
              />
              <Box
                display="flex"
                sx={{ gridColumn: "span 1" }}
              >
                <Button type="submit" fullWidth color="secondary" variant="contained" style={{fontSize:"14px", height: "52px"}} 
                className={isSubmitted ? "tick" : ""}
                >
                {isSubmitted ? (
                    // show success icon or message after submission
                    <>
                      Updated <span className="material-icons"><Done/></span>
                    </>
                  ) : (
                    // show regular text on initial load
                    <>
                      Update Price on {dateString}{' '}
                      <span className="material-icons"></span>
                    </>
                  )}
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
    <Box m="20px">
    <Header title="MATERIAL PRICING" />
    <Box
      m="40px 0 0 0"
      height="75vh"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .Name-column-cell": {
          color: colors.greenAccent[300],
        },
        "& .MuiDataGrid-column": {
          border: "none",
        },
        "& .MuiDataGrid-columnHeader": {
          backgroundColor: colors.blueAccent[700],
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: colors.primary[400],
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: colors.blueAccent[700],
        },
      }}
    >
      <DataGrid
        getRowId={(row) => row.material_id}
        rows={rows}
        columns={columns}
        
      />
    </Box>
  </Box>
  </>
  );
};

export default Form;
