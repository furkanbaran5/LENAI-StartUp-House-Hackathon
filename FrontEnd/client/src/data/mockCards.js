// Mock data for persona cards
const generateKeywords = (category, index) => {
  const baseKeywords = {
    moda: ['minimalist yaşam', 'style', 'trendy', 'clothing', 'outfit', 'designer', 'casual', 'elegant', 'modern', 'chic', 'boutique', 'seasonal'],
    teknoloji: ['tech', 'innovation', 'digital', 'smart', 'device', 'gadget', 'software', 'hardware', 'mobile', 'wireless', 'cloud'],
    ev: ['home', 'decor', 'furniture', 'comfort', 'interior', 'design', 'cozy', 'modern', 'space', 'living', 'quality', 'durable']
  };

  return baseKeywords[category] || [];
};

const generateImage = (category, index) => {
  const images = {
    moda: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
      'https://images.unsplash.com/photo-1558769132-cb1aea7c8c94?w=400',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400',
      'https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=400',
      'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400'
    ],
    teknoloji: [
      'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
      'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400',
      'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=400'
    ],
    ev: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
      'https://images.unsplash.com/photo-1538688423619-a81d3f23454b?w=400',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
      'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=400',
      'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=400'
    ]
  };

  return images[category][index % 5];
};

const createCard = (id, category, personaCode, interactions, likes, views) => ({
  id,
  personaCode,
  category,
  keywords: generateKeywords(category, id),
  interactions,
  image: generateImage(category, id),
  likes,
  views,
  subCards: []
});

// Generate main cards for each category
const generateMainCards = () => {
  const categories = [
    { name: 'moda', label: 'Moda', codes: ['#M01', '#M02', '#M03', '#M04', '#M05'] },
    { name: 'teknoloji', label: 'Teknoloji', codes: ['#T01', '#T02', '#T03', '#T04', '#T05'] },
    { name: 'ev', label: 'Ev Yaşamı', codes: ['#E01', '#E02', '#E03', '#E04', '#E05'] }
  ];

  let cardId = 1;
  const allCards = [];

  categories.forEach((cat, catIndex) => {
    const categoryCards = [];

    // Create 5 cards per category with varying interactions
    const interactionValues = [8500, 700, 5800, 4100, 3200]; // Top 2 will be 8500 and 7200

    for (let i = 0; i < 5; i++) {
      const card = createCard(
        cardId++,
        cat.name,
        cat.codes[i],
        interactionValues[i],
        Math.floor(Math.random() * 5000) + 1000,
        Math.floor(Math.random() * 15000) + 5000
      );

      categoryCards.push(card);
    }

    // Add sub-cards to top 2 performing cards
    categoryCards
      .sort((a, b) => b.interactions - a.interactions)
      .slice(0, 2)
      .forEach((topCard, topIndex) => {
        const subCardCodes = [
          `${cat.codes[topIndex]}-S1`,
          `${cat.codes[topIndex]}-S2`,
          `${cat.codes[topIndex]}-S3`,
          `${cat.codes[topIndex]}-S4`,
          `${cat.codes[topIndex]}-S5`
        ];

        for (let j = 0; j < 5; j++) {
          const subCard = createCard(
            cardId++,
            cat.name,
            subCardCodes[j],
            Math.floor(Math.random() * 2000) + 500,
            Math.floor(Math.random() * 2000) + 200,
            Math.floor(Math.random() * 8000) + 1000
          );

          topCard.subCards.push(subCard);
        }
      });

    allCards.push({
      category: cat.label,
      categoryKey: cat.name,
      cards: categoryCards
    });
  });

  return allCards;
};

export const mockCardData = generateMainCards();
