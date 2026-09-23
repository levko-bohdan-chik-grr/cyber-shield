const scenarios = [
    {
        category: "Фінтех / Банки",
        text: "Тобі надходить SMS: 'Vash rahunok zablokovano. Termovo zatverdit danyy за posylkoyu: http://p24-secure-online.com'. Дії?",
        isScam: true,
        explanation: "Класичний фішинг. Банки ніколи не надсилають посилання на сторонні домени для розблокування рахунків."
    },
    {
        category: "Державні послуги",
        text: "Сповіщення в Дії: 'Вам нараховано грошову допомогу від ЄС. Натисніть детальніше для виплати'.",
        isScam: false,
        explanation: "Офіційні сповіщення приходять всередині самого додатку Дія без сторонніх посилань і вимагання даних картки."
    },
    {
        category: "Маркетплейси",
        text: "Покупець на OLX пише в месенджер і просить перейти за посиланням на 'OLX Доставка', щоб отримати кошти за ваш товар.",
        isScam: true,
        explanation: "Шахраї намагаються виманити реквізити картки (CVV, термін дії) через фейкові копії платіжних систем."
    },
    {
        category: "Соціальні мережі",
        text: "Пише друг у Telegram: 'Привіт, позич 500 грн до вечора, терміново кинь на цю картку'.",
        isScam: true,
        explanation: "Акаунт друга міг бути зламаний. Завжди краще передзвонити людині голосом, перш ніж переказувати гроші."
    }
];

let currentScenarioIndex = 0;
let stats = { total: 0, score: 0 };

$(document).ready(function() {
    $('.nav-btn').on('click', function() {
        $('.nav-btn').removeClass('active');
        $('.tab-content').removeClass('active');
        
        $(this).addClass('active');
        const targetId = $(this).attr('data-tab');
        $('#' + targetId).addClass('active');
    });

    function loadScenario() {
        const current = scenarios[currentScenarioIndex];
        $('#scenario-category').text(current.category);
        $('#scenario-text').text(current.text);
        $('#feedback-box').addClass('hidden');
        $('#scenario-box').fadeIn(300);
    }

    function handleAnswer(userChoice) {
        const current = scenarios[currentScenarioIndex];
        const isCorrect = (userChoice === current.isScam);

        stats.total++;
        if (isCorrect) stats.score++;
        updateStatsDisplay();

        $('#scenario-box').fadeOut(200, function() {
            $('#feedback-box').removeClass('hidden');
        });

        if (isCorrect) {
            $('#feedback-title').text("✅ Чудово! Ти вгадав");
            $('#feedback-box').css('border-left-color', "#22c55e");
        } else {
            $('#feedback-title').text("❌ Помилка! Це пастка");
            $('#feedback-box').css('border-left-color', "#ef4444");
        }
        $('#feedback-text').text(current.explanation);
    }

    function updateStatsDisplay() {
        $('#stat-total').text(stats.total);
        $('#stat-score').text(stats.score);
    }

    $('#btn-scam').on('click', () => handleAnswer(true));
    $('#btn-safe').on('click', () => handleAnswer(false));

    $('#next-btn').on('click', function() {
        currentScenarioIndex = (currentScenarioIndex + 1) % scenarios.length;
        loadScenario();
    });

    $('.acc-header').on('click', function() {
        const body = $(this).next('.acc-body');
        $('.acc-body').not(body).slideUp(200);
        body.slideToggle(200);
    });

    $('#report-form').on('submit', function(e) {
        e.preventDefault();
        const email = $('#user-email').val();
        const desc = $('#report-desc').val();

        if (email && desc) {
            $('#form-msg').removeClass('hidden').hide().fadeIn(300);
            this.reset();
            setTimeout(() => {
                $('#form-msg').fadeOut(300, function() {
                    $(this).addClass('hidden').show();
                });
            }, 4000);
        }
    });

    loadScenario();
});