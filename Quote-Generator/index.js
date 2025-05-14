const quote = document.querySelector(".quote");
const person = document.querySelector(".person");
const newQuoteButton = document.querySelector(".btn");

newQuoteButton.addEventListener("click", () => {
    const randomQuote = Math.floor(Math.random() * quotes.length);

    quote.innerText = quotes[randomQuote].quote;
    person.innerText = quotes[randomQuote].person;
});

const quotes = [
    {
        quote: `"If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough."`,
        person: "✍️By: Oprah Winfrey"
    }, {
        quote: `"It does not matter how slowly you go as long as you do not stop."`,
        person: "✍️By: Confucius"
    }, {
        quote: `"Our lives begins to end the day we become silent about things that matter."`,
        person: "✍️By: Martin Luther Knig, Jr"
    }, {
        quote: `"Remember that not getting what you want is sometimes a wonderful stroke of luck."`,
        person: "✍️By: Dalai Lama"
    }, {
        quote: `"The journey of a thousand miles begins with one step."`,
        person: "✍️By: Lao Tzu"
    }, {
        quote: `"Tell me and I forget. Teach me and I remember. Involve me and I learn."`,
        person: "✍️By: Benjamin Franklin"
    }, {
        quote: `"Your time is limited, so don't waste it living someone else's life."`,
        person: "✍️By: Steve Jobs"
    }, {
        quote: `"At his best, man is the noblest of all animals; separated from law and justice he is the worst."`,
        person: "✍️By: Aristotle"
    }, {
        quote: `"The best way to find yourself is to lose yourself in the service of others."`,
        person: "✍️By: Mahatma Gandhi"
    }, {
        quote: `"If you want to live a happy life, tie it to a goal, not to people or things."`,
        person: "✍️By: Albert Einstein"
    }, {
        quote: `"I do the very best I know how - the very best I can: and I mean to keep on doing so until the end."`,
        person: `✍️By: Abraham Lincoln`
    }, {
        quote: `"The future belongs to those who believe in the beauty of their dreams."`,
        person: `✍️By:  Eleanor Roosevelt`
    }, {
        quote: `"Always forgive your enemies; nothing annoys them so much." `,
        person: `✍️By: Oscar Wilde`
    }, {
        quote: `"What lies behind us and what lies before us are tiny matters compared to what lies within us." `,
        person: `✍️By: Ralph Waldo Emerson`
    }, {
        quote: `"Courage is not the absence of fear, but the triumph over it." `, 
        person: `✍️By: Nelson Mandela`
    }, {
        quote: `"You must be the change you wish to see in the world."`,
        person: `✍️By: Mahatma Gandhi`
    }, {
        quote: `"The future belongs to those who believe in the beauty of their dreams."`,
        person: `✍️By: Eleanor Roosevelt`
    }, {
        quote: `"The only way to do great work is to love what you do."`,
        person: `✍️By:  Steve Jobs`
    }, {
        quote: `"The only true wisdom is in knowing you know nothing."`,
        person: `✍️By: Socrates`
    }
];