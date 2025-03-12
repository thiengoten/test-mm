import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon, Edit2, Filter, Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

// UI Components
import { TransactionForm } from '@/components/transactions'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DialogTypes, useDialog } from '@/providers/dialog-provider'

// Define the transaction schema for form validation
const transactionSchema = z.object({
  amount: z.coerce.number().positive({ message: 'Amount must be positive' }),
  type: z.enum(['income', 'expense'], {
    required_error: 'Please select a transaction type',
  }),
  description: z.string().optional(),
  category_id: z.string({ required_error: 'Please select a category' }),
  date: z.date({
    required_error: 'Please select a date',
  }),
})

// Type for our form data
type TransactionFormValues = z.infer<typeof transactionSchema>

// Mock data for categories (would come from your API)
const categories = [
  { id: '1', name: 'Food', is_default: true },
  { id: '2', name: 'Transportation', is_default: true },
  { id: '3', name: 'Housing', is_default: true },
  { id: '4', name: 'Entertainment', is_default: true },
  { id: '5', name: 'Utilities', is_default: true },
  { id: '6', name: 'Salary', is_default: true },
  { id: '7', name: 'Investments', is_default: true },
]

// Mock data for transactions (would come from your API)
const mockTransactions = [
  {
    id: '1',
    amount: 1500.0,
    type: 'income',
    description: 'Monthly salary',
    category_id: '6',
    date: new Date(2023, 2, 15),
    created_at: new Date(2023, 2, 15),
  },
  {
    id: '2',
    amount: 120.5,
    type: 'expense',
    description: 'Grocery shopping',
    category_id: '1',
    date: new Date(2023, 2, 16),
    created_at: new Date(2023, 2, 16),
  },
  {
    id: '3',
    amount: 45.0,
    type: 'expense',
    description: 'Gas',
    category_id: '2',
    date: new Date(2023, 2, 17),
    created_at: new Date(2023, 2, 17),
  },
]

export function Transactions() {
  const [transactions, setTransactions] = useState(mockTransactions)
  // const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentTransaction, setCurrentTransaction] = useState<any>(null)
  const [filterType, setFilterType] = useState<string | null>(null)

  const { openDialog } = useDialog()

  const showAddTransactionModal = () => {
    openDialog({
      type: DialogTypes.CONTENT_DIALOG,
      title: 'Add Transaction',
      description: 'Add a new transaction to your account',
      content: <TransactionForm />,
    })
  }
  // Initialize the edit form
  const editForm = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: 0,
      type: 'expense',
      description: '',
      category_id: '',
      date: new Date(),
    },
  })

  // Set form values when editing a transaction
  useEffect(() => {
    if (currentTransaction) {
      editForm.reset({
        amount: currentTransaction.amount,
        type: currentTransaction.type,
        description: currentTransaction.description || '',
        category_id: currentTransaction.category_id,
        date: new Date(currentTransaction.date),
      })
    }
  }, [currentTransaction, editForm])

  // Handle form submission for editing a transaction
  const onEditSubmit = (data: TransactionFormValues) => {
    // In a real app, you would send this to your API
    const updatedTransactions = transactions.map((t) =>
      t.id === currentTransaction.id ? { ...t, ...data } : t
    )

    setTransactions(updatedTransactions)
    editForm.reset()
    setIsEditDialogOpen(false)
    setCurrentTransaction(null)
  }

  // Handle transaction deletion
  const handleDelete = (id: string) => {
    // In a real app, you would send this to your API
    setTransactions(transactions.filter((t) => t.id !== id))
  }

  // Get category name by ID
  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name || 'Unknown'
  }

  // Filter transactions by type
  const filteredTransactions = filterType
    ? transactions.filter((t) => t.type === filterType)
    : transactions

  return (
    <div className='container mx-auto py-6 space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Transactions</h1>
          <p className='text-muted-foreground'>
            Manage your income and expenses
          </p>
        </div>

        <div className='flex items-center gap-4'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='sm'>
                <Filter className='mr-2 h-4 w-4' />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setFilterType(null)}>
                All Transactions
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterType('income')}>
                Income Only
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterType('expense')}>
                Expenses Only
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button onClick={showAddTransactionModal}>
            <Plus className='mr-2 h-4 w-4' />
            Add Transaction
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className='grid gap-4 md:grid-cols-3'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-green-600'>
              $
              {transactions
                .filter((t) => t.type === 'income')
                .reduce((sum, t) => sum + t.amount, 0)
                .toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-red-600'>
              $
              {transactions
                .filter((t) => t.type === 'expense')
                .reduce((sum, t) => sum + t.amount, 0)
                .toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              $
              {(
                transactions
                  .filter((t) => t.type === 'income')
                  .reduce((sum, t) => sum + t.amount, 0) -
                transactions
                  .filter((t) => t.type === 'expense')
                  .reduce((sum, t) => sum + t.amount, 0)
              ).toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            {filterType
              ? `Showing ${filterType} transactions only`
              : 'Showing all transactions'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className='text-center'>
                    No transactions found
                  </TableCell>
                </TableRow>
              ) : (
                filteredTransactions
                  .sort(
                    (a, b) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime()
                  )
                  .map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        {format(new Date(transaction.date), 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell>{transaction.description || '-'}</TableCell>
                      <TableCell>
                        {getCategoryName(transaction.category_id)}
                      </TableCell>
                      <TableCell className='font-medium'>
                        ${transaction.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            transaction.type === 'income'
                              ? 'default'
                              : 'destructive'
                          }
                        >
                          {transaction.type}
                        </Badge>
                      </TableCell>
                      <TableCell className='text-right'>
                        <div className='flex justify-end gap-2'>
                          <Button
                            variant='ghost'
                            size='icon'
                            onClick={() => {
                              setCurrentTransaction(transaction)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Edit2 className='h-4 w-4' />
                          </Button>
                          <Button
                            variant='ghost'
                            size='icon'
                            onClick={() => handleDelete(transaction.id)}
                          >
                            <Trash2 className='h-4 w-4' />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Transaction Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Edit Transaction</DialogTitle>
            <DialogDescription>
              Update the details of your transaction
            </DialogDescription>
          </DialogHeader>

          <Form {...editForm}>
            <form
              onSubmit={editForm.handleSubmit(onEditSubmit)}
              className='space-y-4'
            >
              <FormField
                control={editForm.control}
                name='type'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transaction Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select type' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='income'>Income</SelectItem>
                        <SelectItem value='expense'>Expense</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={editForm.control}
                name='amount'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        step='0.01'
                        placeholder='0.00'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={editForm.control}
                name='category_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select category' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories
                          .filter((c) =>
                            editForm.watch('type') === 'income'
                              ? ['6', '7'].includes(c.id)
                              : !['6', '7'].includes(c.id)
                          )
                          .map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={editForm.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder='Description' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={editForm.control}
                name='date'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className='w-full pl-3 text-left font-normal'
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          mode='single'
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type='submit'>Update Transaction</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
