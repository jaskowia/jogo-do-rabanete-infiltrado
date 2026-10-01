/* =====================================================
   ARM WARS 2D
   QUEDA DE BRAÇO - 2 JOGADORES
   ===================================================== */


/* =====================================================
   ELEMENTOS
   ===================================================== */

const menuScreen =
    document.getElementById("menuScreen");

const gameScreen =
    document.getElementById("gameScreen");

const resultScreen =
    document.getElementById("resultScreen");

const modeOptions =
    document.getElementById("modeOptions");

const weightOptions =
    document.getElementById("weightOptions");

const startButton =
    document.getElementById("startButton");

const againButton =
    document.getElementById("againButton");

const menuButton =
    document.getElementById("menuButton");

const timerElement =
    document.getElementById("timer");

const modeDisplay =
    document.getElementById("modeDisplay");

const fightMessage =
    document.getElementById("fightMessage");

const clicks1Element =
    document.getElementById("clicks1");

const clicks2Element =
    document.getElementById("clicks2");

const power1Element =
    document.getElementById("power1");

const power2Element =
    document.getElementById("power2");

const armLeft =
    document.getElementById("armLeft");

const armRight =
    document.getElementById("armRight");

const winnerName =
    document.getElementById("winnerName");

const winnerDescription =
    document.getElementById("winnerDescription");

const finalClicks1 =
    document.getElementById("finalClicks1");

const finalClicks2 =
    document.getElementById("finalClicks2");


/* =====================================================
   MODALIDADES
   ===================================================== */

const modes = [

    {
        id: "classic",
        name: "Classic",
        description: "Equilíbrio entre força e velocidade.",
        multiplier: 1
    },

    {
        id: "speed",
        name: "Speed Fight",
        description: "Clique rápido recebe bônus.",
        multiplier: 1.15
    },

    {
        id: "power",
        name: "Power Fight",
        description: "Cada clique possui mais impacto.",
        multiplier: 1.3
    },

    {
        id: "endurance",
        name: "Endurance",
        description: "A luta possui mais resistência.",
        multiplier: .85
    }

];


/* =====================================================
   CATEGORIAS DE PESO
   Inspiradas nas divisões do UFC.
   ===================================================== */

const weightClasses = [

    {
        id: "flyweight",
        name: "Peso Mosca",
        description: "Leve e extremamente veloz.",
        strength: .85,
        speed: 1.35
    },

    {
        id: "bantamweight",
        name: "Peso Galo",
        description: "Velocidade elevada.",
        strength: .9,
        speed: 1.25
    },

    {
        id: "featherweight",
        name: "Peso Pena",
        description: "Equilíbrio entre força e velocidade.",
        strength: .95,
        speed: 1.15
    },

    {
        id: "lightweight",
        name: "Peso Leve",
        description: "Combinação equilibrada.",
        strength: 1,
        speed: 1
    },

    {
        id: "welterweight",
        name: "Peso Meio-Médio",
        description: "Mais potência nos golpes.",
        strength: 1.05,
        speed: .95
    },

    {
        id: "middleweight",
        name: "Peso Médio",
        description: "Força e resistência.",
        strength: 1.12,
        speed: .9
    },

    {
        id: "light-heavyweight",
        name: "Meio-Pesado",
        description: "Grande força física.",
        strength: 1.2,
        speed: .82
    },

    {
        id: "heavyweight",
        name: "Peso Pesado",
        description: "Máxima potência.",
        strength: 1.3,
        speed: .72
    }

];


/* =====================================================
   ESTADO
   ===================================================== */

let selectedMode =
    modes[0];

let selectedWeight =
    weightClasses[3];

let gameRunning =
    false;

let gameFinished =
    false;

let countdown =
    10;

let timer =
    null;

let player1Clicks =
    0;

let player2Clicks =
    0;

let progress =
    0;

let lastPlayer =
    0;

let lastClickTime1 =
    0;

let lastClickTime2 =
    0;


/* =====================================================
   RENDERIZAR MODALIDADES
   ===================================================== */

function renderModes() {

    modeOptions.innerHTML = "";

    modes.forEach(
        mode => {

            const option =
                document.createElement("div");

            option.className =
                "option";

            if (
                mode.id ===
                selectedMode.id
            ) {

                option.classList.add(
                    "active"
                );

            }

            option.innerHTML = `
                <strong>${mode.name}</strong>
                <small>${mode.description}</small>
            `;

            option.addEventListener(
                "click",
                () => {

                    selectedMode =
                        mode;

                    renderModes();

                }
            );

            modeOptions.appendChild(
                option
            );

        }
    );

}


/* =====================================================
   RENDERIZAR PESOS
   ===================================================== */

function renderWeights() {

    weightOptions.innerHTML = "";

    weightClasses.forEach(
        weight => {

            const option =
                document.createElement("div");

            option.className =
                "option";

            if (
                weight.id ===
                selectedWeight.id
            ) {

                option.classList.add(
                    "active"
                );

            }

            option.innerHTML = `
                <strong>${weight.name}</strong>
                <small>${weight.description}</small>
            `;

            option.addEventListener(
                "click",
                () => {

                    selectedWeight =
                        weight;

                    renderWeights();

                }
            );

            weightOptions.appendChild(
                option
            );

        }
    );

}


