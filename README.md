# cs.ai (May be give it a different name)

A chat UI built with React, TypeScript, Bootstrap css and Vite. In the future, I may add docker, nginx and other tools needed like PBT (proparty based testing) or unit testing (for learning purposes).

I believe this project can be extended into a tool that is genuinely useful for classes that allow limited, structured access to AI. Inspired by CS50.ai—an AI chatbot developed by Harvard’s CS department to support students in CS50, my goal is to create a course-specific chat interface that guides students toward understanding rather than simply giving them answers. CS50.ai is framed around the idea of “rubber duck debugging”: when you are stuck on code, you explain it line by line to something (even a toy duck), and the act of articulation often helps you see the bug yourself.[1][2][3][4]

Harvard’s CS50 Duck was introduced as a way to approximate some aspects of office hours at scale, especially in large introductory courses where human teaching assistants cannot always provide immediate, one-on-one help. The duck is positioned as a virtual teaching assistant: available 24/7, focused on CS content, and designed to guide students with hints and conceptual explanations rather than full solutions.[3][5][1]

Instead of giving students unrestricted access to general-purpose tools like ChatGPT (which can be appropriate for some assignments), my idea is to put a model behind a layer of course-defined rules that shape how it responds. In theory, a student could type a detailed instruction into ChatGPT and manually enforce those rules—but in practice, most students will not do that and will instead just ask for whatever answer they want. By moving the rules into the system itself, instructors can hard-code expectations about pedagogy and academic honesty into the interaction model.[6][1]

Consider a prompt like: “Hey, help me understand this code? [code]”. In a naïve setup, the request to the model is simply the user’s prompt and the code, so the model might jump straight into a full explanation or even rewrite the code. In a more structured system, the backend would transform the request into something like: `{rules + user prompt}`, where the rules tell the model to explain behavior at a high level, ask follow-up questions, and avoid providing a full solution. CS50’s work shows that combining a strong system prompt with techniques like few-shot prompting and later fine-tuning can better align the model’s behavior with teaching goals.[6]

Future plans is to have:  

- The frontend provides a clean style interface where students can paste code or no code, just an explanation of what a student is trying to understand, ask questions, and see threaded responses.  
- The backend wraps each student message in course-specific rules before sending it to the model, enforcing constraints like “no full solutions,” “focus on conceptual guidance,” and “ask the student to think aloud.”  
- Over time, the system could incorporate ideas from Harvard’s “Improving AI in CS50” paper, such as building a small, high-quality dataset of good tutoring interactions and using that for prompt refinement or fine-tuning.[6]
- I am not looking to build something that replace lab helpers and tutors but a tool that complement that and if that violates the college AI use policy, I am happy to work on this project as learning process as I am finishing my natural project and I am looking for ways to applies knowledge I gained from this class and other classes like software, architecture, systems programming and algorithms.

The article “Improving AI in CS50,” which details how CS50’s team iteratively improved the CS50 Duck using a combination of system prompts, few-shot examples, fine-tuning, and human-in-the-loop evaluation, suggests that these methods are both replicable and adaptable to other courses and institutions. By following a similar approach—starting with strong rules and prompts, then gradually incorporating data-driven improvements—this chat UI could become a practical, policy-aligned AI companion for programming classes that want the benefits of AI support without giving up control over how it is used.[6]

[1](https://cs.harvard.edu/malan/publications/V1fp0567-liu.pdf)
[2](https://yaledailynews.com/blog/2023/09/07/yale-to-integrate-artificial-intelligence-into-introductory-computer-science-course/)
[3](https://videohighlight.com/v/d3Hl4Xv6vNE)
[4](https://cs50.harvard.edu/x/2024/notes/ai/)
[5](https://cs50.harvard.edu/college/2023/fall/notes/ai/)
[6](https://cs.harvard.edu/malan/publications/fp0627-liu.pdf)
[7](comet://newtab/)
[8](https://www.youtube.com/watch?v=FgKE9U4Tyd8)
[9](https://www.youtube.com/watch?v=d3Hl4Xv6vNE)
[10](https://www.youtube.com/watch?v=5NgNicANyqM)
[11](https://www.linkedin.com/posts/mohammed-yousuf-1a7b3966_cs50ai-harvard-independent-activity-7121701615740325888-iOqp)
[12](https://www.evanmarie.com/content/files/cs50ai_lectures.pdf)
[13](https://coconote.app/notes/bc5c18a7-9b47-4c6a-9e23-fd9752dc0d33)
[14](https://www.scribd.com/document/751658093/2024-04-25-Teaching-CS50-With-AI)
[15](https://cs50.harvard.edu/indonesia/2024/notes/10/)
[16](https://coconote.app/notes/9f213e2b-55e3-4bc6-bfb6-c145548cd111/transcript)
[17](https://www.reddit.com/r/cs50/comments/1br5czh/reliant_on_cs50ai/)
[18](https://www.youtube.com/shorts/AiYYARn3KKQ)
[19](https://github.com/KevinLiTian/Harvard_CS50_AI)
[20](https://www.linkedin.com/posts/malan_ai-chatgpt-activity-7100470640352059392-OODt)
[21](https://www.shedloadofcode.com/blog/concepts-of-artificial-intelligence-with-python-a-review-of-cs50-ai/)
---

## Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Core Folders & Files](#core-folders--files)
- [Development Notes](#development-notes)
- [License](#license)

---

## Project Structure

```
cs.ai/
├── sdk/                # Local AI SDK (core logic, types, utils), a new architecture style I am getting used to
├── src/                # Main React application source
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── layout/         # Layout components (sidebars, main layout)
│   ├── App.tsx         # App entry point
│   └── main.tsx        # Vite entry point
├── public/             # Static assets
├── vite.config.ts      # Vite configuration (with API proxy)
├── package.json        # Project dependencies and scripts
└── README.md           # This documentation
```

---

## To be able to get it to run (only on the college network because of cors rules)

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Run the development server:**
   ```sh
   npm run dev -- --host
   ```

3. **Open your browser:**  
   Visit [http:Network ip:5173]() (or the port shown in your terminal but visit the network one not localhost).

---

## Available Scripts

- `npm run dev` – Start the development server
- `npm run build` – Build for production
- `npm run preview` – Preview the production build

---

## Core Folders & Files

### `/src`

- **App.tsx** – Main application component, wraps the UI in error boundaries and layout (I am planning to improve this)
- **components/** – Contains UI elements such as chat containers, message lists, input fields, model selectors, and navigation.
- **hooks/** – Custom React hooks for chat and model logic.
- **layout/** – Layout components for sidebars and main content.

### `/sdk`

- **core/** – Core SDK logic for interacting with AI models.
- **types/** – TypeScript types for chat, models, and API responses.
- **utils/** – Utility functions and error handling for the SDK.

### `/vite.config.ts`

- Configures Vite, including a proxy for `/api` requests to the backend AI server.

---

## Development Notes

- **API Proxy:**  
  All `/api` requests are proxied to `http://ollama.cs.oberlin.edu:11434` (see `vite.config.ts`) and you can only access this if and only if you are connected to the college networks.

- **TypeScript:**  
  The project uses strict typing for safety and maintainability.

- **Component Structure:**  
  The UI is modular, with separate components for chat, models, navigation, and layout.

---

## License

MIT License. See [LICENSE](LICENSE) for details.