import React, { useState, useEffect } from "react";
import sbStyles from "../styles/SearchBar.module.css";

interface SearchBarProps {
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder }) => {
  const [text, setText] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setText(event.target.value);
  const onFocus = () => setFocused(true);

  useEffect(() => {
    if (!focused) {
      setText("");
      return;
    }


  }, [focused]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      setFocused(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <div className={sbStyles.container}>
      <input 
        className={sbStyles.input}
        onChange={onChange}
        onFocus={onFocus}
        value={text}
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;