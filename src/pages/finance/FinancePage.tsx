
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Search, FileText, Download, Plus, Filter, Calendar, TrendingUp, TrendingDown } from "lucide-react";

// Mock data for financial transactions
const transactions = [
  { 
    id: 1, 
    description: "Venda #12345", 
    client: "Empresa ABC", 
    type: "receivable", 
    amount: 1250.00, 
    date: "2023-05-20", 
    dueDate: "2023-06-20", 
    status: "paid" 
  },
  { 
    id: 2, 
    description: "Compra de estoque", 
    client: "Fornecedor XYZ", 
    type: "payable", 
    amount: 450.00, 
    date: "2023-05-19", 
    dueDate: "2023-06-19", 
    status: "paid" 
  },
  { 
    id: 3, 
    description: "Fatura #32455", 
    client: "Cliente 123", 
    type: "receivable", 
    amount: 875.50, 
    date: "2023-05-18", 
    dueDate: "2023-06-18", 
    status: "pending" 
  },
  { 
    id: 4, 
    description: "Manutenção", 
    client: "Serviço Técnico", 
    type: "payable", 
    amount: 180.00, 
    date: "2023-05-17", 
    dueDate: "2023-06-17", 
    status: "paid" 
  },
  { 
    id: 5, 
    description: "Venda #12346", 
    client: "Cliente ABC", 
    type: "receivable", 
    amount: 2340.00, 
    date: "2023-05-16", 
    dueDate: "2023-06-16", 
    status: "pending" 
  },
  { 
    id: 6, 
    description: "Aluguel", 
    client: "Imobiliária", 
    type: "payable", 
    amount: 1500.00, 
    date: "2023-05-15", 
    dueDate: "2023-06-15", 
    status: "pending" 
  },
  { 
    id: 7, 
    description: "Venda #12347", 
    client: "Cliente DEF", 
    type: "receivable", 
    amount: 890.00, 
    date: "2023-05-14", 
    dueDate: "2023-06-14", 
    status: "paid" 
  },
  { 
    id: 8, 
    description: "Internet e Telefone", 
    client: "Operadora", 
    type: "payable", 
    amount: 220.00, 
    date: "2023-05-13", 
    dueDate: "2023-06-13", 
    status: "pending" 
  },
];

const FinancePage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Filter the transactions based on active tab and filters
  const filteredTransactions = transactions.filter((transaction) => {
    // Filter by tab (all, receivables, payables)
    if (activeTab === "receivables" && transaction.type !== "receivable") return false;
    if (activeTab === "payables" && transaction.type !== "payable") return false;
    
    // Filter by search term
    if (
      searchTerm &&
      !transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !transaction.client.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    
    // Filter by status
    if (statusFilter !== "all" && transaction.status !== statusFilter) return false;
    
    // Filter by date
    if (dateFilter === "thisMonth") {
      const transactionDate = new Date(transaction.date);
      const today = new Date();
      if (
        transactionDate.getMonth() !== today.getMonth() ||
        transactionDate.getFullYear() !== today.getFullYear()
      ) {
        return false;
      }
    }
    
    return true;
  });

  // Calculate summary statistics
  const totalReceivables = transactions
    .filter(t => t.type === "receivable")
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalPayables = transactions
    .filter(t => t.type === "payable")
    .reduce((sum, t) => sum + t.amount, 0);
    
  const pendingReceivables = transactions
    .filter(t => t.type === "receivable" && t.status === "pending")
    .reduce((sum, t) => sum + t.amount, 0);
    
  const pendingPayables = transactions
    .filter(t => t.type === "payable" && t.status === "pending")
    .reduce((sum, t) => sum + t.amount, 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold">Financeiro</h1>
          <p className="text-gray-500">Gerencie contas a pagar e receber</p>
        </div>
        <div className="flex space-x-2">
          <Button className="bg-crm-primary hover:bg-crm-secondary">
            <FileText className="mr-2 h-4 w-4" />
            Gerar Relatório
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Nova Transação
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">A Receber (Total)</p>
                <p className="text-2xl font-bold">{formatCurrency(totalReceivables)}</p>
              </div>
              <div className="rounded-full bg-green-100 p-3">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">A Pagar (Total)</p>
                <p className="text-2xl font-bold">{formatCurrency(totalPayables)}</p>
              </div>
              <div className="rounded-full bg-red-100 p-3">
                <TrendingDown className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">A Receber (Pendente)</p>
                <p className="text-2xl font-bold">{formatCurrency(pendingReceivables)}</p>
              </div>
              <div className="rounded-full bg-yellow-100 p-3">
                <Calendar className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">A Pagar (Pendente)</p>
                <p className="text-2xl font-bold">{formatCurrency(pendingPayables)}</p>
              </div>
              <div className="rounded-full bg-yellow-100 p-3">
                <Calendar className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <TabsList>
                <TabsTrigger value="all">Todas</TabsTrigger>
                <TabsTrigger value="receivables">A Receber</TabsTrigger>
                <TabsTrigger value="payables">A Pagar</TabsTrigger>
              </TabsList>
              
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[130px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="paid">Pagos</SelectItem>
                      <SelectItem value="pending">Pendentes</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="w-full sm:w-[130px]">
                      <SelectValue placeholder="Período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="thisMonth">Este mês</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <TabsContent value="all" className="mt-4">
              <TransactionsTable transactions={filteredTransactions} formatCurrency={formatCurrency} formatDate={formatDate} />
            </TabsContent>
            <TabsContent value="receivables" className="mt-4">
              <TransactionsTable transactions={filteredTransactions} formatCurrency={formatCurrency} formatDate={formatDate} />
            </TabsContent>
            <TabsContent value="payables" className="mt-4">
              <TransactionsTable transactions={filteredTransactions} formatCurrency={formatCurrency} formatDate={formatDate} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

interface TransactionsTableProps {
  transactions: typeof transactions;
  formatCurrency: (value: number) => string;
  formatDate: (dateStr: string) => string;
}

const TransactionsTable = ({ transactions, formatCurrency, formatDate }: TransactionsTableProps) => {
  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Descrição</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Cliente/Fornecedor</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Data</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Vencimento</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Valor</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  Nenhuma transação encontrada
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b">
                  <td className="px-4 py-3">{transaction.description}</td>
                  <td className="px-4 py-3">{transaction.client}</td>
                  <td className="px-4 py-3">{formatDate(transaction.date)}</td>
                  <td className="px-4 py-3">{formatDate(transaction.dueDate)}</td>
                  <td className={`px-4 py-3 font-medium ${
                    transaction.type === "receivable" ? "text-green-600" : "text-red-600"
                  }`}>
                    {transaction.type === "receivable" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                      transaction.status === "paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {transaction.status === "paid" ? "Pago" : "Pendente"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancePage;
