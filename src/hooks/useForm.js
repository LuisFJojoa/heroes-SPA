import { useState } from "react";

export const useForm = (inititalForm = {}) => {
  const [formState, setFormState] = useState(inititalForm);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(inititalForm)
  }

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm
  };
};
