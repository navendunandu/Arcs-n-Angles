import React, { useEffect, useState } from 'react'
import './NewProject.css'
import { Button, FormControl, Grid, Input, InputLabel, MenuItem, Popover, Select, TextField, Typography } from '@mui/material'
import { Label, PhotoCamera } from '@mui/icons-material'
import axios from 'axios'
import BackupTableIcon from '@mui/icons-material/BackupTable';
import { Navigate, useNavigate } from 'react-router-dom'

const NewProject = () => {
    const navigate = useNavigate();

    const aid = sessionStorage.getItem('arid')

    // Form const
    const [title, setTitle] = useState([]);
    const [details, setDetails] = useState([]);
    const [area, setArea] = useState([]);
    const [cost, setCost] = useState([]);
    const [subcat, setSubcat] = useState([]);
    const [photo, setPhoto] = useState(null);
    const [file, setFile] = useState(null);

    // ajax const
    const [category, setCategory] = useState([]);
    const [asubcat, setAsubcat] = useState([]);

    const fetchCategory = () => {
        axios.get("http://localhost:4000/Category").then((response) => {
            var data = response.data.Category;
            setCategory(data);
        });
    };

    const ajaxSubcat = (did) => {
        axios.get(`http://localhost:4000/SubCategory_Condition/${did}`)
            .then((response) => {
                var data = response.data.SubCategory;
                setAsubcat(data);
                console.log(data);
            });
    };

    useEffect(() => {
        fetchCategory();
    }, []);



    const inputData = (e) => {
        const config = {
            headers: { "content-type": "multipart/form-data" },
        };
        let formData = new FormData();
        formData.append("project_details", details);
        formData.append("project_title", title);
        formData.append("project_area", area);
        formData.append("project_cost", cost);
        formData.append("architect_id", aid);
        formData.append("subcategory_id", subcat);
        formData.append("project_photo", photo);
        formData.append("project_file", file);
        console.log(file);
        axios.post("http://localhost:4000/Plan", formData, config)
            .then((response) => {
                alert(response.data.message);
                navigate('/architect/myprojects')
            });
    }

    return (
        <Grid container spacing={1} className='section pb_20 pt_20'>
            {/* Title */}
            <Grid item className='section_title archbar'>
                <h6 className='section_title_text'>Add New Plan</h6>
            </Grid>

            {/* Projects */}
            <Grid item xs={12} className="newproject_grid">
                <Grid item xs={8}>
                    <TextField id="standard-basic" label="Plan Title" fullWidth color='warning' variant="standard" onChange={(e) => setTitle(e.target.value)} />
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained" component="label">
                        {photo ? "photo selected" : "Upload Photo"} <PhotoCamera sx={{ marginLeft: '5px' }} />
                        <input hidden accept="image/*"
                            onChange={(e) => setPhoto(e.target.files[0])}
                            multiple type="file" />
                    </Button>
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained" component="label" >
                        {file ? "File Selected" : "Upload Plan"} <BackupTableIcon sx={{ marginLeft: '5px' }} />
                        <input hidden accept="*"
                            onChange={(e) => setFile(e.target.files[0])}
                            multiple type="file" />
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="standard-multiline-static"
                    label="Plan Details"
                    multiline
                    rows={4}
                    variant="standard"
                    fullWidth
                    color='warning'
                    onChange={(e) => setDetails(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} className="newproject_grid">
                <Grid item xs={6}>
                    <TextField id="standard-basic"
                        onChange={(e) => setArea(e.target.value)}
                        label="Plan Area" fullWidth color='warning' variant="standard" />
                </Grid>
                <Grid item xs={6}>
                    <TextField id="standard-basic"
                        onChange={(e) => setCost(e.target.value)}
                        label="Estimated Cost" fullWidth color='warning' variant="standard" />
                </Grid>
            </Grid>
            <Grid item xs={12} className="newproject_grid">
                <Grid item xs={6}>
                    <FormControl fullWidth sx={{ gridColumn: "span 4" }}>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            defaultValue=""
                            fullWidth
                            varient="filled"
                            onChange={(e) => {
                                ajaxSubcat(e.target.value);
                            }}
                            label="Category"
                            x={{ gridColumn: "span 4" }}
                        >
                            <MenuItem disabled value="">
                                <em>Select Category</em>
                            </MenuItem>
                            {category.map((d, key) => (
                                <MenuItem key={key} value={d.category_id}>
                                    {d.category_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth sx={{ gridColumn: "span 4" }}>
                        <InputLabel id="demo-simple-select-label">Sub Category</InputLabel>
                        <Select
                            defaultValue=""
                            fullWidth
                            varient="filled"
                            onChange={(d) => setSubcat(d.target.value)}
                            label="Sub Category"
                            x={{ gridColumn: "span 4" }}
                        >
                            <MenuItem disabled value="">
                                <em>Select Sub Category</em>
                            </MenuItem>
                            {asubcat.map((p, key) => {
                                return (
                                    <MenuItem key={key} value={p.subcategory_id}>
                                        {p.subcategory_name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid item xs={12} className='.newproject_button'>
                <Button variant="contained" onClick={inputData} >Add Plan</Button>
            </Grid>
        </Grid>
    )

}

export default NewProject