// interface FormProps {
//   action: (formData: FormData) => any;
//   fields: {
//     label: string;
//     [name: string]: any;
//   }[];
//   buttonTitle: string;
// }

// export default function Form(props: FormProps) {
//   const { action, fields, buttonTitle } = props;
//   return (
//     <form action={action} className="mb-10">
//       {fields.map((field, index: number) => (
//         <div className="space-y-3 flex flex-col mb-5" key={index}>
//           <label className="text-black" htmlFor={field.name}>
//             {field.label}
//           </label>
//           <input
//             {...field}
//             placeholder={field.label}
//             className="bg-slate-200 p-3 rounded-lg w-full"
//           />
//         </div>
//       ))}
//       <button
//         type="submit"
//         className="bg-blue-600 text-white p-3 w-full rounded-lg"
//       >
//         {buttonTitle}
//       </button>
//     </form>
//   );
// }
