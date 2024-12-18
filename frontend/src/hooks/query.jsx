import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { path } from "../../lib/path";

const query = (keys, uri) => {
  return useQuery({
    queryKey: [keys],
    queryFn: () => {
      axios
        .get(`${path}${uri}`)
        .then((data) => data)
        .catch((err) => err);
    },
  });
};

export default query;
