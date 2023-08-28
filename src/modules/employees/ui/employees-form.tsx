import { useForm } from "react-hook-form";

export function EmployeesForm(props: any) {
  const { employee, onSave } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => onSave(data);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        defaultValue={employee?.first_name}
        {...register("first_name", {
          required: true,
        })}
      />
      {errors.first_name && <span>This field is required</span>}

      <input
        defaultValue={employee?.last_name}
        {...register("last_name", { required: true })}
      />

      {errors.last_name && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
}
