import { ChangeEvent, useContext, useState } from "react";
import Input from "./Input";
import WideButton from "./WideButton";
import { ModalContext } from "./Modal";
import Select from "./Select";
import { Option } from "./Option";
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
        
        <Select
              label="Start Time"
              name="startTime"
              onChange={handleChange}
              className="p-3 rounded-lg w-full h-[52px]"
            >
              <>
                {TIMES.map((time) => (
                  <Option
                    value={time}
                    label={standardTimeConverter(time) as string}
                  />
                ))}
                <Option
                  value=""
                  label="None"
                />
              </>
            </Select>
            <Select
              label="End Time"
              name="endTime"
              onChange={handleChange}
              className="p-3 rounded-lg w-full h-[52px]"
            >
              <>
                {TIMES.map((time) => (
                  <Option
                    value={time}
                    label={standardTimeConverter(time) as string}
                  />
                ))}
                <Option
                  value=""
                  label="None"
                />
              </>
            </Select>



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
              onChange={handleChange}
              className="p-3 rounded-lg w-full h-[52px]"
            >
              <Option
                value="MWF"
                label="MWF"
              />
              <Option
                value="TR"
                label="TR"
              />
              <Option 
              value="M" 
              label="M" 
              />
              <Option 
              value="T" 
              label="T" 
              />
              <Option 
              value="W" 
              label="W" 
              />
              <Option 
              value="R" 
              label="R" 
              />
              <Option 
              value="F" 
              label="F" 
              />
              <Option 
              value="" 
              label="None" 
              />
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

