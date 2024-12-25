import { Button } from "@/components/ui/button";
import React from "react";
import DialogForm from "../DialogForm";
import CreateForm from "./CreateForm";

export default function CreateAccount() {
  return (
    <DialogForm
      id='create-trigger'
      title='Create Account'
      Trigger={
        <Button variant='outline' className='flex items-center space-x-2'>
          Create Account
        </Button>
      }
      form={<CreateForm />}
    />
  );
}
