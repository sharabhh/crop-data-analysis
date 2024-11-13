// seperate typescript interfaces file for code segregation
export interface CropData {
  Country: string;
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))": number | "";
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": number | "";
  "Area Under Cultivation (UOM:Ha(Hectares))": number | "";
}
