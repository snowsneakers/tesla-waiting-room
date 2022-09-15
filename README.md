# Tesla Waiting Room

[![Project Image](https://i.postimg.cc/4dn26Z2d/teslareadme.gif)](#)


<!-- TABLE OF CONTENTS -->
<h2 id="table-of-contents"> :book: Table of Contents</h2>

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project"> About The Project</a></li>
    <li><a href="#how-it's-made"> How It's Made</a></li>
    <li><a href="#overview"> Overview</a></li>
    <li><a href="#getting-started"> Getting Started</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
<h2 id="about-the-project"> 📝 About The Project</h2>

<p align="justify"> 
  This project was built to help soon to be tesla owners connect with eachother so everyone can get a better idea about when they can expect thier new car.
</p>

<!-- HOW IT'S MADE -->
<h2 id="how-it's-made"> 💻 How It's Made</h2>

<p align="justify"> 
  This project was made using React and TailwindCSS in the frontend. Node.js and MongoDB were used in the backend. MVC was used to organize the backend.
</p>

<!-- OVERVIEW -->
<h2 id="overview"> 📖 Overview</h2>

<p align="justify"> 
  Users need to register to be able to access the app which allows them to follow, like, and create updates about thier cars estimated delivery time.
</p>

<!-- GETTING STARTED -->
<h2 id="getting-started"> ⚡️ Quick Start</h2>

<p>The first step is to create a .env file inside the backend and frontend folders. The backend .env will contain five global variables. A mongo db string to connect to your database, jwt token secret, and three cloudinary variables to allow uploading pictures. The frontend will contain one global variable.</p>

#### backend variables

<pre><code>- MONGO_URI: `your database URI`</code></pre>
<pre><code>- SECRET: jwt secret </code></pre>
<pre><code>- CLOUD_NAME: cloudinary cloud name</code></pre>
<pre><code>- API_KEY: cloudinary api key</code></pre>
<pre><code>- API_SECRET: cloudinary api secret</code></pre>

#### frontend variable

<pre><code>- REACT_APP_KEY: api key for the newsapi.org</code></pre>


<p>Then you need to install all of the project's modules:</p>
<pre><code>npm install</code></pre>

<p>Finally, you need to star the project with the command:</p>
<pre><code>npm run start</code></pre>
<i>Note that if you want to use it in development mode, you need to install the package nodemon <code>npm install -D nodemon</code>, and use the <code>npm run dev</code> command instead.</i>
