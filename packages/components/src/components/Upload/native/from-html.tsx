const FromHtml: React.FC = () => {
  return (
    <div className="App" style={{ marginTop: "100px", marginLeft: "100px" }}>
      <form
        method="post"
        encType="multipart/form-data"
        action="https://jsonplaceholder.typicode.com/posts"
      >
        <input type="file" name="myFile" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FromHtml;
