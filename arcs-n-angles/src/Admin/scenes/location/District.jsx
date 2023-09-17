import React, { useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import Header from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { withStyles } from "@material-ui/core";
import { useState } from "react";
import axios from "axios";
import { DeleteOutline } from "@material-ui/icons";

//declare the const and add the material UI style
// const CssTextField = withStyles({
//     root: {
//       '& label.Mui-focused': {
//         color: 'white',
//       },
//       '& .MuiInput-underline:after': {
//         borderBottomColor: 'yellow',
//       },
//       '& .MuiOutlinedInput-root': {
//         '& fieldset': {
//           borderColor: 'white',
//         },
//         '&:hover fieldset': {
//           borderColor: 'white',
//         },
//         '&.Mui-focused fieldset': {
//           borderColor: 'yellow',
//         },
//       },
//     },
//   })(TextField);

const District = () => {
  const columns = [
    {
      field: "district_id",
      headerName: "ID",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "district_name",
      headerAlign: "center",
      headerName: "DISTRICT NAME",
      flex: 1,
      align: "center",
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="districtListDelete red"
              onClick={() => districtDelete(params.row.district_id)}
            />
          </>
        );
      },
    },
  ];
  const [district, setDistrict] = useState("");
  const [rows, setRows] = useState([]);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const inputData = (e) => {
    var dat = {
      district_name: district,
    };
    axios.post("http://localhost:4000/District/", dat).then((response) => {
      console.log(response.data);
      alert(response.data.message);
      fetchData();
    });
  };

  const fetchData = () => {
    axios.get("http://localhost:4000/District").then((response) => {
      var data = response.data.district;
      console.log(data);
      setRows(data);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const districtDelete = (id) => {
    axios.delete(`http://localhost:4000/district/${id}`).then((response) => {
      alert(response.data.message);
      fetchData();
    });
  };

  return (
    <Box m="20px">
      <Header title="LOCATION MANAGER" subtitle="Districts" />
      <Box
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
          "& >div": { gridColumn: isNonMobile ? undefined : "span 2" },
        }}
      >
        <TextField
          fullWidth
          color="secondary"
          varient="outlined"
          onChange={(e) => setDistrict(e.target.value)}
          type="text"
          label="District Name"
          name="dist_name"
          sx={{ gridColumn: "span 4" }}
        />
        {/* <CssTextField
                label="Username"
                className="username"
                name="username"
                type="text"
                autoComplete="current-password"
                margin="normal"
                inputProps={{ style: { fontFamily: "nunito", color: "white" } }}
              /> */}
      </Box>
      <Box display="flex" mt="20px">
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          onClick={() => inputData()}
        >
          Add District
        </Button>
      </Box>

      <Box mt="20px">
        <Header title="DISTRICT MANAGER" />
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            getRowId={(row) => row.district_id}
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Box>
    </Box>
  );
};

export default District;
