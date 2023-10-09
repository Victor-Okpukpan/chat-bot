// import useSWR from "swr";
// import Select from "react-select";

// // const fetchModels = () => fetch("/api/getEngines").then((res) => res.json());

// export default function ModelSelection() {
//   const { data: models, isLoading } = useSWR("models", fetchModels);
//   const { data: model, mutate: setModel } = useSWR("model", {
//     fallbackData: "text-davinci-003"
//   })
//   return (
//     <div className="my-2">
//       <Select
//         isSearchable
//         menuPosition="fixed"
//         options={models?.modelOptions}
//         isLoading={isLoading}
//         defaultValue={model}
//         placeholder={model}
//         className="mt-2"
//         classNames={{
//           control: (state) => "bg-[#434654] border-[#434654]",
//         }}
//         onChange={(e) => setModel(e.value)}
//       />
//     </div>
//   );
// }



export default function ModelSelection() {
  return (
    <div>ModelSelection</div>
  )
}
