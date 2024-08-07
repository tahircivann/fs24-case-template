import React from "react";
import SidebarProps from "./Sidbar.types"
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";



const Sidebar: React.FC<SidebarProps> = ({ selectedHouseObject, housePosition, houseRotation, foundModels }) => {
  return (
    <Card sx={{ padding: "10px", color: "white", backgroundColor: "#202940", height: "100%", overflow: "auto" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Selected House Details
        </Typography>
        {selectedHouseObject ? (
          <>
            <List>
              <ListItem>
                <ListItemText primary="UUID" secondary={selectedHouseObject.uuid} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Name" secondary={selectedHouseObject.name} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Position"
                  secondary={`(${housePosition.x.toFixed(2)}, ${housePosition.y.toFixed(2)}, ${housePosition.z.toFixed(2)})`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Rotation"
                  secondary={`(${houseRotation.x.toFixed(2)}, ${houseRotation.y.toFixed(2)}, ${houseRotation.z.toFixed(2)})`}
                />
              </ListItem>
            </List>
          </>
        ) : (
          <Typography variant="body2">No house selected.</Typography>
        )}
        <Divider sx={{ margin: "20px 0" }} />
        <Typography variant="h6" gutterBottom>
          Found Models
        </Typography>
        <List sx={{ maxHeight: 300, overflowY: 'auto' }}> {/* Set max height to 300px and make it scrollable */}
          {foundModels.length > 0 ? (
            foundModels.map((model, index) => (
              <div key={model.uuid}>
                <ListItem>
                  <ListItemText primary={`${model.name} ${index}`} />
                </ListItem>
                <List disablePadding>
                  <ListItem>
                    <ListItemText primary="UUID" secondary={model.uuid} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Name" secondary={model.name} />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Position"
                      secondary={`(${model.position.x.toFixed(2)}, ${model.position.y.toFixed(2)}, ${model.position.z.toFixed(2)})`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Rotation"
                      secondary={`(${model.rotation.x.toFixed(2)}, ${model.rotation.y.toFixed(2)}, ${model.rotation.z.toFixed(2)})`}
                    />
                  </ListItem>
                </List>
                {index < foundModels.length - 1 && <Divider />}
              </div>
            ))
          ) : (
            <Typography variant="body2">No models found.</Typography>
          )}
        </List>
      </CardContent>
    </Card>
  );
};

export default Sidebar;