import React, { useEffect, useState } from 'react';
import './ChatList.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Avatar, CardActionArea, Grid, Grow } from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

const ChatList = () => {

    const [chatlist, setChatlist] = useState([]);

    const fetchChatList = () => {
        axios.get("http://localhost:4000/chatlist/" + sessionStorage.getItem("uid"))
            .then((response) => {
                var data = response.data.List;
                setChatlist(data);
                console.log(response.data);

            })
    }

    useEffect(() => {
        fetchChatList();
    }, []);

    return (
        <Box>
            <h4>Messages</h4>
            {chatlist.map((cl, key) => (
                <>
                    <Card className='chatlist_card'>

                        <NavLink className='chatlist_link' to={cl.builder_id !== null ? `/user/chatbox/${cl.builder_id}` : `/user/chatboxarch/${cl.architect_id
                            }`}>

                            <CardActionArea>
                                <CardContent className='chatlist_content'>
                                    {/* <Box>
                                        <Avatar alt={cl.from_user} sx={{ width: 56, height: 56 }} src={cl.user_photo} />
                                    </Box> */}
                                    <Box>
                                        <Box className="chatlist_name">


                                            {cl.from_architect !== "" && (<Typography className='chatlist_msgname'>{cl.from_architect}</Typography>)}
                                            {cl.from_builder !== "" && (<Typography className='chatlist_msgname'>{cl.from_builder}</Typography>)}
                                            {cl.to_builder !== "" && (<Typography className='chatlist_msgname'>{cl.to_builder}</Typography>)}
                                            {cl.to_architect !== "" && (<Typography className='chatlist_msgname'>{cl.to_architect}</Typography>)}

                                        </Box>
                                        {/* <Box>

                                            {
                                                cl.chat_content == "" && (
                                                    <Typography className='chatlist_msg'><ImageOutlinedIcon sx={{ fontSize: "20px" }} />Image</Typography>
                                                )
                                            }
                                            {
                                                cl.chat_content !== "" && (
                                                    <Typography className='chatlist_msg'>{cl.chat_content}</Typography>
                                                )
                                            }
                                        </Box> */}
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                        </NavLink>
                    </Card>
                </>
            ))
            }
        </Box >
    )

}

export default ChatList