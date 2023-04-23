"use strict";

document.addEventListener("DOMContentLoaded", function() {
	// Опросник
	if ( document.querySelector('.quiz') ) {
		const questions = [
			{
				type: 'default',
				containerClass: 'quiz-input-list',
				question: 'Ваш пол:',
				answers: [
					{ name: 'Мужчина' },
					{ name: 'Женщина' },
				]
			},
			{
				type: 'default',
				containerClass: 'quiz-input-list',
				question: 'Укажите ваш возраст:',
				answers: [
					{ name: 'До 18' },
					{ name: 'От 18 до 28' },
					{ name: 'От 29 до 35' },
					{ name: 'От 29 до 35' },
					{ name: 'От 36' },
				]
			},
			{
				type: 'default',
				containerClass: 'quiz-input-list',
				question: 'Выберите лишнее:',
				answers: [
					{ name: 'Дом' },
					{ name: 'Шалаш' },
					{ name: 'Бунгало' },
					{ name: 'Скамейка' },
					{ name: 'Хижина' },
				]
			},
			{
				type: 'default',
				containerClass: 'quiz-input-list',
				question: 'Продолжите числовой ряд: 18 20 24 32',
				answers: [
					{ name: '62' },
					{ name: '48' },
					{ name: '74' },
					{ name: '57' },
					{ name: '60' },
					{ name: '77' },
				]
			},
			{
				type: 'colors',
				containerClass: 'quiz-colors',
				question: 'Выберите цвет, который сейчас наиболее Вам приятен:',
				answers: [
					{ name: 'gray', color: '#A8A8A8'},
					{ name: 'blue', color: '#0000A9' },
					{ name: 'green', color: '#00A701' },
					{ name: 'red', color: '#F60100' },
					{ name: 'yellow', color: '#FDFF19' },
					{ name: 'brown', color: '#A95403' },
					{ name: 'black', color: '#000000' },
					{ name: 'violet', color: '#850068' },
					{ name: 'cyan', color: '#46B2AC' },
				]
			},
			{
				type: 'colors',
				containerClass: 'quiz-colors',
				question: 'Отдохните пару секунд, еще раз Выберите цвет, который сейчас наиболее Вам приятен:',
				answers: [
					{ name: 'gray', color: '#A8A8A8'},
					{ name: 'cyan', color: '#46B2AC' },
					{ name: 'brown', color: '#A95403' },
					{ name: 'green', color: '#00A701' },
					{ name: 'black', color: '#000000' },
					{ name: 'red', color: '#F60100' },
					{ name: 'violet', color: '#850068' },
					{ name: 'yellow', color: '#FDFF19' },
					{ name: 'blue', color: '#0000A9' },
				]
			},
			{
				type: 'default',
				containerClass: 'quiz-input-list',
				question: 'Какой из городов лишний?',
				answers: [
					{ name: 'Вашингтон' },
					{ name: 'Лондон' },
					{ name: 'Париж' },
					{ name: 'Нью-Йорк' },
					{ name: 'Москва' },
					{ name: 'Оттава' },
				]
			},
			{
				type: 'image-blocks',
				containerClass: 'quiz-image-test',
				question: 'Выберите правильную фигуру из четырёх пронумерованных.',
				imagePath: 'images/quiz-01-185x235.jpg',
				listClass: 'quiz-block-list',
				answers: [
					{ name: '1' },
					{ name: '2' },
					{ name: '3' },
					{ name: '4' },
				]
			},
			{
				type: 'default',
				containerClass: 'quiz-input-list',
				question: 'Вам привычнее и важнее:',
				answers: [
					{ name: 'Наслаждаться каждой минутой проведенного времени' },
					{ name: 'Быть устремленными мыслями в будущее' },
					{ name: 'Учитывать в ежедневной практике прошлый опыт' },
				]
			},
			{
				type: 'default',
				containerClass: 'quiz-input-list',
				question: 'Какое определение, по-Вашему, больше подходит к этому геометрическому изображению: ',
				imagePath: 'images/quiz-02-173x115.jpg',
				answers: [
					{ name: 'Оно остроконечное' },
					{ name: 'Оно устойчиво' },
					{ name: 'Оно-находится в состоянии равновесия' },
				]
			},
			{
				type: 'image-blocks',
				containerClass: 'quiz-image-test',
				question: 'Вставьте подходящее число',
				imagePath: 'images/quiz-03-228x207.jpg',
				listClass: 'quiz-block-list',
				answers: [
					{ name: '34' },
					{ name: '36' },
					{ name: '53' },
					{ name: '44' },
					{ name: '66' },
					{ name: '44' },
				]
			},
		];

		// Определение переменных
		let questionCount = 0;
		let answers = [];

		// Получение узлов опросника
		const quiz = document.querySelector('.quiz');
		const quizContent = quiz.querySelector('.quiz-content')
		const quizHeader = quiz.querySelector('.quiz-question')
		const quizAnswers = quiz.querySelector('.quiz-answers');
		const quizBtn = quiz.querySelector('.quiz-btn')
		const quizProgress = quiz.querySelector('.quiz-progress')

		// Создание единичного инпута для варианта ответа
		function createInput( index, value ) {
			const input = document.createElement('input');
			input.type = 'radio';
			input.name = 'radio' + index;
			input.value = value;
			return input;
		}

		// Создание дефолтных ответов
		function createDefaultList( obj ) {
			const container = document.createElement('div');
			container.classList.add( obj.containerClass );
			if ( obj.imagePath ) {
				const image = document.createElement('img');
				image.src = obj.imagePath;
				image.alt = '';
				container.appendChild( image );
			}

			obj.answers.forEach(function (item){
				const label = document.createElement('label');
				const input = createInput( questionCount, item.name );
				const span = document.createElement('span');
				span.textContent = item.name;

				label.appendChild( input );
				label.appendChild( span );
				container.appendChild( label );
			})

			return container;
		}

		// Создание ответов по цвету
		function createColorsList( obj ) {
			const container = document.createElement('div');
			container.classList.add( obj.containerClass );

			obj.answers.forEach(function (item){
				const label = document.createElement('label');
				const input = createInput( questionCount, item.name );
				input.style.backgroundColor = item.color;

				label.appendChild( input );
				container.appendChild( label );
			})

			return container;
		}

		// Создание ответов с картинкой и выбором
		function createImageBlocks( obj ) {
			const container = document.createElement('div');
			container.classList.add( obj.containerClass );
			const image = document.createElement('img');
			image.src = obj.imagePath;
			image.alt = '';
			const containerList = document.createElement('div');
			containerList.classList.add( obj.listClass );

			obj.answers.forEach(function (item){
				const label = document.createElement('label');
				const span = document.createElement('span');
				span.textContent = item.name;
				const input = createInput( questionCount, item.name );

				label.appendChild( input );
				label.appendChild( span );
				containerList.appendChild( label );
			})

			container.appendChild( image );
			container.appendChild( containerList );

			return container;
		}

		// Выбор создаваемого типа ответов
		function createQuestion( obj ) {
			if ( obj.type === 'default' ) {
				return createDefaultList( obj );
			} else if ( obj.type === 'colors' ) {
				return createColorsList( obj );
			} else if ( obj.type === 'image-blocks' ) {
				return createImageBlocks( obj );
			}
		}

		// Отрисовка вопроса и вариантов ответа
		function questionsRender() {
			quizAnswers.innerHTML = '';
			quizAnswers.appendChild( createQuestion( questions[questionCount] ) );
			quizHeader.innerHTML = ( questions[questionCount].question );
		}

		// Отрисовка прогреса
		function progressRender() {
			const progressBar = quizProgress.querySelector('.quiz-progress-bar');
			progressBar.style.width = (questionCount / questions.length) * 100 + '%';
		}

		// Получение списка инпутов
		function getInputsList() {
			return quizAnswers.querySelectorAll('input');
		}

		// Получение значения выбраного инпута
		function getCheckedValue() {
			let activeInputValue;
			let inputs = getInputsList();
			inputs = Array.from( inputs );
			inputs.forEach(function (item){
				if ( item.checked ) {
					activeInputValue = item.value
				}
			})
			return activeInputValue;
		}

		// Переключение активного состояния кнопки, в зависимости выбран ли какой-то инпут
		function toggleBtnState( nodes ) {
			nodes.forEach(function (input) {
				input.addEventListener('change', function () {
					quizBtn.disabled = false;
				})
			})
		}

		// Симуляция обработки результатов опроса
		function calcResult() {
			quizContent.innerHTML = `
			<div class="quiz-calc-title">Обработка результатов</div>
			<div class="quiz-calc-loader"></div>
			<div class="quiz-calc-text">Определение стиля мышления...</div>
		`;

			showResults();
		}

		// Переход на страницу результатов
		function showResults() {
			setTimeout(function () {
				window.location.href = "results.html";
			}, 1500)
		}

		// Отрисовка вопросов при первой загрузке страницы
		questionsRender();

		// Переключение кнопки в состояние "неактивная"
		quizBtn.disabled = true;

		// Получение списка инпутов
		let inputs = getInputsList();
		toggleBtnState( inputs );

		// Отслеживание клика на кнопке "Далее"
		quizBtn.addEventListener('click', function () {
			// Создание объекта для записи выбраных ответов
			let tmpObj = {};
			// Увеличение значения счетчика номера текущего вопроса при клике
			questionCount++;
			// Отрисовка прогресса
			progressRender();

			if ( questionCount < questions.length ) {
				// Запись в объект с ответами: id ответа, сам вопрос, ответ
				tmpObj.id = questionCount - 1;
				tmpObj.question = questions[questionCount - 1].question;
				tmpObj.answer = getCheckedValue();

				// Добавление объекта с ответами в результирующий массив
				answers.push( tmpObj );

				// Отрисовка следующего вопроса
				questionsRender();

				// Обновление списка инпутов
				inputs = getInputsList();
				toggleBtnState( inputs );

				// Переключение кнопки в состояние "неактивная"
				quizBtn.disabled = true;
			} else {
				// Если закончились вопросы - вывести результат
				calcResult()
			}
		})
	}

	// Кнопка "позвонить" с выводом результата
	if ( document.querySelector('.call-button') ) {
		let callBtn = document.querySelector('.call-button');
		let callResults = document.querySelector('.call-results');

		// Функция создания строк таблицы с полученым результатом
		// Возвращает готовую строку таблицы с двумя колонками с полученными данными: "Название" "Значение"
		function createTableRow( colName, colValue ) {
			const tableRow = document.createElement('tr');
			const tableColName = document.createElement('td');
			const tableColValue = document.createElement('td');
			tableColName.textContent = colName;
			tableColValue.textContent = colValue[0].toUpperCase() + colValue.slice(1);
			tableRow.appendChild( tableColName );
			tableRow.appendChild( tableColValue );
			return tableRow;
		}

		// Слушатель событий на кнопке "Позвонить"
		callBtn.addEventListener('click', function () {
			// Запрос на сервер
			fetch('https://swapi.dev/api/people/1/')
				.then(response => response.json())
				.then(data => {
					// Создаем элемент "таблица", в нее заполним полученные данные
					const table = document.createElement('table');
					table.classList.add('call-table');

					// Создаем элемент "тело таблицы"
					const tableBody = document.createElement('tbody');

					// Создаем и добавляем в тело таблицы строки с данными
					tableBody.appendChild( createTableRow( 'Name', data.name ) );
					tableBody.appendChild( createTableRow( 'Gender', data.gender ) );
					tableBody.appendChild( createTableRow( 'Birth year', data.birth_year ) );
					tableBody.appendChild( createTableRow( 'Height', data.height ) );
					tableBody.appendChild( createTableRow( 'Mass', data.mass ) );
					tableBody.appendChild( createTableRow( 'Hair color', data.hair_color ) );
					tableBody.appendChild( createTableRow( 'Eye color', data.eye_color ) );

					// Добавляем в таблицу "тело"
					table.appendChild( tableBody );

					// Добавляем таблицу на страницу
					callResults.innerHTML = '';
					callResults.appendChild( table );
				})
				.catch(error => console.error(error));
		})
	}

	// Меню
	if ( document.querySelector('.menu') ) {
		let menu = document.querySelector('.menu');
		let menuToggle = menu.querySelector('.menu-toggle');
		let menuClose = menu.querySelector('.menu-close');
		let menuNavigation = menu.querySelector('.menu-navigation');

		// Отображение меню при клике на "гамбургер"
		menuToggle.addEventListener('click', function () {
			menuNavigation.classList.add( 'open' )
		})

		// Скрытие меню при клике на кнопку "закрыть"
		menuClose.addEventListener('click', function () {
			menuNavigation.classList.remove( 'open' )
		})
	}
})