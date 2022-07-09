const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
];

// Находим контейнеры
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

// Задаем индекс для вопросов и баллов
let questionIndex = 0;
let score = 0;

// последовательность выполнение функций = очищаем разметку, заполняем разметку, при клике проверяем ответ
clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

// очищаем разметку
function clearPage() {

	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';

}

// заполняем разметку
function showQuestion() {

	headerContainer.insertAdjacentHTML('beforeEnd',
		`
			<h2 class="title">${questions[questionIndex]['question']}</h2>
	`)

	let answerIndex = 1; // value ответа

	for(answerText of questions[questionIndex]['answers']) {
		
		listContainer.insertAdjacentHTML('beforeEnd',
		`
			<li>
				<label>
					<input value="${answerIndex++}" type="radio" class="answer" name="answer" />
					<span>${answerText}</span>
				</label>
			</li>
		`)

	}

}

// проверка ответа
function checkAnswer() {
	
	const	checkedRadio = listContainer.querySelector('input[type="radio"]:checked'); // выбранный ответ

	if (!checkedRadio) { // если не выбран ответ
		submitBtn.blur();
		return
	}

	const userAnswer = +checkedRadio.value // value ответа в числе

	if ( userAnswer === questions[questionIndex]['correct'] ) { // если value равняется правильному ответу
		score++; // добовляем балл
	}

	if (questionIndex !== questions.length -1) { // если вопрос не последний
		questionIndex++;
		clearPage();
		showQuestion();
	} else { // если вопрос последний
		clearPage();
		showResults();
	}

}

// показываем результат
function showResults() {

	let title, message;

	if (score === questions.length) {
		title = 'Поздравляем!';
		message = 'Вы ответили верно на все вопросы';
	} else if( (score * 100) / questions.length >= 50 ) {
		title = 'Неплохой результат!';
		message = 'Вы дали более половины правильных ответов';
	} else {
		title = 'Стоит постораться!';
		message = 'Пока у Вас меньше половины правильных ответов';
	}

	headerContainer.insertAdjacentHTML('beforeEnd',
		`
			<h2 class="title">${title}</h2>
			<h3 class="summary">${message}</h3>
			<p class="result">${score} из ${questions.length}</p>	
	`)

	submitBtn.innerText = 'Играть снова'
	submitBtn.onclick = () => history.go();

}
