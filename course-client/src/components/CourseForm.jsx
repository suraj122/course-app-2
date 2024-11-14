const CourseForm = ({
  formData,
  handleChange,
  handleSubmit,
  published,
  setPublished,
  message,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
      />
      <br />
      <textarea
        type="text"
        placeholder="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      <br />
      <input
        type="number"
        placeholder="Price"
        name="price"
        value={formData.price}
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        name="imageLink"
        placeholder="image link"
        value={formData.imageLink}
        onChange={handleChange}
      />
      <br />
      <label>
        <input
          type="checkbox"
          name="published"
          onChange={(e) => setPublished(e.target.checked)}
          checked={published}
        />{" "}
        Publish
      </label>
      <br />
      <button>Submit</button>
      <br />
      {message && (message || "someting went wrong")}
    </form>
  );
};

export default CourseForm;
