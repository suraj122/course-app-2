const handleFormSubmission = async (
  url,
  method,
  formData,
  published,
  setMessage
) => {
  const data = await fetch(url, {
    method: method,
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      title: formData.title,
      description: formData.description,
      price: formData.price,
      imageLink: formData.imageLink,
      published,
    }),
  });
  const json = await data.json();
  setMessage(json.message);
};

export default handleFormSubmission;
