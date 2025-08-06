export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface QuizData {
  easy: Question[];
  medium: Question[];
  hard: Question[];
}

export const quizData: QuizData = {
  easy: [
    {
      id: 1,
      question: "What is Eth OS described as?",
      options: ["A traditional exchange", "DeFi's largest gamified experiment", "A simple wallet"],
      correctAnswer: "DeFi's largest gamified experiment"
    },
    {
      id: 2,
      question: "What is the main token of the Eth OS ecosystem?",
      options: ["AIR", "ETH", "EOS"],
      correctAnswer: "EOS"
    },
    {
      id: 3,
      question: "What token can you farm by saying GM daily?",
      options: ["$AIR", "$BOOST", "$ETH"],
      correctAnswer: "$AIR"
    },
    {
      id: 4,
      question: "How many gamified mechanics does Eth OS have?",
      options: ["5", "7", "10"],
      correctAnswer: "7"
    },
    {
      id: 5,
      question: "Do you need to stake or lock EOS to earn from the ecosystem?",
      options: ["Yes", "No", "Only during farming events"],
      correctAnswer: "No"
    }
  ],
  medium: [
    {
      id: 1,
      question: "What do tokens created within Eth OS pay back to EOS holders?",
      options: ["BOOST", "Pure ETH reflections", "Additional AIR rewards"],
      correctAnswer: "Pure ETH reflections"
    },
    {
      id: 2,
      question: "What internal token do you receive when burning EOS, and what is its use?",
      options: ["AIR, for trading", "BOOST, for additional APY", "GM, for staking"],
      correctAnswer: "BOOST, for additional APY"
    },
    {
      id: 3,
      question: "How long does each epoch last in the farming game?",
      options: ["1 day", "3 days", "7 days"],
      correctAnswer: "3 days"
    },
    {
      id: 4,
      question: "How many epochs are there in the Eth OS farming event?",
      options: ["10", "11", "12"],
      correctAnswer: "12"
    },
    {
      id: 5,
      question: "What makes boosted tokens stand out on the platform?",
      options: ["They have higher volume", "They appear first and have a fancy glance", "They give free AIR airdrops"],
      correctAnswer: "They appear first and have a fancy glance"
    }
  ],
  hard: [
    {
      id: 1,
      question: "What does EOS functionality include besides zero-tax?",
      options: ["Share-increasing APY, volume-based reflections, utility burn", "Only staking rewards", "Just trading volume fees"],
      correctAnswer: "Share-increasing APY, volume-based reflections, utility burn"
    },
    {
      id: 2,
      question: "What is the concept behind the \"recursive flywheel\" in Eth OS?",
      options: ["Tokens burn themselves to increase supply", "Revenue from all tokens flows back to EOS holders, boosting the ecosystem", "Users must stake to earn APY"],
      correctAnswer: "Revenue from all tokens flows back to EOS holders, boosting the ecosystem"
    },
    {
      id: 3,
      question: "What action allows you to receive BOOST and promote tokens within the Eth OS ecosystem?",
      options: ["Staking AIR", "Burning EOS", "Saying GM daily"],
      correctAnswer: "Burning EOS"
    },
    {
      id: 4,
      question: "What is the official contract address (CA) of Eth OS?",
      options: ["0xdAC17F958D2ee523a2206206994597C13D831ec7", "0x8164B40840418C77A68F6f9EEdB5202b36d8b288", "0xfA9Ff5581cC458D3ba3983308F93417E5Fde2013"],
      correctAnswer: "0x8164B40840418C77A68F6f9EEdB5202b36d8b288"
    },
    {
      id: 5,
      question: "What strategy is key to winning the farming game according to Eth OS?",
      options: ["Selling early for quick profits", "Compounding gains across epochs", "Holding only during the last epoch"],
      correctAnswer: "Compounding gains across epochs"
    }
  ]
}; 