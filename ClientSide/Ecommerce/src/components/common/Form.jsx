import React, { useState } from "react";
import { RegisterFormControls } from '../config/index'
import CommonInput from "./Input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Select, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { SelectContent } from "../ui/select";
import { Textarea } from "../ui/textarea";


function Form({ Buttontext, Submitevent, formdata, setformdata, widthparameter, FormControlsinputrender }) {
  function CreatingElementbyFormcontrols(element) {
    switch (element.componentType) {
      case 'input':
        return <Input onChange={(e) => {
          setformdata({
            ...formdata,
            [e.target.name]: e.target.value
          })
        }}
          className='flex-shrink-1 min-w-[100px] max-w-full sm:min-w-[330px] text-left  border-black' type={element.type} id={element.id} name={element.name} placeholder={element.placeholder} />
      case 'textarea':
        return <Textarea className={'border-1 border-black'} name='notes' placeholder={"Write something"} onChange={(e) => setformdata({ ...formdata, [e.target.name]: e.target.value })}>

        </Textarea>

      case 'select':
        return <Select className="mt-4" onValueChange={(value) => {
          setformdata({
            ...formdata,
            [element.name]: value
          })
        }} >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={element.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {element.options.map((option, index) => (
              <SelectItem key={index} value={option.id}>
                {option.label}
              </SelectItem>
            ))}

          </SelectContent>
        </Select>


    }
  }
  return (<>
    <form onSubmit={(e) => {
      e.preventDefault()
      Submitevent(formdata)
    }}
      className="w-full h-1/2 flex flex-col justify-center items-center gap-2 ">
      {
        FormControlsinputrender?.map((Element, index) => {
          return <div key={index} className="w-full min-h-fit flex flex-col mt-4">
            <Label className='text-left text-[15px] mb-2' htmlFor={Element.id}>{Element.label}</Label>
            {CreatingElementbyFormcontrols(Element)}

          </div>


        })
      }
      <Button style={{ display: Buttontext == null ? 'none' : 'block' }} className={`w-${widthparameter} min-w-[100px] sm:min-w-[250px] `} type="submit" >{Buttontext}</Button>



    </form >


  </>);
}

export default Form;
