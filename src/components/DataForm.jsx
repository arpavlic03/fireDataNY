import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import dayjs, { Dayjs } from "dayjs";
import Box from '@mui/material/Box';
import { boroughs, incidents } from "../const/consts";

export default function DataForm({setFilter}) {
  const [selectedBorough, setSelectedBorough] = React.useState(boroughs[0]);
  const [selectedIncident, setSelectedIncident] = React.useState(incidents[0]);
  const [selectedYear, setSelectedYear] = React.useState(dayjs("2017"));
  const [validated, setValidated] = React.useState(false); 
  const minDate = dayjs("2009-01-01T00:00:00.000");
  const maxDate = dayjs("2017-01-01T00:00:00.000");

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if(form.checkValidity === false){
        setValidated(false);
    }
    setValidated(true);
    setFilter({borough: selectedBorough, incident: selectedIncident, year: selectedYear});
  };

  return (
    <div className="content-flex-end justify-flex-end d-flex m-1">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box component="form" onSubmit={handleSubmit} validated={validated}>
          <FormControl sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Borough
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={selectedBorough}
              onChange={(e) => setSelectedBorough(e.target.value)}
              label="Age"
            >
              {boroughs.map((borough) => (
                <MenuItem key={borough} value={borough}>
                  {borough}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Incident Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={selectedIncident}
              onChange={(e) => setSelectedIncident(e.target.value)}
              label="Age"
            >
              {incidents.map((incident) => (
                <MenuItem key={incident} value={incident}>
                  {incident}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" sx={{ m: 1, minWidth: 300 }}>
            <DatePicker
              label="Year In Review"
              value={selectedYear}
              views={["year"]}
              minDate={minDate}
              maxDate={maxDate}
              onChange={(newValue) => {
                setSelectedYear(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </FormControl>
          <Button
            className="button-submit mt-3"
            type="submit"
            size="large"
            variant="contained"
            sx={{
                backgroundColor: '#F68A5C',
                  '&:hover': {
                    backgroundColor: 'pink',
                    color: 'black'
                  },
              } }
          >
            Submit
          </Button>
        </Box>
      </LocalizationProvider>
    </div>
  );
}
