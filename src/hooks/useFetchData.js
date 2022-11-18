import React from "react";
import axios from "axios";

const useFetchData = (filter = "") => {
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const url = "https://data.cityofnewyork.us/resource/j34j-vqvt.json";

  let config = {
      'X-App-Token': 'UfrJmFok6nfzjOwYxyY5X7Qec'
  }

  React.useEffect(() => {
      if(filter != null){
        fetchData();
      }
    
  }, [filter]);

  async function fetchData() {
    setLoading(true);
    setError(false);
    await axios
      .get(url+filter, config)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => setError(error.message))
      .finally(setLoading(false));
  }

  return {
    data,
    loading,
    error,
    fetchData,
  };
};

export default useFetchData;
