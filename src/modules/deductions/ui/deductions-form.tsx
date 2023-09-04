import { useForm } from "react-hook-form";
import { useShared } from "../../shared/store/active";

export function DeductionsForm(props: any) {
  const { deduction, onSave, employees, deduction_types } = props;
  const { active_month } = useShared();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => onSave({...data,...active_month});

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <select
        {...register("employee_id", {
          valueAsNumber: true,
          required: true,
        })}
      >
        <option value="">Select Employee</option>
        {employees.map((employee: any) => {
          return (
            <option key={employee.id} value={employee.id}>
              {employee.first_name} {employee.second_name}
            </option>
          );
        })}
      </select>
      {errors.employee_id && <span>This field is required</span>}

      <select
        {...register("deduction_type_id", {
          valueAsNumber: true,
          required: true,
        })}
      >
        <option value="">Select Deduction Type</option>
        {deduction_types.map((deduction_type: any) => {
          return (
            <option key={deduction_type.id} value={deduction_type.id}>
              {deduction_type.name}
            </option>
          );
        })}
      </select>
      {errors.deduction_type_id && <span>This field is required</span>}

      <input
        defaultValue={deduction?.amount}
        {...register("amount", { required: true, valueAsNumber: true })}
      />

      {errors.amount && <span>This field is required</span>}

      {/* <select
        {...register("month", {
          valueAsNumber: true,
          required: true,
        })}
      >
        <option value="">Select Month</option>
        {months.map((month: any) => {
          return (
            <option key={month.id} value={month.id}>
              {month.name}
            </option>
          );
        })}
      </select>
      {errors.month && <span>This field is required</span>}

      <select
        {...register("year", {
          valueAsNumber: true,
          required: true,
        })}
      >
        <option value="">Select Year</option>
        {years.map((year: any) => {
          return (
            <option key={year} value={year}>
              {year}
            </option>
          );
        })}
      </select>
      {errors.year && <span>This field is required</span>} */}

      <input type="submit" />
    </form>
  );
}
