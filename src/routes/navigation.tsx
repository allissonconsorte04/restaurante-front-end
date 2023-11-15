import Produtos from "../pages/produtos/Produtos";
import Login from "../pages/login/Login";
import Clientes from "../pages/clientes/Clientes";
import Funcionarios from "../pages/funcionarios/Funcionarios";
import Pedidos from "../pages/pedidos/Pedidos";

export const nav = [
     { path:     "/",             name: "Inicio",         element: null,                  isMenu: true,     isPrivate: false },
     { path:     "/login",        name: "Login",          element: <Login />,             isMenu: false,    isPrivate: false },
     { path:     "/produtos",     name: "Produtos",       element: <Produtos />,          isMenu: true,     isPrivate: true  },
     { path:     "/clientes",     name: "Clientes",       element: <Clientes />,          isMenu: true,     isPrivate: true  },
     { path:     "/funcionarios", name: "Funcionarios",   element: <Funcionarios />,      isMenu: true,     isPrivate: true  },
     { path:     "/pedidos",      name: "Pedidos",        element: <Pedidos />,           isMenu: true,     isPrivate: true  },
    
     // { path:     "/private",  name: "Private",     element: <Login />,    isMenu: true,     isPrivate: false  },
     // { path:     "/account",  name: "Account",     element: <Login />,    isMenu: true,     isPrivate: false  },
]