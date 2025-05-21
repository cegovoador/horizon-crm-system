
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  DollarSign, 
  Package, 
  CheckSquare, 
  BarChart2, 
  PieChart, 
  TrendingUp, 
  TrendingDown 
} from "lucide-react";
import { 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer 
} from "recharts";

// Mock data for charts
const pieData = [
  { name: "Ativos", value: 65, color: "#1EAEDB" },
  { name: "Inativos", value: 35, color: "#8E9196" },
];

const revenueData = [
  { name: "Jan", value: 12000 },
  { name: "Fev", value: 19000 },
  { name: "Mar", value: 15000 },
  { name: "Abr", value: 18000 },
  { name: "Mai", value: 24000 },
  { name: "Jun", value: 22000 },
];

const inventoryData = [
  { name: "Eletrônicos", count: 120 },
  { name: "Escritório", count: 85 },
  { name: "Móveis", count: 45 },
  { name: "Periféricos", count: 70 },
];

const latestTransactions = [
  { id: 1, description: "Venda #12345", amount: 1250.00, date: "2023-05-20", status: "Pago" },
  { id: 2, description: "Compra de estoque", amount: -450.00, date: "2023-05-19", status: "Pago" },
  { id: 3, description: "Fatura #32455", amount: 875.50, date: "2023-05-18", status: "Pendente" },
  { id: 4, description: "Manutenção", amount: -180.00, date: "2023-05-17", status: "Pago" },
];

const upcomingTasks = [
  { id: 1, title: "Reunião com fornecedor", date: "2023-05-22", priority: "Alta" },
  { id: 2, title: "Conferência de estoque", date: "2023-05-23", priority: "Média" },
  { id: 3, title: "Revisão de relatórios financeiros", date: "2023-05-24", priority: "Alta" },
  { id: 4, title: "Atualização do sistema", date: "2023-05-25", priority: "Baixa" },
];

const DashboardPage = () => {
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
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total de Clientes</p>
                <p className="text-3xl font-bold">152</p>
                <p className="mt-1 flex items-center text-sm text-green-600">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  <span>+12% este mês</span>
                </p>
              </div>
              <div className="rounded-full bg-blue-100 p-3">
                <Users className="h-6 w-6 text-crm-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Faturamento Mensal</p>
                <p className="text-3xl font-bold">R$ 45.873</p>
                <p className="mt-1 flex items-center text-sm text-green-600">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  <span>+8,5% este mês</span>
                </p>
              </div>
              <div className="rounded-full bg-green-100 p-3">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Itens em Estoque</p>
                <p className="text-3xl font-bold">320</p>
                <p className="mt-1 flex items-center text-sm text-red-600">
                  <TrendingDown className="mr-1 h-4 w-4" />
                  <span>-5% este mês</span>
                </p>
              </div>
              <div className="rounded-full bg-blue-100 p-3">
                <Package className="h-6 w-6 text-crm-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Tarefas para Hoje</p>
                <p className="text-3xl font-bold">12</p>
                <p className="mt-1 flex items-center text-sm text-gray-500">
                  <span>5 completadas</span>
                </p>
              </div>
              <div className="rounded-full bg-purple-100 p-3">
                <CheckSquare className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Faturamento Últimos 6 Meses</CardTitle>
            <CardDescription>Acompanhe a evolução das vendas mensais</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${formatCurrency(value as number)}`, 'Valor']} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#1EAEDB"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Situação dos Clientes</CardTitle>
            <CardDescription>Clientes ativos vs. inativos</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="h-60 w-60">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-center space-x-4">
              {pieData.map((entry, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className="mr-2 h-3 w-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span className="text-sm">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Distribuição de Estoque</CardTitle>
            <CardDescription>Quantidade de itens por categoria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={inventoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#33C3F0" name="Quantidade" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-lg">Próximas Tarefas</CardTitle>
              <CardDescription>Atividades pendentes para os próximos dias</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between rounded-md border p-3"
                >
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-gray-500">{formatDate(task.date)}</p>
                  </div>
                  <div
                    className={`rounded-full px-2 py-1 text-xs ${
                      task.priority === "Alta"
                        ? "bg-red-100 text-red-700"
                        : task.priority === "Média"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {task.priority}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Últimas Transações</CardTitle>
          <CardDescription>Movimentações financeiras recentes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="px-4 py-3 text-sm font-medium text-gray-500">Descrição</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-500">Data</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-500">Valor</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {latestTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b">
                      <td className="px-4 py-3">{transaction.description}</td>
                      <td className="px-4 py-3">{formatDate(transaction.date)}</td>
                      <td
                        className={`px-4 py-3 font-medium ${
                          transaction.amount >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {formatCurrency(transaction.amount)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                            transaction.status === "Pago"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
