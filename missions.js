// Python Quest Missions - Bite-Sized Incremental Learning

const MISSIONS = [
    // ========== BASICS - EASY - Building toward a Calculator ==========
    
    {
        id: 'basics_easy_1',
        title: '🌟 Step 1: Your First Words',
        difficulty: 'easy',
        topic: 'basics',
        description: 'Learn to make Python speak using print().',
        story: 'Welcome to Python Academy! Before building anything complex, you must first learn to communicate. The print() function is how Python speaks to the world.',
        objective: 'Use print() to display the message: Hello, Python!',
        hint: 'Type: print("Hello, Python!")',
        starterCode: '# Make Python say hello!\n',
        tests: [
            {
                description: 'Output contains "Hello, Python!"',
                code: `None`,
                expected: (result, output) => output.includes('Hello, Python!')
            }
        ],
        successMessage: '🎉 Perfect! You just gave Python a voice! The print() function displays text on the screen.'
    },

    {
        id: 'basics_easy_2',
        title: '📦 Step 2: Creating Storage Boxes',
        difficulty: 'easy',
        topic: 'basics',
        description: 'Learn what variables are - containers for storing data.',
        story: 'To build a calculator, you need to store numbers. Variables are like labeled boxes that hold values. Let\'s create your first variable!',
        objective: 'Create a variable called "number" and give it the value 42, then print it.',
        hint: 'Create it with: number = 42, then print it with: print(number)',
        starterCode: '# Create a variable called number with value 42\n\n# Print the variable\n',
        tests: [
            {
                description: 'Variable "number" exists',
                code: `'number' in dir()`,
                expected: (result, output) => result === true
            },
            {
                description: 'Output shows 42',
                code: `None`,
                expected: (result, output) => output.includes('42')
            }
        ],
        successMessage: '🎊 Great! Variables store data. You just created a box labeled "number" and put 42 inside!'
    },

    {
        id: 'basics_easy_3',
        title: '➕ Step 3: Simple Addition',
        difficulty: 'easy',
        topic: 'basics',
        description: 'Make Python do math - add two numbers together.',
        story: 'Now that you can store numbers, let\'s do some math! Calculators need to add numbers together.',
        objective: 'Create two variables: first_number = 10 and second_number = 5. Print their sum.',
        hint: 'Use the + operator: print(first_number + second_number)',
        starterCode: '# Create two variables\n\n# Print their sum\n',
        tests: [
            {
                description: 'Both variables exist',
                code: `'first_number' in dir() and 'second_number' in dir()`,
                expected: (result, output) => result === true
            },
            {
                description: 'Output shows 15',
                code: `None`,
                expected: (result, output) => output.includes('15')
            }
        ],
        successMessage: '✨ Awesome! You just did your first calculation! 10 + 5 = 15'
    },

    {
        id: 'basics_easy_4',
        title: '💾 Step 4: Saving Results',
        difficulty: 'easy',
        topic: 'basics',
        description: 'Store the result of calculations in a variable.',
        story: 'Great calculators save their results! Instead of just printing, let\'s store the answer.',
        objective: 'Add 20 + 15, store the result in a variable called "result", then print it.',
        hint: 'result = 20 + 15, then print(result)',
        starterCode: '# Calculate 20 + 15 and store in result\n\n# Print the result\n',
        tests: [
            {
                description: 'Variable "result" exists',
                code: `'result' in dir()`,
                expected: (result, output) => result === true
            },
            {
                description: 'Output shows 35',
                code: `None`,
                expected: (result, output) => output.includes('35')
            }
        ],
        successMessage: '🌟 Perfect! You stored 35 in the "result" variable. This is how calculators remember answers!'
    },

    {
        id: 'basics_easy_5',
        title: '➖ Step 5: Try Subtraction',
        difficulty: 'easy',
        topic: 'basics',
        description: 'Learn another math operation - subtraction.',
        story: 'Calculators do more than just addition! Let\'s try subtracting numbers.',
        objective: 'Subtract 8 from 20 and print the result.',
        hint: 'Use the - operator: print(20 - 8)',
        starterCode: '# Calculate 20 minus 8\n',
        tests: [
            {
                description: 'Output shows 12',
                code: `None`,
                expected: (result, output) => output.includes('12')
            }
        ],
        successMessage: '👏 Nice! 20 - 8 = 12. You\'re building calculator skills!'
    },

    {
        id: 'basics_easy_6',
        title: '✖️ Step 6: Multiplication Magic',
        difficulty: 'easy',
        topic: 'basics',
        description: 'Multiply numbers using the * operator.',
        story: 'Let\'s multiply! In Python, we use * for multiplication (not ×).',
        objective: 'Calculate 6 times 7 and print the result.',
        hint: 'Use *: print(6 * 7)',
        starterCode: '# Calculate 6 times 7\n',
        tests: [
            {
                description: 'Output shows 42',
                code: `None`,
                expected: (result, output) => output.includes('42')
            }
        ],
        successMessage: '🎯 Excellent! 6 * 7 = 42. You\'re mastering basic operations!'
    },

    {
        id: 'basics_easy_7',
        title: '➗ Step 7: Division Practice',
        difficulty: 'easy',
        topic: 'basics',
        description: 'Divide numbers using the / operator.',
        story: 'The final basic operation - division! Let\'s split numbers up.',
        objective: 'Divide 100 by 5 and print the result.',
        hint: 'Use /: print(100 / 5)',
        starterCode: '# Calculate 100 divided by 5\n',
        tests: [
            {
                description: 'Output shows 20',
                code: `None`,
                expected: (result, output) => output.includes('20')
            }
        ],
        successMessage: '🔥 Great work! 100 / 5 = 20. You know all four basic operations now!'
    },

    {
        id: 'basics_easy_8',
        title: '🎮 Step 8: Build Your First Calculator!',
        difficulty: 'easy',
        topic: 'basics',
        description: 'Put it all together - create a simple calculator.',
        story: 'Time to combine everything! You\'ll create two numbers and perform ALL four operations on them.',
        objective: 'Create num1 = 50 and num2 = 10. Print the results of adding, subtracting, multiplying, and dividing them.',
        hint: 'Print four results: num1 + num2, num1 - num2, num1 * num2, num1 / num2',
        starterCode: '# Create two numbers\nnum1 = 50\nnum2 = 10\n\n# Print all four operations\n',
        tests: [
            {
                description: 'Variables exist',
                code: `'num1' in dir() and 'num2' in dir()`,
                expected: (result, output) => result === true
            },
            {
                description: 'Shows multiple results',
                code: `None`,
                expected: (result, output) => {
                    return output.includes('60') && output.includes('40') && 
                           output.includes('500') && output.includes('5');
                }
            }
        ],
        successMessage: '🎉 AMAZING! You built a working calculator! You can add (60), subtract (40), multiply (500), and divide (5)!'
    },

    // ========== BASICS - MEDIUM - Building toward User Input ==========
    
    {
        id: 'basics_medium_1',
        title: '📝 Step 1: Making Labels',
        difficulty: 'medium',
        topic: 'basics',
        description: 'Learn to create descriptive text with strings.',
        story: 'Numbers alone aren\'t enough! We need labels and messages. Strings are text wrapped in quotes.',
        objective: 'Create a variable called "greeting" with the text "Welcome" and print it.',
        hint: 'Use quotes: greeting = "Welcome"',
        starterCode: '# Create a greeting variable\n',
        tests: [
            {
                description: 'Variable "greeting" exists',
                code: `'greeting' in dir()`,
                expected: (result, output) => result === true
            },
            {
                description: 'Output contains "Welcome"',
                code: `None`,
                expected: (result, output) => output.includes('Welcome')
            }
        ],
        successMessage: '✨ Perfect! Strings let you work with text. Wrap text in "quotes" to create strings!'
    },

    {
        id: 'basics_medium_2',
        title: '🔗 Step 2: Combining Text',
        difficulty: 'medium',
        topic: 'basics',
        description: 'Merge strings together using concatenation.',
        story: 'Let\'s combine words! You can "add" strings together to make longer messages.',
        objective: 'Create two variables: "first" = "Hello" and "second" = "World". Combine and print them.',
        hint: 'Use +: print(first + " " + second)',
        starterCode: '# Create two string variables\n\n# Combine them with a space\n',
        tests: [
            {
                description: 'Both variables exist',
                code: `'first' in dir() and 'second' in dir()`,
                expected: (result, output) => result === true
            },
            {
                description: 'Output contains "Hello World"',
                code: `None`,
                expected: (result, output) => output.includes('Hello') && output.includes('World')
            }
        ],
        successMessage: '🎊 Great! You combined two strings! This is called concatenation.'
    },

    {
        id: 'basics_medium_3',
        title: '🏷️ Step 3: Adding Labels to Numbers',
        difficulty: 'medium',
        topic: 'basics',
        description: 'Make your calculator output more readable with labels.',
        story: 'Raw numbers aren\'t helpful without context. Let\'s add labels to make output clear!',
        objective: 'Calculate 15 + 25. Print "The answer is: 40" using both text and the number.',
        hint: 'Convert number to string: print("The answer is: " + str(40))',
        starterCode: '# Calculate the sum\nresult = 15 + 25\n\n# Print with a label\n',
        tests: [
            {
                description: 'Output contains "answer" and "40"',
                code: `None`,
                expected: (result, output) => output.includes('answer') && output.includes('40')
            }
        ],
        successMessage: '👏 Excellent! Adding labels makes your output professional and clear!'
    },

    {
        id: 'basics_medium_4',
        title: '✨ Step 4: F-String Magic',
        difficulty: 'medium',
        topic: 'basics',
        description: 'Learn the modern way to insert variables into strings.',
        story: 'There\'s an easier way to combine text and variables - f-strings! They\'re like templates.',
        objective: 'Create name = "Alice" and age = 25. Use an f-string to print: "Alice is 25 years old"',
        hint: 'Use f-string: print(f"{name} is {age} years old")',
        starterCode: '# Create variables\nname = "Alice"\nage = 25\n\n# Use f-string to print\n',
        tests: [
            {
                description: 'Variables exist',
                code: `'name' in dir() and 'age' in dir()`,
                expected: (result, output) => result === true
            },
            {
                description: 'Output contains name and age',
                code: `None`,
                expected: (result, output) => output.includes('Alice') && output.includes('25')
            }
        ],
        successMessage: '🚀 Awesome! F-strings are the modern, clean way to format text in Python!'
    },

    {
        id: 'basics_medium_5',
        title: '🧮 Step 5: Labeled Calculator',
        difficulty: 'medium',
        topic: 'basics',
        description: 'Upgrade your calculator with clear labeled output.',
        story: 'Let\'s make your calculator professional! Add labels to each operation.',
        objective: 'Calculate 30 + 12. Print it as: "30 + 12 = 42"',
        hint: 'Use f-string: print(f"{num1} + {num2} = {result}")',
        starterCode: '# Create numbers\nnum1 = 30\nnum2 = 12\nresult = num1 + num2\n\n# Print with label\n',
        tests: [
            {
                description: 'Shows equation format',
                code: `None`,
                expected: (result, output) => output.includes('30') && output.includes('12') && output.includes('42')
            }
        ],
        successMessage: '🌟 Perfect! Your calculator now shows clear, readable equations!'
    },

    // ========== LOOPS - EASY - Building toward Patterns ==========
    
    {
        id: 'loops_easy_1',
        title: '🔄 Step 1: Repeat After Me',
        difficulty: 'easy',
        topic: 'loops',
        description: 'Learn to repeat actions using loops.',
        story: 'Writing the same code over and over is boring! Loops let you repeat actions automatically.',
        objective: 'Use a for loop to print "Python!" 3 times.',
        hint: 'for i in range(3): print("Python!")',
        starterCode: '# Print "Python!" three times using a loop\n',
        tests: [
            {
                description: 'Output has Python three times',
                code: `None`,
                expected: (result, output) => {
                    const count = (output.match(/Python/g) || []).length;
                    return count >= 3;
                }
            }
        ],
        successMessage: '🎉 Great! You just automated repetition! Loops save you from typing the same thing multiple times.'
    },

    {
        id: 'loops_easy_2',
        title: '🔢 Step 2: Counting to Five',
        difficulty: 'easy',
        topic: 'loops',
        description: 'Use loops to count through numbers.',
        story: 'Loops aren\'t just for repeating the same thing - you can count with them!',
        objective: 'Use a for loop with range() to print numbers 1 through 5.',
        hint: 'for i in range(1, 6): print(i)',
        starterCode: '# Count from 1 to 5\n',
        tests: [
            {
                description: 'Shows numbers 1-5',
                code: `None`,
                expected: (result, output) => {
                    return ['1', '2', '3', '4', '5'].every(n => output.includes(n));
                }
            }
        ],
        successMessage: '👏 Excellent! range(1, 6) creates numbers 1,2,3,4,5. Note: it stops BEFORE 6!'
    },

    {
        id: 'loops_easy_3',
        title: '⭐ Step 3: Building a Line',
        difficulty: 'easy',
        topic: 'loops',
        description: 'Use loops to create patterns.',
        story: 'Let\'s build something visual! We can use loops to create star patterns.',
        objective: 'Print 5 stars in a row: *****',
        hint: 'for i in range(5): print("*", end="")',
        starterCode: '# Print 5 stars on one line\n',
        tests: [
            {
                description: 'Output contains 5 stars',
                code: `None`,
                expected: (result, output) => {
                    const count = (output.match(/\*/g) || []).length;
                    return count >= 5;
                }
            }
        ],
        successMessage: '🌟 Nice! Using end="" keeps everything on one line!'
    },

    {
        id: 'loops_easy_4',
        title: '📊 Step 4: Star Pyramid - Row by Row',
        difficulty: 'easy',
        topic: 'loops',
        description: 'Create a growing pattern with loops.',
        story: 'Now let\'s build something more complex - a pyramid! Each row has more stars.',
        objective: 'Print 3 rows of stars: Row 1: *, Row 2: **, Row 3: ***',
        hint: 'for i in range(1, 4): print("*" * i)',
        starterCode: '# Create a 3-row star pyramid\n',
        tests: [
            {
                description: 'Creates pattern',
                code: `None`,
                expected: (result, output) => {
                    return output.includes('*') && output.includes('**') && output.includes('***');
                }
            }
        ],
        successMessage: '🎨 Beautiful! You created a growing pattern! "*" * i repeats the star i times.'
    },

    {
        id: 'loops_easy_5',
        title: '➕ Step 5: Adding Up Numbers',
        difficulty: 'easy',
        topic: 'loops',
        description: 'Use loops to calculate sums.',
        story: 'Loops can help with calculations! Let\'s add up a series of numbers.',
        objective: 'Use a loop to calculate the sum of numbers 1 through 5. (Answer: 15)',
        hint: 'total = 0, then: for i in range(1, 6): total = total + i',
        starterCode: '# Calculate sum of 1+2+3+4+5\ntotal = 0\n\n# Use loop to add numbers\n\n# Print the total\n',
        tests: [
            {
                description: 'Output shows 15',
                code: `None`,
                expected: (result, output) => output.includes('15')
            }
        ],
        successMessage: '🔥 Perfect! 1+2+3+4+5 = 15. Loops make repetitive calculations easy!'
    },

    // ========== FUNCTIONS - EASY - Building toward Reusable Code ==========
    
    {
        id: 'functions_easy_1',
        title: '🎯 Step 1: Creating a Reusable Action',
        difficulty: 'easy',
        topic: 'functions',
        description: 'Learn what functions are - reusable blocks of code.',
        story: 'Tired of writing the same code repeatedly? Functions are like custom commands you create!',
        objective: 'Create a function called say_hello() that prints "Hello!"',
        hint: 'def say_hello(): print("Hello!")',
        starterCode: '# Define a function that prints Hello\n\n# Call the function\nsay_hello()\n',
        tests: [
            {
                description: 'Function say_hello exists',
                code: `'say_hello' in dir()`,
                expected: (result, output) => result === true
            },
            {
                description: 'Output shows Hello',
                code: `None`,
                expected: (result, output) => output.includes('Hello')
            }
        ],
        successMessage: '🎉 Awesome! You created your first function! Now you can call say_hello() anytime!'
    },

    {
        id: 'functions_easy_2',
        title: '📦 Step 2: Functions with Inputs',
        difficulty: 'easy',
        topic: 'functions',
        description: 'Make functions more flexible with parameters.',
        story: 'Functions are more powerful when they accept inputs! Parameters let you customize what a function does.',
        objective: 'Create greet(name) that prints "Hello, [name]!". Call it with your name.',
        hint: 'def greet(name): print(f"Hello, {name}!")',
        starterCode: '# Create function that takes a name\n\n# Call it with your name\ngreet("Alice")\n',
        tests: [
            {
                description: 'Function greet exists',
                code: `'greet' in dir()`,
                expected: (result, output) => result === true
            },
            {
                description: 'Output shows a greeting',
                code: `None`,
                expected: (result, output) => output.includes('Hello')
            }
        ],
        successMessage: '🌟 Perfect! Parameters make functions flexible. Same function, different inputs!'
    },

    {
        id: 'functions_easy_3',
        title: '↩️ Step 3: Getting Values Back',
        difficulty: 'easy',
        topic: 'functions',
        description: 'Learn how functions return results.',
        story: 'Functions can do calculations and give back results! Use "return" to send a value back.',
        objective: 'Create double(x) that returns x * 2. Store the result when calling it.',
        hint: 'def double(x): return x * 2',
        starterCode: '# Create function that doubles a number\n\n# Call it and store result\nresult = double(5)\nprint(result)\n',
        tests: [
            {
                description: 'Function double exists',
                code: `'double' in dir()`,
                expected: (result, output) => result === true
            },
            {
                description: 'Output shows 10',
                code: `None`,
                expected: (result, output) => output.includes('10')
            }
        ],
        successMessage: '✨ Great! "return" sends a value back. Now you can use the result in other calculations!'
    },

    {
        id: 'functions_easy_4',
        title: '🧮 Step 4: Calculator Function',
        difficulty: 'easy',
        topic: 'functions',
        description: 'Create a reusable add function.',
        story: 'Let\'s make your calculator code reusable! Create an add function.',
        objective: 'Create add(a, b) that returns a + b. Test it with different numbers.',
        hint: 'def add(a, b): return a + b',
        starterCode: '# Create an add function\n\n# Test it\nprint(add(10, 5))  # Should print 15\nprint(add(100, 50))  # Should print 150\n',
        tests: [
            {
                description: 'Function add exists',
                code: `'add' in dir()`,
                expected: (result, output) => result === true
            },
            {
                description: 'Shows correct sums',
                code: `None`,
                expected: (result, output) => output.includes('15') && output.includes('150')
            }
        ],
        successMessage: '🚀 Excellent! One function, unlimited uses! This is the power of reusable code!'
    },

    // ========== DATA STRUCTURES - EASY - Building toward Collections ==========
    
    {
        id: 'data_easy_1',
        title: '📝 Step 1: Your First List',
        difficulty: 'easy',
        topic: 'data_structures',
        description: 'Learn to store multiple items in one variable.',
        story: 'One variable can only hold one thing... or can it? Lists store multiple items together!',
        objective: 'Create a list called "fruits" with: apple, banana, orange',
        hint: 'fruits = ["apple", "banana", "orange"]',
        starterCode: '# Create a list of three fruits\n\n# Print the list\nprint(fruits)\n',
        tests: [
            {
                description: 'List fruits exists',
                code: `'fruits' in dir() and isinstance(fruits, list)`,
                expected: (result, output) => result === true
            },
            {
                description: 'Has 3 items',
                code: `len(fruits) >= 3`,
                expected: (result, output) => result === true
            }
        ],
        successMessage: '🎉 Perfect! Lists use square brackets [] and commas to separate items!'
    },

    {
        id: 'data_easy_2',
        title: '🎯 Step 2: Accessing List Items',
        difficulty: 'easy',
        topic: 'data_structures',
        description: 'Get individual items from a list using index numbers.',
        story: 'Lists are numbered starting from 0! The first item is [0], second is [1], etc.',
        objective: 'Create a list of colors. Print the FIRST color using [0].',
        hint: 'colors = ["red", "blue", "green"], then print(colors[0])',
        starterCode: '# Create a list of colors\ncolors = ["red", "blue", "green"]\n\n# Print the first color\n',
        tests: [
            {
                description: 'Prints a single color',
                code: `None`,
                expected: (result, output) => output.includes('red') || output.includes('blue') || output.includes('green')
            }
        ],
        successMessage: '👏 Great! Remember: Python counts from 0, so [0] is the first item!'
    },

    {
        id: 'data_easy_3',
        title: '➕ Step 3: Adding to Lists',
        difficulty: 'easy',
        topic: 'data_structures',
        description: 'Grow your list by adding new items.',
        story: 'Lists can grow! Use .append() to add items to the end.',
        objective: 'Start with an empty list. Add three numbers to it, then print the list.',
        hint: 'numbers = [], then numbers.append(10), numbers.append(20), etc.',
        starterCode: '# Create empty list\nnumbers = []\n\n# Add three numbers\n\n# Print the list\nprint(numbers)\n',
        tests: [
            {
                description: 'List has at least 3 items',
                code: `len(numbers) >= 3`,
                expected: (result, output) => result === true
            }
        ],
        successMessage: '🌟 Excellent! .append() adds items to the end of a list. Lists are dynamic!'
    },

    {
        id: 'data_easy_4',
        title: '🔍 Step 4: Searching Lists',
        difficulty: 'easy',
        topic: 'data_structures',
        description: 'Check if an item exists in a list.',
        story: 'Need to find something? Use "in" to check if an item exists in your list!',
        objective: 'Create a list of animals. Check if "dog" is in the list and print the result.',
        hint: 'if "dog" in animals: print("Found!")',
        starterCode: '# Create a list of animals\nanimals = ["cat", "dog", "bird"]\n\n# Check if dog is in list\n',
        tests: [
            {
                description: 'Performs a check',
                code: `None`,
                expected: (result, output) => output.length > 0
            }
        ],
        successMessage: '🔍 Perfect! The "in" operator checks if something exists in a list. Very useful!'
    },

    {
        id: 'data_easy_5',
        title: '📚 Step 5: Looping Through Lists',
        difficulty: 'easy',
        topic: 'data_structures',
        description: 'Process every item in a list using loops.',
        story: 'Combine lists and loops! Loop through a list to do something with each item.',
        objective: 'Create a list of names. Loop through and print each name.',
        hint: 'for name in names: print(name)',
        starterCode: '# Create a list of names\nnames = ["Alice", "Bob", "Charlie"]\n\n# Loop and print each name\n',
        tests: [
            {
                description: 'Prints multiple names',
                code: `None`,
                expected: (result, output) => {
                    const lines = output.trim().split('\n');
                    return lines.length >= 3;
                }
            }
        ],
        successMessage: '🎊 Amazing! Lists + loops = powerful combination! You can process any amount of data!'
    }
];

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MISSIONS;
}
