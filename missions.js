// Mission Data for Python Quest
const MISSIONS = {
    // ===== BASICS =====
    basics_easy_1: {
        id: 'basics_easy_1',
        title: 'The First Spell: Hello World',
        topic: 'basics',
        difficulty: 'easy',
        description: 'Your journey begins! Create a simple program that prints "Hello, Python World!" to the screen.',
        hint: 'Use the print() function',
        extraHint: 'Try: print("Hello, Python World!")',
        example: 'print("Welcome to Python!")',
        story: 'The ancient Book of Python glows before you. Your first mission is to speak the sacred words...',
        testCases: [
            {
                type: 'output',
                expected: 'Hello, Python World!'
            }
        ],
        xp: 50
    },
    
    basics_easy_2: {
        id: 'basics_easy_2',
        title: 'The Variable Vault',
        topic: 'basics',
        difficulty: 'easy',
        description: 'Store the value 42 in a variable called "answer" and print it.',
        hint: 'Use the = operator to assign values to variables',
        extraHint: 'Variable assignment: answer = 42, then print(answer)',
        example: 'name = "Alice"\\nprint(name)',
        story: 'Variables are the containers of power. Learn to store and retrieve knowledge...',
        testCases: [
            { type: 'output', expected: '42' }
        ],
        xp: 50
    },
    
    basics_easy_3: {
        id: 'basics_easy_3',
        title: 'The Calculator Begins',
        topic: 'basics',
        difficulty: 'easy',
        description: 'Create two variables: num1 = 10 and num2 = 5. Print their sum.',
        hint: 'Use the + operator to add numbers',
        extraHint: 'result = num1 + num2, then print(result)',
        example: 'a = 3\\nb = 7\\nprint(a + b)',
        story: 'Mathematics is the language of the universe. Combine numbers to unlock new powers...',
        testCases: [
            { type: 'output', expected: '15' }
        ],
        xp: 60
    },
    
    basics_medium_1: {
        id: 'basics_medium_1',
        title: 'The String Manipulator',
        topic: 'basics',
        difficulty: 'medium',
        description: 'Create a variable "name" with your name, and print "Hello, [name]! Welcome to Python Quest!"',
        hint: 'You can concatenate strings with + or use f-strings',
        extraHint: 'Try: print(f"Hello, {name}! Welcome to Python Quest!")',
        example: 'greeting = "Hi"\\nname = "Bob"\\nprint(greeting + ", " + name + "!")',
        story: 'Words have power. Learn to weave them together to create messages...',
        testCases: [
            { type: 'contains', expected: ['Hello', 'Welcome to Python Quest'] }
        ],
        xp: 80
    },
    
    basics_medium_2: {
        id: 'basics_medium_2',
        title: 'The Simple Calculator',
        topic: 'basics',
        difficulty: 'medium',
        description: 'Create a simple calculator that takes two numbers (use any values) and prints their sum, difference, product, and quotient.',
        hint: 'Use +, -, *, and / operators',
        extraHint: 'Create variables for each operation: sum_result = a + b',
        example: 'x = 20\\ny = 4\\nprint("Sum:", x + y)',
        story: 'A true programmer can perform any calculation. Show your mathematical prowess...',
        testCases: [
            { type: 'custom', check: (output) => output.toLowerCase().includes('sum') || output.includes('+') }
        ],
        xp: 100
    },
    
    // ===== LOOPS =====
    loops_easy_1: {
        id: 'loops_easy_1',
        title: 'The Counting Spell',
        topic: 'loops',
        difficulty: 'easy',
        description: 'Use a for loop to print numbers from 1 to 5.',
        hint: 'Use range() function with for loop',
        extraHint: 'for i in range(1, 6):\\n    print(i)',
        example: 'for i in range(3):\\n    print(i)',
        story: 'Repetition is power. Learn to make the computer count for you...',
        testCases: [
            { type: 'outputLines', expected: ['1', '2', '3', '4', '5'] }
        ],
        xp: 70
    },
    
    loops_easy_2: {
        id: 'loops_easy_2',
        title: 'The Repetition Master',
        topic: 'loops',
        difficulty: 'easy',
        description: 'Print "Python is awesome!" 3 times using a loop.',
        hint: 'Use a for loop with range(3)',
        extraHint: 'for i in range(3):\\n    print("Python is awesome!")',
        example: 'for x in range(2):\\n    print("Hello")',
        story: 'Sometimes the same spell must be cast multiple times. Master repetition...',
        testCases: [
            { type: 'count', text: 'Python is awesome!', expected: 3 }
        ],
        xp: 70
    },
    
    loops_medium_1: {
        id: 'loops_medium_1',
        title: 'The Sum Calculator',
        topic: 'loops',
        difficulty: 'medium',
        description: 'Calculate and print the sum of all numbers from 1 to 10 using a loop.',
        hint: 'Create a sum variable, initialize it to 0, then add each number in the loop',
        extraHint: 'total = 0\\nfor i in range(1, 11):\\n    total += i\\nprint(total)',
        example: 'result = 0\\nfor n in range(1, 4):\\n    result += n\\nprint(result)',
        story: 'Great power comes from accumulation. Sum the forces of numbers...',
        testCases: [
            { type: 'output', expected: '55' }
        ],
        xp: 100
    },
    
    loops_medium_2: {
        id: 'loops_medium_2',
        title: 'The Even Number Finder',
        topic: 'loops',
        difficulty: 'medium',
        description: 'Print all even numbers from 2 to 20 using a loop.',
        hint: 'Use the modulo operator (%) to check if a number is even',
        extraHint: 'for i in range(1, 21):\\n    if i % 2 == 0:\\n        print(i)',
        example: 'for num in range(10):\\n    if num % 2 == 0:\\n        print(num)',
        story: 'Patterns exist everywhere. Learn to find and filter them...',
        testCases: [
            { type: 'custom', check: (output) => {
                const lines = output.split('\\n').filter(l => l.trim());
                return lines.includes('2') && lines.includes('20') && lines.length >= 10;
            }}
        ],
        xp: 120
    },
    
    // ===== FUNCTIONS =====
    functions_easy_1: {
        id: 'functions_easy_1',
        title: 'The Greeting Function',
        topic: 'functions',
        difficulty: 'easy',
        description: 'Create a function called greet() that prints "Hello, World!" when called. Then call it.',
        hint: 'Use def to define a function',
        extraHint: 'def greet():\\n    print("Hello, World!")\\ngreet()',
        example: 'def say_hi():\\n    print("Hi")\\nsay_hi()',
        story: 'Functions are reusable spells. Create your first magical incantation...',
        testCases: [
            { type: 'output', expected: 'Hello, World!' }
        ],
        xp: 80
    },
    
    functions_easy_2: {
        id: 'functions_easy_2',
        title: 'The Name Printer',
        topic: 'functions',
        difficulty: 'easy',
        description: 'Create a function greet_name(name) that prints "Hello, [name]!". Call it with "Python".',
        hint: 'Functions can take parameters in parentheses',
        extraHint: 'def greet_name(name):\\n    print(f"Hello, {name}!")\\ngreet_name("Python")',
        example: 'def show(text):\\n    print(text)\\nshow("Test")',
        story: 'Parameterized spells are more powerful. They adapt to any situation...',
        testCases: [
            { type: 'output', expected: 'Hello, Python!' }
        ],
        xp: 90
    },
    
    functions_medium_1: {
        id: 'functions_medium_1',
        title: 'The Return Master',
        topic: 'functions',
        difficulty: 'medium',
        description: 'Create a function add(a, b) that returns the sum of two numbers. Call it with 5 and 3, then print the result.',
        hint: 'Use the return keyword to send a value back',
        extraHint: 'def add(a, b):\\n    return a + b\\nresult = add(5, 3)\\nprint(result)',
        example: 'def multiply(x, y):\\n    return x * y\\nprint(multiply(2, 4))',
        story: 'True power lies in return values. Functions that give back results are the most valuable...',
        testCases: [
            { type: 'output', expected: '8' }
        ],
        xp: 110
    },
    
    // ===== DATA STRUCTURES =====
    data_structures_easy_1: {
        id: 'data_structures_easy_1',
        title: 'The List Creator',
        topic: 'data_structures',
        difficulty: 'easy',
        description: 'Create a list called fruits with ["apple", "banana", "cherry"] and print it.',
        hint: 'Lists are created with square brackets []',
        extraHint: 'fruits = ["apple", "banana", "cherry"]\\nprint(fruits)',
        example: 'numbers = [1, 2, 3]\\nprint(numbers)',
        story: 'Lists are collections of power. Learn to gather and organize data...',
        testCases: [
            { type: 'contains', expected: ['apple', 'banana', 'cherry'] }
        ],
        xp: 80
    },
    
    data_structures_easy_2: {
        id: 'data_structures_easy_2',
        title: 'The List Accessor',
        topic: 'data_structures',
        difficulty: 'easy',
        description: 'Create a list [10, 20, 30, 40, 50] and print the third element (30).',
        hint: 'Lists are indexed starting from 0. Third element is index 2.',
        extraHint: 'numbers = [10, 20, 30, 40, 50]\\nprint(numbers[2])',
        example: 'items = ["a", "b", "c"]\\nprint(items[1])',
        story: 'Access the hidden knowledge within lists. Each item has its place...',
        testCases: [
            { type: 'output', expected: '30' }
        ],
        xp: 85
    },
    
    data_structures_medium_1: {
        id: 'data_structures_medium_1',
        title: 'The Dictionary Master',
        topic: 'data_structures',
        difficulty: 'medium',
        description: 'Create a dictionary with keys "name" and "age" with your choice of values. Print the name.',
        hint: 'Dictionaries use curly braces {} with key:value pairs',
        extraHint: 'person = {"name": "Alice", "age": 25}\\nprint(person["name"])',
        example: 'data = {"city": "NYC", "population": 8000000}\\nprint(data["city"])',
        story: 'Dictionaries map keys to values. They are the most organized form of data...',
        testCases: [
            { type: 'custom', check: (output) => output.trim().length > 0 }
        ],
        xp: 130
    }
};

