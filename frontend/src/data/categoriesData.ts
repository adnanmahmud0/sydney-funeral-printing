export const categoriesData = [
    {
        id: "cat-001",
        name: "A5 Booklets / Order of Ceremony",
        description: "Printed A5 booklets for funerals and ceremony services.",
        image: "./home/Order-of-Ceremony.jpg",
        imageAlt: "A5 funeral memorial booklets displayed together",
        url: "/products/a5-booklets",
        fields: [
            {
                id: "f-001",
                name: "Number of Pages",
                key: "pages",
                type: "select",
                values: ["4", "8", "12", "16", "20", "24", "28", "32"],
                required: true,
            },
            {
                id: "f-002",
                name: "Quantity",
                key: "quantity",
                type: "select",
                values: ["25", "50", "75", "100", "150", "200", "300", "500"],
                required: true,
            },
            {
                id: "f-003",
                name: "Single or Double Sided",
                key: "sides",
                type: "select",
                values: ["single", "double"],
                required: true,
            },
        ],
        pricing: {
            type: "formula",
            formula:
                "((pages * 0.35) + (quantity * 0.12)) * (sides == 'double' ? 1.25 : 1)",
        },
    },

    {
        id: "cat-002",
        name: "Folded Cards",
        description: "A4 sheets folded into A5 memorial cards.",
        image: "./home/Folded-Cards.jpg",
        imageAlt: "A4 folded funeral memorial card",
        url: "/products/folded-cards",
        fields: [
            {
                id: "f-201",
                name: "Sides",
                key: "sides",
                type: "select",
                values: ["double"],
                required: true,
            },
            {
                id: "f-202",
                name: "Quantity",
                key: "quantity",
                type: "select",
                values: ["10", "20", "50", "100", "150", "200"],
                required: true,
            },
        ],
        pricing: {
            type: "formula",
            formula: "(quantity * 1.80)",
        },
    },

    {
        id: "cat-003",
        name: "Flat Cards",
        description: "Printed flat memorial cards in A5 or A6 format.",
        image: "./home/Flat-Cards.png",
        imageAlt: "Flat memorial cards",
        url: "/products/flat-cards",
        fields: [
            {
                id: "f-101",
                name: "A5 / A6",
                key: "size",
                type: "select",
                values: ["A5", "A6"],
                required: true,
            },
            {
                id: "f-102",
                name: "Sides",
                key: "sides",
                type: "select",
                values: ["single", "double"],
                required: true,
            },
            {
                id: "f-103",
                name: "Quantity",
                key: "quantity",
                type: "select",
                values: ["20", "50", "100", "200", "500"],
                required: true,
            },
        ],
        pricing: {
            type: "tier",
            tiers: [
                { minQty: 1, maxQty: 50, price: 1.25 },
                { minQty: 51, maxQty: 100, price: 1.1 },
                { minQty: 101, maxQty: 500, price: 0.95 },
            ],
            multiplyByQuantity: true,
        },
    },

    {
        id: "cat-004",
        name: "Bookmarks",
        description: "High-quality printed memorial bookmarks.",
        image: "./home/Bookmarks.jpg",
        imageAlt: "Printed memorial bookmarks",
        url: "/products/bookmarks",
        fields: [
            {
                id: "f-301",
                name: "Single or Double Sided",
                key: "sides",
                type: "select",
                values: ["single", "double"],
                required: true,
            },
            {
                id: "f-302",
                name: "Quantity",
                key: "quantity",
                type: "select",
                values: ["10", "20", "50", "100", "150"],
                required: true,
            },
        ],
        pricing: {
            type: "formula",
            formula: "(quantity * (sides == 'double' ? 1.40 : 1.00))",
        },
    },

    {
        id: "cat-005",
        name: "Easel Posters",
        description: "Large-format memorial easel display posters.",
        image: "./home/Easel-Posters.jpg",
        imageAlt: "Large easel poster",
        url: "/products/easel-posters",
        fields: [
            {
                id: "f-401",
                name: "Poster Size",
                key: "size",
                type: "select",
                values: ["A3", "A2", "A1"],
                required: true,
            },
            {
                id: "f-402",
                name: "Material",
                key: "material",
                type: "select",
                values: ["Matte", "Gloss", "Premium Board"],
                required: true,
            },
            {
                id: "f-403",
                name: "Quantity",
                key: "quantity",
                type: "select",
                values: ["1", "2", "5", "10"],
                required: true,
            },
        ],
        pricing: {
            type: "flat",
            basePrice: { A3: 15, A2: 22, A1: 35 },
            materialMultiplier: { Matte: 1, Gloss: 1.1, "Premium Board": 1.3 },
            finalFormula:
                "(basePrice[size] * materialMultiplier[material]) * quantity",
        },
    },
] as const;

export type Category = typeof categoriesData[number];