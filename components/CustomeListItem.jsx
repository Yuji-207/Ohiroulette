import React from "react";

import ListItemIcon from "@mui/material/ListItemIcon";
import ListItem from "@mui/material/ListItem";
import Checkbox from '@mui/material/Checkbox';
import ListItemText from "@mui/material/ListItemText";


const CustomeListItem = (props) => {
    

  const {
    value,
    checked,
    setChecked,
  } = props;

  const labelId = `transfer-list-item-${value}-label`;


  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };


  return (
    <ListItem
      key={value}
      role="listitem"
      button
      onClick={handleToggle(value)}
    >
      <ListItemIcon>
        <Checkbox
          checked={checked.indexOf(value) !== -1}
          tabIndex={-1}
          disableRipple
          inputProps={{
            'aria-labelledby': labelId,
          }}
        />
      </ListItemIcon>
      <ListItemText id={labelId} primary={value} />
    </ListItem>
  );
}


export default CustomeListItem;
