import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Edit, ChangeCircleTwoTone } from '@mui/icons-material';

const VehicleTable = ({ vehicles, onEdit, onChangeStatus }) => {
    return (
        <TableContainer   component={Paper}
        sx={{
          mt: 4,
          width: {
            xs: '100%', 
            sm: '80%',   
            md: '70%',    
            lg: '60%',
          },
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: 'rgba(25, 118, 210, 0.12)' }}>
                        <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Brand</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>model</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Change Status</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {vehicles.map((vehicle) => (
                        <TableRow key={vehicle._id}>
                            <TableCell>{vehicle.name}</TableCell>
                            <TableCell>{vehicle.brand}</TableCell>
                            <TableCell>{vehicle.model}</TableCell>
                            <TableCell>{vehicle.price}</TableCell>
                            <TableCell>
                                <IconButton
                                    onClick={() => onChangeStatus(vehicle)}
                                    color="secondary"
                                    size="small"
                                >
                                    <ChangeCircleTwoTone />
                                </IconButton>{' '}
                                {vehicle.status}
                            </TableCell>
                            <TableCell>
                                <IconButton onClick={() => onEdit(vehicle)} color="primary" size="small">
                                    <Edit />
                                </IconButton>
                                {/* <IconButton onClick={() => onDelete(vehicle)} color="error" size="small">
                                    <Delete />
                                </IconButton> */}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default VehicleTable;
