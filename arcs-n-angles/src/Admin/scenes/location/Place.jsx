import React, { useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import Header from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useState } from "react";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { DeleteOutline } from "@material-ui/icons";

const Place = () => {
  const [rows, setRows] = useState([]);
  const [place, setPlace] = useState([]);
  const [district, setDistrict] = useState("");
  const [districts, setDistricts] = useState([]);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const columns = [
    {
      field: "place_id",
      headerName: "ID",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "place_name",
      headerAlign: "center",
      headerName: "PLACE NAME",
      flex: 1,
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
              className="placeListDelete red"
              onClick={() => placeDelete(params.row.place_id)}
            />
          </>
        );
      },
    },
  ];

  const inputData = (e) => {
    console.log(district);
    var dat = {
      place_name: place,
      district_id: district,
    };
    axios.post("http://localhost:4000/Place/", dat).then((response) => {
      fetchDistData();
    });
  };

  const fetchDistData = () => {
    
    axios.get("http://localhost:4000/District").then((response) => {
      var data = response.data.district;
      setDistricts(data);
    });
  };
  useEffect(() => {
    console.log(district);
    fetchDistData();
    fetchPlaceData();
  }, []);

  const fetchPlaceData = () => {
    axios.get("http://localhost:4000/Place").then((response) => {
      var data = response.data.Place;
      setRows(data);
      console.log(district);
    });
  };
  const placeDelete = (id) => {
    axios.delete(`http://localhost:4000/Place/${id}`).then((response) => {
      alert(response.data.message);
      fetchPlaceData();
    });
  };

  return (
    <Box m="20px">
      <Header title="LOCATION MANAGER" subtitle="Places" />
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
          type="text"
          label="Place Name"
          name="place_name"
          onChange={(e) => setPlace(e.target.value)}
          sx={{ gridColumn: "span 4" }}
        />
        <FormControl fullWidth sx={{ gridColumn: "span 4" }}>
          <InputLabel id="demo-simple-select-label">District</InputLabel>
          <Select
            defaultValue=""
            color="secondary"
            fullWidth
            varient="filled"
            onChange={(d) => setDistrict(d.target.value)}
            label="District"
            x={{ gridColumn: "span 4" }}
          >
            <MenuItem disabled value="">
              <em>Select District</em>
            </MenuItem>
            {districts.map((d, key) => (
              <MenuItem key={key} value={d.district_id}>
                {d.district_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box display="flex" mt="20px">
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          onClick={() => inputData()}
        >
          Add Place
        </Button>
      </Box>
      <Box mt="20px">
        <Header title="PLACE MANAGER" />
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            getRowId={(row) => row.place_id}
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[10]}
          />
        </div>
      </Box>
    </Box>
  );
};

export default Place;
