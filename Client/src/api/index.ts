import * as todos from "./todos";
import * as login from "./login";
import * as register from "./register";
import * as otp from "./otp";
import * as product from "./product";

class API {
	todos: typeof todos;
	login: typeof login;
	register: typeof register;
	otp: typeof otp;
	product: typeof product;

	constructor() {
		this.todos = todos;
		this.login = login;
		this.register = register;
		this.otp = otp;
		this.product = product;
	}
}

const api = new API();

export default api;
