import { Modal, Button, Stack } from "react-bootstrap";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext";
import { currencyFormatter } from "../utils";

const ViewExpensesModal = ({budgetId, handleClose}) => {
const { getBudgetsExpenses, budgets, deleteBudget, deleteExpense } = useBudgets()

const expenses = getBudgetsExpenses(budgetId)

const budget = UNCATEGORIZED_BUDGET_ID === budgetId ? {name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID}
: budgets.find(b => b.id === budgetId)
    return ( 
        <Modal show={budgetId != null} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <Stack direction="horizonal" gap="2">
                    <div>Expenses - {budget?.name}
                    {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                        <Button className="ms-4" onClick={() => {
                            deleteBudget(budget)
                            handleClose()
                        }} 
                        variant="outline-danger">Delete
                        </Button>
                    )}
                    </div>
                    </Stack>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Stack direction="vertical" gap="3">
                   {expenses.map(expense => (
                       <Stack direction="horizontal" gap="2" key={expense.id}>
                           <div className="me-auto fs-4">{expense.description}</div>
                           <div className="fs-5">{currencyFormatter.format(expense.amount)}</div>
                           <Button onClick={() => deleteExpense(expense)}
                           size="sm" variant="outline-danger">&times;</Button>
                       </Stack>
                   ))}
                </Stack> 
            </Modal.Body>
        </Modal>
     );
}
 
export default ViewExpensesModal;