/* =====================================================
   RESETAR PARTIDA
   ===================================================== */

function resetGame() {

    clearInterval(timer);

    countdown =
        10;

    player1Clicks =
        0;

    player2Clicks =
        0;

    progress =
        0;

    lastPlayer =
        0;

    lastClickTime1 =
        0;

    lastClickTime2 =
        0;

    gameRunning =
        false;

    gameFinished =
        false;

    clicks1Element.textContent =
        "0";

    clicks2Element.textContent =
        "0";

    power1Element.style.width =
        "50%";

    power2Element.style.width =
        "50%";

    timerElement.textContent =
        "10";

    fightMessage.textContent =
        "PREPARE-SE!";

    resetArms();

}


/* =====================================================
   INICIAR PARTIDA
   ===================================================== */

function startGame() {

    resetGame();

    menuScreen.classList.add(
        "hidden"
    );

    resultScreen.classList.add(
        "hidden"
    );

    gameScreen.classList.remove(
        "hidden"
    );

    modeDisplay.textContent =
        selectedMode.name.toUpperCase();

    fightMessage.textContent =
        "3... 2... 1... VALENDO!";

    setTimeout(
        () => {

            if (
                gameFinished
            ) {

                return;

            }

            beginFight();

        },
        1500
    );

}


/* =====================================================
   COMEÇAR CONTAGEM
   ===================================================== */

function beginFight() {

    gameRunning =
        true;

    fightMessage.textContent =
        "APERTA! APERTA! APERTA!";

    timer =
        setInterval(
            () => {

                countdown--;

                timerElement.textContent =
                    countdown;

                if (
                    countdown <= 0
                ) {

                    finishByTime();

                }

            },
            1000
        );

}


/* =====================================================
   ATUALIZAR FORÇA
   ===================================================== */

function updatePower() {

    /*
     * progress:
     *
     * -100 = vitória jogador 2
     *   0  = centro
     * +100 = vitória jogador 1
     */

    const normalized =
        (progress + 100) / 2;

    const p1 =
        Math.max(
            0,
            Math.min(
                100,
                normalized
            )
        );

    const p2 =
        100 - p1;

    power1Element.style.width =
        `${p1}%`;

    power2Element.style.width =
        `${p2}%`;

    animateArms();

}


/* =====================================================
   ANIMAÇÃO DOS BRAÇOS
   ===================================================== */

function animateArms() {

    /*
     * O braço esquerdo gira
     * de -35 até aproximadamente
     * 65 graus.
     */

    const leftAngle =
        -35 +
        (progress * .65);

    /*
     * O braço direito faz
     * o movimento contrário.
     */

    const rightAngle =
        35 +
        (progress * .65);

    armLeft.style.transform =
        `rotate(${leftAngle}deg)`;

    armRight.style.transform =
        `rotate(${rightAngle}deg)`;


    /*
     * Pequeno efeito durante a luta.
     */

    if (
        Math.abs(progress) > 45
    ) {

        armLeft.classList.add(
            "shake"
        );

        armRight.classList.add(
            "shake"
        );

    } else {

        armLeft.classList.remove(
            "shake"
        );

        armRight.classList.remove(
            "shake"
        );

    }

}


/* =====================================================
   REGISTRAR CLIQUE
   ===================================================== */

function playerClick(
    player
) {

    if (
        !gameRunning ||
        gameFinished
    ) {

        return;

    }

    const now =
        performance.now();


    if (
        player === 1
    ) {

        player1Clicks++;

        clicks1Element.textContent =
            player1Clicks;

        lastPlayer =
            1;

        /*
         * Calcula a velocidade
         * aproximada entre cliques.
         */

        const interval =
            now -
            lastClickTime1;

        lastClickTime1 =
            now;

        let speedBonus =
            1;

        if (
            interval > 0 &&
            interval < 130
        ) {

            speedBonus =
                1.35;

        } else if (
            interval > 0 &&
            interval < 220
        ) {

            speedBonus =
                1.15;

        }

        const force =
            selectedMode.multiplier *
            selectedWeight.strength *
            speedBonus;

        progress +=
            force;

        /*
         * Pequeno limite para
         * impedir valores absurdos.
         */

        progress =
            Math.min(
                100,
                progress
            );

        animateClick(
            armLeft
        );

    }


    if (
        player === 2
    ) {

        player2Clicks++;

        clicks2Element.textContent =
            player2Clicks;

        lastPlayer =
            2;

        const interval =
            now -
            lastClickTime2;

        lastClickTime2 =
            now;

        let speedBonus =
            1;

        if (
            interval > 0 &&
            interval < 130
        ) {

            speedBonus =
                1.35;

        } else if (
            interval > 0 &&
            interval < 220
        ) {

            speedBonus =
                1.15;

        }

        const force =
            selectedMode.multiplier *
            selectedWeight.strength *
            speedBonus;

        progress -=
            force;

        progress =
            Math.max(
                -100,
                progress
            );

        animateClick(
            armRight
        );

    }


    updatePower();


    /*
     * Verifica vitória.
     */

    if (
        progress >= 100
    ) {

        finishGame(
            1
        );

        return;

    }

    if (
        progress <= -100
    ) {

        finishGame(
            2
        );

        return;

    }

}


