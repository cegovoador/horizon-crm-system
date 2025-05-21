
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Package, 
  Plus, 
  Filter, 
  BarChart2, 
  ArrowDownUp,
  AlertTriangle
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Mock data for products
const products = [
  { 
    id: 1, 
    code: "PROD001", 
    name: "Laptop Dell XPS 13", 
    category: "Eletrônicos", 
    quantity: 15, 
    minQuantity: 5, 
    price: 5999.90, 
    lastUpdated: "2023-05-15" 
  },
  { 
    id: 2, 
    code: "PROD002", 
    name: "Monitor LG 27\"", 
    category: "Eletrônicos", 
    quantity: 28, 
    minQuantity: 10, 
    price: 1499.90, 
    lastUpdated: "2023-05-14" 
  },
  { 
    id: 3, 
    code: "PROD003", 
    name: "Mesa de Escritório", 
    category: "Móveis", 
    quantity: 8, 
    minQuantity: 3, 
    price: 799.90, 
    lastUpdated: "2023-05-13" 
  },
  { 
    id: 4, 
    code: "PROD004", 
    name: "Cadeira Ergonômica", 
    category: "Móveis", 
    quantity: 12, 
    minQuantity: 5, 
    price: 649.90, 
    lastUpdated: "2023-05-12" 
  },
  { 
    id: 5, 
    code: "PROD005", 
    name: "Teclado Mecânico", 
    category: "Periféricos", 
    quantity: 30, 
    minQuantity: 15, 
    price: 349.90, 
    lastUpdated: "2023-05-11" 
  },
  { 
    id: 6, 
    code: "PROD006", 
    name: "Mouse Gamer", 
    category: "Periféricos", 
    quantity: 22, 
    minQuantity: 10, 
    price: 199.90, 
    lastUpdated: "2023-05-10" 
  },
  { 
    id: 7, 
    code: "PROD007", 
    name: "Headset", 
    category: "Periféricos", 
    quantity: 18, 
    minQuantity: 8, 
    price: 299.90, 
    lastUpdated: "2023-05-09" 
  },
  { 
    id: 8, 
    code: "PROD008", 
    name: "Impressora Laser", 
    category: "Escritório", 
    quantity: 7, 
    minQuantity: 3, 
    price: 1299.90, 
    lastUpdated: "2023-05-08" 
  },
  { 
    id: 9, 
    code: "PROD009", 
    name: "Tablet Samsung", 
    category: "Eletrônicos", 
    quantity: 4, 
    minQuantity: 5, 
    price: 1899.90, 
    lastUpdated: "2023-05-07" 
  },
  { 
    id: 10, 
    code: "PROD010", 
    name: "Grampeador", 
    category: "Escritório", 
    quantity: 35, 
    minQuantity: 15, 
    price: 29.90, 
    lastUpdated: "2023-05-06" 
  },
];

// Mock data for inventory movements
const movements = [
  { 
    id: 1, 
    productId: 1, 
    productName: "Laptop Dell XPS 13", 
    type: "entry", 
    quantity: 5, 
    date: "2023-05-15", 
    user: "João Silva", 
    notes: "Recebimento de fornecedor" 
  },
  { 
    id: 2, 
    productId: 2, 
    productName: "Monitor LG 27\"", 
    type: "entry", 
    quantity: 10, 
    date: "2023-05-14", 
    user: "João Silva", 
    notes: "Recebimento de fornecedor" 
  },
  { 
    id: 3, 
    productId: 1, 
    productName: "Laptop Dell XPS 13", 
    type: "exit", 
    quantity: 2, 
    date: "2023-05-13", 
    user: "Maria Souza", 
    notes: "Venda para cliente" 
  },
  { 
    id: 4, 
    productId: 3, 
    productName: "Mesa de Escritório", 
    type: "entry", 
    quantity: 3, 
    date: "2023-05-12", 
    user: "João Silva", 
    notes: "Recebimento de fornecedor" 
  },
  { 
    id: 5, 
    productId: 5, 
    productName: "Teclado Mecânico", 
    type: "exit", 
    quantity: 5, 
    date: "2023-05-11", 
    user: "Maria Souza", 
    notes: "Venda para cliente" 
  },
  { 
    id: 6, 
    productId: 9, 
    productName: "Tablet Samsung", 
    type: "exit", 
    quantity: 1, 
    date: "2023-05-10", 
    user: "Pedro Santos", 
    notes: "Venda para cliente" 
  },
];

