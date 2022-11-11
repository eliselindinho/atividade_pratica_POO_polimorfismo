/*
A Mach1 resolveu refatorar o sistema SMACH criando classes para manipular os pedidos a serem feitos no sistema. Com base nisso crie a estrutura de classes seguindo as seguintes especificações.

a. Todas as classes que possuírem herança precisam chamar em seu construtor o construtor do Pai passando os parâmetros necessários.

b. Criar class Product seguindo o modelo abaixo

c. Criar class Order seguindo o modelo abaixo

d. Construtor da class Order precisa preencher o campo created com a data/hora da criação da instância.

e. O método addProduct da class Order precisa dar erro caso o objeto passado por parâmetro não seja do tipo produto, porém caso seja um objeto do tipo produto adicione o mesmo no array #products.

f. O método calcularShipping da class Order precisa dar um erro com a mensagem “Metodo não implementado”

g. Criar class OrderStore seguindo o modelo abaixo

h. Construtor da class OrderStore deve receber o número da mesa por parâmetro, armazenar o mesmo e manter o comportamento da class pai.

i. O método calcularShipping da class OrderStore deve retornar zero quando chamada

j. Criar class Client seguindo o modelo abaixo

k. Criar class OrderDelivery seguindo o modelo abaixo

l. Construtor da class OrderDelivery deve receber um cliente por parâmetro no construtor e armazenar, porém deve manter o comportamento da class pai.

OBS.: Caso o objeto passado não for um cliente deve dar um erro com a mensagem “Cliente informado inválido”.

m. O método calculateShipping da class OrderDelivery deve devolver um valor de acordo com a tabela abaixo:

  i. 5 – Caso o zipcode comece com número entre 0 e 4

  ii. 10 – Caso o zipcode comece com número entre 5 e 9

  iii. Forçar um erro – Caso o zipcode não atenda a nenhuma das opções acima com a mensagem “Cep inválido”

OBS.: Caso o zipcode não seja passado por parâmetro deve pegar o zipcode do Objeto Client de dentro do objeto. */

class Product {
  #id = 0;
  name = "";

  constructor(id, name) {
    this.#id = id;
    this.name = name;
  }
}
class Order {
  #id = 0;
  created = null;
  #products = [];

  constructor() {
    this.created = new Date();
  }

  get ProdutoSalvo() {
    return this.#products;
  }

  addProduct(value) {
    if (value instanceof Product) {
      this.#products.push(value);
      return;
    }
    throw new Error("Produto inválido!");
  }
  calcularShipping() {
    throw new Error("Método não implementado.");
  }
}

class OrderStore extends Order {
  tableNumber = 0;

  constructor(tableNumber) {
    this.tableNumber = tableNumber;
  }
  calcularShipping() {
    return 0;
  }
}

class Client {
  #id = 0;
  name;
  andress;
  zipCode;
  active;

  constructor(id, name, andress, zipCode, active) {
    this.#id = id;
    this.name = name;
    this.andress = andress;
    this.zipCode = zipCode;
    this.active = active;
  }
}

class OrderDelivery extends Order {
  client;

  constructor(cliente) {
    super();
    if (!cliente instanceof Client) {
      throw new Error("Cliente inválido!");
    }
    this.client = cliente;
  }
  calculateShipping(zipCode) {
    const currentZipcode = zipCode ?? this.client.zipCode;
    if (this.client.zipCode.charAt(0) <= 4) {
      return 5;
    } else if (
      this.client.zipCode.charAt(0) >= 5 &&
      this.client.zipCode.charAt(0) <= 9
    ) {
      return 10;
    } else {
      throw new Error("Cep inválido!");
    }
  }
}

const pedido = new Order();
const pizza = new Product(1, "Pizza doce");

const cliente = new Client();
const pedidoDelivery = new OrderDelivery(Client);

console.log(OrderDelivery.calcularShipping());

pedido.addProduct(pizza);
