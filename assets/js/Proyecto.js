export function Proyecto(nombre, trabajadores) {
	this._nombre = nombre;
	this._trabajadores = trabajadores || [];

	Object.defineProperty(this, '_getNombre', {
		get: function () {
			return this._nombre;
		},
	});

	Object.defineProperty(this, '_setNombre', {
		set: function (nombre) {
			this._nombre = nombre;
		},
	});

	Object.defineProperty(this, '_getTrabajadores', {
		get: function () {
			return this._trabajadores;
		},
	});

	Object.defineProperty(this, '_setTrabajadores', {
		set: function (trabajadores) {
			this._trabajadores.push(trabajadores);
		},
	});

	Object.defineProperty(this, '_getInfo', {
		get: function () {
			if (
				this._nombre === undefined ||
				this._nombre === null ||
				this._nombre === '' ||
				this._nombre.length < 1
			)
				return 'No se puede obtener información del proyecto';

			return {
				nombre: this._nombre,
				trabajadores: this._trabajadores.map((trabajador) =>
					trabajador.getInfo()
				),
			};
		},
	});
}

Proyecto.prototype.getNombre = function () {
	return this._getNombre;
};

Proyecto.prototype.setNombre = function (nombre) {
	this._setNombre = nombre;
};

Proyecto.prototype.getTrabajadores = function () {
	return this._getTrabajadores;
};

Proyecto.prototype.setTrabajadores = function (trabajadores) {
	this._setTrabajadores = trabajadores;
};

Proyecto.prototype.getInfo = function () {
	return this._getInfo;
};

Proyecto.prototype.getTrabajador = function (nombre) {
	return this._getTrabajadores.find(
		(trabajador) => trabajador._nombre === nombre
	);
};

export function Trabajador(nombre, rut, cargo) {
	this._nombre = nombre;
	this._rut = rut;
	this._cargo = cargo;

	Object.defineProperty(this, '_getNombre', {
		get: function () {
			return this._nombre;
		},
	});

	Object.defineProperty(this, '_setNombre', {
		set: function (nombre) {
			this._nombre = nombre;
		},
	});

	Object.defineProperty(this, '_getRut', {
		get: function () {
			return this._rut;
		},
	});

	Object.defineProperty(this, '_setRut', {
		set: function (rut) {
			this._rut = rut;
		},
	});

	Object.defineProperty(this, '_getCargo', {
		get: function () {
			return this._cargo;
		},
	});

	Object.defineProperty(this, '_setCargo', {
		set: function (cargo) {
			this._cargo = cargo;
		},
	});

	Object.defineProperty(this, '_getInfo', {
		get: function () {
			if (
				this._nombre === undefined ||
				this._nombre === null ||
				this._nombre === '' ||
				this._nombre.length < 1 ||
				this._rut === undefined ||
				this._rut === null ||
				this._rut === '' ||
				this._rut.length < 8 ||
				this._cargo === undefined ||
				this._cargo === null ||
				this._cargo === ''
			)
				return 'No se puede obtener información del trabajador';

			return {
				nombre: this._nombre,
				rut: this._rut,
				cargo: this._cargo,
			};
		},
	});
}

Trabajador.prototype.getNombre = function () {
	return this._getNombre;
};

Trabajador.prototype.setNombre = function (nombre) {
	this._setNombre = nombre;
};

Trabajador.prototype.getRut = function () {
	return this._getRut;
};

Trabajador.prototype.setRut = function (rut) {
	this._setRut = rut;
};

Trabajador.prototype.getCargo = function () {
	return this._getCargo;
};

Trabajador.prototype.setCargo = function (cargo) {
	this._setCargo = cargo;
};

Trabajador.prototype.getInfo = function () {
	return this._getInfo;
};
