import React, { useEffect, useState } from 'react'
import './NewProject.css'
import { Button, FormControl, Grid, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Label, PhotoCamera } from '@mui/icons-material'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const NewProject = () => {

    const navigate = useNavigate();
    const [seldist, setSeldist] = useState([]);
    const [selplace, setSelplace] = useState([]);
    const [category, setCategory] = useState([]);
    const [subcategory, setSubCategory] = useState([]);
    // form consts
    const [formtitle, setFormtitle] = useState([]);
    const [formdetails, setFormdetails] = useState([]);
    const [formsubcat, setFormsubcat] = useState([]);
    const [formarea, setFormarea] = useState([]);
    const [formcost, setFormcost] = useState([]);
    const [formplace, setFormplace] = useState([]);
    const [formphoto, setFormphoto] = useState([]);
    const bid = sessionStorage.getItem('bid');

    const fetchDistrict = () => {
        axios.get("http://localhost:4000/District").then((response) => {
            var data = response.data.district;
            setSeldist(data);
        });
    };

    const ajaxPlace = (did) => {
        axios
            .get(`http://localhost:4000/Place_Condition/${did}`)
            .then((response) => {
                var data = response.data.Place;
                setSelplace(data);
            });
    };

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
                setSubCategory(data);
                console.log(data);
            });
    };

    useEffect(() => {
        fetchDistrict();
        fetchCategory();
    }, []);

    let formData = new FormData();

    const inputData = (e) => {
        const config = {
            headers: { "content-type": "multipart/form-data" },
        };
        formData.append("project_details", formdetails);
        formData.append("project_title", formtitle);
        formData.append("project_area", formarea);
        formData.append("place_id", formplace);
        formData.append("project_cost", formcost);
        formData.append("builder_id", bid);
        formData.append("subcategory_id", formsubcat);
        formData.append("project_photo", formphoto);
        console.log(formphoto);
        axios.post("http://localhost:4000/Project", formData, config)
            .then((response) => {
                alert(response.data.message);
            });
    }

    return (
        <Grid container spacing={1} className='section pb_20 pt_20'>
            {/* Title */}
            <Grid item className='section_title archbar'>
                <h6 className='section_title_text'>Add New Project</h6>
            </Grid>

            {/* Projects */}
            <Grid item xs={12} className="newproject_grid">
                <Grid item xs={8}>
                    <TextField id="standard-basic" label="Project Title" fullWidth color='warning' variant="standard" onChange={(e) => setFormtitle(e.target.value)} />
                </Grid>
                <Grid item xs={4}>
                    <Button variant="contained" component="label">
                        Upload Project Photo  <PhotoCamera />
                        <input hidden type="file" name='project_pic' onChange={(e) => setFormphoto(e.target.files[0])} />
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="standard-multiline-static"
                    label="Project Details"
                    multiline
                    rows={4}
                    variant="standard"
                    fullWidth
                    color='warning'
                    onChange={(e) => setFormdetails(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} className="newproject_grid">
                <Grid item xs={6}>
                    <TextField id="standard-basic" label="Project Area" fullWidth color='warning' variant="standard" onChange={(e) => setFormarea(e.target.value)} />
                </Grid>
                <Grid item xs={6}>
                    <TextField id="standard-basic" label="Project Cost" fullWidth color='warning' variant="standard" onChange={(e) => setFormcost(e.target.value)} />
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
                            onChange={(d) => setFormsubcat(d.target.value)}
                            label="Sub Category"
                            x={{ gridColumn: "span 4" }}
                        >
                            <MenuItem disabled value="">
                                <em>Select Sub Category</em>
                            </MenuItem>
                            {subcategory.map((p, key) => {
                                return (
                                    <MenuItem key={key} value={p.subcategory_id}>
                                        {p.subcategory_name}
                                    </MenuItem>
                                );
                            })}
                            {/* {districts.map((d, key) => (
                                <MenuItem key={key} value={d.district_id}>
                                    {d.district_name}
                                </MenuItem>
                            ))} */}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid item xs={12} className="newproject_grid">
                <Grid item xs={6}>
                    <FormControl fullWidth sx={{ gridColumn: "span 4" }}>
                        <InputLabel id="demo-simple-select-label">District</InputLabel>
                        <Select
                            defaultValue=""
                            fullWidth
                            varient="filled"
                            onChange={(e) => {
                                ajaxPlace(e.target.value);
                            }}
                            label="District"
                            x={{ gridColumn: "span 4" }}
                        >
                            <MenuItem disabled value="">
                                <em>Select District</em>
                            </MenuItem>
                            {seldist.map((d, key) => (
                                <MenuItem key={key} value={d.district_id}>
                                    {d.district_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth sx={{ gridColumn: "span 4" }}>
                        <InputLabel id="demo-simple-select-label">Place</InputLabel>
                        <Select
                            defaultValue=""
                            fullWidth
                            varient="filled"
                            onChange={(d) => setFormplace(d.target.value)}
                            label="Place"
                            x={{ gridColumn: "span 4" }}
                        >
                            <MenuItem disabled value="">
                                <em>Select Place</em>
                            </MenuItem>
                            {selplace.map((p, key) => {
                                return (
                                    <MenuItem key={key} value={p.place_id}>
                                        {p.place_name}
                                    </MenuItem>
                                );
                            })}
                            {/* {districts.map((d, key) => (
                                <MenuItem key={key} value={d.district_id}>
                                    {d.district_name}
                                </MenuItem>
                            ))} */}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid item xs={12} className='.newproject_button'>
                <Button variant="contained" onClick={inputData} >Add Project</Button>
            </Grid>
        </Grid>
    )

}

export default NewProject