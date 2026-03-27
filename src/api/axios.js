const api = {
  get: async (url) => {
    switch (url) {
      case "/products/":
        return { data: [{ id: 1, name: "Latte", price: 4.5, category: "Coffee" }] };
      case "/inventory/":
        return { data: [{ id: 1, product: "Latte", quantity: 20 }] };
      case "/suppliers/":
        return { data: [{ id: 1, name: "CoffeeCo", contact: "0123456789", email: "contact@coffeeco.com" }] };
      case "/purchases/":
        return { data: [{ id: 1, product: "Latte", supplier: "CoffeeCo", quantity: 10, date: "2026-03-27" }] };
      case "/expenses/":
        return { data: [{ id: 1, title: "Electricity", amount: 50, category: "Utility", date: "2026-03-26" }] };
      default:
        return { data: [] };
    }
  },
  post: async (url, data) => ({ data: { ...data, id: Math.floor(Math.random() * 1000) } }),
  put: async (url, data) => ({ data }),
  delete: async (url) => ({ data: {} }),
};

export default api;