




export const kineticModels = [
    {
        class: "Funny models",
        name: "Cyclic model",
        description: "",
        scheme: "A = B = C = D = E = F = G = H = I = J = K = A",
        nonZeroBackwardRates: false,
        initialConditions: {
            A: {
                logSlider: false,
                min: 0,
                max: 50,
                value: 1
            },
            B: {
                logSlider: false,
                min: 0,
                max: 50,
                value: 0
            },
            C: {
                logSlider: false,
                min: 0,
                max: 50,
                value: 0
            },
            D: {
                logSlider: false,
                min: 0,
                max: 50,
                value: 0
            },
            E: {
                logSlider: false,
                min: 0,
                max: 50,
                value: 0
            },
            F: {
                logSlider: false,
                min: 0,
                max: 50,
                value: 0
            },
            G: {
                logSlider: false,
                min: 0,
                max: 50,
                value: 0
            },
            H: {
                logSlider: false,
                min: 0,
                max: 50,
                value: 0
            },
            I: {
                logSlider: false,
                min: 0,
                max: 50,
                value: 0
            },
            J: {
                logSlider: false,
                min: 0,
                max: 50,
                value: 0
            },
            K: {
                logSlider: false,
                min: 0,
                max: 50,
                value: 0
            },
        },
    },
    {
        class: "Funny models",
        name: "Lotka-Volterra",
        description: "",
        scheme: "Rabbit = 2Rabbit\nWolf = DeadWolf\nWolf + Rabbit = 2Wolf",
        nonZeroBackwardRates: false,
        initialConditions: {
            Rabbit: {
                logSlider: false,
                min: 0,
                max: 50,
                value: 1
            },
            Wolf: {
                logSlider: false,
                min: 0,
                max: 50,
                value: 1
            },
            DeadWolf: {
                logSlider: false,
                min: 0,
                max: 50,
                value: 0
            }
        },
        rates: [
            {
                forwardRate: 4.4,
                backwardRate: 0,
                forwardRateMin: 0,
                forwardRateMax: 10,
                backwardRateMin: 0,
                backwardRateMax: 10,
                forwardRateLogSlider: false,
                backwardRateLogSlider: false
            },
            {
                forwardRate: 1.9,
                backwardRate: 0,
                forwardRateMin: 0,
                forwardRateMax: 10,
                backwardRateMin: 0,
                backwardRateMax: 10,
                forwardRateLogSlider: false,
                backwardRateLogSlider: false
            },
            {
                forwardRate: 1.3,
                backwardRate: 0,
                forwardRateMin: 0,
                forwardRateMax: 10,
                backwardRateMin: 0,
                backwardRateMax: 10,
                forwardRateLogSlider: false,
                backwardRateLogSlider: false
            }
        ],
    },
    {
        class: "Epidemic",
        name: "SIR Model",
        description: "TODO",
        scheme: "Susceptible + Infected = 2Infected\nInfected = Recovered\nInfected = Dead",
        nonZeroBackwardRates: false,
        initialConditions: {
            Susceptible: {
                logSlider: false,
                min: 0,
                max: 100,
                value: 10
            },
            Infected: {
                logSlider: true,
                min: 1e-5,
                max: 10,
                value: 1e-3
            },
            Recovered: {
                logSlider: false,
                min: 0,
                max: 10,
                value: 0
            },
            Dead: {
                logSlider: false,
                min: 0,
                max: 10,
                value: 0
            }
        },
        rates: [
            {
                forwardRate: 0.6,
                backwardRate: 0,
                forwardRateMin: 0,
                forwardRateMax: 10,
                backwardRateMin: 0,
                backwardRateMax: 10,
                forwardRateLogSlider: false,
                backwardRateLogSlider: false
            },
            {
                forwardRate: 1.5,
                backwardRate: 0,
                forwardRateMin: 0,
                forwardRateMax: 10,
                backwardRateMin: 0,
                backwardRateMax: 10,
                forwardRateLogSlider: false,
                backwardRateLogSlider: false
            },
            {
                forwardRate: 0.1,
                backwardRate: 0,
                forwardRateMin: 0,
                forwardRateMax: 10,
                backwardRateMin: 0,
                backwardRateMax: 10,
                forwardRateLogSlider: false,
                backwardRateLogSlider: false
            }
        ],
    },
    {
        class: "Epidemic",
        name: "SEIRS Model",
        description: "TODO",
        scheme: "Susceptible + Infected = Exposed + Infected\nExposed = Infected = Recovered = Susceptible\nInfected = Dead",
        nonZeroBackwardRates: false,
        initialConditions: {
            Susceptible: {
                logSlider: false,
                min: 0,
                max: 100,
                value: 10
            },
            Exposed: {
                logSlider: false,
                min: 0,
                max: 100,
                value: 0
            },
            Infected: {
                logSlider: true,
                min: 1e-5,
                max: 10,
                value: 1e-4
            },
            Recovered: {
                logSlider: false,
                min: 0,
                max: 10,
                value: 0
            },
            Dead: {
                logSlider: false,
                min: 0,
                max: 10,
                value: 0
            }
        },
        rates: [
            {
                forwardRate: 4,
                backwardRate: 0,
                forwardRateMin: 0,
                forwardRateMax: 10,
                backwardRateMin: 0,
                backwardRateMax: 10,
                forwardRateLogSlider: false,
                backwardRateLogSlider: false
            },
            {
                forwardRate: 0.8,
                backwardRate: 0,
                forwardRateMin: 0,
                forwardRateMax: 10,
                backwardRateMin: 0,
                backwardRateMax: 10,
                forwardRateLogSlider: false,
                backwardRateLogSlider: false
            },
            {
                forwardRate: 2.4,
                backwardRate: 0,
                forwardRateMin: 0,
                forwardRateMax: 10,
                backwardRateMin: 0,
                backwardRateMax: 10,
                forwardRateLogSlider: false,
                backwardRateLogSlider: false
            },
            {
                forwardRate: 0.3,
                backwardRate: 0,
                forwardRateMin: 0,
                forwardRateMax: 10,
                backwardRateMin: 0,
                backwardRateMax: 10,
                forwardRateLogSlider: false,
                backwardRateLogSlider: false
            },
            {
                forwardRate: 0.1,
                backwardRate: 0,
                forwardRateMin: 0,
                forwardRateMax: 10,
                backwardRateMin: 0,
                backwardRateMax: 10,
                forwardRateLogSlider: false,
                backwardRateLogSlider: false
            }
        ],
    },
    {
        class: "Chemical kinetics",
        name: "Michaelis-Menten",
        description: "TODO",
        scheme: "E + S = ES = E + P",
        nonZeroBackwardRates: true,
        initialConditions: {
            E: {
                logSlider: false,
                min: 0,
                max: 50,
                value: 3.5
            },
            S: {
                logSlider: false,
                min: 0,
                max: 50,
                value: 10
            },
            ES: {
                logSlider: false,
                min: 0,
                max: 50,
                value: 0
            },
            P: {
                logSlider: false,
                min: 0,
                max: 50,
                value: 0
            }
        },
        rates: [
            {
                forwardRate: 0.4,
                backwardRate: 1.4,
                forwardRateMin: 0,
                forwardRateMax: 10,
                backwardRateMin: 0,
                backwardRateMax: 10,
                forwardRateLogSlider: false,
                backwardRateLogSlider: false
            },
            {
                forwardRate: 1.9,
                backwardRate: 0,
                forwardRateMin: 0,
                forwardRateMax: 10,
                backwardRateMin: 0,
                backwardRateMax: 10,
                forwardRateLogSlider: false,
                backwardRateLogSlider: false
            },
        ],
    },
    {
        class: "Chemical kinetics",
        name: "H2 + Br2",
        description: "TODO",
        scheme: "Br2 = 2Br.\nBr. + H2 = HBr + H.\nH. + Br2 = HBr + Br.",
        nonZeroBackwardRates: true,
        initialConditions: {
            'Br2': {
                logSlider: false,
                min: 0,
                max: 50,
                value: 1
            },
            'Br.': {
                logSlider: false,
                min: 0,
                max: 50,
                value: 0
            },
            'H2': {
                logSlider: false,
                min: 0,
                max: 50,
                value: 1
            },
            'HBr': {
                logSlider: false,
                min: 0,
                max: 50,
                value: 0
            },
            'H.': {
                logSlider: false,
                min: 0,
                max: 50,
                value: 0
            }
        },
        rates: [
            {
                forwardRate: 0.4,
                backwardRate: 0.9,
                forwardRateMin: 0,
                forwardRateMax: 10,
                backwardRateMin: 0,
                backwardRateMax: 10,
                forwardRateLogSlider: false,
                backwardRateLogSlider: false
            },
            {
                forwardRate: 2.9,
                backwardRate: 0,
                forwardRateMin: 0,
                forwardRateMax: 10,
                backwardRateMin: 0,
                backwardRateMax: 10,
                forwardRateLogSlider: false,
                backwardRateLogSlider: false
            },
            {
                forwardRate: 1.2,
                backwardRate: 0,
                forwardRateMin: 0,
                forwardRateMax: 10,
                backwardRateMin: 0,
                backwardRateMax: 10,
                forwardRateLogSlider: false,
                backwardRateLogSlider: false
            }
        ],
    },
    {
        class: "Photochemistry",
        name: "Photosensitization",
        description: "TODO",
        scheme: "tPS = PS\n2tPS = tPS + PS\ntPS + S = T + PS\nT = S",
        nonZeroBackwardRates: false,
        initialConditions: {
            tPS: {
                logSlider: false,
                min: 0,
                max: 50,
                value: 1
            },
            PS: {
                logSlider: false,
                min: 0,
                max: 50,
                value: 0
            },
            S: {
                logSlider: false,
                min: 0,
                max: 50,
                value: 2
            },
            T: {
                logSlider: false,
                min: 0,
                max: 50,
                value: 0
            }
        },
        rates: [
            {
                forwardRate: 0.5,
                backwardRate: 0,
                forwardRateMin: 0,
                forwardRateMax: 10,
                backwardRateMin: 0,
                backwardRateMax: 10,
                forwardRateLogSlider: false,
                backwardRateLogSlider: false
            },
            {
                forwardRate: 0.3,
                backwardRate: 0,
                forwardRateMin: 0,
                forwardRateMax: 10,
                backwardRateMin: 0,
                backwardRateMax: 10,
                forwardRateLogSlider: false,
                backwardRateLogSlider: false
            },
            {
                forwardRate: 1,
                backwardRate: 0,
                forwardRateMin: 0,
                forwardRateMax: 10,
                backwardRateMin: 0,
                backwardRateMax: 10,
                forwardRateLogSlider: false,
                backwardRateLogSlider: false
            },
            {
                forwardRate: 0.5,
                backwardRate: 0,
                forwardRateMin: 0,
                forwardRateMax: 10,
                backwardRateMin: 0,
                backwardRateMax: 10,
                forwardRateLogSlider: false,
                backwardRateLogSlider: false
            },
        ],
    },
    {
        class: "Photochemistry",
        name: "Rose bengal kinetics",
        description: "TODO",
        scheme: "^3RB^{2-} = RB^{2-}\n^3RB^{2-} + RB^{2-} = 2RB^{2-}\n2^3RB^{2-} = ^3RB^{2-} + RB^{2-}\n^3RB^{2-} + RB^{2-} = RB^{.-} + RB^{.3-}\n2^3RB^{2-} = RB^{.-} + RB^{.3-}\nRB^{.-} + RB^{.3-} = 2RB^{2-}",
        nonZeroBackwardRates: false,
        initialConditions: {
            "^3RB^{2-}": {
                logSlider: false,
                min: 0,
                max: 50,
                value: 1
            },
            "RB^{2-}": {
                logSlider: false,
                min: 0,
                max: 50,
                value: 0
            },
            "RB^{.-}": {
                logSlider: false,
                min: 0,
                max: 50,
                value: 0
            },
            "RB^{.3-}": {
                logSlider: false,
                min: 0,
                max: 50,
                value: 0
            }
        },
        rates: [
            {
                forwardRate: 1.01,
                backwardRate: 0,
                forwardRateMin: 0,
                forwardRateMax: 10,
                backwardRateMin: 0,
                backwardRateMax: 10,
                forwardRateLogSlider: false,
                backwardRateLogSlider: false
            },
            {
                forwardRate: 0.6,
                backwardRate: 0,
                forwardRateMin: 0,
                forwardRateMax: 10,
                backwardRateMin: 0,
                backwardRateMax: 10,
                forwardRateLogSlider: false,
                backwardRateLogSlider: false
            },
            {
                forwardRate: 1.2,
                backwardRate: 0,
                forwardRateMin: 0,
                forwardRateMax: 10,
                backwardRateMin: 0,
                backwardRateMax: 10,
                forwardRateLogSlider: false,
                backwardRateLogSlider: false
            },
            {
                forwardRate: 0.2,
                backwardRate: 0,
                forwardRateMin: 0,
                forwardRateMax: 10,
                backwardRateMin: 0,
                backwardRateMax: 10,
                forwardRateLogSlider: false,
                backwardRateLogSlider: false
            },
            {
                forwardRate: 2.4,
                backwardRate: 0,
                forwardRateMin: 0,
                forwardRateMax: 10,
                backwardRateMin: 0,
                backwardRateMax: 10,
                forwardRateLogSlider: false,
                backwardRateLogSlider: false
            },
            {
                forwardRate: 4.5,
                backwardRate: 0,
                forwardRateMin: 0,
                forwardRateMax: 10,
                backwardRateMin: 0,
                backwardRateMax: 10,
                forwardRateLogSlider: false,
                backwardRateLogSlider: false
            },
        ],
    },
]





// options = top100Films.map((option) => {
//     const firstLetter = option.title[0].toUpperCase();
//     return {
//       firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
//       ...option,
//     };
//   });

