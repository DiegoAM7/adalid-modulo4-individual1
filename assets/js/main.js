import { Proyecto, Trabajador } from './Proyecto.js';

const proyectos = [];

document.addEventListener('DOMContentLoaded', function () {
	const nombreProyecto = document.querySelector('#nombreProyecto');
	const select = document.querySelector('#proyecto');
	const nombreTrabajador = document.querySelector('#nombreTrabajador');
	const rutTrabajador = document.querySelector('#rutTrabajador');
	const cargoTrabajador = document.querySelector('#cargoTrabajador');
	const btnAgregarProyecto = document.querySelector('#agregarProyecto');
	const btnAgregarTrabajador = document.querySelector('#agregarTrabajador');
	const tablas = document.querySelector('#tablas');

	const guardarLocalStorage = () => {
		localStorage.setItem('proyectos', JSON.stringify(proyectos));
	};

	const cargarLocalStorage = () => {
		console.log('cargando');
		const proyectosLS = JSON.parse(localStorage.getItem('proyectos'));

		if (proyectosLS) {
			proyectosLS.map((proyecto) => {
				const proyectoObj = new Proyecto(proyecto._nombre);

				proyecto._trabajadores.map((trabajador) => {
					const trabajadorObj = new Trabajador(
						trabajador._nombre,
						trabajador._rut,
						trabajador._cargo
					);

					proyectoObj.setTrabajadores(trabajadorObj);
				});

				proyectos.push(proyectoObj);
			});
		}

		actualizarTablas();
		actualizarSelect();
		cargarBotonEliminar();
	};

	const borrarProyecto = (index) => {
		proyectos.splice(index, 1);

		actualizarTablas();
		actualizarSelect();
		cargarBotonEliminar();
		guardarLocalStorage();
	};

	const actualizarTablas = () => {
		tablas.innerHTML = '';

		proyectos.map((proyecto, index) => {
			const table = document.createElement('table');
			const thead = document.createElement('thead');
			const tbody = document.createElement('tbody');
			const tr = document.createElement('tr');
			const thNombre = document.createElement('th');
			const thRut = document.createElement('th');
			const thCargo = document.createElement('th');
			const caption = document.createElement('caption');

			table.id = `tabla-${index + 1}`;

			caption.textContent = proyecto._nombre;
			table.appendChild(caption);

			thNombre.textContent = 'Nombre';
			thRut.textContent = 'Rut';
			thCargo.textContent = 'Cargo';

			tr.appendChild(thNombre);
			tr.appendChild(thRut);
			tr.appendChild(thCargo);

			thead.appendChild(tr);
			table.appendChild(thead);

			if (proyecto._trabajadores.length > 0) {
				proyecto._trabajadores.map((trabajador) => {
					const tr = document.createElement('tr');
					const tdNombre = document.createElement('td');
					const tdRut = document.createElement('td');
					const tdCargo = document.createElement('td');

					tdNombre.textContent = trabajador._nombre;
					tdRut.textContent = trabajador._rut;
					tdCargo.textContent = trabajador._cargo;

					tr.appendChild(tdNombre);
					tr.appendChild(tdRut);
					tr.appendChild(tdCargo);

					tbody.appendChild(tr);
					table.appendChild(tbody);
				});
			} else {
				const tfoot = document.createElement('tfoot');
				const tr = document.createElement('tr');
				const td = document.createElement('td');

				td.textContent = 'No hay trabajadores';

				td.colSpan = 3;
				td.classList.add('text-center');
				td.classList.add('h2');

				tr.appendChild(td);
				tfoot.appendChild(tr);
				table.appendChild(tfoot);
			}

			tablas.appendChild(table);

			// Estilos
			table.classList.add('table');
			table.classList.add('table-striped');
			table.classList.add('table-hover');
			table.classList.add('caption-top');

			thead.classList.add('table-dark');

			tablas.innerHTML += `
			<form name="${index}" id="btnBorrar" class="d-flex justify-content-between align-items-center">
				<h2>${proyecto._nombre}</h2>
				<button type="submit" class="btn btn-danger" id="borrar-${
					index + 1
				}">Borrar</button>
			</form>
			`;
		});
	};

	const actualizarSelect = () => {
		select.innerHTML =
			'<option selected disabled value="0">Seleccione un proyecto</option>';

		proyectos.map((proyecto) => {
			const option = document.createElement('option');
			option.textContent = proyecto._nombre;
			select.appendChild(option);
		});
	};

	const cargarBotonEliminar = () => {
		const btnBorrar = document.querySelectorAll('#btnBorrar');

		btnBorrar.forEach((btn) => {
			btn.addEventListener('submit', function (e) {
				e.preventDefault();
				const index = btn.children[1].id.split('-')[1] - 1;

				borrarProyecto(index);
			});
		});
	};

	cargarLocalStorage();

	btnAgregarProyecto.addEventListener('submit', function (e) {
		e.preventDefault();

		if (nombreProyecto.value.trim() === '') {
			alert('El nombre del proyecto no puede estar vacio');
			return;
		}

		const proyecto = new Proyecto(nombreProyecto.value.trim());
		proyectos.push(proyecto);

		nombreProyecto.value = '';

		actualizarTablas();
		actualizarSelect();
		cargarBotonEliminar();
		guardarLocalStorage();
	});

	btnAgregarTrabajador.addEventListener('submit', function (e) {
		e.preventDefault();
		const proyecto = proyectos.find(
			(proyecto) => proyecto._nombre === select.value
		);

		if (nombreTrabajador.value.trim() === '') {
			alert('El nombre del trabajador no puede estar vacio');
			return;
		}

		if (rutTrabajador.value.trim() === '') {
			alert('El rut del trabajador no puede estar vacio');
			return;
		}

		if (cargoTrabajador.value.trim() === '') {
			alert('El cargo del trabajador no puede estar vacio');
			return;
		}

		const trabajador = new Trabajador(
			nombreTrabajador.value,
			rutTrabajador.value,
			cargoTrabajador.value
		);

		proyecto.setTrabajadores(trabajador);

		actualizarTablas();
		actualizarSelect();
		cargarBotonEliminar();
		guardarLocalStorage();
		nombreTrabajador.value = '';
		rutTrabajador.value = '';
		cargoTrabajador.value = '';
	});
});