// Topic metadata
const TOPICS = {
    basics: {
        name: 'Python Basics',
        icon: '📚',
        description: 'Learn variables, operators, and printing'
    },
    loops: {
        name: 'Loops & Iteration',
        icon: '🔄',
        description: 'Master for and while loops'
    },
    functions: {
        name: 'Functions',
        icon: '⚡',
        description: 'Create reusable code blocks'
    },
    data_structures: {
        name: 'Data Structures',
        icon: '📦',
        description: 'Work with lists and dictionaries'
    }
};

// Story chapters based on level
const STORY_CHAPTERS = {
    0: {
        title: 'The Beginning',
        text: 'In a world where code shapes reality, you are a novice programmer who has just discovered the ancient Book of Python...'
    },
    5: {
        title: 'The First Breakthrough',
        text: 'Your fingers dance across the keyboard with growing confidence. The elders of Code Village have taken notice...'
    },
    10: {
        title: 'The Loop Master',
        text: "You've learned to harness the power of repetition. The Council of Programmers invites you to greater challenges..."
    },
    15: {
        title: 'The Function Sage',
        text: 'Your code is no longer a jumble of statements. Other programmers seek your wisdom...'
    },
    20: {
        title: 'The Data Architect',
        text: 'You now shape data like clay. You are becoming a true Python master...'
    }
};

// Success messages
const SUCCESS_MESSAGES = [
    "The code compiles! Reality shifts as your program executes perfectly!",
    "Success! Your logic is flawless and your syntax pristine!",
    "The digital spirits smile upon your solution!",
    "Brilliant! Your code is elegant and efficient!",
    "The ancient Python masters would be proud!",
    "Victory! Your programming prowess grows stronger!",
    "Excellent work! Your solution demonstrates true understanding!",
    "Perfect execution! The path forward opens before you!"
];

// Get missions for a specific topic and difficulty
function getMissionsByTopic(topic, difficulty) {
    return Object.values(MISSIONS).filter(m => 
        m.topic === topic && m.difficulty === difficulty
    );
}

// Get all missions for a topic (all difficulties)
function getAllMissionsForTopic(topic) {
    return Object.values(MISSIONS).filter(m => m.topic === topic);
}

// Get mission by ID
function getMission(missionId) {
    return MISSIONS[missionId];
}

// Get random success message
function getRandomSuccessMessage() {
    return SUCCESS_MESSAGES[Math.floor(Math.random() * SUCCESS_MESSAGES.length)];
}
