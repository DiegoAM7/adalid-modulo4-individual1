function Consultorio(nombre, pacientes) {
	let _nombre = nombre;
	let _pacientes = pacientes || [];

	Object.defineProperty(this, '_getNombre', {
		get: function () {
			if (
				_nombre === undefined ||
				_nombre === null ||
				_nombre === '' ||
				_nombre.length < 1
			)
				return 'Nombre no definido';

			return _nombre;
		},
	});

	Object.defineProperty(this, '_setNombre', {
		set: function (nombre) {
			if (
				nombre === undefined ||
				nombre === null ||
				nombre === '' ||
				nombre.length < 1
			)
				throw new Error('Nombre no puede estar vacío');

			_nombre = nombre;
		},
	});

	Object.defineProperty(this, '_getPacientes', {
		get: function () {
			if (_pacientes.length === 0) return 'No hay pacientes';

			return _pacientes;
		},
	});

	Object.defineProperty(this, '_setPacientes', {
		set: function (paciente) {
			if (
				paciente === undefined ||
				paciente === null ||
				paciente === '' ||
				paciente.length < 1
			)
				throw new Error('No se puede agregar un paciente vacío');

			_pacientes.push(paciente);
		},
	});

	Object.defineProperty(this, '_getTodosPacientes', {
		get: function () {
			if (_pacientes.length === 0) return 'No hay pacientes';

			return _pacientes.map((paciente) => paciente.getInfo());
		},
	});
}

Consultorio.prototype.getPacientes = function () {
	return this._getPacientes;
};

Consultorio.prototype.setPacientes = function (paciente) {
	this._setPacientes = paciente;
};

Consultorio.prototype.getNombre = function () {
	return this._getNombre;
};

Consultorio.prototype.setNombre = function (nombre) {
	this._setNombre = nombre;
};

Consultorio.prototype.getPacientePorNombre = function (nombre) {
	const paciente = this.getPacientes().find(
		(paciente) => paciente.getNombre() === nombre
	);

	if (paciente === undefined) return 'No se encontró el paciente';

	return paciente.getInfo();
};

Consultorio.prototype.getTodosPacientes = function () {
	return this._getTodosPacientes;
};

function Paciente(nombre, edad, rut, diagnostico) {
	let _nombre = nombre;
	let _edad = edad;
	let _rut = rut;
	let _diagnostico = diagnostico;

	Object.defineProperty(this, '_getNombre', {
		get: function () {
			if (
				_nombre === undefined ||
				_nombre === null ||
				_nombre === '' ||
				_nombre.length < 1
			)
				return 'Nombre no definido';

			return _nombre;
		},
	});

	Object.defineProperty(this, '_setNombre', {
		set: function (nombre) {
			if (
				nombre === undefined ||
				nombre === null ||
				nombre === '' ||
				nombre.length < 1
			)
				throw new Error('Nombre no puede estar vacío');

			_nombre = nombre;
		},
	});

	Object.defineProperty(this, '_getEdad', {
		get: function () {
			if (
				_edad === undefined ||
				_edad === null ||
				_edad === '' ||
				_edad < 0 ||
				_edad === NaN ||
				_edad === Infinity
			)
				return 'Edad no definida';

			return _edad;
		},
	});

	Object.defineProperty(this, '_setEdad', {
		set: function (edad) {
			if (
				edad === undefined ||
				edad === null ||
				edad === '' ||
				edad < 0 ||
				edad === NaN ||
				edad === Infinity
			)
				throw new Error('Edad debe ser un número');

			_edad = edad;
		},
	});

	Object.defineProperty(this, '_getRut', {
		get: function () {
			if (_rut === undefined || _rut === null || _rut === '' || _rut.length < 8)
				return _rut;
		},
	});

	Object.defineProperty(this, '_setRut', {
		set: function (rut) {
			if (rut === undefined || rut === null || rut === '' || rut.length < 8)
				_rut = rut;
		},
	});

	Object.defineProperty(this, '_getDiagnostico', {
		get: function () {
			if (
				_diagnostico === undefined ||
				_diagnostico === null ||
				_diagnostico === ''
			)
				return 'Diagnóstico no definido';

			return _diagnostico;
		},
	});

	Object.defineProperty(this, '_setDiagnostico', {
		set: function (diagnostico) {
			if (
				diagnostico === undefined ||
				diagnostico === null ||
				diagnostico === ''
			)
				throw new Error('Diagnóstico no puede estar vacío');

			_diagnostico = diagnostico;
		},
	});

	Object.defineProperty(this, '_getInfo', {
		get: function () {
			if (
				_nombre === undefined ||
				_nombre === null ||
				_nombre === '' ||
				_nombre.length < 1 ||
				_edad === undefined ||
				_edad === null ||
				_edad === '' ||
				_edad < 0 ||
				_edad === NaN ||
				_edad === Infinity ||
				_rut === undefined ||
				_rut === null ||
				_rut === '' ||
				_rut.length < 8 ||
				_diagnostico === undefined ||
				_diagnostico === null ||
				_diagnostico === ''
			)
				return 'No se puede obtener información del paciente';

			return {
				nombre: _nombre,
				edad: _edad,
				rut: _rut,
				diagnostico: _diagnostico,
			};
		},
	});
}

Paciente.prototype.getNombre = function () {
	return this._getNombre;
};

Paciente.prototype.setNombre = function (nombre) {
	this._setNombre = nombre;
};

Paciente.prototype.getEdad = function () {
	return this._getEdad;
};

Paciente.prototype.setEdad = function (edad) {
	this._setEdad = edad;
};

Paciente.prototype.getRut = function () {
	return this._getRut;
};

Paciente.prototype.setRut = function (rut) {
	this._setRut = rut;
};

Paciente.prototype.getDiagnostico = function () {
	return this._getDiagnostico;
};

Paciente.prototype.setDiagnostico = function (diagnostico) {
	this._setDiagnostico = diagnostico;
};

Paciente.prototype.getInfo = function () {
	const info = this._getInfo;
	return info;
};

const consultorio = new Consultorio('Consultorio 1');

const paciente1 = new Paciente('Paciente 1', 20, '11111111-1', 'Diagnostico 1');
const paciente2 = new Paciente('Paciente 2', 30, '22222222-2', 'Diagnostico 2');
const paciente3 = new Paciente('Paciente 3', 40, '33333333-3', 'Diagnostico 3');

consultorio.setPacientes(paciente1);
consultorio.setPacientes(paciente2);
consultorio.setPacientes(paciente3);

const pacientes = consultorio.getPacientes();

console.log(
	'Búsqueda por nombre',
	consultorio.getPacientePorNombre('Paciente 3')
);

console.log('Todos los pacientes', consultorio.getTodosPacientes());
