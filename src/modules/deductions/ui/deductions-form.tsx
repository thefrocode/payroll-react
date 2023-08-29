import { useForm } from "react-hook-form";
import { months } from "../../shared/interfaces/months";
import { years } from "../../shared/interfaces/years";

export function DeductionsForm(props: any) {
  const { deduction, onSave, employees, deduction_types } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => onSave(data);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register("employee_id")}>
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

      <select {...register("deduction_type_id")}>
        <option value="">Select Deduction Type</option>
        {deduction_types.map((deduction_type: any) => {
          return <option key={deduction_type.id} value={deduction_type.id}>{deduction_type.name}</option>;
        })}
      </select>
      {errors.deduction_type_id && <span>This field is required</span>}

      <input
        defaultValue={deduction?.amount}
        {...register("amount", { required: true })}
      />

      {errors.amount && <span>This field is required</span>}

      <select {...register("month")}>
        <option value="">Select Month</option>
        {months.map((month: any) => {
          return <option key={month.id}value={month.id}>{month.name}</option>;
        })}
      </select>
      {errors.month && <span>This field is required</span>}

      <select {...register("year")}>
        <option value="">Select Year</option>
        {years.map((year: any) => {
          return <option key={year} value={year}>{year}</option>;
        })}
      </select>
      {errors.year && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
}
