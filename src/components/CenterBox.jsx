import * as React from "react";
import Box from "@mui/material/Box";
import DataForm from "./DataForm";
import useFetchData from "../hooks/useFetchData";
import { isEmpty } from "lodash";
import Graph from "./Graph";
import outputFilterString from "../utilities/apiUtilities";

export default function CenterBox() {
  const [filter, setFilter] = React.useState(null);
  const [previousFilter, setPreviousFilter] = React.useState(null);
  const {
    data: graphData,
    loading: graphLoading,
    error: graphError,
    fetchData: graphFetch,
  } = useFetchData(previousFilter);

  React.useEffect(() => {
    if (filter !== null) {
      let filterString = outputFilterString(
        filter.borough,
        filter.incident,
        filter.year
      );
      if (filterString !== previousFilter) {
        setPreviousFilter(filterString);
        graphFetch();
      }
    }
  }, [filter]);


  return (
    <>
      <Box
        sx={{
          width: "90vw",
          height: "90vh",
          borderRadius: "40px",
          backgroundColor: "white",
          marginTop: "2%",
          boxShadow: "3px 2px 2px darkgrey",
        }}
      >
        <DataForm setFilter={setFilter} />
        <Graph filter={filter} graphData={graphData} />
      </Box>
    </>
  );
}
