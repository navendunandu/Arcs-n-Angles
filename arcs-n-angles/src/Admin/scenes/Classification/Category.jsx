import React, { useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import Header from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DataGrid} from '@mui/x-data-grid';
import { useState } from "react";
import axios from "axios";
import { DeleteOutline } from "@material-ui/icons";

const Category = () => {

    const columns = [
        {
            field: "category_id", 
            headerName: "ID", 
            flex: 0.5 ,
            headerAlign: 'center',
            align:'center'
        }, 
        {
            field: "category_name",
            headerAlign: 'center', 
            headerName: "CATEGORY NAME", 
            flex: 1 ,
            align:'center'
        },
    ]
    
    const [category, setCategory] = useState("");
    const [rows, setRows] = useState([]);

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const inputData = (e) => {
        var dat = {
            category_name: category,
        };
        axios.post("http://localhost:4000/Category/", dat).then((response) => {
          console.log(response.data);
          alert(response.data.message);
          fetchData();
        });
      };

      const fetchData = () => {
        axios.get("http://localhost:4000/Category").then((response) => {
            var data = response.data.Category;
            console.log(data);
            setRows(data);
        });
    };
    useEffect(() => {
        fetchData();
    }, 
    []);
    

    const categoryDelete = (id) => {
        axios.delete(`http://localhost:4000/category/${id}`).then((response) => {
          alert(response.data.message);
          fetchData();
        });
      };
      return (
    <Box m="20px">
        <Header title="CLASSIFICATIONS" subtitle="Categories" />
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
                    label="Category Name"
                    onChange={(e) => setCategory(e.target.value)}
                    name="cat_name"
                    sx={{ gridColumn: "span 4"}}
                    />
                    
                    </Box>
                    <Box display="flex"  mt="20px">
                        <Button type="submit" color="secondary" variant="contained" onClick={() => inputData()}>
                            Add Category
                        </Button>
                    </Box>

        <Box mt="20px">
            <Header title="CATEGORY MANAGER" />
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                getRowId={(row) => row.category_id}
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
        </Box>
    </Box>
  )
};

export default Category