import { useForm } from "react-hook-form";
import { months } from "../../shared/interfaces/months";
import { years } from "../../shared/interfaces/years";

export function IncomesForm(props: any) {
  const { income, onSave, employees, income_types } = props;
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

      <select {...register("income_type_id")}>
        <option value="">Select Income Type</option>
        {income_types.map((income_type: any) => {
          return <option key={income_type.id} value={income_type.id}>{income_type.name}</option>;
        })}
      </select>
      {errors.income_type_id && <span>This field is required</span>}

      <input
        defaultValue={income?.amount}
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
