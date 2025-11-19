// Python Quest Missions Database

const MISSIONS = [
    // ========== BASICS - EASY ==========
    {
        id: 'basics_easy_1',
        title: '🌟 The First Spell',
        difficulty: 'easy',
        topic: 'basics',
        description: 'Learn to use the print() function to display messages.',
        story: 'You arrive at the Python Academy, eager to learn your first spell. The wise instructor tells you: "Every great journey begins with a simple greeting. Let us start by learning to speak to the world!"',
        objective: 'Write a program that prints "Hello, World!" to the screen.',
        hint: 'Use the print() function with your message in quotes: print("your message")',
        starterCode: '# Print "Hello, World!" below\n',
        tests: [
            {
                description: 'Output contains "Hello, World!"',
                code: `None`,
                expected: (result, output) => output.includes('Hello, World!')
            }
        ],
        successMessage: 'Congratulations! You\'ve cast your first Python spell! The print() function is your voice in the Python world.'
    },
    {
        id: 'basics_easy_2',
        title: '🔢 The Merchant\'s Calculator',
        difficulty: 'easy',
        topic: 'basics',
        description: 'Create a simple calculator using basic arithmetic.',
        story: 'A merchant in town needs help calculating his profits. He sold items for 150 gold and 200 gold, but paid 80 gold in expenses. "Can you help me calculate my total profit?" he asks.',
        objective: 'Create variables for income and expenses, then calculate and print the profit.',
        hint: 'Create variables like: income = 150 + 200, expenses = 80, then calculate profit = income - expenses',
        starterCode: '# Calculate the merchant\'s profit\n',
        tests: [
            {
                description: 'Correct profit calculation (270)',
                code: `None`,
                expected: (result, output) => output.includes('270')
            }
        ],
        successMessage: 'Excellent! The merchant is pleased with your mathematical prowess!'
    },
    {
        id: 'basics_easy_3',
        title: '📝 The Name Tag Maker',
        difficulty: 'easy',
        topic: 'basics',
        description: 'Learn to work with strings and variables.',
        story: 'The Academy is hosting a welcome ceremony. Your task is to create name tags for new students. Each tag should say "Welcome, [Name]!"',
        objective: 'Create a variable called "name" and print a welcome message using it.',
        hint: 'Use string concatenation or f-strings: print(f"Welcome, {name}!")',
        starterCode: '# Create a name variable and print a welcome message\nname = "Student"\n',
        tests: [
            {
                description: 'Uses a name variable',
                code: `'name' in dir()`,
                expected: (result, output) => result === true
            },
            {
                description: 'Output contains "Welcome"',
                code: `None`,
                expected: (result, output) => output.toLowerCase().includes('welcome')
            }
        ],
        successMessage: 'Perfect! You\'ve learned to work with variables and strings!'
    },

    // ========== BASICS - MEDIUM ==========
    {
        id: 'basics_medium_1',
        title: '🎲 The Dice Roller',
        difficulty: 'medium',
        topic: 'basics',
        description: 'Create a program that simulates rolling two dice.',
        story: 'In the tavern, adventurers are playing a dice game. They need a fair way to roll dice. Can you create a magical dice roller?',
        objective: 'Import the random module, generate two random numbers between 1-6, and print both rolls and their sum.',
        hint: 'Use: import random, then random.randint(1, 6) to generate random numbers',
        starterCode: '# Create a dice roller\n',
        tests: [
            {
                description: 'Output shows two dice rolls',
                code: `None`,
                expected: (result, output) => {
                    const numbers = output.match(/\d+/g);
                    return numbers && numbers.length >= 2;
                }
            }
        ],
        successMessage: 'Amazing! Your dice roller works perfectly! The adventurers are impressed!'
    },
    {
        id: 'basics_medium_2',
        title: '🌡️ Temperature Converter',
        difficulty: 'medium',
        topic: 'basics',
        description: 'Convert temperatures between Celsius and Fahrenheit.',
        story: 'A traveling scholar from distant lands speaks of temperature in Fahrenheit, but your kingdom uses Celsius. Create a converter to bridge this gap!',
        objective: 'Create a program that converts 100 degrees Fahrenheit to Celsius. Formula: C = (F - 32) * 5/9',
        hint: 'Use the formula: celsius = (fahrenheit - 32) * 5/9',
        starterCode: '# Convert 100°F to Celsius\nfahrenheit = 100\n',
        tests: [
            {
                description: 'Correct conversion (~37.78)',
                code: `None`,
                expected: (result, output) => {
                    const match = output.match(/37\.7|38/);
                    return match !== null;
                }
            }
        ],
        successMessage: 'Brilliant! You can now communicate temperatures across different measurement systems!'
    },

    // ========== BASICS - HARD ==========
    {
        id: 'basics_hard_1',
        title: '🎯 The Number Guesser',
        difficulty: 'hard',
        topic: 'basics',
        description: 'Create an interactive number guessing game.',
        story: 'The Oracle has hidden a number between 1 and 10. Create a game where players can guess the number and receive feedback!',
        objective: 'Generate a random number, compare it with a guess, and provide feedback (higher/lower/correct).',
        hint: 'Use random.randint(), comparison operators (==, <, >), and conditional statements',
        starterCode: '# Create a number guessing game\nimport random\n\nsecret_number = random.randint(1, 10)\nguess = 5  # Player\'s guess\n\n# Compare and give feedback\n',
        tests: [
            {
                description: 'Program provides feedback',
                code: `None`,
                expected: (result, output) => output.length > 0
            }
        ],
        successMessage: 'Incredible! You\'ve created an interactive game using randomness and logic!'
    },

    // ========== LOOPS - EASY ==========
    {
        id: 'loops_easy_1',
        title: '🔄 The Counting Spell',
        difficulty: 'easy',
        topic: 'loops',
        description: 'Learn to use for loops to count.',
        story: 'To master magic, you must first master counting. The instructor asks you to count from 1 to 5 using a magical loop.',
        objective: 'Use a for loop with range() to print numbers from 1 to 5.',
        hint: 'Use: for i in range(1, 6): print(i)',
        starterCode: '# Count from 1 to 5 using a loop\n',
        tests: [
            {
                description: 'Output contains numbers 1 through 5',
                code: `None`,
                expected: (result, output) => {
                    return ['1', '2', '3', '4', '5'].every(n => output.includes(n));
                }
            }
        ],
        successMessage: 'Well done! You\'ve learned the power of loops to repeat actions!'
    },
    {
        id: 'loops_easy_2',
        title: '⭐ The Star Pattern',
        difficulty: 'easy',
        topic: 'loops',
        description: 'Use loops to create patterns.',
        story: 'The night sky needs decorating! Create a pattern of stars to beautify the celestial canvas.',
        objective: 'Use a loop to print 5 lines, each containing increasing numbers of stars (*, **, ***, etc.)',
        hint: 'Use: for i in range(1, 6): print("*" * i)',
        starterCode: '# Create a star pattern\n',
        tests: [
            {
                description: 'Creates a star pattern',
                code: `None`,
                expected: (result, output) => {
                    return output.includes('*') && output.includes('**') && output.includes('***');
                }
            }
        ],
        successMessage: 'Beautiful! Your star pattern illuminates the night sky!'
    },

    // ========== LOOPS - MEDIUM ==========
    {
        id: 'loops_medium_1',
        title: '➕ The Sum Calculator',
        difficulty: 'medium',
        topic: 'loops',
        description: 'Calculate the sum of numbers using a loop.',
        story: 'A treasure chest contains numbered gems from 1 to 10. Calculate the total value of all gems!',
        objective: 'Use a loop to calculate the sum of all numbers from 1 to 10.',
        hint: 'Create a variable total = 0, then use a loop: for i in range(1, 11): total += i',
        starterCode: '# Calculate sum of numbers 1 to 10\n',
        tests: [
            {
                description: 'Calculates correct sum (55)',
                code: `None`,
                expected: (result, output) => output.includes('55')
            }
        ],
        successMessage: 'Excellent calculation! The treasure\'s total value is now known!'
    },
    {
        id: 'loops_medium_2',
        title: '🔢 The Times Table',
        difficulty: 'medium',
        topic: 'loops',
        description: 'Generate a multiplication table.',
        story: 'Young students need to learn their times tables. Create a magical scroll that displays the 5 times table!',
        objective: 'Use a loop to print the 5 times table from 5x1 to 5x10.',
        hint: 'Use: for i in range(1, 11): print(f"5 x {i} = {5*i}")',
        starterCode: '# Create the 5 times table\n',
        tests: [
            {
                description: 'Shows multiplication results',
                code: `None`,
                expected: (result, output) => {
                    return output.includes('5') && output.includes('10') && output.includes('50');
                }
            }
        ],
        successMessage: 'Perfect! Your times table will help students for generations!'
    },

    // ========== LOOPS - HARD ==========
    {
        id: 'loops_hard_1',
        title: '🎨 The Pattern Master',
        difficulty: 'hard',
        topic: 'loops',
        description: 'Create complex patterns using nested loops.',
        story: 'The Royal Palace needs decorative patterns for the grand hall. Create a pyramid pattern that impresses the kingdom!',
        objective: 'Create a pyramid pattern with 5 rows using nested loops.',
        hint: 'Use nested loops: outer loop for rows, inner loop for stars. Add spaces for centering.',
        starterCode: '# Create a pyramid pattern\n# Row 1: 1 star\n# Row 2: 2 stars\n# Row 3: 3 stars...\n',
        tests: [
            {
                description: 'Creates a pattern with multiple rows',
                code: `None`,
                expected: (result, output) => {
                    const lines = output.trim().split('\n');
                    return lines.length >= 3;
                }
            }
        ],
        successMessage: 'Magnificent! Your pattern is worthy of the Royal Palace!'
    },

    // ========== FUNCTIONS - EASY ==========
    {
        id: 'functions_easy_1',
        title: '👋 The Greeting Function',
        difficulty: 'easy',
        topic: 'functions',
        description: 'Create your first function.',
        story: 'Functions are reusable spells! Learn to create a greeting function that can welcome anyone by name.',
        objective: 'Create a function called greet() that takes a name parameter and prints a greeting.',
        hint: 'def greet(name): print(f"Hello, {name}!")',
        starterCode: '# Create a greeting function\n',
        tests: [
            {
                description: 'Function greet exists',
                code: `'greet' in dir()`,
                expected: (result, output) => result === true
            }
        ],
        successMessage: 'Wonderful! You\'ve created your first reusable spell!'
    },
    {
        id: 'functions_easy_2',
        title: '🔢 The Doubler',
        difficulty: 'easy',
        topic: 'functions',
        description: 'Create a function that returns a value.',
        story: 'A merchant needs a quick way to double prices. Create a function that doubles any number!',
        objective: 'Create a function called double() that takes a number and returns its double.',
        hint: 'def double(number): return number * 2',
        starterCode: '# Create a function that doubles a number\n',
        tests: [
            {
                description: 'Function double exists',
                code: `'double' in dir()`,
                expected: (result, output) => result === true
            }
        ],
        successMessage: 'Great! Functions that return values are extremely useful!'
    },

    // ========== FUNCTIONS - MEDIUM ==========
    {
        id: 'functions_medium_1',
        title: '📏 The Area Calculator',
        difficulty: 'medium',
        topic: 'functions',
        description: 'Create functions to calculate areas.',
        story: 'Builders need to calculate areas of different shapes. Create functions to help them!',
        objective: 'Create two functions: rectangle_area(length, width) and circle_area(radius). Use 3.14 for π.',
        hint: 'Rectangle: length * width, Circle: π * radius²',
        starterCode: '# Create area calculator functions\n',
        tests: [
            {
                description: 'Functions exist',
                code: `'rectangle_area' in dir() and 'circle_area' in dir()`,
                expected: (result, output) => result === true
            }
        ],
        successMessage: 'Excellent! Your functions will help builders across the kingdom!'
    },
    {
        id: 'functions_medium_2',
        title: '🎯 The Number Checker',
        difficulty: 'medium',
        topic: 'functions',
        description: 'Create a function with conditional logic.',
        story: 'Create a magical function that can determine if a number is even or odd!',
        objective: 'Create a function is_even(number) that returns True if even, False if odd.',
        hint: 'Use the modulo operator: number % 2 == 0',
        starterCode: '# Create an even/odd checker function\n',
        tests: [
            {
                description: 'Function is_even exists',
                code: `'is_even' in dir()`,
                expected: (result, output) => result === true
            }
        ],
        successMessage: 'Perfect! Your number checker will be very useful!'
    },

    // ========== FUNCTIONS - HARD ==========
    {
        id: 'functions_hard_1',
        title: '🔐 The Password Validator',
        difficulty: 'hard',
        topic: 'functions',
        description: 'Create a function to validate passwords.',
        story: 'The kingdom\'s security depends on strong passwords! Create a validator that checks password strength.',
        objective: 'Create a function validate_password(password) that checks if a password is at least 8 characters long.',
        hint: 'Use len(password) >= 8 to check length, return True or False',
        starterCode: '# Create a password validator\n',
        tests: [
            {
                description: 'Function validate_password exists',
                code: `'validate_password' in dir()`,
                expected: (result, output) => result === true
            }
        ],
        successMessage: 'Impressive! Your validator will protect the kingdom\'s accounts!'
    },

    // ========== DATA STRUCTURES - EASY ==========
    {
        id: 'data_easy_1',
        title: '📋 The Shopping List',
        difficulty: 'easy',
        topic: 'data_structures',
        description: 'Learn to work with lists.',
        story: 'You need to create a shopping list for the market. Lists help organize multiple items!',
        objective: 'Create a list called shopping_list with at least 3 items and print it.',
        hint: 'shopping_list = ["apples", "bread", "milk"]',
        starterCode: '# Create a shopping list\n',
        tests: [
            {
                description: 'shopping_list exists and has items',
                code: `'shopping_list' in dir() and len(shopping_list) >= 3`,
                expected: (result, output) => result === true
            }
        ],
        successMessage: 'Great! You\'ve learned to organize data with lists!'
    },
    {
        id: 'data_easy_2',
        title: '🎒 The Inventory Manager',
        difficulty: 'easy',
        topic: 'data_structures',
        description: 'Access and modify list items.',
        story: 'Your inventory needs updating! Learn to add and access items in your list.',
        objective: 'Create a list, add an item using append(), and print the first item using index [0].',
        hint: 'Use list.append("item") to add, and list[0] to access first item',
        starterCode: '# Create and manage an inventory list\ninventory = ["sword", "shield"]\n',
        tests: [
            {
                description: 'List has at least 3 items',
                code: `len(inventory) >= 3`,
                expected: (result, output) => result === true
            }
        ],
        successMessage: 'Excellent! You can now manage your inventory efficiently!'
    },

    // ========== DATA STRUCTURES - MEDIUM ==========
    {
        id: 'data_medium_1',
        title: '📖 The Dictionary of Spells',
        difficulty: 'medium',
        topic: 'data_structures',
        description: 'Learn to use dictionaries.',
        story: 'Create a magical dictionary that stores spells and their effects!',
        objective: 'Create a dictionary with at least 3 spell names as keys and their effects as values.',
        hint: 'spells = {"fireball": "damage", "heal": "restore health"}',
        starterCode: '# Create a spell dictionary\n',
        tests: [
            {
                description: 'Dictionary spells exists with entries',
                code: `'spells' in dir() and len(spells) >= 3`,
                expected: (result, output) => result === true
            }
        ],
        successMessage: 'Wonderful! Dictionaries are perfect for storing key-value pairs!'
    },
    {
        id: 'data_medium_2',
        title: '🔍 The Item Finder',
        difficulty: 'medium',
        topic: 'data_structures',
        description: 'Search through lists.',
        story: 'A merchant needs to check if certain items are in stock. Help by searching through the inventory!',
        objective: 'Create a list of items and use the "in" operator to check if "sword" is in the list.',
        hint: 'Use: if "sword" in items: print("Found!")',
        starterCode: '# Create an inventory and search for an item\nitems = ["shield", "potion", "sword"]\n',
        tests: [
            {
                description: 'Checks for item presence',
                code: `None`,
                expected: (result, output) => output.length > 0
            }
        ],
        successMessage: 'Perfect! You can now search through data efficiently!'
    },

    // ========== DATA STRUCTURES - HARD ==========
    {
        id: 'data_hard_1',
        title: '🏆 The Leaderboard',
        difficulty: 'hard',
        topic: 'data_structures',
        description: 'Work with nested data structures.',
        story: 'Create a leaderboard system that tracks player names and scores!',
        objective: 'Create a dictionary where keys are player names and values are their scores. Calculate the highest score.',
        hint: 'Use max(leaderboard.values()) to find highest score',
        starterCode: '# Create a leaderboard system\nleaderboard = {\n    "Alice": 100,\n    "Bob": 150,\n    "Charlie": 200\n}\n',
        tests: [
            {
                description: 'Leaderboard exists with players',
                code: `'leaderboard' in dir() and len(leaderboard) >= 3`,
                expected: (result, output) => result === true
            }
        ],
        successMessage: 'Outstanding! You\'ve mastered complex data structures!'
    }
];

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MISSIONS;
}
