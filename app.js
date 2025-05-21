document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const thoughtsContainer = document.getElementById('thoughts-container');
    const mainScreen = document.getElementById('main-screen');
    const loadingIndicator = document.getElementById('loading');
    const paginationContainer = document.getElementById('pagination-container');
    
    // Telegram WebApp initialization
    let tg = window.Telegram?.WebApp;
    if (tg) {
        tg.expand();
        tg.ready();
        // Set theme based on Telegram theme
        if (tg.colorScheme === 'dark') {
            document.documentElement.classList.add('dark');
        }
        // Use Telegram's main button if available
        if (tg.MainButton) {
            tg.MainButton.setText('Вернуться к списку');
            tg.MainButton.onClick(function() {
                flipAllCardsBack();
            });
        }
    }

    // Show loading indicator
    function showLoading() {
        loadingIndicator.classList.remove('hidden');
    }

    // Hide loading indicator
    function hideLoading() {
        loadingIndicator.classList.add('hidden');
    }
    
    // Data structure for thoughts and responses
    const thoughtsAndResponses = [
        // Страница 1
        {
            thought: "Я не заслуживаю любви",
            response: "Это не истина. Это след того, как к Вам когда-то относились. Уважение к себе начинается не с доказательств, а с отказа верить в приговоры, пришедшие извне."
        },
        {
            thought: "Я больше не верю в себя",
            response: "Это не крах. Это усталость. Она говорит голосом: «бессмысленно». Но это не Вы. Вы дошли до точки, где невозможно больше врать себе. А значит, началась правда."
        },
        {
            thought: "Никому не нужен мой голос",
            response: "Возможно, Вы слишком долго подавляли себя. Но голос не даётся тем, кого уже услышали. Он даётся тем, кто готов звучать."
        },
        {
            thought: "Я боюсь всё потерять",
            response: "Это не страх потери, а страх пустоты после. Но в этой пустоте впервые может появиться настоящий Вы."
        },
        {
            thought: "Зависимость неизлечима",
            response: "Так говорят те, кто не хочет меняться. Это не клеймо, а инструмент. Трезвость — не ограничение, а уважение к себе."
        },
        {
            thought: "Я всех подвёл(а)",
            response: "Возможно. Но жизнь в этом чувстве — выбор. Признать вину — не значит стать ею навсегда."
        },
        {
            thought: "Я не справлюсь один(а)",
            response: "Быть одному — не значит быть без опоры. Опора может быть внутри и снаружи, если позволить себе звать."
        },
        {
            thought: "Всё бессмысленно",
            response: "Так говорит мозг, уставший от борьбы. Смысл не приходит — его выращивают."
        },
        {
            thought: "Без него/неё я ничто",
            response: "Вы — не пустота. Просто, возможно, Вы ни разу не пробовали быть с собой по-настоящему."
        },
        {
            thought: "Всё происходящее — моя вина",
            response: "Это не вина, а последствия. Ваша сила — не в самонаказании, а в действиях."
        },
        {
            thought: "Если всё отпустить — всё развалится",
            response: "Возможно, развалится то, что держалось на страхе. Живое не рушится от правды."
        },
        {
            thought: "Я должен(а) всё контролировать",
            response: "Контроль — это не безопасность. Это попытка удержать. Настоящая безопасность строится на доверии."
        },
        {
            thought: "Я остался(лась) один(а)",
            response: "Одиночество — не наказание. Это шанс услышать себя. Вы не пустота."
        },
        {
            thought: "Я устал(а) быть сильной",
            response: "\"Нельзя останавливаться\" — это не жизнь, а выживание. Усталость — это честно."
        },
        {
            thought: "Я беспомощен(на)",
            response: "Это не беспомощность. Это точка, где Вы не знаете следующий шаг. И именно здесь можно попросить помощи."
        },
        {
            thought: "Мне стыдно, что я снова здесь",
            response: "Стыд — это петля, в которую мы себя затягиваем. Вы вправе сказать: «Да, это моё сейчас. Но это не всё, чем я являюсь». И идти дальше."
        },
        // Страница 2
        {
            thought: "Я никогда не смогу измениться",
            response: "Изменение — это не рывок, а движение. Оно начинается не с веры, а с первого шага. Иногда сомнение — лучший спутник начала, потому что в нём уже есть желание."
        },
        {
            thought: "Я всё испортил(а)",
            response: "Возможно, были ошибки. Но испортить — не значит окончательно разрушить. Живое умеет восстанавливаться, если ему дать шанс."
        },
        {
            thought: "Я слишком слаб(а), чтобы выбраться",
            response: "Сила — это не героизм. Это выбор: вставать снова. И даже мысль «я слаб» уже требует мужества, чтобы её увидеть."
        },
        {
            thought: "Никто меня не поймёт",
            response: "Понятость — не всегда вопрос других. Иногда нужно рискнуть открыться, чтобы обнаружить: «со мной можно быть рядом»."
        },
        {
            thought: "Мне нельзя ошибаться",
            response: "Ошибки — не приговор, а материал для роста. Только в живом процессе есть возможность пересмотра. Без ошибок — только застой."
        },
        {
            thought: "Я должен(на) быть идеальным(ой)",
            response: "Идеал — это зеркало страха. Живой человек — не идеален. Он дышит, меняется, учится."
        },
        {
            thought: "Я не имею права на свои чувства",
            response: "Чувства — не каприз. Это язык вашей психики. Право чувствовать — базовое право быть."
        },
        {
            thought: "Если я покажу слабость — меня отвергнут",
            response: "Уязвимость — не слабость, а доверие. Те, кто рядом с вами по-настоящему, не отвернутся, увидев правду."
        },
        {
            thought: "Я слишком много требую",
            response: "Возможно, вы просто просите то, что никогда не получали. Просьба — это акт уважения к себе, а не эгоизм."
        },
        {
            thought: "Я уже потерян(а)",
            response: "Потеря — не финал. Это этап. Если вы это видите — значит, вы уже ищете путь."
        },
        {
            thought: "Я не справляюсь так, как другие",
            response: "У каждого свой ритм. Вы не обязаны соответствовать чьей-то скорости. Главное — не скорость, а направление."
        },
        {
            thought: "Меня любят за то, что я делаю, а не за то, кто я",
            response: "Возможно, вы долго подменяли ценность — полезностью. Но человек ценен не за вклад, а за сам факт своего существования."
        },
        {
            thought: "Если я скажу \"нет\" — меня не будут любить",
            response: "\"Нет\" — это форма заботы о себе. Умение отказывать — основа зрелых отношений, не их конец."
        },
        {
            thought: "Я не могу отпустить прошлое",
            response: "Прошлое — не клетка, а опыт. Отпустить — не значит забыть. Это значит выбрать двигаться."
        },
        {
            thought: "Я должен(на) сначала заслужить, чтобы жить спокойно",
            response: "Спокойствие — не награда. Это право. Вы не обязаны страдать, чтобы быть достойным(ой) отдыха и принятия."
        }
    ];
    
    // Pagination settings
    const itemsPerPage = 16;
    let currentPage = 1;
    const totalPages = Math.ceil(thoughtsAndResponses.length / itemsPerPage);    

    // Populate thoughts cards for current page
    function renderThoughts() {
        // Only show loading indicator when not paginating
        const isPaginating = arguments[0] === 'paginating';
        if (!isPaginating) {
            showLoading();
        }
        
        thoughtsContainer.innerHTML = '';
        
        // Calculate start and end index for current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, thoughtsAndResponses.length);
        
        // Render only thoughts for current page
        for (let i = startIndex; i < endIndex; i++) {
            const item = thoughtsAndResponses[i];
            
            // Create card container with animation
            const cardContainer = document.createElement('div');
            cardContainer.className = 'card-container animate-fade-in';
            
            // Create the flippable card
            const card = document.createElement('div');
            card.className = 'thought-card';
            card.dataset.index = i;
            
            // Create front side of card
            const cardFront = document.createElement('div');
            cardFront.className = 'card-front';
            cardFront.textContent = item.thought;
            
            // Create back side of card
            const cardBack = document.createElement('div');
            cardBack.className = 'card-back';
            cardBack.textContent = item.response;
            
            // Add front and back to the card
            card.appendChild(cardFront);
            card.appendChild(cardBack);
            
            // Add click event to flip the card
            card.addEventListener('click', () => flipCard(card));
            
            // Add card to container and container to thoughts container
            cardContainer.appendChild(card);
            thoughtsContainer.appendChild(cardContainer);
        }
        
        // Render pagination
        renderPagination();
        
        if (!isPaginating) {
            setTimeout(hideLoading, 300); // Give a moment to render
        }
    }
    
    // Render pagination controls
    function renderPagination() {
        paginationContainer.innerHTML = '';
        
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.className = i === currentPage 
                ? 'btn-page btn-page-active' 
                : 'btn-page';
            pageButton.textContent = i;
            pageButton.addEventListener('click', () => {
                if (i !== currentPage) {
                    // Simple page transition without animation and without loading indicator
                    currentPage = i;
                    renderThoughts('paginating');
                    hapticFeedback();
                    // Плавный скролл вверх
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
            paginationContainer.appendChild(pageButton);
        }
    }

    // Flip card function
    function flipCard(card) {
        // Toggle flipped class
        card.classList.toggle('flipped');
        
        // Provide haptic feedback
        hapticFeedback();
        
        // Check if any cards are flipped
        const flippedCards = document.querySelectorAll('.thought-card.flipped');
        
        // Убрали кнопку Telegram MainButton, так как она не нужна при использовании карточек-перевертышей
        if (tg && tg.MainButton) {
            tg.MainButton.hide();
        }
    }

    // Функция для переворота всех карточек обратно
    function flipAllCardsBack() {
        document.querySelectorAll('.thought-card.flipped').forEach(flippedCard => {
            flippedCard.classList.remove('flipped');
        });
        
        // Hide Telegram main button if available
        if (tg && tg.MainButton) {
            tg.MainButton.hide();
        }
    }

    // Handle haptic feedback for Telegram (if available)
    function hapticFeedback() {
        if (tg && tg.HapticFeedback) {
            tg.HapticFeedback.impactOccurred('light');
        }
    }
    
    // Add haptic feedback to all interactive elements
    document.querySelectorAll('.thought-card').forEach(el => {
        el.addEventListener('click', hapticFeedback);
    });
    
    // Event Listeners
    // Telegram MainButton обработчик удален, так как кнопка больше не используется
    
    // Initialize the app
    renderThoughts();
    
    // Handle back button in browser
    window.addEventListener('popstate', function(event) {
        // Если есть перевернутые карточки, переворачиваем их обратно
        const flippedCards = document.querySelectorAll('.thought-card.flipped');
        if (flippedCards.length > 0) {
            event.preventDefault();
            flipAllCardsBack();
        }
    });
});
