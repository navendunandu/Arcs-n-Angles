import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { mockTransactions} from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadDoneOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import LineChart from "../../components/LineChart";
import ProgressCircle from "../../components/ProgressCircle";
import StatBox from "../../components/StatBox";
import { color } from "@mui/system";
import EngineeringIcon from '@mui/icons-material/Engineering';
import FoundationIcon from '@mui/icons-material/Foundation';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Dashboard = () => {
    const theme = useTheme();
    const colors=tokens(theme.palette.mode);

    return ( 
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="Dashboard" subtitle="Welcome to your Dashboard" />
        </Box>

        {/* GRID & CHART */}
        <Box 
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        >
            {/* ROW 1 */}
            <Box gridColumn="span 3" 
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            >
                <StatBox
                title="12,361"
                subtitle="Users"
                
                icon={
                    <PersonAddAlt1Icon sx={{color:colors.greenAccent[600], fontSize: "26px"}} />
                }
                />
            </Box>
            <Box gridColumn="span 3" 
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            >
                <StatBox
                title="431,225"
                subtitle="Architects"
              
                icon={
                    <EngineeringIcon sx={{color:colors.greenAccent[600], fontSize: "26px"}} />
                }
                />
            </Box>
            <Box gridColumn="span 3" 
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            >
                <StatBox
                title="32,441"
                subtitle="Builders"
                
                icon={
                    <FoundationIcon sx={{color:colors.greenAccent[600], fontSize: "26px"}} />
                }
                />
            </Box>
            <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,325,134"
            subtitle="Plan Purchases"
            
            icon={
              <ShoppingCartIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          </Box>
          {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>
          
        </Box>


    </Box>
    );
};

export default Dashboard;