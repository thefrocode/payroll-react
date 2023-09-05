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

      <input
        defaultValue={employee?.id_number}
        {...register("id_number", { required: true })}
      />

      {errors.id_number && <span>This field is required</span>}

      <input
        defaultValue={employee?.phone}
        {...register("phone", { required: true })}
      />

      {errors.phone && <span>This field is required</span>}

      <input
        defaultValue={employee?.email_address}
        {...register("email_address", {
          required: true,
          validate: {
            matchPattern: (v) =>
              /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
              "Email address must be a valid address",
          },
        })}
      />

      {errors.email_address?.type === "required" && (
        <small>Email is required</small>
      )}

      {errors.email_address?.type === "matchPattern" && (
        <small>Email address must be a valid address</small>
      )}

      <input
        defaultValue={employee?.nhif_number}
        {...register("nhif_number", { required: true })}
      />

      {errors.nhif_number && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
}
