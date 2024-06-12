// Test import of a JavaScript module
import { example } from '@/scripts/example'

// Test import of an asset

// Define the main SCSS file directly in HTML
// of cause you can impoert SCSS file in JS too
//import '@/styles/index.scss'



const heading = document.createElement('h1')
heading.textContent = example()

// Test a background image url in CSS
const imageBackground = document.createElement('div')
imageBackground.classList.add('image')

// Test a public folder asset
alert('Hello World')

const app = document.querySelector('#root')
app.append(heading)
