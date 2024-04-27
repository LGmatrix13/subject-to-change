import { ChangeEvent, useContext, useState } from "react";
import Input from "./Input";
import WideButton from "./WideButton";
import { ModalContext } from "./Modal";
import Select from "./Select";
import { TIMES } from "../utils/constants";
import { standardTimeConverter } from "../utils/standardTimeConverter";

export default function AddActivity(){

    const [, setOpen] = useContext(ModalContext);

    const[formData,setFormData] = useState({
        startTime: "",
        endTime: "",
        name:"",
        weekday: "",
      });


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const response = await fetch("http://localhost:7070/api/activity", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const message = await response.text();
        setOpen(false);
        alert(message);
        console.log(formData);
    }

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      ) {
        const { name, value } = event.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }


return <div className="space-y-5">
    <h1 className="font-bold uppercase text-xl">
        Add Activity
    </h1>
    <form className="space-y-5"  onSubmit={handleSubmit}>
        <Input
            label= "Start Time"
            name = "startTime"
            options = {{
                type: "text",
                placeholder: "Start Time",
                required: true,
            }}
            onChange = {handleChange}
        />
        <Input
            label= "End Time"
            name = "endTime"
            options = {{
                type: "text",
                placeholder: "End Time",
                required: true,
            }}
            onChange = {handleChange}
        />




        <Input
            label= "Name"
            name = "name"
            options = {{
                type: "text",
                placeholder: "Name",
                required: true,
            }}
            onChange = {handleChange}
        />
        

        <Select 
            label="Weekday"
            name="weekday"
            options={{
                type: "text",
                placeholder: "Weekday",
                required: true,
            }}
            onChange={handleChange}
        >
            <option value="MWF">
                MWF
            </option>
            <option value="TR">
                TR
            </option>
            <option value="TR">
                M
            </option>
            <option value="TR">
                T
            </option>
            <option value="TR">
                W
            </option>
            <option value="TR">
                R
            </option>
            <option value="TR">
                F
            </option>
            
        </Select>
        

        
        <WideButton
          options={{
            type: "submit",
          }}
        >
          Add
        </WideButton>
    </form>


</div>




}