/* =====================================================
   ANIMAÇÃO DE CLIQUE
   ===================================================== */

function animateClick(
    arm
) {

    arm.style.filter =
        "brightness(1.25)";

    setTimeout(
        () => {

            arm.style.filter =
                "";

        },
        70
    );

}


/* =====================================================
   FINALIZAR PELO TEMPO
   ===================================================== */

function finishByTime() {

    if (
        !gameRunning ||
        gameFinished
    ) {

        return;

    }

    /*
     * Se o braço está mais para
     * o lado do jogador 1,
     * jogador 1 vence.
     */

    if (
        progress > 0
    ) {

        finishGame(
            1
        );

        return;

    }

    if (
        progress < 0
    ) {

        finishGame(
            2
        );

        return;

    }

    /*
     * Empate.
     * O último a clicar vence.
     */

    if (
        lastPlayer === 1
    ) {

        finishGame(
            1
        );

    } else {

        finishGame(
            2
        );

    }

}


/* =====================================================
   FINALIZAR PARTIDA
   ===================================================== */

function finishGame(
    winner
) {

    if (
        gameFinished
    ) {

        return;

    }

    gameFinished =
        true;

    gameRunning =
        false;

    clearInterval(
        timer
    );

    if (
        winner === 1
    ) {

        progress =
            100;

    } else {

        progress =
            -100;

    }

    updatePower();

    setTimeout(
        () => {

            showResult(
                winner
            );

        },
        700
    );

}


/* =====================================================
   MOSTRAR RESULTADO
   ===================================================== */

function showResult(
    winner
) {

    gameScreen.classList.add(
        "hidden"
    );

    resultScreen.classList.remove(
        "hidden"
    );

    if (
        winner === 1
    ) {

        winnerName.textContent =
            "JOGADOR 1";

        winnerName.style.color =
            "var(--blue)";

        winnerDescription.textContent =
            "💪 O Jogador 1 derrubou o braço adversário!";

    } else {

        winnerName.textContent =
            "JOGADOR 2";

        winnerName.style.color =
            "var(--red)";

        winnerDescription.textContent =
            "🔥 O Jogador 2 derrubou o braço adversário!";

    }

    finalClicks1.textContent =
        player1Clicks;

    finalClicks2.textContent =
        player2Clicks;

}


/* =====================================================
   RESETAR BRAÇOS
   ===================================================== */

function resetArms() {

    armLeft.style.transform =
        "rotate(-35deg)";

    armRight.style.transform =
        "rotate(35deg)";

    armLeft.classList.remove(
        "shake"
    );

    armRight.classList.remove(
        "shake"
    );

}


/* =====================================================
   VOLTAR AO MENU
   ===================================================== */

function returnToMenu() {

    clearInterval(
        timer
    );

    gameRunning =
        false;

    gameFinished =
        true;

    gameScreen.classList.add(
        "hidden"
    );

    resultScreen.classList.add(
        "hidden"
    );

    menuScreen.classList.remove(
        "hidden"
    );

    resetGame();

}


/* =====================================================
   EVENTOS DOS BOTÕES
   ===================================================== */

startButton.addEventListener(
    "click",
    startGame
);

againButton.addEventListener(
    "click",
    startGame
);

menuButton.addEventListener(
    "click",
    returnToMenu
);


/* =====================================================
   TECLADO
   ===================================================== */

document.addEventListener(
    "keydown",
    event => {

        /*
         * Ignora teclas repetidas
         * pelo navegador.
         */

        if (
            event.repeat
        ) {

            return;

        }

        const key =
            event.key.toLowerCase();


        /*
         * Jogador 1
         */

        if (
            key === "f"
        ) {

            event.preventDefault();

            playerClick(
                1
            );

        }


        /*
         * Jogador 2
         */

        if (
            key === "j"
        ) {

            event.preventDefault();

            playerClick(
                2
            );

        }

    }
);


/* =====================================================
   SUPORTE A CLIQUE NOS BOTÕES
   ===================================================== */

function addTouchControls() {

    const player1Key =
        document.querySelector(
            ".player1-control strong"
        );

    const player2Key =
        document.querySelector(
            ".player2-control strong"
        );

    if (
        player1Key
    ) {

        player1Key.addEventListener(
            "click",
            () => {

                playerClick(
                    1
                );

            }
        );

    }

    if (
        player2Key
    ) {

        player2Key.addEventListener(
            "click",
            () => {

                playerClick(
                    2
                );

            }
        );

    }

}


/* =====================================================
   INICIALIZAÇÃO
   ===================================================== */

renderModes();

renderWeights();

addTouchControls();

resetGame();
