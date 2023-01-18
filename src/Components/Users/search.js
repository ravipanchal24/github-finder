import React, { useState } from "react";
import { PropTypes } from "prop-types";
const Search = (props) => {
  const [text, setText] = useState('');

  const onChange = (e) => setText(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "")
      props.showAlert("Please enter something to search..", "light");
    else {
      props.searchUsers(text);
      // setText('');
    }
  };

  const clearInput = () => {
    setText("");
  };

  return ( 
    <div>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          name="text"
          placeholder="Search Users..."
          value={text}
          onChange={onChange}
        />
        <input
          type="submit"
          value="search"
          className="btn btn-dark btn-block"
        />
      </form>
      {props.showClear && (
        <button
          onClick={() => {
            props.clearUsers();
            clearInput();
          }}
          className="btn btn-light btn-block"
        >
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  showAlert: PropTypes.func.isRequired,
};

export default Search;