import { CropData } from "../utils/Types";
import data from "../jsonFile/Manufac_India_Agro_Dataset.json";
import { Table } from "@mantine/core";
import "./MinMaxCrop.css";

export default function MinMaxCrop() {
  const cropData = data as CropData[];

  // making a map of year by year data of max and min crops
  const yearlyDataMap: {
    [year: number]: {
      max: CropData;
      min: CropData;
    };
  } = {};

  cropData.forEach((item) => {
    const year = parseInt(item.Year.split(",")[1].trim());
    const production = Number(item["Crop Production (UOM:t(Tonnes))"]) || 0;

    // assign initial values and then check if the current production value is greater or less than the already assigned value and then storing it accordingly
    if (!yearlyDataMap[year]) {
      yearlyDataMap[year] = {
        max: item,
        min: item,
      };
    } else {
      if (
        production >
        Number(yearlyDataMap[year].max!["Crop Production (UOM:t(Tonnes))"])
      ) {
        yearlyDataMap[year].max = item;
      }
      if (
        production <
        Number(yearlyDataMap[year].min!["Crop Production (UOM:t(Tonnes))"])
      ) {
        yearlyDataMap[year].min = item;
      }
    }
  });

  // extracting all of the required values in an array
  const dataArray = Object.entries(yearlyDataMap).map(
    ([year, { max, min }]) => ({
      year: parseInt(year),
      maxCrop: max ? max["Crop Name"] : 0,
      minCrop: min ? min["Crop Name"] : 0,
    })
  );

  // storing all of the rows in rows constant to be used in rendering
  const rows = dataArray.map((element) => (
    <Table.Tr key={element.year}>
      <Table.Td>{element.year}</Table.Td>
      <Table.Td>{element.maxCrop}</Table.Td>
      <Table.Td>{element.minCrop}</Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="min-max-container">
      {/* using Mantine table tags for showing data */}
      <Table withColumnBorders withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Year</Table.Th>
            <Table.Th>Crop with Maximum Production in that Year</Table.Th>
            <Table.Th>Crop with Minnimum Production in that Year</Table.Th>
          </Table.Tr>
        </Table.Thead>

        {/* body renders all of the values, as shown in docs */}
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
}
