const path = require('path');
require('dotenv').config({path: path.resolve(__dirname+'/.env')});

class TailwindExtractor {
    static extract(content)
    {
        return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
    }
}

const purgecss = require('@fullhuman/postcss-purgecss')({
    content   : ['./src/**/*.js'],
    css       : ['./src/styles/tailwind.css'],
    whitelist : ["pl-24", "pl-40", "pl-56", "pl-72", "pl-80"],
    extractors: [
        {
            extractor : TailwindExtractor,
            extensions: ["html", "js"]
        }
    ],
});

module.exports = {
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        ...process.env.NODE_ENV === 'production'
            ? [purgecss]
            : []
    ]
};

console.log('src/styles/tailwind.css successfully purged.');

