import React, { useState, useEffect } from "react";
import { Box, Input, Flex, List, ListItem } from "@chakra-ui/react";
import Pair from "../utils/Pair";
import isNumeric from "../utils/isNumeric";
import TBuildingName from "../types/TBuildingName";

interface SearchBarProps {
  placeholder: string;
  names: TBuildingName[];
  fselected: Function;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, names }) => {
  const [text, setText] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<TBuildingName[]>([]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setText(event.target.value);
  const onFocus = () => setFocused(true);

  useEffect(() => {
    const newFilter = names.filter((value: TBuildingName) => {
      const curr = value.first.toLowerCase();
      return curr.includes(text.toLowerCase());
    });

    if (text === "") setFilteredData([]);
    else setFilteredData(newFilter);
  }, [text]);

  useEffect(() => {
    if (!focused) {
      setText("");
      setFilteredData(names);
      return;
    }

  }, [focused]);

  // Enter key event handler
  useEffect(() => {

  }, []);

  // Unfocus when click elsewhere
  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      setFocused(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <Box userSelect="none">
      <Flex direction="row">
        <Input
          backgroundColor="white"
          onChange={onChange}
          onFocus={onFocus}
          value={text}
          type="text"
          placeholder={placeholder}
        />
      </Flex>
      <Box>
        { text.length !== 0 && focused &&
          <>
            { filteredData.length !== 0 ?
              <List>
                { filteredData.slice(0, Math.min(filteredData.length, 1000)).map((value: TBuildingName, key: number) => {
                  // format the name of the building
                  let v = value.first.toLowerCase().split(" ");
                  let str: string = "";
                  for (let i = 0; i < v.length; i++) {
                    let curr = v[i];
                    if (!isNumeric(curr)) {
                      curr = curr.charAt(0).toUpperCase() + curr.substring(1);
                    } else if (curr.charAt(0) == "-") {
                      curr = curr.charAt(0) + " " + curr.substring(1);
                    } else if (i > 0) {
                      if (curr.charAt(curr.length - 1) == "2") curr += "nd";
                      else curr += "th"
                    }
                    str += curr;
                    if (i < v.length - 1) str += " ";
                  }

                  return <ListItem key={key}>{str}</ListItem>;
                })}
              </List>
              :
              <List>
                <ListItem>Not Found</ListItem>
              </List>
            }
          </>
        }
      </Box>
    </Box>
  );
};

export default SearchBar;