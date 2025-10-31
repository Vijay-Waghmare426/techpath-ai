const mongoose = require('mongoose');
const InterviewQuestion = require('./models/InterviewQuestion');
require('dotenv').config();

const interviewQuestions = [
  // HTML Questions (1-10)
  {
    question: "What is the DOM?",
    answer: "DOM (Document Object Model) is a tree-like structure that represents the HTML elements of a webpage. JavaScript can access and manipulate this structure dynamically using methods like getElementById(), querySelector(), etc.",
    category: "frontend",
    difficulty: "Beginner",
    type: "Conceptual",
    tags: ["HTML", "DOM", "JavaScript"],
    popular: true,
    views: 1250
  },
  {
    question: "What are semantic HTML tags?",
    answer: "Tags that convey meaning about the content — e.g., <header>, <footer>, <article>, <section>. They help with accessibility and SEO.",
    category: "frontend",
    difficulty: "Beginner",
    type: "Conceptual",
    tags: ["HTML", "Semantic", "SEO", "Accessibility"],
    popular: true,
    views: 980
  },
  {
    question: "What is the difference between div and span?",
    answer: "div is a block-level element (takes full width), while span is inline (only as wide as its content).",
    category: "frontend",
    difficulty: "Beginner",
    type: "Conceptual",
    tags: ["HTML", "Elements", "Block", "Inline"],
    popular: false,
    views: 756
  },
  {
    question: "Why is doctype important in HTML?",
    answer: "It tells the browser which HTML version is being used. For example: <!DOCTYPE html> ensures the page is parsed in standards-compliant mode.",
    category: "frontend",
    difficulty: "Beginner",
    type: "Conceptual",
    tags: ["HTML", "DOCTYPE", "Standards"],
    popular: false,
    views: 634
  },
  {
    question: "What are data attributes?",
    answer: "Custom attributes prefixed with data-, e.g. data-user-id=\"123\". They store extra info accessible via JavaScript.",
    category: "frontend",
    difficulty: "Intermediate",
    type: "Conceptual",
    tags: ["HTML", "Data Attributes", "JavaScript"],
    popular: false,
    views: 543
  },
  {
    question: "Difference between async and defer in script loading.",
    answer: "async loads and executes script immediately (non-blocking). defer loads script in parallel but executes after HTML parsing.",
    category: "frontend",
    difficulty: "Intermediate",
    type: "Conceptual",
    tags: ["HTML", "JavaScript", "Performance", "Loading"],
    popular: true,
    views: 892
  },
  {
    question: "What is the difference between HTML collection and NodeList?",
    answer: "HTMLCollection is live (updates automatically when DOM changes). NodeList can be static or live depending on how it's created.",
    category: "frontend",
    difficulty: "Advanced",
    type: "Conceptual",
    tags: ["HTML", "DOM", "JavaScript", "Collections"],
    popular: false,
    views: 467
  },
  {
    question: "What is localStorage vs sessionStorage?",
    answer: "localStorage persists even after closing the browser. sessionStorage is cleared when the tab closes.",
    category: "frontend",
    difficulty: "Intermediate",
    type: "Conceptual",
    tags: ["HTML", "Storage", "Browser", "Persistence"],
    popular: true,
    views: 1134
  },
  {
    question: "Explain meta tags.",
    answer: "<meta> provides metadata about the document like charset, viewport, and SEO keywords.",
    category: "frontend",
    difficulty: "Beginner",
    type: "Conceptual",
    tags: ["HTML", "Meta", "SEO", "Metadata"],
    popular: false,
    views: 721
  },
  {
    question: "What are iframes and their use cases?",
    answer: "Inline frames (<iframe>) embed another webpage within the current one (e.g., embedding a YouTube video).",
    category: "frontend",
    difficulty: "Intermediate",
    type: "Conceptual",
    tags: ["HTML", "iframe", "Embedding"],
    popular: false,
    views: 598
  },

  // CSS Questions (11-20)
  {
    question: "What is the box model?",
    answer: "Every HTML element is a box composed of content, padding, border, and margin.",
    category: "frontend",
    difficulty: "Beginner",
    type: "Conceptual",
    tags: ["CSS", "Box Model", "Layout"],
    popular: true,
    views: 1456
  },
  {
    question: "Difference between position: relative, absolute, fixed, and sticky.",
    answer: "relative: relative to its normal position; absolute: relative to nearest positioned ancestor; fixed: relative to viewport; sticky: switches between relative and fixed based on scroll",
    category: "frontend",
    difficulty: "Intermediate",
    type: "Conceptual",
    tags: ["CSS", "Position", "Layout"],
    popular: true,
    views: 1289
  },
  {
    question: "What are pseudo-classes and pseudo-elements?",
    answer: "Pseudo-classes: :hover, :focus (states of elements); Pseudo-elements: ::before, ::after (create virtual elements)",
    category: "frontend",
    difficulty: "Intermediate",
    type: "Conceptual",
    tags: ["CSS", "Pseudo-classes", "Pseudo-elements"],
    popular: false,
    views: 687
  },
  {
    question: "What is specificity in CSS?",
    answer: "Determines which rule overrides others. Inline styles > IDs > Classes > Elements.",
    category: "frontend",
    difficulty: "Intermediate",
    type: "Conceptual",
    tags: ["CSS", "Specificity", "Cascade"],
    popular: true,
    views: 923
  },
  {
    question: "Difference between inline, inline-block, and block.",
    answer: "inline: cannot set height/width; inline-block: can set height/width but stays inline; block: occupies full width",
    category: "frontend",
    difficulty: "Beginner",
    type: "Conceptual",
    tags: ["CSS", "Display", "Layout"],
    popular: false,
    views: 834
  },
  {
    question: "Explain Flexbox.",
    answer: "A layout model for aligning and distributing space among items in a container using properties like justify-content, align-items.",
    category: "frontend",
    difficulty: "Intermediate",
    type: "Conceptual",
    tags: ["CSS", "Flexbox", "Layout"],
    popular: true,
    views: 1567
  },
  {
    question: "Explain CSS Grid.",
    answer: "2D layout system using rows and columns; properties include grid-template-rows, grid-template-columns.",
    category: "frontend",
    difficulty: "Advanced",
    type: "Conceptual",
    tags: ["CSS", "Grid", "Layout"],
    popular: true,
    views: 1203
  },
  {
    question: "What is z-index?",
    answer: "Controls the stack order of elements (higher value = appears on top).",
    category: "frontend",
    difficulty: "Beginner",
    type: "Conceptual",
    tags: ["CSS", "Z-index", "Stacking"],
    popular: false,
    views: 612
  },
  {
    question: "Difference between rem and em.",
    answer: "em: relative to the element's font size. rem: relative to the root (html) font size.",
    category: "frontend",
    difficulty: "Intermediate",
    type: "Conceptual",
    tags: ["CSS", "Units", "Typography"],
    popular: false,
    views: 789
  },
  {
    question: "How to center a div both vertically and horizontally?",
    answer: "display: flex; justify-content: center; align-items: center; height: 100vh;",
    category: "frontend",
    difficulty: "Beginner",
    type: "Implementation",
    tags: ["CSS", "Centering", "Flexbox"],
    popular: true,
    views: 1890
  },

  // JavaScript Questions (21-30)
  {
    question: "What are closures?",
    answer: "A closure is formed when a function retains access to variables from its parent scope even after the parent has finished execution.",
    category: "frontend",
    difficulty: "Intermediate",
    type: "Conceptual",
    tags: ["JavaScript", "Closures", "Scope"],
    popular: true,
    views: 1654
  },
  {
    question: "What is event bubbling and capturing?",
    answer: "Bubbling: event propagates from child to parent. Capturing: event propagates from parent to child. Controlled using addEventListener(type, listener, useCapture).",
    category: "frontend",
    difficulty: "Intermediate",
    type: "Conceptual",
    tags: ["JavaScript", "Events", "DOM"],
    popular: true,
    views: 1123
  },
  {
    question: "Difference between var, let, and const.",
    answer: "var: function-scoped, hoisted. let: block-scoped, not hoisted the same way. const: block-scoped, cannot be reassigned.",
    category: "frontend",
    difficulty: "Beginner",
    type: "Conceptual",
    tags: ["JavaScript", "Variables", "ES6"],
    popular: true,
    views: 2134
  },
  {
    question: "Explain this in JavaScript.",
    answer: "Refers to the object that owns the current execution context. Its value depends on how the function is called.",
    category: "frontend",
    difficulty: "Intermediate",
    type: "Conceptual",
    tags: ["JavaScript", "this", "Context"],
    popular: true,
    views: 1456
  },
  {
    question: "What is hoisting?",
    answer: "Variable and function declarations are moved (\"hoisted\") to the top of their scope before execution.",
    category: "frontend",
    difficulty: "Intermediate",
    type: "Conceptual",
    tags: ["JavaScript", "Hoisting", "Scope"],
    popular: true,
    views: 1289
  },
  {
    question: "What are promises?",
    answer: "Objects representing asynchronous operations with three states: pending, fulfilled, or rejected.",
    category: "frontend",
    difficulty: "Intermediate",
    type: "Conceptual",
    tags: ["JavaScript", "Promises", "Async"],
    popular: true,
    views: 1876
  },
  {
    question: "Explain async/await.",
    answer: "Syntax sugar over promises, allowing asynchronous code to look synchronous.",
    category: "frontend",
    difficulty: "Intermediate",
    type: "Conceptual",
    tags: ["JavaScript", "Async", "Await", "ES2017"],
    popular: true,
    views: 1567
  },
  {
    question: "What is the difference between == and ===?",
    answer: "==: checks value after type coercion. ===: checks value and type (strict equality).",
    category: "frontend",
    difficulty: "Beginner",
    type: "Conceptual",
    tags: ["JavaScript", "Equality", "Comparison"],
    popular: true,
    views: 1789
  },
  {
    question: "What is event delegation?",
    answer: "Assigning a single event listener to a parent element that manages events for its child elements.",
    category: "frontend",
    difficulty: "Intermediate",
    type: "Conceptual",
    tags: ["JavaScript", "Events", "Delegation", "Performance"],
    popular: false,
    views: 923
  },
  {
    question: "Explain debouncing and throttling.",
    answer: "Debounce: delay execution until user stops triggering the event. Throttle: execute once per interval, even if triggered multiple times.",
    category: "frontend",
    difficulty: "Advanced",
    type: "Conceptual",
    tags: ["JavaScript", "Performance", "Optimization"],
    popular: true,
    views: 1345
  },

  // React.js Questions (31-40)
  {
    question: "What are React hooks?",
    answer: "Functions like useState, useEffect, useMemo that let you manage state and lifecycle without classes.",
    category: "frontend",
    difficulty: "Intermediate",
    type: "Conceptual",
    tags: ["React", "Hooks", "State"],
    popular: true,
    views: 2456
  },
  {
    question: "What is Virtual DOM?",
    answer: "A lightweight representation of the actual DOM that React uses to optimize rendering.",
    category: "frontend",
    difficulty: "Intermediate",
    type: "Conceptual",
    tags: ["React", "Virtual DOM", "Performance"],
    popular: true,
    views: 2234
  },
  {
    question: "Explain props vs state.",
    answer: "Props: passed from parent to child (immutable). State: managed within a component (mutable).",
    category: "frontend",
    difficulty: "Beginner",
    type: "Conceptual",
    tags: ["React", "Props", "State"],
    popular: true,
    views: 1987
  },
  {
    question: "What is reconciliation in React?",
    answer: "Process by which React updates the DOM — compares Virtual DOM trees and applies minimal real DOM changes.",
    category: "frontend",
    difficulty: "Advanced",
    type: "Conceptual",
    tags: ["React", "Reconciliation", "Virtual DOM"],
    popular: false,
    views: 1123
  },
  {
    question: "What are controlled and uncontrolled components?",
    answer: "Controlled components manage form data via React state. Uncontrolled use ref to access DOM values directly.",
    category: "frontend",
    difficulty: "Intermediate",
    type: "Conceptual",
    tags: ["React", "Forms", "Components"],
    popular: true,
    views: 1456
  },
  {
    question: "What is useMemo and useCallback?",
    answer: "useMemo: memoizes computed values. useCallback: memoizes functions to prevent unnecessary re-renders.",
    category: "frontend",
    difficulty: "Advanced",
    type: "Conceptual",
    tags: ["React", "Hooks", "Performance", "Memoization"],
    popular: true,
    views: 1789
  },
  {
    question: "What is context API?",
    answer: "Provides a way to pass data through the component tree without using props drilling.",
    category: "frontend",
    difficulty: "Intermediate",
    type: "Conceptual",
    tags: ["React", "Context", "State Management"],
    popular: true,
    views: 1567
  },
  {
    question: "Difference between React.memo and useMemo.",
    answer: "React.memo memoizes entire components, useMemo memoizes computed values.",
    category: "frontend",
    difficulty: "Advanced",
    type: "Conceptual",
    tags: ["React", "Memoization", "Performance"],
    popular: false,
    views: 923
  },
  {
    question: "What is lazy loading in React?",
    answer: "Dynamically imports components only when needed using React.lazy and Suspense.",
    category: "frontend",
    difficulty: "Advanced",
    type: "Conceptual",
    tags: ["React", "Lazy Loading", "Performance"],
    popular: true,
    views: 1234
  },
  {
    question: "Explain React Fiber.",
    answer: "It's React's internal engine (since v16) that makes rendering asynchronous and improves performance.",
    category: "frontend",
    difficulty: "Advanced",
    type: "Conceptual",
    tags: ["React", "Fiber", "Performance", "Reconciliation"],
    popular: false,
    views: 756
  },

  // Next.js Questions (41-50)
  {
    question: "What is server-side rendering (SSR)?",
    answer: "Rendering pages on the server before sending HTML to the client — improves SEO and initial load.",
    category: "frontend",
    difficulty: "Intermediate",
    type: "Conceptual",
    tags: ["Next.js", "SSR", "Performance", "SEO"],
    popular: true,
    views: 1876
  },
  {
    question: "Difference between SSR, SSG, and ISR.",
    answer: "SSR: per-request rendering. SSG: pre-built at build time. ISR: periodically revalidated static pages.",
    category: "frontend",
    difficulty: "Advanced",
    type: "Conceptual",
    tags: ["Next.js", "SSR", "SSG", "ISR"],
    popular: true,
    views: 1456
  },
  {
    question: "What are API routes in Next.js?",
    answer: "Create backend APIs directly inside Next.js under /pages/api.",
    category: "frontend",
    difficulty: "Intermediate",
    type: "Conceptual",
    tags: ["Next.js", "API Routes", "Backend"],
    popular: false,
    views: 1123
  },
  {
    question: "What is getStaticProps and getServerSideProps?",
    answer: "getStaticProps: for static generation. getServerSideProps: for SSR.",
    category: "frontend",
    difficulty: "Intermediate",
    type: "Conceptual",
    tags: ["Next.js", "Data Fetching", "SSR", "SSG"],
    popular: true,
    views: 1567
  },
  {
    question: "How does Next.js handle routing?",
    answer: "File-system based routing — each file in /pages corresponds to a route.",
    category: "frontend",
    difficulty: "Beginner",
    type: "Conceptual",
    tags: ["Next.js", "Routing", "File System"],
    popular: true,
    views: 1789
  },
  {
    question: "What is middleware in Next.js?",
    answer: "Code that runs before rendering a page (e.g., for authentication, redirects).",
    category: "frontend",
    difficulty: "Advanced",
    type: "Conceptual",
    tags: ["Next.js", "Middleware", "Authentication"],
    popular: false,
    views: 834
  },
  {
    question: "Difference between client-side and server-side navigation.",
    answer: "Next.js uses next/link for client-side transitions without full reload.",
    category: "frontend",
    difficulty: "Intermediate",
    type: "Conceptual",
    tags: ["Next.js", "Navigation", "Performance"],
    popular: false,
    views: 923
  },
  {
    question: "How does image optimization work in Next.js?",
    answer: "Uses next/image to automatically serve responsive, optimized images.",
    category: "frontend",
    difficulty: "Intermediate",
    type: "Conceptual",
    tags: ["Next.js", "Images", "Optimization"],
    popular: false,
    views: 712
  },
  {
    question: "How to create dynamic routes in Next.js?",
    answer: "Using square brackets, e.g. /pages/posts/[id].js.",
    category: "frontend",
    difficulty: "Beginner",
    type: "Implementation",
    tags: ["Next.js", "Routing", "Dynamic"],
    popular: true,
    views: 1345
  },
  {
    question: "What are the advantages of using Next.js over CRA?",
    answer: "SEO-friendly, SSR/SSG support, API routes, performance optimization, file-based routing.",
    category: "frontend",
    difficulty: "Intermediate",
    type: "Conceptual",
    tags: ["Next.js", "React", "Performance", "SEO"],
    popular: true,
    views: 1678
  }
];

async function seedInterviewQuestions() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/techpath', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB');
    
    // Clear existing questions (optional - remove this if you want to keep existing ones)
    // await InterviewQuestion.deleteMany({});
    // console.log('Cleared existing questions');
    
    // Insert new questions
    const insertedQuestions = await InterviewQuestion.insertMany(interviewQuestions);
    console.log(`Added ${insertedQuestions.length} interview questions`);
    
    // Display summary
    const stats = await InterviewQuestion.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    
    console.log('\nQuestion distribution:');
    stats.forEach(stat => {
      console.log(`${stat._id}: ${stat.count} questions`);
    });
    
    const totalQuestions = await InterviewQuestion.countDocuments();
    console.log(`\nTotal questions in database: ${totalQuestions}`);
    
  } catch (error) {
    console.error('Error seeding interview questions:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the seeding
if (require.main === module) {
  seedInterviewQuestions();
}

module.exports = { seedInterviewQuestions };