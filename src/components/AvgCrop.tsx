import { CropData } from "../utils/Types";
import data from "../jsonFile/Manufac_India_Agro_Dataset.json";
import { Table } from "@mantine/core";

export default function AvgCrop() {
  const cropData = data as CropData[];

  // making a map of crop by crop data
  const cropMap: {
    [cropName: string]: {
      totalYield: number;
      totalArea: number;
      count: number;
    };
  } = {};

  cropData.forEach((item) => {
    const cropName = item["Crop Name"];
    const yieldValue = Number(
      item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]
    );
    const areaValue = Number(item["Area Under Cultivation (UOM:Ha(Hectares))"]);

    // assign initial values as 0 and then keep on adding the yield and areas and increasing count by 1 everytime
    if (!cropMap[cropName]) {
      cropMap[cropName] = { totalYield: 0, totalArea: 0, count: 0 };
    }
    cropMap[cropName].totalYield += yieldValue;
    cropMap[cropName].totalArea += areaValue;
    cropMap[cropName].count += 1;
  });

  // assign all values to dataArray and also perform average operation on those
  const dataArray = Object.entries(cropMap).map(
    ([cropName, { totalYield, totalArea, count }]) => ({
      cropName,
      averageYield: totalYield / count,
      averageArea: totalArea / count,
    })
  );

  // storing all of the rows in rows constant to be used in rendering
  const rows = dataArray.map((element) => (
    <Table.Tr key={element.cropName}>
      <Table.Td>{element.cropName}</Table.Td>
      <Table.Td>{element.averageYield.toFixed(3)}</Table.Td>
      <Table.Td>{element.averageArea.toFixed(3)}</Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="min-max-container">
      {/* using Mantine table tags for showing data */}
      <Table withColumnBorders withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Crop</Table.Th>
            <Table.Th>Aveage Yield of Crop between 1950-2020</Table.Th>
            <Table.Th>
              Average Cultivation Area of the Crop between 1950-2020
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        {/* body renders all of the values, as shown in docs */}
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
}
