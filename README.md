# Resume Generator

An ATS-optimized resume generator built with Next.js, TypeScript, and Tailwind CSS. Features AI-powered resume analysis and PDF generation.

## Features

- **Executive Resume Template**: Clean, minimalist, high-contrast design optimized for ATS systems
- **PDF Generation**: Download your resume as a professionally formatted PDF
- **AI-Powered Analysis**: Get real-time feedback on your resume's ATS optimization score
- **Dynamic Data Management**: Easily update and manage your resume content

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **PDF Generation**: @react-pdf/renderer
- **State Management**: Zustand
- **AI Integration**: Vercel AI SDK (OpenAI/Anthropic)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd resume-generator
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.local.example .env.local
```

4. Add your API key to `.env.local`:

```env
# For OpenAI
OPENAI_API_KEY=sk-your-openai-api-key

# OR for Anthropic
ANTHROPIC_API_KEY=sk-ant-your-anthropic-api-key
```

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── actions/           # Server Actions (AI analysis)
├── app/              # Next.js App Router pages
├── components/       # React components
│   ├── pdf-download-button.tsx
│   ├── resume-pdf.tsx
│   ├── resume-template.tsx
│   └── review-sidebar.tsx
├── data/             # Initial resume data
├── store/            # Zustand store
└── types/            # TypeScript types
```

## Customizing Your Resume

Edit the resume data in `src/data/resume-data.ts` to customize your resume content. The data follows a structured schema defined in `src/types/resume.ts`.

## AI Analysis

The AI analysis feature provides:
- **Overall Score (0-100)**: ATS optimization rating
- **Impact Improvements**: Specific suggestions to strengthen your resume
- **Keyword Gaps**: Missing skills or keywords for your target role
- **Strengths**: Positive highlights from your resume

## License

MIT
