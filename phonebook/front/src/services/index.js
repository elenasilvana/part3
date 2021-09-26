import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (personInfo) => {
  const request = axios.post(baseUrl, personInfo);
  return request.then((response) => response.data);
};

const update = (id, updatedInfo) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedInfo);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response);
};

export default { getAll, create, update, remove };
