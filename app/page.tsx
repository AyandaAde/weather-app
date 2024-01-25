import { generateImage } from "@/lib/openai";
import Provider from "@/components/Provider";
import axios from "axios";
import App from "@/components/App";

export default async function Home() {

  const image_url = await generateImage();

  // const url = `https://api.openweathermap.org/data/2.5/weather?lat=-17.8235625&lon=31.1012005&appid=${process.env.OPENWEATHERMAP_API_KEY}`;

  // const weather = axios.get(url).then((response) => {
  //   console.log(response.data);
  //   return response.data;
  // });

  
  // const customTooltip = async ({ payload, active }: any) => {
  //   "use server"
  //   if (!active || !payload) return null;
  //   return (
  //     <div className="w-56 rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border">
  //       {payload.map((category: any, idx: any) => (
  //         <div key={idx} className="flex flex-1 space-x-2.5">
  //           <div className={`w-1 flex flex-col bg-${category.color}-500 rounded`} />
  //           <div className="space-y-1">
  //             <p className="text-tremor-content">{category.dataKey}</p>
  //             <p className="font-medium text-tremor-content-emphasis">{category.value} degees</p>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };

  return (
    <Provider>
      <App imageURL={image_url} />
    </Provider>
  );
};
