import { useForm } from "react-hook-form";
import { Income } from "../../shared/interfaces/income";
import { months } from "../../shared/interfaces/months";
import { years } from "../../shared/interfaces/years";
import { useShared } from "../../shared/store/active";

export function IncomesForm(props: any) {
  const { income, onSave, employees, income_types } = props;
  const { active_month } = useShared();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    onSave({...data, ...active_month});
  };
  console.log(employees);

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
        {employees && employees.map((employee: any) => {
          return (
            <option key={employee.id} value={employee.id} selected={employee.id===income?.employee_id}>
              {employee.first_name} {employee.second_name}
            </option>
          );
        })}
      </select>
      {errors.employee_id && <span>This field is required</span>}

      <select
        {...register("income_type_id", {
          valueAsNumber: true,
          required: true,
        })}
      >
        <option value="">Select Income Type</option>
        {income_types.map((income_type: any) => {
          return (
            <option key={income_type.id} 
            value={income_type.id}
            selected={income_type.id===income?.income_type_id}
            >
              {income_type.name}
            </option>
          );
        })}
      </select>
      {errors.income_type_id && <span>This field is required</span>}

      <input
        defaultValue={income?.amount}
        {...register("amount", { required: true, valueAsNumber: true })}
      />

      {errors.amount && <span>This field is required</span>}

      {/* <select {...register("month",{
        valueAsNumber: true,
        required: true
      })}>
        <option value="">Select Month</option>
        {months.map((month: any) => {
          return (
            <option key={month.id} value={month.id}
            selected={month.id===income.month}
            >
              {month.name}
            </option>
          );
        })}
      </select>
      {errors.month && <span>This field is required</span>}

      <select {...register("year",{
        valueAsNumber: true,
        required: true
      })}>
        <option value="">Select Year</option>
        {years.map((year: any) => {
          return (
            <option key={year} value={year}
            selected={year===income.year}
            >
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
