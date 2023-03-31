// @ts-ignore
export default function getTooltip({object}) {
  return (
    object && {
      html: `\
        <Flex>
          <Box>Energy Star Score: </Box>
          <Box>${object.properties["eescore"]}</Box>
        </Flex>
      `
    }
  );
}