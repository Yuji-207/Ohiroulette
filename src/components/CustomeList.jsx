import React from "react";

import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import CustomeListItem from "./CustomeListItem";


const CustomeList = (props) => {

  const {
    title,
    items,
    checked,
    setChecked,
  } = props;

  return (
    <Tooltip title="下にスクロールできます" placement="bottom" arrow>
      <Paper>
        <Typography variant="h5" component="h3" sx={{margin: '1rem'}}>
          {title}
        </Typography>
        <List dense sx={{width: '10rem', height: '15rem', overflow: 'auto', margin: '1rem'}}>
          {items.map(value => (
            <CustomeListItem value={value} checked={checked} setChecked={setChecked} />
          ))}
        </List>
      </Paper>
    </Tooltip>
  );

}


export default CustomeList;
