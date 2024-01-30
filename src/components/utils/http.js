export const fetchData = async (endpoint, options) => {
  const response = await fetch(`http://127.0.0.1:8000/${endpoint}`, options);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("failed to fetch");
  }

  return resData;
};
