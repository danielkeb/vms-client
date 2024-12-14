import React, { useCallback, useEffect, useState } from 'react';
import { Snackbar, Alert, Button, Box } from '@mui/material';
import {api} from '../../api/Apis';
import Navbar from '../layout/Navbar';
import VehicleTable from './VehicleTable';
import VehicleDialog from './VehicleDialog';

const VehicleDashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [openToast, setOpenToast] = useState(false);

  const showToast = useCallback((message, type) => {
    setToastMessage(message);
    setToastType(type);
    setOpenToast(true);
  }, []);

  const fetchVehicles = useCallback(async () => {
    try {
      const response = await api.get('/vehicle');
      setVehicles(response.data);
    } catch (error) {
      showToast('Failed to fetch vehicles', 'error');
    }
  }, [showToast, setVehicles]); 

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const handleUpdate = (vehicle) => {
    setCurrentVehicle(vehicle);
    setOpenUpdateDialog(true);
  };

  const handleChangeStatus = (vehicle) => {
    setCurrentVehicle(vehicle);
    setOpenStatusDialog(true);
  };

  const handleDelete = (vehicle) => {
    setCurrentVehicle(vehicle);
    showToast('Vehicle deleted successfully', 'error');
  };

  const handleUpdateSubmit = async (updatedVehicle) => {
    try {
      await api.put(`/vehicle/${currentVehicle._id}`, updatedVehicle);
      fetchVehicles();
      setOpenUpdateDialog(false);
      showToast('Vehicle updated successfully', 'success');
    } catch (error) {
      showToast('Failed to update vehicle', 'error');
    }
  };

  const handleStatusSubmit = async () => {
    try {
      const status = currentVehicle.status === 'SOLD' ? 'NEW' : 'SOLD';
      await api.patch(`/vehicle/${currentVehicle._id}/status`, { status });
      fetchVehicles();
      setOpenStatusDialog(false);
      showToast('Status updated successfully', 'success');
    } catch (error) {
      showToast('Failed to update status', 'error');
    }
  };

  const handleAddSubmit = async (newVehicle) => {
    try {
      await api.post('/vehicle', newVehicle);
      fetchVehicles();
      setOpenAddDialog(false);
      showToast('Vehicle added successfully', 'success');
    } catch (error) {
      showToast('Failed to add vehicle', 'error');
    }
  };

  return (
    <Box sx={{mb: 10}}>
      <Navbar />
      <Box display="flex" justifyContent="space-between" alignItems="center"  sx={{
          mt: 10,
          mb: 0.5,
          width: {
            xs: '100%', 
            sm: '80%',   
            md: '70%',    
            lg: '60%',
          },
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>

        <h2>Vehicles list</h2>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setCurrentVehicle(null);
            setOpenAddDialog(true);
          }}
        >
          Add New Vehicle
        </Button>
      </Box>
      <VehicleTable
        vehicles={vehicles}
        onEdit={handleUpdate}
        onChangeStatus={handleChangeStatus}
        onDelete={handleDelete}
      />
      <VehicleDialog
        open={openUpdateDialog}
        onClose={() => setOpenUpdateDialog(false)}
        onSubmit={handleUpdateSubmit}
        vehicle={currentVehicle}
        type="update"
      />
      <VehicleDialog
        open={openStatusDialog}
        onClose={() => setOpenStatusDialog(false)}
        onSubmit={handleStatusSubmit}
        vehicle={currentVehicle}
        type="status"
      />
      <VehicleDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onSubmit={handleAddSubmit}
        vehicle={{ name: '', brand: '', model: '', price: '', status: 'NEW' }}
        type="add"
      />
      
      {/* Toast Notification */}
      <Snackbar
        open={openToast}
        autoHideDuration={6000}
        onClose={() => setOpenToast(false)}
      >
        <Alert onClose={() => setOpenToast(false)} severity={toastType}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default VehicleDashboard;
