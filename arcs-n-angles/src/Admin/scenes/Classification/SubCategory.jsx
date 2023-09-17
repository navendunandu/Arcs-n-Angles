import React, { useEffect } from "react";
import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import Header from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import axios from "axios";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { DeleteOutline } from "@material-ui/icons";

const Category = () => {

    const [rows, setRows] = useState([]);
    const [subcat, setSubcat] = useState([]);
    const [cats, setCats] = useState([]);
    const [cat, setCat] = useState("");

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const columns = [
        {
            field: "subcategory_id", 
            headerName: "ID", 
            flex: 0.5 ,
            headerAlign: 'center',
            align:'center'
        }, 
        {
            field: "subcategory_name",
            headerAlign: 'center', 
            headerName: "SUB-CATEGORY NAME", 
            flex: 1 ,
            align:'center'
        }, 
        {
            field: "category_name",
            headerAlign: 'center', 
            headerName: "CATEGORY NAME", 
            flex: 1 ,
            align:'center'
        }, 
        {
            field: "action",
            headerName:"Action",
            sortable: false,
            renderCell: (params) => {
                return(
                  <>
                    <DeleteOutline className="placeListDelete red" 
                    onClick={()=> subcatDelete(params.row.subcategory_id)}
                    />
                  </>
                )
              }
        },
    ]

    const inputData = (e) => {
        console.log(cat);
        var dat = {
            subcategory_name: subcat,
            category_id: cat,
        }
        axios.post("http://localhost:4000/SubCategory", dat).then((response) => {
            
        fetchSubCatData();
        });
    }

    const fetchCatData = () => {
            axios.get("http://localhost:4000/Category").then((response) => {
            var data = response.data.Category;
            setCats(data);
            });
        };

    const fetchSubCatData = () => {
        axios.get("http://localhost:4000/SubCategory").then((response) => {
          var data = response.data.SubCategory;
         setRows(data);
        });
      };

    useEffect(() => {
        fetchSubCatData();
        fetchCatData();
        }, []
    );

    const subcatDelete = (id) => {
        axios.delete(`http://localhost:4000/SubCategory/${id}`).then((response) => {
          alert(response.data.message);
          fetchSubCatData();
        });
      };

  return (
    <Box m="20px">
        <Header title="CLASSIFICATIONS" subtitle="Sub Categories" />
            <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
                "& >div": {gridColumn: isNonMobile ? undefined: "span 2"},
            }}
            >
                <TextField
                fullWidth
                color="secondary"
                varient="outlined"
                type="text"
                label="Sub-Category Name"
                name="subcat_name"
                onChange={(e) => setSubcat(e.target.value)}
                sx={{ gridColumn: "span 4"}}
                />

                <FormControl fullWidth sx={{ gridColumn: "span 4" }}>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        defaultValue=""
                        color="secondary"
                        fullWidth
                        varient="filled"
                        onChange={(d) =>setCat(d.target.value)}
                        label="Category" x={{ gridColumn: "span 4" }}
                        >
                        <MenuItem disabled value="">
                            <em>Select Category</em>
                        </MenuItem>    
                            {
                            cats.map((d,key) =>
                            <MenuItem key={key} value={d.category_id} 
                            >{d.category_name}</MenuItem>
                            )}
                    </Select>
                </FormControl>
                
                </Box>
                <Box display="flex"  mt="20px">
                    <Button type="submit" color="secondary" variant="contained" onClick={() => inputData()}>
                        Add Sub-Category
                    </Button>
                </Box>
        <Box mt="20px">
            <Header title="SUB-CATEGORY MANAGER" />
            <div style={{ height: 400, width: '100%' }}>
            <DataGrid
            getRowId={(row) => row.subcategory_id}
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
            </div>
        </Box>
    </Box>
  )
}

export default Category