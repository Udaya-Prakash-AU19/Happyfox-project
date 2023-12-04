import { createServer, Model } from "miragejs";

createServer({
  models: {
    employee: Model,
  },

  seeds(server) {
    server.create("employee", {
      id: 2,
      name: "Joe Linux",
      designation: "Chief Technology Officer",
      team: "Development",
      manager: 1,
    });
    server.create("employee", {
      id: 3,
      name: "Linda May",
      designation: "Chief Business Officer",
      team: "Business",
      manager: 1,
    });
    server.create("employee", {
      id: 4,
      name: "John Green",
      designation: "Chief Accounting Officer",
      team: "Accounts",
      manager: 1,
    });
    server.create("employee", {
      id: 5,
      name: "Ron Blomquist",
      designation: "Chief Infomation Security Officer",
      team: "Development",
      manager: 2,
    });
    server.create("employee", {
      id: 1,
      name: "Mark Hill",
      designation: "Chief Executive Officer",
      team: "All",
      manager: "",
    });
    server.create("employee", {
      id: 6,
      name: "Michael Rubin",
      designation: "Chief Innovation Officer",
      team: "Development",
      manager: 2,
    });
    server.create("employee", {
      id: 7,
      name: "Alice Lopez",
      designation: "Chief Communications Officer",
      team: "Business",
      manager: 3,
    });
    server.create("employee", {
      id: 8,
      name: "Mary Johnson",
      designation: "Chief Brand Officer",
      team: "Business",
      manager: 3,
    });
    server.create("employee", {
      id: 9,
      name: "Kirk Douglas",
      designation: "Chief Business Development Officer",
      team: "Business",
      manager: 3,
    });
    server.create("employee", {
      id: 10,
      name: "Erica Reel",
      designation: "Chief Customer Officer",
      team: "Accounts",
      manager: 4,
    });
  },

  routes() {
    this.namespace = "api";

    this.get("/employees", (schema) => {
      return schema.employees.all();
    });
  },
});