// Chart data
const categoryData = [
  { name: "Eletrônicos", value: 47 },
  { name: "Móveis", value: 20 },
  { name: "Periféricos", value: 70 },
  { name: "Escritório", value: 42 },
];

const InventoryPage = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");

  // Filter products based on search and filters
  const filteredProducts = products.filter((product) => {
    // Filter by search term
    if (
      searchTerm &&
      !product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !product.code.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    
    // Filter by category
    if (categoryFilter !== "all" && product.category !== categoryFilter) {
      return false;
    }
    
    // Filter by stock status
    if (stockFilter === "low" && product.quantity > product.minQuantity) {
      return false;
    }
    
    return true;
  });

  // Filter movements based on search
  const filteredMovements = movements.filter((movement) => {
    if (
      searchTerm &&
      !movement.productName.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

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

  // Calculate low stock items
  const lowStockItems = products.filter(p => p.quantity <= p.minQuantity).length;
  
  // Calculate statistics
  const totalItems = products.reduce((sum, product) => sum + product.quantity, 0);
  const totalCategories = [...new Set(products.map(p => p.category))].length;
  const totalProducts = products.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold">Estoque</h1>
          <p className="text-gray-500">Gerencie seu inventário e produtos</p>
        </div>
        <div className="flex space-x-2">
          <Button className="bg-crm-primary hover:bg-crm-secondary">
            <Plus className="mr-2 h-4 w-4" />
            Novo Produto
          </Button>
          <Button variant="outline">
            <ArrowDownUp className="mr-2 h-4 w-4" />
            Registrar Movimentação
          </Button>
          <Button variant="outline">
            <BarChart2 className="mr-2 h-4 w-4" />
            Relatórios
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total de Itens</p>
                <p className="text-2xl font-bold">{totalItems}</p>
                <p className="mt-1 text-sm text-gray-500">Em estoque</p>
              </div>
              <div className="rounded-full bg-blue-100 p-3">
                <Package className="h-5 w-5 text-crm-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Produtos com Estoque Baixo</p>
                <p className="text-2xl font-bold">{lowStockItems}</p>
                <p className="mt-1 text-sm text-gray-500">Abaixo do mínimo</p>
              </div>
              <div className="rounded-full bg-yellow-100 p-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total de Produtos</p>
                <p className="text-2xl font-bold">{totalProducts}</p>
                <p className="mt-1 text-sm text-gray-500">Cadastrados</p>
              </div>
              <div className="rounded-full bg-purple-100 p-3">
                <Package className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Categorias</p>
                <p className="text-2xl font-bold">{totalCategories}</p>
                <p className="mt-1 text-sm text-gray-500">Diferentes</p>
              </div>
              <div className="rounded-full bg-green-100 p-3">
                <Filter className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <Tabs defaultValue="products" value={activeTab} onValueChange={setActiveTab}>
              <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <TabsList>
                  <TabsTrigger value="products">Produtos</TabsTrigger>
                  <TabsTrigger value="movements">Movimentações</TabsTrigger>
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
                  
                  {activeTab === "products" && (
                    <div className="flex space-x-2">
                      <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger className="w-full sm:w-[130px]">
                          <SelectValue placeholder="Categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todas</SelectItem>
                          <SelectItem value="Eletrônicos">Eletrônicos</SelectItem>
                          <SelectItem value="Móveis">Móveis</SelectItem>
                          <SelectItem value="Periféricos">Periféricos</SelectItem>
                          <SelectItem value="Escritório">Escritório</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Select value={stockFilter} onValueChange={setStockFilter}>
                        <SelectTrigger className="w-full sm:w-[130px]">
                          <SelectValue placeholder="Estoque" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos</SelectItem>
                          <SelectItem value="low">Estoque baixo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </div>

              <TabsContent value="products" className="mt-4">
                <ProductsTable products={filteredProducts} formatCurrency={formatCurrency} formatDate={formatDate} />
              </TabsContent>
              
              <TabsContent value="movements" className="mt-4">
                <MovementsTable movements={filteredMovements} formatDate={formatDate} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Distribuição por Categoria</CardTitle>
            <CardDescription>Quantidade de itens por categoria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#1EAEDB" name="Quantidade" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Produtos com Estoque Baixo</CardTitle>
          <CardDescription>Produtos que estão abaixo ou próximos do estoque mínimo</CardDescription>
        </CardHeader>
        <CardContent>
          <LowStockTable 
            products={products.filter(p => p.quantity <= p.minQuantity)} 
            formatCurrency={formatCurrency} 
          />
        </CardContent>
      </Card>
    </div>
  );
};

interface ProductsTableProps {
  products: typeof products;
  formatCurrency: (value: number) => string;
  formatDate: (dateStr: string) => string;
}

const ProductsTable = ({ products, formatCurrency, formatDate }: ProductsTableProps) => {
  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Código</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Nome</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Categoria</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Quantidade</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Preço</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Atualizado</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                  Nenhum produto encontrado
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="px-4 py-3 font-mono text-sm">{product.code}</td>
                  <td className="px-4 py-3">{product.name}</td>
                  <td className="px-4 py-3">
                    <Badge variant="outline">{product.category}</Badge>
                  </td>
                  <td className="px-4 py-3">{product.quantity}</td>
                  <td className="px-4 py-3 font-medium">{formatCurrency(product.price)}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{formatDate(product.lastUpdated)}</td>
                  <td className="px-4 py-3">
                    <Badge
                      className={`${
                        product.quantity <= product.minQuantity
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {product.quantity <= product.minQuantity ? "Baixo" : "Normal"}
                    </Badge>
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

interface MovementsTableProps {
  movements: typeof movements;
  formatDate: (dateStr: string) => string;
}

const MovementsTable = ({ movements, formatDate }: MovementsTableProps) => {
  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Produto</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Tipo</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Quantidade</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Data</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Usuário</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Observações</th>
            </tr>
          </thead>
          <tbody>
            {movements.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  Nenhuma movimentação encontrada
                </td>
              </tr>
            ) : (
              movements.map((movement) => (
                <tr key={movement.id} className="border-b">
                  <td className="px-4 py-3">{movement.productName}</td>
                  <td className="px-4 py-3">
                    <Badge
                      className={`${
                        movement.type === "entry"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {movement.type === "entry" ? "Entrada" : "Saída"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">{movement.quantity}</td>
                  <td className="px-4 py-3">{formatDate(movement.date)}</td>
                  <td className="px-4 py-3">{movement.user}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{movement.notes}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

interface LowStockTableProps {
  products: typeof products;
  formatCurrency: (value: number) => string;
}

const LowStockTable = ({ products, formatCurrency }: LowStockTableProps) => {
  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Código</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Nome</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Quantidade Atual</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Quantidade Mínima</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Preço</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Situação</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  Todos os produtos estão com estoque normal
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="px-4 py-3 font-mono text-sm">{product.code}</td>
                  <td className="px-4 py-3">{product.name}</td>
                  <td className="px-4 py-3 font-medium text-red-600">{product.quantity}</td>
                  <td className="px-4 py-3">{product.minQuantity}</td>
                  <td className="px-4 py-3">{formatCurrency(product.price)}</td>
                  <td className="px-4 py-3">
                    <Badge className="bg-red-100 text-red-800">
                      {product.quantity < product.minQuantity
                        ? "Crítico"
                        : "Atenção"}
                    </Badge>
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

export default InventoryPage;
