module.exports = {
    font_size: 24,
    img_size: 48,
    message_type: 46,
    missing_timer: null,
    missing_timeout: 10000,
    colors: {
        white: 'FFFFFF',
        orange: 'FF7F00',
        red: 'FF0000',
        green: '00FF00'
    },
    messages: {
        missing: 'Missing',
        cooldown: 'is off cooldown',
        duration_unit: 's',
        status_start: 'start',
        status_warning: 'is ending',
        status_end: 'ends'
    },
    classes: [
        {
            id: 7,
            name: 'Mystic',
            templateId: 11008,
            statuses: [
                //Aura of the Merciless
                {
                    id: 700603,
                    imageId: 130100,
                    status: 0,
                    timer: null,
                    name: 'Crit Aura',
                    timeout_warning: 0,
                    show_start: false,
                    show_warning: false,
                    show_ends: false,
                    show_missing: true
                },
                //Aura of the Tenacious
                {
                    id: 700300,
                    imageId: 160100,
                    status: 0,
                    timer: null,
                    name: 'Mana Aura',
                    timeout_warning: 0,
                    show_start: false,
                    show_warning: false,
                    show_ends: false,
                    show_missing: true
                },
                //Thrall Augmentation
                {
                    id: 702000,
                    imageId: 450100,
                    status: 0,
                    timer: null,
                    name: 'Enhanced Aura',
                    timeout_warning: 0,
                    show_start: false,
                    show_warning: false,
                    show_ends: false,
                    show_missing: true
                },
                //Volley of Curses
                {
                    id: 27160,
                    imageId: 240100,
                    status: 0,
                    timer: null,
                    name: 'Endurance debuff',
                    timeout_warning: 4000,
                    show_start: false,
                    show_warning: true,
                    show_ends: true,
                    show_missing: true
                },
                //Contagion
                {
                    id: 701708,
                    imageId: 410100,
                    status: 0,
                    timer: null,
                    name: 'Endurance debuff',
                    timeout_warning: 0,
                    show_start: true,
                    show_warning: false,
                    show_ends: false,
                    show_missing: false
                },
                //Thrall of Vengeance
                {
                    id: 702003,
                    imageId: 330100,
                    status: 0,
                    timer: null,
                    name: 'Power buff',
                    timeout_warning: 0,
                    show_start: false,
                    show_warning: false,
                    show_ends: false,
                    show_missing: false
                },
                //Thrall of Vengeance
                {
                    id: 702360,
                    imageId: 330100,
                    status: 0,
                    timer: null,
                    name: 'Decreases cooldown',
                    timeout_warning: 10000,
                    show_start: false,
                    show_warning: true,
                    show_ends: true,
                    show_missing: true
                },
                //Thrall of Wrath
                {
                    id: 702004,
                    imageId: 340100,
                    status: 0,
                    timer: null,
                    name: 'Crit power buff',
                    timeout_warning: 0,
                    show_start: true,
                    show_warning: false,
                    show_ends: false,
                    show_missing: false
                },
                //Thrall of Protection
                {
                    id: 27120,
                    imageId: 250100,
                    status: 0,
                    timer: null,
                    name: 'Endurance buff',
                    timeout_warning: 0,
                    show_start: false,
                    show_warning: false,
                    show_ends: false,
                    show_missing: true
                },
                //Vow of Rebirth
                {
                    id: 700100,
                    imageId: 120100,
                    status: 0,
                    timer: null,
                    name: 'Resurrect',
                    timeout_warning: 30000,
                    show_start: false,
                    show_warning: true,
                    show_ends: true,
                    show_missing: false
                }
            ],
            skills: [
                {
                    id: 331210,
                    imageId: 330100,
                    timer: null,
                    name: 'Thrall of Vengeance',
                    show_cooldown: true
                },
                {
                    id: 340700,
                    imageId: 340100,
                    timer: null,
                    name: 'Thrall of Wrath',
                    show_cooldown: true
                },
                {
                    id: 250310,
                    imageId: 250100,
                    timer: null,
                    name: 'Thrall of Protection',
                    show_cooldown: false
                },
                {
                    id: 271300,
                    imageId: 270100,
                    timer: null,
                    name: 'Thrall of Life',
                    show_cooldown: false
                },
                {
                    id: 120100,
                    imageId: 120100,
                    timer: null,
                    name: 'Vow of Rebirth',
                    show_cooldown: true
                }
            ]
        },
        {
            id: 1,
            name: 'Lancer',
            templateId: 11002,
            statuses: [
                //Debilitate
                {
                    id: 200302,
                    imageId: 100100,
                    status: 0,
                    timer: null,
                    name: 'Endurance debuff',
                    timeout_warning: 6000,
                    show_start: false,
                    show_warning: true,
                    show_ends: true,
                    show_missing: true
                },
                //Guardian Shout
                {
                    id: 200202,
                    imageId: 70100,
                    status: 0,
                    timer: null,
                    name: 'Power buff',
                    timeout_warning: 0,
                    show_start: true,
                    show_warning: false,
                    show_ends: false,
                    show_missing: false
                },
                //Adrenaline Rush
                {
                    id: 200701,
                    imageId: 170100,
                    status: 0,
                    timer: null,
                    name: 'Attack speed',
                    timeout_warning: 0,
                    show_start: true,
                    show_warning: false,
                    show_ends: false,
                    show_missing: false
                },
                //Pledge of Protection
                {
                    id: 200900,
                    imageId: 190100,
                    status: 0,
                    timer: null,
                    name: 'Reduce damage',
                    timeout_warning: 0,
                    show_start: true,
                    show_warning: false,
                    show_ends: false,
                    show_missing: false
                },
                //Divine Protection
                {
                    id: 201807,
                    imageId: 300100,
                    status: 0,
                    timer: null,
                    name: 'Immune',
                    timeout_warning: 0,
                    show_start: true,
                    show_warning: false,
                    show_ends: false,
                    show_missing: false
                }
            ],
            skills: [
                {
                    id: 70300,
                    imageId: 70100,
                    timer: null,
                    name: 'Guardian Shout',
                    show_cooldown: true
                },
                {
                    id: 170200,
                    imageId: 170100,
                    timer: null,
                    name: 'Adrenaline Rush',
                    show_cooldown: true
                },
                {
                    id: 190100,
                    imageId: 190100,
                    timer: null,
                    name: 'Pledge of Protection',
                    show_cooldown: true
                },
                {
                    id: 300100,
                    imageId: 300100,
                    timer: null,
                    name: 'Divine Protection',
                    show_cooldown: true
                }
            ]
        }
    ]
};